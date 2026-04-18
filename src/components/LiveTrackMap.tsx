'use client'

import { useEffect, useRef } from 'react'

interface StopMarker {
  lat: number
  lng: number
  type: string
  durationSeconds: number
}

interface LiveTrackMapProps {
  points: { lat: number; lng: number }[]
  currentPos: { lat: number; lng: number } | null
  speed: number       // knots
  bearing?: number | null   // degrees from north (calculated from movement)
  heading?: number | null   // degrees from GPS hardware heading
  stops?: StopMarker[]
}

export default function LiveTrackMap({
  points,
  currentPos,
  speed,
  bearing = null,
  heading = null,
  stops = [],
}: LiveTrackMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance  = useRef<any>(null)
  const polylineRef  = useRef<any>(null)
  const markerRef    = useRef<any>(null)
  const stopMarkersRef = useRef<any[]>([])
  const LRef         = useRef<any>(null)

  // ── Init map once ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      LRef.current = L

      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      if (mapInstance.current || !mapContainer.current) return

      mapInstance.current = L.map(mapContainer.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([59.3293, 18.0686], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        maxNativeZoom: 18,
      }).addTo(mapInstance.current)

      // Nautical overlay for marine context
      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        opacity: 0.5,
        maxZoom: 18,
      }).addTo(mapInstance.current)

      // Disable all interaction — this is a read-only tracker view
      mapInstance.current.dragging.disable()
      mapInstance.current.touchZoom.disable()
      mapInstance.current.doubleClickZoom.disable()
      mapInstance.current.scrollWheelZoom.disable()
      mapInstance.current.boxZoom.disable()
      mapInstance.current.keyboard.disable()

      setTimeout(() => mapInstance.current?.invalidateSize(), 100)
    }

    initMap().catch(() => {})

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
        polylineRef.current = null
        markerRef.current = null
        stopMarkersRef.current = []
      }
    }
  }, [])

  // ── Update route track ───────────────────────────────────────────────────
  useEffect(() => {
    const L = LRef.current
    const map = mapInstance.current
    if (!L || !map) return

    if (polylineRef.current) map.removeLayer(polylineRef.current)

    if (points.length >= 2) {
      // Split track into recent (brighter) and older (dimmer) segments
      const cutoff = Math.max(0, points.length - 40)
      const olderPts = points.slice(0, cutoff + 1)
      const recentPts = points.slice(cutoff)

      if (olderPts.length >= 2) {
        L.polyline(olderPts.map(p => [p.lat, p.lng]), {
          color: 'rgba(30,92,130,0.35)',
          weight: 2,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map)
      }

      polylineRef.current = L.polyline(recentPts.map(p => [p.lat, p.lng]), {
        color: '#1e5c82',
        weight: 3.5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)
    } else {
      polylineRef.current = null
    }
  }, [points])

  // ── Update current position marker with bearing arrow ───────────────────
  useEffect(() => {
    const L = LRef.current
    const map = mapInstance.current
    if (!L || !map) return

    if (markerRef.current) {
      map.removeLayer(markerRef.current)
      markerRef.current = null
    }

    if (currentPos) {
      const activeBearing = heading ?? bearing
      const arrowSvg = activeBearing !== null
        ? `<svg width="32" height="32" viewBox="0 0 32 32" style="position:absolute;top:-16px;left:-16px;">
            <circle cx="16" cy="16" r="9" fill="#1e5c82" stroke="white" stroke-width="2.5"/>
            <path d="M16 5 L20 14 L16 11 L12 14 Z"
              fill="rgba(232,146,74,0.95)"
              transform="rotate(${activeBearing}, 16, 16)"/>
          </svg>`
        : `<div style="
            position:absolute;width:20px;height:20px;
            background:#1e5c82;border:2.5px solid white;border-radius:50%;
            top:-10px;left:-10px;
            box-shadow:0 0 0 5px rgba(30,92,130,0.25);
            animation:pulse-pos 2s ease-in-out infinite;
          "></div>`

      const pulseIcon = L.divIcon({
        html: `${arrowSvg}
          <style>
            @keyframes pulse-pos {
              0%,100%{box-shadow:0 0 0 5px rgba(30,92,130,0.25)}
              50%{box-shadow:0 0 0 12px rgba(30,92,130,0)}
            }
          </style>`,
        className: '',
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      })

      markerRef.current = L.marker([currentPos.lat, currentPos.lng], { icon: pulseIcon }).addTo(map)
      map.setView([currentPos.lat, currentPos.lng], 13, { animate: true, duration: 0.8 })
    }
  }, [currentPos, bearing, heading])

  // ── Render stop markers ──────────────────────────────────────────────────
  useEffect(() => {
    const L = LRef.current
    const map = mapInstance.current
    if (!L || !map) return

    // Clear old stop markers
    stopMarkersRef.current.forEach(m => map.removeLayer(m))
    stopMarkersRef.current = []

    stops.forEach(stop => {
      const durationMin = Math.round(stop.durationSeconds / 60)
      const label = durationMin >= 60
        ? `${Math.floor(durationMin / 60)}h ${durationMin % 60}min`
        : `${durationMin}min`

      const icon = L.divIcon({
        html: `<div style="
          background:rgba(232,146,74,0.95);
          color:white;font-size:9px;font-weight:800;
          padding:3px 6px;border-radius:10px;
          white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,.2);
          border:1.5px solid rgba(255,255,255,.5);
        ">⚓ ${label}</div>`,
        className: '',
        iconAnchor: [20, 10],
      })
      const m = L.marker([stop.lat, stop.lng], { icon }).addTo(map)
      stopMarkersRef.current.push(m)
    })
  }, [stops])

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: 12 }}>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: 240,
          borderRadius: 20,
          background: '#a8ccd4',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0,45,60,0.12)',
        }}
      />

      {/* Speed badge — bottom left */}
      {speed > 0.2 && (
        <div style={{
          position: 'absolute', bottom: 12, left: 12,
          background: 'rgba(30,92,130,0.92)',
          backdropFilter: 'blur(8px)',
          color: 'white', padding: '5px 11px',
          borderRadius: 18, fontSize: 13, fontWeight: 800, zIndex: 10,
          letterSpacing: '0.02em',
        }}>
          {speed.toFixed(1)} kn
        </div>
      )}

      {/* Points count — bottom right */}
      {points.length > 0 && (
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,.8)', padding: '4px 8px',
          borderRadius: 10, fontSize: 10, fontWeight: 600, zIndex: 10,
        }}>
          {points.length} pts
        </div>
      )}

      {/* Live indicator — top right */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        display: 'flex', alignItems: 'center', gap: 5,
        background: 'rgba(15,158,100,0.92)',
        backdropFilter: 'blur(8px)',
        color: 'white', padding: '5px 11px',
        borderRadius: 18, fontSize: 11, fontWeight: 800,
        zIndex: 10,
      }}>
        <span style={{
          width: 6, height: 6,
          background: '#fff', borderRadius: '50%',
          animation: 'pulse-dot-live 1.5s ease-in-out infinite',
        }} />
        LIVE
      </div>

      <style>{`
        @keyframes pulse-dot-live {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(.7)}
        }
      `}</style>
    </div>
  )
}
