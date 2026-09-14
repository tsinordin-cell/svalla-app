// Delsträckor, fartserie och rörelsetid ur sparade punkter — ren logik för
// /tur (beslut 2026-09-10, "det synliga": fartkurva + delsträckor).
//
// Allt räknas ur gps_points som redan finns. Ingen ny data, ingen tolkning:
// fart per delsträcka = sträcka / tid, ingenting annat.

import type { GpsPoint } from './gps'
import { distanceNM } from './gps'

export type Split = {
  /** 1-baserat löpnummer */
  index: number
  /** Delsträckans längd i NM (sista kan vara kortare) */
  distanceNM: number
  /** Tid för delsträckan, sekunder */
  seconds: number
  /** Snittfart = distans / tid */
  avgKnots: number
  /** Högsta punktfart inom delsträckan */
  maxKnots: number
  /** Sekunder från turens första punkt när delsträckan slutar */
  endOffsetS: number
}

/**
 * Delsträckor om `splitNM` sjömil (standard 1). Sista delsträckan tas med
 * om den är minst 10 % av en hel. Luckor i tiden räknas som tid — en
 * delsträcka som spänner över en paus får låg snittfart, vilket är sant.
 */
export function computeSplits(points: GpsPoint[], splitNM = 1): Split[] {
  if (points.length < 2) return []
  const t0 = Date.parse(points[0]!.recordedAt)
  const out: Split[] = []
  let acc = 0
  let segStartTs = t0
  let segMax = points[0]!.speedKnots
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!, b = points[i]!
    const d = distanceNM(a.lat, a.lng, b.lat, b.lng)
    if (b.speedKnots > segMax) segMax = b.speedKnots
    if (acc + d < splitNM) { acc += d; continue }
    // Segmentet korsar en eller flera gränser (ett långt segment — t.ex. en
    // lucka i inspelningen — kan spänna över flera NM). Tiden interpoleras
    // linjärt inom segmentet för varje gräns; luckans tid fördelas då jämnt
    // över de delsträckor den täcker.
    const ta = Date.parse(a.recordedAt), tb = Date.parse(b.recordedAt)
    let done = 0   // NM av detta segment som redan bokförts
    while (acc + (d - done) >= splitNM) {
      const need = splitNM - acc
      done += need
      const tCross = d > 0 ? ta + (tb - ta) * (done / d) : tb
      const seconds = Math.max(1, (tCross - segStartTs) / 1000)
      out.push({
        index: out.length + 1, distanceNM: splitNM, seconds: Math.round(seconds),
        avgKnots: round1(splitNM / (seconds / 3600)), maxKnots: round1(segMax),
        endOffsetS: Math.round((tCross - t0) / 1000),
      })
      segStartTs = tCross
      acc = 0
      segMax = b.speedKnots
    }
    acc = d - done
  }
  const lastTs = Date.parse(points[points.length - 1]!.recordedAt)
  const restS = (lastTs - segStartTs) / 1000
  if (acc >= splitNM * 0.1 && restS >= 1) {
    out.push({
      index: out.length + 1, distanceNM: round2(acc), seconds: Math.round(restS),
      avgKnots: round1(acc / (restS / 3600)), maxKnots: round1(segMax),
      endOffsetS: Math.round((lastTs - t0) / 1000),
    })
  }
  return out
}

export type SpeedSample = { /** sekunder från start */ t: number; kn: number }

/**
 * Fart över tid, medel per `bucketS` sekunder. Luckor > `gapS` bryts med
 * ett null så att kurvan inte drar ett streck över en paus.
 */
export function speedSeries(points: GpsPoint[], bucketS = 5, gapS = 60): (SpeedSample | null)[] {
  if (points.length === 0) return []
  const t0 = Date.parse(points[0]!.recordedAt)
  const out: (SpeedSample | null)[] = []
  let bucket = -1, sum = 0, n = 0, lastTs = t0
  for (const p of points) {
    const ts = Date.parse(p.recordedAt)
    if ((ts - lastTs) / 1000 > gapS) {
      if (n > 0) { out.push({ t: bucket * bucketS, kn: round1(sum / n) }); sum = 0; n = 0 }
      out.push(null)
      bucket = -1
    }
    lastTs = ts
    const b = Math.floor((ts - t0) / 1000 / bucketS)
    if (b !== bucket) {
      if (n > 0) out.push({ t: bucket * bucketS, kn: round1(sum / n) })
      bucket = b; sum = 0; n = 0
    }
    sum += p.speedKnots; n++
  }
  if (n > 0) out.push({ t: bucket * bucketS, kn: round1(sum / n) })
  return out
}

/** Rörelsetid bor i gps.ts sedan 2026-09-11 (delas med snittfarten). */
export { movingSeconds } from './gps'

function round1(n: number) { return Math.round(n * 10) / 10 }
function round2(n: number) { return Math.round(n * 100) / 100 }

/**
 * Turens längd i sekunder för visning. duration_seconds (sedan 2026-09-10)
 * vinner. Äldre turer: ended_at − started_at om det stämmer med den
 * avrundade minuten (±90 s) — då är det samma mätning med sekunder — annars
 * duration × 60 (klockspannet kan innehålla pauser eller en natt med död
 * telefon, se recoveryExtraSeconds).
 */
export function resolveDurationSeconds(t: {
  duration_seconds?: number | null; duration?: number | null
  started_at?: string | null; ended_at?: string | null
}): number {
  if (t.duration_seconds != null && t.duration_seconds > 0) return Math.round(t.duration_seconds)
  const min = (t.duration ?? 0) * 60
  if (t.started_at && t.ended_at) {
    const span = Math.round((Date.parse(t.ended_at) - Date.parse(t.started_at)) / 1000)
    if (span > 0 && Math.abs(span - min) <= 90) return span
  }
  return min
}
