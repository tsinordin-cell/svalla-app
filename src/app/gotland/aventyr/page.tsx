import type { Metadata } from 'next'
import GotlandAventyrClient from './GotlandAventyrClient'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: '10 äventyr på Gotland',
  description: 'Utforska Gotlands bästa äventyr: Fårö-dagstur, Lummelundagrottan, raukar, medeltidsstaden Visby och cykelleder.',
  alternates: { canonical: 'https://svalla.se/gotland/aventyr' },
  openGraph: {
    images: ogSida('https://svalla.se/gotland/aventyr'),
    title: '10 äventyr på Gotland | Svalla',
    description: 'Gotlands bästa äventyr: med bil, kollektivt eller cykel.',
    url: 'https://svalla.se/gotland/aventyr',
  },
}

export default function GotlandAventyrPage() {
  return <GotlandAventyrClient />
}
