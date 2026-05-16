import { Metadata } from 'next'
import AventyrClient from '@/components/AventyrClient'
import { OLAND } from '@/data/aventyr'

export const metadata: Metadata = {
  title: OLAND.metaTitle,
  description: OLAND.metaDescription,
  alternates: { canonical: 'https://svalla.se/oland/aventyr' },
  openGraph: {
    title: OLAND.introTitle,
    description: OLAND.metaDescription,
    url: 'https://svalla.se/oland/aventyr',
    type: 'website',
  },
}

export default function Page() {
  return <AventyrClient destination={OLAND} />
}
