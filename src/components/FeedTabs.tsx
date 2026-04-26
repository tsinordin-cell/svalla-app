'use client'
import { useState, useEffect, useRef, useCallback, type ReactNode } from 'react'
import { Sparkles } from '@/components/icons/LucideIcons'
import TripCard from '@/components/TripCard'
import SuggestedUsers from '@/components/SuggestedUsers'
import EmptyState from '@/components/EmptyState'
import Pill from '@/components/ui/Pill'
import { IconSailboat, IconMotorboat, IconKayak, IconRIB, IconSUP } from '@/components/icons/SvallaIcons'
import type { Trip } from '@/lib/supabase'

type BoatFilter = { value: string; label: string; icon: ReactNode | null }

const BOAT_FILTERS: BoatFilter[] = [
  { value: 'alla',     label: 'Alla',  icon: null },
  { value: 'Segelbåt', label: 'Segel', icon: <IconSailboat size={13} /> },
  { value: 'Motorbåt', label: 'Motor', icon: <IconMotorboat size={13} /> },
  { value: 'Kajak',    label: 'Kajak', icon: <IconKayak size={13} /> },
  { value: 'RIB',      label: 'RIB',   icon: <IconRIB size={13} /> },
  { value: 'SUP',      label: 'SUP',   icon: <IconSUP size={13} /> },
]

type SortKey = 'newest' | 'distance' | 'speed' | 'magic'

const SORT_OPTIONS: { value: SortKey; label: string; icon?: ReactNode }[] = [
  { value: 'newest',   label: 'Nyast' },
  { value: 'distance', label: 'Längst' },
  { value: 'speed',    label: 'Snabbast' },
  { value: 'magic',    label: 'Magiska', icon: <Sparkles size={12} /> },
]

const PAGE_SIZE = 8

// Skeleton card — visas under laddning
function SkeletonCard() {
  return (
    <div style={{
      background: 'var(--surface-1, #fafeff)', borderRadius: 20, overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(10,123,140,0.06), 0 2px 8px rgba(0,45,60,0.06)',
      border: '1px solid rgba(10,123,140,0.09)',
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


export default function FeedTabs({ allTrips, followingTrips, isLoggedIn }: { allTrips: Trip[]; followingTrips: Trip[]; isLoggedIn: boolean }) {
  const [boatFilter, setBoatFilter] = useState('alla')
  const [sortKey,    setSortKey]    = useState<SortKey>('newest')
  const [visible,    setVisible]    = useState(PAGE_SIZE)
  const [initialLoad, setInitialLoad] = useState(true)
  const [showBoatSheet, setShowBoatSheet] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const activeBoat = BOAT_FILTERS.find(f => f.value === boatFilter) ?? BOAT_FILTERS[0]!

  // Simulate initial load skeleton (trips arrive from server, but render takes a tick)
  useEffect(() => {
    const t = setTimeout(() => setInitialLoad(false), 350)
    return () => clearTimeout(t)
  }, [])

  // Reset visible on filter change
  useEffect(() => { setVisible(PAGE_SIZE) }, [boatFilter, sortKey])

  const base = allTrips
  let filtered = boatFilter === 'alla' ? base : base.filter(t => t.boat_type === boatFilter)
  if (sortKey === 'magic') filtered = filtered.filter(t => t.pinnar_rating === 3)

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'distance') return (b.distance ?? 0) - (a.distance ?? 0)
    if (sortKey === 'speed')    return (b.max_speed_knots ?? 0) - (a.max_speed_knots ?? 0)
    // Defensivt: null/undefined/invalid created_at → 0 (undvik NaN-sort)
    const aMs = a.created_at ? Date.parse(a.created_at) : 0
    const bMs = b.created_at ? Date.parse(b.created_at) : 0
    return (Number.isFinite(bMs) ? bMs : 0) - (Number.isFinite(aMs) ? aMs : 0)
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
      {/* ── Filters — sort pills + en båttyp-chip som öppnar sheet ── */}
      <div style={{ marginBottom: 16 }}>
        <div className="filter-scroll" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2, scrollbarWidth: 'none' }}>
          {SORT_OPTIONS.map(s => (
            <Pill
              key={s.value}
              active={sortKey === s.value}
              onClick={() => setSortKey(s.value)}
              style={s.value === 'magic' && sortKey !== s.value ? { color: 'var(--amber, #c96e2a)' } : undefined}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {s.icon}
                {s.label}
              </span>
            </Pill>
          ))}
          <Pill
            active={boatFilter !== 'alla'}
            onClick={() => setShowBoatSheet(true)}
            aria-label="Filtrera båttyp"
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {boatFilter !== 'alla' && activeBoat.icon}
              {boatFilter === 'alla' ? 'Båttyp' : activeBoat.label}
              <span style={{ fontSize: 9, opacity: 0.7 }}>▾</span>
            </span>
          </Pill>
        </div>
      </div>

      {/* ── Bottom sheet: båttyp ── */}
      {showBoatSheet && (
        <div
          onClick={() => setShowBoatSheet(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1002,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Välj båttyp"
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 640,
              background: 'var(--surface-1, #fafeff)',
              borderTopLeftRadius: 24, borderTopRightRadius: 24,
              padding: '14px 18px calc(env(safe-area-inset-bottom, 0px) + 20px)',
              boxShadow: '0 -1px 0 rgba(10,123,140,0.08), 0 -8px 32px rgba(0,45,60,0.12)',
            }}
          >
            <div style={{
              width: 40, height: 4, borderRadius: 4,
              background: 'rgba(10,123,140,0.14)',
              margin: '0 auto 16px',
            }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
              Filtrera båttyp
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {BOAT_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => { setBoatFilter(f.value); setShowBoatSheet(false) }}
                  style={{
                    padding: '9px 16px', borderRadius: 22,
                    border: `1.5px solid ${boatFilter === f.value ? 'var(--sea)' : 'rgba(10,123,140,0.15)'}`,
                    background: boatFilter === f.value ? 'var(--sea)' : 'transparent',
                    color: boatFilter === f.value ? '#fff' : 'var(--txt)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  {f.icon}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Skeleton loading ── */}
      {initialLoad && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* ── Discovery — seglare att följa, visas om inloggad men följer ingen ── */}
      {!initialLoad && isLoggedIn && followingTrips.length === 0 && (
        <SuggestedUsers />
      )}

      {/* ── Feed list ── */}
      {!initialLoad && (
        <>
          {trips.length === 0 ? (
            boatFilter === 'alla' && sortKey === 'newest' ? (
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
              {trips.map((trip, idx) => <TripCard key={trip.id} trip={trip} priority={idx === 0} />)}

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
