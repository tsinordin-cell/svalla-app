'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

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
      <div style={{ padding: '52px 24px 36px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 10, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>⛵</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-1.5px' }}>
          Svalla
        </h1>
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

          {/* Google-knapp aktiveras när credentials finns i Supabase */}

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
