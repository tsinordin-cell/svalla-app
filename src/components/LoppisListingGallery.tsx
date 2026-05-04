'use client'
/**
 * LoppisListingGallery — swipeable image gallery för Loppis-annonser.
 *
 * Mobile: scroll-snap horisontellt, dots underst.
 * Desktop: större hero + thumbnail-rad.
 * Klick på en bild → öppnar fullskärms-lightbox.
 *
 * Design:
 *  - 4:3 aspect ratio (Blocket-konvention)
 *  - Säljes-badge top-left
 *  - Status-chip top-right om reserverad/såld
 *  - Counter "1 / 5" bottom-right
 */
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import LoppisListingLightbox from './LoppisListingLightbox'

type Status = 'aktiv' | 'reserverad' | 'sald'

interface Props {
  images: string[]
  alt: string
  status?: Status
}

export default function LoppisListingGallery({ images, alt, status = 'aktiv' }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState(-1)
  const safeImages = images.length > 0 ? images : []

  // Spåra vilken bild som är synlig via scroll-position
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let raf = 0
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!el) return
        const idx = Math.round(el.scrollLeft / el.clientWidth)
        setActiveIdx(Math.max(0, Math.min(safeImages.length - 1, idx)))
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [safeImages.length])

  function jumpTo(i: number) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  if (safeImages.length === 0) {
    return (
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        background: 'linear-gradient(135deg, rgba(10,123,140,0.08), rgba(201,110,42,0.06))',
        borderRadius: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--txt3)', fontSize: 14,
      }}>
        Ingen bild
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 14, overflow: 'hidden', background: '#0a1e2c' }}>
      {/* Scroll-snap track */}
      <div
        ref={scrollerRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {safeImages.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setLightboxIdx(i)}
            aria-label={`Visa bild ${i + 1} i fullskärm`}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'start',
              position: 'relative',
              aspectRatio: '4 / 3',
              background: '#0a1e2c',
              border: 'none',
              padding: 0,
              cursor: 'zoom-in',
            }}
          >
            <Image
              src={src}
              alt={`${alt} — bild ${i + 1}`}
              fill
              sizes="(max-width: 760px) 100vw, 720px"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
          </button>
        ))}
      </div>

      {/* Säljes-badge top-left */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        background: 'var(--acc, #c96e2a)', color: '#fff',
        padding: '5px 11px', borderRadius: 20,
        fontSize: 11, fontWeight: 800, letterSpacing: '0.6px',
        textTransform: 'uppercase',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
      }}>
        Säljes
      </div>

      {/* Status-chip top-right (bara om reserverad/såld) */}
      {status !== 'aktiv' && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: status === 'sald' ? 'rgba(0,0,0,0.78)' : 'rgba(40,40,40,0.72)',
          color: '#fff',
          padding: '5px 11px', borderRadius: 20,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.5px',
          textTransform: 'uppercase',
          backdropFilter: 'blur(8px)',
        }}>
          {status === 'sald' ? 'Såld' : 'Reserverad'}
        </div>
      )}

      {/* Counter bottom-right */}
      {safeImages.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,0.55)', color: '#fff',
          padding: '4px 10px', borderRadius: 14,
          fontSize: 12, fontWeight: 600,
          backdropFilter: 'blur(6px)',
        }}>
          {activeIdx + 1} / {safeImages.length}
        </div>
      )}

      {/* Dots */}
      {safeImages.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 6,
        }}>
          {safeImages.map((_, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              aria-label={`Gå till bild ${i + 1}`}
              style={{
                width: i === activeIdx ? 22 : 7,
                height: 7,
                borderRadius: 4,
                background: i === activeIdx ? '#fff' : 'rgba(255,255,255,0.55)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.2s',
              }}
            />
          ))}
        </div>
      )}

      {/* Fullskärms-lightbox när användaren klickar på en bild */}
      <LoppisListingLightbox
        images={safeImages}
        openIndex={lightboxIdx}
        alt={alt}
        onClose={() => setLightboxIdx(-1)}
        onIndexChange={(i) => {
          // Synka huvudgalleriet med lightboxens position så det matchar när man stänger
          const el = scrollerRef.current
          if (el) el.scrollLeft = i * el.clientWidth
        }}
      />
    </div>
  )
}
