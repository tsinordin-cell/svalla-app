'use client'
import { useState } from 'react'

type Props = {
  feedbackId: string
  resolved:   boolean
}

export default function SiteFeedbackActions({ feedbackId, resolved }: Props) {
  const [isResolved, setIsResolved] = useState(resolved)
  const [busy, setBusy]             = useState(false)

  async function toggle() {
    if (busy) return
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/site-feedback/${feedbackId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ resolved: !isResolved }),
      })
      if (res.ok) setIsResolved(prev => !prev)
    } catch { /* ignore */ }
    setBusy(false)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      style={{
        display:     'inline-flex',
        alignItems:  'center',
        gap:         5,
        padding:     '5px 12px',
        borderRadius: 8,
        background:  isResolved ? 'rgba(34,197,94,0.12)' : 'rgba(217,119,6,0.12)',
        color:       isResolved ? '#15803d'               : '#c05010',
        fontSize:    12,
        fontWeight:  700,
        border:      'none',
        cursor:      busy ? 'default' : 'pointer',
        opacity:     busy ? 0.6 : 1,
        transition:  'all 0.15s ease',
        whiteSpace:  'nowrap',
      }}
    >
      {isResolved ? '✓ Löst' : '○ Markera löst'}
    </button>
  )
}
