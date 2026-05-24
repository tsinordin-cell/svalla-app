import type { Metadata } from 'next'
import OlandAventyrClient from './OlandAventyrClient'

export const metadata: Metadata = {
  title: '10 äventyr pa Öland',
  description: 'UNESCO Alvaret, Laange Jan, Eketorps fornborg, Borgholms slottsruin, Trollskogen och cykelleder – Ölands bästa upplevelser.',
  alternates: { canonical: 'https://svalla.se/oland/aventyr' },
  openGraph: {
    title: '10 äventyr pa Öland – Svalla',
    description: 'Ölands bästa äventyr – med bil, buss eller cykel.',
    url: 'https://svalla.se/oland/aventyr',
  },
}

export default function OlandAventyrPage() {
  return <OlandAventyrClient />
}
