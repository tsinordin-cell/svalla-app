'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { revalidateTrip } from '@/lib/revalidate-trip'
import { toast } from '@/components/Toast'
import { forvaldStil, stil as stilFor, tillgangligaStilar, BILD_VERSION, type StilId } from '@/lib/dela-klistermarken'

interface Props {
 tripId: string
 title: string
 url: string
 variant?: 'icon' | 'pill'
 hasPhoto?: boolean
 hasRoute?: boolean
 /** Finns distans, tid eller fart att visa? Annars inget Tal-klistermärke (2026-10-26). */
 hasStats?: boolean
}

// Detect Android
function isAndroid() {
 if (typeof navigator === 'undefined') return false
 return /Android/.test(navigator.userAgent)
}

// Rutig bakgrund bakom genomskinliga klistermärken, som i bildprogram.
const RUTIG = 'repeating-conic-gradient(rgba(255,255,255,0.18) 0% 25%, rgba(255,255,255,0.06) 0% 50%) 0 0 / 16px 16px'

export default function TripShareModal({ tripId, title, url, variant = 'icon', hasPhoto = true, hasRoute = false, hasStats = true }: Props) {
 const [open, setOpen] = useState(false)
 const [loading, setLoading] = useState(false)
 const [step, setStep] = useState<'main' | 'saved'>('main')
 const [styleMode, setStyleMode] = useState<StilId>(forvaldStil({ harBild: hasPhoto, harRutt: hasRoute, harTal: hasStats }))
 // Mallar vars bild inte gick att hämta (t.ex. delsträckor för någon som inte äger turen) göms.
 const [dolda, setDolda] = useState<StilId[]>([])
 const [laddade, setLaddade] = useState<StilId[]>([])
 const mallar = tillgangligaStilar({ harBild: hasPhoto, harRutt: hasRoute, agare: true, harTal: hasStats }).filter(m => !dolda.includes(m.id))
 const mall = mallar.find(m => m.id === styleMode) ?? stilFor(styleMode)
 const klister = mall.klistermarke

 const cardSrc = `/api/og/share/tur/${tripId}?style=${styleMode}&v=${BILD_VERSION}`
 // Kort kommer som JPEG, klistermärken som PNG (genomskinliga); filnamnet följer med.
 const filnamn = `svalla-${styleMode}.${klister ? 'png' : 'jpg'}`
 const filtyp = klister ? 'image/png' : 'image/jpeg'

 // Falttest 19/8 (Tom): att dela en PRIVAT tur gav mottagaren 404
 // ("Borttappad till havs"). #179 fixade DM-modalen (ShareTripModal) men
 // DENNA modal - den man delar till Instagram/WhatsApp fran - hade samma
 // hal: bild-delning funkar (agaren hamtar bilden sjalv), men lanken i
 // "Dela"/"WhatsApp"/"Kopiera lank" 404:ar for alla utom agaren.
 // Hamtas forst nar modalen oppnas (triggern ligger pa varje TripCard).
 const supabase = useRef(createClient()).current
 const [visibility, setVisibility] = useState<string | null>(null)
 useEffect(() => {
 if (!open) return
 let cancel = false
 supabase.from('trips').select('visibility').eq('id', tripId).single()
 .then(({ data }) => { if (!cancel && data) setVisibility(data.visibility) })
 return () => { cancel = true }
 }, [supabase, tripId, open])
 async function makePublic() {
 const { error } = await supabase.from('trips')
 .update({ visibility: 'public' }).eq('id', tripId)
 if (error) { toast('Kunde inte ändra synligheten.', 'error'); return }
 setVisibility('public')
 void revalidateTrip(tripId)
 toast('Turen är nu synlig för alla.', 'success')
 }


 function handleOpen() {
 setStep('main')
 setOpen(true)
 }

 async function saveImage(): Promise<Blob | null> {
 try {
 const res = await fetch(cardSrc)
 if (!res.ok) throw new Error('fetch failed')
 return await res.blob()
 } catch {
 toast('Kunde inte hämta bilden. Försök igen.', 'error')
 return null
 }
 }

 async function shareInstagram() {
 setLoading(true)
 const blob = await saveImage()
 if (!blob) { setLoading(false); return }

 const file = new File([blob], filnamn, { type: filtyp })

 // iOS + Android: native share sheet via Web Share API with file
 // iOS 15+: opens share sheet → Instagram → opens Stories directly
 // Android: same — user picks Instagram from sheet
 if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
 try {
 await navigator.share({ files: [file], title: `${title} – Svalla` })
 setLoading(false)
 return
 } catch (e: unknown) {
 if (e instanceof Error && e.name !== 'AbortError') {
 // Share API failed — fall through to download fallback
 } else {
 // User cancelled — just close
 setLoading(false)
 return
 }
 }
 }

 // Fallback: save to device + show guide (older browsers / desktop)
 const a = document.createElement('a')
 a.href = URL.createObjectURL(blob)
 a.download = filnamn
 a.click()
 URL.revokeObjectURL(a.href)
 setLoading(false)
 setStep('saved')
 }

 async function shareGeneral() {
 setLoading(true)
 const blob = await saveImage()
 if (!blob) { setLoading(false); return }
 const file = new File([blob], filnamn, { type: filtyp })
 try {
 if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
 await navigator.share({ files: [file], title: `${title} – Svalla`, url, text: `Kolla min tur till ${title} på Svalla! ` })
 } else if (typeof navigator !== 'undefined' && navigator.share) {
 await navigator.share({ title: `${title} – Svalla`, url, text: `Kolla min tur till ${title} på Svalla! ` })
 } else {
 const a = document.createElement('a')
 a.href = URL.createObjectURL(blob)
 a.download = filnamn
 a.click()
 URL.revokeObjectURL(a.href)
 toast('Story-bild sparad!')
 }
 } catch (e: unknown) {
 if (e instanceof Error && e.name !== 'AbortError') {
 toast('Delning misslyckades. Försök igen.', 'error')
 }
 } finally {
 setLoading(false)
 }
 }

 function shareWhatsApp() {
 const text = `Kolla min tur till ${title} på Svalla! \n${url}`
 window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
 }

 async function downloadImage() {
 const blob = await saveImage()
 if (!blob) return
 const a = document.createElement('a')
 a.href = URL.createObjectURL(blob)
 a.download = filnamn
 a.click()
 URL.revokeObjectURL(a.href)
 toast(klister ? 'Klistermärket är sparat.' : 'Bild sparad!')
 }

 // Kopiera bilden som PNG till urklipp (2026-10-26). Safari kräver att ClipboardItem
 // skapas i själva klickhanteraren, med ett löfte om datan, inte efter await.
 function copyImage() {
 try {
 if (typeof ClipboardItem === 'undefined' || !navigator.clipboard?.write) throw new Error('stöds inte')
 // Urklipp tar bara PNG. Kort levereras som JPEG, så de ritas om till PNG i en canvas först.
 const item = new ClipboardItem({
 'image/png': fetch(cardSrc).then(r => { if (!r.ok) throw new Error('fetch'); return r.blob() }).then(somPng),
 })
 navigator.clipboard.write([item])
 .then(() => toast(klister ? 'Klistermärket är kopierat. Klistra in det i din story.' : 'Bilden är kopierad.'))
 .catch(() => toast('Kunde inte kopiera. Spara bilden i stället.', 'error'))
 } catch {
 toast('Kopiering av bilder stöds inte här. Spara bilden i stället.', 'error')
 }
 }

 /** JPEG → PNG via canvas (urklipp accepterar bara PNG). PNG släpps igenom orört. */
 async function somPng(blob: Blob): Promise<Blob> {
 if (blob.type === 'image/png') return blob
 const bitmap = await createImageBitmap(blob)
 const canvas = document.createElement('canvas')
 canvas.width = bitmap.width; canvas.height = bitmap.height
 canvas.getContext('2d')!.drawImage(bitmap, 0, 0)
 return new Promise((resolve, reject) => canvas.toBlob(b => b ? resolve(b) : reject(new Error('png')), 'image/png'))
 }

 async function copyLink() {
 try {
 await navigator.clipboard.writeText(url)
 toast('Länk kopierad!')
 setOpen(false)
 } catch {
 toast('Kunde inte kopiera länken.', 'error')
 }
 }

 // ── Trigger ──────────────────────────────────────────────────────
 const trigger = variant === 'pill' ? (
 <button onClick={handleOpen} className="press-feedback" aria-label="Dela tur" style={{
 display: 'flex', alignItems: 'center', gap: 6,
 padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
 background: 'var(--grad-sea)', color: '#fff', fontSize: 12, fontWeight: 700,
 WebkitTapHighlightColor: 'transparent', flexShrink: 0,
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2} style={{ width: 15, height: 15 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
 </svg>
 Dela
 </button>
 ) : (
 <button onClick={handleOpen} className="press-feedback" aria-label="Dela tur" style={{
 width: 38, height: 38, borderRadius: '50%',
 background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
 border: 'none', cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
 }}>
 <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} style={{ width: 17, height: 17 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
 </svg>
 </button>
 )

 return (
 <>
 {trigger}

 {open && (
 <div role="dialog" aria-modal="true" aria-label="Dela tur" style={{
 position: 'fixed', inset: 0, zIndex: 1200,
 display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
 }}>
 {/* Backdrop */}
 <div onClick={() => setOpen(false)} style={{
 position: 'absolute', inset: 0,
 background: 'rgba(0,0,0,0.75)',
 backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
 }} />

 {/* Sheet */}
 <div style={{
 position: 'relative', zIndex: 1,
 background: 'var(--bg)',
 borderRadius: '28px 28px 0 0',
 padding: '0 0 calc(env(safe-area-inset-bottom, 0px) + 28px)',
 overflowY: 'auto',
 maxHeight: 'calc(92vh - env(safe-area-inset-bottom, 0px))',
 }}>

 {visibility === 'private' && (
 <div style={{
 margin: '12px 16px 0', padding: '10px 14px', borderRadius: 12,
 background: 'rgba(201,110,42,0.12)', border: '1px solid rgba(201,110,42,0.4)',
 fontSize: 13, color: 'var(--txt)', display: 'flex',
 alignItems: 'center', gap: 10, justifyContent: 'space-between',
 }}>
 <span>Turen är privat — länken visar 404 för alla utom dig. Bilden går att dela ändå.</span>
 <button type="button" onClick={makePublic} style={{
 flexShrink: 0, padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
 background: 'var(--sea-knapp)', color: '#fff', border: 'none',
 fontSize: 12.5, fontWeight: 700,
 }}>Gör synlig</button>
 </div>
 )}

 {/* ── MAIN VIEW ── */}
 {step === 'main' && (
 <>
 {/* Hero — dark background, large centered card */}
 <div style={{
 background: 'linear-gradient(170deg, #0c2030 0%, #071420 100%)',
 padding: '12px 0 18px',
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 gap: 12,
 position: 'relative',
 overflow: 'hidden',
 }}>
 {/* Handle */}
 <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', alignSelf: 'center' }} />

 {/* Ambient glow */}
 <div style={{
 position: 'absolute', inset: 0,
 background: 'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(188,24,136,0.10) 0%, transparent 70%)',
 pointerEvents: 'none',
 }} />

 {/* Mallar (2026-10-26): stora kort att bläddra mellan, som i Stravas delning. Tryck väljer. */}
 <div
 style={{
 display: 'flex', gap: 14, overflowX: 'auto', width: '100%', padding: '6px 24px 10px',
 scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch',
 position: 'relative', zIndex: 1, boxSizing: 'border-box',
 }}
 >
 {mallar.map(m => {
 const vald = styleMode === m.id
 const bredd = m.klistermarke ? 190 : 150
 return (
 <button
 key={m.id}
 onClick={e => { setStyleMode(m.id); e.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }) }}
 aria-pressed={vald}
 aria-label={m.namn}
 style={{
 flexShrink: 0, width: bredd, padding: 0, border: 'none', background: 'transparent', cursor: 'pointer',
 display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, scrollSnapAlign: 'center',
 opacity: vald ? 1 : 0.72, transition: 'opacity 0.2s',
 }}
 >
 <div style={{
 width: bredd, height: Math.round(bredd * m.hojd / m.bredd), borderRadius: 18, overflow: 'hidden',
 background: m.klistermarke ? RUTIG : 'rgba(255,255,255,0.06)',
 animation: laddade.includes(m.id) ? undefined : 'pulse 1.5s ease-in-out infinite',
 boxShadow: vald ? '0 0 0 2.5px #fff, 0 16px 40px rgba(0,0,0,0.55)' : '0 0 0 1px rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.45)',
 display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
 }}>
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img
 src={`/api/og/share/tur/${tripId}?style=${m.id}&v=${BILD_VERSION}`}
 alt={m.namn}
 loading="lazy"
 onLoad={() => setLaddade(l => l.includes(m.id) ? l : [...l, m.id])}
 onError={() => setDolda(d => d.includes(m.id) ? d : [...d, m.id])}
 style={{ width: '100%', height: '100%', objectFit: m.klistermarke ? 'contain' : 'cover', display: 'block' }}
 />
 {m.klistermarke && (
 <div style={{
 position: 'absolute', bottom: 10, right: 10, padding: '3px 8px', borderRadius: 999,
 background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.85)', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.5px',
 }}>KLISTERMÄRKE</div>
 )}
 </div>
 <div style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '0.2px', color: vald ? '#fff' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' }}>{m.namn}</div>
 </button>
 )
 })}
 </div>

 {/* PRODUKTREGEL: 9:16 är kortets bildformat (bredd:höjd, 1080×1920), inget klockslag. */}
 <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500, letterSpacing: '0.2px', textAlign: 'center', padding: '0 12px' }}>
 {klister ? `Klistermärke med genomskinlig bakgrund · ${mall.beskrivning}` : 'Story-bild · 9:16'}
 </div>
 </div>

 {/* Action buttons */}
 <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

 {/* Instagram — primary */}
 <button
 onClick={shareInstagram}
 disabled={loading}
 className="press-feedback"
 style={{
 width: '100%', padding: '16px 0', borderRadius: 16, border: 'none',
 background: 'linear-gradient(90deg, #f09433 0%, #e6683c 20%, #dc2743 45%, #cc2366 75%, #bc1888 100%)',
 color: '#fff', fontSize: 16, fontWeight: 700,
 cursor: loading ? 'default' : 'pointer',
 opacity: loading ? 0.75 : 1,
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
 boxShadow: loading ? 'none' : '0 6px 24px rgba(188,24,136,0.40)',
 transition: 'opacity 0.15s, box-shadow 0.15s',
 letterSpacing: '-0.2px',
 }}
 >
 {loading ? (
 <>
 <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin .7s linear infinite', display: 'inline-block', flexShrink: 0 }} />
 Förbereder bild…
 </>
 ) : (
 <>
 <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, flexShrink: 0 }}>
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
 </svg>
 {klister ? 'Dela klistermärket' : 'Dela som Instagram Story'}
 </>
 )}
 </button>

 {klister && (
 <div style={{ fontSize: 12.5, lineHeight: 1.45, color: 'var(--txt2)', padding: '0 4px' }}>
 Klistermärket läggs ovanpå din egen bild: spara eller kopiera det, öppna en ny story i Instagram med din bild och lägg till klistermärket.
 </div>
 )}

 {/* Secondary row: WhatsApp + Copy + Native share */}
 <div style={{ display: 'flex', gap: 10 }}>
 <button
 onClick={shareWhatsApp}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14,
 background: 'rgba(37,211,102,0.10)',
 border: '1.5px solid rgba(37,211,102,0.22)',
 color: '#1aab4a', fontSize: 13, fontWeight: 700, cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
 }}
 >
 <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 15, height: 15, flexShrink: 0 }}>
 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
 </svg>
 WhatsApp
 </button>

 <button
 onClick={copyLink}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14,
 background: 'rgba(10,123,140,0.08)',
 border: '1.5px solid rgba(10,123,140,0.15)',
 color: 'var(--sea)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 14, height: 14 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
 </svg>
 Länk
 </button>

 <button
 onClick={copyImage}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14,
 background: 'rgba(10,123,140,0.08)',
 border: '1.5px solid rgba(10,123,140,0.15)',
 color: 'var(--sea)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 14, height: 14, flexShrink: 0 }}>
 <rect x="9" y="9" width="11" height="11" rx="2" />
 <path strokeLinecap="round" strokeLinejoin="round" d="M5 15V5a2 2 0 012-2h10" />
 </svg>
 Kopiera
 </button>

 <button
 onClick={shareGeneral}
 disabled={loading}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14,
 background: 'rgba(10,123,140,0.08)',
 border: '1.5px solid rgba(10,123,140,0.15)',
 color: 'var(--sea)', fontSize: 13, fontWeight: 700,
 cursor: loading ? 'default' : 'pointer',
 opacity: loading ? 0.7 : 1,
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 14, height: 14, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
 </svg>
 Dela
 </button>
 </div>

 {/* Download — subtle text link */}
 <button
 onClick={downloadImage}
 className="press-feedback"
 style={{
 background: 'none', border: 'none', cursor: 'pointer',
 fontSize: 12, color: 'var(--txt3)', fontWeight: 500,
 padding: '2px 0',
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 12, height: 12 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
 </svg>
 {klister ? 'Spara klistermärket' : 'Ladda ner bild'}
 </button>

 <button onClick={() => setOpen(false)} style={{
 background: 'none', border: 'none', cursor: 'pointer',
 fontSize: 14, color: 'var(--txt3)', fontWeight: 500,
 padding: '6px 0 0',
 }}>
 Stäng
 </button>
 </div>
 </>
 )}

 {/* ── SAVED VIEW ── */}
 {step === 'saved' && (
 <>
 {/* Success header */}
 <div style={{
 background: 'linear-gradient(160deg, #0a1e2e 0%, #071420 100%)',
 padding: '28px 24px 32px',
 display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
 }}>
 <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />

 {/* Instagram logo in gradient ring */}
 <div style={{
 width: 68, height: 68, borderRadius: '50%',
 background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 boxShadow: '0 8px 28px rgba(188,24,136,0.45)',
 }}>
 <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 34, height: 34 }}>
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
 </svg>
 </div>

 <div style={{ textAlign: 'center' }}>
 <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Bild sparad!</div>
 <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Öppna Instagram och lägg till i din Story</div>
 </div>
 </div>

 {/* Action buttons */}
 <div style={{ padding: '20px 20px 0' }}>

 {/* Open Instagram CTA */}
 <a
 href="instagram://camera"
 className="press-feedback"
 style={{
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
 width: '100%', padding: '16px 0', borderRadius: 16,
 background: 'linear-gradient(90deg, #f09433 0%, #e6683c 20%, #dc2743 45%, #cc2366 75%, #bc1888 100%)',
 color: '#fff', fontSize: 16, fontWeight: 700, textDecoration: 'none',
 boxShadow: '0 6px 24px rgba(188,24,136,0.40)',
 letterSpacing: '-0.2px',
 }}
 >
 <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, flexShrink: 0 }}>
 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
 </svg>
 Öppna Instagram
 </a>

 {/* Mini guide */}
 <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, padding: '0 4px' }}>
 {['+ Story', 'Välj bild', 'Publicera'].map((s, i, arr) => (
 <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: i < arr.length - 1 ? 'none' : undefined }}>
 <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', whiteSpace: 'nowrap' }}>{s}</div>
 {i < arr.length - 1 && (
 <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 12, height: 12, flexShrink: 0 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
 </svg>
 )}
 </div>
 ))}
 </div>

 <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
 <button
 onClick={() => setStep('main')}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14,
 background: 'rgba(10,123,140,0.08)',
 border: '1.5px solid rgba(10,123,140,0.15)',
 color: 'var(--sea)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
 }}
 >
 ← Tillbaka
 </button>
 <button
 onClick={() => setOpen(false)}
 className="press-feedback"
 style={{
 flex: 1, padding: '14px 0', borderRadius: 14, border: 'none',
 background: 'var(--grad-sea)', color: '#fff',
 fontSize: 14, fontWeight: 700, cursor: 'pointer',
 boxShadow: '0 4px 14px rgba(30,92,130,0.22)',
 }}
 >
 Klar
 </button>
 </div>
 </div>
 </>
 )}

 </div>
 </div>
 )}

 <style>{`
 @keyframes spin { to { transform: rotate(360deg) } }
 @keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 0.7 } }
 `}</style>
 </>
 )
}
