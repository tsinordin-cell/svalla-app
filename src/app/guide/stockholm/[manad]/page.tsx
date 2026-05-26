import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SEASON_GUIDES, getSeasonGuide } from '../season-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import SvallaLogo from '@/components/SvallaLogo'

interface Props {
  params: Promise<{ manad: string }>
}

export const revalidate = 86400

export async function generateStaticParams() {
  return SEASON_GUIDES.map(g => ({ manad: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { manad } = await params
  const guide = getSeasonGuide(manad)
  if (!guide) return {}

  const title = `Skärgård i ${guide.month} — guide för Stockholm | Svalla`
  const description = `Vad är öppet i Stockholms skärgård i ${guide.month.toLowerCase()}? Öar, väder, aktiviteter och tips. ${guide.tagline}`

  return {
    title,
    description,
    keywords: [
      `skärgård ${guide.month.toLowerCase()}`,
      `stockholm skärgård ${guide.month.toLowerCase()}`,
      `vad göra skärgården ${guide.month.toLowerCase()}`,
      `öppna öar ${guide.month.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://svalla.se/guide/stockholm/${manad}`,
    },
    alternates: { canonical: `https://svalla.se/guide/stockholm/${manad}` },
    robots: { index: true, follow: true },
  }
}

export default async function SasonsguidePage({ params }: Props) {
  const { manad } = await params
  const guide = getSeasonGuide(manad)
  if (!guide) notFound()

  // Hämta ö-objekt för öppna öar
  const openIslandData = guide.openIslands
    .map(slug => ALL_ISLANDS.find(i => i.slug === slug))
    .filter(Boolean)

  // Hitta föregående/nästa guide för intern länkning
  const idx = SEASON_GUIDES.findIndex(g => g.slug === manad)
  const prev = idx > 0 ? SEASON_GUIDES[idx - 1] : null
  const next = idx < SEASON_GUIDES.length - 1 ? SEASON_GUIDES[idx + 1] : null

  // JSON-LD: TouristAttraction (säsongsguide)
  const touristAttraction = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `Stockholms skärgård i ${guide.month}`,
    description: guide.intro,
    url: `https://svalla.se/guide/stockholm/${manad}`,
    touristType: guide.bestFor.split(', '),
    availableLanguage: 'sv',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Stockholm',
      addressRegion: 'Stockholms län',
      addressCountry: 'SE',
    },
  }

  // JSON-LD: BreadcrumbList
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Guide', item: 'https://svalla.se/guide/stockholm' },
      { '@type': 'ListItem', position: 3, name: guide.month, item: `https://svalla.se/guide/stockholm/${manad}` },
    ],
  }

  // JSON-LD: FAQPage (väder + aktiviteter)
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Hur är vädret i Stockholms skärgård i ${guide.month.toLowerCase()}?`,
        acceptedAnswer: { '@type': 'Answer', text: guide.weather },
      },
      {
        '@type': 'Question',
        name: `Vilka öar är öppna i ${guide.month.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `I ${guide.month.toLowerCase()} är bland annat ${openIslandData.map(i => i?.name).join(', ')} öppna för besök.`,
        },
      },
      {
        '@type': 'Question',
        name: `Vad kan man göra i skärgården i ${guide.month.toLowerCase()}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: guide.activities.join(' '),
        },
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(touristAttraction) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      {/* Nav */}
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/guide/stockholm" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Alla säsongsguider
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '44px 24px 60px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
            Säsongsguide · {guide.month}
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: 700,
            lineHeight: 1.15,
            margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Skärgård i {guide.month}
          </h1>
          <p style={{ fontSize: 18, opacity: 0.9, marginTop: 12, lineHeight: 1.55, maxWidth: 600 }}>
            {guide.tagline}
          </p>
          {/* Väder-chips */}
          <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 20, padding: '6px 14px', fontSize: 14, fontWeight: 600 }}>
              🌡 {guide.weather.split('.')[0]}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', borderRadius: 20, padding: '6px 14px', fontSize: 14, fontWeight: 600 }}>
              🏝 {guide.openIslands.length} öar öppna
            </span>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '-28px auto 0', padding: '0 16px' }}>

        {/* Intro */}
        <section style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '28px 28px',
          border: '1px solid var(--surface-3)',
          marginBottom: 28,
        }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--txt)', margin: 0 }}>
            {guide.intro}
          </p>
        </section>

        {/* Väder */}
        <section style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '24px 28px',
          border: '1px solid var(--surface-3)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            🌤 Väder i {guide.month.toLowerCase()}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--txt2)', margin: 0 }}>
            {guide.weather}
          </p>
        </section>

        {/* Öppna öar */}
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            🏝 Öppna öar i {guide.month.toLowerCase()}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {openIslandData.map(island => {
              if (!island) return null
              return (
                <Link
                  key={island.slug}
                  href={`/o/${island.slug}`}
                  style={{
                    display: 'block',
                    background: 'var(--white)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    border: '1px solid var(--surface-3)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 22 }}>{island.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)' }}>{island.name}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>
                    {island.tagline}
                  </p>
                  <div style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600, marginTop: 8 }}>
                    {island.facts.travel_time}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Aktiviteter */}
        <section style={{
          background: 'var(--white)',
          borderRadius: 16,
          padding: '24px 28px',
          border: '1px solid var(--surface-3)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            🎯 Aktiviteter i {guide.month.toLowerCase()}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {guide.activities.map((activity, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: 8,
                  background: 'var(--surface-2)', color: 'var(--sea)',
                  fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 15, color: 'var(--txt)', lineHeight: 1.55 }}>{activity}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section style={{
          background: '#f0f7fb',
          borderRadius: 16,
          padding: '24px 28px',
          border: '1px solid #c8dfe8',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            💡 Tips för {guide.month.toLowerCase()}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {guide.tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--sea)', fontSize: 18, flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 15, color: 'var(--txt)', lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Undvik */}
        {guide.avoid && (
          <section style={{
            background: '#fff8f0',
            borderRadius: 14,
            padding: '20px 24px',
            border: '1px solid #f0d9c0',
            marginBottom: 28,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#c96e2a' }}>
              ⚠️ Tänk på detta
            </h2>
            <p style={{ fontSize: 15, color: 'var(--txt)', lineHeight: 1.65, margin: 0 }}>
              {guide.avoid}
            </p>
          </section>
        )}

        {/* Bäst för */}
        <section style={{
          background: 'var(--white)',
          borderRadius: 14,
          padding: '20px 24px',
          border: '1px solid var(--surface-3)',
          marginBottom: 36,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            Bäst för
          </div>
          <div style={{ fontSize: 15, color: 'var(--txt)', lineHeight: 1.6 }}>
            {guide.bestFor}
          </div>
        </section>

        {/* Månad-nav */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 48 }}>
          {prev ? (
            <Link href={`/guide/stockholm/${prev.slug}`} style={{
              flex: 1, padding: '14px 18px',
              background: 'var(--white)', borderRadius: 12,
              border: '1px solid var(--surface-3)',
              textDecoration: 'none', color: 'var(--txt)',
              fontSize: 14, fontWeight: 600,
            }}>
              ← {prev.month}
            </Link>
          ) : <div style={{ flex: 1 }} />}
          {next ? (
            <Link href={`/guide/stockholm/${next.slug}`} style={{
              flex: 1, padding: '14px 18px',
              background: 'var(--white)', borderRadius: 12,
              border: '1px solid var(--surface-3)',
              textDecoration: 'none', color: 'var(--txt)',
              fontSize: 14, fontWeight: 600, textAlign: 'right',
            }}>
              {next.month} →
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </nav>

      </div>
    </div>
  )
}
