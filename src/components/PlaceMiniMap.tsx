'use client'
/**
 * PlaceMiniMap — fullbredds mini-karta som visar var platsen ligger.
 *
 * Steg 1 och 2 i bytet av kartsystem (omtaget av /upptack, steg 6, 2026-11-28):
 * MapLibre GL JS med vektorkartor från OpenFreeMap och Svallas egen kartstil i stället för Leaflet med
 * rasterbilder från tile.openstreetmap.org. OpenSeaMaps sjömärken ligger kvar
 * ovanpå. Samma nål som på /upptack (src/lib/kartnal.ts).
 *
 * - 220px höjd på mobil, 280px på desktop
 * - "Vägbeskrivning"-knapp i hörnet
 * - Ingen zoom med mushjulet, så sidan går att skrolla förbi kartan
 *
 * MapLibre laddas först när komponenten visas (dynamisk import).
 */
import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import { SEAMARK_TILE, SEAMARK_ATTR } from '@/lib/map-tiles'
import { track } from '@/lib/analytics-events'
import { pinHtml } from '@/lib/kartnal'
import type { PlatsKategori } from '@/lib/platskategori'

/**
 * Svallas egen kartstil (steg 2): land och vatten i Svallas toner, dämpade
 * vägar och etiketter. Bygger på OpenFreeMaps stil positron och hämtar
 * kartbitar, typsnitt och symboler därifrån. Se public/kartstil/svalla.json.
 */
const KARTSTIL = '/kartstil/svalla.json'

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

  useEffect(() => {
    let cancelled = false
    let map: import('maplibre-gl').Map | null = null

    ;(async () => {
      const maplibregl = (await import('maplibre-gl')).default
      if (cancelled || !mapDivRef.current) return

      map = new maplibregl.Map({
        container: mapDivRef.current,
        style: KARTSTIL,
        center: [lng, lat],
        zoom: 12.5,
        scrollZoom: false,             // tillåt scroll på sidan, inte zoom
        dragRotate: false,
        pitchWithRotate: false,
        attributionControl: false,
      })
      // Källhänvisningen nere till vänster, så att den inte hamnar under
      // knappen Vägbeskrivning nere till höger.
      map.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: SEAMARK_ATTR }), 'bottom-left')
      map.touchZoomRotate.disableRotation()

      map.on('load', () => {
        if (!map) return
        // Sjökortsmärken-overlay, samma som förut
        map.addSource('sjomarken', { type: 'raster', tiles: [SEAMARK_TILE], tileSize: 256, maxzoom: 18 })
        map.addLayer({ id: 'sjomarken', type: 'raster', source: 'sjomarken', paint: { 'raster-opacity': 0.85 } })
      })

      // Nålen: samma SVG som på Utforska. Spetsen sitter längst ned i mitten.
      // revision 2026-10-02: nålen gör inget när man klickar, så den får ingen knapproll.
      const el = document.createElement('div')
      el.innerHTML = pinHtml(kategori)
      el.setAttribute('aria-hidden', 'true')
      new maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, 1] })
        .setLngLat([lng, lat])
        .addTo(map)
      // MapLibre gör nålen till en fokuserbar knapp med namnet "Map marker".
      // Den gör inget vid klick, så knapprollen tas bort (samma som för Leaflet 2026-10-02).
      el.removeAttribute('role')
      el.removeAttribute('tabindex')
      el.removeAttribute('aria-label')

      // Källhänvisningen startar ihopfälld, som en i-knapp.
      map.once('load', () => {
        mapDivRef.current?.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show')
      })
    })()

    return () => {
      cancelled = true
      map?.remove()
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
          background: #aad3df;
        }
        @media (min-width: 720px) {
          .place-mini-map { height: 280px; }
        }
        .place-mini-map .maplibregl-ctrl-attrib { font-size: 10px; }
        .place-mini-map .maplibregl-map { font-family: inherit; }
      `}</style>
    </div>
  )
}
