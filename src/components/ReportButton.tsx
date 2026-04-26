'use client'
import { useState } from 'react'
import { REASON_LABELS } from '@/lib/moderation'
import type { ReportReason, ReportTargetType } from '@/lib/moderation'

interface Props {
  targetType: ReportTargetType
  targetId: string
  /** Valfri label på triggerknappen — default "Anmäl" */
  label?: string
  /** Om true renderas knappen utan ram (för inlining i ⋯-menyer) */
  bare?: boolean
}

export default function ReportButton({ targetType, targetId, label = 'Anmäl', bare = false }: Props) {
  const [open, setOpen]     = useState(false)
  const [reason, setReason] = useState<ReportReason | ''>('')
  const [note, setNote]     = useState('')
  const [busy, setBusy]     = useState(false)
  const [done, setDone]     = useState<'sent' | 'already' | null>(null)
  const [err, setErr]       = useState<string | null>(null)

  function openDialog() { setOpen(true); setDone(null); setErr(null); setReason(''); setNote('') }
  function closeDialog() { setOpen(false) }

  async function submit() {
    if (!reason) { setErr('Välj en anledning.'); return }
    setBusy(true); setErr(null)
    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetType, targetId, reason, note: note.trim() || undefined }),
      })
      const json = await res.json()
      if (!res.ok) { setErr(json.error ?? 'Fel — försök igen'); setBusy(false); return }
      setDone(json.already ? 'already' : 'sent')
    } catch {
      setErr('Nätverksfel — försök igen')
    }
    setBusy(false)
  }

  return (
    <>
      {/* Trigger */}
      {bare ? (
        <button
          onClick={openDialog}
          className="press-feedback"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, color: 'var(--red)', padding: '0 0', textAlign: 'left', width: '100%',
          }}
        >
          {label}
        </button>
      ) : (
        <button
          onClick={openDialog}
          className="press-feedback"
          aria-label={`Anmäl ${targetType}`}
          style={{
            padding: '8px 14px', borderRadius: 10, border: '1px solid rgba(200,30,30,0.3)',
            background: 'rgba(200,30,30,0.05)', color: 'var(--red)', fontSize: 13,
            fontWeight: 600, cursor: 'pointer',
          }}
        >
          {label}
        </button>
      )}

      {/* Dialog */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1200,
            background: 'rgba(0,20,30,0.55)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0 0 env(safe-area-inset-bottom, 0px)',
          }}
          onClick={e => { if (e.target === e.currentTarget) closeDialog() }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Anmäl innehåll"
            style={{
              width: '100%', maxWidth: 480,
              background: 'var(--bg)',
              borderRadius: '20px 20px 0 0',
              padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))',
              boxShadow: '0 -4px 32px rgba(0,20,30,0.18)',
            }}
          >
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.2)', margin: '0 auto 18px' }} />

            {done ? (
              /* Bekräftelse */
              <div style={{ textAlign: 'center', paddingBottom: 10 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{done === 'sent' ? '✅' : 'ℹ️'}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>
                  {done === 'sent' ? 'Anmälan skickad' : 'Redan anmält'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.5, marginBottom: 20 }}>
                  {done === 'sent'
                    ? 'Tack! Vi granskar din anmälan inom kort.'
                    : 'Du har redan anmält detta innehåll.'}
                </div>
                <button
                  onClick={closeDialog}
                  className="press-feedback"
                  style={{
                    padding: '12px 32px', borderRadius: 12, border: 'none',
                    background: 'var(--grad-sea)', color: '#fff',
                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  Stäng
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>
                  Anmäl innehåll
                </h2>
                <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 18px', lineHeight: 1.5 }}>
                  Välj anledning nedan. Anmälningar behandlas av vårt team.
                </p>

                {/* Anledningar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
                  {(Object.entries(REASON_LABELS) as [ReportReason, string][]).map(([key, label]) => (
                    <label
                      key={key}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '10px 14px', borderRadius: 12, cursor: 'pointer',
                        background: reason === key ? 'rgba(200,30,30,0.08)' : 'rgba(10,123,140,0.04)',
                        border: reason === key ? '1.5px solid rgba(200,30,30,0.35)' : '1px solid rgba(10,123,140,0.12)',
                        transition: 'all 0.15s',
                      }}
                    >
                      <input
                        type="radio"
                        name="report-reason"
                        value={key}
                        checked={reason === key}
                        onChange={() => setReason(key)}
                        style={{ accentColor: '#c03', flexShrink: 0 }}
                      />
                      <span style={{ fontSize: 13, color: 'var(--txt)', fontWeight: reason === key ? 600 : 400 }}>
                        {label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Fritext */}
                <label htmlFor="report-note" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>
                  Ytterligare detaljer (valfritt)
                </label>
                <textarea
                  id="report-note"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Beskriv varför du anmäler…"
                  maxLength={500}
                  rows={3}
                  style={{
                    width: '100%', padding: 10, borderRadius: 10, marginBottom: 4,
                    border: '1px solid rgba(10,123,140,0.20)',
                    background: 'var(--bg)', color: 'var(--txt)', fontSize: 13,
                    resize: 'vertical', fontFamily: 'inherit',
                  }}
                />
                <div style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'right', marginBottom: 14 }}>
                  {note.length}/500
                </div>

                {err && (
                  <div style={{
                    padding: 10, borderRadius: 10, marginBottom: 12,
                    background: 'rgba(200,30,30,0.08)', color: 'var(--red)', fontSize: 12,
                  }}>
                    {err}
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    onClick={closeDialog}
                    className="press-feedback"
                    style={{
                      flex: 1, padding: '12px 14px', borderRadius: 12,
                      border: '1px solid rgba(10,123,140,0.20)',
                      background: 'var(--white)', color: 'var(--txt)',
                      fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    }}
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={submit}
                    disabled={busy || !reason}
                    className="press-feedback"
                    style={{
                      flex: 2, padding: '12px 14px', borderRadius: 12, border: 'none',
                      background: reason ? 'linear-gradient(135deg,#c03,#e03030)' : 'rgba(180,180,180,0.3)',
                      color: reason ? '#fff' : 'var(--txt3)',
                      fontWeight: 600, fontSize: 14,
                      cursor: busy || !reason ? 'default' : 'pointer',
                      opacity: busy ? 0.7 : 1,
                    }}
                  >
                    {busy ? 'Skickar…' : 'Skicka anmälan'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
