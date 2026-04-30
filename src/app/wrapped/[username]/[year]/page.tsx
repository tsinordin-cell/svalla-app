import { notFound } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Metadata } from 'next'
import Link from 'next/link'
import type { Trip } from '@/lib/supabase'

export const revalidate = 3600

interface Props {
 params: Promise<{ username: string; year: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { username, year } = await params
 const title = `${username}s ${year} på Svalla`
 const description = `Se ${username}s seglarsäsong ${year} — turer, distans och höjdpunkter.`
 const ogUrl = `/wrapped/${username}/${year}/opengraph-image`
 return {
 title,
 description,
 robots: { index: true, follow: true },
 alternates: { canonical: `https://svalla.se/wrapped/${username}/${year}` },
 openGraph: {
 title,
 description,
 url: `https://svalla.se/wrapped/${username}/${year}`,
 images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
 },
 twitter: { card: 'summary_large_image', title, description, images: [ogUrl] },
 }
}

function buildSpaghettiPath(
 allPoints: { lat: number; lng: number }[][],
 W: number,
 H: number,
): string {
 const flat = allPoints.flat()
 if (flat.length < 2) return ''
 const lats = flat.map(p => p.lat)
 const lngs = flat.map(p => p.lng)
 const minLat = Math.min(...lats), maxLat = Math.max(...lats)
 const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
 const ranLat = maxLat - minLat || 0.001
 const ranLng = maxLng - minLng || 0.001
 const pad = 0.1
 function tx(lng: number) { return (((lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W }
 function ty(lat: number) { return H - (((lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H }
 return allPoints
 .map(pts => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${tx(p.lng).toFixed(1)} ${ty(p.lat).toFixed(1)}`).join(' '))
 .join(' ')
}

function fmtDist(nm: number) {
 return nm >= 1000 ? `${(nm / 1000).toFixed(1)}k` : nm.toFixed(0)
}
function fmtDur(mins: number) {
 const h = Math.floor(mins / 60)
 const m = mins % 60
 return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec']

export default async function WrappedPage({ params }: Props) {
 const { username, year } = await params
 const yr = parseInt(year, 10)
 if (isNaN(yr) || yr < 2020 || yr > new Date().getFullYear() + 1) notFound()

 const supabase = await createServerSupabaseClient()

 const { data: userRow } = await supabase
 .from('users')
 .select('id, username, avatar, home_port, vessel_name, vessel_type')
 .eq('username', username)
 .single()
 if (!userRow) notFound()

 const { data: rawTrips } = await supabase
 .from('trips')
 .select('id, distance, duration, max_speed_knots, average_speed_knots, location_name, caption, pinnar_rating, image, images, route_points, started_at, created_at')
 .eq('user_id', userRow.id)
 .is('deleted_at', null)
 .gte('started_at', `${yr}-01-01`)
 .lt('started_at', `${yr + 1}-01-01`)
 .order('started_at', { ascending: true })

 const trips = (rawTrips ?? []) as Trip[]
 if (trips.length === 0) notFound()

 // ── Stats ─────────────────────────────────────────────────────────────────
 const totalDist = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
 const totalDur = trips.reduce((a, t) => a + (t.duration ?? 0), 0)
 const maxSpeed = Math.max(...trips.map(t => t.max_speed_knots ?? 0))
 const magiskCount = trips.filter(t => t.pinnar_rating === 3).length
 const uniqueLocs = new Set(trips.map(t => t.location_name).filter(Boolean)).size

 // ── Top 3 longest ────────────────────────────────────────────────────────
 const top3Long = [...trips].sort((a, b) => (b.distance ?? 0) - (a.distance ?? 0)).slice(0, 3)

 // ── Top 3 fastest ────────────────────────────────────────────────────────
 const top3Fast = [...trips].filter(t => (t.max_speed_knots ?? 0) > 0).sort((a, b) => (b.max_speed_knots ?? 0) - (a.max_speed_knots ?? 0)).slice(0, 3)

 // ── Best photos (trips with images, pick first) ──────────────────────────
 const withPhotos = trips.filter(t => t.image).slice(0, 6)

 // ── Monthly bars ─────────────────────────────────────────────────────────
 const monthMap: Record<number, number> = {}
 for (const t of trips) {
 const m = new Date(t.started_at ?? t.created_at).getMonth()
 monthMap[m] = (monthMap[m] ?? 0) + 1
 }
 const maxBar = Math.max(...Object.values(monthMap), 1)

 // ── Spaghetti map ────────────────────────────────────────────────────────
 const routeGroups = trips
 .map(t => t.route_points)
 .filter((p): p is { lat: number; lng: number }[] => Array.isArray(p) && p.length >= 2)
 const SW = 320, SH = 200
 const spaghettiPath = buildSpaghettiPath(routeGroups, SW, SH)

 const u = userRow as Record<string, string | null>
 const shareUrl = `https://svalla.se/wrapped/${username}/${year}`

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

 {/* ── Hero ── */}
 <div style={{
 background: 'linear-gradient(160deg, #0d2240 0%, #1a4a5e 50%, #0a7b8c 100%)',
 padding: '60px 20px 48px',
 textAlign: 'center',
 position: 'relative',
 overflow: 'hidden',
 }}>
 <div style={{
 position: 'absolute', inset: 0,
 background: 'radial-gradient(ellipse 80% 80% at 50% 120%, rgba(45,125,138,0.4) 0%, transparent 60%)',
 pointerEvents: 'none',
 }} />
 <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 10px', position: 'relative' }}>
 Säsongsrecap {year}
 </p>
 <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 6px', position: 'relative' }}>
 {username}s {year}
 </h1>
 {(u.vessel_name || u.home_port) && (
 <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px', position: 'relative' }}>
 {u.vessel_name ? `${u.vessel_name}` : ''}{u.vessel_name && u.home_port ? ' · ' : ''}{u.home_port ? `📍 ${u.home_port}` : ''}
 </p>
 )}
 <div style={{ display: 'flex', justifyContent: 'center', gap: 24, position: 'relative' }}>
 {[
 { val: trips.length.toString(), label: 'Turer' },
 { val: `${fmtDist(totalDist)} nm`, label: 'Distans' },
 { val: fmtDur(totalDur), label: 'Tid till havs' },
 ].map(s => (
 <div key={s.label} style={{ textAlign: 'center' }}>
 <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{s.val}</div>
 <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>{s.label}</div>
 </div>
 ))}
 </div>
 </div>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

 {/* ── Spaghetti-karta ── */}
 {spaghettiPath && (
 <div style={{ marginTop: 24, background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,45,60,0.08)' }}>
 <div style={{ padding: '14px 16px 10px' }}>
 <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>Årets rutter</p>
 </div>
 <div style={{ background: '#0d2240', padding: '0 0 4px' }}>
 <svg viewBox={`0 0 ${SW} ${SH}`} width="100%" style={{ display: 'block' }}>
 <path d={spaghettiPath} fill="none" stroke="rgba(74,184,212,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 </div>
 </div>
 )}

 {/* ── Månadsaktivitet ── */}
 <div style={{ marginTop: 16, background: 'var(--white)', borderRadius: 18, padding: '16px 16px 20px', boxShadow: '0 2px 12px rgba(0,45,60,0.08)' }}>
 <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>Aktivitet per månad</p>
 <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
 {Array.from({ length: 12 }, (_, i) => {
 const cnt = monthMap[i] ?? 0
 const h = cnt > 0 ? Math.max(4, Math.round((cnt / maxBar) * 52)) : 2
 return (
 <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
 <div style={{
 width: '100%', height: h,
 borderRadius: 3,
 background: cnt > 0 ? 'linear-gradient(180deg,#2d7d8a,#1e5c82)' : 'rgba(10,123,140,0.08)',
 transition: 'height 0.3s',
 }} />
 <span style={{ fontSize: 7, color: 'var(--txt3)', textTransform: 'uppercase' }}>{MONTHS[i]!.slice(0, 1)}</span>
 </div>
 )
 })}
 </div>
 </div>

 {/* ── Highlights ── */}
 <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
 {[
 { icon: '', val: `${maxSpeed.toFixed(1)} kn`, label: 'Toppfart' },
 { icon: '', val: magiskCount.toString(), label: 'Magiska turer' },
 { icon: '📍', val: uniqueLocs.toString(), label: 'Unika platser' },
 { icon: '🏆', val: `${(totalDist / Math.max(trips.length, 1)).toFixed(1)} nm`, label: 'Snitttur' },
 ].map(h => (
 <div key={h.label} style={{ background: 'var(--white)', borderRadius: 16, padding: '14px 14px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)' }}>
 <div style={{ fontSize: 22, marginBottom: 6 }}>{h.icon}</div>
 <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', lineHeight: 1 }}>{h.val}</div>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3 }}>{h.label}</div>
 </div>
 ))}
 </div>

 {/* ── Längsta turer ── */}
 {top3Long.length > 0 && (
 <div style={{ marginTop: 16, background: 'var(--white)', borderRadius: 18, padding: '16px', boxShadow: '0 2px 12px rgba(0,45,60,0.08)' }}>
 <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 12px' }}>Längsta turer</p>
 {top3Long.map((t, i) => (
 <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < top3Long.length - 1 ? '1px solid rgba(10,123,140,0.08)' : 'none' }}>
 <span style={{ fontSize: 16, width: 24, textAlign: 'center', flexShrink: 0 }}>{'🥇🥈🥉'[i]}</span>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {t.location_name ?? t.caption ?? 'Tur'}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>{fmtDist(t.distance ?? 0)} nm · {fmtDur(t.duration ?? 0)}</div>
 </div>
 </Link>
 ))}
 </div>
 )}

 {/* ── Snabbaste turer ── */}
 {top3Fast.length > 0 && (
 <div style={{ marginTop: 16, background: 'var(--white)', borderRadius: 18, padding: '16px', boxShadow: '0 2px 12px rgba(0,45,60,0.08)' }}>
 <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 12px' }}>Snabbaste turer</p>
 {top3Fast.map((t, i) => (
 <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < top3Fast.length - 1 ? '1px solid rgba(10,123,140,0.08)' : 'none' }}>
 <span style={{ fontSize: 16, width: 24, textAlign: 'center', flexShrink: 0 }}>{'🥇🥈🥉'[i]}</span>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {t.location_name ?? t.caption ?? 'Tur'}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>{(t.max_speed_knots ?? 0).toFixed(1)} kn toppfart</div>
 </div>
 </Link>
 ))}
 </div>
 )}

 {/* ── Bästa foton ── */}
 {withPhotos.length > 0 && (
 <div style={{ marginTop: 16 }}>
 <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>Höjdpunkter</p>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
 {withPhotos.map(t => (
 <Link key={t.id} href={`/tur/${t.id}`}>
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={t.image!}
 alt={t.location_name ?? ''}
 style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: 12, display: 'block' }}
 loading="lazy"
 />
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* ── Avslutning ── */}
 <div style={{ marginTop: 24, textAlign: 'center', padding: '24px 16px', background: 'linear-gradient(135deg, #0d2240, #1e5c82)', borderRadius: 20, boxShadow: '0 4px 18px rgba(10,60,90,0.18)' }}>
 <div style={{ fontSize: 32, marginBottom: 10 }}> </div>
 <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Tack för {yr}!</p>
 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '0 0 18px', lineHeight: 1.5 }}>
 {trips.length} turer, {fmtDist(totalDist)} nm och {uniqueLocs} platser besökta.
 </p>
 <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
 <a
 href={`https://wa.me/?text=${encodeURIComponent(`${username}s ${yr} till havs på Svalla — ${trips.length} turer, ${fmtDist(totalDist)} nm ${shareUrl}`)}`}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 display: 'inline-flex', alignItems: 'center', gap: 7,
 padding: '10px 20px', borderRadius: 12,
 background: 'rgba(37,211,102,0.20)', border: '1px solid rgba(37,211,102,0.35)',
 color: '#4be083', fontSize: 13, fontWeight: 700, textDecoration: 'none',
 }}
 >
 <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15, flexShrink: 0 }}>
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
 </svg>
 WhatsApp
 </a>
 <a
 href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${username}s ${yr} till havs på Svalla — ${trips.length} turer, ${fmtDist(totalDist)} nm `)}&url=${encodeURIComponent(shareUrl)}`}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 display: 'inline-flex', alignItems: 'center', gap: 7,
 padding: '10px 20px', borderRadius: 12,
 background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)',
 color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
 }}
 >
 Dela på X →
 </a>
 </div>
 </div>

 <div style={{ marginTop: 24, textAlign: 'center' }}>
 <Link href={`/u/${username}`} style={{ color: 'var(--txt3)', fontSize: 13, textDecoration: 'none' }}>
 ← Se {username}s profil
 </Link>
 </div>
 </div>
 </div>
 )
}
