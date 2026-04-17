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

export default function TripCard({ trip }: { trip: Trip }) {
  const router    = useRouter()
  const [imgErr, setImgErr] = useState(false)
  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDurationMin(trip.duration)
  const hasStats = trip.distance > 0 || !!dur || trip.average_speed_knots > 0

  const stats: { val: string; label: string }[] = []
  if (trip.distance > 0)            stats.push({ val: `${fmt(trip.distance)} NM`, label: 'Distans' })
  if (dur)                          stats.push({ val: dur, label: 'Tid' })
  if (trip.average_speed_knots > 0) stats.push({ val: `${fmt(trip.average_speed_knots)} kn`, label: 'Snitt' })

  return (
    /* Outer div — no nested <Link> to avoid invalid HTML */
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
      {/* ── Bild ── */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'linear-gradient(135deg,#1a4e72,#2d7d8a)' }}>
        {trip.image && !imgErr && (
          <Image
            src={trip.image}
            alt={trip.location_name ?? `Tur av ${username}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            onError={() => setImgErr(true)}
          />
        )}
        {(!trip.image || imgErr) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52, opacity: 0.3 }}>⛵</div>
        )}

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,20,35,0.65) 0%, rgba(0,20,35,0.1) 50%, transparent 100%)',
        }} />

        {/* Plats + pinnar */}
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
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '12px 14px 14px' }}>

        {/* Användarrad — stopPropagation så klick på profil inte öppnar turen */}
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

        {/* Caption — max 3 rader */}
        {trip.caption && (
          <p style={{
            fontSize: 13, color: 'var(--txt2)', margin: '0 0 10px', lineHeight: 1.5,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {trip.caption}
          </p>
        )}

        {/* Stats */}
        {hasStats && (
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

        {/* Social — stopPropagation så like/kommentar inte navigerar */}
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

// Helper — kollar om caption finns
function caption_exists(trip: Trip) { return !!trip.caption }
