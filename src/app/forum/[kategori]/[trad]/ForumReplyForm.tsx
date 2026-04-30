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

  const isReady = !loading && body.trim().length >= 2

  return (
    <div style={{
      background: 'var(--card-bg, #fff)',
      borderRadius: 18,
      border: '1px solid var(--border, rgba(10,123,140,0.12))',
      boxShadow: '0 2px 14px rgba(10,123,140,0.08)',
      overflow: 'hidden',
    }}>
      {/* Form header */}
      <div style={{
        padding: '13px 18px 12px',
        background: 'linear-gradient(90deg, rgba(10,123,140,0.05) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(10,123,140,0.08)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
        </svg>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)', letterSpacing: '0.01em' }}>
          Skriv ett svar
        </span>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '14px 16px 16px' }}>
        {/* Honeypot */}
        <input
          ref={honeypotRef}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
        />

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
            border: '1.5px solid rgba(10,123,140,0.15)',
            background: 'rgba(10,123,140,0.02)',
            fontSize: 15,
            color: 'var(--txt)',
            resize: 'vertical',
            fontFamily: 'inherit',
            outline: 'none',
            lineHeight: 1.65,
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
        />

        {err && (
          <p style={{ fontSize: 13, color: 'var(--red, #ef4444)', margin: '8px 0 0', padding: '8px 12px', background: 'rgba(239,68,68,0.07)', borderRadius: 8 }}>{err}</p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ fontSize: 12, color: body.length > 9500 ? 'var(--red, #ef4444)' : 'var(--txt3)' }}>
            {body.length} / 10 000
          </span>
          <button
            type="submit"
            disabled={!isReady}
            className={isReady ? 'press-feedback' : ''}
            style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '11px 24px',
              background: isReady ? 'var(--grad-sea)' : 'rgba(10,123,140,0.10)',
              color: isReady ? '#fff' : 'var(--txt3)',
              borderRadius: 12,
              border: 'none',
              fontSize: 14,
              fontWeight: 700,
              cursor: isReady ? 'pointer' : 'default',
              transition: 'all 0.15s',
              boxShadow: isReady ? '0 3px 12px rgba(10,123,140,0.30)' : 'none',
              letterSpacing: '0.01em',
            }}
          >
            {loading ? (
              'Skickar…'
            ) : (
              <>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7Z" />
                </svg>
                Svara
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
