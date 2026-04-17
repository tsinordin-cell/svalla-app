'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SvallaLogo from '@/components/SvallaLogo'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', borderRadius: 14, boxSizing: 'border-box',
  background: 'rgba(10,123,140,0.06)', border: '1.5px solid rgba(10,123,140,0.15)',
  fontSize: 15, color: '#162d3a', outline: 'none', fontFamily: 'inherit',
  transition: 'border-color 0.15s',
}

export default function LoggaInPage() {
  const router   = useRouter()
  const supabase = createClient()

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
        if (data.session) { router.push('/feed'); return }
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
      background: 'linear-gradient(180deg, #0b3348 0%, #1a5270 45%, #f7fbfc 100%)',
    }}>
      {/* ── Hero ── */}
      <div style={{ padding: '56px 24px 36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <SvallaLogo height={38} color="#ffffff" />
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: 500 }}>
          {isNew ? 'Skapa konto och börja logga turer' : 'Välkommen tillbaka till skärgården'}
        </p>
      </div>

      {/* ── Kort ── */}
      <div style={{
        flex: 1, background: '#f7fbfc',
        borderRadius: '28px 28px 0 0',
        padding: '28px 20px 48px',
        boxShadow: '0 -8px 32px rgba(0,30,50,0.18)',
      }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#162d3a', margin: '0 0 20px' }}>
            {isNew ? 'Skapa konto' : 'Logga in'}
          </h2>

          {/* ── OAuth-knappar (bara vid inloggning) ── */}
          {!isNew && (
            <>
              <button
                onClick={() => signInWith('google')}
                disabled={!!oauthLoading}
                className="oauth-btn"
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 14, marginBottom: 10,
                  background: '#fff', border: '1.5px solid rgba(10,123,140,0.18)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  fontSize: 15, fontWeight: 600, color: '#162d3a', cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(0,30,50,0.08)', transition: 'opacity 0.15s',
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
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
                padding: '14px 0', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                color: '#fff', fontSize: 15, fontWeight: 800, marginTop: 4,
                boxShadow: '0 4px 18px rgba(30,92,130,0.32)',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s', fontFamily: 'inherit',
              }}
            >
              {loading ? '...' : isNew ? 'Kasta loss →' : 'Logga in'}
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
