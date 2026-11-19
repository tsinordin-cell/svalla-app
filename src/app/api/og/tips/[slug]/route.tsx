import { createClient } from '@/lib/supabase'
import { ritaOgKort, ogFoto } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600 // 1 h: sociala medier cachar OG-bilder länge ändå

/**
 * Länkförhandsvisning för redaktionella artiklar på /tips/[slug].
 * Gemensam mall (../../_mall/kort.tsx), 2026-11-19: omslagsbilden över hela
 * ytan när den finns, annars rubrik och ingress på havsgradienten.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const supabase = createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('title, excerpt, cover_image, category, reading_min')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (!article) {
    return ritaOgKort({ etikett: 'Tips', rubrik: 'Tips och guider', adress: 'svalla.se/tips' }, { status: 404 })
  }

  const foto = await ogFoto(article.cover_image)
  return ritaOgKort({
    etikett: article.category ? `Tips · ${article.category}` : 'Tips',
    rubrik: article.title,
    under: [article.reading_min ? `${article.reading_min} min läsning` : null],
    ingress: foto ? null : article.excerpt,
    foto,
    adress: 'svalla.se/tips',
  })
}
