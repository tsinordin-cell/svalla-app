'use client'
// CSS importeras direkt — ingen CDN-beroende, ingen race condition
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Marker, Polyline, MarkerClusterGroup, MarkerCluster, DivIconOptions } from 'leaflet'
import type { Restaurant } from '@/lib/supabase'
import type { TourLine } from '@/app/platser/page'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'

type MarkerEntry = {
  marker:     Marker
  cat:        LayerKey
  restaurant: Restaurant
  isActive:   boolean
  nearby:     boolean
}

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
  restaurang: 'var(--sea)',
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
  const d = ((r.description ?? '') + r.name).toLowerCase()
  if (d.includes('kafé') || d.includes('café') || d.includes('fika') || d.includes('bak')) return 'kafe'
  if (d.includes('bensin') || d.includes('bränsle') || d.includes('diesel') || d.includes('mack')) return 'bensin'
  if (d.includes('hotell') || d.includes('vandrarhem') || d.includes('stugor')) return 'boende'
  if (d.includes('hamn') || d.includes('brygga') || d.includes('gästhamn')) return 'hamn'
  return 'restaurang'
}

// ── Pure helper-funktioner på modul-nivå (återskapas inte vid re-render) ─────

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

// Flytt från komponent-scope → modul-scope: ingen re-skapning per render
function makeIconHtml(color: string, size: number, pulse: boolean, emoji: string): DivIconOptions {
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

function buildPopupHtml(r: Restaurant, pos: { lat: number; lng: number } | null): string {
  const nm = pos ? distNM(pos.lat, pos.lng, r.latitude!, r.longitude!) : null
  const distRow = nm != null
    ? `<div style="margin:6px 0 2px;padding:6px 8px;background:rgba(10,123,140,0.07);border-radius:10px;font-size:12px;color:#1e5c82;font-weight:700">
        ⚓ ${nm.toFixed(1)} NM bort · ${etaStr(nm)} vid 5 kn
       </div>`
    : ''
  const whyRow = r.core_experience
    ? `<div style="margin:7px 0 4px;padding:7px 10px;background:rgba(30,92,130,0.07);border-radius:10px;border-left:3px solid rgba(30,92,130,0.3)">
         <div style="font-size:9px;font-weight:800;color:#1e5c82;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px">Varför hit?</div>
         <div style="font-size:12px;color:#2a4a5a;line-height:1.45">${r.core_experience}</div>
       </div>`
    : ''
  const tagsRow = r.tags && r.tags.length > 0
    ? `<div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:6px">
         ${r.tags.slice(0, 4).map((tag: string) =>
           `<span style="padding:3px 8px;background:rgba(10,123,140,0.07);border-radius:12px;font-size:10px;font-weight:600;color:var(--sea)">${tag}</span>`
         ).join('')}
       </div>`
    : ''
  return `
    <div style="font-family:system-ui,sans-serif;min-width:200px">
      <div style="font-weight:800;font-size:14px;color:#162d3a;margin-bottom:3px">${r.name}</div>
      ${r.opening_hours ? `<div style="font-size:11px;color:var(--txt3)">🕐 ${r.opening_hours}</div>` : ''}
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
          style="padding:3px 8px;background:#f2f8fa;color:var(--txt2);border-radius:8px;font-size:11px;text-decoration:none">🚗 Bil</a>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${r.latitude},${r.longitude}&travelmode=walking" target="_blank" rel="noopener noreferrer"
          style="padding:3px 8px;background:#f2f8fa;color:var(--txt2);border-radius:8px;font-size:11px;text-decoration:none">🚶 Gång</a>
      </div>
    </div>
  `
}

// ── Väder-widget ─────────────────────────────────────────────────────────────
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
  if (lat > 60.0)  return 'Arholma'
  if (lat > 59.85) return 'Norra skärgården'
  if (lat > 59.70) { if (lng < 18.6) return 'Norrtälje'; return 'Norrskärgård' }
  if (lat > 59.58) { if (lng < 18.55) return 'Vaxholm'; if (lng < 18.85) return 'Ljusterö'; return 'Mellersta skärgården' }
  if (lat > 59.42) { if (lng < 18.55) return 'Värmdö'; if (lng < 18.85) return 'Möja'; return 'Sandhamnsleden' }
  if (lat > 59.30) { if (lng < 18.45) return 'Stockholm'; if (lng < 18.90) return 'Ingarö'; return 'Sandhamnsleden' }
  if (lat > 59.10) { if (lng < 18.3) return 'Södertälje'; if (lng < 18.65) return 'Ornö'; return 'Södra skärgården' }
  if (lat > 58.90) { if (lng < 18.4) return 'Nynäshamn'; return 'Utö' }
  return 'Skärgården'
}

