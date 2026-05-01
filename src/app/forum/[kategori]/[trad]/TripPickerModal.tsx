'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

interface TripRow {
  id: string
  boat_type: string | null
  distance: number | null
  duration: number | null
  location_name: string | null
  start_location: string | null
  image: string | null
  pinnar_rating: number | null
  started_at: string | null
  created_at: string
}

interface Props {
  open: boolean
  onClose: () => void
  onSelect: (tripId: string) => void
}

/**
 * Modal som listar användarens egna turer för bifogning i forum-svar.
 * PREMIUM: skeleton, fade-in/out, scrollbar list, tydlig "ingen tur"-state.
 */
export default function TripPickerModal({ open, onClose, onSelect }: Props) {
  const [trips, setTrips] = useState<TripRow[] | null>(null)

  useEffect(() => {
    if (!open) return
    let cancelled = false
    ;(async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        if (!cancelled) setTrips([])
        return
      }
      const { data } = await supabase
        .from('trips')
        .select('id, boat_type, distance, duration, location_name, start_location, image, pinnar_rating, started_at, created_at')
        .eq('user_id', user.id)
        .order('started_at', { ascending: false, nullsFirst: false })
        .limit(30)
      if (!cancelled) setTrips((data ?? []) as TripRow[])
    })()
    return () => { cancelled = true }
  }, [open])

  // Stäng på Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bifoga tur"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(10,31,43,0.55)',
        backdropFilter: 'blur(8px)',
        zIndex: 1100,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'svallaTripFade 200ms ease',
      }}
    >
      <style>{`
        @keyframes svallaTripFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes svallaTripSlide { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes svallaTripSkeleton { 0%,100%{background-position:0% 0%} 50%{background-position:100% 0%} }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 540,
          maxHeight: '82vh',
          background: 'var(--card-bg, #fff)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -12px 40px rgba(10,31,43,0.30)',
          display: 'flex', flexDirection: 'column',
          animation: 'svallaTripSlide 280ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 18px 14px',
          borderBottom: '1px solid rgba(10,123,140,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: 10, fontWeight: 700, color: 'var(--sea)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: 2,
            }}>
              Bifoga
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20, fontWeight: 700, color: 'var(--txt)',
              margin: 0, letterSpacing: '-0.3px',
            }}>
              Välj en tur
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Stäng"
            style={{
              width: 32, height: 32, borderRadius: 999,
              background: 'rgba(10,123,140,0.08)',
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--sea)',
            }}
          >
            <Icon name="x" size={16} stroke={2.4} />
          </button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '12px 14px 18px', flex: 1 }}>
          {trips === null ? (
            [0, 1, 2].map(i => (
              <div key={i} style={{
                height: 88, marginBottom: 8, borderRadius: 12,
                background: 'linear-gradient(90deg, rgba(10,123,140,0.05), rgba(10,123,140,0.10), rgba(10,123,140,0.05))',
                backgroundSize: '200% 100%',
                animation: 'svallaTripSkeleton 1.6s ease-in-out infinite',
              }}/>
            ))
          ) : trips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--txt3)', fontSize: 14 }}>
              <Icon name="sailboat" size={32} stroke={1.5} />
              <p style={{ margin: '12px 0 0' }}>Du har inga loggade turer än.</p>
              <a href="/logga" style={{
                display: 'inline-block', marginTop: 12,
                padding: '9px 18px', borderRadius: 10,
                background: 'var(--grad-sea, var(--sea))',
                color: '#fff', textDecoration: 'none',
                fontSize: 13, fontWeight: 700,
              }}>
                Logga din första tur
              </a>
            </div>
          ) : (
            trips.map(t => {
              const distanceNm = t.distance ? (t.distance / 1.852).toFixed(1) : null
              const durMin = t.duration ? Math.round(t.duration / 60) : null
              const durDisplay = durMin ? (durMin >= 60 ? `${Math.floor(durMin / 60)}h ${durMin % 60}m` : `${durMin}m`) : null
              const dateStr = t.started_at
                ? new Date(t.started_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
                : ''
              const route = t.start_location && t.location_name
                ? `${t.start_location} → ${t.location_name}`
                : t.location_name ?? t.start_location ?? 'Skärgårdstur'

              return (
                <button
                  key={t.id}
                  onClick={() => { onSelect(t.id); onClose() }}
                  style={{
                    display: 'flex', alignItems: 'stretch', gap: 12,
                    width: '100%', padding: 10,
                    marginBottom: 8,
                    borderRadius: 12,
                    background: 'rgba(10,123,140,0.04)',
                    border: '1px solid rgba(10,123,140,0.10)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(10,123,140,0.10)'
                    e.currentTarget.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(10,123,140,0.04)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {t.image ? (
                    <div style={{
                      width: 80, height: 64, borderRadius: 10,
                      backgroundImage: `url(${t.image})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      flexShrink: 0,
                    }} />
                  ) : (
                    <div style={{
                      width: 80, height: 64, borderRadius: 10,
                      background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, color: '#fff',
                    }}>
                      <Icon name="sailboat" size={22} stroke={1.5} />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{
                      fontSize: 13.5, fontWeight: 600, color: 'var(--txt)',
                      lineHeight: 1.35,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {route}
                    </div>
                    <div style={{
                      display: 'flex', gap: 8, alignItems: 'center',
                      fontSize: 11, color: 'var(--txt3)',
                    }}>
                      {dateStr && <span>{dateStr}</span>}
                      {dateStr && distanceNm && <span>·</span>}
                      {distanceNm && <span>{distanceNm} NM</span>}
                      {durDisplay && <><span>·</span><span>{durDisplay}</span></>}
                    </div>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
