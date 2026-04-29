'use client'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThorkelAvatar from '@/components/thorkel/ThorkelAvatar'
import { THORKEL } from '@/lib/thorkel/persona'
import { THORKEL_COPY } from '@/lib/thorkel/copy'
import type { PlanData } from '@/app/api/guide/route'

type Message = {
  role: 'user' | 'assistant'
  content: string
  followUps?: string[]
  planData?: PlanData | null
}

function renderMarkdown(text: string): React.ReactNode[] {
  const segments = text.split(/(\[.+?\]\(.+?\)|\*\*.+?\*\*)/g)
  return segments.map((seg, i) => {
    const link = seg.match(/^\[(.+?)\]\((.+?)\)$/)
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'underline' }}>{link[1]}</a>
    const bold = seg.match(/^\*\*(.+?)\*\*$/)
    if (bold) return <strong key={i}>{bold[1]}</strong>
    return <span key={i}>{seg}</span>
  })
}

function ThinkingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', height: 20 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--thor, #2b3e56)', opacity: 0.3,
          animation: `thorkel-think 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
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

function BlinkingCaret() {
  return (
    <>
      <span aria-hidden style={{
        display: 'inline-block', width: 2, height: '1em',
        marginLeft: 2, verticalAlign: '-0.15em',
        background: 'var(--thor, #2b3e56)',
        animation: 'thorkel-caret 1s steps(1) infinite',
      }} />
      <style>{`
        @keyframes thorkel-caret {
          0%, 49%   { opacity: 1 }
          50%, 100% { opacity: 0 }
        }
      `}</style>
    </>
  )
}

const SUGGESTIONS = [
  'Vad passar för en familj med barn?',
  'Romantisk helgtur för oss två?',
  'Var kan man boka bord i skärgården?',
  'Bra seglingsrutt en hel dag från Ingarö?',
  'Var kan man äta bra i skärgården?',
  'Nybörjare – vilken tur börjar jag med?',
  'Bästa stället att bada i ytterskärgården?',
  'Äventyrlig tur med flera stopp och matrestopp?',
]

function GuideContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const preselectedTour = searchParams.get('tur')
  const preselectedQ = searchParams.get('fråga') ?? searchParams.get('fraga')

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState(
    preselectedQ ? preselectedQ
    : preselectedTour ? `Berätta mer om turen: ${preselectedTour}`
    : ''
  )
  const [loading, setLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savingPlan, setSavingPlan] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user)
      setAuthChecked(true)
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (!authChecked) return
    if (preselectedQ && isLoggedIn) {
      const timer = setTimeout(() => send(preselectedQ), 400)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => inputRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authChecked, isLoggedIn])

  async function savePlan(planData: PlanData) {
    setSavingPlan(true)
    try {
      const res = await fetch('/api/planera/create', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(planData),
      })
      const json = await res.json()
      if (json.id) router.push(`/planera/${json.id}`)
    } catch { /* silent */ } finally {
      setSavingPlan(false)
    }
  }

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')

    const userMsg: Message = { role: 'user', content: msg }
    const apiMessages = [...messages, userMsg]
    const assistantIdx = apiMessages.length

    // Add user message + empty assistant slot immediately for streaming display
    setMessages([...apiMessages, { role: 'assistant', content: '' }])
    setLoading(true)

    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      if (res.status === 401) {
        setIsLoggedIn(false)
        setMessages(prev => {
          const u = [...prev]
          u[assistantIdx] = { role: 'assistant', content: 'Du behöver logga in för att prata med mig — jag sparar mina bästa tips till mina egna seglare.' }
          return u
        })
        return
      }
      if (res.status === 429) {
        setMessages(prev => {
          const u = [...prev]
          u[assistantIdx] = { role: 'assistant', content: 'Tar en paus — vänta en minut så pratar vi vidare.' }
          return u
        })
        return
      }

      if (res.body && res.headers.get('content-type')?.includes('text/event-stream')) {
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let accText = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            try {
              const event = JSON.parse(line.slice(6)) as { t?: string; done?: boolean; followUps?: string[]; planData?: PlanData | null }
              if (event.t !== undefined) {
                accText += event.t
                setMessages(prev => {
                  const u = [...prev]
                  u[assistantIdx] = { role: 'assistant', content: accText }
                  return u
                })
              } else if (event.done) {
                setMessages(prev => {
                  const u = [...prev]
                  u[assistantIdx] = {
                    role: 'assistant',
                    content: accText,
                    followUps: event.followUps ?? [],
                    planData: event.planData ?? null,
                  }
                  return u
                })
              }
            } catch { /* ignore malformed SSE line */ }
          }
        }
      } else {
        // Fallback for non-stream JSON (shouldn't happen for 200 responses)
        const data = await res.json().catch(() => ({} as { reply?: string }))
        setMessages(prev => {
          const u = [...prev]
          u[assistantIdx] = { role: 'assistant', content: data.reply ?? 'Något gick fel, försök igen.' }
          return u
        })
      }
    } catch {
      setMessages(prev => {
        const u = [...prev]
        u[assistantIdx] = { role: 'assistant', content: 'Kunde inte nå Thorkel just nu.' }
        return u
      })
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  // Visa separat thinking-bubbla bara om det INTE redan finns en tom assistant-msg
  // i listan (annars renderar messages.map en egen ThinkingDots inuti den bubblan).
  const lastMsg = messages[messages.length - 1]
  const showLoadingDots = loading && lastMsg?.role !== 'assistant'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg)' }}>
      {/* Header */}
      <header style={{
        padding: '12px 14px 12px 12px',
        background: 'var(--thor)',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 2px 12px rgba(10,20,35,0.25)',
        flexShrink: 0,
      }}>
        <Link href="/feed" style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.12)',
          flexShrink: 0,
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <ThorkelAvatar size={36} talking={loading} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 15, fontWeight: 700, color: '#fff',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {THORKEL.name}
          </div>
          <div style={{
            fontSize: 11, color: 'rgba(239,228,204,0.75)', fontStyle: 'italic',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {THORKEL.title} · {THORKEL.bio}
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); setInput('') }}
            aria-label="Starta ny konversation"
            title="Ny konversation"
            style={{
              background: 'rgba(255,255,255,0.14)',
              border: '1px solid rgba(255,255,255,0.18)',
              cursor: 'pointer',
              width: 36, height: 36,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%',
              color: '#fff',
              flexShrink: 0,
              padding: 0,
              transition: 'background 150ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </header>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 8px' }}>
        {messages.length === 0 && (
          <div>
            <div style={{
              background: 'var(--white)', borderRadius: 16, padding: '24px 20px 20px',
              border: '1px solid rgba(43,62,86,0.12)',
              marginBottom: 16,
              boxShadow: '0 2px 10px rgba(10,20,35,0.06)',
              textAlign: 'center',
            }}>
              <div style={{ display: 'inline-block', marginBottom: 10 }}>
                <ThorkelAvatar size={80} priority />
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: '0 0 2px' }}>
                {THORKEL.name}
              </h2>
              <div style={{ fontSize: 12, color: 'var(--txt2)', fontStyle: 'italic', marginBottom: 14 }}>
                {THORKEL.title} · {THORKEL.bio}
              </div>
              <p style={{
                fontSize: 14, color: 'var(--txt)', margin: 0,
                lineHeight: 1.7,
                maxWidth: 380, marginLeft: 'auto', marginRight: 'auto',
              }}>
                {THORKEL_COPY.intros[0]}
              </p>
            </div>

            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
                Vanliga frågor
              </div>
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '11px 14px', marginBottom: 6, borderRadius: 12,
                  background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.10)',
                  fontSize: 13, color: 'var(--sea)', fontWeight: 600, cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,45,60,0.04)',
                }}>
                  {s} →
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
            gap: 8, marginBottom: 12,
          }}>
            {m.role === 'assistant' && (
              <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
                <ThorkelAvatar size={32} talking={loading && i === messages.length - 1} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: '82%' }}>
              <div style={{
                padding: '12px 15px',
                borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                background: m.role === 'user' ? 'var(--thor)' : 'var(--thor-l)',
                color: m.role === 'user' ? '#fff' : 'var(--txt)',
                fontSize: 14, lineHeight: 1.7,
                border: m.role === 'assistant' ? '1px solid rgba(43,62,86,0.12)' : 'none',
                boxShadow: m.role === 'assistant' ? '0 1px 4px rgba(10,20,35,0.05)' : 'none',
                whiteSpace: 'pre-wrap',
              }}>
                {m.role === 'assistant'
                  ? (m.content === ''
                      ? <ThinkingDots />
                      : <>{renderMarkdown(m.content)}{loading && i === messages.length - 1 && <BlinkingCaret />}</>
                    )
                  : m.content
                }
              </div>

              {/* Follow-up suggestion chips */}
              {m.role === 'assistant' && m.followUps && m.followUps.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {m.followUps.map((q, qi) => (
                    <button key={qi} onClick={() => send(q)} style={{
                      padding: '5px 11px', borderRadius: 14,
                      background: 'var(--white)',
                      border: '1.5px solid rgba(43,62,86,0.15)',
                      fontSize: 12, color: 'var(--thor)', fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(10,20,35,0.05)',
                    }}>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Save as plan button — shown when Thorkel ran the route planner */}
              {m.role === 'assistant' && m.planData && (
                <button
                  onClick={() => savePlan(m.planData!)}
                  disabled={savingPlan}
                  style={{
                    padding: '8px 16px', borderRadius: 20,
                    background: savingPlan ? 'rgba(10,123,140,0.4)' : 'var(--sea)',
                    color: '#fff',
                    border: 'none', cursor: savingPlan ? 'default' : 'pointer',
                    fontSize: 13, fontWeight: 700,
                    alignSelf: 'flex-start',
                    transition: 'all 0.2s',
                  }}
                >
                  {savingPlan ? 'Sparar…' : 'Spara som plan →'}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Loading dots — only show before first streaming chunk arrives */}
        {showLoadingDots && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <ThorkelAvatar size={32} />
            <div style={{
              padding: '12px 15px', borderRadius: '18px 18px 18px 4px',
              background: 'var(--thor-l)', border: '1px solid rgba(43,62,86,0.12)',
              display: 'flex', gap: 5, alignItems: 'center',
            }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: '50%', background: 'var(--thor)',
                  display: 'inline-block',
                  animation: 'bounce 1.2s infinite',
                  animationDelay: `${d}s`,
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input — eller login-CTA om inte inloggad */}
      <div style={{
        padding: '10px 14px',
        paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 10px)',
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(10,123,140,0.10)',
        flexShrink: 0,
      }}>
        {authChecked && !isLoggedIn ? (
          <Link href="/logga-in?returnTo=/guide" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px 18px', borderRadius: 20,
            background: 'var(--thor)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(10,20,35,0.25)',
          }}>
            Logga in för att prata med Thorkel →
          </Link>
        ) : (
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Fråga om turer, bad, mat…"
            rows={1}
            style={{
              flex: 1, padding: '11px 14px', borderRadius: 20,
              border: '1.5px solid rgba(10,123,140,0.18)',
              background: 'var(--white)', fontSize: 13, resize: 'none', outline: 'none',
              fontFamily: 'inherit', color: 'var(--txt)',
              maxHeight: 120, overflowY: 'auto',
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: input.trim() && !loading
                ? 'var(--thor)'
                : 'rgba(43,62,86,0.12)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={input.trim() && !loading ? 'white' : 'var(--txt3)'} strokeWidth={2.5} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m-7 7l7-7 7 7" />
            </svg>
          </button>
        </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function GuidePage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: 'var(--txt3)' }}>Laddar Thorkel…</div>}>
      <GuideContent />
    </Suspense>
  )
}
