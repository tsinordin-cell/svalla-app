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
  /** Rutt-id för felrapportering */
  routeId: string
}

// ── Component ───────────────────────────────────────────────────────────────

// 2026-05-23 routing safety layer: 'straight' borttagen, 'unavailable' tillagd.
// När quality === 'unavailable' har vi ingen säker vattenrutt — visa EmptyState
// istället för att rita en linje.
type RouteQuality = 'precomputed' | 'grid' | 'waypoint' | 'unavailable'

/**
 * Varför ingen rutt kunde ritas. Kommer från API:t och är UPPMÄTT, inte gissat
 * — se avgorSkal() i /api/route/calculate.
 */
type UnavailableReason =
  | 'outside_coverage' | 'harbour_not_in_water' | 'lock_required' | 'no_sea_route'
  | 'landlocked'

export default function PlaneraRouteSection({
  startLat, startLng, startName,
  endLat, endLng, endName,
  stops,
  haversineDistKm,
  routeId,
}: Props) {
  const [seaPath, setSeaPath] = useState<[number, number][] | null>(null)
  const [routeKm, setRouteKm] = useState(haversineDistKm)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [quality, setQuality] = useState<RouteQuality | null>(null)
  const [reason, setReason] = useState<UnavailableReason | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [reportState, setReportState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submitReport() {
    if (reportReason.trim().length < 3) return
    setReportState('sending')
    try {
      const r = await fetch('/api/planera/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ routeId, reason: reportReason.trim() }),
      })
      if (!r.ok) throw new Error()
      setReportState('sent')
      setReportReason('')
      setTimeout(() => { setReportOpen(false); setReportState('idle') }, 1800)
    } catch {
      setReportState('error')
    }
  }

  const timeEstimates = estimateAllProfiles(routeKm)

  // ── Fetch route ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false

    fetch('/api/route/calculate', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // routeId skickas så API:n kan läsa/skriva DB-cache (2026-05-23 P2)
      body: JSON.stringify({ startLat, startLng, endLat, endLng, routeId }),
    })
      .then(r => r.ok ? r.json() as Promise<{ path: [number, number][] | null; quality?: RouteQuality; validated?: boolean; confidence?: number; reason?: UnavailableReason | null }> : Promise.reject(r.status))
      .then(data => {
        if (cancelled) return
        // path kan vara null när quality === 'unavailable' — då rendrar vi
        // EmptyState istället för polyline. Tid/bränsle hide:as automatiskt.
        setSeaPath(data.path)
        setQuality(data.quality ?? null)
        setReason(data.reason ?? null)
        if (data.path && data.path.length > 1) {
          const km = Math.round(pathKm(data.path))
          if (km > 0) setRouteKm(km)
        }
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => { cancelled = true }
  // Koordinaterna ändras aldrig för en given rutt-sida
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Kvalitetsbanner — vad användaren faktiskt får.
  // 2026-05-23: 'straight'-fallback borttagen. Vid 'unavailable' visas
  // tydlig "ingen rutt kunde beräknas"-banner i danger-ton istället.
  // Returtypen hålls medvetet bred ('success' ingår) fastän ingen gren
  // returnerar success just nu — jämförelserna i JSX:en nedan använder den,
  // och success ska tillbaka när rutterna genererats om.
  const qualityBanner = ((): { tone: 'success' | 'warning' | 'danger' | 'info'; label: string; desc: string } | null => {
    if (status !== 'ready' || !quality) return null
    // 2026-08-03 (em): precomputed ÅTERSTÄLLD till success. Alla 609 rutter
    // är omgenererade mot riktig kustlinje (939 563 OSM-segment, 8/8 hand-
    // kontrollerade sanity-punkter) och verifierade mot produktionens
    // 20-sampelregel + tät 30 m-sampling — 0 underkända (verify-routes-v2).
    // GRID förblir warning: den beräknas i runtime mot swedish-coastline.json
    // som saknar fastlandet. Uppgradera INTE grid förrän prod-masken bytts ut.
    if (quality === 'precomputed') {
      return { tone: 'success' as const, label: 'Verifierad sjöled', desc: 'Rutten är verifierad mot OSM:s kustlinje och korsar inte land. Följ sjökort för djup och farled.' }
    }
    // 2026-08-04: grid uppgraderad till success — runtime-masken utbytt mot
    // 50 m-rastret från riktiga kustlinjen (villkoret i kommentaren ovan är
    // uppfyllt). Grid-sökningen går i verifierat vatten och vägrar helt
    // utanför maskens täckning.
    if (quality === 'grid') {
      return { tone: 'success' as const, label: 'Beräknad sjöled', desc: 'Beräknad i verifierat vatten (50 m-upplösning) och kontrollerad mot kustlinjen. Följ sjökort för djup och farled.' }
    }
    if (quality === 'waypoint') {
      return { tone: 'warning' as const, label: 'Approximerad rutt (streckad linje)', desc: 'Grov sjöled via huvudleder. Streckad linje signalerar att rutten är preliminär — verifiera mot sjökort innan avgång.' }
    }
    // 2026-08-05: kommentaren här sa tidigare att 'unavailable' aldrig
    // returneras från API:t. Det stämde inte — Stadshuskajen→Sandhamn ger
    // unavailable, mätt i produktion. Följden var att en rutt UTAN linje på
    // kartan fick etiketten "Approximerad rutt", alltså ett påstående om att
    // en ungefärlig sjöled fanns. Det är sämre än tystnad.
    if (quality === 'unavailable') {
      const texter: Record<UnavailableReason, { label: string; desc: string }> = {
        lock_required: {
          label: 'Mellan hamnarna ligger en sluss',
          desc: 'Mälaren och Saltsjön är skilda vattenytor med olika nivå. En båt tar sig mellan dem genom Slussen eller Hammarbyslussen, och en slussning är ingen sjöled som går att rita. Sträckan är fullt farbar — vi ritar bara ingen linje för den.',
        },
        outside_coverage: {
          label: 'Utanför vår verifierade kustlinje',
          desc: 'Vi har kontrollerad kustlinje för ostkusten. Utanför den ritar vi hellre ingen rutt än en vi inte kan stå för.',
        },
        harbour_not_in_water: {
          label: 'Vi hittar inget farbart vatten vid bryggan',
          desc: 'Någon av positionerna ligger inte i öppet vatten i vår kustlinjedata. Det är troligen ett fel i vår hamnkoordinat — rapportera gärna rutten nedan så rättar vi den.',
        },
        no_sea_route: {
          label: 'Ingen sammanhängande vattenväg hittad',
          desc: 'Vi hittar ingen väg mellan hamnarna som håller sig i vatten hela sträckan. Hellre ingen linje än en som skär över land.',
        },
        landlocked: {
          label: 'Insjöhamn utan förbindelse med havet',
          desc: 'Någon av hamnarna ligger i en insjö som saknar farbar förbindelse med skärgården. Det är inget fel — det finns helt enkelt ingen sjöväg att rita. Båten behöver trailas mellan vattnen.',
        },
      }
      const t = texter[reason ?? 'no_sea_route']
      // Slussfallet är INTE ett fel. Sträckan är fullt farbar — vi ritar bara
      // inte slussningar. En röd varningsruta hade sagt något osant om läget.
      // Insjöfallet är, precis som slussfallet, inte ett fel — rutten är
      // omöjlig av geografi, inte av databrist. Ingen röd ruta för det.
      const tone: 'info' | 'danger' =
        reason === 'lock_required' || reason === 'landlocked' ? 'info' : 'danger'
      return { tone, label: t.label, desc: t.desc }
    }

    // Okänd kvalitet — behandlas som preliminär.
    return {
      tone: 'warning' as const,
      label: 'Approximerad rutt',
      desc: 'Preliminär sjöled. Verifiera mot sjökort innan avgång.',
    }
  })()

  return (
    <>
      {/* Leaflet-karta — seaPath=null visar skelet tills rutten anländer.
          Routing-safety: quality skickas så solid-vs-streckad linjestil kan
          differentieras (precomputed/grid=solid, waypoint=streckad). */}
      <PlaneraMap
        startLat={startLat} startLng={startLng} startName={startName}
        endLat={endLat} endLng={endLng} endName={endName}
        stops={stops}
        seaPath={seaPath}
        quality={quality}
      />

      {/* Kvalitetsbanner — visar användaren om rutten är pålitlig eller ej.
          'danger'-ton används när ingen vattenrutt kunde beräknas (safety layer). */}
      {qualityBanner && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          background: qualityBanner.tone === 'success'
            ? 'rgba(42,157,92,0.08)'
            : qualityBanner.tone === 'danger'
              ? 'rgba(198,64,64,0.08)'
              : qualityBanner.tone === 'info'
                ? 'rgba(30,92,130,0.08)'
                : 'rgba(232,146,74,0.10)',
          border: `1px solid ${
            qualityBanner.tone === 'success'
              ? 'rgba(42,157,92,0.22)'
              : qualityBanner.tone === 'danger'
                ? 'rgba(198,64,64,0.26)'
                : qualityBanner.tone === 'info'
                  ? 'rgba(30,92,130,0.24)'
                  : 'rgba(232,146,74,0.32)'
          }`,
          borderRadius: 12, padding: '10px 14px',
          marginBottom: 12, marginTop: -8,
          fontSize: 12.5,
          color: qualityBanner.tone === 'success'
            ? '#157a3e'
            : qualityBanner.tone === 'danger'
              ? '#b3352f'
              : qualityBanner.tone === 'info'
                ? '#1e5c82'
                : '#a4561e',
        }}>
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            {qualityBanner.tone === 'success' ? (
              <>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="9 12 11 14 15 10"/>
              </>
            ) : qualityBanner.tone === 'info' ? (
              <>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="11" x2="12" y2="16"/>
                <line x1="12" y1="8" x2="12.01" y2="8"/>
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
            <button
              type="button"
              onClick={() => setReportOpen(o => !o)}
              style={{
                marginTop: 8, background: 'none', border: 'none', padding: 0,
                color: 'inherit', fontSize: 12, fontWeight: 600,
                textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit',
              }}>
              {reportOpen ? 'Avbryt' : 'Rapportera fel rutt'}
            </button>
            {reportOpen && (
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <textarea
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  placeholder="Vad är fel? T.ex. 'rutten går genom land vid Värmdö' eller 'fel sund'"
                  rows={3}
                  maxLength={500}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    padding: '8px 10px', borderRadius: 8,
                    border: '1px solid rgba(0,0,0,0.15)',
                    background: 'rgba(255,255,255,0.85)',
                    fontSize: 13, fontFamily: 'inherit', color: 'var(--txt)',
                    resize: 'vertical',
                  }}/>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={submitReport}
                    disabled={reportState === 'sending' || reportReason.trim().length < 3 || reportState === 'sent'}
                    style={{
                      padding: '7px 14px', borderRadius: 8, border: 'none',
                      background: reportState === 'sent' ? '#157a3e' : 'var(--sea, #1e5c82)',
                      color: '#fff', fontSize: 12.5, fontWeight: 700,
                      cursor: reportReason.trim().length < 3 ? 'not-allowed' : 'pointer',
                      opacity: reportReason.trim().length < 3 ? 0.5 : 1,
                      fontFamily: 'inherit',
                    }}>
                    {reportState === 'sending' ? 'Skickar…' : reportState === 'sent' ? 'Tack — sparat' : 'Skicka rapport'}
                  </button>
                  {reportState === 'error' && (
                    <span style={{ fontSize: 12, color: '#c0392b' }}>Kunde inte skicka. Försök igen.</span>
                  )}
                </div>
              </div>
            )}
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

      {/* Tidsestimat per båttyp — döljs när ingen säker vattenrutt finns
          (missledande att visa exakt tid på en path vi inte har).
          Måste guarda på status === 'ready' annars dubbel-renderas under loading. */}
      {status === 'ready' && quality !== 'unavailable' && (
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
      )}
      {/* Laddar: visa preliminärt tidsestimat baserat på haversine */}
      {status === 'loading' && (
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
              opacity: 0.6,
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
      )}
    </>
  )
}
