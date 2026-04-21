import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import EmptyState from '@/components/EmptyState'
import type { Metadata } from 'next'
import FollowButton from '@/components/FollowButton'
import FollowPrefsButton from '@/components/FollowPrefsButton'
import FollowListButton from '@/components/FollowListSheet'
import BackButtonInline from '@/components/BackButtonInline'
import ProfileMoreMenu from '@/components/ProfileMoreMenu'
import { ACHIEVEMENTS, computeUnlocked, calcStreak } from '@/lib/achievements'

export const revalidate = 60

const COUNTRIES = [
  { flag: '🇸🇪', name: 'Sverige' },   { flag: '🇳🇴', name: 'Norge' },
  { flag: '🇩🇰', name: 'Danmark' },   { flag: '🇫🇮', name: 'Finland' },
  { flag: '🇩🇪', name: 'Tyskland' },  { flag: '🇬🇧', name: 'Storbritannien' },
  { flag: '🇳🇱', name: 'Nederländerna' }, { flag: '🇫🇷', name: 'Frankrike' },
  { flag: '🇪🇸', name: 'Spanien' },   { flag: '🇮🇹', name: 'Italien' },
  { flag: '🇵🇱', name: 'Polen' },     { flag: '🇺🇸', name: 'USA' },
  { flag: '🇦🇺', name: 'Australien' },{ flag: '🇨🇦', name: 'Kanada' },
  { flag: '🇳🇿', name: 'Nya Zeeland' },{ flag: '🇭🇷', name: 'Kroatien' },
  { flag: '🇮🇸', name: 'Island' },
]

