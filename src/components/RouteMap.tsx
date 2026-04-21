'use client'
import { useEffect, useRef, useState } from 'react'
import type { TourWaypoint } from '@/lib/supabase'

interface Props {
  waypoints: TourWaypoint[]
  height?: string
}

export default function RouteMap({ waypoints, height = '320px' }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null)
  const mapRef         = useRef<any>(null)       // eslint-disable-line @typescript-eslint/no-explicit-any
  const polylineRef    = useRef<any>(null)       // eslint-disable-line @typescript-eslint/no-explicit-any
  const initializedRef = useRef(false)
  const [activeStop, setActiveStop] = useState<TourWaypoint | null>(null)

  useEffect(() => {
    if (!containerRef.current || initializedRef.current || waypoints.length < 2) return
    initializedRef.current = true

    async function init() {
      const L = (await import('leaflet')).default

      const lats   = waypoints.map(w => w.lat)
      const lngs   = waypoints.map(w => w.lng)
      const bounds = L.latLngBounds(
        [Math.min(...lats) - 0.01, Math.min(...lngs) - 0.01],
        [Math.max(...lats) + 0.01, Math.max(...lngs) + 0.01],
      )

      const map = L.map(containerRef.current!, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      })
      mapRef.current = map

      // Tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map)

      // ── Validate waypoints — skip outliers outside Stockholm archipelago ──
      const ARCHIPELAGO_BOUNDS = { minLat: 58.5, maxLat: 60.5, minLng: 17.0, maxLng: 20.5 }
      const validLatlngs = waypoints
        .filter(w =>
          w.lat >= ARCHIPELAGO_BOUNDS.minLat && w.lat <= ARCHIPELAGO_BOUNDS.maxLat &&
          w.lng >= ARCHIPELAGO_BOUNDS.minLng && w.lng <= ARCHIPELAGO_BOUNDS.maxLng
        )
        .map(w => [w.lat, w.lng] as [number, number])

      const latlngs = validLatlngs.length >= 2 ? validLatlngs : waypoints.map(w => [w.lat, w.lng] as [number, number])

      // ── Route line — dashed to indicate planned/approximate route ──────
      const polyline = L.polyline(latlngs, {
        color: 'var(--sea)',
        weight: 3,
        opacity: 0.7,
        lineJoin: 'round',
        lineCap: 'round',
        dashArray: '8, 6',
      }).addTo(map)
      polylineRef.current = polyline

      // Shadow line for depth
      L.polyline(latlngs, {
        color: 'rgba(30,92,130,0.15)',
        weight: 7,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(map)

      // Click route → highlight + fitBounds
      polyline.on('click', () => {
        polyline.setStyle({ color: '#c96e2a', weight: 4, opacity: 1, dashArray: '10, 5' })
        map.fitBounds(bounds, { padding: [24, 24], animate: true, duration: 0.5 })
        setTimeout(() => {
          polyline.setStyle({ color: 'var(--sea)', weight: 3, opacity: 0.7, dashArray: '8, 6' })
        }, 1800)
      })

      // ── Start marker (grön) ───────────────────────────────────────────────
      const startIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:14px;height:14px;border-radius:50%;
          background:#22c55e;border:2.5px solid white;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
        "></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7],
      })

      // ── End marker (orange) ───────────────────────────────────────────────
      const endIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px;height:16px;border-radius:50%;
          background:#c96e2a;border:2.5px solid white;
          box-shadow:0 2px 10px rgba(201,110,42,0.45);
        "></div>`,
        iconSize: [16, 16], iconAnchor: [8, 8],
      })

      L.marker(latlngs[0], { icon: startIcon })
        .addTo(map)
        .bindTooltip(waypoints[0].name ?? 'Start', {
          permanent: false, direction: 'top', className: 'svalla-tooltip',
        })

      L.marker(latlngs[latlngs.length - 1], { icon: endIcon })
        .addTo(map)
        .bindTooltip(waypoints[waypoints.length - 1].name ?? 'Mål', {
          permanent: false, direction: 'top', className: 'svalla-tooltip',
        })

      // ── Named intermediate stops ──────────────────────────────────────────
      waypoints.forEach((w, i) => {
        if (i === 0 || i === waypoints.length - 1) return
        if (!w.name) return

        const stopIcon = L.divIcon({
          className: '',
          html: `<div style="
            width:11px;height:11px;border-radius:50%;
            background:#fff;border:2.5px solid #1e5c82;
            box-shadow:0 2px 6px rgba(30,92,130,0.3);
            cursor:pointer;
          "></div>`,
          iconSize: [11, 11], iconAnchor: [5.5, 5.5],
        })

        const marker = L.marker([w.lat, w.lng], { icon: stopIcon }).addTo(map)

        // Popup med info
        const popupHtml = `
          <div style="font-family:system-ui,sans-serif;min-width:160px;max-width:220px">
            <div style="font-weight:800;font-size:14px;color:#162d3a;margin-bottom:4px">${w.name}</div>
            ${w.description ? `<div style="font-size:12px;color:var(--txt2);margin-bottom:6px;line-height:1.4">${w.description}</div>` : ''}
            ${w.restaurant ? `
              <div style="
                display:flex;align-items:center;gap:5px;
                padding:4px 8px;background:rgba(201,110,42,0.08);
                border-radius:8px;margin-top:4px;
              ">
                <span style="font-size:12px">🍽</span>
                <span style="font-size:11px;font-weight:700;color:#c96e2a">${w.restaurant}</span>
              </div>
            ` : ''}
          </div>
        `

        marker.bindPopup(popupHtml, {
          maxWidth: 240,
          closeButton: false,
          className: 'svalla-popup',
        })

        marker.on('click', () => {
          marker.openPopup()
          map.panTo([w.lat, w.lng], { animate: true, duration: 0.4 })
        })

        marker.on('mouseover', () => {
          marker.getElement()?.style.setProperty('transform', 'scale(1.4)')
        })
        marker.on('mouseout', () => {
          marker.getElement()?.style.setProperty('transform', 'scale(1)')
        })
      })

      map.fitBounds(bounds, { padding: [28, 28] })

      // Zoom controls
      L.control.zoom({ position: 'bottomright' }).addTo(map)
    }

    init().catch(console.error)

    return () => {
      if (mapRef.current) { mapRef.current.remove(); mapRef.current = null; initializedRef.current = false }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const namedStops = waypoints.filter((w, i) => w.name && i > 0 && i < waypoints.length - 1)

  return (
    <div style={{ position: 'relative' }}>

      {/* Karta */}
      <div
        ref={containerRef}
        style={{
          width: '100%', height, borderRadius: 18, overflow: 'hidden',
          border: '1px solid rgba(10,123,140,0.15)',
          background: '#d4e8f0',
        }}
      />

      {/* Ruttlinje-tips */}
      <div style={{
        position: 'absolute', bottom: 12, left: 12, zIndex: 500,
        background: 'var(--glass-92)', backdropFilter: 'blur(8px)',
        borderRadius: 10, padding: '4px 10px',
        fontSize: 10, fontWeight: 700, color: 'var(--txt2)',
        boxShadow: '0 1px 6px rgba(0,45,60,0.10)',
        display: 'flex', alignItems: 'center', gap: 6,
        pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 20 4" style={{ width: 20, height: 4 }}>
          <line x1="0" y1="2" x2="20" y2="2" stroke="#1e5c82" strokeWidth="2.5" strokeDasharray="5,4" />
        </svg>
        Ungefärlig sträckning
      </div>

      {/* Stop-lista (klickbar legend) */}
      {namedStops.length > 0 && (
        <div style={{
          marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap',
        }}>
          {[waypoints[0], ...namedStops, waypoints[waypoints.length - 1]].filter(w => w.name).map((w, i, arr) => {
            const isFirst = i === 0
            const isLast  = i === arr.length - 1
            return (
              <button
                key={`${w.lat}-${w.lng}`}
                onClick={() => {
                  if (!mapRef.current) return
                  mapRef.current.flyTo([w.lat, w.lng], 13, { animate: true, duration: 0.6 })
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 10px', borderRadius: 20, border: 'none', cursor: 'pointer',
                  background: isFirst ? 'rgba(34,197,94,0.1)' : isLast ? 'rgba(201,110,42,0.1)' : 'rgba(30,92,130,0.07)',
                  color: isFirst ? '#16a34a' : isLast ? '#c96e2a' : 'var(--sea)',
                  fontSize: 11, fontWeight: 700,
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                  background: isFirst ? '#22c55e' : isLast ? '#c96e2a' : 'var(--sea)',
                  display: 'inline-block',
                }} />
                {w.name}
                {w.restaurant && <span style={{ fontSize: 10 }}>🍽</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* Global popup-styling */}
      <style>{`
        .svalla-popup .leaflet-popup-content-wrapper {
          border-radius: 14px;
          box-shadow: 0 4px 20px rgba(0,45,60,0.18);
          border: 1px solid rgba(10,123,140,0.12);
          padding: 0;
        }
        .svalla-popup .leaflet-popup-content { margin: 12px 14px; }
        .svalla-popup .leaflet-popup-tip-container { display: none; }
        .svalla-tooltip {
          background: rgba(22,45,58,0.88);
          border: none;
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .svalla-tooltip::before { display: none; }
      `}</style>
    </div>
  )
}
