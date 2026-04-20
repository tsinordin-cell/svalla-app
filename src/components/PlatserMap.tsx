'use client'
// CSS importeras direkt — ingen CDN-beroende, ingen race condition
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useRef, useState, useCallback } from 'react'
import type { Restaurant } from '@/lib/supabase'
import type { TourLine } from '@/app/platser/page'

interface Props {
  restaurants: Restaurant[]
  tours?: TourLine[]
  activeId: string | null
  onMarkerClick: (id: string) => void
  onMapMove?: (lat: number, lng: number) => void
}

const ROUTE_COLORS = ['#0f9e64', '#1e5c82', '#c96e2a', '#7c4d1e', '#2d7d8a', '#6b3fa0']

type LayerKey = 'restaurang' | 'kafe' | 'hamn' | 'bensin' | 'boende'

const LAYER_COLORS: Record<LayerKey, string> = {
  restaurang: '#1e5c82',
  kafe:       '#7c4d1e',
  hamn:       '#c96e2a',
  bensin:     '#dc2626',
  boende:     '#0f9e64',
}

const LAYER_LABELS: Record<LayerKey, string> = {
  restaurang: '🍽',
  kafe:       '☕',
  hamn:       '⚓',
  bensin:     '⛽',
  boende:     '🛏',
}

function getCat(r: Restaurant): LayerKey {
  const t = (r.type ?? '').toLowerCase()
  if (t === 'fuel') return 'bensin'
  if (t === 'accommodation') return 'boende'
  if (t === 'cafe') return 'kafe'
  if (t === 'bar' || t === 'restaurant') return 'restaurang'
  // Fallback: gissa från text
  const d = ((r.description ?? '') + r.name).toLowerCase()
  if (d.includes('kafé') || d.includes('café') || d.includes('fika') || d.includes('bak')) return 'kafe'
  if (d.includes('bensin') || d.includes('bränsle') || d.includes('diesel') || d.includes('mack')) return 'bensin'
  if (d.includes('hotell') || d.includes('vandrarhem') || d.includes('stugor')) return 'boende'
  if (d.includes('hamn') || d.includes('brygga') || d.includes('gästhamn')) return 'hamn'
  return 'restaurang'
}

// Helper functions outside component to avoid recreating on every render
function distNM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3440.065
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

function etaStr(nm: number): string {
  const h = nm / 5
  if (h < 1) return `ca ${Math.round(h * 60)} min`
  return `ca ${h.toFixed(1).replace('.', ',')}h`
}

function buildPopupHtml(r: Restaurant, pos: { lat: number; lng: number } | null): string {
  const nm = pos ? distNM(pos.lat, pos.lng, r.latitude!, r.longitude!) : null
  const distRow = nm != null
    ? `<div style="margin:6px 0 2px;padding:6px 8px;background:rgba(10,123,140,0.07);border-radius:10px;font-size:12px;color:#1e5c82;font-weight:700">
        ⚓ ${nm.toFixed(1)} NM bort · ${etaStr(nm)} vid 5 kn
       </div>`
    : ''
  // core_experience — "Varför hit?" i popup
  const whyRow = r.core_experience
    ? `<div style="margin:7px 0 4px;padding:7px 10px;background:rgba(30,92,130,0.07);border-radius:10px;border-left:3px solid rgba(30,92,130,0.3)">
         <div style="font-size:9px;font-weight:800;color:#1e5c82;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">Varför hit?</div>
         <div style="font-size:12px;color:#2a4a5a;line-height:1.45">${r.core_experience}</div>
       </div>`
    : ''
  // tags
  const tagsRow = r.tags && r.tags.length > 0
    ? `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px">
         ${r.tags.slice(0, 4).map((tag: string) =>
           `<span style="padding:3px 8px;background:rgba(10,123,140,0.07);border-radius:12px;font-size:10px;font-weight:600;color:#2d6a82">${tag}</span>`
         ).join('')}
       </div>`
    : ''
  return `
    <div style="font-family:system-ui,sans-serif;min-width:200px">
      <div style="font-weight:800;font-size:14px;color:#162d3a;margin-bottom:3px">${r.name}</div>
      ${r.opening_hours ? `<div style="font-size:11px;color:#7a9dab">🕐 ${r.opening_hours}</div>` : ''}
      ${whyRow}
      ${tagsRow}
      ${distRow}
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
        <a href="/platser/${r.id}" style="padding:5px 12px;background:#1e5c82;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none">Visa →</a>
        <a href="https://map.openseamap.org/?zoom=13&lat=${r.latitude}&lon=${r.longitude}" target="_blank" rel="noopener noreferrer"
          style="padding:5px 12px;background:rgba(10,123,140,0.12);color:#1e5c82;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none">
          ⚓ Sjökort
        </a>
      </div>
      <div style="margin-top:6px;display:flex;gap:4px;flex-wrap:wrap">
        <a href="https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}&travelmode=driving" target="_blank" rel="noopener noreferrer"
          style="padding:3px 8px;background:#f2f8fa;color:#5a8090;border-radius:8px;font-size:11px;text-decoration:none">🚗 Bil</a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}&travelmode=walking" target="_blank" rel="noopener noreferrer"
          style="padding:3px 8px;background:#f2f8fa;color:#5a8090;border-radius:8px;font-size:11px;text-decoration:none">🚶 Gång</a>
      </div>
    </div>
  `
}

