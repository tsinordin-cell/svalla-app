/**
 * /api/adventure-photos?island=gotland|aland|oland
 *
 * Hämtar Google Places-foton för äventyrssidornas destinationer.
 * Returnerar { adventureId: proxied-foto-URL }.
 * Cachas 24h i CDN + 5 min i minne.
 */

import { type NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const revalidate = 3600

const PLACES_BASE = 'https://places.googleapis.com/v1'
const KEY = process.env.GOOGLE_PLACES_API_KEY

const ADVENTURE_QUERIES: Record<string, Array<{ id: number; query: string; lat: number; lng: number; r: number }>> = {
  gotland: [
    { id: 1,  query: 'Langhammars raukar Fårö Gotland',            lat: 57.938, lng: 19.087, r: 3000  },
    { id: 2,  query: 'Lummelunda grottan Gotland',                  lat: 57.741, lng: 18.437, r: 2000  },
    { id: 3,  query: 'Hoburgen fyr Gotland sydspets',               lat: 56.922, lng: 18.155, r: 3000  },
    { id: 4,  query: 'Digerhuvud raukar Fårö Gotland',              lat: 57.907, lng: 19.083, r: 3000  },
    { id: 5,  query: 'Gotlands vingård rosévin Klintehamn',         lat: 57.4,   lng: 18.2,   r: 20000 },
    { id: 6,  query: 'Visby ringmur medeltidsstaden Gotland',       lat: 57.634, lng: 18.296, r: 3000  },
    { id: 7,  query: 'Roma klosterruin Gotland',                    lat: 57.517, lng: 18.494, r: 2000  },
    { id: 8,  query: 'Tofta strand Gotland sandstrand',             lat: 57.567, lng: 18.197, r: 2000  },
    { id: 9,  query: 'Fårösund norra Gotland skärgård',             lat: 57.868, lng: 19.063, r: 5000  },
    { id: 10, query: 'Ljugarn Gotland östkust hamn',                lat: 57.398, lng: 18.714, r: 3000  },
  ],
  aland: [
    { id: 1,  query: 'Kastelholms slott Åland medeltid',            lat: 60.196, lng: 20.085, r: 2000  },
    { id: 2,  query: 'Bomarsund fästning ruin Åland',               lat: 60.192, lng: 20.249, r: 2000  },
    { id: 3,  query: 'Föglö ö Åland skärgård hamn',                 lat: 60.026, lng: 20.386, r: 5000  },
    { id: 4,  query: 'Kökar kyrka Åland yttre skärgård',            lat: 59.918, lng: 20.893, r: 5000  },
    { id: 5,  query: 'Ålands sjöfartsmuseum Pommern Mariehamn',     lat: 60.097, lng: 19.934, r: 1000  },
    { id: 6,  query: 'Lemland Åland natur åkrar kyrka',             lat: 60.043, lng: 20.037, r: 5000  },
    { id: 7,  query: 'Sunds kyrka Kastelholm Åland cykel',          lat: 60.185, lng: 20.114, r: 3000  },
    { id: 8,  query: 'Lembote strand Lemland Åland klippor',        lat: 60.025, lng: 20.058, r: 3000  },
    { id: 9,  query: 'Ålandstrafiken passagerarbåt skärgård Föglö', lat: 60.097, lng: 19.934, r: 30000 },
    { id: 10, query: 'Mariehamn Esplanaden lindallé Åland stad',    lat: 60.097, lng: 19.934, r: 1000  },
  ],
  oland: [
    { id: 1,  query: 'Långe Jan fyr Öland sydspets',                lat: 56.193, lng: 16.393, r: 3000  },
    { id: 2,  query: 'Eketorps fornborg järnålder Öland',           lat: 56.315, lng: 16.544, r: 1000  },
    { id: 3,  query: 'Borgholms slott ruin Öland',                  lat: 56.876, lng: 16.656, r: 1000  },
    { id: 4,  query: 'Trollskogen naturreservat bokskog norra Öland',lat: 57.249, lng: 17.076, r: 2000  },
    { id: 5,  query: 'Stora Alvaret Öland UNESCO stäpp orkidéer',   lat: 56.5,   lng: 16.5,   r: 20000 },
    { id: 6,  query: 'Byxelkrok hamn fiske norra Öland',            lat: 57.325, lng: 17.011, r: 2000  },
    { id: 7,  query: 'Mörbylånga Öland cykel UNESCO',               lat: 56.531, lng: 16.376, r: 3000  },
    { id: 8,  query: 'Borgholm stad centrum Öland',                 lat: 56.876, lng: 16.656, r: 2000  },
    { id: 9,  query: 'Borgholm hamn Öland sommar turister',         lat: 56.876, lng: 16.656, r: 1000  },
    { id: 10, query: 'Mörbylånga kvarn museum södra Öland',         lat: 56.531, lng: 16.376, r: 1000  },
  ],
}

const memCache: Record<string, { ts: number; data: Record<string, string> }> = {}
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

export async function GET(req: NextRequest) {
  const island = req.nextUrl.searchParams.get('island') ?? ''
  const queries = ADVENTURE_QUERIES[island]
  if (!queries) {
    return NextResponse.json({ error: 'Unknown island' }, { status: 400 })
  }

  const cached = memCache[island]
  if (cached && Date.now() - cached.ts < MEM_TTL) {
    return NextResponse.json(cached.data, {
      headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
    })
  }

  if (!KEY) {
    return NextResponse.json({}, { headers: { 'Cache-Control': 'public, s-maxage=3600' } })
  }

  const results = await Promise.allSettled(
    queries.map(({ query, lat, lng, r }) => fetchPhotoRef(query, lat, lng, r))
  )

  const photoMap: Record<string, string> = {}
  queries.forEach(({ id }, i) => {
    const r = results[i]
    if (r?.status === 'fulfilled' && r.value) {
      const encoded = Buffer.from(r.value, 'utf-8').toString('base64url')
      photoMap[String(id)] = `/api/places/photo/${encoded}?w=900`
    }
  })

  memCache[island] = { ts: Date.now(), data: photoMap }

  return NextResponse.json(photoMap, {
    headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600' },
  })
}
