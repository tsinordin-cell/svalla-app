'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Trip } from '@/lib/supabase'
import LikeButton from './LikeButton'
import Comments from './Comments'
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

const pinnarEmoji: Record<number, string> = {
  1: '⚓',
  2: '⚓⚓',
  3: '⚓⚓⚓',
}

// ── Mini GPS-karta som SVG ─────────────────────────────────────────────────────
function MiniRouteSVG({
  points,
  w = 600,
  h = 300,
}: {
  points: { lat: number; lng: number }[]
  w?: number
  h?: number
}) {
  if (!points || points.length < 2) return null

  const lats = points.map(p => p.lat)
  const lngs = points.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)

  const pad = 28
  const latRange = maxLat - minLat || 0.0005
  const lngRange = maxLng - minLng || 0.0005

  // Scale uniformly so the route fits, then center
  const scaleX = (w - pad * 2) / lngRange
  const scaleY = (h - pad * 2) / latRange
  const scale  = Math.min(scaleX, scaleY)
  const usedW  = lngRange * scale
  const usedH  = latRange * scale
  const ox     = (w - usedW) / 2
  const oy     = (h - usedH) / 2

  const toX = (lng: number) => ox + (lng - minLng) * scale
  const toY = (lat: number) => oy + (maxLat - lat) * scale   // flip Y

  const allPts  = points.map(p => `${toX(p.lng).toFixed(1)},${toY(p.lat).toFixed(1)}`).join(' ')

  // Bright "recent" segment — last 35% of the track
  const recentIdx = Math.max(0, Math.floor(points.length * 0.65))
  const recentPts = points.slice(recentIdx)
  const recStr    = recentPts.map(p => `${toX(p.lng).toFixed(1)},${toY(p.lat).toFixed(1)}`).join(' ')

  const sp = points[0], ep = points[points.length - 1]
  const sx = toX(sp.lng), sy = toY(sp.lat)
  const ex = toX(ep.lng), ey = toY(ep.lat)

  const uid = `rg-${w}-${h}`   // unique gradient id per size

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0b2d42" />
          <stop offset="100%" stopColor="#1a5472" />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width={w} height={h} fill={`url(#${uid})`} />

      {/* Ghost dots — subtle water texture */}
      <circle cx={w * 0.15} cy={h * 0.2}  r="1.5" fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.75} cy={h * 0.15} r="1"   fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.6}  cy={h * 0.8}  r="1.5" fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.3}  cy={h * 0.7}  r="1"   fill="rgba(255,255,255,0.06)" />

      {/* Full track — dim */}
      <polyline
        points={allPts}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Recent segment — brighter */}
      {recentPts.length >= 2 && (
        <polyline
          points={recStr}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Start dot — green */}
      <circle cx={sx} cy={sy} r="5" fill="#22c55e" stroke="white" strokeWidth="2" />

      {/* End dot — orange */}
      <circle cx={ex} cy={ey} r="6" fill="#c96e2a" stroke="white" strokeWidth="2" />

      {/* "GPS-rutt" label, bottom-left */}
      <text
        x={pad * 0.6} y={h - pad * 0.5}
        fill="rgba(255,255,255,0.4)"
        fontSize={h * 0.075}
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="700"
        letterSpacing="0.5"
      >
        GPS-rutt
      </text>
    </svg>
  )
}

