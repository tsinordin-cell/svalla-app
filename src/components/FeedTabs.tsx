'use client'
import { useState } from 'react'
import TripCard from '@/components/TripCard'
import Link from 'next/link'

const BOAT_FILTERS = [
  { value: 'alla',       label: 'Alla' },
  { value: 'Segelbåt',   label: '⛵ Segel' },
  { value: 'Motorbåt',   label: '🚤 Motor' },
  { value: 'Kajak',      label: '🛶 Kajak' },
  { value: 'RIB',        label: '🛥️ RIB' },
  { value: 'SUP',        label: '🏄 SUP' },
]

const PAGE_SIZE = 10

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FeedTabs({ allTrips, followingTrips, isLoggedIn }: { allTrips: any[]; followingTrips: any[]; isLoggedIn: boolean }) {
  const [tab,        setTab]        = useState<'all' | 'following'>('all')
  const [boatFilter, setBoatFilter] = useState('alla')
  const [visible,    setVisible]    = useState(PAGE_SIZE)

  const base = tab === 'following' ? followingTrips : allTrips
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filtered = boatFilter === 'alla' ? base : base.filter((t: any) => t.boat_type === boatFilter)
  const trips    = filtered.slice(0, visible)
  const hasMore  = visible < filtered.length

  return (
    <>
      {/* Tab toggle */}
      {isLoggedIn && (
        <div style={{
          display: 'flex', gap: 6, marginBottom: 10,
          background: 'rgba(10,123,140,0.07)', borderRadius: 14, padding: 4,
        }}>
          {(['all', 'following'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setVisible(PAGE_SIZE) }}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 12, fontWeight: 800,
                background: tab === t ? '#fff' : 'transparent',
                color: tab === t ? '#1e5c82' : '#7a9dab',
                boxShadow: tab === t ? '0 1px 6px rgba(0,45,60,0.12)' : 'none',
                transition: 'all .15s',
              }}
            >
              {t === 'all' ? 'Alla' : 'Följer'}
            </button>
          ))}
        </div>
      )}

      {/* Båttyp-filter */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 14, paddingBottom: 2 }}>
        {BOAT_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => { setBoatFilter(f.value); setVisible(PAGE_SIZE) }}
            style={{
              flexShrink: 0, padding: '5px 12px', borderRadius: 20,
              border: `1.5px solid ${boatFilter === f.value ? '#1e5c82' : 'rgba(10,123,140,0.18)'}`,
              background: boatFilter === f.value ? '#1e5c82' : '#fff',
              color: boatFilter === f.value ? '#fff' : '#3a6a80',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .15s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed list */}
      {trips.length === 0 ? (
        tab === 'following' && boatFilter === 'alla' ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌊</div>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#1e5c82', marginBottom: 8 }}>
              Ingen aktivitet ännu
            </h2>
            <p style={{ fontSize: 13, color: '#7a9dab', marginBottom: 20 }}>
              Följ seglare för att se deras turer här.
            </p>
            <Link href="/sok" style={{
              display: 'inline-block', padding: '10px 24px', borderRadius: 14,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: 'white', fontWeight: 700, fontSize: 13, textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(30,92,130,0.35)',
            }}>
              Hitta seglare →
            </Link>
          </div>
        ) : boatFilter !== 'alla' ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 14, color: '#7a9dab', marginBottom: 16 }}>
              Inga turer med {boatFilter} än
            </p>
            <button onClick={() => setBoatFilter('alla')} style={{
              padding: '9px 20px', borderRadius: 12, border: 'none',
              background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}>
              Visa alla båttyper
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>⛵</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--sea)', marginBottom: 8 }}>
              Ingen har loggat ännu
            </h2>
            <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 20 }}>
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
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              style={{
                margin: '4px auto 8px', display: 'block',
                padding: '12px 32px', borderRadius: 16, border: 'none', cursor: 'pointer',
                background: 'rgba(10,123,140,0.08)',
                color: '#1e5c82', fontSize: 13, fontWeight: 700,
                transition: 'background .15s',
              }}
            >
              Ladda fler turer ↓
            </button>
          )}
        </div>
      )}
    </>
  )
}
