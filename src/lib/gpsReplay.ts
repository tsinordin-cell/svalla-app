// Uppspelning av en tur genom GPS-kedjan — från rådata till utjämnat spår.
//
// Varför: efter #245/#248 kunde inget fälttest räknas om. Nu när rådatan
// sparas (#249) kan en tur spelas upp genom exakt samma steg som /spara
// kör live, med vilka parametrar som helst, och jämföras med det sparade
// spåret. Varje filterändring blir därmed en jämförelse på befintliga
// turer i stället för ett nytt fälttest.
//
// OBS — SPEGLING, INTE DELAD KOD (beslut 2026-09-06): /spara kör kedjan i
// sin GPS-callback (src/app/spara/page.tsx, startGPS). Den koden rörs inte
// före Toms fälttest. replayTrack nedan speglar den steg för steg:
//   1. accuracy > 80 m          → kastas (rejectedAccuracy)
//   2. isGpsAnomaly rå→rå, tak SPEED_CEILING_KNOTS → kastas (rejectedAnomaly)
//   3. CvGpsKalmanFilter.update → utjämnat läge + fart
//   4. fart: ur filtret; första fixen efter (om)start: enhetens fart
//   5. cleanGpsSpeed med RÅ farthistorik (två senaste)
// Kort på teamsidan: slå ihop till en delad GpsPipeline efter fälttestet,
// så att speglingen inte kan glida isär.

import type { GpsPoint } from './gps'
import { isGpsAnomaly, msToKnots, totalDistanceNM, avgSpeedKnots, maxSpeedKnots } from './gps'
import { CvGpsKalmanFilter, type CvKalmanOptions } from './kalman'
import { cleanGpsSpeed, SPEED_CEILING_KNOTS } from './tracking'
import { computeGpsQuality, type GpsQuality } from './gpsQuality'

/** En rå fix som den kom från telefonen (= gps_points.raw_* + accuracy + recorded_at). */
export type RawFix = {
  lat: number
  lng: number
  accuracyM: number
  /** ms sedan epoch */
  ts: number
  /** enhetens fart i knop, null om saknas */
  deviceSpeedKn: number | null
  heading: number | null
}

export type ReplayOptions = {
  /** Kastar fixar med sämre accuracy än så här (m). /spara: 80. */
  maxAccuracyM?: number
  /** Tak för anomaligrinden (knop). /spara: SPEED_CEILING_KNOTS. */
  anomalyCeilingKn?: number
  /** Kalman-parametrar. /spara: standard. */
  kalman?: CvKalmanOptions
}

export type ReplayResult = {
  points: GpsPoint[]
  rejectedAccuracy: number
  rejectedAnomaly: number
  kalmanResets: number
  distanceNM: number
  avgSpeedKn: number
  maxSpeedKn: number
  quality: GpsQuality
}

/** gps_points-rad → RawFix. null om raden saknar rådata. */
export function rowToRawFix(row: {
  raw_latitude: number | null; raw_longitude: number | null; accuracy: number | null
  recorded_at: string; device_speed_knots: number | null; heading: number | null
}): RawFix | null {
  if (row.raw_latitude == null || row.raw_longitude == null) return null
  return {
    lat: row.raw_latitude, lng: row.raw_longitude,
    accuracyM: row.accuracy ?? 0, ts: Date.parse(row.recorded_at),
    deviceSpeedKn: row.device_speed_knots, heading: row.heading,
  }
}

export function replayTrack(fixes: RawFix[], opts: ReplayOptions = {}): ReplayResult {
  const maxAcc = opts.maxAccuracyM ?? 80
  const ceiling = opts.anomalyCeilingKn ?? SPEED_CEILING_KNOTS
  const resetAfterSeconds = opts.kalman?.resetAfterSeconds ?? 30
  const kalman = new CvGpsKalmanFilter(opts.kalman)

  const out: GpsPoint[] = []
  let rejectedAccuracy = 0, rejectedAnomaly = 0, kalmanResets = 0
  let lastRaw: { lat: number; lng: number; ts: number } | null = null
  let rawSpeedHist: number[] = []
  let lastAcceptedTs: number | null = null

  for (const f of fixes) {
    if (f.accuracyM > maxAcc) { rejectedAccuracy++; continue }
    if (lastRaw && isGpsAnomaly(lastRaw.lat, lastRaw.lng, lastRaw.ts, f.lat, f.lng, f.ts, ceiling)) {
      rejectedAnomaly++; continue
    }
    // Filtret startar om självt vid lucka > resetAfterSeconds; vi räknar det här.
    if (lastAcceptedTs != null && (f.ts - lastAcceptedTs) / 1000 > resetAfterSeconds) kalmanResets++

    const smoothed = kalman.update(f.lat, f.lng, f.accuracyM, f.ts)
    let speedKn = 0
    if (lastRaw) speedKn = msToKnots(smoothed.speedMs)
    else if (f.deviceSpeedKn != null && f.deviceSpeedKn >= 0) speedKn = f.deviceSpeedKn

    lastRaw = { lat: f.lat, lng: f.lng, ts: f.ts }
    lastAcceptedTs = f.ts

    const clean = cleanGpsSpeed(speedKn, f.accuracyM, rawSpeedHist.slice(-2), ceiling)
    rawSpeedHist = [...rawSpeedHist.slice(-1), Math.min(Math.max(speedKn, 0), ceiling)]

    out.push({
      lat: smoothed.lat, lng: smoothed.lng, speedKnots: clean,
      heading: f.heading, accuracy: f.accuracyM,
      recordedAt: new Date(f.ts).toISOString(),
      rawLat: f.lat, rawLng: f.lng, deviceSpeedKnots: f.deviceSpeedKn,
    })
  }

  return {
    points: out,
    rejectedAccuracy, rejectedAnomaly, kalmanResets,
    distanceNM: totalDistanceNM(out),
    avgSpeedKn: avgSpeedKnots(out),
    maxSpeedKn: maxSpeedKnots(out),
    quality: computeGpsQuality(out, { rejectedAccuracy, rejectedAnomaly, kalmanResets }),
  }
}
