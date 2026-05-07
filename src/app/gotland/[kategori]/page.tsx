import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import RegionCategoryPage, { CATEGORIES, REGIONS } from '@/components/RegionCategoryPage'

interface Props { params: Promise<{ kategori: string }> }

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map(kategori => ({ kategori }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const region = REGIONS.gotland
  const cat = CATEGORIES[kategori]
  if (!cat) return {}
  const title = cat.metaTitle(region.label)
  const description = cat.metaDesc(region.label)
  return {
    title, description,
    alternates: { canonical: `https://svalla.se/gotland/${kategori}` },
    openGraph: { title, description, url: `https://svalla.se/gotland/${kategori}`, type: 'website' },
  }
}

export default async function Page({ params }: Props) {
  const { kategori } = await params
  if (!CATEGORIES[kategori]) notFound()
  return <RegionCategoryPage regionKey="gotland" categoryKey={kategori} />
}
