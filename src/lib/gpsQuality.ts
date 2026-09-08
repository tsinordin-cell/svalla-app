// Kvalitetssiffror per tur — det som gör att vi VET om GPS-kedjan blir
// bättre, i stället för att gissa efter varje fälttest.
//
// Bakgrund (beslut 2026-09-06, Tom: "kör"): efter fälttesten i bil fanns
// bara "distansen stämde inte" att gå på. Inget om hur många fixar som kom,
// hur många som kastades, hur dålig accuracy var eller hur långa luckorna
// var. De siffrorna beräknas här, ur punkterna som redan finns, och sparas
// i trips.gps_quality (jsonb, migration 20260906000002) vid Spara.
//
// Ren funktion. Inga klockor, ingen React, ingen Supabase. Testad i
// gpsQuality.test.ts. Allt är mätt ur punkterna — inget är tolkning.

import type { GpsPoint } from './gps'
import { distanceNM } from './gps'

export type GpsQuality = {
  /** Version av beräkningen — höj när fält byter betydelse. */
  v: 1
  /** Sparade (accepterade) punkter. */
  points: number
  /** Kastade för accuracy > 80 m (räknas i /spara, före gaten). */
  rejectedAccuracy: number
  /** Kastade av anomaligrinden (råfart över SPEED_CEILING_KNOTS). */
  rejectedAnomaly: number
  /** Andel kastade av alla inkomna fixar, 0–100. */
  rejectedPct: number
  /** Antal gånger Kalman-filtret startade om (lucka > 30 s). */
  kalmanResets: number
  /** Accuracy (m) över sparade punkter. */
  accuracyMeanM: number
  accuracyMedianM: number
  accuracyP95M: number
  /** Längsta tid mellan två sparade punkter, sekunder. */
  gapMaxS: number
  /** Antal luckor > 10 s. */
  gapsOver10s: number
  /** Medelintervall mellan punkter, sekunder (1,0 = 1 Hz). */
  intervalMeanS: number
  /** Tid från första till sista sparade punkt, sekunder. */
  spanS: number
  /** Andel punkter som har rådata (raw_latitude), 0–100. Före migrationen: 0. */
  rawPct: number
  /** Medelavstånd (m) mellan rå fix och utjämnat läge — hur mycket filtret flyttar. null utan rådata. */
  rawOffsetMeanM: number | null
  /** Andel punkter där enheten själv gav en fart, 0–100. */
  deviceSpeedPct: number
  /** Toppfart som max av enskilda punkter (det /tur visar i dag). */
  maxSpeed1pKn: number
  /** Toppfart som bästa rullande 10-sekundersmedel — det Strava/Garmin visar. */
  maxSpeed10sKn: number
  /** Distans längs det sparade (utjämnade) spåret, NM. */
  distanceSmoothedNM: number
  /** Distans längs råspåret, NM. null utan rådata. */
  distanceRawNM: number | null
}

export type GpsQualityInput = {
  rejectedAccuracy?: number
  rejectedAnomaly?: number
  kalmanResets?: number
}

function r1(n: number): number { return Math.round(n * 10) / 10 }
function r2(n: number): number { return Math.round(n * 100) / 100 }

function percentile(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil(p * sorted.length) - 1))
  return sorted[idx]!
}

/** Meter mellan två koordinater (haversine via distanceNM). */
export function metersBetween(lat1: number, lng1: number, lat2: number, lng2: number): number {
  return distanceNM(lat1, lng1, lat2, lng2) * 1852
}

/**
 * Bästa rullande medelfart över ett tidsfönster (sekunder), i knop.
 * Fönstret glider över punkternas tidsstämplar; medel viktas inte —
 * punkter kommer ~1 Hz så det räcker. Kräver ≥ 2 punkter i fönstret,
 * annars faller det tillbaka på max av enskilda punkter.
 */
