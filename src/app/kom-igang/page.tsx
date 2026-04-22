'use client'
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import SvallaLogo from '@/components/SvallaLogo'
import HeroAnimation from '@/components/HeroAnimation'

/* ─────────────────────────────────────────────────────────────────────────────
   /kom-igang — Premium onboarding flow
   Step 0: Intro/welcome
   Step 1: Create account (social + email)
   Step 2: Success / profile setup
───────────────────────────────────────────────────────────────────────────── */

type Step = 0 | 1 | 2

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8)  score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  if (score <= 1) return { score, label: 'Svagt',   color: 'var(--red)' }
  if (score <= 2) return { score, label: 'Okej',    color: 'var(--acc)' }
  if (score <= 3) return { score, label: 'Bra',     color: '#eab308' }
  if (score <= 4) return { score, label: 'Starkt',  color: 'var(--green)' }
  return               { score, label: 'Utmärkt',  color: '#059669' }
}

const INPUT: React.CSSProperties = {
  width: '100%', padding: '15px 16px', borderRadius: 14,
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.07)',
  border: '1.5px solid rgba(255,255,255,0.14)',
  fontSize: 15, color: '#fff', outline: 'none',
  fontFamily: 'inherit', transition: 'border-color 0.18s',
  WebkitAppearance: 'none',
}

/* ── Wavy SVG divider ── */
function Wave() {
  return (
    <svg viewBox="0 0 375 44" preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: 44, marginBottom: -1, flexShrink: 0 }}>
      <path d="M0,22 C75,38 150,6 225,22 C300,38 340,10 375,22 L375,44 L0,44 Z"
        fill="rgba(255,255,255,0.97)" />
    </svg>
  )
}

/* ── Progress dots ── */
function Dots({ step }: { step: Step }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: i === step ? 22 : 7, height: 7, borderRadius: 4,
          background: i <= step ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.22)',
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  )
}

/* ── Google SVG ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" style={{ flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  )
}

/* ── Apple SVG ── */
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" style={{ flexShrink: 0 }}>
      <path fill="currentColor" d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.4-57.8-155.3-127.4C46 790.8 0 663 0 541c0-207.6 134.7-317 268-317 63.7 0 116.7 40.8 156.5 40.8 38.8 0 100-43.1 174.5-43.1 28.2 0 130.3 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
    </svg>
  )
}

