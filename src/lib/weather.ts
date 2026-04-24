/**
 * Historisk väder-data från Open-Meteo Archive (ERA5).
 *
 * Används av tur-sidan för att visa vind/våg-förhållanden som rådde
 * vid turens tidpunkt. Ingen API-nyckel krävs, Open-Meteo är gratis
 * för icke-kommersiell och måttlig kommersiell användning.
 *
 * Arkivet går tillbaka till 1940 för vind (ERA5 reanalysis).
 * Vågor finns bara via Marine API de senaste ~92 dagarna.
 */

export type HourlyWind = {
  /** ISO-timestamp i UTC */
  timeIso: string
  /** Millisekunder sedan epoch (pre-parsed för snabb matching mot GPS-points) */
  timeMs: number
  speedMs: number
  directionDeg: number
}

export type TripWeather = {
  wind: {
    speedMs: number          // medel m/s över turens tidsspann
    speedKnots: number
    directionDeg: number     // 0-360, medelriktning
    gustMaxMs: number | null // maxgust om tillgängligt
    gustMaxKnots: number | null
  } | null
  wave: {
    heightM: number          // medel vågHöjd i meter
  } | null
  /** Per-timme-data mellan start och end — används av kartan för att rita vind-pilar. */
  hourly: HourlyWind[]
  /** Indikerar datakälla — för debug och UI-fallbacks */
  source: 'archive' | 'archive+marine' | 'marine' | 'empty'
}

type HourlyWind = {
  time: string[]
  wind_speed_10m: (number | null)[]
  wind_direction_10m: (number | null)[]
  wind_gusts_10m?: (number | null)[]
}

type MarineHourly = {
  time: string[]
  wave_height: (number | null)[]
}

/** Returnerar YYYY-MM-DD för en ISO-timestamp. */
function isoDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10)
}

/** Genomsnitt av non-null numbers, eller null om alla är null. */
function avg(xs: (number | null | undefined)[]): number | null {
  const valid = xs.filter((x): x is number => typeof x === 'number' && Number.isFinite(x))
  if (valid.length === 0) return null
  return valid.reduce((a, b) => a + b, 0) / valid.length
}

/** Cirkulär medelriktning (vektor-medel) — så 359° + 1° → 0°, inte 180°. */
function avgDirection(dirs: (number | null | undefined)[]): number | null {
  const valid = dirs.filter((d): d is number => typeof d === 'number' && Number.isFinite(d))
  if (valid.length === 0) return null
  let sx = 0, sy = 0
  for (const d of valid) {
    const rad = (d * Math.PI) / 180
    sx += Math.cos(rad)
    sy += Math.sin(rad)
  }
  const avgRad = Math.atan2(sy / valid.length, sx / valid.length)
  const deg = (avgRad * 180) / Math.PI
  return (deg + 360) % 360
}

function maxOrNull(xs: (number | null | undefined)[]): number | null {
  const valid = xs.filter((x): x is number => typeof x === 'number' && Number.isFinite(x))
  if (valid.length === 0) return null
  return Math.max(...valid)
}

/** Filtrera timmar inom [startIso, endIso] (inkl.). */
function filterByRange(times: string[], startIso: string, endIso: string): number[] {
  const startMs = new Date(startIso).getTime()
  const endMs = new Date(endIso).getTime()
  const indices: number[] = []
  for (let i = 0; i < times.length; i++) {
    // Open-Meteo returnerar ISO utan zon — antag UTC
    const t = new Date(times[i] + 'Z').getTime()
    if (t >= startMs && t <= endMs) indices.push(i)
  }
  return indices
}

