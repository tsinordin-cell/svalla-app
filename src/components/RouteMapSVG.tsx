'use client'
import { useId } from 'react'
import { buildSvgPath } from '@/lib/routeSmooth'

/**
 * Renders a GPS route as an SVG path on a light map-style background.
 * Strava-inspired: light terrain background, bold orange route line.
 * Anomalous jumps are detected and rendered as breaks (no lines across land).
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

  const lats = points.map(p => p.lat)
  const lngs = points.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)

  const pad      = 32
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
  const toY = (lat: number) => oy + (maxLat - lat) * scale

  const fullPath = buildSvgPath(points, toX, toY)

  const sp = points[0], ep = points[points.length - 1]
  const sx = toX(sp.lng), sy = toY(sp.lat)
  const ex = toX(ep.lng), ey = toY(ep.lat)

  // Stroke width scales with map size — thicker on larger renders
  const strokeW = Math.max(2.5, Math.min(4, w / 120))

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Light map-style background — matches Strava aesthetic */}
        <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#e8f0f5" />
          <stop offset="100%" stopColor="#d4e6ef" />
        </linearGradient>
        {/* Route glow filter */}
        <filter id={`glow-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width={w} height={h} fill={`url(#bg-${uid})`} />

      {/* Subtle grid lines — map feel */}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={`h${f}`} x1="0" y1={h * f} x2={w} y2={h * f} stroke="rgba(10,80,120,0.06)" strokeWidth="1" />
      ))}
      {[0.25, 0.5, 0.75].map(f => (
        <line key={`v${f}`} x1={w * f} y1="0" x2={w * f} y2={h} stroke="rgba(10,80,120,0.06)" strokeWidth="1" />
      ))}

      {/* Route shadow — depth */}
      <path
        d={fullPath}
        fill="none"
        stroke="rgba(180,90,20,0.25)"
        strokeWidth={strokeW + 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Main route line — bold orange like Strava */}
      <path
        d={fullPath}
        fill="none"
        stroke="#e8520a"
        strokeWidth={strokeW}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${uid})`}
      />

      {/* Start dot — green */}
      <circle cx={sx} cy={sy} r="5" fill="#22c55e" stroke="white" strokeWidth="2.5" />

      {/* End dot — red/orange */}
      <circle cx={ex} cy={ey} r="6" fill="#e8520a" stroke="white" strokeWidth="2.5" />
    </svg>
  )
}
