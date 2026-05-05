'use client'
/**
 * UpptackExplorer — STF-style split discovery view.
 *
 * Vänster: filterbar lista med kort (foto + namn + plats + kategori).
 * Höger:  Leaflet-karta med clustered pins, alltid synlig på desktop.
 *
 * Två-vägs koppling:
 *   - Pannar/zoomar karta → listan filtreras till bbox
 *   - Klick på listrad → karta flyger dit + popup öppnas
 *   - Klick på pin → motsvarande kort scrollas in i listan + highlight
 *
 * URL-state (?typ=&q=&bbox=) synkas så delningar fungerar.
 *
 * Mobile: tab-toggle "Karta" / "Lista" — bottom-sheet kommer i v2.
 */

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { baseTile, SEAMARK_TILE } from '@/lib/map-tiles'
import { WeatherPill } from '@/components/MapCornerPills'

// ── Types ────────────────────────────────────────────────────────────────
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

type Category = 'krog' | 'hamn' | 'naturhamn' | 'bastu' | 'bensin' | 'annat'

interface Bounds {
  swLat: number; swLng: number; neLat: number; neLng: number
}

// ── Kategori-mapper ──────────────────────────────────────────────────────
function categorize(p: Poi): Category {
  const cats = (p.categories ?? []).map(c => c.toLowerCase())
  const t = (p.type ?? '').toLowerCase()
  const n = (p.name ?? '').toLowerCase()
  const d = (p.description ?? '').toLowerCase()

  if (
    t === 'sauna' || t === 'bastu' ||
    cats.some(c => ['sauna', 'bastu'].includes(c)) ||
    n.includes('bastu') || n.includes('sauna')
  ) return 'bastu'

  if (
    t === 'fuel' || t === 'fuel_station' ||
    cats.includes('fuel') || cats.includes('bransle') ||
    d.includes('bensin') || d.includes('diesel') || d.includes('drivmedel')
  ) return 'bensin'

  if (
    cats.some(c => ['guest_harbor', 'harbor_stop', 'marina'].includes(c)) ||
    t === 'harbor' || t === 'marina' ||
    d.includes('gästhamn') || d.includes('marina')
  ) return 'hamn'

  if (
    t === 'nature_harbor' || t === 'anchorage' ||
    cats.some(c => c === 'nature_harbor' || c === 'anchorage')
  ) return 'naturhamn'

  if (
    t === 'restaurant' || t === 'bar' || t === 'cafe' || t === 'kafe' ||
    cats.some(c => ['restaurant', 'cafe', 'bar'].includes(c))
  ) return 'krog'

  return 'annat'
}

const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  krog:       { label: 'Krogar',      color: '#c96e2a' },
  hamn:       { label: 'Gästhamnar',  color: '#1d4ed8' },
  naturhamn:  { label: 'Naturhamnar', color: '#0a7b3c' },
  bastu:      { label: 'Bastu',       color: '#9d174d' },
  bensin:     { label: 'Bensin',      color: '#525252' },
  annat:      { label: 'Annat',       color: '#6b7280' },
}

// Inline SVG-paths per kategori — diskreta, monokromatiska, fungerar
// både som placeholder-fyllning på listrad och som key-figur i empty-state.
const CATEGORY_ICONS: Record<Category, string> = {
  // bestick
  krog:      '<path d="M3 2v7c0 1.1.9 2 2 2v11M5 11a2 2 0 0 0 2-2V2M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>',
  // ankare
  hamn:      '<circle cx="12" cy="5" r="3"/><path d="M12 8v14"/><path d="M5 15a7 7 0 0 0 14 0"/>',
  // träd
  naturhamn: '<path d="M12 2 7 9h3l-3 5h3l-2 3h8l-2-3h3l-3-5h3z"/><path d="M12 17v5"/>',
  // bastu (stuga + ångvågor)
  bastu:     '<path d="M8 3c0 1 1.5 1 1.5 2.5S8 7 8 8M14 3c0 1 1.5 1 1.5 2.5S14 7 14 8"/><path d="m3 13 9-6 9 6"/><path d="M5 12v8h14v-8"/>',
  // bensinpump
  bensin:    '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  // map-pin (fallback)
  annat:     '<path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
}

const FILTER_CHIPS: Array<{ id: 'all' | Category; label: string }> = [
  { id: 'all',       label: 'Allt' },
  { id: 'krog',      label: 'Krogar' },
  { id: 'hamn',      label: 'Hamnar' },
  { id: 'naturhamn', label: 'Naturhamnar' },
  { id: 'bastu',     label: 'Bastu' },
  { id: 'bensin',    label: 'Bensin' },
]

