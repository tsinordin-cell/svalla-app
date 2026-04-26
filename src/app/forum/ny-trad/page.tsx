'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px 15px',
  borderRadius: 12,
  border: '1.5px solid rgba(10,123,140,0.2)',
  background: 'var(--card-bg, #fff)',
  fontSize: 15,
  color: 'var(--txt)',
  fontFamily: 'inherit',
  outline: 'none',
}

function NyTradForm() {
  const router       = useRouter()
  const sp           = useSearchParams()
  const preCategory  = sp.get('kategori') ?? ''

  const [kategori, setKategori]   = useState(preCategory)
  const [title, setTitle]         = useState('')
  const [body, setBody]           = useState('')
  const [loading, setLoading]     = useState(false)
  const [err, setErr]             = useState('')
  const honeypotRef               = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (preCategory) setKategori(preCategory)
  }, [preCategory])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')

    // Anti-spam: honeypot
    if (honeypotRef.current?.value) return

    if (!kategori)                 { setErr('Välj en kategori.'); return }
    if (title.trim().length < 5)   { setErr('Rubriken är för kort (minst 5 tecken).'); return }
    if (title.trim().length > 200) { setErr('Rubriken är för lång (max 200 tecken).'); return }
    if (body.trim().length < 10)   { setErr('Texten är för kort (minst 10 tecken).'); return }
    if (body.trim().length > 10000){ setErr('Texten är för lång (max 10 000 tecken).'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/logga-in?returnTo=/forum/ny-trad'
        return
      }

      const res = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: kategori, title: title.trim(), body: body.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Något gick fel.'); setLoading(false); return }

      // Navigera till den nya tråden
      router.push(`/forum/${kategori}/${data.id}`)
    } catch {
      setErr('Nätverksfel. Försök igen.')
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 16px 22px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <Link href="/forum" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
        </Link>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Ny diskussion</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Honeypot */}
        <input
          ref={honeypotRef}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }}
        />

        {/* Kategori */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6 }}>
            Kategori *
          </label>
          <select
            value={kategori}
            onChange={e => setKategori(e.target.value)}
            style={{ ...inputStyle, appearance: 'none', background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center var(--card-bg, #fff)` }}
          >
            <option value="">Välj kategori…</option>
            {STATIC_CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
            ))}
          </select>
        </div>

        {/* Rubrik */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6 }}>
            Rubrik *
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Vad handlar diskussionen om?"
            maxLength={200}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = 'var(--sea)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(10,123,140,0.2)')}
          />
          <div style={{ fontSize: 11, color: title.length > 180 ? 'var(--red, #ef4444)' : 'var(--txt3)', textAlign: 'right', marginTop: 3 }}>
            {title.length} / 200
          </div>
        </div>

        {/* Brödtext */}
        <div>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6 }}>
            Text *
          </label>
          <textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder="Berätta mer — ju mer detaljer, desto bättre svar får du…"
            rows={7}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            onFocus={e => (e.target.style.borderColor = 'var(--sea)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(10,123,140,0.2)')}
          />
          <div style={{ fontSize: 11, color: body.length > 9500 ? 'var(--red, #ef4444)' : 'var(--txt3)', textAlign: 'right', marginTop: 3 }}>
            {body.length} / 10 000
          </div>
        </div>

        {/* Etikett — anti-spam-info */}
        <div style={{
          padding: '10px 14px',
          background: 'var(--teal-08, rgba(10,123,140,0.06))',
          borderRadius: 10,
          fontSize: 12,
          color: 'var(--txt3)',
          lineHeight: 1.5,
        }}>
          💬 Håll en trevlig ton. Nya användares inlägg granskas kort innan publicering.
        </div>

        {/* Fel */}
        {err && (
          <p style={{ fontSize: 14, color: 'var(--red, #ef4444)', margin: 0, background: 'rgba(239,68,68,0.06)', padding: '10px 14px', borderRadius: 10 }}>
            {err}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px',
            background: loading ? 'var(--txt4, #ccc)' : 'var(--sea)',
            color: '#fff',
            borderRadius: 14,
            border: 'none',
            fontSize: 15,
            fontWeight: 600,
            cursor: loading ? 'default' : 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          {loading ? 'Publicerar…' : 'Publicera diskussion'}
        </button>
      </form>
    </main>
  )
}

export default function NyTradPage() {
  return (
    <Suspense>
      <NyTradForm />
    </Suspense>
  )
}
