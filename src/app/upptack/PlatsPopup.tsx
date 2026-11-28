'use client'

import Icon from '@/components/Icon'
import { PIN_META } from '@/lib/kartnal'
import { betygRad, platsOmrade, tiderRad } from '@/lib/platsKort'
import type { PlatsKategori } from '@/lib/platskategori'
import Image from 'next/image'
import Link from 'next/link'

export interface PlatsPopupPlats {
  id: string
  name: string
  slug: string | null
  island: string | null
  archipelago_region: string | null
  image_url: string | null
  type: string | null
  latitude: number
  longitude: number
  google_rating?: number | null
  google_ratings_total?: number | null
  opening_hours?: string | null
}

type Lage =
  | { typ: 'ark' }
  | { typ: 'kort'; x: number; y: number; pil: number }

interface Props {
  plats: PlatsPopupPlats
  kategori: PlatsKategori
  bildTrasig: boolean
  onBildTrasig: () => void
  onStang: () => void
  sparad: boolean
  /** false tills /api/saves har svarat. Knappen är då tyst och avstängd. */
  sparKand: boolean
  sparar: boolean
  onSpara: () => void
  lage: Lage
}

/**
 * Platskort när en nål är vald. På smal skärm ett ark längst ner,
 * annars ett flytande kort ovanför nålen.
 */
