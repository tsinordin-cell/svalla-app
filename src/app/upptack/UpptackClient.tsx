'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useRef, useState, useCallback } from 'react'

type Filter = 'bryggor' | 'krogar' | 'naturhamnar' | 'rutter' | 'heatmap'

interface Poi {
  id: string
  name: string
  latitude: number
  longitude: number
  type: string | null
  categories: string[] | null
  description: string | null
  image_url: string | null
  slug: string | null
  island: string | null
}

interface Route {
  id: string
  name: string
  description: string | null
  distance: number | null
  difficulty: string | null
  waypoints: Array<{ lat: number; lng: number; name?: string }>
}

interface HeatCell {
  cell_lat: number
  cell_lng: number
  weight: number
}

interface DetailPoi extends Poi {
  kind: 'poi'
}
interface DetailRoute extends Route {
  kind: 'route'
}
type DetailItem = DetailPoi | DetailRoute | null

function poiCategory(p: Poi): 'bryggor' | 'krogar' | 'naturhamnar' | null {
  const cats = (p.categories ?? []).map(c => c.toLowerCase())
  const t = (p.type ?? '').toLowerCase()
  const d = (p.description ?? '').toLowerCase()

  if (
    cats.some(c => ['guest_harbor', 'harbor_stop', 'marina', 'fuel'].includes(c)) ||
    t === 'fuel' || t === 'harbor' || t === 'marina' ||
    d.includes('hamn') || d.includes('brygga') || d.includes('gästhamn')
  ) return 'bryggor'

  if (
    t === 'nature_harbor' || t === 'anchorage' ||
    cats.some(c => c === 'nature_harbor' || c === 'anchorage')
  ) return 'naturhamnar'

  if (
    t === 'restaurant' || t === 'bar' || t === 'cafe' || t === 'kafe' ||
    cats.some(c => ['restaurant', 'cafe', 'bar'].includes(c))
  ) return 'krogar'

  return null
}

const FILTER_CONFIG: Record<Filter, { label: string; emoji: string; color: string }> = {
  bryggor:    { label: 'Bryggor',    emoji: '⚓', color: '#1e5c82' },
  krogar:     { label: 'Krogar',     emoji: '🍽', color: '#c96e2a' },
  naturhamnar:{ label: 'Naturhamnar',emoji: '🌿', color: '#0f9e64' },
  rutter:     { label: 'Rutter',     emoji: '🗺️', color: '#7c4d1e' },
  heatmap:    { label: 'Heatmap',    emoji: '🔥', color: '#dc2626' },
}