export default function KomIgangPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  const [step,          setStep]          = useState<Step>(0)
  const [name,          setName]          = useState('')
  const [username,      setUsername]      = useState('')
  const [email,         setEmail]         = useState('')
  const [password,      setPassword]      = useState('')
  const [confirmPw,     setConfirmPw]     = useState('')
  const [showPw,        setShowPw]        = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [loading,       setLoading]       = useState(false)
  const [oauthLoading,  setOauthLoading]  = useState<'google' | 'apple' | null>(null)
  const [err,           setErr]           = useState('')

  const pw = passwordStrength(password)

  /* ── OAuth ── */
  async function signInWithOAuth(provider: 'google' | 'apple') {
    setOauthLoading(provider); setErr('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${location.origin}/feed` },
    })
    if (error) { setErr(error.message); setOauthLoading(null) }
  }

  /* ── Validate step 1 ── */
  const validate = useCallback((): string | null => {
    if (!email.trim()) return 'Ange din e-postadress.'
    if (!/\S+@\S+\.\S+/.test(email)) return 'Ogiltig e-postadress.'
    if (password.length < 6) return 'Lösenordet måste vara minst 6 tecken.'
    if (password !== confirmPw) return 'Lösenorden matchar inte.'
    return null
  }, [email, password, confirmPw])

  /* ── Sign up ── */
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    const validationErr = validate()
    if (validationErr) { setErr(validationErr); return }

    setLoading(true); setErr('')
    const derivedUsername = username.trim() || name.trim().split(' ')[0].toLowerCase() || email.split('@')[0]

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { username: derivedUsername, full_name: name.trim() } },
    })

    if (error) { setErr(error.message); setLoading(false); return }

    if (data.user) {
      await supabase.from('users').upsert({
        id:       data.user.id,
        username: derivedUsername,
        email:    email.trim(),
      }, { onConflict: 'id', ignoreDuplicates: true })

      if (typeof window !== 'undefined') {
        localStorage.removeItem('svalla_onboarded')
      }

      if (data.session) {
        setStep(2)
      } else {
        // Email confirmation required
        setStep(2)
      }
    }
    setLoading(false)
  }

  /* ─────────────────────────────────────────────────────────────────────────
     SHARED SHELL
  ───────────────────────────────────────────────────────────────────────── */
  const shell = (children: React.ReactNode, light = false) => (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: light
        ? '#f0f8fb'
        : 'linear-gradient(160deg, #061824 0%, #0c2e45 30%, #155070 60%, #1e6880 100%)',
      overflowX: 'hidden',
    }}>
      {/* Back button */}
      <button
        onClick={() => step === 0 ? router.push('/') : setStep(s => (s - 1) as Step)}
        aria-label="Tillbaka"
        style={{
          position: 'absolute', top: 16, left: 16, zIndex: 20,
          background: light ? 'rgba(30,92,130,0.08)' : 'rgba(255,255,255,0.10)',
          border: `1px solid ${light ? 'rgba(30,92,130,0.15)' : 'rgba(255,255,255,0.16)'}`,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          borderRadius: 12, padding: '8px 14px',
          display: 'flex', alignItems: 'center', gap: 6,
          color: light ? 'var(--sea)' : 'rgba(255,255,255,0.82)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka
      </button>
      {children}
    </div>
  )

  /* ═══════════════════════════════════════════════════════════════════════════
     STEP 0 — INTRO / WELCOME
  ════════════════════════════════════════════════════════════════════════════ */
  if (step === 0) return shell(
    <>
      {/* Hero area */}
      <div style={{
        flex: '0 0 auto',
        padding: '80px 28px 36px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        minHeight: 340,
      }}>
        {/* Live canvas background */}
        <HeroAnimation variant={1} />
        {/* Subtle readability gradient on top of canvas */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(4,16,30,0.38) 0%, rgba(8,28,48,0.28) 50%, rgba(4,16,30,0.12) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 20, padding: '16px 28px', marginBottom: 36,
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
          position: 'relative', zIndex: 1,
        }}>
          <SvallaLogo height={36} color="#ffffff" />
        </div>

        <Dots step={0} />

        {/* Welcome intro */}
        <p style={{
          fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(180,225,255,0.75)',
          margin: '0 0 14px', position: 'relative', zIndex: 1,
        }}>
          Välkommen till Svalla
        </p>

        {/* Headline */}
        <h1 style={{ position: 'relative', zIndex: 1,
          fontSize: 'clamp(28px, 7vw, 44px)', fontWeight: 700, color: '#fff',
          lineHeight: 1.12, letterSpacing: '-0.02em', margin: '0 0 18px',
          maxWidth: 400,
        }}>
          Logga dina turer.<br />
          <span style={{
            background: 'linear-gradient(135deg, #e8924a, #f4b06a)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Upptäck nya platser.
          </span>
        </h1>

        <p style={{
          fontSize: 17, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6,
          margin: '0 0 8px', maxWidth: 320, position: 'relative', zIndex: 1,
        }}>
          Svalla gör båtlivet enklare och roligare.
        </p>

        {/* Trust badges */}
        <div style={{
          display: 'flex', gap: 20, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center',
          position: 'relative', zIndex: 1,
        }}>
          {[
            { icon: '⚓', text: 'Spåra turer' },
            { icon: '🗺️', text: 'Hitta platser' },
            { icon: '🤝', text: 'Community' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 20, padding: '6px 14px',
              fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)',
            }}>
              <span>{icon}</span> {text}
            </div>
          ))}
        </div>
      </div>

      {/* Wave */}
      <Wave />

      {/* CTA card */}
      <div style={{
        flex: 1, background: 'rgba(255,255,255,0.97)',
        padding: '32px 24px calc(env(safe-area-inset-bottom, 0px) + 40px)',
        display: 'flex', flexDirection: 'column', gap: 14,
        maxWidth: '100%',
      }}>
        <div style={{ maxWidth: 400, width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>

          <p style={{
            fontSize: 13, color: 'var(--txt3)', textAlign: 'center', fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4,
          }}>
            Gratis · Ingen bindningstid
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => setStep(1)}
            style={{
              padding: '18px', borderRadius: 16, border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
              color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
              boxShadow: '0 6px 24px rgba(30,92,130,0.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              letterSpacing: '0.02em',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
          >
            <span>⚓</span> Skapa konto gratis
          </button>

          {/* Social login */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => signInWithOAuth('google')}
              disabled={!!oauthLoading}
              style={{
                flex: 1, padding: '14px', borderRadius: 14, cursor: 'pointer',
                background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: 'var(--txt)', fontFamily: 'inherit',
                boxShadow: '0 2px 8px rgba(0,30,50,0.07)',
                opacity: oauthLoading === 'google' ? 0.6 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              <GoogleIcon />
              {oauthLoading === 'google' ? '…' : 'Google'}
            </button>
            <button
              onClick={() => signInWithOAuth('apple')}
              disabled={!!oauthLoading}
              style={{
                flex: 1, padding: '14px', borderRadius: 14, cursor: 'pointer',
                background: '#000', border: '1.5px solid #000',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'inherit',
                opacity: oauthLoading === 'apple' ? 0.6 : 1,
                transition: 'opacity 0.15s',
              }}
            >
              <AppleIcon />
              {oauthLoading === 'apple' ? '…' : 'Apple'}
            </button>
          </div>

          {err && (
            <div style={{
              fontSize: 13, color: 'var(--red)', background: '#fdeaea',
              borderRadius: 12, padding: '10px 14px', textAlign: 'center',
            }}>
              {err}
            </div>
          )}

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
            <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600 }}>redan medlem?</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.10)' }} />
          </div>

          {/* Secondary CTA */}
          <button
            onClick={() => router.push('/logga-in')}
            style={{
              padding: '15px', borderRadius: 14, cursor: 'pointer',
              background: 'transparent',
              border: '1.5px solid rgba(30,92,130,0.20)',
              color: 'var(--sea)', fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
              transition: 'border-color 0.15s',
            }}
          >
            Jag har redan konto →
          </button>
        </div>
      </div>
    </>
  )

  /* ═══════════════════════════════════════════════════════════════════════════
     STEP 1 — CREATE ACCOUNT FORM
  ════════════════════════════════════════════════════════════════════════════ */
  if (step === 1) return shell(
    <>
      {/* Header */}
      <div style={{
        padding: '72px 24px 28px',
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        <SvallaLogo height={30} color="rgba(255,255,255,0.9)" />
        <Dots step={1} />
        <h2 style={{
          fontSize: 26, fontWeight: 700, color: '#fff',
          margin: 0, letterSpacing: '-0.02em',
        }}>
          Skapa ditt konto
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
          Gratis för alltid · Inga kort krävs
        </p>
      </div>

      <Wave />

      {/* Form card */}
      <div style={{
        flex: 1, background: 'rgba(255,255,255,0.97)',
        padding: '28px 24px calc(env(safe-area-inset-bottom, 0px) + 32px)',
      }}>
        <div style={{ maxWidth: 420, margin: '0 auto' }}>

          {/* Social login row */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <button
              onClick={() => signInWithOAuth('google')}
              disabled={!!oauthLoading}
              style={{
                flex: 1, padding: '13px', borderRadius: 12, cursor: 'pointer',
                background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                fontSize: 13, fontWeight: 600, color: 'var(--txt)', fontFamily: 'inherit',
                boxShadow: '0 2px 6px rgba(0,30,50,0.07)',
                opacity: oauthLoading === 'google' ? 0.6 : 1,
              }}
            >
              <GoogleIcon />
              {oauthLoading === 'google' ? '…' : 'Google'}
            </button>
            <button
              onClick={() => signInWithOAuth('apple')}
              disabled={!!oauthLoading}
              style={{
                flex: 1, padding: '13px', borderRadius: 12, cursor: 'pointer',
                background: '#000', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'inherit',
                opacity: oauthLoading === 'apple' ? 0.6 : 1,
              }}
            >
              <AppleIcon />
              {oauthLoading === 'apple' ? '…' : 'Apple'}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.12)' }} />
            <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 600 }}>eller med e-post</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.12)' }} />
          </div>

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: 11 }} noValidate>

            {/* Name row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Namn
                </label>
                <input
                  type="text"
                  placeholder="Anna"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    ...INPUT,
                    background: 'rgba(10,123,140,0.05)',
                    border: '1.5px solid rgba(10,123,140,0.14)',
                    color: 'var(--txt)',
                  }}
                  autoComplete="name"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Smeknamn
                </label>
                <input
                  type="text"
                  placeholder="seglaren"
                  value={username}
                  onChange={e => setUsername(e.target.value.replace(/\s/g, '').toLowerCase())}
                  style={{
                    ...INPUT,
                    background: 'rgba(10,123,140,0.05)',
                    border: '1.5px solid rgba(10,123,140,0.14)',
                    color: 'var(--txt)',
                  }}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                E-postadress <span style={{ color: 'var(--red)' }}>*</span>
              </label>
              <input
                type="email"
                placeholder="din@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErr('') }}
                required
                autoFocus
                style={{
                  ...INPUT,
                  background: 'rgba(10,123,140,0.05)',
                  border: `1.5px solid ${email && !/\S+@\S+\.\S+/.test(email) ? '#dc2626' : 'rgba(10,123,140,0.14)'}`,
                  color: 'var(--txt)',
                }}
                autoComplete="email"
              />
              {email && !/\S+@\S+\.\S+/.test(email) && (
                <p style={{ fontSize: 12, color: 'var(--red)', margin: 0, padding: '0 2px' }}>
                  Ogiltig e-postadress
                </p>
              )}
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Lösenord <span style={{ color: 'var(--red)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Minst 6 tecken"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErr('') }}
                  required minLength={6}
                  style={{
                    ...INPUT,
                    background: 'rgba(10,123,140,0.05)',
                    border: '1.5px solid rgba(10,123,140,0.14)',
                    color: 'var(--txt)',
                    paddingRight: 46,
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    color: 'var(--txt3)', display: 'flex', alignItems: 'center',
                  }}
                  aria-label={showPw ? 'Dölj lösenord' : 'Visa lösenord'}
                >
                  {showPw
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ width: 18, height: 18 }}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ width: 18, height: 18 }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>

              {/* Password strength bar */}
              {password.length > 0 && (
                <div style={{ marginTop: 2 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        flex: 1, height: 4, borderRadius: 2,
                        background: i <= pw.score ? pw.color : 'rgba(10,123,140,0.12)',
                        transition: 'background 0.25s',
                      }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: pw.color, margin: 0, fontWeight: 700 }}>
                    {pw.label}
                    {pw.score < 3 && <span style={{ color: 'var(--txt3)', fontWeight: 500 }}> · Prova siffror och specialtecken</span>}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt2)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Bekräfta lösenord <span style={{ color: 'var(--red)' }}>*</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPw ? 'text' : 'password'}
                  placeholder="Upprepa lösenordet"
                  value={confirmPw}
                  onChange={e => { setConfirmPw(e.target.value); setErr('') }}
                  required
                  style={{
                    ...INPUT,
                    background: 'rgba(10,123,140,0.05)',
                    border: `1.5px solid ${confirmPw && password !== confirmPw ? '#dc2626' : 'rgba(10,123,140,0.14)'}`,
                    color: 'var(--txt)',
                    paddingRight: 46,
                  }}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPw(v => !v)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                    color: 'var(--txt3)', display: 'flex', alignItems: 'center',
                  }}
                  aria-label={showConfirmPw ? 'Dölj' : 'Visa'}
                >
                  {showConfirmPw
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ width: 18, height: 18 }}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ width: 18, height: 18 }}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
              {confirmPw && password !== confirmPw && (
                <p style={{ fontSize: 12, color: 'var(--red)', margin: 0, padding: '0 2px' }}>
                  Lösenorden matchar inte
                </p>
              )}
              {confirmPw && password === confirmPw && confirmPw.length >= 6 && (
                <p style={{ fontSize: 12, color: 'var(--green)', margin: 0, padding: '0 2px', fontWeight: 600 }}>
                  ✓ Matchar
                </p>
              )}
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
            <button
              className="press-feedback" type="submit"
              disabled={loading || !!oauthLoading}
              style={{
                marginTop: 6,
                padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
                background: loading ? 'var(--txt3)' : 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
                boxShadow: loading ? 'none' : '0 5px 20px rgba(30,92,130,0.32)',
                transition: 'all 0.2s', letterSpacing: '0.02em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              {loading
                ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Skapar konto…</>
                : <>Kasta loss ⚓</>
              }
            </button>

            <p style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', margin: '6px 0 0', lineHeight: 1.5 }}>
              Genom att skapa ett konto godkänner du våra{' '}
              <a href="/villkor" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>villkor</a>
              {' '}och{' '}
              <a href="/integritet" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>integritetspolicy</a>.
            </p>
          </form>

          {/* Already have account */}
          <button
            onClick={() => router.push('/logga-in')}
            style={{
              display: 'block', width: '100%', marginTop: 18,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 14, color: 'var(--txt2)', textAlign: 'center',
              fontWeight: 500, fontFamily: 'inherit',
            }}
          >
            Har redan konto? <span style={{ color: 'var(--sea)', fontWeight: 700 }}>Logga in →</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        input::placeholder { color: rgba(22,45,58,0.35) !important; }
        input:focus { border-color: rgba(30,92,130,0.45) !important; box-shadow: 0 0 0 3px rgba(30,92,130,0.08); }
      `}</style>
    </>
  )

  /* ═══════════════════════════════════════════════════════════════════════════
     STEP 2 — SUCCESS
  ════════════════════════════════════════════════════════════════════════════ */
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      background: 'linear-gradient(160deg, #061824 0%, #0c2e45 40%, #155070 100%)',
      padding: '32px 24px',
    }}>
      {/* Success icon */}
      <div style={{
        width: 88, height: 88, borderRadius: '50%',
        background: 'linear-gradient(135deg, #0f9e64, #0d8554)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 28, boxShadow: '0 8px 32px rgba(15,158,100,0.4)',
        fontSize: 40,
        animation: 'popIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both',
      }}>
        ⚓
      </div>

      <Dots step={2} />

      <h2 style={{
        fontSize: 32, fontWeight: 700, color: '#fff',
        margin: '0 0 12px', letterSpacing: '-0.02em',
      }}>
        Välkommen ombord!
      </h2>

      <p style={{
        fontSize: 16, color: 'rgba(255,255,255,0.62)',
        margin: '0 0 8px', maxWidth: 300, lineHeight: 1.6,
      }}>
        Ditt konto är skapat. Du är redo att börja logga turer.
      </p>

      {/* Check confirmation email notice */}
      <div style={{
        background: 'rgba(15,158,100,0.12)',
        border: '1px solid rgba(15,158,100,0.25)',
        borderRadius: 14, padding: '12px 18px', marginTop: 12, marginBottom: 32,
        maxWidth: 340,
      }}>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
          📬 Kolla din e-post och bekräfta ditt konto — sedan är du redo att segla.
        </p>
      </div>

      {/* CTA buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 320 }}>
        <button
          onClick={() => router.push('/feed')}
          style={{
            padding: '16px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #0f9e64, #0d8554)',
            color: '#fff', fontSize: 16, fontWeight: 600, fontFamily: 'inherit',
            boxShadow: '0 5px 20px rgba(15,158,100,0.35)',
          }}
        >
          Utforska Svalla →
        </button>
        <button
          onClick={() => router.push('/logga-in')}
          style={{
            padding: '14px', borderRadius: 14, cursor: 'pointer',
            background: 'transparent',
            border: '1.5px solid rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 600, fontFamily: 'inherit',
          }}
        >
          Logga in nu
        </button>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
