import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { ritaOgKort, ogFoto } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600

type Annons = { images?: string[]; price?: number | null; location?: string | null; condition?: string | null }

/**
 * Länkförhandsvisning för en forumtråd eller loppisannons. Gemensam mall
 * (../../_mall/kort.tsx), 2026-11-19. Annonser får sin första bild över hela
 * ytan och priset i bärnsten; trådar får rubrik, början av texten och svaren.
 * Publik klient: forum_threads, forum_categories och users är läsbara för alla.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createPublicSupabaseClient()

  const { data: thread } = await supabase
    .from('forum_threads')
    .select('title, body, reply_count, category_id, user_id, listing_data')
    .eq('id', id)
    .maybeSingle()

  if (!thread) {
    return ritaOgKort({ etikett: 'Forum', rubrik: 'Svalla forum', adress: 'svalla.se/forum' }, { status: 404 })
  }

  const [{ data: cat }, { data: author }] = await Promise.all([
    supabase.from('forum_categories').select('name').eq('id', thread.category_id).maybeSingle(),
    supabase.from('users').select('username').eq('id', thread.user_id).maybeSingle(),
  ])

  const ld = (thread.listing_data ?? null) as Annons | null
  const text = (thread.body ?? '').replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()

  if (ld) {
    const pris = typeof ld.price === 'number' && Number.isFinite(ld.price)
      ? `${new Intl.NumberFormat('sv-SE').format(ld.price)} kr`
      : 'Pris på förfrågan'
    const foto = await ogFoto(Array.isArray(ld.images) ? ld.images[0] : null)
    return ritaOgKort({
      etikett: 'Loppis',
      rubrik: thread.title,
      under: [ld.location ?? null, ld.condition ? `Skick: ${ld.condition.toLowerCase()}` : null],
      markering: pris,
      ingress: foto ? null : text,
      avsandare: author?.username ?? null,
      foto,
      adress: 'svalla.se/forum',
    })
  }

  const svar = thread.reply_count ?? 0
  return ritaOgKort({
    etikett: cat?.name ? `Forum · ${cat.name}` : 'Forum',
    rubrik: thread.title,
    ingress: text,
    under: [svar === 1 ? '1 svar' : `${svar} svar`],
    avsandare: author?.username ?? null,
    adress: 'svalla.se/forum',
  })
}
