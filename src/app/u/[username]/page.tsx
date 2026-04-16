import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import FollowButton from '@/components/FollowButton'

export const revalidate = 60

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

  // Fetch their trips + social counts
  const [
    { data: rawTrips },
    { count: followersCount },
    { count: followingCount },
  ] = await Promise.all([
    supabase
      .from('trips')
      .select('id, user_id, boat_type, distance, duration, average_speed_knots, image, location_name, caption, pinnar_rating, started_at, ended_at, created_at')
      .eq('user_id', userRow.id)
      .order('created_at', { ascending: false }),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', userRow.id),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', userRow.id),
  ])

  const trips = (rawTrips ?? []) as Trip[]

  const totalDist  = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const streak     = calcStreak(trips)
  const uniqueLocs = new Set(trips.map(t => t.location_name).filter(Boolean)).size
  const magicCount = trips.filter(t => t.pinnar_rating === 3).length

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
                {pub.includes('nationality') && (userRow as any).nationality && <span>🌍 {(userRow as any).nationality}</span>}
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
            <FollowButton targetUserId={userRow.id} />
          </div>
        </div>

        {/* ── Trip grid ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)' }}>
          {trips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>⛵</div>
              <p style={{ fontSize: 14, color: '#7a9dab' }}>Inga loggade turer ännu</p>
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
