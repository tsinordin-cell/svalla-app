'use client'
import { useEffect, useRef } from 'react'

type Point = { lat: number; lng: number; speedKnots?: number }
type Stop = { lat: number; lng: number; type: string; durationSeconds: number }
type NearbyRestaurant = { id: string; name: string; latitude: number; longitude: number }

type Props = {
  points: Point[]
  stops: Stop[]
  restaurants?: NearbyRestaurant[]
}

// Interpolate color based on speed (blue=slow, green=medium, orange=fast)
function speedColor(knots: number): string {
  if (knots < 2) return '#7a9dab'   // slow — grey-blue
  if (knots < 8) return '#1e5c82'   // medium — sea blue
  if (knots < 15) return '#0f9e64'  // good speed — green
  return '#c96e2a'                  // fast — orange
}

export default function TripDetailMap({ points, stops, restaurants = [] }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (!mapRef.current || initializedRef.current || points.length < 2) return
    initializedRef.current = true

    let map: any = null

    async function init() {
      const L = (await import('leaflet')).default
      // CSS loaded via CDN link in layout

      // bounds
      const lats = points.map(p => p.lat)
      const lngs = points.map(p => p.lng)
      if (lats.length === 0 || lngs.length === 0) return

      const bounds = L.latLngBounds(
        [Math.min(...lats) - 0.005, Math.min(...lngs) - 0.005],
        [Math.max(...lats) + 0.005, Math.max(...lngs) + 0.005]
      )

      map = L.map(mapRef.current!, {
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map)

      // draw colored segments based on speed
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        const spd = ((a.speedKnots ?? 0) + (b.speedKnots ?? 0)) / 2
        L.polyline(
          [[a.lat, a.lng], [b.lat, b.lng]],
          { color: speedColor(spd), weight: 4, opacity: 0.85 }
        ).addTo(map)
      }

      // START marker
      const startIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#0f9e64;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: '',
      })
      L.marker([points[0].lat, points[0].lng], { icon: startIcon })
        .bindTooltip('Start', { direction: 'top', offset: [0, -8] })
        .addTo(map)

      // END marker
      const endIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#cc3d3d;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: '',
      })
      L.marker([points[points.length - 1].lat, points[points.length - 1].lng], { icon: endIcon })
        .bindTooltip('Slut', { direction: 'top', offset: [0, -8] })
        .addTo(map)

      // STOP markers
      stops.forEach(s => {
        const isPause = s.type === 'pause'
        const dur = s.durationSeconds > 60
          ? `${Math.round(s.durationSeconds / 60)} min`
          : `${s.durationSeconds}s`
        const icon = L.divIcon({
          html: `<div style="width:10px;height:10px;border-radius:50%;background:${isPause ? '#c96e2a' : '#7a9dab'};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
          iconSize: [10, 10], iconAnchor: [5, 5], className: '',
        })
        L.marker([s.lat, s.lng], { icon })
          .bindTooltip(`${isPause ? 'Paus' : 'Stopp'} · ${dur}`, { direction: 'top', offset: [0, -6] })
          .addTo(map)
      })

      // RESTAURANT markers along route
      restaurants.forEach(r => {
        const icon = L.divIcon({
          html: `<div style="background:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid #c96e2a">🍽</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14], className: '',
        })
        L.marker([r.latitude, r.longitude], { icon })
          .bindTooltip(r.name, { direction: 'top', offset: [0, -14] })
          .addTo(map)
      })

      // Speed legend
      const LegendControl = L.Control.extend({
        onAdd() {
          const div = L.DomUtil.create('div')
          div.style.cssText = 'background:var(--glass-92);border-radius:10px;padding:8px 10px;font-size:10px;line-height:1.8;backdrop-filter:blur(8px)'
          div.innerHTML = `
            <div style="font-weight:700;margin-bottom:4px;color:#192830">Hastighet</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#7a9dab;border-radius:2px;vertical-align:middle;margin-right:5px"></span>&lt; 2 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#1e5c82;border-radius:2px;vertical-align:middle;margin-right:5px"></span>2–8 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#0f9e64;border-radius:2px;vertical-align:middle;margin-right:5px"></span>8–15 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#c96e2a;border-radius:2px;vertical-align:middle;margin-right:5px"></span>&gt; 15 kn</div>
          `
          return div
        }
      })
      new LegendControl({ position: 'bottomright' }).addTo(map)

      map.fitBounds(bounds)
    }

    init().catch(console.error)

    // Cleanup on unmount
    return () => {
      if (map) {
        map.remove()
        map = null
      }
    }
  }, [points, stops, restaurants])

  return (
    <div
      ref={mapRef}
      className="w-full rounded-2xl overflow-hidden bg-sea-xl"
      style={{ height: '340px', border: '1px solid rgba(10,123,140,0.15)' }}
    />
  )
}
