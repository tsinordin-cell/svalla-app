// GPS utilities for Svalla trip tracking

export type GpsPoint = {
  lat: number
  lng: number
  speedKnots: number
  heading: number | null
  accuracy: number
  recordedAt: string   // ISO
}

export type StopEvent = {
  lat: number
  lng: number
  type: 'stop' | 'pause' | 'start' | 'end'
  startedAt: string
  endedAt?: string
  durationSeconds: number
}

// Convert m/s to knots
export function msToKnots(ms: number): number {
  return ms * 1.94384
}

// Haversine distance between two points in nautical miles
export function distanceNM(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3440.065  // Earth radius in NM
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Total distance along a path
export function totalDistanceNM(points: GpsPoint[]): number {
  let d = 0
  for (let i = 1; i < points.length; i++) {
    d += distanceNM(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng)
  }
  return d
}

// Average speed from points
export function avgSpeedKnots(points: GpsPoint[]): number {
  if (points.length === 0) return 0
  const moving = points.filter(p => p.speedKnots > 0.3)
  if (moving.length === 0) return 0
  return moving.reduce((a, p) => a + p.speedKnots, 0) / moving.length
}

// Max speed
export function maxSpeedKnots(points: GpsPoint[]): number {
  if (points.length === 0) return 0
  const speeds = points.map(p => p.speedKnots)
  return speeds.reduce((max, s) => (s > max ? s : max), 0)
}

// Detect stops: groups of consecutive points where speed < 0.3 kn for > 2 min
export function detectStops(points: GpsPoint[]): StopEvent[] {
  const STOP_THRESHOLD_KNOTS = 0.3
  const MIN_STOP_SECONDS = 120   // 2 minutes

  const stops: StopEvent[] = []
  let stopStart: number | null = null
  let stopLat = 0
  let stopLng = 0

  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    if (p.speedKnots < STOP_THRESHOLD_KNOTS) {
      if (stopStart === null) {
        stopStart = i
        stopLat = p.lat
        stopLng = p.lng
      }
    } else {
      if (stopStart !== null) {
        const startTime = new Date(points[stopStart].recordedAt).getTime()
        const endTime = new Date(points[i - 1].recordedAt).getTime()
        const dur = (endTime - startTime) / 1000
        if (dur >= MIN_STOP_SECONDS) {
          stops.push({
            lat: stopLat,
            lng: stopLng,
            type: 'stop',
            startedAt: points[stopStart].recordedAt,
            endedAt: points[i - 1].recordedAt,
            durationSeconds: Math.round(dur),
          })
        }
        stopStart = null
      }
    }
  }

  // Check if trip ended with a stop (final points have speed < 0.3)
  if (stopStart !== null && points.length > 0) {
    const startTime = new Date(points[stopStart].recordedAt).getTime()
    const endTime = new Date(points[points.length - 1].recordedAt).getTime()
    const dur = (endTime - startTime) / 1000
    if (dur >= MIN_STOP_SECONDS) {
      stops.push({
        lat: stopLat,
        lng: stopLng,
        type: 'stop',
        startedAt: points[stopStart].recordedAt,
        endedAt: points[points.length - 1].recordedAt,
        durationSeconds: Math.round(dur),
      })
    }
  }

  return stops
}

// Check if a point is within distanceNM of a restaurant
export function restaurantsAlongRoute(
  points: GpsPoint[],
  restaurants: { id: string; name: string; latitude: number; longitude: number }[],
  thresholdNM = 0.5
): typeof restaurants {
  return restaurants.filter(r =>
    points.some(p => distanceNM(p.lat, p.lng, r.latitude, r.longitude) <= thresholdNM)
  )
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return m > 0 ? `${h}h ${m}min` : `${h}h`
  if (m > 0) return s > 0 ? `${m}min ${s}s` : `${m}min`
  return `${s}s`
}

/** Same as formatDuration but takes minutes (as stored on trips.duration) */
// ── Anomalidetektering ────────────────────────────────────────────────────────
/**
 * Kontrollerar om en ny GPS-punkt är en omöjlig hopp givet elapsed tid.
 * Returnerar true om punkten bör filtreras bort.
 * maxSpeedKnots = 45 kn täcker alla rimliga fritidsbåtar + säkerhetsmarginal.
 */
export function isGpsAnomaly(
  prevLat: number, prevLng: number, prevTs: number,
  newLat: number,  newLng: number,  newTs: number,
  maxSpeedKnots = 45,
): boolean {
  const dtHours = (newTs - prevTs) / 3_600_000
  if (dtHours <= 0.00005) return false  // < 0.18 s — skippa, för tätt
  const dist = distanceNM(prevLat, prevLng, newLat, newLng)
  const impliedSpeed = dist / dtHours
  return impliedSpeed > maxSpeedKnots
}

// ── Reverse geocoding (Nominatim/OpenStreetMap) ───────────────────────────────
/**
 * Hämtar ett läsbart platsnamn för ett GPS-koordinatpar.
 * Prioriterar marina/hamn-namn framför gator och städer.
 * Rate-limit: Nominatim tillåter max 1 req/s — anropa ej i realtids-loopar.
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat.toFixed(6)}&lon=${lng.toFixed(6)}&format=json&zoom=17&addressdetails=1&accept-language=sv`,
      {
        headers: {
          'User-Agent': 'Svalla/1.0 (svalla.se)',
          'Accept': 'application/json',
        },
        signal: AbortSignal.timeout(5000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const a = data.address ?? {}

    // Marina/hamn-namn har högst prioritet (mest relevant för seglare)
    const name =
      a.marina       ??  // gästhamn, marina
      a.harbour      ??  // hamn
      a.leisure      ??  // brygga, badplats
      data.name      ??  // råa platsnamn från OSM
      a.natural      ??  // klippa, holme, vik
      a.island       ??  // ö-namn
      a.place        ??  // by, plats
      a.village      ??  // by
      a.suburb       ??  // stadsdel
      null

    return name ?? null
  } catch {
    return null  // Timeout eller nätverksfel — tyst
  }
}

export function formatDurationMin(min: number): string | null {
  if (!min || min <= 0) return null
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}min`
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}
