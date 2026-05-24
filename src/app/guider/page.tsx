import type { Metadata } from 'next'
import GuiderClient from './GuiderClient'

export const metadata: Metadata = {
  title: 'Praktiska guider till skärgården',
  description: 'Guider om allemansrätten, packlistan, Waxholmsbolaget, midsommar i skärgården och hur du tar dig ut utan båt.',
  alternates: { canonical: 'https://svalla.se/guider' },
  openGraph: {
    title: 'Praktiska guider till skärgården – Svalla',
    description: 'Guider om allemansrätten, packlistan, Waxholmsbolaget, midsommar i skärgården och hur du tar dig ut utan båt.',
    url: 'https://svalla.se/guider',
  },
}

export default function GuiderPage() {
  return <GuiderClient />
}
