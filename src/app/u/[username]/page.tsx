import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import FollowButton from '@/components/FollowButton'

export const revalidate = 60

// ── Countries (for flag lookup) ───────────────────────────────────────────────
const COUNTRIES = [
  { flag: '🇸🇪', name: 'Sverige' },   { flag: '🇳🇴', name: 'Norge' },
  { flag: '🇩🇰', name: 'Danmark' },   { flag: '🇫🇮', name: 'Finland' },
  { flag: '🇩🇪', name: 'Tyskland' },  { flag: '🇬🇧', name: 'Storbritannien' },
  { flag: '🇳🇱', name: 'Nederländerna' }, { flag: '🇫🇷', name: 'Frankrike' },
  { flag: '🇪🇸', name: 'Spanien' },   { flag: '🇮🇹', name: 'Italien' },
  { flag: '🇵🇱', name: 'Polen' },     { flag: '🇺🇸', name: 'USA' },
  { flag: '🇦🇺', name: 'Australien' },{ flag: '🇨🇦', name: 'Kanada' },
  { flag: '🇯🇵', name: 'Japan' },     { flag: '🇧🇷', name: 'Brasilien' },
  { flag: '🇦🇹', name: 'Österrike' }, { flag: '🇨🇭', name: 'Schweiz' },
  { flag: '🇧🇪', name: 'Belgien' },   { flag: '🇵🇹', name: 'Portugal' },
  { flag: '🇬🇷', name: 'Grekland' },  { flag: '🇸🇦', name: 'Saudiarabien' },
  { flag: '🇦🇪', name: 'Förenade Arabemiraten' }, { flag: '🇳🇿', name: 'Nya Zeeland' },
  { flag: '🇸🇬', name: 'Singapore' }, { flag: '🇭🇷', name: 'Kroatien' },
  { flag: '🇮🇸', name: 'Island' },    { flag: '🇪🇪', name: 'Estland' },
  { flag: '🇱🇻', name: 'Lettland' },  { flag: '🇱🇹', name: 'Litauen' },
]

/** Returns "🇸🇪 Sverige" from either "🇸🇪 Sverige" or legacy "Sverige" */
function formatNationality(raw: string): string {
  // Already has flag prefix (stored as "🇸🇪 Sverige")
  const withFlag = COUNTRIES.find(c => `${c.flag} ${c.name}` === raw)
  if (withFlag) return `${withFlag.flag} ${withFlag.name}`
  // Legacy: stored as just "Sverige"
  const byName = COUNTRIES.find(c => c.name === raw)
  if (byName) return `${byName.flag} ${byName.name}`
  return raw // unknown — show as-is
}

