'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { THORKEL } from '@/lib/thorkel/persona'
import { THORKEL_COPY } from '@/lib/thorkel/copy'
import ThorkelAvatar from './ThorkelAvatar'

/** Tre prickar som pulsera medan Thorkel "tänker" — innan första ordet kommer. */
function ThinkingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', height: 20 }}>
      {[0, 1, 2].map(i => (
        <span
          key={i}
          style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--thor, #2b3e56)',
            opacity: 0.3,
            animation: `thorkel-think 1.2s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes thorkel-think {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0) }
          40%           { opacity: 0.95; transform: translateY(-2px) }
        }
      `}</style>
    </span>
  )
}

/** Blinkande caret efter senaste ordet medan strömmen fortsätter. */
function BlinkingCaret() {
  return (
    <>
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 2, height: '1em',
          marginLeft: 2,
          verticalAlign: '-0.15em',
          background: 'var(--thor, #2b3e56)',
          animation: 'thorkel-caret 1s steps(1) infinite',
        }}
      />
      <style>{`
        @keyframes thorkel-caret {
          0%, 49%   { opacity: 1 }
          50%, 100% { opacity: 0 }
        }
      `}</style>
    </>
  )
}

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
    setAnswer('') // tom sträng = "han har börjat svara, men inget ord än" → triggar svar-vy
    const sentAt = Date.now()
    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: question }] }),
      })

      if (res.status === 401) { setIsLoggedIn(false); setAnswer(null); return }
      if (res.status === 429) { setAnswer(THORKEL_COPY.errors.rateLimit); return }

      // Thorkel "röker på pipan" — håll thinking-state minst 1.8s innan första ordet syns
      const elapsed = Date.now() - sentAt
      const pause = Math.max(0, THORKEL.timing.minThinkMs - elapsed)
      if (pause > 0) await new Promise(r => setTimeout(r, pause))

      // SSE-stream — ord-för-ord-läsning
      if (res.body && res.headers.get('content-type')?.includes('text/event-stream')) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let acc = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const event = JSON.parse(line.slice(6)) as { t?: string; done?: boolean }
              if (event.t !== undefined) {
                acc += event.t
                setAnswer(acc)
              }
            } catch { /* ignore malformed SSE */ }
          }
        }
        if (!acc) setAnswer(THORKEL_COPY.errors.offline)
      } else {
        // Fallback för icke-stream-svar
        const data = await res.json().catch(() => ({} as { reply?: string }))
        setAnswer(data.reply ?? THORKEL_COPY.errors.offline)
      }
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
              minHeight: 60,
            }}>
              {answer === '' ? (
                <ThinkingDots />
              ) : (
                <>
                  {answer}
                  {loading && <BlinkingCaret />}
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={reset}
                disabled={loading}
                style={{
                  flex: 1, height: 44, borderRadius: 12,
                  border: '1px solid rgba(43,62,86,0.2)',
                  background: 'transparent', color: 'var(--thor)',
                  fontSize: 14, fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
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
                  opacity: loading ? 0.6 : 1,
                  pointerEvents: loading ? 'none' : 'auto',
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
