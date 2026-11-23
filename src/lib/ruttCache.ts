/**
 * Cachen för beräknade sjövägar i /api/route/calculate.
 *
 * Nyckeln är start och mål med 4 decimaler (≈ 11 m). Samma nyckel används för
 * minnescachen i lambdan och för att avgöra om databascachen på en sparad rutt
 * (planned_routes.cached_path) får läsas eller skrivas.
 *
 * Granskning 2026-11-22: databascachen skrevs för vilket routeId som helst,
 * med vägen för de koordinater som anroparen skickade. Den som hade länken till
 * en delad rutt kunde alltså spara en väg mellan två helt andra punkter på
 * rutten, och nästa besökare fick den ur cachen. Nu gäller databascachen bara
 * när anropets koordinater är ruttens egna.
 */

export function ruttCacheNyckel(slat: number, slng: number, elat: number, elng: number): string {
  return `${slat.toFixed(4)},${slng.toFixed(4)}→${elat.toFixed(4)},${elng.toFixed(4)}`
}

export type RuttKoordinater = {
  start_lat: number | null
  start_lng: number | null
  end_lat: number | null
  end_lng: number | null
}

/** Får databascachen på rutten användas för ett anrop med nyckeln `nyckel`? */
export function dbCacheGaller(nyckel: string, rutt: RuttKoordinater | null | undefined): boolean {
  if (!rutt) return false
  const { start_lat, start_lng, end_lat, end_lng } = rutt
  if (
    typeof start_lat !== 'number' || !Number.isFinite(start_lat) ||
    typeof start_lng !== 'number' || !Number.isFinite(start_lng) ||
    typeof end_lat !== 'number' || !Number.isFinite(end_lat) ||
    typeof end_lng !== 'number' || !Number.isFinite(end_lng)
  ) return false
  return ruttCacheNyckel(start_lat, start_lng, end_lat, end_lng) === nyckel
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