export default function PlatsPopup({
  plats, kategori, bildTrasig, onBildTrasig, onStang,
  sparad, sparKand, sparar, onSpara, lage,
}: Props) {
  const farg = PIN_META[kategori].color
  const { etikett, omrade } = platsOmrade(kategori, plats.island, plats.archipelago_region)
  const betyg = betygRad(plats.google_rating, plats.google_ratings_total)
  const tider = tiderRad(plats.opening_hours)
  const bild = !bildTrasig && tryggBild(plats.image_url) ? plats.image_url : null
  const href = `/upptack/${plats.slug || plats.id}`
  const ankarKlass = lage.typ === 'ark'
    ? 'upx-platspop-ankare upx-platspop-ankare--ark'
    : 'upx-platspop-ankare upx-platspop-ankare--kort'

  return (
    <div
      className={ankarKlass}
      style={lage.typ === 'kort' ? { left: lage.x, top: lage.y, ['--pil' as string]: `${lage.pil}px` } : undefined}
    >
      <div
        className="upx-platspop"
        role="dialog"
        aria-modal="false"
        aria-label={plats.name}
        data-plats-popup={lage.typ}
        onMouseDown={e => e.stopPropagation()}
        onClick={e => e.stopPropagation()}
      >
        <button type="button" className="upx-platspop-stang" onClick={onStang} aria-label="Stäng">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="upx-platspop-huvud">
        <div className="upx-platspop-bild">
          {bild ? (
            <Image
              src={bild}
              alt=""
              fill
              sizes="(max-width: 767px) 72px, 260px"
              style={{ objectFit: 'cover' }}
              onError={onBildTrasig}
              unoptimized={bild.startsWith('/api/')}
            />
          ) : (
            <div
              className="upx-platspop-tom"
              style={{
                background: `linear-gradient(rgba(255,253,248,0.84), rgba(255,253,248,0.78)), ${farg}`,
                color: farg,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                dangerouslySetInnerHTML={{ __html: PIN_META[kategori].icon }}
              />
            </div>
          )}
        </div>
        <div className="upx-platspop-text">

        <h2 className="upx-platspop-namn">{plats.name}</h2>
        <div className="upx-platspop-rad">
          <span className="upx-platspop-prick" style={{ background: farg }} aria-hidden />
          <span className="upx-platspop-kat">{etikett}</span>
          {omrade && <span className="upx-platspop-omrade">· {omrade}</span>}
        </div>

        {(betyg || tider) && (
          <div className="upx-platspop-fakta">
            {betyg && (
              <span>
                <Icon name="star" size={13} style={{ color: 'var(--acc, #c96e2a)' }} />
                {betyg}
              </span>
            )}
            {tider && (
              <span title={tider}>
                <Icon name="clock" size={13} style={{ color: 'var(--txt3)' }} />
                <span className="upx-platspop-tid">{tider}</span>
              </span>
            )}
          </div>
        )}
        </div>
        </div>

        <div className="upx-platspop-knappar">
          <button
            type="button"
            className="upx-platspop-spara"
            onClick={onSpara}
            disabled={!sparKand || sparar}
            aria-pressed={sparad}
            aria-busy={!sparKand || sparar}
            aria-label={sparad ? 'Sparad, ta bort' : 'Spara plats'}
          >
            <Icon name="bookmark" size={18} stroke={1.8} style={{ fill: sparad ? 'currentColor' : 'none' }} />
          </button>
          <Link href={href} className="upx-platspop-visa">Visa plats</Link>
        </div>
      </div>
      {lage.typ === 'kort' && <span className="upx-platspop-pil" aria-hidden />}
      <style>{POPUP_CSS}</style>
    </div>
  )
}

function tryggBild(url: string | null): boolean {
  if (!url) return false
  if (url.startsWith('/') && !url.startsWith('//')) return true
  return url.startsWith('https://') || url.startsWith('http://')
}

const POPUP_CSS = `
.upx-platspop-ankare { z-index: 560; pointer-events: none; }
.upx-platspop-ankare--kort {
  position: absolute;
  width: 260px;
}
.upx-platspop-pil {
  position: absolute;
  left: var(--pil);
  bottom: -7px;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  background: var(--white);
  border-right: 1px solid rgba(22, 45, 58, 0.10);
  border-bottom: 1px solid rgba(22, 45, 58, 0.10);
  transform: rotate(45deg);
  z-index: 2;
  pointer-events: none;
}
.upx-platspop-ankare--ark {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--white);
  max-height: min(30dvh, 210px);
}
.upx-platspop {
  /* Specen vill ha Svalla-blå. I ljust läge pekar --sea-knapp om till orange
     så att sajten har en knappfärg. Här gäller den blå som tokenen har från
     början, samma undantag som Logga tur. */
  --sea-knapp: #1e5c82;
  pointer-events: auto;
  position: relative;
  background: var(--white);
  border: 1px solid rgba(22, 45, 58, 0.10);
  border-radius: 18px;
  box-shadow: 0 12px 36px rgba(16, 36, 48, 0.14), 0 2px 6px rgba(16, 36, 48, 0.05);
  padding: 0 0 12px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  color: var(--txt);
  animation: upxPlatsIn 150ms ease-out;
}
.upx-platspop-ankare--ark .upx-platspop {
  border-radius: 18px 18px 0 0;
  border-bottom: none;
  padding: 12px 12px calc(12px + env(safe-area-inset-bottom, 0px));
  max-height: min(30dvh, 210px);
  box-shadow: 0 -8px 28px rgba(16, 36, 48, 0.12);
}
@keyframes upxPlatsIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion: reduce) {
  .upx-platspop { animation: none; }
}
[data-theme="dark"] .upx-platspop { --sea-knapp: #1c7f98; }
.upx-platspop-stang {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(22, 45, 58, 0.10);
  background: rgba(255, 253, 248, 0.94);
  color: var(--txt);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16, 36, 48, 0.12);
}
.upx-platspop-stang:hover { background: #fff; }
.upx-platspop-bild {
  position: relative;
  height: 108px;
  aspect-ratio: 2.4 / 1;
  overflow: hidden;
  background: rgba(10, 123, 140, 0.06);
}
.upx-platspop-tom svg { width: 32px; height: 32px; }
.upx-platspop-tom {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upx-platspop-text { padding: 12px 12px 0; min-width: 0; }
.upx-platspop-namn {
  font-family: var(--font-display), Georgia, serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--txt);
  margin: 0;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.upx-platspop-rad {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 3px 0 0;
  min-width: 0;
  font-size: 13px;
  line-height: 1.3;
  color: var(--txt2);
}
.upx-platspop-prick {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.upx-platspop-kat { font-weight: 600; color: var(--txt); }
.upx-platspop-omrade {
  color: var(--txt2);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}
.upx-platspop-fakta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 1.35;
  color: var(--txt2);
}
.upx-platspop-fakta > span {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  min-width: 0;
}
.upx-platspop-fakta svg { margin-top: 1px; flex-shrink: 0; }
.upx-platspop-tid {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.upx-platspop-knappar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 12px 0;
}
.upx-platspop-spara {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid rgba(22, 45, 58, 0.12);
  background: var(--white);
  color: var(--sea, #1e5c82);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
}
.upx-platspop-spara:hover:not(:disabled) { background: var(--sea-xl, #e8f2fa); }
.upx-platspop-spara[aria-pressed="true"] {
  background: var(--sea-xl, #e8f2fa);
  border-color: var(--sea, #1e5c82);
}
.upx-platspop-spara:disabled { opacity: 0.45; cursor: default; }
.upx-platspop-visa {
  flex: 1;
  height: 38px;
  border-radius: 12px;
  background: var(--sea-knapp, #1e5c82);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.upx-platspop-visa:hover { filter: brightness(1.06); }
.upx-platspop-stang:focus-visible,
.upx-platspop-spara:focus-visible,
.upx-platspop-visa:focus-visible {
  outline: 2px solid var(--sea, #1e5c82);
  outline-offset: 2px;
}
@media (max-width: 767px) {
  .upx-platspop-huvud { display: flex; gap: 10px; align-items: flex-start; }
  .upx-platspop-ankare--ark .upx-platspop-bild {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
    aspect-ratio: auto;
    border-radius: 14px;
  }
  .upx-platspop-ankare--ark .upx-platspop-tom svg { width: 28px; height: 28px; }
  .upx-platspop-ankare--ark .upx-platspop-text { padding: 0 28px 0 0; }
  .upx-platspop-ankare--ark .upx-platspop-namn { -webkit-line-clamp: 1; }
  .upx-platspop-ankare--ark .upx-platspop-tid { -webkit-line-clamp: 1; }
  .upx-platspop-ankare--ark .upx-platspop-knappar { margin: 10px 0 0; }
  .upx-platspop-stang { top: 10px; right: 10px; }
}
`
