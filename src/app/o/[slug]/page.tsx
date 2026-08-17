import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../island-data'
import SvallaLogo from '@/components/SvallaLogo'
import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { ISLAND_COORD_MAP } from '@/lib/islandCoords'
import IslandWeatherClient from '@/components/IslandWeatherClient'
import SaveIslandButton from '@/components/SaveIslandButton'
import MarkVisitedButton from '@/components/MarkVisitedButton'
import FAQSection from '@/components/FAQSection'
import { getFaqsForIsland } from '@/lib/islandFaqs'
import { ACTIVITY_LIST, islandActivitiesForType, type ActivityType } from '@/app/aktivitet/activity-data'
import EmailSignup from '@/components/EmailSignup'
import ShareButton from '@/components/ShareButton'
import InlineFeedbackButton from '@/components/InlineFeedbackButton'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'
import DepartureWidget from '@/components/DepartureWidget'
import LastBoatPanel from '@/components/LastBoatPanel'
import { getThreadsByIsland, formatForumDate } from '@/lib/forum'
import { GUIDES } from '../../guider/guides-data'
import { getGuidesForIsland } from '../../guider/guide-island-map'
import IslandB2BCTA from '@/components/IslandB2BCTA'

type Props = { params: Promise<{ slug: string }> }

// SOFT-404, DEL 2 (2026-08-12). notFound() i generateMetadata (PR #117)
// räckte inte: Vercel serverar ett byggtids-fallbackskal för ISR-rutter
// med loading.tsx (x-nextjs-prerender: 1) — 200-statusen är satt INNAN
// någon kod körs, och vår notFound() landar bara som en error-digest i
// streamen (NEXT_HTTP_ERROR_FALLBACK;404 i body, status ändå 200).
// Den här routens hela slug-mängd är känd vid bygget (data ligger i
// repot), så dynamicParams=false är semantiskt rätt: okänd slug 404:ar
// i routern, före skalet. Gäller INTE db-backade rutter (upptack, tur,
// u) — nya rader där måste kunna renderas utan ny deploy.
export const dynamicParams = false

export async function generateStaticParams() {
 return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
 const { slug } = await params
 const island = getIsland(slug)
  // SOFT-404-SKYDD: loading.tsx streamar svaret — 200 flushas före sidkroppen,
  // så bara ett notFound() HÄR (före headers) ger riktig 404-status. Se
  // motsvarande kommentar i o/[slug]/page.tsx och CLAUDE.md.
  if (!island) notFound()
 return {
 title: island.seoTitle ? `${island.seoTitle} | Svalla` : `${island.name} 2026 – restauranger, boende & aktiviteter | Svalla`,
 description: island.seoDescription ?? `Guide till ${island.name}: restauranger, boende, aktiviteter, badplatser och hur du tar dig dit. ${island.tagline}`,
 keywords: [
  `${island.name.toLowerCase()} guide`,
  `${island.name.toLowerCase()} restaurang`,
  `${island.name.toLowerCase()} boende`,
  `${island.name.toLowerCase()} aktiviteter`,
  `vad göra på ${island.name.toLowerCase()}`,
  `resa till ${island.name.toLowerCase()}`,
  `${(island.regionLabel ?? '').toLowerCase()} guide`,
 ],
 alternates: {
 canonical: `https://svalla.se/o/${slug}`,
 },
 openGraph: {
 title: `${island.name} – ${island.tagline}`,
 description: `Komplett guide till ${island.name} i ${(island.regionLabel ?? '').toLowerCase()}.`,
 url: `https://svalla.se/o/${slug}`,
 type: 'article',
 images: [{
 url: `https://svalla.se/api/og/island/${slug}`,
 width: 1200, height: 630,
 alt: `${island.name} — ${island.tagline}`,
 }],
 },
 twitter: {
 card: 'summary_large_image',
 title: `${island.name} – ${island.tagline}`,
 description: `Guide till ${island.name} i ${(island.regionLabel ?? '').toLowerCase()}.`,
 images: [`https://svalla.se/api/og/island/${slug}`],
 },
 }
}

/**
 * Tidigare `force-dynamic` — 824 sidor renderades om vid VARJE besök.
 *
 * Kommentaren här sa att det berodde på att `cookies()` inte kan köras i
 * ISR/static, vilket stämde: den gamla koden anropade
 * `createServerSupabaseClient()`, som internt läser cookies, och Next.js 15
 * kastade då DynamicServerError. Men slutsatsen var fel — lösningen var inte
 * att ge upp cachen, utan att sluta läsa cookies. Sidan använder ingen auth
 * alls: den läser antal besökare (`visited_islands`) och tre forumtrådar,
 * båda med publik läspolicy (verifierat mot produktionsdatabasen med
 * anon-nyckeln 2026-08-02).
 *
 * Med den cookie-fria klienten fungerar generateStaticParams + revalidate,
 * och sidorna serveras från CDN. Samma sak som gjorde /upptack/[id] 24x
 * snabbare, se CLAUDE.md punkt 18.
 *
 * Kontroll i byggutdata: `● /o/[slug]` = statisk med ISR (rätt),
 * `ƒ /o/[slug]` = dynamisk (fel, då är cookies tillbaka någonstans).
 */
export const revalidate = 3600

// Öar med egna äventyrssidor
const ADVENTURE_PAGES: Record<string, { url: string; title: string; desc: string }> = {
  gotland: { url: '/gotland/aventyr', title: 'Äventyr på Gotland', desc: '10 utvalda rundor – bil, cykel och kollektivt' },
  aland:   { url: '/aland/aventyr',   title: 'Äventyr på Åland',   desc: '10 utvalda rundor – bil, cykel och kollektivt' },
  oland:   { url: '/oland/aventyr',   title: 'Äventyr på Öland',   desc: '10 utvalda rundor – bil, cykel och buss' },
}

