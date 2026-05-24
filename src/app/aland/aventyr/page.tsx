import type { Metadata } from 'next'
import AlandAventyrClient from './AlandAventyrClient'

export const metadata: Metadata = {
  title: '10 äventyr pa Aaland',
  description: 'Kastelholms slott, Bomarsunds fästning, skärgaradshoppning och cykelleder – Aalands bästa upplevelser.',
  alternates: { canonical: 'https://svalla.se/aland/aventyr' },
  openGraph: {
    title: '10 äventyr pa Aaland – Svalla',
    description: 'Aalands bästa äventyr – med bil, kollektivt eller cykel.',
    url: 'https://svalla.se/aland/aventyr',
  },
}

export default function AlandAventyrPage() {
  return <AlandAventyrClient />
}
