'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import TripCard from '@/components/TripCard'
import Link from 'next/link'

const BOAT_FILTERS = [
  { value: 'alla',     label: 'Alla' },
  { value: 'Segelbåt', label: '⛵ Segel' },
  { value: 'Motorbåt', label: '🚤 Motor' },
  { value: 'Kajak',    label: '🛶 Kajak' },
  { value: 'RIB',      label: '🛥️ RIB' },
  { value: 'SUP',      label: '🏄 SUP' },
]

type SortKey = 'newest' | 'distance' | 'speed' | 'magic'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'newest',   label: 'Nyast' },
  { value: 'distance', label: 'Längst' },
  { value: 'speed',    label: 'Snabbast' },
  { value: 'magic',    label: '✨ Magiska' },
]

const PAGE_SIZE = 8

// Skeleton card — visas under laddning
function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--white)', borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(0,30,50,0.09)',
      border: '1px solid rgba(10,123,140,0.07)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
        <div className="sk-pulse" style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div className="sk-pulse" style={{ width: 100, height: 13, borderRadius: 6, marginBottom: 6 }} />
          <div className="sk-pulse" style={{ width: 160, height: 10, borderRadius: 6 }} />
        </div>
      </div>
      {/* Stats row */}
      <div style={{ display: 'flex', borderTop: '1px solid rgba(10,123,140,0.06)', borderBottom: '1px solid rgba(10,123,140,0.06)' }}>
        {[80, 60, 72, 68].map((w, i) => (
          <div key={i} style={{ flex: 1, padding: '10px 6px', textAlign: 'center', borderLeft: i > 0 ? '1px solid rgba(10,123,140,0.06)' : 'none' }}>
            <div className="sk-pulse" style={{ width: w, height: 16, borderRadius: 5, margin: '0 auto 5px' }} />
            <div className="sk-pulse" style={{ width: 40, height: 8, borderRadius: 4, margin: '0 auto' }} />
          </div>
        ))}
      </div>
      {/* Media */}
      <div className="sk-pulse" style={{ width: '100%', aspectRatio: '3/2' }} />
      {/* Actions */}
      <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 16 }}>
        <div className="sk-pulse" style={{ width: 44, height: 16, borderRadius: 6 }} />
        <div className="sk-pulse" style={{ width: 32, height: 16, borderRadius: 6 }} />
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeedTabs({ allTrips, followingTrips, isLoggedIn }: { allTrips: any[]; followingTrips: any[]; isLoggedIn: boolean }) {
  const [tab,        setTab]        = useState<'all' | 'following'>('all')
  const [boatFilter, setBoatFilter] = useState('alla')
  const [sortKey,    setSortKey]    = useState<SortKey>('newest')
  const [visible,    setVisible]    = useState(PAGE_SIZE)
  const [initialLoad, setInitialLoad] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Simulate initial load skeleton (trips arrive from server, but render takes a tick)
  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 350)
    return () => clearTimeout(t)
  }, [])

  // Reset visible on filter change
  useEffect(() => { setVisible(PAGE_SIZE) }, [tab, boatFilter, sortKey])

  const base = tab === 'following' ? followingTrips : allTrips
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let filtered = boatFilter === 'alla' ? base : base.filter((t: any) => t.boat_type === boatFilter)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (sortKey === 'magic') filtered = filtered.filter((t: any) => t.pinnar_rating === 3)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortKey === 'distance') return (b.distance ?? 0) - (a.distance ?? 0)
    if (sortKey === 'speed')    return (b.max_speed_knots ?? 0) - (a.max_speed_knots ?? 0)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })
  const trips   = sorted.slice(0, visible)
  const hasMore = visible < sorted.length

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    if (hasMore) setVisible(v => v + PAGE_SIZE)
  }, [hasMore])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) loadMore()
    }, { rootMargin: '200px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [loadMore])

  return (
    <>
      {/* ── Tab toggle ── */}
      {isLoggedIn && (
        <div style={{
          display: 'flex', gap: 4, marginBottom: 14,
          background: 'rgba(10,123,140,0.07)', borderRadius: 14, padding: 4,
        }}>
          {([
            { key: 'all',       label: 'Alla turer' },
            { key: 'following', label: 'Följer' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 800,
                background: tab === key ? '#fff' : 'transparent',
                color: tab === key ? '#1e5c82' : '#7a9dab',
                boxShadow: tab === key ? '0 1px 6px rgba(0,45,60,0.12)' : 'none',
                transition: 'all .15s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Filters — sort + boat type in one row ── */}
      <div style={{ marginBottom: 16 }}>
        {/* Sort pills */}
        <div className="filter-scroll" style={{ display: 'flex', gap: 5, overflowX: 'auto', marginBottom: 7, paddingBottom: 2, scrollbarWidth: 'none' }}>
          {SORT_OPTIONS.map(s => (
            <button
              key={s.value}
              onClick={() => setSortKey(s.value)}
              style={{
                flexShrink: 0, padding: '5px 13px', borderRadius: 20,
                border: `1.5px solid ${sortKey === s.value ? 'rgba(10,123,140,0.5)' : 'rgba(10,123,140,0.12)'}`,
                background: sortKey === s.value ? 'rgba(10,123,140,0.1)' : 'transparent',
                color: sortKey === s.value ? 'var(--sea)' : '#7a9dab',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all .12s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        {/* Boat type pills */}
        <div className="filter-scroll" style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {BOAT_FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setBoatFilter(f.value)}
              style={{
                flexShrink: 0, padding: '5px 13px', borderRadius: 20,
                border: `1.5px solid ${boatFilter === f.value ? '#1e5c82' : 'rgba(10,123,140,0.12)'}`,
                background: boatFilter === f.value ? '#1e5c82' : 'transparent',
                color: boatFilter === f.value ? '#fff' : '#7a9dab',
                fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all .12s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Skeleton loading ── */}
      {initialLoad && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* ── Feed list ── */}
      {!initialLoad && (
        <>
          {trips.length === 0 ? (
            tab === 'following' && boatFilter === 'alla' ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>🌊</div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e5c82', marginBottom: 8 }}>Ingen aktivitet ännu</h2>
                <p style={{ fontSize: 13, color: '#7a9dab', marginBottom: 20, lineHeight: 1.5 }}>Följ seglare för att se deras turer här.</p>
                <Link href="/sok" style={{ display: 'inline-block', padding: '11px 26px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: '0 4px 16px rgba(30,92,130,0.3)' }}>
                  Hitta seglare →
                </Link>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ fontSize: 14, color: '#7a9dab', marginBottom: 16 }}>
                  {sortKey === 'magic' ? 'Inga magiska turer ännu' : `Inga turer med ${boatFilter} än`}
                </p>
                <button onClick={() => { setBoatFilter('alla'); setSortKey('newest') }}
                  style={{ padding: '9px 20px', borderRadius: 12, border: 'none', background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  Visa alla turer
                </button>
              </div>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {trips.map((trip: any) => <TripCard key={trip.id} trip={trip} />)}

              {/* Infinite scroll sentinel */}
              <div ref={sentinelRef} style={{ height: 1 }} />

              {/* End of feed */}
              {!hasMore && sorted.length > PAGE_SIZE && (
                <div style={{ textAlign: 'center', padding: '8px 0 4px', fontSize: 12, color: 'var(--txt3)' }}>
                  Du har sett alla {sorted.length} turer
                </div>
              )}
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes sk-shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .sk-pulse {
          background: linear-gradient(90deg, rgba(10,123,140,0.06) 25%, rgba(10,123,140,0.12) 50%, rgba(10,123,140,0.06) 75%);
          background-size: 800px 100%;
          animation: sk-shimmer 1.4s infinite linear;
        }
        .filter-scroll::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
