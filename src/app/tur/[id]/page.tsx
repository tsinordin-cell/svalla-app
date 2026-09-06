import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getCachedPublicTripBundle, loadTripBundle, type TripBundle } from '@/lib/trip-cache'
import Icon from '@/components/Icon'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import TripDetailMap from '@/components/TripDetailMapClient'
import TripHeroCarousel from '@/components/TripHeroCarousel'
import LikeButton from '@/components/LikeButton'
import Comments from '@/components/Comments'
import { renderMentions } from '@/lib/mentions'
import TripShareModal from '@/components/TripShareModal'
import TripActions from '@/components/TripActions'
import TripTagger from '@/components/TripTagger'
import TripHighlightPrompt from '@/components/TripHighlightPrompt'
import RepostButton from '@/components/RepostButton'
import BackButton from '@/components/BackButton'
import TripGearAffiliate from '@/components/TripGearAffiliate'
import { restaurantsAlongRoute, formatDuration, distanceNM } from '@/lib/gps'
import { getTripWeather, windDirectionLabel, buildWindArrowSamples } from '@/lib/weather'
import type { Metadata } from 'next'
import ViewerGate from '@/components/ViewerGate'
import TripSignupCta from '@/components/TripSignupCta'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
 const { id } = await params
 // Viewer-medveten läsning (se trip-cache.ts): publik tur ur cachen,
 // annars ägarens egen privata tur via cookies, annars 404.
 const bundle = await resolveTripBundle(id)
 const trip = bundle?.trip ?? null

 // 404-STATUS: uppmätt 2026-09-05 — med loading.tsx på routen gav en
 // okänd tur STATUS 200 med 404-innehåll (soft 404) trots notFound() här,
 // eftersom skalet streamas innan metadata är klar (Next 15 streamar
 // metadata på dynamiska routes). Därför finns ingen loading.tsx för
 // /tur/[id] längre: sidan svarar först när turen är löst. Den publika
 // datan kommer ur Data Cache, så väntetiden är försumbar.
 if (!trip || trip.deleted_at) notFound()

 const metaUser = bundle!.userRow

 const distStr = trip.distance != null && trip.distance >= 0.1 ? `${trip.distance.toFixed(1)} NM` : null
 const title = trip.location_name
 ? `${trip.location_name}${distStr ? ` – ${distStr}` : ''}`
 : distStr ? `Tur – ${distStr}` : 'Tur – Svalla'
 const desc = `${metaUser?.username ?? 'En seglare'} loggade en ${trip.boat_type?.toLowerCase() ?? 'tur'}${distStr ? ` på ${distStr}` : ''}${trip.location_name ? ` till ${trip.location_name}` : ''}.`

 // Dynamisk OG-bild — alltid genererad, oavsett om turen har foto eller inte
 const ogImageUrl = `https://svalla.se/api/og/tur/${id}`

 return {
 title,
 description: desc,
 // Tredje gången auto-verktyget stryker denna (07-24, 07-29). Se
 // CLAUDE.md punkt 1 innan den tas bort igen.
 alternates: { canonical: `https://svalla.se/tur/${id}` },
 openGraph: {
 title: `${title} – Svalla`,
 description: desc,
 images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
 url: `https://svalla.se/tur/${id}`,
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: `${title} – Svalla`,
 description: desc,
 images: [ogImageUrl],
 },
 }
}

/**
 * DYNAMISK, viewer-medveten (beslut 2026-09-04, se src/lib/trip-cache.ts).
 * Tidigare: statisk med ISR (60 s) och anon-klient. Det gav 404 för ägaren
 * på privata turer, eftersom sidan aldrig skickade med besökarens session.
 *
 * Nu: sidan renderas per request, men den PUBLIKA datan hämtas ur Next
 * Data Cache (tagg trip:<id>, töms vid varje skrivning). Publika turer
 * kostar alltså inga databasläsningar per visning. Privata turer läses
 * med besökarens cookies; RLS avgör om hen får se dem.
 */
export const dynamic = 'force-dynamic'

