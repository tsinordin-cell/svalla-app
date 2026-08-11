import type { Metadata } from 'next'
import Prisuppskattning from '@/components/Prisuppskattning'
import Prisobservation from '@/components/Prisobservation'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { HYRBAT_SUBS } from '../hyrbat-data'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return HYRBAT_SUBS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = HYRBAT_SUBS.find(s => s.slug === slug)
  if (!page) return {}
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical: `https://svalla.se/hyra-bat/${slug}` },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `https://svalla.se/hyra-bat/${slug}`,
      type: 'article',
    },
  }
}

export default async function HyraBatSlugPage({ params }: Props) {
  const { slug } = await params
  const page = HYRBAT_SUBS.find(s => s.slug === slug)
  if (!page) return notFound()

  const otherPages = HYRBAT_SUBS.filter(s => s.slug !== slug)

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
      { '@type': 'ListItem', position: 2, name: 'Hyra båt', item: 'https://svalla.se/hyra-bat' },
      { '@type': 'ListItem', position: 3, name: page.h1, item: `https://svalla.se/hyra-bat/${slug}` },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/hyra-bat" style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← Hyra båt i Sverige
          </Link>
          <div style={{ marginBottom: 12, color: 'var(--white)' }}><Icon name={emojiToIcon(page.emoji)} size={40} stroke={1.5} /></div>
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

        {/* Priser */}
        {page.priceTable.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
              Priser – hyra båt {page.location.includes('Stockholm') ? 'i ' : page.location.startsWith('G') || page.location.startsWith('H') || page.location.startsWith('B') ? 'i ' : 'på '}{page.location}
            </h2>
            {page.priceObserved ? (
              <Prisobservation antal={page.priceObserved.antal} kallor={page.priceObserved.kallor} hamtad={page.priceObserved.hamtad} />
            ) : (
              <Prisuppskattning uppdaterad="augusti 2026" vad="uthyrare" />
            )}
            <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
              {page.priceTable.map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  padding: '14px 18px', borderBottom: i < page.priceTable.length - 1 ? '1px solid var(--surface-3)' : 'none',
                  gap: 12, alignItems: 'start',
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{row.type}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{row.note}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--sea)', whiteSpace: 'nowrap' }}>{row.price}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8, lineHeight: 1.5 }}>Bränsle tillkommer alltid. Priser varierar per säsong och bolag.</p>
          </section>
        )}

        {/* Exempelbåtar — riktiga annonser med avläst pris */}
        {page.exampleBoats && page.exampleBoats.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
              Exempel på båtar att hyra just nu
            </h2>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.6 }}>
              Verkliga annonser med avläst pris — inte typexempel. Aktuellt pris och tillgänglighet ser du hos förmedlaren.
            </p>
            <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
              {page.exampleBoats.map((b, i) => (
                <a key={i} href={b.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    padding: '14px 18px', borderBottom: i < page.exampleBoats!.length - 1 ? '1px solid var(--surface-3)' : 'none',
                    gap: 12, alignItems: 'center', textDecoration: 'none',
                  }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{b.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{b.size} · hos {b.provider} ↗</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--sea)', whiteSpace: 'nowrap' }}>{b.price}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {page.tips.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Tips och praktisk info
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
              {page.tips.map((t, i) => (
                <div key={i} style={{ background: 'var(--white)', borderRadius: 14, padding: '18px', border: '1px solid var(--surface-3)' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 6 }}>{t.heading}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, margin: 0 }}>{t.text}</p>
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

        {/* Fler hyra-bat-guider */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Hyra båt – fler destinationer
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {otherPages.slice(0, 4).map(s => (
              <Link key={s.slug} href={`/hyra-bat/${s.slug}`} style={{
                background: 'var(--white)', borderRadius: 12, padding: '14px 16px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{ color: 'var(--sea)', display: 'inline-flex', flexShrink: 0 }}><Icon name={emojiToIcon(s.emoji)} size={22} stroke={1.7} /></span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{s.h1}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{s.readTime} · {s.location}</div>
                </div>
                <span style={{ color: 'var(--sea)', fontSize: 16 }}>→</span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Link href="/hyra-bat" style={{ fontSize: 14, color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
              ← Alla hyra-båt-guider
            </Link>
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ marginBottom: 12, color: 'var(--sea)', display: 'flex', justifyContent: 'center' }}><Icon name={emojiToIcon(page.emoji)} size={32} stroke={1.7} /></div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Planera din båttur på Svalla</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Läs om öar, spara rutter och logga dina turer. Allt på ett ställe.
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
