'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: interaktiv karta på startsidan, efter förebild från
 * nyctourism.com ("On the map"-panelen med antal per kategori och sökrutan på kartan).
 *
 * Platserna är samma som på /upptack (/api/discovery?type=poi) och öarna kommer
 * ur island-data via /api/sokindex. Antalen räknas ur datan, inget skrivs in för hand.
 * Leaflet och kartrutorna laddas först när kartan närmar sig skärmen, så startsidan
 * blir inte långsammare.
 *
 * På mobil följer sidan med när man drar med ett finger; kartan tar över först
 * när man tryckt på den.
 */
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { hamtaLeaflet } from '@/app/upptack/leaflet'
import { baseTile, SEAMARK_TILE, ZOOM_SV } from '@/lib/map-tiles'
import SnabbSok, { hamtaSokindex, type Post } from './SnabbSok'
import { platsKategori } from '@/lib/platskategori'
import { pinHtml, pinMiniSvg, PIN_SIZE, PIN_ANCHOR } from '@/lib/kartnal'

type Poi = { id: string; name: string; latitude: number; longitude: number; type: string | null; categories: string[] | null; description: string | null; image_url: string | null; slug: string | null; island: string | null }
type Kat = 'o' | 'krog' | 'butik' | 'hamn' | 'naturhamn' | 'brygga' | 'boende' | 'bad' | 'bastu' | 'bensin' | 'sevardhet' | 'annat'
type Punkt = { id: string; namn: string; lat: number; lng: number; kat: Kat; under: string; bild?: string; href?: string }

/** Samma indelning som /upptack (src/lib/platskategori.ts), plus öarna. */
const kategori = (p: Poi): Kat => platsKategori(p)

const KAT: Record<Kat, { namn: string }> = {
  o:         { namn: 'Öar' },
  krog:      { namn: 'Krogar och caféer' },
  butik:     { namn: 'Butiker' },
  hamn:      { namn: 'Gästhamnar' },
  naturhamn: { namn: 'Naturhamnar' },
  brygga:    { namn: 'Bryggor' },
  boende:    { namn: 'Boende' },
  bad:       { namn: 'Bad' },
  bastu:     { namn: 'Bastu' },
  bensin:    { namn: 'Sjömackar' },
  sevardhet: { namn: 'Sevärdheter' },
  annat:     { namn: 'Övrigt' },
}
const ORDNING: Kat[] = ['o', 'krog', 'butik', 'hamn', 'naturhamn', 'brygga', 'boende', 'bad', 'bastu', 'bensin', 'sevardhet', 'annat']

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

// Nålarna ritas av src/lib/kartnal.ts, samma formfamiljer som Utforska.
// Förklaringen i panelen visar samma nålar i liten storlek (pinMiniSvg).
// KAT ovan styr bara namnen i förklaringen och popupens text.

type LeafletNS = Awaited<ReturnType<typeof hamtaLeaflet>>
type Karta = ReturnType<LeafletNS['map']>
type Kluster = { clearLayers(): void; addLayers(m: unknown[]): void; addTo(m: Karta): void }

