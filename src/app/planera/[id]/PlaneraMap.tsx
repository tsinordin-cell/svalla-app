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
}

export default function PlaneraMap({ startLat, startLng, startName, endLat, endLng, endName, stops }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return
    initializedRef.current = true

    async function init() {
      const L = (await import('leaflet')).default

      // Bounds only from route endpoints — stops are overlays and must not affect zoom
      const bounds = L.latLngBounds(
        [Math.min(startLat, endLat), Math.min(startLng, endLng)],
        [Math.max(startLat, endLat), Math.max(startLng, endLng)],
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

      // Dashed route line
      L.polyline([[startLat, startLng], [endLat, endLng]], {
        color: 'rgba(30,92,130,0.25)',
        weight: 8,
        lineJoin: 'round',
      }).addTo(map)
      L.polyline([[startLat, startLng], [endLat, endLng]], {
        color: 'var(--teal, #1e5c82)',
        weight: 3,
        opacity: 0.75,
        dashArray: '8, 6',
        lineJoin: 'round',
      }).addTo(map)

      // Start marker
      L.marker([startLat, startLng], {
        icon: L.divIcon({
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#22c55e;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
          iconSize: [14, 14], iconAnchor: [7, 7], className: '',
        }),
      }).addTo(map).bindTooltip(startName, { direction: 'top', offset: [0, -8] })

      // End marker
      L.marker([endLat, endLng], {
        icon: L.divIcon({
          html: `<div style="width:14px;height:14px;border-radius:50%;background:#ef4444;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
          iconSize: [14, 14], iconAnchor: [7, 7], className: '',
        }),
      }).addTo(map).bindTooltip(endName, { direction: 'top', offset: [0, -8] })

      // Stop markers — colored by category
      for (const stop of stops) {
        L.marker([stop.lat, stop.lng], {
          icon: L.divIcon({
            html: `<div style="
              width:32px;height:32px;border-radius:50%;
              background:${stop.color};border:2.5px solid white;
              display:flex;align-items:center;justify-content:center;
              font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.22);
            ">${stop.emoji}</div>`,
            iconSize: [32, 32], iconAnchor: [16, 16], className: '',
          }),
        }).addTo(map)
          .bindTooltip(stop.name, { direction: 'top', offset: [0, -14] })
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
        display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap',
        fontSize: 11, color: 'var(--txt3)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          {startName}
        </span>
        <svg viewBox="0 0 20 4" style={{ width: 20, height: 4, flexShrink: 0 }}>
          <line x1="0" y1="2" x2="20" y2="2" stroke="var(--teal,#1e5c82)" strokeWidth="2" strokeDasharray="5,4" />
        </svg>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
          {endName}
        </span>
      </div>
    </div>
  )
}
