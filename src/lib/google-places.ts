/**
 * Google Places API-helper.
 *
 * Vi använder NEW Places API (v1) — den nya versionen med field masks som
 * är billigare än legacy. Endpoints:
 *   - searchText: hitta plats från fritext + ungefärlig location
 *   - placeDetails: hämta full info via Place ID
 *   - photoMedia: hämta bild-binär via photo reference
 *
 * KRITISKT om kostnad:
 * Field masks bestämmer vilka fält du betalar för. Inte alla fält kostar lika
 * mycket. Vi grupperar fields i "billiga" och "dyra":
 *   - Basic (FREE):    id, displayName, types, location, formattedAddress
 *   - Contact (~$3/1000):  phoneNumber, websiteUri, regularOpeningHours
 *   - Atmosphere (~$5/1000): rating, userRatingCount, priceLevel, photos
 *
 * För backfill av 288 platser × Atmosphere fields = ~$2.30. Inom free tier.
 */

const PLACES_BASE = 'https://places.googleapis.com/v1'

export interface GooglePlace {
  id: string                    // Place ID
  displayName: { text: string }
  formattedAddress?: string
  location?: { latitude: number; longitude: number }
  internationalPhoneNumber?: string
  nationalPhoneNumber?: string
  websiteUri?: string
  regularOpeningHours?: {
    openNow?: boolean
    weekdayDescriptions?: string[]
    periods?: Array<{
      open: { day: number; hour: number; minute: number }
      close?: { day: number; hour: number; minute: number }
    }>
  }
  rating?: number
  userRatingCount?: number
  priceLevel?: 'PRICE_LEVEL_FREE' | 'PRICE_LEVEL_INEXPENSIVE' | 'PRICE_LEVEL_MODERATE' | 'PRICE_LEVEL_EXPENSIVE' | 'PRICE_LEVEL_VERY_EXPENSIVE'
  photos?: Array<{
    name: string                // photo resource name (används med photoMedia endpoint)
    widthPx: number
    heightPx: number
    authorAttributions?: Array<{ displayName: string; uri: string }>
  }>
  types?: string[]
}

// Field mask — exakt vad vi vill ha tillbaka. Mindre fält = lägre kostnad.
const PLACE_FIELDS = [
  'id',
  'displayName',
  'formattedAddress',
  'location',
  'internationalPhoneNumber',
  'nationalPhoneNumber',
  'websiteUri',
  'regularOpeningHours',
  'rating',
  'userRatingCount',
  'priceLevel',
  'photos',
  'types',
].join(',')

/**
 * Search Text — hitta en plats från ungefärligt namn + lat/lng.
 * Används i backfill-scriptet för att hitta Google Place ID för befintliga platser.
 *
 * Cost: $32/1000 för Text Search. Vi gör det EN GÅNG per plats, sen lagrar
 * vi Place ID och slipper söka igen.
 */
export async function findPlaceByText(
  query: string,
  near: { lat: number; lng: number; radiusMeters?: number },
  apiKey: string,
): Promise<GooglePlace | null> {
  const url = `${PLACES_BASE}/places:searchText`
  const body = {
    textQuery: query,
    languageCode: 'sv',
    regionCode: 'se',
    locationBias: {
      circle: {
        center: { latitude: near.lat, longitude: near.lng },
        radius: near.radiusMeters ?? 500,
      },
    },
    maxResultCount: 1,
  }
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': `places.${PLACE_FIELDS.split(',').join(',places.')}`,
    },
    body: JSON.stringify(body),
  })
  if (!r.ok) {
    const text = await r.text().catch(() => '')
    throw new Error(`Google Places searchText failed: ${r.status} ${text.slice(0, 200)}`)
  }
  const data = await r.json() as { places?: GooglePlace[] }
  return data.places?.[0] ?? null
}

/**
 * Place Details — refetch full info för en känd Place ID.
 * Används månadsvis för att uppdatera ratings/photos.
 *
 * Cost: ~$5/1000 med våra field masks.
 */
export async function getPlaceDetails(
  placeId: string,
  apiKey: string,
): Promise<GooglePlace> {
  const url = `${PLACES_BASE}/places/${placeId}`
  const r = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': PLACE_FIELDS,
    },
  })
  if (!r.ok) {
    const text = await r.text().catch(() => '')
    throw new Error(`Google Places details failed: ${r.status} ${text.slice(0, 200)}`)
  }
  return r.json() as Promise<GooglePlace>
}

/**
 * Hämta foto-URL via photo resource name.
 * Returnerar redirect-URL till Google CDN — du kan följa URL:en eller proxy:a
 * den till Supabase Storage för att slippa fetch-kostnad per pageview.
 *
 * Cost: $7/1000 photo media requests.
 */
export function buildPhotoUrl(
  photoName: string,
  apiKey: string,
  maxWidthPx = 1200,
): string {
  return `${PLACES_BASE}/${photoName}/media?maxWidthPx=${maxWidthPx}&key=${apiKey}`
}

/**
 * Distance i meter mellan två koord-par (Haversine).
 * Används för att flagga koord-mismatches >50m så admin kan godkänna manuellt.
 */
export function distanceMeters(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6_371_000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const x = Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}