// ── Väder-widget (inbyggd i kartan — synlig även i fullscreen) ───────────────
interface Weather { temp: number; code: number; windSpeed: number; windDir: number }
const WMO: Record<number, { emoji: string }> = {
  0:{emoji:'☀️'},1:{emoji:'🌤'},2:{emoji:'⛅'},3:{emoji:'☁️'},
  45:{emoji:'🌫'},48:{emoji:'🌫'},51:{emoji:'🌦'},53:{emoji:'🌦'},
  61:{emoji:'🌧'},63:{emoji:'🌧'},71:{emoji:'🌨'},80:{emoji:'🌦'},
  81:{emoji:'🌦'},95:{emoji:'⛈'},
}
function wmoEmoji(code: number) { return (WMO[code] ?? WMO[Math.floor(code/10)*10] ?? {emoji:'🌡'}).emoji }
function windDirStr(deg: number) { return ['N','NO','Ö','SO','S','SV','V','NV'][Math.round(deg/45)%8] }
function getAreaName(lat: number, lng: number): string {
  // Norra skärgården
  if (lat > 60.0)  return 'Arholma'
  if (lat > 59.85) return 'Norra skärgården'
  if (lat > 59.70) { if (lng < 18.6) return 'Norrtälje'; return 'Norrskärgård' }
  if (lat > 59.58) { if (lng < 18.55) return 'Vaxholm'; if (lng < 18.85) return 'Ljusterö'; return 'Mellersta skärgården' }
  // Mellersta
  if (lat > 59.42) { if (lng < 18.55) return 'Värmdö'; if (lng < 18.85) return 'Möja'; return 'Sandhamnsleden' }
  if (lat > 59.30) { if (lng < 18.45) return 'Stockholm'; if (lng < 18.75) return 'Ingarö'; return 'Sandhamn' }
  // Södra
  if (lat > 59.10) { if (lng < 18.3) return 'Södertälje'; if (lng < 18.65) return 'Ornö'; return 'Södra skärgården' }
  if (lat > 58.90) { if (lng < 18.4) return 'Nynäshamn'; return 'Utö' }
  return 'Skärgården'
}
function WeatherWidget({ lat, lng }: { lat: number; lng: number }) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastFetch = useRef('')
  useEffect(() => {
    const key = `${lat.toFixed(2)},${lng.toFixed(2)}`
    if (key === lastFetch.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      lastFetch.current = key; setLoading(true)
      try {
        const res  = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto`)
        const json = await res.json(); const c = json.current
        setWeather({ temp: Math.round(c.temperature_2m), code: c.weather_code, windSpeed: Math.round(c.wind_speed_10m*10)/10, windDir: c.wind_direction_10m })
      } catch { /* tyst */ } finally { setLoading(false) }
    }, 600)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [lat, lng])
  const kn = weather ? Math.round(weather.windSpeed * 1.944 * 10) / 10 : null
  return (
    <div style={{ position:'absolute', top:10, right:10, zIndex:1100, background:'var(--glass-96)', backdropFilter:'blur(12px)', borderRadius:22, padding:'6px 12px 6px 9px', boxShadow:'0 2px 12px rgba(0,45,60,0.15)', display:'flex', alignItems:'center', gap:6, border:'1px solid rgba(10,123,140,0.12)', opacity:loading ? 0.6 : 1, pointerEvents:'none', transition:'opacity 0.3s' }}>
      <span style={{ fontSize:15, lineHeight:1 }}>{weather ? wmoEmoji(weather.code) : '🌡'}</span>
      <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          {weather
            ? <><span style={{ fontSize:14, fontWeight:900, color:'#1e5c82', lineHeight:1 }}>{weather.temp}°</span><span style={{ fontSize:11, color:'#5a8090', fontWeight:700, lineHeight:1 }}>· 💨 {kn} kn {windDirStr(weather.windDir)}</span></>
            : <span style={{ fontSize:11, color:'#7a9dab' }}>Hämtar väder…</span>
          }
        </div>
        <span style={{ fontSize:9, color:'#7a9dab', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3px' }}>📍 {getAreaName(lat, lng)}</span>
      </div>
    </div>
  )
}

// CSS laddas via direktimport ovan — waitForCSS behövs inte längre

export default function PlatserMap({ restaurants, tours = [], activeId, onMarkerClick, onMapMove }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef        = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef    = useRef<Record<string, any>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clusterRef    = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylinesRef  = useRef<Record<string, any>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userMarkerRef = useRef<any>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [locating,   setLocating]   = useState(false)
  const [userPos,    setUserPos]    = useState<{ lat: number; lng: number } | null>(null)
  const userPosRef   = useRef<{ lat: number; lng: number } | null>(null)
  const [nearbyIds,  setNearbyIds]  = useState<Set<string>>(new Set())
  const [layers,     setLayers]     = useState<Record<LayerKey, boolean>>({
    restaurang: true,
    kafe:       true,
    hamn:       true,
    bensin:     true,
    boende:     true,
  })
  const [showRoutes, setShowRoutes] = useState(true)
  const [internalCenter, setInternalCenter] = useState({ lat: 59.35, lng: 18.8 })

  function makeIconHtml(color: string, size: number, pulse: boolean, emoji: string): object {
    const pulseRing = pulse
      ? `<div style="
            position:absolute;top:50%;left:50%;
            transform:translate(-50%,-50%);
            width:${size + 16}px;height:${size + 16}px;
            border-radius:50%;
            border:2.5px solid ${color};
            animation:svalla-pulse 1.8s ease-out infinite;
            pointer-events:none;
          "></div>`
      : ''
    return {
      className: '',
      html: `<div style="position:relative;width:${size + 20}px;height:${size + 20}px;display:flex;align-items:center;justify-content:center">
        ${pulseRing}
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:${color};
          border:2.5px solid #fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.25);
          display:flex;align-items:center;justify-content:center;
          font-size:${Math.round(size * 0.45)}px;
        ">${emoji}</div>
      </div>`,
      iconSize:   [size + 20, size + 20],
      iconAnchor: [(size + 20) / 2, (size + 20) / 2],
    }
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let initialized = false
    let roInstance: ResizeObserver | null = null

    async function initMap() {
      // Guard: bara en initiering, och bara när containern faktiskt har dimensioner
      if (initialized || !containerRef.current || mapRef.current) return
      const { offsetWidth, offsetHeight } = containerRef.current
      if (offsetWidth === 0 || offsetHeight === 0) return

      initialized = true

      const [L] = await Promise.all([
        import('leaflet'),
        import('leaflet.markercluster'),
      ])

      // Dubbelkolla att komponenten fortfarande är monterad
      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center: [59.35, 18.8],
        zoom: 10,
        zoomControl: true,
        attributionControl: false,
        wheelPxPerZoomLevel: 80,
      })

      // ── Baskartor: OSM + OpenSeaMap nautiska lager ──────────────
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 0.85,
      }).addTo(map)

      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18,
        opacity: 0.7,
      }).addTo(map)

      mapRef.current = map

      // ── invalidateSize efter nästa frame — garanterat korrekt layout ──
      requestAnimationFrame(() => {
        map.invalidateSize()
        // Extra säkerhets-invalidation för träga mobilwebbläsare
        setTimeout(() => { if (mapRef.current) map.invalidateSize() }, 150)
        setTimeout(() => { if (mapRef.current) map.invalidateSize() }, 500)
      })

      // ── MarkerClusterGroup ──────────────────────────────────────
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cluster = (L as any).markerClusterGroup({
        maxClusterRadius: 48,
        showCoverageOnHover: false,
        iconCreateFunction: (c: any) => {
          const count = c.getChildCount()
          return L.divIcon({
            className: '',
            html: `<div style="
              width:36px;height:36px;border-radius:50%;
              background:linear-gradient(135deg,#1e5c82,#2d7d8a);
              border:2.5px solid #fff;
              box-shadow:0 2px 10px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
              color:#fff;font-size:12px;font-weight:800;
              font-family:system-ui,sans-serif;
            ">${count}</div>`,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
          })
        },
      })
      cluster.addTo(map)
      clusterRef.current = cluster

      function reportCenter() {
        const c = map.getCenter()
        onMapMove?.(c.lat, c.lng)
        setInternalCenter({ lat: c.lat, lng: c.lng })
      }
      map.on('moveend', reportCenter)
      map.on('zoomend', reportCenter)
      reportCenter()

      for (const r of restaurants) {
        if (!r.latitude || !r.longitude) continue

        const cat   = getCat(r)
        const color = LAYER_COLORS[cat]
        const emoji = LAYER_LABELS[cat]

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const marker = L.marker([r.latitude, r.longitude], {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          icon: L.divIcon(makeIconHtml(color, 34, false, emoji) as any),
        })
          .bindPopup(buildPopupHtml(r, userPosRef.current), { maxWidth: 280 })

        marker.on('click', () => onMarkerClick(r.id))

        marker.on('mouseover', () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          marker.setIcon(L.divIcon(makeIconHtml(color, 42, false, emoji) as any))
        })
        marker.on('mouseout', () => {
          const isActive = markersRef.current[r.id]?.isActive
          if (!isActive) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            marker.setIcon(L.divIcon(makeIconHtml(color, 34, nearbyIds.has(r.id), emoji) as any))
          }
        })

        cluster.addLayer(marker)
        markersRef.current[r.id] = { marker, cat, restaurant: r, isActive: false }
      }

      // ── Ruttlinjer (polylines) ──────────────────────────────────
      tours.forEach((tour, i) => {
        if (!tour.waypoints || tour.waypoints.length < 2) return
        const color = ROUTE_COLORS[i % ROUTE_COLORS.length]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const latlngs = tour.waypoints.map((wp: any) => [wp.lat, wp.lng])

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const line = (L as any).polyline(latlngs, {
          color, weight: 4, opacity: 0.75, lineJoin: 'round', lineCap: 'round',
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;min-width:180px">
              <div style="font-weight:800;font-size:13px;color:#162d3a;margin-bottom:4px">⛵ ${tour.title}</div>
              <div style="font-size:11px;color:#7a9dab;margin-bottom:8px">${tour.start_location} → ${tour.destination}${tour.duration_label ? ' · ' + tour.duration_label : ''}</div>
              <a href="/rutter/${tour.id}" style="padding:5px 12px;background:#1e5c82;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none">Se rutt →</a>
            </div>`,
            { maxWidth: 240 }
          )

        line.on('mouseover', () => line.setStyle({ weight: 7, opacity: 1 }))
        line.on('mouseout',  () => line.setStyle({ weight: 4, opacity: 0.75 }))
        polylinesRef.current[tour.id] = line
      })
    }

    // ── ResizeObserver: det rätta sättet att hantera container-dimensioner ──
    // Initierar kartan när containern får sina första dimensioner.
    // Därefter: kallar invalidateSize() vid varje resize (fullscreen, sidbar, etc.)
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      roInstance = new ResizeObserver(() => {
        if (!mapRef.current) {
          initMap()
        } else {
          mapRef.current.invalidateSize()
        }
      })
      roInstance.observe(containerRef.current)
    }

    // Försök också direkt — om containern redan har dimensioner
    initMap()

    return () => {
      roInstance?.disconnect()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        clusterRef.current = null
        markersRef.current = {}
        polylinesRef.current = {}
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Synkronisera aktiv markör
  useEffect(() => {
    if (!mapRef.current) return
    import('leaflet').then(L => {
      for (const [id, entry] of Object.entries(markersRef.current)) {
        const { marker, cat, restaurant } = entry as { marker: unknown; cat: LayerKey; restaurant: Restaurant; isActive: boolean }
        const color   = LAYER_COLORS[cat]
        const emoji   = LAYER_LABELS[cat]
        const isActive = id === activeId
        const pulse   = nearbyIds.has(id) && !isActive
        const size    = isActive ? 44 : 34
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(marker as any).setIcon(L.divIcon(makeIconHtml(color, size, pulse, emoji) as any))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(markersRef.current[id] as any).isActive = isActive
        if (isActive) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mapRef.current.panTo((marker as any).getLatLng(), { animate: true })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(marker as any).setPopupContent(buildPopupHtml(restaurant, userPosRef.current))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(marker as any).openPopup()
        }
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, nearbyIds])

  // Layer-synk (cluster-aware) — sökning hanteras av parent via restaurants-prop
  useEffect(() => {
    if (!mapRef.current || !clusterRef.current) return
    const visibleIds = new Set(restaurants.map(r => r.id))
    const cluster = clusterRef.current

    for (const [id, entry] of Object.entries(markersRef.current)) {
      const { marker, cat } = entry as { marker: unknown; cat: LayerKey; restaurant: Restaurant }
      const show = visibleIds.has(id) && layers[cat as LayerKey]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasLayer = cluster.hasLayer(marker as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (show  && !hasLayer) cluster.addLayer(marker as any)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!show && hasLayer)  cluster.removeLayer(marker as any)
    }
  }, [restaurants, layers])

  // Ruttlinje-synk
  useEffect(() => {
    if (!mapRef.current) return
    for (const line of Object.values(polylinesRef.current)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (showRoutes && !mapRef.current.hasLayer(line)) (line as any).addTo(mapRef.current)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!showRoutes && mapRef.current.hasLayer(line)) mapRef.current.removeLayer(line as any)
    }
  }, [showRoutes])

  function locateUser() {
    if (!mapRef.current || locating) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        const newPos = { lat, lng }
        userPosRef.current = newPos
        setUserPos(newPos)
        setLocating(false)

        // Markera platser inom 2 NM med pulsring
        const nearby = new Set<string>()
        for (const r of restaurants) {
          if (!r.latitude || !r.longitude) continue
          if (distNM(lat, lng, r.latitude, r.longitude) <= 2) nearby.add(r.id)
        }
        setNearbyIds(nearby)

        // Uppdatera popup-distanser
        for (const { marker, restaurant } of Object.values(markersRef.current)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(marker as any).setPopupContent(buildPopupHtml(restaurant as Restaurant, newPos))
        }

        const L   = await import('leaflet')
        const map = mapRef.current
        if (userMarkerRef.current) map.removeLayer(userMarkerRef.current)

        const userIcon = L.divIcon({
          className: '',
          html: `<div style="
            width:20px;height:20px;border-radius:50%;
            background:#2563eb;
            border:3px solid #fff;
            box-shadow:0 0 0 4px rgba(37,99,235,0.25),0 2px 8px rgba(0,0,0,0.2);
          "></div>`,
          iconSize:   [20, 20],
          iconAnchor: [10, 10],
        })

        userMarkerRef.current = L.marker([lat, lng], { icon: userIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-weight:700;font-size:13px">📍 Du är här</div>
             ${nearby.size > 0
               ? `<div style="font-size:11px;color:#1e5c82;margin-top:4px">⚓ ${nearby.size} plats${nearby.size === 1 ? '' : 'er'} inom 2 NM</div>`
               : '<div style="font-size:11px;color:#7a9dab;margin-top:4px">Inga platser inom 2 NM</div>'
             }`
          )
          .openPopup()

        map.flyTo([lat, lng], 12, { animate: true, duration: 1.2 })
      },
      () => {
        setLocating(false)
        alert('Kunde inte hämta din position. Kontrollera att du gett webbläsaren platsåtkomst.')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      inset: fullscreen ? 0 : undefined,
      width: fullscreen ? '100vw' : '100%',
      height: fullscreen ? '100dvh' : '100%',
      zIndex: fullscreen ? 9000 : undefined,
    }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* ── Väder-widget — alltid synlig, även i fullscreen ── */}
      <WeatherWidget lat={internalCenter.lat} lng={internalCenter.lng} />

      {/* ── Layer-toggles — horisontell rad, bottom-left ── */}
      <div style={{
        position: 'absolute',
        bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
        left: 12,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
      }}>
        {(Object.keys(LAYER_LABELS) as LayerKey[]).map(key => (
          <button
            key={key}
            onClick={() => setLayers(prev => ({ ...prev, [key]: !prev[key] }))}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: layers[key] ? LAYER_COLORS[key] : 'rgba(255,255,255,0.95)',
              border: `2px solid ${LAYER_COLORS[key]}`,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
              opacity: layers[key] ? 1 : 0.5,
              transition: 'background .2s, opacity .2s',
              flexShrink: 0,
            }}
          >
            {LAYER_LABELS[key]}
          </button>
        ))}
        {tours.length > 0 && (
          <button
            onClick={() => setShowRoutes(r => !r)}
            title="Rutter"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: showRoutes ? '#0f9e64' : 'rgba(255,255,255,0.95)',
              border: '2px solid #0f9e64',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
              opacity: showRoutes ? 1 : 0.5,
              transition: 'background .2s, opacity .2s',
              flexShrink: 0,
            }}
          >
            ⛵
          </button>
        )}
      </div>

      {/* ── GPS-knapp — bottom-right, 64px från botten ── */}
      <button
        onClick={locateUser}
        title="Visa min position"
        style={{
          position: 'absolute',
          bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 64px)',
          right: 12, zIndex: 1000,
          width: 44, height: 44, borderRadius: '50%',
          background: userPos ? '#1e5c82' : '#fff',
          border: 'none', cursor: locating ? 'default' : 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.22)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .2s',
        }}
      >
        {locating ? (
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            border: '2px solid rgba(30,92,130,0.2)',
            borderTopColor: '#1e5c82',
            animation: 'spin 0.8s linear infinite',
          }} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke={userPos ? '#fff' : '#1e5c82'} strokeWidth={2} style={{ width: 20, height: 20 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        )}
      </button>

      {/* ── Fullscreen-knapp — bottom-right, 12px från botten ── */}
      <button
        onClick={() => { setFullscreen(f => !f); setTimeout(() => mapRef.current?.invalidateSize(), 50) }}
        title={fullscreen ? 'Stäng fullskärm' : 'Helskärm'}
        style={{
          position: 'absolute',
          bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
          right: 12,
          zIndex: 1000, width: 44, height: 44, borderRadius: '50%',
          background: 'var(--white, #fff)', border: 'none', cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .2s',
        }}
      >
        {fullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes svalla-pulse {
          0%   { transform: translate(-50%,-50%) scale(1);   opacity: 0.7; }
          70%  { transform: translate(-50%,-50%) scale(2);   opacity: 0;   }
          100% { transform: translate(-50%,-50%) scale(2);   opacity: 0;   }
        }
      `}</style>
    </div>
  )
}