/** Publik (cachad) först, sedan ägarens egen privata tur, annars null. */
async function resolveTripBundle(id: string): Promise<TripBundle | null> {
  const pub = await getCachedPublicTripBundle(id)
  if (pub) return pub
  const supabase = await createServerSupabaseClient()
  return loadTripBundle(id, supabase)
}

export default async function TurPage({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params
 const bundle = await resolveTripBundle(id)
 if (!bundle) notFound()
 const { trip, userRow, taggedUsers, rawPoints, rawStops, toursData, allRestaurants, existingHighlight } = bundle

 const points = (rawPoints ?? []).map(p => ({
 lat: p?.latitude ?? 0,
 lng: p?.longitude ?? 0,
 speedKnots: (p?.speed_knots ?? 0) as number,
 heading: p?.heading ?? null,
 accuracy: 0,
 recordedAt: p?.recorded_at ?? new Date().toISOString(),
 }))

 const routePoints = Array.isArray(trip.route_points) && trip.route_points.length >= 2
 ? (trip.route_points as { lat: number; lng: number }[])
 : null

 // Efter RLS-lasningen (beslut A, 2026-08-16, BESLUT-gps-integritet-och-
 // stromning-20260816.md) far anonyma lasare inga rader ur gps_points -
 // kartan byggs da ur trips.route_points (forenklad rutt, bara lat/lng).
 // speedKnots 0 ar avsiktligt: fartlager utan fartdata vore pahittat.
 const displayPoints = points.length >= 2 ? points : (routePoints ?? []).map(rp => ({
   lat: rp.lat, lng: rp.lng, speedKnots: 0, heading: null, accuracy: 0,
   recordedAt: trip.started_at ?? new Date().toISOString(),
 }))

 // Historiska väderförhållanden vid turens start — berikar sidan med
 // kontext (vind, gust, våg). Degraderar tyst om API:t inte svarar.
 // Cache 24h via Next fetch-cache (väder för en historisk timestamp är immutabelt).
 const weather = displayPoints.length > 0 && trip.started_at
 ? await getTripWeather(
 displayPoints[0]!.lat,
 displayPoints[0]!.lng,
 trip.started_at,
 trip.ended_at,
 )
 : null

 // Sampla vind längs rutten för kartpilar (~10 jämnt fördelade punkter).
 // Matchar varje GPS-positions timestamp mot närmaste tim-data.
 const windSamples = weather?.hourly.length
 ? buildWindArrowSamples(points, weather.hourly, 10)
 : []

 const stops = (rawStops ?? []).map(s => ({
 lat: s?.latitude ?? 0,
 lng: s?.longitude ?? 0,
 type: s?.stop_type ?? 'stop',
 startedAt: s?.started_at ?? new Date().toISOString(),
 endedAt: s?.ended_at ?? null,
 durationSeconds: s?.duration_seconds ?? 0,
 placeName: s?.place_name ?? undefined, // från reverse geocoding
 }))

 // restaurants near the route
 const nearbyRestaurants = displayPoints.length > 0 && allRestaurants
 ? restaurantsAlongRoute(displayPoints, allRestaurants.map(r => ({
 id: r.id,
 name: r.name,
 latitude: r.latitude,
 longitude: r.longitude,
 })), 0.5)
 : []

 // Name stops: 1) reverse-geocoded name from DB, 2) nearby restaurant, 3) "Stopp N"
 const namedStops = stops.map(stop => {
 if (stop?.type !== 'stop') return { ...stop, placeName: undefined }
 // Prioritera Nominatim-reverse-geocodat namn (lagrat vid save)
 if (stop?.placeName) return stop
 // Fallback: kolla mot känd plats i databasen (inom ~220m = 0.12 NM)
 let nearest: string | undefined
 let nearestDist = Infinity
 for (const r of (allRestaurants ?? [])) {
 if (!r?.latitude || !r?.longitude) continue
 const d = distanceNM(stop.lat, stop.lng, r.latitude, r.longitude)
 if (d < 0.12 && d < nearestDist) { nearestDist = d; nearest = r.name }
 }
 return { ...stop, placeName: nearest }
 })

 // ── Rutigenkänning ────────────────────────────────────────────────────────
 type TourRow = { id: string; title: string; start_location: string; destination: string; waypoints: { lat: number; lng: number }[] }
 let matchedRoute: (TourRow & { score: number }) | null = null

 if (displayPoints.length >= 10 && toursData && toursData.length > 0) {
 const tripStart = displayPoints[0]!
 const tripEnd = displayPoints[displayPoints.length - 1]!
 let bestScore = Infinity

 for (const tour of (toursData as TourRow[])) {
 if (!tour?.waypoints || !Array.isArray(tour.waypoints) || tour.waypoints.length < 2) continue
 const tw = tour.waypoints
 const tS = tw[0]
 const tE = tw[tw.length - 1]
 if (!tS || !tE) continue
 const fwd = distanceNM(tripStart.lat, tripStart.lng, tS.lat, tS.lng) + distanceNM(tripEnd.lat, tripEnd.lng, tE.lat, tE.lng)
 const rev = distanceNM(tripStart.lat, tripStart.lng, tE.lat, tE.lng) + distanceNM(tripEnd.lat, tripEnd.lng, tS.lat, tS.lng)
 const score = Math.min(fwd, rev)
 if (score < bestScore && score < 5) { bestScore = score; matchedRoute = { ...tour, score } }
 }
 }

 const hasMap = displayPoints.length >= 2

 // All photos for carousel (primary + extras)
 const allPhotos = Array.from(new Set(
 [trip.image, ...(Array.isArray(trip.images) ? trip.images : [])].filter(Boolean) as string[]
 ))
 const username = userRow?.username ?? 'Seglare'
 const routeName = (trip.routes as { name: string } | null)?.name

 const durationSecs = (trip.duration ?? 0) * 60

 // Fusionerad tidslinje: start + alla pauses/stopp (med plats + varaktighet) + end
 type TimelineEvent = {
 type: 'start' | 'pause' | 'stop' | 'end'
 label: string
 time: string | null
 durationSeconds?: number
 placeName?: string
 }
 const timeline: TimelineEvent[] = ([
 { type: 'start' as const, label: 'Kasta loss', time: trip.started_at, placeName: trip.start_location ?? undefined },
 ...namedStops
 .filter(s => s.type === 'pause')
 .map<TimelineEvent>(s => ({ type: 'pause', label: 'Paus', time: s.startedAt, durationSeconds: s.durationSeconds, placeName: s.placeName })),
 ...namedStops
 .filter(s => s.type === 'stop')
 .map<TimelineEvent>(s => ({ type: 'stop', label: 'Stopp', time: s.startedAt, durationSeconds: s.durationSeconds, placeName: s.placeName })),
 { type: 'end' as const, label: 'Ankrar', time: trip.ended_at, placeName: trip.location_name ?? undefined },
 ] satisfies TimelineEvent[])
 .filter(e => e.time)
 .sort((a, b) => new Date(a.time!).getTime() - new Date(b.time!).getTime())

 const timelineColors: Record<string, string> = {
 start: 'var(--green)',
 pause: 'var(--acc)',
 stop: 'var(--txt3)',
 end: 'var(--red)',
 }

 function fmtDuration(sec: number): string {
 if (sec < 60) return `${sec}s`
 const min = Math.round(sec / 60)
 if (min < 60) return `${min} min`
 const h = Math.floor(min / 60)
 const m = min % 60
 return m > 0 ? `${h} h ${m} min` : `${h} h`
 }

 const pinnarEmoji = trip.pinnar_rating === 3 ? ' ' : trip.pinnar_rating === 2 ? ' ' : trip.pinnar_rating === 1 ? '' : null
 const pinnarLabel = trip.pinnar_rating === 3 ? 'Magisk tur ' : trip.pinnar_rating === 2 ? 'Bra tur!' : trip.pinnar_rating === 1 ? 'Okej' : null
 const dateStr = trip.started_at
 ? new Date(trip.started_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Stockholm' })
 : new Date(trip.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Stockholm' })

 // Samma padding för alla — utloggades extra utrymme för signup-bannern
 // bärs av spacern inuti TripSignupCta, så den cachade HTML:en kan vara
 // identisk oavsett vem som tittar.
 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 16px)' }}>

 {/* ── Hero (photo carousel + minimap fallback) ── */}
 <div style={{ position: 'relative' }}>
 <TripHeroCarousel
 photos={allPhotos}
 routePoints={routePoints}
 locationName={trip.location_name}
 />

 {/* Back button — absolute overlay */}
 <div style={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' }}>
 <div style={{ pointerEvents: 'all' }}>
 <BackButton fallback="/feed" />
 </div>
 </div>

 {/* Share + actions */}
 <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 10 }}>
 <TripShareModal
 tripId={id}
 title={trip.location_name ?? 'Min tur'}
 url={`https://svalla.se/tur/${id}`}
 hasPhoto={allPhotos.length > 0}
 hasRoute={!!routePoints}
 />
 <TripActions tripId={trip.id} ownerId={trip.user_id} />
 </div>

 {/* Location + pinnar + matched-route overlay at bottom */}
 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 14px', zIndex: 5, pointerEvents: 'none' }}>
 {matchedRoute && (
 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 6,
 fontSize: 10, fontWeight: 700, letterSpacing: '0.6px', textTransform: 'uppercase',
 background: 'rgba(15,158,100,0.92)',
 backdropFilter: 'blur(6px)',
 color: '#fff', padding: '4px 10px', borderRadius: 20,
 marginBottom: 8,
 boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
 }}>
 <span aria-hidden> </span>
 <span>Matchar rutt · {matchedRoute.title}</span>
 </div>
 )}
 {(trip.start_location || trip.location_name) && (
 <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: 4, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
 {trip.start_location
 ? <>{trip.start_location} <span style={{ fontWeight: 400, opacity: 0.7 }}>→</span> {trip.location_name}</>
 : trip.location_name
 }
 </div>
 )}
 <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
 <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{dateStr}</span>
 {pinnarEmoji && (
 <span style={{
 fontSize: 11, fontWeight: 600,
 background: trip.pinnar_rating === 3 ? 'rgba(201,110,42,0.85)' : 'rgba(30,92,130,0.75)',
 backdropFilter: 'blur(4px)',
 color: '#fff', padding: '3px 9px', borderRadius: 20,
 }}>
 {pinnarEmoji} {pinnarLabel}
 </span>
 )}
 </div>
 </div>
 </div>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '14px 14px' }}>

 {/* ── User row ── */}
 <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
 <Link href={`/u/${encodeURIComponent(username)}`} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flex: 1 }}>
 <div style={{
 width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
 background: 'var(--grad-sea)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 fontSize: 16, fontWeight: 700, color: '#fff', overflow: 'hidden',
 border: '2px solid rgba(10,123,140,0.12)',
 }}>
 {userRow?.avatar
 ? <Image src={userRow.avatar} alt={username} width={44} height={44} style={{ objectFit: 'cover' }} />
 : username[0]?.toUpperCase()
 }
 </div>
 <div>
 <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>{username}</div>
 <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
 {trip.boat_type}{routeName ? ` · ${routeName}` : ''}
 </div>
 </div>
 </Link>
 </div>

 {/* Caption */}
 {trip.caption && (
 <p style={{
 fontSize: 15, color: 'var(--txt2)', lineHeight: 1.65,
 margin: '0 0 16px', fontWeight: 400,
 }}>
 {renderMentions(trip.caption)}
 </p>
 )}

 {/* AI Summary */}
 {trip.ai_summary && trip.ai_summary !== trip.caption && (
 <div style={{
 margin: '0 0 18px',
 padding: '16px 18px',
 background: 'linear-gradient(135deg, rgba(30,92,130,0.07), rgba(45,125,138,0.05))',
 borderRadius: 20,
 borderLeft: '3px solid #1e5c82',
 position: 'relative',
 overflow: 'hidden',
 }}>
 {/* AI badge */}
 <div style={{
 display: 'inline-flex',
 alignItems: 'center',
 gap: 5,
 background: 'rgba(30,92,130,0.1)',
 borderRadius: 20,
 padding: '3px 10px',
 marginBottom: 10,
 }}>
 <span aria-hidden><Icon name="star" size={10} /></span>
 <span style={{
 fontSize: 10,
 fontWeight: 600,
 color: 'var(--sea)',
 textTransform: 'uppercase',
 letterSpacing: '0.5px',
 }}>
 Thorkels analys
 </span>
 </div>
 <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
 {trip.ai_summary}
 </p>
 </div>
 )}

 {/* Taggade användare */}
 {taggedUsers.length > 0 && (
 <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
 <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600 }}>Med:</span>
 {taggedUsers.map((u: { id: string; username: string }) => (
 <Link key={u.id} href={`/u/${encodeURIComponent(u.username)}`} style={{ textDecoration: 'none' }}>
 <span style={{
 fontSize: 12, fontWeight: 700, color: 'var(--sea)',
 background: 'rgba(30,92,130,0.08)', borderRadius: 20,
 padding: '4px 10px',
 }}>
 @{u.username}
 </span>
 </Link>
 ))}
 </div>
 )}

 {/* Stats */}
 {(() => {
 const stats = [
 { val: trip.distance >= 0.1 ? trip.distance.toFixed(1) : null, unit: 'NM', label: 'Distans' },
 { val: durationSecs > 60 ? formatDuration(durationSecs) : null, unit: '', label: 'Tid' },
 { val: trip.average_speed_knots >= 0.1 ? trip.average_speed_knots.toFixed(1) : null, unit: 'kn', label: 'Snittfart' },
 { val: trip.max_speed_knots >= 0.1 ? trip.max_speed_knots.toFixed(1) : null, unit: 'kn', label: 'Toppfart' },
 ].filter(s => s.val !== null)
 if (stats.length === 0) return null
 return (
 <div style={{
 background: 'linear-gradient(135deg, #091522 0%, #0d2038 100%)',
 borderRadius: 20,
 boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
 display: 'flex',
 marginBottom: 16,
 marginTop: -20,
 overflow: 'hidden',
 }}>
 {stats.map(({ val, unit, label }, i) => (
 <div key={label} style={{
 flex: 1, padding: '16px 0', textAlign: 'center',
 borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
 }}>
 <div style={{
 fontSize: 22, fontWeight: 750, color: '#fff',
 lineHeight: 1, letterSpacing: '-0.02em',
 fontVariantNumeric: 'tabular-nums',
 display: 'inline-flex', alignItems: 'baseline', gap: 2,
 }}>
 {val}
 {unit && <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.5)', marginLeft: 2 }}>{unit}</span>}
 {label === 'Toppfart' && val && <span style={{ fontSize: 10, color: 'var(--amber, #c96e2a)', marginLeft: 2 }}>↗</span>}
 </div>
 <div style={{
 fontSize: 10.5, fontWeight: 500, color: 'rgba(255,255,255,0.4)',
 marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.09em',
 }}>
 {label}
 </div>
 </div>
 ))}
 </div>
 )
 })()}

 {/* Väder — historiska förhållanden vid turens tidpunkt (ERA5 archive + Marine).
 Visas bara om vi fick minst vind-data, annars hoppas sektionen över. */}
 {weather && weather.wind && (
 <div style={{ marginBottom: 16 }}>
 <SectionTitle>Förhållanden</SectionTitle>
 <div style={{
 background: 'linear-gradient(135deg, rgba(30,92,130,0.06), rgba(74,184,212,0.04))',
 border: '1px solid rgba(30,92,130,0.10)',
 borderRadius: 20,
 padding: '14px 16px',
 display: 'flex', alignItems: 'center', gap: 16,
 }}>
 {/* Vind-kompass — pil pekar åt varifrån vinden blåser */}
 <div style={{
 width: 48, height: 48, borderRadius: '50%',
 background: 'var(--white)',
 border: '1.5px solid rgba(30,92,130,0.15)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 flexShrink: 0, position: 'relative',
 boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
 }} title={`Vind från ${windDirectionLabel(weather.wind.directionDeg)} (${Math.round(weather.wind.directionDeg)}°)`}>
 <svg viewBox="0 0 24 24" fill="none"
 style={{
 width: 22, height: 22,
 transform: `rotate(${weather.wind.directionDeg}deg)`,
 }}>
 <path d="M12 3 L12 21 M12 3 L7 9 M12 3 L17 9"
 stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
 </svg>
 <span style={{
 position: 'absolute', top: -4, right: -4,
 fontSize: 9, fontWeight: 700,
 background: 'var(--sea)', color: '#fff',
 padding: '2px 5px', borderRadius: 8,
 letterSpacing: '0.2px',
 }}>
 {windDirectionLabel(weather.wind.directionDeg)}
 </span>
 </div>

 {/* Huvudvärden */}
 <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 18, flexWrap: 'wrap' }}>
 <div>
 <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.3px' }}>
 {weather.wind.speedMs.toFixed(1)}
 <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', marginLeft: 2 }}>m/s</span>
 </div>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3, fontWeight: 500 }}>
 Vind
 </div>
 </div>

 {weather.wind.gustMaxMs != null && weather.wind.gustMaxMs > weather.wind.speedMs + 0.5 && (
 <div>
 <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.3px' }}>
 {weather.wind.gustMaxMs.toFixed(1)}
 <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', marginLeft: 2 }}>m/s</span>
 </div>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3, fontWeight: 500 }}>
 Byvind
 </div>
 </div>
 )}

 {weather.wave && weather.wave.heightM > 0.05 && (
 <div>
 <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.3px' }}>
 {weather.wave.heightM.toFixed(1)}
 <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', marginLeft: 2 }}>m</span>
 </div>
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3, fontWeight: 500 }}>
 Våghöjd
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 )}

 {/* Social + dela */}
 <div id="kommentarer" style={{ marginBottom: 18 }}>
 <div style={{ display: 'flex', gap: 8, paddingBottom: 14, borderBottom: '1px solid rgba(10,123,140,0.08)', alignItems: 'center' }}>
 <LikeButton tripId={trip.id} />
 <Comments tripId={trip.id} />
 {/* Spacer */}
 <div style={{ flex: 1 }} />
 <RepostButton tripId={trip.id} tripOwnerId={trip.user_id} compact />
 {/* Dela-knapp med text — mer synlig */}
 <TripShareModal
 tripId={id}
 title={trip.location_name ?? 'Min tur'}
 url={`https://svalla.se/tur/${id}`}
 variant="pill"
 hasPhoto={allPhotos.length > 0}
 hasRoute={!!routePoints}
 />
 </div>

 <TripTagger
 tripId={trip.id}
 tripOwnerId={trip.user_id}
 />
 </div>

 {/* Trip highlight — flywheel-koppling ö → plats → andras feed */}
 {existingHighlight ? (
   <div style={{
     margin: '0 0 18px',
     padding: '14px 16px',
     borderRadius: 12,
     background: 'rgba(201,110,42,0.08)',
     border: '1px solid rgba(201,110,42,0.20)',
     fontSize: 14,
   }}>
     <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--acc, #c96e2a)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
       Höjdpunkt
     </div>
     <Link href={`/plats/${existingHighlight.place_slug}`} style={{ fontWeight: 700, color: 'var(--txt)', textDecoration: 'none' }}>
       {existingHighlight.place_name}
     </Link>
   </div>
 ) : displayPoints.length > 0 ? (
   <ViewerGate
     ownerId={trip.user_id}
     agare={
       <div style={{ marginBottom: 18 }}>
         <TripHighlightPrompt
           tripId={trip.id}
           routePoints={displayPoints.map(p => ({ lat: p.lat, lng: p.lng }))}
         />
       </div>
     }
   />
 ) : null}

 {/* Map */}
 {hasMap ? (
 <div style={{ marginBottom: 18 }}>
 <SectionTitle>Rutt</SectionTitle>
 <TripDetailMap
 points={displayPoints}
 stops={stops}
 restaurants={nearbyRestaurants}
 windSamples={windSamples}
 />
 </div>
 ) : (
 <div style={{ marginBottom: 18, background: 'rgba(10,123,140,0.05)', borderRadius: 20, padding: '32px 16px', textAlign: 'center', fontSize: 13, color: 'var(--txt3)' }}>
 Inga GPS-punkter för denna tur
 </div>
 )}

 {/* Tidslinje — samlar start, pauses, stopp och ankomst med plats + varaktighet */}
 {timeline.length > 1 && (
 <div style={{ marginBottom: 18 }}>
 <SectionTitle>Tidslinje</SectionTitle>
 <div style={{ background: 'var(--white)', borderRadius: 20, padding: '16px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)' }}>
 {timeline.map((ev, i) => (
 <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 2 }}>
 <div style={{ width: 12, height: 12, borderRadius: '50%', flexShrink: 0, background: timelineColors[ev.type] ?? 'var(--txt3)' }} />
 {i < timeline.length - 1 && (
 <div style={{ width: 2, flex: 1, margin: '3px 0', background: 'rgba(10,123,140,0.1)', minHeight: 20 }} />
 )}
 </div>
 <div style={{ paddingBottom: 16, flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.25 }}>
 {ev.label}
 {ev.placeName && (
 <span style={{ fontWeight: 400, color: 'var(--txt2)' }}>{` · ${ev.placeName}`}</span>
 )}
 </div>
 {(ev.type === 'pause' || ev.type === 'stop') && ev.durationSeconds != null && ev.durationSeconds >= 30 && (
 <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
 {fmtDuration(ev.durationSeconds)}
 </div>
 )}
 </div>
 <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
 {ev.time ? new Date(ev.time).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Stockholm' }) : ''}
 </span>
 </div>
 </div>
 ))}
 </div>
 </div>
 )}

 {/* Nearby restaurants */}
 {nearbyRestaurants.length > 0 && (
 <div>
 <SectionTitle>Restauranger längs rutten</SectionTitle>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
 {nearbyRestaurants.map(r => (
 <Link key={r.id} href={`/upptack/${r.id}`} style={{ textDecoration: 'none' }}>
 <div style={{ background: 'var(--white)', borderRadius: 14, padding: '12px 16px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
 <span style={{ fontSize: 20 }}> </span>
 <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', flex: 1 }}>{r.name}</span>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* ── Affiliate: utrustning för turen — visas ej till ägaren, bara på turer med distans ── */}
 <ViewerGate
   ownerId={trip.user_id}
   ejAgare={
     <TripGearAffiliate
       boatType={trip.boat_type ?? null}
       distanceNm={typeof trip.distance === 'number' ? trip.distance : null}
       tripId={trip.id}
     />
   }
 />

 {/* ── Signup CTA — personifierad för ej inloggade ── */}
 {/* Signup-CTA för utloggade — TripSignupCta avgör själv om den ska synas,
    så den cachade HTML:en är densamma för alla. Hooken personifieras av
    det turen berättar: magisk tur > plats > seglaren. */}
 <TripSignupCta
   headline={trip.pinnar_rating === 3
     ? `Inspirerad av ${username}s magiska tur?`
     : trip.location_name
     ? `Upptäck ${trip.location_name} i Svalla`
     : `Följ ${username}s turer`}
   sub={trip.location_name
     ? `Sjökort, GPS-spårning och seglare som ${username} i hela skärgården.`
     : `GPS-spårning, sjökort och skärgårdsgemenskap på ett ställe.`}
   username={username}
 />
 </div>
 )
}

function SectionTitle({ children }: { children: ReactNode }) {
 return (
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
 {children}
 </h2>
 )
}
