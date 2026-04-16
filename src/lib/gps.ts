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
  return Math.max(...points.map(p => p.speedKnots))
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
