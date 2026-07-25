import type { Metadata } from 'next'
import GuiderClient from './GuiderClient'
import { GUIDES } from './guides-data'

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
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guider till skärgården',
    description: 'Praktiska guider om skärgårdslivet — transport, aktiviteter, mat och säsong.',
    url: 'https://svalla.se/guider',
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      description: g.excerpt,
      url: `https://svalla.se/guider/${g.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <GuiderClient />
    </>
  )
}
