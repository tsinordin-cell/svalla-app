'use client'
/**
 * PlaceMiniMap — fullbredds mini-karta som visar var platsen ligger.
 *
 * - Leaflet med OpenStreetMap baslager + OpenSeaMap (sjökortsmärken) ovanpå
 * - Samma nål som på /upptack (src/lib/kartnal.ts), centrerad på platsen
 * - 220px höjd på mobil, 280px på desktop
 * - Klick på pin öppnar plats i Google Maps (eller Apple Maps på iOS)
 * - "Vägbeskrivning"-knapp i hörnet — direkt till Google Maps directions
 * - Stänger ner zoom-kontroller på mobil för rent intryck
 *
 * Lazy-load Leaflet via dynamic import (ssr:false) — samma mönster som
 * UpptackExplorer.
 */
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'
import { track } from '@/lib/analytics-events'
import { pinHtml, PIN_SIZE, PIN_ANCHOR } from '@/lib/kartnal'
import type { PlatsKategori } from '@/lib/platskategori'

interface Props {
  lat: number
  lng: number
  name: string
  /** Platsens kategori, samma indelning som på Utforska. Avgör nålens form, färg och ikon. */
  kategori: PlatsKategori
  /** Plats-id för analytics (track 'directions_clicked'). */
  placeId?: string
}

export default function PlaceMiniMap({ lat, lng, name, kategori, placeId }: Props) {
  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)

  useEffect(() => {
    let cancelled = false
    let map: { remove: () => void } | null = null

    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled || !mapDivRef.current) return

      const { url, attr } = baseTile()

      map = L.map(mapDivRef.current, {
        center: [lat, lng],
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false,            // tillåt scroll på sidan, inte zoom
        attributionControl: true,
        dragging: true,
      }) as unknown as { remove: () => void }

      L.tileLayer(url, { attribution: attr, maxZoom: 19 }).addTo(map as never)
      // Sjökortsmärken-overlay
      L.tileLayer(SEAMARK_TILE, { maxZoom: 18, opacity: 0.85, attribution: '' }).addTo(map as never)

      // Custom pin
      const icon = L.divIcon({
        html: pinHtml(kategori),
        className: 'place-mini-pin',
        iconSize: PIN_SIZE,
        iconAnchor: PIN_ANCHOR,
      })
      // revision 2026-10-02: nålen gör inget när man klickar på den, men Leaflet
      // gjorde den ändå till en fokuserbar knapp utan namn (axe aria-command-name).
      // keyboard: false tar bort knapprollen och tabbstoppet; musen påverkas inte.
      L.marker([lat, lng], { icon, keyboard: false }).addTo(map as never)

      mapRef.current = map

      // Belt-and-suspenders: efter mount kan containern ha haft 0px höjd för
      // en kort stund (CSS som laddats parallellt, Suspense-boundary, etc.).
      // invalidateSize() tvingar Leaflet att läsa om containerns dimensioner
      // och rendera tiles i rätt rutnät.
      setTimeout(() => {
        try { (map as unknown as { invalidateSize: () => void })?.invalidateSize() } catch {}
      }, 80)
      setTimeout(() => {
        try { (map as unknown as { invalidateSize: () => void })?.invalidateSize() } catch {}
      }, 400)
    })()

    return () => {
      cancelled = true
      map?.remove?.()
      mapRef.current = null
    }
  }, [lat, lng, kategori])

  // URLs för riktnings-knappar
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const directionsUrl = isIOS
    ? `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(name)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_name=${encodeURIComponent(name)}`

  return (
    <div style={{
      position: 'relative',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 14,
      boxShadow: '0 2px 12px rgba(0, 30, 45, 0.10)',
      border: '1px solid rgba(10, 123, 140, 0.10)',
    }}>
      <div ref={mapDivRef} className="place-mini-map" />

      {/* Vägbeskrivning-knapp */}
      <a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => { if (placeId) track('directions_clicked', { place_id: placeId }) }}
        style={{
          position: 'absolute',
          right: 12, bottom: 12,
          background: 'var(--white, #fff)',
          color: 'var(--sea, #1e5c82)',
          textDecoration: 'none',
          padding: '10px 14px',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 700,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 4px 14px rgba(0, 30, 45, 0.22)',
          border: '1px solid rgba(10, 123, 140, 0.10)',
          zIndex: 500,
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth={2.4}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="3 11 22 2 13 21 11 13 3 11"/>
        </svg>
        Vägbeskrivning
      </a>

      <style>{`
        .place-mini-map {
          width: 100%;
          height: 220px;
          background: #cfdde2;
        }
        @media (min-width: 720px) {
          .place-mini-map { height: 280px; }
        }
        /* Stäng av Leaflet's bilder för pin-icon (vi använder SVG via divIcon) */
        .leaflet-marker-icon.place-mini-pin { background: transparent; border: none; }
        .leaflet-container { font-family: inherit; }
        .leaflet-control-attribution {
          background: rgba(255,255,255,0.78) !important;
          font-size: 10px;
          padding: 1px 5px;
        }
      `}</style>
    </div>
  )
}
