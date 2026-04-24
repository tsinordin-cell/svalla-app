'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  reportId: string
}

export default function ModerationActions({ reportId }: Props) {
  const router = useRouter()
  const [busy, setBusy]   = useState<string | null>(null)
  const [err, setErr]     = useState<string | null>(null)
  const [done, setDone]   = useState(false)

  async function act(status: 'reviewed' | 'actioned' | 'dismissed') {
    setBusy(status); setErr(null)
    try {
      const res = await fetch('/api/admin/report', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, status }),
      })
      if (res.ok) {
        setDone(true)
        router.refresh()
      } else {
        const j = await res.json()
        setErr(j.error ?? 'Fel')
      }
    } catch {
      setErr('Nätverksfel')
    }
    setBusy(null)
  }

  if (done) {
    return (
      <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 600 }}>✓ Åtgärdad</div>
    )
  }

  const btnBase: React.CSSProperties = {
    padding: '8px 16px', borderRadius: 10, border: 'none',
    fontSize: 12, fontWeight: 700, cursor: 'pointer',
    transition: 'opacity 0.15s',
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => act('reviewed')}
          disabled={!!busy}
          style={{ ...btnBase, background: 'rgba(30,92,130,0.1)', color: 'var(--sea)' }}
        >
          {busy === 'reviewed' ? '…' : '👁 Granskad'}
        </button>
        <button
          onClick={() => act('actioned')}
          disabled={!!busy}
          style={{ ...btnBase, background: 'rgba(22,163,74,0.1)', color: '#16a34a' }}
        >
          {busy === 'actioned' ? '…' : '✅ Åtgärda'}
        </button>
        <button
          onClick={() => act('dismissed')}
          disabled={!!busy}
          style={{ ...btnBase, background: 'rgba(107,114,128,0.1)', color: '#6b7280' }}
        >
          {busy === 'dismissed' ? '…' : '✕ Avfärda'}
        </button>
      </div>
      {err && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{err}</div>}
    </div>
  )
}
