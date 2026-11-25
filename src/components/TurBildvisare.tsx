'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Helskärmsvisare för bilderna i ett turkort (Tom 2026-11-24: "bilden skalas av ...
 * det ska vara premium").
 *
 * Före: en liten ruta mitt på skärmen med svarta fält, där breda bilder klipptes i kanterna.
 * Nu:
 *  - Hela bilden visas alltid oklippt (object-fit: contain), så stor skärmen tillåter.
 *  - Bakom ligger samma bild, suddig och mörk, i stället för svarta fält.
 *  - Vem, var och när står nederst, med distans och tid om de finns.
 *  - Svep i sidled mellan bilder, dra nedåt eller tryck utanför bilden för att stänga,
 *    tryck på bilden för att dölja texten, nyp för att zooma (webbläsarens egen zoom).
 *    Esc och piltangenter fungerar på dator.
 *
 * Ritas i en portal på document.body: turkortet har transform, och position: fixed
 * inuti ett element med transform hamnar inuti kortet (bde5b83f, 2026-11-07).
 */
export default function TurBildvisare({
  bilder, start, onByt, onStang, namn, rad, tal, text,
}: {
  bilder: string[]
  start: number
  onByt?: (i: number) => void
  onStang: () => void
  /** Vem som loggat turen. */
  namn: string
  /** Rad under namnet, t.ex. "16 nov. · Fjäderholmarna". */
  rad?: string | null
  /** Korta tal, t.ex. ["3,5 NM", "36 min"]. */
  tal?: string[]
  /** Turens text, visas på högst två rader. */
  text?: string | null
}) {
  const [i, setI] = useState(Math.min(Math.max(start, 0), Math.max(bilder.length - 1, 0)))
  const [ren, setRen] = useState(false)          // true = bara bilden, texten dold
  const [drag, setDrag] = useState(0)            // px nedåt medan man drar
  const skroll = useRef<HTMLDivElement>(null)
  const tryck = useRef<{ x: number; y: number; riktning: 'x' | 'y' | null } | null>(null)

  // Lås sidans skroll bakom visaren, Esc stänger, pilar byter bild.
  useEffect(() => {
    const forr = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onStang()
      const el = skroll.current
      if (!el) return
      if (e.key === 'ArrowRight') el.scrollBy({ left: el.clientWidth, behavior: 'smooth' })
      if (e.key === 'ArrowLeft') el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' })
    }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = forr; window.removeEventListener('keydown', onKey) }
  }, [onStang])

  // Börja på bilden man tryckte på.
  useEffect(() => {
    const el = skroll.current
    if (el) el.scrollLeft = i * el.clientWidth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (typeof document === 'undefined' || bilder.length === 0) return null

  const slapp = () => {
    const t = tryck.current
    tryck.current = null
    if (t?.riktning === 'y' && drag > 90) { onStang(); return }
    setDrag(0)
  }
  const tona = Math.max(0, 1 - drag / 320)

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Bild ${i + 1} av ${bilder.length} från ${namn}s tur`}
      className="tbv"
      style={{ position: 'fixed', inset: 0, zIndex: 2000, background: `rgba(5,11,18,${0.96 * tona})`, overflow: 'hidden', touchAction: 'pinch-zoom' }}
      onTouchStart={e => {
        // Två fingrar = nyp för att zooma (webbläsarens egen zoom). Då ska inget dras.
        if (e.touches.length > 1) { tryck.current = null; setDrag(0); return }
        const p = e.touches[0]!; tryck.current = { x: p.clientX, y: p.clientY, riktning: null }
      }}
      onTouchMove={e => {
        const t = tryck.current; if (!t) return
        if (e.touches.length > 1) { tryck.current = null; setDrag(0); return }
        const p = e.touches[0]!; const dx = p.clientX - t.x, dy = p.clientY - t.y
        if (!t.riktning && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) t.riktning = Math.abs(dy) > Math.abs(dx) ? 'y' : 'x'
        if (t.riktning === 'y') setDrag(Math.max(0, dy))
      }}
      onTouchEnd={slapp}
      onTouchCancel={slapp}
    >
      <style>{`
        @keyframes tbvIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes tbvBild { from { opacity: 0; transform: scale(0.965) } to { opacity: 1; transform: scale(1) } }
        .tbv { animation: tbvIn 0.2s ease; }
        .tbv-skroll { scrollbar-width: none; -ms-overflow-style: none; }
        .tbv-skroll::-webkit-scrollbar { display: none; }
        .tbv-bild { animation: tbvBild 0.28s cubic-bezier(0.16, 1, 0.3, 1); }
        .tbv-krom { transition: opacity 0.2s ease; }
        @media (prefers-reduced-motion: reduce) { .tbv, .tbv-bild { animation: none; } .tbv-krom { transition: none; } }
      `}</style>

      {/* Samma bild, suddig och mörk, som bakgrund i stället för svarta fält. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bilder[i]}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute', inset: -48, width: 'calc(100% + 96px)', height: 'calc(100% + 96px)',
          objectFit: 'cover', filter: 'blur(36px) saturate(1.25) brightness(0.42)',
          opacity: tona, pointerEvents: 'none',
        }}
      />

      {/* Bilderna. Tryck utanför bilden stänger, tryck på bilden döljer eller visar texten. */}
      <div
        ref={skroll}
        className="tbv-skroll"
        onScroll={e => {
          const el = e.currentTarget
          const ny = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1))
          if (ny !== i && ny >= 0 && ny < bilder.length) { setI(ny); onByt?.(ny) }
        }}
        style={{
          position: 'absolute', inset: 0, display: 'flex',
          overflowX: 'auto', overflowY: 'hidden', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch', touchAction: 'pan-x pinch-zoom',
          transform: `translateY(${drag}px) scale(${1 - Math.min(drag, 320) / 2400})`,
          transition: tryck.current ? 'none' : 'transform 0.22s ease',
        }}
      >
        {bilder.map((src, n) => (
          <div
            key={src + n}
            onClick={onStang}
            style={{
              flex: '0 0 100%', width: '100%', height: '100%', scrollSnapAlign: 'center',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="tbv-bild"
              src={src}
              alt={`Bild ${n + 1} från ${namn}s tur`}
              onClick={e => { e.stopPropagation(); setRen(r => !r) }}
              draggable={false}
              style={{
                display: 'block', maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto',
                objectFit: 'contain', userSelect: 'none', WebkitUserSelect: 'none',
                boxShadow: '0 18px 60px rgba(0,0,0,0.45)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Överkant: räknare och stäng */}
      <div className="tbv-krom" style={{
        position: 'absolute', left: 0, right: 0, top: 0, opacity: ren ? 0 : tona, pointerEvents: ren ? 'none' : 'auto',
        padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 14px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(180deg, rgba(5,11,18,0.55) 0%, rgba(5,11,18,0) 100%)',
      }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.86)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em', minWidth: 44 }}>
          {bilder.length > 1 ? `${i + 1} / ${bilder.length}` : ''}
        </span>
        <button
          type="button"
          onClick={onStang}
          aria-label="Stäng bilden"
          style={{
            width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(12,22,32,0.5)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" style={{ width: 18, height: 18 }} aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Nederkant: vem, var, när, och prickar när det finns flera bilder */}
      <div className="tbv-krom" style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, opacity: ren ? 0 : tona, pointerEvents: 'none',
        padding: '56px 20px calc(env(safe-area-inset-bottom, 0px) + 22px)',
        background: 'linear-gradient(0deg, rgba(5,11,18,0.78) 0%, rgba(5,11,18,0.42) 55%, rgba(5,11,18,0) 100%)',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{namn}</div>
            {rad && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.74)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rad}</div>}
          </div>
          {tal && tal.length > 0 && (
            <div style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
              {tal.join(' · ')}
            </div>
          )}
        </div>
        {text && (
          <p style={{
            margin: '8px 0 0', fontSize: 14, lineHeight: 1.45, color: 'rgba(255,255,255,0.86)',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{text}</p>
        )}
        {bilder.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 14 }} aria-hidden="true">
            {bilder.map((_, n) => (
              <span key={n} style={{
                height: 5, width: n === i ? 18 : 5, borderRadius: 3,
                background: n === i ? '#fff' : 'rgba(255,255,255,0.36)', transition: 'width 0.2s ease',
              }} />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
