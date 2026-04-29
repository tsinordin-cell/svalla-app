'use client'
import { useState } from 'react'
import Link from 'next/link'
import HeroAnimation, { HeroVariant } from '@/components/HeroAnimation'

const VARIANTS: { id: HeroVariant; name: string; desc: string; emoji: string }[] = [
 {
 id: 1,
 name: 'Klar sommardag',
 emoji: '☀️',
 desc: 'Klarblå nordisk himmel, friskt solljus, snabba båtar. Nuvarande känslan — energisk och inbjudande.',
 },
 {
 id: 2,
 name: 'Gyllene timmen',
 emoji: '',
 desc: 'Varm orange solnedgångsstämning, kopparfärgat vatten, mjukare rörelser. Lyxig och romantisk.',
 },
 {
 id: 3,
 name: 'Midnattssol',
 emoji: '🌒',
 desc: 'Djup indigo-lila himmel, låg blek sol precis vid horisonten. Mystisk skärgårdsnatt — unik och dramatisk.',
 },
 {
 id: 4,
 name: 'Stormig himmel',
 emoji: '⛈️',
 desc: 'Grå-grön dramatisk himmel, mörkt vatten, kraftiga vågor. Råstark skärgårdskänsla.',
 },
 {
 id: 5,
 name: 'Vinterdimma',
 emoji: '🌫️',
 desc: 'Silvergrå dimma, blek vinterljus, lugna långsamma vågor. Stilla och meditativ.',
 },
]

