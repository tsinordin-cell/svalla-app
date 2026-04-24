'use client'
import { useEffect, useRef, useState } from 'react'
import type { WindArrowSample } from '@/lib/weather'
import { windColor, windDirectionLabel } from '@/lib/weather'

type Point = { lat: number; lng: number; speedKnots?: number }
type Stop = { lat: number; lng: number; type: string; durationSeconds: number }
type NearbyRestaurant = { id: string; name: string; latitude: number; longitude: number }

type Props = {
  points: Point[]
  stops: Stop[]
  restaurants?: NearbyRestaurant[]
  /** Sampel av vind längs rutten — renderas som pilar ovanpå polyline:n. */
  windSamples?: WindArrowSample[]
}

// Färgkoda polyline:n efter fart (behåll befintligt beteende).
function speedColor(knots: number): string {
  if (knots < 2) return 'var(--txt3)'
  if (knots < 8) return '#1e5c82'
  if (knots < 15) return '#0f9e64'
  return '#c96e2a'
}

/**
 * HTML för en vind-pil-markör. Pilen pekar åt vindriktningen
 * (från-varifrån enligt Open-Meteo-konvention). Rotera SVG med
 * CSS-transform — cheap och skarp vid alla zoom-nivåer.
 */
function windArrowHtml(sample: WindArrowSample): string {
  const color = windColor(sample.speedMs)
  const speedLabel = sample.speedMs.toFixed(1)
  // Ruta 26×26 så pilen får plats med luft runt sig.
  return `
    <div style="
      width: 26px; height: 26px;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.92);
      border: 1.5px solid ${color};
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,45,60,0.25);
      position: relative;
    ">
      <svg viewBox="0 0 24 24" width="16" height="16"
        style="transform: rotate(${sample.directionDeg}deg); display: block;">
        <path d="M12 3 L12 21 M12 3 L7 9 M12 3 L17 9"
          stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />
      </svg>
      <span style="
        position: absolute; bottom: -4px; right: -6px;
        background: ${color}; color: #fff;
        font-size: 9px; font-weight: 700;
        padding: 1px 4px; border-radius: 6px;
        line-height: 1.1; letter-spacing: 0.2px;
        border: 1.5px solid #fff;
      ">${speedLabel}</span>
    </div>
  `.trim()
}

