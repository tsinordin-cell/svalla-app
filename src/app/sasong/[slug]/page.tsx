/**
 * /sasong/[slug] — Säsongssidor (vår/sommar/höst/vinter).
 *
 * Bygger på sasong-data.ts (generella tips, ingen fabricerad per-månad-data)
 * + island.facts.season för programmatisk filtrering av relevanta öar.
 *
 * SEO:
 *   - Article Schema (säsongsguide som content)
 *   - BreadcrumbList
 *   - ItemList för relaterade öar
 *   - Canonical
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SEASONS, getSeason } from '../sasong-data'
import { ALL_ISLANDS } from '../../o/island-data'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import EmailSignup from '@/components/EmailSignup'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SEASONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const season = getSeason(slug)
  if (!season) return {}
  return {
    title: `Skärgården på ${season.name.toLowerCase()}en – guide & tips ${season.monthsLabel}`,
    description: `${season.tagline} Vad förändras, vad ska du tänka på och vilka öar är öppna under ${season.monthsLabel}?`,
    keywords: [
      `skärgården ${season.name.toLowerCase()}`,
      `skärgård ${season.name.toLowerCase()}`,
      `stockholms skärgård ${season.name.toLowerCase()}`,
      `${season.name.toLowerCase()} i skärgården`,
    ],
    alternates: { canonical: `https://svalla.se/sasong/${slug}` },
    openGraph: {
      title: `Skärgården på ${season.name.toLowerCase()}en`,
      description: season.tagline,
      url: `https://svalla.se/sasong/${slug}`,
      type: 'article',
    },
  }
}

export const revalidate = 86400 // 24h — säsongsdata ändras sällan

function islandsForSeason(season: { seasonKeywords: string[] }) {
  return ALL_ISLANDS.filter(island => {
    const seasonText = (island.facts?.season || '').toLowerCase()
    return season.seasonKeywords.some(k => seasonText.includes(k.toLowerCase()))
  })
}

export default async function SasongPage({ params }: Props) {
  const { slug } = await params
  const season = getSeason(slug)
  if (!season) notFound()

  const relevantIslands = islandsForSeason(season)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `https://svalla.se/sasong/${slug}#article`,
    headline: `Skärgården på ${season.name.toLowerCase()}en – guide & tips`,
    description: season.tagline,
    about: `Skärgårdsupplevelser under ${season.name.toLowerCase()}en`,
    inLanguage: 'sv-SE',
    url: `https://svalla.se/sasong/${slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://svalla.se/sasong/${slug}` },
    author: { '@type': 'Organization', '@id': 'https://svalla.se/#organization', name: 'Svalla' },
    publisher: { '@id': 'https://svalla.se/#organization' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Svalla', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Säsong', item: 'https://svalla.se/sasong' },
      { '@type': 'ListItem', position: 3, name: season.name, item: `https://svalla.se/sasong/${slug}` },
    ],
  }

  const itemListSchema = relevantIslands.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Öar att besöka på ${season.name.toLowerCase()}en`,
    numberOfItems: relevantIslands.length,
    itemListElement: relevantIslands.slice(0, 30).map((i, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://svalla.se/o/${i.slug}`,
      name: i.name,
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {itemListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      )}

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

        {/* Hero */}
        <div style={{
          background: `linear-gradient(160deg, ${season.color} 0%, #0a3d52 100%)`,
          paddingTop: 'calc(env(safe-area-inset-top, 0px))',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)', pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 20px 40px', position: 'relative' }}>
            <div style={{ padding: '14px 0 24px' }}>
              <Link href="/sasong" style={{
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
                Alla säsonger
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{
                fontSize: 48,
                lineHeight: 1,
              }}>{season.emoji}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.65)' }}>
                  {season.monthsLabel}
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(28px, 4.5vw, 44px)',
                  fontWeight: 800, color: '#fff',
                  margin: '4px 0 0', lineHeight: 1.15,
                }}>
                  Skärgården på {season.name.toLowerCase()}en
                </h1>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 16, lineHeight: 1.6, margin: 0, maxWidth: 600 }}>
              {season.tagline}
            </p>
          </div>

          <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg, #f8f7f4)" />
          </svg>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px 20px 0' }}>

          {/* Intro */}
          <article style={{
            background: 'var(--white)',
            borderRadius: 16,
            padding: '28px 24px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.06)',
            marginBottom: 24,
          }}>
            {season.intro.map((p, i) => (
              <p key={i} style={{ lineHeight: 1.75, color: 'var(--txt2)', fontSize: 15, margin: i === 0 ? '0 0 14px' : i === season.intro.length - 1 ? '0' : '0 0 14px' }}>
                {p}
              </p>
            ))}
          </article>

          {/* What changes */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={h2Style}>Vad förändras under {season.name.toLowerCase()}en</h2>
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '20px 24px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid rgba(10,123,140,0.06)' }}>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85, color: 'var(--txt2)', fontSize: 14.5 }}>
                {season.whatChanges.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Tips */}
          <section style={{ marginBottom: 24 }}>
            <h2 style={h2Style}>Tips för {season.name.toLowerCase()}en</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {season.tips.map((tip, i) => (
                <div key={i} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.06)',
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
                    {tip.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.55, margin: 0 }}>
                    {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Öar att besöka */}
          {relevantIslands.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <h2 style={h2Style}>Öar att besöka på {season.name.toLowerCase()}en</h2>
              <p style={{ fontSize: 13.5, color: 'var(--txt3)', margin: '0 0 14px' }}>
                {relevantIslands.length} öar med säsongsverksamhet under {season.monthsLabel}.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 10,
              }}>
                {relevantIslands.map(island => (
                  <Link key={island.slug} href={`/o/${island.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--white)',
                      borderRadius: 12,
                      padding: '14px 16px',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
                      border: '1px solid rgba(10,123,140,0.06)',
                      display: 'flex', alignItems: 'center', gap: 10,
                    }}>
                      <div style={{
                        width: 32, height: 32, flexShrink: 0,
                        borderRadius: 8,
                        background: `${season.color}14`,
                        color: season.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon name={emojiToIcon(island.emoji)} size={18} stroke={1.8} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{island.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--txt3)' }}>{island.regionLabel}</div>
                      </div>
                      <span style={{ color: season.color, fontWeight: 700, fontSize: 14 }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <div style={{
            background: 'linear-gradient(135deg, #0d3f5a 0%, #1a5f7a 100%)',
            borderRadius: 20,
            padding: '28px 24px',
            marginBottom: 24,
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{season.emoji}</div>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>
              Få {season.name.toLowerCase()}ens bästa tips i inkorgen
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: '0 0 20px', lineHeight: 1.55 }}>
              Varannan tisdag: öppna öar, insider-tips och säsongsguider — direkt från Max & Thomas. Gratis, inga annonser.
            </p>
            <EmailSignup
              variant="footer"
              source={`sasong-${slug}`}
              title=""
              description=""
              buttonLabel="Prenumerera gratis →"
            />
          </div>

          {/* Activity recommendations */}
          {season.recommendedActivities.length > 0 && (
            <section style={{ marginBottom: 24 }}>
              <h2 style={h2Style}>Bästa aktiviteterna</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {season.recommendedActivities.map(act => (
                  <Link key={act.slug} href={`/aktivitet/${act.slug}`} style={{
                    background: 'var(--white)',
                    borderRadius: 12,
                    padding: '14px 18px',
                    textDecoration: 'none',
                    color: 'var(--txt)',
                    fontSize: 14,
                    fontWeight: 700,
                    border: '1px solid rgba(10,123,140,0.06)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span>{act.label} på {season.name.toLowerCase()}en</span>
                    <span style={{ color: season.color }}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: 'var(--txt)',
  margin: '0 0 14px',
  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
}
