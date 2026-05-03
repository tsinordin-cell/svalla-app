import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import BackButton from '@/components/BackButton'
import Icon from '@/components/Icon'
import PlatsMapClient from './PlatsMapClient'
import SaveButton from './SaveButton'
import PlaceRecentVisitors from '@/components/PlaceRecentVisitors'

type Plats = {
 id: string
 name: string
 island: string | null
 latitude: number
 longitude: number
 description: string | null
 opening_hours: string | null
 menu: string | null
 images: string[] | null
 image_url: string | null
 tags: string[] | null
 core_experience: string | null
 type: string | null
 slug: string
 archipelago_region: string | null
 categories: string[] | null
 best_for: string[] | null
 facilities: string[] | null
 seasonality: string | null
 source_confidence: string | null
 contact_phone: string | null
 website: string | null
 booking_url: string | null
}

const TYPE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
 marina: { icon: 'anchor', label: 'Gästhamn', color: '#1e5c82' },
 anchorage: { icon: 'pin', label: 'Naturhamn', color: '#4a7a2e' },
 nature_harbor: { icon: 'pin', label: 'Naturhamn', color: '#4a7a2e' },
 restaurant: { icon: 'utensils', label: 'Restaurang', color: '#c96e2a' },
 cafe: { icon: 'coffee', label: 'Kafé', color: '#8b5c2a' },
 bar: { icon: 'utensils', label: 'Bar', color: '#5a3a1a' },
 fuel_station: { icon: 'fuel', label: 'Bränsle', color: '#a8381e' },
 fuel: { icon: 'fuel', label: 'Bränsle', color: '#a8381e' },
 nature: { icon: 'leaf', label: 'Naturplats', color: '#3a6b2e' },
 harbor: { icon: 'anchor', label: 'Hamn', color: '#1e5c82' },
}

const FACILITY_MAP: Record<string, { icon: string; label: string }> = {
 electricity: { icon: 'zap', label: 'El' },
 water: { icon: 'water', label: 'Vatten' },
 shower: { icon: 'shower', label: 'Dusch' },
 toilet: { icon: 'toilet', label: 'Toalett' },
 fuel: { icon: 'fuel', label: 'Bränsle' },
 diesel: { icon: 'fuel', label: 'Diesel' },
 petrol: { icon: 'fuel', label: 'Bensin' },
 wifi: { icon: 'wifi', label: 'WiFi' },
 restaurant: { icon: 'utensils', label: 'Restaurang' },
 guest_dock: { icon: 'anchor', label: 'Gästbrygga' },
 pump_out: { icon: 'arrowRight', label: 'Pump-out' },
 provisions: { icon: 'shoppingBag', label: 'Proviant' },
 parking: { icon: 'parking', label: 'Parkering' },
 cafe: { icon: 'coffee', label: 'Kafé' },
 bar: { icon: 'utensils', label: 'Bar' },
 sauna: { icon: 'waves', label: 'Bastu' },
 anchorage: { icon: 'pin', label: 'Ankring' },
 laundry: { icon: 'waves', label: 'Tvätt' },
 shop: { icon: 'shoppingBag', label: 'Butik' },
}

const BEST_FOR_MAP: Record<string, { icon: string; label: string }> = {
 boaters: { icon: 'sailboat', label: 'Båtfolk' },
 family: { icon: 'users', label: 'Familjer' },
 couples: { icon: 'heart', label: 'Par' },
 nature_lovers: { icon: 'leaf', label: 'Naturälskare' },
 photographers: { icon: 'camera', label: 'Fotografer' },
 friends: { icon: 'users', label: 'Vänner' },
 tourists: { icon: 'globe', label: 'Turister' },
 day_trip: { icon: 'sun', label: 'Dagstur' },
}

