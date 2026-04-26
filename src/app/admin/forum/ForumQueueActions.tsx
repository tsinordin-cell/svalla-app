'use client'
import { useState } from 'react'

export default function ForumQueueActions({
  id,
  type,
}: {
  id: string
  type: 'thread' | 'post'
}) {
  const [loading, setLoading] = useState<'approve' | 'delete' | null>(null)
  const [done, setDone] = useState<'approved' | 'deleted' | null>(null)

  async function act(action: 'approve' | 'delete') {
    setLoading(action)
    try {
      const res = await fetch('/api/admin/forum', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, action }),
      })
      if (res.ok) setDone(action === 'approve' ? 'approved' : 'deleted')
    } finally {
      setLoading(null)
    }
  }

  if (done) {
    return (
      <div style={{
        marginTop: 10, fontSize: 12, fontWeight: 600,
        color: done === 'approved' ? 'var(--sea)' : 'var(--txt3)',
      }}>
        {done === 'approved' ? '✓ Godkänd — visas nu i forumet' : '✓ Borttagen'}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
      <button
        onClick={() => act('approve')}
        disabled={loading !== null}
        style={{
          padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: loading === 'approve' ? '#ccc' : 'var(--sea)', color: '#fff',
          border: 'none', cursor: loading !== null ? 'default' : 'pointer',
          transition: 'background 0.15s',
        }}
      >
        {loading === 'approve' ? '…' : '✓ Godkänn'}
      </button>
      <button
        onClick={() => act('delete')}
        disabled={loading !== null}
        style={{
          padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          background: 'rgba(239,68,68,0.08)',
          color: loading === 'delete' ? '#ccc' : 'var(--red, #ef4444)',
          border: '1px solid rgba(239,68,68,0.2)',
          cursor: loading !== null ? 'default' : 'pointer',
          transition: 'all 0.15s',
        }}
      >
        {loading === 'delete' ? '…' : '✗ Ta bort'}
      </button>
    </div>
  )
}
