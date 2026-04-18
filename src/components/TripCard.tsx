'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Trip } from '@/lib/supabase'
import LikeButton from './LikeButton'
import Comments from './Comments'
import RouteMapSVG from './RouteMapSVG'
import { formatDurationMin } from '@/lib/gps'
import { timeAgo } from '@/lib/utils'

function fmt(n: number, dec = 1) {
  return n % 1 === 0 ? n.toString() : n.toFixed(dec)
}

const boatEmoji: Record<string, string> = {
  'Motorbåt':   '🚤',
  'Segelbåt':   '⛵',
  'RIB':        '🛥️',
  'Katamaran':  '⛵',
  'Segeljolle': '⛵',
  'Kajak':      '🛶',
  'SUP':        '🏄',
  'Annat':      '⚓',
}

export default function TripCard({ trip }: { trip: Trip }) {
  const router   = useRouter()
  const [imgErr, setImgErr]       = useState(false)
  const [expanded, setExpanded]   = useState(false)

  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDurationMin(trip.duration)
  const hasRoute = Array.isArray(trip.route_points) && trip.route_points.length >= 2
  const hasPhoto = !!trip.image && !imgErr

  // Stat chips — only show real values
  const statChips: { val: string; icon: string }[] = []
  if (trip.distance >= 0.1)            statChips.push({ icon: '📏', val: `${fmt(trip.distance)} NM` })
  if (dur)                             statChips.push({ icon: '⏱', val: dur })
  if (trip.average_speed_knots >= 0.1) statChips.push({ icon: '⚡', val: `${fmt(trip.average_speed_knots)} kn` })

  const MAX_CAPTION = 100
  const caption = trip.caption ?? ''
  const captionTruncated = !expanded && caption.length > MAX_CAPTION
    ? caption.slice(0, MAX_CAPTION) + '…'
    : caption

  return (
    <article
      style={{
        background: 'var(--white)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 1px 12px rgba(0,30,50,0.08)',
        border: '1px solid rgba(10,123,140,0.07)',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* ── 1. Header row: avatar · username · time · boat ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '11px 14px 9px',
      }}>
        <Link
          href={`/u/${username}`}
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flex: 1, minWidth: 0 }}
        >
          {/* Avatar */}
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 900, color: '#fff',
          }}>
            {avatar
              ? <Image src={avatar} alt={username} width={36} height={36} style={{ objectFit: 'cover' }} />
              : username[0]?.toUpperCase() ?? '?'}
          </div>
          {/* Name + time */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', lineHeight: 1.2 }}>
              {username}
            </div>
            <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
              {timeAgo(trip.created_at)}
              {trip.boat_type && (
                <span style={{ marginLeft: 5, opacity: 0.7 }}>· {boatEmoji[trip.boat_type] ?? '⚓'} {trip.boat_type}</span>
              )}
            </div>
          </div>
        </Link>

        {/* Pinnar rating badge */}
        {trip.pinnar_rating === 3 && (
          <div style={{
            flexShrink: 0,
            background: 'rgba(201,110,42,0.1)',
            borderRadius: 20, padding: '4px 9px',
            fontSize: 11, fontWeight: 800, color: '#c96e2a',
          }}>
            ⚓⚓⚓
          </div>
        )}
      </div>

      {/* ── 2. Hero image — portrait 4:5 ── */}
      <div
        onClick={() => router.push(`/tur/${trip.id}`)}
        style={{
          cursor: 'pointer',
          position: 'relative', width: '100%', aspectRatio: '4/5',
          background: 'linear-gradient(160deg,#0d2a3e,#1a5472)',
          overflow: 'hidden',
        }}
      >
        {hasPhoto ? (
          <Image
            src={trip.image}
            alt={trip.location_name ?? `Tur av ${username}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            onError={() => setImgErr(true)}
          />
        ) : hasRoute ? (
          <div style={{ position: 'absolute', inset: 0 }}>
            <RouteMapSVG points={trip.route_points!} w={600} h={750} />
          </div>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 72, opacity: 0.15,
          }}>⛵</div>
        )}

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,12,25,0.72) 0%, rgba(0,12,25,0.2) 35%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Stat chips — top left */}
        {statChips.length > 0 && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', gap: 6, flexWrap: 'wrap', maxWidth: '70%',
          }}>
            {statChips.map(chip => (
              <div key={chip.val} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(0,12,25,0.55)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 20, padding: '5px 10px',
              }}>
                <span style={{ fontSize: 11 }}>{chip.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{chip.val}</span>
              </div>
            ))}
          </div>
        )}

        {/* Route strip top-right when both photo + route */}
        {hasPhoto && hasRoute && (
          <div style={{
            position: 'absolute', top: 12, right: 12,
            width: 56, height: 56, borderRadius: 12, overflow: 'hidden',
            border: '1.5px solid rgba(255,255,255,0.25)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            <RouteMapSVG points={trip.route_points!} w={112} h={112} />
          </div>
        )}

        {/* Bottom: location */}
        {trip.location_name && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 12 }}>📍</span>
              <span style={{
                fontSize: 18, fontWeight: 900, color: '#fff',
                textShadow: '0 1px 8px rgba(0,0,0,0.55)',
                letterSpacing: '-0.3px',
              }}>
                {trip.location_name}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. Social actions — compact icon + count ── */}
      <div onClick={e => e.stopPropagation()} style={{ padding: '10px 14px 4px' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <LikeButton
            tripId={trip.id}
            initialCount={trip.likes_count}
            initialLiked={trip.user_liked}
            compact
          />
          <Comments
            tripId={trip.id}
            initialCount={trip.comments_count}
            compact
          />
        </div>
      </div>

      {/* ── 4. Caption ── */}
      {caption && (
        <div style={{ padding: '4px 14px 14px', fontSize: 14, color: 'var(--txt)', lineHeight: 1.55 }}>
          <span style={{ fontWeight: 800 }}>{username}</span>
          {' '}
          <span>{captionTruncated}</span>
          {caption.length > MAX_CAPTION && (
            <button
              onClick={e => { e.stopPropagation(); setExpanded(v => !v) }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, color: 'var(--txt3)', padding: '0 0 0 4px', fontWeight: 600,
              }}
            >
              {expanded ? 'Visa mindre' : 'Visa mer'}
            </button>
          )}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </article>
  )
}
