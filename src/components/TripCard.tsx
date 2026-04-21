'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'
import LikeButton from './LikeButton'
import Comments from './Comments'
import ShareButton from './ShareButton'
import ShareTripModal from './ShareTripModal'
import RouteMapSVG from './RouteMapSVG'
import ProfileTeaserPopover from './ProfileTeaserPopover'
import { formatDurationMin } from '@/lib/gps'
import { timeAgo, absoluteDate } from '@/lib/utils'

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


function RoutePreview({ points }: { points: { lat: number; lng: number }[] }) {
  if (points.length < 3) return null
  const W = 300, H = 72
  const lats = points.map(p => p.lat)
  const lngs = points.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const pad = 10
  const toX = (lng: number) => pad + ((lng - minLng) / (maxLng - minLng || 1)) * (W - pad * 2)
  const toY = (lat: number) => H - pad - ((lat - minLat) / (maxLat - minLat || 1)) * (H - pad * 2)
  
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.lng).toFixed(1)},${toY(p.lat).toFixed(1)}`).join(' ')
  const start = points[0], end = points[points.length - 1]

  return (
    <div style={{
      width: '100%', height: H, borderRadius: 10, overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(14,34,56,0.06), rgba(30,92,130,0.08))',
      border: '1px solid rgba(30,92,130,0.12)',
      marginBottom: 8,
    }}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        {/* Shadow line */}
        <path d={d} fill="none" stroke="rgba(30,92,130,0.15)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Main route line */}
        <path d={d} fill="none" stroke="#1e5c82" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="none" opacity="0.85" />
        {/* Start dot */}
        <circle cx={toX(start.lng)} cy={toY(start.lat)} r="4" fill="#22c55e" stroke="white" strokeWidth="1.5" />
        {/* End dot */}
        <circle cx={toX(end.lng)} cy={toY(end.lat)} r="4.5" fill="#c96e2a" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function TripCard({ trip, priority = false }: { trip: Trip; priority?: boolean }) {
  const router = useRouter()
  const [imgErr,        setImgErr]        = useState(false)
  const [expanded,      setExpanded]      = useState(false)
  const [isOwner,       setIsOwner]       = useState(false)
  const [showShareDM,   setShowShareDM]   = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsOwner(!!user && user.id === trip.user_id)
    })
  }, [trip.user_id])

  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDurationMin(trip.duration)

  // Parse route_points defensively — may come as JSON string if not stored as JSONB
  const routePoints: { lat: number; lng: number }[] | null = (() => {
    const raw = trip.route_points
    if (!raw) return null
    if (Array.isArray(raw)) return raw.length >= 2 ? raw : null
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) && parsed.length >= 2 ? parsed : null
      } catch { return null }
    }
    return null
  })()

  const hasRoute = routePoints !== null
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
    <article
      onClick={() => router.push(`/tur/${trip.id}`)}
      style={{
        background: 'var(--white)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,30,50,0.09)',
        border: '1px solid rgba(10,123,140,0.07)',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
      }}
    >

      {/* ── 1. Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
        <Link
          href={`/u/${username}`}
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flex: 1, minWidth: 0 }}
        >
          {/* Avatar — long-press visar teaser */}
          <ProfileTeaserPopover username={username}>
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
          </ProfileTeaserPopover>

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
              <span title={absoluteDate(trip.created_at)} style={{ flexShrink: 0, cursor: 'help' }}>{timeAgo(trip.created_at)}</span>
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

        {/* Owner edit shortcut */}
        {isOwner && (
          <Link
            href={`/tur/${trip.id}`}
            onClick={e => e.stopPropagation()}
            title="Redigera tur"
            style={{
              flexShrink: 0, width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(10,123,140,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16, color: '#7a9dab' }}>
              <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
            </svg>
          </Link>
        )}
      </div>

      {/* ── 1b. Route preview (when no photo but route exists) ── */}
      {!hasPhoto && routePoints && routePoints.length >= 3 && (
        <div style={{ padding: '12px 14px' }}>
          <RoutePreview points={routePoints} />
        </div>
      )}

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

      {/* ── 3. Media (Strava-stil: foto + karta side-by-side) ── */}
      {hasMedia && (
        <div>
          {hasPhoto && hasRoute ? (
            /* Foto + karta side-by-side */
            <div style={{
              display: 'flex', width: '100%', aspectRatio: '2/1',
              background: '#0d2a3e', overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                <Image
                  src={trip.image}
                  alt={trip.location_name ?? `Tur av ${username}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 320px"
                  priority={priority}
                  onError={() => setImgErr(true)}
                />
              </div>
              <div style={{
                position: 'relative', flex: 1, overflow: 'hidden',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}>
                <RouteMapSVG points={routePoints!} w={300} h={300} />
              </div>
            </div>
          ) : hasPhoto ? (
            /* Bara foto — 3:2 full bredd */
            <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', background: '#0d2a3e', overflow: 'hidden' }}>
              <Image
                src={trip.image}
                alt={trip.location_name ?? `Tur av ${username}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 640px"
                priority={priority}
                onError={() => setImgErr(true)}
              />
            </div>
          ) : (
            /* Bara rutt — bred landskap */
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: '#0d2a3e', overflow: 'hidden' }}>
              <RouteMapSVG points={routePoints!} w={600} h={262} />
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
          {/* Skicka som DM */}
          <button
            onClick={() => setShowShareDM(true)}
            aria-label="Skicka som meddelande"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px',
              color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 5,
              fontSize: 13, fontWeight: 600,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} style={{ width: 20, height: 20 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          <div style={{ marginLeft: 'auto' }}>
            <ShareButton url={`https://svalla.se/tur/${trip.id}`} title={trip.location_name ?? 'Min tur'} />
          </div>
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

      {/* Share to DM modal */}
      {showShareDM && (
        <ShareTripModal trip={trip} onClose={() => setShowShareDM(false)} />
      )}
    </article>
  )
}
