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

  return (
    <>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', maxHeight: 360, background: '#0b2d42', overflow: 'hidden' }}>
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
                  }}
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={src}
                    alt={locationName ?? `Foto ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                    sizes="100vw"
                    onError={() => setErrors(prev => new Set([...prev, i]))}
                  />
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
                  <div
                    key={i}
                    onClick={() => scrollTo(i)}
                    style={{
                      width: i === idx ? 16 : 5,
                      height: 5, borderRadius: 3,
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
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.15)', border: 'none',
              color: '#fff', width: 40, height: 40, borderRadius: '50%',
              fontSize: 20, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label="Stäng"
          >✕</button>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 900,
              height: 'min(90vh, 700px)',
            }}
          >
            <Image
              src={validPhotos[lbIdx]}
              alt={locationName ?? `Foto ${lbIdx + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
            />
          </div>

          {/* Prev / Next */}
          {lbIdx > 0 && (
            <button
              onClick={e => { e.stopPropagation(); setLbIdx(v => v - 1) }}
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
