import { serializeForScript } from '@/lib/serializeForScript'
import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import Link from 'next/link'
import { SEASON_GUIDES } from './season-data'
import PublicFooter from '@/components/PublicFooter'
import { ogSida } from '@/lib/og-standard'

/**
 * /guide/stockholm: listan över månadsguiderna.
 *
 * Fanns inte förrän 2026-11-07: månadssidorna länkade "← Alla säsongsguider"
 * och brödsmulan "Guide" hit, och båda gav 404. Sidan listar bara det som
 * finns i season-data.ts; inga nya påståenden.
 */

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Stockholms skärgård månad för månad: säsongsguider | Svalla' },
  description:
    'Så är Stockholms skärgård i juni, juli, augusti, september, oktober och november: vilka öar som har öppet, vad man gör och vad man undviker.',
  alternates: { canonical: 'https://svalla.se/guide/stockholm' },
  openGraph: {
    images: ogSida('https://svalla.se/guide/stockholm'),
    title: 'Stockholms skärgård månad för månad',
    description: 'Säsongsguider för juni till november: öppna öar, aktiviteter och tips.',
    url: 'https://svalla.se/guide/stockholm',
  },
}

export default function SasongsguiderIndex() {
  const guider = [...SEASON_GUIDES].sort((a, b) => a.monthIndex - b.monthIndex)
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://svalla.se/guide/stockholm' },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeForScript(breadcrumb) }} />

      <SidHuvud />

      <header style={{ background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)', padding: '24px 24px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.15 }}>
            Stockholms skärgård månad för månad
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 620 }}>
            En guide per månad från juni till november: vilka öar som brukar ha öppet, vad som är värt att göra
            och vad du bör undvika. Vinterhalvåret står i <Link href="/guider/vintertrafik-skargarden" style={{ color: '#fff' }}>Vintertrafiken i skärgården</Link>.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto', padding: '28px 20px 60px' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14 }}>
          {guider.map(g => (
            <li key={g.slug}>
              <Link
                href={`/guide/stockholm/${g.slug}`}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: 'var(--surface-1)', border: '1px solid var(--input-border)',
                  borderRadius: 16, padding: '16px 18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--sea, #0a7b8c)' }}>{g.month}</span>
                  <span style={{ fontSize: 13, color: 'var(--txt3)' }}>{g.tagline}</span>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--txt2)', margin: '8px 0 0' }}>{g.intro}</p>
              </Link>
            </li>
          ))}
        </ol>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--txt3)', margin: '28px 0 0' }}>
          Datum som återkommer varje år, som hummerpremiären och tidtabellsbytena, finns på{' '}
          <Link href="/skargardsdatum" style={{ color: 'var(--sea, #0a7b8c)' }}>Skärgårdens datum</Link>.
        </p>
      </main>
      <PublicFooter />
    </div>
  )
}
