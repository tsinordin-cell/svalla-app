// Väder-/vindlayer för Upptäck-kartan.
// Hämtar aktuell vind + temperatur från Open-Meteo i ett zoom-adaptivt rutnät
// och exponerar rena helpers för rendering (SVG-pilar, färger, Beaufort).
//
// Inga API-nycklar — Open-Meteo är gratis och accepterar batch-requests
// (flera lat/lng i en query). In-memory cache 10 min per grid-punkt.

export interface WeatherPoint {
  lat: number
  lng: number
  temp: number         // °C, avrundad
  windSpeed: number    // m/s, 1 decimal
  windDir: number      // grader (0-360), meteorologisk "från"-riktning
  weatherCode: number  // WMO
  isDay: number        // 0 eller 1
}

// ── Grid-storlek per zoomnivå ────────────────────────────────────────────────
// Tätt där användaren zoomar in, glest när man ser hela landet.
// Värdena är empiriskt valda så det alltid blir ~20-80 punkter i vyn.
export function gridSizeForZoom(zoom: number): number {
  if (zoom < 7)  return 1.2   // hela Sverige
  if (zoom < 9)  return 0.55  // region
  if (zoom < 11) return 0.22  // skärgård
  if (zoom < 13) return 0.09  // farled
  return 0.045                // detaljnivå — bland skären
}

// ── Sample grid inom bbox ─────────────────────────────────────────────────────
// Snap till grid-gränser så att cache-nycklar återanvänds mellan pans.
export function sampleGrid(
  south: number, west: number,
  north: number, east: number,
  zoom: number,
): Array<{ lat: number; lng: number }> {
  const step = gridSizeForZoom(zoom)
  const startLat = Math.floor(south / step) * step
  const startLng = Math.floor(west / step) * step
  const endLat   = Math.ceil(north / step) * step
  const endLng   = Math.ceil(east / step) * step

  const points: Array<{ lat: number; lng: number }> = []
  for (let lat = startLat; lat <= endLat + 1e-9; lat += step) {
    for (let lng = startLng; lng <= endLng + 1e-9; lng += step) {
      // Offset en halv cell så pilar hamnar mitt i rutan, inte på kanten
      const la = lat + step / 2
      const ln = lng + step / 2
      if (la >= south && la <= north && ln >= west && ln <= east) {
        points.push({
          lat: parseFloat(la.toFixed(4)),
          lng: parseFloat(ln.toFixed(4)),
        })
      }
    }
  }

  // Open-Meteo batch tar max 100 punkter — sub-sampla vid behov
  if (points.length > 100) {
    const stride = Math.ceil(points.length / 100)
    return points.filter((_, i) => i % stride === 0).slice(0, 100)
  }
  return points
}

// ── Beaufort-skala ────────────────────────────────────────────────────────────
// Returnerar 0-12.
export function beaufort(ms: number): number {
  if (ms < 0.3)  return 0
  if (ms < 1.6)  return 1
  if (ms < 3.4)  return 2
  if (ms < 5.5)  return 3
  if (ms < 8.0)  return 4
  if (ms < 10.8) return 5
  if (ms < 13.9) return 6
  if (ms < 17.2) return 7
  if (ms < 20.8) return 8
  if (ms < 24.5) return 9
  if (ms < 28.5) return 10
  if (ms < 32.7) return 11
  return 12
}

export function beaufortLabel(ms: number): string {
  const labels = [
    'Lugnt', 'Svag bris', 'Lätt bris', 'God bris', 'Frisk bris',
    'Frisk vind', 'Hård vind', 'Styv kuling', 'Halv storm',
    'Kuling', 'Stark storm', 'Storm', 'Orkan',
  ]
  return labels[beaufort(ms)] ?? 'Okänt'
}

