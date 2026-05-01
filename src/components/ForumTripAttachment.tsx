'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

interface TripSnapshot {
  id: string
  user_id: string
  boat_type: string | null
  distance: number | null
  duration: number | null
  location_name: string | null
  start_location: string | null
  image: string | null
  pinnar_rating: number | null
  started_at: string | null
  author?: { username: string | null; avatar: string | null } | null
}

/**
 * Renderar ett tur-kort inuti ett forum-inlägg.
 * Bäddas in via [trip:UUID]-syntax i body. Komponenten hämtar trip-data
 * via auth-klient (RLS = endast publika turer går igenom).
 *
 * PREMIUM-känsla: skeleton-loader, fade-in, tydlig länk till tur-sida.
 */
export default function ForumTripAttachment({ id }: { id: string }) {
  const [trip, setTrip] = useState<TripSnapshot | null | 'error'>(null)

  useEffect(() => {
    let cancelled = false
    const supabase = createClient()
    ;(async () => {
      const { data, error } = await supabase
        .from('trips')
        .select('id, user_id, boat_type, distance, duration, location_name, start_location, image, pinnar_rating, started_at')
        .eq('id', id)
        .maybeSingle()
      if (cancelled) return
      if (error || !data) { setTrip('error'); return }

      // Hämta författarens namn separat
      const { data: u } = await supabase
        .from('users')
        .select('username, avatar')
        .eq('id', data.user_id)
        .maybeSingle()

      setTrip({ ...data, author: u ?? null })
    })()
    return () => { cancelled = true }
  }, [id])

  if (trip === null) {
    return (
      <div style={{
        margin: '12px 0',
        height: 110,
        borderRadius: 14,
        background: 'linear-gradient(90deg, rgba(10,123,140,0.06), rgba(10,123,140,0.10), rgba(10,123,140,0.06))',
        backgroundSize: '200% 100%',
        animation: 'svallaSkeleton 1.6s ease-in-out infinite',
      }}>
        <style>{`@keyframes svallaSkeleton { 0%,100%{background-position:0% 0%} 50%{background-position:100% 0%} }`}</style>
      </div>
    )
  }

  if (trip === 'error') {
    return (
      <div style={{
        margin: '12px 0',
        padding: '12px 14px',
        borderRadius: 12,
        background: 'rgba(10,123,140,0.04)',
        border: '1px dashed rgba(10,123,140,0.20)',
        fontSize: 12,
        color: 'var(--txt3)',
        fontStyle: 'italic',
      }}>
        [Tur ej tillgänglig]
      </div>
    )
  }

  const distanceNm = trip.distance ? (trip.distance / 1.852).toFixed(1) : null
  const durMin = trip.duration ? Math.round(trip.duration / 60) : null
  const durDisplay = durMin ? (durMin >= 60 ? `${Math.floor(durMin / 60)}h ${durMin % 60}m` : `${durMin}m`) : null
  const route = trip.start_location && trip.location_name
    ? `${trip.start_location} → ${trip.location_name}`
    : trip.location_name ?? trip.start_location ?? ''

  return (
    <Link
      href={`/tur/${trip.id}`}
      style={{
        display: 'flex',
        gap: 12,
        margin: '12px 0',
        padding: 10,
        borderRadius: 14,
        background: 'var(--white)',
        border: '1px solid rgba(10,123,140,0.14)',
        textDecoration: 'none',
        color: 'var(--txt)',
        boxShadow: '0 2px 10px rgba(10,31,43,0.06)',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(10,31,43,0.10)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(10,31,43,0.06)'
      }}
    >
      {/* Tur-thumbnail */}
      {trip.image ? (
        <div style={{
          width: 110, height: 90, borderRadius: 10,
          backgroundImage: `url(${trip.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          flexShrink: 0,
        }} />
      ) : (
        <div style={{
          width: 110, height: 90, borderRadius: 10,
          background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          color: '#fff',
        }}>
          <Icon name="sailboat" size={28} stroke={1.5} />
        </div>
      )}

      {/* Innehåll */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 10, fontWeight: 700, color: 'var(--sea)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            marginBottom: 4,
          }}>
            <Icon name="sailboat" size={11} stroke={2} />
            Bifogad tur
            {trip.pinnar_rating === 3 && (
              <span style={{
                marginLeft: 4,
                fontSize: 9, fontWeight: 800, color: 'var(--accent, #c96e2a)',
                background: 'rgba(232,146,74,0.12)',
                padding: '1px 6px', borderRadius: 4,
              }}>MAGISK</span>
            )}
          </div>
          <div style={{
            fontSize: 13.5, fontWeight: 700, color: 'var(--txt)',
            lineHeight: 1.35,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {route || 'Skärgårdstur'}
          </div>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 11, color: 'var(--txt3)',
          marginTop: 4,
        }}>
          {distanceNm && <span>{distanceNm} NM</span>}
          {distanceNm && durDisplay && <span>·</span>}
          {durDisplay && <span>{durDisplay}</span>}
          {trip.boat_type && <><span>·</span><span>{trip.boat_type}</span></>}
        </div>
      </div>
    </Link>
  )
}
