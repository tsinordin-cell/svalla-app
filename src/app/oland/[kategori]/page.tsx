import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionCategoryPage, { CATEGORIES, REGIONS, getPlacesForRegionCategory } from '@/components/RegionCategoryPage'

interface Props { params: Promise<{ kategori: string }> }

// ISR en gång i timmen (revision 2026-10-02). Sidan var dynamisk eftersom
// getPlacesForRegionCategory läste cookies (MISS båda varven, uppmätt
// 2026-10-02: /oland/krogar 0,92/0,47 s). Med den cookie-fria klienten blir
// sidan statisk, och revalidate gör att ändrade platser syns inom en timme i
// stället för först vid nästa deploy.
export const revalidate = 3600

// Okända kategorier ger 404 i routern, utan rendering (revision 2026-10-02).
// generateStaticParams nedan ger alla nycklar i CATEGORIES, samma mängd som
// sidan själv slår upp, så inga riktiga sidor stängs ute (CLAUDE.md p28).
export const dynamicParams = false

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(kategori => ({ kategori }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const region = REGIONS.oland
  const cat = CATEGORIES[kategori]
  if (!cat) return {}
  const title = cat.metaTitle(region.label)
  const description = cat.metaDesc(region.label)
  // Tom kategori = tunn sida: noindex tills det finns platser (mätt 2026-09-23:
  // bl.a. alla /hoga-kusten/* och /halland/* var tomma men indexerbara).
  const tom = (await getPlacesForRegionCategory('oland', kategori)).length === 0
  return {
    ...(tom ? { robots: { index: false, follow: true } } : {}),
    title, description,
    alternates: { canonical: `https://svalla.se/oland/${kategori}` },
    openGraph: { title: `${title} – Svalla`, description, url: `https://svalla.se/oland/${kategori}`, type: 'website' },
  }
}

export default async function Page({ params }: Props) {
  const { kategori } = await params
  if (!CATEGORIES[kategori]) notFound()
  return <RegionCategoryPage regionKey="oland" categoryKey={kategori} />
}
