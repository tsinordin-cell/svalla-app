/**
 * coordValidation.ts — runtime-skydd mot felplacerade markörer
 *
 * Används före varje INSERT/UPDATE av lat/lng till Supabase eller
 * intern state. Kastar fel om koord ligger utanför Stockholms skärgård.
 *
 * Filosofi: hellre BLOCKERA en fel insättning än att en restaurang
 * hamnar i Åboland eller i Östersjön.
 */

// Stockholms skärgård — generös bbox (täcker Roslagen + Södertörn)
export const ARCHIPELAGO_BOUNDS = {
  minLat: 58.6,  // söder om Landsort
  maxLat: 60.0,  // norr om Arholma
  minLng: 17.0,  // väster om Mörkö
  maxLng: 19.6,  // öster om Söderarm/Rödlöga
} as const

/**
 * True om koord ligger inom Stockholms skärgård bounding box.
 * Används för stränga validerings-flöden (INSERT/UPDATE).
 */
export function isInArchipelago(lat: number, lng: number): boolean {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return false
  if (lat === 0 && lng === 0) return false  // Null Island
  return (
    lat >= ARCHIPELAGO_BOUNDS.minLat &&
    lat <= ARCHIPELAGO_BOUNDS.maxLat &&
    lng >= ARCHIPELAGO_BOUNDS.minLng &&
    lng <= ARCHIPELAGO_BOUNDS.maxLng
  )
}

/**
 * Klassificerar varför en koord ligger utanför skärgården.
 * Bra för felmeddelanden så användaren förstår vad som är fel.
 */
export function classifyCoordError(lat: number, lng: number): string {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return 'Ogiltig koordinat (inte ett tal)'
  }
  if (lat === 0 && lng === 0) return 'Null Island — koordinat saknas'
  if (lng > 21) return 'Hamnar i Åbolands skärgård (Finland)'
  if (lng < 12 && lat > 58) return 'Hamnar på västkusten eller Norge'
  if (lat < 58.6) return 'För långt söderut (Småland eller Östersjön)'
  if (lat > 60.0) return 'För långt norrut (Bottenhavet)'
  if (lng < 17.0) return 'För långt väster (inland eller Mälaren)'
  if (lng > 19.6) return 'För långt öster (öppet hav)'
  return 'Utanför Stockholms skärgård'
}

/**
 * Kastar ett fel om koord ligger utanför skärgården.
 * Används före Supabase INSERT/UPDATE där vi vet att vi sparar
 * skärgårdsdata (restaurang, brygga, krog osv).
 */
export class InvalidCoordError extends Error {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
    public readonly reason: string,
  ) {
    super(`Felaktig koordinat ${lat},${lng}: ${reason}`)
    this.name = 'InvalidCoordError'
  }
}

export function assertInArchipelago(
  lat: number,
  lng: number,
  context = 'koordinat',
): void {
  if (!isInArchipelago(lat, lng)) {
    const reason = classifyCoordError(lat, lng)
    throw new InvalidCoordError(lat, lng, `${context} — ${reason}`)
  }
}

/**
 * Snäll variant: returnerar antingen { ok: true } eller { ok: false, reason }.
 * Använd när du inte vill kasta fel utan rapportera till UI istället.
 */
export type CoordCheckResult =
  | { ok: true }
  | { ok: false; reason: string; lat: number; lng: number }

export function checkCoord(lat: number, lng: number): CoordCheckResult {
  if (isInArchipelago(lat, lng)) return { ok: true }
  return { ok: false, reason: classifyCoordError(lat, lng), lat, lng }
}

/**
 * Rensa en lat/lng-input från användare (t.ex. paste från Google Maps URL).
 * Hanterar:
 *   - "59.3293, 18.0686"
 *   - "59°17'18.2\"N 18°04'02.4\"E"
 *   - { lat: 59.3, lng: 18.0 }
 *
 * Returnerar null om inget kunde tolkas eller om resultatet hamnar utanför
 * skärgården.
 */
export function parseCoordString(input: string): { lat: number; lng: number } | null {
  const trimmed = input.trim()

  // Format: "lat, lng" eller "lat lng"
  const decimal = trimmed.match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/)
  if (decimal) {
    const lat = parseFloat(decimal[1]!)
    const lng = parseFloat(decimal[2]!)
    if (isInArchipelago(lat, lng)) return { lat, lng }
    // Prova omvänd ordning (lng, lat) — vanligt fel
    if (isInArchipelago(lng, lat)) return { lat: lng, lng: lat }
    return null
  }

  // Format: DMS — "59°17'18.2"N 18°04'02.4"E"
  const dms = trimmed.match(
    /(\d+)°(\d+)['′](\d+\.?\d*)["″]?\s*([NS])\s+(\d+)°(\d+)['′](\d+\.?\d*)["″]?\s*([EW])/i
  )
  if (dms) {
    const lat = (parseInt(dms[1]!) + parseInt(dms[2]!) / 60 + parseFloat(dms[3]!) / 3600) *
                (dms[4]!.toUpperCase() === 'S' ? -1 : 1)
    const lng = (parseInt(dms[5]!) + parseInt(dms[6]!) / 60 + parseFloat(dms[7]!) / 3600) *
                (dms[8]!.toUpperCase() === 'W' ? -1 : 1)
    if (isInArchipelago(lat, lng)) return { lat, lng }
    return null
  }

  return null
}
