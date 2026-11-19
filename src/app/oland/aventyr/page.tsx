import type { Metadata } from 'next'
import OlandAventyrClient from './OlandAventyrClient'
import { OG_STANDARD } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: '10 äventyr på Öland',
  description: 'UNESCO Alvaret, Långe Jan, Eketorps fornborg, Borgholms slottsruin, Trollskogen och cykelleder, Ölands bästa upplevelser.',
  alternates: { canonical: 'https://svalla.se/oland/aventyr' },
  openGraph: {
    images: OG_STANDARD,
    title: '10 äventyr på Öland | Svalla',
    description: 'Ölands bästa äventyr: med bil, buss eller cykel.',
    url: 'https://svalla.se/oland/aventyr',
  },
}

export default function OlandAventyrPage() {
  return <OlandAventyrClient />
}
