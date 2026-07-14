import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GUIDES } from '../guides-data'
import { getGuideContent } from './guide-content'
import { getIsland } from '../../o/island-data'
import { GUIDE_ISLAND_MAP } from '../guide-island-map'

import FAQSection from '@/components/FAQSection'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const guide = GUIDES.find(g => g.slug === slug)
  if (!guide) return {}
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `https://svalla.se/guider/${slug}` },
    openGraph: {
      title: `${guide.title} – Svalla`,
      description: guide.excerpt,
      url: `https://svalla.se/guider/${slug}`,
      type: 'article',
      images: [{
        url: `https://svalla.se/guider/${slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: guide.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} – Svalla`,
      description: guide.excerpt,
      images: [`https://svalla.se/guider/${slug}/opengraph-image`],
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = GUIDES.find(g => g.slug === slug)
  if (!guide) notFound()

  const content = getGuideContent(slug)

  // Relaterade guider — topic-aware: topic-match > category-match
  // Ger starkare topisk auktoritet än ren kategori-matchning
  const byTopic = (guide.topics?.length ?? 0) > 0
    ? GUIDES.filter(g =>
        g.slug !== slug &&
        g.topics?.some(t => guide.topics!.includes(t))
      )
    : []
  const byCategory = GUIDES.filter(g =>
    g.slug !== slug &&
    !byTopic.find(b => b.slug === g.slug) &&
    g.category === guide.category
  )
  const related = [...byTopic.slice(0, 3), ...byCategory].slice(0, 4)

  // Schema.org Article — för E-E-A-T + AI Overviews-citation
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://svalla.se/guider/${slug}#article`,
    headline: guide.title,
    description: guide.excerpt,
    about: guide.category,
    inLanguage: 'sv-SE',
    timeRequired: guide.readTime,
    url: `https://svalla.se/guider/${slug}`,
    datePublished: '2025-06-01',
    dateModified: '2026-07-14',
    image: {
      '@type': 'ImageObject',
      url: `https://svalla.se/guider/${slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://svalla.se/guider/${slug}` },
    author: { '@type': 'Organization', '@id': 'https://svalla.se/#organization', name: 'Svalla' },
    publisher: { '@id': 'https://svalla.se/#organization' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Svalla', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Guider', item: 'https://svalla.se/guider' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://svalla.se/guider/${slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* JSON-LD: Article + BreadcrumbList */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 280, height: 280,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 20, left: -80,
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 48px', position: 'relative' }}>
          <div style={{ padding: '14px 0 28px' }}>
            <Link href="/guider" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
              backdropFilter: 'blur(6px)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Alla guider
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{
              background: 'rgba(255,255,255,0.18)', color: '#fff',
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 12px', borderRadius: 20,
            }}>
              {guide.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, fontWeight: 600 }}>
              {guide.readTime}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 800, color: '#fff',
            margin: '0 0 14px', lineHeight: 1.2,
          }}>
            {guide.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.65, margin: 0, maxWidth: 600 }}>
            {guide.excerpt}
          </p>
        </div>

        {/* Wave bottom */}
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <Link href="/guider" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Guider</Link>
          <span>›</span>
          <span>{guide.title}</span>
        </nav>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '8px 20px 80px' }}>
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 20,
            padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 52px)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.8,
            color: 'var(--txt)',
            fontSize: 15.5,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Back CTA */}
        <div style={{ marginTop: 36, display: 'flex', justifyContent: 'center' }}>
          <Link href="/guider" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '13px 30px', borderRadius: 28,
            boxShadow: '0 4px 16px rgba(10,123,140,0.3)',
          }}>
            ← Se alla guider
          </Link>
        </div>
      </div>

      {/* FAQ — renderas om guiden har faqs-data */}
      {guide.faqs && guide.faqs.length > 0 && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px' }}>
          <FAQSection
            items={guide.faqs}
            schemaUrl={`https://svalla.se/guider/${guide.slug}`}
          />
        </div>
      )}

      {/* Relaterade öar — intern länkning guide → /o/[slug] */}
      {(() => {
        const islandSlugs = GUIDE_ISLAND_MAP[slug] ?? []
        const islands = islandSlugs.map(s => getIsland(s)).filter(Boolean)
        if (islands.length === 0) return null
        return (
          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 48px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontSize: 22, fontWeight: 700, color: 'var(--txt)',
              margin: '0 0 16px',
            }}>
              Utforska öarna
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {islands.map(island => island && (
                <Link
                  key={island.slug}
                  href={`/o/${island.slug}`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 999,
                    background: 'var(--white)', color: 'var(--sea)',
                    textDecoration: 'none', fontSize: 14, fontWeight: 600,
                    border: '1px solid rgba(10,123,140,0.18)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{island.emoji}</span>
                  {island.name} →
                </Link>
              ))}
            </div>
          </div>
        )
      })()}

      {/* Relaterade guider */}
      {related.length > 0 && (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 60px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 22, fontWeight: 700, color: 'var(--txt)',
            margin: '0 0 20px',
          }}>
            Relaterade guider
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {related.map(r => (
              <Link key={r.slug} href={`/guider/${r.slug}`} style={{
                display: 'block', textDecoration: 'none',
                background: 'var(--white)',
                borderRadius: 14, padding: '16px 18px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid rgba(10,123,140,0.08)',
                transition: 'box-shadow 0.15s',
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{r.emoji}</div>
                <div style={{
                  fontSize: 13.5, fontWeight: 700, color: 'var(--txt)',
                  lineHeight: 1.35, marginBottom: 6,
                }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{r.readTime}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
