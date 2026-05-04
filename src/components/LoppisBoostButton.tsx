'use client'
/**
 * LoppisBoostButton — knapp som triggar Stripe checkout för 7 dagars boost.
 * Visas i ägar-vyn när annonsen INTE redan är boostad. När den är boostad
 * visas en "Boostad till YYYY-MM-DD"-pill istället.
 */
import { useState } from 'react'

interface Props {
  threadId: string
  /** ISO-string om annonsen redan är boostad. */
  boostedUntil?: string | null
}

export default function LoppisBoostButton({ threadId, boostedUntil }: Props) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  const isBoosted = boostedUntil && new Date(boostedUntil).getTime() > Date.now()

  async function startCheckout() {
    if (busy) return
    setBusy(true); setErr('')
    try {
      const res = await fetch('/api/stripe/loppis-boost-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setErr(data.error ?? 'Kunde inte starta betalning.')
        setBusy(false)
        return
      }
      window.location.href = data.url
    } catch {
      setErr('Nätverksfel.')
      setBusy(false)
    }
  }

  if (isBoosted) {
    const until = new Date(boostedUntil!).toLocaleDateString('sv-SE', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '14px 16px',
        background: 'linear-gradient(135deg, rgba(201,110,42,0.10), rgba(201,110,42,0.04))',
        border: '1px solid rgba(201,110,42,0.30)',
        borderRadius: 12,
        marginBottom: 16,
      }}>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="var(--acc, #c96e2a)" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--acc, #c96e2a)' }}>
          Boostad till {until}
        </span>
      </div>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={startCheckout}
        disabled={busy}
        style={{
          width: '100%',
          padding: '13px 16px',
          background: busy ? 'rgba(201,110,42,0.5)' : 'linear-gradient(135deg, #c96e2a, #e08742)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 14, fontWeight: 700,
          cursor: busy ? 'wait' : 'pointer',
          marginBottom: 6,
          boxShadow: '0 4px 14px rgba(201,110,42,0.28)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}
      >
        <svg width={15} height={15} viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26"/>
        </svg>
        {busy ? 'Skickar dig till Stripe…' : 'Boosta annons — 99 kr / 7 dagar'}
      </button>
      <p style={{
        fontSize: 11, color: 'var(--txt3)',
        margin: '0 0 16px',
        textAlign: 'center', lineHeight: 1.5,
      }}>
        Boostade annonser visas först i listan med Sponsored-badge. Bra när du vill sälja snabbt.
      </p>
      {err && (
        <div style={{
          padding: '8px 12px', borderRadius: 8,
          background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
          color: '#dc2626', fontSize: 12, marginBottom: 12,
        }}>{err}</div>
      )}
    </>
  )
}
