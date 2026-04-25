'use client'
/**
 * TripHeroCarousel
 * Multi-photo carousel for /tur/[id] hero.
 * - CSS scroll-snap (no deps)
 * - Tap to open fullscreen lightbox
 * - Dot indicators
 * - Keyboard nav (Esc, ←, →) in lightbox
 */
import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'
import RouteMapSVG from './RouteMapSVG'

function isVideo(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase()
    return /\.(mp4|mov|webm|m4v)(\?|$)/.test(path)
  } catch {
    return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url)
  }
}

export default function TripHeroCarousel({
  photos,
  routePoints,
  locationName,
}: {
  photos: string[]
  routePoints: { lat: number; lng: number }[] | null
  locationName?: string | null
}) {
  const scrollRef    = useRef<HTMLDivElement>(null)
  const [idx,        setIdx]        = useState(0)
  const [lightbox,   setLightbox]   = useState(false)
  const [lbIdx,      setLbIdx]      = useState(0)
  const [errors,     setErrors]     = useState<Set<number>>(new Set())

  const validPhotos = photos.filter((_, i) => !errors.has(i))
  const hasPhotos   = validPhotos.length > 0

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.offsetWidth)
    setIdx(i)
  }

  function scrollTo(i: number) {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: i * el.offsetWidth, behavior: 'smooth' })
  }

  const openLightbox = useCallback((i: number) => {
    setLbIdx(i)
    setLightbox(true)
  }, [])

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')     { setLightbox(false); return }
      if (e.key === 'ArrowRight') { setLbIdx(v => Math.min(v + 1, validPhotos.length - 1)); return }
      if (e.key === 'ArrowLeft')  { setLbIdx(v => Math.max(v - 1, 0)); return }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, validPhotos.length])

  if (!hasPhotos && !routePoints) return null

  // Grid layout when 2–3 photos and no route
  const useGrid = validPhotos.length >= 2 && !routePoints

  // ── Helper: render a single media slide ──
  function MediaSlide({ src, alt, priority: p, fill }: { src: string; alt: string; priority?: boolean; fill?: boolean }) {
    if (isVideo(src)) {
      return (
        <video
          src={src}
          muted playsInline autoPlay loop
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )
    }
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill !== false}
        style={{ objectFit: 'cover' }}
        priority={p}
        sizes="100vw"
        onError={() => setErrors(prev => new Set([...prev, validPhotos.indexOf(src)]))}
      />
    )
  }

  // ── Grid mode: 2 or 3 photos, no route ──
  if (useGrid) {
    const first  = validPhotos[0]!
    const second = validPhotos[1]!
    const third  = validPhotos[2] ?? null

    return (
      <>
        <div style={{
          position: 'relative', width: '100%',
          aspectRatio: third ? '4/3' : '2/1',
          maxHeight: 360,
          background: 'var(--sea-d)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: third ? '2fr 1fr' : '1fr 1fr',
          gridTemplateRows: third ? '1fr 1fr' : '1fr',
          gap: 2,
        }}>
          {/* Large first photo */}
          <div
            style={{
              position: 'relative',
              gridRow: third ? '1 / 3' : '1',
              cursor: 'zoom-in',
              background: '#000',
            }}
            onClick={() => openLightbox(0)}
          >
            <MediaSlide src={first} alt={locationName ?? 'Foto 1'} priority />
          </div>

          {/* Second photo */}
          <div
            style={{ position: 'relative', cursor: 'zoom-in', background: '#000' }}
            onClick={() => openLightbox(1)}
          >
            <MediaSlide src={second} alt={locationName ?? 'Foto 2'} />
          </div>

          {/* Third photo (if present) */}
          {third && (
            <div
              style={{ position: 'relative', cursor: 'zoom-in', background: '#000' }}
              onClick={() => openLightbox(2)}
            >
              <MediaSlide src={third} alt={locationName ?? 'Foto 3'} />
              {validPhotos.length > 3 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 18, fontWeight: 700,
                }}>
                  +{validPhotos.length - 3}
                </div>
              )}
            </div>
          )}

          {/* Gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,20,35,0.25) 0%, transparent 35%, transparent 65%, rgba(0,20,35,0.5) 100%)', pointerEvents: 'none' }} />
        </div>

        {/* Fullscreen lightbox (shared) */}
        {lightbox && (
          <div
            role="dialog" aria-modal="true"
            onClick={() => setLightbox(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button onClick={() => setLightbox(false)} aria-label="Stäng" className="press-feedback" style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}>✕</button>
            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 900, height: 'min(90vh, 700px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isVideo(validPhotos[lbIdx]!) ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video key={validPhotos[lbIdx]!} src={validPhotos[lbIdx]!} controls playsInline autoPlay style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }} />
              ) : (
                <Image src={validPhotos[lbIdx]!} alt={locationName ?? `Foto ${lbIdx + 1}`} fill style={{ objectFit: 'contain' }} sizes="100vw" />
              )}
            </div>
            {lbIdx > 0 && <button onClick={e => { e.stopPropagation(); setLbIdx(v => v - 1) }} aria-label="Föregående" className="press-feedback" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}>‹</button>}
            {lbIdx < validPhotos.length - 1 && <button onClick={e => { e.stopPropagation(); setLbIdx(v => v + 1) }} aria-label="Nästa" className="press-feedback" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 44, height: 44, borderRadius: '50%', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', WebkitTapHighlightColor: 'transparent' }}>›</button>}
            {validPhotos.length > 1 && <div style={{ position: 'absolute', bottom: 24, fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{lbIdx + 1} / {validPhotos.length}</div>}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', maxHeight: 360, background: 'var(--sea-d)', overflow: 'hidden' }}>
        {hasPhotos ? (
          <>
            {/* Scroll container */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              style={{
                display: 'flex',
                width: '100%', height: '100%',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              } as React.CSSProperties}
            >
              {validPhotos.map((src, i) => (
                <div
                  key={src}
                  style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '100%', height: '100%',
                    scrollSnapAlign: 'start',
                    cursor: 'zoom-in',
                    background: '#000',
                  }}
                  onClick={() => openLightbox(i)}
                >
                  {isVideo(src) ? (
                    <video
                      src={src}
                      muted
                      playsInline
                      autoPlay
                      loop
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={locationName ?? `Foto ${i + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={i === 0}
                      sizes="100vw"
                      onError={() => setErrors(prev => new Set([...prev, i]))}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            {validPhotos.length > 1 && (
              <div style={{
                position: 'absolute', bottom: 52, left: 0, right: 0,
                display: 'flex', justifyContent: 'center', gap: 5,
              }}>
                {validPhotos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`Foto ${i + 1}`}
                    aria-pressed={i === idx}
                    style={{
                      width: i === idx ? 16 : 5,
                      height: 5, borderRadius: 3, padding: 0, border: 'none',
                      background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)',
                      transition: 'width .2s',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Counter badge */}
            {validPhotos.length > 1 && (
              <div style={{
                position: 'absolute', top: 60, right: 16,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(4px)',
                borderRadius: 20, padding: '3px 8px',
                fontSize: 11, fontWeight: 700, color: '#fff',
              }}>
                {idx + 1}/{validPhotos.length}
              </div>
            )}
          </>
        ) : routePoints ? (
          <div style={{ position: 'absolute', inset: 0 }}>
            <RouteMapSVG points={routePoints} w={720} h={540} />
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, opacity: 0.3 }}>⛵</div>
        )}

        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,20,35,0.35) 0%, transparent 40%, transparent 60%, rgba(0,20,35,0.6) 100%)', pointerEvents: 'none' }} />
      </div>

      {/* ── Fullscreen lightbox ── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${lbIdx + 1} av ${validPhotos.length}`}
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            aria-label="Stäng bildvisning"
            className="press-feedback"
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: '#fff', width: 40, height: 40, borderRadius: '50%',
              fontSize: 20, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
          >✕</button>

          {/* Media — image or video */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 900,
              height: 'min(90vh, 700px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {isVideo(validPhotos[lbIdx]!) ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                key={validPhotos[lbIdx]!}
                src={validPhotos[lbIdx]!}
                controls
                playsInline
                autoPlay
                style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }}
              />
            ) : (
              <Image
                src={validPhotos[lbIdx]!}
                alt={locationName ?? `Foto ${lbIdx + 1}`}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
              />
            )}
          </div>

          {/* Prev / Next */}
          {lbIdx > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLbIdx(v => v - 1) }}
              aria-label="Föregående foto"
              className="press-feedback"
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                width: 44, height: 44, borderRadius: '50%', fontSize: 20,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
              }}
            >‹</button>
          )}
          {lbIdx < validPhotos.length - 1 && (
            <button
              onClick={e => { e.stopPropagation(); setLbIdx(v => v + 1) }}
              aria-label="Nästa foto"
              className="press-feedback"
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff',
                width: 44, height: 44, borderRadius: '50%', fontSize: 20,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
              }}
            >›</button>
          )}

          {/* Counter */}
          {validPhotos.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 24,
              fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600,
            }}>
              {lbIdx + 1} / {validPhotos.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
