import { getIsland } from '@/app/o/island-data'
import { ritaOgKort } from '../../_mall/kort'

// nodejs: typsnitten i mallen läses med Buffer (edge saknar det).
export const runtime = 'nodejs'
export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

/** Länkförhandsvisning för en ö (/o/[slug], /dag/[slug], ösidornas undersidor). Gemensam mall, 2026-11-19. */
export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) {
    return ritaOgKort({ rubrik: 'Svalla', ingress: 'Öar, krogar, badplatser och båttider, samlat på ett ställe.' }, { status: 404 })
  }
  return ritaOgKort({
    etikett: island.regionLabel ? `Ö · ${island.regionLabel}` : 'Ö',
    rubrik: island.name,
    ingress: island.tagline,
    under: [island.facts?.travel_time ?? null],
    adress: `svalla.se/o/${island.slug}`,
  })
}
