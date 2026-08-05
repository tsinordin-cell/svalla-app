'use client'
/**
 * DepartureWidget — "Hur tar jag mig hit"-card på ösidor.
 *
 * Hämtar via /api/transit/departures?dest=<slug> och visar nästa 3 resor
 * från fastlandet med byten + ankomsttid. Klickar man på en resa öppnas
 * SL.se reseplaneraren i ny flik (vi kan inte sälja biljett själva).
 *
 * Designprinciper:
 *  - Mörk container (var(--sea)) för att sticka ut från resten av ösidan
 *  - "INGEN BÅT KRÄVS"-badge som omedelbart kommunicerar produktlöftet
 *  - Skeleton under laddning, diskret felmeddelande om Trafiklab är nere
 *  - Mobilanpassad: stack vertikalt, 44px touch-area
 *
 * Komponenten är client-side eftersom den pollar var 60s för fräscha
 * tider. Server-side fetching skulle kräva ISR per ö och blir onödigt
 * komplext. Initial render visas via skeleton.
 */
import { useEffect, useState } from 'react'

interface TripLeg {
  category: string
  operator: string | null
  line: string | null
  fromName: string
  fromTime: string
  toName: string
  toTime: string
  isWalk: boolean
  rtFromTime?: string
  rtToTime?: string
  delayMin?: number
  cancelled?: boolean
}

interface TripSummary {
  durationMin: number
  startTime: string
  startDate: string
  endTime: string
  changes: number
  legs: TripLeg[]
  cancelled?: boolean
  hasDelay?: boolean
  maxDelayMin?: number
}

interface ApiResponse {
  slug: string
  originName: string
  destName: string
  note: string | null
  trips: TripSummary[]
  error?: string
}

interface Props {
  islandSlug: string
  islandName: string
}

