'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  postId: string
  authorId: string
  currentUserId: string | null
  initialBody: string
  /** Om det är en tråd (OP) — skickar till threads-API och omdirigerar vid delete */
  isThread?: boolean
  threadId?: string
  categoryId?: string
  initialTitle?: string
}

export default function ForumPostActions({
  postId,
  authorId,
  currentUserId,
  initialBody,
  isThread = false,
  threadId,
  categoryId,
  initialTitle = '',
}: Props) {
  const router = useRouter()
  const [mode, setMode] = useState<'idle' | 'edit' | 'deleting'>('idle')
  const [body, setBody]   = useState(initialBody)
  const [title, setTitle] = useState(initialTitle)
  const [saving, setSaving] = useState(false)
  const [err, setErr]     = useState('')
  const [deleted, setDeleted] = useState(false)

  // Visa ingenting om inte inloggad eller inte ägaren
  if (!currentUserId || currentUserId !== authorId) return null
  if (deleted) {
    return (
      <div style={{ marginTop: 10, fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>
        [Borttaget]
      </div>
    )
  }

  const apiBase = isThread
    ? `/api/forum/threads/${threadId ?? postId}`
    : `/api/forum/posts/${postId}`

  async function save() {
    setSaving(true)
    setErr('')
    try {
      const payload = isThread
        ? { title: title.trim(), body: body.trim() }
        : { body: body.trim() }
      const res = await fetch(apiBase, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Något gick fel.'); return }
      setMode('idle')
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  async function del() {
    if (!confirm('Vill du verkligen ta bort detta?')) return
    setSaving(true)
    try {
      const res = await fetch(apiBase, { method: 'DELETE' })
      if (res.ok) {
        if (isThread && categoryId) {
          router.push(`/forum/${categoryId}`)
        } else {
          setDeleted(true)
          router.refresh()
        }
      }
    } finally {
      setSaving(false)
    }
  }

  const btnBase: React.CSSProperties = {
    padding: '4px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600,
    border: 'none', cursor: saving ? 'default' : 'pointer',
    background: 'none',
  }

  if (mode === 'edit') {
    return (
      <div style={{ marginTop: 12 }}>
        {isThread && (
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={200}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '10px 12px', borderRadius: 10,
              border: '1.5px solid var(--sea)',
              background: 'var(--card-bg, #fff)',
              fontSize: 14, fontWeight: 600, color: 'var(--txt)',
              marginBottom: 8, outline: 'none',
            }}
          />
        )}
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={5}
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '10px 12px', borderRadius: 10,
            border: '1.5px solid var(--sea)',
            background: 'var(--card-bg, #fff)',
            fontSize: 14, color: 'var(--txt)',
            resize: 'vertical', lineHeight: 1.6, outline: 'none',
          }}
        />
        {err && <p style={{ fontSize: 13, color: 'var(--red, #ef4444)', margin: '6px 0 0' }}>{err}</p>}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            onClick={save}
            disabled={saving}
            style={{
              ...btnBase,
              padding: '7px 16px',
              background: saving ? '#ccc' : 'var(--sea)',
              color: '#fff',
            }}
          >
            {saving ? '…' : 'Spara'}
          </button>
          <button
            onClick={() => { setMode('idle'); setBody(initialBody); setTitle(initialTitle); setErr('') }}
            disabled={saving}
            style={{ ...btnBase, padding: '7px 16px', background: 'rgba(10,123,140,0.07)', color: 'var(--txt2)' }}
          >
            Avbryt
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
      <button
        onClick={() => setMode('edit')}
        style={{ ...btnBase, color: 'var(--sea)', background: 'rgba(10,123,140,0.06)' }}
      >
        Redigera
      </button>
      <button
        onClick={del}
        disabled={saving}
        style={{ ...btnBase, color: 'var(--red, #ef4444)', background: 'rgba(239,68,68,0.06)' }}
      >
        {saving && mode === 'deleting' ? '…' : 'Ta bort'}
      </button>
    </div>
  )
}