export default async function IslandPage({ params }: Props) {
 const { slug } = await params
 const island = getIsland(slug)
 if (!island) notFound()

 // Hämta antal unika besökare + senaste forumtrådar parallellt.
 // Timeout på 3 s så att en hängande fråga inte tar ner hela sidan: populära
 // öar (sandhamn, vaxholm) har många rader och COUNT kan bli långsam.
 // Behålls trots att sidan numera är statisk — timeouten gäller då bygget och
 // revalideringen i stället för varje besökare, och en tom besökarräknare är
 // bättre än en sida som aldrig blir klar.
 //
 // Publik klient (ingen cookies()): sidan behöver inte veta vem som är
 // inloggad, och cookies-läsningen var det enda som gjorde sidan dynamisk.
 let visitorCount: number | null = null
 let recentThreads: Awaited<ReturnType<typeof getThreadsByIsland>> = []
 try {
   const dbTimeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 3_000))
   const dbResult = await Promise.race([
     (async () => {
       const supabase = createPublicSupabaseClient()
       const [visitResult, threadResult] = await Promise.all([
         supabase
           .from('visited_islands')
           .select('*', { count: 'exact', head: true })
           .eq('island_slug', slug),
         getThreadsByIsland(slug, 0, true).then(t => t.slice(0, 3)).catch(() => []),
       ])
       return [visitResult, threadResult] as const
     })().catch(() => null),
     dbTimeout,
   ])
   if (dbResult !== null) {
     const [visitResult, threadResult] = dbResult
     visitorCount = visitResult.count
     recentThreads = threadResult
   }
 } catch {
   // Supabase-fel: rendera sidan utan besökarräknare och forumtrådar
 }

 const regionColor = island.region === 'norra'
 ? '#1a5276'
 : island.region === 'södra'
 ? '#1a4a3a'
 : 'var(--sea)'

 const relatedIslands = ALL_ISLANDS.filter(i => island.related.includes(i.slug))
 const guideLinks = getGuidesForIsland(slug)
   .map(gs => GUIDES.find(g => g.slug === gs))
   .filter((g): g is NonNullable<typeof g> => Boolean(g))

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
 
 {/* JSON-LD Structured Data */}
 {(() => {
   // Koordinater: island-data har prioritet, ISLAND_COORD_MAP är fallback
   const coordLat = island.lat ?? ISLAND_COORD_MAP[slug]?.lat
   const coordLng = island.lng ?? ISLAND_COORD_MAP[slug]?.lng
   const hasCoords = !!(coordLat && coordLng)
   const mapsUrl = hasCoords
     ? `https://www.google.com/maps?q=${coordLat},${coordLng}`
     : undefined

   return (
     <script
       type="application/ld+json"
       dangerouslySetInnerHTML={{
         __html: JSON.stringify({
           '@context': 'https://schema.org',
           '@type': ['TouristDestination', 'TouristAttraction'],
           '@id': `https://svalla.se/o/${island.slug}#place`,
           name: island.name,
           description: island.description?.[0] ?? island.tagline,
           url: `https://svalla.se/o/${island.slug}`,
           image: `https://svalla.se/api/og/island/${island.slug}`,
           isAccessibleForFree: true,
           publicAccess: true,
           containedInPlace: {
             '@type': 'Place',
             name: island.regionLabel ?? 'Stockholms skärgård',
             url: 'https://svalla.se/rutter?vy=oar',
           },
           ...(mapsUrl ? { hasMap: mapsUrl } : {}),
           ...(island.facts?.best_for ? {
             touristType: {
               '@type': 'Audience',
               audienceType: island.facts.best_for,
             }
           } : {}),
           ...(island.activities && island.activities.length > 0 ? {
             amenityFeature: island.activities.slice(0, 6).map(a => ({
               '@type': 'LocationFeatureSpecification',
               name: a.name,
               value: true,
             })),
           } : {}),
           ...(hasCoords ? {
             geo: {
               '@type': 'GeoCoordinates',
               latitude: coordLat,
               longitude: coordLng,
             },
           } : {}),
           ...(island.seasonal ? {
             openingHoursSpecification: {
               '@type': 'OpeningHoursSpecification',
               description: `Säsong: ${island.seasonal.open}. Bäst tid: ${island.seasonal.best}.`,
               ...(island.seasonal.open !== 'Hela året' ? {
                 validFrom: '2026-05-01',
                 validThrough: '2026-10-31',
               } : {}),
             },
           } : {}),
         })
       }}
     />
   )
 })()}
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Öar', item: 'https://svalla.se/rutter?vy=oar' },
 { '@type': 'ListItem', position: 3, name: island.name, item: `https://svalla.se/o/${slug}` },
 ],
 }) }}
 />
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify({
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: getFaqsForIsland(island).map(faq => ({
 '@type': 'Question',
 name: faq.q,
 acceptedAnswer: { '@type': 'Answer', text: faq.a },
 })),
 }) }}
 />

 {/* ── NAV ─────────────────────────────────────────────────── */}
 <nav style={{
 background: `linear-gradient(160deg, ${regionColor} 0%, #2d7d8a 100%)`,
 padding: '18px 24px 16px',
 position: 'sticky',
 top: 0,
 zIndex: 100,
 boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
 }}>
 <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
 <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
 <SvallaLogo height={24} color="#ffffff" />
 </Link>
 <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
   <Link href="/rutter?vy=oar" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none', fontWeight: 500 }}>
     ← Alla öar
   </Link>
   <Link href="/nyhetsbrev" style={{
     color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none',
     background: 'rgba(255,255,255,0.18)', borderRadius: 20,
     padding: '5px 12px', border: '1px solid rgba(255,255,255,0.25)',
   }}>
     <Icon name="mail" size={13} stroke={2} /> Nyhetsbrev
   </Link>
 </div>
 </div>
 </nav>

 {/* ── HERO ────────────────────────────────────────────────── */}
 <div style={{
 background: `linear-gradient(170deg, ${regionColor} 0%, #2d7d8a 60%, #1a9ab0 100%)`,
 padding: '52px 24px 44px',
 color: '#fff',
 }}>
 <div style={{ maxWidth: 900, margin: '0 auto' }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
 <span style={{
 fontSize: 11,
 fontWeight: 700,
 letterSpacing: 1.2,
 textTransform: 'uppercase',
 background: 'rgba(255,255,255,0.18)',
 padding: '4px 12px',
 borderRadius: 20,
 color: 'rgba(255,255,255,0.9)',
 }}>{island.regionLabel}</span>
 {island.tags.slice(0, 3).map(tag => (
 <span key={tag} style={{
 fontSize: 11,
 color: 'rgba(255,255,255,0.65)',
 background: 'rgba(255,255,255,0.1)',
 padding: '3px 10px',
 borderRadius: 20,
 }}>{tag}</span>
 ))}
 </div>

 <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 14 }}>
 <div style={{
 width: 56, height: 56, flexShrink: 0,
 borderRadius: 14,
 background: 'rgba(255,255,255,0.16)',
 border: '1px solid rgba(255,255,255,0.22)',
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 color: '#fff',
 }}>
 <Icon name={emojiToIcon(island.emoji)} size={28} stroke={1.7} />
 </div>
 <div>
 <h1 style={{ fontSize: 42, fontWeight: 700, margin: '0 0 6px', letterSpacing: -0.5, fontFamily: "'Playfair Display', Georgia, serif" }}>{island.name}</h1>
 <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', margin: 0, lineHeight: 1.5, maxWidth: 560, fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic' }}>{island.tagline}</p>
 {(visitorCount ?? 0) > 0 && (
 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 8,
 marginTop: 14, padding: '8px 16px', borderRadius: 999,
 background: 'rgba(255,255,255,0.22)',
 backdropFilter: 'blur(8px)',
 border: '1px solid rgba(255,255,255,0.25)',
 fontSize: 14, fontWeight: 700, color: '#fff',
 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
 }}>
 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M12 21.3C7 14.5 4.8 11 4.8 7.8a7.2 7.2 0 0 1 14.4 0c0 3.2-2.2 6.7-7.2 13.5Z" />
 <circle cx="12" cy="8" r="2.4" />
 </svg>
 <span>
 <strong style={{ fontSize: 15 }}>{visitorCount?.toLocaleString('sv-SE')}</strong>{' '}
 seglare har besökt {island.name} via Svalla
 </span>
 </div>
 )}
 {/* Live väder — kräver koordinater */}
 {ISLAND_COORD_MAP[island.slug] && (
 <IslandWeatherClient
 lat={ISLAND_COORD_MAP[island.slug]!.lat}
 lng={ISLAND_COORD_MAP[island.slug]!.lng}
 islandName={island.name}
 />
 )}
 </div>
 </div>

 {/* Spara ön + logga besök + dela + forum CTA */}
 <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
 <SaveIslandButton islandSlug={island.slug} islandName={island.name} variant="pill" />
 <ShareButton
   title={island.name}
   description={island.tagline}
   url={`https://svalla.se/o/${island.slug}`}
   surface="island-page"
   entityId={island.slug}
 />
 <MarkVisitedButton islandSlug={island.slug} islandName={island.name} />
 <Link
  href={`/forum/o/${island.slug}`}
  style={{
   display: 'inline-flex',
   alignItems: 'center',
   gap: 7,
   padding: '9px 16px',
   background: 'rgba(255,255,255,0.15)',
   color: '#fff',
   borderRadius: 50,
   textDecoration: 'none',
   fontSize: 13,
   fontWeight: 600,
   border: '1px solid rgba(255,255,255,0.25)',
   backdropFilter: 'blur(4px)',
   whiteSpace: 'nowrap',
  }}
 >
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
   <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
  </svg>
  Forum
 </Link>
 <Link
  href="/nyhetsbrev"
  style={{
   display: 'inline-flex',
   alignItems: 'center',
   gap: 7,
   padding: '9px 16px',
   background: 'rgba(255,255,255,0.92)',
   color: '#0d3f5a',
   borderRadius: 50,
   textDecoration: 'none',
   fontSize: 13,
   fontWeight: 700,
   border: '1px solid rgba(255,255,255,0.6)',
   backdropFilter: 'blur(4px)',
   whiteSpace: 'nowrap',
  }}
 >
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
   <rect x="2" y="4" width="20" height="16" rx="2"/>
   <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
  Nyhetsbrev
 </Link>
 </div>

 {/* Quick facts */}
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
 gap: 10,
 marginTop: 22,
 }}>
 {([
 { label: 'Restid', value: island.facts.travel_time, icon: 'compass' as const },
 { label: 'Karaktär', value: island.facts.character, icon: 'leaf' as const },
 { label: 'Säsong', value: island.facts.season, icon: 'sun' as const },
 { label: 'Perfekt för', value: island.facts.best_for, icon: 'star' as const },
 ]).map(f => (
 <div key={f.label} style={{
 background: 'rgba(255,255,255,0.12)',
 borderRadius: 12,
 padding: '12px 16px',
 backdropFilter: 'blur(4px)',
 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 5 }}>
 <Icon name={f.icon} size={12} stroke={2} />
 <span>{f.label}</span>
 </div>
 <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1.4 }}>{f.value}</div>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* ── MAIN CONTENT ────────────────────────────────────────── */}
 <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 80px' }}>

 {/* Visste du att */}
 {island.did_you_know && (
 <div style={{
 background: 'linear-gradient(135deg, #0a7b8c 0%, #1a5276 100%)',
 borderRadius: 16,
 padding: '20px 24px',
 marginBottom: 36,
 display: 'flex',
 gap: 16,
 alignItems: 'flex-start',
 boxShadow: '0 4px 20px rgba(10,123,140,0.2)',
 }}>
 <Icon name="star" size={24} stroke={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
 <div>
 <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Visste du att</div>
 <p style={{ fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.7, fontWeight: 500 }}>{island.did_you_know}</p>
 </div>
 </div>
 )}

 {/* ── SÄSONGSKALENDER ──────────────────────────────────────── */}
 {island.seasonal && (() => {
   const MONTH_LABELS = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
   const COLOR: Record<string, string> = {
     off:     'rgba(120,140,160,0.18)',
     limited: 'rgba(246,173,72,0.35)',
     open:    'rgba(10,123,140,0.35)',
     peak:    'rgba(10,123,140,0.85)',
   }
   const TEXT: Record<string, string> = {
     off: 'rgba(120,140,160,0.6)', limited: '#b07d20', open: '#0a7b8c', peak: '#fff',
   }
   const LABEL: Record<string, string> = {
     off: 'Stängt', limited: 'Begränsad service', open: 'Öppet', peak: 'Högsäsong',
   }
   const currentMonth = new Date().getMonth() // 0-indexed
   return (
     <div style={{ background: 'var(--white)', borderRadius: 20, padding: '22px 24px', marginBottom: 32, boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid rgba(10,123,140,0.08)' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
         <Icon name="calendar" size={19} stroke={1.9} />
         <h3 style={{ fontFamily: 'var(--font-display,"Playfair Display",Georgia,serif)', fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>
           Bäst tid att besöka {island.name}
         </h3>
       </div>

       {/* Månadsrutnät */}
       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 3, marginBottom: 14 }}>
         {island.seasonal.months.map((status, i) => (
           <div key={i} style={{
             background: COLOR[status],
             borderRadius: 6,
             padding: '8px 2px 6px',
             textAlign: 'center',
             border: i === currentMonth ? '2px solid var(--sea)' : '2px solid transparent',
             position: 'relative',
           }}>
             <div style={{ fontSize: 9, fontWeight: 700, color: TEXT[status], letterSpacing: 0.3 }}>
               {MONTH_LABELS[i]}
             </div>
             {i === currentMonth && (
               <div style={{ position: 'absolute', top: -5, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: 'var(--sea)' }} />
             )}
           </div>
         ))}
       </div>

       {/* Förklaring */}
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
         {(['peak','open','limited','off'] as const).map(s => (
           <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11 }}>
             <div style={{ width: 12, height: 12, borderRadius: 3, background: COLOR[s], flexShrink: 0 }} />
             <span style={{ color: 'var(--txt2)', fontWeight: 600 }}>{LABEL[s]}</span>
           </div>
         ))}
       </div>

       {/* Rekommendation */}
       <div style={{ background: 'rgba(10,123,140,0.07)', borderRadius: 12, padding: '14px 16px', borderLeft: '3px solid var(--sea)' }}>
         <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8, color: 'var(--sea)', marginBottom: 4 }}>
           Rekommenderat: {island.seasonal.best}
         </div>
         <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.6 }}>
           {island.seasonal.bestReason}
         </p>
         {island.seasonal.warning && (
           <p style={{ fontSize: 12, color: '#9a6b00', margin: '8px 0 0', lineHeight: 1.5, fontStyle: 'italic' }}>
             <Icon name="warning" size={14} stroke={2} /> {island.seasonal.warning}
           </p>
         )}
       </div>
     </div>
   )
 })()}

 {/* Hur tar jag mig hit — transit-widget */}
 <DepartureWidget islandSlug={island.slug} islandName={island.name} />

 {/* Sista båten tillbaka idag — varning när det börjar närma sig */}
 <LastBoatPanel islandSlug={island.slug} islandName={island.name} />

 {/* Äventyrsbanner — visas bara för Gotland, Åland och Öland */}
 {ADVENTURE_PAGES[island.slug] && (() => {
   const adv = ADVENTURE_PAGES[island.slug]!
   return (
     <Link href={adv.url} style={{ textDecoration: 'none', display: 'block', marginBottom: 36 }}>
       <div style={{
         background: 'linear-gradient(135deg, #1a3a5c 0%, #0d6e6e 100%)',
         borderRadius: 20,
         padding: '24px 28px',
         display: 'flex',
         alignItems: 'center',
         gap: 20,
         position: 'relative',
         overflow: 'hidden',
         boxShadow: '0 6px 28px rgba(13,110,110,0.28)',
         border: '1px solid rgba(255,255,255,0.08)',
       }}>
         {/* Decorative circles */}
         <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
         <div style={{ position: 'absolute', bottom: -20, left: 120, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

         {/* Icon */}
         <div style={{
           width: 52, height: 52, flexShrink: 0,
           borderRadius: 16,
           background: 'rgba(255,255,255,0.14)',
           display: 'flex', alignItems: 'center', justifyContent: 'center',
           border: '1px solid rgba(255,255,255,0.18)',
         }}>
           <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10" />
             <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
           </svg>
         </div>

         {/* Text */}
         <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
           <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 5 }}>
             Utforska mer
           </div>
           <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif" }}>
             {adv.title}
           </div>
           <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>
             {adv.desc}
           </div>
         </div>

         {/* Arrow */}
         <div style={{
           width: 36, height: 36, flexShrink: 0,
           borderRadius: 10,
           background: 'rgba(255,255,255,0.12)',
           display: 'flex', alignItems: 'center', justifyContent: 'center',
         }}>
           <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
             <path d="M5 12h14M13 6l6 6-6 6" />
           </svg>
         </div>
       </div>
     </Link>
   )
 })()}

 {/* Om ön */}
 <section style={{ marginBottom: 36 }}>
 <SectionHeader icon="📖" title={`Om ${island.name}`} />
 <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
 {island.description.map((para, i) => (
 <p key={i} style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.75, margin: 0 }}>{para}</p>
 ))}
 </div>
 </section>

 {/* Mid-page email — fångar besökare som läst beskrivningen men kanske inte scrollar till botten */}
 <div style={{
   marginBottom: 52,
   background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
   borderRadius: 16,
   padding: '22px 24px',
   border: '1px solid rgba(30,92,130,0.10)',
 }}>
   <EmailSignup
     variant="inline"
     source={`o-${island.slug}-midpage`}
     title={`Planerar du en tur till ${island.name}?`}
     description="Säsongsuppdateringar, öppettider och insider-tips direkt i inkorgen. Varannan tisdag, inga annonser."
     buttonLabel="Ja, prenumerera"
   />
 </div>

 {/* Aktiviteter */}
 {island.activities.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="🎯" title="Se & Göra" />
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
 gap: 14,
 }}>
 {island.activities.map(act => (
 <div key={act.name} style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '18px 20px',
 boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
 borderLeft: '3px solid #2d7d8a',
 }}>
 <div style={{
 width: 36, height: 36, borderRadius: 10,
 background: 'rgba(45,125,138,0.12)', color: 'var(--sea)',
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 marginBottom: 10,
 }}>
 <Icon name={emojiToIcon(act.icon)} size={18} stroke={1.85} />
 </div>
 <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 5 }}>{act.name}</div>
 <div style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6 }}>{act.desc}</div>
 </div>
 ))}
 </div>
 <div style={{ marginTop: 16, textAlign: 'right' }}>
 <Link href={`/o/${slug}/aktiviteter`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>
 Alla aktiviteter på {island.name} →
 </Link>
 </div>
 </section>
 )}

 {/* Restauranger */}
 {island.restaurants.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="" title="Mat & Dryck" />
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {island.restaurants.map(r => (
 <div key={r.name} style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '16px 20px',
 boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
 display: 'flex',
 gap: 16,
 alignItems: 'flex-start',
 }}>
 <div style={{
 minWidth: 36,
 height: 36,
 borderRadius: 10,
 background: 'var(--grad-sea)',
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'center',
 fontSize: 16,
 }}><Icon name="utensils" size={17} stroke={1.9} /></div>
 <div style={{ flex: 1 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{r.name}</span>
 <span style={{
 fontSize: 10,
 fontWeight: 700,
 color: 'var(--sea)',
 background: 'rgba(45,125,138,0.1)',
 padding: '2px 8px',
 borderRadius: 10,
 }}>{r.type}</span>
 </div>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 8px', lineHeight: 1.6 }}>{r.desc}</p>
 {(r.bookingUrl || r.websiteUrl) && (
 <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
 {r.bookingUrl && (
 <a
 href={r.bookingUrl}
 target="_blank"
 rel="noopener noreferrer sponsored"
 data-svalla-track="booking-click"
 data-place={r.name}
 data-island={island.slug}
 style={{
 display: 'inline-flex', alignItems: 'center', gap: 6,
 padding: '6px 14px', borderRadius: 999,
 background: 'var(--acc, #c96e2a)', color: '#fff',
 fontSize: 12, fontWeight: 700,
 textDecoration: 'none',
 }}
 >
 Boka bord →
 </a>
 )}
 {r.websiteUrl && (
 <a
 href={r.websiteUrl}
 target="_blank"
 rel="noopener noreferrer"
 style={{
 display: 'inline-flex', alignItems: 'center', gap: 6,
 padding: '6px 14px', borderRadius: 999,
 background: 'transparent', color: 'var(--sea)',
 border: '1px solid var(--sea)',
 fontSize: 12, fontWeight: 600,
 textDecoration: 'none',
 }}
 >
 Hemsida →
 </a>
 )}
 </div>
 )}
 </div>
 </div>
 ))}
 </div>
 <div style={{ marginTop: 16, textAlign: 'right' }}>
 <Link href={`/o/${slug}/restauranger`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>
 Alla restauranger på {island.name} →
 </Link>
 </div>
 </section>
 )}

 {/* Boende */}
 {island.accommodation.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="🛏" title="Boende" />
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
 gap: 14,
 }}>
 {island.accommodation.map(acc => (
 <div key={acc.name} style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '20px',
 boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
 }}>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{acc.name}</span>
 <span style={{
 fontSize: 10,
 fontWeight: 700,
 color: 'var(--sea)',
 background: 'rgba(30,92,130,0.08)',
 padding: '3px 9px',
 borderRadius: 10,
 whiteSpace: 'nowrap',
 marginLeft: 8,
 }}>{acc.type}</span>
 </div>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.6 }}>{acc.desc}</p>
 </div>
 ))}
 </div>
 <div style={{ marginTop: 16, textAlign: 'right' }}>
 <Link href={`/o/${slug}/boende`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>
 Allt boende på {island.name} →
 </Link>
 </div>
 </section>
 )}

 {/* Ta sig dit */}
 {island.getting_there.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="" title="Ta sig dit" />
 <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
 {island.getting_there.map(t => (
 <div key={t.method} style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '16px 20px',
 boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
 display: 'flex',
 gap: 16,
 alignItems: 'flex-start',
 }}>
 <div style={{
 width: 40, height: 40, flexShrink: 0,
 borderRadius: 10,
 background: 'rgba(30,92,130,0.10)',
 color: 'var(--sea)',
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 }}>
 <Icon name={emojiToIcon(t.icon)} size={20} stroke={1.8} />
 </div>
 <div style={{ flex: 1 }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3, flexWrap: 'wrap' }}>
 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{t.method}</span>
 {t.from && <span style={{ fontSize: 12, color: 'var(--txt3)' }}>från {t.from}</span>}
 {t.time && (
 <span style={{
 fontSize: 11,
 fontWeight: 700,
 color: 'var(--sea)',
 background: 'rgba(45,125,138,0.1)',
 padding: '2px 8px',
 borderRadius: 10,
 display: 'inline-flex', alignItems: 'center', gap: 4,
 }}><Icon name="clock" size={11} stroke={2} />{t.time}</span>
 )}
 </div>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.6 }}>{t.desc}</p>
 </div>
 </div>
 ))}
 </div>
 <div style={{ marginTop: 16, textAlign: 'right' }}>
  <Link href={`/o/${slug}/komma-dit`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>
   Komplett transportguide till {island.name} →
  </Link>
 </div>
 </section>
 )}

 {/* Hamnar */}
 {island.harbors.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="" title="Hamnar & Service" />
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
 gap: 14,
 }}>
 {island.harbors.map(h => (
 <div key={h.name} style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '20px',
 boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
 }}>
 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{h.name}</span>
 <div style={{ display: 'flex', gap: 4 }}>
 {h.spots && <span style={{ fontSize: 10, color: 'var(--txt3)' }}>{h.spots} platser</span>}
 {h.fuel && (
 <span title="Bränsle finns" style={{ display: 'inline-flex', color: 'var(--acc, #c96e2a)' }}>
 <Icon name="fuel" size={14} stroke={2} />
 </span>
 )}
 </div>
 </div>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 10px', lineHeight: 1.6 }}>{h.desc}</p>
 {h.service && h.service.length > 0 && (
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
 {h.service.map(s => (
 <span key={s} style={{
 fontSize: 10,
 fontWeight: 600,
 color: 'var(--sea)',
 background: 'rgba(30,92,130,0.08)',
 padding: '2px 8px',
 borderRadius: 8,
 }}>{s}</span>
 ))}
 </div>
 )}
 </div>
 ))}
 </div>
 <div style={{ marginTop: 16, textAlign: 'right' }}>
 <Link href={`/o/${slug}/hamnar`} style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>
 Hamnar & service på {island.name} →
 </Link>
 </div>
 </section>
 )}

 {/* Tips */}
 {island.tips.length > 0 && (
 <section style={{ marginBottom: 52 }}>
 <SectionHeader icon="💡" title="Tips från oss" />
 <div style={{
 background: 'linear-gradient(135deg, rgba(30,92,130,0.06) 0%, rgba(45,125,138,0.06) 100%)',
 borderRadius: 16,
 padding: '24px',
 border: '1px solid rgba(30,92,130,0.12)',
 }}>
 {island.tips.map((tip, i) => (
 <div key={i} style={{
 display: 'flex',
 gap: 12,
 marginBottom: i < island.tips.length - 1 ? 16 : 0,
 paddingBottom: i < island.tips.length - 1 ? 16 : 0,
 borderBottom: i < island.tips.length - 1 ? '1px solid rgba(30,92,130,0.08)' : 'none',
 }}>
 <span style={{ fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>→</span>
 <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.7 }}>{tip}</p>
 </div>
 ))}
 </div>
 </section>
 )}

 {/* FAQ — vanliga frågor (SEO Featured Snippets) */}
 <FAQSection
 items={getFaqsForIsland(island)}
 title={`Vanliga frågor om ${island.name}`}
 schemaUrl={`https://svalla.se/o/${island.slug}`}
 />

 {/* Aktiviteter — SEO cross-länkar */}
 {(() => {
 const matchingActivities = ACTIVITY_LIST.filter(a =>
 islandActivitiesForType(island, a.slug as ActivityType).length > 0
 )
 if (matchingActivities.length === 0) return null
 return (
 <section style={{ marginBottom: 36 }}>
 <SectionHeader icon="✦" title="Vad du kan göra här" />
 <div style={{
 display: 'flex', flexWrap: 'wrap', gap: 8,
 }}>
 {matchingActivities.map(a => (
 <Link
 key={a.slug}
 href={`/aktivitet/${a.slug}/${island.slug}`}
 style={{
 padding: '8px 16px', borderRadius: 999,
 background: 'var(--white)', color: 'var(--sea)',
 textDecoration: 'none', fontSize: 14, fontWeight: 600,
 border: '1px solid var(--surface-3)',
 }}
 >
 {a.name} på {island.name} →
 </Link>
 ))}
 </div>
 </section>
 )
 })()}

   {/* Utforska mer om ön — intern länkning till bad, komma-dit, med-barn */}
   <section style={{ marginBottom: 36 }}>
    <SectionHeader icon="✦" title={`Mer om ${island.name}`} />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
     <Link href={`/o/${slug}/bad`} style={{ textDecoration: 'none' }}>
      <div style={{
       background: 'var(--white)', borderRadius: 14, padding: '18px 20px',
       boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid var(--surface-3)',
       display: 'flex', gap: 14, alignItems: 'center',
       transition: 'box-shadow 0.15s',
      }}>
       <div style={{
        width: 40, height: 40, flexShrink: 0, borderRadius: 10,
        background: 'rgba(45,125,138,0.10)', color: 'var(--sea)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
       }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M2 12h20M2 12c3-4 5-4 8 0s5 4 8 0M2 18h20M2 18c3-4 5-4 8 0s5 4 8 0"/></svg>
       </div>
       <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Bad &amp; stränder</div>
        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Bästa badplatserna på {island.name}</div>
       </div>
       <span style={{ color: 'var(--sea)', fontWeight: 700 }}>→</span>
      </div>
     </Link>
     <Link href={`/o/${slug}/komma-dit`} style={{ textDecoration: 'none' }}>
      <div style={{
       background: 'var(--white)', borderRadius: 14, padding: '18px 20px',
       boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid var(--surface-3)',
       display: 'flex', gap: 14, alignItems: 'center',
       transition: 'box-shadow 0.15s',
      }}>
       <div style={{
        width: 40, height: 40, flexShrink: 0, borderRadius: 10,
        background: 'rgba(45,125,138,0.10)', color: 'var(--sea)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
       }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><path d="M12 19V5m0 0l-7 7m7-7 7 7"/></svg>
       </div>
       <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Komma dit</div>
        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Båt, färja och transport till {island.name}</div>
       </div>
       <span style={{ color: 'var(--sea)', fontWeight: 700 }}>→</span>
      </div>
     </Link>
     <Link href={`/o/${slug}/med-barn`} style={{ textDecoration: 'none' }}>
      <div style={{
       background: 'var(--white)', borderRadius: 14, padding: '18px 20px',
       boxShadow: '0 2px 10px rgba(0,0,0,0.06)', border: '1px solid var(--surface-3)',
       display: 'flex', gap: 14, alignItems: 'center',
       transition: 'box-shadow 0.15s',
      }}>
       <div style={{
        width: 40, height: 40, flexShrink: 0, borderRadius: 10,
        background: 'rgba(45,125,138,0.10)', color: 'var(--sea)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
       }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/></svg>
       </div>
       <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Med barn</div>
        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Barnvänlig guide till {island.name}</div>
       </div>
       <span style={{ color: 'var(--sea)', fontWeight: 700 }}>→</span>
      </div>
     </Link>
    </div>
   </section>

   {/* Related islands */}
 {relatedIslands.length > 0 && (
 <section style={{ marginBottom: 0 }}>
 <SectionHeader icon="" title="Besök också" />
 <div style={{
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
 gap: 12,
 }}>
 {relatedIslands.map(rel => (
 <Link key={rel.slug} href={`/o/${rel.slug}`} style={{ textDecoration: 'none' }}>
 <div style={{
 background: 'var(--white)',
 borderRadius: 14,
 padding: '18px 20px',
 boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
 display: 'flex',
 gap: 12,
 alignItems: 'center',
 transition: 'transform .15s, box-shadow .15s',
 cursor: 'pointer',
 }}>
 <div style={{
 width: 38, height: 38, flexShrink: 0,
 borderRadius: 10,
 background: 'rgba(30,92,130,0.10)',
 color: 'var(--sea)',
 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
 }}>
 <Icon name={emojiToIcon(rel.emoji)} size={20} stroke={1.8} />
 </div>
 <div>
 <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 2 }}>{rel.name}</div>
 <div style={{ fontSize: 12, color: 'var(--txt3)' }}>{rel.regionLabel}</div>
 </div>
 <span style={{ marginLeft: 'auto', color: 'var(--sea)', fontWeight: 700, fontSize: 16 }}>→</span>
 </div>
 </Link>
 ))}
 </div>
 </section>
 )}

 {/* Guider om ön — intern länkning till /guider/[slug] (220 artiklar) */}
 {guideLinks.length > 0 && (
  <section style={{ marginBottom: 36 }}>
   <SectionHeader icon="📖" title={`Guider om ${island.name}`} />
   <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 10,
   }}>
    {guideLinks.map(g => (
     <Link
      key={g.slug}
      href={`/guider/${g.slug}`}
      style={{
       display: 'flex', alignItems: 'center', gap: 12,
       padding: '14px 16px', borderRadius: 12,
       background: 'var(--white)',
       border: '1px solid var(--surface-3)',
       textDecoration: 'none',
       boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}
     >
      <span style={{flexShrink: 0}} aria-hidden><Icon name={emojiToIcon(g.emoji)} size={20} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
       <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--txt)', lineHeight: 1.35, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{g.title}</div>
       <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{g.readTime}</div>
      </div>
      <span style={{ color: 'var(--sea)', fontWeight: 700, flexShrink: 0 }}>→</span>
     </Link>
    ))}
   </div>
  </section>
 )}

 {/* Guider om ön — intern länkning till bloggartiklar */}
 {island.blogLinks && island.blogLinks.length > 0 && (
  <section style={{ marginBottom: 36 }}>
   <SectionHeader icon="📖" title={`Guider om ${island.name}`} />
   <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
    {island.blogLinks.map(link => (
     <Link
      key={link.slug}
      href={`/blogg/${link.slug}`}
      style={{
       display: 'flex', alignItems: 'center', justifyContent: 'space-between',
       padding: '14px 18px', borderRadius: 12,
       background: 'var(--white)',
       border: '1px solid var(--surface-3)',
       textDecoration: 'none',
       color: 'var(--txt)',
       fontSize: 14, fontWeight: 500,
       boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
      }}
     >
      <span>{link.title}</span>
      <span style={{ color: 'var(--sea)', fontWeight: 700, marginLeft: 12, flexShrink: 0 }}>Läs →</span>
     </Link>
    ))}
   </div>
  </section>
 )}

 {/* Forum-sektion — live trådar + CTA */}
 <section style={{ marginTop: 48, marginBottom: 0 }}>
 <div style={{
  background: 'linear-gradient(135deg, #0a1e2e 0%, #1a4a5e 100%)',
  borderRadius: 20,
  padding: '24px 20px 20px',
  position: 'relative',
  overflow: 'hidden',
 }}>
  <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

  {/* Header */}
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative', zIndex: 1 }}>
   <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(232,146,74,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#e8924a" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
     <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
    </svg>
   </div>
   <div>
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#e8924a' }}>Community</div>
    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Forum — {island.name}</div>
   </div>
   <Link
    href={`/forum/o/${island.slug}`}
    style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', whiteSpace: 'nowrap' }}
   >
    Se alla →
   </Link>
  </div>

  {/* Live trådar — visas om det finns, annars seed-prompts */}
  <div style={{ position: 'relative', zIndex: 1 }}>
   {recentThreads.length > 0 ? (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
     {recentThreads.map(t => (
      <Link
       key={t.id}
       href={`/forum/${t.category_id}/${t.id}`}
       style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '11px 14px',
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.1)',
        textDecoration: 'none',
       }}
      >
       <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
         {t.title}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
         {t.author?.username ?? 'Anonym'} · {formatForumDate(t.created_at)}
         {t.reply_count > 0 && ` · ${t.reply_count} svar`}
        </div>
       </div>
       <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M9 5.5L15.5 12L9 18.5" />
       </svg>
      </Link>
     ))}
    </div>
   ) : (
    /* Inga trådar — visa klickbara startfrågor */
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
     <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
      Inga diskussioner ännu — bli den första:
     </div>
     {[
      `Vad ska man inte missa på ${island.name}?`,
      `Bästa restaurangen på ${island.name}?`,
      `Tips för förstagångsbesökare?`,
     ].map(prompt => (
      <Link
       key={prompt}
       href={`/forum/ny-trad?island=${island.slug}&titel=${encodeURIComponent(prompt)}`}
       style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.06)',
        border: '1px dashed rgba(255,255,255,0.2)',
        borderRadius: 10,
        textDecoration: 'none',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
       }}
      >
       <Icon name="quote" size={14} stroke={2} style={{ opacity: 0.7 }} />
       <span style={{ flex: 1 }}>{prompt}</span>
       <span style={{ fontSize: 11, color: '#e8924a', fontWeight: 700, flexShrink: 0 }}>Starta →</span>
      </Link>
     ))}
    </div>
   )}

   {/* CTA-knappar */}
   <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Link
     href={`/forum/ny-trad?island=${island.slug}`}
     style={{
      flex: 1,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      padding: '11px 16px',
      background: '#e8924a',
      color: '#fff',
      borderRadius: 12,
      textDecoration: 'none',
      fontSize: 14,
      fontWeight: 700,
      boxShadow: '0 4px 14px rgba(232,146,74,0.35)',
      whiteSpace: 'nowrap',
     }}
    >
     <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z" />
     </svg>
     Starta diskussion
    </Link>
    {recentThreads.length > 0 && (
     <Link
      href={`/forum/o/${island.slug}`}
      style={{
       display: 'inline-flex', alignItems: 'center', gap: 6,
       padding: '11px 16px',
       background: 'rgba(255,255,255,0.1)',
       color: 'rgba(255,255,255,0.9)',
       borderRadius: 12,
       textDecoration: 'none',
       fontSize: 14,
       fontWeight: 600,
       border: '1px solid rgba(255,255,255,0.15)',
       whiteSpace: 'nowrap',
      }}
     >
      Alla trådar →
     </Link>
    )}
   </div>
  </div>
 </div>
 </section>

 {/* B2B CTA — passiv lead-insamling för aktörer på ön */}
 <IslandB2BCTA islandName={island.name} islandSlug={island.slug} />

 {/* E-postsignup för ön */}
 <div style={{ marginTop: 28 }}>
 <EmailSignup
 variant="card"
 source={`o-${island.slug}`}
 title={`Vill du veta mer om ${island.name}?`}
 description={`De bästa öarna hittar du inte via Google. Prenumerera och vi visar dig.`}
 />
 </div>

 {/* Inline feedbacklänk */}
 <div style={{ marginTop: 20, textAlign: 'center', paddingTop: 16, borderTop: '1px solid rgba(10,123,140,0.08)' }}>
   <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
     Hittar du information som verkar felaktig?{' '}
     <InlineFeedbackButton />
   </p>
 </div>
 </div>

 {/* ── FOOTER ──────────────────────────────────────────────── */}
 <div style={{
 background: 'var(--txt)',
 padding: '28px 24px',
 textAlign: 'center',
 }}>
 <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 10 }}>
 <SvallaLogo height={22} color="rgba(255,255,255,0.5)" />
 </Link>
 <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
 Din guide till Stockholms skärgård
 </p>
 </div>
 </div>
 )
}

