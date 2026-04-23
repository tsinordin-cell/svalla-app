import { createClient } from '@/lib/supabase'
import type { Tour } from '@/lib/supabase'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import RouteMap from '@/components/RouteMapClient'
import BookmarkButton from '@/components/BookmarkButton'
import type { Metadata } from 'next'

export const revalidate = 300

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = createClient()
  const { data } = await supabase.from('tours').select('title, usp, start_location, destination, best_for, cover_image').eq('id', id).single()
  if (!data) return { title: 'Rutt – Svalla' }
  const desc = data.usp ?? `Segelrutt ${data.start_location} → ${data.destination}.`
  const keywords = [
    `segelrutt ${data.start_location?.toLowerCase() ?? ''}`,
    `segla ${data.destination?.toLowerCase() ?? ''}`,
    'skärgårdsrutt sverige',
    'båttur skärgård',
    ...(Array.isArray(data.best_for) ? data.best_for : []),
  ].filter(Boolean) as string[]
  return {
    title: data.title,
    description: desc,
    keywords,
    alternates: { canonical: `https://svalla.se/rutter/${id}` },
    openGraph: {
      title: `${data.title} – Svalla`,
      description: desc,
      url: `https://svalla.se/rutter/${id}`,
      type: 'website',
      locale: 'sv_SE',
      images: data.cover_image
        ? [{ url: data.cover_image, width: 1200, height: 630, alt: data.title }]
        : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.title} – Svalla`,
      description: desc,
      images: data.cover_image ? [data.cover_image] : ['/og-image.jpg'],
    },
  }
}

export default async function TourPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()

  const { data, error } = await supabase.from('tours').select('*').eq('id', id).single()
  if (error || !data) notFound()
  const t = data as Tour

  const foodStops = Array.isArray(t.food_stops) ? t.food_stops : []

  // Fetch restaurants near this route's waypoints
  const { data: allRests } = await supabase
    .from('restaurants')
    .select('id, name, latitude, longitude, tags, core_experience, booking_url')
    .limit(1000)

  function haversineNM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3440.065
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  const nearbyRests = (allRests ?? []).filter(r =>
    r.latitude && r.longitude &&
    Array.isArray(t.waypoints) &&
    (t.waypoints as { lat: number; lng: number }[]).some(wp =>
      haversineNM(wp.lat, wp.lng, r.latitude!, r.longitude!) <= 5
    )
  ).slice(0, 5)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: t.title,
    description: t.usp ?? `${t.start_location} → ${t.destination}`,
    url: `https://svalla.se/rutter/${id}`,
    touristType: Array.isArray(t.best_for) ? t.best_for : ['Segling', 'Skärgård'],
    itinerary: {
      '@type': 'ItemList',
      itemListElement: Array.isArray(t.highlights)
        ? t.highlights.map((h: string, i: number) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: h,
          }))
        : [],
    },
    provider: {
      '@type': 'Organization',
      name: 'Svalla',
      url: 'https://svalla.se',
    },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '60px 20px 32px',
        position: 'relative',
      }}>
        <Link href="/rutter" style={{
          position: 'absolute', top: 14, left: 14,
          width: 38, height: 38, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Bookmark button */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          borderRadius: '50%',
        }}>
          <BookmarkButton routeId={t.id} />
        </div>

        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
            {t.start_location} → {t.destination}
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.2 }}>
            {t.title}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', margin: 0 }}>{t.usp}</p>
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 14px' }}>
        {/* Route map */}
        {Array.isArray(t.waypoints) && t.waypoints.length >= 2 && (
          <div style={{ margin: '16px 0' }}>
            <RouteMap waypoints={t.waypoints} height="280px" />
          </div>
        )}

        {/* Quick stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
          margin: '16px 0',
        }}>
          {[
            { icon: '⏱', label: 'Tid', value: t.duration_label },
            { icon: '🚤', label: 'Transport', value: t.transport_types.join(', ') },
            { icon: '📅', label: 'Säsong', value: t.season },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              background: 'var(--white)', borderRadius: 14,
              border: '1.5px solid rgba(10,123,140,0.10)',
              padding: '11px 12px', textAlign: 'center',
              boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
            }}>
              <div style={{ fontSize: 18, marginBottom: 3 }}>{icon}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.2 }}>{value}</div>
              <div style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 500, marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Highlights */}
        {t.highlights.length > 0 && (
          <Section title="🏝 Höjdpunkter">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {t.highlights.map((h) => (
                <div key={h} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 13px', borderRadius: 12,
                  background: 'var(--white)', border: '1px solid rgba(10,123,140,0.09)',
                }}>
                  <span style={{ fontSize: 16 }}>✦</span>
                  <span style={{ fontSize: 13, color: 'var(--txt2)', fontWeight: 500 }}>{h}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Passar för */}
        {t.best_for.length > 0 && (
          <Section title="👥 Passar för">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {t.best_for.map((b) => (
                <span key={b} style={{
                  padding: '7px 14px', borderRadius: 20,
                  background: 'rgba(30,92,130,0.08)', color: 'var(--sea)',
                  fontSize: 13, fontWeight: 600,
                }}>
                  {b}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Hamnprofil */}
        {t.hamn_profil.length > 0 && (
          <Section title="⚓ Hamnprofil">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {t.hamn_profil.map((h) => (
                <span key={h} style={{
                  padding: '6px 12px', borderRadius: 20,
                  background: 'rgba(10,123,140,0.06)', color: 'var(--sea)',
                  fontSize: 12, fontWeight: 600, border: '1px solid rgba(10,123,140,0.12)',
                }}>
                  {h}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Bad */}
        {t.bad_profil.length > 0 && (
          <Section title="🏊 Bad">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {t.bad_profil.map((b) => (
                <span key={b} style={{
                  padding: '6px 12px', borderRadius: 20,
                  background: 'rgba(0,150,180,0.07)', color: 'var(--sea)',
                  fontSize: 12, fontWeight: 600, border: '1px solid rgba(0,150,180,0.15)',
                }}>
                  {b}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Matstopp */}
        {foodStops.length > 0 && (
          <Section title="🍽 Matstopp">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {foodStops.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '11px 13px', borderRadius: 12,
                  background: 'var(--white)', border: '1px solid rgba(10,123,140,0.09)',
                }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--grad-acc)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16,
                    }}>🍴</div>
                    <div style={{
                      position: 'absolute', top: -4, right: -4,
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'var(--sea)', color: '#fff',
                      fontSize: 8, fontWeight: 700,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{i + 1}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{f.namn}</div>
                    <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
                      {f.typ} {f.nara_bryggan ? '· Nära bryggan' : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Insider-tip */}
        {t.insider_tip && (
          <div style={{
            margin: '16px 0',
            padding: '14px 16px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(201,110,42,0.08), rgba(201,110,42,0.04))',
            border: '1.5px solid rgba(201,110,42,0.2)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--acc)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              💡 Insider-tip
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>{t.insider_tip}</p>
          </div>
        )}

        {/* Log suggestions */}
        {t.log_suggestions.length > 0 && (
          <Section title="📝 Tur-logg – tänk på det här">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {t.log_suggestions.map((s) => (
                <div key={s} style={{
                  padding: '9px 13px', borderRadius: 10,
                  background: 'rgba(10,123,140,0.04)', border: '1px solid rgba(10,123,140,0.08)',
                  fontSize: 12, color: 'var(--txt3)',
                }}>
                  {s}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Platser längs rutten (Phase 4: connected data) */}
        {nearbyRests.length > 0 && (
          <Section title="🍽 Platser längs rutten">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {nearbyRests.map((r: { id: string; name: string; tags?: string[]; core_experience?: string | null; booking_url?: string | null }) => (
                <Link key={r.id} href={`/platser/${r.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--white)', borderRadius: 14, padding: '12px 14px',
                    boxShadow: '0 1px 6px rgba(0,45,60,0.07)',
                    border: '1px solid rgba(10,123,140,0.09)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', flex: 1 }}>
                        {r.name}
                      </div>
                      {r.booking_url && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 8,
                          background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
                          textTransform: 'uppercase', letterSpacing: '0.4px', flexShrink: 0,
                        }}>Bokning</span>
                      )}
                    </div>
                    {r.core_experience && (
                      <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4, marginBottom: 4 }}>
                        {r.core_experience}
                      </div>
                    )}
                    {r.tags && r.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {r.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} style={{
                            padding: '2px 8px', borderRadius: 12,
                            background: 'rgba(10,123,140,0.07)',
                            fontSize: 10, fontWeight: 600, color: 'var(--sea)',
                          }}>{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {/* CTA: Logga tur */}
        <Link href="/logga" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '15px 0', borderRadius: 16, marginTop: 8,
          background: 'var(--grad-acc)',
          color: '#fff', fontWeight: 600, fontSize: 15,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(201,110,42,0.4)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Logga den här turen
        </Link>

        {/* CTA: AI Guide */}
        <Link href={`/guide?tur=${encodeURIComponent(t.title)}`} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '13px 0', borderRadius: 16, marginTop: 10,
          background: 'var(--sea)',
          color: '#fff', fontWeight: 700, fontSize: 13,
          textDecoration: 'none',
        }}>
          🧭 Fråga Thorkel om den här turen
        </Link>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ margin: '16px 0' }}>
      <h2 style={{
        fontSize: 12, fontWeight: 600, color: 'var(--txt3)',
        textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10,
      }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