export default function StartKarta() {
  const rot = useRef<HTMLDivElement>(null)
  const kartDiv = useRef<HTMLDivElement>(null)
  const karta = useRef<Karta | null>(null)
  const kluster = useRef<Kluster | null>(null)
  const [synlig, setSynlig] = useState(false)
  const [punkter, setPunkter] = useState<Punkt[] | null>(null)
  const [fel, setFel] = useState(false)
  const [vald, setVald] = useState<Kat | 'alla'>('alla')
  const [aktiv, setAktiv] = useState(false)
  const [mobil, setMobil] = useState(false)

  // Ladda först när kartan närmar sig skärmen.
  useEffect(() => {
    const el = rot.current
    if (!el) return
    const io = new IntersectionObserver(e => { if (e.some(x => x.isIntersecting)) { setSynlig(true); io.disconnect() } }, { rootMargin: '600px 0px' })
    io.observe(el)
    setMobil(window.matchMedia('(max-width: 820px)').matches)
    return () => io.disconnect()
  }, [])

  // Data: platserna från /upptack och öarna ur island-data.
  useEffect(() => {
    if (!synlig) return
    Promise.all([
      fetch('/api/discovery?type=poi').then(r => (r.ok ? r.json() : [])).catch(() => []),
      hamtaSokindex().catch(() => [] as Post[]),
    ]).then(([pois, index]: [Poi[], Post[]]) => {
      const p: Punkt[] = []
      for (const o of index) {
        if (o.k === 'Ö' && typeof o.la === 'number' && typeof o.lo === 'number') {
          p.push({ id: 'o-' + o.h, namn: o.t, lat: o.la, lng: o.lo, kat: 'o', under: o.u ?? 'Ö', bild: o.b, href: o.h })
        }
      }
      for (const x of Array.isArray(pois) ? pois : []) {
        if (typeof x.latitude !== 'number' || typeof x.longitude !== 'number') continue
        const k = kategori(x)
        p.push({ id: x.id, namn: x.name, lat: x.latitude, lng: x.longitude, kat: k, under: [KAT[k].namn, x.island].filter(Boolean).join(' · '), bild: x.image_url ?? undefined, href: x.slug ? `/upptack/${x.slug}` : undefined })
      }
      if (p.length === 0) setFel(true)
      setPunkter(p)
    })
  }, [synlig])

  const antal = useMemo(() => {
    const m = new Map<Kat, number>()
    punkter?.forEach(p => m.set(p.kat, (m.get(p.kat) ?? 0) + 1))
    return m
  }, [punkter])
  const visade = useMemo(() => (punkter ?? []).filter(p => vald === 'alla' || p.kat === vald), [punkter, vald])

  // Skapa kartan.
  useEffect(() => {
    if (!synlig || !kartDiv.current || karta.current) return
    let avbruten = false
    hamtaLeaflet().then(L => {
      if (avbruten || !kartDiv.current || karta.current) return
      const ar_mobil = window.matchMedia('(max-width: 820px)').matches
      const m = L.map(kartDiv.current, { center: [59.0, 16.5], zoom: 6, zoomControl: false, scrollWheelZoom: false, dragging: !ar_mobil, attributionControl: true })
      const t = baseTile()
      L.tileLayer(t.url, { maxZoom: 18, attribution: t.attr }).addTo(m)
      L.tileLayer(SEAMARK_TILE, { opacity: 0.45, maxZoom: 18 }).addTo(m)
      L.control.zoom({ position: 'topright', ...ZOOM_SV }).addTo(m)
      const La = L as unknown as { markerClusterGroup: (o: object) => Kluster }
      const k = La.markerClusterGroup({
        showCoverageOnHover: false,
        spiderfyOnMaxZoom: true,
        disableClusteringAtZoom: 13,
        maxClusterRadius: (z: number) => (z < 8 ? 70 : z < 11 ? 45 : 25),
        iconCreateFunction: (c: { getChildCount(): number }) => {
          const n = c.getChildCount()
          const s = n >= 100 ? 50 : n >= 20 ? 44 : 38
          return L.divIcon({ html: `<div class="skn-kluster" style="width:${s}px;height:${s}px">${n}</div>`, className: 'skn-kluster-yttre', iconSize: [s, s] })
        },
      })
      k.addTo(m)
      karta.current = m
      kluster.current = k
      setPunkter(p => (p ? [...p] : p)) // rita markörerna om datan redan kommit
    }).catch(() => setFel(true))
    return () => { avbruten = true }
  }, [synlig])

  useEffect(() => () => { karta.current?.remove(); karta.current = null }, [])

  // Rita markörerna när datan eller valet ändras.
  useEffect(() => {
    const m = karta.current, k = kluster.current
    if (!m || !k || !punkter) return
    let avbruten = false
    hamtaLeaflet().then(L => {
      if (avbruten) return
      k.clearLayers()
      const mark = visade.map(p => {
        const ikon = L.divIcon({ html: pinHtml(p.kat), className: 'skn-pin-yttre', iconSize: PIN_SIZE, iconAnchor: PIN_ANCHOR, popupAnchor: [0, -36] })
        const mk = L.marker([p.lat, p.lng], { icon: ikon, title: p.namn })
        mk.bindPopup(
          `<div class="skn-pop">${p.bild ? `<img src="${esc(p.bild)}" alt="" loading="lazy">` : ''}<div class="skn-pop-t"><strong>${esc(p.namn)}</strong><span>${esc(p.under)}</span>${p.href ? `<a href="${esc(p.href)}">${p.kat === 'o' ? 'Till ön' : 'Se mer'} →</a>` : ''}</div></div>`,
          { maxWidth: 260, minWidth: 220 },
        )
        return mk
      })
      k.addLayers(mark)
      if (visade.length) {
        const b = L.latLngBounds(visade.map(p => [p.lat, p.lng] as [number, number]))
        const desk = window.matchMedia('(min-width: 821px)').matches
        m.fitBounds(b, { paddingTopLeft: (desk ? [300, 30] : [20, 70]) as [number, number], paddingBottomRight: [30, 90] as [number, number], maxZoom: 11 })
      }
    })
    return () => { avbruten = true }
  }, [punkter, visade])

  const aktivera = () => { setAktiv(true); karta.current?.dragging.enable() }
  const aterstall = () => { setVald('alla'); karta.current?.closePopup() }
  const totalt = punkter?.length ?? 0

  return (
    <div className="skn" ref={rot}>
      <style>{SKN_CSS}</style>
      <div className="skn-ram">
        <div ref={kartDiv} className="skn-karta" aria-label="Karta över skärgården med öar, krogar, hamnar och boenden" />

        <div className="skn-panel">
          <div className="skn-tagg">Svalla-kartan</div>
          <div className="skn-lista" role="radiogroup" aria-label="Visa på kartan">
            <div className="skn-lista-rubrik">På kartan</div>
            <button type="button" role="radio" aria-checked={vald === 'alla'} className={vald === 'alla' ? 'pa' : undefined} onClick={() => setVald('alla')}>
              <span className="skn-prick skn-alla" aria-hidden="true" /><span className="skn-namn">Hela skärgården</span><span className="skn-antal">{punkter ? totalt : ''}</span>
            </button>
            <div className="skn-linje" />
            {ORDNING.filter(k => (antal.get(k) ?? 0) > 0).map(k => (
              <button key={k} type="button" role="radio" aria-checked={vald === k} className={vald === k ? 'pa' : undefined} onClick={() => setVald(k)}>
                <span className="skn-nal" aria-hidden="true" dangerouslySetInnerHTML={{ __html: pinMiniSvg(k, 22) }} />
                <span className="skn-namn">{KAT[k].namn}</span><span className="skn-antal">{antal.get(k)}</span>
              </button>
            ))}
            {!punkter && !fel && <div className="skn-laddar">Laddar platser…</div>}
            {fel && <div className="skn-laddar">Kartan gick inte att ladda just nu.</div>}
          </div>
        </div>

        <button type="button" className="skn-aterstall" onClick={aterstall}>Återställ</button>

        {mobil && !aktiv && (
          <button type="button" className="skn-aktivera" onClick={aktivera}>Tryck för att flytta i kartan</button>
        )}

        <div className="skn-sok"><SnabbSok lage="karta" /></div>
      </div>
    </div>
  )
}

