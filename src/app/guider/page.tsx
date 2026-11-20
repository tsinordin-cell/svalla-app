import type { Metadata } from 'next'
import Link from 'next/link'
import SidHuvud from '@/components/SidHuvud'
import GuideHero from '@/components/GuideHero'
import GuideVal from '@/components/GuideVal'
import { allaGuidePoster } from '@/lib/guideposter'
import { PUBLICERADE_GUIDER, ALL_REGIONS, REGION_LABELS, REGION_URL_SLUG } from './guides-data'
import { ogSida } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Praktiska guider till skärgården',
  description: 'Guider om allemansrätten, packlistan, Waxholmsbolaget, midsommar i skärgården och hur du tar dig ut utan båt.',
  alternates: { canonical: 'https://svalla.se/guider' },
  openGraph: {
    images: ogSida('https://svalla.se/guider'),
    title: 'Praktiska guider till skärgården | Svalla',
    description: 'Guider om allemansrätten, packlistan, Waxholmsbolaget, midsommar i skärgården och hur du tar dig ut utan båt.',
    url: 'https://svalla.se/guider',
  },
}

// FÖRHANDSVISNING 2026-11-20: guider och dagsplaner på samma sida, med områdesval (GuideVal).
// Rubrik, titel, beskrivning och canonical är desamma som förut.
const BOKA = [
  { href: '/teambuilding', text: 'Teambuilding', sub: 'Kickoff och AW i skärgården' },
  { href: '/hyra-bat', text: 'Hyra båt', sub: 'Uthyrning runt om i Sverige' },
  { href: '/segelkurs', text: 'Segelkurs', sub: 'Certifikat och seglarskola' },
]

export default function GuiderPage() {
  const poster = allaGuidePoster()
  const dagsplaner = poster.filter(p => p.typ === 'Dagsplan').length
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Guider till skärgården',
    description: 'Praktiska guider om skärgårdslivet: transport, aktiviteter, mat och säsong.',
    url: 'https://svalla.se/guider',
    numberOfItems: PUBLICERADE_GUIDER.length,
    itemListElement: PUBLICERADE_GUIDER.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: g.title,
      description: g.excerpt,
      url: `https://svalla.se/guider/${g.slug}`,
    })),
  }

  return (
    <>
      <SidHuvud />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <GuideHero
          etikett="Guider och dagsplaner"
          titel="Guider om Sveriges kust"
          text={`${PUBLICERADE_GUIDER.length} guider och ${dagsplaner} dagsplaner, från Stockholms skärgård till Bohuslän, Gotland och Höga Kusten. Välj område så ser du allt som finns där.`}
        />
        <GuideVal poster={poster} />

        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 16px 64px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: 'var(--txt)', margin: '8px 0 12px' }}>Guider per region</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
            {ALL_REGIONS.map(r => (
              <Link key={r} href={`/guider/${REGION_URL_SLUG[r]}`} style={{ fontSize: 13, fontWeight: 600, padding: '7px 14px', borderRadius: 999, border: '1px solid rgba(150,110,60,.22)', background: 'var(--white)', color: 'var(--txt)', textDecoration: 'none' }}>
                {REGION_LABELS[r]}
              </Link>
            ))}
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: 'var(--txt)', margin: '0 0 12px' }}>Boka och upplev</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {BOKA.map(l => (
              <Link key={l.href} href={l.href} style={{ display: 'block', background: 'var(--white)', borderRadius: 14, padding: '14px 16px', border: '1px solid rgba(150,110,60,.16)', textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--txt)' }}>{l.text}</div>
                <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>{l.sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
