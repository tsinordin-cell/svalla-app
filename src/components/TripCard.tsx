'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Trip } from '@/lib/supabase'
import LikeButton from './LikeButton'
import Comments from './Comments'

function fmt(n: number, dec = 1) {
  return n % 1 === 0 ? n.toString() : n.toFixed(dec)
}

function formatDuration(min: number) {
  if (!min || min <= 0) return null
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h === 0) return `${m}min`
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'Just nu'
  if (m < 60) return `${m} min sedan`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h sedan`
  const d = Math.floor(h / 24)
  if (d === 1) return 'Igår'
  if (d < 7) return `${d} dagar sedan`
  return new Date(dateStr).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

const boatEmoji: Record<string, string> = {
  'Motorbåt':  '🚤',
  'Segelbåt':  '⛵',
  'RIB':       '🛥️',
  'Katamaran': '⛵',
  'Segeljolle':'⛵',
  'Kajak':     '🛶',
  'SUP':       '🏄',
  'Annat':     '⚓',
}

const pinnarEmoji: Record<number, string> = {
  1: '⚓',
  2: '⚓⚓',
  3: '⚓⚓⚓',
}

export default function TripCard({ trip }: { trip: Trip }) {
  const router   = useRouter()
  const username = trip.users?.username ?? 'Okänd'
  const avatar   = trip.users?.avatar_url
  const dur      = formatDuration(trip.duration)
  const hasStats = trip.distance > 0 || !!dur || trip.average_speed_knots > 0

  const stats: { val: string; label: string }[] = []
  if (trip.distance > 0)             stats.push({ val: `${fmt(trip.distance)} NM`, label: 'Distans' })
  if (dur)                           stats.push({ val: dur, label: 'Tid' })
  if (trip.average_speed_knots > 0)  stats.push({ val: `${fmt(trip.average_speed_knots)} kn`, label: 'Snitt' })

  return (
    <article
      onClick={() => router.push(`/tur/${trip.id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{
        background: '#fff', borderRadius: 20,
        overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,45,60,0.08)',
        border: '1px solid rgba(10,123,140,0.07)',
      }}>
        {/* ── Bild ── */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)' }}>
          {trip.image && (
            <Image
              src={trip.image}
              alt={trip.location_name ?? `Tur av ${username}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 640px"
            />
          )}
          {!trip.image && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.4 }}>⛵</div>
          )}
          {/* Plats-overlay */}
          {trip.location_name && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,20,35,0.7) 0%, transparent 100%)',
              padding: '32px 14px 12px',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 12 }}>📍</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                  {trip.location_name}
                </span>
              </div>
              {trip.pinnar_rating && (
                <span style={{
                  fontSize: 13,
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px', borderRadius: 12, color: '#fff',
                }}>
                  {pinnarEmoji[trip.pinnar_rating]}
                </span>
              )}
            </div>
          )}
          {/* Båt-badge (om ingen plats) */}
          {!trip.location_name && (
            <div style={{
              position: 'absolute', bottom: 10, left: 10,
              background: 'rgba(250,254,255,0.90)', backdropFilter: 'blur(8px)',
              color: '#1e5c82', fontSize: 12, fontWeight: 600,
              padding: '4px 10px', borderRadius: 20,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span>{boatEmoji[trip.boat_type] ?? '⚓'}</span>
              <span>{trip.boat_type}</span>
            </div>
          )}
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '12px 14px' }}>
          {/* Användarrad */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Link href={`/u/${username}`} onClick={e => e.stopPropagation()} style={{
              display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden',
              }}>
                {avatar
                  ? <Image src={avatar} alt={username} width={30} height={30} style={{ objectFit: 'cover' }} />
                  : username[0]?.toUpperCase() ?? '?'}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#162d3a' }}>{username}</span>
            </Link>
            {trip.location_name && trip.boat_type && (
              <span style={{
                fontSize: 11, padding: '2px 8px', borderRadius: 12,
                background: 'rgba(10,123,140,0.07)', color: '#3a6a80',
              }}>
                {boatEmoji[trip.boat_type] ?? '⚓'} {trip.boat_type}
              </span>
            )}
            <span style={{ fontSize: 11, color: '#a0bec8', marginLeft: 'auto' }}>{timeAgo(trip.created_at)}</span>
          </div>

          {/* Caption */}
          {trip.caption && (
            <p style={{ fontSize: 13, color: '#3a5060', margin: '0 0 10px', lineHeight: 1.45 }}>
              {trip.caption}
            </p>
          )}

          {/* Stats (om inga GPS) */}
          {hasStats && (
            <div style={{
              display: 'flex', borderRadius: 12, overflow: 'hidden', marginBottom: 8,
              border: '1px solid rgba(10,123,140,0.09)',
            }}>
              {stats.map((s, i) => (
                <div key={s.label} style={{
                  flex: 1, padding: '8px 0', textAlign: 'center',
                  borderRight: i < stats.length - 1 ? '1px solid rgba(10,123,140,0.09)' : 'none',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 900, color: '#1e5c82' }}>{s.val}</div>
                  <div style={{ fontSize: 9, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Social */}
          <div onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 8, borderTop: '1px solid rgba(10,123,140,0.07)', marginBottom: 4 }}>
              <LikeButton tripId={trip.id} />
              <Comments tripId={trip.id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
