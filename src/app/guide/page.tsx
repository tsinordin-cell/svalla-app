'use client'
import React, { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import ThorkelAvatar from '@/components/thorkel/ThorkelAvatar'
import { THORKEL } from '@/lib/thorkel/persona'
import { THORKEL_COPY } from '@/lib/thorkel/copy'

type Message = { role: 'user' | 'assistant'; content: string }

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
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Auth-check: Thorkel kräver inloggning (förhindrar API-kostnad från bots)
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

  // Auto-fokusera och auto-skicka om fråga är förifylld (bara om inloggad)
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

  async function send(text?: string) {
    const msg = (text ?? input).trim()
    if (!msg || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: msg }]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/guide', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json().catch(() => ({} as { reply?: string; error?: string }))
      if (res.status === 401) {
        setIsLoggedIn(false)
        setMessages([...next, { role: 'assistant', content: 'Du behöver logga in för att prata med mig — jag sparar mina bästa tips till mina egna seglare.' }])
      } else if (res.status === 429) {
        setMessages([...next, { role: 'assistant', content: 'Tar en paus — vänta en minut så pratar vi vidare.' }])
      } else if (data.reply) {
        setMessages([...next, { role: 'assistant', content: data.reply }])
      } else {
        setMessages([...next, { role: 'assistant', content: 'Något gick fel, försök igen.' }])
      }
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Kunde inte nå Thorkel just nu.' }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg)' }}>
      {/* Header — Thorkel-palett (marinblå, ingen gradient) */}
      <header style={{
        padding: '12px 16px',
        background: 'var(--thor)',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 2px 12px rgba(10,20,35,0.25)',
        flexShrink: 0,
      }}>
        <Link href="/feed" style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.12)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <ThorkelAvatar size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{THORKEL.name}</div>
          <div style={{ fontSize: 11, color: 'rgba(239,228,204,0.75)', fontStyle: 'italic' }}>
            {THORKEL.title} · {THORKEL.bio}
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); setInput('') }}
            style={{
              background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
              padding: '6px 12px', borderRadius: 20, color: '#fff',
              fontSize: 11, fontWeight: 700, flexShrink: 0,
            }}
          >
            Ny konversation
          </button>
        )}
      </header>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px 8px' }}>
        {messages.length === 0 && (
          <div>
            {/* Welcome — stor avatar, bio, stoisk intro */}
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

            {/* Suggestions */}
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
                <ThorkelAvatar size={32} />
              </div>
            )}
            <div style={{
              maxWidth: '82%', padding: '12px 15px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? 'var(--thor)' : 'var(--thor-l)',
              color: m.role === 'user' ? '#fff' : 'var(--txt)',
              fontSize: 14, lineHeight: 1.7,
              border: m.role === 'assistant' ? '1px solid rgba(43,62,86,0.12)' : 'none',
              boxShadow: m.role === 'assistant' ? '0 1px 4px rgba(10,20,35,0.05)' : 'none',
              whiteSpace: 'pre-wrap',
            }}>
              {m.role === 'assistant' ? renderMarkdown(m.content) : m.content}
            </div>
          </div>
        ))}

        {loading && (
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
