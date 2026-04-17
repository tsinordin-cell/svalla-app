'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

type Result = {
  type: 'tur' | 'rutt' | 'plats' | 'seglare'
  id: string
  title: string
  subtitle?: string
  image?: string
  href: string
}

export default function SokPage() {
  const [supabase] = useState(() => createClient())
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Escape-tangent rensar sökfältet
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setQuery('')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const q = query.trim()
    if (!q) { setResults([]); setSearched(false); return }

    timerRef.current = setTimeout(() => search(q), 320)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query])

  async function search(q: string) {
    setLoading(true)
    const pattern = `%${q}%`

    const [tripsRes, toursRes, placesRes, usersRes] = await Promise.all([
      supabase
        .from('trips')
        .select('id, location_name, boat_type, image, created_at')
        .ilike('location_name', pattern)
        .limit(8),
      supabase
        .from('tours')
        .select('id, title, usp, start_location, destination')
        .or(`title.ilike.${pattern},start_location.ilike.${pattern},destination.ilike.${pattern}`)
        .limit(8),
      supabase
        .from('restaurants')
        .select('id, name, island, image_url')
        .or(`name.ilike.${pattern},island.ilike.${pattern}`)
        .limit(8),
      supabase
        .from('users')
        .select('id, username, avatar, home_port, sailing_region, nationality')
        .ilike('username', pattern)
        .limit(8),
    ])

    const merged: Result[] = [
      // Seglare kommer alltid först
      ...(usersRes.data ?? []).map(u => ({
        type: 'seglare' as const,
        id: u.id,
        title: u.username,
        subtitle: [u.home_port, u.sailing_region, u.nationality].filter(Boolean).join(' · ') || 'Seglare',
        image: u.avatar ?? undefined,
        href: `/u/${u.username}`,
      })),
      ...(toursRes.data ?? []).map(t => ({
        type: 'rutt' as const,
        id: t.id,
        title: t.title,
        subtitle: `${t.start_location} → ${t.destination}`,
        href: `/rutter/${t.id}`,
      })),
      ...(placesRes.data ?? []).map(r => ({
        type: 'plats' as const,
        id: r.id,
        title: r.name,
        subtitle: r.island ?? '',
        image: r.image_url ?? undefined,
        href: `/platser/${r.id}`,
      })),
      ...(tripsRes.data ?? []).map(t => ({
        type: 'tur' as const,
        id: t.id,
        title: t.location_name ?? 'Okänd plats',
        subtitle: t.boat_type ?? '',
        image: t.image ?? undefined,
        href: `/tur/${t.id}`,
      })),
    ]

    setResults(merged)
    setSearched(true)
    setLoading(false)
  }

  const typeLabel: Record<string, string> = { tur: 'Logg', rutt: 'Rutt', plats: 'Plats', seglare: 'Seglare' }
  const typeColor: Record<string, string> = {
    tur:     'rgba(30,92,130,0.08)',
    rutt:    'rgba(34,197,94,0.10)',
    plats:   'rgba(201,110,42,0.10)',
    seglare: 'rgba(124,77,30,0.10)',
  }
  const typeText: Record<string, string> = { tur: '#1e5c82', rutt: '#16a34a', plats: '#c96e2a', seglare: '#7c4d1e' }

  return (
    <div style={{ minHeight: '100vh', background: '#f7fbfc', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{
        background: '#fff',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '12px 16px',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, maxWidth: 520, margin: '0 auto' }}>
          <Link href="/feed" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          <div style={{ flex: 1, position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#7a9dab" strokeWidth={2}
              style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Sök seglare, rutter, platser…"
              style={{
                width: '100%', padding: '10px 14px 10px 38px',
                borderRadius: 20, border: '1.5px solid rgba(10,123,140,0.18)',
                background: 'rgba(10,123,140,0.04)', fontSize: 14,
                outline: 'none', color: '#162d3a', boxSizing: 'border-box',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: '#7a9dab', fontSize: 16, lineHeight: 1,
              }}>✕</button>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px 14px' }}>
        {/* Empty state */}
        {!query && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, color: '#7a9dab', marginBottom: 20 }}>Sök bland seglare, rutter och platser</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {['@seglare', 'Sandhamn', 'Grinda', 'Utö', 'Vaxholm'].map(hint => (
                <button key={hint} onClick={() => setQuery(hint.replace('@', ''))}
                  style={{
                    padding: '6px 14px', borderRadius: 20,
                    background: '#fff', border: '1.5px solid rgba(10,123,140,0.15)',
                    fontSize: 13, color: '#1e5c82', cursor: 'pointer', fontWeight: 600,
                  }}>
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* No results */}
        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌊</div>
            <p style={{ fontSize: 14, color: '#7a9dab' }}>Inga resultat för &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ fontSize: 11, color: '#a0bec8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px 2px' }}>
              {results.length} träff{results.length !== 1 ? 'ar' : ''} för &ldquo;{query}&rdquo;
            </p>
            {results.map(r => (
              <Link key={`${r.type}-${r.id}`} href={r.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: '#fff', borderRadius: 16, padding: '12px 14px',
                  border: '1px solid rgba(10,123,140,0.09)',
                  boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
                  transition: 'transform 0.1s',
                }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: r.type === 'seglare' ? '50%' : 12,
                    flexShrink: 0,
                    background: r.type === 'seglare'
                      ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
                      : 'rgba(10,123,140,0.08)',
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                    border: r.type === 'seglare' ? '2px solid rgba(10,123,140,0.12)' : 'none',
                  }}>
                    {r.image
                      ? <Image src={r.image} alt="" width={48} height={48} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                      : r.type === 'seglare'
                        ? <span style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{r.title[0]?.toUpperCase()}</span>
                        : r.type === 'rutt' ? '🗺️' : r.type === 'plats' ? '🍽' : '⛵'
                    }
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#162d3a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.title}
                    </div>
                    {r.subtitle && (
                      <div style={{ fontSize: 12, color: '#7a9dab', marginTop: 1 }}>{r.subtitle}</div>
                    )}
                  </div>

                  {/* Type badge */}
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
                    background: typeColor[r.type], color: typeText[r.type],
                    flexShrink: 0,
                  }}>
                    {typeLabel[r.type]}
                  </span>

                  <svg viewBox="0 0 24 24" fill="none" stroke="#c0d4dc" strokeWidth={2} style={{ width: 14, height: 14, flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