function formatNationality(raw: string): string {
  const withFlag = COUNTRIES.find(c => `${c.flag} ${c.name}` === raw)
  if (withFlag) return `${withFlag.flag} ${withFlag.name}`
  const byName = COUNTRIES.find(c => c.name === raw)
  if (byName) return `${byName.flag} ${byName.name}`
  return raw
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  return {
    title: `${username} – Svalla`,
    description: `Se ${username}s seglarturer på Svalla.`,
    openGraph: { title: `${username} på Svalla`, url: `https://svalla.se/u/${username}` },
  }
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = createClient()

  const { data: userRow, error: userErr } = await supabase
    .from('users')
    .select('id, username, avatar, bio, nationality, experience_years, vessel_type, vessel_model, vessel_name, home_port, sailing_region, public_fields')
    .eq('username', username)
    .single()
  if (userErr || !userRow) notFound()

  const [
    { data: rawTrips },
    { count: followersCount },
    { count: followingCount },
    { data: visitedIslandsData },
  ] = await Promise.all([
    supabase
      .from('trips')
      .select('id, user_id, boat_type, distance, duration, average_speed_knots, image, location_name, caption, pinnar_rating, started_at, created_at, route_points')
      .eq('user_id', userRow.id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false }),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', userRow.id),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userRow.id),
    supabase.from('visited_islands').select('island_slug').eq('user_id', userRow.id),
  ])

  const trips = (rawTrips ?? []) as Trip[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pub: string[] = (userRow as any).public_fields ?? []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = userRow as any

  const totalDist   = trips.reduce((a, t) => a + (t?.distance ?? 0), 0)
  const streak      = calcStreak(trips)
  const uniqueLocs  = new Set(trips.map(t => t.location_name).filter(Boolean)).size
  const unlockedAch = computeUnlocked(trips, streak)
  const visitedCount = (visitedIslandsData ?? []).length

  // Monthly bar chart — last 6 months
  const MONTHS = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
  const monthMap: Record<string, { label: string; count: number; dist: number }> = {}
  for (const t of trips) {
    const d   = new Date(t.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!monthMap[key]) monthMap[key] = { label: MONTHS[d.getMonth()], count: 0, dist: 0 }
    monthMap[key].count++
    monthMap[key].dist += t.distance ?? 0
  }
  const monthBars = Object.entries(monthMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
  const maxBar = Math.max(...monthBars.map(([, v]) => v.count), 1)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 24px)' }}>

      {/* ── Sticky header ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
      }}>
        <BackButtonInline fallback="/feed" />
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--sea)' }}>{userRow.username}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <FollowPrefsButton followingId={userRow.id} followingUsername={userRow.username} />
          <FollowButton targetUserId={userRow.id} />
          <ProfileMoreMenu targetUserId={userRow.id} targetUsername={userRow.username} />
        </div>
      </header>

      {/* ── Cover hero ── */}
      <div style={{
        height: 140,
        background: 'linear-gradient(160deg, #0d2240 0%, #1a4a5e 50%, #0a7b8c 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 60% 120%, rgba(45,125,138,0.5) 0%, transparent 60%)',
        }} />
        {/* Decorative wave/pattern */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0,
          height: 32,
          background: 'var(--bg, #f2f8fa)',
          clipPath: 'ellipse(55% 100% at 50% 100%)',
        }} />
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1 }}>

        {/* ── Avatar + action row ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: -44, marginBottom: 14 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            border: '4px solid var(--bg, #f2f8fa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 30, fontWeight: 700, color: '#fff', overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,45,60,0.18)',
          }}>
            {u.avatar
              // eslint-disable-next-line @next/next/no-img-element
              ? <img loading="lazy" decoding="async" src={u.avatar} alt={userRow.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : userRow.username[0]?.toUpperCase()}
          </div>
          {/* Streak */}
          {streak > 0 && (
            <div style={{
              marginBottom: 4, flexShrink: 0,
              background: 'linear-gradient(135deg,#ff6b35,#f7931e)',
              borderRadius: 12, padding: '5px 10px',
              display: 'flex', alignItems: 'center', gap: 4,
              boxShadow: '0 2px 8px rgba(255,107,53,0.35)',
            }}>
              <span style={{ fontSize: 14 }}>🔥</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{streak}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>v</span>
            </div>
          )}
        </div>

        {/* ── Name + bio + chips ── */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt, #0d2240)', margin: '0 0 4px', letterSpacing: '-0.3px' }}>
            {userRow.username}
          </h1>
          {pub.includes('bio') && u.bio && (
            <p style={{ fontSize: 14, color: 'var(--txt2, #3d5865)', lineHeight: 1.55, margin: '0 0 10px' }}>
              {u.bio}
            </p>
          )}
          {/* Info chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {pub.includes('nationality') && u.nationality && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2, #3d5865)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
                {formatNationality(u.nationality)}
              </span>
            )}
            {pub.includes('experience_years') && u.experience_years && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2, #3d5865)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
                ⚓ {u.experience_years} år till havs
              </span>
            )}
            {pub.includes('vessel_name') && u.vessel_name && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2, #3d5865)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
                ⛵ {u.vessel_name}{u.vessel_model ? ` · ${u.vessel_model}` : ''}
              </span>
            )}
            {pub.includes('home_port') && u.home_port && (
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2, #3d5865)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
                🏠 {u.home_port}
              </span>
            )}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{
          background: 'var(--white, #fff)', borderRadius: 18,
          display: 'flex', marginBottom: 16,
          boxShadow: '0 1px 8px rgba(0,45,60,0.07)',
          overflow: 'hidden',
        }}>
          {[
            { val: trips.length,              label: 'Turer' },
            { val: `${totalDist.toFixed(0)}`, label: 'NM' },
            { val: uniqueLocs,                label: 'Platser' },
            { val: followersCount ?? 0,       label: 'Följare',  el: <FollowListButton userId={userRow.id} mode="followers" count={followersCount ?? 0} /> },
            { val: followingCount ?? 0,       label: 'Följer',   el: <FollowListButton userId={userRow.id} mode="following" count={followingCount ?? 0} /> },
          ].map(({ val, label, el }, i, arr) => (
            <div key={label} style={{
              flex: 1, padding: '14px 0', textAlign: 'center',
              borderRight: i < arr.length - 1 ? '1px solid rgba(10,123,140,0.07)' : 'none',
            }}>
              {el ?? (
                <>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt, #0d2240)', lineHeight: 1, letterSpacing: '-0.3px' }}>{val}</div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--txt3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ── Achievements horizontal strip ── */}
        {unlockedAch.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
              Märken · {unlockedAch.length}/{ACHIEVEMENTS.length}
            </div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' } as React.CSSProperties}>
              {ACHIEVEMENTS.map(a => {
                const unlocked = unlockedAch.includes(a)
                return (
                  <div key={a.id} title={a.label} style={{
                    flexShrink: 0, width: 52, height: 52,
                    borderRadius: 14, background: 'var(--white, #fff)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 2, border: `1.5px solid ${unlocked ? 'rgba(10,123,140,0.18)' : 'rgba(0,0,0,0.06)'}`,
                    opacity: unlocked ? 1 : 0.3,
                    filter: unlocked ? 'none' : 'grayscale(1)',
                    boxShadow: unlocked ? '0 1px 6px rgba(0,45,60,0.07)' : 'none',
                  }}>
                    <span style={{ fontSize: 20 }}>{a.emoji}</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: 'var(--txt2)', textAlign: 'center', lineHeight: 1.2, maxWidth: 44, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Activity chart ── */}
        {monthBars.length > 0 && (
          <div style={{ background: 'var(--white, #fff)', borderRadius: 18, padding: '16px 16px 12px', boxShadow: '0 1px 8px rgba(0,45,60,0.07)', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>
              Aktivitet
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 56 }}>
              {monthBars.map(([key, v]) => (
                <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--sea)' }}>{v.count}</span>
                  <div style={{
                    width: '100%', borderRadius: '4px 4px 0 0',
                    background: 'linear-gradient(to top,#1e5c82,#2d7d8a)',
                    height: `${Math.max(6, (v.count / maxBar) * 36)}px`,
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              {monthBars.map(([key, v]) => (
                <div key={key} style={{ flex: 1, textAlign: 'center', fontSize: 9, fontWeight: 600, color: 'var(--txt3)' }}>{v.label}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── Visited islands ── */}
        {visitedCount > 0 && (
          <div style={{ background: 'var(--white, #fff)', borderRadius: 18, padding: '14px 16px', boxShadow: '0 1px 8px rgba(0,45,60,0.07)', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>🗺️ Besökta öar</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#0f9e64' }}>{visitedCount} / 69</span>
            </div>
            <div style={{ height: 5, background: 'rgba(15,158,100,.1)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#0f9e64,#2dc88c)', width: `${Math.min(100, (visitedCount / 69) * 100)}%` }} />
            </div>
          </div>
        )}

        {/* ── Trip grid ── */}
        <div style={{ background: 'var(--white, #fff)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>
          {trips.length === 0 ? (
            <EmptyState
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
              title="Inga turer ännu"
              body={`${userRow.username} har inte loggat någon tur på Svalla än.`}
              marginTop={0}
            />
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Turer</div>
                <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{trips.length} st</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, padding: '0 2px 2px' }}>
                {trips.map(t => (
                  <Link key={t.id} href={`/tur/${t.id}`} style={{
                    position: 'relative', aspectRatio: '1/1',
                    overflow: 'hidden', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                    display: 'block', borderRadius: 4,
                  }}>
                    {t.image ? (
                      <Image src={t.image} alt={t.location_name ?? 'Tur'} fill style={{ objectFit: 'cover' }} sizes="(max-width:520px) 33vw, 160px" />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, opacity: 0.4 }}>⛵</div>
                    )}
                    {t.pinnar_rating === 3 && (
                      <div style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '2px 5px', fontSize: 8, fontWeight: 700, color: '#fff' }}>
                        ⚓⚓⚓
                      </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,20,35,0.6) 0%,transparent 100%)', padding: '12px 5px 5px' }}>
                      {t.location_name && (
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.location_name}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
