import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import TripDetailMap from '@/components/TripDetailMap'
import LikeButton from '@/components/LikeButton'
import Comments from '@/components/Comments'
import ShareButton from '@/components/ShareButton'
import TripActions from '@/components/TripActions'
import { restaurantsAlongRoute, formatDuration } from '@/lib/gps'
import type { Metadata } from 'next'

export const revalidate = 0   // always fresh (trip just saved)

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = createClient()
  const { data: trip } = await supabase
    .from('trips')
    .select('user_id, location_name, distance, boat_type, image')
    .eq('id', id)
    .single()

  if (!trip) return { title: 'Tur – Svalla' }

  const { data: metaUser } = await supabase
    .from('users').select('username').eq('id', trip.user_id).single()

  const title = trip.location_name
    ? `${trip.location_name} – ${trip.distance?.toFixed(1)} NM`
    : `Tur – ${trip.distance?.toFixed(1)} NM`
  const desc = `${metaUser?.username ?? 'En seglare'} loggade en ${trip.boat_type?.toLowerCase() ?? 'tur'} på ${trip.distance?.toFixed(1)} NM${trip.location_name ? ` till ${trip.location_name}` : ''}.`

  return {
    title,
    description: desc,
    openGraph: {
      title: `${title} – Svalla`,
      description: desc,
      images: trip.image ? [{ url: trip.image, width: 1200, height: 630 }] : [],
      url: `https://svalla.se/tur/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} – Svalla`,
      description: desc,
      images: trip.image ? [trip.image] : [],
    },
  }
}

