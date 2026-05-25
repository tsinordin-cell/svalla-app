import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { UPPLÄGG, WEATHER_TAG, tagColor } from '../dag-data'
import { getIsland } from '@/app/o/island-data'
import SvallaLogo from '@/components/SvallaLogo'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return UPPLÄGG.map(u => ({ slug: u.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const plan = UPPLÄGG.find(u => u.slug === slug)
  if (!plan) return {}
  const island = getIsland(slug)
  const title = `Dagstur till ${plan.name} — vad göra, mat & transport | Svalla`
  const description = `Komplett dagstursguide till ${plan.name}: ${plan.desc} ${plan.duration}, ${plan.distance}.`
  return {
    title,
    description,
    alternates: { canonical: `https://svalla.se/dag/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://svalla.se/dag/${slug}`,
      type: 'article',
      ...(island ? {
        images: [{
          url: `https://svalla.se/api/og/island/${slug}`,
          width: 1200, height: 630,
          alt: `${plan.name} — dagstur i Stockholms skärgård`,
        }],
      } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(island ? { images: [`https://svalla.se/api/og/island/${slug}`] } : {}),
    },
  }
}

export default async function DagSlugPage({ params }: Props) {
  const { slug } = await params
  const plan = UPPLÄGG.find(u => u.slug === slug)
  if (!plan) notFound()

  const island = getIsland(slug)
  const weather = WEATHER_TAG[plan.weatherTag]

  // Relaterade upplägg — samma tags, ej denna ö
  const related = UPPLÄGG.filter(u =>
    u.slug !== slug &&
    u.tags.some(t => plan.tags.includes(t))
  ).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

      {/* JSON-LD — TouristTrip */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristTrip',
            name: `Dagstur till ${plan.name}`,
            description: plan.desc,
            url: `https://svalla.se/dag/${slug}`,
            touristType: plan.tags,
            itinerary: {
              '@type': 'ItemList',
              name: `Dagsprogram ${plan.name}`,
              itemListElement: [
                ...(island?.getting_there?.slice(0, 1).map((t, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: t.method,
                  description: t.desc,
                })) ?? []),
                ...(island?.activities?.slice(0, 3).map((a, i) => ({
                  '@type': 'ListItem',
                  position: i + 2,
                  name: a.name,
                  description: a.desc,
                })) ?? []),
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Hem',        item: 'https://svalla.se' },
              { '@type': 'ListItem', position: 2, name: 'Dagsupplägg', item: 'https://svalla.se/dag' },
              { '@type': 'ListItem', position: 3, name: plan.name,    item: `https://svalla.se/dag/${slug}` },
            ],
          }),
        }}
      />

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav style={{
        background: 'linear-gradient(160deg, #1a3a5c 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/dag" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>
            ← Alla dagsupplägg
          </Link>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(170deg, #1a3a5c 0%, #1e5c82 55%, #2d7d8a 100%)',
        padding: '52px 24px 44px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 18, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href="/dag" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>Dagsupplägg</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{plan.name}</span>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {plan.tags.map(tag => {
              const tc = tagColor(tag)
              return (
                <span key={tag} style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 0.8,
                  background: 'rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.88)',
                  padding: '4px 12px', borderRadius: 20,
                }}>{tag}</span>
              )
            })}
            <span style={{
              fontSize: 11, fontWeight: 700,
              background: weather.bg,
              color: weather.color,
              padding: '4px 12px', borderRadius: 20,
              backdropFilter: 'blur(4px)',
            }}>{weather.label}</span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 42, fontWeight: 700, margin: '0 0 10px',
            letterSpacing: -0.5,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Dagstur till {plan.name}
          </h1>
          <p style={{
            fontSize: 17, color: 'rgba(255,255,255,0.82)',
            margin: '0 0 28px', lineHeight: 1.5, maxWidth: 580,
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: 'italic',
          }}>
            {plan.tagline}
          </p>

          {/* Snabbfakta */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { icon: 'clock' as const, label: 'Tid', value: plan.duration },
              { icon: 'compass' as const, label: 'Avstånd', value: plan.distance },
            ].map(f => (
              <div key={f.label} style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '10px 16px',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Icon name={f.icon} size={16} stroke={2} />
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{f.value}</div>
                </div>
              </div>
            ))}
            <Link href={`/o/${slug}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 12,
              background: 'rgba(255,255,255,0.18)',
              color: '#fff', textDecoration: 'none',
              fontSize: 13, fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.25)',
              backdropFilter: 'blur(4px)',
            }}>
              <Icon name="map" size={15} stroke={2} />
              Fullständig ö-guide →
            </Link>
          </div>
        </div>
      </div>

      {/* ── MAIN ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Upplägg för dagen */}
        <section style={{ marginBottom: 48 }}>
          <SectionHeader icon="calendar" title="Upplägg för dagen" />
          <div style={{
            background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
            borderRadius: 16, padding: '24px 28px',
            border: '1px solid rgba(30,92,130,0.10)',
          }}>
            <p style={{ fontSize: 16, color: 'var(--txt2)', margin: 0, lineHeight: 1.8 }}>{plan.desc}</p>
          </div>
        </section>

        {/* Ta sig dit */}
        {island?.getting_there && island.getting_there.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon="map" title="Ta sig dit" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {island.getting_there.map(t => (
                <div key={t.method} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 40, height: 40, flexShrink: 0, borderRadius: 10,
                    background: 'rgba(30,92,130,0.10)', color: 'var(--sea)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name={emojiToIcon(t.icon)} size={20} stroke={1.8} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{t.method}</span>
                      {t.from && <span style={{ fontSize: 12, color: 'var(--txt3)' }}>från {t.from}</span>}
                      {t.time && (
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: 'var(--sea)',
                          background: 'rgba(45,125,138,0.1)', padding: '2px 8px', borderRadius: 10,
                        }}>⏱ {t.time}</span>
                      )}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vad du gör på ön */}
        {island?.activities && island.activities.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon="target" title={`Vad du gör på ${plan.name}`} />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 12,
            }}>
              {island.activities.slice(0, 6).map(act => (
                <div key={act.name} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '18px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  borderLeft: '3px solid #2d7d8a',
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 9,
                    background: 'rgba(45,125,138,0.12)', color: 'var(--sea)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                    <Icon name={emojiToIcon(act.icon)} size={17} stroke={1.85} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 5 }}>{act.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6 }}>{act.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Mat på ön */}
        {island?.restaurants && island.restaurants.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon="utensils" title={`Mat på ${plan.name}`} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {island.restaurants.slice(0, 4).map(r => (
                <div key={r.name} style={{
                  background: 'var(--white)', borderRadius: 14,
                  padding: '16px 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                }}>
                  <div style={{
                    minWidth: 36, height: 36, borderRadius: 10,
                    background: 'var(--grad-sea)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>🍴</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{r.name}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: 'var(--sea)',
                        background: 'rgba(45,125,138,0.1)', padding: '2px 8px', borderRadius: 10,
                      }}>{r.type}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 8px', lineHeight: 1.6 }}>{r.desc}</p>
                    {(r.bookingUrl || r.websiteUrl) && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {r.bookingUrl && (
                          <a href={r.bookingUrl} target="_blank" rel="noopener noreferrer sponsored"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 14px', borderRadius: 999,
                              background: 'var(--acc, #c96e2a)', color: '#fff',
                              fontSize: 12, fontWeight: 700, textDecoration: 'none',
                            }}>Boka bord →</a>
                        )}
                        {r.websiteUrl && (
                          <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 14px', borderRadius: 999,
                              background: 'transparent', color: 'var(--sea)',
                              border: '1px solid var(--sea)',
                              fontSize: 12, fontWeight: 600, textDecoration: 'none',
                            }}>Hemsida →</a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {island?.tips && island.tips.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <SectionHeader icon="star" title="Tips inför turen" />
            <div style={{
              background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
              borderRadius: 16, padding: '24px',
              border: '1px solid rgba(30,92,130,0.12)',
            }}>
              {island.tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 12,
                  marginBottom: i < island.tips.length - 1 ? 16 : 0,
                  paddingBottom: i < island.tips.length - 1 ? 16 : 0,
                  borderBottom: i < island.tips.length - 1 ? '1px solid rgba(30,92,130,0.08)' : 'none',
                }}>
                  <span style={{ fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>→</span>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.7 }}>{tip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA — fullständig ö-guide */}
        <section style={{ marginBottom: 48 }}>
          <Link href={`/o/${slug}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a3a5c 0%, #0d6e6e 100%)',
              borderRadius: 20, padding: '24px 28px',
              display: 'flex', alignItems: 'center', gap: 20,
              boxShadow: '0 6px 28px rgba(13,110,110,0.22)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                width: 48, height: 48, flexShrink: 0, borderRadius: 14,
                background: 'rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.18)',
              }}>
                <Icon name="map" size={22} stroke={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 5 }}>
                  Vill du veta mer?
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Fullständig guide till {plan.name}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>
                  Hamnar, boende, detaljerade aktiviteter och allt du behöver veta om ön.
                </div>
              </div>
              <div style={{
                width: 34, height: 34, flexShrink: 0, borderRadius: 9,
                background: 'rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="arrowRight" size={16} stroke={2.5} />
              </div>
            </div>
          </Link>
        </section>

        {/* Fråga Thorkel */}
        <section style={{ marginBottom: 48 }}>
          <Link href={`/guide?q=dagstur+till+${encodeURIComponent(plan.name)}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a2e1a 0%, #1e5c3a 100%)',
              borderRadius: 20, padding: '24px 28px',
              display: 'flex', alignItems: 'center', gap: 20,
              boxShadow: '0 6px 28px rgba(20,90,50,0.2)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                width: 48, height: 48, flexShrink: 0, borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.18)',
                fontSize: 24,
              }}>⚓</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 5 }}>
                  AI-guide
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Fråga Thorkel om {plan.name}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>
                  Thorkel är 70 år och seglade runt {plan.name} i 40 år. Fråga honom vad du vill.
                </div>
              </div>
              <div style={{
                width: 34, height: 34, flexShrink: 0, borderRadius: 9,
                background: 'rgba(255,255,255,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="arrowRight" size={16} stroke={2.5} />
              </div>
            </div>
          </Link>
        </section>

        {/* Relaterade dagsupplägg */}
        {related.length > 0 && (
          <section style={{ marginBottom: 0 }}>
            <SectionHeader icon="compass" title="Fler dagsupplägg att prova" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 12,
            }}>
              {related.map(rel => {
                const rw = WEATHER_TAG[rel.weatherTag]
                return (
                  <Link key={rel.slug} href={`/dag/${rel.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--white)', borderRadius: 14,
                      padding: '18px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                      height: '100%', cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                        {rel.tags.slice(0, 2).map(t => {
                          const tc = tagColor(t)
                          return (
                            <span key={t} style={{
                              fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                              color: tc.color, background: tc.bg,
                            }}>{t}</span>
                          )
                        })}
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>{rel.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 10, lineHeight: 1.5 }}>{rel.tagline}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{rel.duration}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)' }}>→</span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--txt)', padding: '28px 24px', textAlign: 'center',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 10 }}>
          <SvallaLogo height={22} color="rgba(255,255,255,0.5)" />
        </Link>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
          Din guide till Stockholms skärgård
        </p>
      </div>
    </div>
  )
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  const ICON_MAP: Record<string, import('@/components/Icon').IconName> = {
    calendar:  'compass',
    map:       'map',
    target:    'target',
    utensils:  'utensils',
    star:      'star',
    compass:   'compass',
    'arrow-right': 'arrowRight',
  }
  const iconName = (ICON_MAP[icon] ?? 'compass') as import('@/components/Icon').IconName
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span style={{
        display: 'inline-flex', width: 28, height: 28, borderRadius: 8,
        background: 'rgba(30,92,130,0.10)', color: 'var(--sea)',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name={iconName} size={16} stroke={1.85} />
      </span>
      <h2 style={{
        fontSize: 19, fontWeight: 700, color: 'var(--txt)', margin: 0,
        letterSpacing: -0.2,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: 'rgba(30,92,130,0.12)', marginLeft: 8 }} />
    </div>
  )
}
