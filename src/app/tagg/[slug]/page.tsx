import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Trip } from '@/lib/supabase'
import type { Metadata } from 'next'
import Link from 'next/link'
import TripCard from '@/components/TripCard'
import TagFollowButton from '@/components/TagFollowButton'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params
 const tag = decodeURIComponent(slug).toLowerCase()
 return {
 title: `#${tag} — Svalla`,
 description: `Turer taggade med #${tag} på Svalla`,
 }
}

export default async function TagPage({ params }: Props) {
 const { slug } = await params
 const tag = decodeURIComponent(slug).toLowerCase()

 const supabase = await createServerSupabaseClient()

 // Hämta turer vars caption innehåller #tag (word-boundary via regex i JS efter fetch)
 const { data: rawTrips, error } = await supabase
 .from('trips')
 .select(`
 id, user_id, boat_type, distance, duration, average_speed_knots, max_speed_knots,
 image, images, location_name, start_location, caption, pinnar_rating,
 route_id, started_at, ended_at, created_at, route_points,
 users:users(username, avatar)
 `)
 .ilike('caption', `%#${tag}%`)
 .is('deleted_at', null)
 .order('created_at', { ascending: false })
 .limit(60)

 // Ord-gräns-filter i JS — undviker att #sandhamn matchar #sandhamnsklubben
 const wordBoundary = new RegExp(`(?:^|[^a-zåäöA-ZÅÄÖ0-9])#${tag}(?=[^a-zåäöA-ZÅÄÖ0-9]|$)`, 'i')
 const filteredRaw = (rawTrips ?? []).filter(t =>
 t.caption && wordBoundary.test(t.caption)
 )

 // Mappa till Trip-typen (users.avatar → users.avatar_url)
 const trips: Trip[] = filteredRaw.map((t) => {
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const u = t.users as any
 return {
 ...t,
 start_location: null,
 images: Array.isArray(t.images) ? t.images : null,
 route_points: t.route_points as { lat: number; lng: number }[] | null,
 users: u ? { username: u.username ?? 'Seglare', avatar_url: u.avatar ?? null } : undefined,
 routes: null,
 likes_count: 0,
 comments_count: 0,
 user_liked: false,
 }
 })

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
 {/* ── Header ── */}
 <header style={{
 position: 'sticky', top: 0, zIndex: 50,
 display: 'flex', alignItems: 'center', gap: 10,
 padding: '12px 16px 10px',
 background: 'var(--glass-96)',
 backdropFilter: 'blur(12px)',
 WebkitBackdropFilter: 'blur(12px)',
 borderBottom: '1px solid rgba(10,123,140,0.10)',
 boxShadow: '0 2px 12px rgba(0,45,60,0.05)',
 }}>
 <Link href="/feed" style={{
 width: 36, height: 36, borderRadius: '50%',
 background: 'rgba(10,123,140,0.08)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 flexShrink: 0,
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </Link>

 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--sea)', lineHeight: 1.1 }}>
 #{tag}
 </div>
 {!error && (
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
 {trips.length} {trips.length === 1 ? 'tur' : 'turer'}
 </div>
 )}
 </div>

 <TagFollowButton tag={tag} />
 </header>

 <div style={{
 maxWidth: 640, margin: '0 auto',
 padding: '16px 14px',
 paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)',
 }}>

 {error ? (
 <div style={{
 textAlign: 'center', padding: '60px 24px',
 }}>
 <div style={{ fontSize: 48, marginBottom: 16 }}> </div>
 <p style={{ fontSize: 15, color: 'var(--txt3)' }}>Kunde inte ladda turer just nu.</p>
 </div>
 ) : trips.length === 0 ? (
 <div style={{
 textAlign: 'center', padding: '60px 24px',
 }}>
 <div style={{ fontSize: 48, marginBottom: 16 }}>🏷️</div>
 <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>
 Inga turer ännu
 </h2>
 <p style={{ fontSize: 14, color: 'var(--txt3)', lineHeight: 1.5, marginBottom: 24 }}>
 Bli den första att logga en tur med <strong style={{ color: 'var(--sea)' }}>#{tag}</strong>!
 </p>
 <Link href="/logga" style={{
 display: 'inline-flex', alignItems: 'center', gap: 8,
 padding: '12px 24px', borderRadius: 14,
 background: 'var(--grad-sea)',
 color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
 }}>
 Logga tur
 </Link>
 </div>
 ) : (
 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
 {trips.map((trip, i) => (
 <TripCard key={trip.id} trip={trip} priority={i < 2} />
 ))}
 </div>
 )}
 </div>
 </div>
 )
}