function isMarina(type: string | null) {
 return type === 'marina' || type === 'harbor'
}
function isEatery(type: string | null) {
 return type === 'restaurant' || type === 'cafe' || type === 'bar'
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
 const { slug } = await params
 const supabase = await createServerSupabaseClient()
 const { data } = await supabase
 .from('restaurants')
 .select('name, core_experience, description, image_url')
 .eq('slug', slug)
 .single()

 if (!data) return { title: 'Plats – Svalla' }

 const desc = data.core_experience || (data.description?.slice(0, 155) ?? '')
 return {
 title: `${data.name} – Svalla`,
 description: desc,
 openGraph: {
 title: `${data.name} – Svalla`,
 description: desc,
 images: data.image_url ? [data.image_url] : [],
 },
 }
}

export default async function PlatsPage({ params }: { params: Promise<{ slug: string }> }) {
 const { slug } = await params
 const supabase = await createServerSupabaseClient()

 const { data, error } = await supabase
 .from('restaurants')
 .select('*')
 .eq('slug', slug)
 .single()

 if (error || !data) notFound()

 const p = data as Plats

 const heroImage = p.images && p.images.length > 0 ? p.images[0] : p.image_url
 const typeInfo = p.type ? (TYPE_CONFIG[p.type] ?? null) : null
 const facilities = (p.facilities ?? []).filter(f => FACILITY_MAP[f])
 const tags = p.tags ?? []
 const bestFor = p.best_for ?? []
 const subtitle = [p.island, p.archipelago_region ? regionLabel(p.archipelago_region) : null].filter(Boolean).join(' · ')

 return (
 <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 24px)' }}>

 {/* ── Hero ── */}
 <div style={{ position: 'relative', height: 300, background: 'var(--sea)', overflow: 'hidden' }}>
 {heroImage && (
 // eslint-disable-next-line @next/next/no-img-element
 <img
 src={heroImage}
 alt={p.name}
 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
 />
 )}
 <div style={{
 position: 'absolute', inset: 0,
 background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, rgba(0,0,0,0.62) 100%)',
 }} />

 <BackButton fallback="/upptack" />

 <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 16px 20px', zIndex: 5 }}>
 {typeInfo && (
 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 5,
 background: typeInfo.color, color: '#fff',
 fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
 padding: '4px 10px', borderRadius: 20, marginBottom: 8,
 boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
 }}>
 <Icon name={typeInfo.icon as any} size={14} style={{ color: '#fff' }} aria-hidden />
 <span>{typeInfo.label}</span>
 </div>
 )}
 <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 4px', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
 {p.name}
 </h1>
 {subtitle && (
 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
 <Icon name="pin" size={14} style={{ color: 'rgba(255,255,255,0.82)' }} aria-hidden />
 {subtitle}
 </p>
 )}
 </div>
 </div>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '20px 16px' }}>

 {/* Action-row: spara plats */}
 <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
 <SaveButton
 slug={p.slug}
 name={p.name}
 type={p.type}
 lat={p.latitude}
 lng={p.longitude}
 imageUrl={p.image_url ?? p.images?.[0] ?? null}
 island={p.island}
 />
 </div>

 {/* Senast här — peer-närvaro från trip_highlights */}
 <PlaceRecentVisitors placeSlug={p.slug} placeName={p.name} />

 {/* Core experience */}
 {p.core_experience && (
 <p style={{
 fontSize: 15, fontStyle: 'italic', color: 'var(--txt2)', lineHeight: 1.65,
 margin: '0 0 22px', paddingLeft: 14, borderLeft: '3px solid var(--teal)',
 }}>
 &ldquo;{p.core_experience}&rdquo;
 </p>
 )}

 {/* Facilities */}
 {facilities.length > 0 && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Faciliteter</SectionTitle>
 <div style={{
 display: 'flex', gap: 14,
 overflowX: 'auto', WebkitOverflowScrolling: 'touch',
 scrollbarWidth: 'none', msOverflowStyle: 'none',
 padding: '4px 0 8px',
 }}>
 {facilities.map(f => {
 const fac = FACILITY_MAP[f]!
 return (
 <div key={f} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
 <div style={{
 width: 48, height: 48, borderRadius: 14,
 background: 'var(--surface-1)', border: '1px solid var(--hairline)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 boxShadow: 'var(--shadow-xs)',
 }}>
 <Icon name={fac.icon as any} size={22} style={{ color: 'var(--txt)' }} aria-label={fac.label} />
 </div>
 <span style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 500, textAlign: 'center', lineHeight: 1.2, maxWidth: 56 }}>
 {fac.label}
 </span>
 </div>
 )
 })}
 </div>
 </div>
 )}

 {/* ── Marina: Övernattningspriser ── */}
 {isMarina(p.type) && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Priser</SectionTitle>
 <div style={{
 background: 'var(--surface-1)', borderRadius: 'var(--radius-inner)',
 border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-xs)',
 padding: '16px',
 }}>
 <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
 <Icon name="anchor" size={22} style={{ color: 'var(--txt)', flexShrink: 0 }} aria-hidden />
 <div>
 <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', margin: '0 0 4px' }}>
 Priser bekräftas direkt med hamnen
 </p>
 <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 12px', lineHeight: 1.5 }}>
 Gästhamnspriser varierar per säsong och båtstorlek. Kontakta hamnen för aktuella tariffer.
 </p>
 {(p.contact_phone || p.website || p.booking_url) ? (
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
 {p.contact_phone && (
 <a href={`tel:${p.contact_phone}`} style={ctaStyle('#1e5c82')}>
 <Icon name="phone" size={14} style={{ color: '#fff' }} aria-hidden />
 {p.contact_phone}
 </a>
 )}
 {p.website && (
 <a href={p.website} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--teal)')}>
 <Icon name="globe" size={14} style={{ color: '#fff' }} aria-hidden />
 Webbplats
 </a>
 )}
 {p.booking_url && (
 <a href={p.booking_url} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--acc)')}>
 <Icon name="calendar" size={14} style={{ color: '#fff' }} aria-hidden />
 Boka
 </a>
 )}
 </div>
 ) : (
 <p style={{ fontSize: 12, color: 'var(--txt3)', margin: 0, fontStyle: 'italic' }}>
 Ingen kontaktinfo tillagd ännu.
 </p>
 )}
 </div>
 </div>
 </div>
 </div>
 )}

 {/* ── Eatery: Meny ── */}
 {isEatery(p.type) && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Meny</SectionTitle>
 {p.website ? (
 <a href={p.website} target="_blank" rel="noopener noreferrer" style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--surface-1)', borderRadius: 'var(--radius-inner)',
 border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-xs)',
 padding: '14px 16px', textDecoration: 'none',
 }}>
 <Icon name="globe" size={22} style={{ color: 'var(--txt)' }} aria-hidden />
 <div style={{ flex: 1 }}>
 <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', margin: '0 0 2px' }}>
 Se meny på hemsidan
 </p>
 <p style={{ fontSize: 12, color: 'var(--txt3)', margin: 0 }}>
 Öppnar restaurangens webbplats
 </p>
 </div>
 <span style={{ fontSize: 18, color: 'var(--txt3)' }}>›</span>
 </a>
 ) : (
 <div style={{
 display: 'flex', alignItems: 'center', gap: 12,
 background: 'var(--surface-1)', borderRadius: 'var(--radius-inner)',
 border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-xs)',
 padding: '14px 16px',
 }}>
 <Icon name="globe" size={22} style={{ color: 'var(--txt)' }} aria-hidden />
 <p style={{ fontSize: 13, color: 'var(--txt3)', fontStyle: 'italic', margin: 0 }}>
 Meny finns på restaurangens hemsida – länk saknas ännu.
 </p>
 </div>
 )}
 </div>
 )}

 {/* Öppettider */}
 {p.opening_hours && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Öppettider</SectionTitle>
 <div style={{
 background: 'var(--surface-1)', borderRadius: 'var(--radius-inner)',
 padding: '12px 14px', border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-xs)',
 }}>
 <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
 <Icon name="clock" size={18} style={{ color: 'var(--txt2)', flexShrink: 0, marginTop: 1 }} aria-hidden />
 <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
 {p.opening_hours}
 </p>
 </div>
 {isEatery(p.type) && (
 <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '10px 0 0', fontStyle: 'italic', paddingLeft: 28 }}>
 Kontrollera aktuella tider direkt med stället.
 </p>
 )}
 </div>
 </div>
 )}

 {/* Kontakt (restauranger/kaféer) */}
 {isEatery(p.type) && (p.contact_phone || p.website || p.booking_url) && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Kontakt & Bokning</SectionTitle>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
 {p.contact_phone && (
 <a href={`tel:${p.contact_phone}`} style={ctaStyle('#1e5c82')}>
 <Icon name="phone" size={14} style={{ color: '#fff' }} aria-hidden />
 {p.contact_phone}
 </a>
 )}
 {p.website && (
 <a href={p.website} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--teal)')}>
 <Icon name="globe" size={14} style={{ color: '#fff' }} aria-hidden />
 Webbplats
 </a>
 )}
 {p.booking_url && (
 <a href={p.booking_url} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--acc)')}>
 <Icon name="calendar" size={14} style={{ color: '#fff' }} aria-hidden />
 Boka bord
 </a>
 )}
 </div>
 </div>
 )}

 {/* Beskrivning */}
 {p.description && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Om platsen</SectionTitle>
 <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
 {p.description}
 </p>
 </div>
 )}

 {/* Säsong */}
 {p.seasonality && p.seasonality !== 'year_round' && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Säsong</SectionTitle>
 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 8,
 background: 'var(--amber-50)', borderRadius: 12,
 padding: '8px 14px', border: '1px solid rgba(201,110,42,0.2)',
 }}>
 <Icon name="calendar" size={16} style={{ color: 'var(--amber)' }} aria-hidden />
 <span style={{ fontSize: 13, color: 'var(--amber)', fontWeight: 600 }}>
 {seasonLabel(p.seasonality)}
 </span>
 </div>
 </div>
 )}

 {/* Karta */}
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Karta</SectionTitle>
 <PlatsMapClient lat={p.latitude} lng={p.longitude} name={p.name} />
 </div>

 {/* Tags */}
 {tags.length > 0 && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Taggar</SectionTitle>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
 {tags.map(tag => (
 <span key={tag} style={{
 fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 20,
 background: 'rgba(10,123,140,0.08)', color: 'var(--teal)',
 border: '1px solid rgba(10,123,140,0.15)',
 }}>
 {tag}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Passar för */}
 {bestFor.length > 0 && (
 <div style={{ marginBottom: 22 }}>
 <SectionTitle>Passar för</SectionTitle>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
 {bestFor.map(key => {
 const b = BEST_FOR_MAP[key]
 if (!b) return null
 return (
 <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
 <Icon name={b.icon as any} size={20} style={{ color: 'var(--txt2)' }} aria-label={b.label} />
 <span style={{ fontSize: 13, color: 'var(--txt2)', fontWeight: 500 }}>{b.label}</span>
 </div>
 )
 })}
 </div>
 </div>
 )}

 </div>
 </div>
 )
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function ctaStyle(bg: string): React.CSSProperties {
 return {
 display: 'inline-flex', alignItems: 'center', gap: 6,
 padding: '9px 14px', borderRadius: 22,
 background: bg, color: '#fff',
 fontSize: 13, fontWeight: 600, textDecoration: 'none',
 boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
 }
}

function regionLabel(r: string): string {
 const map: Record<string, string> = {
 inner: 'Inre skärgården',
 north: 'Norra skärgården',
 south: 'Södra skärgården',
 outer: 'Yttre skärgården',
 gotland: 'Gotland',
 blekinge: 'Blekinge',
 bohuslan: 'Bohuslän',
 west: 'Västkusten',
 }
 return map[r] ?? r
}

function seasonLabel(s: string): string {
 const map: Record<string, string> = {
 summer_only: 'Öppet sommarsäsong',
 spring_fall: 'Öppet vår och höst',
 closed_winter: 'Stängt vintertid',
 }
 return map[s] ?? s
}

function SectionTitle({ children }: { children: ReactNode }) {
 return (
 <h2 style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 10px' }}>
 {children}
 </h2>
 )
}
