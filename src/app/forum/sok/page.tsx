'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

interface SearchResult {
  id: string
  category_id: string
  title: string
  excerpt: string
  reply_count: number
  created_at: string
  author: string | null
}

const catName = (id: string) => STATIC_CATEGORIES.find(c => c.id === id)?.name ?? id
const catIcon = (id: string) => STATIC_CATEGORIES.find(c => c.id === id)?.icon ?? '💬'

export default function ForumSokPage() {
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState<SearchResult[]>([])
  const [loading, setLoading]   = useState(false)
  const [searched, setSearched] = useState(false)
  const debounceRef             = useRef<ReturnType<typeof setTimeout> | null>(null)

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setSearched(false); return }
    setLoading(true)
    setSearched(true)
    try {
      const res  = await fetch(`/api/forum/search?q=${encodeURIComponent(q.trim())}`)
      const data = await res.json()
      setResults(data.results ?? [])
    } finally {
      setLoading(false)
    }
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value
    setQuery(v)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => search(v), 350)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    search(query)
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
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 20px',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <Link href="/forum" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5.5L8.5 12L15 18.5" />
            </svg>
          </Link>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Sök i forumet</h1>
        </div>

        {/* Sökfält */}
        <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
          <input
            autoFocus
            type="search"
            value={query}
            onChange={handleChange}
            placeholder="Sök trådar och diskussioner…"
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '13px 44px 13px 16px',
              borderRadius: 14,
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              color: '#fff',
              fontSize: 15,
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
            }}
          >
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Laddar */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--txt3)', fontSize: 14 }}>
            Söker…
          </div>
        )}

        {/* Inga resultat */}
        {!loading && searched && results.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px',
            background: 'var(--white)', borderRadius: 18,
            border: '1px solid rgba(10,123,140,0.08)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
              Inga träffar
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt3)' }}>
              Inga trådar matchar &ldquo;{query}&rdquo;. Prova ett annat sökord.
            </div>
          </div>
        )}

        {/* Resultat */}
        {!loading && results.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>
              {results.length} träff{results.length !== 1 ? 'ar' : ''}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {results.map(r => (
                <Link
                  key={r.id}
                  href={`/forum/${r.category_id}/${r.id}`}
                  style={{
                    display: 'block',
                    padding: '14px 16px',
                    background: 'var(--card-bg, #fff)',
                    borderRadius: 14,
                    border: '1px solid var(--border, rgba(10,123,140,0.1))',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Kategori */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: 'var(--sea)',
                      background: 'var(--teal-08, rgba(10,123,140,0.08))',
                      padding: '2px 7px', borderRadius: 6,
                    }}>
                      {catIcon(r.category_id)} {catName(r.category_id)}
                    </span>
                    {r.reply_count > 0 && (
                      <span style={{ fontSize: 11, color: 'var(--txt3)' }}>
                        {r.reply_count} svar
                      </span>
                    )}
                  </div>

                  {/* Rubrik */}
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 4, lineHeight: 1.3 }}>
                    {r.title}
                  </div>

                  {/* Utdrag */}
                  <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                    {r.excerpt}
                  </div>

                  {/* Metainfo */}
                  <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>
                    {r.author && <span>@{r.author} · </span>}
                    {new Date(r.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Startläge */}
        {!loading && !searched && (
          <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--txt3)', fontSize: 14 }}>
            Skriv minst 2 tecken för att söka
          </div>
        )}
      </div>
    </main>
  )
}
