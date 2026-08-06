/**
 * landingPhotos.ts — Google Places-foton för startsidans kort.
 *
 * 2026-08-05: flyttad hit ur API-routen. Startsidan hämtade tidigare sitt EGET
 * API över HTTP under bygget:
 *
 *     fetch(`${process.env.VERCEL_URL}/api/landing-photos`, { next: { revalidate: 3600 } })
 *
 * Det gav tre fel på en gång. Bygget blev beroende av att appen redan svarade
 * över nätet, av att bas-URL:en gissades rätt, och av Next datacache — som
 * ÖVERLEVER DEPLOYER. När Google slutade svara bakades {} in i cachen, och ett
 * nytt bygge hämtade samma tomma svar ur cachen i stället för att fråga Google
 * igen. Startsidan låg därför kvar tom även efter att Google var åtgärdat och
 * API:t bevisligen svarade med 19 foton.
 *
 * Nu anropas funktionen direkt i serverkomponenten. Ingen HTTP, ingen
 * bas-URL, ingen cache av en cache. API-routen finns kvar och använder samma
 * funktion, för andra konsumenter.
 */



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
  // Nya regioner
  { key: 'bohuslan',            query: 'Smögen Bohuslän klippor hav sommar',  lat: 58.35,  lng: 11.22,  r: 20000 },
  { key: 'gotland',             query: 'Visby Gotland medeltidsmur hamn',     lat: 57.634, lng: 18.296, r: 15000 },
  { key: 'aland',               query: 'Mariehamn Åland skärgård sommar',    lat: 60.097, lng: 19.934, r: 20000 },
  { key: 'oland',               query: 'Borgholm Öland slott kust sommar',   lat: 56.879, lng: 16.656, r: 20000 },
  { key: 'blekinge',            query: 'Karlskrona skärgård Hanö sommar hav',lat: 56.161, lng: 15.586, r: 25000 },
  { key: 'vasterhav',           query: 'Kosteröarna Västerhavet klippor hav', lat: 58.883, lng: 11.017, r: 25000 },
  { key: 'hogakusten',          query: 'Höga Kusten Ångermanland klippor fjord sommar', lat: 62.9,  lng: 18.2,  r: 30000 },
  { key: 'halland',             query: 'Varberg Halland kust strand sommar hav',        lat: 56.9,  lng: 12.5,  r: 40000 },
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
    if (!res.ok) {
      // 2026-08-05: den här grenen returnerade tyst null. Följden blev att
      // startsidans 39 kort stod tomma i okänd tid utan ett enda spår i
      // loggarna — de visade bara "200 cache=HIT". Nu syns orsaken.
      const kropp = await res.text().catch(() => '')
      console.error('[landing-photos] Google svarade', res.status, 'för', query, '·', kropp.slice(0, 300))
      return null
    }
    const data = await res.json() as { places?: Array<{ photos?: Array<{ name: string }> }> }
    const namn = data.places?.[0]?.photos?.[0]?.name ?? null
    if (!namn) console.warn('[landing-photos] inget foto i svaret för', query)
    return namn
  } catch (e) {
    console.error('[landing-photos] anrop kastade för', query, '·', String(e).slice(0, 200))
    return null
  }
}


/** Hämtar fotokartan. Tom karta = misslyckande, se anroparens cache-logik. */
export async function getLandingPhotos(): Promise<Record<string, string>> {
  if (memCache && Date.now() - memCache.ts < MEM_TTL) return memCache.data

  if (!KEY) {
    console.error('[landing-photos] GOOGLE_PLACES_API_KEY saknas i miljön')
    return {}
  }

  const results = await Promise.allSettled(
    PLACES_TO_FETCH.map(({ query, lat, lng, r }) => fetchPhotoRef(query, lat, lng, r))
  )

  const photoMap: Record<string, string> = {}
  PLACES_TO_FETCH.forEach(({ key }, i) => {
    const r = results[i]
    if (r && r.status === 'fulfilled' && r.value) {
      const encoded = Buffer.from(r.value, 'utf-8').toString('base64url')
      photoMap[key] = `/api/places/photo/${encoded}?w=800`
    }
  })

  if (Object.keys(photoMap).length === 0) {
    console.error('[landing-photos] TOMT resultat —', PLACES_TO_FETCH.length, 'förfrågningar gav noll foton')
    return photoMap
  }

  memCache = { ts: Date.now(), data: photoMap }
  return photoMap
}
