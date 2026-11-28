'use client'
/**
 * Testsida: samma vy i tre kartstilar, för skärmbilder sida vid sida.
 * ?stil=idag|lugn|skargard&vy=oversikt|mellersta|moja
 * idag     = Leaflet + tile.openstreetmap.org + OpenSeaMap 0.45 (som Utforska i dag)
 * lugn     = MapLibre + /kartstil/svalla.json, sjömärken från zoom 14 (som platssidan)
 * skargard = MapLibre + /kartstil/svalla-skargard.json, sjömärken från zoom 11
 * Nålarna är Svallas riktiga platser, utan klustring.
 */
import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import { SEAMARK_TILE } from '@/lib/map-tiles'
import { pinHtml, PIN_SIZE, PIN_ANCHOR } from '@/lib/kartnal'
import { platsKategori } from '@/lib/platskategori'

const VYER = {
  oversikt: { center: [59.40, 18.70] as [number, number], zoom: 9 },
  mellersta: { center: [59.37, 18.78] as [number, number], zoom: 11 },
  moja: { center: [59.425, 18.895] as [number, number], zoom: 13 },
}
type Poi = { latitude: number; longitude: number; type: string | null; categories: string[] | null; name: string; description: string | null }

export default function Jamforelse() {
  const div = useRef<HTMLDivElement>(null)
  const [klar, setKlar] = useState(false)

  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const stil = q.get('stil') ?? 'skargard'
    const vy = VYER[(q.get('vy') ?? 'oversikt') as keyof typeof VYER] ?? VYER.oversikt
    let stad: (() => void) | null = null
    ;(async () => {
      const svar = await fetch('/api/discovery?type=poi')
      const pois: Poi[] = svar.ok ? await svar.json() : []
      if (!div.current) return
      if (stil === 'idag') {
        const L = (await import('leaflet')).default
        const map = L.map(div.current, { center: vy.center, zoom: vy.zoom, zoomControl: false })
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap' }).addTo(map)
        L.tileLayer(SEAMARK_TILE, { maxZoom: 18, opacity: 0.45 }).addTo(map)
        for (const p of pois) {
          L.marker([p.latitude, p.longitude], { icon: L.divIcon({ html: pinHtml(platsKategori(p)), className: '', iconSize: PIN_SIZE, iconAnchor: PIN_ANCHOR }) }).addTo(map)
        }
        setTimeout(() => setKlar(true), 3000)
        stad = () => map.remove()
      } else {
        const maplibregl = (await import('maplibre-gl')).default
        const map = new maplibregl.Map({
          container: div.current,
          style: stil === 'lugn' ? '/kartstil/svalla.json' : '/kartstil/svalla-skargard.json',
          center: [vy.center[1], vy.center[0]], zoom: vy.zoom,
        })
        map.on('load', () => {
          map.addSource('sjomarken', { type: 'raster', tiles: [SEAMARK_TILE], tileSize: 256, maxzoom: 18 })
          map.addLayer({ id: 'sjomarken', type: 'raster', source: 'sjomarken', minzoom: stil === 'lugn' ? 14 : 11, paint: { 'raster-opacity': 0.85 } })
        })
        for (const p of pois) {
          const el = document.createElement('div')
          el.innerHTML = pinHtml(platsKategori(p))
          new maplibregl.Marker({ element: el, anchor: 'bottom', offset: [0, 1] }).setLngLat([p.longitude, p.latitude]).addTo(map)
        }
        map.once('idle', () => setTimeout(() => setKlar(true), 800))
        stad = () => map.remove()
      }
    })()
    return () => { stad?.() }
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#fff' }}>
      <div ref={div} style={{ width: '100%', height: '100%' }} />
      {klar && <div id="karta-klar" style={{ display: 'none' }} />}
    </div>
  )
}
