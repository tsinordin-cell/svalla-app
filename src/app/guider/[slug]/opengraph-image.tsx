import { GUIDES, URL_SLUG_TO_REGION } from '../guides-data'
import { REGION_META } from './RegionGuides'
import { ritaOgKort } from '@/app/api/og/_mall/kort'

// nodejs: typsnitten i mallen läses med Buffer (edge saknar det).
export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'
export const alt = 'Guide på Svalla'

/**
 * Länkförhandsvisning för guider och regionssidor under /guider/[slug].
 * Gemensam mall (src/app/api/og/_mall/kort.tsx), 2026-11-19.
 */
export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = GUIDES.find(g => g.slug === slug)

  // Regionssidorna delar route med guiderna. Har vi ingen guide kan sluggen
  // vara en region; då används regionens egen titel.
  const region = URL_SLUG_TO_REGION[slug]
  const regionMeta = region ? REGION_META[region] : undefined

  return ritaOgKort({
    etikett: guide ? (guide.category ? `Guide · ${guide.category}` : 'Guide') : 'Region',
    rubrik: guide?.title ?? regionMeta?.title ?? 'Guide till skärgården',
    under: [guide?.readTime ? `${guide.readTime} läsning` : null],
    ingress: guide?.excerpt ?? regionMeta?.description ?? null,
    adress: 'svalla.se/guider',
  })
}
