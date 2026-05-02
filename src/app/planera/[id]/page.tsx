import type { Metadata } from 'next'
import { Suspense } from 'react'
import Icon from '@/components/Icon'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import type { ScoredStop } from '@/lib/planner'
import { haversineKm, crossTrack } from '@/lib/planner'
import { buildRouteForecast } from '@/lib/routeForecast'
import PlaneraCTA from './PlaneraCTA'
import PlaneraShare from './PlaneraShare'
import PlaneraRouteSection from './PlaneraRouteSection'
import RouteDisclaimer from '@/components/RouteDisclaimer'
import RouteFeedbackButton from '@/components/RouteFeedbackButton'
import RouteWeatherStrip from '@/components/RouteWeatherStrip'
import SaveRouteCTA from '@/components/SaveRouteCTA'

type Props = { params: Promise<{ id: string }> }

// ── Display helpers ────────────────────────────────────────────────────────

// Mappning från intresse/anledning till SVG-ikonnamn (Icon-komponenten).
// Tomma emoji-strängar bröt ut som tomma blåa cirklar på kartan.
const INTEREST_ICON: Record<string, 'utensils' | 'sun' | 'waves' | 'anchor' | 'leaf' | 'fuel'> = {
 krog: 'utensils', bastu: 'sun', bad: 'waves', brygga: 'anchor', natur: 'leaf', bensin: 'fuel',
}

const REASON_ICON: Record<string, 'utensils' | 'sun' | 'waves' | 'anchor' | 'leaf' | 'fuel'> = {
 'Krog längs rutten': 'utensils',
 'Bastu längs rutten': 'sun',
 'Badplats längs rutten': 'waves',
 'Brygga att lägga till vid': 'anchor',
 'Naturupplevelse längs rutten': 'leaf',
 'Bränslestopp längs rutten': 'fuel',
}

// Inline SVG-paths för Leaflet-markörer (kan inte rendera React-komponenter i divIcon).
const MARKER_SVG: Record<string, string> = {
 utensils: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><line x1="5" y1="11" x2="5" y2="22"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
 sun:      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
 waves:    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 12c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/><path d="M2 18c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2"/></svg>',
 anchor:   '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 15a7 7 0 0 0 14 0"/><line x1="8" y1="11" x2="16" y2="11"/></svg>',
 leaf:     '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.96c1.4 9.3-3.8 15.04-8.2 17.04Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
 fuel:     '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>',
 pin:      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
}

const REASON_SHORT: Record<string, string> = {
 'Krog längs rutten': 'Krog',
 'Bastu längs rutten': 'Bastu',
 'Badplats längs rutten': 'Badplats',
 'Brygga att lägga till vid': 'Gästhamn',
 'Naturupplevelse längs rutten': 'Natur',
 'Bränslestopp längs rutten': 'Bränsle',
}

const REASON_COLOR: Record<string, string> = {
 'Krog längs rutten': '#e8924a',
 'Bastu längs rutten': '#d97706',
 'Badplats längs rutten': '#2d7aaa',
 'Brygga att lägga till vid': '#1a4a5e',
 'Naturupplevelse längs rutten': '#2a9d5c',
 'Bränslestopp längs rutten': '#c96e2a',
}

const REASON_BG: Record<string, string> = {
 'Krog längs rutten': 'rgba(232,146,74,0.12)',
 'Bastu längs rutten': 'rgba(217,119,6,0.12)',
 'Badplats längs rutten': 'rgba(45,122,170,0.12)',
 'Brygga att lägga till vid': 'rgba(26,74,94,0.10)',
 'Naturupplevelse längs rutten': 'rgba(42,157,92,0.12)',
 'Bränslestopp längs rutten': 'rgba(201,110,42,0.12)',
}

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { id } = await params
 const supabase = await createClient()
 const { data } = await supabase
 .from('planned_routes')
 .select('start_name, end_name')
 .eq('id', id)
 .eq('status', 'published')
 .single()

 if (!data) return { title: 'Rutt — Svalla' }
 const desc = `Planerad skärgårdsrutt från ${data.start_name} till ${data.end_name} med stopp längs vägen.`
 const ogImage = `https://svalla.se/api/og/planera/${id}`
 return {
 title: `${data.start_name} → ${data.end_name} — Svalla`,
 description: desc,
 openGraph: {
 title: `${data.start_name} → ${data.end_name} — Svalla`,
 description: desc,
 images: [{ url: ogImage, width: 1200, height: 630, alt: `${data.start_name} → ${data.end_name}` }],
 url: `https://svalla.se/planera/${id}`,
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: `${data.start_name} → ${data.end_name} — Svalla`,
 description: desc,
 images: [ogImage],
 },
 alternates: { canonical: `https://svalla.se/planera/${id}` },
 }
}

