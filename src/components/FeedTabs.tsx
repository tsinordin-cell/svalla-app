'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import TripCard from '@/components/TripCard'
import SuggestedUsers from '@/components/SuggestedUsers'
import Link from 'next/link'
import EmptyState from '@/components/EmptyState'

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
export default function FeedTabs({ allTrips, followingTrips, isLoggedIn }: { allTrips: any[]; followingTrips: any[]; isLoggedIn: boolean }) { // eslint-disable-line @typescript-eslint/no-explicit-any
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
                fontSize: 13, fontWeight: 600,
                background: tab === key ? '#fff' : 'transparent',
                color: tab === key ? 'var(--sea)' : 'var(--txt3)',
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
                color: sortKey === s.value ? 'var(--sea)' : 'var(--txt3)',
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
                border: `1.5px solid ${boatFilter === f.value ? 'var(--sea)' : 'rgba(10,123,140,0.12)'}`,
                background: boatFilter === f.value ? 'var(--sea)' : 'transparent',
                color: boatFilter === f.value ? '#fff' : 'var(--txt3)',
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

      {/* ── Discovery banner — visas i alla-flödet om inloggad men följer ingen ── */}
      {!initialLoad && isLoggedIn && followingTrips.length === 0 && tab === 'all' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(30,92,130,0.08), rgba(45,125,138,0.06))',
          border: '1.5px solid rgba(30,92,130,0.14)',
          borderRadius: 18, padding: '16px 18px', marginBottom: 16,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ fontSize: 32, flexShrink: 0 }}>⛵</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)', marginBottom: 4 }}>
              Följ seglare du känner
            </div>
            <div style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.4, marginBottom: 10 }}>
              Se deras turer direkt i ditt flöde.
            </div>
            <Link href="/sok" style={{
              display: 'inline-block', padding: '8px 18px', borderRadius: 12,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: '#fff', fontWeight: 700, fontSize: 12, textDecoration: 'none',
              boxShadow: '0 3px 12px rgba(30,92,130,0.25)',
            }}>
              Hitta seglare →
            </Link>
          </div>
        </div>
      )}

      {/* ── Feed list ── */}
      {!initialLoad && (
        <>
          {trips.length === 0 ? (
            tab === 'following' && boatFilter === 'alla' && sortKey === 'newest' ? (
              <div>
                <EmptyState
                  icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  title="Ingen aktivitet ännu"
                  body="Följ seglare för att se deras turer här."
                  marginTop={40}
                />
                <SuggestedUsers />
              </div>
            ) : tab === 'all' && boatFilter === 'alla' && sortKey === 'newest' ? (
              <EmptyState
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
                title="Inga turer ännu"
                body="Bli först ut. Logga en tur så syns den här."
                cta={{ label: 'Logga en tur', href: '/logga' }}
              />
            ) : (
              <EmptyState
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>}
                title={sortKey === 'magic' ? 'Inga magiska turer' : `Inga turer med ${boatFilter}`}
                body="Prova ett annat filter."
                cta={{ label: 'Visa alla turer', onClick: () => { setBoatFilter('alla'); setSortKey('newest') } }}
              />
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {trips.map((trip: any, idx: number) => <TripCard key={trip.id} trip={trip} priority={idx === 0} />)}

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
