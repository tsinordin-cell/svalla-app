'use client'
import { hamtaKampanj } from '@/lib/kampanj'
import { useState } from 'react'
import { MEJLSEGMENT, SEGMENT_ETIKETT, type Mejlsegment } from '@/lib/mejlsegment'

interface Props {
  source?: string
  variant?: 'inline' | 'card' | 'footer'
  title?: string
  description?: string
  buttonLabel?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * EmailSignup — formulär som POST:ar till /api/subscribe
 * Lämnar plats för dubbel-opt-in via Resend (du konfigurerar utskick separat).
 */
export default function EmailSignup({
  source = 'homepage-footer',
  variant = 'inline',
  title = 'Få veckans skärgårdstips',
  description = 'Nya guider och säsongsnytt, när det händer något. Inga annonser.',
  buttonLabel = 'Prenumerera',
  className,
  style,
}: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [sparadAdress, setSparadAdress] = useState('')
  const [segment, setSegment] = useState<Mejlsegment | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@') || status === 'loading') return
    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, kampanj: hamtaKampanj() ?? undefined }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Något gick fel — försök igen')
        setStatus('error')
        return
      }
      setStatus('success')
      setSparadAdress(email)
      setEmail('')

      // GA4 sign_up event (fires when GA4 is configured via gtag.js)
      // Set up: https://developers.google.com/analytics/devguides/collection/ga4
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any
        if (typeof w.gtag === 'function') {
          w.gtag('event', 'sign_up', {
            method: 'newsletter',
            source: source,
          })
        }
      } catch {
        // Tyst fel — GA4 ej konfigurerat än
      }
    } catch {
      setError('Nätverksfel — försök igen')
      setStatus('error')
    }
  }

  // Segment (2026-10-02): ett frivilligt klick efter att adressen sparats.
  // Samma endpoint, samma adress; servern sätter segment bara om det saknas.
  function valjSegment(s: Mejlsegment) {
    setSegment(s)
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: sparadAdress, source, segment: s }),
    }).catch(() => {})
  }

  if (status === 'success') {
    return (
      <div
        className={className}
        style={{
          padding: variant === 'footer' ? '14px 16px' : '16px 18px',
          borderRadius: 12,
          background: 'rgba(46,160,90,0.10)',
          color: variant === 'footer' ? '#fff' : 'var(--txt, #1a2530)',
          fontSize: 14, fontWeight: 600, textAlign: 'center',
          ...style,
        }}
      >
        <div>Tack, adressen är sparad.</div>
        {segment ? (
          <div style={{ fontWeight: 500, marginTop: 6 }}>Noterat. Då anpassar vi utskicken efter det.</div>
        ) : (
          <>
            <div style={{ fontWeight: 500, marginTop: 8 }}>Vad stämmer bäst in på dig?</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginTop: 8 }}>
              {MEJLSEGMENT.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => valjSegment(s)}
                  style={{
                    padding: '7px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                    border: variant === 'footer' ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(10,123,140,0.3)',
                    background: 'transparent', color: 'inherit',
                  }}
                >
                  {SEGMENT_ETIKETT[s]}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  const isFooter = variant === 'footer'
  const isCard = variant === 'card'

  return (
    <form
      onSubmit={submit}
      className={className}
      style={{
        background: isCard ? 'var(--surface-1, #fff)' : 'transparent',
        border: isCard ? '1px solid var(--border, rgba(0,0,0,0.08))' : 'none',
        borderRadius: isCard ? 16 : 0,
        padding: isCard ? '20px 22px' : 0,
        ...style,
      }}
    >
      {title && (
        <div style={{
          fontSize: isFooter ? 14 : 17,
          fontWeight: 700,
          marginBottom: 4,
          color: isFooter ? '#fff' : 'var(--txt, #1a2530)',
          fontFamily: isCard ? "'Playfair Display', Georgia, serif" : 'inherit',
        }}>
          {title}
        </div>
      )}
      {description && (
        <div style={{
          fontSize: 13,
          color: isFooter ? 'rgba(255,255,255,0.75)' : 'var(--txt2, rgba(0,0,0,0.6))',
          marginBottom: 12, lineHeight: 1.5,
        }}>
          {description}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="din@email.se"
          aria-label="E-postadress"
          style={{
            flex: '1 1 200px',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid var(--input-border, rgba(0,0,0,0.15))',
            background: isFooter ? 'rgba(255,255,255,0.95)' : 'var(--input-bg, #fff)',
            fontSize: 14,
            color: 'var(--txt)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: status === 'loading' ? '#7da7be' : 'var(--sea-knapp, #1e5c82)',
            color: '#fff',
            fontSize: 14, fontWeight: 700,
            cursor: status === 'loading' ? 'wait' : 'pointer',
            transition: 'background .15s',
          }}
        >
          {status === 'loading' ? 'Skickar…' : buttonLabel}
        </button>
      </div>

      {error && (
        <div role="alert" style={{
          marginTop: 8, fontSize: 12,
          color: '#d44d4d',
        }}>
          {error}
        </div>
      )}
    </form>
  )
}
