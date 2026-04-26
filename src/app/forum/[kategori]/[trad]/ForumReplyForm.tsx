'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

interface Props {
  threadId: string
  categoryId: string
}

export default function ForumReplyForm({ threadId, categoryId }: Props) {
  const router = useRouter()
  const [body, setBody]       = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr]         = useState('')
  const honeypotRef           = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')

    // Anti-spam: honeypot
    if (honeypotRef.current?.value) return

    const trimmed = body.trim()
    if (trimmed.length < 2)  { setErr('Svaret är för kort.'); return }
    if (trimmed.length > 10000) { setErr('Svaret är för långt (max 10 000 tecken).'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/logga-in?returnTo=' + encodeURIComponent(window.location.pathname)
        return
      }

      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threadId, body: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Något gick fel.'); setLoading(false); return }

      setBody('')
      router.refresh()
    } catch {
      setErr('Nätverksfel. Försök igen.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 4 }}>
      {/* Honeypot — dölj med CSS, inte display:none (bots läser CSS) */}
      <input
        ref={honeypotRef}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
      />

      <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '0 0 8px 2px' }}>
        Skriv ett svar
      </h3>

      <textarea
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Dela med dig av din kunskap eller erfarenhet…"
        rows={5}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '12px 14px',
          borderRadius: 12,
          border: '1.5px solid rgba(10,123,140,0.2)',
          background: 'var(--card-bg, #fff)',
          fontSize: 15,
          color: 'var(--txt)',
          resize: 'vertical',
          fontFamily: 'inherit',
          outline: 'none',
          lineHeight: 1.5,
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--sea)')}
        onBlur={e => (e.target.style.borderColor = 'rgba(10,123,140,0.2)')}
      />

      {err && (
        <p style={{ fontSize: 13, color: 'var(--red, #ef4444)', margin: '6px 0 0' }}>{err}</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <span style={{ fontSize: 12, color: body.length > 9500 ? 'var(--red, #ef4444)' : 'var(--txt3)' }}>
          {body.length} / 10 000
        </span>
        <button
          type="submit"
          disabled={loading || body.trim().length < 2}
          style={{
            padding: '11px 24px',
            background: loading || body.trim().length < 2 ? 'var(--txt4, #ccc)' : 'var(--sea)',
            color: '#fff',
            borderRadius: 12,
            border: 'none',
            fontSize: 14,
            fontWeight: 600,
            cursor: loading || body.trim().length < 2 ? 'default' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Skickar…' : 'Svara'}
        </button>
      </div>
    </form>
  )
}