export function bestWindowSpeedKn(points: GpsPoint[], windowS: number): number {
  if (points.length === 0) return 0
  const ts = points.map(p => Date.parse(p.recordedAt))
  let best = 0
  let j = 0
  let sum = 0
  for (let i = 0; i < points.length; i++) {
    sum += points[i]!.speedKnots
    while (ts[i]! - ts[j]! > windowS * 1000) { sum -= points[j]!.speedKnots; j++ }
    const n = i - j + 1
    if (n >= 2) best = Math.max(best, sum / n)
  }
  if (best === 0) best = Math.max(...points.map(p => p.speedKnots), 0)
  return best
}

export function computeGpsQuality(points: GpsPoint[], input: GpsQualityInput = {}): GpsQuality {
  const rejectedAccuracy = input.rejectedAccuracy ?? 0
  const rejectedAnomaly = input.rejectedAnomaly ?? 0
  const kalmanResets = input.kalmanResets ?? 0
  const n = points.length
  const incoming = n + rejectedAccuracy + rejectedAnomaly

  const acc = points.map(p => p.accuracy).filter(a => Number.isFinite(a)).sort((a, b) => a - b)
  const accMean = acc.length ? acc.reduce((a, b) => a + b, 0) / acc.length : 0

  const ts = points.map(p => Date.parse(p.recordedAt))
  let gapMax = 0, gapsOver10 = 0, gapSum = 0
  for (let i = 1; i < n; i++) {
    const g = (ts[i]! - ts[i - 1]!) / 1000
    gapSum += g
    if (g > gapMax) gapMax = g
    if (g > 10) gapsOver10++
  }
  const spanS = n >= 2 ? (ts[n - 1]! - ts[0]!) / 1000 : 0

  const withRaw = points.filter(p => p.rawLat != null && p.rawLng != null)
  let rawOffsetMean: number | null = null
  let distanceRaw: number | null = null
  if (withRaw.length > 0) {
    rawOffsetMean = withRaw.reduce((s, p) => s + metersBetween(p.lat, p.lng, p.rawLat!, p.rawLng!), 0) / withRaw.length
    let d = 0
    for (let i = 1; i < withRaw.length; i++) {
      d += distanceNM(withRaw[i - 1]!.rawLat!, withRaw[i - 1]!.rawLng!, withRaw[i]!.rawLat!, withRaw[i]!.rawLng!)
    }
    distanceRaw = d
  }
  let distSmoothed = 0
  for (let i = 1; i < n; i++) {
    distSmoothed += distanceNM(points[i - 1]!.lat, points[i - 1]!.lng, points[i]!.lat, points[i]!.lng)
  }
  const withDeviceSpeed = points.filter(p => p.deviceSpeedKnots != null).length

  return {
    v: 1,
    points: n,
    rejectedAccuracy,
    rejectedAnomaly,
    rejectedPct: incoming > 0 ? r1(100 * (rejectedAccuracy + rejectedAnomaly) / incoming) : 0,
    kalmanResets,
    accuracyMeanM: r1(accMean),
    accuracyMedianM: r1(percentile(acc, 0.5)),
    accuracyP95M: r1(percentile(acc, 0.95)),
    gapMaxS: r1(gapMax),
    gapsOver10s: gapsOver10,
    intervalMeanS: n >= 2 ? r2(gapSum / (n - 1)) : 0,
    spanS: Math.round(spanS),
    rawPct: n > 0 ? r1(100 * withRaw.length / n) : 0,
    rawOffsetMeanM: rawOffsetMean == null ? null : r1(rawOffsetMean),
    deviceSpeedPct: n > 0 ? r1(100 * withDeviceSpeed / n) : 0,
    maxSpeed1pKn: r1(Math.max(0, ...points.map(p => p.speedKnots))),
    maxSpeed10sKn: r1(bestWindowSpeedKn(points, 10)),
    distanceSmoothedNM: r2(distSmoothed),
    distanceRawNM: distanceRaw == null ? null : r2(distanceRaw),
  }
}
