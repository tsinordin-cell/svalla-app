'use client' // v2
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SvallaLogo from '@/components/SvallaLogo'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', borderRadius: 14, boxSizing: 'border-box',
  background: 'rgba(10,123,140,0.06)', border: '1.5px solid rgba(10,123,140,0.15)',
  fontSize: 15, color: 'var(--txt, #162d3a)', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 0.15s',
}

// Subtle wave SVG divider
function WaveDivider() {
  return (
    <svg viewBox="0 0 375 40" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
      <path
        d="M0,20 C60,35 120,5 180,20 C240,35 300,5 375,20 L375,40 L0,40 Z"
        style={{ fill: 'var(--bg, #f0f8fb)' }}
      />
    </svg>
  )
}

export default function LoggaInPage() {
  const router   = useRouter()
  const [supabase] = useState(() => createClient())

  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [username,     setUsername]     = useState('')
  const [isNew,        setIsNew]        = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null)
  const [err,          setErr]          = useState('')
  const [msg,          setMsg]          = useState('')

  /* ── OAuth ── */
  async function signInWith(provider: 'google' | 'apple') {
    setOauthLoading(provider); setErr('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/feed` },
    })
    if (error) { setErr(error.message); setOauthLoading(null) }
  }

  /* ── Email/password ── */
  async function handle(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(''); setMsg('')

    if (isNew) {
      const { data, error } = await supabase.auth.signUp({
        email, password,
        options: { data: { username: username.trim() || email.split('@')[0] } },
      })
      if (error) { setErr(error.message); setLoading(false); return }
      if (data.user) {
        await supabase.from('users').upsert({
          id:       data.user.id,
          username: username.trim() || email.split('@')[0],
          email,
        }, { onConflict: 'id', ignoreDuplicates: true })
        if (data.session) { 
          // Reset onboarding for new user
          if (typeof window !== 'undefined') {
            localStorage.removeItem('svalla_onboarded')
          }
          router.push('/feed'); 
          return 
        }
      }
      setMsg('Bekräftelsemejl skickat! Klicka på länken och logga sedan in.')
      setIsNew(false); setLoading(false)
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setErr('Mejlet är inte bekräftat. Kolla din inkorg.')
        } else if (error.message.toLowerCase().includes('invalid login')) {
          setErr('Fel e-post eller lösenord. Försök igen.')
        } else {
          setErr(error.message)
        }
        setLoading(false); return
      }
      if (data.user) {
        await supabase.from('users').upsert({
          id:       data.user.id,
          username: data.user.user_metadata?.username || data.user.email?.split('@')[0] || 'seglare',
          email:    data.user.email ?? '',
        }, { onConflict: 'id' })
      }
      router.push('/feed')
    }
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(175deg, #09253a 0%, #0e3d5c 35%, #1a5c7a 65%, #e8f4f8 100%)',
    }}>
      {/* ── Tillbaka-knapp ── */}
      <button
        onClick={() => router.push('/')}
        style={{
          position: 'absolute', top: 16, left: 16, zIndex: 10,
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          borderRadius: 12, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          color: 'rgba(255,255,255,0.85)', fontSize: 13, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka
      </button>

      {/* ── Hero ── */}
      <div style={{
        padding: '64px 24px 32px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        position: 'relative',
      }}>
        {/* Stjärnor / reflektioner — subtil bakgrundseffekt */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', opacity: 0.18 }}>
          {[
            { top: '18%', left: '12%', r: 1.5 }, { top: '35%', left: '82%', r: 1 },
            { top: '12%', left: '65%', r: 2 },   { top: '55%', left: '25%', r: 1.2 },
            { top: '28%', left: '48%', r: 1 },   { top: '42%', left: '70%', r: 1.5 },
            { top: '20%', left: '90%', r: 1 },   { top: '60%', left: '88%', r: 1.2 },
            { top: '8%',  left: '38%', r: 1 },   { top: '48%', left: '6%',  r: 1.5 },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute', top: s.top, left: s.left,
              width: s.r * 2, height: s.r * 2, borderRadius: '50%',
              background: '#fff',
            }} />
          ))}
        </div>

        {/* Logo */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 20,
          padding: '16px 24px',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <SvallaLogo height={34} color="#ffffff" />
        </div>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0, fontWeight: 500, letterSpacing: '0.3px' }}>
          {isNew ? 'Skapa konto och börja logga turer' : 'Din skärgårdslogg i fickan'}
        </p>

        {/* Horisont-linje */}
        <div style={{
          width: 48, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          borderRadius: 2,
        }} />
      </div>

      {/* ── Vågövergång ── */}
      <WaveDivider />

      {/* ── Kort ── */}
      <div style={{
        flex: 1,
        background: 'var(--bg, #f0f8fb)',
        padding: '24px 20px 52px',
      }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: 'var(--txt, #162d3a)', margin: '0 0 20px', letterSpacing: '-0.3px' }}>
            {isNew ? 'Skapa konto' : 'Logga in'}
          </h2>

          {/* ── Google ── */}
          {!isNew && (
            <>
              <button
                onClick={() => signInWith('google')}
                disabled={!!oauthLoading}
                className="oauth-btn"
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 14, marginBottom: 12,
                  background: 'var(--white, #fff)', border: '1.5px solid rgba(10,123,140,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontSize: 15, fontWeight: 600, color: 'var(--txt, #162d3a)', cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,30,50,0.08)', transition: 'opacity 0.15s',
                  opacity: oauthLoading === 'google' ? 0.6 : 1, fontFamily: 'inherit',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                {oauthLoading === 'google' ? 'Ansluter…' : 'Fortsätt med Google'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.12)' }} />
                <span style={{ fontSize: 12, color: '#7a9dab', fontWeight: 600 }}>eller med e-post</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.12)' }} />
              </div>
            </>
          )}

          {/* ── Formulär ── */}
          <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {isNew && (
              <input
                type="text" placeholder="Välj ett alias / smeknamn"
                value={username} onChange={e => setUsername(e.target.value)}
                style={inputStyle} autoComplete="username" autoFocus
              />
            )}
            <input
              type="email" placeholder="E-postadress"
              value={email} onChange={e => setEmail(e.target.value)}
              required style={inputStyle} autoComplete="email" autoFocus={!isNew}
            />
            <input
              type="password"
              placeholder={isNew ? 'Välj lösenord (min 6 tecken)' : 'Lösenord'}
              value={password} onChange={e => setPassword(e.target.value)}
              required minLength={6} style={inputStyle}
              autoComplete={isNew ? 'new-password' : 'current-password'}
            />
            {isNew && password.length > 0 && password.length < 6 && (
              <p style={{ fontSize: 12, color: '#c96e2a', margin: '-2px 0 0', padding: '0 4px' }}>
                Minst 6 tecken ({6 - password.length} till)
              </p>
            )}
            {err && (
              <div style={{ fontSize: 13, color: '#cc3d3d', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
                {err}
              </div>
            )}
            {msg && (
              <div style={{ fontSize: 13, color: '#0a7040', background: '#e6f7ef', borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
                {msg}
              </div>
            )}
            <button
              type="submit" disabled={loading}
              style={{
                padding: '15px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                color: '#fff', fontSize: 15, fontWeight: 800, marginTop: 4,
                boxShadow: '0 4px 18px rgba(30,92,130,0.30)',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'inherit',
                letterSpacing: '0.2px',
              }}
            >
              {loading ? '…' : isNew ? 'Kasta loss →' : 'Logga in'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => { setIsNew(!isNew); setErr(''); setMsg('') }}
            style={{
              display: 'block', width: '100%', marginTop: 18,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, color: '#5a8090', textAlign: 'center', fontWeight: 500, fontFamily: 'inherit',
            }}
          >
            {isNew ? 'Har redan konto? Logga in →' : 'Ny på Svalla? Skapa konto gratis →'}
          </button>

          {!isNew && (
            <a href="/glomt-losenord" style={{
              display: 'block', textAlign: 'center', marginTop: 10,
              fontSize: 13, color: '#7a9dab', textDecoration: 'none',
            }}>
              Glömt lösenordet?
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