// ── Achievements (same logic as /profil) ─────────────────────────────────────
const ACHIEVEMENTS = [
  { id: 'first',       emoji: '🏁', label: 'Första kastet',     check: (t: Trip[], _d: number, _s: number) => t.length >= 1 },
  { id: 'five',        emoji: '🧭', label: 'Äventyrare',        check: (t: Trip[], _d: number, _s: number) => t.length >= 5 },
  { id: 'ten',         emoji: '🌊', label: 'Saltvattenblod',    check: (t: Trip[], _d: number, _s: number) => t.length >= 10 },
  { id: 'dist50',      emoji: '⚓', label: '50 NM',             check: (_t: Trip[], d: number, _s: number) => d >= 50 },
  { id: 'dist100',     emoji: '⛵', label: '100 NM Segrare',    check: (_t: Trip[], d: number, _s: number) => d >= 100 },
  { id: 'magic',       emoji: '✨', label: 'Magisk tur',        check: (t: Trip[], _d: number, _s: number) => t.some(x => x.pinnar_rating === 3) },
  { id: 'explorer',    emoji: '🗺️', label: 'Kartläggaren',     check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 5 },
  { id: 'boats',       emoji: '🚤', label: 'Multifarare',       check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.boat_type).filter(Boolean)).size >= 3 },
  { id: 'streak3',     emoji: '🔥', label: 'Veckostrejk',       check: (_t: Trip[], _d: number, s: number) => s >= 3 },
  { id: 'twenty',      emoji: '🏆', label: 'Havets Herre',      check: (t: Trip[], _d: number, _s: number) => t.length >= 20 },
  { id: 'dist250',     emoji: '🌍', label: 'Oceansegrare',      check: (_t: Trip[], d: number, _s: number) => d >= 250 },
  { id: 'dist500',     emoji: '🚀', label: 'Atlantfararen',     check: (_t: Trip[], d: number, _s: number) => d >= 500 },
  { id: 'locs10',      emoji: '📍', label: 'Skärgårdsvandraren',check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 10 },
  { id: 'locs25',      emoji: '🗾', label: 'Arkipelagos',       check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 25 },
  { id: 'magic3',      emoji: '🌟', label: 'Magikern',          check: (t: Trip[], _d: number, _s: number) => t.filter(x => x.pinnar_rating === 3).length >= 3 },
  { id: 'streak8',     emoji: '⚡', label: 'Veckokrigaren',     check: (_t: Trip[], _d: number, s: number) => s >= 8 },
  { id: 'earlybird',   emoji: '🌅', label: 'Gryningsseglaren',  check: (t: Trip[]) => t.some(x => x.started_at && new Date(x.started_at).getHours() < 7) },
  { id: 'nightsail',   emoji: '🌙', label: 'Nattseglaren',      check: (t: Trip[]) => t.some(x => x.ended_at && new Date(x.ended_at).getHours() >= 22) },
  { id: 'speed15',     emoji: '💨', label: 'Vindridaren',       check: (t: Trip[]) => t.some((x: Trip & { max_speed_knots?: number }) => (x.max_speed_knots ?? 0) >= 15) },
  { id: 'fifty_trips', emoji: '👑', label: 'Skärgårdskungen',   check: (t: Trip[], _d: number, _s: number) => t.length >= 50 },
]

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  return {
    title: `${username} – Svalla`,
    description: `Se ${username}s seglarturer i skärgården på Svalla.`,
    openGraph: { title: `${username} på Svalla`, url: `https://svalla.se/u/${username}` },
  }
}

