'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { WeatherPill, DestinationPill } from '@/components/MapCornerPills'

type Filter = 'bryggor' | 'krogar' | 'naturhamnar' | 'bensin' | 'bastu' | 'rutter' | 'vader' | 'heatmap'

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

function poiCategory(p: Poi): 'bryggor' | 'krogar' | 'naturhamnar' | 'bensin' | 'bastu' | null {
  const cats = (p.categories ?? []).map(c => c.toLowerCase())
  const t = (p.type ?? '').toLowerCase()
  const n = (p.name ?? '').toLowerCase()
  const d = (p.description ?? '').toLowerCase()

  // Bastu först — ofta kombinerat med brygga/hamn, vill inte tappas
  if (
    t === 'sauna' || t === 'bastu' ||
    cats.some(c => ['sauna', 'bastu'].includes(c)) ||
    n.includes('bastu') || n.includes('sauna') ||
    d.includes('bastubygg') || d.includes('vedeldad bastu') || d.includes('allmän bastu')
  ) return 'bastu'

  // Bensin/fuel — annars fångas den av bryggor
  if (
    t === 'fuel' ||
    cats.includes('fuel') ||
    d.includes('bensin') || d.includes('diesel') || d.includes('drivmedel') || d.includes('tankning') || d.includes('sjömack')
  ) return 'bensin'

  if (
    cats.some(c => ['guest_harbor', 'harbor_stop', 'marina'].includes(c)) ||
    t === 'harbor' || t === 'marina' ||
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

// ── Lucide-style SVG paths (stroke-linecap/linejoin: round, stroke-width: 1.75) ──
const ICON_PATHS = {
  anchor: '<circle cx="12" cy="5" r="3"/><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>',
  utensils: '<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>',
  trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19h6"/><path d="M12 19h0a3 3 0 0 0 5.7-1.2v0a3 3 0 0 0 .3-1.3V14a3 3 0 0 0-3-3"/><path d="M16 11v11"/>',
  route: '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  ruler: '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  fuel: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  sailboat: '<path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z"/><path d="M21 14 10 2 3 14h18Z"/><path d="M10 2v16"/>',
  kayak: '<path d="M3 7c0 4 4 10 9 10s9-6 9-10"/><path d="M12 4v3"/><circle cx="12" cy="3" r="1"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/>',
  map: '<path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0Z"/><path d="M15 5.764v15"/><path d="M9 3.236v15"/>',
  zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
  bike: '<circle cx="18.5" cy="17.5" r="3.5"/><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="15" cy="5" r="1"/><path d="M12 17.5V14l-3-3 4-3 2 3h2"/>',
  footprints: '<path d="M4 16v-2.38c0-.87-.14-1.7-.4-2.45-.26-.75-.32-1.48-.2-2.18.12-.7.32-1.37.6-2 .3-.65.6-1.2 1-1.67.25-.31.56-.59.93-.83.38-.24.77-.36 1.17-.36 1.3 0 2.3.98 3 2.93.7 1.96 1 4.51 1 7.64v1.5"/><path d="M20 20h-4a4 4 0 0 1-4-4V8a2 2 0 1 1 4 0v3.5"/>',
  wind: '<path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>',
  layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  // Bastu = liten stuga med ångvågor ovanför taket
  sauna: '<path d="M8 3c0 1 1.5 1 1.5 2.5S8 7 8 8"/><path d="M13.5 3c0 1 1.5 1 1.5 2.5S13.5 7 13.5 8"/><path d="m3 13 9-6 9 6"/><path d="M5 12v8h14v-8"/><path d="M10 20v-4h4v4"/>',
  calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  ship: '<path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
}

type FilterCfg = { label: string; icon: keyof typeof ICON_PATHS; color: string }

const FILTER_CONFIG: Record<Filter, FilterCfg> = {
  bryggor:     { label: 'Bryggor',     icon: 'anchor',   color: '#1e5c82' },
  krogar:      { label: 'Krogar',      icon: 'utensils', color: '#c96e2a' },
  naturhamnar: { label: 'Naturhamnar', icon: 'trees',    color: '#4a7a2e' },
  bensin:      { label: 'Bensin',      icon: 'fuel',     color: '#a8381e' },
  bastu:       { label: 'Bastu',       icon: 'sauna',    color: '#7a4f2e' },
  rutter:      { label: 'Rutter',      icon: 'route',    color: '#3a4a5a' },
  vader:       { label: 'Väder',       icon: 'wind',     color: '#0a7b8c' },
  heatmap:     { label: 'Heatmap',     icon: 'flame',    color: '#b84728' },
}

// Primära chips ligger alltid synliga i fältraden.
// Sekundära (POI och överlägg) göms bakom "Lager"-menyn.
const PRIMARY_FILTERS:   Filter[] = ['bryggor', 'krogar', 'bensin']
const SECONDARY_FILTERS: Filter[] = ['naturhamnar', 'bastu', 'rutter', 'heatmap']

function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75 }: {
  name: keyof typeof ICON_PATHS
  size?: number
  color?: string
  strokeWidth?: number
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
    />
  )
}

