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
  const router = useRouter()
  const [imgErr, setImgErr] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDurationMin(trip.duration)
  // Require >= 0.05 NM distance so a stationary/test trip doesn't show an empty map
  const hasRoute = Array.isArray(trip.route_points) && trip.route_points.length >= 2 && (trip.distance ?? 0) >= 0.05
  const hasPhoto = !!trip.image && !imgErr
  const hasMedia = hasPhoto || hasRoute

  // Stats — show all available GPS data
  const stats: { label: string; value: string }[] = []
  if (trip.distance >= 0.01)               stats.push({ label: 'Distans',   value: `${fmt(trip.distance)} NM` })
  if (dur)                                 stats.push({ label: 'Tid',       value: dur })
  if ((trip.average_speed_knots ?? 0) > 0) stats.push({ label: 'Snittfart', value: `${fmt(trip.average_speed_knots)} kn` })
  if ((trip.max_speed_knots ?? 0) > 0)     stats.push({ label: 'Toppfart',  value: `${fmt(trip.max_speed_knots)} kn` })

  const MAX_CAPTION = 120
  const caption = trip.caption ?? ''
  const captionTruncated = !expanded && caption.length > MAX_CAPTION
    ? caption.slice(0, MAX_CAPTION) + '…'
    : caption

  return (
    <article style={{
      background: 'var(--white)',
      borderRadius: 20,
      overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(0,30,50,0.09)',
      border: '1px solid rgba(10,123,140,0.07)',
      WebkitTapHighlightColor: 'transparent',
    }}>

      {/* ── 1. Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
        <Link
          href={`/u/${username}`}
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flex: 1, minWidth: 0 }}
        >
          {/* Avatar */}
          <div style={{
            width: 38, height: 38, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: '#fff',
          }}>
            {avatar
              ? <Image src={avatar} alt={username} width={38} height={38} style={{ objectFit: 'cover' }} />
              : username[0]?.toUpperCase() ?? '?'}
          </div>

          {/* Name + meta */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', lineHeight: 1.2 }}>
              {username}
            </div>
            <div style={{
              fontSize: 11, color: 'var(--txt3)', marginTop: 2,
              display: 'flex', alignItems: 'center', gap: 4,
              overflow: 'hidden', whiteSpace: 'nowrap',
            }}>
              <span style={{ flexShrink: 0 }}>{timeAgo(trip.created_at)}</span>
              {trip.boat_type && (
                <>
                  <span style={{ opacity: 0.35, flexShrink: 0 }}>·</span>
                  <span style={{ flexShrink: 0 }}>{boatEmoji[trip.boat_type] ?? '⚓'} {trip.boat_type}</span>
                </>
              )}
              {trip.location_name && (
                <>
                  <span style={{ opacity: 0.35, flexShrink: 0 }}>·</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    📍 {trip.location_name}
                  </span>
                </>
              )}
            </div>
          </div>
        </Link>

        {/* Pinnar badge */}
        {trip.pinnar_rating === 3 && (
          <div style={{
            flexShrink: 0,
            background: 'rgba(201,110,42,0.1)',
            borderRadius: 20, padding: '4px 9px',
            fontSize: 11, fontWeight: 800, color: '#c96e2a',
          }}>⚓⚓⚓</div>
        )}
      </div>

      {/* ── 2. Stats row ── */}
      {stats.length > 0 && (
        <div style={{
          display: 'flex',
          borderTop: '1px solid rgba(10,123,140,0.06)',
          borderBottom: '1px solid rgba(10,123,140,0.06)',
          background: 'rgba(10,123,140,0.02)',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              padding: '10px 6px',
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(10,123,140,0.06)' : 'none',
            }}>
              <div style={{
                fontSize: 16, fontWeight: 900, color: 'var(--txt)',
                lineHeight: 1.1, letterSpacing: '-0.4px',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 9, color: 'var(--txt3)', marginTop: 3,
                fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 3. Media ── */}
      {hasMedia && (
        <div
          onClick={() => router.push(`/tur/${trip.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {hasPhoto && hasRoute ? (
            /* Both: route 55% left, photo 45% right */
            <div style={{ display: 'flex', height: 210 }}>
              <div style={{ flex: '0 0 55%', position: 'relative', overflow: 'hidden', background: '#0d2a3e' }}>
                <RouteMapSVG points={trip.route_points!} w={330} h={210} />
              </div>
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <Image
                  src={trip.image}
                  alt={trip.location_name ?? `Tur av ${username}`}
                  fill
                  className="object-cover"
                  sizes="220px"
                  onError={() => setImgErr(true)}
                />
                {/* Left-edge fade blending with route */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(13,42,62,0.3) 0%, transparent 35%)',
                  pointerEvents: 'none',
                }} />
              </div>
            </div>
          ) : hasPhoto ? (
            /* Only photo — landscape 3:2 */
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', background: '#0d2a3e', overflow: 'hidden' }}>
              <Image
                src={trip.image}
                alt={trip.location_name ?? `Tur av ${username}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
                onError={() => setImgErr(true)}
              />
            </div>
          ) : (
            /* Only route — wide landscape */
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: '#0d2a3e', overflow: 'hidden' }}>
              <RouteMapSVG points={trip.route_points!} w={600} h={262} />
            </div>
          )}
        </div>
      )}

      {/* ── 4. Actions ── */}
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

      {/* ── 5. Caption ── */}
      {caption ? (
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
      ) : (
        <div style={{ height: 10 }} />
      )}
    </article>
  )
}
