'use client'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'
import { splitAtAnomalies } from '@/lib/routeSmooth'

/**
 * Helskärmskarta för rutten i ett turkort (Tom 2026-11-24: "trycker man upp
 * någons rutt så ser det fortfarande konstigt ut").
 *
 * Före: en liten ruta med en stillbild av kartan som inte fyllde rutan (mörk remsa
 * i kanten) och inte gick att röra.
 * Nu: en riktig karta över hela skärmen som går att dra och zooma, med samma
 * över- och nederkant som bildvisaren (TurBildvisare) och en väg vidare till turen.
 *
 * Laddas med dynamic() från turkortet, så Leaflet hamnar aldrig i flödets första paket.
 * Ritas i en portal på document.body (turkortet har transform, se TurBildvisare).
 */
export default function TurKartvisare({
  punkter, onStang, namn, rad, tal, turHref,
}: {
  punkter: { lat: number; lng: number }[]
  onStang: () => void
  /** Vem som loggat turen. */
  namn: string
  /** Rad under namnet, t.ex. "16 nov. · Fjäderholmarna". */
  rad?: string | null
  /** Korta tal, t.ex. ["3,5 NM", "36 min"]. */
  tal?: string[]
  /** Länk till tursidan. */
  turHref: string
}) {
  const kartRef = useRef<HTMLDivElement>(null)
  const [klar, setKlar] = useState(false)

  // Lås sidans skroll bakom kartan, Esc stänger.
  useEffect(() => {
    const forr = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onStang() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = forr; window.removeEventListener('keydown', onKey) }
  }, [onStang])

  useEffect(() => {
    const el = kartRef.current
    if (!el || punkter.length < 2) return
    let karta: LeafletMap | null = null
    let avbruten = false

    ;(async () => {
      const L = (await import('leaflet')).default
      if (avbruten) return

      karta = L.map(el, { zoomControl: false, attributionControl: false, zoomSnap: 0.25 })
      L.tileLayer(baseTile().url, { maxZoom: 18 }).addTo(karta)
      L.tileLayer(SEAMARK_TILE, { maxZoom: 18, opacity: 0.9 }).addTo(karta)

      // Samma linje som i turkortet: orange, bruten där spåret har ett hopp.
      for (const del of splitAtAnomalies(punkter)) {
        if (del.length < 2) continue
        const ll = del.map(p => [p.lat, p.lng] as [number, number])
        L.polyline(ll, { color: '#ffffff', weight: 8, opacity: 0.9, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(karta)
        L.polyline(ll, { color: '#e8520a', weight: 4.5, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(karta)
      }

      const prick = (farg: string, px: number) => L.divIcon({
        html: `<div style="width:${px}px;height:${px}px;border-radius:50%;background:${farg};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35)"></div>`,
        iconSize: [px, px], iconAnchor: [px / 2, px / 2], className: '',
      })
      const forsta = punkter[0]!, sista = punkter[punkter.length - 1]!
      L.marker([forsta.lat, forsta.lng], { icon: prick('#22c55e', 16), keyboard: false })
        .bindTooltip('Start', { direction: 'top', offset: [0, -8] }).addTo(karta)
      L.marker([sista.lat, sista.lng], { icon: prick('#e8520a', 18), keyboard: false })
        .bindTooltip('Slut', { direction: 'top', offset: [0, -9] }).addTo(karta)

      // Rutten ska hamna i den fria ytan mellan överkantens knapp och nederkantens text.
      karta.fitBounds(
        L.latLngBounds(punkter.map(p => [p.lat, p.lng] as [number, number])),
        { paddingTopLeft: [36, 96], paddingBottomRight: [36, 210], maxZoom: 16, animate: false },
      )
      setKlar(true)
    })().catch(console.error)

    return () => { avbruten = true; karta?.remove(); karta = null }
  }, [punkter])

  if (typeof document === 'undefined') return null

  const glas: React.CSSProperties = {
    background: 'rgba(12,22,32,0.62)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,255,255,0.16)', color: '#fff',
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Karta över ${namn}s tur`}
      className="tkv"
      // Klick i en portal bubblar upp genom React-trädet till turkortet, som då öppnar
      // tursidan (uppmätt 2026-11-24 i bildvisaren). Alla klick stannar här.
      onClick={e => e.stopPropagation()}
      style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'var(--map-preview-bg, #0c1620)', overflow: 'hidden' }}
    >
      <style>{`
        @keyframes tkvIn { from { opacity: 0 } to { opacity: 1 } }
        .tkv { animation: tkvIn 0.2s ease; }
        .tkv-karta { transition: opacity 0.25s ease; }
        .tkv .leaflet-container { background: transparent; font-family: inherit; }
        /* Mörkt tema: samma mörka karta som i turkortet (.route-map-tile i globals.css). */
        [data-theme="dark"] .tkv .leaflet-tile-pane { filter: invert(1) hue-rotate(180deg); }
        @media (prefers-reduced-motion: reduce) { .tkv { animation: none; } .tkv-karta { transition: none; } }
      `}</style>

      <div ref={kartRef} className="tkv-karta" style={{ position: 'absolute', inset: 0, opacity: klar ? 1 : 0 }} />

      {/* Överkant: stäng */}
      <div style={{
        position: 'absolute', right: 0, top: 0, zIndex: 1000,
        padding: 'calc(env(safe-area-inset-top, 0px) + 12px) 14px 0',
      }}>
        <button
          type="button"
          onClick={onStang}
          aria-label="Stäng kartan"
          style={{
            ...glas, width: 44, height: 44, borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" style={{ width: 18, height: 18 }} aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Nederkant: vem, var, när, tal och vägen vidare. Släpper igenom drag till kartan. */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 1000, pointerEvents: 'none',
        padding: '64px 20px calc(env(safe-area-inset-bottom, 0px) + 18px)',
        background: 'linear-gradient(0deg, rgba(5,11,18,0.94) 0%, rgba(5,11,18,0.8) 55%, rgba(5,11,18,0) 100%)',
        color: '#fff',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{namn}</div>
            {rad && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rad}</div>}
          </div>
          {tal && tal.length > 0 && (
            <div style={{ flexShrink: 0, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.92)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
              {tal.join(' · ')}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 14 }}>
          <Link
            href={turHref}
            style={{
              pointerEvents: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6,
              minHeight: 44, padding: '0 18px', borderRadius: 22,
              background: '#fff', color: '#0c1620', fontSize: 14, fontWeight: 700, textDecoration: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Visa hela turen
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }} aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
          <span style={{ pointerEvents: 'auto', fontSize: 10, color: 'rgba(255,255,255,0.6)', textAlign: 'right', lineHeight: 1.4 }}>
            © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>OpenStreetMap</a>
            {' · '}
            <a href="https://www.openseamap.org" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>OpenSeaMap</a>
          </span>
        </div>
      </div>
    </div>,
    document.body,
  )
}
