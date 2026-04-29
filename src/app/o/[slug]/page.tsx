import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../island-data'
import SvallaLogo from '@/components/SvallaLogo'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ISLAND_COORD_MAP } from '@/lib/islandCoords'
import IslandWeatherClient from '@/components/IslandWeatherClient'
import SaveIslandButton from '@/components/SaveIslandButton'
import FAQSection from '@/components/FAQSection'
import { getFaqsForIsland } from '@/lib/islandFaqs'
import { ACTIVITY_LIST, islandActivitiesForType, type ActivityType } from '@/app/aktivitet/activity-data'
import EmailSignup from '@/components/EmailSignup'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  return {
    title: `${island.name} – Guide till ön | Svalla`,
    description: `Allt om ${island.name}: restauranger, aktiviteter, boende och hur du tar dig dit. ${island.tagline}`,
    keywords: [`${island.name.toLowerCase()} skärgård`, `${island.name.toLowerCase()} restaurang`, `resa till ${island.name.toLowerCase()}`, 'stockholms skärgård guide'],
    openGraph: {
      title: `${island.name} – ${island.tagline}`,
      description: `Komplett guide till ${island.name} i Stockholms skärgård.`,
      url: `https://svalla.se/o/${slug}`,
      images: [{
        url: `https://svalla.se/api/og/island/${slug}`,
        width: 1200, height: 630,
        alt: `${island.name} — ${island.tagline}`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${island.name} – ${island.tagline}`,
      description: `Guide till ${island.name} i ${island.regionLabel.toLowerCase()}.`,
      images: [`https://svalla.se/api/og/island/${slug}`],
    },
  }
}

export const revalidate = 3600  // uppdatera besöksräknaren max en gång/timme

export default async function IslandPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Hämta antal unika besökare för denna ö
  const supabase = await createServerSupabaseClient()
  const { count: visitorCount } = await supabase
    .from('visited_islands')
    .select('*', { count: 'exact', head: true })
    .eq('island_slug', slug)

  const regionColor = island.region === 'norra'
    ? '#1a5276'
    : island.region === 'södra'
    ? '#1a4a3a'
    : 'var(--sea)'

  const relatedIslands = ALL_ISLANDS.filter(i => island.related.includes(i.slug))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
    
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristAttraction',
            name: island.name,
            description: island.tagline,
            url: `https://svalla.se/o/${island.slug}`,
            ...(island.lat && island.lng ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: island.lat,
                longitude: island.lng,
              },
            } : {}),
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
            { '@type': 'ListItem', position: 2, name: 'Öar', item: 'https://svalla.se/rutter?vy=oar' },
            { '@type': 'ListItem', position: 3, name: island.name, item: `https://svalla.se/o/${slug}` },
          ],
        }) }}
      />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav style={{
        background: `linear-gradient(160deg, ${regionColor} 0%, #2d7d8a 100%)`,
        padding: '18px 24px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/rutter?vy=oar" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>
            ← Alla öar
          </Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(170deg, ${regionColor} 0%, #2d7d8a 60%, #1a9ab0 100%)`,
        padding: '52px 24px 44px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.18)',
              padding: '4px 12px',
              borderRadius: 20,
              color: 'rgba(255,255,255,0.9)',
            }}>{island.regionLabel}</span>
            {island.tags.slice(0, 3).map(tag => (
              <span key={tag} style={{
                fontSize: 11,
                color: 'rgba(255,255,255,0.65)',
                background: 'rgba(255,255,255,0.1)',
                padding: '3px 10px',
                borderRadius: 20,
              }}>{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 14 }}>
            <div style={{
              width: 56, height: 56, flexShrink: 0,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.16)',
              border: '1px solid rgba(255,255,255,0.22)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>
              <Icon name={emojiToIcon(island.emoji)} size={28} stroke={1.7} />
            </div>
            <div>
              <h1 style={{ fontSize: 42, fontWeight: 700, margin: '0 0 6px', letterSpacing: -0.5, fontFamily: "'Playfair Display', Georgia, serif" }}>{island.name}</h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.5, maxWidth: 560, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>{island.tagline}</p>
              {(visitorCount ?? 0) > 0 ? (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 14, padding: '8px 16px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.22)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  fontSize: 14, fontWeight: 700, color: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 21.3C7 14.5 4.8 11 4.8 7.8a7.2 7.2 0 0 1 14.4 0c0 3.2-2.2 6.7-7.2 13.5Z" />
                    <circle cx="12" cy="8" r="2.4" />
                  </svg>
                  <span>
                    <strong style={{ fontSize: 15 }}>{visitorCount?.toLocaleString('sv-SE')}</strong>{' '}
                    seglare har besökt {island.name} via Svalla
                  </span>
                </div>
              ) : (
                <Link href={`/logga-in?next=/logga`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 14, padding: '8px 16px', borderRadius: 999,
                  background: 'rgba(255,255,255,0.16)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  fontSize: 13, fontWeight: 600, color: '#fff',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M12 21.3C7 14.5 4.8 11 4.8 7.8a7.2 7.2 0 0 1 14.4 0c0 3.2-2.2 6.7-7.2 13.5Z" />
                    <circle cx="12" cy="8" r="2.4" />
                  </svg>
                  <span>Bli den första att logga ett besök på {island.name} →</span>
                </Link>
              )}
              {/* Live väder — kräver koordinater */}
              {ISLAND_COORD_MAP[island.slug] && (
                <IslandWeatherClient
                  lat={ISLAND_COORD_MAP[island.slug]!.lat}
                  lng={ISLAND_COORD_MAP[island.slug]!.lng}
                  islandName={island.name}
                />
              )}
            </div>
          </div>

          {/* Spara ön CTA */}
          <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
            <SaveIslandButton islandSlug={island.slug} islandName={island.name} variant="pill" />
          </div>

          {/* Quick facts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 10,
            marginTop: 22,
          }}>
            {([
              { label: 'Restid',      value: island.facts.travel_time, icon: 'compass'    as const },
              { label: 'Karaktär',    value: island.facts.character,   icon: 'leaf'       as const },
              { label: 'Säsong',      value: island.facts.season,      icon: 'sun'        as const },
              { label: 'Perfekt för', value: island.facts.best_for,    icon: 'star'       as const },
            ]).map(f => (
              <div key={f.label} style={{
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 12,
                padding: '12px 16px',
                backdropFilter: 'blur(4px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 5 }}>
                  <Icon name={f.icon} size={12} stroke={2} />
                  <span>{f.label}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* Visste du att */}
        {island.did_you_know && (
          <div style={{
            background: 'linear-gradient(135deg, #0a7b8c 0%, #1a5276 100%)',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 36,
            display: 'flex',
            gap: 16,
            alignItems: 'flex-start',
            boxShadow: '0 4px 20px rgba(10,123,140,0.2)',
          }}>
            <span style={{ fontSize: 26, flexShrink: 0, lineHeight: 1.2 }}>💡</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Visste du att</div>
              <p style={{ fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.7, fontWeight: 500 }}>{island.did_you_know}</p>
            </div>
          </div>
        )}

        {/* Om ön */}
        <section style={{ marginBottom: 52 }}>
          <SectionHeader icon="📖" title={`Om ${island.name}`} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {island.description.map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>{para}</p>
            ))}
          </div>
        </section>

        {/* Aktiviteter */}
        {island.activities.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="🎯" title="Se & Göra" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 14,
            }}>
              {island.activities.map(act => (
                <div key={act.name} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '18px 20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                  borderLeft: '3px solid #2d7d8a',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(45,125,138,0.12)', color: 'var(--sea)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 10,
                  }}>
                    <Icon name={emojiToIcon(act.icon)} size={18} stroke={1.85} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 5 }}>{act.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6 }}>{act.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Restauranger */}
        {island.restaurants.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="🍽" title="Mat & Dryck" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {island.restaurants.map(r => (
                <div key={r.name} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    minWidth: 36,
                    height: 36,
                    borderRadius: 10,
                    background: 'var(--grad-sea)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                  }}>🍴</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{r.name}</span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: 'var(--sea)',
                        background: 'rgba(45,125,138,0.1)',
                        padding: '2px 8px',
                        borderRadius: 10,
                      }}>{r.type}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 8px', lineHeight: 1.6 }}>{r.desc}</p>
                    {(r.bookingUrl || r.websiteUrl) && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {r.bookingUrl && (
                          <a
                            href={r.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            data-svalla-track="booking-click"
                            data-place={r.name}
                            data-island={island.slug}
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 14px', borderRadius: 999,
                              background: 'var(--acc, #c96e2a)', color: '#fff',
                              fontSize: 12, fontWeight: 700,
                              textDecoration: 'none',
                            }}
                          >
                            Boka bord →
                          </a>
                        )}
                        {r.websiteUrl && (
                          <a
                            href={r.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex', alignItems: 'center', gap: 6,
                              padding: '6px 14px', borderRadius: 999,
                              background: 'transparent', color: 'var(--sea)',
                              border: '1px solid var(--sea)',
                              fontSize: 12, fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            Hemsida →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Boende */}
        {island.accommodation.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="🛏" title="Boende" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 14,
            }}>
              {island.accommodation.map(acc => (
                <div key={acc.name} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{acc.name}</span>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: 'var(--sea)',
                      background: 'rgba(30,92,130,0.08)',
                      padding: '3px 9px',
                      borderRadius: 10,
                      whiteSpace: 'nowrap',
                      marginLeft: 8,
                    }}>{acc.type}</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.6 }}>{acc.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Ta sig dit */}
        {island.getting_there.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="🗺" title="Ta sig dit" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {island.getting_there.map(t => (
                <div key={t.method} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 40, height: 40, flexShrink: 0,
                    borderRadius: 10,
                    background: 'rgba(30,92,130,0.10)',
                    color: 'var(--sea)',
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
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--sea)',
                          background: 'rgba(45,125,138,0.1)',
                          padding: '2px 8px',
                          borderRadius: 10,
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

        {/* Hamnar */}
        {island.harbors.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="⚓" title="Hamnar & Service" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 14,
            }}>
              {island.harbors.map(h => (
                <div key={h.name} style={{
                  background: 'var(--white)',
                  borderRadius: 14,
                  padding: '20px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{h.name}</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {h.spots && <span style={{ fontSize: 10, color: 'var(--txt3)' }}>{h.spots} platser</span>}
                      {h.fuel && (
                        <span title="Bränsle finns" style={{ display: 'inline-flex', color: 'var(--acc, #c96e2a)' }}>
                          <Icon name="fuel" size={14} stroke={2} />
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 10px', lineHeight: 1.6 }}>{h.desc}</p>
                  {h.service && h.service.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {h.service.map(s => (
                        <span key={s} style={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: 'var(--sea)',
                          background: 'rgba(30,92,130,0.08)',
                          padding: '2px 8px',
                          borderRadius: 8,
                        }}>{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {island.tips.length > 0 && (
          <section style={{ marginBottom: 52 }}>
            <SectionHeader icon="💡" title="Tips från oss" />
            <div style={{
              background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
              borderRadius: 16,
              padding: '24px',
              border: '1px solid rgba(30,92,130,0.12)',
            }}>
              {island.tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex',
                  gap: 12,
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

        {/* FAQ — vanliga frågor (SEO Featured Snippets) */}
        <FAQSection
          items={getFaqsForIsland(island)}
          title={`Vanliga frågor om ${island.name}`}
          schemaUrl={`https://svalla.se/o/${island.slug}`}
        />

        {/* Aktiviteter — SEO cross-länkar */}
        {(() => {
          const matchingActivities = ACTIVITY_LIST.filter(a =>
            islandActivitiesForType(island, a.slug as ActivityType).length > 0
          )
          if (matchingActivities.length === 0) return null
          return (
            <section style={{ marginBottom: 36 }}>
              <SectionHeader icon="✦" title="Vad du kan göra här" />
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8,
              }}>
                {matchingActivities.map(a => (
                  <Link
                    key={a.slug}
                    href={`/aktivitet/${a.slug}/${island.slug}`}
                    style={{
                      padding: '8px 16px', borderRadius: 999,
                      background: 'var(--white)', color: 'var(--sea)',
                      textDecoration: 'none', fontSize: 14, fontWeight: 600,
                      border: '1px solid var(--surface-3)',
                    }}
                  >
                    {a.name} på {island.name} →
                  </Link>
                ))}
              </div>
            </section>
          )
        })()}

        {/* Related islands */}
        {relatedIslands.length > 0 && (
          <section style={{ marginBottom: 0 }}>
            <SectionHeader icon="🗺" title="Besök också" />
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 12,
            }}>
              {relatedIslands.map(rel => (
                <Link key={rel.slug} href={`/o/${rel.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--white)',
                    borderRadius: 14,
                    padding: '18px 20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    transition: 'transform .15s, box-shadow .15s',
                    cursor: 'pointer',
                  }}>
                    <div style={{
                      width: 38, height: 38, flexShrink: 0,
                      borderRadius: 10,
                      background: 'rgba(30,92,130,0.10)',
                      color: 'var(--sea)',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Icon name={emojiToIcon(rel.emoji)} size={20} stroke={1.8} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>{rel.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{rel.regionLabel}</div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--sea)', fontWeight: 700, fontSize: 16 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* E-postsignup för ön */}
        <div style={{ marginTop: 28 }}>
          <EmailSignup
            variant="card"
            source={`o-${island.slug}`}
            title={`Vill du veta mer om ${island.name}?`}
            description="Få tips på krogar, evenemang och nya rutter — 2 mail i månaden, lätt att avregistrera."
          />
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <div style={{
        background: 'var(--txt)',
        padding: '28px 24px',
        textAlign: 'center',
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

// Mappa de få emojis vi använder direkt på sektion-headers till IconName.
// (Resten av appen använder emojiToIcon från lib.)
const HEADER_ICON_MAP: Record<string, import('@/components/Icon').IconName> = {
  '📖': 'mail',          // Om-sektion
  '🎯': 'target',        // Se & Göra
  '🍽': 'utensils',
  '🛏': 'bed',
  '🗺': 'map',
  '⚓': 'anchor',
  '💡': 'star',
  '✦': 'star',
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
  const iconName = HEADER_ICON_MAP[icon] ?? 'compass'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <span style={{
        display: 'inline-flex',
        width: 28, height: 28,
        borderRadius: 8,
        background: 'rgba(30,92,130,0.10)',
        color: 'var(--sea)',
        alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={iconName} size={16} stroke={1.85} />
      </span>
      <h2 style={{
        fontSize: 19,
        fontWeight: 700,
        color: 'var(--txt)',
        margin: 0,
        letterSpacing: -0.2,
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: 'rgba(30,92,130,0.12)', marginLeft: 8 }} />
    </div>
  )
}