export default function HeroPreviewPage() {
 const [selected, setSelected] = useState<HeroVariant | null>(null)
 const [fullscreen, setFullscreen] = useState<HeroVariant | null>(null)

 if (fullscreen) {
 return (
 <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 9999 }}>
 <div style={{ position: 'relative', width: '100%', height: '100%' }}>
 <HeroAnimation variant={fullscreen} />
 {/* Label overlay */}
 <div style={{
 position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
 background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
 borderRadius: 14, padding: '12px 28px',
 color: '#fff', fontFamily: 'system-ui, sans-serif', textAlign: 'center',
 display: 'flex', gap: 16, alignItems: 'center',
 }}>
 <span style={{ fontSize: 18 }}>{VARIANTS.find(v => v.id === fullscreen)?.emoji}</span>
 <span style={{ fontWeight: 600, fontSize: 16 }}>{VARIANTS.find(v => v.id === fullscreen)?.name}</span>
 <button
 onClick={() => setFullscreen(null)}
 style={{
 marginLeft: 16, background: 'rgba(255,255,255,0.18)', border: 'none',
 borderRadius: 8, color: '#fff', padding: '6px 14px', cursor: 'pointer',
 fontSize: 13, fontWeight: 500,
 }}
 >
 ← Tillbaka
 </button>
 </div>
 </div>
 </div>
 )
 }

 return (
 <div style={{
 minHeight: '100vh',
 background: 'linear-gradient(160deg, #0a1a28 0%, #0e2238 60%, #0a1820 100%)',
 padding: '40px 20px 60px',
 fontFamily: 'system-ui, -apple-system, sans-serif',
 }}>
 {/* Header */}
 <div style={{ maxWidth: 1200, margin: '0 auto 40px', textAlign: 'center' }}>
 <p style={{ color: 'rgba(120,200,255,0.7)', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
 Hero Animation — Välj tema
 </p>
 <h1 style={{ color: '#fff', fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 700, margin: '0 0 14px', lineHeight: 1.2 }}>
 5 förslag på skärgårdsanimation
 </h1>
 <p style={{ color: 'rgba(180,220,248,0.65)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
 Samma tema — olika ljus och rörelse. Klicka på fullskärm för att se varianten som den faktiskt ser ut på startsidan.
 </p>
 </div>

 {/* Grid */}
 <div style={{
 maxWidth: 1200, margin: '0 auto',
 display: 'grid',
 gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
 gap: 24,
 }}>
 {VARIANTS.map(v => (
 <div
 key={v.id}
 onClick={() => setSelected(selected === v.id ? null : v.id)}
 style={{
 borderRadius: 18,
 overflow: 'hidden',
 border: selected === v.id
 ? '2px solid rgba(80,180,255,0.85)'
 : '2px solid rgba(255,255,255,0.08)',
 cursor: 'pointer',
 transition: 'transform 0.2s, border-color 0.2s',
 transform: selected === v.id ? 'scale(1.02)' : 'scale(1)',
 background: '#0a1828',
 boxShadow: selected === v.id
 ? '0 0 0 4px rgba(80,180,255,0.15), 0 16px 48px rgba(0,0,0,0.4)'
 : '0 8px 32px rgba(0,0,0,0.3)',
 }}
 >
 {/* Canvas preview */}
 <div style={{ position: 'relative', height: 260 }}>
 <HeroAnimation variant={v.id} />
 {/* Number badge */}
 <div style={{
 position: 'absolute', top: 12, left: 12,
 background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
 borderRadius: 20, padding: '3px 10px',
 color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700,
 letterSpacing: '0.06em',
 }}>
 #{v.id}
 </div>
 {/* Selected check */}
 {selected === v.id && (
 <div style={{
 position: 'absolute', top: 12, right: 12,
 background: 'rgba(40,160,255,0.90)', borderRadius: '50%',
 width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
 }}>
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
 <path d="M2 7l4 4 6-6" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
 </svg>
 </div>
 )}
 {/* Fullscreen button */}
 <button
 onClick={e => { e.stopPropagation(); setFullscreen(v.id) }}
 style={{
 position: 'absolute', bottom: 10, right: 10,
 background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
 border: '1px solid rgba(255,255,255,0.18)',
 borderRadius: 8, color: '#fff', padding: '5px 10px',
 cursor: 'pointer', fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5,
 }}
 >
 <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
 <path d="M3 8V3h5"/><path d="M17 8V3h-5"/><path d="M3 12v5h5"/><path d="M17 12v5h-5"/>
 </svg>
 Fullskärm
 </button>
 </div>

 {/* Info */}
 <div style={{ padding: '18px 20px 20px' }}>
 <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
 <span style={{ fontSize: 20 }}>{v.emoji}</span>
 <h2 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>{v.name}</h2>
 </div>
 <p style={{ color: 'rgba(180,215,245,0.60)', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
 {v.desc}
 </p>
 <div style={{
 marginTop: 14,
 padding: '8px 14px',
 background: selected === v.id ? 'rgba(40,160,255,0.15)' : 'rgba(255,255,255,0.05)',
 borderRadius: 8,
 fontSize: 12, fontWeight: 600,
 color: selected === v.id ? 'rgba(100,200,255,0.95)' : 'rgba(180,210,240,0.50)',
 transition: 'all 0.2s',
 textAlign: 'center',
 }}>
 {selected === v.id ? '✓ Vald' : 'Klicka för att välja'}
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Bottom CTA */}
 {selected && (
 <div style={{
 maxWidth: 1200, margin: '36px auto 0',
 background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)',
 borderRadius: 16, padding: '24px 32px',
 display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
 border: '1px solid rgba(255,255,255,0.10)',
 }}>
 <div style={{ flex: 1 }}>
 <p style={{ color: '#fff', fontWeight: 700, fontSize: 16, margin: '0 0 4px' }}>
 {VARIANTS.find(v => v.id === selected)?.emoji} Du har valt: <em style={{ fontStyle: 'normal', color: 'rgba(120,200,255,1)' }}>{VARIANTS.find(v => v.id === selected)?.name}</em>
 </p>
 <p style={{ color: 'rgba(180,215,245,0.55)', fontSize: 13, margin: 0 }}>
 Säg &quot;Aktivera variant {selected}&quot; så byter jag startsidan till detta tema direkt.
 </p>
 </div>
 <button
 onClick={() => setFullscreen(selected)}
 style={{
 background: 'rgba(40,140,220,0.85)', border: 'none',
 borderRadius: 10, color: '#fff', padding: '11px 22px',
 cursor: 'pointer', fontSize: 14, fontWeight: 600,
 whiteSpace: 'nowrap',
 }}
 >
 Se i fullskärm →
 </button>
 </div>
 )}

 {/* Back link */}
 <div style={{ textAlign: 'center', marginTop: 40 }}>
 <Link
 href="/"
 style={{ color: 'rgba(120,180,220,0.55)', fontSize: 13, textDecoration: 'none' }}
 >
 ← Tillbaka till startsidan
 </Link>
 </div>
 </div>
 )
}
