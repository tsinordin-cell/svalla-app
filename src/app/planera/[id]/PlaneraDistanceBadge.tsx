'use client'

/**
 * PlaneraDistanceBadge — header-badge för planera-rutt-distansen.
 *
 * Tidigare (pre 2026-05-23): page.tsx renderade en statisk badge med
 * `~{haversineDistKm} km` som ALDRIG uppdaterades. Användaren såg en
 * fågelväg-distans permanent, även när faktisk grid-A*-rutt var 40 % längre.
 *
 * Nu: badgen börjar visa fågelväg (med "fågelväg"-etikett), och uppdateras
 * automatiskt till faktisk sjöväg när /api/route/calculate svarat.
 *
 * Vid quality === 'unavailable' visar vi bara fågelvägen med tydlig etikett —
 * inga estimat för en rutt vi inte har.
 */

import { useEffect, useState } from 'react'

type RouteQuality = 'precomputed' | 'grid' | 'waypoint' | 'unavailable'

interface Props {
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  haversineDistKm: number
  /** Skickas till API så DB-cache (planned_routes.cached_path) kan läsas/skrivas */
  routeId?: string
}

function pathKm(path: [number, number][]): number {
  let d = 0
  for (let i = 1; i < path.length; i++) {
    const [lat1, lng1] = path[i - 1]!
    const [lat2, lng2] = path[i]!
    const R = 6371
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lng2 - lng1) * Math.PI / 180
    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
    d += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  }
  return d
}

export default function PlaneraDistanceBadge({
  startLat, startLng, endLat, endLng, haversineDistKm, routeId,
}: Props) {
  const [routeKm, setRouteKm] = useState<number | null>(null)
  const [quality, setQuality] = useState<RouteQuality | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetch('/api/route/calculate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ startLat, startLng, endLat, endLng, routeId }),
    })
      .then(r => r.ok ? r.json() as Promise<{ path: [number, number][] | null; quality?: RouteQuality }> : Promise.reject(r.status))
      .then(data => {
        if (cancelled) return
        if (data.path && data.path.length > 1) {
          setRouteKm(Math.round(pathKm(data.path)))
        }
        setQuality(data.quality ?? null)
        setLoading(false)
      })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isUnavailable = quality === 'unavailable'
  const showSea = !loading && !isUnavailable && routeKm !== null && routeKm > 0
  const displayKm = showSea ? routeKm : haversineDistKm
  const label = showSea ? 'sjöväg' : 'fågelväg'

  return (
    <div
      title={showSea ? 'Faktisk sjöledsdistans' : 'Fågelväg — faktisk sjöväg kan vara längre'}
      style={{
        flexShrink: 0,
        background: showSea ? 'rgba(34,197,94,0.22)' : 'rgba(255,255,255,0.15)',
        borderRadius: 20,
        padding: '4px 12px',
        fontSize: 13,
        fontWeight: 800,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 240ms ease',
      }}
    >
      {loading && (
        <span
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: 10, height: 10, borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            borderTopColor: '#fff',
            animation: 'planera-badge-spin 0.8s linear infinite',
          }}
        />
      )}
      <style>{`@keyframes planera-badge-spin{to{transform:rotate(360deg)}}`}</style>
      <span>~{displayKm} km</span>
      <span style={{
        fontSize: 10, fontWeight: 700, opacity: 0.85,
        textTransform: 'uppercase', letterSpacing: '0.05em',
      }}>
        {label}
      </span>
    </div>
  )
}
