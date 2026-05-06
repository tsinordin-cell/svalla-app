import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { Restaurant } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReviewSection from '@/components/ReviewForm'
import BookmarkButton from '@/components/BookmarkButton'
import PlaceSocialSection from '@/components/PlaceSocialSection'
import PlaceContactSection from '@/components/PlaceContactSection'
import PlacePremiumHeader from '@/components/PlacePremiumHeader'
import PlaceFactsSection from '@/components/PlaceFactsSection'
import PlaceFAQSection from '@/components/PlaceFAQSection'
import PlaceHeroGallery from '@/components/PlaceHeroGallery'
import ThorkelAvatar from '@/components/thorkel/ThorkelAvatar'
import type { Metadata } from 'next'

export const revalidate = 60 // refresh reviews regularly

/**
 * Hämta restaurang via slug ELLER UUID. UUIDv4 har 36 tecken med bindestreck.
 * Slugs är kortare och innehåller bara a-z/0-9/-. Vi försöker slug först
 * (snyggare URL), fallback till UUID för bakåtkompatibilitet.
 */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
async function fetchRestaurant(idOrSlug: string, columns: string) {
  const supabase = await createServerSupabaseClient()
  const isUuid = UUID_RE.test(idOrSlug)
  const col = isUuid ? 'id' : 'slug'
  const { data } = await supabase.from('restaurants').select(columns).eq(col, idOrSlug).maybeSingle()
  return data
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
 const { id } = await params
 const data = await fetchRestaurant(id, 'id, name, description, island, image_url, tags, slug') as { id: string; name: string; description?: string; island?: string; image_url?: string; tags?: string[]; slug?: string } | null
 if (!data) return { title: 'Restaurang – Svalla' }
 // Canonical pekar alltid på slug-URL om sluggen finns, annars UUID
 const canonicalPath = data.slug ?? data.id
 const desc = data.description ?? `${data.name} på ${data.island ?? 'skärgårdsön'} – mat och dryck längs kusten.`
 const keywords = [
 data.name?.toLowerCase(),
 data.island ? `${data.island.toLowerCase()} restaurang` : null,
 'skärgårdsrestaurang',
 'Stockholms skärgård',
 ...(Array.isArray(data.tags) ? data.tags : []),
 ].filter(Boolean) as string[]
 return {
 title: data.name,
 description: desc,
 keywords,
 alternates: { canonical: `https://svalla.se/upptack/${canonicalPath}` },
 openGraph: {
 title: `${data.name} – Svalla`,
 description: desc,
 images: data.image_url ? [{ url: data.image_url, width: 1200, height: 630, alt: data.name }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
 url: `https://svalla.se/upptack/${canonicalPath}`,
 type: 'website',
 locale: 'sv_SE',
 },
 twitter: {
 card: 'summary_large_image',
 title: `${data.name} – Svalla`,
 description: desc,
 images: data.image_url ? [data.image_url] : ['/og-image.jpg'],
 },
 }
}

export default async function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
 const { id: idOrSlug } = await params
 const supabase = await createServerSupabaseClient()

 const data = await fetchRestaurant(
   idOrSlug,
   'id, slug, name, latitude, longitude, images, menu, menu_url, opening_hours, opening_hours_json, description, tags, core_experience, type, categories, best_for, facilities, seasonality, archipelago_region, island, contact_phone, phone, email, website, booking_url, instagram, facebook, formatted_address, google_rating, google_ratings_total, google_place_id, google_photo_refs, google_rating_updated'
 )
 if (!data) notFound()
 const r = data as unknown as Restaurant & { slug?: string }
 // Verklig UUID — används för reviews/place-relations som har FK till restaurants.id
 const id = r.id
 // Canonical slug-URL för länkar och delningar
 const canonicalPath = r.slug ?? r.id

 // Fetch recent trips nearby this restaurant (trips linking to this place)
 // Visa senaste turer med bild — matchas mot restaurangens namn om möjligt, annars senaste globalt
 const { data: recentTripsRaw } = await supabase
 .from('trips')
 .select('id, image, location_name, created_at, user_id')
 .not('image', 'is', null)
 .order('created_at', { ascending: false })
 .limit(6)
 const tripUids = [...new Set((recentTripsRaw ?? []).map((t: { user_id: string }) => t.user_id).filter(Boolean))]
 const { data: tripUserRows } = tripUids.length
 ? await supabase.from('users').select('id, username').in('id', tripUids)
 : { data: [] }
 const tripUmap: Record<string, string> = {}
 for (const u of tripUserRows ?? []) {
 if (u?.id) tripUmap[u.id] = u.username ?? 'Seglare'
 }
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 const recentTrips = (recentTripsRaw ?? []).map((t: any) => ({ ...t, users: { username: tripUmap[t.user_id] ?? 'Seglare' } }))

 // Rutter som passerar nära platsen
 const { data: allTours } = await supabase
 .from('tours')
 .select('id, title, usp, duration_label, start_location, destination, waypoints, best_for, cover_image')
 .order('title', { ascending: true })

 function haversineNM(lat1: number, lon1: number, lat2: number, lon2: number): number {
 const R = 3440.065
 const dLat = (lat2 - lat1) * Math.PI / 180
 const dLon = (lon2 - lon1) * Math.PI / 180
 const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
 return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
 }

 const nearbyTours = r.latitude && r.longitude
 ? (allTours ?? []).filter((t: { waypoints: { lat: number; lng: number }[] }) =>
 Array.isArray(t.waypoints) &&
 t.waypoints.some((wp: { lat: number; lng: number }) =>
 haversineNM(r.latitude!, r.longitude!, wp.lat, wp.lng) <= 25
 )
 ).slice(0, 3)
 : []

 // Aggregate review stats for header
 const { data: reviewStats } = await supabase
 .from('reviews')
 .select('rating')
 .eq('place_id', id)

 const avgRating = reviewStats && reviewStats.length > 0
 ? (reviewStats.reduce((a: number, r: { rating?: number }) => a + (r?.rating ?? 0), 0) / reviewStats.length)
 : null
 const reviewCount = reviewStats?.length ?? 0

 // JSON-LD structured data
 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Restaurant',
 name: r.name,
 description: r.description ?? undefined,
 url: `https://svalla.se/upptack/${canonicalPath}`,
 ...(r.latitude && r.longitude ? {
 geo: {
 '@type': 'GeoCoordinates',
 latitude: r.latitude,
 longitude: r.longitude,
 },
 hasMap: `https://maps.apple.com/?q=${r.latitude},${r.longitude}`,
 } : {}),
 ...(r.images?.[0] ? { image: r.images[0] } : {}),
 ...(avgRating !== null ? {
 aggregateRating: {
 '@type': 'AggregateRating',
 ratingValue: avgRating.toFixed(1),
 reviewCount: reviewCount,
 bestRating: 5,
 worstRating: 1,
 },
 } : {}),
 servesCuisine: Array.isArray(r.tags) ? r.tags.slice(0, 3) : undefined,
 priceRange: '$$',
 ...(r.island ? {
 address: {
 '@type': 'PostalAddress',
 addressLocality: r.island,
 addressCountry: 'SE',
 },
 } : {}),
 ...(r.contact_phone ? { telephone: r.contact_phone } : {}),
 }

 /**
  * Bygg bild-array i prioritetsordning:
  *   1. Google-foton (hög kvalitet, äkta bilder från platsen — proxy:as via /api)
  *   2. Lokala images endast om INGA Google-foton finns (vi vill inte mixa in
  *      seedade/AI-bilder bredvid äkta foton)
  *
  * Detta ger oss premium-känsla: när vi har Google så ser sidan ut som ett
  * faktiskt restaurangkort, inte en katalog-sida med varierande kvalitet.
  */
 const googlePhotoRefs = ((r as Restaurant & { google_photo_refs?: { reference: string }[] | null }).google_photo_refs) ?? []
 const googlePhotoUrls = googlePhotoRefs
   .filter(p => p?.reference)
   .map(p => {
     // photoName format: "places/{placeId}/photos/{photoRef}" — encoda till base64url så vi slipper "/" i URL
     const encoded = Buffer.from(p.reference, 'utf-8').toString('base64url')
     return `/api/places/photo/${encoded}?w=1600`
   })
 /**
  * Validera URL:er strikt innan vi skickar dem till hero-galleriet.
  * Trasiga, tomma eller relativa-utan-prefix-URLer ger en trasig bild-alt
  * i UI:t — det ser oseriöst ut. Bara http(s)://, /api/ eller /-prefixerade
  * URL:er passerar.
  */
 const isValidPhotoUrl = (u: unknown): u is string =>
   typeof u === 'string' &&
   u.length > 0 &&
   (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('/'))

 const placePhotos: string[] = googlePhotoUrls.length > 0
   ? googlePhotoUrls
   : (Array.isArray(r.images) ? r.images.filter(isValidPhotoUrl) : [])

 /**
  * One-liner-genering — säger på 2 sek vad platsen är.
  * Prio: core_experience (specifikt skrivet för det), annars första meningen
  * av description (kapad till ~140 tecken). Tom plats → undefined.
  */
 const oneLiner: string | null = (() => {
   if (r.core_experience) return r.core_experience
   if (!r.description) return null
   const firstSentence = r.description.split(/(?<=[.!?])\s+/)[0]?.trim() ?? ''
   if (firstSentence.length <= 160) return firstSentence
   return firstSentence.slice(0, 140).trim() + '…'
 })()

 /**
  * Mappa rå type → svensk label för PremiumHeader och FactsSection.
  */
 const TYPE_LABEL_MAP: Record<string, string> = {
   restaurant: 'Restaurang', cafe: 'Kafé', bar: 'Bar',
   marina: 'Gästhamn', harbor: 'Hamn', anchorage: 'Naturhamn', nature_harbor: 'Naturhamn',
   fuel: 'Bränsle', fuel_station: 'Bränsle',
   beach: 'Bad', sauna: 'Bastu', shop: 'Butik', hotel: 'Hotell', nature: 'Naturplats',
 }
 const typeLabel = r.type ? (TYPE_LABEL_MAP[r.type] ?? null) : null

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }}>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Utforska', item: 'https://svalla.se/upptack' },
 { '@type': 'ListItem', position: 3, name: r.name, item: `https://svalla.se/upptack/${canonicalPath}` },
 ],
 }) }}
 />

 {/* ── Hero-galleri (thatsup-style: flera bilder synliga, scroll-snap, pilar) ── */}
 <div style={{ position: 'relative' }}>
   <PlaceHeroGallery photos={placePhotos} alt={r.name} />

   {/* Back button — over carousel.
       Stilskild från carousel-pilarna (vita rundlar) genom mörk bakgrund
       + text "Utforska", så det är tydligt att man LÄMNAR sidan istället
       för att bläddra i bilder. Pekar till /upptack — den centrala
       upptäckts-vyn för platser. */}
   <Link
     href="/upptack"
     aria-label="Tillbaka till Utforska"
     style={{
       position: 'absolute', top: 'calc(14px + env(safe-area-inset-top, 0px))', left: 14,
       height: 38, padding: '0 14px 0 10px',
       borderRadius: 999,
       display: 'inline-flex', alignItems: 'center', gap: 6,
       background: 'rgba(0, 30, 45, 0.78)',
       color: '#fff',
       textDecoration: 'none',
       backdropFilter: 'blur(10px)',
       WebkitBackdropFilter: 'blur(10px)',
       boxShadow: '0 4px 16px rgba(0,30,45,0.30)',
       fontSize: 13,
       fontWeight: 700,
       letterSpacing: '-0.01em',
       zIndex: 4,
     }}
   >
     <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} style={{ width: 18, height: 18 }}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
     </svg>
     <span>Utforska</span>
   </Link>

   {/* Bookmark button — over carousel */}
   <div style={{
     position: 'absolute', top: 'calc(14px + env(safe-area-inset-top, 0px))', right: 14,
     background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
     borderRadius: '50%',
     boxShadow: '0 2px 10px rgba(0,30,45,0.18)',
     zIndex: 4,
   }}>
     <BookmarkButton restaurantId={r.id} />
   </div>
 </div>

 <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px 16px' }}>

 {/* ── Premium-header: namn, one-liner, betyg, prisklass, action-pills ── */}
 <PlacePremiumHeader
   name={r.name}
   oneLiner={oneLiner}
   typeLabel={typeLabel}
   island={r.island ?? null}
   region={(r as Restaurant & { archipelago_region?: string | null }).archipelago_region ?? null}
   googleRating={(r as Restaurant & { google_rating?: number | null }).google_rating ?? null}
   googleRatingsTotal={(r as Restaurant & { google_ratings_total?: number | null }).google_ratings_total ?? null}
   svallaRating={avgRating}
   svallaRatingCount={reviewCount}
   priceLevel={null}
   websiteUrl={r.website}
   menuUrl={(r as Restaurant & { menu_url?: string | null }).menu_url ?? null}
   bookingUrl={r.booking_url}
   instagram={(r as Restaurant & { instagram?: string | null }).instagram ?? null}
 />

 {/* ── Why Layer: core_experience ── */}
 {r.core_experience && (
 <div style={{
 background: 'linear-gradient(135deg, rgba(30,92,130,0.07), rgba(45,125,138,0.04))',
 border: '1.5px solid rgba(30,92,130,0.14)',
 borderRadius: 18, padding: '14px 18px', marginBottom: 14,
 }}>
 <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>
 Varför hit?
 </div>
 <p style={{ fontSize: 14, color: 'var(--sea)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
 {r.core_experience}
 </p>
 </div>
 )}

 {/* ── Tags ── */}
 {r.tags && r.tags.length > 0 && (
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
 {r.tags.map((tag: string) => (
 <span key={tag} style={{
 padding: '5px 12px', borderRadius: 20,
 background: 'rgba(10,123,140,0.07)',
 border: '1px solid rgba(10,123,140,0.13)',
 fontSize: 12, fontWeight: 600, color: 'var(--sea)',
 }}>
 {tag}
 </span>
 ))}
 </div>
 )}

 {/* ── Description ── */}
 {r.description && (
 <div style={{
 background: 'var(--white)', borderRadius: 18, padding: '16px 18px', marginBottom: 14,
 boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 }}>
 <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: 0 }}>{r.description}</p>
 </div>
 )}

 {/* ── Premium-info: kontakt, adress, öppettider, Google Maps ── */}
 <PlaceContactSection
   phone={(r as Restaurant & { phone?: string | null }).phone ?? r.contact_phone}
   email={(r as Restaurant & { email?: string | null }).email}
   website={r.website}
   menuUrl={(r as Restaurant & { menu_url?: string | null }).menu_url}
   instagram={(r as Restaurant & { instagram?: string | null }).instagram}
   facebook={(r as Restaurant & { facebook?: string | null }).facebook}
   formattedAddress={(r as Restaurant & { formatted_address?: string | null }).formatted_address}
   googleRating={(r as Restaurant & { google_rating?: number | null }).google_rating}
   googleRatingsTotal={(r as Restaurant & { google_ratings_total?: number | null }).google_ratings_total}
   googlePlaceId={(r as Restaurant & { google_place_id?: string | null }).google_place_id}
   latitude={r.latitude}
   longitude={r.longitude}
   name={r.name}
 />

 {/* ── Egenskaper: typ, kategorier, faciliteter, best for, säsong ── */}
 <PlaceFactsSection
   type={r.type ?? null}
   categories={(r as Restaurant & { categories?: string[] | null }).categories}
   bestFor={(r as Restaurant & { best_for?: string[] | null }).best_for}
   facilities={(r as Restaurant & { facilities?: string[] | null }).facilities}
   seasonality={(r as Restaurant & { seasonality?: string | null }).seasonality}
 />

 {/* ── CTA: Logga ett besök ── */}
 <Link
 href={`/logga/manuell?plats=${encodeURIComponent(r.name)}`}
 style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--grad-acc)',
 borderRadius: 18, padding: '16px 20px', marginBottom: 14,
 textDecoration: 'none',
 boxShadow: '0 4px 20px rgba(201,110,42,0.35)',
 }}
 >
 <span style={{ fontSize: 28 }}> </span>
 <div>
 <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Jag var här!</div>
 <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Logga ditt besök och dela med gemenskapen</div>
 </div>
 <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 18, height: 18, marginLeft: 'auto', flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </Link>

 {/* ── Plan trip CTA ── */}
 <Link
 href={`/guide?fråga=${encodeURIComponent(`Hjälp mig planera en tur till ${r.name}${r.island ? ` på ${r.island}` : ''}`)}`}
 style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.13)',
 borderRadius: 18, padding: '14px 18px', marginBottom: 14,
 textDecoration: 'none',
 boxShadow: '0 2px 8px rgba(0,45,60,0.05)',
 }}
 >
 <div style={{ flexShrink: 0 }}>
 <ThorkelAvatar size={38} />
 </div>
 <div>
 <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 1 }}>Planera en tur hit</div>
 <div style={{ fontSize: 11, color: 'var(--txt3)' }}>Thorkel hjälper dig bygga hela rutten</div>
 </div>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, marginLeft: 'auto', flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </Link>

 {/* ── Sociala objekt: check-ins, besökare, omdömen ── */}
 <PlaceSocialSection placeId={r.id} placeType="restaurant" placeName={r.name} />

 {/* (Tidigare separat bilder-rad är borttagen — alla bilder visas nu i hero-carouseln ovan) */}

 {/* ── Menu ── */}
 {r.menu && (
 <div style={{
 background: 'var(--white)', borderRadius: 18, padding: '16px 18px', marginBottom: 14,
 boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
 }}>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
 Meny
 </h2>
 <pre style={{
 fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: 0,
 whiteSpace: 'pre-wrap', fontFamily: 'inherit',
 }}>
 {r.menu}
 </pre>
 </div>
 )}

 {/* ── Recent visits (trips linked to this spot) ── */}
 {recentTrips && recentTrips.length > 0 && (
 <div style={{ marginBottom: 14 }}>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
 Senaste turer i skärgården
 </h2>
 <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
 {recentTrips.map((t: { id: string; image: string; location_name: string | null; created_at: string; users?: { username: string } | { username: string }[] | null }) => (
 <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
 <div style={{
 width: 100, background: 'var(--white)', borderRadius: 12, overflow: 'hidden',
 boxShadow: '0 2px 8px rgba(0,45,60,0.07)', border: '1px solid rgba(10,123,140,0.08)',
 }}>
 <div style={{ position: 'relative', width: '100%', height: 70 }}>
 <Image src={t.image} alt="" fill sizes="100px" style={{ objectFit: 'cover' }} />
 </div>
 <div style={{ padding: '6px 8px' }}>
 <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {Array.isArray(t.users) ? t.users[0]?.username : (t.users as { username: string } | null)?.username ?? 'Okänd'}
 </div>
 <div style={{ fontSize: 8, color: 'var(--txt3)', marginTop: 1 }}>
 {new Date(t.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
 </div>
 </div>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* ── Rutter som passar (Phase 4: connect data) ── */}
 {nearbyTours.length > 0 && (
 <div style={{ marginBottom: 14 }}>
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
 Rutter som passar
 </h2>
 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
 {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
 {nearbyTours.map((t: any) => (
 <Link key={t.id} href={`/rutter/${t.id}`} style={{ textDecoration: 'none' }}>
 <div style={{
 background: 'var(--white)', borderRadius: 16, padding: '13px 16px',
 boxShadow: '0 2px 10px rgba(0,45,60,0.07)',
 border: '1px solid rgba(10,123,140,0.09)',
 display: 'flex', alignItems: 'center', gap: 12,
 }}>
 <div style={{
 width: 42, height: 42, borderRadius: 12, flexShrink: 0,
 background: 'var(--grad-sea)',
 display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
 }}> </div>
 <div style={{ flex: 1, minWidth: 0 }}>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
 {t.title}
 </div>
 <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
 {t.start_location} → {t.destination}
 {t.duration_label ? ` · ${t.duration_label}` : ''}
 </div>
 </div>
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}

 {/* ── Vanliga frågor (FAQ) — SEO + ger Google rich snippets ── */}
 <PlaceFAQSection
   name={r.name}
   type={r.type ?? null}
   island={r.island ?? null}
   region={(r as Restaurant & { archipelago_region?: string | null }).archipelago_region ?? null}
   formattedAddress={(r as Restaurant & { formatted_address?: string | null }).formatted_address ?? null}
   phone={(r as Restaurant & { phone?: string | null }).phone ?? r.contact_phone ?? null}
   websiteUrl={r.website ?? null}
   bookingUrl={r.booking_url ?? null}
   openingHours={r.opening_hours ?? null}
   facilities={(r as Restaurant & { facilities?: string[] | null }).facilities ?? null}
   bestFor={(r as Restaurant & { best_for?: string[] | null }).best_for ?? null}
   hasGuestHarbor={Array.isArray((r as Restaurant & { facilities?: string[] | null }).facilities) &&
     (((r as Restaurant & { facilities?: string[] | null }).facilities ?? []).includes('guest_dock'))}
 />

 {/* ── Reviews ── */}
 <ReviewSection restaurantId={id} />

 {/* ── Senast uppdaterad — diskret credit i botten ── */}
 {(r as Restaurant & { google_rating_updated?: string | null }).google_rating_updated && (
   <div style={{
     fontSize: 11,
     color: 'var(--txt3)',
     textAlign: 'center',
     marginTop: 18,
     fontStyle: 'italic',
   }}>
     Information uppdaterad {new Date((r as Restaurant & { google_rating_updated?: string | null }).google_rating_updated!).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
   </div>
 )}
 </div>
 </div>
 )
}
