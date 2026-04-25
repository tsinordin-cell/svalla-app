/**
 * Reverse-geocode lat/lng → mänskligt platsnamn.
 *
 * Använder Nominatim (OSM) — fritt men rate-limitat till 1 req/s enligt ToS.
 * Appens volym för delad position är låg (< 1/min på toppen), så direkt call
 * från klient är acceptabelt. Om det växer: flytta till /api/geocode med cache.
 *
 * Returnerar kortast möjliga igenkännbara namn:
 *  1. Närmaste sjöplats (hamn, ö, vik) om den hittas
 *  2. Annars ort/stadsdel
 *  3. Annars adress
 *  4. Null om allt går fel — vi visar koordinater som fallback
 */

type NominatimResult = {
  display_name?: string
  name?: string
  address?: {
    harbour?: string
    bay?: string
    island?: string
    islet?: string
    village?: string
    hamlet?: string
    town?: string
    suburb?: string
    neighbourhood?: string
    city?: string
    city_district?: string
    municipality?: string
    county?: string
    road?: string
  }
}

/** Plocka det mest sjöigenkännbara fältet. */
function pickName(r: NominatimResult): string | null {
  const a = r.address ?? {}
  const first =
    a.harbour    ??
    a.bay        ??
    a.island     ??
    a.islet      ??
    a.village    ??
    a.hamlet     ??
    a.suburb     ??
    a.neighbourhood ??
    a.town       ??
    a.city_district ??
    a.city       ??
    a.municipality ??
    r.name       ??
    a.road       ??
    null
  if (first) return first.trim()
  // Sista utväg: första komponenten av display_name
  if (r.display_name) {
    const first = r.display_name.split(',')[0]?.trim()
    if (first) return first
  }
  return null
}

export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = new URL('https://nominatim.openstreetmap.org/reverse')
    url.searchParams.set('format', 'jsonv2')
    url.searchParams.set('lat', lat.toFixed(6))
    url.searchParams.set('lon', lng.toFixed(6))
    url.searchParams.set('zoom', '14')      // skala: ort/stadsdel
    url.searchParams.set('accept-language', 'sv')
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 4000)
    const res = await fetch(url.toString(), { signal: ctrl.signal })
    clearTimeout(timer)
    if (!res.ok) return null
    const data = (await res.json()) as NominatimResult
    return pickName(data)
  } catch {
    return null
  }
}
