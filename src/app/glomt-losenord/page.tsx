'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

export default function GlomtLosenordPage() {
  const [supabase] = useState(() => createClient())
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  async function handle(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setErr('')
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: 'https://svalla.se/nytt-losenord',
    })
    setLoading(false)
    if (error) { setErr('Något gick fel. Kontrollera e-postadressen och försök igen.'); return }
    setSent(true)
  }

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0e3d52 0%, #1e5c82 50%, #f7fbfc 100%)',
    }}>
      {/* Branding top */}
      <div style={{ flex: '0 0 auto', padding: '48px 24px 36px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Glömt lösenordet?
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Skriv din e-postadress, så skickar vi en länk där du väljer ett nytt
        </p>
      </div>

      {/* Card */}
      <div style={{
        flex: 1, background: 'var(--bg)',
        borderRadius: '28px 28px 0 0',
        padding: '32px 24px',
        boxShadow: '0 -8px 32px rgba(0,30,50,0.15)',
      }}>
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          {sent ? (
            // Stilren kvittens (2026-11-20): ikonen centrerad i en rund platta, en
            // knapp i stället för två likadana länkar, och ett råd om skräpposten.
            <div role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 8 }}>
              <div aria-hidden style={{
                width: 64, height: 64, borderRadius: '50%', marginBottom: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
              }}>
                <Icon name="mail" size={28} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
                Kolla din inkorg
              </h2>
              <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 8px' }}>
                Vi har skickat en länk till <strong style={{ color: 'var(--txt)', wordBreak: 'break-all' }}>{email}</strong>. Tryck på den för att välja ett nytt lösenord.
              </p>
              <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 26px' }}>
                Kommer det inget inom ett par minuter? Titta i skräpposten.
              </p>
              <Link href="/logga-in" className="press-feedback" style={{
                display: 'block', width: '100%', boxSizing: 'border-box', padding: '15px 0', borderRadius: 16,
                background: 'var(--grad-sea)',
                color: '#fff', fontWeight: 600, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(30,92,130,0.35)',
              }}>
                Tillbaka till inloggning
              </Link>
            </div>
          ) : (
            <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Rubriken och ingressen står redan överst på sidan; här räcker en etikett. */}
              <label htmlFor="glomt-epost" style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt2)' }}>
                E-postadress
              </label>
              <input
                id="glomt-epost"
                type="email"
                autoComplete="email"
                placeholder="din@epost.se"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: 16, boxSizing: 'border-box',
                  background: 'rgba(10,123,140,0.06)', border: '1.5px solid rgba(10,123,140,0.15)',
                  fontSize: 15, color: 'var(--txt)', outline: 'none', fontFamily: 'inherit',
                }}
              />

              {err && (
                <p style={{ fontSize: 13, color: 'var(--red)', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', margin: 0, textAlign: 'center' }}>
                  {err}
                </p>
              )}

              <button className="press-feedback"
                type="submit"
                disabled={loading || !email.trim()}
                style={{
                  padding: '15px 0', borderRadius: 16, border: 'none', cursor: 'pointer',
                  background: 'var(--grad-sea)',
                  color: '#fff', fontSize: 16, fontWeight: 600,
                  boxShadow: '0 4px 20px rgba(30,92,130,0.35)',
                  opacity: loading || !email.trim() ? 0.65 : 1,
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? 'Skickar…' : 'Skicka länk'}
              </button>
            </form>
          )}

          {!sent && (
            <Link href="/logga-in" style={{
              display: 'block', textAlign: 'center', marginTop: 20,
              fontSize: 14, color: 'var(--txt3)', textDecoration: 'none', fontWeight: 500,
            }}>
              ← Tillbaka till inloggning
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
