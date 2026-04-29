import { createServerSupabaseClient } from '@/lib/supabase-server'
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
import ProfileBadgeGrid from '@/components/ProfileBadgeGrid'
import { isProEnabled } from '@/lib/pro'
import { formatForumDate } from '@/lib/forum'

export const revalidate = 60

const COUNTRIES = [
 { flag: '🇸🇪', name: 'Sverige' }, { flag: '🇳🇴', name: 'Norge' },
 { flag: '🇩🇰', name: 'Danmark' }, { flag: '🇫🇮', name: 'Finland' },
 { flag: '🇩🇪', name: 'Tyskland' }, { flag: '🇬🇧', name: 'Storbritannien' },
 { flag: '🇳🇱', name: 'Nederländerna' }, { flag: '🇫🇷', name: 'Frankrike' },
 { flag: '🇪🇸', name: 'Spanien' }, { flag: '🇮🇹', name: 'Italien' },
 { flag: '🇵🇱', name: 'Polen' }, { flag: '🇺🇸', name: 'USA' },
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

export default async function PublicProfilePage({
 params,
 searchParams,
}: {
 params: Promise<{ username: string }>
 searchParams: Promise<{ tab?: string }>
}) {
 const { username } = await params
 const { tab } = await searchParams
 const activeTab = tab === 'taggad' ? 'taggad' : tab === 'forum' ? 'forum' : 'turer'
 // Server component → server-klient som forwardar auth-cookies.
 // Browser-client (createClient från '@/lib/supabase') saknar session i server-context
 // och RLS blockerar då trips-läsningen → 0 turer trots att data finns.
 const supabase = await createServerSupabaseClient()

 const { data: userRow, error: userErr } = await supabase
 .from('users')
 .select('id, username, avatar, bio, website, nationality, experience_years, vessel_type, vessel_model, vessel_name, home_port, sailing_region, public_fields')
 .eq('username', username)
 .single()
 if (userErr || !userRow) notFound()

 const [
 { data: rawTrips },
 { count: followersCount },
 { count: followingCount },
 { data: visitedIslandsData },
 { data: subRow },
 { data: taggedTripIds },
 { data: forumThreadsRaw },
 { data: forumPostsRaw },
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
 isProEnabled()
 ? supabase.from('subscriptions').select('status,current_period_end').eq('user_id', userRow.id).in('status', ['active','trialing']).maybeSingle()
 : Promise.resolve({ data: null }),
 supabase.from('trip_tags').select('trip_id').eq('tagged_user_id', userRow.id),
 supabase
 .from('forum_threads')
 .select('id, title, category_id, created_at, reply_count')
 .eq('user_id', userRow.id)
 .eq('in_spam_queue', false)
 .eq('is_deleted', false)
 .order('created_at', { ascending: false })
 .limit(20),
 supabase
 .from('forum_posts')
 .select('id, body, created_at, thread_id, forum_threads(id, title, category_id)')
 .eq('user_id', userRow.id)
 .eq('in_spam_queue', false)
 .order('created_at', { ascending: false })
 .limit(20),
 ])

 // Fetch the actual trip data for tagged trips
 const taggedIds = (taggedTripIds ?? []).map((r: { trip_id: string }) => r.trip_id)
 const { data: rawTaggedTrips } = taggedIds.length
 ? await supabase
 .from('trips')
 .select('id, user_id, boat_type, distance, duration, average_speed_knots, image, location_name, caption, pinnar_rating, started_at, created_at, route_points')
 .in('id', taggedIds)
 .is('deleted_at', null)
 .order('created_at', { ascending: false })
 : { data: [] }
 const taggedTrips = (rawTaggedTrips ?? []) as Trip[]

 const isProUser = isProEnabled() && !!subRow && new Date((subRow as { current_period_end: string }).current_period_end) > new Date()

 // Forum-aktivitet
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const forumThreads = (forumThreadsRaw ?? []) as any[]
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const forumPosts = (forumPostsRaw ?? []) as any[]
 const forumCount = forumThreads.length + forumPosts.length

 const trips = (rawTrips ?? []) as Trip[]
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const pub: string[] = (userRow as any).public_fields ?? []
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const u = userRow as any

 const totalDist = trips.reduce((a, t) => a + (t?.distance ?? 0), 0)
 const streak = calcStreak(trips)
 const uniqueLocs = new Set(trips.map(t => t.location_name).filter(Boolean)).size
 const unlockedAch = computeUnlocked(trips, streak)
 const visitedCount = (visitedIslandsData ?? []).length

 // Wrapped — find most recent year with trips (current or previous)
 const currentYear = new Date().getFullYear()
 const tripYears = new Set(trips.map(t => new Date(t.started_at ?? t.created_at).getFullYear()))
 const wrappedYear = tripYears.has(currentYear) ? currentYear : tripYears.has(currentYear - 1) ? currentYear - 1 : null
 const wrappedTrips = wrappedYear ? trips.filter(t => new Date(t.started_at ?? t.created_at).getFullYear() === wrappedYear) : []
 const wrappedDist = wrappedTrips.reduce((a, t) => a + (t.distance ?? 0), 0)

 // Monthly bar chart — last 6 months
 const MONTHS = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
 const monthMap: Record<string, { label: string; count: number; dist: number }> = {}
 for (const t of trips) {
 const d = new Date(t.created_at)
 const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
 if (!monthMap[key]) monthMap[key] = { label: MONTHS[d.getMonth()]!, count: 0, dist: 0 }
 monthMap[key]!.count++
 monthMap[key]!.dist += t.distance ?? 0
 }
 const monthBars = Object.entries(monthMap)
 .sort(([a], [b]) => a.localeCompare(b))
 .slice(-6)
 const maxBar = Math.max(...monthBars.map(([, v]) => v.count), 1)

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 24px)' }}>

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
 <FollowButton targetUserId={userRow.id} hideCount />
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
 background: 'var(--bg)',
 clipPath: 'ellipse(55% 100% at 50% 100%)',
 }} />
 </div>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 1 }}>

 {/* ── Avatar + action row ── */}
 <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: -44, marginBottom: 14 }}>
 <div style={{
 width: 84, height: 84, borderRadius: '50%', flexShrink: 0,
 background: 'var(--grad-sea)', position: 'relative',
 border: '4px solid var(--bg)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 30, fontWeight: 700, color: '#fff', overflow: 'hidden',
 boxShadow: '0 4px 20px rgba(0,45,60,0.18)',
 }}>
 {u.avatar
 ? <Image src={u.avatar} alt={userRow.username} fill sizes="84px" style={{ objectFit: 'cover' }} />
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
 <span style={{ fontSize: 14 }}> </span>
 <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{streak}</span>
 <span style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>v</span>
 </div>
 )}
 </div>

 {/* ── Name + bio + chips ── */}
 <div style={{ marginBottom: 16 }}>
 <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: 7 }}>
 {userRow.username}
 {isProUser && (
 <span title="Svalla Pro" aria-label="Pro-användare" style={{
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 width: 22, height: 22, borderRadius: '50%',
 background: 'var(--grad-sea)',
 color: '#fff', fontSize: 11, flexShrink: 0,
 }}> </span>
 )}
 </h1>
 {pub.includes('bio') && u.bio && (
 <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 10px' }}>
 {u.bio}
 </p>
 )}
 {pub.includes('website') && u.website && (
 <a href={u.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--sea)', fontWeight: 600, textDecoration: 'none', marginBottom: 8 }}>
 🌐 {u.website.replace(/^https?:\/\//, '')}
 </a>
 )}
 {/* Info chips */}
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
 {pub.includes('nationality') && u.nationality && (
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
 {formatNationality(u.nationality)}
 </span>
 )}
 {pub.includes('experience_years') && u.experience_years && (
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
 {u.experience_years} år till havs
 </span>
 )}
 {pub.includes('vessel_name') && u.vessel_name && (
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
 {u.vessel_name}{u.vessel_model ? ` · ${u.vessel_model}` : ''}
 </span>
 )}
 {pub.includes('home_port') && u.home_port && (
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>
 🏠 {u.home_port}
 </span>
 )}
 </div>
 </div>

 {/* ── Stats bar ── */}
 <div style={{
 background: 'var(--white)', borderRadius: 18,
 display: 'flex', marginBottom: 16,
 boxShadow: '0 1px 8px rgba(0,45,60,0.07)',
 overflow: 'hidden',
 }}>
 {[
 { val: trips.length, label: 'Turer' },
 { val: `${totalDist.toFixed(0)}`, label: 'NM' },
 { val: uniqueLocs, label: 'Platser' },
 ].map(({ val, label }) => (
 <div key={label} style={{
 flex: 1, padding: '14px 0', textAlign: 'center',
 borderRight: '1px solid rgba(10,123,140,0.07)',
 }}>
 <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.3px' }}>{val}</div>
 <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--txt3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
 </div>
 ))}
 <div style={{ flex: 1, padding: '14px 0', textAlign: 'center', borderRight: '1px solid rgba(10,123,140,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <FollowListButton userId={userRow.id} mode="followers" count={followersCount ?? 0} dark={false} />
 </div>
 <div style={{ flex: 1, padding: '14px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
 <FollowListButton userId={userRow.id} mode="following" count={followingCount ?? 0} dark={false} />
 </div>
 </div>

 {/* ── Achievements grid ── */}
 <div style={{ background: 'var(--white)', borderRadius: 18, padding: '14px', marginBottom: 16, boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
 <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>🏅 Märken</div>
 <span style={{ fontSize: 12, fontWeight: 600, color: unlockedAch.length > 0 ? 'var(--sea)' : 'var(--txt3)' }}>
 {unlockedAch.length}/{ACHIEVEMENTS.length} upplåsta
 </span>
 </div>
 <ProfileBadgeGrid unlockedIds={unlockedAch.map(a => a.id)} />
 </div>

 {/* ── Activity chart ── */}
 {monthBars.length > 0 && (
 <div style={{ background: 'var(--white)', borderRadius: 18, padding: '16px 16px 12px', boxShadow: '0 1px 8px rgba(0,45,60,0.07)', marginBottom: 16 }}>
 <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>
 Aktivitet
 </div>
 <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 56 }}>
 {monthBars.map(([key, v]) => (
 <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
 <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--sea)' }}>{v.count}</span>
 <div style={{
 width: '100%', borderRadius: '4px 4px 0 0',
 background: 'var(--grad-sea)',
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
 <div style={{ background: 'var(--white)', borderRadius: 18, padding: '14px 16px', boxShadow: '0 1px 8px rgba(0,45,60,0.07)', marginBottom: 16 }}>
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
 <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}> ️ Besökta öar</div>
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>{visitedCount} / 69</span>
 </div>
 <div style={{ height: 5, background: 'rgba(15,158,100,.1)', borderRadius: 4, overflow: 'hidden' }}>
 <div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#0f9e64,#2dc88c)', width: `${Math.min(100, (visitedCount / 69) * 100)}%` }} />
 </div>
 </div>
 )}

 {/* ── Wrapped teaser ── */}
 {wrappedYear && wrappedTrips.length >= 3 && (
 <Link href={`/wrapped/${username}/${wrappedYear}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 16 }}>
 <div style={{
 background: 'linear-gradient(135deg, #0d2240 0%, #1a4a5e 55%, #0a7b8c 100%)',
 borderRadius: 18, padding: '18px 20px',
 position: 'relative', overflow: 'hidden',
 boxShadow: '0 4px 18px rgba(10,60,90,0.20)',
 }}>
 <div style={{
 position: 'absolute', inset: 0,
 background: 'radial-gradient(ellipse 65% 80% at 85% 50%, rgba(45,125,138,0.35) 0%, transparent 65%)',
 pointerEvents: 'none',
 }} />
 <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
 <div>
 <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.50)', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: 6 }}>
 Säsongsrecap {wrappedYear}
 </div>
 <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1 }}>
 {wrappedTrips.length} turer · {wrappedDist.toFixed(0)} nm
 </div>
 <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
 Se helårssummeringen
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 11, height: 11, opacity: 0.7 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5.5L15.5 12L9 18.5" />
 </svg>
 </div>
 </div>
 <div style={{ fontSize: 44, lineHeight: 1 }}> </div>
 </div>
 </div>
 </Link>
 )}

 {/* ── Trip grid with tabs ── */}
 <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>

 {/* Tab bar */}
 <div style={{ display: 'flex', borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
 {[
 { key: 'turer', label: 'Turer', count: trips.length },
 ...(taggedTrips.length > 0 ? [{ key: 'taggad', label: 'Taggad i', count: taggedTrips.length }] : []),
 ...(forumCount > 0 ? [{ key: 'forum', label: 'Forum', count: forumCount }] : []),
 ].map(({ key, label, count }) => {
 const active = activeTab === key
 return (
 <Link
 key={key}
 href={key === 'turer' ? `/u/${username}` : `/u/${username}?tab=${key}`}
 style={{
 flex: 1, textAlign: 'center', textDecoration: 'none',
 padding: '13px 8px 11px',
 fontSize: 12, fontWeight: 700,
 color: active ? 'var(--sea)' : 'var(--txt3)',
 borderBottom: active ? '2px solid var(--sea)' : '2px solid transparent',
 transition: 'color .15s',
 }}
 >
 {label}
 <span style={{ marginLeft: 5, fontSize: 11, fontWeight: 400, opacity: 0.75 }}>
 {count}
 </span>
 </Link>
 )
 })}
 </div>

 {/* Tab content */}
 {activeTab === 'forum' ? (
 <ForumActivityTab
 threads={forumThreads}
 posts={forumPosts}
 username={userRow.username}
 />
 ) : (() => {
 const displayTrips = activeTab === 'taggad' ? taggedTrips : trips
 if (displayTrips.length === 0) {
 return (
 <EmptyState
 icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
 title={activeTab === 'taggad' ? 'Inte taggad i några turer' : 'Inga turer ännu'}
 body={activeTab === 'taggad'
 ? `${userRow.username} har inte blivit taggad i någon tur ännu.`
 : `${userRow.username} har inte loggat någon tur på Svalla än.`}
 marginTop={0}
 />
 )
 }
 return (
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, padding: '2px 2px 2px' }}>
 {displayTrips.map(t => (
 <Link key={t.id} href={`/tur/${t.id}`} style={{
 position: 'relative', aspectRatio: '1/1',
 overflow: 'hidden', background: 'var(--grad-sea)',
 display: 'block', borderRadius: 4,
 }}>
 {t.image ? (
 <Image src={t.image} alt={t.location_name ?? 'Tur'} fill style={{ objectFit: 'cover' }} sizes="(max-width:520px) 33vw, 160px" />
 ) : (
 <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, opacity: 0.4 }}> </div>
 )}
 {t.pinnar_rating === 3 && (
 <div style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '2px 5px', fontSize: 8, fontWeight: 700, color: '#fff' }}> </div>
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
 )
 })()}
 </div>
 </div>
 </div>
 )
}

// ── Forum-aktivitets-flik ────────────────────────────────────────────────────
function ForumActivityTab({
 threads,
 posts,
 username,
}: {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 threads: any[]
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 posts: any[]
 username: string
}) {
 if (threads.length === 0 && posts.length === 0) {
 return (
 <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--txt3)', fontSize: 14 }}>
 <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="rgba(10,123,140,0.25)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
 <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
 </svg>
 <div>{username} har inte skrivit i forumet än.</div>
 </div>
 )
 }

 return (
 <div style={{ padding: '12px' }}>

 {/* ── Trådar ── */}
 {threads.length > 0 && (
 <div style={{ marginBottom: posts.length > 0 ? 16 : 0 }}>
 <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8, paddingLeft: 4 }}>
 Trådar
 </div>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
 {threads.map((t) => (
 <Link
 key={t.id}
 href={`/forum/${t.category_id}/${t.id}`}
 style={{ textDecoration: 'none' }}
 >
 <div style={{
 padding: '12px 14px',
 background: 'rgba(10,123,140,0.04)',
 borderRadius: 14,
 border: '1px solid rgba(10,123,140,0.09)',
 display: 'flex', alignItems: 'flex-start', gap: 10,
 WebkitTapHighlightColor: 'transparent',
 }}>
 {/* Thread icon */}
 <div style={{
 width: 30, height: 30, borderRadius: 8, flexShrink: 0,
 background: 'rgba(10,123,140,0.10)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 marginTop: 1,
 }}>
 <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
 </svg>
 </div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{
 fontSize: 13, fontWeight: 600, color: 'var(--txt)',
 overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
 marginBottom: 3,
 }}>
 {t.title}
 </div>
 <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--txt3)' }}>
 <span>{formatForumDate(t.created_at)}</span>
 {t.reply_count > 0 && (
 <>
 <span>·</span>
 <span>{t.reply_count} svar</span>
 </>
 )}
 </div>
 </div>
 <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 4 }}>
 <path d="M9 5.5L15.5 12L9 18.5" />
 </svg>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* ── Svar ── */}
 {posts.length > 0 && (
 <div>
 <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8, paddingLeft: 4 }}>
 Svar
 </div>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
 {posts.map((p) => {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const thread = Array.isArray(p.forum_threads) ? p.forum_threads[0] : p.forum_threads as any
 const href = thread?.id && thread?.category_id
 ? `/forum/${thread.category_id}/${thread.id}#post-${p.id}`
 : '/forum'
 const threadTitle = thread?.title ?? 'Okänd tråd'
 const bodyPreview = (p.body as string).slice(0, 100).replace(/\s+/g, ' ').trim()

 return (
 <Link key={p.id} href={href} style={{ textDecoration: 'none' }}>
 <div style={{
 padding: '12px 14px',
 background: 'var(--card-bg, rgba(10,123,140,0.02))',
 borderRadius: 14,
 border: '1px solid rgba(10,123,140,0.09)',
 WebkitTapHighlightColor: 'transparent',
 }}>
 {/* Thread name */}
 <div style={{ fontSize: 11, color: 'var(--sea)', fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 5 }}>
 <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
 <path d="M9 5.5L15.5 12L9 18.5" />
 </svg>
 <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {threadTitle}
 </span>
 </div>
 {/* Body excerpt */}
 <div style={{
 fontSize: 13, color: 'var(--txt)', lineHeight: 1.5,
 display: '-webkit-box',
 WebkitLineClamp: 2,
 WebkitBoxOrient: 'vertical',
 overflow: 'hidden',
 } as React.CSSProperties}>
 {bodyPreview}{(p.body as string).length > 100 ? '…' : ''}
 </div>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 5 }}>
 {formatForumDate(p.created_at)}
 </div>
 </div>
 </Link>
 )
 })}
 </div>
 </div>
 )}
 </div>
 )
}
