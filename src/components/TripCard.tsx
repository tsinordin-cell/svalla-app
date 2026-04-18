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

const pinnarLabel: Record<number, string> = {
  1: '⚓',
  2: '⚓⚓',
  3: '⚓⚓⚓ Magisk',
}

export default function TripCard({ trip }: { trip: Trip }) {
  const router   = useRouter()
  const [imgErr, setImgErr] = useState(false)
  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDurationMin(trip.duration)
  const hasRoute = Array.isArray(trip.route_points) && trip.route_points.length >= 2
  const hasPhoto = !!trip.image && !imgErr

  // Stat chips shown overlaid on the image
  const statChips: { val: string; icon: string }[] = []
  if (trip.distance >= 0.1)          statChips.push({ icon: '📏', val: `${fmt(trip.distance)} NM` })
  if (dur)                          statChips.push({ icon: '⏱', val: dur })
  if (trip.average_speed_knots >= 0.1) statChips.push({ icon: '⚡', val: `${fmt(trip.average_speed_knots)} kn` })

  return (
    <article
      onClick={() => router.push(`/tur/${trip.id}`)}
      style={{
        background: 'var(--white)',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,30,50,0.10)',
        border: '1px solid rgba(10,123,140,0.08)',
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* ── Visual hero ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '4/3',
        background: 'linear-gradient(160deg,#0d2a3e,#1a5472)',
      }}>
        {/* Image or route map */}
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
            <RouteMapSVG points={trip.route_points!} w={600} h={450} />
          </div>
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 64, opacity: 0.2,
          }}>⛵</div>
        )}

        {/* Strong bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,12,25,0.88) 0%, rgba(0,12,25,0.4) 38%, rgba(0,12,25,0.05) 65%, transparent 100%)',
        }} />

        {/* ── Stat chips — top left ── */}
        {statChips.length > 0 && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            display: 'flex', gap: 6,
          }}>
            {statChips.map(chip => (
              <div key={chip.val} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(0,12,25,0.60)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 20,
                padding: '5px 10px',
              }}>
                <span style={{ fontSize: 11 }}>{chip.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.1px' }}>{chip.val}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Boat type + rating — top right ── */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
        }}>
          {trip.boat_type && (
            <div style={{
              background: 'rgba(0,12,25,0.60)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.16)',
              borderRadius: 20, padding: '5px 10px',
              fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.92)',
            }}>
              {boatEmoji[trip.boat_type] ?? '⚓'} {trip.boat_type}
            </div>
          )}
          {trip.pinnar_rating && (
            <div style={{
              background: 'rgba(180,90,20,0.72)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,160,60,0.3)',
              borderRadius: 20, padding: '5px 10px',
              fontSize: 11, fontWeight: 800, color: '#fff',
            }}>
              {pinnarLabel[trip.pinnar_rating]}
            </div>
          )}
        </div>

        {/* ── Bottom overlay: location + user row ── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 14px' }}>
          {trip.location_name && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 9 }}>
              <span style={{ fontSize: 12 }}>📍</span>
              <span style={{
                fontSize: 17, fontWeight: 900, color: '#fff',
                textShadow: '0 1px 8px rgba(0,0,0,0.55)',
                letterSpacing: '-0.3px',
              }}>
                {trip.location_name}
              </span>
            </div>
          )}

          {/* User + timestamp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link
              href={`/u/${username}`}
              onClick={e => e.stopPropagation()}
              style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none' }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: '#fff',
                border: '2px solid rgba(255,255,255,0.35)',
              }}>
                {avatar
                  ? <Image src={avatar} alt={username} width={30} height={30} style={{ objectFit: 'cover' }} />
                  : username[0]?.toUpperCase() ?? '?'}
              </div>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: 'rgba(255,255,255,0.95)',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}>
                {username}
              </span>
            </Link>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginLeft: 'auto' }}>
              {timeAgo(trip.created_at)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      {(trip.caption || (hasPhoto && hasRoute)) && (
        <div style={{ padding: '12px 14px 0' }}>
          {trip.caption && (
            <p style={{
              fontSize: 14, color: 'var(--txt)', margin: 0, lineHeight: 1.55,
              display: '-webkit-box', WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {trip.caption}
            </p>
          )}

          {/* Route strip when photo + route both exist */}
          {hasPhoto && hasRoute && (
            <div style={{
              marginTop: trip.caption ? 10 : 0,
              borderRadius: 12, overflow: 'hidden', height: 60,
            }}>
              <RouteMapSVG points={trip.route_points!} w={600} h={120} />
            </div>
          )}
        </div>
      )}

      {/* ── Social actions ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ padding: '10px 14px 14px' }}
      >
        <div style={{
          display: 'flex', gap: 8,
          paddingTop: 10,
          borderTop: '1px solid rgba(10,123,140,0.07)',
        }}>
          <LikeButton
            tripId={trip.id}
            initialCount={trip.likes_count}
            initialLiked={trip.user_liked}
          />
          <Comments
            tripId={trip.id}
            initialCount={trip.comments_count}
          />
        </div>
      </div>
    </article>
  )
}
