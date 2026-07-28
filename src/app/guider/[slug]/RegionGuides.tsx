import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ALL_REGIONS,
  REGION_LABELS,
  REGION_EMOJIS,
  REGION_URL_SLUG,
  URL_SLUG_TO_REGION,
  getGuidesByRegion,
  type GuideRegion,
} from '../guides-data'

/**
 * Regionsvyn för /guider/<region>.
 *
 * Låg tidigare i en egen route `guider/[region]/`. Det gick inte: Next.js
 * tillåter inte två olika parameternamn på samma dynamiska nivå
 * (`[region]` och `[slug]` under `/guider/`), och kastade
 * "You cannot use different slug names for the same dynamic path" vid varje
 * on-demand-rendering — vilket sänkte 73 sidor i produktion i 25 dygn.
 * Nu är regionsvyn en komponent som `[slug]`-routen väljer att rendera.
 */

// SEO-metadata per region
export const REGION_META: Record<GuideRegion, { title: string; description: string; keywords: string }> = {
  stockholm: {
    title: 'Guider till Stockholms skärgård – allt du behöver veta',
    description: 'Kompletta guider till Stockholms skärgård: Waxholmsbolaget, bästa öar, kajakpaddling, havsbastu och övernattning. Allt samlat på ett ställe.',
    keywords: 'guider stockholms skärgård, stockholms skärgård tips, vad göra stockholms skärgård',
  },
  goteborg: {
    title: 'Guider till Göteborg & Bohuslän – kust och skärgård',
    description: 'Guider till Bohusläns klippkust: Marstrand, Smögen, Koster, hummersafari och ostronsäsong. Allt om Västkustens skärgård.',
    keywords: 'guider bohuslän, guider göteborg skärgård, bohuslän tips klippkust',
  },
  gotland: {
    title: 'Guider till Gotland – raukar, Visby och sommarlivet',
    description: 'Allt om Gotland: färja, Visby medeltidsstad, raukar på Fårö, badplatser och cykelleder. Kompletta guider för sommarsemestern.',
    keywords: 'guider gotland, gotland tips semestern, vad göra gotland',
  },
  oland: {
    title: 'Guider till Öland – Alvaret, Böda sand och cykelleder',
    description: 'Allt om Öland: Ölandsbron, Alvaret, Böda sand, Borgholm och de bästa cykelled. Guider för din Ölandssemester.',
    keywords: 'guider öland, öland tips, vad göra öland cykling',
  },
  hogakusten: {
    title: 'Guider till Höga Kusten – UNESCO-världsarvet i Norrland',
    description: 'Guider till Höga Kusten: Skuleskogen, klippor, surströmming och Ulvön. Allt du behöver veta om Norrlandskusten.',
    keywords: 'guider höga kusten, höga kusten tips, skuleskogen vandring',
  },
  sydkusten: {
    title: 'Guider till Sydkusten & Halland – Karlskrona, Varberg och Båstad',
    description: 'Guider till Sveriges sydkust: Karlskrona UNESCO-världsarv, Varbergs fästning, Grebbestad och Halmstad. Tips för hela sydkusten.',
    keywords: 'guider sydkusten, karlskrona guide, varberg guide halland',
  },
  utlandet: {
    title: 'Guider till Åland & Bornholm – skärgård utomlands',
    description: 'Guider till Åland och Bornholm: färja från Stockholm, vad du kan göra och varför dessa öar är värda ett besök.',
    keywords: 'guide åland, åland från stockholm, bornholm guide från sverige',
  },
  sverige: {
    title: 'Praktiska guider för kustsemestern – allemansrätten, packlistan & mer',
    description: 'Praktiska guider för alla som ska ut till kusten: allemansrätten, packlistan, hyra båt och vad det kostar. Gäller hela Sverige.',
    keywords: 'praktiska guider skärgård, allemansrätten sjön, packlista skärgård',
  },
}

export default function RegionGuides({ regionSlug }: { regionSlug: string }) {
  const region = URL_SLUG_TO_REGION[regionSlug]
  if (!region) return notFound()

  const guides = getGuidesByRegion(region)
  const label = REGION_LABELS[region]
  const emoji = REGION_EMOJIS[region]
  const meta = REGION_META[region]

  // Gruppa per kategori för intern organisation
  const byCategory = guides.reduce<Record<string, typeof guides>>((acc, g) => {
    if (!acc[g.category]) acc[g.category] = []
    acc[g.category]!.push(g)
    return acc
  }, {})

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem',    item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Guider', item: 'https://svalla.se/guider' },
      { '@type': 'ListItem', position: 3, name: label,    item: `https://svalla.se/guider/${regionSlug}` },
    ],
  }

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: meta.title,
    description: meta.description,
    numberOfItems: guides.length,
    itemListElement: guides.map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://svalla.se/guider/${g.slug}`,
      name: g.title,
    })),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      {/* Header */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '0 20px 48px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/guider" style={{
            color: 'var(--white)', opacity: 0.8, fontSize: 14, textDecoration: 'none',
            display: 'inline-block', marginBottom: 16,
          }}>
            ← Alla guider
          </Link>
          <div style={{ fontSize: 44, marginBottom: 12 }}>{emoji}</div>
          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800,
            color: 'var(--white)', margin: '0 0 12px',
          }}>
            {label}
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.88, fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
            {meta.description}
          </p>
          <div style={{ marginTop: 20 }}>
            <span style={{
              background: 'rgba(255,255,255,0.18)', color: 'var(--white)',
              borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 700,
            }}>
              {guides.length} guider
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Guider per kategori */}
        {Object.entries(byCategory).map(([category, catGuides]) => (
          <section key={category} style={{ marginBottom: 44 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              {category}
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>({catGuides.length})</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {catGuides.map(g => (
                <Link key={g.slug} href={`/guider/${g.slug}`} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 16,
                  boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{g.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 3, lineHeight: 1.3 }}>{g.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {g.excerpt}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--sea)', marginTop: 4, fontWeight: 600 }}>{g.readTime}</div>
                  </div>
                  <span style={{ color: 'var(--sea)', fontSize: 18, flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Andra regioner */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Utforska andra regioner
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {ALL_REGIONS.filter(r => r !== region).map(r => (
              <Link key={r} href={`/guider/${REGION_URL_SLUG[r]}`} style={{
                background: 'var(--white)', borderRadius: 12, padding: '14px 16px',
                border: '1px solid var(--surface-3)', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 22 }}>{REGION_EMOJIS[r]}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>{REGION_LABELS[r]}</div>
                  <div style={{ fontSize: 11, color: 'var(--sea)', fontWeight: 600, marginTop: 2 }}>
                    {getGuidesByRegion(r).length} guider →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⛵</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>
            Logga dina turer på Svalla
          </h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Spara rutter, dokumentera besök och dela upplevelser med andra kustälskare.
          </p>
          <Link href="/registrera" style={{
            display: 'inline-block', background: 'var(--sea)', color: 'var(--white)',
            padding: '12px 24px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none',
          }}>
            Kom igång gratis →
          </Link>
        </div>
      </div>
    </div>
  )
}
