import { POSTS_META } from '@/app/blogg/posts-data'
import { ritaOgKort } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 86400

/**
 * Länkförhandsvisning för bloggartiklar (/blogg/[slug]). Ny 2026-11-19:
 * artikelsidornas JSON-LD pekade redan hit men routen fanns inte (404), och
 * delade länkar fick den gamla /og-image.jpg. Gemensam mall (../../_mall/kort.tsx).
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = POSTS_META.find(p => p.slug === slug)
  if (!post) {
    return ritaOgKort({ etikett: 'Blogg', rubrik: 'Svalla blogg', adress: 'svalla.se/blogg' }, { status: 404 })
  }
  return ritaOgKort({
    etikett: post.category ? `Blogg · ${post.category}` : 'Blogg',
    rubrik: post.title,
    under: [post.readTime ? `${post.readTime} läsning` : null],
    ingress: post.excerpt,
    adress: 'svalla.se/blogg',
  })
}
