import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
import Image from 'next/image'
import OnboardingModal from '@/components/OnboardingModal'
import FeedTabs from '@/components/FeedTabs'
import StoriesStrip from '@/components/StoriesStrip'
import SvallaLogo from '@/components/SvallaLogo'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import AchievementFeedCard from '@/components/AchievementFeedCard'
import RealtimeFeedBanner from '@/components/RealtimeFeedBanner'
import FeedClientBoundary from '@/components/FeedClientBoundary'
import SilentBoundary from '@/components/SilentBoundary'
import { listRecentAchievementEvents } from '@/lib/achievementEvents'
import { fetchFeedTrips, enrichWithTags } from '@/lib/feed'
import { timeAgo } from '@/lib/utils'

export const revalidate = 30

function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5)  return 'God natt'
  if (h < 10) return 'God morgon'
  if (h < 13) return 'God förmiddag'
  if (h < 17) return 'God eftermiddag'
  if (h < 21) return 'God kväll'
  return 'God natt'
}

function getTimeLabel(): string {
  const h = new Date().getHours()
  if (h >= 5  && h < 8)  return '🌅 GRYNING'
  if (h >= 8  && h < 12) return '☀ MORGON'
  if (h >= 12 && h < 17) return '⛵ EFTERMIDDAG'
  if (h >= 17 && h < 20) return '🌆 KVÄLL'
  return '🌙 NATT'
}

/** Graciöst felmeddelande om servern kraschar (undviker error-boundary). */
function FeedServerError() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>Kunde inte ladda feeden</h2>
      <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
        Något gick fel på servern. Prova att ladda om sidan.
      </p>
      <a href="/feed" style={{
        padding: '12px 24px', borderRadius: 14, background: 'var(--grad-sea)',
        color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
      }}>
        Ladda om
      </a>
    </div>
  )
}