function getISOWeek(d: Date): string {
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d.getTime() - jan1.getTime()) / 86400000) + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${week.toString().padStart(2, '0')}`
}

function calcStreak(trips: Trip[]): number {
  if (!trips.length) return 0
  const weeks = new Set(trips.map(t => getISOWeek(new Date(t.created_at))))
  const sorted = [...weeks].sort((a, b) => b.localeCompare(a))
  const now = new Date()
  const currentWeek = getISOWeek(now)
  const prevWeek = getISOWeek(new Date(now.getTime() - 7 * 86400000))
  if (!weeks.has(currentWeek) && !weeks.has(prevWeek)) return 0
  let streak = 0
  let check = weeks.has(currentWeek) ? currentWeek : prevWeek
  for (const week of sorted) {
    if (week === check) {
      streak++
      const [yr, wk] = check.split('-W').map(Number)
      check = getISOWeek(new Date(yr, 0, 1 + (wk - 1) * 7 - 7))
    } else break
  }
  return streak
}

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = createClient()

  // Fetch user by username (with extended profile fields)
  const { data: userRow, error: userErr } = await supabase
    .from('users')
    .select('id, username, avatar, bio, nationality, experience_years, vessel_type, vessel_model, vessel_name, home_port, sailing_region, public_fields')
    .eq('username', username)
    .single()

  if (userErr || !userRow) notFound()

  // Fetch their trips + social counts + besökta öar
  const [
    { data: rawTrips },
    { count: followersCount },
    { count: followingCount },
    { data: visitedIslandsData },
  ] = await Promise.all([
    supabase
      .from('trips')
      .select('id, user_id, boat_type, distance, duration, average_speed_knots, max_speed_knots, image, location_name, caption, pinnar_rating, started_at, ended_at, created_at, route_points')
      .eq('user_id', userRow.id)
      .order('created_at', { ascending: false }),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', userRow.id),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userRow.id),
    supabase.from('visited_islands').select('island_slug, visited_at').eq('user_id', userRow.id).order('visited_at', { ascending: false }),
  ])

  const trips = (rawTrips ?? []) as Trip[]
  const visitedSlugs = (visitedIslandsData ?? []).map((v: { island_slug: string }) => v.island_slug)

  const totalDist   = trips.reduce((a, t) => a + (t?.distance ?? 0), 0)
  const streak      = calcStreak(trips)
  const uniqueLocs  = new Set(trips.map(t => t.location_name).filter(Boolean)).size
  const magicCount  = trips.filter(t => t.pinnar_rating === 3).length
  const unlockedAch = ACHIEVEMENTS.filter(a => a.check(trips, totalDist, streak))

  return (
    <div style={{ minHeight: '100vh', background: '#f2f8fa', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 16px)' }}>

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', padding: '12px 16px',
        background: 'rgba(250,254,255,0.96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link href="/feed" style={{
          width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,123,140,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#1e5c82', margin: '0 0 0 12px' }}>{userRow.username}</h1>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '14px 14px' }}>

        {/* ── Identity card ── */}
        <div style={{
          background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
          borderRadius: 22, padding: '22px 20px', marginBottom: 12,
          boxShadow: '0 6px 28px rgba(30,92,130,0.28)',
        }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {(() => { const pub: string[] = (userRow as any).public_fields ?? []; return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            {/* Avatar */}
            <div style={{
              width: 60, height: 60, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,255,255,0.2)',
              border: '2.5px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, color: '#fff', overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(userRow as any).avatar
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={(userRow as any).avatar} alt={userRow.username} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : userRow.username[0]?.toUpperCase()}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>{userRow.username}</div>
              {/* Followers / following */}
              <div style={{ display: 'flex', gap: 14, marginTop: 3, marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                  <strong style={{ color: '#fff', fontWeight: 900 }}>{followersCount ?? 0}</strong> följare
                </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>
                  <strong style={{ color: '#fff', fontWeight: 900 }}>{followingCount ?? 0}</strong> följer
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', display: 'flex', flexWrap: 'wrap', gap: '4px 10px' }}>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {pub.includes('nationality') && (userRow as any).nationality && <span>{formatNationality((userRow as any).nationality)}</span>}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {pub.includes('experience_years') && (userRow as any).experience_years && <span>⚓ {(userRow as any).experience_years} år till havs</span>}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {pub.includes('home_port') && (userRow as any).home_port && <span>🏠 {(userRow as any).home_port}</span>}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {pub.includes('sailing_region') && (userRow as any).sailing_region && <span>🧭 {(userRow as any).sailing_region}</span>}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {!pub.length && <span>Seglare på Svalla</span>}
              </div>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {pub.includes('bio') && (userRow as any).bio && (
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 6, fontStyle: 'italic', lineHeight: 1.4 }}>
                  &ldquo;{(userRow as any).bio}&rdquo;
                </div>
              )}
              {/* Vessel info */}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(pub.includes('vessel_name') || pub.includes('vessel_type') || pub.includes('vessel_model')) && (
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {pub.includes('vessel_name') && (userRow as any).vessel_name && (
                    <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '2px 8px', color: '#fff' }}>
                      ⛵ {(userRow as any).vessel_name}
                    </span>
                  )}
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {pub.includes('vessel_model') && (userRow as any).vessel_model && (
                    <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '2px 8px', color: 'rgba(255,255,255,0.8)' }}>
                      {(userRow as any).vessel_model}
                    </span>
                  )}
                </div>
              )}
            </div>
            {streak > 0 && (
              <div style={{
                marginLeft: 'auto', flexShrink: 0, alignSelf: 'flex-start',
                background: 'rgba(255,107,53,0.85)', borderRadius: 12, padding: '6px 12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <span style={{ fontSize: 14, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{streak}</span>
                <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', fontWeight: 700, letterSpacing: '0.3px' }}>VECKOR</span>
              </div>
            )}
          </div>
          )})()}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { val: trips.length,             label: 'Turer',   emoji: '⛵' },
              { val: `${totalDist.toFixed(0)}`, label: 'NM',      emoji: '🧭' },
              { val: uniqueLocs,               label: 'Platser', emoji: '📍' },
              { val: magicCount,               label: 'Magiska', emoji: '✨' },
            ].map(({ val, label, emoji }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.12)', borderRadius: 14, padding: '10px 6px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 15, marginBottom: 2 }}>{emoji}</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Follow button */}
          <div style={{ marginTop: 14 }}>
            <FollowButton targetUserId={userRow.id} darkBg />
          </div>
        </div>

        {/* ── Besökta öar ── */}
        {visitedSlugs.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
                🗺️ Besökta öar
              </h3>
              <span style={{ fontSize: 12, fontWeight: 800, color: '#0f9e64' }}>
                {visitedSlugs.length} / 69
              </span>
            </div>
            {/* Progress bar */}
            <div style={{ height: 6, background: 'rgba(15,158,100,.1)', borderRadius: 4, marginBottom: 14, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                background: 'linear-gradient(90deg,#0f9e64,#2dc88c)',
                width: `${Math.min(100, (visitedSlugs.length / 69) * 100)}%`,
                transition: 'width .6s ease',
              }} />
            </div>
            {/* Island chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {visitedSlugs.slice(0, 20).map((slug: string) => {
                const name = slug.replace(/-/g, ' ')
                  .split(' ')
                  .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(' ')
                return (
                  <Link key={slug} href={`/o/${slug}`} style={{
                    padding: '4px 10px', borderRadius: 20,
                    background: 'rgba(15,158,100,.09)',
                    color: '#0a7a50', fontSize: 11, fontWeight: 700,
                    textDecoration: 'none',
                    border: '1px solid rgba(15,158,100,.2)',
                  }}>
                    📍 {name}
                  </Link>
                )
              })}
              {visitedSlugs.length > 20 && (
                <span style={{ padding: '4px 10px', borderRadius: 20, background: 'rgba(10,123,140,.07)', color: '#5a8090', fontSize: 11, fontWeight: 600 }}>
                  +{visitedSlugs.length - 20} till
                </span>
              )}
            </div>
          </div>
        )}

        {/* ── Märken ── */}
        {unlockedAch.length > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
            <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>
              Märken · {unlockedAch.length}/{ACHIEVEMENTS.length}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {ACHIEVEMENTS.map((a) => {
                const unlocked = unlockedAch.includes(a)
                return (
                  <div key={a.id} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                    padding: '10px 4px', borderRadius: 14,
                    background: unlocked ? 'rgba(10,123,140,0.07)' : 'rgba(0,0,0,0.025)',
                    border: `1.5px solid ${unlocked ? 'rgba(10,123,140,0.18)' : 'transparent'}`,
                    opacity: unlocked ? 1 : 0.30,
                  }}>
                    <span style={{ fontSize: 22, filter: unlocked ? 'none' : 'grayscale(1)' }}>{a.emoji}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: unlocked ? '#1e5c82' : '#7a9dab', textAlign: 'center', lineHeight: 1.3 }}>
                      {a.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Trip grid ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)' }}>
          {trips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⛵</div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#3d5865', margin: '0 0 6px' }}>Inga turer loggade ännu</p>
              <p style={{ fontSize: 13, color: '#7a9dab', margin: 0, lineHeight: 1.5 }}>
                {userRow.username} har inte loggat någon tur på Svalla än.<br />Kom tillbaka senare!
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
                  Turer
                </h3>
                <span style={{ fontSize: 11, color: '#7a9dab' }}>{trips.length} st</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {trips.map(t => (
                  <Link key={t.id} href={`/tur/${t.id}`} style={{
                    position: 'relative', aspectRatio: '1/1', borderRadius: 12,
                    overflow: 'hidden', background: '#a8ccd4', display: 'block',
                  }}>
                    {t.image && (
                      <Image
                        src={t.image}
                        alt={t.location_name ?? 'Tur'}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 520px) 33vw, 160px"
                      />
                    )}
                    {t.pinnar_rating === 3 && (
                      <span style={{
                        position: 'absolute', top: 4, right: 4,
                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
                        color: '#fff', fontSize: 7, padding: '2px 5px', borderRadius: 8, fontWeight: 700,
                      }}>
                        ⚓⚓⚓
                      </span>
                    )}
                    {t.location_name && (
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(0,20,35,0.65) 0%, transparent 100%)',
                        padding: '14px 5px 5px',
                      }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.location_name}
                        </p>
                      </div>
                    )}
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
