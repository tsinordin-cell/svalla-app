import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'
import Link from 'next/link'
import OnboardingModal from '@/components/OnboardingModal'
import FeedTabs from '@/components/FeedTabs'
import SvallaLogo from '@/components/SvallaLogo'
import NotificationBell from '@/components/NotificationBell'
import { timeAgo } from '@/lib/utils'

export const revalidate = 0

export default async function FeedPage() {
  const supabase = createClient()

  // Kolla inloggad användare
  const { data: { user } } = await supabase.auth.getUser()

  // Full query — utan users-join (FK pekar på auth.users, ej public.users)
  const { data: trips, error } = await supabase
    .from('trips')
    .select(`
      id, user_id, boat_type, distance, duration,
      average_speed_knots, max_speed_knots, image, route_id, created_at,
      location_name, caption, pinnar_rating, started_at, ended_at, route_points,
      routes ( name )
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('[feed]', error.message)
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
        <h2 style={{ fontSize: 18, fontWeight: 900, color: 'var(--txt)', margin: '0 0 8px' }}>Kunde inte ladda feeden</h2>
        <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
          Något gick fel. Kontrollera din anslutning och försök igen.
        </p>
        <Link href="/feed" style={{
          padding: '12px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
          color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
        }}>
          Försök igen
        </Link>
      </div>
    )
  }

  // Hämta follows + trips parallellt för inloggad användare
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let rawFollowingTrips: any[] = []
  if (user) {
    const { data: follows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)
    const followingIds = (follows ?? []).map((f: { following_id: string }) => f.following_id)
    if (followingIds.length > 0) {
      const { data: fTrips } = await supabase
        .from('trips')
        .select(`
          id, user_id, boat_type, distance, duration,
          average_speed_knots, max_speed_knots, image, route_id, created_at,
          location_name, caption, pinnar_rating, started_at, ended_at, route_points,
          routes ( name )
        `)
        .in('user_id', followingIds)
        .order('created_at', { ascending: false })
        .limit(50)
      rawFollowingTrips = fTrips ?? []
    }
  }

  // Bail early on DB error — trips is guaranteed defined below this point
  if (!trips) {
    console.error('[feed] trips query returned null unexpectedly')
  }

  // Kombinera alla unika trip-IDs + user-IDs från båda feeds
  const allRawTrips = [...(trips ?? []), ...rawFollowingTrips]
  const allTripIds  = [...new Set(allRawTrips.map((t: { id: string }) => t.id))]
  const userIds     = [...new Set(allRawTrips.map((t: { user_id: string }) => t.user_id).filter(Boolean))]

  // Hämta usernames + avatars + social counts i ett parallellt block
  const [
    { data: userRows },
    { data: likeRows },
    { data: commentRows },
    { data: userLikedRows },
  ] = await Promise.all([
    userIds.length
      ? supabase.from('users').select('id, username, avatar').in('id', userIds)
      : Promise.resolve({ data: [] }),
    allTripIds.length
      ? supabase.from('likes').select('trip_id').in('trip_id', allTripIds)
      : Promise.resolve({ data: [] }),
    allTripIds.length
      ? supabase.from('comments').select('trip_id').in('trip_id', allTripIds)
      : Promise.resolve({ data: [] }),
    allTripIds.length && user
      ? supabase.from('likes').select('trip_id').eq('user_id', user.id).in('trip_id', allTripIds)
      : Promise.resolve({ data: [] }),
  ])

  const userMap: Record<string, { username: string; avatar_url: string | null }> = {}
  for (const u of userRows ?? []) {
    if (u?.id) userMap[u.id] = { username: u.username ?? 'Seglare', avatar_url: u.avatar ?? null }
  }
  const likeCountMap: Record<string, number> = {}
  for (const r of likeRows ?? []) {
    likeCountMap[r.trip_id] = (likeCountMap[r.trip_id] ?? 0) + 1
  }
  const commentCountMap: Record<string, number> = {}
  for (const r of commentRows ?? []) {
    commentCountMap[r.trip_id] = (commentCountMap[r.trip_id] ?? 0) + 1
  }
  const userLikedSet = new Set((userLikedRows ?? []).map((r: { trip_id: string }) => r.trip_id))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function enrichTrip(t: any) {
    return {
      ...t,
      users:          userMap[t.user_id] ?? { username: 'Seglare', avatar_url: null },
      likes_count:    likeCountMap[t.id] ?? 0,
      comments_count: commentCountMap[t.id] ?? 0,
      user_liked:     userLikedSet.has(t.id),
    }
  }

  const tripsWithUsers = (trips ?? []).map(enrichTrip)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let followingTrips: any[] = rawFollowingTrips.map(enrichTrip)

  // Social proof — senaste 7 dagarna
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const thisWeek = tripsWithUsers.filter(t => t.created_at > weekAgo)
  const uniqueUsers = new Set(thisWeek.map((t: { user_id: string }) => t.user_id)).size
  const uniquePlaces = new Set(thisWeek.map((t: { location_name: string | null }) => t.location_name).filter(Boolean)).size

  // Aktivt nu — senaste 24h
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const activeNow = tripsWithUsers.filter(t => t.created_at > dayAgo)

  // Magiska turer (⚓⚓⚓) de senaste 7 dagarna för highlight
  const magicTrips = thisWeek.filter((t: { pinnar_rating: number | null }) => t.pinnar_rating === 3).slice(0, 3)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <OnboardingModal />

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px 10px',
        background: 'var(--header-bg, rgba(250,254,255,0.96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        boxShadow: '0 2px 12px rgba(0,45,60,0.05)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <SvallaLogo height={26} color="#1e5c82" />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/sok" style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(10,123,140,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }} title="Sök">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
          <NotificationBell />
          <Link href="/logga" style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'linear-gradient(135deg,var(--acc),#e07828)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 12px rgba(201,110,42,0.45)',
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 14px', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }}>

        {/* ── Social proof banner ── */}
        {thisWeek.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            borderRadius: 18, padding: '14px 18px', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 14,
            boxShadow: '0 4px 20px rgba(30,92,130,0.25)',
          }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🌊</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                {thisWeek.length} turer loggades senaste veckan
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                {uniqueUsers} seglare · {uniquePlaces} unika platser
              </div>
            </div>
          </div>
        )}

        {/* ── Aktivt nu (senaste 24h) ── */}
        {activeNow.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontWeight: 800, color: 'var(--sea)',
                textTransform: 'uppercase', letterSpacing: '0.6px',
              }}>
                <span style={{
                  display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 0 2px rgba(34,197,94,0.25)',
                }} />
                Aktivt senaste 24h · {activeNow.length} {activeNow.length === 1 ? 'tur' : 'turer'}
              </span>
            </div>
            {/* Horizontal scroll med mini-kort */}
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {activeNow.slice(0, 8).map((t: any) => (
                <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{
                    width: 110, background: 'var(--white)', borderRadius: 14,
                    overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,45,60,0.08)',
                    border: '1px solid rgba(10,123,140,0.08)',
                  }}>
                    {t.image
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={t.image} alt="" style={{ width: '100%', height: 72, objectFit: 'cover', display: 'block' }} />
                      : <div style={{ width: '100%', height: 72, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⛵</div>
                    }
                    <div style={{ padding: '7px 8px' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.location_name ?? 'Okänd plats'}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--txt3)', marginTop: 1 }}>
                        {timeAgo(t.created_at)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Magiska turer ── */}
        {magicTrips.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--acc)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              ✨ Magiska turer den här veckan
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {magicTrips.map((t: any) => (
                <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'var(--white)', borderRadius: 16, padding: '10px 14px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
                    border: '1.5px solid rgba(201,110,42,0.15)',
                  }}>
                    {t.image
                      // eslint-disable-next-line @next/next/no-img-element
                      ? <img src={t.image} alt="" style={{ width: 52, height: 52, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                      : <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⛵</div>
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.location_name ?? 'Okänd plats'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
                        av {t.users?.username ?? 'Okänd'}
                      </div>
                    </div>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>⚓⚓⚓</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        {(activeNow.length > 0 || magicTrips.length > 0) && trips && trips.length > 0 && (
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
            Alla turer
          </div>
        )}

        {/* ── Main feed ── */}
        <FeedTabs
          allTrips={tripsWithUsers}
          followingTrips={followingTrips}
          isLoggedIn={!!user}
        />
      </div>
    </div>
  )
}