// Mappa de få emojis vi använder direkt på sektion-headers till IconName.
// (Resten av appen använder emojiToIcon från lib.)
const HEADER_ICON_MAP: Record<string, import('@/components/Icon').IconName> = {
 '📖': 'mail', // Om-sektion
 '🎯': 'target', // Se & Göra
 '': 'utensils',
 '🛏': 'bed',
 '': 'map',
 '': 'anchor',
 '💡': 'star',
 '✦': 'star',
}

function SectionHeader({ icon, title }: { icon: string; title: string }) {
 const iconName = HEADER_ICON_MAP[icon] ?? 'compass'
 return (
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
 <span style={{
 display: 'inline-flex',
 width: 28, height: 28,
 borderRadius: 8,
 background: 'rgba(30,92,130,0.10)',
 color: 'var(--sea)',
 alignItems: 'center', justifyContent: 'center',
 flexShrink: 0,
 }}>
 <Icon name={iconName} size={16} stroke={1.85} />
 </span>
 <h2 style={{
 fontSize: 19,
 fontWeight: 700,
 color: 'var(--txt)',
 margin: 0,
 letterSpacing: -0.2,
 fontFamily: "'Playfair Display', Georgia, serif",
 }}>{title}</h2>
 <div style={{ flex: 1, height: 1, background: 'rgba(30,92,130,0.12)', marginLeft: 8 }} />
 </div>
 )
}
