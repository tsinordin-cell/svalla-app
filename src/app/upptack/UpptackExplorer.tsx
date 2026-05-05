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

const CATEGORY_META: Record<Category, { label: string; color: string; emoji: string }> = {
  krog:       { label: 'Krogar',      color: '#c96e2a', emoji: '◍' },
  hamn:       { label: 'Gästhamnar',  color: '#1d4ed8', emoji: '◍' },
  naturhamn:  { label: 'Naturhamnar', color: '#0a7b3c', emoji: '◍' },
  bastu:      { label: 'Bastu',       color: '#9d174d', emoji: '◍' },
  bensin:     { label: 'Bensin',      color: '#525252', emoji: '◍' },
  annat:      { label: 'Annat',       color: '#6b7280', emoji: '◍' },
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
function pinHtml(color: string, isActive = false): string {
  const scale = isActive ? 1.3 : 1
  const ring = isActive ? `<circle cx="14" cy="14" r="13" fill="none" stroke="${color}" stroke-width="2" opacity="0.4"/>` : ''
  return `
    <div style="transform:scale(${scale});transform-origin:center bottom;transition:transform .18s ease;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.35))">
      <svg width="28" height="36" viewBox="0 0 28 36" xmlns="http://www.w3.org/2000/svg">
        ${ring}
        <path d="M14 0 C6 0 0 6 0 14 C0 22 14 36 14 36 C14 36 28 22 28 14 C28 6 22 0 14 0 Z" fill="${color}"/>
        <circle cx="14" cy="14" r="5" fill="#fff"/>
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
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Mobile state
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list')

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
        // Filtrera bort POIs utan koordinater
        const valid = (data ?? []).filter(
          p => typeof p.latitude === 'number' && typeof p.longitude === 'number'
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

  // ── Filtrerad lista (kategori + sök + bbox) ────────────────────────────
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
      // Bounds (om karta laddat)
      if (bounds) {
        if (
          p.latitude < bounds.swLat || p.latitude > bounds.neLat ||
          p.longitude < bounds.swLng || p.longitude > bounds.neLng
        ) return false
      }
      return true
    })
  }, [pois, filter, query, bounds])

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
      // Sjökorts-overlay
      L.tileLayer(SEAMARK_TILE, { opacity: 0.7, maxZoom: 18 }).addTo(map)
      L.control.zoom({ position: 'topright' }).addTo(map)

      // Cluster — markercluster augmenterar L runtime; cast så TS är glad
      const Lany = L as unknown as { markerClusterGroup: (opts: object) => unknown }
      const cluster = Lany.markerClusterGroup({
        chunkedLoading: true,
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 14,
        maxClusterRadius: 50,
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

      // Bounds tracking
      const updateBounds = () => {
        const b = map.getBounds()
        setBounds({
          swLat: b.getSouthWest().lat,
          swLng: b.getSouthWest().lng,
          neLat: b.getNorthEast().lat,
          neLng: b.getNorthEast().lng,
        })
      }
      map.on('moveend', updateBounds)
      map.on('zoomend', updateBounds)
      updateBounds()

      mapRef.current = map
      clusterRef.current = cluster
    })()
    return () => { cancelled = true }
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
          html: pinHtml(color, false),
          className: 'svalla-pin',
          iconSize: [28, 36],
          iconAnchor: [14, 36],
          popupAnchor: [0, -32],
        })
        const m = L.marker([p.latitude, p.longitude], { icon })
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
          {FILTER_CHIPS.map(c => (
            <button
              key={c.id}
              type="button"
              className={`upx-chip ${filter === c.id ? 'active' : ''}`}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
            </button>
          ))}
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
          onClick={() => setMobileTab('list')}
        >Lista <span className="upx-count">{filteredPois.length}</span></button>
        <button
          type="button"
          className={`upx-mob-tab ${mobileTab === 'map' ? 'active' : ''}`}
          onClick={() => setMobileTab('map')}
        >Karta</button>
      </div>

      {/* Split-layout */}
      <div className="upx-split">
        {/* Lista */}
        <aside
          className={`upx-list ${mobileTab === 'list' ? 'mob-show' : 'mob-hide'}`}
          ref={listScrollRef}
        >
          <div className="upx-list-meta">
            <span className="upx-list-count">{filteredPois.length} platser i denna vy</span>
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
                    <div className="upx-card-placeholder" style={{ background: meta.color }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
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
          grid-template-columns: minmax(360px, 420px) 1fr;
          flex: 1;
          min-height: 0;
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
