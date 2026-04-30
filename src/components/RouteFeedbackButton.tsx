'use client'
import { useState } from 'react'
import Icon from '@/components/Icon'

type Props = {
  routeId: string
  startName: string
  endName: string
}

/**
 * RouteFeedbackButton — låter användaren rapportera en felaktig rutt.
 *
 * Klick → modal → fritext + valbar typ (korsar land / fel avstånd / fel hamn /
 * annat) → POST till /api/route-feedback. Crowdsourcad förbättring av
 * waypoint-data är en stor del av hur Svalla håller routing-kvaliteten över
 * tid utan att betala för kommersiella sjökort.
 */
export default function RouteFeedbackButton({ routeId, startName, endName }: Props) {
  const [open, setOpen] = useState(false)
  const [issueType, setIssueType] = useState<'over-land' | 'wrong-distance' | 'wrong-stop' | 'other'>('over-land')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit() {
    if (status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch('/api/route-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          routeId,
          startName,
          endName,
          issueType,
          comment: comment.trim().slice(0, 1000),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setTimeout(() => { setOpen(false); setStatus('idle'); setComment('') }, 1500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 12px', borderRadius: 18,
          background: 'transparent',
          border: '1px solid rgba(43,62,86,0.18)',
          color: 'var(--txt2)',
          fontSize: 12, fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <Icon name="mail" size={13} stroke={2} />
        Rapportera felaktig rutt
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(10,20,35,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%', maxWidth: 480,
              background: 'var(--white)',
              borderRadius: '20px 20px 0 0',
              padding: '22px 22px calc(22px + env(safe-area-inset-bottom, 0px))',
              boxShadow: '0 -12px 48px rgba(0,0,0,0.24)',
              maxHeight: '88dvh', overflowY: 'auto',
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px', color: 'var(--txt)' }}>
              Rapportera felaktig rutt
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>
              {startName} → {endName}. Tack för att du hjälper till att förbättra Svallas farledsdata.
            </p>

            <fieldset style={{ border: 'none', padding: 0, margin: '0 0 14px' }}>
              <legend style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                Vad är fel?
              </legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { v: 'over-land',     label: 'Rutten går över land eller över en ö' },
                  { v: 'wrong-distance', label: 'Avståndet stämmer inte' },
                  { v: 'wrong-stop',    label: 'Ett föreslaget stopp är fel/stängt' },
                  { v: 'other',         label: 'Annat — beskriv nedan' },
                ].map(opt => (
                  <label key={opt.v} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '10px 12px', borderRadius: 10,
                    background: issueType === opt.v ? 'rgba(10,123,140,0.08)' : 'transparent',
                    border: issueType === opt.v ? '1px solid rgba(10,123,140,0.3)' : '1px solid rgba(43,62,86,0.12)',
                    cursor: 'pointer',
                  }}>
                    <input
                      type="radio" name="issue" value={opt.v}
                      checked={issueType === opt.v}
                      onChange={() => setIssueType(opt.v as typeof issueType)}
                      style={{ accentColor: 'var(--sea)' }}
                    />
                    <span style={{ fontSize: 13, color: 'var(--txt)' }}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'block' }}>
                Detaljer (valfritt)
              </span>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                rows={3}
                maxLength={1000}
                placeholder="T.ex. 'Linjen korsar Lidingö norra spetsen — ska gå via Lidingöleden norr.'"
                style={{
                  width: '100%', padding: 12,
                  borderRadius: 10,
                  border: '1px solid rgba(43,62,86,0.18)',
                  background: 'var(--bg)',
                  color: 'var(--txt)',
                  fontSize: 13, lineHeight: 1.55,
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
              <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 4, textAlign: 'right' }}>
                {comment.length} / 1000
              </div>
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={status === 'sending'}
                style={{
                  flex: 1, height: 44, borderRadius: 12,
                  border: '1px solid rgba(43,62,86,0.18)',
                  background: 'transparent', color: 'var(--txt2)',
                  fontSize: 14, fontWeight: 600,
                  cursor: status === 'sending' ? 'default' : 'pointer',
                }}
              >
                Avbryt
              </button>
              <button
                type="button"
                onClick={submit}
                disabled={status === 'sending' || status === 'sent'}
                style={{
                  flex: 1.4, height: 44, borderRadius: 12,
                  border: 'none',
                  background: status === 'sent' ? '#15803d' : 'var(--sea)',
                  color: '#fff',
                  fontSize: 14, fontWeight: 700,
                  cursor: status === 'sending' || status === 'sent' ? 'default' : 'pointer',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {status === 'sending' ? 'Skickar…'
                  : status === 'sent' ? 'Tack! Skickat'
                  : status === 'error' ? 'Försök igen'
                  : 'Skicka rapport'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
