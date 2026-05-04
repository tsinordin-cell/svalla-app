'use client'
/**
 * LoppisListingLightbox — fullskärms-popup för annonsbilder.
 *
 * Klick på en bild i galleriet → öppnar denna lightbox med:
 * - Bilden i full storlek (object-fit: contain, mörk bakgrund)
 * - Vänster/höger-pilar + tangenter ←/→
 * - Esc stänger
 * - Klick utanför bilden stänger
 * - Mobil: scroll-snap för att swajpa mellan bilder
 * - Counter "3 / 7" + miniatyrer i botten (desktop)
 */
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  /** Index på bilden som är öppen. -1 = stängd. */
  openIndex: number
  alt: string
  onClose: () => void
  onIndexChange: (idx: number) => void
}

export default function LoppisListingLightbox({
  images, openIndex, alt, onClose, onIndexChange,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [activeIdx, setActiveIdx] = useState(openIndex)

  // Synka inkommande openIndex → activeIdx + scrolla till rätt bild
  useEffect(() => {
    if (openIndex >= 0) {
      setActiveIdx(openIndex)
      requestAnimationFrame(() => {
        const el = scrollerRef.current
        if (el) el.scrollLeft = openIndex * el.clientWidth
      })
    }
  }, [openIndex])

  // Tangentbordsnav
  useEffect(() => {
    if (openIndex < 0) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowLeft') jumpTo(Math.max(0, activeIdx - 1))
      if (e.key === 'ArrowRight') jumpTo(Math.min(images.length - 1, activeIdx + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex, activeIdx, images.length])

  // Spåra scroll-position
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    let raf = 0
    function onScroll() {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!el) return
        const idx = Math.round(el.scrollLeft / el.clientWidth)
        const clamped = Math.max(0, Math.min(images.length - 1, idx))
        if (clamped !== activeIdx) {
          setActiveIdx(clamped)
          onIndexChange(clamped)
        }
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [activeIdx, images.length, onIndexChange])

  // Lås body-scroll när öppen
  useEffect(() => {
    if (openIndex < 0) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [openIndex])

  function jumpTo(i: number) {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  if (openIndex < 0 || images.length === 0) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bild ${activeIdx + 1} av ${images.length}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed', inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.94)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top bar — counter + close */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 18px',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{
          color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500,
          padding: '6px 12px', borderRadius: 14,
          background: 'rgba(255,255,255,0.10)',
          backdropFilter: 'blur(8px)',
        }}>
          {activeIdx + 1} / {images.length}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Stäng"
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            color: '#fff',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Bilder */}
      <div
        ref={scrollerRef}
        style={{
          flex: 1, minHeight: 0,
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{
              flex: '0 0 100%',
              scrollSnapAlign: 'center',
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '0 8px',
            }}
          >
            <Image
              src={src}
              alt={`${alt} — bild ${i + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              priority={i === activeIdx}
            />
          </div>
        ))}
      </div>

      {/* Pilar (desktop) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => jumpTo(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            aria-label="Föregående bild"
            style={{
              position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', color: '#fff',
              border: 'none', cursor: activeIdx === 0 ? 'default' : 'pointer',
              opacity: activeIdx === 0 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => jumpTo(Math.min(images.length - 1, activeIdx + 1))}
            disabled={activeIdx === images.length - 1}
            aria-label="Nästa bild"
            style={{
              position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
              width: 48, height: 48, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', color: '#fff',
              border: 'none', cursor: activeIdx === images.length - 1 ? 'default' : 'pointer',
              opacity: activeIdx === images.length - 1 ? 0.3 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              zIndex: 2,
            }}
          >
            <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Miniatyrer */}
      {images.length > 1 && (
        <div style={{
          padding: '12px 18px 18px',
          display: 'flex', justifyContent: 'center', gap: 6,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Gå till bild ${i + 1}`}
              style={{
                position: 'relative',
                flex: '0 0 auto',
                width: 56, height: 42,
                borderRadius: 6, overflow: 'hidden',
                border: i === activeIdx ? '2px solid #fff' : '2px solid rgba(255,255,255,0.18)',
                padding: 0, cursor: 'pointer',
                opacity: i === activeIdx ? 1 : 0.55,
                background: '#000',
                transition: 'opacity 0.12s, border-color 0.12s',
              }}
            >
              <Image src={src} alt="" fill sizes="60px" style={{ objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
