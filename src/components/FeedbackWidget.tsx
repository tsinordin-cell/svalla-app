'use client'

import { useState, useEffect } from 'react'
import Icon from './Icon'
import { usePathname } from 'next/navigation'

type FeedbackType = 'fel-info' | 'saknar-info' | 'tips' | 'annat'

const TYPE_LABELS: Record<FeedbackType, string> = {
  'fel-info':     'Fel information',
  'saknar-info':  'Saknar info',
  'tips':         'Tips / förslag',
  'annat':        'Annat',
}

const TYPE_PLACEHOLDERS: Record<FeedbackType, string> = {
  'fel-info':    'Beskriv vad som är fel och hur det borde stå...',
  'saknar-info': 'Vad saknar du? Vilken ö eller sida gäller det?',
  'tips':        'Dela ditt förslag — stora som små mottages med glädje!',
  'annat':       'Skriv vad du har på hjärtat...',
}

export default function FeedbackWidget() {
  const [open, setOpen]       = useState(false)
  const [type, setType]       = useState<FeedbackType>('tips')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [error, setError]     = useState('')
  const pathname              = usePathname()

  // Återställ formulär när modalen stängs
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setMessage('')
        setType('tips')
        setError('')
        setDone(false)
        setLoading(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [open])

  // Stäng med Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // Öppnas utifrån via custom event (t.ex. från inline-feedbacklänk på ö-sidor)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { type?: FeedbackType } | undefined
      if (detail?.type) setType(detail.type)
      setOpen(true)
    }
    window.addEventListener('svalla:openFeedback', handler)
    return () => window.removeEventListener('svalla:openFeedback', handler)
  }, [])

  // Lås scroll när modalen är öppen
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function handleSubmit() {
    const trimmed = message.trim()
    if (trimmed.length < 5) {
      setError('Skriv minst 5 tecken.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/feedback', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          feedbackType: type,
          message:      trimmed,
          pageUrl:      window.location.href,
        }),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { error?: string }
        setError(d.error ?? 'Något gick fel. Försök igen.')
        setLoading(false)
        return
      }
      setDone(true)
      setTimeout(() => setOpen(false), 2800)
    } catch {
      setError('Nätverksfel — kontrollera anslutningen och försök igen.')
      setLoading(false)
    }
  }

  return (
    <>
      {/* ── Flytande knapp ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Skicka feedback eller tips till Svalla"
        style={{
          position:   'fixed',
          bottom:     'calc(var(--nav-h, 0px) + env(safe-area-inset-bottom, 0px) + 14px)',
          right:      16,
          zIndex:     800,
          background: 'var(--sea)',
          color:      'var(--white)',
          border:     'none',
          borderRadius: 50,
          padding:    '9px 15px 9px 12px',
          display:    'flex',
          alignItems: 'center',
          gap:        6,
          fontSize:   13,
          fontWeight: 700,
          cursor:     'pointer',
          boxShadow:  '0 4px 16px rgba(10,123,140,0.38)',
          letterSpacing: '0.01em',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform  = 'scale(1.05)'
          el.style.boxShadow  = '0 6px 22px rgba(10,123,140,0.48)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLButtonElement
          el.style.transform  = ''
          el.style.boxShadow  = '0 4px 16px rgba(10,123,140,0.38)'
        }}
      >
        <Icon name="quote" size={15} stroke={2} />
        Tipsa oss
      </button>

      {/* ── Backdrop + modal ── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Skicka feedback"
          onClick={() => setOpen(false)}
          style={{
            position:    'fixed',
            inset:       0,
            zIndex:      1010,
            background:  'rgba(10,28,40,0.52)',
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)',
            display:     'flex',
            alignItems:  'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background:   'var(--white)',
              borderRadius: '22px 22px 0 0',
              paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 8px)',
              width:        '100%',
              maxWidth:     560,
              maxHeight:    '90dvh',
              overflowY:    'auto',
              boxShadow:    '0 -8px 48px rgba(0,0,0,0.2)',
              animation:    'swFeedbackUp 0.22s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Drag handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 6px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(0,0,0,0.11)' }} />
            </div>

            <div style={{ padding: '12px 20px 20px' }}>

              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', lineHeight: 1.2 }}>Tipsa oss</div>
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 4, lineHeight: 1.4 }}>
                    Hittat ett fel? Saknar du info? Eller har ett bra tips?
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Stäng"
                  style={{
                    background: 'var(--surface-2)', border: 'none', borderRadius: '50%',
                    width: 32, height: 32, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 18, cursor: 'pointer',
                    color: 'var(--ink-muted)', flexShrink: 0, marginLeft: 12,
                  }}
                >
                  ×
                </button>
              </div>

              {/* ── Bekräftelse ── */}
              {done ? (
                <div style={{ textAlign: 'center', padding: '28px 0 12px' }}>
                  <div style={{ marginBottom: 14, display: 'flex', justifyContent: 'center' }}><Icon name="check" size={44} stroke={1.6} /></div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
                    Tack för ditt tips!
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, maxWidth: 280, margin: '0 auto' }}>
                    Vi kollar upp det och återkommer om det behövs. Du hjälper oss göra Svalla bättre!
                  </div>
                </div>
              ) : (
                <>
                  {/* Typ-val */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                      Typ av feedback
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                      {(Object.entries(TYPE_LABELS) as [FeedbackType, string][]).map(([val, label]) => (
                        <button
                          key={val}
                          onClick={() => setType(val)}
                          style={{
                            padding:      '10px 12px',
                            borderRadius: 12,
                            border:       `2px solid ${type === val ? 'var(--sea)' : 'var(--surface-3)'}`,
                            background:   type === val ? 'rgba(10,123,140,0.07)' : 'transparent',
                            color:        type === val ? 'var(--sea)' : 'var(--ink-muted)',
                            fontWeight:   type === val ? 700 : 500,
                            fontSize:     13,
                            cursor:       'pointer',
                            textAlign:    'left',
                            transition:   'all 0.14s ease',
                            lineHeight:   1.3,
                            WebkitTapHighlightColor: 'transparent',
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Meddelande */}
                  <div style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 8 }}>
                      Ditt meddelande
                    </div>
                    <textarea
                      value={message}
                      onChange={e => { setMessage(e.target.value); if (error) setError('') }}
                      placeholder={TYPE_PLACEHOLDERS[type]}
                      rows={4}
                      maxLength={1000}
                      autoFocus
                      style={{
                        width:        '100%',
                        borderRadius: 12,
                        border:       `1.5px solid ${error ? '#e04040' : 'rgba(10,123,140,0.2)'}`,
                        padding:      '12px 14px',
                        fontSize:     15,
                        lineHeight:   1.55,
                        color:        'var(--ink)',
                        background:   'var(--bg)',
                        resize:       'none',
                        outline:      'none',
                        boxSizing:    'border-box',
                        fontFamily:   'inherit',
                        transition:   'border-color 0.15s ease',
                      }}
                      onFocus={e => { e.currentTarget.style.borderColor = 'var(--sea)' }}
                      onBlur={e  => { e.currentTarget.style.borderColor = error ? '#e04040' : 'rgba(10,123,140,0.2)' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, minHeight: 18 }}>
                      {error
                        ? <span style={{ fontSize: 12, color: '#e04040', lineHeight: 1.4 }}>{error}</span>
                        : <span />
                      }
                      <span style={{ fontSize: 12, color: 'var(--ink-muted)', flexShrink: 0 }}>
                        {message.length}/1000
                      </span>
                    </div>
                  </div>

                  {/* Vilken sida */}
                  <div style={{
                    marginBottom: 20, padding: '9px 12px',
                    background: 'var(--surface-2)', borderRadius: 10,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <Icon name="pin" size={13} stroke={2} style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.5, minWidth: 0 }}>
                      Gäller sidan:{' '}
                      <strong style={{ color: 'var(--ink)', wordBreak: 'break-all' }}>
                        {pathname}
                      </strong>
                    </div>
                  </div>

                  {/* Skicka */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading || message.trim().length < 5}
                    style={{
                      width:        '100%',
                      background:   loading || message.trim().length < 5
                        ? 'var(--surface-3)'
                        : 'linear-gradient(135deg, var(--sea) 0%, #0d6b7a 100%)',
                      color:        loading || message.trim().length < 5
                        ? 'var(--ink-muted)'
                        : 'var(--white)',
                      border:       'none',
                      borderRadius: 14,
                      padding:      '14px',
                      fontSize:     15,
                      fontWeight:   700,
                      cursor:       loading || message.trim().length < 5 ? 'not-allowed' : 'pointer',
                      transition:   'background 0.2s ease, color 0.2s ease',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {loading ? 'Skickar...' : 'Skicka →'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes swFeedbackUp {
          from { transform: translateY(60px); opacity: 0.6; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
      `}</style>
    </>
  )
}
