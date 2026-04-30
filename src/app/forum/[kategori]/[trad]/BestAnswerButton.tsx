'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/Icon'

interface Props {
  threadId: string
  postId: string
  /** True om användaren är trådägare (OP) */
  isThreadOwner: boolean
  /** True om denna post redan är markerad som bästa svar */
  isBest: boolean
}

/**
 * Knapp för OP att markera ett svar som "bästa svar".
 * Toggle: klick på markerad post → ta bort markering.
 */
export default function BestAnswerButton({ threadId, postId, isThreadOwner, isBest }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  if (!isThreadOwner) {
    // Om INTE OP men posten är markerad som bästa svar — visa bara badge
    if (isBest) {
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '4px 10px', borderRadius: 8,
          background: 'rgba(34,197,94,0.10)',
          color: '#16a34a',
          fontSize: 11, fontWeight: 700,
          letterSpacing: '0.02em',
        }}>
          <Icon name="check" size={12} stroke={2.5} />
          Bästa svar
        </span>
      )
    }
    return null
  }

  async function toggle() {
    setSaving(true)
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/best-answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: isBest ? null : postId }),
      })
      if (res.ok) router.refresh()
    } finally {
      setSaving(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      title={isBest ? 'Ta bort markering' : 'Markera som bästa svar'}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '4px 10px', borderRadius: 8, border: 'none',
        background: isBest ? 'rgba(34,197,94,0.12)' : 'rgba(10,123,140,0.06)',
        color: isBest ? '#16a34a' : 'var(--sea)',
        fontSize: 11, fontWeight: 700,
        cursor: saving ? 'wait' : 'pointer',
        transition: 'background 0.15s',
        fontFamily: 'inherit',
        letterSpacing: '0.02em',
      }}
      onMouseEnter={e => {
        if (!saving) e.currentTarget.style.background = isBest ? 'rgba(34,197,94,0.20)' : 'rgba(10,123,140,0.12)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isBest ? 'rgba(34,197,94,0.12)' : 'rgba(10,123,140,0.06)'
      }}
    >
      <Icon name="check" size={12} stroke={2.5} />
      {isBest ? 'Bästa svar' : 'Markera som bäst'}
    </button>
  )
}
