'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import type { Trip } from '@/lib/supabase'
import LikeButton from './LikeButton'
import Comments from './Comments'
import TripShareModal from './TripShareModal'
import ShareTripModal from './ShareTripModal'
import RouteMapSVG from './RouteMapSVG'
import ProfileTeaserPopover from './ProfileTeaserPopover'
import TripActions from './TripActions'
import { formatDurationMin } from '@/lib/gps'
import { timeAgo, absoluteDate } from '@/lib/utils'
import { renderMentions } from './Comments'
import { radius, shadow, fontSize, fontWeight } from '@/lib/tokens'

function fmt(n: number, dec = 1) {
  return n % 1 === 0 ? n.toString() : n.toFixed(dec)
}

/**
 * next/image kräver whitelistad domän i next.config.ts (remotePatterns).
 * Om en bild-URL kommer från en domän som INTE finns där kraschar rendringen.
 * Den här helpern returnerar true bara för URL:er vi vet att next/image klarar.
 * Alla andra URL:er serveras via plain <img> längre ner i komponenten.
 */
function isNextImageSafe(url: string): boolean {
  if (!url) return false
  try {
    const u = new URL(url)
    if (u.hostname.endsWith('.supabase.co')) return true
    if (u.hostname === 'images.unsplash.com') return true
    return false
  } catch {
    return false
  }
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
        <path d={d} fill="none" stroke="var(--sea)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="none" opacity="0.85" />
        {/* Start dot */}
        <circle cx={toX(start.lng)} cy={toY(start.lat)} r="4" fill="var(--green)" stroke="white" strokeWidth="1.5" />
        {/* End dot */}
        <circle cx={toX(end.lng)} cy={toY(end.lat)} r="4.5" fill="var(--acc)" stroke="white" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/** CSS scroll-snap photo carousel — no external deps */
function PhotoCarousel({
  photos, alt, priority, onError, idx, onIdxChange, sizes,
}: {
  photos: string[]
  alt: string
  priority?: boolean
  onError: (i: number) => void
  idx: number
  onIdxChange: (i: number) => void
  sizes?: string
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const ticking   = useRef(false)

  // Sync dot indicator on scroll
  function handleScroll() {
    if (ticking.current) return
    ticking.current = true
    requestAnimationFrame(() => {
      ticking.current = false
      const el = scrollRef.current
      if (!el) return
      const w = el.offsetWidth
      const i = Math.round(el.scrollLeft / w)
      onIdxChange(i)
    })
  }

  function scrollTo(i: number) {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Scroll container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          width: '100%', height: '100%',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        } as React.CSSProperties}
      >
        {photos.map((src, i) => (
          <div key={src} style={{
            position: 'relative',
            flexShrink: 0,
            width: '100%', height: '100%',
            scrollSnapAlign: 'start',
          }}>
            {isNextImageSafe(src) ? (
              <Image
                src={src}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-cover"
                sizes={sizes ?? '100vw'}
                priority={priority && i === 0}
                onError={() => onError(i)}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                loading={priority && i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onError={() => onError(i)}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 8, left: 0, right: 0,
          display: 'flex', justifyContent: 'center', gap: 5,
          pointerEvents: 'none',
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); scrollTo(i) }}
            aria-label={`Bild ${i + 1} av ${photos.length}`}
            aria-pressed={i === idx}
            style={{
              width: i === idx ? 16 : 5,
              height: 5, borderRadius: 3,
              background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)',
              transition: 'width .2s, background .2s',
              cursor: 'pointer',
              pointerEvents: 'all',
              border: 'none', padding: 0,
            }}
          />
        ))}
      </div>

      {/* Counter badge (top-right) */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 8, right: 8,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          borderRadius: 20, padding: '3px 8px',
          fontSize: 11, fontWeight: fontWeight.bold, color: '#fff',
          pointerEvents: 'none',
        }}
      >
        {idx + 1}/{photos.length}
      </div>
    </div>
  )
}