// ── Vindfärg: lugn grön → bris blå → frisk guld → hård orange → storm röd ───
// Ligger i linje med svensk segelkonvention där Beaufort 0-3 är "njut",
// 4-5 "rätt fart", 6+ "hav och rev".
export function windColor(ms: number): string {
  if (ms < 1.6)  return '#6ba88a'  // lugnt — dämpad grön
  if (ms < 3.4)  return '#4a9d8e'  // svag — teal
  if (ms < 5.5)  return '#3a7fb8'  // bris — Svalla-blå
  if (ms < 8.0)  return '#c9a032'  // frisk bris — guld
  if (ms < 10.8) return '#d97a3a'  // frisk vind — orange
  if (ms < 13.9) return '#c9562a'  // hård vind — djup orange
  return '#a8301e'                 // kuling+ — röd
}

// ── Kompassriktning ──────────────────────────────────────────────────────────
export function windDirLabel(deg: number): string {
  const dirs = [
    'N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO',
    'S', 'SSV', 'SV', 'VSV', 'V', 'VNV', 'NV', 'NNV',
  ]
  return dirs[Math.round(deg / 22.5) % 16]
}

// ── WMO-kod → emoji + svensk text ────────────────────────────────────────────
export function weatherDesc(code: number, isDay: number): { emoji: string; text: string } {
  if (code === 0)  return { emoji: isDay ? '☀️' : '🌙', text: isDay ? 'Klart' : 'Klar natt' }
  if (code <= 2)   return { emoji: '⛅', text: 'Delvis molnigt' }
  if (code === 3)  return { emoji: '☁️', text: 'Molnigt' }
  if (code <= 49)  return { emoji: '🌫️', text: 'Dimma' }
  if (code <= 59)  return { emoji: '🌦️', text: 'Duggregn' }
  if (code <= 69)  return { emoji: '🌧️', text: 'Regn' }
  if (code <= 79)  return { emoji: '❄️', text: 'Snö' }
  if (code <= 84)  return { emoji: '⛈️', text: 'Regnskurar' }
  if (code <= 99)  return { emoji: '⛈️', text: 'Åska' }
  return { emoji: '🌤', text: 'Varierat' }
}

// ── In-memory cache (10 min TTL) ─────────────────────────────────────────────
interface CacheEntry { data: WeatherPoint; expires: number }
const cache = new Map<string, CacheEntry>()
const CACHE_TTL = 10 * 60 * 1000

function cacheKey(lat: number, lng: number): string {
  return `${lat.toFixed(2)},${lng.toFixed(2)}`
}

