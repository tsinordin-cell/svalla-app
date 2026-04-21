'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

type ResultType = 'tur' | 'rutt' | 'plats' | 'seglare' | 'hashtag'
type FilterTab  = 'alla' | ResultType

type Result = {
  type:     ResultType
  id:       string
  title:    string
  subtitle?: string
  image?:   string
  href:     string
}

const TYPE_LABEL: Record<ResultType, string>  = { tur: 'Logg', rutt: 'Rutt', plats: 'Plats', seglare: 'Seglare', hashtag: 'Tagg' }
const TYPE_EMOJI: Record<ResultType, string>  = { tur: '⛵', rutt: '🗺️', plats: '🍽', seglare: '👤', hashtag: '#' }
const TYPE_COLOR: Record<ResultType, string>  = {
  tur:     'rgba(30,92,130,0.09)',
  rutt:    'rgba(34,197,94,0.10)',
  plats:   'rgba(201,110,42,0.10)',
  seglare: 'rgba(124,77,30,0.10)',
  hashtag: 'rgba(168,85,247,0.10)',
}
const TYPE_TEXT: Record<ResultType, string> = { tur: '#1e5c82', rutt: '#16a34a', plats: '#c96e2a', seglare: '#7c4d1e', hashtag: '#7c3aed' }

const HINTS = ['Sandhamn', 'Grinda', 'Utö', 'Vaxholm', 'Fjäderholmarna', 'Arholma', 'Nynäshamn']
const HASHTAG_HINTS = ['#sandhamn', '#skärgård', '#segling', '#magisk', '#solnedgång']

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: 'alla',    label: 'Alla' },
  { value: 'seglare', label: '👤 Seglare' },
  { value: 'tur',     label: '⛵ Turer' },
  { value: 'plats',   label: '🍽 Platser' },
  { value: 'rutt',    label: '🗺️ Rutter' },
  { value: 'hashtag', label: '# Taggar' },
]

