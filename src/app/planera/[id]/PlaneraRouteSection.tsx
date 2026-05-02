'use client'

/**
 * PlaneraRouteSection — klientkomponent som äger kartan och tidsestimat.
 *
 * SSR renderar sidan direkt med haversine-distans som initial uppskattning.
 * Vid mount anropas /api/route/calculate (maxDuration 300 s) asynkront.
 * När svaret kommer:
 *   1. Kartan uppdateras med full-kvalitets grid-A* rutt.
 *   2. Tidsestimat räknas om med faktisk vattendistans.
 */

import { useState, useEffect } from 'react'
import PlaneraMap from './PlaneraMapDynamic'
import { estimateAllProfiles } from '@/lib/routeTime'

// ── Inline haversine ────────────────────────────────────────────────────────
// Importera ALDRIG calculatePathDistanceKm från seaPathfinder här —
// det drar in 6 MB swedish-coastline.json i klientbundeln.
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

// ── Types ───────────────────────────────────────────────────────────────────

type Stop = {
  lat: number
  lng: number
  name: string
  reason: string
  color: string
  emoji: string
}

type Props = {
  startLat: number
  startLng: number
  startName: string
  endLat: number
  endLng: number
  endName: string
  stops: Stop[]
  /** Haversine (rät linje) distans — används som initial uppskattning */
  haversineDistKm: number
}

// ── Component ───────────────────────────────────────────────────────────────

export default function PlaneraRouteSection({
  startLat, startLng, startName,
  endLat, endLng, endName,
  stops,
  haversineDistKm,
}: Props) {
  const [seaPath, setSeaPath] = useState<[number, number][] | null>(null)
  const [routeKm, setRouteKm] = useState(haversineDistKm)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const timeEstimates = estimateAllProfiles(routeKm)

  // ── Fetch route ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    fetch('/api/route/calculate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ startLat, startLng, endLat, endLng }),
    })
      .then(r => r.ok ? r.json() as Promise<{ path: [number, number][] }> : Promise.reject(r.status))
      .then(data => {
        if (cancelled) return
        const km = Math.round(pathKm(data.path))
        setSeaPath(data.path)
        if (km > 0) setRouteKm(km)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  // Koordinaterna ändras aldrig för en given rutt-sida
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Leaflet-karta — seaPath=null visar skelet tills rutten anländer */}
      <PlaneraMap
        startLat={startLat} startLng={startLng} startName={startName}
        endLat={endLat} endLng={endLng} endName={endName}
        stops={stops}
        seaPath={seaPath}
      />

      {/* Progress-banner medan grid-A* räknar */}
      {status === 'loading' && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(10,123,140,0.06)',
          border: '1px solid rgba(10,123,140,0.12)',
          borderRadius: 10, padding: '8px 12px',
          marginBottom: 12, marginTop: -8,
          fontSize: 12, color: 'var(--sea)',
        }}>
          {/* Spinning arc */}
          <svg
            viewBox="0 0 24 24"
            style={{
              width: 14, height: 14, flexShrink: 0,
              animation: 'planera-spin 0.9s linear infinite',
            }}
            fill="none" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
          </svg>
          <style>{`@keyframes planera-spin{to{transform:rotate(360deg)}}`}</style>
          Beräknar optimal sjöled baserat på 80 000 punkter…
        </div>
      )}

      {/* Tidsestimat per båttyp — uppdateras med faktisk vattendistans */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginBottom: 16,
      }}>
        {[
          { label: 'Segelbåt', value: timeEstimates.segelbat, sub: '~5,5 knop' },
          { label: 'Motorbåt', value: timeEstimates.motorbat, sub: '~18 knop' },
          { label: 'Kajak',    value: timeEstimates.kajak,   sub: '~3,5 knop' },
        ].map(card => (
          <div key={card.label} style={{
            background: 'var(--white)',
            borderRadius: 12,
            padding: '12px 10px',
            border: '1px solid rgba(10,123,140,0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: 'var(--sea)',
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4,
            }}>
              {card.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--txt)', marginBottom: 2 }}>
              {card.value}
            </div>
            <div style={{ fontSize: 10, color: 'var(--txt3)' }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
