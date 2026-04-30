'use client'
import { useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/Icon'

type Props = {
  feedbackId: string
  routeId: string
  resolved: boolean
}

export default function FeedbackActions({ feedbackId, routeId, resolved }: Props) {
  const [isResolved, setIsResolved] = useState(resolved)
  const [busy, setBusy] = useState(false)

  async function toggle() {
    if (busy) return
    setBusy(true)
    try {
      const res = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolved: !isResolved }),
      })
      if (res.ok) {
        setIsResolved(!isResolved)
      }
    } catch { /* ignore */ }
    setBusy(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Link
        href={`/planera/${routeId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '5px 10px', borderRadius: 8,
          background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
          fontSize: 11, fontWeight: 700, textDecoration: 'none',
        }}
      >
        <Icon name="map" size={11} stroke={2} />
        Öppna rutt
      </Link>
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '5px 10px', borderRadius: 8,
          background: isResolved ? 'rgba(34,197,94,0.12)' : 'rgba(217,119,6,0.12)',
          color: isResolved ? '#15803d' : '#c05010',
          fontSize: 11, fontWeight: 700,
          border: 'none', cursor: busy ? 'default' : 'pointer',
          opacity: busy ? 0.6 : 1,
        }}
      >
        <Icon name={isResolved ? 'check' : 'compass'} size={11} stroke={2} />
        {isResolved ? 'Löst' : 'Markera löst'}
      </button>
    </div>
  )
}
