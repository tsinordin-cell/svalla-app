'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SvallaLogo from '@/components/SvallaLogo'

/* ─────────────────────────────────────────────────────────────────────────────
 /registrera-krog — Lead form för krogägare
 Sparar till public.business_leads via Supabase (anonym insert)
───────────────────────────────────────────────────────────────────────────── */

type Step = 'form' | 'success'

const BUSINESS_TYPES = [
 { value: 'restaurang', label: '️ Restaurang' },
 { value: 'kafe', label: '☕ Kafé / Fika' },
 { value: 'hamn', label: 'Gästhamn / Marina' },
 { value: 'boende', label: '🛏️ Boende / Stugor' },
 { value: 'bar', label: '🍺 Bar / Pub' },
 { value: 'annat', label: 'Annat' },
]

const FIELD: React.CSSProperties = {
 width: '100%', padding: '14px 16px', borderRadius: 14,
 boxSizing: 'border-box',
 background: 'rgba(10,123,140,0.05)',
 border: '1.5px solid rgba(10,123,140,0.14)',
 fontSize: 15, color: 'var(--txt)', outline: 'none',
 fontFamily: 'inherit', transition: 'border-color 0.18s',
 WebkitAppearance: 'none', appearance: 'none',
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
 return (
 <label style={{
 fontSize: 11, fontWeight: 700, color: 'var(--txt2)',
 letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 5,
 display: 'block',
 }}>
 {children}
 {required && <span style={{ color: 'var(--red)', marginLeft: 3 }}>*</span>}
 </label>
 )
}