export default function TripDetailMap({ points, stops, restaurants = [], windSamples = [] }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windLayerRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const LRef = useRef<any>(null)

  // Visa vindpilar som default. Toggle:n har inget localStorage — medvetet
  // enkelt, om folk vill persistera det kan vi lägga på senare.
  const [showWind, setShowWind] = useState(true)
  // Flyter till true när main-init:en lagt kartan i mapInstanceRef. Behövs
  // för att vind-effekten ska veta att den kan rendera pilar (annars kör
  // den innan den async init:en är klar och gör ingenting).
  const [mapReady, setMapReady] = useState(false)

  // ── Huvudinit — karta, tiles, polyline, markers, legend ──────────────
  useEffect(() => {
    if (!mapRef.current || initializedRef.current || points.length < 2) return
    initializedRef.current = true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null

    async function init() {
      const L = (await import('leaflet')).default
      LRef.current = L

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
      mapInstanceRef.current = map

      const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      const tileAttr = isDark
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; OpenStreetMap contributors'
      L.tileLayer(tileUrl, { attribution: tileAttr, maxZoom: 18 }).addTo(map)

      // Sjökort-overlay (OpenSeaMap) — Svallas visuella signatur
      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18, opacity: 0.85, crossOrigin: '',
      }).addTo(map)

      // Färgade polyline-segment efter fart
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1]
        const b = points[i]
        const spd = ((a.speedKnots ?? 0) + (b.speedKnots ?? 0)) / 2
        L.polyline(
          [[a.lat, a.lng], [b.lat, b.lng]],
          { color: speedColor(spd), weight: 4, opacity: 0.85 }
        ).addTo(map)
      }

      // START
      const startIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#0f9e64;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: '',
      })
      L.marker([points[0].lat, points[0].lng], { icon: startIcon })
        .bindTooltip('Start', { direction: 'top', offset: [0, -8] }).addTo(map)

      // END
      const endIcon = L.divIcon({
        html: `<div style="width:14px;height:14px;border-radius:50%;background:#cc3d3d;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
        iconSize: [14, 14], iconAnchor: [7, 7], className: '',
      })
      L.marker([points[points.length - 1].lat, points[points.length - 1].lng], { icon: endIcon })
        .bindTooltip('Slut', { direction: 'top', offset: [0, -8] }).addTo(map)

      // STOPS
      stops.forEach(s => {
        const isPause = s.type === 'pause'
        const dur = s.durationSeconds > 60
          ? `${Math.round(s.durationSeconds / 60)} min`
          : `${s.durationSeconds}s`
        const icon = L.divIcon({
          html: `<div style="width:10px;height:10px;border-radius:50%;background:${isPause ? '#c96e2a' : 'var(--txt3)'};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>`,
          iconSize: [10, 10], iconAnchor: [5, 5], className: '',
        })
        L.marker([s.lat, s.lng], { icon })
          .bindTooltip(`${isPause ? 'Paus' : 'Stopp'} · ${dur}`, { direction: 'top', offset: [0, -6] })
          .addTo(map)
      })

      // RESTAURANGER
      restaurants.forEach(r => {
        const icon = L.divIcon({
          html: `<div style="background:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 8px rgba(0,0,0,0.2);border:2px solid #c96e2a">🍽</div>`,
          iconSize: [28, 28], iconAnchor: [14, 14], className: '',
        })
        L.marker([r.latitude, r.longitude], { icon })
          .bindTooltip(r.name, { direction: 'top', offset: [0, -14] }).addTo(map)
      })

      // Legend: fart + vind
      const LegendControl = L.Control.extend({
        onAdd() {
          const div = L.DomUtil.create('div')
          div.style.cssText = 'background:var(--glass-92);border-radius:10px;padding:8px 10px;font-size:10px;line-height:1.7;backdrop-filter:blur(8px);min-width:115px'
          div.innerHTML = `
            <div style="font-weight:700;margin-bottom:4px;color:#192830">Hastighet</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:var(--txt3);border-radius:2px;vertical-align:middle;margin-right:5px"></span>&lt; 2 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#1e5c82;border-radius:2px;vertical-align:middle;margin-right:5px"></span>2–8 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#0f9e64;border-radius:2px;vertical-align:middle;margin-right:5px"></span>8–15 kn</div>
            <div><span style="display:inline-block;width:10px;height:3px;background:#c96e2a;border-radius:2px;vertical-align:middle;margin-right:5px"></span>&gt; 15 kn</div>
            <div style="font-weight:700;margin:6px 0 4px;color:#192830">Vind (m/s)</div>
            <div><span style="display:inline-block;width:10px;height:10px;background:#16a34a;border-radius:50%;vertical-align:middle;margin-right:5px"></span>&lt; 5</div>
            <div><span style="display:inline-block;width:10px;height:10px;background:#eab308;border-radius:50%;vertical-align:middle;margin-right:5px"></span>5–10</div>
            <div><span style="display:inline-block;width:10px;height:10px;background:#ea580c;border-radius:50%;vertical-align:middle;margin-right:5px"></span>10–15</div>
            <div><span style="display:inline-block;width:10px;height:10px;background:#dc2626;border-radius:50%;vertical-align:middle;margin-right:5px"></span>&gt; 15</div>
          `
          return div
        }
      })
      new LegendControl({ position: 'bottomright' }).addTo(map)

      map.fitBounds(bounds)
      setMapReady(true)
    }

    init().catch(console.error)

    return () => {
      if (map) {
        map.remove()
        map = null
        mapInstanceRef.current = null
        windLayerRef.current = null
        initializedRef.current = false
        setMapReady(false)
      }
    }
  }, [points, stops, restaurants])

  // ── Vind-pilar — hanteras i separat effekt så toggle + nya samples
  //    kan re-rendera utan att initialisera om hela kartan. ──────────────
  useEffect(() => {
    if (!mapReady) return
    const map = mapInstanceRef.current
    const L = LRef.current
    if (!map || !L) return

    // Rensa eventuell tidigare layer
    if (windLayerRef.current) {
      windLayerRef.current.remove()
      windLayerRef.current = null
    }

    if (!showWind || windSamples.length === 0) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const layer = L.layerGroup()
    for (const s of windSamples) {
      const time = new Date(s.timeMs).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })
      const icon = L.divIcon({
        html: windArrowHtml(s),
        iconSize: [26, 26], iconAnchor: [13, 13], className: 'svalla-wind-arrow',
      })
      L.marker([s.lat, s.lng], { icon, interactive: true, keyboard: false })
        .bindTooltip(
          `${time} · ${s.speedMs.toFixed(1)} m/s från ${windDirectionLabel(s.directionDeg)}`,
          { direction: 'top', offset: [0, -10] },
        )
        .addTo(layer)
    }
    layer.addTo(map)
    windLayerRef.current = layer
  }, [mapReady, showWind, windSamples])

  const hasWind = windSamples.length > 0

  return (
    <div style={{ position: 'relative' }}>
      <div
        ref={mapRef}
        className="w-full rounded-2xl overflow-hidden bg-sea-xl"
        style={{ height: '340px', border: '1px solid rgba(10,123,140,0.15)' }}
      />

      {/* Toggle-chip för vindpilar — bara när vi har data att visa/dölja */}
      {hasWind && (
        <button
          type="button"
          onClick={() => setShowWind(v => !v)}
          aria-pressed={showWind}
          style={{
            position: 'absolute', top: 12, left: 12, zIndex: 400,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '7px 12px', borderRadius: 20,
            background: showWind ? 'var(--sea)' : 'rgba(255,255,255,0.95)',
            color: showWind ? '#fff' : 'var(--txt)',
            border: '1.5px solid ' + (showWind ? 'var(--sea)' : 'rgba(10,123,140,0.18)'),
            fontSize: 12, fontWeight: 700, letterSpacing: '0.2px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,45,60,0.18)',
            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
            WebkitTapHighlightColor: 'transparent',
            fontFamily: 'inherit',
          }}
          title={showWind ? 'Dölj vindpilar' : 'Visa vindpilar'}
        >
          <span aria-hidden>💨</span>
          {showWind ? 'Vind på' : 'Vind av'}
        </button>
      )}
    </div>
  )
}