// ── Custom pin (SVG som divIcon) ─────────────────────────────────────────
// Pin = färgad droppe med kategori-ikon inuti vit cirkel.
// Användaren ska kunna se DIREKT på kartan vad för typ av plats det är,
// utan att behöva klicka eller hovra.
function pinHtml(color: string, iconSvg: string, isActive = false): string {
  const scale = isActive ? 1.25 : 1
  const ring = isActive
    ? `<circle cx="16" cy="16" r="15" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>`
    : ''
  return `
    <div style="transform:scale(${scale});transform-origin:center bottom;transition:transform .18s ease;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35))">
      <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        ${ring}
        <path d="M16 0 C7 0 0 7 0 16 C0 25 16 40 16 40 C16 40 32 25 32 16 C32 7 25 0 16 0 Z" fill="${color}"/>
        <circle cx="16" cy="14" r="9" fill="#fff"/>
        <g transform="translate(7.6 5.6) scale(0.7)" stroke="${color}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round">
          ${iconSvg}
        </g>
      </svg>
    </div>
  `
}

// ── Initial map view (Stockholms skärgård som default) ───────────────────
const INITIAL_CENTER: [number, number] = [59.35, 18.95]
const INITIAL_ZOOM = 9

// ── Komponent ────────────────────────────────────────────────────────────
export default function UpptackExplorer() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Data state
  const [pois, setPois] = useState<Poi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [filter, setFilter] = useState<'all' | Category>(
    () => (searchParams.get('typ') as 'all' | Category) ?? 'all'
  )
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')

  // Map state
  // bounds        = live från Leaflet (uppdateras vid varje pan/zoom)
  // appliedBounds = vad listan faktiskt filtrerar på (uppdateras när
  //                 användaren trycker "Sök i denna vy")
  // → Diff mellan dem styr om "Sök i denna vy"-knappen visas.
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [appliedBounds, setAppliedBounds] = useState<Bounds | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  // Karta-center (debouncat) för WeatherPill
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: INITIAL_CENTER[0], lng: INITIAL_CENTER[1] })

  // GPS-state — "Visa min plats"
  const [gpsState, setGpsState] = useState<'idle' | 'loading' | 'active' | 'denied'>('idle')
  const gpsMarkerRef = useRef<{ remove?: () => void } | null>(null)
  const gpsAccCircleRef = useRef<{ remove?: () => void } | null>(null)

  // Mobile state
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list')

  // Collapse-state (desktop): sidobaren kan gömmas så kartan får hela bredden.
  // Persisteras i localStorage så valet kommer ihåg mellan sessioner.
  const [listCollapsed, setListCollapsed] = useState<boolean>(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    setListCollapsed(window.localStorage.getItem('upx-list-collapsed') === '1')
  }, [])

  // Refs
  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<unknown>(null)
  const clusterRef = useRef<unknown>(null)
  const markersRef = useRef<Map<string, unknown>>(new Map())
  const listScrollRef = useRef<HTMLDivElement>(null)

  // ── Hämta POIs från API ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    fetch('/api/discovery?type=poi')
      .then(r => {
        if (r.status === 401) {
          throw new Error('Logga in för att se Upptäck-kartan')
        }
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data: Poi[]) => {
        if (cancelled) return
        // Filtrera bort POIs utan eller med korrupta koordinater.
        // Skandinavien ligger ungefär i 54-70°N och 5-25°E. (0,0) är öppet
        // hav söder om Ghana — vanlig "default-koordinat" från trasig data.
        const valid = (data ?? []).filter(p =>
          typeof p.latitude === 'number' &&
          typeof p.longitude === 'number' &&
          Number.isFinite(p.latitude) &&
          Number.isFinite(p.longitude) &&
          p.latitude > 54 && p.latitude < 70 &&
          p.longitude > 5 && p.longitude < 25
        )
        setPois(valid)
        setLoading(false)
      })
      .catch(err => {
        if (cancelled) return
        setError(err.message ?? 'Kunde inte ladda platser')
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  // ── Filtrerad lista (kategori + sök + appliedBounds) ───────────────────
  const filteredPois = useMemo(() => {
    const q = query.trim().toLowerCase()
    return pois.filter(p => {
      // Kategori
      if (filter !== 'all' && categorize(p) !== filter) return false
      // Sök
      if (q) {
        const hay = `${p.name ?? ''} ${p.island ?? ''} ${p.description ?? ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      // Bounds — bara när användaren tryckt "Sök i denna vy"
      if (appliedBounds) {
        if (
          p.latitude < appliedBounds.swLat || p.latitude > appliedBounds.neLat ||
          p.longitude < appliedBounds.swLng || p.longitude > appliedBounds.neLng
        ) return false
      }
      return true
    })
  }, [pois, filter, query, appliedBounds])

  // Visa "Sök i denna vy" när live-bounds skiljer sig märkbart från
  // applied (användaren har panorerat sedan senaste sökning)
  const showSearchHere = useMemo(() => {
    if (!bounds) return false
    if (!appliedBounds) return true // första gången — uppmana till klick
    const dLat = Math.abs(bounds.swLat - appliedBounds.swLat) +
                 Math.abs(bounds.neLat - appliedBounds.neLat)
    const dLng = Math.abs(bounds.swLng - appliedBounds.swLng) +
                 Math.abs(bounds.neLng - appliedBounds.neLng)
    return dLat + dLng > 0.05 // ~5km tröskel, inte spam vid mikro-pan
  }, [bounds, appliedBounds])

  // Förb #2: räkna POIs per kategori (för chip-labels)
  // Räknas på alla pois (matchande sök), oavsett kategori-filter,
  // så användaren ser totalt antal per kategori.
  const categoryCounts = useMemo(() => {
    const q = query.trim().toLowerCase()
    const counts: Record<'all' | Category, number> = {
      all: 0, krog: 0, hamn: 0, naturhamn: 0, bastu: 0, bensin: 0, annat: 0,
    }
    for (const p of pois) {
      if (q) {
        const hay = `${p.name} ${p.island ?? ''} ${p.description ?? ''}`.toLowerCase()
        if (!hay.includes(q)) continue
      }
      if (appliedBounds) {
        if (
          p.latitude < appliedBounds.swLat || p.latitude > appliedBounds.neLat ||
          p.longitude < appliedBounds.swLng || p.longitude > appliedBounds.neLng
        ) continue
      }
      counts.all++
      counts[categorize(p)]++
    }
    return counts
  }, [pois, query, appliedBounds])

  // ── URL-sync (debounced så vi inte spammar history) ────────────────────
  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams()
      if (filter !== 'all') params.set('typ', filter)
      if (query.trim()) params.set('q', query.trim())
      const qs = params.toString()
      router.replace(qs ? `/upptack?${qs}` : '/upptack', { scroll: false })
    }, 250)
    return () => clearTimeout(id)
  }, [filter, query, router])

  // ── Init Leaflet ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet.markercluster')
      if (cancelled || !mapDivRef.current) return

      const map = L.map(mapDivRef.current, {
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        zoomControl: false,
        attributionControl: false,
      })
      const tile = baseTile()
      L.tileLayer(tile.url, { maxZoom: 18, attribution: tile.attr }).addTo(map)
      // Sjökorts-overlay — sänkt opacity så Svallas pins dominerar visuellt
      L.tileLayer(SEAMARK_TILE, { opacity: 0.45, maxZoom: 18 }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      // Cluster — markercluster augmenterar L runtime; cast så TS är glad
      const Lany = L as unknown as { markerClusterGroup: (opts: object) => unknown }
      const cluster = Lany.markerClusterGroup({
        chunkedLoading: true,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 14,
        // Dynamisk radius — bredare clusters när vi ser hela skärgården,
        // tightare när vi zoomat in (annars är clusters meningslösa)
        maxClusterRadius: (zoom: number) => {
          if (zoom < 9)  return 80
          if (zoom > 12) return 30
          return 50
        },
        iconCreateFunction: (c: { getChildCount: () => number }) => {
          const n = c.getChildCount()
          return L.divIcon({
            html: `<div style="background:#1e5c82;color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;font-family:'Inter',sans-serif;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">${n}</div>`,
            className: 'svalla-cluster',
            iconSize: [34, 34],
          })
        },
      })
      map.addLayer(cluster as Parameters<typeof map.addLayer>[0])

      // Bounds tracking — kolla isValid() så vi inte sätter NaN-bounds
      // (kan hända före karta är fullt initialiserad och då filtreras
      // hela listan bort i ett förvirrande blink)
      const updateBounds = () => {
        const b = map.getBounds()
        if (!b.isValid()) return
        setBounds({
          swLat: b.getSouthWest().lat,
          swLng: b.getSouthWest().lng,
          neLat: b.getNorthEast().lat,
          neLng: b.getNorthEast().lng,
        })
        const c = map.getCenter()
        setMapCenter({ lat: c.lat, lng: c.lng })
      }
      map.on('moveend', updateBounds)
      map.on('zoomend', updateBounds)
      updateBounds()

      mapRef.current = map
      clusterRef.current = cluster
    })()
    // Cleanup: rensa Leaflet-instans + cluster vid unmount så vi inte
    // läcker DOM-noder och event-listeners (markercluster är tung).
    // Kopiera ref-Map till lokal variabel — annars varnar React att
    // refen kan ha ändrats vid cleanup (i vårt fall säker, men fix:at).
    const markersMap = markersRef.current
    return () => {
      cancelled = true
      const m = mapRef.current as { remove?: () => void } | null
      if (m?.remove) m.remove()
      mapRef.current = null
      clusterRef.current = null
      markersMap.clear()
    }
  }, [])

  // ── Uppdatera markörer när data eller filter ändras ────────────────────
  useEffect(() => {
    if (!mapRef.current || !clusterRef.current) return
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled) return
      const cluster = clusterRef.current as { clearLayers: () => void; addLayers: (m: unknown[]) => void }
      cluster.clearLayers()
      markersRef.current.clear()

      // Markörer på kartan följer ENDAST kategori + sök (inte appliedBounds).
      // Annars skulle pinnar försvinna när användaren panorerar bort, vilket
      // gör det omöjligt att se vad som finns i intilliggande områden.
      const visiblePois = pois.filter(p => {
        if (filter !== 'all' && categorize(p) !== filter) return false
        if (query.trim()) {
          const hay = `${p.name} ${p.island ?? ''} ${p.description ?? ''}`.toLowerCase()
          if (!hay.includes(query.trim().toLowerCase())) return false
        }
        return true
      })

      const newMarkers = visiblePois.map(p => {
        const cat = categorize(p)
        const color = CATEGORY_META[cat].color
        const icon = L.divIcon({
          html: pinHtml(color, CATEGORY_ICONS[cat], false),
          className: 'svalla-pin',
          iconSize: [32, 40],
          iconAnchor: [16, 40],
          popupAnchor: [0, -36],
        })
        const m = L.marker([p.latitude, p.longitude], { icon })
        // Stash POI på markören så hover-effekten kan läsa kategorin
        ;(m as unknown as { _poi: Poi })._poi = p
        m.bindPopup(`
          <div style="min-width:180px;font-family:'Inter',sans-serif">
            <div style="font-weight:700;font-size:13px;color:#162d3a;margin-bottom:2px">${p.name}</div>
            <div style="font-size:11px;color:#6a8a96;margin-bottom:6px">${CATEGORY_META[cat].label}${p.island ? ' &middot; ' + p.island : ''}</div>
            ${p.slug ? `<a href="/platser/${p.slug}" style="color:#1e5c82;font-size:12px;font-weight:600;text-decoration:none">Se mer &rarr;</a>` : ''}
          </div>
        `)
        m.on('click', () => {
          setHoveredId(p.id)
          // Scrolla in motsvarande kort
          const el = document.getElementById(`upptack-card-${p.id}`)
          if (el && listScrollRef.current) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        })
        markersRef.current.set(p.id, m)
        return m
      })
      cluster.addLayers(newMarkers)
    })()
    return () => { cancelled = true }
  }, [pois, filter, query])

  // ── Hover-state: uppdatera pin-icon med isActive-styling ──────────────
  // När hoveredId ändras (lista-hover eller pin-klick) byter vi ut den
  // aktiva markörens icon mot den med ringen runt — och återställer den
  // tidigare. Använder dynamisk leaflet-import så vi inte breakar SSR.
  const lastHoveredRef = useRef<string | null>(null)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const L = (await import('leaflet')).default
      if (cancelled) return

      // Återställ tidigare aktiv pin
      const prev = lastHoveredRef.current
      if (prev && prev !== hoveredId) {
        const m = markersRef.current.get(prev) as { _poi?: Poi; setIcon?: (icon: unknown) => void } | undefined
        if (m?._poi && m.setIcon) {
          const cat = categorize(m._poi)
          m.setIcon(L.divIcon({
            html: pinHtml(CATEGORY_META[cat].color, CATEGORY_ICONS[cat], false),
            className: 'svalla-pin',
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -36],
          }))
        }
      }
      // Sätt ny aktiv
      if (hoveredId) {
        const m = markersRef.current.get(hoveredId) as { _poi?: Poi; setIcon?: (icon: unknown) => void } | undefined
        if (m?._poi && m.setIcon) {
          const cat = categorize(m._poi)
          m.setIcon(L.divIcon({
            html: pinHtml(CATEGORY_META[cat].color, CATEGORY_ICONS[cat], true),
            className: 'svalla-pin svalla-pin-active',
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -36],
          }))
        }
      }
      lastHoveredRef.current = hoveredId
    })()
    return () => { cancelled = true }
  }, [hoveredId])

  // ── Mobile tab-byte: vid switch till "map" måste Leaflet få veta att
  // dess container nu har storlek (var display:none innan). Annars
  // renderas pinnar på fel position eller kartan blir helt grå.
  const switchMobileTab = useCallback((tab: 'list' | 'map') => {
    setMobileTab(tab)
    if (tab === 'map') {
      // Vänta en tick så DOM hunnit uppdateras
      setTimeout(() => {
        const m = mapRef.current as { invalidateSize?: () => void } | null
        m?.invalidateSize?.()
      }, 50)
    }
  }, [])

  // ── Förb #1: applicera nuvarande karta-bounds till listan ──────────────
  const applyCurrentBounds = useCallback(() => {
    if (!bounds) return
    setAppliedBounds(bounds)
  }, [bounds])

  // ── GPS: "Visa min plats" — centrera + blå punkt med accuracy-cirkel ───
  const handleGps = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return
    if (gpsState === 'denied') return
    const map = mapRef.current as { flyTo?: (latlng: [number, number], zoom: number, opts?: object) => void; getZoom?: () => number } | null
    if (!map) return

    setGpsState('loading')
    const L = (await import('leaflet')).default

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords
        // Rensa tidigare GPS-grafik
        gpsMarkerRef.current?.remove?.()
        gpsAccCircleRef.current?.remove?.()
        // Accuracy-cirkel om rimlig
        if (accuracy && accuracy < 2000) {
          const circle = L.circle([lat, lng], {
            radius: accuracy,
            color: '#3b82f6',
            fillColor: '#3b82f6',
            fillOpacity: 0.08,
            weight: 1,
            opacity: 0.35,
            interactive: false,
          })
          ;(circle as unknown as { addTo: (m: unknown) => unknown }).addTo(mapRef.current)
          gpsAccCircleRef.current = circle as unknown as { remove?: () => void }
        }
        // Blå GPS-prick med vit ring
        const dot = L.circleMarker([lat, lng], {
          radius: 7, fillColor: '#3b82f6', fillOpacity: 1,
          color: '#fff', weight: 2.5, opacity: 1,
        })
        ;(dot as unknown as { addTo: (m: unknown) => unknown }).addTo(mapRef.current)
        gpsMarkerRef.current = dot as unknown as { remove?: () => void }

        const z = map.getZoom?.() ?? 13
        map.flyTo?.([lat, lng], Math.max(z, 13), { duration: 0.9 })
        setGpsState('active')
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGpsState('denied')
        else setGpsState('idle')
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 }
    )
  }, [gpsState])

  // ── Toggle sidobar (desktop) — Leaflet behöver invalidateSize ──────────
  const toggleList = useCallback(() => {
    setListCollapsed(prev => {
      const next = !prev
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('upx-list-collapsed', next ? '1' : '0')
      }
      // Vänta tills CSS-transition börjat så Leaflet räknar om container
      setTimeout(() => {
        const m = mapRef.current as { invalidateSize?: () => void } | null
        m?.invalidateSize?.()
      }, 280) // matchar grid-transition-duration
      return next
    })
  }, [])

  // ── Förb #3: reset till hela skärgården ────────────────────────────────
  const resetView = useCallback(() => {
    const m = mapRef.current as { flyTo?: (latlng: [number, number], zoom: number, opts?: object) => void } | null
    m?.flyTo?.(INITIAL_CENTER, INITIAL_ZOOM, { duration: 0.8 })
    setAppliedBounds(null)
  }, [])

  // ── Klick på listrad → fly till plats ──────────────────────────────────
  const flyTo = useCallback(async (poi: Poi) => {
    if (!mapRef.current) return
    const map = mapRef.current as { flyTo: (latlng: [number, number], zoom: number, opts?: object) => void }
    map.flyTo([poi.latitude, poi.longitude], 15, { duration: 0.8 })
    setHoveredId(poi.id)
    // Öppna popup efter fly
    setTimeout(() => {
      const m = markersRef.current.get(poi.id) as { openPopup?: () => void } | undefined
      m?.openPopup?.()
    }, 850)
  }, [])

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="upx-shell">
      {/* Header med filter + sök */}
      <header className="upx-header">
        <div className="upx-filters">
          {FILTER_CHIPS.map(c => {
            const count = categoryCounts[c.id]
            return (
              <button
                key={c.id}
                type="button"
                className={`upx-chip ${filter === c.id ? 'active' : ''}`}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
                {count > 0 && <span className="upx-chip-count">{count}</span>}
              </button>
            )
          })}
        </div>
        <div className="upx-search">
          <input
            type="text"
            placeholder="Sök plats, ö eller hamn…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className="upx-clear" onClick={() => setQuery('')} aria-label="Rensa">×</button>
          )}
        </div>
      </header>

      {/* Mobile-tabs */}
      <div className="upx-mob-tabs">
        <button
          type="button"
          className={`upx-mob-tab ${mobileTab === 'list' ? 'active' : ''}`}
          onClick={() => switchMobileTab('list')}
        >Lista <span className="upx-count">{filteredPois.length}</span></button>
        <button
          type="button"
          className={`upx-mob-tab ${mobileTab === 'map' ? 'active' : ''}`}
          onClick={() => switchMobileTab('map')}
        >Karta</button>
      </div>

      {/* Split-layout */}
      <div className={`upx-split ${listCollapsed ? 'list-collapsed' : ''}`}>
        {/* Lista */}
        <aside
          className={`upx-list ${mobileTab === 'list' ? 'mob-show' : 'mob-hide'}`}
          ref={listScrollRef}
        >
          <div className="upx-list-meta">
            <span className="upx-list-count">{filteredPois.length} platser i denna vy</span>
            <button
              type="button"
              className="upx-list-toggle"
              onClick={toggleList}
              aria-label="Göm sidobar"
              title="Göm sidobar"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
          </div>

          {loading && (
            <div className="upx-skeletons">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="upx-skeleton" />
              ))}
            </div>
          )}

          {error && (
            <div className="upx-empty">
              <p>{error}</p>
              {error.includes('Logga in') && (
                <Link href="/logga-in?returnTo=/upptack" className="upx-empty-cta">Logga in</Link>
              )}
            </div>
          )}

          {!loading && !error && filteredPois.length === 0 && (
            <div className="upx-empty">
              <p>Inga platser här. Panorera kartan eller justera filtret.</p>
            </div>
          )}

          {!loading && !error && filteredPois.map(p => {
            const cat = categorize(p)
            const meta = CATEGORY_META[cat]
            return (
              <button
                key={p.id}
                id={`upptack-card-${p.id}`}
                type="button"
                onClick={() => flyTo(p)}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`upx-card ${hoveredId === p.id ? 'hovered' : ''}`}
              >
                <div className="upx-card-img">
                  {p.image_url ? (
                    <Image src={p.image_url} alt={p.name} fill sizes="120px" style={{ objectFit: 'cover' }} />
                  ) : (
                    <div
                      className="upx-card-placeholder"
                      style={{ background: meta.color }}
                      dangerouslySetInnerHTML={{
                        __html: `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${CATEGORY_ICONS[cat]}</svg>`,
                      }}
                    />
                  )}
                </div>
                <div className="upx-card-body">
                  <div className="upx-card-title">{p.name}</div>
                  <div className="upx-card-meta">
                    <span className="upx-card-cat" style={{ color: meta.color }}>{meta.label}</span>
                    {p.island && <span className="upx-card-island">· {p.island}</span>}
                  </div>
                  {p.description && (
                    <div className="upx-card-desc">{p.description.slice(0, 80)}{p.description.length > 80 ? '…' : ''}</div>
                  )}
                </div>
              </button>
            )
          })}
        </aside>

        {/* Karta */}
        <div className={`upx-map-wrap ${mobileTab === 'map' ? 'mob-show' : 'mob-hide'}`}>
          <div ref={mapDivRef} className="upx-map" />
          {/* Återöppna-flik (visas bara när lista collapsad) */}
          {listCollapsed && (
            <button
              type="button"
              className="upx-list-reopen"
              onClick={toggleList}
              aria-label="Visa lista"
              title="Visa lista"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
              <span className="upx-list-reopen-label">Lista ({filteredPois.length})</span>
            </button>
          )}
          {/* Förb #1: "Sök i denna vy" — top-center på kartan */}
          {showSearchHere && (
            <button
              type="button"
              className="upx-search-here"
              onClick={applyCurrentBounds}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
              Sök i denna vy
            </button>
          )}
          {/* Förb #3: reset-zoom — bottom-right */}
          {appliedBounds && (
            <button
              type="button"
              className="upx-reset"
              onClick={resetView}
              aria-label="Visa hela skärgården"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              </svg>
              Hela skärgården
            </button>
          )}

          {/* "Visa min plats" — bottom-left på kartan */}
          <button
            type="button"
            className={`upx-locate ${gpsState}`}
            onClick={handleGps}
            disabled={gpsState === 'loading'}
            aria-label={gpsState === 'denied' ? 'GPS-åtkomst nekad' : 'Visa min position'}
            title={gpsState === 'denied' ? 'GPS nekad — aktivera i webbläsarens inställningar' : 'Visa min position'}
          >
            {gpsState === 'loading' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'upxSpin 1s linear infinite' }}>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
            ) : gpsState === 'denied' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
              </svg>
            )}
          </button>

          {/* Vädervisare — top-left på kartan */}
          <div className="upx-weather-wrap">
            <WeatherPill lat={mapCenter.lat} lng={mapCenter.lng} />
          </div>
        </div>
      </div>

      {/* Inline styles — Svalla design tokens */}
      <style dangerouslySetInnerHTML={{ __html: `
        .upx-shell {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          background: var(--bg);
          padding-bottom: calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px));
        }
        .upx-header {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px 18px 12px;
          background: var(--white);
          border-bottom: 1px solid rgba(10, 123, 140, 0.08);
          z-index: 10;
        }
        .upx-filters {
          display: flex;
          gap: 6px;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .upx-filters::-webkit-scrollbar { display: none; }
        .upx-chip {
          background: rgba(10, 123, 140, 0.06);
          border: 1px solid rgba(10, 123, 140, 0.1);
          color: var(--txt2);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 7px 14px;
          border-radius: 20px;
          cursor: pointer;
          white-space: nowrap;
          transition: 0.15s;
        }
        .upx-chip:hover {
          background: rgba(10, 123, 140, 0.12);
          color: var(--txt);
        }
        .upx-chip.active {
          background: var(--sea, #1e5c82);
          color: #fff;
          border-color: var(--sea, #1e5c82);
        }
        .upx-chip-count {
          background: rgba(255, 255, 255, 0.18);
          color: inherit;
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          margin-left: 6px;
          letter-spacing: 0;
        }
        .upx-chip:not(.active) .upx-chip-count {
          background: rgba(10, 123, 140, 0.12);
          color: var(--txt3);
        }
        .upx-search {
          position: relative;
        }
        .upx-search input {
          width: 100%;
          background: rgba(10, 123, 140, 0.05);
          border: 1px solid rgba(10, 123, 140, 0.1);
          border-radius: 12px;
          padding: 11px 38px 11px 14px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: var(--txt);
          outline: none;
          transition: 0.15s;
        }
        .upx-search input:focus {
          background: var(--white);
          border-color: var(--sea, #1e5c82);
          box-shadow: 0 0 0 3px rgba(30, 92, 130, 0.1);
        }
        .upx-clear {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.06);
          border: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          font-size: 18px;
          line-height: 1;
          color: var(--txt3);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .upx-clear:hover { background: rgba(0, 0, 0, 0.12); color: var(--txt); }

        .upx-mob-tabs {
          display: none;
          padding: 8px 18px;
          background: var(--white);
          border-bottom: 1px solid rgba(10, 123, 140, 0.06);
          gap: 8px;
        }
        .upx-mob-tab {
          flex: 1;
          background: rgba(10, 123, 140, 0.06);
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--txt2);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .upx-mob-tab.active {
          background: var(--sea, #1e5c82);
          color: #fff;
        }
        .upx-count {
          background: rgba(255, 255, 255, 0.25);
          color: inherit;
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
        }

        .upx-split {
          display: grid;
          grid-template-columns: minmax(320px, 360px) 1fr;
          flex: 1;
          min-height: 0;
          transition: grid-template-columns 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .upx-split.list-collapsed {
          grid-template-columns: 0 1fr;
        }
        .upx-split.list-collapsed .upx-list {
          opacity: 0;
          pointer-events: none;
          padding-left: 0;
          padding-right: 0;
        }
        .upx-list {
          background: var(--bg);
          overflow-y: auto;
          padding: 16px 14px 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-right: 1px solid rgba(10, 123, 140, 0.08);
        }
        .upx-list-meta {
          padding: 0 4px 4px;
          font-size: 11px;
          color: var(--txt3);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .upx-list-toggle {
          background: rgba(10, 123, 140, 0.06);
          border: 1px solid rgba(10, 123, 140, 0.1);
          color: var(--txt2);
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.15s;
          flex-shrink: 0;
        }
        .upx-list-toggle:hover {
          background: var(--sea, #1e5c82);
          color: #fff;
          border-color: var(--sea, #1e5c82);
        }

        .upx-list-reopen {
          position: absolute;
          top: 18px;
          left: 0;
          z-index: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--white);
          color: var(--sea, #1e5c82);
          border: 1px solid rgba(10, 123, 140, 0.18);
          border-left: none;
          padding: 9px 14px 9px 10px;
          border-radius: 0 22px 22px 0;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(10, 30, 50, 0.18);
          transition: 0.18s ease;
        }
        .upx-list-reopen:hover {
          background: var(--sea, #1e5c82);
          color: #fff;
          padding-left: 14px;
        }
        .upx-list-reopen-label {
          letter-spacing: 0.01em;
        }

        .upx-card {
          display: flex;
          gap: 12px;
          background: var(--white);
          border: 1px solid rgba(10, 123, 140, 0.08);
          border-radius: 14px;
          padding: 10px;
          text-align: left;
          cursor: pointer;
          transition: 0.18s ease;
          font-family: 'Inter', sans-serif;
          color: var(--txt);
          align-items: stretch;
        }
        .upx-card:hover, .upx-card.hovered {
          border-color: var(--sea, #1e5c82);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(10, 30, 50, 0.08);
        }
        .upx-card-img {
          position: relative;
          width: 96px;
          height: 80px;
          flex-shrink: 0;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(10, 123, 140, 0.08);
        }
        .upx-card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
        }
        .upx-card-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .upx-card-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--txt);
          line-height: 1.25;
        }
        .upx-card-meta {
          font-size: 11px;
          color: var(--txt3);
          display: flex;
          gap: 4px;
          align-items: center;
        }
        .upx-card-cat { font-weight: 700; }
        .upx-card-island { color: var(--txt3); }
        .upx-card-desc {
          font-size: 12px;
          color: var(--txt2);
          line-height: 1.45;
          margin-top: 4px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .upx-skeletons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .upx-skeleton {
          height: 100px;
          border-radius: 14px;
          background: linear-gradient(90deg, rgba(10,123,140,.06), rgba(10,123,140,.12), rgba(10,123,140,.06));
          background-size: 200% 100%;
          animation: upxShimmer 1.4s ease infinite;
        }
        @keyframes upxShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .upx-empty {
          padding: 30px 10px;
          text-align: center;
          color: var(--txt3);
          font-size: 13.5px;
        }
        .upx-empty-cta {
          display: inline-block;
          margin-top: 10px;
          background: var(--sea, #1e5c82);
          color: #fff;
          padding: 9px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
        }

        .upx-map-wrap {
          position: relative;
          background: rgba(10, 123, 140, 0.04);
        }
        .upx-map {
          width: 100%;
          height: 100%;
          background: #b8d4dc;
        }

        /* Förb #1: "Sök i denna vy" — flytande knapp top-center på kartan */
        .upx-search-here {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 500;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: var(--white);
          color: var(--sea, #1e5c82);
          border: 1px solid rgba(10, 123, 140, 0.18);
          padding: 9px 16px;
          border-radius: 24px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(10, 30, 50, 0.2);
          transition: 0.18s ease;
          animation: upxSlideDown 0.25s ease;
        }
        .upx-search-here:hover {
          background: var(--sea, #1e5c82);
          color: #fff;
          transform: translateX(-50%) translateY(-1px);
        }
        @keyframes upxSlideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Förb #3: reset-knapp bottom-right */
        .upx-reset {
          position: absolute;
          bottom: 18px;
          right: 18px;
          z-index: 500;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--white);
          color: var(--txt);
          border: 1px solid rgba(10, 123, 140, 0.15);
          padding: 8px 14px;
          border-radius: 22px;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(10, 30, 50, 0.15);
          transition: 0.15s ease;
        }
        .upx-reset:hover {
          background: var(--sea, #1e5c82);
          color: #fff;
          border-color: var(--sea, #1e5c82);
          transform: translateY(-1px);
        }

        /* Locate-knapp — bottom-left på kartan */
        .upx-locate {
          position: absolute;
          bottom: 18px;
          left: 18px;
          z-index: 500;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--white);
          color: var(--txt2);
          border: 1px solid rgba(10, 123, 140, 0.15);
          box-shadow: 0 4px 14px rgba(10, 30, 50, 0.15);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: 0.15s ease;
        }
        .upx-locate:hover:not(:disabled) {
          background: var(--sea, #1e5c82);
          color: #fff;
          transform: translateY(-1px);
        }
        .upx-locate.active {
          background: var(--sea, #1e5c82);
          color: #fff;
        }
        .upx-locate.denied {
          background: #cc3d3d;
          color: #fff;
          cursor: not-allowed;
        }
        .upx-locate.loading { color: var(--sea, #1e5c82); cursor: wait; }
        @keyframes upxSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Vädervisare-position — top-left, ger plats för Leaflet zoom-controls top-right */
        .upx-weather-wrap {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 500;
          pointer-events: auto;
        }

        /* Mobile: stack + tab-toggle */
        @media (max-width: 900px) {
          .upx-mob-tabs { display: flex; }
          .upx-split {
            grid-template-columns: 1fr;
            position: relative;
          }
          .upx-list, .upx-map-wrap {
            grid-column: 1;
            grid-row: 1;
          }
          .upx-list { border-right: none; }
          .mob-hide { display: none; }
          .mob-show { display: flex; }
          .upx-map-wrap.mob-show { display: block; }
        }
      ` }} />
    </div>
  )
}