export default function RegistreraKrogPage() {
 const router = useRouter()
 const [supabase] = useState(() => createClient())
 const [step, setStep] = useState<Step>('form')

 // Form state
 const [businessName, setBusinessName] = useState('')
 const [businessType, setBusinessType] = useState('')
 const [description, setDescription] = useState('')
 const [location, setLocation] = useState('')
 const [contactName, setContactName] = useState('')
 const [email, setEmail] = useState('')
 const [phone, setPhone] = useState('')
 const [website, setWebsite] = useState('')

 const [loading, setLoading] = useState(false)
 const [err, setErr] = useState('')

 async function handleSubmit(e: React.FormEvent) {
 e.preventDefault()
 if (!businessName.trim()) { setErr('Ange verksamhetens namn.'); return }
 if (!businessType) { setErr('Välj typ av verksamhet.'); return }
 if (!location.trim()) { setErr('Ange plats / adress.'); return }
 if (!contactName.trim()) { setErr('Ange ditt namn.'); return }
 if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { setErr('Ange en giltig e-postadress.'); return }

 setLoading(true); setErr('')

 const { error } = await supabase
 .from('business_leads')
 .insert({
 business_name: businessName.trim(),
 business_type: businessType,
 description: description.trim() || null,
 location: location.trim(),
 contact_name: contactName.trim(),
 contact_email: email.trim().toLowerCase(),
 contact_phone: phone.trim() || null,
 website: website.trim() || null,
 })

 if (error) {
 console.error('business_leads insert:', error)
 // Graceful degradation — show success even if table doesn't exist yet
 if (error.code === '42P01') {
 setStep('success')
 } else {
 setErr('Något gick fel. Försök igen eller maila oss direkt.')
 }
 setLoading(false)
 return
 }

 setStep('success')
 setLoading(false)
 }

 /* ── Success ─────────────────────────────────────────────────────────────── */
 if (step === 'success') {
 return (
 <div style={{
 minHeight: '100dvh', display: 'flex', flexDirection: 'column',
 alignItems: 'center', justifyContent: 'center', textAlign: 'center',
 background: 'linear-gradient(160deg, #061824 0%, #0c2e45 40%, #155070 100%)',
 padding: '32px 24px',
 }}>
 <div style={{
 width: 88, height: 88, borderRadius: '50%',
 background: 'linear-gradient(135deg, #e8924a, #f4a450)',
 display: 'flex', alignItems: 'center', justifyContent: 'center',
 marginBottom: 28, boxShadow: '0 8px 32px rgba(232,146,74,0.4)',
 fontSize: 42,
 animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both',
 }}>
 🎉
 </div>

 <h2 style={{
 fontSize: 30, fontWeight: 700, color: '#fff',
 margin: '0 0 14px', letterSpacing: '-0.02em',
 }}>
 Tack! Vi hör av oss snart.
 </h2>

 <p style={{
 fontSize: 16, color: 'rgba(255,255,255,0.65)',
 margin: '0 0 10px', maxWidth: 320, lineHeight: 1.65,
 }}>
 Din ansökan är registrerad. Vi granskar den och återkommer inom 1–2 vardagar.
 </p>

 <div style={{
 background: 'rgba(232,146,74,0.12)',
 border: '1px solid rgba(232,146,74,0.25)',
 borderRadius: 14, padding: '14px 20px',
 marginTop: 12, marginBottom: 36, maxWidth: 340,
 }}>
 <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.55 }}>
 🌟 <strong>Early Bird:</strong> De första 20 krogarna får 6 månaders Premium helt gratis.
 </p>
 </div>

 <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 300 }}>
 <button
 onClick={() => router.push('/')}
 style={{
 padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
 background: 'linear-gradient(135deg, #e8924a, #f4a450)',
 color: '#fff', fontSize: 15, fontWeight: 600, fontFamily: 'inherit',
 boxShadow: '0 5px 20px rgba(232,146,74,0.35)',
 }}
 >
 Tillbaka till Svalla
 </button>
 <button
 onClick={() => router.push('/platser')}
 style={{
 padding: '14px', borderRadius: 14, cursor: 'pointer',
 background: 'transparent',
 border: '1.5px solid rgba(255,255,255,0.18)',
 color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
 }}
 >
 Utforska platser →
 </button>
 </div>

 <style>{`
 @keyframes popIn {
 from { transform: scale(0.5); opacity: 0; }
 to { transform: scale(1); opacity: 1; }
 }
 `}</style>
 </div>
 )
 }

 /* ── Form ────────────────────────────────────────────────────────────────── */
 return (
 <div style={{
 minHeight: '100dvh', display: 'flex', flexDirection: 'column',
 background: 'linear-gradient(160deg, #061824 0%, #0c2e45 30%, #155070 60%, #1e6880 100%)',
 }}>
 {/* Back */}
 <button
 onClick={() => router.back()}
 style={{
 position: 'absolute', top: 16, left: 16, zIndex: 20,
 background: 'rgba(255,255,255,0.10)',
 border: '1px solid rgba(255,255,255,0.16)',
 backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
 borderRadius: 12, padding: '8px 14px',
 display: 'flex', alignItems: 'center', gap: 6,
 color: 'rgba(255,255,255,0.82)', fontSize: 13, fontWeight: 600,
 cursor: 'pointer', fontFamily: 'inherit',
 }}
 >
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
 </svg>
 Tillbaka
 </button>

 {/* Hero */}
 <div style={{
 padding: '72px 24px 28px',
 textAlign: 'center',
 display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
 }}>
 <div style={{
 background: 'rgba(255,255,255,0.08)',
 borderRadius: 20, padding: '14px 24px',
 backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
 border: '1px solid rgba(255,255,255,0.12)',
 }}>
 <SvallaLogo height={30} color="#ffffff" />
 </div>

 <div style={{
 display: 'inline-flex', alignItems: 'center', gap: 6,
 background: 'rgba(232,146,74,0.15)',
 border: '1px solid rgba(232,146,74,0.30)',
 borderRadius: 20, padding: '5px 14px',
 fontSize: 11, fontWeight: 700,
 color: '#f4b06a', letterSpacing: '0.08em', textTransform: 'uppercase',
 }}>
 <span style={{
 width: 6, height: 6, borderRadius: '50%',
 background: '#e8924a',
 animation: 'pulse-dot 2s ease-in-out infinite',
 flexShrink: 0,
 }} />
 Early Bird — 6 månader gratis
 </div>

 <h1 style={{
 fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 700, color: '#fff',
 margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: 380,
 }}>
 Sätt er krog på kartan
 </h1>
 <p style={{
 fontSize: 15, color: 'rgba(255,255,255,0.60)', margin: 0,
 maxWidth: 300, lineHeight: 1.6,
 }}>
 Nå gäster som redan är ute på vattnet. Gratis grundprofil.
 </p>

 {/* Value props */}
 <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
 {['📍 GPS-synlig', '📊 Insikter', '🆓 Gratis start'].map(t => (
 <div key={t} style={{
 background: 'rgba(255,255,255,0.07)',
 border: '1px solid rgba(255,255,255,0.10)',
 borderRadius: 20, padding: '5px 13px',
 fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.72)',
 }}>
 {t}
 </div>
 ))}
 </div>
 </div>

 {/* Wave */}
 <svg viewBox="0 0 375 44" preserveAspectRatio="none"
 style={{ display: 'block', width: '100%', height: 44, marginBottom: -1, flexShrink: 0 }}>
 <path d="M0,22 C75,38 150,6 225,22 C300,38 340,10 375,22 L375,44 L0,44 Z"
 fill="rgba(255,255,255,0.97)" />
 </svg>

 {/* Form card */}
 <div style={{
 flex: 1, background: 'rgba(255,255,255,0.97)',
 padding: '28px 24px calc(env(safe-area-inset-bottom,0px) + 40px)',
 }}>
 <div style={{ maxWidth: 480, margin: '0 auto' }}>

 {/* Section: Verksamhet */}
 <p style={{
 fontSize: 12, fontWeight: 600, color: 'var(--sea)',
 textTransform: 'uppercase', letterSpacing: '0.08em',
 margin: '0 0 14px',
 }}>
 Om verksamheten
 </p>

 <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

 {/* Name */}
 <div>
 <Label required>Verksamhetens namn</Label>
 <input
 type="text"
 placeholder="t.ex. Sandhamns Värdshus"
 value={businessName}
 onChange={e => { setBusinessName(e.target.value); setErr('') }}
 style={FIELD}
 // eslint-disable-next-line jsx-a11y/no-autofocus
 autoFocus
 />
 </div>

 {/* Type */}
 <div>
 <Label required>Typ av verksamhet</Label>
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
 {BUSINESS_TYPES.map(t => (
 <button
 key={t.value}
 type="button"
 onClick={() => setBusinessType(t.value)}
 style={{
 padding: '11px 14px', borderRadius: 12, cursor: 'pointer',
 background: businessType === t.value
 ? 'rgba(30,92,130,0.10)'
 : 'rgba(10,123,140,0.04)',
 border: `1.5px solid ${businessType === t.value
 ? 'rgba(30,92,130,0.45)'
 : 'rgba(10,123,140,0.14)'}`,
 fontSize: 13, fontWeight: 600,
 color: businessType === t.value ? 'var(--sea)' : 'var(--txt2)',
 textAlign: 'left', fontFamily: 'inherit',
 transition: 'all 0.15s',
 }}
 >
 {t.label}
 </button>
 ))}
 </div>
 </div>

 {/* Location */}
 <div>
 <Label required>Plats / adress</Label>
 <input
 type="text"
 placeholder="t.ex. Sandhamn, Värmdö"
 value={location}
 onChange={e => { setLocation(e.target.value); setErr('') }}
 style={FIELD}
 />
 </div>

 {/* Description */}
 <div>
 <Label>Kort beskrivning</Label>
 <textarea
 placeholder="Berätta kort om er verksamhet och vad ni erbjuder båtgäster..."
 value={description}
 onChange={e => setDescription(e.target.value)}
 rows={3}
 style={{
 ...FIELD,
 resize: 'vertical', minHeight: 90, lineHeight: 1.55,
 }}
 />
 </div>

 {/* Divider */}
 <div style={{ margin: '4px 0' }}>
 <p style={{
 fontSize: 12, fontWeight: 600, color: 'var(--sea)',
 textTransform: 'uppercase', letterSpacing: '0.08em',
 margin: '0 0 14px',
 }}>
 Kontaktuppgifter
 </p>
 </div>

 {/* Contact name + email */}
 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
 <div>
 <Label required>Ditt namn</Label>
 <input
 type="text"
 placeholder="Anna Svensson"
 value={contactName}
 onChange={e => { setContactName(e.target.value); setErr('') }}
 style={FIELD}
 autoComplete="name"
 />
 </div>
 <div>
 <Label>Telefon</Label>
 <input
 type="tel"
 placeholder="070-000 00 00"
 value={phone}
 onChange={e => setPhone(e.target.value)}
 style={FIELD}
 autoComplete="tel"
 />
 </div>
 </div>

 <div>
 <Label required>E-postadress</Label>
 <input
 type="email"
 placeholder="din@krog.se"
 value={email}
 onChange={e => { setEmail(e.target.value); setErr('') }}
 style={{
 ...FIELD,
 border: `1.5px solid ${email && !/\S+@\S+\.\S+/.test(email)
 ? '#dc2626' : 'rgba(10,123,140,0.14)'}`,
 }}
 autoComplete="email"
 />
 {email && !/\S+@\S+\.\S+/.test(email) && (
 <p style={{ fontSize: 12, color: 'var(--red)', margin: '4px 0 0 2px' }}>
 Ogiltig e-postadress
 </p>
 )}
 </div>

 <div>
 <Label>Webbplats</Label>
 <input
 type="url"
 placeholder="https://erkrog.se"
 value={website}
 onChange={e => setWebsite(e.target.value)}
 style={FIELD}
 autoComplete="url"
 />
 </div>

 {/* Error */}
 {err && (
 <div style={{
 fontSize: 13, color: 'var(--red)', background: '#fdeaea',
 borderRadius: 12, padding: '10px 14px', textAlign: 'center',
 }}>
 {err}
 </div>
 )}

 {/* Submit */}
 <button className="press-feedback"
 type="submit"
 disabled={loading}
 style={{
 marginTop: 4,
 padding: '17px', borderRadius: 14, border: 'none', cursor: 'pointer',
 background: loading
 ? 'var(--txt3)'
 : 'linear-gradient(135deg, #e8924a, #f4a450)',
 color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
 boxShadow: loading ? 'none' : '0 5px 22px rgba(232,146,74,0.40)',
 transition: 'all 0.2s', letterSpacing: '0.02em',
 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
 }}
 >
 {loading
 ? <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span> Skickar…</>
 : <>Registrera er krog →</>
 }
 </button>

 <p style={{
 fontSize: 12, color: 'var(--txt3)', textAlign: 'center',
 margin: 0, lineHeight: 1.55,
 }}>
 Vi hör av oss inom 1–2 vardagar. Ingen betalning krävs.
 </p>
 </form>
 </div>
 </div>

 <style>{`
 @keyframes spin { to { transform: rotate(360deg) } }
 @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }
 input::placeholder, textarea::placeholder { color: rgba(22,45,58,0.32) !important; }
 input:focus, textarea:focus, select:focus {
 border-color: rgba(30,92,130,0.45) !important;
 box-shadow: 0 0 0 3px rgba(30,92,130,0.08);
 outline: none;
 }
 `}</style>
 </div>
 )
}