function markerSvg(name: keyof typeof ICON_PATHS, color: string): string {
  return `<div style="
    width:34px;height:34px;border-radius:50%;
    background:${color};
    display:flex;align-items:center;justify-content:center;
    box-shadow:0 2px 8px rgba(0,0,0,0.25);
    border:2px solid #fff;
  "><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name]}</svg></div>`
}

export default function UpptackClient() {
  const router    = useRouter()
  const mapRef    = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<typeof import('leaflet') | null>(null)
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null)
  const layerGroupRef  = useRef<import('leaflet').LayerGroup | null>(null)
  const heatLayerRef   = useRef<import('leaflet').Layer | null>(null)
  const routeLayersRef = useRef<import('leaflet').Polyline[]>([])
  const centerDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [filters, setFilters] = useState<Set<Filter>>(new Set(['bryggor', 'krogar', 'bensin']))
  const [pois, setPois]     = useState<Poi[]>([])
  const [routes, setRoutes] = useState<Route[]>([])
  const [detail, setDetail] = useState<DetailItem>(null)
  const [mapReady, setMapReady] = useState(false)
  const [view, setView] = useState<'map' | 'list'>('map')
  const [query, setQuery] = useState('')
  // Karta-center (debouncat) för väderpill & destinations-avstånd
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 59.32, lng: 18.5 })
  // Vald destination — sätts från POI-detaljpanelen
  const [destination, setDestination] = useState<{ name: string; lat: number; lng: number; label?: string } | null>(null)
  // Lager-meny (Rutter/Väder/Heatmap göms bakom plus-knapp)
  const [layersOpen, setLayersOpen] = useState(false)
  const lagerButtonRef  = useRef<HTMLButtonElement>(null)
  const lagerPopoverRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Stäng Lager-menyn vid klick utanför eller Escape
  useEffect(() => {
    if (!layersOpen) return
    const handleClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (lagerButtonRef.current?.contains(t))  return
      if (lagerPopoverRef.current?.contains(t)) return
      setLayersOpen(false)
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLayersOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown',   handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown',   handleKey)
    }
  }, [layersOpen])

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    fetch('/api/discovery?type=poi').then(r => r.json()).then(d => { if (!cancelled) setPois(d) })
    fetch('/api/discovery?type=routes').then(r => r.json()).then(d => { if (!cancelled) setRoutes(d) })
    return () => { cancelled = true }
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

      const isDark = typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
      const tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      const tileAttr = isDark
        ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        : '&copy; OpenStreetMap contributors'
      L.tileLayer(tileUrl, {
        attribution: tileAttr,
        maxZoom: 18,
        className: 'map-tiles',
      }).addTo(map)

      // Sjökort-overlay (OpenSeaMap)
      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18, opacity: 0.85, crossOrigin: '',
      }).addTo(map)

      L.control.attribution({ prefix: '© OpenStreetMap' }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      layerGroupRef.current = L.layerGroup().addTo(map)
      mapInstanceRef.current = map
      setMapReady(true)
    })

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      if (centerDebounceRef.current) clearTimeout(centerDebounceRef.current)
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

  // ── Map move: uppdatera heat + center (för pills) ────────────────────────
  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map || !mapReady) return

    const updateCenter = () => {
      const c = map.getCenter()
      setMapCenter({ lat: c.lat, lng: c.lng })
    }

    const handler = () => {
      if (filters.has('heatmap')) {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(fetchHeat, 300)
      }
      // Debounce center-uppdatering lite kortare — pill känns då "live"
      if (centerDebounceRef.current) clearTimeout(centerDebounceRef.current)
      centerDebounceRef.current = setTimeout(updateCenter, 250)
    }

    map.on('moveend', handler)
    map.on('zoomend', handler)
    // Init: sätt center direkt så pillar inte står på default-koordinaten
    updateCenter()
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
    // Expose L globally so leaflet.markercluster can attach to it
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).L = L
    import('leaflet.markercluster').then(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mc = (L as any).markerClusterGroup({
        maxClusterRadius: 50,
        disableClusteringAtZoom: 14,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        iconCreateFunction: (cluster: { getChildCount: () => number }) => {
          const count = cluster.getChildCount()
          return L.divIcon({
            html: `<div class="svalla-cluster">${count}</div>`,
            className: 'svalla-cluster-wrap',
            iconSize: [36, 36],
          })
        },
      })

      for (const poi of pois) {
        const cat = poiCategory(poi)
        if (!cat || !filters.has(cat)) continue

        const { color, icon } = FILTER_CONFIG[cat]
        const divIcon = L.divIcon({
          className: '',
          html: markerSvg(icon, color),
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        })

        const m = L.marker([poi.latitude, poi.longitude], { icon: divIcon })
        m.on('click', () => {
          if (poi.slug) {
            router.push(`/plats/${poi.slug}`)
          } else {
            setDetail({ ...poi, kind: 'poi' })
          }
        })
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
          opacity: 0.8,
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
      if (next.has(f)) {
        next.delete(f)
      } else {
        next.add(f)
      }
      return next
    })
  }

  // ── Lista-vy: filtrera POI på aktiva kategorier + sökfråga ──────────────
  const listItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    const activeCats = new Set<Exclude<Filter, 'rutter' | 'vader' | 'heatmap'>>()
    if (filters.has('bryggor'))     activeCats.add('bryggor')
    if (filters.has('krogar'))      activeCats.add('krogar')
    if (filters.has('naturhamnar')) activeCats.add('naturhamnar')
    if (filters.has('bensin'))      activeCats.add('bensin')
    if (filters.has('bastu'))       activeCats.add('bastu')
    // Fallback: om inga POI-kategorier är aktiva, visa alla
    const effective = activeCats.size ? activeCats : new Set(['bryggor', 'krogar', 'naturhamnar', 'bensin', 'bastu'] as const)

    return pois
      .map(p => ({ p, cat: poiCategory(p) }))
      .filter(({ cat }) => cat && effective.has(cat))
      .filter(({ p }) => {
        if (!q) return true
        const hay = `${p.name} ${p.island ?? ''} ${p.description ?? ''}`.toLowerCase()
        return hay.includes(q)
      })
      .sort((a, b) => a.p.name.localeCompare(b.p.name, 'sv'))
  }, [pois, filters, query])

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Map container (alltid monterad — döljs visuellt i list-vy) */}
      <div ref={mapRef} style={{ position: 'absolute', inset: 0 }} />

      {/* View toggle: Karta / Lista */}
      <div
        role="tablist"
        aria-label="Vy"
        className="upptack-viewtoggle"
        style={{
          position: 'absolute', top: 12, left: 12, zIndex: 1001,
          display: 'inline-flex',
          padding: 3,
          borderRadius: 999,
          background: 'var(--glass-92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 1px 3px rgba(0,45,60,0.08), 0 4px 12px rgba(0,45,60,0.06)',
          border: '1px solid rgba(10,45,60,0.12)',
        }}
      >
        {([
          { key: 'map',  label: 'Karta', icon: 'mapPin' as const },
          { key: 'list', label: 'Lista', icon: 'route' as const  },
        ]).map(opt => {
          const active = view === opt.key
          return (
            <button
              key={opt.key}
              role="tab"
              aria-selected={active}
              onClick={() => setView(opt.key as 'map' | 'list')}
              className="press-feedback"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                height: 30, padding: '0 12px',
                border: 'none', borderRadius: 999,
                background: active ? 'var(--sea)' : 'transparent',
                color: active ? '#fff' : 'var(--txt2)',
                fontSize: 12, fontWeight: 700,
                fontFamily: 'inherit', cursor: 'pointer',
                transition: 'background 160ms ease, color 160ms ease',
              }}
            >
              <Icon name={opt.icon} size={14} color={active ? '#fff' : 'var(--txt2)'} strokeWidth={2} />
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* Filter-rad: primära POI-chips (scrollbara) + Lager-knapp (fix) */}
      <div
        role="tablist"
        aria-label="Filter"
        style={{
          position: 'absolute', top: 54, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
          gap: 8, padding: '0 12px',
          pointerEvents: 'none',
        }}
      >
        {/* Scrollbar primär-rad (POI-kategorier) */}
        <div
          style={{
            display: 'flex', gap: 8,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none', scrollbarWidth: 'none',
            pointerEvents: 'auto',
            flexShrink: 1, minWidth: 0,
          }}
        >
          {PRIMARY_FILTERS.map(key => {
            const cfg    = FILTER_CONFIG[key]
            const active = filters.has(key)
            return (
              <button
                key={key}
                onClick={() => toggleFilter(key)}
                role="tab"
                aria-selected={active}
                className="upptack-chip press-feedback"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  height: 30, padding: '0 11px',
                  borderRadius: 999,
                  border: active ? '1px solid transparent' : '1px solid rgba(10,45,60,0.12)',
                  background: active ? cfg.color : 'var(--glass-92)',
                  color: active ? '#fff' : 'var(--txt)',
                  fontSize: 12, fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 1px 3px rgba(0,45,60,0.08), 0 4px 12px rgba(0,45,60,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease',
                  flexShrink: 0,
                }}
              >
                <Icon name={cfg.icon} size={14} color={active ? '#fff' : 'var(--txt)'} />
                <span>{cfg.label}</span>
              </button>
            )
          })}
        </div>

        {/* Lager-knapp (endast på karta) — öppnar popover med Naturhamnar/Bastu/Rutter/Heatmap */}
        {view === 'map' && (() => {
          const activeCount = SECONDARY_FILTERS.reduce((n, k) => n + (filters.has(k) ? 1 : 0), 0)
          return (
            <div style={{ position: 'relative', flexShrink: 0, pointerEvents: 'auto' }}>
              <button
                ref={lagerButtonRef}
                onClick={() => setLayersOpen(v => !v)}
                aria-expanded={layersOpen}
                aria-haspopup="menu"
                aria-label="Lager"
                className="upptack-chip press-feedback"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  height: 30, padding: '0 10px 0 11px',
                  borderRadius: 999,
                  border: layersOpen ? '1px solid transparent' : '1px solid rgba(10,45,60,0.12)',
                  background: layersOpen ? 'var(--sea)' : 'var(--glass-92)',
                  color: layersOpen ? '#fff' : 'var(--txt)',
                  fontSize: 12, fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 1px 3px rgba(0,45,60,0.08), 0 4px 12px rgba(0,45,60,0.06)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease',
                }}
              >
                <Icon name="layers" size={14} color={layersOpen ? '#fff' : 'var(--txt)'} />
                <span>Lager</span>
                {activeCount > 0 ? (
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      minWidth: 18, height: 18, padding: '0 5px',
                      borderRadius: 999,
                      background: layersOpen ? 'rgba(255,255,255,0.26)' : 'var(--sea)',
                      color: '#fff',
                      fontSize: 10, fontWeight: 800, lineHeight: 1,
                      marginLeft: 2,
                    }}
                  >
                    {activeCount}
                  </span>
                ) : (
                  <Icon
                    name="chevronDown"
                    size={14}
                    color={layersOpen ? '#fff' : 'var(--txt2)'}
                    strokeWidth={2.2}
                  />
                )}
              </button>

              {layersOpen && (
                <div
                  ref={lagerPopoverRef}
                  role="menu"
                  aria-label="Kartlager"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)', right: 0,
                    minWidth: 240,
                    background: 'var(--glass-96, rgba(255,255,255,0.96))',
                    border: '1px solid rgba(10,45,60,0.12)',
                    borderRadius: 14,
                    boxShadow: '0 4px 12px rgba(0,45,60,0.10), 0 16px 36px rgba(0,45,60,0.14)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)',
                    padding: 6,
                    zIndex: 1002,
                    animation: 'layers-pop 160ms ease',
                  }}
                >
                  <div style={{
                    padding: '6px 10px 4px',
                    fontSize: 10, fontWeight: 700,
                    color: 'var(--txt3, #8a9aa7)',
                    textTransform: 'uppercase', letterSpacing: '0.6px',
                  }}>
                    Kartlager
                  </div>
                  {SECONDARY_FILTERS.map(key => {
                    const cfg    = FILTER_CONFIG[key]
                    const active = filters.has(key)
                    return (
                      <button
                        key={key}
                        role="menuitemcheckbox"
                        aria-checked={active}
                        onClick={() => toggleFilter(key)}
                        className="press-feedback"
                        style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          width: '100%',
                          padding: '9px 10px',
                          background: active ? `${cfg.color}14` : 'transparent',
                          border: 'none', borderRadius: 10,
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: 'var(--txt)',
                          fontFamily: 'inherit',
                          fontSize: 13, fontWeight: 600,
                          transition: 'background 140ms ease',
                        }}
                      >
                        <span style={{
                          width: 30, height: 30, borderRadius: 9,
                          background: active ? cfg.color : 'rgba(10,45,60,0.08)',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 140ms ease',
                        }}>
                          <Icon name={cfg.icon} size={15} color={active ? '#fff' : 'var(--txt2)'} />
                        </span>
                        <span style={{ flex: 1, lineHeight: 1.2 }}>{cfg.label}</span>
                        {/* Toggle-switch */}
                        <span
                          aria-hidden="true"
                          style={{
                            width: 34, height: 20, borderRadius: 999,
                            background: active ? cfg.color : 'rgba(10,45,60,0.18)',
                            position: 'relative', flexShrink: 0,
                            transition: 'background 160ms ease',
                          }}
                        >
                          <span style={{
                            position: 'absolute', top: 2,
                            left: active ? 16 : 2,
                            width: 16, height: 16, borderRadius: '50%',
                            background: '#fff',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.25)',
                            transition: 'left 160ms ease',
                          }} />
                        </span>
                      </button>
                    )
                  })}
                  <style>{`@keyframes layers-pop { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: none } }`}</style>
                </div>
              )}
            </div>
          )
        })()}
      </div>

      {/* Lista-vy: scrollbar panel ovanpå kartan */}
      {view === 'list' && (
        <div
          className="upptack-listview"
          role="region"
          aria-label="Platser som lista"
          style={{
            position: 'absolute',
            top: 100, left: 0, right: 0, bottom: 0,
            background: 'var(--bg)',
            zIndex: 900,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Sök */}
          <div style={{
            position: 'sticky', top: 0, zIndex: 2,
            background: 'var(--glass-96)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            padding: '12px 14px',
            borderBottom: '1px solid rgba(10,45,60,0.08)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              height: 40, padding: '0 14px',
              borderRadius: 999,
              background: 'var(--white)',
              border: '1px solid rgba(10,45,60,0.12)',
              boxShadow: '0 1px 3px rgba(0,45,60,0.06)',
            }}>
              <Icon name="compass" size={16} color="var(--txt3)" />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Sök plats, ö, eller typ…"
                aria-label="Sök plats"
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  background: 'transparent',
                  fontSize: 14, color: 'var(--txt)',
                  fontFamily: 'inherit',
                }}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  aria-label="Rensa sök"
                  style={{
                    width: 24, height: 24, border: 'none', borderRadius: '50%',
                    background: 'rgba(0,45,60,0.06)', color: 'var(--txt2)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', flexShrink: 0, padding: 0,
                  }}
                >
                  <Icon name="x" size={12} strokeWidth={2} />
                </button>
              )}
            </div>
            <p style={{
              fontSize: 11, color: 'var(--txt3)', margin: '8px 2px 0',
              fontWeight: 500,
            }}>
              {listItems.length} {listItems.length === 1 ? 'plats' : 'platser'}
              {query ? ` för "${query}"` : ''}
            </p>
          </div>

          {/* Lista */}
          <div style={{
            maxWidth: 720, margin: '0 auto', padding: '10px 12px 40px',
          }}>
            {listItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--txt3)' }}>
                <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                  <Icon name="compass" size={36} color="var(--txt3)" strokeWidth={1.5} />
                </div>
                <p style={{ fontSize: 14, margin: 0 }}>
                  Inga platser matchar filter eller sök.
                </p>
              </div>
            ) : (
              listItems.map(({ p, cat }) => {
                const cfg = cat ? FILTER_CONFIG[cat] : null
                return (
                  <button
                    key={p.id}
                    onClick={() => p.slug ? router.push(`/plats/${p.slug}`) : setDetail({ ...p, kind: 'poi' })}
                    className="upptack-listcard press-feedback"
                    style={{
                      display: 'flex', alignItems: 'stretch', gap: 12,
                      width: '100%', textAlign: 'left',
                      padding: 10, marginBottom: 8,
                      background: 'var(--white)',
                      border: '1px solid rgba(10,45,60,0.08)',
                      borderRadius: 14,
                      cursor: 'pointer',
                      fontFamily: 'inherit', color: 'var(--txt)',
                    }}
                  >
                    {/* Bild eller ikon-badge */}
                    <div style={{
                      flexShrink: 0,
                      width: 72, height: 72,
                      borderRadius: 10,
                      background: cfg ? cfg.color : 'var(--glass-88)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden',
                    }}>
                      {p.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image_url}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : cfg ? (
                        <Icon name={cfg.icon} size={28} color="#fff" strokeWidth={2} />
                      ) : null}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      {cfg && (
                        <span style={{
                          display: 'inline-block',
                          fontSize: 10, fontWeight: 700,
                          color: cfg.color,
                          textTransform: 'uppercase', letterSpacing: '0.6px',
                          marginBottom: 2,
                        }}>
                          {cfg.label}
                        </span>
                      )}
                      <span style={{
                        fontSize: 15, fontWeight: 700, color: 'var(--txt)',
                        lineHeight: 1.25,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {p.name}
                      </span>
                      {p.island && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          fontSize: 12, color: 'var(--txt3)',
                          marginTop: 2,
                        }}>
                          <Icon name="mapPin" size={11} color="var(--txt3)" />
                          {p.island}
                        </span>
                      )}
                      {p.description && (
                        <span style={{
                          fontSize: 12, color: 'var(--txt2)',
                          lineHeight: 1.4, marginTop: 4,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          {p.description}
                        </span>
                      )}
                    </div>

                    <div style={{
                      flexShrink: 0, alignSelf: 'center',
                      color: 'var(--txt3)',
                    }}>
                      <Icon name="arrowRight" size={18} strokeWidth={2} color="var(--txt3)" />
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Detail panel */}
      {detail && (
        <div
          className="upptack-sheet"
          role="dialog"
          aria-label={detail.name}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 4px' }}>
                {detail.kind === 'poi'
                  ? (FILTER_CONFIG[poiCategory(detail) ?? 'krogar']?.label ?? 'Plats')
                  : 'Rutt'}
              </p>
              <h2 style={{ fontSize: 19, fontWeight: 700, color: 'var(--txt)', margin: 0, lineHeight: 1.25 }}>{detail.name}</h2>
            </div>
            <button
              onClick={() => setDetail(null)}
              aria-label="Stäng"
              style={{
                width: 36, height: 36, flexShrink: 0,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,45,60,0.06)', border: 'none', borderRadius: '50%',
                cursor: 'pointer', color: 'var(--txt2)',
              }}
            >
              <Icon name="x" size={18} strokeWidth={2} />
            </button>
          </div>

          {detail.kind === 'poi' && detail.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={detail.image_url}
              alt={detail.name}
              style={{
                width: '100%',
                aspectRatio: '3 / 2',
                objectFit: 'cover',
                borderRadius: 14,
                marginBottom: 14,
                display: 'block',
              }}
            />
          )}

          {detail.description && (
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 12px' }}>
              {detail.description}
            </p>
          )}

          {detail.kind === 'poi' && detail.island && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--txt3)', margin: '0 0 10px' }}>
              <Icon name="mapPin" size={14} color="var(--txt3)" />
              {detail.island}
            </p>
          )}

          {detail.kind === 'route' && detail.distance && (
            <p style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--txt2)', margin: '0 0 10px' }}>
              <Icon name="ruler" size={14} color="var(--txt2)" />
              {detail.distance} nm{detail.difficulty ? ` · ${detail.difficulty}` : ''}
            </p>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
            {detail.kind === 'poi' && (
              <button
                onClick={() => {
                  const cat = poiCategory(detail)
                  const label = cat ? FILTER_CONFIG[cat].label : null
                  setDestination({
                    name:  detail.name,
                    lat:   detail.latitude,
                    lng:   detail.longitude,
                    label: label ?? undefined,
                  })
                  setDetail(null)
                }}
                className="press-feedback"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  height: 44, padding: '0 18px',
                  borderRadius: 22, border: 'none',
                  background: 'var(--sea)',
                  color: '#fff', fontSize: 14, fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                }}
              >
                <Icon name="mapPin" size={15} color="#fff" strokeWidth={2} />
                Sätt som destination
              </button>
            )}
            {detail.kind === 'route' && detail.waypoints?.length > 0 && (
              <button
                onClick={() => {
                  const last = detail.waypoints[detail.waypoints.length - 1]
                  setDestination({
                    name:  last.name ?? detail.name,
                    lat:   last.lat,
                    lng:   last.lng,
                    label: 'Slutpunkt',
                  })
                  setDetail(null)
                }}
                className="press-feedback"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  height: 44, padding: '0 18px',
                  borderRadius: 22, border: 'none',
                  background: 'var(--sea)',
                  color: '#fff', fontSize: 14, fontWeight: 600,
                  fontFamily: 'inherit', cursor: 'pointer',
                }}
              >
                <Icon name="mapPin" size={15} color="#fff" strokeWidth={2} />
                Sätt slutpunkt som destination
              </button>
            )}

            {detail.kind === 'poi' && detail.slug && (
              <a
                href={`/plats/${detail.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  height: 44, padding: '0 18px',
                  borderRadius: 22,
                  background: 'rgba(10,45,60,0.06)',
                  color: 'var(--txt)', fontSize: 14, fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(10,45,60,0.10)',
                }}
              >
                Visa plats
                <Icon name="arrowRight" size={16} color="var(--txt)" strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Hörn-pills — väder & destination (nedre högra hörnet) */}
      {view === 'map' && (
        <div
          style={{
            position: 'absolute',
            bottom: 80,   // ovanför nav-baren (~64px) + lite luft
            right: 12,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: 8,
            pointerEvents: 'none',  // barn (pills) har egna pointerEvents
            maxWidth: 'calc(100vw - 24px)',
          }}
        >
          <WeatherPill lat={mapCenter.lat} lng={mapCenter.lng} />
          {destination && (
            <DestinationPill
              destination={destination}
              mapCenter={mapCenter}
              onGo={() => {
                const m = mapInstanceRef.current
                if (m) m.flyTo([destination.lat, destination.lng], Math.max(m.getZoom(), 13), { duration: 0.8 })
              }}
              onClear={() => setDestination(null)}
            />
          )}
        </div>
      )}
    </div>
  )
}
