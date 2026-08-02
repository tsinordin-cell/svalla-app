/**
 * POST /api/admin/refresh-place-photos?offset=0[&dry=1][&limit=N]
 *
 * Hämtar FÄRSKA foto-referenser från Google Places (New) och skriver om
 * restaurants.google_photo_refs.
 *
 * BAKGRUND (2026-08-01)
 * Samtliga platsfoton på sajten slutade fungera. Skanning av alla 699
 * /upptack/-sidor: av 571 sidor med Google-foton fungerade NOLL. Google
 * svarade 400 på varje enskild referens med:
 *
 *   "The photo resource in the request is invalid.
 *    Please retrieve it from Places API endpoints." (INVALID_ARGUMENT)
 *
 * Foto-resursnamn är alltså inte eviga — de måste hämtas via ett Places
 * API-anrop med SAMMA nyckel/projekt som sedan hämtar själva bilden. De
 * lagrade referenserna kom sannolikt från en annan nyckel (eller ett äldre
 * API), vilket förklarar varför precis alla fallerade samtidigt.
 *
 * Den här routen läser google_place_id, frågar Place Details efter
 * `photos`, och sparar de nya namnen. Kör i batchar eftersom Places API
 * kostar per anrop och Vercel-funktionen har tidsgräns.
 *
 * Anrop:
 *   curl -X POST "https://svalla.se/api/admin/refresh-place-photos?offset=0" \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * `dry=1` skriver ingenting — bara rapport. Bra för att verifiera en enskild
 * plats innan man bränner kvot på hela beståndet.
 * Fortsätt med nästa offset tills svaret har `done: true`.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const BATCH_SIZE = 25
/** Så många foton per plats vi sparar — galleriet visar sällan fler. */
const MAX_PHOTOS = 6

interface PlaceRow {
  id: string
  name: string
  slug: string | null
  google_place_id: string | null
}

/** Hämtar aktuella foto-resursnamn för ett place_id. null = kunde inte hämta. */
async function hamtaFotoNamn(placeId: string, key: string): Promise<string[] | null> {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`
  try {
    const r = await fetch(url, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'photos',
      },
    })
    if (!r.ok) {
      const detalj = (await r.text()).slice(0, 200).replace(/\s+/g, ' ')
      console.error(`[refresh-photos] Place Details ${r.status} for ${placeId} :: ${detalj}`)
      return null
    }
    const data = await r.json() as { photos?: { name?: string }[] }
    const namn = (data.photos ?? [])
      .map(p => p.name)
      .filter((n): n is string => typeof n === 'string' && n.startsWith('places/'))
      .slice(0, MAX_PHOTOS)
    return namn
  } catch (e) {
    console.error(`[refresh-photos] Nätverksfel for ${placeId}:`, e instanceof Error ? e.message : e)
    return null
  }
}

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization')
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const key = process.env.GOOGLE_PLACES_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'GOOGLE_PLACES_API_KEY saknas' }, { status: 500 })
  }

  const url = new URL(req.url)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)
  const dry = url.searchParams.get('dry') === '1'
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? String(BATCH_SIZE), 10) || BATCH_SIZE, 50)

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const { data: places, count } = await sb
    .from('restaurants')
    .select('id, name, slug, google_place_id', { count: 'exact' })
    .not('google_place_id', 'is', null)
    .order('id')
    .range(offset, offset + limit - 1)

  if (!places || places.length === 0) {
    return NextResponse.json({ done: true, total: count ?? 0, offset })
  }

  let uppdaterade = 0
  let utanFoton = 0
  let misslyckade = 0
  const detaljer: { slug: string | null; namn: string; antalFoton: number | null }[] = []

  for (const p of places as PlaceRow[]) {
    if (!p.google_place_id) { misslyckade++; continue }

    const namn = await hamtaFotoNamn(p.google_place_id, key)
    if (namn === null) {
      misslyckade++
      detaljer.push({ slug: p.slug, namn: p.name, antalFoton: null })
      continue
    }
    if (namn.length === 0) {
      utanFoton++
      detaljer.push({ slug: p.slug, namn: p.name, antalFoton: 0 })
      continue
    }

    detaljer.push({ slug: p.slug, namn: p.name, antalFoton: namn.length })

    if (!dry) {
      // Behåll samma form som tidigare: [{ reference: "places/..." }]
      const refs = namn.map(n => ({ reference: n }))
      const { error } = await sb
        .from('restaurants')
        .update({ google_photo_refs: refs })
        .eq('id', p.id)
      if (error) {
        console.error(`[refresh-photos] Kunde inte spara for ${p.slug ?? p.id}:`, error.message)
        misslyckade++
        continue
      }
    }
    uppdaterade++
  }

  const nastaOffset = offset + places.length
  return NextResponse.json({
    done: nastaOffset >= (count ?? 0),
    dry,
    total: count ?? 0,
    offset,
    nastaOffset,
    uppdaterade,
    utanFoton,
    misslyckade,
    detaljer,
  })
}
