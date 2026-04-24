'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { createRepost, deleteRepost, hasMyRepost, countReposts } from '@/lib/reposts'

export default function RepostButton({
  tripId,
  tripOwnerId,
  compact = false,
}: {
  tripId: string
  tripOwnerId: string
  compact?: boolean
}) {
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [reposted, setReposted] = useState(false)
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) setMe(user.id)
      const c = await countReposts(supabase, tripId)
      setCount(c)
      if (user) {
        const has = await hasMyRepost(supabase, user.id, tripId)
        setReposted(has)
      }
    })
  }, [supabase, tripId])

  // kan inte reposta sin egen tur
  const isOwn = me === tripOwnerId

  async function submitRepost() {
    if (!me) return
    setBusy(true)
    const res = await createRepost(supabase, me, tripId, comment.trim() || null)
    setBusy(false)
    if (res) {
      setReposted(true)
      setCount(c => c + 1)
      setOpen(false)
      setComment('')
    }
  }

  async function undo() {
    if (!me) return
    setBusy(true)
    const ok = await deleteRepost(supabase, me, tripId)
    setBusy(false)
    if (ok) {
      setReposted(false)
      setCount(c => Math.max(0, c - 1))
    }
  }

  if (isOwn) return null

  return (
    <>
      <button onClick={() => reposted ? undo() : setOpen(true)} disabled={busy || !me}
        aria-label={reposted ? 'Ångra repost' : 'Reposta'}
        style={{
          padding: compact ? '4px 8px' : '6px 10px', borderRadius: 10,
          border: '1px solid rgba(10,123,140,0.20)',
          background: reposted ? 'rgba(34,140,56,0.10)' : 'var(--white)',
          fontSize: 12, fontWeight: 700,
          color: reposted ? '#228c38' : 'var(--txt2)',
          cursor: busy ? 'wait' : 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
        </svg>
        {reposted ? 'Repostad' : 'Reposta'}{count > 0 && ` · ${count}`}
      </button>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }} onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Reposta tur"
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 520, background: 'var(--white)',
              borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 30,
            }}
          >
            <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 10px' }}>Reposta denna tur</h2>
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 14px' }}>
              Den visas i ditt flöde med valfri kommentar. Ägaren får en notis.
            </p>

            <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Varför repostar du? (valfritt)"
              maxLength={500} rows={3}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 6, background: 'var(--bg)', color: 'var(--txt)', resize: 'vertical', fontFamily: 'inherit' }} />
            <div style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'right', marginBottom: 12 }}>{comment.length}/500</div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setOpen(false)} disabled={busy}
                className="press-feedback"
                style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
                Avbryt
              </button>
              <button onClick={submitRepost} disabled={busy}
                className="press-feedback"
                style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>
                {busy ? 'Repostar…' : 'Reposta'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
