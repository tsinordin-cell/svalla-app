import type { Metadata } from 'next'
import AlandAventyrClient from './AlandAventyrClient'

export const metadata: Metadata = {
  title: '10 äventyr på Åland',
  description: 'Kastelholms slott, Bomarsunds fästning, skärgårdshoppning och cykelleder – Ålands bästa upplevelser.',
  alternates: { canonical: 'https://svalla.se/aland/aventyr' },
  openGraph: {
    title: '10 äventyr på Åland – Svalla',
    description: 'Ålands bästa äventyr – med bil, kollektivt eller cykel.',
    url: 'https://svalla.se/aland/aventyr',
  },
}

export default function AlandAventyrPage() {
  return <AlandAventyrClient />
}
