'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

type ResultType = 'tur' | 'rutt' | 'plats' | 'seglare'
type FilterTab  = 'alla' | ResultType

type Result = {
  type:     ResultType
  id:       string
  title:    string
  subtitle?: string
  image?:   string
  href:     string
}

const TYPE_LABEL: Record<ResultType, string>  = { tur: 'Logg', rutt: 'Rutt', plats: 'Plats', seglare: 'Seglare' }
const TYPE_EMOJI: Record<ResultType, string>  = { tur: '⛵', rutt: '🗺️', plats: '🍽', seglare: '👤' }
const TYPE_COLOR: Record<ResultType, string>  = {
  tur:     'rgba(30,92,130,0.09)',
  rutt:    'rgba(34,197,94,0.10)',
  plats:   'rgba(201,110,42,0.10)',
  seglare: 'rgba(124,77,30,0.10)',
}
const TYPE_TEXT: Record<ResultType, string> = { tur: '#1e5c82', rutt: '#16a34a', plats: '#c96e2a', seglare: '#7c4d1e' }

const HINTS = ['Sandhamn', 'Grinda', 'Utö', 'Vaxholm', 'Fjäderholmarna', 'Arholma', 'Nynäshamn']

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'alla',    label: 'Alla' },
  { value: 'seglare', label: '👤 Seglare' },
  { value: 'tur',     label: '⛵ Turer' },
  { value: 'plats',   label: '🍽 Platser' },
  { value: 'rutt',    label: '🗺️ Rutter' },
]

