/**
 * Länkförhandsvisning för en plats (/upptack/[id]). Gemensam mall (../../_mall/kort.tsx), 2026-11-19.
 *
 * Fotot: platsens eget foto om det går att hämta, annars inget foto (havsgradienten
 * och seglet). Stockbilder (Unsplash) visas inte, samma regel som platssidan: samma
 * stockbild låg på flera olika platser. Googles betyg visas inte längre i bilden
 * (sparad kopia, se claude/platsbilder-utan-google-2026-10-28.md).
 */
import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { regionEtikett } from '@/lib/regionEtikett'
import { ritaOgKort, ogFoto } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600

const TYPE_LABEL: Record<string, string> = {
  restaurant: 'Restaurang', cafe: 'Kafé', bar: 'Bar',
  marina: 'Gästhamn', harbor: 'Hamn',
  anchorage: 'Naturhamn', nature_harbor: 'Naturhamn',
  fuel: 'Bränsle', fuel_station: 'Bränsle',
  beach: 'Bad', sauna: 'Bastu',
  shop: 'Butik', hotel: 'Boende', nature: 'Naturplats',
  hostel: 'Vandrarhem', cabin: 'Stugor', camping: 'Camping',
  attraction: 'Sevärdhet', pier: 'Brygga', pumpout: 'Tömning', service: 'Service',
}

// UUID v4 regex
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: rawIdOrSlug } = await params
  // Avkoda åäö-slugs (samma fel som på platssidan, revision 2026-10-02).
  let idOrSlug = rawIdOrSlug
  try { idOrSlug = decodeURIComponent(rawIdOrSlug) } catch { /* slå upp som den är */ }
  // Publik klient: restaurants är läsbar för alla, och utan cookies kan bilden cachas.
  const supabase = createPublicSupabaseClient()

  const isUuid = UUID_RE.test(idOrSlug)
  const col = isUuid ? 'id' : 'slug'
  const { data } = await supabase
    .from('restaurants')
    .select('name, island, archipelago_region, type, description, google_rating, google_ratings_total, google_photo_refs, image_url')
    .eq(col, idOrSlug)
    .maybeSingle()

  if (!data) {
    return ritaOgKort({ rubrik: 'Svalla', ingress: 'Öar, krogar, badplatser och båttider, samlat på ett ställe.' }, { status: 404 })
  }

  // ── Bakgrunds-foto: platsens eget foto först, sen image_url, aldrig stockbild ──
  const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svalla.se'
  const arStockbild = (u: string) => u.includes('images.unsplash.com')
  const egenBild = data.image_url && !arStockbild(data.image_url)
    ? (data.image_url.startsWith('http') ? data.image_url : `${SITE}${data.image_url.startsWith('/') ? '' : '/'}${data.image_url}`)
    : null
  const googleRef = (data.google_photo_refs as { reference: string }[] | null)?.[0]?.reference
  let bgUrl: string | null = null
  if (googleRef) {
    const encoded = Buffer.from(googleRef, 'utf-8').toString('base64url')
    bgUrl = `${SITE}/api/places/photo/${encoded}?w=1600&h=900`
  } else {
    bgUrl = egenBild
  }

  // ogFoto hämtar, kontrollerar att det är en bild och gör om den till JPEG.
  // satori kastar annars "Unsupported image type: unknown" och sänker hela
  // bilden (95 fel/vecka innan 2026-08-01). Faller tillbaka på image_url.
  let foto = await ogFoto(bgUrl)
  if (!foto && egenBild && egenBild !== bgUrl) foto = await ogFoto(egenBild)

  const typ = data.type ? TYPE_LABEL[data.type] : null
  // archipelago_region är en kod ('north', 'bohuslan_nord'): visa etiketten, aldrig koden.
  const region = regionEtikett(data.archipelago_region as string | null)

  return ritaOgKort({
    etikett: typ ?? 'Plats',
    rubrik: data.name as string,
    under: [data.island as string | null, region],
    ingress: foto ? null : (data.description as string | null),
    foto,
  })
}