// ── Page ───────────────────────────────────────────────────────────────────

export default async function PlaneraIdPage({ params }: Props) {
 const { id } = await params
 const supabase = await createClient()

 const { data: route } = await supabase
 .from('planned_routes')
 .select('id, start_name, end_name, start_lat, start_lng, end_lat, end_lng, interests, suggested_stops, status, created_at, user_id, trip_id')
 .eq('id', id)
 .single()

 if (!route || route.status === 'draft') notFound()

 const { data: { session } } = await supabase.auth.getSession()
 const isLoggedIn = !!session
 const hasOwner = !!route.user_id
 const ownsRoute = !!session && route.user_id === session.user.id

 const stops: ScoredStop[] = Array.isArray(route.suggested_stops) ? route.suggested_stops : []
 const interests: string[] = Array.isArray(route.interests) ? route.interests : []

 // Haversine-distans (rät linje) — visas direkt i headern.
 // Faktisk sjöledsdistans beräknas async av PlaneraRouteSection.
 const haversineDistKm = Math.round(haversineKm(route.start_lat, route.start_lng, route.end_lat, route.end_lng))

 // Hämta stops + väderprognos parallellt för kortast möjlig väntetid
 const fetchStops = stops.length === 0
   ? fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svalla.se'}/api/planera`, {
       method: 'POST',
       headers: { 'content-type': 'application/json' },
       body: JSON.stringify({ routeId: id }),
       cache: 'no-store',
     })
       .then(r => r.ok ? r.json() as Promise<{ stops?: ScoredStop[] }> : Promise.resolve({ stops: [] }))
       .then(j => j.stops ?? [])
       .catch((): ScoredStop[] => [])
   : Promise.resolve(stops)

 const fetchForecast = buildRouteForecast(
   route.start_name, route.start_lat, route.start_lng,
   route.end_name,   route.end_lat,   route.end_lng,
 ).catch(() => null)

 const [resolvedStops, forecast] = await Promise.all([fetchStops, fetchForecast])

 // Sort stops geographically along the route (start → end)
 const sortedStops = [...resolvedStops].sort((a, b) => {
 const { t: ta } = crossTrack(a.lat, a.lng, route.start_lat, route.start_lng, route.end_lat, route.end_lng)
 const { t: tb } = crossTrack(b.lat, b.lng, route.start_lat, route.start_lng, route.end_lat, route.end_lng)
 return ta - tb
 })

 // Map stop data (only what PlaneraMap needs)
 const mapStops = sortedStops.map(s => ({
 lat: s.lat,
 lng: s.lng,
 name: s.name,
 reason: s.reason,
 color: REASON_COLOR[s.reason] ?? '#1e5c82',
 emoji: (MARKER_SVG[REASON_ICON[s.reason] ?? 'pin'] ?? MARKER_SVG.pin ?? '') as string,
 }))

 return (
 <div style={{
 minHeight: '100dvh', background: 'var(--bg)',
 paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
 }}>
 {/* Header */}
 <header style={{
 background: 'var(--grad-sea)',
 padding: '14px 16px 20px',
 paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))',
 }}>
 <div style={{ maxWidth: 560, margin: '0 auto' }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
 <Link href="/planera" style={{
 width: 34, height: 34, borderRadius: '50%',
 background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 </Link>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
 Planerad rutt
 </div>
 <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
 {route.start_name} → {route.end_name}
 </h1>
 </div>
 {/* Total distance badge */}
 <div style={{
 flexShrink: 0, background: 'rgba(255,255,255,0.15)',
 borderRadius: 20, padding: '4px 12px',
 fontSize: 13, fontWeight: 800, color: '#fff',
 }}>
 ~{haversineDistKm} km
 </div>
 </div>

 {/* Intresse-chips */}
 <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
 {interests.map(i => (
 <span key={i} style={{
 fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
 background: 'rgba(255,255,255,0.15)', color: '#fff',
 }}>
 <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, verticalAlign: 'middle' }}>
 <Icon name={INTEREST_ICON[i] ?? 'pin'} size={11} stroke={2.2} />
 {i}
 </span>
 </span>
 ))}
 </div>
 </div>
 </header>

 <div style={{ padding: '20px 16px', maxWidth: 560, margin: '0 auto' }}>

 {/* Karta + tidsestimat — klientkomponent som fetchar rutten async */}
 <PlaneraRouteSection
 startLat={route.start_lat}
 startLng={route.start_lng}
 startName={route.start_name}
 endLat={route.end_lat}
 endLng={route.end_lng}
 endName={route.end_name}
 stops={mapStops}
 haversineDistKm={haversineDistKm}
 routeId={route.id}
 />

 {/* Vindprognos längs rutten */}
 {forecast && <RouteWeatherStrip forecast={forecast} />}

 {/* Spara/claim CTA — främst för utloggade */}
 <Suspense fallback={null}>
 <SaveRouteCTA
 routeId={route.id}
 hasOwner={hasOwner}
 isLoggedIn={isLoggedIn}
 ownsRoute={ownsRoute}
 />
 </Suspense>

 {/* Säkerhets-disclaimer + datakälla */}
 <RouteDisclaimer />

 {/* Stop list */}
 {sortedStops.length > 0 ? (
 <>
 <div style={{
 fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
 color: 'var(--sea)', marginBottom: 14,
 }}>
 {sortedStops.length} stopp längs rutten
 </div>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {sortedStops.map((stop, idx) => {
 const iconName = REASON_ICON[stop.reason] ?? 'pin'
 const short = REASON_SHORT[stop.reason] ?? stop.reason
 const color = REASON_COLOR[stop.reason] ?? '#1e5c82'
 const bg = REASON_BG[stop.reason] ?? 'rgba(10,123,140,0.08)'
 const isFar = stop.distance_from_line_km > 5
 const distLabel = stop.distance_from_line_km < 1
 ? '<1 km'
 : `${stop.distance_from_line_km} km`
 return (
 <Link key={stop.id} href={`/platser/${stop.id}`} style={{ textDecoration: 'none' }}>
 <div style={{
 background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
 border: `1px solid ${isFar ? 'rgba(232,146,74,0.2)' : 'rgba(10,123,140,0.08)'}`,
 boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
 display: 'flex', alignItems: 'center', gap: 14,
 }}>
 {/* Step number + icon */}
 <div style={{
 width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
 background: bg, color: color,
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 position: 'relative',
 }}>
 <Icon name={iconName} size={18} stroke={2} />
 <span style={{
 position: 'absolute', top: -4, right: -4,
 width: 16, height: 16, borderRadius: '50%',
 background: color, color: '#fff',
 fontSize: 9, fontWeight: 800,
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 border: '1.5px solid var(--white)',
 }}>
 {idx + 1}
 </span>
 </div>

 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
 {stop.name}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', display: 'flex', gap: 6, alignItems: 'center' }}>
 {stop.island && <span>{stop.island}</span>}
 {stop.island && <span>·</span>}
 <span style={{ color, fontWeight: 600 }}>{short}</span>
 </div>
 </div>

 <div style={{ flexShrink: 0, textAlign: 'right' }}>
 <div style={{ fontSize: 11, color: isFar ? '#e8924a' : 'var(--txt3)', fontWeight: isFar ? 700 : 400, whiteSpace: 'nowrap' }}>
 {distLabel}
 </div>
 <div style={{ fontSize: 10, color: isFar ? '#e8924a' : 'var(--txt3)', opacity: 0.7 }}>
 {isFar ? 'omväg' : 'från rutten'}
 </div>
 </div>

 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
 </svg>
 </div>
 </Link>
 )
 })}
 </div>
 </>
 ) : (
 <div style={{
 background: 'var(--white)', borderRadius: 16, padding: '24px 20px', textAlign: 'center',
 border: '1px solid rgba(10,123,140,0.08)',
 }}>
 <div style={{ fontSize: 36, marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="map" size={36} /></div>
 <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Inga stopp hittades</p>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
 Inga platser i vår databas matchar dina intressen längs den här rutten ännu.
 </p>
 </div>
 )}

 {/* CTA */}
 <PlaneraCTA routeId={route.id} hasDoneIt={!!route.trip_id} />

 {/* Share */}
 <PlaneraShare routeId={route.id} startName={route.start_name} endName={route.end_name} />

 {/* Plan new route */}
 <Link href="/planera/ny" style={{
 display: 'block', marginTop: 16, textAlign: 'center',
 fontSize: 13, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none',
 }}>
 + Planera en ny rutt
 </Link>

 {/* Felrapport-knapp — crowdsourcad förbättring av farledsdata */}
 <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
 <RouteFeedbackButton
 routeId={route.id}
 startName={route.start_name}
 endName={route.end_name}
 />
 </div>
 </div>
 </div>
 )
}
