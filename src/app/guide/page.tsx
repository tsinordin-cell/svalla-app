'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Message = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Vad passar för en familj med barn?',
  'Romantisk helgtur för oss två?',
  'Bra seglingsrutt en hel dag från Ingarö?',
  'Var kan man äta bra i skärgården?',
  'Nybörjare – vilken tur börjar jag med?',
  'Bästa stället att bada i ytterskärgården?',
  'Hur långt är det till Sandhamn från Stockholm?',
  'Äventyrlig tur med flera stopp?',
]

function GuideContent() {
  const searchParams = useSearchParams()
  const preselectedTour = searchParams.get('tur')

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState(preselectedTour ? `Berätta mer om turen: ${preselectedTour}` : '')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Auto-fokusera inmatningsfältet vid sidladdning
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  }, [])

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
      const data = await res.json()
      setMessages([...next, { role: 'assistant', content: data.reply ?? 'Något gick fel, försök igen.' }])
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Kunde inte nå guiden just nu.' }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg, #f7fbfc)' }}>
      {/* Header */}
      <header style={{
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 2px 12px rgba(0,45,60,0.15)',
        flexShrink: 0,
      }}>
        <Link href="/feed" style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,255,255,0.15)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>🧭 Skärgårdsguiden</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Fråga om turer, restauranger och tips</div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={() => { setMessages([]); setInput('') }}
            style={{
              background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
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
            {/* Welcome */}
            <div style={{
              background: 'var(--white, #fff)', borderRadius: 16, padding: '16px',
              border: '1.5px solid rgba(10,123,140,0.10)',
              marginBottom: 16,
              boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--sea)', margin: '0 0 6px' }}>Hej! Jag är Svallas guide.</h2>
              <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.5 }}>
                Jag känner till turer, restauranger och hamnar i hela Stockholms skärgård. Berätta vad du är ute efter – sällskap, tid, om du vill bada, äta eller segla – så hittar vi rätt tur.
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
                  background: 'var(--white, #fff)', border: '1.5px solid rgba(10,123,140,0.10)',
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
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, alignSelf: 'flex-end',
              }}>🧭</div>
            )}
            <div style={{
              maxWidth: '82%', padding: '11px 14px', borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: m.role === 'user' ? 'linear-gradient(135deg, #1e5c82, #2d7d8a)' : '#fff',
              color: m.role === 'user' ? '#fff' : '#162d3a',
              fontSize: 13, lineHeight: 1.55,
              border: m.role === 'assistant' ? '1.5px solid rgba(10,123,140,0.10)' : 'none',
              boxShadow: '0 1px 4px rgba(0,45,60,0.07)',
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>🧭</div>
            <div style={{
              padding: '11px 14px', borderRadius: '18px 18px 18px 4px',
              background: 'var(--white, #fff)', border: '1.5px solid rgba(10,123,140,0.10)',
              display: 'flex', gap: 5, alignItems: 'center',
            }}>
              {[0, 0.15, 0.3].map((d, i) => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#a0c4d0',
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

      {/* Input */}
      <div style={{
        padding: '10px 14px',
        paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 10px)',
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(10,123,140,0.10)',
        flexShrink: 0,
      }}>
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
              background: 'var(--white, #fff)', fontSize: 13, resize: 'none', outline: 'none',
              fontFamily: 'inherit', color: 'var(--txt, #162d3a)',
              maxHeight: 120, overflowY: 'auto',
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
              background: input.trim() && !loading
                ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
                : 'rgba(10,123,140,0.12)',
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
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: 'var(--txt3)' }}>Laddar guide…</div>}>
      <GuideContent />
    </Suspense>
  )
}
