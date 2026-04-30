/**
 * routeForecast.ts — vindprognos för en planerad rutt.
 *
 * Hämtar Open-Meteo Forecast API (gratis, ingen API-nyckel) för 3 strategiska
 * waypoints (start, mid, end) och returnerar aggregerad data om vad seglaren
 * möter under rutten.
 *
 * Open-Meteo täcker hela världen och är gratis för måttlig kommersiell
 * användning. Vi cacha:r 30 min via Next.js fetch revalidation.
 */

export type WindForecast = {
  /** ISO-timestamp för prognosen */
  timeIso: string
  /** Vindstyrka i m/s vid 10 m höjd */
  speedMs: number
  /** Vindstyrka konverterad till knop */
  speedKnots: number
  /** Vindriktning 0–360° (där vinden kommer ifrån) */
  directionDeg: number
  /** Vindriktning som kompass: N, NO, O, SO, S, SV, V, NV */
  directionCompass: string
  /** Maximala byar i m/s om tillgängliga */
  gustMs: number | null
  gustKnots: number | null
}

export type RouteForecast = {
  /** Timestamp då prognosen hämtades */
  fetchedAt: string
  /** En prognos per waypoint (start, mid, end) */
  waypoints: Array<{
    name: string
    lat: number
    lng: number
    /** Förväntad vind ~6 timmar fram */
    forecast: WindForecast | null
  }>
  /** Sammanfattning över hela rutten — medelvind, värsta byar */
  summary: {
    avgSpeedMs: number
    avgSpeedKnots: number
    maxGustMs: number | null
    maxGustKnots: number | null
    /** "Lugnt", "Måttligt", "Friskt", "Hårt" — för UI-färg */
    band: 'calm' | 'moderate' | 'fresh' | 'strong' | 'unknown'
  }
}

const COMPASS = ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV']

function degToCompass(deg: number): string {
  const idx = Math.round(((deg % 360) / 45)) % 8
  return COMPASS[idx]!
}

function classifyBand(ms: number): 'calm' | 'moderate' | 'fresh' | 'strong' {
  // Beaufort-inspirerad indelning för fritidssjöfart:
  // 0–4 m/s: lugnt (Beaufort 0–2)
  // 4–8 m/s: måttligt (Beaufort 3–4)
  // 8–13 m/s: friskt (Beaufort 5–6)
  // 13+ m/s: hårt (Beaufort 7+)
  if (ms < 4) return 'calm'
  if (ms < 8) return 'moderate'
  if (ms < 13) return 'fresh'
  return 'strong'
}

type OpenMeteoResponse = {
  hourly?: {
    time: string[]
    wind_speed_10m: number[]
    wind_direction_10m: number[]
    wind_gusts_10m: number[]
  }
}

/**
 * Hämta vindprognos för en koordinat. Returnerar prognosen ~6 timmar fram
 * (ungefär halvvägs in i en typisk dagstur), eller den första tillgängliga.
 */
async function fetchPointForecast(lat: number, lng: number): Promise<WindForecast | null> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&hourly=wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=ms&forecast_days=2`
    const res = await fetch(url, { next: { revalidate: 1800 } })  // cache 30 min
    if (!res.ok) return null
    const data = await res.json() as OpenMeteoResponse
    if (!data.hourly?.time?.length) return null

    // Hitta den prognos som ligger ~6 h fram
    const now = Date.now()
    const targetMs = now + 6 * 3600 * 1000
    let bestIdx = 0
    let bestDiff = Infinity
    for (let i = 0; i < data.hourly.time.length; i++) {
      const t = new Date(data.hourly.time[i]!).getTime()
      const diff = Math.abs(t - targetMs)
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i }
    }

    const speedMs = data.hourly.wind_speed_10m[bestIdx] ?? 0
    const directionDeg = data.hourly.wind_direction_10m[bestIdx] ?? 0
    const gustMs = data.hourly.wind_gusts_10m[bestIdx] ?? null

    return {
      timeIso: data.hourly.time[bestIdx]!,
      speedMs: Math.round(speedMs * 10) / 10,
      speedKnots: Math.round(speedMs * 1.94384 * 10) / 10,
      directionDeg: Math.round(directionDeg),
      directionCompass: degToCompass(directionDeg),
      gustMs: gustMs !== null ? Math.round(gustMs * 10) / 10 : null,
      gustKnots: gustMs !== null ? Math.round(gustMs * 1.94384 * 10) / 10 : null,
    }
  } catch {
    return null
  }
}

/**
 * Bygg en prognos för 3 strategiska waypoints längs rutten:
 * start, mitten, slut. Aggregera till sammanfattning.
 */
export async function buildRouteForecast(
  startName: string,
  startLat: number,
  startLng: number,
  endName: string,
  endLat: number,
  endLng: number,
): Promise<RouteForecast> {
  const midLat = (startLat + endLat) / 2
  const midLng = (startLng + endLng) / 2

  const [startFc, midFc, endFc] = await Promise.all([
    fetchPointForecast(startLat, startLng),
    fetchPointForecast(midLat, midLng),
    fetchPointForecast(endLat, endLng),
  ])

  const all = [startFc, midFc, endFc].filter((f): f is WindForecast => f !== null)
  const speeds = all.map(f => f.speedMs)
  const gusts = all.map(f => f.gustMs).filter((g): g is number => g !== null)

  const avgMs = speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0
  const maxGust = gusts.length > 0 ? Math.max(...gusts) : null

  return {
    fetchedAt: new Date().toISOString(),
    waypoints: [
      { name: startName, lat: startLat, lng: startLng, forecast: startFc },
      { name: 'Mitt på rutten', lat: midLat, lng: midLng, forecast: midFc },
      { name: endName, lat: endLat, lng: endLng, forecast: endFc },
    ],
    summary: {
      avgSpeedMs: Math.round(avgMs * 10) / 10,
      avgSpeedKnots: Math.round(avgMs * 1.94384 * 10) / 10,
      maxGustMs: maxGust !== null ? Math.round(maxGust * 10) / 10 : null,
      maxGustKnots: maxGust !== null ? Math.round(maxGust * 1.94384 * 10) / 10 : null,
      band: speeds.length > 0 ? classifyBand(avgMs) : 'unknown',
    },
  }
}
