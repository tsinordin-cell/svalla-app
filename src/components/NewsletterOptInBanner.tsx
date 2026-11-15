'use client'
/**
 * NewsletterOptInBanner — frågan om månadsbrevet till inloggade som inte
 * prenumererar (2026-11-08).
 *
 * VARFÖR: konton får inte nyhetsbrevet automatiskt. Marknadsföringslagen
 * 19 § kräver samtycke i förväg för reklam via e-post, och undantaget för
 * befintliga kunder gäller bara efter ett köp. Svalla-konton är gratis.
 * Samtycket är klicket på "Ja tack": då skrivs adressen in i
 * email_subscribers via POST /api/subscribe med source 'app-fraga', med
 * tidsstämpel, så att det i efterhand går att visa vem som sa ja och när.
 *
 * VISNING: bara om /api/subscribe/status säger att användaren varken är
 * prenumerant eller har avregistrerat sig. "Inte nu" döljer rutan i 30
 * dagar; andra gången för alltid (localStorage, per webbläsare). Den som
 * svarar ja ser den aldrig igen eftersom status då säger subscribed.
 */
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'svalla-nyhetsbrev-fraga-v1'
const TRETTIO_DAGAR = 30 * 24 * 60 * 60 * 1000

type Lagrat = { avbojd: number; tills: number }

function lasLagrat(): Lagrat | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Lagrat) : null
  } catch { return null }
}

export default function NewsletterOptInBanner() {
  const [lage, setLage] = useState<'dold' | 'fraga' | 'skickar' | 'tack'>('dold')
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const lagrat = lasLagrat()
    if (lagrat && (lagrat.avbojd >= 2 || Date.now() < lagrat.tills)) return

    let avbruten = false
    fetch('/api/subscribe/status', { cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then((s: { subscribed?: boolean; unsubscribed?: boolean; email?: string } | null) => {
        if (avbruten || !s || s.subscribed || s.unsubscribed || !s.email) return
        setEmail(s.email)
        setLage('fraga')
      })
      .catch(() => {})
    return () => { avbruten = true }
  }, [])

  function inteNu() {
    const lagrat = lasLagrat()
    const avbojd = (lagrat?.avbojd ?? 0) + 1
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ avbojd, tills: Date.now() + TRETTIO_DAGAR })) } catch { /* ignore */ }
    setLage('dold')
  }

  async function jaTack() {
    if (!email) return
    setLage('skickar')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'app-fraga', preferences: { weekly_tips: true, season_alerts: true } }),
      })
      setLage(res.ok ? 'tack' : 'fraga')
    } catch {
      setLage('fraga')
    }
  }

  if (lage === 'dold') return null

  return (
    <div
      role="status"
      style={{
        position: 'relative',
        margin: '0 0 14px',
        padding: '14px 16px 14px 18px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(10,123,140,0.10), rgba(201,110,42,0.10))',
        border: '1px solid rgba(10,123,140,0.20)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, var(--sea), var(--acc, #c96e2a))',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(10,123,140,0.25)',
      }} aria-hidden>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </div>

      {lage === 'tack' ? (
        <div style={{ flex: 1, minWidth: 0, fontSize: 14, color: 'var(--txt)', lineHeight: 1.4 }}>
          <strong>Tack.</strong> Nästa brev kommer första tisdagen i månaden till {email}. Avsluta när du vill via länken i brevet.
        </div>
      ) : (
        <>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2, lineHeight: 1.3 }}>
              Vill du ha månadsbrevet?
            </div>
            <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.45 }}>
              Vad som har öppet i skärgården, båtar som byter tidtabell och månadens öar. En gång i månaden till {email}, avsluta när du vill.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            <button
              type="button"
              onClick={jaTack}
              disabled={lage === 'skickar'}
              style={{
                padding: '8px 14px', borderRadius: 999, border: 'none',
                background: 'var(--sea)', color: '#fff', fontWeight: 700, fontSize: 13,
                cursor: lage === 'skickar' ? 'wait' : 'pointer', opacity: lage === 'skickar' ? 0.7 : 1,
              }}
            >
              {lage === 'skickar' ? 'Sparar…' : 'Ja tack'}
            </button>
            <button
              type="button"
              onClick={inteNu}
              style={{
                padding: '6px 14px', borderRadius: 999, border: 'none',
                background: 'transparent', color: 'var(--txt2)', fontSize: 12, cursor: 'pointer',
              }}
            >
              Inte nu
            </button>
          </div>
        </>
      )}
    </div>
  )
}
