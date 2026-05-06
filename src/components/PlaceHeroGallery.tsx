'use client'
/**
 * PlaceHeroGallery — bred carousel-hero likt thatsup.se.
 *
 * - Visar 2-3 bilder samtidigt på desktop, ~1 på mobile
 * - Native scroll-snap för smooth swipe (mouse wheel + touch fungerar utan JS)
 * - Pilar för pek-och-klick navigation (scrollar 1 bild i taget)
 * - Pilar göms när vi nått första/sista bilden
 * - Ingen border-radius på bilderna — sömlös rad
 *
 * Tar emot färdiga URLs (Google-proxy eller direktlänk) — komponenten
 * vet ingenting om var bilderna kommer ifrån.
 */
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  photos: string[]
  alt: string                       // Plats-namnet, för aria/alt
}

export default function PlaceHeroGallery({ photos, alt }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // ── Beräkna om vi kan scrolla mer åt något håll ──
  function updateArrowVisibility() {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrowVisibility()
    el.addEventListener('scroll', updateArrowVisibility, { passive: true })
    window.addEventListener('resize', updateArrowVisibility)
    return () => {
      el.removeEventListener('scroll', updateArrowVisibility)
      window.removeEventListener('resize', updateArrowVisibility)
    }
  }, [photos.length])

  // ── Scroll-knappar: hoppa en bild i taget ──
  function scrollByOne(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    // Räkna ut bredd på en "card" (första barnets bredd + gap)
    const firstCard = el.querySelector<HTMLDivElement>('[data-card]')
    const step = firstCard ? firstCard.offsetWidth : el.clientWidth * 0.6
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  if (!photos || photos.length === 0) {
    // Tom-state — diskret bakgrund, inget mer
    return (
      <div style={{
        width: '100%', height: 320,
        background: 'linear-gradient(180deg, var(--sea-l, #d8e9f0) 0%, var(--bg) 100%)',
      }} />
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', background: 'var(--bg)' }}>
      {/* Carousel-scroller */}
      <div
        ref={scrollerRef}
        className="phg-scroller"
        style={{
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          // Göm scrollbar
          scrollbarWidth: 'none',
        }}
      >
        {photos.map((src, i) => (
          <div
            key={src + i}
            data-card
            style={{
              position: 'relative',
              flex: '0 0 auto',
              width: 'var(--phg-card-w)',
              height: 'var(--phg-card-h)',
              scrollSnapAlign: photos.length > 1 ? 'start' : 'center',
              background: 'var(--sea-l)',
              overflow: 'hidden',
            }}
          >
            <Image
              src={src}
              alt={`${alt} bild ${i + 1}`}
              fill
              sizes="(max-width: 720px) 90vw, 33vw"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
              unoptimized={src.startsWith('/api/places/photo/')}
            />
          </div>
        ))}
      </div>

      {/* Pilar — bara om vi har flera bilder att scrolla till */}
      {photos.length > 1 && canPrev && (
        <button
          type="button"
          aria-label="Föregående bild"
          onClick={() => scrollByOne(-1)}
          className="phg-arrow phg-arrow--left"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
            stroke="var(--txt)" strokeWidth={2.4}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}
      {photos.length > 1 && canNext && (
        <button
          type="button"
          aria-label="Nästa bild"
          onClick={() => scrollByOne(1)}
          className="phg-arrow phg-arrow--right"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
            stroke="var(--txt)" strokeWidth={2.4}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* Räknare nere till höger på första bilden */}
      {photos.length > 1 && (
        <div style={{
          position: 'absolute',
          right: 14, bottom: 14,
          padding: '6px 12px',
          borderRadius: 999,
          background: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.02em',
          pointerEvents: 'none',
        }}>
          {photos.length} bilder
        </div>
      )}

      <style>{`
        /* Höjd + bredd som CSS-vars så vi kan justera per breakpoint */
        .phg-scroller {
          --phg-card-w: 88vw;
          --phg-card-h: 280px;
        }
        .phg-scroller::-webkit-scrollbar { display: none; }

        @media (min-width: 720px) {
          .phg-scroller {
            --phg-card-w: 46vw;
            --phg-card-h: 360px;
          }
        }
        @media (min-width: 1100px) {
          .phg-scroller {
            --phg-card-w: 33vw;
            --phg-card-h: 440px;
          }
        }
        @media (min-width: 1500px) {
          .phg-scroller {
            --phg-card-w: 28vw;
            --phg-card-h: 480px;
          }
        }

        .phg-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.95);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,30,45,0.20);
          transition: transform 120ms ease, background 120ms ease;
          z-index: 3;
        }
        .phg-arrow:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.06);
        }
        .phg-arrow--left  { left: 14px; }
        .phg-arrow--right { right: 14px; }

        @media (max-width: 719px) {
          .phg-arrow { width: 38px; height: 38px; }
          .phg-arrow--left  { left: 10px; }
          .phg-arrow--right { right: 10px; }
        }
      `}</style>
    </div>
  )
}
