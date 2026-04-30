import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import BackButton from '@/components/BackButton'
import PlatsMapClient from './PlatsMapClient'

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

const TYPE_CONFIG: Record<string, { emoji: string; label: string; color: string }> = {
 marina: { emoji: '', label: 'Gästhamn', color: '#1e5c82' },
 anchorage: { emoji: '🔵', label: 'Naturhamn', color: '#4a7a2e' },
 nature_harbor: { emoji: '🔵', label: 'Naturhamn', color: '#4a7a2e' },
 restaurant: { emoji: '', label: 'Restaurang', color: '#c96e2a' },
 cafe: { emoji: '☕', label: 'Kafé', color: '#8b5c2a' },
 bar: { emoji: '🍺', label: 'Bar', color: '#5a3a1a' },
 fuel_station: { emoji: '⛽', label: 'Bränsle', color: '#a8381e' },
 fuel: { emoji: '⛽', label: 'Bränsle', color: '#a8381e' },
 nature: { emoji: '', label: 'Naturplats', color: '#3a6b2e' },
 harbor: { emoji: '', label: 'Hamn', color: '#1e5c82' },
}

const FACILITY_MAP: Record<string, { emoji: string; label: string }> = {
 electricity: { emoji: '', label: 'El' },
 water: { emoji: '💧', label: 'Vatten' },
 shower: { emoji: '🚿', label: 'Dusch' },
 toilet: { emoji: '🚽', label: 'Toalett' },
 fuel: { emoji: '⛽', label: 'Bränsle' },
 diesel: { emoji: '⛽', label: 'Diesel' },
 petrol: { emoji: '⛽', label: 'Bensin' },
 wifi: { emoji: '📶', label: 'WiFi' },
 restaurant: { emoji: '', label: 'Restaurang' },
 guest_dock: { emoji: '', label: 'Gästbrygga' },
 pump_out: { emoji: '🔄', label: 'Pump-out' },
 provisions: { emoji: '🛒', label: 'Proviant' },
 parking: { emoji: '🅿️', label: 'Parkering' },
 cafe: { emoji: '☕', label: 'Kafé' },
 bar: { emoji: '🍺', label: 'Bar' },
 sauna: { emoji: '🧖', label: 'Bastu' },
 anchorage: { emoji: '', label: 'Ankring' },
 laundry: { emoji: '🧺', label: 'Tvätt' },
 shop: { emoji: '🏪', label: 'Butik' },
}

const BEST_FOR_MAP: Record<string, { emoji: string; label: string }> = {
 boaters: { emoji: '', label: 'Båtfolk' },
 family: { emoji: '👨‍👩‍👧', label: 'Familjer' },
 couples: { emoji: '❤️', label: 'Par' },
 nature_lovers: { emoji: '', label: 'Naturälskare' },
 photographers: { emoji: '📷', label: 'Fotografer' },
 friends: { emoji: '👥', label: 'Vänner' },
 tourists: { emoji: '️', label: 'Turister' },
 day_trip: { emoji: '☀️', label: 'Dagstur' },
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
 <span>{typeInfo.emoji}</span>
 <span>{typeInfo.label}</span>
 </div>
 )}
 <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: '0 0 4px', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
 {p.name}
 </h1>
 {subtitle && (
 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', margin: 0 }}>
 📍 {subtitle}
 </p>
 )}
 </div>
 </div>

 <div style={{ maxWidth: 520, margin: '0 auto', padding: '20px 16px' }}>

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
 fontSize: 22, boxShadow: 'var(--shadow-xs)',
 }}>
 {fac.emoji}
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
 <span style={{ fontSize: 22, flexShrink: 0 }}> </span>
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
 📞 {p.contact_phone}
 </a>
 )}
 {p.website && (
 <a href={p.website} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--teal)')}>
 🌐 Webbplats
 </a>
 )}
 {p.booking_url && (
 <a href={p.booking_url} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--acc)')}>
 📅 Boka
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
 <span style={{ fontSize: 22 }}>🌐</span>
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
 <span style={{ fontSize: 22 }}>🌐</span>
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
 <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>🕐</span>
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
 📞 {p.contact_phone}
 </a>
 )}
 {p.website && (
 <a href={p.website} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--teal)')}>
 🌐 Webbplats
 </a>
 )}
 {p.booking_url && (
 <a href={p.booking_url} target="_blank" rel="noopener noreferrer" style={ctaStyle('var(--acc)')}>
 📅 Boka bord
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
 <span style={{ fontSize: 16 }}>📅</span>
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
 <span style={{ fontSize: 20 }}>{b.emoji}</span>
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
