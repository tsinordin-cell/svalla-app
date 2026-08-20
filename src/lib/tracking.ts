/**
 * tracking.ts — ren, testbar spårningslogik uruten ur /spara (Arkitekten
 * steg 1, GPS-prompten 2026-08-16; utbruten 2026-08-19).
 *
 * Allt här är rena funktioner utan React, utan Supabase och utan klockor —
 * tid och omgivning skickas in som argument. Det är det som gör dem
 * testbara, och testerna nedanför låser fälttestbuggarna från 19/8 så de
 * inte kan komma tillbaka.
 */
import type { GpsPoint } from './gps'

/**
 * En gräns för orimlig fart, använd överallt (fälttest 19/8): tidigare
 * kastade isGpsAnomaly punkter över 45 kn medan visningen klippte vid 30 —
 * två olika sanningar. 60 täcker RIB och racerbåt med marginal.
 */
export const SPEED_CEILING_KNOTS = 60

/**
 * Hastighets-rensning — GPS Doppler ger ofta skräp i kall start och tätort.
 * 1) Tak SPEED_CEILING_KNOTS (samma gräns som anomaligrinden).
 * 2) Dålig accuracy (>30 m) → 0: hellre tomt än fel.
 * 3) Median av senaste 3 — eliminerar enstaka spikar utan att fördröja
 *    äkta accelerationer.
 *
 * @param recentSpeeds de senaste (högst 2) redan rensade farterna, äldst först
 */
export function cleanGpsSpeed(
  rawSpeedKnots: number,
  accuracyMeters: number,
  recentSpeeds: number[],
  ceiling: number = SPEED_CEILING_KNOTS,
): number {
  const capped = Math.min(Math.max(rawSpeedKnots, 0), ceiling)
  if (accuracyMeters > 30) return 0
  const window = [...recentSpeeds.slice(-2), capped]
  if (window.length < 3) return capped
  const sorted = [...window].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)]!
}

/**
 * Hur mycket väggtid som får läggas till timern vid recovery.
 *
 * Fälttest 19/8 (Tom): recovery adderade ALL väggtid sedan snapshoten —
 * en tur på 19 min visades som 18 h 47 min efter en natt med död telefon.
 * Död tid är inte spårningstid: vi lägger högst till `capSeconds`
 * (glappet vid en vanlig webbläsarkrasch).
 */
export function recoveryExtraSeconds(
  savedAtIso: string,
  nowMs: number,
  capSeconds: number = 60,
): number {
  const gap = Math.round((nowMs - new Date(savedAtIso).getTime()) / 1000)
  return Math.min(Math.max(gap, 0), capSeconds)
}

/** Rå rad ur gps_points så som Supabase returnerar den. */
export type ServerGpsRow = {
  latitude: number
  longitude: number
  speed_knots: number | null
  heading: number | null
  accuracy: number | null
  recorded_at: string | null
}

/**
 * Slå ihop lokala buffertpunkter med serverns (strömning steg 2 rensar
 * synkade punkter ur bufferten — bufferten ensam är ett stympat spår).
 * Dedupe på recordedAt, bufferten vinner; sorterat på tid.
 */
export function mergeRecoveredPoints(
  buffer: GpsPoint[],
  serverRows: ServerGpsRow[],
): GpsPoint[] {
  const seen = new Set(buffer.map(p => p.recordedAt))
  const fromServer: GpsPoint[] = serverRows
    .filter((p): p is ServerGpsRow & { recorded_at: string } =>
      Boolean(p?.recorded_at) && !seen.has(p.recorded_at as string))
    .map(p => ({
      lat: p.latitude,
      lng: p.longitude,
      speedKnots: p.speed_knots ?? 0,
      heading: p.heading ?? null,
      accuracy: p.accuracy ?? 0,
      recordedAt: p.recorded_at,
    }))
  return [...fromServer, ...buffer]
    .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
}
