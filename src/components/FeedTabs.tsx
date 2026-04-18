'use client'
import { useState, useEffect, useRef } from 'react'
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
  { value: 'newest',   label: '🕐 Nyast' },
  { value: 'distance', label: '📏 Längst' },
  { value: 'speed',    label: '💨 Snabbast' },
  { value: 'magic',    label: '✨ Magiska' },
]

const PAGE_SIZE = 10

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeedTabs({ allTrips, followingTrips, isLoggedIn }: { allTrips: any[]; followingTrips: any[]; isLoggedIn: boolean }) {
  const [tab,        setTab]        = useState<'all' | 'following'>('all')
  const [boatFilter, setBoatFilter] = useState('alla')
  const [sortKey,    setSortKey]    = useState<SortKey>('newest')
  const [visible,    setVisible]    = useState(PAGE_SIZE)
  const [loadingMore, setLoadingMore] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)

  // Reset visible count whenever filter or sort changes
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
  const hasMore = visible < filtered.length

  function handleLoadMore() {
    setLoadingMore(true)
    setTimeout(() => {
      setVisible(v => v + PAGE_SIZE)
      setLoadingMore(false)
    }, 120)
  }

  return (
    <>
      {/* ── Tab toggle ── */}
      {isLoggedIn && (
        <div style={{
          display: 'flex', gap: 6, marginBottom: 12,
          background: 'rgba(10,123,140,0.07)', borderRadius: 14, padding: 4,
        }}>
          {(['all', 'following'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 800,
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#1e5c82' : '#7a9dab',
                boxShadow: tab === t ? '0 1px 6px rgba(0,45,60,0.12)' : 'none',
                transition: 'all .15s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {t === 'all' ? 'Alla' : 'Följer'}
            </button>
          ))}
        </div>
      )}

      {/* ── Sortering ── */}
      <div
        className="filter-scroll"
        style={{ display: 'flex', gap: 5, overflowX: 'auto', marginBottom: 8, paddingBottom: 2 }}
      >
        {SORT_OPTIONS.map(s => (
          <button
            key={s.value}
            onClick={() => setSortKey(s.value)}
            style={{
              flexShrink: 0, padding: '5px 12px', borderRadius: 20,
              border: `1.5px solid ${sortKey === s.value ? 'rgba(201,110,42,0.6)' : 'rgba(10,123,140,0.12)'}`,
              background: sortKey === s.value ? 'rgba(201,110,42,0.10)' : 'transparent',
              color: sortKey === s.value ? '#c96e2a' : '#7a9dab',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .15s',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Båttyp-filter ── */}
      <div
        ref={filterRef}
        className="filter-scroll"
        style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16, paddingBottom: 2 }}
      >
        {BOAT_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setBoatFilter(f.value)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              border: `1.5px solid ${boatFilter === f.value ? '#1e5c82' : 'rgba(10,123,140,0.18)'}`,
              background: boatFilter === f.value ? '#1e5c82' : '#fff',
              color: boatFilter === f.value ? '#fff' : '#3a6a80',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .15s',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* ── Feed list ── */}
      {trips.length === 0 ? (
        tab === 'following' && boatFilter === 'alla' ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌊</div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e5c82', marginBottom: 8 }}>
              Ingen aktivitet ännu
            </h2>
            <p style={{ fontSize: 13, color: '#7a9dab', marginBottom: 20, lineHeight: 1.5 }}>
              Följ seglare för att se deras turer här.
            </p>
            <Link href="/sok" style={{
              display: 'inline-block', padding: '11px 26px', borderRadius: 14,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(30,92,130,0.35)',
            }}>
              Hitta seglare →
            </Link>
          </div>
        ) : boatFilter !== 'alla' || sortKey === 'magic' ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, color: '#7a9dab', marginBottom: 16 }}>
              {sortKey === 'magic' ? 'Inga magiska turer ännu' : `Inga turer med ${boatFilter} ännu`}
            </p>
            <button
              onClick={() => { setBoatFilter('alla'); setSortKey('newest') }}
              style={{
                padding: '9px 20px', borderRadius: 12, border: 'none',
                background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              Visa alla turer
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⛵</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--sea)', marginBottom: 8 }}>
              Ingen har loggat ännu
            </h2>
            <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 20, lineHeight: 1.5 }}>
              Var den första att logga en tur i skärgården.
            </p>
            <Link href="/logga" style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 14,
              background: 'linear-gradient(135deg,var(--acc),#e07828)',
              color: 'white', fontWeight: 700, fontSize: 14,
              boxShadow: '0 4px 16px rgba(201,110,42,0.4)', textDecoration: 'none',
            }}>
              Logga min tur →
            </Link>
          </div>
        )
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {trips.map((trip: any) => <TripCard key={trip.id} trip={trip} />)}

          {hasMore && (
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
              style={{
                margin: '4px auto 8px', display: 'flex', alignItems: 'center', gap: 8,
                padding: '12px 32px', borderRadius: 16, border: '1.5px solid rgba(10,123,140,0.15)',
                cursor: 'pointer',
                background: 'rgba(10,123,140,0.06)',
                color: '#1e5c82', fontSize: 13, fontWeight: 700,
                transition: 'all .15s',
                opacity: loadingMore ? 0.6 : 1,
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {loadingMore
                ? <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #1e5c82', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                : null}
              {loadingMore ? 'Laddar…' : `Visa fler (${filtered.length - visible} kvar)`}
            </button>
          )}

          {/* End of feed */}
          {!hasMore && sorted.length > PAGE_SIZE && (
            <div style={{ textAlign: 'center', padding: '12px 0 4px', fontSize: 12, color: 'var(--txt3)' }}>
              {sorted.length} turer totalt
            </div>
          )}
        </div>
      )}
    </>
  )
}