export default async function FeedPage(
  { searchParams }: { searchParams: Promise<{ safe?: string }> }
) {
  // ?safe=1 → diagnostik-läge: stäng av alla klient-komponenter utom feed-listan.
  // Används för att isolera vilken komponent som ev. kraschar under hydration.
  const sp = (await searchParams) ?? {}
  const SAFE = sp.safe === '1'

  let supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>
  let user: { id: string } | null = null

  let feedUsername: string | null = null
  try {
    supabase = await createServerSupabaseClient()
    const { data } = await supabase.auth.getUser()
    user = data?.user ?? null
    if (user) {
      const { data: profile } = await supabase.from('users').select('username').eq('id', user.id).single()
      feedUsername = profile?.username ?? null
    }
  } catch (err) {
    console.error('[FeedPage] auth/client init error:', err)
    return <FeedServerError />
  }

  // Bulk-query: ETT RPC-anrop returnerar trips + user + likes_count
  // + comments_count + user_liked. Ersätter 4-7 separata queries.
  // För inloggad: kör båda flödena parallellt (alla + följer).
  let allRes: { trips: Awaited<ReturnType<typeof fetchFeedTrips>>['trips']; error: string | null }
  let followRes: { trips: Awaited<ReturnType<typeof fetchFeedTrips>>['trips']; error: string | null }
  try {
    ;[allRes, followRes] = await Promise.all([
      fetchFeedTrips(supabase!, { viewerId: user?.id ?? null, limit: 50, followOnly: false }),
      user
        ? fetchFeedTrips(supabase!, { viewerId: user.id, limit: 50, followOnly: true })
        : Promise.resolve({ trips: [], error: null }),
    ])
  } catch (err) {
    console.error('[FeedPage] fetchFeedTrips threw unexpectedly:', err)
    return <FeedServerError />
  }

  // Graciös degradering: om all-query misslyckas, visa felmeddelande.
  // Om bara follow-query misslyckas, visa ändå alla-flödet.
  if (allRes.error) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌊</div>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>Kunde inte ladda feeden</h2>
        <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px', lineHeight: 1.5 }}>
          Kontrollera din anslutning och försök igen.
        </p>
        <Link href="/feed" style={{
          padding: '12px 24px', borderRadius: 14, background: 'var(--grad-sea)',
          color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none',
        }}>
          Försök igen
        </Link>
      </div>
    )
  }

  // Enrich both feeds with confirmed tagged crew (one batch query each)
  const [tripsWithUsers, followingTrips] = await Promise.all([
    enrichWithTags(supabase!, allRes.trips),
    enrichWithTags(supabase!, followRes.error ? [] : followRes.trips),
  ])

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
  // HELA blocket är tyst-degraderat: feeden är huvudsaken, achievements är sekundärt.
  let recentAchievements: Awaited<ReturnType<typeof listRecentAchievementEvents>> = []
  if (user) {
    try {
      let networkIds: string[] = [user.id]
      try {
        const { data: followsForAchv, error: followsErr } = await supabase
          .from('follows').select('following_id').eq('follower_id', user.id)
        if (!followsErr && followsForAchv) {
          networkIds = [
            user.id,
            ...followsForAchv.map((f: { following_id: string }) => f.following_id),
          ]
        }
      } catch (err) {
        console.error('[FeedPage] follows-query failed (non-blocking):', err)
      }
      const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      recentAchievements = await listRecentAchievementEvents(supabase, networkIds, { since, limit: 6 })
    } catch (err) {
      // Degradera tyst — achievement-events är icke-kritiska
      console.error('[FeedPage] achievements failed (non-blocking):', err)
      recentAchievements = []
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {!SAFE && <SilentBoundary><RealtimeFeedBanner /></SilentBoundary>}
      {!SAFE && <SilentBoundary><OnboardingModal /></SilentBoundary>}

      {/* ── Ambient gradient — wraps header + top content ── */}
      <div style={{
        background: 'linear-gradient(180deg, #e9d9c4 0%, #e4dfd1 22%, #dbe6e7 52%, var(--bg) 100%)',
        backgroundAttachment: 'local',
      }}>
        {/* ── Header ── */}
        <header style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '13px 16px 11px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'saturate(1.4) blur(20px)', WebkitBackdropFilter: 'saturate(1.4) blur(20px)',
          borderBottom: '1px solid rgba(22,45,58,0.06)',
          position: 'sticky', top: 0, zIndex: 50,
        }}>
          <SvallaLogo height={26} color="var(--sea)" />
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/sok" style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(22,45,58,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }} title="Sök">
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18 }}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
            </Link>
            <SilentBoundary><MessageBell /></SilentBoundary>
            <SilentBoundary><NotificationBell /></SilentBoundary>
          </div>
        </header>

        {/* ── Greeting ── */}
        {feedUsername && (
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 20px 4px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(22,45,58,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
              {getTimeLabel()}
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink, #162d3a)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {getGreeting()}, {feedUsername}
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 16px', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }}>

        {SAFE && (
          <div role="status" style={{
            background: 'rgba(201,110,42,0.12)',
            border: '1px solid rgba(201,110,42,0.35)',
            borderRadius: 12,
            padding: '10px 14px',
            marginBottom: 14,
            fontSize: 12,
            color: 'var(--txt)',
            lineHeight: 1.5,
          }}>
            <strong>Safe mode aktivt.</strong> Stories, SuggestedUsers, RealtimeFeedBanner och OnboardingModal är avstängda för diagnostik.
            Om feeden fungerar här men inte på <a href="/feed" style={{ color: 'var(--sea)' }}>/feed</a> är buggen i en av de klient-komponenterna.
          </div>
        )}

        {/* ── Social proof banner ── visas först när rörelsen är tydlig (≥3 turer) */}
        {thisWeek.length >= 3 && (
          <div style={{
            background: 'var(--grad-sea)',
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
        {!SAFE && (
          <div style={{ marginBottom: 10, marginLeft: -16, marginRight: -16 }}>
            <SilentBoundary><StoriesStrip /></SilentBoundary>
          </div>
        )}

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
                    background: 'var(--green)',
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
                          <Image src={t.image} alt="" fill sizes="110px" style={{ objectFit: 'cover' }} />
                        </div>
                      : <div style={{ height: 72, background: 'var(--grad-sea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>⛵</div>
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
                      ? <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                          <Image src={t.image} alt="" fill sizes="52px" style={{ objectFit: 'cover' }} />
                        </div>
                      : <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, background: 'var(--grad-sea)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>⛵</div>
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
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--acc)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
              🏆 Nya märken i nätverket
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentAchievements.map(ev => (
                <AchievementFeedCard key={ev.id} ev={ev} />
              ))}
            </div>
          </div>
        )}

        {/* ── Divider ── */}
        {(activeNow.length > 0 || magicTrips.length > 0 || recentAchievements.length > 0) && tripsWithUsers.length > 0 && (
          <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
            Alla turer
          </div>
        )}

        {/* ── Main feed ── */}
        <FeedClientBoundary>
          <FeedTabs
            allTrips={tripsWithUsers}
            followingTrips={followingTrips}
            isLoggedIn={!!user}
          />
        </FeedClientBoundary>
      </div>
    </div>
  )
}
