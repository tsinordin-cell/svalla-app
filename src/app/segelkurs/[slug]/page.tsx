import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SEGELKURS_SUBS } from '../segelkurs-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SEGELKURS_SUBS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = SEGELKURS_SUBS.find(s => s.slug === slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `https://svalla.se/segelkurs/${slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://svalla.se/segelkurs/${slug}`,
      type: 'article',
    },
  }
}

export default async function SegelkursSlugPage({ params }: Props) {
  const { slug } = await params
  const page = SEGELKURS_SUBS.find(s => s.slug === slug)
  if (!page) return notFound()

  const otherPages = SEGELKURS_SUBS.filter(s => s.slug !== slug)

  const faqSchema = page.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Segelkurs', item: 'https://svalla.se/segelkurs' },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `https://svalla.se/segelkurs/${slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/segelkurs" style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← Segelkurser i Sverige
          </Link>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{page.emoji}</div>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--white)', margin: '0 0 12px' }}>
            {page.h1}
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.9, fontSize: 16, lineHeight: 1.65, margin: 0, maxWidth: 560 }}>
            {page.excerpt}
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {page.tags.map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Intro */}
        <section style={{ marginBottom: 40 }}>
          {page.intro.map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: i === 0 ? 0 : '16px 0 0' }}>
              {p}
            </p>
          ))}
        </section>

        {/* Kurstyper */}
        {page.kurstyper.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Kurser och certifikat
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {page.kurstyper.map((k, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 14, padding: '20px', border: '1px solid var(--surface-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 4 }}>{k.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{k.level} · {k.length}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--sea)' }}>{k.price}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, margin: '0 0 10px' }}>{k.desc}</p>
                  <div style={{ fontSize: 12, background: 'rgba(10,123,140,0.08)', color: 'var(--sea)', borderRadius: 8, padding: '4px 10px', display: 'inline-block', fontWeight: 600 }}>
                    🎓 {k.certificate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {page.faqs.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Vanliga frågor
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {page.faqs.map((f, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 14, padding: '18px 20px', border: '1px solid var(--surface-3)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 8, fontSize: 15 }}>{f.q}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.7 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fler segelkurser */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Fler segelkurser
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {otherPages.slice(0, 4).map(s => (
              <Link key={s.slug} href={`/segelkurs/${s.slug}`} style={{
                background: 'var(--white)', borderRadius: 12, padding: '14px 16px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{ fontSize: 22 }}>{s.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{s.h1}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{s.readTime} · {s.location}</div>
                </div>
                <span style={{ color: 'var(--sea)', fontSize: 16 }}>→</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Link href="/segelkurs" style={{ fontSize: 14, color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
              ← Alla segelkurser
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⛵</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Logga dina seglarturer på Svalla</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Dokumentera kursen och turerna, spara rutter och dela med seglarkompisar.
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
