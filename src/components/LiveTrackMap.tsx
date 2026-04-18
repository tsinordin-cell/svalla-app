'use client'

import { useEffect, useRef } from 'react'

interface LiveTrackMapProps {
  points: { lat: number; lng: number }[]
  currentPos: { lat: number; lng: number } | null
  speed: number  // knots
}

export default function LiveTrackMap({ points, currentPos, speed }: LiveTrackMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const polylineRef = useRef<any>(null)
  const markerRef = useRef<any>(null)
  const LRef = useRef<any>(null)

  // ── Init map once ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      LRef.current = L

      // Load Leaflet CSS dynamically
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      if (mapInstance.current || !mapContainer.current) return

      mapInstance.current = L.map(mapContainer.current).setView([59.3293, 18.0686], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
        maxNativeZoom: 18,
      }).addTo(mapInstance.current)

      // Disable interactive features — this is a read-only live track view
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
      }
    }
  }, []) // run once on mount

  // ── Update track and marker when data changes ─────────────────────────────
  useEffect(() => {
    const L = LRef.current
    const map = mapInstance.current
    if (!L || !map) return

    // Update polyline
    if (points.length >= 2) {
      if (polylineRef.current) map.removeLayer(polylineRef.current)
      polylineRef.current = L.polyline(
        points.map((p) => [p.lat, p.lng]),
        { color: '#1e5c82', weight: 3, opacity: 0.8 }
      ).addTo(map)
    } else if (polylineRef.current) {
      map.removeLayer(polylineRef.current)
      polylineRef.current = null
    }

    // Update position marker
    if (currentPos) {
      if (markerRef.current) map.removeLayer(markerRef.current)

      const pulseIcon = L.divIcon({
        html: `<div style="
          position: absolute;
          width: 24px; height: 24px;
          background: #1e5c82;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(30, 92, 130, 0.3);
          top: -12px; left: -12px;
          animation: pulse-marker 1.5s infinite;
        "></div>
        <style>
          @keyframes pulse-marker {
            0%, 100% { box-shadow: 0 0 0 4px rgba(30, 92, 130, 0.3); }
            50% { box-shadow: 0 0 0 12px rgba(30, 92, 130, 0); }
          }
        </style>`,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      markerRef.current = L.marker([currentPos.lat, currentPos.lng], { icon: pulseIcon }).addTo(map)
      map.setView([currentPos.lat, currentPos.lng], 13, { animate: true, duration: 0.5 })
    } else if (markerRef.current) {
      map.removeLayer(markerRef.current)
      markerRef.current = null
    }
  }, [points, currentPos])

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: 18 }}>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: 220,
          borderRadius: 20,
          background: '#a8ccd4',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0, 45, 60, 0.1)',
        }}
      />

      {/* Speed badge */}
      {speed > 0.2 && (
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          background: 'rgba(30, 92, 130, 0.95)',
          backdropFilter: 'blur(8px)',
          color: 'white', padding: '6px 12px',
          borderRadius: 20, fontSize: 13, fontWeight: 700, zIndex: 10,
        }}>
          {speed.toFixed(1)} kn
        </div>
      )}

      {/* Live indicator */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'rgba(15, 158, 100, 0.95)',
        backdropFilter: 'blur(8px)',
        color: 'white', padding: '6px 12px',
        borderRadius: 20, fontSize: 12, fontWeight: 700,
        zIndex: 10, animation: 'pulse-live 1.5s infinite',
      }}>
        <span style={{
          width: 6, height: 6,
          background: '#0f9e64', borderRadius: '50%',
          animation: 'pulse-dot 1.5s infinite',
        }} />
        Live
      </div>

      <style>{`
        @keyframes pulse-live { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes pulse-dot  { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.7); opacity: 0.5; } }
      `}</style>
    </div>
  )
}