export default function TripCard({ trip }: { trip: Trip }) {
  const router    = useRouter()
  const [imgErr, setImgErr] = useState(false)
  const username  = trip.users?.username ?? 'Okänd'
  const avatar    = trip.users?.avatar_url
  const dur       = formatDurationMin(trip.duration)
  const hasStats  = trip.distance > 0 || !!dur || trip.average_speed_knots > 0
  const hasRoute  = Array.isArray(trip.route_points) && trip.route_points.length >= 2
  const hasPhoto  = !!trip.image && !imgErr

  const stats: { val: string; label: string }[] = []
  if (trip.distance > 0)            stats.push({ val: `${fmt(trip.distance)} NM`, label: 'Distans' })
  if (dur)                          stats.push({ val: dur, label: 'Tid' })
  if (trip.average_speed_knots > 0) stats.push({ val: `${fmt(trip.average_speed_knots)} kn`, label: 'Snitt' })

  return (
    <div
      role="article"
      onClick={() => router.push(`/tur/${trip.id}`)}
      style={{
        background: 'var(--white)', borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 2px 14px rgba(0,45,60,0.09)',
        border: '1px solid rgba(10,123,140,0.07)',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 24px rgba(0,45,60,0.14)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 14px rgba(0,45,60,0.09)'
      }}
    >
      {/* ── Visuell toppdel ──────────────────────────────────────────────────── */}
      {hasPhoto ? (
        /* FOTO + eventuell rutt-strip under */
        <>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#1a4e72,#2d7d8a)' }}>
            <Image
              src={trip.image}
              alt={trip.location_name ?? `Tur av ${username}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
              onError={() => setImgErr(true)}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,20,35,0.65) 0%, rgba(0,20,35,0.1) 50%, transparent 100%)',
            }} />
            {/* Plats + pinnar */}
            <LocationPinnarOverlay trip={trip} />
          </div>

          {/* Rutt-strip under foto */}
          {hasRoute && (
            <div style={{ width: '100%', height: 72, position: 'relative', overflow: 'hidden' }}>
              <MiniRouteSVG points={trip.route_points!} w={600} h={144} />
              {/* Avstånd-badge */}
              {trip.distance > 0 && (
                <div style={{
                  position: 'absolute', top: '50%', right: 12,
                  transform: 'translateY(-50%)',
                  background: 'rgba(201,110,42,0.92)', backdropFilter: 'blur(4px)',
                  color: '#fff', fontSize: 11, fontWeight: 800,
                  padding: '3px 9px', borderRadius: 12,
                  zIndex: 2,
                }}>
                  {fmt(trip.distance)} NM
                </div>
              )}
            </div>
          )}
        </>
      ) : hasRoute ? (
        /* INGEN FOTO — visa rutt som huvudbild */
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
          <MiniRouteSVG points={trip.route_points!} w={600} h={300} />
          {/* Gradient overlay för text */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,20,35,0.55) 0%, transparent 55%)',
          }} />
          <LocationPinnarOverlay trip={trip} />
          {/* Distans-badge uppe till vänster */}
          {trip.distance > 0 && (
            <div style={{
              position: 'absolute', top: 10, left: 12, zIndex: 2,
              background: 'rgba(0,20,35,0.55)', backdropFilter: 'blur(8px)',
              color: '#fff', fontSize: 12, fontWeight: 800,
              padding: '4px 10px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.15)',
            }}>
              📏 {fmt(trip.distance)} NM
            </div>
          )}
        </div>
      ) : (
        /* VARKEN foto eller rutt — vanlig placeholder */
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#1a4e72,#2d7d8a)' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, opacity: 0.3 }}>⛵</div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,20,35,0.65) 0%, rgba(0,20,35,0.1) 50%, transparent 100%)',
          }} />
          <LocationPinnarOverlay trip={trip} />
        </div>
      )}

      {/* ── Body ── */}
      <div style={{ padding: '12px 14px 14px' }}>

        {/* Användarrad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: caption_exists(trip) ? 8 : (hasStats ? 8 : 10) }}>
          <Link
            href={`/u/${username}`}
            onClick={e => e.stopPropagation()}
            style={{ display: 'flex', alignItems: 'center', gap: 7, textDecoration: 'none', flexShrink: 0 }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 700, color: '#fff',
              border: '2px solid rgba(30,92,130,0.15)',
            }}>
              {avatar
                ? <Image src={avatar} alt={username} width={32} height={32} style={{ objectFit: 'cover' }} />
                : username[0]?.toUpperCase() ?? '?'}
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{username}</span>
          </Link>
          <span style={{ fontSize: 11, color: 'var(--txt3)', marginLeft: 'auto', flexShrink: 0 }}>
            {timeAgo(trip.created_at)}
          </span>
        </div>

        {/* Caption */}
        {trip.caption && (
          <p style={{
            fontSize: 13, color: 'var(--txt2)', margin: '0 0 10px', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {trip.caption}
          </p>
        )}

        {/* Stats — visa bara om INTE rutt visas (rutten visar distans) */}
        {hasStats && !(hasRoute && !hasPhoto) && (
          <div style={{
            display: 'flex', borderRadius: 12, overflow: 'hidden', marginBottom: 10,
            background: 'rgba(10,123,140,0.04)',
            border: '1px solid rgba(10,123,140,0.08)',
          }}>
            {stats.map((s, i) => (
              <div key={s.label} style={{
                flex: 1, padding: '9px 0', textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid rgba(10,123,140,0.08)' : 'none',
              }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--sea)' }}>{s.val}</div>
                <div style={{ fontSize: 9, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Stats för tur med rutt men ingen foto — visa tid + snitt (distans visas i rutten) */}
        {hasRoute && !hasPhoto && (dur || trip.average_speed_knots > 0) && (
          <div style={{
            display: 'flex', borderRadius: 12, overflow: 'hidden', marginBottom: 10,
            background: 'rgba(10,123,140,0.04)',
            border: '1px solid rgba(10,123,140,0.08)',
          }}>
            {[
              dur ? { val: dur, label: 'Tid' } : null,
              trip.average_speed_knots > 0 ? { val: `${fmt(trip.average_speed_knots)} kn`, label: 'Snitt' } : null,
            ].filter(Boolean).map((s, i, arr) => s && (
              <div key={s.label} style={{
                flex: 1, padding: '9px 0', textAlign: 'center',
                borderRight: i < arr.length - 1 ? '1px solid rgba(10,123,140,0.08)' : 'none',
              }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--sea)' }}>{s.val}</div>
                <div style={{ fontSize: 9, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Social */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            paddingTop: 8, borderTop: '1px solid rgba(10,123,140,0.07)',
          }}
        >
          <LikeButton tripId={trip.id} />
          <Comments tripId={trip.id} />
        </div>
      </div>
    </div>
  )
}

// ── Delad overlay — plats + pinnar + båt ──────────────────────────────────────
function LocationPinnarOverlay({ trip }: { trip: Trip }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '10px 12px',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      gap: 8,
    }}>
      {trip.location_name && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, minWidth: 0 }}>
          <span style={{ fontSize: 11 }}>📍</span>
          <span style={{
            fontSize: 14, fontWeight: 800, color: '#fff',
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {trip.location_name}
          </span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        {trip.boat_type && (
          <span style={{
            fontSize: 11, fontWeight: 600,
            background: 'rgba(0,20,35,0.45)', backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '3px 8px', borderRadius: 20, color: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            {boatEmoji[trip.boat_type] ?? '⚓'} {trip.boat_type}
          </span>
        )}
        {trip.pinnar_rating && (
          <span style={{
            fontSize: 12,
            background: 'rgba(0,20,35,0.45)', backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '3px 8px', borderRadius: 20,
          }}>
            {pinnarEmoji[trip.pinnar_rating]}
          </span>
        )}
      </div>
    </div>
  )
}

// Helper
function caption_exists(trip: Trip) { return !!trip.caption }
