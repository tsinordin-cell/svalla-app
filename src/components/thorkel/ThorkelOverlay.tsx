'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { THORKEL } from '@/lib/thorkel/persona'
import { THORKEL_COPY } from '@/lib/thorkel/copy'
import ThorkelAvatar from './ThorkelAvatar'

type Props = {
  open: boolean
  onClose: () => void
  /** Förifylld fråga (ex: "Berätta mer om Sandhamn"). Valfritt. */
  preselectedQuestion?: string
}

/**
 * Overlay från entry-points som inte är /guide (floating chip på /rutter,
 * CTA på /planera-tur, etc.). Konsumerar samma /api/guide som dedikerade
 * chat-sidan — en enda runda (fråga → svar), ingen konversations-state.
 * För längre samtal — skicka användaren till /guide.
 */
export default function ThorkelOverlay({ open, onClose, preselectedQuestion }: Props) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auth-check när overlay öppnas
  useEffect(() => {
    if (!open) return
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setIsLoggedIn(!!user))
    if (preselectedQuestion) setQuestion(preselectedQuestion)
  }, [open, preselectedQuestion])

  // Fokusera textarea när overlay öppnas
  useEffect(() => {
    if (open && isLoggedIn && !answer) {
      setTimeout(() => textareaRef.current?.focus(), 150)
    }
  }, [open, isLoggedIn, answer])

  // ESC stänger
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const placeholder = useMemo(
    () => THORKEL_COPY.placeholders[Math.floor(Math.random() * THORKEL_COPY.placeholders.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open], // nytt exempel varje gång overlay öppnas
  )
  const loadingText = useMemo(
    () => THORKEL_COPY.loading[Math.floor(Math.random() * THORKEL_COPY.loading.length)],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading],
  )

  async function submit() {
    if (!question.trim() || loading) return
    setLoading(true)
    const sentAt = Date.now()
    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
      })
      const data = await res.json().catch(() => ({}))

      // Thorkel röker på pipan först — minst 1.8s innan svar syns
      const elapsed = Date.now() - sentAt
      const pause = Math.max(0, THORKEL.timing.minThinkMs - elapsed)
      if (pause > 0) await new Promise(r => setTimeout(r, pause))

      if (res.status === 401) { setIsLoggedIn(false); return }
      if (res.status === 429) { setAnswer(THORKEL_COPY.errors.rateLimit); return }
      setAnswer(data.reply ?? THORKEL_COPY.errors.offline)
    } catch {
      setAnswer(THORKEL_COPY.errors.offline)
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setAnswer(null)
    setQuestion('')
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="thorkel-overlay-title"
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10,20,35,0.55)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%', maxWidth: 480,
          background: 'var(--white)',
          borderRadius: '24px 24px 0 0',
          padding: '28px 24px calc(24px + env(safe-area-inset-bottom, 0px))',
          boxShadow: '0 -12px 48px rgba(0,0,0,0.24)',
          color: 'var(--txt)',
          maxHeight: '86dvh',
          overflowY: 'auto',
        }}
      >
        {/* Drag-handle */}
        <div style={{
          width: 44, height: 4, borderRadius: 2,
          background: 'rgba(10,40,80,0.15)',
          margin: '-8px auto 18px',
        }} />

        {/* Intro — avatar + namn */}
        <div style={{ textAlign: 'center', marginBottom: 22 }}>
          <ThorkelAvatar size={80} priority />
          <h2 id="thorkel-overlay-title" style={{
            fontSize: 20, fontWeight: 700, color: 'var(--txt)',
            margin: '12px 0 2px',
          }}>
            {THORKEL.name}
          </h2>
          <div style={{ fontSize: 13, color: 'var(--txt2)', fontStyle: 'italic' }}>
            {THORKEL.title} · {THORKEL.bio}
          </div>
        </div>

        {/* Login-gate: visar login-CTA istf textarea */}
        {isLoggedIn === false ? (
          <Link
            href="/logga-in?returnTo=/guide"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: 48, borderRadius: 12,
              background: 'var(--thor)', color: '#fff',
              fontSize: 15, fontWeight: 600, textDecoration: 'none',
            }}
          >
            Logga in för att prata med mig →
          </Link>
        ) : !answer ? (
          <>
            <textarea
              ref={textareaRef}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit() }
              }}
              placeholder={placeholder}
              disabled={loading}
              rows={4}
              style={{
                width: '100%', padding: 14,
                fontSize: 15, lineHeight: 1.55,
                border: '1px solid rgba(43,62,86,0.18)',
                borderRadius: 12,
                background: 'var(--thor-l)',
                color: 'var(--txt)',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              onClick={submit}
              disabled={loading || !question.trim()}
              style={{
                marginTop: 12, width: '100%', height: 48,
                border: 'none', borderRadius: 12,
                background: 'var(--thor)',
                color: '#fff', fontSize: 15, fontWeight: 600,
                cursor: loading || !question.trim() ? 'default' : 'pointer',
                opacity: loading || !question.trim() ? 0.6 : 1,
                transition: 'opacity 150ms ease',
              }}
            >
              {loading ? loadingText : `${THORKEL_COPY.cta.send} →`}
            </button>
          </>
        ) : (
          <>
            <div style={{
              padding: 16, marginBottom: 14,
              background: 'var(--thor-l)',
              borderRadius: 12,
              fontSize: 15, lineHeight: 1.7,
              color: 'var(--txt)',
              whiteSpace: 'pre-wrap',
            }}>
              {answer}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={reset}
                style={{
                  flex: 1, height: 44, borderRadius: 12,
                  border: '1px solid rgba(43,62,86,0.2)',
                  background: 'transparent', color: 'var(--thor)',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}
              >
                Fråga en till
              </button>
              <Link
                href="/guide"
                style={{
                  flex: 1, height: 44, borderRadius: 12,
                  border: 'none',
                  background: 'var(--thor)', color: '#fff',
                  fontSize: 14, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                Fortsätt i chatten →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
