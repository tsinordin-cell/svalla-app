import { getIsland } from '@/app/o/island-data'
import { OBILDER } from '@/app/o/obilder.generated'
import { commonsThumb } from '@/lib/commonsBild'
import { ritaOgKort, ogFoto } from '../../_mall/kort'

// nodejs: typsnitten i mallen läses med Buffer (edge saknar det).
export const runtime = 'nodejs'
export const revalidate = 86400

type Props = { params: Promise<{ slug: string }> }

/**
 * Länkförhandsvisning för en ö (/o/[slug], /dag/[slug], ösidornas undersidor).
 * Gemensam mall, 2026-11-19. Öns foto från obilder.generated.ts (Wikimedia
 * Commons, samma bild som ösidan) när det finns, med fotograf och licens i
 * bilden: det är villkoret för att vi får använda den.
 */
export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) {
    return ritaOgKort({ rubrik: 'Svalla', ingress: 'Öar, krogar, badplatser och båttider, samlat på ett ställe.' }, { status: 404 })
  }
  const bild = OBILDER[island.slug]
  const foto = bild?.fotograf ? await ogFoto(commonsThumb(bild.url, 1280)) : null
  return ritaOgKort({
    etikett: island.regionLabel ? `Ö · ${island.regionLabel}` : 'Ö',
    rubrik: island.name,
    // Över foto räcker en rad; restiden blir för lång där.
    ingress: island.tagline,
    under: foto ? [] : [island.facts?.travel_time ?? null],
    adress: `svalla.se/o/${island.slug}`,
    foto,
    fotokredit: foto && bild ? `Foto: ${bild.fotograf} · ${bild.licens} · Wikimedia Commons` : null,
  })
}
