import type { Metadata } from 'next'
import GotlandAventyrClient from './GotlandAventyrClient'

export const metadata: Metadata = {
  title: '10 äventyr pa Gotland – Svalla',
  description: 'Utforska Gotlands bästa äventyr: Farö-dagstur, Lummelunda grottan, Raukar-tur, medeltidsstaden Visby och cykelleder.',
  alternates: { canonical: 'https://svalla.se/gotland/aventyr' },
  openGraph: {
    title: '10 äventyr pa Gotland – Svalla',
    description: 'Gotlands bästa äventyr – med bil, kollektivt eller cykel.',
    url: 'https://svalla.se/gotland/aventyr',
  },
}

export default function GotlandAventyrPage() {
  return <GotlandAventyrClient />
}
