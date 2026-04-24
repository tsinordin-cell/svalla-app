import { useId } from 'react'
import { buildSvgPath } from '@/lib/routeSmooth'

/**
 * Rutt-preview med riktig OSM-karta i bakgrunden + OpenSeaMap-overlay.
 * Väljer zoom automatiskt så rutten fyller ~80% av viewporten, och
 * projicerar GPS-punkter till pixel-koordinater i samma koordinatsystem
 * som tiles — så SVG-linjen landar exakt på kartan.
 *
 * Renderas helt med <img>-taggar + inline SVG ⇒ fungerar i SSR och
 * kräver inget JS. Browsern cachar OSM-tiles så samma komposition är
 * ~gratis vid återanvändning.
 */
export default function RouteMapSVG({
  points,
  w = 600,
  h = 300,
}: {
  points: { lat: number; lng: number }[]
  w?: number
  h?: number
}) {
  const uid = useId().replace(/:/g, '')
  if (!points || points.length < 2) return null

  // ── Bounds ──
  let minLat = points[0].lat, maxLat = points[0].lat
  let minLng = points[0].lng, maxLng = points[0].lng
  for (const p of points) {
    if (p.lat < minLat) minLat = p.lat
    if (p.lat > maxLat) maxLat = p.lat
    if (p.lng < minLng) minLng = p.lng
    if (p.lng > maxLng) maxLng = p.lng
  }

  // ── Mercator: lat/lng → kontinuerliga tile-koord vid zoom z ──
  const lngToTileX = (lng: number, z: number) => ((lng + 180) / 360) * Math.pow(2, z)
  const latToTileY = (lat: number, z: number) => {
    const r = (lat * Math.PI) / 180
    return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Math.pow(2, z)
  }

  // ── Minimum span-kontroll — om punkterna täcker < ~60 m har vi troligen
  //     GPS-brus utan rörelse. Rendera inte (ser ut som en prick i ett parkeringsgarage).
  const latSpan = maxLat - minLat
  const lngSpan = maxLng - minLng
  if (latSpan < 0.0005 && lngSpan < 0.0005) return null

  // ── Välj zoom: största z där ruttens pixel-span ryms i ~85% av viewporten.
  //     Startar på z=15 (max) för att undvika att korta turer hamnar på
  //     gatu-nivå och visar parkeringsplatser i stället för kustlinje.
  let Z = 15
  for (; Z >= 3; Z--) {
    const spanX = (lngToTileX(maxLng, Z) - lngToTileX(minLng, Z)) * 256
    const spanY = (latToTileY(minLat, Z) - latToTileY(maxLat, Z)) * 256
    if (spanX <= w * 0.85 && spanY <= h * 0.85) break
  }

  // ── Projicera bounds-mitten till pixel-koord i tile-grid:et ──
  const cx = (lngToTileX(minLng, Z) + lngToTileX(maxLng, Z)) / 2
  const cy = (latToTileY(minLat, Z) + latToTileY(maxLat, Z)) / 2

  // 3×3 tile-grid (768px) centrerad runt rutten. Täcker > 85%-ytan
  // i alla zoom-nivåer som pickZoom väljer.
  const tx0 = Math.floor(cx) - 1
  const ty0 = Math.floor(cy) - 1

  // Offset där top-left-hörnet av tile-griddet ska placeras så rutt-mitten
  // hamnar på (w/2, h/2) i viewporten.
  const gridLeft = w / 2 - (cx - tx0) * 256
  const gridTop  = h / 2 - (cy - ty0) * 256

  // ── Projicera varje GPS-punkt till viewport-pixel ──
  const project = (lat: number, lng: number): [number, number] => [
    gridLeft + (lngToTileX(lng, Z) - tx0) * 256,
    gridTop  + (latToTileY(lat, Z) - ty0) * 256,
  ]

  const fullPath = buildSvgPath(
    points,
    lng => project(0, lng)[0],  // x från lng
    lat => project(lat, 0)[1],  // y från lat
  )

  const sp = points[0], ep = points[points.length - 1]
  const [sx, sy] = project(sp.lat, sp.lng)
  const [ex, ey] = project(ep.lat, ep.lng)

  const strokeW = Math.max(2.5, Math.min(4, w / 120))

  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, #e8f0f5, #d4e6ef)', // fallback medan tiles laddar
    }}>
      {/* OSM-tiles 3×3 + OpenSeaMap-overlay. loading=lazy för att hålla
          above-the-fold feed-cards snabba; priority kommer från TripCard vid behov. */}
      <div style={{
        position: 'absolute',
        left: gridLeft - 256,
        top:  gridTop  - 256,
        width: 768, height: 768,
      }}>
        {[0, 1, 2].map(dy =>
          [0, 1, 2].map(dx => (
            <div key={`${dx}_${dy}`} style={{
              position: 'absolute',
              left: dx * 256, top: dy * 256,
              width: 256, height: 256,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://tile.openstreetmap.org/${Z}/${tx0 + dx}/${ty0 + dy}.png`}
                alt=""
                loading="lazy" decoding="async"
                className="route-map-tile"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://tiles.openseamap.org/seamark/${Z}/${tx0 + dx}/${ty0 + dy}.png`}
                alt=""
                loading="lazy" decoding="async"
                className="route-map-tile"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
              />
            </div>
          ))
        )}
      </div>

      {/* Rutt + markers ovanpå tiles */}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Glöd-filter för rutten så den lyfter över kartan */}
          <filter id={`glow-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Skugga under rutten för djup */}
        <path d={fullPath} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={strokeW + 2.5} strokeLinecap="round" strokeLinejoin="round" />
        {/* Huvudlinje — Strava-orange */}
        <path d={fullPath} fill="none" stroke="#e8520a" strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" filter={`url(#glow-${uid})`} />

        {/* Start-prick (grön) */}
        <circle cx={sx} cy={sy} r={Math.max(4, strokeW + 1)} fill="#22c55e" stroke="white" strokeWidth="2" />
        {/* Slut-prick (orange, aningen större för hierarki) */}
        <circle cx={ex} cy={ey} r={Math.max(5, strokeW + 1.5)} fill="#e8520a" stroke="white" strokeWidth="2" />
      </svg>
    </div>
  )
}