// ── Fetch från Open-Meteo (batch-endpoint) ───────────────────────────────────
// Hämtar bara punkter som saknar färsk cache; slår ihop cached + fresh innan
// retur. Hoppar tyst över fel; kastar bara AbortError vidare.
export async function fetchWeatherGrid(
  points: Array<{ lat: number; lng: number }>,
  signal?: AbortSignal,
): Promise<WeatherPoint[]> {
  if (points.length === 0) return []

  const now = Date.now()
  const cached: WeatherPoint[] = []
  const toFetch: Array<{ lat: number; lng: number }> = []

  for (const p of points) {
    const key = cacheKey(p.lat, p.lng)
    const entry = cache.get(key)
    if (entry && entry.expires > now) cached.push(entry.data)
    else                              toFetch.push(p)
  }

  if (toFetch.length === 0) return cached

  const lats = toFetch.map(p => p.lat.toFixed(3)).join(',')
  const lngs = toFetch.map(p => p.lng.toFixed(3)).join(',')
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}` +
    `&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day` +
    `&wind_speed_unit=ms&timezone=Europe/Stockholm`

  try {
    const res = await fetch(url, { signal })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    // Single-point respons är ett objekt; multi-point är en array.
    const responses = Array.isArray(data) ? data : [data]
    const fresh: WeatherPoint[] = []

    for (let i = 0; i < toFetch.length; i++) {
      const p = toFetch[i]
      const r = responses[i]
      const c = r?.current
      if (!c || typeof c.temperature_2m !== 'number') continue

      const wp: WeatherPoint = {
        lat: p.lat,
        lng: p.lng,
        temp: Math.round(c.temperature_2m),
        windSpeed: parseFloat(Number(c.wind_speed_10m).toFixed(1)),
        windDir: Number(c.wind_direction_10m),
        weatherCode: Number(c.weather_code ?? 0),
        isDay: Number(c.is_day ?? 1),
      }
      fresh.push(wp)
      cache.set(cacheKey(p.lat, p.lng), { data: wp, expires: now + CACHE_TTL })
    }
    return [...cached, ...fresh]
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e
    // Nätverksfel — returnera det vi har från cachen
    return cached
  }
}

// ── SVG-pil som Leaflet-divIcon HTML ─────────────────────────────────────────
// Design:
//   • Tunn skaftlinje med triangulärt huvud
//   • Färg styrs av vindstyrka (Beaufort-grupp)
//   • Pilen roteras så den "flyger med" vinden (windDir + 180°)
//   • Liten pill under pilen med m/s för snabb avläsning
//   • Drop-shadow för läsbarhet över både ljusa och mörka tiles
//
// Öppen HTML-sträng (Leaflet L.divIcon kräver html som string).
export function windArrowHTML(w: WeatherPoint): string {
  const color = windColor(w.windSpeed)
  const b = beaufort(w.windSpeed)

  // Pil-längd skalar med Beaufort (14-26 px) så hårt väder syns tydligt
  const len = Math.min(26, 14 + b * 1.1)
  const rotation = (w.windDir + 180) % 360

  // SVG pekar NORR i default-state — rotationen sköter riktningen.
  const stemTopY = 16 - len / 2
  const stemBotY = 16 + len / 2

  return `
    <div role="img"
         aria-label="Vind ${w.windSpeed} m/s från ${windDirLabel(w.windDir)}"
         style="display:flex;flex-direction:column;align-items:center;gap:2px;pointer-events:auto;cursor:pointer;">
      <svg width="30" height="30" viewBox="0 0 32 32"
           style="overflow:visible;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.32));transform:rotate(${rotation}deg);transition:transform 500ms ease;">
        <line x1="16" y1="${stemBotY}" x2="16" y2="${stemTopY + 3}"
              stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M 16 ${stemTopY - 1} L 10.5 ${stemTopY + 7} L 16 ${stemTopY + 4} L 21.5 ${stemTopY + 7} Z"
              fill="${color}" stroke="${color}" stroke-width="1" stroke-linejoin="round"/>
      </svg>
      <span style="background:${color};color:#fff;font-size:10px;font-weight:700;line-height:1.2;padding:1px 6px;border-radius:7px;box-shadow:0 1px 2px rgba(0,0,0,0.18);white-space:nowrap;font-family:system-ui,-apple-system,sans-serif;letter-spacing:.2px;">
        ${w.windSpeed.toFixed(1)}
      </span>
    </div>
  `
}

// ── Popup-HTML (Leaflet bindPopup) ───────────────────────────────────────────
export function windPopupHTML(w: WeatherPoint): string {
  const desc  = weatherDesc(w.weatherCode, w.isDay)
  const color = windColor(w.windSpeed)
  return `
    <div style="min-width:196px;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;padding:2px 0;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
        <span style="font-size:26px;line-height:1;">${desc.emoji}</span>
        <div>
          <div style="font-size:22px;font-weight:700;color:#0a2d3c;line-height:1;">${w.temp}°</div>
          <div style="font-size:11px;color:#5a7a8a;margin-top:3px;letter-spacing:.2px;">${desc.text}</div>
        </div>
      </div>
      <div style="padding:8px 10px;border-radius:10px;background:${color};color:#fff;">
        <div style="font-size:13px;font-weight:700;letter-spacing:.2px;">
          ${w.windSpeed.toFixed(1)} m/s · ${windDirLabel(w.windDir)}
        </div>
        <div style="font-size:11px;opacity:.92;margin-top:2px;font-weight:600;">
          ${beaufortLabel(w.windSpeed)}
        </div>
      </div>
      <div style="font-size:10px;color:#8a9aa7;margin-top:8px;letter-spacing:.2px;">
        Data: Open-Meteo · uppdateras var 10:e min
      </div>
    </div>
  `
}