export default async function TurPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createClient()

  // fetch trip (utan users-join — FK pekar på auth.users, ej public.users)
  const { data: trip, error } = await supabase
    .from('trips')
    .select(`*, routes(name)`)
    .eq('id', id)
    .single()
  if (error || !trip) notFound()

  // hämta user separat från public.users
  const { data: userRow } = await supabase
    .from('users')
    .select('username, avatar')
    .eq('id', trip.user_id)
    .single()

  // hämta taggade användare
  const { data: tripTagsRaw } = await supabase
    .from('trip_tags')
    .select('tagged_user_id')
    .eq('trip_id', id)
  const taggedUserIds = (tripTagsRaw ?? []).map((t: { tagged_user_id: string }) => t.tagged_user_id)
  const { data: taggedUsersRaw } = taggedUserIds.length
    ? await supabase.from('users').select('id, username').in('id', taggedUserIds)
    : { data: [] }
  const taggedUsers = taggedUsersRaw ?? []

  // fetch GPS points
  const { data: rawPoints } = await supabase
    .from('gps_points')
    .select('latitude,longitude,speed_knots,heading,recorded_at')
    .eq('trip_id', id)
    .order('recorded_at', { ascending: true })

  // fetch stops
  const { data: rawStops } = await supabase
    .from('stops')
    .select('latitude,longitude,stop_type,started_at,ended_at,duration_seconds')
    .eq('trip_id', id)
    .order('started_at', { ascending: true })

  // fetch all restaurants (we'll filter by proximity)
  const { data: allRestaurants } = await supabase
    .from('restaurants')
    .select('id,name,latitude,longitude')

  const points = (rawPoints ?? []).map(p => ({
    lat: p.latitude as number,
    lng: p.longitude as number,
    speedKnots: (p.speed_knots ?? 0) as number,
    heading: null as null,
    accuracy: 0,
    recordedAt: p.recorded_at as string,
  }))

  const stops = (rawStops ?? []).map(s => ({
    lat: s.latitude,
    lng: s.longitude,
    type: s.stop_type,
    startedAt: s.started_at,
    endedAt: s.ended_at,
    durationSeconds: s.duration_seconds ?? 0,
  }))

  // restaurants near the route
  const nearbyRestaurants = points.length > 0 && allRestaurants
    ? restaurantsAlongRoute(points, allRestaurants.map(r => ({
        id: r.id,
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
      })), 0.5)
    : []

  const hasMap = points.length >= 2
  const username = userRow?.username ?? 'Seglare'
  const routeName = (trip.routes as { name: string } | null)?.name

  const durationSecs = (trip.duration ?? 0) * 60

  // timeline events
  const timeline = [
    { type: 'start', label: 'Kasta loss', time: trip.started_at },
    ...stops
      .filter(s => s.type === 'pause')
      .map(s => ({ type: 'pause', label: 'Paus', time: s.startedAt })),
    ...stops
      .filter(s => s.type === 'stop')
      .map(s => ({ type: 'stop', label: `Stopp (${Math.round(s.durationSeconds / 60)} min)`, time: s.startedAt })),
    { type: 'end', label: 'Ankrar', time: trip.ended_at },
  ].filter(e => e.time).sort((a, b) => new Date(a.time!).getTime() - new Date(b.time!).getTime())

  const timelineColors: Record<string, string> = {
    start: '#0f9e64',
    pause: '#c96e2a',
    stop: '#7a9dab',
    end: '#cc3d3d',
  }

  const pinnarEmoji = trip.pinnar_rating === 3 ? '⚓⚓⚓' : trip.pinnar_rating === 2 ? '⚓⚓' : trip.pinnar_rating === 1 ? '⚓' : null
  const pinnarLabel = trip.pinnar_rating === 3 ? 'Magisk tur 🔥' : trip.pinnar_rating === 2 ? 'Bra tur!' : trip.pinnar_rating === 1 ? 'Okej' : null
  const dateStr = trip.started_at
    ? new Date(trip.started_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date(trip.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#f2f8fa', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 16px)' }}>

      {/* ── Hero image ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', maxHeight: 360, background: '#a8ccd4', overflow: 'hidden' }}>
        <Image src={trip.image} alt="Tur" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,20,35,0.35) 0%, transparent 40%, transparent 60%, rgba(0,20,35,0.6) 100%)' }} />

        {/* Back button */}
        <Link href="/feed" style={{
          position: 'absolute', top: 16, left: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(250,254,255,0.88)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        {/* Share + actions */}
        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8 }}>
          <ShareButton url={`https://svalla.se/tur/${id}`} title={trip.location_name ?? 'Min tur'} />
          <TripActions tripId={trip.id} ownerId={trip.user_id} />
        </div>

        {/* Location + pinnar overlay at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 14px' }}>
          {trip.location_name && (
            <div style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.15, marginBottom: 4, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
              {trip.location_name}
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{dateStr}</span>
            {pinnarEmoji && (
              <span style={{
                fontSize: 11, fontWeight: 800,
                background: trip.pinnar_rating === 3 ? 'rgba(201,110,42,0.85)' : 'rgba(30,92,130,0.75)',
                backdropFilter: 'blur(4px)',
                color: '#fff', padding: '3px 9px', borderRadius: 20,
              }}>
                {pinnarEmoji} {pinnarLabel}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '14px 14px' }}>

        {/* ── User row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <Link href={`/u/${username}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flex: 1 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 900, color: '#fff', overflow: 'hidden',
              border: '2px solid rgba(10,123,140,0.12)',
            }}>
              {userRow?.avatar
                ? <Image src={userRow.avatar} alt={username} width={44} height={44} style={{ objectFit: 'cover' }} />
                : username[0]?.toUpperCase()
              }
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#162d3a' }}>{username}</div>
              <div style={{ fontSize: 12, color: '#7a9dab' }}>
                {trip.boat_type}{routeName ? ` · ${routeName}` : ''}
              </div>
            </div>
          </Link>
        </div>

        {/* Caption */}
        {trip.caption && (
          <div style={{
            fontSize: 15, color: '#2a4a5a', lineHeight: 1.6,
            margin: '0 0 16px', fontStyle: 'italic',
            padding: '12px 16px', background: '#fff', borderRadius: 16,
            borderLeft: '3px solid rgba(10,123,140,0.3)',
            boxShadow: '0 1px 6px rgba(0,45,60,0.06)',
          }}>
            &ldquo;{trip.caption}&rdquo;
          </div>
        )}

        {/* Taggade användare */}
        {taggedUsers.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
            <span style={{ fontSize: 12, color: '#7a9dab', fontWeight: 600 }}>Med:</span>
            {taggedUsers.map((u: { id: string; username: string }) => (
              <Link key={u.id} href={`/u/${u.username}`} style={{ textDecoration: 'none' }}>
                <span style={{
                  fontSize: 12, fontWeight: 700, color: '#1e5c82',
                  background: 'rgba(30,92,130,0.08)', borderRadius: 20,
                  padding: '4px 10px',
                }}>
                  @{u.username}
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { val: trip.distance > 0 ? `${trip.distance.toFixed(1)}` : '—', unit: 'NM', label: 'Distans', emoji: '🧭' },
            { val: durationSecs > 0 ? formatDuration(durationSecs) : '—', unit: '', label: 'Tid', emoji: '⏱' },
            { val: trip.average_speed_knots > 0 ? `${trip.average_speed_knots.toFixed(1)}` : '—', unit: 'kn', label: 'Snittfart', emoji: '⛵' },
            { val: trip.max_speed_knots > 0 ? `${trip.max_speed_knots.toFixed(1)}` : '—', unit: 'kn', label: 'Toppfart', emoji: '💨' },
          ].map(({ val, unit, label, emoji }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 16, padding: '10px 6px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,45,60,0.06)' }}>
              <div style={{ fontSize: 16, marginBottom: 2 }}>{emoji}</div>
              <div style={{ fontSize: 16, fontWeight: 900, color: '#1e5c82', lineHeight: 1 }}>{val}</div>
              {unit && <div style={{ fontSize: 9, color: '#7a9dab', fontWeight: 700 }}>{unit}</div>}
              <div style={{ fontSize: 8, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.3px', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Social */}
        <div id="kommentarer" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <LikeButton tripId={trip.id} />
          <Comments tripId={trip.id} />
        </div>

        {/* Map */}
        {hasMap ? (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>Rutt</SectionTitle>
            <TripDetailMap points={points} stops={stops} restaurants={nearbyRestaurants} />
          </div>
        ) : (
          <div style={{ marginBottom: 18, background: 'rgba(10,123,140,0.05)', borderRadius: 20, padding: '32px 16px', textAlign: 'center', fontSize: 13, color: '#7a9dab' }}>
            Inga GPS-punkter för denna tur
          </div>
        )}

        {/* Timeline */}
        {timeline.length > 1 && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>Tidslinje</SectionTitle>
            <div style={{ background: '#fff', borderRadius: 20, padding: '16px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)' }}>
              {timeline.map((ev, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', flexShrink: 0, background: timelineColors[ev.type] ?? '#7a9dab' }} />
                    {i < timeline.length - 1 && (
                      <div style={{ width: 2, flex: 1, margin: '3px 0', background: 'rgba(10,123,140,0.1)', minHeight: 20 }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: 16 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#162d3a', lineHeight: 1.2 }}>{ev.label}</div>
                    <div style={{ fontSize: 11, color: '#7a9dab', marginTop: 2 }}>
                      {ev.time ? new Date(ev.time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }) : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stops */}
        {stops.filter(s => s.type === 'stop').length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <SectionTitle>Stopp</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stops.filter(s => s.type === 'stop').map((s, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7a9dab', flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#162d3a' }}>Stopp {i + 1}</span>
                  </div>
                  <span style={{ fontSize: 13, color: '#7a9dab' }}>
                    {s.durationSeconds >= 60 ? `${Math.round(s.durationSeconds / 60)} min` : `${s.durationSeconds}s`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Nearby restaurants */}
        {nearbyRestaurants.length > 0 && (
          <div>
            <SectionTitle>Restauranger längs rutten</SectionTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {nearbyRestaurants.map(r => (
                <Link key={r.id} href={`/platser/${r.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: 14, padding: '12px 16px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 20 }}>🍽</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#162d3a', flex: 1 }}>{r.name}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#7a9dab" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
      {children}
    </h2>
  )
}

