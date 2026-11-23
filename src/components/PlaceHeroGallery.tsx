'use client'
/**
 * PlaceHeroGallery — bred carousel-hero likt thatsup.se.
 *
 * - Visar 2-3 bilder samtidigt på desktop, ~1 på mobile
 * - Native scroll-snap för smooth swipe (mouse wheel + touch fungerar utan JS)
 * - Pilar för pek-och-klick navigation (scrollar 1 bild i taget), på dator
 *   bara när musen är över bilderna, på pekskärm inte alls
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

export default function PlaceHeroGallery({ photos: incomingPhotos, alt }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // En bild som inte går att ladda ska ALDRIG lämna en tom ruta efter sig.
  // Bakgrund (2026-08-01): samtliga Google Places-foton slutade fungera
  // (proxyn får 400 från Google), och eftersom galleriet renderade en ruta
  // per URL såg platssidorna ut att ha "6 bilder" där fem var blanka.
  // Nu plockas trasiga URL:er bort ur listan så bildräknaren och pilarna
  // speglar det som faktiskt går att visa.
  const [broken, setBroken] = useState<Set<string>>(new Set())
  const photos = incomingPhotos.filter(p => !broken.has(p))
  function markBroken(src: string) {
    setBroken(prev => {
      if (prev.has(src)) return prev
      const next = new Set(prev)
      next.add(src)
      return next
    })
  }

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
    // Tom-state — visar att ingen bild finns ÄNNU (avsiktligt, inte buggigt).
    // Centrerad pin-ikon + diskret text. Tar samma höjd som hero på mobile.
    return (
      <div style={{
        width: '100%',
        minHeight: 280,
        background: 'linear-gradient(180deg, var(--sea-l, #d8e9f0) 0%, var(--bg) 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '32px 16px',
      }}>
        <svg viewBox="0 0 24 24" width="42" height="42" fill="none"
          stroke="rgba(10, 123, 140, 0.45)" strokeWidth={1.6}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <div style={{
          fontSize: 13,
          color: 'var(--txt3, #6b7280)',
          textAlign: 'center',
          maxWidth: 320,
          lineHeight: 1.4,
        }}>
          Inga bilder ännu. Kom ihåg att lägga till din egen om du har varit här.
        </div>
      </div>
    )
  }

  return (
    <div className="phg" style={{ position: 'relative', width: '100%', background: 'var(--bg)' }}>
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
              // Google-proxyns bilder laddas ivrigt i stallet for lazy. Annars
              // hamtas de forst nar rutan scrollas in, sa onError hinner inte
              // koras och bildraknaren ("6 bilder") star kvar och ljuger tills
              // anvandaren swajpar dit. Max 6 bilder per plats — billigt.
              loading={src.startsWith('/api/places/photo/') ? 'eager' : undefined}
              onError={() => markBroken(src)}
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
          className="bild-knapp phg-arrow phg-arrow--left"
        >
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.4}
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
          className="bild-knapp phg-arrow phg-arrow--right"
        >
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth={2.4}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      )}

      {/* Räknare nere till höger. Liten, och på mobil ovanför infokortet
          (kortet lyfts 28 px upp över bilden och dolde räknaren förut). */}
      {photos.length > 1 && (
        <div className="phg-raknare">
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

        /* Pilarna har samma stil som övriga bildknappar (.bild-knapp).
           På dator syns de bara när musen är över bilderna. På pekskärm
           göms de: där sveper man, och nästa bild sticker fram i kanten. */
        .phg .phg-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          opacity: 0;
        }
        .phg:hover .phg-arrow,
        .phg-arrow:focus-visible { opacity: 1; }
        .phg .phg-arrow--left  { left: 14px; }
        .phg .phg-arrow--right { right: 14px; }
        @media (hover: none) {
          .phg .phg-arrow { display: none; }
        }

        .phg-raknare {
          position: absolute;
          right: 14px; bottom: 14px;
          padding: 3px 9px;
          border-radius: 999px;
          background: rgba(0, 30, 45, 0.52);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.02em;
          pointer-events: none;
        }
        @media (max-width: 719px) {
          .phg-raknare { bottom: 40px; }
        }
      `}</style>
    </div>
  )
}
