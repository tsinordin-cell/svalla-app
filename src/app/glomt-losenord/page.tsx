'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

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
      <div style={{ flex: '0 0 auto', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>🔑</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          Glömt lösenordet?
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0 }}>
          Vi skickar en återställningslänk till din e-post
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
            <div style={{ textAlign: 'center', paddingTop: 20 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>📬</div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>
                Kolla din inkorg!
              </h2>
              <p style={{ fontSize: 14, color: 'var(--txt3)', lineHeight: 1.6, marginBottom: 28 }}>
                Vi har skickat en återställningslänk till <strong>{email}</strong>.
                Klicka på länken i mejlet för att välja ett nytt lösenord.
              </p>
              <Link href="/logga-in" style={{
                display: 'inline-block', padding: '13px 32px', borderRadius: 16,
                background: 'var(--grad-sea)',
                color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(30,92,130,0.3)',
              }}>
                Tillbaka till inloggning
              </Link>
            </div>
          ) : (
            <form onSubmit={handle} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>
                Återställ lösenord
              </h2>
              <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
                Ange din e-postadress så skickar vi en länk direkt.
              </p>

              <input
                type="email"
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
                {loading ? 'Skickar…' : 'Skicka återställningslänk →'}
              </button>
            </form>
          )}

          <Link href="/logga-in" style={{
            display: 'block', textAlign: 'center', marginTop: 20,
            fontSize: 14, color: 'var(--txt3)', textDecoration: 'none', fontWeight: 500,
          }}>
            ← Tillbaka till inloggning
          </Link>
        </div>
      </div>
    </div>
  )
}