const SKN_CSS = `
.skn{margin-top:8px}
.skn-ram{position:relative;height:660px;border-radius:20px;overflow:hidden;border:1px solid rgba(150,110,60,.18);box-shadow:0 14px 40px rgba(60,40,15,.12);background:#dfe9ec}
.skn-karta{position:absolute;inset:0;z-index:1}
.skn-karta .leaflet-control-zoom{border:none;margin:16px 16px 0 0;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.skn-karta .leaflet-control-zoom a{background:#14202a;color:#fff;border-color:#2b3944;width:36px;height:36px;line-height:36px}
.skn-karta .leaflet-control-zoom a:hover{background:#1e5c82}
.skn-karta .leaflet-control-attribution{font-size:10px;background:rgba(255,253,248,.8)}
.skn-panel{position:absolute;top:16px;left:16px;z-index:5;width:258px;pointer-events:none}
.skn-panel>*{pointer-events:auto}
.skn-tagg{display:inline-block;background:#14202a;color:#fff;font-weight:800;font-size:15px;padding:9px 13px;margin-bottom:8px;border-radius:4px}
.skn-lista{background:#14202a;color:#fff;border-radius:6px;padding:8px 6px;box-shadow:0 10px 28px rgba(0,0,0,.28)}
.skn-lista-rubrik{font-size:10.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#b9c4cb;padding:4px 8px 8px}
.skn-lista button{display:flex;align-items:center;gap:10px;width:100%;border:none;background:none;color:#fff;font:inherit;font-size:13.5px;text-align:left;padding:7px 8px;border-radius:5px;cursor:pointer}
.skn-lista button:hover{background:rgba(255,255,255,.07)}
.skn-lista button.pa{background:rgba(255,255,255,.14);font-weight:700}
.skn-prick{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#fff;border:2px solid #fff}
.skn-nal{flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px}
.skn-alla{background:conic-gradient(#1e5c82 0 25%,#c96e2a 0 50%,#0a7b3c 0 75%,#6d28d9 0)}
.skn-namn{flex:1;min-width:0}
.skn-antal{font-variant-numeric:tabular-nums;color:#c9d2d8;font-size:12.5px}
.skn-linje{height:1px;background:rgba(255,255,255,.12);margin:5px 8px}
.skn-laddar{font-size:12.5px;color:#c9d2d8;padding:8px}
.skn-aterstall{position:absolute;top:100px;right:16px;z-index:5;background:#14202a;color:#fff;border:none;border-radius:4px;font:inherit;font-size:12.5px;font-weight:700;padding:9px 12px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.25)}
.skn-aterstall:hover{background:#1e5c82}
.skn-sok{position:absolute;left:50%;bottom:22px;transform:translateX(-50%);z-index:6;width:min(620px,calc(100% - 32px))}
.skn-aktivera{position:absolute;inset:0;z-index:4;border:none;background:transparent;color:transparent;font:inherit;cursor:pointer}
.skn-aktivera::after{content:'Tryck för att flytta i kartan';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(20,32,42,.82);color:#fff;font-size:13px;font-weight:700;padding:9px 14px;border-radius:999px;white-space:nowrap}
.skn-pin-yttre,.skn-kluster-yttre{background:none;border:none}
.skn-kluster{display:flex;align-items:center;justify-content:center;border-radius:50%;background:#fff;color:#14202a;font:800 14px Inter,system-ui,sans-serif;border:4px solid #1e5c82;box-shadow:0 0 0 3px rgba(255,255,255,.75),0 4px 12px rgba(0,0,0,.28);box-sizing:border-box}
.skn .leaflet-popup-content-wrapper{border-radius:14px;padding:0;overflow:hidden}
.skn .leaflet-popup-content{margin:0;width:240px!important}
.skn .leaflet-tile-pane{filter:saturate(.8) sepia(.1) brightness(1.02)}
.skn-pop img{display:block;width:100%;height:120px;object-fit:cover}
.skn-pop-t{display:flex;flex-direction:column;gap:3px;padding:10px 13px 12px;font-family:Inter,system-ui,sans-serif}
.skn-pop-t strong{font-size:14px;color:#14202a}
.skn-pop-t span{font-size:12px;color:#5b6b72}
.skn-pop-t a{margin-top:4px;font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none}
@media (max-width:820px){
  .skn-ram{height:560px;border-radius:16px}
  .skn-panel{top:10px;left:10px;right:10px;width:auto}
  .skn-tagg{display:none}
  .skn-lista{display:flex;gap:6px;overflow-x:auto;padding:6px;border-radius:999px;scrollbar-width:none}
  .skn-lista::-webkit-scrollbar{display:none}
  .skn-lista-rubrik,.skn-linje{display:none}
  .skn-lista button{flex-shrink:0;width:auto;border-radius:999px;padding:6px 11px 6px 6px;font-size:12.5px;white-space:nowrap}
  .skn-karta .leaflet-control-zoom{display:none}
  .skn-aterstall{top:64px;right:10px}
  .skn-sok{bottom:14px}
}
`