export default function DepartureWidget({ islandSlug, islandName }: Props) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`/api/transit/departures?dest=${encodeURIComponent(islandSlug)}`)
        if (!res.ok) throw new Error('http')
        const json = (await res.json()) as ApiResponse
        if (cancelled) return
        setData(json)
        setError(false)
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    // Polling var 60 sek — håller tider fräscha utan att hamra Trafiklab
    // (server-cachen filtrerar ändå alla anrop inom 5 min).
    const id = setInterval(load, 60_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [islandSlug])

  // Om servern säger "okänd destination" (vi har inte stop-ID för ön ännu)
  // → rendera ingenting alls. Inget behov att visa "tidtabell saknas" på
  // öar där feature ej ännu är konfigurerad.
  if (data && data.error === 'unknown_destination') return null

  // Uppmätt: ingen kollektivtrafik når ön. Att visa ingenting alls vore tyst
  // snarare än sant — besökaren står kvar med frågan obesvarad.
  if (data && data.error === 'no_transit') {
    return (
      <div style={{
        border: '1px solid var(--border)', borderRadius: 14,
        padding: '16px 18px', background: 'var(--white)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
          Hit går ingen kollektivtrafik
        </div>
        <div style={{ fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.55 }}>
          {islandName} nås med egen båt eller taxibåt. Vi har kontrollerat mot
          Trafiklab och hittar ingen brygga eller hållplats med reguljär trafik
          på ön.
        </div>
      </div>
    )
  }

  return (
    <section
      aria-labelledby="dep-widget-title"
      style={{
        background: 'linear-gradient(135deg, #0d2440 0%, #1e5c82 100%)',
        borderRadius: 16,
        padding: '20px 22px',
        marginBottom: 28,
        color: '#fff',
        boxShadow: '0 4px 18px rgba(13, 36, 64, 0.18)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <h2 id="dep-widget-title" style={{
          fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '-0.2px',
        }}>
          Hur du tar dig till {islandName}
        </h2>
        <span style={{
          background: 'rgba(74, 222, 128, 0.20)',
          color: '#9be59c',
          fontSize: 9.5, fontWeight: 800, letterSpacing: 0.8,
          padding: '3px 8px', borderRadius: 999,
          border: '1px solid rgba(74, 222, 128, 0.35)',
          textTransform: 'uppercase',
        }}>
          Nås med kollektivtrafik
        </span>
      </div>

      {loading && <Skeleton />}

      {!loading && error && (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
          Tidtabellinfo ej tillgänglig just nu — prova{' '}
          <a href="https://sl.se/sv/reseplaneraren" target="_blank" rel="noopener noreferrer"
             style={{ color: '#ffd28a', textDecoration: 'underline' }}>
            sl.se
          </a>.
        </p>
      )}

      {!loading && !error && data && data.trips.length === 0 && (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
          Inga avgångar hittade just nu. Försök igen senare eller{' '}
          <a href="https://sl.se/sv/reseplaneraren"
             target="_blank" rel="noopener noreferrer"
             style={{ color: '#ffd28a', textDecoration: 'underline' }}>
            öppna SL-reseplaneraren
          </a>.
        </p>
      )}

      {!loading && !error && data && data.trips.length > 0 && (
        <>
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {data.trips.slice(0, 3).map((t, i) => (
              <TripRow key={i} trip={t} originName={data.originName} destName={data.destName} />
            ))}
          </div>

          {data.note && (
            <p style={{
              fontSize: 12, color: 'rgba(255,255,255,0.78)',
              margin: '14px 0 0', lineHeight: 1.5, fontStyle: 'italic',
            }}>
              {data.note}
            </p>
          )}

          <div style={{
            marginTop: 14, paddingTop: 12,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
            flexWrap: 'wrap',
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
              Från {data.originName} · Källa: Trafiklab
            </span>
            <a
              href="https://sl.se/sv/reseplaneraren"
              target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: 12, fontWeight: 700, color: '#ffd28a',
                textDecoration: 'none',
              }}
            >
              Se alla avgångar →
            </a>
          </div>
        </>
      )}
    </section>
  )
}

function TripRow({ trip, originName, destName }: { trip: TripSummary; originName: string; destName: string }) {
  const operatorList = [...new Set(trip.legs.map(l => l.operator).filter(Boolean))].join(' · ') || 'Kollektivt'
  const hasFerry = trip.legs.some(l => l.category.toLowerCase().includes('färja'))
  const tripUrl = `https://sl.se/sv/reseplaneraren`
  const dur = formatDuration(trip.durationMin)

  // Realtidsstatus — visa inställd, försenad eller exakt tidpunkt
  const isCancelled = trip.cancelled === true
  const delayMin = trip.maxDelayMin ?? 0
  const hasDelay = trip.hasDelay === true && delayMin >= 1
  const rtStartTime = trip.legs[0]?.rtFromTime

  // Färgkodning: röd = inställd, gul = försenad, default = som tidigare
  const accent = isCancelled
    ? 'rgba(239, 68, 68, 0.40)'   // röd
    : hasDelay
    ? 'rgba(251, 191, 36, 0.35)' // gul
    : 'rgba(255,255,255,0.10)'    // default

  return (
    <a
      href={tripUrl}
      target="_blank" rel="noopener noreferrer"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${accent}`,
        borderRadius: 10,
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 14,
        color: '#fff', textDecoration: 'none',
        transition: 'background 120ms ease',
        opacity: isCancelled ? 0.78 : 1,
      }}
    >
      {/* Tid: stor avgång + mindre ankomst (med realtid-overlay om tillgänglig) */}
      <div style={{ flexShrink: 0, minWidth: 86 }}>
        <div style={{
          fontSize: 19, fontWeight: 700, lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
          textDecoration: isCancelled ? 'line-through' : 'none',
          color: isCancelled ? 'rgba(255,255,255,0.55)' : '#fff',
        }}>
          {trip.startTime}
        </div>
        {!isCancelled && hasDelay && rtStartTime && rtStartTime !== trip.startTime && (
          <div style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
            → {rtStartTime}
          </div>
        )}
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
          → {trip.endTime}
        </div>
      </div>

      {/* Mitten: detaljer + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {operatorList}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
          <span>{dur} · {trip.changes === 0 ? 'inga byten' : `${trip.changes} ${trip.changes === 1 ? 'byte' : 'byten'}`}</span>
          {hasFerry && <span style={{ color: '#9be59c', fontWeight: 600 }}>· båt</span>}
          {isCancelled && (
            <span style={{
              background: 'rgba(239, 68, 68, 0.22)',
              color: '#fca5a5',
              fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6,
              padding: '2px 7px', borderRadius: 999,
              border: '1px solid rgba(239, 68, 68, 0.45)',
              textTransform: 'uppercase',
            }}>
              Inställd
            </span>
          )}
          {!isCancelled && hasDelay && (
            <span style={{
              background: 'rgba(251, 191, 36, 0.18)',
              color: '#fcd34d',
              fontSize: 9.5, fontWeight: 800, letterSpacing: 0.6,
              padding: '2px 7px', borderRadius: 999,
              border: '1px solid rgba(251, 191, 36, 0.40)',
              textTransform: 'uppercase',
            }}>
              +{delayMin} min
            </span>
          )}
        </div>
      </div>

      {/* Pil */}
      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', flexShrink: 0 }}>›</span>
    </a>
  )
}

function Skeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          background: 'rgba(255,255,255,0.06)',
          borderRadius: 10,
          height: 56,
          animation: 'depPulse 1.4s ease-in-out infinite',
          animationDelay: `${i * 0.12}s`,
        }} />
      ))}
      <style>{`
        @keyframes depPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}

function formatDuration(min: number): string {
  if (!min || min < 1) return '–'
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}
