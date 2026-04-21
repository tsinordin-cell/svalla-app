import { createClient } from '@/lib/supabase'
import type { Restaurant } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReviewSection from '@/components/ReviewForm'
import BookmarkButton from '@/components/BookmarkButton'
import PlaceSocialSection from '@/components/PlaceSocialSection'
import type { Metadata } from 'next'

export const revalidate = 60   // refresh reviews regularly

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = createClient()
  const { data } = await supabase.from('restaurants').select('name, description, island, image_url, tags').eq('id', id).single()
  if (!data) return { title: 'Restaurang – Svalla' }
  const desc = data.description ?? `${data.name} på ${data.island ?? 'skärgårdsön'} – mat och dryck längs kusten.`
  const keywords = [
    data.name?.toLowerCase(),
    data.island ? `${data.island.toLowerCase()} restaurang` : null,
    'skärgårdsrestaurang',
    'Stockholms skärgård',
    ...(Array.isArray(data.tags) ? data.tags : []),
  ].filter(Boolean) as string[]
  return {
    title: data.name,
    description: desc,
    keywords,
    alternates: { canonical: `https://svalla.se/platser/${id}` },
    openGraph: {
      title: `${data.name} – Svalla`,
      description: desc,
      images: data.image_url ? [{ url: data.image_url, width: 1200, height: 630, alt: data.name }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
      url: `https://svalla.se/platser/${id}`,
      type: 'website',
      locale: 'sv_SE',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} – Svalla`,
      description: desc,
      images: data.image_url ? [data.image_url] : ['/og-image.jpg'],
    },
  }
}

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()

  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) notFound()
  const r = data as Restaurant

  // Fetch recent trips nearby this restaurant (trips linking to this place)
  // Visa senaste turer med bild — matchas mot restaurangens namn om möjligt, annars senaste globalt
  const { data: recentTripsRaw } = await supabase
    .from('trips')
    .select('id, image, location_name, created_at, user_id')
    .not('image', 'is', null)
    .order('created_at', { ascending: false })
    .limit(6)
  const tripUids = [...new Set((recentTripsRaw ?? []).map((t: { user_id: string }) => t.user_id).filter(Boolean))]
  const { data: tripUserRows } = tripUids.length
    ? await supabase.from('users').select('id, username').in('id', tripUids)
    : { data: [] }
  const tripUmap: Record<string, string> = {}
  for (const u of tripUserRows ?? []) {
    if (u?.id) tripUmap[u.id] = u.username ?? 'Seglare'
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recentTrips = (recentTripsRaw ?? []).map((t: any) => ({ ...t, users: { username: tripUmap[t.user_id] ?? 'Seglare' } }))

  // Rutter som passerar nära platsen
  const { data: allTours } = await supabase
    .from('tours')
    .select('id, title, usp, duration_label, start_location, destination, waypoints, best_for, cover_image')
    .order('title', { ascending: true })

  function haversineNM(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3440.065
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  const nearbyTours = r.latitude && r.longitude
    ? (allTours ?? []).filter((t: { waypoints: { lat: number; lng: number }[] }) =>
        Array.isArray(t.waypoints) &&
        t.waypoints.some((wp: { lat: number; lng: number }) =>
          haversineNM(r.latitude!, r.longitude!, wp.lat, wp.lng) <= 25
        )
      ).slice(0, 3)
    : []

  // Aggregate review stats for header
  const { data: reviewStats } = await supabase
    .from('reviews')
    .select('rating')
    .eq('place_id', id)

  const avgRating = reviewStats && reviewStats.length > 0
    ? (reviewStats.reduce((a: number, r: { rating?: number }) => a + (r?.rating ?? 0), 0) / reviewStats.length)
    : null
  const reviewCount = reviewStats?.length ?? 0

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: r.name,
    description: r.description ?? undefined,
    url: `https://svalla.se/platser/${id}`,
    ...(r.latitude && r.longitude ? {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: r.latitude,
        longitude: r.longitude,
      },
      hasMap: `https://maps.apple.com/?q=${r.latitude},${r.longitude}`,
    } : {}),
    ...(r.images?.[0] ? { image: r.images[0] } : {}),
    ...(avgRating !== null ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: avgRating.toFixed(1),
        reviewCount: reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    } : {}),
    servesCuisine: Array.isArray(r.tags) ? r.tags.slice(0, 3) : undefined,
    priceRange: '$$',
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero image ── */}
      <div style={{ position: 'relative', width: '100%', height: 280, background: '#a8ccd4' }}>
        {r.images?.[0] ? (
          <Image
            src={r.images[0]}
            alt={r.name}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>🍽</div>
        )}
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,20,35,0.55) 100%)',
        }} />
        {/* Back button */}
        <Link
          href="/platser"
          style={{
            position: 'absolute', top: 'calc(16px + env(safe-area-inset-top, 0px))', left: 16,
            width: 40, height: 40, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--glass-88)', backdropFilter: 'blur(8px)',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea, #1e5c82)" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Bookmark button */}
        <div style={{
          position: 'absolute', top: 'calc(16px + env(safe-area-inset-top, 0px))', right: 16,
          background: 'var(--glass-88)', backdropFilter: 'blur(8px)',
          borderRadius: '50%',
        }}>
          <BookmarkButton restaurantId={r.id} />
        </div>

        {/* Name + rating overlay on hero */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.1 }}>
            {r.name}
          </h1>
          {avgRating !== null && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 13, color: avgRating >= i ? '#e8a020' : 'rgba(255,255,255,0.3)' }}>⚓</span>
                ))}
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                {avgRating.toFixed(1)} ({reviewCount} omdömen)
              </span>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px 16px' }}>

        {/* ── Quick info ── */}
        <div style={{
          background: 'var(--white, #fff)', borderRadius: 18, padding: '14px 16px', marginBottom: 14,
          boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
          display: 'flex', flexWrap: 'wrap', gap: 10,
        }}>
          {r.opening_hours && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 16 }}>🕐</span>
              <span style={{ fontSize: 13, color: 'var(--txt2, #4a6878)' }}>{r.opening_hours}</span>
            </div>
          )}
          {r.latitude && r.longitude && (
            <a
              href={`https://maps.apple.com/?q=${r.latitude},${r.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: 13, color: 'var(--sea, #1e5c82)', fontWeight: 600, textDecoration: 'none',
                marginLeft: 'auto',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Hitta dit
            </a>
          )}
        </div>

        {/* ── Why Layer: core_experience ── */}
        {r.core_experience && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30,92,130,0.07), rgba(45,125,138,0.04))',
            border: '1.5px solid rgba(30,92,130,0.14)',
            borderRadius: 18, padding: '14px 18px', marginBottom: 14,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--sea, #1e5c82)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
              🌊 Varför hit?
            </div>
            <p style={{ fontSize: 14, color: 'var(--sea, #1e5c82)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
              {r.core_experience}
            </p>
          </div>
        )}

        {/* ── Tags ── */}
        {r.tags && r.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {r.tags.map((tag: string) => (
              <span key={tag} style={{
                padding: '5px 12px', borderRadius: 20,
                background: 'rgba(10,123,140,0.07)',
                border: '1px solid rgba(10,123,140,0.13)',
                fontSize: 12, fontWeight: 600, color: 'var(--sea)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Description ── */}
        {r.description && (
          <div style={{
            background: 'var(--white, #fff)', borderRadius: 18, padding: '16px 18px', marginBottom: 14,
            boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
          }}>
            <p style={{ fontSize: 14, color: 'var(--txt2, #4a6878)', lineHeight: 1.65, margin: 0 }}>{r.description}</p>
          </div>
        )}

        {/* ── CTA: Logga ett besök ── */}
        <Link
          href={`/logga/manuell?plats=${encodeURIComponent(r.name)}`}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'linear-gradient(135deg,#c96e2a,#e07828)',
            borderRadius: 18, padding: '16px 20px', marginBottom: 14,
            textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(201,110,42,0.35)',
          }}
        >
          <span style={{ fontSize: 28 }}>⛵</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Jag var här!</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Logga ditt besök och dela med gemenskapen</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 18, height: 18, marginLeft: 'auto', flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>

        {/* ── Sociala objekt: check-ins, besökare, omdömen ── */}
        <PlaceSocialSection placeId={r.id} placeType="restaurant" placeName={r.name} />

        {/* ── Image gallery ── */}
        {r.images && r.images.length > 1 && (
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              Bilder
            </h2>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {r.images.map((img, i) => (
                <div key={i} style={{ position: 'relative', width: 130, height: 100, flexShrink: 0, borderRadius: 12, overflow: 'hidden', background: '#a8ccd4' }}>
                  <Image src={img} alt={`${r.name} bild ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="130px" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Menu ── */}
        {r.menu && (
          <div style={{
            background: 'var(--white, #fff)', borderRadius: 18, padding: '16px 18px', marginBottom: 14,
            boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
          }}>
            <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
              🍽 Meny
            </h2>
            <pre style={{
              fontSize: 13, color: 'var(--txt2, #4a6878)', lineHeight: 1.6, margin: 0,
              whiteSpace: 'pre-wrap', fontFamily: 'inherit',
            }}>
              {r.menu}
            </pre>
          </div>
        )}

        {/* ── Recent visits (trips linked to this spot) ── */}
        {recentTrips && recentTrips.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              Senaste turer i skärgården
            </h2>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {recentTrips.map((t: { id: string; image: string; location_name: string | null; created_at: string; users?: { username: string } | { username: string }[] | null }) => (
                <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{
                    width: 100, background: 'var(--white, #fff)', borderRadius: 12, overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,45,60,0.07)', border: '1px solid rgba(10,123,140,0.08)',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img loading="lazy" decoding="async" src={t.image} alt="" style={{ width: '100%', height: 70, objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px' }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--txt, #162d3a)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {Array.isArray(t.users) ? t.users[0]?.username : (t.users as { username: string } | null)?.username ?? 'Okänd'}
                      </div>
                      <div style={{ fontSize: 8, color: 'var(--txt3)', marginTop: 1 }}>
                        {new Date(t.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Rutter som passar (Phase 4: connect data) ── */}
        {nearbyTours.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              🗺 Rutter som passar
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {nearbyTours.map((t: any) => (
                <Link key={t.id} href={`/rutter/${t.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--white, #fff)', borderRadius: 16, padding: '13px 16px',
                    boxShadow: '0 2px 10px rgba(0,45,60,0.07)',
                    border: '1px solid rgba(10,123,140,0.09)',
                    display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                      background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    }}>⛵</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt, #162d3a)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
                        {t.start_location} → {t.destination}
                        {t.duration_label ? ` · ${t.duration_label}` : ''}
                      </div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Reviews ── */}
        <ReviewSection restaurantId={id} />
      </div>
    </div>
  )
}
