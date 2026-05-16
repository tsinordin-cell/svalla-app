import { Metadata } from 'next'
import AventyrClient from '@/components/AventyrClient'
import { GOTLAND } from '@/data/aventyr'

export const metadata: Metadata = {
  title: GOTLAND.metaTitle,
  description: GOTLAND.metaDescription,
  alternates: { canonical: 'https://svalla.se/gotland/aventyr' },
  openGraph: {
    title: GOTLAND.introTitle,
    description: GOTLAND.metaDescription,
    url: 'https://svalla.se/gotland/aventyr',
    type: 'website',
  },
}

export default function Page() {
  return <AventyrClient destination={GOTLAND} />
}
