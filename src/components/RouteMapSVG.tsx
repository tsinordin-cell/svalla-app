'use client'
import { useId } from 'react'
import { buildSvgPath } from '@/lib/routeSmooth'

/**
 * Renders a GPS route as an SVG path on a dark ocean background.
 * Safe to use in multiple instances simultaneously — unique SVG gradient IDs per React instance.
 * Anomalous jumps (GPS teleports crossing land) are detected and rendered as breaks
 * rather than drawn lines, preventing visual artefacts across islands.
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
  const uid = useId().replace(/:/g, '') // unique per React instance — no SVG ID collisions

  if (!points || points.length < 2) return null

  const lats = points.map(p => p.lat)
  const lngs = points.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)

  const pad      = 28
  const latRange = maxLat - minLat || 0.0005
  const lngRange = maxLng - minLng || 0.0005

  const scaleX = (w - pad * 2) / lngRange
  const scaleY = (h - pad * 2) / latRange
  const scale  = Math.min(scaleX, scaleY)
  const usedW  = lngRange * scale
  const usedH  = latRange * scale
  const ox     = (w - usedW) / 2
  const oy     = (h - usedH) / 2

  const toX = (lng: number) => ox + (lng - minLng) * scale
  const toY = (lat: number) => oy + (maxLat - lat) * scale   // flip Y

  // SVG paths with anomaly-break detection — no more lines across land
  const fullPath   = buildSvgPath(points, toX, toY)
  const recentIdx  = Math.max(0, Math.floor(points.length * 0.65))
  const recentPath = buildSvgPath(points.slice(recentIdx), toX, toY)

  const sp = points[0], ep = points[points.length - 1]
  const sx = toX(sp.lng), sy = toY(sp.lat)
  const ex = toX(ep.lng), ey = toY(ep.lat)

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0b2d42" />
          <stop offset="100%" stopColor="#1a5472" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={w} height={h} fill={`url(#bg-${uid})`} />

      {/* Ghost dots — subtle water texture */}
      <circle cx={w * 0.15} cy={h * 0.2}  r="1.5" fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.75} cy={h * 0.15} r="1"   fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.6}  cy={h * 0.8}  r="1.5" fill="rgba(255,255,255,0.06)" />
      <circle cx={w * 0.3}  cy={h * 0.7}  r="1"   fill="rgba(255,255,255,0.06)" />

      {/* Full track — dim, with anomaly breaks */}
      <path
        d={fullPath}
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Recent segment — brighter, with anomaly breaks */}
      {recentPath && (
        <path
          d={recentPath}
          fill="none"
          stroke="rgba(255,255,255,0.75)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Start dot — green */}
      <circle cx={sx} cy={sy} r="5" fill="#22c55e" stroke="white" strokeWidth="2" />

      {/* End dot — orange */}
      <circle cx={ex} cy={ey} r="6" fill="#c96e2a" stroke="white" strokeWidth="2" />

      {/* "GPS-rutt" label, bottom-left */}
      <text
        x={pad * 0.6} y={h - pad * 0.5}
        fill="rgba(255,255,255,0.4)"
        fontSize={h * 0.075}
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="700"
        letterSpacing="0.5"
      >
        GPS-rutt
      </text>
    </svg>
  )
}