export async function getTripWeather(
  lat: number,
  lng: number,
  startAt: string,
  endAt?: string | null,
): Promise<TripWeather> {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return { wind: null, wave: null, hourly: [], source: 'empty' }
  }

  const effectiveEnd = endAt ?? startAt
  const startDate = isoDate(startAt)
  const endDate = isoDate(effectiveEnd)

  // ── Vind (ERA5 archive, finns för alla datum sedan 1940) ───────────────
  let windResult: TripWeather['wind'] = null
  let hourlyWind: HourlyWind[] = []
  try {
    const url = new URL('https://archive-api.open-meteo.com/v1/archive')
    url.searchParams.set('latitude', lat.toFixed(4))
    url.searchParams.set('longitude', lng.toFixed(4))
    url.searchParams.set('start_date', startDate)
    url.searchParams.set('end_date', endDate)
    url.searchParams.set('hourly', 'wind_speed_10m,wind_direction_10m,wind_gusts_10m')
    url.searchParams.set('wind_speed_unit', 'ms')
    url.searchParams.set('timezone', 'UTC')

    const res = await fetch(url.toString(), { next: { revalidate: 24 * 3600 } })
    if (res.ok) {
      const data = (await res.json()) as { hourly?: HourlyWind }
      const h = data.hourly
      if (h?.time && h.time.length > 0) {
        const idx = filterByRange(h.time, startAt, effectiveEnd)
        // Om endAt saknas (point-in-time) → bara närmaste timme
        const use = idx.length > 0 ? idx : [Math.floor(h.time.length / 2)]
        const speeds = use.map(i => h.wind_speed_10m[i])
        const dirs = use.map(i => h.wind_direction_10m[i])
        const gusts = h.wind_gusts_10m ? use.map(i => (h.wind_gusts_10m as (number | null)[])[i]) : []

        // Bygg per-timme-array för kart-pilarna (filtrera tomma timmar).
        hourlyWind = use
          .map((i): HourlyWind | null => {
            const s = h.wind_speed_10m[i]
            const d = h.wind_direction_10m[i]
            if (s == null || d == null) return null
            const t = h.time[i]
            return { timeIso: t, timeMs: new Date(t + 'Z').getTime(), speedMs: s, directionDeg: d }
          })
          .filter((x): x is HourlyWind => x !== null)

        const speedMs = avg(speeds)
        const directionDeg = avgDirection(dirs)
        const gustMaxMs = maxOrNull(gusts)

        if (speedMs != null && directionDeg != null) {
          windResult = {
            speedMs,
            speedKnots: speedMs * 1.94384,
            directionDeg,
            gustMaxMs,
            gustMaxKnots: gustMaxMs != null ? gustMaxMs * 1.94384 : null,
          }
        }
      }
    }
  } catch {
    // Tyst degradering — väder är garnering, inte kritiskt
  }

  // ── Vågor (Marine API, bara senaste ~92 dagar) ─────────────────────────
  let waveResult: TripWeather['wave'] = null
  const ninetyDaysAgoMs = Date.now() - 90 * 24 * 3600 * 1000
  const tripStartMs = new Date(startAt).getTime()
  if (tripStartMs > ninetyDaysAgoMs) {
    try {
      const url = new URL('https://marine-api.open-meteo.com/v1/marine')
      url.searchParams.set('latitude', lat.toFixed(4))
      url.searchParams.set('longitude', lng.toFixed(4))
      url.searchParams.set('start_date', startDate)
      url.searchParams.set('end_date', endDate)
      url.searchParams.set('hourly', 'wave_height')
      url.searchParams.set('timezone', 'UTC')

      const res = await fetch(url.toString(), { next: { revalidate: 24 * 3600 } })
      if (res.ok) {
        const data = (await res.json()) as { hourly?: MarineHourly }
        const h = data.hourly
        if (h?.time && h.time.length > 0) {
          const idx = filterByRange(h.time, startAt, effectiveEnd)
          const use = idx.length > 0 ? idx : [Math.floor(h.time.length / 2)]
          const heights = use.map(i => h.wave_height[i])
          const heightM = avg(heights)
          if (heightM != null) waveResult = { heightM }
        }
      }
    } catch { /* tyst */ }
  }

  const source: TripWeather['source'] =
    windResult && waveResult ? 'archive+marine'
    : windResult ? 'archive'
    : waveResult ? 'marine'
    : 'empty'

  return { wind: windResult, wave: waveResult, hourly: hourlyWind, source }
}

/**
 * Plocka ~N jämnt fördelade punkter längs en rutt och matcha dem mot
 * hourly-vinddata. Returnerar en sampel-array med lat/lng + närmaste timmes
 * vind, redo att renderas som pilar på kartan.
 *
 * Antagande: vind varierar lite över en typisk 5-20 NM skärgårdstur, så vi
 * använder samma hourly-data (från startpunkten) för alla sampel. Mer
 * exakt modell skulle kräva en fetch per sampel — oacceptabelt för skala.
 */
export type WindArrowSample = {
  lat: number
  lng: number
  timeMs: number
  speedMs: number
  directionDeg: number
}

export function buildWindArrowSamples<T extends { lat: number; lng: number; recordedAt?: string }>(
  points: T[],
  hourly: HourlyWind[],
  targetCount = 10,
): WindArrowSample[] {
  if (points.length === 0 || hourly.length === 0) return []

  // Antal sampel: minst 3, max targetCount, beroende på ruttens längd.
  const n = Math.min(targetCount, Math.max(3, Math.floor(points.length / 8)))
  if (points.length < n) return []

  const samples: WindArrowSample[] = []
  for (let i = 0; i < n; i++) {
    const frac = n === 1 ? 0.5 : i / (n - 1)
    const idx = Math.floor(frac * (points.length - 1))
    const p = points[idx]
    const pointMs = p.recordedAt ? new Date(p.recordedAt).getTime() : hourly[0].timeMs

    // Hitta närmaste timme i hourly-arrayen
    let best = hourly[0]
    let bestDelta = Math.abs(best.timeMs - pointMs)
    for (let j = 1; j < hourly.length; j++) {
      const d = Math.abs(hourly[j].timeMs - pointMs)
      if (d < bestDelta) { best = hourly[j]; bestDelta = d }
    }

    samples.push({
      lat: p.lat,
      lng: p.lng,
      timeMs: best.timeMs,
      speedMs: best.speedMs,
      directionDeg: best.directionDeg,
    })
  }
  return samples
}

/** Svensk Beaufort-liknande färgkodning av vindstyrka för kartpilar. */
export function windColor(speedMs: number): string {
  if (speedMs < 5)  return '#16a34a'  // grön — stiltje/lätt
  if (speedMs < 10) return '#eab308'  // gul — frisk
  if (speedMs < 15) return '#ea580c'  // orange — hård
  return '#dc2626'                     // röd — storm
}

/** Konvertera grader till svensk kompass-förkortning (N, NO, O, ...) */
export function windDirectionLabel(deg: number): string {
  const dirs = ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV']
  const idx = Math.round(deg / 45) % 8
  return dirs[idx]
}