export default function UpptackClient() {
  const mapRef    = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<typeof import('leaflet') | null>(null)
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null)
  const layerGroupRef  = useRef<import('leaflet').LayerGroup | null>(null)
  const heatLayerRef   = useRef<import('leaflet').Layer | null>(null)
  const routeLayersRef = useRef<import('leaflet').Polyline[]>([])

  const [filters, setFilters] = useState<Set<Filter>>(new Set(['bryggor', 'krogar']))
  const [pois, setPois]     = useState<Poi[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [detail, setDetail] = useState<DetailItem>(null)
  const [mapReady, setMapReady] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch('/api/discovery?type=poi').then(r => r.json()).then(setPois)
    fetch('/api/discovery?type=routes').then(r => r.json()).then(setRoutes)
  }, [])

  // ── Init map ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    import('leaflet').then(L => {
      leafletRef.current = L

      // Fix default icon paths in Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [59.32, 18.5],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        className: 'map-tiles',
      }).addTo(map)

      L.control.attribution({ prefix: '© OpenStreetMap' }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      layerGroupRef.current = L.layerGroup().addTo(map)
      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => {
      mapInstanceRef.current?.remove()
      mapInstanceRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Heatmap fetch on map move ─────────────────────────────────────────────
  const fetchHeat = useCallback(() => {
    const map = mapInstanceRef.current
    const L   = leafletRef.current
    if (!map || !L) return

    const bounds = map.getBounds()
    const zoom   = map.getZoom()
    const url = `/api/discovery?type=heat` +
      `&min_lat=${bounds.getSouth().toFixed(4)}` +
      `&min_lng=${bounds.getWest().toFixed(4)}` +
      `&max_lat=${bounds.getNorth().toFixed(4)}` +
      `&max_lng=${bounds.getEast().toFixed(4)}` +
      `&zoom=${zoom}`

    fetch(url).then(r => r.json()).then((cells: HeatCell[]) => {
      if (heatLayerRef.current) {
        map.removeLayer(heatLayerRef.current)
        heatLayerRef.current = null
      }
      if (!cells?.length) return

      const cellSize = zoom >= 13 ? 0.005 : zoom >= 11 ? 0.02 : zoom >= 9 ? 0.05 : 0.1
      const group = L.layerGroup()

      for (const c of cells) {
        if (c.weight < 0.05) continue
        const opacity = 0.15 + c.weight * 0.65
        const hue = Math.round((1 - c.weight) * 240)
        const color = `hsl(${hue},85%,50%)`

        const bounds2 = L.latLngBounds(
          [c.cell_lat, c.cell_lng],
          [c.cell_lat + cellSize, c.cell_lng + cellSize],
        )
        L.rectangle(bounds2, {
          color: 'transparent',
          fillColor: color,
          fillOpacity: opacity,
          weight: 0,
          interactive: false,
        }).addTo(group)
      }

      group.addTo(map)
      heatLayerRef.current = group
    })
  }, [])

  // ── Map move debounce → re-fetch heat ────────────────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !mapReady) return

    const handler = () => {
      if (!filters.has('heatmap')) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(fetchHeat, 300)
    }

    map.on('moveend', handler)
    map.on('zoomend', handler)
    return () => { map.off('moveend', handler); map.off('zoomend', handler) }
  }, [mapReady, filters, fetchHeat])

  // ── Re-render markers when filters/data change ───────────────────────────
  useEffect(() => {
    const map  = mapInstanceRef.current
    const L    = leafletRef.current
    const group = layerGroupRef.current
    if (!map || !L || !group || !mapReady) return

    group.clearLayers()

    // ── Remove route lines ─────────────────────────────────────────────────
    routeLayersRef.current.forEach(l => map.removeLayer(l))
    routeLayersRef.current = []

    // ── Heatmap toggle ────────────────────────────────────────────────────
    if (!filters.has('heatmap') && heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current)
      heatLayerRef.current = null
    }
    if (filters.has('heatmap') && !heatLayerRef.current) {
      fetchHeat()
    }

    // ── POI markers ───────────────────────────────────────────────────────
    import('leaflet.markercluster').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mc = (L as any).markerClusterGroup({
        maxClusterRadius: 50,
        disableClusteringAtZoom: 14,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
      })

      for (const poi of pois) {
        const cat = poiCategory(poi)
        if (!cat || !filters.has(cat)) continue

        const { color, emoji } = FILTER_CONFIG[cat]
        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:32px;height:32px;border-radius:50%;
            background:${color};
            display:flex;align-items:center;justify-content:center;
            font-size:14px;
            box-shadow:0 2px 8px rgba(0,0,0,0.25);
            border:2px solid rgba(255,255,255,0.9);
          ">${emoji}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const m = L.marker([poi.latitude, poi.longitude], { icon })
        m.on('click', () => setDetail({ ...poi, kind: 'poi' }))
        mc.addLayer(m)
      }

      group.addLayer(mc)
    })

    // ── Route polylines ───────────────────────────────────────────────────
    if (filters.has('rutter')) {
      for (const route of routes) {
        const wps = route.waypoints
        if (!wps?.length) continue
        const latlngs = wps.map(w => [w.lat, w.lng] as [number, number])
        const line = L.polyline(latlngs, {
          color: FILTER_CONFIG.rutter.color,
          weight: 3,
          opacity: 0.7,
          dashArray: '6,4',
        })
        line.on('click', () => setDetail({ ...route, kind: 'route' }))
        line.addTo(map)
        routeLayersRef.current.push(line)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, pois, routes, mapReady])

  function toggleFilter(f: Filter) {
    setFilters(prev => {
      const next = new Set(prev)
      next.has(f) ? next.delete(f) : next.add(f)
      return next
    })
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Map container */}
      <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Filter chips */}
      <div style={{
        position: 'absolute', top: 12, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 6, zIndex: 1000,
        padding: '0 12px',
        overflowX: 'auto',
        maxWidth: '100vw',
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
      }}>
        {(Object.entries(FILTER_CONFIG) as [Filter, typeof FILTER_CONFIG[Filter]][]).map(([key, cfg]) => {
          const active = filters.has(key)
          return (
            <button
              key={key}
              onClick={() => toggleFilter(key)}
              className="press-feedback"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '7px 13px',
                borderRadius: 20,
                border: `2px solid ${active ? cfg.color : 'rgba(255,255,255,0.6)'}`,
                background: active ? cfg.color : 'rgba(255,255,255,0.92)',
                color: active ? '#fff' : '#333',
                fontSize: 12, fontWeight: 600,
                fontFamily: 'inherit',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.15s',
                flexShrink: 0,
              }}
            >
              <span>{cfg.emoji}</span>
              <span>{cfg.label}</span>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      {detail && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          zIndex: 1001,
          background: 'var(--white, #fff)',
          borderRadius: '20px 20px 0 0',
          boxShadow: '0 -4px 32px rgba(0,45,60,0.18)',
          padding: '16px 20px 32px',
          maxHeight: '50vh',
          overflowY: 'auto',
          animation: 'slideUp 0.2s ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px' }}>
                {detail.kind === 'poi'
                  ? (FILTER_CONFIG[poiCategory(detail) ?? 'krogar']?.label ?? 'Plats')
                  : 'Rutt'}
              </p>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', margin: 0, lineHeight: 1.3 }}>{detail.name}</h2>
            </div>
            <button
              onClick={() => setDetail(null)}
              style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--txt3)', padding: '0 0 0 12px', lineHeight: 1 }}
            >×</button>
          </div>

          {detail.kind === 'poi' && detail.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={detail.image_url} alt={detail.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
          )}

          {detail.description && (
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 12px' }}>{detail.description}</p>
          )}

          {detail.kind === 'poi' && detail.island && (
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 8px' }}>📍 {detail.island}</p>
          )}

          {detail.kind === 'route' && detail.distance && (
            <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 8px' }}>
              📏 {detail.distance} nm{detail.difficulty ? ` · ${detail.difficulty}` : ''}
            </p>
          )}

          {detail.kind === 'poi' && detail.slug && (
            <a href={`/platser/${detail.slug}`} style={{
              display: 'inline-block', marginTop: 8,
              padding: '10px 18px', borderRadius: 12,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: '#fff', fontSize: 13, fontWeight: 600,
              textDecoration: 'none',
            }}>
              Visa plats →
            </a>
          )}
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .map-tiles { filter: saturate(0.85) brightness(1.02); }
        [data-theme="dark"] .map-tiles { filter: invert(1) hue-rotate(200deg) saturate(0.7) brightness(0.85); }
      `}</style>
    </div>
  )
}
