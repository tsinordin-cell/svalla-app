/**
 * Google Places Photo proxy.
 *
 * Bygg URL från Google-photo-reference + maxWidth, hämtar binär från Google
 * och streamar tillbaka. Vi får ALDRIG exponera GOOGLE_PLACES_API_KEY
 * client-side, så all foto-fetching måste gå genom denna route.
 *
 * Anrop:  /api/places/photo/{base64-encoded-ref}?w=1200
 *
 * Photo-references roterar inte men kan invalideras. Cachar 7 dagar i CDN
 * via Cache-Control så vi inte slår Google för varje page-view.
 */
import { NextRequest } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KEY = process.env.GOOGLE_PLACES_API_KEY

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ ref: string }> }
) {
  if (!KEY) {
    return new Response('GOOGLE_PLACES_API_KEY missing', { status: 500 })
  }

  // Rate limit per IP — skyddar Google API-budget mot scraping/DoS.
  // 60 photos/min räcker för normal navigation; mer än det är auto-loops.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
  if (!(await checkRateLimit(`places-photo:${ip}`, 60, 60_000))) {
    return new Response('Rate limited', { status: 429 })
  }

  const { ref } = await ctx.params
  // ref kan vara base64 (om vi encodar för att slippa "/" i URL) eller plain
  let photoName: string
  try {
    // Försök base64-decode först — annars använd som den är
    photoName = ref.includes('/') ? ref : Buffer.from(ref, 'base64url').toString('utf-8')
  } catch {
    photoName = ref
  }

  // photoName format: "places/{placeId}/photos/{photoRef}"
  if (!photoName.startsWith('places/')) {
    return new Response('Invalid photo reference', { status: 400 })
  }

  const url = new URL(req.url)
  const maxWidth = clamp(parseInt(url.searchParams.get('w') || '1200', 10), 100, 4800)
  const maxHeight = url.searchParams.get('h')
    ? clamp(parseInt(url.searchParams.get('h')!, 10), 100, 4800)
    : null

  const params = new URLSearchParams({ key: KEY, maxWidthPx: String(maxWidth) })
  if (maxHeight) params.set('maxHeightPx', String(maxHeight))

  const googleUrl = `https://places.googleapis.com/v1/${photoName}/media?${params.toString()}`

  const r = await fetch(googleUrl, { redirect: 'follow' })
  if (!r.ok) {
    // Logga Googles FAKTISKA felmeddelande. Tidigare kastades det bort och
    // bara statuskoden returnerades, vilket gjorde det omöjligt att se varför
    // bilderna slutat fungera (2026-08-01: 100% av platsfotona gav 400 utan
    // att någon kunde se orsaken). Loggen syns i Vercel runtime logs.
    let detalj = ''
    try { detalj = (await r.text()).slice(0, 500) } catch { /* strunt samma */ }
    console.error(
      `[places/photo] Google svarade ${r.status} for ${photoName.slice(0, 60)}... :: ${detalj.replace(/\s+/g, ' ')}`
    )

    // ── SJÄLVLÄKNING ────────────────────────────────────────────────────────
    // Foto-referenser är inte eviga: Google svarar INVALID_ARGUMENT med
    // "The photo resource in the request is invalid. Please retrieve it from
    // Places API endpoints." när de slutat gälla. 2026-08-01 gällde det
    // SAMTLIGA 571 platser samtidigt (referenserna kom sannolikt från en annan
    // nyckel än den vi hämtar bilder med).
    //
    // I stället för att kräva en manuell ombearbetning av hela beståndet
    // hämtar vi färska foto-namn för just den här platsen direkt, sparar dem,
    // och skickar användaren vidare till den nya bilden. Sidan lagar alltså
    // sig själv vid besök — och gör det igen automatiskt nästa gång
    // referenserna dör, utan att någon behöver märka det.
    //
    // Kostnaden är ett Place Details-anrop per plats och tillfälle, inte per
    // sidvisning: dedupe nedan hindrar att sex bilder på samma sida triggar
    // sex uppdateringar, och Cache-Control gör att en lagad plats inte
    // frågar igen.
    if (r.status === 400 && detalj.includes('INVALID_ARGUMENT')) {
      const nyUrl = await forsokLagaPlats(photoName, maxWidth, maxHeight)
      if (nyUrl) {
        return new Response(null, {
          status: 307,
          headers: {
            Location: nyUrl,
            'Cache-Control': 'no-store',
            'X-Photo-Healed': '1',
          },
        })
      }
    }

    // Svara med ett RIKTIGT fel och utan bildkropp. Det far <img> att kasta
    // sitt error-event, vilket ar det PlaceHeroGallery lyssnar pa for att
    // plocka bort rutan helt (annars star en tom ruta kvar och bildraknaren
    // ljuger). Testade forst en genomskinlig 1x1-PNG har — den avkodas utan
    // fel av webblasaren, sa onError triggade aldrig och rutan blev kvar.
    //
    // Satori/OG-bilden tal detta eftersom /api/og/upptack forst kontrollerar
    // att bakgrundsbilden verkligen ar en bild (se bildFungerar dar).
    return new Response(null, {
      status: 502,
      headers: {
        // Kort cache: sa fort referenserna lagas ska sidorna self-healas.
        'Cache-Control': 'public, max-age=300, s-maxage=300',
        'X-Photo-Error': String(r.status),
      },
    })
  }
  const buf = await r.arrayBuffer()

  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': r.headers.get('content-type') || 'image/jpeg',
      // 7 dagars CDN-cache, 30 dagars stale-while-revalidate
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000',
    },
  })
}

