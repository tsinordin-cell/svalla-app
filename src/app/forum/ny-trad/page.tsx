'use client'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

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
    if (honeypotRef.current?.value) return
    if (!kategori)                  { setErr('Välj en kategori.'); return }
    if (title.trim().length < 5)    { setErr('Rubriken är för kort (minst 5 tecken).'); return }
    if (title.trim().length > 200)  { setErr('Rubriken är för lång (max 200 tecken).'); return }
    if (body.trim().length < 10)    { setErr('Texten är för kort (minst 10 tecken).'); return }
    if (body.trim().length > 10000) { setErr('Texten är för lång (max 10 000 tecken).'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/logga-in?returnTo=/forum/ny-trad'; return }

      const res = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: kategori, title: title.trim(), body: body.trim() }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Något gick fel.'); setLoading(false); return }
      router.push(`/forum/${kategori}/${data.id}`)
    } catch {
      setErr('Nätverksfel. Försök igen.')
      setLoading(false)
    }
  }

  const fieldBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '13px 15px',
    borderRadius: 12,
    border: '1.5px solid rgba(10,123,140,0.15)',
    background: 'var(--card-bg, #fff)',
    fontSize: 15, color: 'var(--txt)',
    fontFamily: 'inherit', outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 32px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 22px',
        color: '#fff',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href="/forum" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center', padding: 4 }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
        </Link>
        <div>
          <h1 style={{ fontSize: 19, fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>Ny diskussion</h1>
          <p style={{ fontSize: 12, margin: '2px 0 0', color: 'rgba(255,255,255,0.65)' }}>Dela din fråga eller erfarenhet med gemenskapen</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '16px', maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Honeypot */}
        <input ref={honeypotRef} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
          style={{ position: 'absolute', left: -9999, width: 1, height: 1, opacity: 0 }} />

        {/* Card wrapper */}
        <div style={{ background: 'var(--card-bg, #fff)', borderRadius: 18, border: '1px solid rgba(10,123,140,0.1)', boxShadow: '0 2px 12px rgba(10,123,140,0.07)', overflow: 'hidden' }}>

          {/* Kategori */}
          <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid rgba(10,123,140,0.07)' }}>
            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>
              Kategori
            </label>
            <select
              value={kategori}
              onChange={e => setKategori(e.target.value)}
              onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
              style={{
                ...fieldBase,
                appearance: 'none',
                background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230a7b8c' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center var(--card-bg, #fff)`,
                paddingRight: 38,
              }}
            >
              <option value="">Välj kategori…</option>
              {STATIC_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
              ))}
            </select>
          </div>

          {/* Rubrik */}
          <div style={{ padding: '16px 16px 14px', borderBottom: '1px solid rgba(10,123,140,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Rubrik
              </label>
              <span style={{ fontSize: 11, color: title.length > 180 ? 'var(--red, #ef4444)' : 'var(--txt3)' }}>
                {title.length} / 200
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Vad handlar diskussionen om?"
              maxLength={200}
              style={fieldBase}
              onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
            />
          </div>

          {/* Text */}
          <div style={{ padding: '16px 16px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Text
              </label>
              <span style={{ fontSize: 11, color: body.length > 9500 ? 'var(--red, #ef4444)' : 'var(--txt3)' }}>
                {body.length} / 10 000
              </span>
            </div>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Berätta mer — ju mer detaljer, desto bättre svar får du…"
              rows={7}
              style={{ ...fieldBase, resize: 'vertical', lineHeight: 1.65 }}
              onFocus={e => { e.target.style.borderColor = 'var(--sea)'; e.target.style.boxShadow = '0 0 0 3px rgba(10,123,140,0.10)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(10,123,140,0.15)'; e.target.style.boxShadow = 'none' }}
            />
          </div>
        </div>

        {/* Info notice */}
        <div style={{
          padding: '11px 14px',
          background: 'rgba(10,123,140,0.05)',
          borderRadius: 12,
          borderLeft: '3px solid rgba(10,123,140,0.3)',
          fontSize: 12, color: 'var(--txt3)', lineHeight: 1.55,
          display: 'flex', alignItems: 'flex-start', gap: 8,
        }}>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H11.5L7.5 19.8a.6.6 0 0 1-1-.5V16H6a2 2 0 0 1-2-2Z" />
          </svg>
          Håll en trevlig ton. Nya användares inlägg granskas kort innan publicering.
        </div>

        {/* Error */}
        {err && (
          <div style={{ fontSize: 13, color: 'var(--red, #ef4444)', background: 'rgba(239,68,68,0.07)', padding: '10px 14px', borderRadius: 12, borderLeft: '3px solid rgba(239,68,68,0.5)' }}>
            {err}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '15px',
            background: loading ? 'rgba(10,123,140,0.3)' : 'var(--grad-sea)',
            color: '#fff',
            borderRadius: 16,
            border: 'none',
            fontSize: 15, fontWeight: 700,
            cursor: loading ? 'default' : 'pointer',
            letterSpacing: '0.01em',
            boxShadow: loading ? 'none' : '0 4px 18px rgba(10,123,140,0.35)',
            transition: 'all 0.15s',
          }}
        >
          {loading ? (
            'Publicerar…'
          ) : (
            <>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7Z" />
              </svg>
              Publicera diskussion
            </>
          )}
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
