// Uppspelning av en tur genom GPS-kedjan — från rådata till utjämnat spår.
//
// Varför: efter #245/#248 kunde inget fälttest räknas om. Nu när rådatan
// sparas (#249) kan en tur spelas upp genom exakt samma steg som /spara
// kör live, med vilka parametrar som helst, och jämföras med det sparade
// spåret. Varje filterändring blir därmed en jämförelse på befintliga
// turer i stället för ett nytt fälttest.
//
// Sedan 2026-09-10 är kedjan DELAD: /spara och replayTrack kör samma
// GpsPipeline (src/lib/gpsPipeline.ts). Före det speglades den här och
// speglingen bevisades stämma på tur 15b47ab2 (se gpsPipeline.test.ts).

import type { GpsPoint } from './gps'
import { tripDistanceNM, avgSpeedKnots } from './gps'
import type { CvKalmanOptions } from './kalman'
import { GpsPipeline, type RawFix } from './gpsPipeline'
import { computeGpsQuality, topSpeedKnots, type GpsQuality } from './gpsQuality'

export type { RawFix } from './gpsPipeline'

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

/**
 * Läser fixturformatet i src/lib/__fixtures__ (rader som börjar med # är
 * kommentarer; sedan "ms,lat*1e6,lng*1e6,kn*100,kurs,accuracy" skilda med ';').
 */
export function parseFixture(text: string, t0Ms: number): RawFix[] {
  const body = text.split('\n').filter(l => l && !l.startsWith('#')).join('')
  return body.split(';').filter(Boolean).map(r => {
    const [dt, la, lo, sp, hd, ac] = r.split(',').map(Number)
    return { ts: t0Ms + dt!, lat: la! / 1e6, lng: lo! / 1e6, deviceSpeedKn: sp! / 100, heading: hd!, accuracyM: ac! }
  })
}

export function replayTrack(fixes: RawFix[], opts: ReplayOptions = {}): ReplayResult {
  const pipeline = new GpsPipeline({
    maxAccuracyM: opts.maxAccuracyM, ceilingKn: opts.anomalyCeilingKn, kalman: opts.kalman,
  })
  const out: GpsPoint[] = []
  for (const f of fixes) {
    const p = pipeline.push(f)
    if (p) out.push(p)
  }
  const s = pipeline.stats
  return {
    points: out,
    rejectedAccuracy: s.rejectedAccuracy, rejectedAnomaly: s.rejectedAnomaly, kalmanResets: s.kalmanResets,
    distanceNM: tripDistanceNM(out),   // ∫Doppler-fart — samma som /spara sparar (beslut 2026-09-11)
    avgSpeedKn: avgSpeedKnots(out),
    maxSpeedKn: topSpeedKnots(out),   // samma definition som /spara sparar: bästa 10 s
    quality: computeGpsQuality(out, { rejectedAccuracy: s.rejectedAccuracy, rejectedAnomaly: s.rejectedAnomaly, kalmanResets: s.kalmanResets }),
  }
}
