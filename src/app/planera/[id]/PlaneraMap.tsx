'use client'
import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { Map as LeafletMap } from 'leaflet'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'

type Stop = {
  lat: number
  lng: number
  name: string
  reason: string
  color: string
  emoji: string
}

type Props = {
  startLat: number
  startLng: number
  startName: string
  endLat: number
  endLng: number
  endName: string
  stops: Stop[]
  /** null = skeleton (route not yet computed); non-null = draw path and refit */
  seaPath: [number, number][] | null
}

export default function PlaneraMap({ startLat, startLng, startName, endLat, endLng, endName, stops, seaPath }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const initializedRef = useRef(false)
  // Refs to current route polylines so they can be replaced when seaPath updates
  const routeLinesRef = useRef<Array<{ remove: () => void }>>([])

  // ── Init map (once) ─────────────────────────────────────────────────────────
  // Fits to start/end bounding box — route lines are added by the seaPath effect.
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return
    initializedRef.current = true

    async function init() {
      const L = (await import('leaflet')).default

      // Initial bounds: straight line start → end. Will be refitted when seaPath arrives.
      const bounds = L.latLngBounds(
        [Math.min(startLat, endLat) - 0.05, Math.min(startLng, endLng) - 0.05],
        [Math.max(startLat, endLat) + 0.05, Math.max(startLng, endLng) + 0.05],
      )

      const map = L.map(containerRef.current!, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: true,
      })
      mapRef.current = map

      const { url: tileUrl, attr: tileAttr } = baseTile()
      L.tileLayer(tileUrl, { maxZoom: 18, attribution: tileAttr }).addTo(map)

      L.tileLayer(SEAMARK_TILE, {
        maxZoom: 18, opacity: 0.85, crossOrigin: '',
      }).addTo(map)

      // ── Start marker — premium pin med teal-gradient ─────────────────────
      // Pin-form (28×36), inre play-symbol, vit ring + djup drop-shadow.
      // Visuellt distinkt från stops så ögat hittar startpunkten direkt.
      const startPinHtml = `<div style="position:relative;width:28px;height:36px;filter:drop-shadow(0 3px 6px rgba(0,45,60,0.35));">
        <svg viewBox="0 0 28 36" width="28" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="svalla-pin-start" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#2bb673"/>
              <stop offset="100%" stop-color="#0e8a52"/>
            </linearGradient>
          </defs>
          <path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 22 14 22s14-12.5 14-22C28 6.27 21.73 0 14 0z"
            fill="url(#svalla-pin-start)" stroke="#fff" stroke-width="2.2"/>
          <circle cx="14" cy="14" r="4.6" fill="#fff"/>
          <polygon points="12.5,11 17,14 12.5,17" fill="#0e8a52"/>
        </svg>
      </div>`
      L.marker([startLat, startLng], {
        icon: L.divIcon({
          html: startPinHtml,
          iconSize: [28, 36], iconAnchor: [14, 36], className: '',
        }),
      }).addTo(map).bindTooltip(`Start · ${startName}`, { direction: 'top', offset: [0, -32] })

      // ── End marker — premium pin med accent-gradient + flag ─────────────
      // Samma pin-grund som start, men accent-orange + checkered flag-symbol.
      const endPinHtml = `<div style="position:relative;width:28px;height:36px;filter:drop-shadow(0 3px 6px rgba(0,45,60,0.35));">
        <svg viewBox="0 0 28 36" width="28" height="36" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="svalla-pin-end" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#d9602a"/>
              <stop offset="100%" stop-color="#a14515"/>
            </linearGradient>
          </defs>
          <path d="M14 0C6.27 0 0 6.27 0 14c0 9.5 14 22 14 22s14-12.5 14-22C28 6.27 21.73 0 14 0z"
            fill="url(#svalla-pin-end)" stroke="#fff" stroke-width="2.2"/>
          <circle cx="14" cy="14" r="4.6" fill="#fff"/>
          <rect x="12" y="11" width="2" height="6" fill="#a14515"/>
          <rect x="14" y="11" width="2" height="2" fill="#a14515"/>
          <rect x="16" y="13" width="2" height="2" fill="#a14515"/>
          <rect x="14" y="15" width="2" height="2" fill="#a14515"/>
        </svg>
      </div>`
      L.marker([endLat, endLng], {
        icon: L.divIcon({
          html: endPinHtml,
          iconSize: [28, 36], iconAnchor: [14, 36], className: '',
        }),
      }).addTo(map).bindTooltip(`Mål · ${endName}`, { direction: 'top', offset: [0, -32] })

      // ── Stop markers — kategorifärgad cirkel med outer ring för "lifted" feel ──
      for (const stop of stops) {
        L.marker([stop.lat, stop.lng], {
          icon: L.divIcon({
            html: `<div style="
              width:34px;height:34px;border-radius:50%;
              background:${stop.color};
              border:2.5px solid #fff;
              display:flex;align-items:center;justify-content:center;
              box-shadow: 0 0 0 1px rgba(0,45,60,0.06), 0 3px 10px rgba(0,45,60,0.22);
              transition: transform 140ms ease;
            ">${stop.emoji}</div>`,
            iconSize: [34, 34], iconAnchor: [17, 17], className: '',
          }),
        }).addTo(map)
          .bindTooltip(stop.name, { direction: 'top', offset: [0, -16] })
      }

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      map.fitBounds(bounds, { padding: [48, 40], maxZoom: 13 })
    }

    init().catch(console.error)

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; initializedRef.current = false }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Draw/replace route polylines when seaPath arrives ─────────────────────
  useEffect(() => {
    if (!seaPath || !mapRef.current) return

    const update = async () => {
      const L = (await import('leaflet')).default
      const map = mapRef.current!

      // Remove previous route lines (e.g. from a prior update)
      routeLinesRef.current.forEach(l => l.remove())
      routeLinesRef.current = []

      // Shadow line
      const shadow = L.polyline(seaPath, {
        color: 'rgba(30,92,130,0.25)',
        weight: 8,
        lineJoin: 'round',
      }).addTo(map)

      // Dashed route line
      const line = L.polyline(seaPath, {
        color: 'var(--teal, #1e5c82)',
        weight: 3,
        opacity: 0.75,
        dashArray: '8, 6',
        lineJoin: 'round',
      }).addTo(map)

      routeLinesRef.current = [shadow, line]

      // Refit to the actual route geometry (may deviate significantly from straight line)
      const lats = seaPath.map(p => p[0]!)
      const lngs = seaPath.map(p => p[1]!)
      const bounds = L.latLngBounds(
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      )
      map.fitBounds(bounds, { padding: [48, 40], maxZoom: 13 })
    }

    update().catch(console.error)
  }, [seaPath])

  return (
    <div style={{ marginBottom: 20 }}>
      <div
        ref={containerRef}
        style={{
          width: '100%', height: 300, borderRadius: 18, overflow: 'hidden',
          border: '1px solid rgba(10,123,140,0.15)',
          background: 'var(--sea-xl, #e8f2fa)',
        }}
      />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, flexWrap: 'wrap',
        fontSize: 11, color: 'var(--txt3)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Mini start-pin matchar markören på kartan */}
          <svg viewBox="0 0 14 18" width={11} height={14} aria-hidden="true">
            <path d="M7 0C3.13 0 0 3.13 0 7c0 4.75 7 11 7 11s7-6.25 7-11C14 3.13 10.87 0 7 0z" fill="#0e8a52" />
            <circle cx="7" cy="7" r="2.2" fill="#fff" />
          </svg>
          {startName}
        </span>
        <svg viewBox="0 0 20 4" style={{ width: 20, height: 4, flexShrink: 0 }} aria-hidden="true">
          <line x1="0" y1="2" x2="20" y2="2" stroke="var(--teal,#1e5c82)" strokeWidth="2" strokeDasharray="5,4" />
        </svg>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Mini end-pin matchar markören på kartan */}
          <svg viewBox="0 0 14 18" width={11} height={14} aria-hidden="true">
            <path d="M7 0C3.13 0 0 3.13 0 7c0 4.75 7 11 7 11s7-6.25 7-11C14 3.13 10.87 0 7 0z" fill="#a14515" />
            <circle cx="7" cy="7" r="2.2" fill="#fff" />
          </svg>
          {endName}
        </span>
      </div>
    </div>
  )
}
