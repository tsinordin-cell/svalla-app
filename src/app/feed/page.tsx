import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'
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
import FeedWeatherRow from '@/components/FeedWeatherRow'
import SuggestedUsers from '@/components/SuggestedUsers'
import { IconSearch } from '@/components/ui/icons'
import { listRecentAchievementEvents } from '@/lib/achievementEvents'
import { fetchFeedTrips, enrichWithTags } from '@/lib/feed'

export const revalidate = 300

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

  // Fetch feed trips — 20 rows per tab is enough for initial render.
  let allRes: { trips: Awaited<ReturnType<typeof fetchFeedTrips>>['trips']; error: string | null }
  let followRes: { trips: Awaited<ReturnType<typeof fetchFeedTrips>>['trips']; error: string | null }
  try {
    ;[allRes, followRes] = await Promise.all([
      fetchFeedTrips(supabase!, { viewerId: user?.id ?? null, limit: 20, followOnly: false }),
      user
        ? fetchFeedTrips(supabase!, { viewerId: user.id, limit: 20, followOnly: true })
        : Promise.resolve({ trips: [], error: null }),
    ])
  } catch (err) {
    console.error('[FeedPage] fetchFeedTrips threw unexpectedly:', err)
    return <FeedServerError />
  }

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

  // Run enrichWithTags AND the follows query in parallel — eliminates a
  // sequential round-trip that previously blocked achievements from starting.
  const [tripsWithUsers, followingTrips, followsResult] = await Promise.all([
    enrichWithTags(supabase!, allRes.trips),
    enrichWithTags(supabase!, followRes.error ? [] : followRes.trips),
    user
      ? supabase!.from('follows').select('following_id').eq('follower_id', user.id).then(r => r.data ?? [])
      : Promise.resolve([] as { following_id: string }[]),
  ])

  // Social proof — senaste 7 dagarna
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const thisWeek = tripsWithUsers.filter(t => t.created_at > weekAgo)
  const uniqueUsers = new Set(thisWeek.map((t: { user_id: string }) => t.user_id)).size
  const uniquePlaces = new Set(thisWeek.map((t: { location_name: string | null }) => t.location_name).filter(Boolean)).size

  // Achievement-events — follows data is already available from the parallel query above.
  let recentAchievements: Awaited<ReturnType<typeof listRecentAchievementEvents>> = []
  if (user) {
    try {
      const networkIds = [user.id, ...followsResult.map((f: { following_id: string }) => f.following_id)]
      const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      recentAchievements = await listRecentAchievementEvents(supabase, networkIds, { since, limit: 6 })
    } catch (err) {
      console.error('[FeedPage] achievements failed (non-blocking):', err)
      recentAchievements = []
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {!SAFE && <SilentBoundary><RealtimeFeedBanner /></SilentBoundary>}
      {!SAFE && <SilentBoundary><OnboardingModal /></SilentBoundary>}

      {/* ── Ambient gradient — wraps header + top content ── */}
      <div className="feed-ambient-top" style={{
        background: 'linear-gradient(180deg, #e9d9c4 0%, #e4dfd1 25%, #dbe6e7 55%, var(--bg) 100%)',
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
          <span className="feed-header-logo"><SvallaLogo height={26} color="var(--sea)" /></span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/sok" aria-label="Sök" style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(22,45,58,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconSearch size={18} stroke={2} color="var(--sea)" />
            </Link>
            <SilentBoundary><MessageBell /></SilentBoundary>
            <SilentBoundary><NotificationBell /></SilentBoundary>
          </div>
        </header>

        {/* ── Greeting ── */}
        {feedUsername && (
          <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px 20px 8px' }}>
            <div className="feed-time-label" style={{ fontSize: 10.5, fontWeight: 600, color: 'rgba(22,45,58,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
              {getTimeLabel()}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--ink, #162d3a)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {getGreeting()}, {feedUsername}
            </div>
          </div>
        )}

        {/* ── Weather row — direkt under greeting ── */}
        {!SAFE && feedUsername && (
          <SilentBoundary><FeedWeatherRow /></SilentBoundary>
        )}

        {/* ── Stories strip — direkt under greeting ── */}
        {!SAFE && (
          <div style={{ paddingBottom: 4 }}>
            <SilentBoundary><StoriesStrip /></SilentBoundary>
          </div>
        )}
      </div>

      <div className="feed-layout-wrap">
        <div className="feed-main-col">

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
        {recentAchievements.length > 0 && tripsWithUsers.length > 0 && (
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
        </div>{/* feed-main-col */}

        {/* ── Desktop right panel — visas bara vid ≥1280px via CSS ── */}
        {!!user && (
          <aside className="feed-desktop-panel">
            <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.7px', marginBottom: 14 }}>
              Hitta seglare
            </div>
            <SilentBoundary><SuggestedUsers /></SilentBoundary>
          </aside>
        )}
      </div>{/* feed-layout-wrap */}
    </div>
  )
}
