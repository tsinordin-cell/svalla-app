'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', borderRadius: 16, boxSizing: 'border-box',
  background: 'rgba(10,123,140,0.06)', border: '1.5px solid rgba(10,123,140,0.15)',
  fontSize: 15, color: '#162d3a', outline: 'none', fontFamily: 'inherit',
}

export default function LoggaInPage() {
  const router  = useRouter()
  const supabase = createClient()

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isNew,    setIsNew]    = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [err,      setErr]      = useState('')
  const [msg,      setMsg]      = useState('')

  async function handle(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr(''); setMsg('')

    if (isNew) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: username.trim() || email.split('@')[0] } },
      })
      if (error) { setErr(error.message); setLoading(false); return }

      if (data.user) {
        // Skapa public.users-rad (trigger kan misslyckas, så vi gör det manuellt också)
        await supabase.from('users').upsert({
          id:       data.user.id,
          username: username.trim() || email.split('@')[0],
          email,
        }, { onConflict: 'id', ignoreDuplicates: true })

        // Om session finns direkt (email-bekräftelse avstängd) → gå direkt in
        if (data.session) {
          router.push('/feed')
          return
        }
      }
      // Annars: bekräftelsemejl skickat
      setMsg('Bekräftelsemejl skickat! Klicka på länken i mejlet och logga sedan in.')
      setIsNew(false)
      setLoading(false)
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if (error.message.toLowerCase().includes('email not confirmed')) {
          setErr('Mejlet är inte bekräftat. Kolla din inkorg och klicka på bekräftelselänken.')
        } else if (error.message.toLowerCase().includes('invalid login')) {
          setErr('Fel e-post eller lösenord. Försök igen.')
        } else {
          setErr(error.message)
        }
        setLoading(false)
        return
      }
      if (data.user) {
        // Uppdatera alltid public.users vid inloggning (sätter korrekt username)
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
      background: 'linear-gradient(180deg, #0e3d52 0%, #1e5c82 50%, #f7fbfc 100%)',
    }}>
      {/* Top wave / branding */}
      <div style={{ flex: '0 0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>⛵</div>
        <h1 style={{ fontSize: 40, fontWeight: 900, color: '#fff', margin: '0 0 6px', letterSpacing: '-1px' }}>
          Svalla
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, fontWeight: 500 }}>
          {isNew ? 'Skapa konto och börja logga turer' : 'Välkommen tillbaka till skärgården'}
        </p>
      </div>

      {/* Form card */}
      <div style={{
        flex: 1, background: '#f7fbfc',
        borderRadius: '28px 28px 0 0',
        padding: '32px 24px',
        boxShadow: '0 -8px 32px rgba(0,30,50,0.15)',
      }}>
        <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 900, color: '#162d3a', margin: '0 0 4px' }}>
            {isNew ? 'Skapa konto' : 'Logga in'}
          </h2>

          {isNew && (
            <input
              type="text"
              placeholder="Välj ett alias / smeknamn"
              value={username}
              onChange={e => setUsername(e.target.value)}
              style={inputStyle}
              autoComplete="username"
              autoFocus
            />
          )}

          <input
            type="email"
            placeholder="E-postadress"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
            autoComplete="email"
            autoFocus={!isNew}
          />

          <input
            type="password"
            placeholder={isNew ? 'Välj lösenord (min 6 tecken)' : 'Lösenord'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
            autoComplete={isNew ? 'new-password' : 'current-password'}
          />
          {isNew && password.length > 0 && password.length < 6 && (
            <p style={{ fontSize: 12, color: '#c96e2a', margin: '-4px 0 0', padding: '0 4px' }}>
              Minst 6 tecken krävs ({6 - password.length} till)
            </p>
          )}

          {err && (
            <p style={{ fontSize: 13, color: '#cc3d3d', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', margin: 0, textAlign: 'center' }}>
              {err}
            </p>
          )}
          {msg && (
            <p style={{ fontSize: 13, color: '#0a7040', background: '#e6f7ef', borderRadius: 12, padding: '10px 14px', margin: 0, textAlign: 'center' }}>
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '15px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: '#fff', fontSize: 16, fontWeight: 800, marginTop: 4,
              boxShadow: '0 4px 20px rgba(30,92,130,0.35)',
              opacity: loading ? 0.75 : 1, transition: 'opacity 0.2s',
            }}
          >
            {loading ? '...' : isNew ? 'Kasta loss →' : 'Logga in'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => { setIsNew(!isNew); setErr(''); setMsg('') }}
          style={{
            display: 'block', width: '100%', maxWidth: 400, margin: '20px auto 0',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, color: '#5a8090', textAlign: 'center', fontWeight: 500,
          }}
        >
          {isNew ? 'Har redan konto? Logga in →' : 'Ny på Svalla? Skapa konto gratis →'}
        </button>

        {!isNew && (
          <a
            href="/glomt-losenord"
            style={{
              display: 'block', textAlign: 'center', marginTop: 12,
              fontSize: 13, color: '#7a9dab', textDecoration: 'none',
            }}
          >
            Glömt lösenordet?
          </a>
        )}
      </div>
    </div>
  )
}
