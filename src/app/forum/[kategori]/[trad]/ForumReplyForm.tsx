'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'
import MentionAutocomplete, { type MentionUser } from './MentionAutocomplete'
import TripPickerModal from './TripPickerModal'

interface Props {
  threadId: string
  categoryId: string
}

const MAX_LEN = 10000

export default function ForumReplyForm({ threadId, categoryId: _categoryId }: Props) {
  const router = useRouter()
  const [body, setBody]       = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr]         = useState('')
  const [uploading, setUploading] = useState(false)
  const [tripPickerOpen, setTripPickerOpen] = useState(false)
  const honeypotRef           = useRef<HTMLInputElement>(null)
  const textareaRef           = useRef<HTMLTextAreaElement>(null)
  const fileInputRef          = useRef<HTMLInputElement>(null)
  const wrapRef               = useRef<HTMLDivElement>(null)

  // Mention-autocomplete state
  const [mentionState, setMentionState] = useState<{
    open: boolean
    query: string
    anchor: { top: number; left: number } | null
    /** Index i body där @ börjar */
    atIndex: number
  }>({ open: false, query: '', anchor: null, atIndex: -1 })

  // Lyssna på Citera-events från andra inlägg
  useEffect(() => {
    function onQuote(e: Event) {
      const evt = e as CustomEvent<{ quote: string }>
      const quote = evt.detail?.quote ?? ''
      setBody(prev => (prev.trim() ? prev + '\n\n' + quote : quote))
      setTimeout(() => {
        wrapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        textareaRef.current?.focus()
        const ta = textareaRef.current
        if (ta) {
          ta.selectionStart = ta.selectionEnd = ta.value.length
        }
      }, 50)
    }
    window.addEventListener('forum-quote', onQuote)
    return () => window.removeEventListener('forum-quote', onQuote)
  }, [])

  /** Återbestäm mention-state vid varje text-ändring och cursor-flytt */
  const detectMention = useCallback(() => {
    const ta = textareaRef.current
    if (!ta) return
    const cursor = ta.selectionStart ?? 0
    const before = ta.value.slice(0, cursor)
    // Hitta sista @ som inte är efter blanksteg → kollar för giltig mention-trigger
    const m = before.match(/(?:^|\s)@([a-zA-Z0-9_]{0,30})$/)
    if (m) {
      const query = m[1] ?? ''
      const atIndex = cursor - query.length - 1
      // Beräkna anchor-position relativ till textarea
      // Vi använder en simpel approach: under textareat, vänsterjusterad
      const rect = ta.getBoundingClientRect()
      setMentionState({
        open: true,
        query,
        anchor: { top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX + 12 },
        atIndex,
      })
    } else {
      setMentionState(s => s.open ? { open: false, query: '', anchor: null, atIndex: -1 } : s)
    }
  }, [])

  function onSelectMention(user: MentionUser) {
    const ta = textareaRef.current
    if (!ta) return
    const before = body.slice(0, mentionState.atIndex)
    const after = body.slice(ta.selectionStart ?? 0)
    const next = `${before}@${user.username} ${after}`
    setBody(next)
    setMentionState({ open: false, query: '', anchor: null, atIndex: -1 })
    setTimeout(() => {
      ta.focus()
      const pos = before.length + user.username.length + 2
      ta.selectionStart = ta.selectionEnd = pos
    }, 0)
  }

  async function handleImageUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      setErr('Endast bilder kan laddas upp.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setErr('Bilden är för stor (max 8 MB).')
      return
    }
    setUploading(true)
    setErr('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/forum/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok || !data.url) {
        setErr(data.error ?? 'Kunde inte ladda upp bilden.')
        return
      }
      const tag = `\n[img:${data.url}]\n`
      setBody(prev => prev + tag)
      setTimeout(() => {
        const ta = textareaRef.current
        if (ta) {
          ta.focus()
          ta.selectionStart = ta.selectionEnd = ta.value.length
        }
      }, 0)
    } catch {
      setErr('Nätverksfel vid uppladdning.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')

    if (honeypotRef.current?.value) return

    const trimmed = body.trim()
    if (trimmed.length < 2)  { setErr('Svaret är för kort.'); return }
    if (trimmed.length > MAX_LEN) { setErr(`Svaret är för långt (max ${MAX_LEN.toLocaleString('sv-SE')} tecken).`); return }

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

  const isReady = !loading && !uploading && body.trim().length >= 2

  return (
    <div ref={wrapRef} style={{
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

        <div style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={body}
            onChange={e => { setBody(e.target.value); setTimeout(detectMention, 0) }}
            onKeyUp={detectMention}
            onClick={detectMention}
            placeholder="Dela med dig av din kunskap eller erfarenhet… Använd @namn för att tagga"
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
            onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none'; setTimeout(() => setMentionState(s => s.open ? { ...s, open: false } : s), 200) }}
          />
          {mentionState.open && (
            <MentionAutocomplete
              query={mentionState.query}
              anchor={mentionState.anchor}
              onSelect={onSelectMention}
              onDismiss={() => setMentionState({ open: false, query: '', anchor: null, atIndex: -1 })}
            />
          )}
        </div>

        {err && (
          <p style={{ fontSize: 13, color: 'var(--red, #ef4444)', margin: '8px 0 0', padding: '8px 12px', background: 'rgba(239,68,68,0.07)', borderRadius: 8 }}>{err}</p>
        )}

        {/* Toolbar + submit */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, gap: 8, flexWrap: 'wrap' }}>
          {/* Vänster: actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              title="Lägg till bild"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 10,
                background: uploading ? 'rgba(10,123,140,0.05)' : 'rgba(10,123,140,0.08)',
                color: 'var(--sea)',
                border: 'none', fontSize: 12, fontWeight: 600,
                cursor: uploading ? 'wait' : 'pointer',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <Icon name="image" size={14} stroke={2} />
              {uploading ? 'Laddar upp…' : 'Bild'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f) }}
            />
            <button
              type="button"
              onClick={() => {
                const ta = textareaRef.current
                if (!ta) return
                const pos = ta.selectionStart ?? body.length
                const next = body.slice(0, pos) + '@' + body.slice(pos)
                setBody(next)
                setTimeout(() => { ta.focus(); ta.selectionStart = ta.selectionEnd = pos + 1; detectMention() }, 0)
              }}
              title="Tagga någon"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 10,
                background: 'rgba(10,123,140,0.08)',
                color: 'var(--sea)',
                border: 'none', fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <Icon name="atSign" size={14} stroke={2} />
              Tagga
            </button>
            <button
              type="button"
              onClick={() => setTripPickerOpen(true)}
              title="Bifoga en av dina turer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 12px', borderRadius: 10,
                background: 'rgba(10,123,140,0.08)',
                color: 'var(--sea)',
                border: 'none', fontSize: 12, fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <Icon name="sailboat" size={14} stroke={2} />
              Bifoga rutt
            </button>
            <span style={{ fontSize: 11, color: body.length > 9500 ? 'var(--red, #ef4444)' : 'var(--txt3)', marginLeft: 4 }}>
              {body.length} / {MAX_LEN.toLocaleString('sv-SE')}
            </span>
          </div>

          {/* Höger: skicka */}
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
              fontFamily: 'inherit',
            }}
          >
            {loading ? (
              'Skickar…'
            ) : (
              <>
                <Icon name="send" size={14} stroke={2.4} />
                Svara
              </>
            )}
          </button>
        </div>
      </form>

      <TripPickerModal
        open={tripPickerOpen}
        onClose={() => setTripPickerOpen(false)}
        onSelect={(tripId) => {
          setBody(prev => (prev.trim() ? prev + '\n\n' : '') + `[trip:${tripId}]\n`)
          setTimeout(() => {
            const ta = textareaRef.current
            if (ta) {
              ta.focus()
              ta.selectionStart = ta.selectionEnd = ta.value.length
            }
          }, 0)
        }}
      />
    </div>
  )
}