export default function TripCard({ trip, priority = false }: { trip: Trip; priority?: boolean }) {
  const router = useRouter()
  const [imgErr,        setImgErr]        = useState(false)
  const [expanded,      setExpanded]      = useState(false)
  const [showShareDM,   setShowShareDM]   = useState(false)
  const [photoErrors,   setPhotoErrors]   = useState<Set<number>>(new Set())
  const [photoIdx,      setPhotoIdx]      = useState(0)
  const [lightbox,      setLightbox]      = useState<'photo' | 'map' | null>(null)

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

  // All photos: primary image + extra images array
  const allPhotos = Array.from(new Set(
    [trip.image, ...(trip.images ?? [])].filter(Boolean) as string[]
  )).filter((_, i) => !photoErrors.has(i))

  const hasRoute  = routePoints !== null
  const hasPhoto  = allPhotos.length > 0 && !imgErr
  const hasMedia  = hasPhoto || hasRoute

  // Stats — only show speed when there's meaningful distance (avoids GPS-noise phantoms)
  const meaningfulDist = trip.distance >= 0.1
  const stats: { label: string; value: string }[] = []
  if (meaningfulDist)                                                stats.push({ label: 'Distans',   value: `${fmt(trip.distance)} NM` })
  if (dur)                                                           stats.push({ label: 'Tid',       value: dur })
  if (meaningfulDist && (trip.average_speed_knots ?? 0) >= 0.5)     stats.push({ label: 'Snittfart', value: `${fmt(trip.average_speed_knots)} kn` })
  if (meaningfulDist && (trip.max_speed_knots ?? 0) >= 0.5)         stats.push({ label: 'Toppfart',  value: `${fmt(trip.max_speed_knots)} kn` })

  const MAX_CAPTION = 120
  const caption = trip.caption ?? ''
  const captionTruncated = !expanded && caption.length > MAX_CAPTION
    ? caption.slice(0, MAX_CAPTION) + '…'
    : caption

  return (
    <article
      onClick={() => router.push(`/tur/${trip.id}`)}
      className="trip-card card-hover"
      style={{
        background: 'var(--surface-1, #fafeff)',
        borderRadius: radius.lg,
        overflow: 'hidden',
        boxShadow: '0 1px 0 rgba(10,123,140,0.06), 0 2px 8px rgba(0,45,60,0.06), 0 4px 20px rgba(0,45,60,0.04)',
        border: '1px solid rgba(10,123,140,0.09)',
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
      }}
    >

      {/* ── 1. Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px 11px' }}>
        <Link
          href={`/u/${username}`}
          onClick={e => e.stopPropagation()}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flex: 1, minWidth: 0 }}
        >
          {/* Avatar — long-press visar teaser */}
          <ProfileTeaserPopover username={username}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
              position: 'relative',
              background: 'var(--grad-sea)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: fontSize.small, fontWeight: fontWeight.semibold, color: '#fff',
              border: '2px solid rgba(255,255,255,0.9)',
              boxShadow: '0 1px 4px rgba(0,45,60,0.12)',
            }}>
              {avatar
                ? <Image src={avatar} alt={username} fill sizes="36px" style={{ objectFit: 'cover' }} />
                : username[0]?.toUpperCase() ?? '?'}
            </div>
          </ProfileTeaserPopover>

          {/* Name + meta */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold, color: 'var(--txt)', lineHeight: 1.2 }}>
              {username}
            </div>
            <div style={{
              fontSize: 11, color: 'var(--txt3)', marginTop: 2,
              display: 'flex', alignItems: 'center', gap: 4,
              overflow: 'hidden', whiteSpace: 'nowrap',
            }}>
              <span suppressHydrationWarning title={absoluteDate(trip.created_at)} style={{ flexShrink: 0, cursor: 'help' }}>{timeAgo(trip.created_at)}</span>
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
            fontSize: 11, fontWeight: 600, color: 'var(--acc)',
          }}>⚓⚓⚓</div>
        )}

        {/* Tre-punkts-meny — egna inlägg: redigera/radera/exportera.
            Andras inlägg: rapportera. Ej inloggade: ingen knapp.
            TripActions löser själva synlighetslogiken. */}
        <div onClick={e => e.stopPropagation()} style={{ flexShrink: 0 }}>
          <TripActions tripId={trip.id} ownerId={trip.user_id} />
        </div>

      </div>

      {/* ── 1b. Route preview (when no photo but route exists) ── */}
      {!hasPhoto && routePoints && routePoints.length >= 3 && (
        <div style={{ padding: '12px 16px' }}>
          <RoutePreview points={routePoints} />
        </div>
      )}

      {/* ── 2. Stats row ── */}
      {stats.length > 0 && (
        <div style={{
          display: 'flex',
          borderTop: '1px solid rgba(10,123,140,0.07)',
          borderBottom: '1px solid rgba(10,123,140,0.07)',
          background: 'rgba(10,123,140,0.025)',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              flex: 1,
              padding: '9px 8px 8px',
              textAlign: 'center',
              borderLeft: i > 0 ? '1px solid rgba(10,123,140,0.07)' : 'none',
            }}>
              <div style={{
                fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, color: 'var(--txt)',
                lineHeight: 1.1, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: 11, color: 'var(--txt3)', marginTop: 2,
                fontWeight: fontWeight.medium, letterSpacing: '0.3px', textTransform: 'uppercase',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── 3. Media (carousel + karta) ── */}
      {hasMedia && (
        <div>
          {hasPhoto && hasRoute ? (
            /* Carousel + karta side-by-side (2:1) */
            <div style={{
              display: 'flex', width: '100%', aspectRatio: '2/1',
              background: 'var(--sea-d)', overflow: 'hidden',
            }}>
              <div
                style={{ position: 'relative', flex: 1, overflow: 'hidden', cursor: 'zoom-in' }}
                onClick={e => { e.stopPropagation(); setLightbox('photo') }}
              >
                {allPhotos.length > 1 ? (
                  <PhotoCarousel
                    photos={allPhotos}
                    alt={trip.location_name ?? `Tur av ${username}`}
                    priority={priority}
                    onError={i => setPhotoErrors(prev => new Set([...prev, i]))}
                    idx={photoIdx}
                    onIdxChange={setPhotoIdx}
                    sizes="(max-width: 640px) 50vw, 320px"
                  />
                ) : isNextImageSafe(allPhotos[0]) ? (
                  <Image
                    src={allPhotos[0]}
                    alt={trip.location_name ?? `Tur av ${username}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 320px"
                    priority={priority}
                    onError={() => setImgErr(true)}
                  />
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={allPhotos[0]}
                    alt={trip.location_name ?? `Tur av ${username}`}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onError={() => setImgErr(true)}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
              <div
                style={{
                  position: 'relative', flex: 1, overflow: 'hidden',
                  borderLeft: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'zoom-in',
                }}
                onClick={e => { e.stopPropagation(); setLightbox('map') }}
              >
                <RouteMapSVG points={routePoints!} w={300} h={300} />
              </div>
            </div>
          ) : hasPhoto ? (
            /* Foto(n) — karusell eller enskilt 3:2 */
            <div
              style={{ position: 'relative', width: '100%', aspectRatio: '3/2', background: 'var(--sea-d)', overflow: 'hidden', cursor: 'zoom-in' }}
              onClick={e => { e.stopPropagation(); setLightbox('photo') }}
            >
              {allPhotos.length > 1 ? (
                <PhotoCarousel
                  photos={allPhotos}
                  alt={trip.location_name ?? `Tur av ${username}`}
                  priority={priority}
                  onError={i => setPhotoErrors(prev => new Set([...prev, i]))}
                  idx={photoIdx}
                  onIdxChange={setPhotoIdx}
                  sizes="(max-width: 640px) 100vw, 640px"
                />
              ) : isNextImageSafe(allPhotos[0]) ? (
                <Image
                  src={allPhotos[0]}
                  alt={trip.location_name ?? `Tur av ${username}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 640px"
                  priority={priority}
                  onError={() => setImgErr(true)}
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={allPhotos[0]}
                  alt={trip.location_name ?? `Tur av ${username}`}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={() => setImgErr(true)}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </div>
          ) : (
            /* Bara rutt */
            <div
              style={{ position: 'relative', width: '100%', aspectRatio: '16/7', background: 'var(--sea-d)', overflow: 'hidden', cursor: 'zoom-in' }}
              onClick={e => { e.stopPropagation(); setLightbox('map') }}
            >
              <RouteMapSVG points={routePoints!} w={600} h={262} />
            </div>
          )}
        </div>
      )}

      {/* ── 4. Actions ── */}
      <div onClick={e => e.stopPropagation()} style={{ padding: '11px 16px 4px' }}>
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
            <TripShareModal tripId={trip.id} title={trip.location_name ?? 'Min tur'} url={`https://svalla.se/tur/${trip.id}`} />
          </div>
        </div>
      </div>

      {/* ── 5. Caption ── */}
      {caption ? (
        <div style={{ padding: '4px 16px 10px', fontSize: fontSize.body, color: 'var(--txt)', lineHeight: 1.55 }}>
          <span style={{ fontWeight: fontWeight.semibold }}>{username}</span>
          {' '}
          <span>{renderMentions(captionTruncated)}</span>
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
        <div style={{ height: 8 }} />
      )}

      {/* ── 6. Tagged crew ── */}
      {trip.tagged_users && trip.tagged_users.length > 0 && (
        <div
          onClick={e => e.stopPropagation()}
          style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--txt3)', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 13, height: 13, flexShrink: 0, opacity: 0.6 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <span>med</span>
          {trip.tagged_users.map((u, i) => (
            <span key={u.username}>
              {i > 0 && <span style={{ marginRight: 4 }}>&</span>}
              <Link
                href={`/u/${u.username}`}
                style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}
              >
                @{u.username}
              </Link>
            </span>
          ))}
        </div>
      )}

      {/* Share to DM modal */}
      {showShareDM && (
        <ShareTripModal trip={trip} onClose={() => setShowShareDM(false)} />
      )}

      {/* Lightbox — portal till document.body för att undvika transform-stacking-context */}
      {lightbox && createPortal(
        <>
          <style>{`
            @keyframes _lb_fade { from { opacity:0 } to { opacity:1 } }
            @keyframes _lb_slide { from { opacity:0;transform:translateY(22px) } to { opacity:1;transform:translateY(0) } }
            .lb-scroll { scrollbar-width:none; -ms-overflow-style:none; }
            .lb-scroll::-webkit-scrollbar { display:none; }
          `}</style>
          <div
            role="dialog"
            aria-modal="true"
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(4,14,26,0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              animation: '_lb_fade 0.18s ease',
            }}
          >
            {/* Close button */}
            <button
              onClick={e => { e.stopPropagation(); setLightbox(null) }}
              aria-label="Stäng"
              style={{
                position: 'absolute',
                top: 'calc(env(safe-area-inset-top, 0px) + 12px)', right: 14,
                zIndex: 20,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(255,255,255,0.13)',
                border: '1px solid rgba(255,255,255,0.20)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Photo — horizontal scroll-snap, native swipe */}
            {lightbox === 'photo' && (
              <>
                <div
                  className="lb-scroll"
                  ref={el => { if (el) el.scrollLeft = photoIdx * el.clientWidth }}
                  onScroll={e => {
                    const el = e.currentTarget
                    const idx = Math.round(el.scrollLeft / el.clientWidth)
                    if (idx !== photoIdx) setPhotoIdx(idx)
                  }}
                  style={{
                    position: 'absolute',
                    top: 'calc(env(safe-area-inset-top, 0px) + 52px)',
                    bottom: allPhotos.length > 1
                      ? 'calc(env(safe-area-inset-bottom, 0px) + 44px)'
                      : 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
                    left: 0, right: 0,
                    overflowX: 'auto', overflowY: 'hidden',
                    scrollSnapType: 'x mandatory',
                    display: 'flex',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {allPhotos.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox(null)}
                      style={{
                        flexShrink: 0, width: '100vw', height: '100%',
                        scrollSnapAlign: 'start',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        onClick={e => e.stopPropagation()}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
                {allPhotos.length > 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
                    left: 0, right: 0,
                    display: 'flex', justifyContent: 'center', gap: 6,
                    pointerEvents: 'none',
                  }}>
                    {allPhotos.map((_, i) => (
                      <div key={i} style={{
                        height: 6,
                        width: i === photoIdx ? 18 : 6,
                        borderRadius: 3,
                        background: i === photoIdx ? '#fff' : 'rgba(255,255,255,0.35)',
                        transition: 'width 0.2s ease',
                      }} />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Map */}
            {lightbox === 'map' && routePoints && (
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  animation: '_lb_slide 0.24s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  <RouteMapSVG points={routePoints} w={400} h={800} />
                </div>
                {(trip.location_name || trip.start_location) && (
                  <div style={{
                    padding: '16px 20px calc(env(safe-area-inset-bottom, 0px) + 24px)',
                    background: 'rgba(4,12,24,0.90)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>
                      {trip.start_location && trip.location_name
                        ? `${trip.start_location} → ${trip.location_name}`
                        : (trip.location_name ?? trip.start_location)}
                    </div>
                    {trip.distance >= 0.1 && (
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', marginTop: 3 }}>
                        {`${trip.distance.toFixed(1)} NM`}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </article>
  )
}
