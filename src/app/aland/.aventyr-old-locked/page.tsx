import { Metadata } from 'next'
import AventyrClient from '@/components/AventyrClient'
import { ALAND } from '@/data/aventyr'

export const metadata: Metadata = {
  title: ALAND.metaTitle,
  description: ALAND.metaDescription,
  alternates: { canonical: 'https://svalla.se/aland/aventyr' },
  openGraph: {
    title: ALAND.introTitle,
    description: ALAND.metaDescription,
    url: 'https://svalla.se/aland/aventyr',
    type: 'website',
  },
}

export default function Page() {
  return <AventyrClient destination={ALAND} />
}
