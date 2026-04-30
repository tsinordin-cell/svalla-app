'use client'

import { useEffect, useRef, useState } from 'react'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'
// Leaflet CSS — bundled by Next.js, served from same origin (no CDN dependency, no CSP issues)
import 'leaflet/dist/leaflet.css'

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
  accuracy?: number | null  // meters — GPS accuracy radius, shown as blue circle
  stops?: StopMarker[]
  height?: number     // px, default 240
  centerTrigger?: number  // increment to force re-center on currentPos
  onExpand?: () => void   // optional callback for expand button
  showInternalControls?: boolean  // show built-in center + expand controls (default false; parent controls otherwise)
}

export default function LiveTrackMap({
  points,
  currentPos,
  speed,
  bearing = null,
  heading = null,
  accuracy = null,
  stops = [],
  height: _height = 240,
  centerTrigger = 0,
  onExpand,
  showInternalControls = false,
}: LiveTrackMapProps) {
  const [followOff, setFollowOff] = useState(false)
  const mapContainer       = useRef<HTMLDivElement>(null)
  const mapInstance        = useRef<import('leaflet').Map | null>(null)
  const polylineRef        = useRef<import('leaflet').Polyline | null>(null)
  const markerRef          = useRef<import('leaflet').Marker | null>(null)
  const accuracyCircleRef  = useRef<import('leaflet').Circle | null>(null)
  const stopMarkersRef     = useRef<import('leaflet').Marker[]>([])
  const LRef               = useRef<typeof import('leaflet') | null>(null)
  const userPannedRef      = useRef(false)   // true when user manually panned — pause auto-follow
  const followTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Init map once ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current) return

    let resizeObserver: ResizeObserver | null = null
    const t1 = { id: 0 }, t2 = { id: 0 }, t3 = { id: 0 }

    const invalidate = () => { mapInstance.current?.invalidateSize() }

    const initMap = async () => {
      const L = (await import('leaflet')).default
      LRef.current = L

      if (mapInstance.current || !mapContainer.current) return

      mapInstance.current = L.map(mapContainer.current, {
        zoomControl: false,          // remove +/- buttons; pinch-to-zoom is the mobile idiom
        attributionControl: false,
        scrollWheelZoom: false,
      }).setView([59.3293, 18.0686], 13)

      const { url: tileUrl, attr: tileAttr } = baseTile()
      L.tileLayer(tileUrl, {
        attribution: tileAttr,
        maxZoom: 18,
        maxNativeZoom: 18,
      }).addTo(mapInstance.current)

      // Nautical overlay
      L.tileLayer(SEAMARK_TILE, { opacity: 0.5, maxZoom: 18 }).addTo(mapInstance.current)

      // Pause auto-follow when user manually pans
      mapInstance.current.on('dragstart', () => {
        userPannedRef.current = true
        setFollowOff(true)
        if (followTimerRef.current) clearTimeout(followTimerRef.current)
        followTimerRef.current = setTimeout(() => {
          userPannedRef.current = false
          setFollowOff(false)
        }, 8000)
      })

      // invalidateSize: rAF ensures browser has painted the container before Leaflet reads its size,
      // then staggered backups handle orientation changes and slow devices.
      requestAnimationFrame(() => {
        invalidate()
        t1.id = window.setTimeout(invalidate, 100) as unknown as number
        t2.id = window.setTimeout(invalidate, 350) as unknown as number
        t3.id = window.setTimeout(invalidate, 800) as unknown as number
      })

      // ResizeObserver: re-validate whenever container changes size (orientation, split-screen, etc.)
      if (typeof ResizeObserver !== 'undefined' && mapContainer.current) {
        resizeObserver = new ResizeObserver(() => invalidate())
        resizeObserver.observe(mapContainer.current)
      }
    }

    initMap().catch(() => {})

    return () => {
      clearTimeout(t1.id); clearTimeout(t2.id); clearTimeout(t3.id)
      resizeObserver?.disconnect()
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
        polylineRef.current = null
        markerRef.current = null
        accuracyCircleRef.current = null
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
        color: 'var(--sea)',
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

    // Accuracy circle — drawn in meters so it scales correctly with zoom
    if (accuracyCircleRef.current) {
      map.removeLayer(accuracyCircleRef.current)
      accuracyCircleRef.current = null
    }
    if (currentPos && accuracy && accuracy > 0 && accuracy < 2000) {
      accuracyCircleRef.current = L.circle([currentPos.lat, currentPos.lng], {
        radius: accuracy,
        color: '#1e5c82',
        fillColor: '#1e5c82',
        fillOpacity: 0.07,
        weight: 1,
        opacity: Math.min(0.4, 30 / accuracy),  // fainter as accuracy improves
        interactive: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any).addTo(map)
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
      // Only auto-follow if user hasn't manually panned
      if (!userPannedRef.current) {
        map.setView([currentPos.lat, currentPos.lng], map.getZoom(), { animate: true, duration: 0.8 })
      }
    }
  }, [currentPos, bearing, heading, accuracy])

  // ── Force re-center when centerTrigger increments ───────────────────────
  useEffect(() => {
    if (!centerTrigger || !mapInstance.current || !currentPos) return
    userPannedRef.current = false
    setFollowOff(false)
    mapInstance.current.setView([currentPos.lat, currentPos.lng], 15, { animate: true, duration: 0.6 })
  }, [centerTrigger]) // eslint-disable-line react-hooks/exhaustive-deps

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
        ">${label}</div>`,
        className: '',
        iconAnchor: [20, 10],
      })
      const m = L.marker([stop.lat, stop.lng], { icon }).addTo(map)
      stopMarkersRef.current.push(m)
    })
  }, [stops])

  function recenter() {
    if (!mapInstance.current || !currentPos) return
    userPannedRef.current = false
    setFollowOff(false)
    mapInstance.current.setView([currentPos.lat, currentPos.lng], 15, { animate: true, duration: 0.6 })
  }

  return (
    // isolation: isolate creates a new stacking context — Leaflet's internal z-indexes (up to 1000)
    // are contained here and cannot bleed above parent overlays.
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', isolation: 'isolate' }}>
      <div
        ref={mapContainer}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--sea-l)',
          zIndex: 0,
        }}
      />

      {/* Speed badge — bottom left — zIndex 10 (inside isolated context, above Leaflet tiles/controls) */}
      {speed > 0.2 && (
        <div style={{
          position: 'absolute', bottom: 14, left: 14,
          background: 'rgba(30,92,130,0.90)',
          backdropFilter: 'blur(10px)',
          color: 'white', padding: '5px 12px',
          borderRadius: 18, fontSize: 13, fontWeight: 600, zIndex: 10,
          letterSpacing: '0.02em',
          boxShadow: '0 2px 8px rgba(0,0,0,0.20)',
        }}>
          {speed.toFixed(1)} kn
        </div>
      )}

      {/* Internal controls — opt-in via showInternalControls. Useful for embedded maps. */}
      {showInternalControls && (
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={recenter}
            disabled={!currentPos}
            aria-label={followOff ? 'Återställ följning' : 'Centrera på min position'}
            title={followOff ? 'Återställ följning' : 'Centrera'}
            style={{
              width: 40, height: 40, borderRadius: 20,
              background: followOff ? 'linear-gradient(135deg, var(--acc), #e07828)' : 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: currentPos ? 'pointer' : 'not-allowed',
              opacity: currentPos ? 1 : 0.45,
              transition: 'background .2s, transform .15s',
              animation: followOff ? 'svm-attn 1.6s ease-in-out infinite' : 'none',
              padding: 0,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke={followOff ? '#fff' : 'var(--sea)'} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
              <circle cx="12" cy="12" r="3" fill={followOff ? '#fff' : 'var(--sea)'} stroke="none"/>
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
              <circle cx="12" cy="12" r="7"/>
            </svg>
          </button>
          {onExpand && (
            <button
              onClick={onExpand}
              aria-label="Expandera karta"
              title="Expandera"
              style={{
                width: 40, height: 40, borderRadius: 20,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', padding: 0,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                <path d="M4 9V4h5"/>
                <path d="M20 9V4h-5"/>
                <path d="M4 15v5h5"/>
                <path d="M20 15v5h-5"/>
              </svg>
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse-dot-live {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:.5;transform:scale(.7)}
        }
        @keyframes svm-attn {
          0%,100%{box-shadow:0 2px 10px rgba(201,110,42,0.45), 0 0 0 0 rgba(201,110,42,0.45)}
          50%    {box-shadow:0 2px 10px rgba(201,110,42,0.45), 0 0 0 8px rgba(201,110,42,0)}
        }
      `}</style>
    </div>
  )
}
