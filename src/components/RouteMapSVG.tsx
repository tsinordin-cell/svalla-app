import { useId } from 'react'
import { buildSvgPath } from '@/lib/routeSmooth'

/**
 * Rutt-preview med riktig OSM-karta i bakgrunden + OpenSeaMap-overlay.
 * Allt renderas i en enda SVG — tiles som <image>-element och rutten som <path>.
 * Samma koordinatsystem garanterar att rutten landar exakt på kartan oavsett
 * vilken storlek föräldern råkar ha (inga CSS/SVG-skalproblem).
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

  // ── Välj zoom — börja på Z=17 så korta rutter (hamn, 20-100m) syns ordentligt ──
  let Z = 17
  for (; Z >= 3; Z--) {
    const spanX = (lngToTileX(maxLng, Z) - lngToTileX(minLng, Z)) * 256
    const spanY = (latToTileY(minLat, Z) - latToTileY(maxLat, Z)) * 256
    if (spanX <= w * 0.85 && spanY <= h * 0.85) break
  }

  // ── Tile-grid (3×3) centrerad runt rutten ──
  const cx = (lngToTileX(minLng, Z) + lngToTileX(maxLng, Z)) / 2
  const cy = (latToTileY(minLat, Z) + latToTileY(maxLat, Z)) / 2
  const tx0 = Math.floor(cx) - 1
  const ty0 = Math.floor(cy) - 1
  // SVG-koordinater: cx ska landa på w/2
  const gridLeft = w / 2 - (cx - tx0) * 256
  const gridTop  = h / 2 - (cy - ty0) * 256

  // ── Projicera GPS-punkt → SVG-koordinat ──
  const project = (lat: number, lng: number): [number, number] => [
    gridLeft + (lngToTileX(lng, Z) - tx0) * 256,
    gridTop  + (latToTileY(lat, Z) - ty0) * 256,
  ]

  const fullPath = buildSvgPath(
    points,
    lng => project(0, lng)[0],
    lat => project(lat, 0)[1],
  )

  const sp = points[0], ep = points[points.length - 1]
  const [sx, sy] = project(sp.lat, sp.lng)
  const [ex, ey] = project(ep.lat, ep.lng)

  const strokeW = Math.max(2.5, Math.min(4, w / 120))

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id={`glow-${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Fallback-bakgrund */}
      <rect x={0} y={0} width={w} height={h} fill="#d4e6ef" />

      {/* 3×3 OSM + OpenSeaMap tiles — samma koordinatsystem som rutten */}
      {[0, 1, 2].map(dy => [0, 1, 2].map(dx => (
        <g key={`${dx}_${dy}`}>
          <image
            href={`https://tile.openstreetmap.org/${Z}/${tx0 + dx}/${ty0 + dy}.png`}
            x={gridLeft + dx * 256} y={gridTop + dy * 256}
            width={256} height={256}
            preserveAspectRatio="none"
            className="route-map-tile"
          />
          <image
            href={`https://tiles.openseamap.org/seamark/${Z}/${tx0 + dx}/${ty0 + dy}.png`}
            x={gridLeft + dx * 256} y={gridTop + dy * 256}
            width={256} height={256}
            preserveAspectRatio="none"
            className="route-map-tile"
            style={{ pointerEvents: 'none' }}
          />
        </g>
      )))}

      {/* Skugga under rutten */}
      <path d={fullPath} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={strokeW + 2.5} strokeLinecap="round" strokeLinejoin="round" />
      {/* Huvudlinje */}
      <path d={fullPath} fill="none" stroke="#e8520a" strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" filter={`url(#glow-${uid})`} />

      {/* Start-prick (grön) */}
      <circle cx={sx} cy={sy} r={Math.max(4, strokeW + 1)} fill="#22c55e" stroke="white" strokeWidth="2" />
      {/* Slut-prick (orange) */}
      <circle cx={ex} cy={ey} r={Math.max(5, strokeW + 1.5)} fill="#e8520a" stroke="white" strokeWidth="2" />
    </svg>
  )
}