// Extrahera hashtags från en text (max 20 tecken per tagg, ASCII + nordiska)
function extractHashtags(text: string | null | undefined): string[] {
  if (!text) return []
  const matches = text.match(/#[a-zA-ZåäöÅÄÖ0-9_]{2,20}/g) ?? []
  return matches.map(m => m.toLowerCase())
}

export default function SokPage() {
  return (
    <Suspense fallback={null}>
      <SokPageInner />
    </Suspense>
  )
}

function SokPageInner() {
  const sp = useSearchParams()
  const [supabase]  = useState(() => createClient())
  const [query,     setQuery]     = useState(() => sp?.get('q') ?? '')
  const [results,       setResults]       = useState<Result[]>([])
  const [loading,       setLoading]       = useState(false)
  const [searched,      setSearched]      = useState(false)
  const [activeTab,     setActiveTab]     = useState<FilterTab>('alla')
  const [activeSailors, setActiveSailors] = useState<{ id: string; username: string; avatar: string | null; tripCount: number }[]>([])
  const inputRef  = useRef<HTMLInputElement>(null)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  // Synka query med URL-parameter (vid hashtag-klick eller delad länk)
  useEffect(() => {
    const urlQ = sp?.get('q') ?? ''
    if (urlQ && urlQ !== query) setQuery(urlQ)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp])

  // Hämta aktiva seglare (senaste 7 dagarna) för empty state
  useEffect(() => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    supabase
      .from('trips')
      .select('user_id')
      .gte('created_at', weekAgo)
      .then(async ({ data: recentTrips }) => {
        if (!recentTrips || recentTrips.length === 0) return
        const countMap: Record<string, number> = {}
        for (const t of recentTrips) { countMap[t.user_id] = (countMap[t.user_id] ?? 0) + 1 }
        const topIds = Object.entries(countMap).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([id]) => id)
        const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', topIds)
        if (!users) return
        setActiveSailors(users.map(u => ({ ...u, tripCount: countMap[u.id] ?? 0 })))
      })
  }, [supabase])

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
    // Sanitera söktermen — strippa PostgREST-specialtecken för att undvika query injection
    const safe    = q.replace(/[()%_,]/g, '').trim().slice(0, 100)
    if (!safe)   { setResults([]); setSearched(true); setLoading(false); return }
    const pattern = `%${safe}%`

    // Hashtag-läge: query börjar med # → sök bara trips som matchar taggen i caption
    const isHashtagQuery = safe.startsWith('#')
    const hashtagTerm = isHashtagQuery ? safe.slice(1).toLowerCase() : null
    const hashtagPattern = hashtagTerm ? `%#${hashtagTerm.replace(/[()%_,]/g, '')}%` : null

    type AnyRes<T> = { data: T[] | null }
    const empty = <T,>(): Promise<AnyRes<T>> => Promise.resolve({ data: [] as T[] })

    const tripsPromise = supabase
      .from('trips')
      .select('id, location_name, caption, boat_type, image, created_at')
      .or(
        hashtagPattern
          ? `caption.ilike.${hashtagPattern}`
          : `location_name.ilike.${pattern},caption.ilike.${pattern},boat_type.ilike.${pattern}`,
      )
      .limit(20) as unknown as Promise<AnyRes<{ id: string; location_name: string | null; caption: string | null; boat_type: string | null; image: string | null; created_at: string }>>

    const toursPromise = isHashtagQuery
      ? empty<{ id: string; title: string; usp: string | null; start_location: string; destination: string }>()
      : (supabase
          .from('tours')
          .select('id, title, usp, start_location, destination')
          .or(`title.ilike.${pattern},start_location.ilike.${pattern},destination.ilike.${pattern}`)
          .limit(8) as unknown as Promise<AnyRes<{ id: string; title: string; usp: string | null; start_location: string; destination: string }>>)

    const placesPromise = isHashtagQuery
      ? empty<{ id: string; name: string; island: string | null; image_url: string | null }>()
      : (supabase
          .from('restaurants')
          .select('id, name, island, image_url')
          .or(`name.ilike.${pattern},island.ilike.${pattern}`)
          .limit(8) as unknown as Promise<AnyRes<{ id: string; name: string; island: string | null; image_url: string | null }>>)

    type UserRow = { id: string; username: string; avatar: string | null; home_port: string | null; sailing_region: string | null; nationality: string | null; vessel_model: string | null; vessel_name: string | null; vessel_type: string | null }
    const usersPromise = isHashtagQuery
      ? empty<UserRow>()
      : (supabase
          .from('users')
          .select('id, username, avatar, home_port, sailing_region, nationality, vessel_model, vessel_name, vessel_type')
          .or(
            `username.ilike.${pattern},vessel_model.ilike.${pattern},vessel_name.ilike.${pattern},vessel_type.ilike.${pattern},home_port.ilike.${pattern}`,
          )
          .limit(10) as unknown as Promise<AnyRes<UserRow>>)

    const hashtagTripsPromise = isHashtagQuery
      ? empty<{ caption: string | null }>()
      : (supabase
          .from('trips')
          .select('caption')
          .ilike('caption', `%#${safe.replace(/[()%_,]/g, '')}%`)
          .limit(40) as unknown as Promise<AnyRes<{ caption: string | null }>>)

    const [tripsRes, toursRes, placesRes, usersRes, tripsForHashtagsRes] = await Promise.all([
      tripsPromise, toursPromise, placesPromise, usersPromise, hashtagTripsPromise,
    ])

    // Bygg unika hashtag-resultat (fritextläge): räkna upp förekomster av matchande taggar
    const hashtagAgg: Record<string, number> = {}
    if (!isHashtagQuery) {
      const needle = safe.toLowerCase()
      const sources = [...(tripsRes.data ?? []), ...(tripsForHashtagsRes.data ?? [])]
      for (const t of sources) {
        for (const tag of extractHashtags(t.caption)) {
          if (tag.includes(needle) || needle.includes(tag.replace(/^#/, ''))) {
            hashtagAgg[tag] = (hashtagAgg[tag] ?? 0) + 1
          }
        }
      }
    }
    const hashtagResults: Result[] = Object.entries(hashtagAgg)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([tag, count]) => ({
        type: 'hashtag' as const,
        id: tag,
        title: tag,
        subtitle: `${count} ${count === 1 ? 'tur' : 'turer'} med denna tagg`,
        href: `/sok?q=${encodeURIComponent(tag)}`,
      }))

    const merged: Result[] = [
      ...(usersRes.data ?? []).map(u => {
        const vesselBits = [u.vessel_name, u.vessel_model].filter(Boolean).join(' · ')
        const subtitle = vesselBits
          || [u.home_port, u.sailing_region, u.nationality].filter(Boolean).join(' · ')
          || 'Seglare'
        return {
          type: 'seglare' as const,
          id: u.id,
          title: u.username,
          subtitle,
          image: u.avatar ?? undefined,
          href: `/u/${u.username}`,
        }
      }),
      ...hashtagResults,
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
    for (const type of ['seglare', 'hashtag', 'rutt', 'plats', 'tur'] as ResultType[]) {
      const items = results.filter(r => r.type === type)
      if (items.length > 0) grouped.push({ type, items })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>

      {/* ── Header ── */}
      <div style={{
        background: 'var(--header-bg, var(--glass-96))',
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
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2}
              style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setActiveTab('alla') }}
              placeholder="Sök seglare, platser, båtmodeller, #taggar…"
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
                color: 'var(--txt3)', fontSize: 16, lineHeight: 1,
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
          <div style={{ padding: '24px 0 20px' }}>

            {/* Aktiva seglare */}
            {activeSailors.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>
                  ⛵ Aktiva seglare denna vecka
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeSailors.map(s => (
                    <Link key={s.id} href={`/u/${s.username}`} style={{ textDecoration: 'none' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        background: 'var(--white)', borderRadius: 16, padding: '11px 14px',
                        border: '1px solid rgba(10,123,140,0.09)',
                        boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
                        WebkitTapHighlightColor: 'transparent',
                      }}>
                        <div style={{
                          width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, fontWeight: 600, color: '#fff', overflow: 'hidden',
                        }}>
                          {s.avatar
                            ? <Image src={s.avatar} alt={s.username} width={42} height={42} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            : s.username[0]?.toUpperCase()
                          }
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {s.username}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1 }}>
                            {s.tripCount} {s.tripCount === 1 ? 'tur' : 'turer'} denna vecka
                          </div>
                        </div>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#c0d4dc" strokeWidth={2} style={{ width: 14, height: 14, flexShrink: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Populära platser */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Populära platser
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {HINTS.map(hint => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    style={{
                      padding: '7px 16px', borderRadius: 20,
                      background: 'var(--white)', border: '1.5px solid rgba(10,123,140,0.15)',
                      fontSize: 13, color: 'var(--sea)', cursor: 'pointer', fontWeight: 600,
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    📍 {hint}
                  </button>
                ))}
              </div>
            </div>

            {/* Trendiga hashtags */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Trendiga taggar
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {HASHTAG_HINTS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    style={{
                      padding: '7px 14px', borderRadius: 20,
                      background: 'rgba(168,85,247,0.08)', border: '1.5px solid rgba(168,85,247,0.20)',
                      fontSize: 13, color: '#7c3aed', cursor: 'pointer', fontWeight: 700,
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {tag}
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
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8 }}>
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
            <p style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 2px' }}>
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
              ? <span style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{r.title[0]?.toUpperCase()}</span>
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
