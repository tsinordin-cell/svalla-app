'use client'
/**
 * LoppisReportButton — diskret rapportera-knapp som öppnar en modal
 * med anledning + valfri kommentar. Visas i botten av annons-vyn för
 * inloggade besökare som inte är ägare.
 */
import { useState } from 'react'
import Link from 'next/link'

const REASONS = [
  { value: 'spam',           label: 'Spam eller bluffannons' },
  { value: 'inappropriate',  label: 'Opassande innehåll' },
  { value: 'misinformation', label: 'Missvisande information' },
  { value: 'harassment',     label: 'Trakasserier' },
  { value: 'other',          label: 'Annat' },
] as const

interface Props {
  threadId: string
  isLoggedIn: boolean
}

export default function LoppisReportButton({ threadId, isLoggedIn }: Props) {
  const [open, setOpen]     = useState(false)
  const [reason, setReason] = useState<typeof REASONS[number]['value']>('spam')
  const [note, setNote]     = useState('')
  const [busy, setBusy]     = useState(false)
  const [done, setDone]     = useState(false)
  const [err, setErr]       = useState('')

  async function submit() {
    if (busy) return
    setBusy(true); setErr('')
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, note }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error ?? 'Kunde inte rapportera.')
      } else {
        setDone(true)
      }
    } catch {
      setErr('Nätverksfel.')
    } finally {
      setBusy(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <Link
        href={`/logga-in?returnTo=${encodeURIComponent(`/forum/loppis/${threadId}`)}`}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 12, color: 'var(--txt3)', textDecoration: 'underline',
          textUnderlineOffset: 2,
        }}
      >
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
        Logga in för att rapportera
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => { setOpen(true); setDone(false); setErr('') }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'transparent', border: 'none', padding: 0,
          color: 'var(--txt3)', fontSize: 12, cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 2,
        }}
      >
        <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
          <line x1="4" y1="22" x2="4" y2="15"/>
        </svg>
        Rapportera annonsen
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => { if (e.target === e.currentTarget && !busy) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 16, backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{
            width: '100%', maxWidth: 440,
            background: 'var(--card-bg, #fff)',
            borderRadius: 16, padding: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
          }}>
            {done ? (
              <div style={{ textAlign: 'center', padding: '12px 4px 8px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                  <svg width={42} height={42} viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="9 12 11 14 15 10"/>
                  </svg>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
                  Tack för rapporten
                </div>
                <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>
                  Vi tittar på den och vidtar åtgärder vid behov.
                </p>
                <button type="button" onClick={() => setOpen(false)} style={{
                  padding: '10px 22px', borderRadius: 12, border: 'none',
                  background: 'var(--sea)', color: '#fff',
                  fontSize: 14, fontWeight: 700, cursor: 'pointer',
                }}>Stäng</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--txt)' }}>
                  Rapportera annons
                </h2>
                <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 14px', lineHeight: 1.5 }}>
                  Hjälp oss hålla Loppis tryggt. Välj anledning nedan.
                </p>
                <div role="radiogroup" style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
                  {REASONS.map(r => (
                    <label key={r.value} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 10,
                      border: reason === r.value ? '1.5px solid var(--sea)' : '1px solid rgba(10,123,140,0.15)',
                      background: reason === r.value ? 'rgba(10,123,140,0.04)' : 'transparent',
                      cursor: 'pointer',
                    }}>
                      <input
                        type="radio"
                        name="report-reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={() => setReason(r.value)}
                        style={{ accentColor: 'var(--sea)' }}
                      />
                      <span style={{ fontSize: 14, color: 'var(--txt)', fontWeight: reason === r.value ? 600 : 500 }}>
                        {r.label}
                      </span>
                    </label>
                  ))}
                </div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Kommentar (valfritt) — max 500 tecken"
                  rows={3}
                  maxLength={500}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '10px 12px', borderRadius: 10,
                    border: '1px solid rgba(10,123,140,0.18)',
                    background: 'var(--bg)',
                    fontSize: 13, color: 'var(--txt)',
                    fontFamily: 'inherit', resize: 'vertical',
                    minHeight: 70, marginBottom: 12,
                  }}
                />
                {err && (
                  <div style={{
                    padding: '8px 12px',
                    background: 'rgba(220,38,38,0.08)',
                    border: '1px solid rgba(220,38,38,0.2)',
                    borderRadius: 8,
                    color: '#dc2626', fontSize: 12,
                    marginBottom: 12,
                  }}>{err}</div>
                )}
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setOpen(false)} disabled={busy} style={{
                    padding: '10px 18px', borderRadius: 10,
                    border: '1px solid rgba(10,123,140,0.18)',
                    background: 'transparent', color: 'var(--txt2)',
                    fontSize: 14, fontWeight: 600,
                    cursor: busy ? 'wait' : 'pointer',
                  }}>Avbryt</button>
                  <button type="button" onClick={submit} disabled={busy} style={{
                    padding: '10px 18px', borderRadius: 10, border: 'none',
                    background: busy ? 'rgba(220,38,38,0.5)' : '#dc2626', color: '#fff',
                    fontSize: 14, fontWeight: 700,
                    cursor: busy ? 'wait' : 'pointer',
                  }}>{busy ? 'Skickar…' : 'Skicka rapport'}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
