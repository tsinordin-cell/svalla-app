'use client'
/**
 * UpptackExplorer — STF-style split discovery view.
 *
 * Vänster: filterbar lista med kort (foto + namn + plats + kategori).
 * Höger:  MapLibre-karta (Svallas egen kartstil) med klustrade nålar, alltid synlig på desktop.
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

import { upptackRegion } from '@/lib/upptackRegion'
import 'maplibre-gl/dist/maplibre-gl.css'
import Supercluster from 'supercluster'
import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { SEAMARK_TILE } from '@/lib/map-tiles'
import { kartytaFor } from '@/lib/kartvy'
import { tagPlatssvar } from './platsdata'
import { hamtaMaplibre, tillMaplibreZoom, tillLeafletZoom, cirkelRing } from './maplibre'
import type { Map as MLMap, Marker as MLMarker, Popup as MLPopup } from 'maplibre-gl'
import Icon from '@/components/Icon'
import { WeatherPill } from '@/components/MapCornerPills'
import { STANDARD_VADERPUNKT } from '@/lib/weatherGrid'
import { samladVaderpunkt } from '@/lib/samladVaderpunkt'
import { track } from '@/lib/analytics-events'
import { platsKategori, type PlatsKategori } from '@/lib/platskategori'
import { pinHtml } from '@/lib/kartnal'

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
  archipelago_region: string | null
  endast_medlemmar?: boolean
}

type Category = PlatsKategori
type RegionKey = 'stockholm' | 'goteborg' | 'bohuslan' | 'aland' | 'oland' | 'gotland'

interface Bounds {
  swLat: number; swLng: number; neLat: number; neLng: number
}

// ── Kategori-mapper ──────────────────────────────────────────────────────
// Platsens egen typ avgör först, se src/lib/platskategori.ts.
const categorize = (p: Poi): Category => platsKategori(p)

const CATEGORY_META: Record<Category, { label: string; color: string }> = {
  krog:       { label: 'Krogar',      color: '#c96e2a' },
  butik:      { label: 'Butiker',     color: '#b42318' },
  hamn:       { label: 'Gästhamnar',  color: '#1d4ed8' },
  naturhamn:  { label: 'Naturhamnar', color: '#0a7b3c' },
  brygga:     { label: 'Bryggor',     color: '#0f766e' },
  bastu:      { label: 'Bastu',       color: '#9d174d' },
  bensin:     { label: 'Bensin',      color: '#525252' },
  boende:     { label: 'Boende',      color: '#6d28d9' }, // lila — distinkt mot kategorierna ovan
  bad:        { label: 'Bad',         color: '#0a7b8c' }, // havsblå — passar strand/vatten
  sevardhet:  { label: 'Sevärdheter', color: '#86198f' },
  annat:      { label: 'Annat',       color: '#0891b2' },
}

// Lucide-paths per kategori (premium-standard, SVG 24×24 viewBox).
// Renderas inuti pin-droppen och som placeholder på list-kort.
// Path-data tagen direkt från lucide.dev — håll dem oförändrade.
const CATEGORY_ICONS: Record<Category, string> = {
  // utensils — bestick (kniv + gaffel)
  krog:      '<path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
  // shopping-bag — kasse (Lucide)
  butik:     '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  // anchor — ankare
  hamn:      '<path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/><circle cx="12" cy="5" r="3"/>',
  // tree-pine — gran (klassisk skärgårds-symbol)
  naturhamn: '<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>',
  // brygga: bryggdäck på pålar över vatten (egen, samma stil som nålen)
  brygga:    '<path d="M3.5 9h17"/><path d="M7 9v7.5"/><path d="M12 9v7.5"/><path d="M17 9v7.5"/><path d="M2.5 19.5c1.2 0 1.8-1 3.2-1s2 1 3.2 1 1.8-1 3.1-1 1.9 1 3.2 1 1.8-1 3.2-1 2 1 3.1 1"/>',
  // sevärdhet: byggnad med pelare (egen, samma stil som nålen)
  sevardhet: '<path d="M3 21h18"/><path d="M5.5 21V10.5"/><path d="M18.5 21V10.5"/><path d="M10 21V10.5"/><path d="M14 21V10.5"/><path d="M2.5 10.5 12 3.5l9.5 7Z"/>',
  // bastu — Lucide "thermometer" (universell värme-symbol, en path, läsbar på 20px)
  bastu:     '<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',
  // fuel — bensinpump
  bensin:    '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  // bed — säng (Lucide). Tydligt boende-symbol på avstånd.
  boende:    '<path d="M2 4v16"/><path d="M22 4v16"/><path d="M2 8h20"/><path d="M2 16h20"/><path d="M2 12h20"/><circle cx="7" cy="10" r="2"/><path d="M9 12h11v-2H9"/>',
  // umbrella-beach — paraply + vågor (egen, läsbar på 20px). Avgränsar bad
  // tydligt från generella "annat"-vågor.
  bad:       '<path d="M22 12a10 10 0 0 0-20 0"/><path d="M12 12V2"/><path d="M2 12h20"/><path d="M2 18c.5.4 1 .8 2.5.8s1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 2-.4 2.5-.8"/>',
  // waves — vatten, passar skärgårdsappen perfekt
  annat:     '<path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>',
}

// Kartnålarna (formfamiljer) ligger i src/lib/kartnal.ts och delas med
// startsidans karta och minikartan på platssidan.

const FILTER_CHIPS: Array<{ id: 'all' | Category; label: string }> = [
  { id: 'all',       label: 'Allt' },
  { id: 'krog',      label: 'Krogar' },
  { id: 'butik',     label: 'Butiker' },
  { id: 'hamn',      label: 'Hamnar' },
  { id: 'naturhamn', label: 'Naturhamnar' },
  { id: 'brygga',    label: 'Bryggor' },
  { id: 'boende',    label: 'Boende' },
  { id: 'bad',       label: 'Bad' },
  { id: 'bastu',     label: 'Bastu' },
  { id: 'bensin',    label: 'Bensin' },
  { id: 'sevardhet', label: 'Sevärdheter' },
]

// Region-konfiguration med center-koordinater för zoom
const REGION_CONFIG = {
  stockholm: {
    label: 'Stockholm',
    center: [59.40, 18.70] as const,
    zoom: 9,
    archRegions: ['inner', 'middle', 'outer', 'south'] as const,
  },
  goteborg: {
    label: 'Göteborg',
    center: [57.66, 11.72] as const,
    zoom: 10,
    archRegions: ['goteborg'] as const,
  },
  bohuslan: {
    label: 'Bohuslän',
    center: [58.30, 11.40] as const,
    zoom: 9,
    archRegions: ['bohuslan'] as const,
  },
  aland: {
    label: 'Åland',
    center: [60.10, 19.93] as const,
    zoom: 9,
    archRegions: ['aland'] as const,
  },
  oland: {
    label: 'Öland',
    center: [56.85, 16.65] as const,
    zoom: 9,
    archRegions: ['oland'] as const,
  },
  gotland: {
    label: 'Gotland',
    center: [57.64, 18.30] as const,
    zoom: 9,
    archRegions: ['gotland'] as const,
  },
} as const satisfies Record<RegionKey, { label: string; center: readonly [number, number]; zoom: number; archRegions: readonly string[] }>

// ── Kartnål (SVG som divIcon) ────────────────────────────────────────────
// 32×40, fylld form i kategorins färg med vit ikon direkt på färgen och
// vit kant. Aktiv nål (hover i listan) förstoras och får en halo i samma form.
// ── Initial map view (Stockholms skärgård som default) ───────────────────
// Samma punkt som flödets väderrad använder utan GPS (STANDARD_VADERPUNKT).
const INITIAL_CENTER: [number, number] = [STANDARD_VADERPUNKT.lat, STANDARD_VADERPUNKT.lng]
const INITIAL_ZOOM = 10

/** Kartans vy för en region, eller startvyn för "Alla". */
function vyFor(region: RegionKey | 'all'): { center: [number, number]; zoom: number } {
  if (region === 'all') return { center: INITIAL_CENTER, zoom: INITIAL_ZOOM }
  const c = REGION_CONFIG[region]
  return { center: [c.center[0], c.center[1]], zoom: c.zoom }
}