function clamp(n: number, lo: number, hi: number) {
  if (Number.isNaN(n)) return lo
  return Math.min(Math.max(n, lo), hi)
}

/**
 * Kom ihåg vilka platser vi nyss lagat, så att de sex bilderna på en och samma
 * platssida inte triggar sex identiska Place Details-anrop. Lever bara i
 * lambda-instansen — det räcker, eftersom uppdateringen ändå är idempotent och
 * en lagad plats slutar fråga så fort de nya URL:erna används.
 */
const nyssLagade = new Map<string, number>()
const LAGA_IGEN_EFTER_MS = 10 * 60 * 1000

/**
 * Hämtar färska foto-namn för platsen som `photoName` tillhör, sparar dem i
 * restaurants.google_photo_refs och returnerar en proxy-URL till den första
 * nya bilden. null om det inte gick.
 */
async function forsokLagaPlats(
  photoName: string,
  maxWidth: number,
  maxHeight: number | null,
): Promise<string | null> {
  const placeId = photoName.split('/')[1]
  if (!placeId || !KEY) return null

  const nu = Date.now()
  const senast = nyssLagade.get(placeId)
  if (senast && nu - senast < LAGA_IGEN_EFTER_MS) return null
  nyssLagade.set(placeId, nu)

  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      { headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'photos' } },
    )
    if (!r.ok) {
      console.error(`[places/photo] Kunde inte hamta farska foton for ${placeId}: ${r.status}`)
      return null
    }
    const data = await r.json() as { photos?: { name?: string }[] }
    const namn = (data.photos ?? [])
      .map(p => p.name)
      .filter((n): n is string => typeof n === 'string' && n.startsWith('places/'))
      .slice(0, 6)
    if (namn.length === 0) return null

    const { getAdminClient } = await import('@/lib/supabase-admin')
    const sb = getAdminClient()
    const { error } = await sb
      .from('restaurants')
      .update({ google_photo_refs: namn.map(n => ({ reference: n })) })
      .eq('google_place_id', placeId)
    if (error) {
      console.error(`[places/photo] Kunde inte spara farska foton for ${placeId}: ${error.message}`)
      return null
    }
    console.log(`[places/photo] Lagade ${placeId} — ${namn.length} nya foton`)

    const encoded = Buffer.from(namn[0]!, 'utf-8').toString('base64url')
    const q = new URLSearchParams({ w: String(maxWidth) })
    if (maxHeight) q.set('h', String(maxHeight))
    return `/api/places/photo/${encoded}?${q.toString()}`
  } catch (e) {
    console.error(`[places/photo] Fel vid lagning av ${placeId}:`, e instanceof Error ? e.message : e)
    return null
  }
}
