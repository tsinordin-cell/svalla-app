import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { GUIDES } from '../guides-data'
import { getGuideContent } from './guide-content'

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
    title: `${guide.title} – Svalla`,
    description: guide.excerpt,
    alternates: { canonical: `https://svalla.se/guider/${slug}` },
    openGraph: {
      title: `${guide.title} – Svalla`,
      description: guide.excerpt,
      url: `https://svalla.se/guider/${slug}`,
    },
  }
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params
  const guide = GUIDES.find(g => g.slug === slug)
  if (!guide) notFound()

  const content = getGuideContent(slug)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 20px' }}>
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

          <div style={{ fontSize: 52, marginBottom: 16 }}>{guide.emoji}</div>

          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.18)', color: '#fff',
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            padding: '4px 12px', borderRadius: 20, marginBottom: 12,
          }}>
            {guide.category} · {guide.readTime}
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.25 }}>
            {guide.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
            {guide.excerpt}
          </p>
        </div>
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
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 20px' }}>
        <div
          style={{
            background: 'var(--white)',
            borderRadius: 18,
            padding: '36px 40px',
            boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
            border: '1px solid rgba(10,123,140,0.06)',
            lineHeight: 1.75,
            color: 'var(--txt)',
            fontSize: 15,
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Back CTA */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link href="/guider" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 24,
          }}>
            ← Se alla guider
          </Link>
        </div>
      </div>
    </div>
  )
}
