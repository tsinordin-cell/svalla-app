import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import OnboardingModal from '@/components/OnboardingModal'
import FeedTabs from '@/components/FeedTabs'
import StoriesStrip from '@/components/StoriesStrip'
import SvallaLogo from '@/components/SvallaLogo'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import AchievementFeedCard from '@/components/AchievementFeedCard'
import SuggestedUsers from '@/components/SuggestedUsers'
import RealtimeFeedBanner from '@/components/RealtimeFeedBanner'
import { listRecentAchievementEvents } from '@/lib/achievementEvents'
import { fetchFeedTrips } from '@/lib/feed'
import { timeAgo } from '@/lib/utils'
import { fontSize, fontWeight } from '@/lib/tokens'

export const revalidate = 0

export default async function FeedPage() {
  const supabase = createClient()

  // Kolla inloggad användare
  const { data: { user } } = await supabase.auth.getUser()

  // Bulk-query: ETT RPC-anrop returnerar trips + user + likes_count
  // + comments_count + user_liked. Ersätter 4-7 separata queries.
  // För inloggad: kör båda flödena parallellt (alla + följer).
  const [allRes, followRes] = await Promise.all([
    fetchFeedTrips(supabase, { viewerId: user?.id ?? null, limit: 50, followOnly: false }),
    user
      ? fetchFeedTrips(supabase, { viewerId: user.id, limit: 50, followOnly: true })
      : Promise.resolve({ trips: [], error: null }),
  ])

  if (allRes.error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>Kunde inte ladda feeden</h2>
        <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
          Något gick fel. Kontrollera din anslutning och försök igen.
        </p>
        <Link href="/feed" style={{
          padding: '12px 24px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
          color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
        }}>
          Försök igen
        </Link>
      </div>
    )
  }

  const tripsWithUsers = allRes.trips
  const followingTrips = followRes.trips

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

  // Achievement-events från användarens nätverk (följda + jag själv) senaste 14 dagarna
  let recentAchievements: Awaited<ReturnType<typeof listRecentAchievementEvents>> = []
  if (user) {
    const { data: followsForAchv } = await supabase
      .from('follows').select('following_id').eq('follower_id', user.id)
    const networkIds = [
      user.id,
      ...((followsForAchv ?? []).map((f: { following_id: string }) => f.following_id)),
    ]
    const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
    recentAchievements = await listRecentAchievementEvents(supabase, networkIds, { since, limit: 6 })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <RealtimeFeedBanner />
      <OnboardingModal />

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px 10px',
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        boxShadow: '0 2px 12px rgba(0,45,60,0.05)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <SvallaLogo height={26} color="var(--sea, #1e5c82)" />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/sok" style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(10,123,140,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }} title="Sök">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea, #1e5c82)" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
          <MessageBell />
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
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                {thisWeek.length} turer loggades senaste veckan
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
                {uniqueUsers} seglare · {uniquePlaces} unika platser
              </div>
            </div>
          </div>
        )}

        {/* ── Stories (24h) ── */}
        <div style={{ marginBottom: 10, marginLeft: -16, marginRight: -16 }}>
          <StoriesStrip />
        </div>

        {/* ── Aktivt nu (senaste 24h) ── */}
        {activeNow.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontWeight: 600, color: 'var(--sea)',
                textTransform: 'uppercase', letterSpacing: '0.6px',
              }}>
                <span
                  className="live-dot"
                  style={{
                    display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                    background: '#22c55e',
                  }}
                />
                Aktivt senaste 24h · {activeNow.length} {activeNow.length === 1 ? 'tur' : 'turer'}
              </span>
            </div>
            {/* Horizontal scroll med mini-kort */}
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {activeNow.slice(0, 8).map((t: any) => (
                <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0 }} className="press-feedback">
                  <div style={{
                    width: 110, background: 'var(--white)', borderRadius: 14,
                    overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,45,60,0.08)',
                    border: '1px solid rgba(10,123,140,0.08)',
                  }}>
                    {t.image
                      ? <div style={{ position: 'relative', height: 72, overflow: 'hidden' }}>
                          <Image src={t.image} alt="" fill style={{ objectFit: 'cover' }} sizes="110px" />
                        </div>
                      : <div style={{ height: 72, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⛵</div>
                    }
                    <div style={{ padding: '7px 8px' }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--acc)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
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
                    position: 'relative',
                  }}>
                    {t.image
                      ? <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, position: 'relative', overflow: 'hidden' }}><Image src={t.image} alt="" fill style={{ objectFit: 'cover' }} sizes="52px" /></div>
                      : <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⛵</div>
                    }
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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

        {/* ── Nya märken från nätverket ── */}
        {recentAchievements.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#c96e2a', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              🏆 Nya märken i nätverket
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentAchievements.map(ev => (
                <AchievementFeedCard key={ev.id} ev={ev} />
              ))}
            </div>
          </div>
        )}

        {/* ── Hitta seglare (suggested follows — only for logged-in) ── */}
        {user && <SuggestedUsers />}

        {/* ── Divider ── */}
        {(activeNow.length > 0 || magicTrips.length > 0 || recentAchievements.length > 0) && tripsWithUsers.length > 0 && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
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