function WeatherWidget({ lat, lng }: { lat: number; lng: number }) {
  const [weather, setWeather]   = useState<Weather | null>(null)
  const [loading, setLoading]   = useState(false)
  const [fetchFailed, setFetchFailed] = useState(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef    = useRef<AbortController | null>(null)
  const lastFetch   = useRef('')

  useEffect(() => {
    const key = `${lat.toFixed(2)},${lng.toFixed(2)}`
    if (key === lastFetch.current) return

    // Rensa eventuellt pågående debounce + retry
    if (timerRef.current) clearTimeout(timerRef.current)
    if (retryRef.current) clearTimeout(retryRef.current)

    // Återställ felstate direkt när position ändras
    setFetchFailed(false)

    timerRef.current = setTimeout(async () => {
      // Avbryt eventuell pågående request
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      lastFetch.current = key
      setLoading(true)

      const doFetch = async (isRetry = false) => {
        try {
          // 6 sekunders timeout via AbortController
          const timeoutId = setTimeout(() => controller.abort(), 6000)
          const res  = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto`,
            { signal: controller.signal }
          )
          clearTimeout(timeoutId)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const json = await res.json()
          const c = json.current
          setWeather({
            temp:      Math.round(c.temperature_2m),
            code:      c.weather_code,
            windSpeed: Math.round(c.wind_speed_10m * 10) / 10,
            windDir:   c.wind_direction_10m,
          })
          setLoading(false)
        } catch (err: unknown) {
          // Ignorera abort-fel (ny request startad)
          if (err instanceof Error && err.name === 'AbortError') return
          if (!isRetry) {
            // Retry en gång efter 4 sekunder med ny controller
            const retryController = new AbortController()
            abortRef.current = retryController
            retryRef.current = setTimeout(() => doFetch(true), 4000)
          } else {
            setLoading(false)
            setFetchFailed(true)
            lastFetch.current = '' // Tillåt ny retry om användaren kommer tillbaka
          }
        }
      }

      doFetch()
    }, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (retryRef.current) clearTimeout(retryRef.current)
    }
  }, [lat, lng])

  // Abort on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  const kn = weather ? Math.round(weather.windSpeed * 1.944 * 10) / 10 : null
  return (
    <div style={{ position:'absolute', top:10, right:10, zIndex:1100, background:'var(--glass-96)', backdropFilter:'blur(12px)', borderRadius:22, padding:'6px 12px 6px 9px', boxShadow:'0 2px 12px rgba(0,45,60,0.15)', display:'flex', alignItems:'center', gap:6, border:'1px solid rgba(10,123,140,0.12)', opacity:loading ? 0.6 : 1, pointerEvents:'none', transition:'opacity 0.3s' }}>
      <span style={{ fontSize:15, lineHeight:1 }}>{weather ? wmoEmoji(weather.code) : '🌡'}</span>
      <div style={{ display:'flex', flexDirection:'column', gap:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
          {weather
            ? <><span style={{ fontSize:14, fontWeight:700, color:'var(--sea)', lineHeight:1 }}>{weather.temp}°</span><span style={{ fontSize:11, color:'var(--txt2)', fontWeight:700, lineHeight:1 }}>· 💨 {kn} kn {windDirStr(weather.windDir)}</span></>
            : fetchFailed
              ? <span style={{ fontSize:11, color:'var(--txt3)' }}>–°</span>
              : <span style={{ fontSize:11, color:'var(--txt3)' }}>Hämtar väder…</span>
          }
        </div>
        <span style={{ fontSize:9, color:'var(--txt3)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.3px' }}>📍 {getAreaName(lat, lng)}</span>
      </div>
    </div>
  )
}

// ── Huvudkomponent ────────────────────────────────────────────────────────────
export default function PlatserMap({ restaurants, tours = [], activeId, onMarkerClick, onMapMove }: Props) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const mapRef        = useRef<LeafletMap | null>(null)
  const markersRef    = useRef<Record<string, MarkerEntry>>({})
  const clusterRef    = useRef<MarkerClusterGroup | null>(null)
  const polylinesRef  = useRef<Record<string, Polyline>>({})
  const userMarkerRef = useRef<Marker | null>(null)
  const [fullscreen,  setFullscreen]  = useState(false)
  const [locating,    setLocating]    = useState(false)
  const [locateError, setLocateError] = useState<string | null>(null)
  const [userPos,     setUserPos]     = useState<{ lat: number; lng: number } | null>(null)
  const userPosRef    = useRef<{ lat: number; lng: number } | null>(null)
  const [nearbyIds,   setNearbyIds]   = useState<Set<string>>(new Set())
  const [layers,      setLayers]      = useState<Record<LayerKey, boolean>>({
    restaurang: true,
    kafe:       true,
    hamn:       true,
    bensin:     true,
    boende:     true,
  })
  const [showRoutes,      setShowRoutes]      = useState(true)
  const [internalCenter,  setInternalCenter]  = useState({ lat: 59.35, lng: 18.8 })

  // ── Kart-initiering via ResizeObserver ──────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    let initialized = false
    let roInstance: ResizeObserver | null = null
    // Debounce-timer för ResizeObserver (undviker 60 invalidateSize/s under CSS-transition)
    let roDebounce: ReturnType<typeof setTimeout> | null = null

    async function initMap() {
      if (initialized || !containerRef.current || mapRef.current) return
      const { offsetWidth, offsetHeight } = containerRef.current
      if (offsetWidth === 0 || offsetHeight === 0) return

      initialized = true

      const [L] = await Promise.all([
        import('leaflet'),
        import('leaflet.markercluster'),
      ])

      if (!containerRef.current || mapRef.current) return

      const map = L.map(containerRef.current, {
        center:             [59.35, 18.8],
        zoom:               10,
        zoomControl:        true,
        attributionControl: false,
        wheelPxPerZoomLevel: 80,
      })

      // ── Baskartor: CARTO + OpenSeaMap nautiska lager ──────────────────────
      const { url: tileUrl, attr: tileAttr } = baseTile()
      L.tileLayer(tileUrl, {
        attribution: tileAttr,
        maxZoom:     18,
        opacity:     0.85,
        crossOrigin: '',
      }).addTo(map)

      L.tileLayer(SEAMARK_TILE, {
        maxZoom:  18,
        opacity:  0.7,
        crossOrigin: '',
      }).addTo(map)

      mapRef.current = map

      // ── invalidateSize efter nästa frame + extra fallbacks för träga browsers ─
      requestAnimationFrame(() => {
        map.invalidateSize()
        setTimeout(() => { if (mapRef.current) map.invalidateSize() }, 150)
        setTimeout(() => { if (mapRef.current) map.invalidateSize() }, 500)
      })

      // ── MarkerClusterGroup med prestandainställningar ───────────────────────
      const cluster = L.markerClusterGroup({
        maxClusterRadius:        48,
        showCoverageOnHover:     false,
        // chunkedLoading: delar upp rendering i chunks → förhindrar UI-frysning vid många markörer
        chunkedLoading:          true,
        chunkInterval:           100,
        chunkDelay:              50,
        // Sluta clustra vid zoom 16 — visar individuella markörer nära
        disableClusteringAtZoom: 16,
        spiderfyOnMaxZoom:       true,
        iconCreateFunction: (c: MarkerCluster) => {
          const count = c.getChildCount()
          return L.divIcon({
            className: '',
            html: `<div style="
              width:36px;height:36px;border-radius:50%;
              background:var(--grad-sea);
              border:2.5px solid #fff;
              box-shadow:0 2px 10px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
              color:#fff;font-size:12px;font-weight:800;
              font-family:system-ui,sans-serif;
            ">${count}</div>`,
            iconSize:   [36, 36],
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

      // ── Markörer ──────────────────────────────────────────────────────────
      for (const r of restaurants) {
        if (!r.latitude || !r.longitude) continue

        const cat   = getCat(r)
        const color = LAYER_COLORS[cat]
        const emoji = LAYER_LABELS[cat]

         
        const marker = L.marker([r.latitude, r.longitude], {
          icon: L.divIcon(makeIconHtml(color, 34, false, emoji)),
        })
          .bindPopup(buildPopupHtml(r, userPosRef.current), { maxWidth: 280, keepInView: true })

        marker.on('click', () => onMarkerClick(r.id))

        marker.on('mouseover', () => {
          marker.setIcon(L.divIcon(makeIconHtml(color, 42, false, emoji)))
        })
        marker.on('mouseout', () => {
          // FIX: Läs nearby-state från markersRef (inte stale closure)
          const entry = markersRef.current[r.id]
          if (!entry?.isActive) {
            marker.setIcon(L.divIcon(makeIconHtml(color, 34, entry?.nearby ?? false, emoji)))
          }
        })

        cluster.addLayer(marker)
        // FIX: Lägg till 'nearby' fält i markersRef — uppdateras vid GPS-locate
        markersRef.current[r.id] = { marker, cat, restaurant: r, isActive: false, nearby: false }
      }

      // ── Ruttlinjer (polylines) ─────────────────────────────────────────────
      tours.forEach((tour, i) => {
        if (!tour.waypoints || tour.waypoints.length < 2) return
        const color = ROUTE_COLORS[i % ROUTE_COLORS.length]
        const latlngs: [number, number][] = tour.waypoints.map(wp => [wp.lat, wp.lng])

        const line = L.polyline(latlngs, {
          color, weight: 4, opacity: 0.75, lineJoin: 'round', lineCap: 'round',
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui,sans-serif;min-width:180px">
              <div style="font-weight:800;font-size:13px;color:#162d3a;margin-bottom:4px">⛵ ${tour.title}</div>
              <div style="font-size:11px;color:var(--txt3);margin-bottom:8px">${tour.start_location} → ${tour.destination}${tour.duration_label ? ' · ' + tour.duration_label : ''}</div>
              <a href="/rutter/${tour.id}" style="padding:5px 12px;background:#1e5c82;color:#fff;border-radius:10px;font-size:12px;font-weight:700;text-decoration:none">Se rutt →</a>
            </div>`,
            { maxWidth: 240 }
          )

        line.on('mouseover', () => line.setStyle({ weight: 7, opacity: 1 }))
        line.on('mouseout',  () => line.setStyle({ weight: 4, opacity: 0.75 }))
        polylinesRef.current[tour.id] = line
      })
    }

    // ── ResizeObserver med debounce ─────────────────────────────────────────
    // Debounce 80ms förhindrar 60 invalidateSize/s under CSS-transitions (fullscreen)
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      roInstance = new ResizeObserver(() => {
        if (!mapRef.current) {
          initMap()
          return
        }
        if (roDebounce) clearTimeout(roDebounce)
        roDebounce = setTimeout(() => {
          if (mapRef.current) mapRef.current.invalidateSize()
        }, 80)
      })
      roInstance.observe(containerRef.current)
    }

    initMap()

    return () => {
      if (roDebounce) clearTimeout(roDebounce)
      roInstance?.disconnect()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current      = null
        clusterRef.current  = null
        markersRef.current  = {}
        polylinesRef.current = {}
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Synkronisera aktiv markör ────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return
    import('leaflet').then(L => {
      for (const [id, entry] of Object.entries(markersRef.current)) {
        const { marker, cat, restaurant } = entry
        const color    = LAYER_COLORS[cat]
        const emoji    = LAYER_LABELS[cat]
        const isActive = id === activeId
        const pulse    = nearbyIds.has(id) && !isActive

        // Uppdatera nearby i markersRef (fixar mouseout stale closure)
        const cur = markersRef.current[id]
        if (cur) {
          cur.nearby   = nearbyIds.has(id)
          cur.isActive = isActive
        }

        marker.setIcon(L.divIcon(makeIconHtml(color, isActive ? 44 : 34, pulse, emoji)))

        if (isActive) {
          mapRef.current?.panTo(marker.getLatLng(), { animate: true })
          marker.setPopupContent(buildPopupHtml(restaurant, userPosRef.current))
          marker.openPopup()
        }
      }
    })
   
  }, [activeId, nearbyIds])

  // ── Layer-synk (cluster-aware) ───────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !clusterRef.current) return
    const visibleIds = new Set(restaurants.map(r => r.id))
    const cluster = clusterRef.current

    for (const [id, entry] of Object.entries(markersRef.current)) {
      const { marker, cat } = entry
      const show = visibleIds.has(id) && layers[cat]
      const hasLayer = cluster.hasLayer(marker)
      if (show  && !hasLayer) cluster.addLayer(marker)
      if (!show && hasLayer)  cluster.removeLayer(marker)
    }
  }, [restaurants, layers])

  // ── Ruttlinje-synk ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return
    for (const line of Object.values(polylinesRef.current)) {
      if (showRoutes  && !mapRef.current.hasLayer(line)) line.addTo(mapRef.current)
      if (!showRoutes &&  mapRef.current.hasLayer(line)) mapRef.current.removeLayer(line)
    }
  }, [showRoutes])

  // ── Rensa locate-error efter 5 sekunder ─────────────────────────────────
  useEffect(() => {
    if (!locateError) return
    const t = setTimeout(() => setLocateError(null), 5000)
    return () => clearTimeout(t)
  }, [locateError])

  // ── GPS-locate ───────────────────────────────────────────────────────────
  function locateUser() {
    if (!mapRef.current || locating) return
    setLocating(true)
    setLocateError(null)
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        const newPos = { lat, lng }
        userPosRef.current = newPos
        setUserPos(newPos)
        setLocating(false)

        const nearby = new Set<string>()
        for (const r of restaurants) {
          if (!r.latitude || !r.longitude) continue
          if (distNM(lat, lng, r.latitude, r.longitude) <= 2) nearby.add(r.id)
        }
        setNearbyIds(nearby)

        for (const { marker, restaurant } of Object.values(markersRef.current)) {
          marker.setPopupContent(buildPopupHtml(restaurant, newPos))
        }

        const L   = await import('leaflet')
        const map = mapRef.current
        if (!map) return
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
               : '<div style="font-size:11px;color:var(--txt3);margin-top:4px">Inga platser inom 2 NM</div>'
             }`
          )
          .openPopup()

        map.flyTo([lat, lng], 12, { animate: true, duration: 1.2 })
      },
      (err) => {
        setLocating(false)
        // FIX: state-baserat felmeddelande istället för alert() — blockerar inte UI
        const msg = err.code === 1
          ? 'Platsåtkomst nekad. Tillåt åtkomst i webbläsarens inställningar.'
          : err.code === 3
            ? 'Tidsgräns för platsbestämning. Försök igen.'
            : 'Kunde inte hämta din position.'
        setLocateError(msg)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div style={{
      position: fullscreen ? 'fixed' : 'relative',
      inset:    fullscreen ? 0 : undefined,
      width:    fullscreen ? '100vw' : '100%',
      height:   fullscreen ? '100dvh' : '100%',
      zIndex:   fullscreen ? 9000 : undefined,
    }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />

      {/* ── Väder-widget — alltid synlig, även i fullscreen ── */}
      <WeatherWidget lat={internalCenter.lat} lng={internalCenter.lng} />

      {/* ── GPS locate-error — state-baserat, blockerar inte UI ── */}
      {locateError && (
        <div style={{
          position: 'absolute', bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 120px)',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 1200, background: 'rgba(220,38,38,0.95)', color: '#fff',
          padding: '8px 16px', borderRadius: 12, fontSize: 12, fontWeight: 700,
          boxShadow: '0 2px 12px rgba(0,0,0,0.25)', whiteSpace: 'nowrap',
          maxWidth: 'calc(100vw - 32px)', textAlign: 'center',
        }}>
          {locateError}
        </div>
      )}

      {/* ── Layer-toggles — horisontell rad, bottom-left ── */}
      <div style={{
        position:      'absolute',
        bottom:        'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
        left:          12,
        zIndex:        1000,
        display:       'flex',
        flexDirection: 'row',
        gap:           6,
      }}>
        {(Object.keys(LAYER_LABELS) as LayerKey[]).map(key => (
          <button
            key={key}
            onClick={() => setLayers(prev => ({ ...prev, [key]: !prev[key] }))}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            style={{
              width:      36, height: 36, borderRadius: '50%',
              background: layers[key] ? LAYER_COLORS[key] : 'rgba(255,255,255,0.95)',
              border:     `2px solid ${LAYER_COLORS[key]}`,
              cursor:     'pointer',
              boxShadow:  '0 2px 8px rgba(0,0,0,0.18)',
              display:    'flex', alignItems: 'center', justifyContent: 'center',
              fontSize:   15,
              opacity:    layers[key] ? 1 : 0.5,
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
              width:      36, height: 36, borderRadius: '50%',
              background: showRoutes ? '#0f9e64' : 'rgba(255,255,255,0.95)',
              border:     '2px solid #0f9e64',
              cursor:     'pointer',
              boxShadow:  '0 2px 8px rgba(0,0,0,0.18)',
              display:    'flex', alignItems: 'center', justifyContent: 'center',
              fontSize:   15,
              opacity:    showRoutes ? 1 : 0.5,
              transition: 'background .2s, opacity .2s',
              flexShrink: 0,
            }}
          >
            ⛵
          </button>
        )}
      </div>

      {/* ── GPS-knapp — bottom-right ── */}
      <button
        onClick={locateUser}
        title="Visa min position"
        style={{
          position:   'absolute',
          bottom:     'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 64px)',
          right:      12, zIndex: 1000,
          width:      44, height: 44, borderRadius: '50%',
          background: userPos ? 'var(--sea)' : 'var(--white)',
          border:     'none', cursor: locating ? 'default' : 'pointer',
          boxShadow:  '0 2px 12px rgba(0,0,0,0.22)',
          display:    'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .2s',
        }}
      >
        {locating ? (
          <div style={{
            width: 20, height: 20, borderRadius: '50%',
            border: '2px solid rgba(30,92,130,0.2)',
            borderTopColor: 'var(--sea)',
            animation: 'spin 0.8s linear infinite',
          }} />
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke={userPos ? '#fff' : 'var(--sea)'} strokeWidth={2} style={{ width: 20, height: 20 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        )}
      </button>

      {/* ── Fullscreen-knapp — bottom-right ── */}
      <button
        onClick={() => {
          setFullscreen(f => !f)
          // FIX: invalidateSize-kedja täcker hela CSS-transition (50/300/600ms)
          setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize() }, 50)
          setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize() }, 300)
          setTimeout(() => { if (mapRef.current) mapRef.current.invalidateSize() }, 600)
        }}
        title={fullscreen ? 'Stäng fullskärm' : 'Helskärm'}
        style={{
          position:   'absolute',
          bottom:     'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
          right:      12,
          zIndex:     1000, width: 44, height: 44, borderRadius: '50%',
          background: 'var(--white)', border: 'none', cursor: 'pointer',
          boxShadow:  '0 2px 12px rgba(0,0,0,0.2)',
          display:    'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background .2s',
        }}
      >
        {fullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18 }}>
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
