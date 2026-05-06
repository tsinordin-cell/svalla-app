/**
 * /api/landing-photos
 *
 * Hämtar Google Places-foton för landningssidans kortavsnitt.
 * Returnerar en karta  {key → proxied-foto-URL}.
 *
 * Cachas 24h i CDN + 5 min i minne → minimala Google API-kostnader.
 */

import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLACES_BASE = 'https://places.googleapis.com/v1'
const KEY = process.env.GOOGLE_PLACES_API_KEY

const PLACES_TO_FETCH = [
  { key: 'grinda',              query: 'Grinda ö Stockholms skärgård',        lat: 59.474, lng: 18.782, r: 3000  },
  { key: 'sandhamn',            query: 'Sandhamn ö Stockholms skärgård',      lat: 59.289, lng: 18.912, r: 3000  },
  { key: 'uto',                 query: 'Utö ö Stockholms södra skärgård',     lat: 58.959, lng: 17.927, r: 4000  },
  { key: 'fjaderholmarna',      query: 'Fjäderholmarna Stockholm',            lat: 59.323, lng: 18.113, r: 2000  },
  { key: 'kajak',               query: 'Kayaking Stockholm archipelago sea',  lat: 59.35,  lng: 18.5,   r: 20000 },
  { key: 'innerskargard',       query: 'Vaxholm stad skärgård',               lat: 59.402, lng: 18.352, r: 2000  },
  { key: 'mellersta',           query: 'Möja ö Stockholms skärgård',          lat: 59.48,  lng: 18.72,  r: 3000  },
  { key: 'sodra',               query: 'Utö södra skärgården naturreservat',  lat: 58.959, lng: 17.927, r: 4000  },
  { key: 'norra',               query: 'Arholma norra skärgård Stockholm',    lat: 59.848, lng: 19.147, r: 3000  },
  { key: 'stockholms-skargard', query: 'Stockholms skärgård sommar',          lat: 59.35,  lng: 18.7,   r: 40000 },
  { key: 'badplatser',          query: 'Badplats klippor Stockholms skärgård',lat: 59.4,   lng: 18.6,   r: 30000 },
]

let memCache: { ts: number; data: Record<string, string> } | null = null
const MEM_TTL = 5 * 60 * 1000

async function fetchPhotoRef(query: string, lat: number, lng: number, r: number): Promise<string | null> {
  if (!KEY) return null
  try {
    const res = await fetch(`${PLACES_BASE}/places:searchText`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': KEY,
        'X-Goog-FieldMask': 'places.photos',
      },
      body: JSON.stringify({
        textQuery: query,
        languageCode: 'sv',
        regionCode: 'se',
        locationBias: { circle: { center: { latitude: lat, longitude: lng }, radius: r } },
        maxResultCount: 1,
      }),
    })
    if (!res.ok) return null
    const data = await res.json() as { places?: Array<{ photos?: Array<{ name: string }> }> }
    return data.places?.[0]?.photos?.[0]?.name ?? null
  } catch {
    return null
  }
}

export async function GET(_req: NextRequest) {
  if (memCache && Date.now() - memCache.ts < MEM_TTL) {
    return NextResponse.json(memCache.data, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
    })
  }

  if (!KEY) {
    return NextResponse.json({}, { headers: { 'Cache-Control': 'public, s-maxage=3600' } })
  }

  const results = await Promise.allSettled(
    PLACES_TO_FETCH.map(({ query, lat, lng, r }) => fetchPhotoRef(query, lat, lng, r))
  )

  const photoMap: Record<string, string> = {}
  PLACES_TO_FETCH.forEach(({ key }, i) => {
    const r = results[i]
    if (r.status === 'fulfilled' && r.value) {
      const encoded = Buffer.from(r.value, 'utf-8').toString('base64url')
      photoMap[key] = `/api/places/photo/${encoded}?w=800`
    }
  })

  memCache = { ts: Date.now(), data: photoMap }

  return NextResponse.json(photoMap, {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
  })
}