export default function SokPage() {
  const [supabase]  = useState(() => createClient())
  const [query,     setQuery]     = useState('')
  const [results,   setResults]   = useState<Result[]>([])
  const [loading,   setLoading]   = useState(false)
  const [searched,  setSearched]  = useState(false)
  const [activeTab, setActiveTab] = useState<FilterTab>('alla')
  const inputRef  = useRef<HTMLInputElement>(null)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') setQuery('') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const q = query.trim()
    if (!q) { setResults([]); setSearched(false); return }
    timerRef.current = setTimeout(() => search(q), 280)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  async function search(q: string) {
    setLoading(true)
    const pattern = `%${q}%`

    const [tripsRes, toursRes, placesRes, usersRes] = await Promise.all([
      supabase
        .from('trips')
        .select('id, location_name, caption, boat_type, image, created_at')
        .or(`location_name.ilike.${pattern},caption.ilike.${pattern}`)
        .limit(10),
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
        subtitle: t.caption ? t.caption.slice(0, 60) + (t.caption.length > 60 ? '…' : '') : t.boat_type ?? '',
        image: t.image ?? undefined,
        href: `/tur/${t.id}`,
      })),
    ]

    setResults(merged)
    setSearched(true)
    setLoading(false)
  }

  const filtered = activeTab === 'alla' ? results : results.filter(r => r.type === activeTab)

  // Group for display
  const grouped: { type: ResultType; items: Result[] }[] = []
  if (activeTab === 'alla') {
    for (const type of ['seglare', 'rutt', 'plats', 'tur'] as ResultType[]) {
      const items = results.filter(r => r.type === type)
      if (items.length > 0) grouped.push({ type, items })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>

      {/* ── Header ── */}
      <div style={{
        background: 'var(--header-bg, rgba(250,254,255,0.96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
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
              onChange={e => { setQuery(e.target.value); setActiveTab('alla') }}
              placeholder="Sök seglare, platser, rutter…"
              style={{
                width: '100%', padding: '10px 36px 10px 38px',
                borderRadius: 20, border: '1.5px solid rgba(10,123,140,0.18)',
                background: 'rgba(10,123,140,0.04)', fontSize: 14,
                outline: 'none', color: 'var(--txt)', boxSizing: 'border-box',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                color: '#7a9dab', fontSize: 16, lineHeight: 1,
                WebkitTapHighlightColor: 'transparent',
              }}>✕</button>
            )}
          </div>
        </div>

        {/* ── Filter tabs (only when results exist) ── */}
        {results.length > 0 && !loading && (
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingTop: 10, maxWidth: 520, margin: '0 auto', scrollbarWidth: 'none' }}>
            {FILTER_TABS.map(tab => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                style={{
                  flexShrink: 0, padding: '5px 12px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: activeTab === tab.value ? '#1e5c82' : 'rgba(10,123,140,0.07)',
                  color: activeTab === tab.value ? '#fff' : '#3a6a80',
                  fontSize: 11, fontWeight: 700, transition: 'all .15s',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {tab.label}
                {tab.value !== 'alla' && results.filter(r => r.type === tab.value).length > 0 && (
                  <span style={{
                    marginLeft: 5, background: activeTab === tab.value ? 'rgba(255,255,255,0.25)' : 'rgba(10,123,140,0.12)',
                    borderRadius: 8, padding: '0 5px', fontSize: 10,
                  }}>
                    {results.filter(r => r.type === tab.value).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px 14px' }}>

        {/* ── Empty state ── */}
        {!query && (
          <div style={{ textAlign: 'center', padding: '40px 0 20px' }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>🔍</div>
            <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 20, lineHeight: 1.5 }}>
              Sök bland seglare, rutter och platser i skärgården
            </p>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Populära platser
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {HINTS.map(hint => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    style={{
                      padding: '7px 16px', borderRadius: 20,
                      background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.15)',
                      fontSize: 13, color: '#1e5c82', cursor: 'pointer', fontWeight: 600,
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    📍 {hint}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* ── No results ── */}
        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🌊</div>
            <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 16 }}>Inga resultat för &ldquo;{query}&rdquo;</p>
            <p style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.5 }}>
              Prova att söka på en plats, ett användarnamn eller ett fartygsnamn
            </p>
          </div>
        )}

        {/* ── Results — grouped (Alla-flik) ── */}
        {activeTab === 'alla' && grouped.length > 0 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {grouped.map(({ type, items }) => (
              <section key={type}>
                <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
                  {TYPE_EMOJI[type]} {TYPE_LABEL[type]} · {items.length}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {items.map(r => <ResultRow key={`${r.type}-${r.id}`} r={r} />)}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ── Results — flat (specific tab) ── */}
        {activeTab !== 'alla' && filtered.length > 0 && !loading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ fontSize: 11, color: '#a0bec8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 2px' }}>
              {filtered.length} träff{filtered.length !== 1 ? 'ar' : ''}
            </p>
            {filtered.map(r => <ResultRow key={`${r.type}-${r.id}`} r={r} />)}
          </div>
        )}

        {/* ── Empty tab ── */}
        {activeTab !== 'alla' && !loading && searched && filtered.length === 0 && results.length > 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ fontSize: 13, color: 'var(--txt3)' }}>
              Inga {TYPE_LABEL[activeTab as ResultType].toLowerCase()} hittades för &ldquo;{query}&rdquo;
            </p>
            <button onClick={() => setActiveTab('alla')} style={{
              marginTop: 12, padding: '8px 20px', borderRadius: 12, border: 'none',
              background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>
              Visa alla träffar
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

function ResultRow({ r }: { r: Result }) {
  return (
    <Link href={r.href} style={{ textDecoration: 'none' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'var(--white)', borderRadius: 16, padding: '11px 14px',
        border: '1px solid rgba(10,123,140,0.09)',
        boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
        transition: 'transform 0.1s',
        WebkitTapHighlightColor: 'transparent',
      }}>
        {/* Thumbnail */}
        <div style={{
          width: 46, height: 46,
          borderRadius: r.type === 'seglare' ? '50%' : 12,
          flexShrink: 0,
          background: r.type === 'seglare'
            ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
            : TYPE_COLOR[r.type],
          overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>
          {r.image
            ? <Image src={r.image} alt="" width={46} height={46} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            : r.type === 'seglare'
              ? <span style={{ fontSize: 18, fontWeight: 900, color: '#fff' }}>{r.title[0]?.toUpperCase()}</span>
              : TYPE_EMOJI[r.type]
          }
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {r.title}
          </div>
          {r.subtitle && (
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {r.subtitle}
            </div>
          )}
        </div>

        {/* Type badge */}
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
          background: TYPE_COLOR[r.type], color: TYPE_TEXT[r.type],
          flexShrink: 0,
        }}>
          {TYPE_LABEL[r.type]}
        </span>

        <svg viewBox="0 0 24 24" fill="none" stroke="#c0d4dc" strokeWidth={2} style={{ width: 14, height: 14, flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