/** Platsnamn kommer från databasen och sätts i popupens HTML. */
function escapeHtml(t: string): string {
  return t.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

// ── Komponent ────────────────────────────────────────────────────────────
export default function UpptackExplorer() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Data state
  const [pois, setPois] = useState<Poi[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state — multi-select. Tom set = "Alla kategorier" (visa allt).
  // URL-format: ?typ=krog,hamn  ELLER  ?typ=all (bakåtkompat)
  const [activeCats, setActiveCats] = useState<Set<Category>>(() => {
    const raw = searchParams.get('typ')
    if (!raw || raw === 'all') return new Set()
    const validCats: Set<Category> = new Set(['krog', 'butik', 'hamn', 'naturhamn', 'brygga', 'bastu', 'bensin', 'boende', 'bad', 'sevardhet', 'annat'])
    const result = new Set<Category>()
    for (const part of raw.split(',')) {
      const t = part.trim() as Category
      if (validCats.has(t)) result.add(t)
    }
    return result
  })
  function toggleCat(cat: Category) {
    setActiveCats(prev => {
      const next = new Set(prev)
      const becameActive = !next.has(cat)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      // Analytics: filter_changed med kategori-namn + ny status
      track('filter_changed', {
        surface: 'upptack',
        filter: 'category',
        value: `${cat}:${becameActive ? 'on' : 'off'}`,
      })
      return next
    })
  }
  function clearCats() {
    setActiveCats(new Set())
    track('filter_changed', { surface: 'upptack', filter: 'category', value: 'clear' })
  }
  const isAllMode = activeCats.size === 0
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  // Mobil: förstoringsglaset i toppraden öppnar sökfältet här, som filtrerar
  // kartan och listan på namn (i stället för att gå till sajtens stora sök).
  const [sokOppen, setSokOppen] = useState(false)
  const sokInputRef = useRef<HTMLInputElement>(null)
  const oppnaSok = useCallback(() => {
    setSokOppen(true)
    requestAnimationFrame(() => sokInputRef.current?.focus())
  }, [])

  // Region-filter state — sparas i URL som ?region=stockholm
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | 'all'>(() => {
    const raw = searchParams.get('region')
    const validRegions: Set<RegionKey | 'all'> = new Set(['all', 'stockholm', 'goteborg', 'bohuslan', 'aland', 'oland', 'gotland'])
    return (validRegions.has(raw as RegionKey | 'all') ? raw : 'all') as RegionKey | 'all'
  })

  // Map state — listan följer kartans bounds automatiskt vid varje pan/zoom
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  // Startvyn följer regionen i adressen (?region=gotland). Tidigare startade
  // kartan alltid i Stockholm medan listan filtrerades på regionen, så en delad
  // eller omladdad regionlänk visade "0 platser i denna vy" (kontrollerat live
  // 2026-10-03): region-effekten nedan hoppar över monteringen eftersom kartan
  // inte finns än. Läses en gång, vid montering.
  const startVyRef = useRef(vyFor(selectedRegion))
  // Senaste valda region, för kartan som skapas asynkront (se init-effekten).
  const selectedRegionRef = useRef(selectedRegion)
  // Karta-center (debouncat) för WeatherPill
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(() => ({
    lat: startVyRef.current.center[0], lng: startVyRef.current.center[1],
  }))
  const mapCenterRef = useRef(mapCenter)
  mapCenterRef.current = mapCenter
  // Under en sökning visar vädret platsen där träffarna ligger, eller, för en
  // utspridd sökning ("bastu"), platsen det visade före sökningen. Annars
  // följer det kartans mitt, som efter en bred sökning kan hamna långt utanför
  // skärgården. Släpps när du själv flyttar kartan.
  const [vaderLas, setVaderLas] = useState<{ lat: number; lng: number } | null>(null)
  const vaderLasRef = useRef(vaderLas)
  vaderLasRef.current = vaderLas
  // Kartan flyttas av sökningen (true) eller av dig (false). Används för att
  // inte zooma om, och för att släppa vädret, när du själv flyttat kartan.
  const autoFlyttRef = useRef(false)
  const anvandarFlyttatRef = useRef(false)

  // GPS-state — "Visa min plats"
  const [gpsState, setGpsState] = useState<'idle' | 'loading' | 'active' | 'denied'>('idle')
  const gpsMarkerRef = useRef<MLMarker | null>(null)

  // Mobile state
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list')

  // Collapse-state (desktop): sidobaren kan gömmas så kartan får hela bredden.
  // Persisteras i localStorage så valet kommer ihåg mellan sessioner.
  const [listCollapsed, setListCollapsed] = useState<boolean>(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    setListCollapsed(window.localStorage.getItem('upx-list-collapsed') === '1')
  }, [])

  // ── Mobile bottom-sheet state ─────────────────────────────────────────────
  // 3 snap-points: 'min' (bara handle synlig), 'half' (~halva skärmen),
  // 'full' (täcker nästan hela kartan). Default 'min' sedan 2026-11-23 (Tom: mer
  // karta). Ny nyckel upx-sheet2 så att alla börjar minimerat en gång.
  // Klick på handle cyclar: min → half → full → min...
  type SheetState = 'min' | 'half' | 'full'
  const [sheetState, setSheetState] = useState<SheetState>('min')
  useEffect(() => {
    if (typeof window === 'undefined') return
    const saved = window.localStorage.getItem('upx-sheet2') as SheetState | null
    if (saved && (saved === 'min' || saved === 'half' || saved === 'full')) {
      setSheetState(saved)
    }
  }, [])
  function cycleSheet() {
    setSheetState(prev => {
      const next: SheetState = prev === 'half' ? 'full' : prev === 'full' ? 'min' : 'half'
      if (typeof window !== 'undefined') window.localStorage.setItem('upx-sheet2', next)
      return next
    })
  }
  // Kartans höjd följer listans läge (halvöppen lista = lägre karta), även när
  // läget läses in från förra besöket. Kartan behöver då veta den nya storleken.
  useEffect(() => {
    const id = setTimeout(() => {
      mapRef.current?.resize()
    }, 320)
    return () => clearTimeout(id)
  }, [sheetState])

  // Refs
  const mapDivRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MLMap | null>(null)
  // Klustringen räknas med supercluster i Leaflet-skala (samma radier som förut).
  const klusterRef = useRef<Supercluster<{ id: string }> | null>(null)
  // Synliga platser efter filter, i den ordning de lades in i klustret.
  const synligaRef = useRef<Map<string, Poi>>(new Map())
  // Nålar och kluster som ligger på kartan just nu, nyckel = plats-id eller "k<klusterid>".
  const markersRef = useRef<Map<string, { marker: MLMarker; el: HTMLElement; poi?: Poi }>>(new Map())
  const hoveredIdRef = useRef<string | null>(null)
  const ritaRef = useRef<() => void>(() => {})
  // revision 2026-10-02: kartan initieras asynkront. Kom datan före kartan
  // returnerade markör-effekten tidigt och kördes inte om när kartan blev klar,
  // så inga nålar ritades förrän ett filter ändrades. kartaKlar kör om den.
  const [kartaKlar, setKartaKlar] = useState(false)
  const listScrollRef = useRef<HTMLDivElement>(null)
  // Google Places-fotona svarar 403 så länge nyckeln nekas (kort 08208bd8).
  // Ett trasigt foto visar i stället kategorins platshållare.
  const [trasigaBilder, setTrasigaBilder] = useState<Set<string>>(() => new Set())

  // ── Hämta POIs från API ────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    // Hämtningen startades redan i UpptackLoader (se platsdata.ts).
    tagPlatssvar()
      .then(svar => {
        if (svar.status === 401) {
          throw new Error('Logga in för att se Upptäck-kartan')
        }
        if (!svar.ok) throw new Error(`HTTP ${svar.status}`)
        return svar.data as Poi[]
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
          p.longitude > 5 && p.longitude < 25 &&
          // Google Places-importen gav poster som "not the public sauna" och
          // "sandstrand" — beskrivningar, inte namn. Egennamn börjar med versal.
          /^[^a-zåäö]/.test((p.name ?? '').trim())
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

  // ── Sökträffar: EN regel för lista, antal, pinnar och kartflytt ─────────
  // Namn och ö först. Bara om inget namn matchar faller vi tillbaka på
  // beskrivningen (t.ex. "pizza"). Då visar listan, siffran och kartan
  // alltid samma platser.
  const sokTraffar = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return null
    const iNamn = pois.filter(p => `${p.name ?? ''} ${p.island ?? ''}`.toLowerCase().includes(q))
    if (iNamn.length > 0) return new Set(iNamn)
    return new Set(pois.filter(p => `${p.name ?? ''} ${p.island ?? ''} ${p.description ?? ''}`.toLowerCase().includes(q)))
  }, [pois, query])

  // ── Filtrerad lista (region + kategori + sök + bounds) ──────────────────────────
  // Listan följer kartans bounds AUTOMATISKT — så fort användaren panorerar
  // eller zoomar uppdateras vad som visas i listan.
  const filteredPois = useMemo(() => {
    return pois.filter(p => {
      // Region-filter
      if (selectedRegion !== 'all') {
        if (upptackRegion(p) !== selectedRegion) return false
      }
      // Multi-select: tomt set = visa allt; annars måste platsens kategori finnas i set
      if (!isAllMode && !activeCats.has(categorize(p))) return false
      if (sokTraffar && !sokTraffar.has(p)) return false
      if (bounds) {
        if (
          p.latitude < bounds.swLat || p.latitude > bounds.neLat ||
          p.longitude < bounds.swLng || p.longitude > bounds.neLng
        ) return false
      }
      return true
    })
  }, [pois, selectedRegion, isAllMode, activeCats, sokTraffar, bounds])

  // Antal POIs per kategori (för chip-labels) — räknas på pois som matchar
  // region + sök + bounds, oavsett vald kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<'all' | Category, number> = {
      all: 0, krog: 0, butik: 0, hamn: 0, naturhamn: 0, brygga: 0, bastu: 0, bensin: 0, boende: 0, bad: 0, sevardhet: 0, annat: 0,
    }
    for (const p of pois) {
      // Region-filter
      if (selectedRegion !== 'all') {
        if (upptackRegion(p) !== selectedRegion) continue
      }
      if (sokTraffar && !sokTraffar.has(p)) continue
      if (bounds) {
        if (
          p.latitude < bounds.swLat || p.latitude > bounds.neLat ||
          p.longitude < bounds.swLng || p.longitude > bounds.neLng
        ) continue
      }
      counts.all++
      counts[categorize(p)]++
    }
    return counts
  }, [pois, selectedRegion, sokTraffar, bounds])

  // ── URL-sync (debounced så vi inte spammar history) ────────────────────
  // Multi-select: ?typ=krog,hamn  (alfabetisk för deterministisk URL)
  // Region: ?region=stockholm
  const activeCatsKey = useMemo(() => Array.from(activeCats).sort().join(','), [activeCats])
  useEffect(() => {
    const id = setTimeout(() => {
      const params = new URLSearchParams()
      if (selectedRegion !== 'all') params.set('region', selectedRegion)
      if (activeCatsKey) params.set('typ', activeCatsKey)
      if (query.trim()) params.set('q', query.trim())
      const qs = params.toString()
      router.replace(qs ? `/upptack?${qs}` : '/upptack', { scroll: false })
    }, 250)
    return () => clearTimeout(id)
  }, [selectedRegion, activeCatsKey, query, router])

  // ── Region-byte: zoom kartan till regionens center ────────────────────
  useEffect(() => {
    selectedRegionRef.current = selectedRegion
    if (!mapRef.current) return
    const map = mapRef.current
    if (selectedRegion !== 'all') {
      const regionConfig = REGION_CONFIG[selectedRegion]
      map.flyTo({ center: [regionConfig.center[1], regionConfig.center[0]], zoom: tillMaplibreZoom(regionConfig.zoom), duration: 800 })
    } else {
      // "Alla" — flyg tillbaka till initial view
      map.flyTo({ center: [INITIAL_CENTER[1], INITIAL_CENTER[0]], zoom: tillMaplibreZoom(INITIAL_ZOOM), duration: 800 })
    }
  }, [selectedRegion])

  // ── Init MapLibre ──────────────────────────────────────────────────────
  // 2026-11-28 (omtaget av /upptack, steg 6): Leaflet med rasterbilder från
  // tile.openstreetmap.org är utbytt mot MapLibre med vektorkartor från
  // OpenFreeMap och Svallas egen kartstil (public/kartstil/svalla.json).
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return
    let cancelled = false
    // revision 2026-10-02 (P1-3): räkna ut kartans synliga yta redan nu, innan
    // kartmotorn laddats, så att listan inte först visar alla kort.
    const startVy = startVyRef.current
    {
      const r = mapDivRef.current.getBoundingClientRect()
      const yta = kartytaFor(startVy.center, startVy.zoom, r.width, r.height)
      if (yta) setBounds(prev => prev ?? yta)
    }
    ;(async () => {
      const maplibregl = await hamtaMaplibre()
      if (cancelled || !mapDivRef.current) return

      // Hann besökaren välja en annan region medan kartan laddades? Då sätts vyn här.
      const vy = vyFor(selectedRegionRef.current)
      const map = new maplibregl.Map({
        container: mapDivRef.current,
        style: '/kartstil/svalla.json',
        center: [vy.center[1], vy.center[0]],
        zoom: tillMaplibreZoom(vy.zoom),
        maxZoom: tillMaplibreZoom(18),
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
        locale: { 'NavigationControl.ZoomIn': 'Zooma in', 'NavigationControl.ZoomOut': 'Zooma ut' },
      })
      map.touchZoomRotate.disableRotation()
      map.keyboard.disableRotation()
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        // Sjömärken från mellannivå: på översikten tog de fokus från nålarna.
        map.addSource('sjomarken', { type: 'raster', tiles: [SEAMARK_TILE], tileSize: 256, maxzoom: 18 })
        map.addLayer({ id: 'sjomarken', type: 'raster', source: 'sjomarken', minzoom: 10, paint: { 'raster-opacity': 0.6 } })
        map.addSource('gps-noggrannhet', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } })
        map.addLayer({ id: 'gps-noggrannhet', type: 'fill', source: 'gps-noggrannhet', paint: { 'fill-color': '#3b82f6', 'fill-opacity': 0.08, 'fill-outline-color': 'rgba(59,130,246,0.35)' } })
      })

      // Bounds tracking
      const updateBounds = () => {
        const b = map.getBounds()
        setBounds({
          swLat: b.getSouth(),
          swLng: b.getWest(),
          neLat: b.getNorth(),
          neLng: b.getEast(),
        })
        const c = map.getCenter()
        setMapCenter({ lat: c.lat, lng: c.lng })
      }
      map.on('moveend', () => { updateBounds(); ritaRef.current() })
      map.on('movestart', () => {
        if (autoFlyttRef.current) return
        anvandarFlyttatRef.current = true
        if (vaderLasRef.current) setVaderLas(null)
      })
      map.on('moveend', () => { autoFlyttRef.current = false })
      updateBounds()

      mapRef.current = map
      setKartaKlar(true)

      // Containern kan sakna storlek vid montering (mobilens lista visas först).
      const retries = [50, 200, 500, 1000]
      retries.forEach(ms => {
        setTimeout(() => { mapRef.current?.resize() }, ms)
      })
    })()
    const markersMap = markersRef.current
    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      klusterRef.current = null
      markersMap.clear()
      setKartaKlar(false)
    }
  }, [])

  // ── Rita nålar och kluster för det som syns ────────────────────────────
  // Klustringen räknas i Leaflet-skala med samma radier som förut och släpps
  // från zoomnivå 13 (Leaflet), så att besökaren ser samma sak som tidigare.
  const ritaNalar = useCallback(async () => {
    const map = mapRef.current
    const index = klusterRef.current
    if (!map || !index) return
    const maplibregl = await hamtaMaplibre()
    const b = map.getBounds()
    const z = Math.round(tillLeafletZoom(map.getZoom()))
    const delar = index.getClusters([b.getWest() - 0.2, b.getSouth() - 0.1, b.getEast() + 0.2, b.getNorth() + 0.1], Math.min(Math.max(z, 0), 20))
    const kvar = new Set<string>()
    for (const d of delar) {
      const [lng, lat] = d.geometry.coordinates as [number, number]
      const props = d.properties as { cluster?: boolean; cluster_id?: number; point_count?: number; id?: string }
      if (props.cluster && props.cluster_id !== undefined) {
        const nyckel = `k${props.cluster_id}-${z}`
        kvar.add(nyckel)
        if (markersRef.current.has(nyckel)) continue
        const n = props.point_count ?? 0
        const el = document.createElement('button')
        el.type = 'button'
        el.className = 'svalla-cluster'
        el.setAttribute('aria-label', `${n} platser, zooma in`)
        el.innerHTML = `<span style="background:#1e5c82;color:#fff;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;font-family:'Inter',sans-serif;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)">${n}</span>`
        const klusterId = props.cluster_id
        el.addEventListener('click', (e) => {
          e.stopPropagation()
          const zIn = index.getClusterExpansionZoom(klusterId)
          map.easeTo({ center: [lng, lat], zoom: tillMaplibreZoom(Math.min(zIn, 13)), duration: 500 })
        })
        const marker = new maplibregl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map)
        markersRef.current.set(nyckel, { marker, el })
      } else if (props.id) {
        const p = synligaRef.current.get(props.id)
        if (!p) continue
        kvar.add(p.id)
        if (markersRef.current.has(p.id)) continue
        const cat = categorize(p)
        const aktiv = hoveredIdRef.current === p.id
        const el = document.createElement('div')
        el.className = aktiv ? 'svalla-pin svalla-pin-active' : 'svalla-pin'
        // Båda lägena ritas direkt och växlas med en klass. Byttes innehållet vid
        // klick försvann klickmålet innan kartan hann öppna popupen.
        el.innerHTML = `<div class="nal-vanlig">${pinHtml(cat, false)}</div><div class="nal-aktiv">${pinHtml(cat, true)}</div>`
        el.setAttribute('role', 'button')
        el.setAttribute('tabindex', '0')
        el.setAttribute('aria-label', `${p.name}, ${CATEGORY_META[cat].label}`)
        const popup: MLPopup = new maplibregl.Popup({ offset: [0, -38], closeButton: true, maxWidth: '240px' }).setHTML(`
          <div style="min-width:180px;font-family:'Inter',sans-serif">
            <div style="font-weight:700;font-size:13px;color:#162d3a;margin-bottom:2px">${escapeHtml(p.name)}</div>
            <div style="font-size:11px;color:#6a8a96;margin-bottom:6px">${CATEGORY_META[cat].label}${p.island ? ' &middot; ' + escapeHtml(p.island) : ''}</div>
            ${p.slug ? `<a href="/upptack/${p.slug}" style="color:#1e5c82;font-size:12px;font-weight:600;text-decoration:none">Se mer &rarr;</a>` : ''}
          </div>
        `)
        const marker = new maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, 1] })
          .setLngLat([p.longitude, p.latitude])
          .setPopup(popup)
          .addTo(map)
        const klick = () => {
          setHoveredId(p.id)
          const kort = document.getElementById(`upptack-card-${p.id}`)
          const lista = listScrollRef.current
          if (kort && lista) {
            // Skrolla bara listan, inte sidan runt om.
            const top = kort.getBoundingClientRect().top - lista.getBoundingClientRect().top + lista.scrollTop
            lista.scrollTo({ top: top - lista.clientHeight / 2 + kort.clientHeight / 2, behavior: 'smooth' })
          }
        }
        el.addEventListener('click', klick)
        // Enter och mellanslag öppnar popupen via MapLibre; här skrollas listan.
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') klick()
        })
        markersRef.current.set(p.id, { marker, el, poi: p })
      }
    }
    for (const [nyckel, m] of markersRef.current) {
      if (!kvar.has(nyckel)) { m.marker.remove(); markersRef.current.delete(nyckel) }
    }
  }, [])
  ritaRef.current = () => { void ritaNalar() }

  // ── Uppdatera markörer när data eller filter ändras ────────────────────
  useEffect(() => {
    if (!mapRef.current) return
    // Markörer på kartan följer ENDAST kategori + sök (inte bounds), så att
    // nålar i intilliggande områden syns när man panorerar.
    const visiblePois = pois.filter(p => {
      if (!isAllMode && !activeCats.has(categorize(p))) return false
      if (sokTraffar && !sokTraffar.has(p)) return false
      return true
    })
    const index = new Supercluster<{ id: string }>({
      // Leaflet-klustrets radier var 55/35/25/18 px beroende på zoom, räknat på
      // 256 px rutor. extent 256 gör att radien räknas i samma pixlar.
      radius: 42,
      extent: 256,
      maxZoom: 12,
    })
    index.load(visiblePois.map(p => ({
      type: 'Feature' as const,
      properties: { id: p.id },
      geometry: { type: 'Point' as const, coordinates: [p.longitude, p.latitude] },
    })))
    klusterRef.current = index
    synligaRef.current = new Map(visiblePois.map(p => [p.id, p]))
    for (const m of markersRef.current.values()) m.marker.remove()
    markersRef.current.clear()
    void ritaNalar()
  }, [pois, isAllMode, activeCats, sokTraffar, kartaKlar, ritaNalar])

  // ── Sök: visa ALLA träffar på kartan ───────────────────────────────────
  // Varje ny sökning (eller nytt kategorival under en sökning) zoomar kartan
  // så att alla träffar syns. Annars visar t.ex. "bastu" bara de 1–2 bastur
  // som råkar ligga i vyn, fast Svalla har fler. Bara när sökningen ändras,
  // aldrig när användaren själv panorerar efteråt.
  const senastZoomadRef = useRef<string>('')
  const senastSokRef = useRef<string>('')
  // Vädret under en sökning: ligger träffarna samlat (en ö, en ort) visas
  // vädret där. Annars står det kvar på platsen före sökningen. Släpps när
  // sökningen rensas. Körs om när platserna laddats, så att en direktlänk som
  // /upptack?q=Utö inte fastnar på startvyns väder.
  useEffect(() => {
    if (!sokTraffar) { if (vaderLasRef.current) setVaderLas(null); return }
    const traffar = pois.filter(p => sokTraffar.has(p) && (isAllMode || activeCats.has(categorize(p))))
    const samlad = samladVaderpunkt(traffar)
    if (samlad) { setVaderLas(samlad); return }
    if (!vaderLasRef.current) setVaderLas(mapCenterRef.current)
  }, [sokTraffar, pois, isAllMode, activeCats])
  useEffect(() => {
    if (!sokTraffar) { senastZoomadRef.current = ''; senastSokRef.current = ''; return }
    if (!kartaKlar) return
    const id = setTimeout(async () => {
      const map = mapRef.current
      if (!map) return
      // Samma träffar som listan och pinnarna (sokTraffar), inom valda kategorier.
      const traffar = pois.filter(p => sokTraffar.has(p) && (isAllMode || activeCats.has(categorize(p))))
      if (traffar.length === 0) return
      // Mobil: listan ligger ovanpå kartans nedre del. Helskärmslistan döljer
      // kartan, så där zoomar vi inte (det görs när listan fälls ned igen).
      const mobil = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches
      if (mobil && sheetState === 'full') return
      const sokNyckel = `${query.trim().toLowerCase()}|${isAllMode ? 'alla' : [...activeCats].sort().join(',')}|${traffar.length}`
      const nyckel = `${sokNyckel}|${mobil ? sheetState : 'dator'}`
      if (senastZoomadRef.current === nyckel) return
      const nySokning = senastSokRef.current !== sokNyckel
      if (nySokning) {
        anvandarFlyttatRef.current = false
      } else if (anvandarFlyttatRef.current) {
        // Bara listans läge ändrades, och du har själv flyttat kartan: stå kvar.
        return
      }
      senastZoomadRef.current = nyckel
      senastSokRef.current = sokNyckel
      // Hur mycket av kartans nederkant listan täcker, så att träffarna hamnar
      // i den synliga delen ovanför listan och inte under den.
      let tacktNere = 0
      const behallare = map.getContainer()
      if (mobil && behallare) {
        const lista = behallare.closest('.upx-split')?.querySelector('.upx-list')
        if (lista) {
          tacktNere = Math.max(0, behallare.getBoundingClientRect().bottom - lista.getBoundingClientRect().top)
        }
      }
      const maplibregl = await hamtaMaplibre()
      const ram = new maplibregl.LngLatBounds()
      for (const p of traffar) ram.extend([p.longitude, p.latitude])
      autoFlyttRef.current = true
      map.fitBounds(ram, { padding: { top: 48, left: 48, right: 48, bottom: 48 + tacktNere }, maxZoom: tillMaplibreZoom(13), duration: 600 })
      // Om kartan redan stod rätt kommer ingen moveend; släpp flaggan ändå.
      setTimeout(() => { autoFlyttRef.current = false }, 1200)
    }, 450)
    return () => clearTimeout(id)
  }, [sokTraffar, pois, isAllMode, activeCats, kartaKlar, query, sheetState])

  // ── Hover-state: byt nålens utseende för aktiv plats ──────────────────
  const lastHoveredRef = useRef<string | null>(null)
  useEffect(() => {
    hoveredIdRef.current = hoveredId
    const satt = (id: string | null, aktiv: boolean) => {
      if (!id) return
      const m = markersRef.current.get(id)
      if (!m?.poi) return
      // classList, inte className: MapLibre har egna klasser på elementet som styr placeringen.
      m.el.classList.toggle('svalla-pin-active', aktiv)
      m.el.style.zIndex = aktiv ? '10' : ''
    }
    const prev = lastHoveredRef.current
    if (prev && prev !== hoveredId) satt(prev, false)
    satt(hoveredId, true)
    lastHoveredRef.current = hoveredId
  }, [hoveredId])

  // ── Mobile tab-byte: vid switch till "map" måste Leaflet få veta att
  // dess container nu har storlek (var display:none innan). Annars
  // renderas pinnar på fel position eller kartan blir helt grå.
  const switchMobileTab = useCallback((tab: 'list' | 'map') => {
    setMobileTab(tab)
    if (tab === 'map') {
      // Vänta en tick så DOM hunnit uppdateras
      setTimeout(() => { mapRef.current?.resize() }, 50)
    }
  }, [])

  // ── GPS: "Visa min plats" — centrera + blå punkt med noggrannhetscirkel ─
  const handleGps = useCallback(async () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) return
    if (gpsState === 'denied') return
    const map = mapRef.current
    if (!map) return

    setGpsState('loading')
    const maplibregl = await hamtaMaplibre()

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, accuracy } = pos.coords
        gpsMarkerRef.current?.remove()
        const kalla = map.getSource('gps-noggrannhet') as { setData?: (d: unknown) => void } | undefined
        kalla?.setData?.({
          type: 'FeatureCollection',
          features: accuracy && accuracy < 2000
            ? [{ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [cirkelRing(lat, lng, accuracy)] } }]
            : [],
        })
        const prick = document.createElement('div')
        prick.style.cssText = 'width:14px;height:14px;border-radius:50%;background:#3b82f6;border:2.5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.15)'
        prick.setAttribute('aria-hidden', 'true')
        gpsMarkerRef.current = new maplibregl.Marker({ element: prick }).setLngLat([lng, lat]).addTo(map)

        const z = tillLeafletZoom(map.getZoom())
        map.flyTo({ center: [lng, lat], zoom: tillMaplibreZoom(Math.max(z, 13)), duration: 900 })
        setGpsState('active')
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGpsState('denied')
        else setGpsState('idle')
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 }
    )
  }, [gpsState])

  // ── Toggle sidobar (desktop) — kartan behöver räkna om sin storlek ─────
  const toggleList = useCallback(() => {
    setListCollapsed(prev => {
      const next = !prev
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('upx-list-collapsed', next ? '1' : '0')
      }
      // Vänta tills CSS-transition börjat så kartan räknar om containern
      setTimeout(() => { mapRef.current?.resize() }, 280) // matchar grid-transition-duration
      return next
    })
  }, [])

  // ── Klick på listrad → fly till plats ──────────────────────────────────
  const flyTo = useCallback(async (poi: Poi) => {
    if (!mapRef.current) return
    const map = mapRef.current
    map.flyTo({ center: [poi.longitude, poi.latitude], zoom: tillMaplibreZoom(15), duration: 800 })
    setHoveredId(poi.id)
    // Öppna popup efter flygturen, när nålen ritats ur sitt kluster
    setTimeout(() => {
      const m = markersRef.current.get(poi.id)
      if (m && !m.marker.getPopup()?.isOpen()) m.marker.togglePopup()
    }, 900)
  }, [])

  // 2026-11-23 (menyförslaget): toppraden och upx-header mäts, så att kartans och
  // listans höjd på mobil räknas från den verkliga höjden. Förut stod en gissning
  // (130 px) som reserv, och variabeln sattes aldrig.
  const shellRef = useRef<HTMLDivElement>(null)
  const toppRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const shell = shellRef.current, topp = toppRef.current
    if (!shell || !topp || typeof ResizeObserver === 'undefined') return
    const satt = () => shell.style.setProperty('--upx-header-h', `${Math.round(topp.getBoundingClientRect().height)}px`)
    satt()
    const ro = new ResizeObserver(satt)
    ro.observe(topp)
    return () => ro.disconnect()
  }, [])

  // 2026-11-27 (Tom): regionraden ska glida in under kategoriknappen, utan
  // glapp och utan toning. Raden sträcker sig därför in bakom knappen, och
  // knappens bredd mäts så att "Alla" orullad står där den alltid stått.
  const filterRowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const rad = filterRowRef.current
    const knapp = rad?.querySelector<HTMLElement>('.upx-fdd')
    if (!rad || !knapp || typeof ResizeObserver === 'undefined') return
    const satt = () => rad.style.setProperty('--upx-fdd-w', `${knapp.getBoundingClientRect().width}px`)
    satt()
    const ro = new ResizeObserver(satt)
    ro.observe(knapp)
    return () => ro.disconnect()
  }, [])

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="upx-shell" ref={shellRef}>
      <div ref={toppRef} style={{ flexShrink: 0 }}>
      {/* 2026-11-25 (Tom): ingen topprad här, så att kartan får mer höjd. Sök ligger
          som en rund knapp på kartan (upx-sokknapp). Meddelanden och notiser nås via
          Profil i bottenmenyn, som får en prick när något är oläst (Nav.tsx). Från
          1024 px har sidomenyn sök, meddelanden och notiser som förut. */}
      {/* Header med region-toggle + filter-dropdown + sök */}
      <header className="upx-header">
        {/* En rad (2026-11-23, mer karta): kategorifiltret först, regionerna
            scrollar bredvid. Filtret ligger utanför den scrollande raden så att
            dess meny inte klipps. */}
        <div className="upx-filterrow" ref={filterRowRef}>
        <FilterDropdown
          chips={FILTER_CHIPS}
          counts={categoryCounts}
          activeIds={activeCats}
          onToggle={toggleCat}
          onClear={clearCats}
        />
        {/* Region-toggle pills */}
        <div className="upx-regions-bar">
          <button
            type="button"
            className={`upx-region-pill ${selectedRegion === 'all' ? 'active' : ''}`}
            onClick={() => {
              setSelectedRegion('all')
              track('filter_changed', { surface: 'upptack', filter: 'region', value: 'all' })
            }}
          >
            Alla
          </button>
          {(Object.entries(REGION_CONFIG) as Array<[RegionKey, typeof REGION_CONFIG['stockholm']]>).map(([key, config]) => {
            const count = pois.filter(p => upptackRegion(p) === key).length
            // En flik utan platser leder till en tom karta. Visa den inte
            // förrän regionen har innehåll (kort 08208bd8).
            if (count === 0 && selectedRegion !== key) return null
            return (
              <button
                key={key}
                type="button"
                className={`upx-region-pill ${selectedRegion === key ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRegion(key)
                  track('filter_changed', { surface: 'upptack', filter: 'region', value: key })
                }}
                title={`${config.label} (${count} platser)`}
              >
                {config.label}
              </button>
            )
          })}
        </div>
        </div>

        {/* Mobil: sökfältet döljs tills förstoringsglaset i toppraden öppnar
            det. Det visas också om en sökning redan är aktiv, t.ex. från en
            länk med ?q=, så att den går att se och rensa. Tomt och utan fokus
            stängs det igen. */}
        <div className={`upx-search ${query || sokOppen ? 'has-query' : ''}`}>
          <input
            ref={sokInputRef}
            type="search"
            enterKeyHint="search"
            placeholder="Sök plats, ö eller hamn…"
            aria-label="Sök plats, ö eller hamn på kartan"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={() => { if (!query) setSokOppen(false) }}
          />
          {(query || sokOppen) && (
            <button
              type="button"
              className="upx-clear"
              onMouseDown={e => e.preventDefault()}
              onClick={() => { setQuery(''); setSokOppen(false) }}
              aria-label="Rensa och stäng sök"
            >×</button>
          )}
        </div>
        {/* Mobil: vägen till sajtens söksida finns kvar, med sökordet med sig. */}
        {query.trim() && (
          <Link href={`/sok?q=${encodeURIComponent(query.trim())}`} className="upx-sok-hela">
            Sök efter ”{query.trim()}” på hela Svalla →
          </Link>
        )}
      </header>
      </div>

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
      <div className={`upx-split ${listCollapsed ? 'list-collapsed' : ''} sheet-${sheetState}`}>
        {/* Lista */}
        <aside
          className={`upx-list ${mobileTab === 'list' ? 'mob-show' : 'mob-hide'}`}
          ref={listScrollRef}
        >
          {/* Mobile bottom-sheet drag-handle. Klick cyclar genom snap-points. */}
          <button
            type="button"
            className="upx-sheet-handle"
            onClick={cycleSheet}
            aria-label={`Lista (${sheetState === 'min' ? 'minimerad: visa mer' : sheetState === 'half' ? 'halvskärm: visa mer' : 'helskärm: minimera'})`}
          >
            <span className="upx-sheet-grip" aria-hidden />
          </button>

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
              {sokTraffar && sokTraffar.size === 0 ? (
                <>
                  <p>Ingen plats på kartan matchar ”{query.trim()}”.</p>
                  {/* Mobil har redan raden under sökrutan, så knappen visas bara på dator. */}
                  <Link href={`/sok?q=${encodeURIComponent(query.trim())}`} className="upx-empty-cta upx-empty-cta-dator">
                    Sök på hela Svalla
                  </Link>
                </>
              ) : (
                <p>Inga platser här. Panorera kartan eller justera filtret.</p>
              )}
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
                  {p.image_url && !trasigaBilder.has(p.id) ? (
                    <Image
                      onError={() => setTrasigaBilder(prev => new Set(prev).add(p.id))}
                      src={p.image_url}
                      alt={p.name}
                      fill
                      sizes="120px"
                      style={{ objectFit: 'cover' }}
                      unoptimized={p.image_url.startsWith('/api/places/photo/')}
                    />
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
                    {p.endast_medlemmar && <span className="upx-card-medlem">Endast medlemmar</span>}
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
          <a
            className="upx-attr"
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            © OpenStreetMap · OpenMapTiles · OpenFreeMap · OpenSeaMap
          </a>
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

          {/* Sök på kartan (mobil): rund knapp överst till höger, ovanför + och −.
              Öppnar sökfältet i rubriken, som filtrerar kartan och listan på namn.
              Över 900 px står sökfältet alltid framme och knappen döljs. */}
          <button
            type="button"
            className="upx-sokknapp"
            onClick={oppnaSok}
            aria-label="Sök plats, ö eller hamn på kartan"
          >
            <Icon name="search" size={20} stroke={2} />
          </button>

          {/* "Visa min plats" — bottom-left på kartan */}
          <button
            type="button"
            className={`upx-locate ${gpsState}`}
            onClick={handleGps}
            disabled={gpsState === 'loading'}
            aria-label={gpsState === 'denied' ? 'GPS-åtkomst nekad' : 'Visa min position'}
            title={gpsState === 'denied' ? 'GPS nekad: aktivera i webbläsarens inställningar' : 'Visa min position'}
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
            <WeatherPill lat={(vaderLas ?? mapCenter).lat} lng={(vaderLas ?? mapCenter).lng} />
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
          /* z-index utan position gäller inte. .upx-fdd har z-index 2 så att
             knappen ligger över regionraden (Safari, 2026-11-27). Det skapar
             ett eget lager: panelens z-index 1000 gäller bara där inne, och
             hela menyn målas som lager 2. Kartans rutor ligger på 400 och
             listan på mobil på 500, så menyn hamnar under dem fast den är
             öppen. Rubriken är lagret menyn hör till. 640 är över de lagren,
             under zoomknapparna (1000) och "Tipsa oss" (800). */
          position: relative;
          z-index: 640;
        }
        /* 2026-11-25: ingen topprad ovanför längre (Tom). Sök finns på kartan,
           meddelanden och notiser via Profil i bottenmenyn. */
        .upx-filterrow {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
        }
        .upx-filterrow .upx-regions-bar {
          flex: 1;
          min-width: 0;
          /* Raden sträcker sig in bakom kategoriknappen (Tom 2026-11-27), så
             att namnen försvinner under knappen utan glapp och utan toning.
             --upx-fdd-w är knappens uppmätta bredd. Orullad står "Alla" som
             förut, 8 px från knappen. Utan mätning blir det som en vanlig
             klippning vid knappens kant. */
          margin: 0 -18px 0 calc(-1 * var(--upx-fdd-w, 0px) - 8px);
          /* Uttrycklig lagerordning: raden 1, knappen 2. Safari på iPhone lägger
             annars den rullande raden ovanpå knappen (Tom 2026-11-27, bild),
             eftersom raden kommer efter knappen i koden. */
          position: relative;
          z-index: 1;
          padding-left: calc(var(--upx-fdd-w, 0px) + 8px);
          scroll-padding-left: calc(var(--upx-fdd-w, 0px) + 8px);
        }
        /* Täcker det som rullar in bakom knappen. Samma färg som rubrikytan,
           så knappen ser ut som i dag även när den är tonad (hover, filter).
           Rak, inte rundad: annars tittar raden fram i knappens hörn. */
        .upx-filterrow .upx-fdd {
          background: var(--white, #fff);
          z-index: 2;
        }
        /* Region-toggle pills — horisontell scroll-bar bredvid kategori-filtret */
        .upx-regions-bar {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          padding: 0 -18px;
          margin: 0 -18px;
          padding-left: 18px;
          padding-right: 18px;
          flex-shrink: 0;
        }
        .upx-regions-bar::-webkit-scrollbar {
          display: none;
        }
        .upx-region-pill {
          flex-shrink: 0;
          padding: 7px 14px;
          border: 1px solid rgba(10, 123, 140, 0.16);
          border-radius: 12px;
          background: var(--white, #fff);
          color: var(--txt);
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background 120ms ease, border-color 120ms ease, color 120ms ease;
          white-space: nowrap;
        }
        .upx-region-pill:hover {
          background: rgba(10, 123, 140, 0.04);
          border-color: rgba(10, 123, 140, 0.28);
        }
        .upx-region-pill.active {
          background: var(--sea, #1e5c82);
          color: #fff;
          border-color: var(--sea, #1e5c82);
        }
        /* (Tidigare .upx-filters / .upx-chip ersatt av FilterDropdown) */
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
        .upx-search input { -webkit-appearance: none; appearance: none; }
        .upx-search input::-webkit-search-cancel-button { display: none; }
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
        .upx-sok-hela { display: none; }

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
          grid-template-columns: minmax(260px, 300px) 1fr;
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
          width: 80px;
          height: 68px;
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
          flex-wrap: wrap;
          gap: 3px 4px;
          align-items: center;
          min-width: 0;
        }
        .upx-card-cat { font-weight: 700; }
        .upx-card-island { color: var(--txt3); }
        /* Etiketten radbryts under kategorin när raden är full i stället för att gå ut över kortets kant (granskningen 2026-11-23). */
        .upx-card-medlem { margin-left: 2px; font-size: 10px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; color: var(--acc-d, #9e5318); background: rgba(201,110,42,0.14); border-radius: 999px; padding: 1px 7px; white-space: nowrap; max-width: 100%; }
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
        /* OSM-attribution. Liten rad i nederkanten, som på en vanlig karta.
           På dator sitter den till vänster om "Tipsa oss" och under vädret.
           Ingen kapsel och ingen skugga. */
        .svalla-pin .nal-aktiv { display: none; }
        .svalla-pin.svalla-pin-active .nal-vanlig { display: none; }
        .svalla-pin.svalla-pin-active .nal-aktiv { display: block; }
        .svalla-pin { cursor: pointer; }
        .upx-attr {
          position: absolute;
          z-index: 500;
          right: 168px;
          bottom: 6px;
          left: auto;
          top: auto;
          padding: 0 2px;
          border-radius: 2px;
          background: rgba(255, 253, 248, 0.45);
          color: rgba(30, 48, 58, 0.7);
          border: none;
          box-shadow: none;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: 0;
          text-decoration: none;
          white-space: nowrap;
        }
        .upx-attr:hover { color: rgba(30, 48, 58, 0.88); }
        [data-theme="dark"] .upx-attr {
          background: rgba(8, 16, 24, 0.4);
          color: rgba(236, 244, 250, 0.82);
          box-shadow: none;
        }
        [data-theme="dark"] .upx-attr:hover { color: rgba(255, 255, 255, 0.92); }

        /* Sökknappen på kartan (2026-11-25). Bara på mobil, se mediefrågan nedan. */
        .upx-sokknapp { display: none; }

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

        /* Vädervisare — bottom-right.
           Måste hålla sig ovanför den globala "Tipsa oss"-knappen
           (FeedbackWidget, fixed, z-index 800). Med bottom:18px låg pillret
           helt under knappen. Se --fb-top i globals.css. */
        .upx-weather-wrap {
          position: absolute;
          bottom: calc(var(--fb-top) + 10px);
          right: 18px;
          z-index: 500;
          pointer-events: auto;
        }

        /* Mobile: stack karta (50vh) ovanpå lista — båda alltid synliga.
           Ingen tab-toggle, ingen display:none. Leaflet får real height
           från start så tiles + pinnar renderas direkt. */
        /* Drag-handle på bottom-sheet (visas bara på mobile) */
        .upx-sheet-handle {
          display: none;
        }
        @media (max-width: 900px) {
          .upx-mob-tabs { display: none !important; }
          .upx-search:not(.has-query) { display: none; }
          /* Rund sökknapp, 44 px tryckyta, i samma vita stil som + och −.
             Leaflets +/− flyttas ner under den så att kartknapparna står i en kolumn. */
          .upx-sokknapp {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 600;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: var(--white, #fff);
            color: var(--sea, #1e5c82);
            border: 1px solid rgba(10, 123, 140, 0.15);
            box-shadow: 0 4px 14px rgba(10, 30, 50, 0.15);
            cursor: pointer;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
          }
          .upx-sokknapp:active { background: var(--sea, #1e5c82); color: #fff; }
          .upx-map .maplibregl-ctrl-top-right { top: 54px; }
          /* Ovanför listans minsta läge, GPS-knappen och cookieremsan.
             Vädret och "Tipsa oss" tar höger sida. */
          .upx-attr { left: 54px; right: auto; bottom: 118px; }
          .upx-split.sheet-half .upx-attr { bottom: calc(50dvh + 14px); }
          .upx-split.sheet-full .upx-attr { top: 4px; bottom: auto; left: 8px; }
          .upx-empty-cta-dator { display: none; }
          .upx-sok-hela {
            display: block;
            margin-top: 6px;
            padding: 4px 2px;
            font-size: 13px;
            font-weight: 600;
            color: var(--sea, #1e5c82);
            text-decoration: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .upx-header { padding-top: 10px; padding-bottom: 10px; }
          .upx-split {
            /* Mobile: kartan tar full höjd; listan blir ett bottom-sheet ovanpå */
            display: block;
            position: relative;
            height: calc(100vh - var(--upx-header-h, 190px) - var(--nav-h, 64px));
            /* dvh = den synliga höjden. 100vh räknar på iPhone med Safaris adressfält,
               så listan blev högre än skärmen och handtaget hamnade utanför. */
            height: calc(100dvh - var(--upx-header-h, 190px) - var(--nav-h, 64px));
          }

          /* Karta = full höjd bakom sheet */
          .upx-map-wrap {
            display: block !important;
            position: absolute !important;
            inset: 0;
            height: auto !important;
            min-height: 0;
          }

          /* Bottom-sheet: position fixed (men inom .upx-split-kontext) */
          .upx-list,
          .upx-split.list-collapsed .upx-list {
            opacity: 1 !important;
            pointer-events: auto !important;
            display: flex !important;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            border-right: none;
            border-top: none;
            border-radius: 22px 22px 0 0;
            background: var(--white, #fff);
            box-shadow: 0 -8px 28px rgba(0, 30, 45, 0.14);
            padding: 0 14px 24px;
            min-height: 0;
            max-height: none;
            transition: height 280ms cubic-bezier(0.32, 0.72, 0, 1);
            z-index: 500;
            overflow: hidden;
          }

          /* Snap-points: cyclas via handle-knappen */
          .upx-split.sheet-min  .upx-list { height: 64px; padding-bottom: 8px; }
          .upx-split.sheet-half .upx-list { height: 50vh; height: 50dvh; }
          /* Halv- och helskärm går att skrolla med fingret; handtaget står kvar överst. */
          .upx-split.sheet-half .upx-list,
          .upx-split.sheet-full .upx-list { overflow-y: auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
          /* Halvöppen lista: kartan slutar strax under listans överkant, så att
             kartans mitt är mitten av det du ser. Annars zoomar + och − mot en
             punkt under listan, och vädret visar platsen som listan döljer. */
          .upx-map { transition: height 280ms cubic-bezier(0.32, 0.72, 0, 1); }
          .upx-split.sheet-half .upx-map { height: calc(100% - 50vh + 24px); height: calc(100% - 50dvh + 24px); }
          /* Helskärm räknas från listans egen ruta, inte skärmen: överkanten kan
             då aldrig hamna ovanför filterraden, hur webbläsaren än räknar höjd. */
          .upx-split.sheet-full .upx-list { height: calc(100% - 24px); }

          /* När minimerat: göm scrollande innehåll så bara handle + count syns */
          .upx-split.sheet-min .upx-list > *:not(.upx-sheet-handle):not(.upx-list-meta) {
            display: none !important;
          }
          .upx-split.sheet-min .upx-list-meta { padding-top: 0; }
          .upx-split.sheet-min .upx-sheet-handle { height: 20px; margin: 4px 0 0; }

          /* Drag-handle */
          .upx-sheet-handle {
            display: flex !important;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 26px;
            background: transparent;
            border: none;
            padding: 0;
            margin: 4px 0 2px;
            cursor: pointer;
            touch-action: manipulation;
            /* Handtaget står kvar överst även om listan skrollats, t.ex. när ett
               tryck på en kartnål skrollar fram kortet. Annars kommer man inte
               tillbaka till kartan. */
            position: sticky;
            top: 0;
            z-index: 2;
            flex-shrink: 0;
            background: var(--white, #fff);
          }
          .upx-sheet-grip {
            display: block;
            width: 44px;
            height: 5px;
            border-radius: 999px;
            background: rgba(10, 123, 140, 0.28);
            transition: background 120ms ease, width 120ms ease;
          }
          .upx-sheet-handle:hover .upx-sheet-grip,
          .upx-sheet-handle:active .upx-sheet-grip {
            background: rgba(10, 123, 140, 0.5);
            width: 52px;
          }

          .upx-list-toggle { display: none; }
          .upx-list-reopen { display: none; }
          /* Kompaktare cards i smal vy */
          .upx-card { padding: 8px; gap: 10px; }
          .upx-card-img { width: 72px; height: 60px; }
          .upx-card-title { font-size: 13.5px; }
          .upx-card-desc { -webkit-line-clamp: 1; }
          /* Mindre kart-knappar på mobil — flytta upp ovanför sheet (sheet-min) */
          .upx-locate { width: 36px; height: 36px; bottom: 76px; left: 12px; }
          /* 76px lyfter pillret ovanför bottom-sheet i sheet-min-läget (64px), men
             på mobil ligger "Tipsa oss"-knappen högre än så (--nav-h är 64px
             här mot 0 på desktop). max() tar det som råkar vara högst. */
          .upx-weather-wrap { bottom: max(76px, calc(var(--fb-top) + 10px)); right: 12px; }
          .upx-split.sheet-half .upx-locate,
          .upx-split.sheet-half .upx-weather-wrap { bottom: calc(50vh + 12px); bottom: calc(50dvh + 12px); }
          .upx-split.sheet-full .upx-locate,
          .upx-split.sheet-full .upx-weather-wrap,
          .upx-split.sheet-full .upx-sokknapp,
          /* Kartans + och − hamnade ovanpå listans första kort i helskärm
             (Toms iPhone 2026-11-25). Kartan syns inte då, så knapparna gör inget. */
          .upx-split.sheet-full .maplibregl-ctrl-group { display: none; }
        }
      ` }} />
    </div>
  )
}

// ─── FilterDropdown ────────────────────────────────────────────────────────
/**
 * Multi-select dropdown för kategori-filter.
 *
 * Tom set = "Alla kategorier" (visa allt). Klick på en kategori togglar
 * dess närvaro i set:et. Panelen stängs INTE vid val — användaren kan
 * markera flera och stänger genom click utanför eller Esc.
 *
 * "Allt"-raden i panelen är specialfall: visar checkmark när set är tom
 * och klick anropar onClear (rensar alla val).
 */
function FilterDropdown<T extends string>({
  chips, counts, activeIds, onToggle, onClear,
}: {
  chips: ReadonlyArray<{ id: 'all' | T; label: string }>
  counts: Record<'all' | T, number>
  activeIds: Set<T>
  onToggle: (id: T) => void
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Click utanför → stäng
  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // ── Knapp-label ──
  // Tom = "Alla kategorier". 1 vald = labelen. 2+ = "X kategorier".
  const isAll = activeIds.size === 0
  let buttonLabel: string
  let buttonCount: number
  if (isAll) {
    buttonLabel = 'Alla kategorier'
    buttonCount = counts.all ?? 0
  } else if (activeIds.size === 1) {
    const onlyId = Array.from(activeIds)[0]
    const chip = chips.find(c => c.id === onlyId)
    buttonLabel = chip?.label ?? 'Filter'
    buttonCount = counts[onlyId as 'all' | T] ?? 0
  } else {
    buttonLabel = `${activeIds.size} kategorier`
    // Summa över valda kategorier
    let sum = 0
    activeIds.forEach(id => { sum += counts[id as 'all' | T] ?? 0 })
    buttonCount = sum
  }

  return (
    <div className="upx-fdd" ref={wrapRef}>
      <button
        type="button"
        className={`upx-fdd-btn ${!isAll ? 'has-filter' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
          stroke="currentColor" strokeWidth={2.2}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="6" y1="12" x2="18" y2="12"/>
          <line x1="9" y1="18" x2="15" y2="18"/>
        </svg>
        <span className="upx-fdd-label">{buttonLabel}</span>
        <span className="upx-fdd-count">{buttonCount}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth={2.4}
          strokeLinecap="round" strokeLinejoin="round"
          style={{
            transition: 'transform 160ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            marginLeft: 2,
          }}
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {open && (
        <div className="upx-fdd-panel" role="listbox" aria-multiselectable="true">
          {chips.map(c => {
            const count = counts[c.id] ?? 0
            const isAllRow = c.id === 'all'
            const selected = isAllRow ? isAll : activeIds.has(c.id as T)
            return (
              <button
                key={c.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`upx-fdd-item ${selected ? 'selected' : ''}`}
                onClick={() => {
                  if (isAllRow) onClear()
                  else onToggle(c.id as T)
                  // Stäng INTE — multi-select pattern. Bara "Allt" stänger.
                  if (isAllRow) setOpen(false)
                }}
              >
                {/* Checkbox-ruta (eller radio för Allt) */}
                <span className={`upx-fdd-check ${selected ? 'on' : ''} ${isAllRow ? 'radio' : ''}`} aria-hidden>
                  {selected && (
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none"
                      stroke="#fff" strokeWidth={3.5}
                      strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </span>
                <span className="upx-fdd-item-label">{c.label}</span>
                <span className="upx-fdd-item-count">{count}</span>
              </button>
            )
          })}

          {/* Footer med "Rensa alla" — bara om något är valt */}
          {!isAll && (
            <div className="upx-fdd-footer">
              <button type="button" className="upx-fdd-clear" onClick={() => { onClear(); setOpen(false) }}>
                Rensa alla
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        .upx-fdd {
          position: relative;
          flex-shrink: 0;
        }
        .upx-fdd-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px 8px 12px;
          border-radius: 12px;
          background: var(--white, #fff);
          border: 1px solid rgba(10, 123, 140, 0.16);
          color: var(--txt);
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0, 30, 45, 0.06);
          transition: background 120ms ease, border-color 120ms ease;
        }
        .upx-fdd-btn:hover {
          background: rgba(10, 123, 140, 0.04);
          border-color: rgba(10, 123, 140, 0.28);
        }
        .upx-fdd-btn.has-filter {
          /* Aktivt filter applicerat — ge knappen en distinkt accent */
          background: rgba(10, 123, 140, 0.06);
          border-color: rgba(10, 123, 140, 0.34);
        }
        .upx-fdd-label { color: var(--txt); }
        .upx-fdd-count {
          background: var(--sea, #1e5c82);
          color: #fff;
          padding: 2px 9px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 800;
          letter-spacing: 0;
          min-width: 22px;
          text-align: center;
        }
        .upx-fdd-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          min-width: 220px;
          background: var(--white, #fff);
          border-radius: 14px;
          border: 1px solid rgba(10, 123, 140, 0.10);
          box-shadow: 0 12px 32px rgba(0, 30, 45, 0.16);
          padding: 6px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 2px;
          animation: upxFddIn 140ms ease-out;
        }
        @keyframes upxFddIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .upx-fdd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          background: transparent;
          border: none;
          color: var(--txt);
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: background 100ms ease;
        }
        .upx-fdd-item:hover {
          background: rgba(10, 123, 140, 0.06);
        }
        .upx-fdd-item.selected {
          background: rgba(10, 123, 140, 0.08);
          color: var(--sea, #1e5c82);
        }
        .upx-fdd-item-label { flex: 1; }
        .upx-fdd-item-count {
          background: rgba(10, 123, 140, 0.10);
          color: var(--txt3);
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 700;
          min-width: 24px;
          text-align: center;
        }
        .upx-fdd-item.selected .upx-fdd-item-count {
          background: var(--sea, #1e5c82);
          color: #fff;
        }
        /* Checkbox-ruta (eller radio för "Allt") */
        .upx-fdd-check {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          border-radius: 5px;
          border: 1.6px solid rgba(10, 123, 140, 0.32);
          background: var(--white, #fff);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background 100ms ease, border-color 100ms ease;
        }
        .upx-fdd-check.radio { border-radius: 50%; }
        .upx-fdd-check.on {
          background: var(--sea, #1e5c82);
          border-color: var(--sea, #1e5c82);
        }
        /* Footer med rensa-knapp */
        .upx-fdd-footer {
          margin-top: 4px;
          padding-top: 6px;
          border-top: 1px solid rgba(10, 123, 140, 0.10);
          display: flex;
          justify-content: flex-end;
        }
        .upx-fdd-clear {
          background: transparent;
          border: none;
          color: var(--sea, #1e5c82);
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 100ms ease;
        }
        .upx-fdd-clear:hover {
          background: rgba(10, 123, 140, 0.08);
        }

        /* Mobile: panelen tar full bredd från knappens vänsterkant */
        @media (max-width: 720px) {
          .upx-fdd-panel { min-width: min(280px, calc(100vw - 32px)); }
        }
      `}</style>
    </div>
  )
}
