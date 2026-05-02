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

type RouteQuality = 'precomputed' | 'grid' | 'waypoint' | 'straight'

export default function PlaneraRouteSection({
  startLat, startLng, startName,
  endLat, endLng, endName,
  stops,
  haversineDistKm,
}: Props) {
  const [seaPath, setSeaPath] = useState<[number, number][] | null>(null)
  const [routeKm, setRouteKm] = useState(haversineDistKm)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [quality, setQuality] = useState<RouteQuality | null>(null)

  const timeEstimates = estimateAllProfiles(routeKm)

  // ── Fetch route ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    fetch('/api/route/calculate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ startLat, startLng, endLat, endLng }),
    })
      .then(r => r.ok ? r.json() as Promise<{ path: [number, number][]; quality?: RouteQuality }> : Promise.reject(r.status))
      .then(data => {
        if (cancelled) return
        const km = Math.round(pathKm(data.path))
        setSeaPath(data.path)
        setQuality(data.quality ?? null)
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

  // Kvalitetsbanner — vad användaren faktiskt får
  const qualityBanner = (() => {
    if (status !== 'ready' || !quality) return null
    if (quality === 'precomputed') {
      return { tone: 'success' as const, label: 'Optimal sjöled', desc: 'Verifierad rutt längs riktiga sjöleder.' }
    }
    if (quality === 'grid') {
      return { tone: 'success' as const, label: 'Beräknad sjöled', desc: 'Optimerad runt land med 80 000 vattenpunkter.' }
    }
    if (quality === 'waypoint') {
      return { tone: 'warning' as const, label: 'Approximerad rutt', desc: 'Grov sjöled via huvudleder. Verifiera mot sjökort innan avgång.' }
    }
    // straight
    return { tone: 'warning' as const, label: 'Rak linje — sjöleder kunde inte beräknas', desc: 'Det här är fågelvägen. Använd ditt sjökort för faktisk ruttplanering.' }
  })()

  return (
    <>
      {/* Leaflet-karta — seaPath=null visar skelet tills rutten anländer */}
      <PlaneraMap
        startLat={startLat} startLng={startLng} startName={startName}
        endLat={endLat} endLng={endLng} endName={endName}
        stops={stops}
        seaPath={seaPath}
      />

      {/* Kvalitetsbanner — visar användaren om rutten är pålitlig eller ej */}
      {qualityBanner && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: qualityBanner.tone === 'success'
            ? 'rgba(42,157,92,0.08)'
            : 'rgba(232,146,74,0.10)',
          border: `1px solid ${qualityBanner.tone === 'success' ? 'rgba(42,157,92,0.22)' : 'rgba(232,146,74,0.32)'}`,
          borderRadius: 12, padding: '10px 14px',
          marginBottom: 12, marginTop: -8,
          fontSize: 12.5,
          color: qualityBanner.tone === 'success' ? '#157a3e' : '#a4561e',
        }}>
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            {qualityBanner.tone === 'success' ? (
              <>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="9 12 11 14 15 10"/>
              </>
            ) : (
              <>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </>
            )}
          </svg>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>{qualityBanner.label}</div>
            <div style={{ opacity: 0.85, lineHeight: 1.45 }}>{qualityBanner.desc}</div>
          </div>
        </div>
      )}

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
