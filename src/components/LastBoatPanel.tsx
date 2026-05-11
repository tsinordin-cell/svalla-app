'use client'
/**
 * LastBoatPanel — "Sista båten tillbaka idag"-card på ösidor.
 *
 * Visar dagens sista avgång från ön till fastlandet, med live nedräkning.
 * Glödande gul varning när < 90 min återstår, röd när < 30 min. Hjälper
 * dagsbesökare att veta när de senast måste lämna ön för att inte fastna.
 *
 * Hämtas från /api/transit/last-departure?dest=<slug>. Pollar var 60 sek
 * för att fånga inställda turer eller försenade båtar.
 *
 * Doldt:
 *  - Om ön inte har transit-config (return null)
 *  - Om det är efter att sista båten redan gått (server returnerar null)
 *  - Om det är efter midnatt (visar dagens datum imorgon)
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
  outbound: TripSummary | null
  return: TripSummary | null
  checkedAt: string
  error?: string
}

interface Props {
  islandSlug: string
  islandName: string
}

export default function LastBoatPanel({ islandSlug, islandName }: Props) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [now, setNow] = useState(() => Date.now())

  // Hämta data var 60 sek
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch(`/api/transit/last-departure?dest=${encodeURIComponent(islandSlug)}`)
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
    const id = setInterval(load, 60_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [islandSlug])

  // Live nedräkning — uppdatera klockan var 30 sek
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000)
    return () => clearInterval(id)
  }, [])

  // Dölj om okänd destination eller om vi laddar för första gången
  if (loading) return null
  if (error) return null
  if (!data || data.error === 'unknown_destination') return null
  if (!data.return) return null  // ingen sista båt idag (redan gått, eller helg utan trafik)

  const lastTrip = data.return
  const effectiveStartTime = lastTrip.legs[0]?.rtFromTime || lastTrip.startTime

  // Beräkna minuter kvar tills avgång (i Europe/Stockholm-tid)
  const minutesUntil = minutesUntilTime(effectiveStartTime, now)
  // Om båten redan gått (negativt) → dölj panel
  if (minutesUntil !== null && minutesUntil < 0) return null

  const isUrgent = minutesUntil !== null && minutesUntil <= 30
  const isWarning = minutesUntil !== null && minutesUntil <= 90 && !isUrgent
  const isCancelled = lastTrip.cancelled === true

  // Färgschema baserat på brådska
  const gradient = isCancelled
    ? 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 100%)'
    : isUrgent
    ? 'linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)'
    : isWarning
    ? 'linear-gradient(135deg, #78350f 0%, #b45309 100%)'
    : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'

  const glowColor = isCancelled
    ? 'rgba(239, 68, 68, 0.45)'
    : isUrgent
    ? 'rgba(251, 113, 36, 0.45)'
    : isWarning
    ? 'rgba(245, 158, 11, 0.35)'
    : 'rgba(13, 36, 64, 0.18)'

  const accentText = isCancelled ? '#fca5a5' : isUrgent ? '#fdba74' : isWarning ? '#fde68a' : '#fbbf24'
  const dur = formatDuration(lastTrip.durationMin)

  return (
    <section
      aria-labelledby="last-boat-title"
      style={{
        background: gradient,
        borderRadius: 16,
        padding: '20px 22px',
        marginBottom: 28,
        color: '#fff',
        boxShadow: `0 4px 22px ${glowColor}`,
        position: 'relative',
        overflow: 'hidden',
        animation: isUrgent ? 'lastBoatPulse 2.8s ease-in-out infinite' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <h2 id="last-boat-title" style={{
          fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: '-0.2px',
        }}>
          Sista båten från {islandName} idag
        </h2>
        {isCancelled ? (
          <span style={{
            background: 'rgba(239, 68, 68, 0.30)',
            color: '#fca5a5',
            fontSize: 9.5, fontWeight: 800, letterSpacing: 0.8,
            padding: '3px 8px', borderRadius: 999,
            border: '1px solid rgba(239, 68, 68, 0.50)',
            textTransform: 'uppercase',
          }}>
            Inställd
          </span>
        ) : (isUrgent || isWarning) && minutesUntil !== null ? (
          <span style={{
            background: `${accentText}22`,
            color: accentText,
            fontSize: 9.5, fontWeight: 800, letterSpacing: 0.8,
            padding: '3px 8px', borderRadius: 999,
            border: `1px solid ${accentText}55`,
            textTransform: 'uppercase',
          }}>
            {minutesUntil <= 0 ? 'Avgår nu' : `${minutesUntil} min kvar`}
          </span>
        ) : null}
      </div>

      <div style={{
        background: 'rgba(0,0,0,0.18)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 10,
        padding: '14px 16px',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        {/* Tid: stor avgång + ankomst */}
        <div style={{ flexShrink: 0, minWidth: 86 }}>
          <div style={{
            fontSize: 22, fontWeight: 800, lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            textDecoration: isCancelled ? 'line-through' : 'none',
            color: isCancelled ? 'rgba(255,255,255,0.55)' : '#fff',
          }}>
            {lastTrip.startTime}
          </div>
          {lastTrip.hasDelay && lastTrip.legs[0]?.rtFromTime && lastTrip.legs[0].rtFromTime !== lastTrip.startTime && (
            <div style={{ fontSize: 11, fontWeight: 700, color: accentText, marginTop: 3, fontVariantNumeric: 'tabular-nums' }}>
              → {lastTrip.legs[0].rtFromTime}
            </div>
          )}
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4, fontVariantNumeric: 'tabular-nums' }}>
            → {lastTrip.endTime} {data.originName.split(' ').slice(-1)[0]}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {[...new Set(lastTrip.legs.map(l => l.operator).filter(Boolean))].join(' · ') || 'Kollektivt'}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
            {dur} · {lastTrip.changes === 0 ? 'inga byten' : `${lastTrip.changes} ${lastTrip.changes === 1 ? 'byte' : 'byten'}`}
          </div>
        </div>
      </div>

      {isCancelled && (
        <p style={{
          fontSize: 12, color: 'rgba(255,255,255,0.85)',
          margin: '12px 0 0', lineHeight: 1.5, fontWeight: 600,
        }}>
          ⚠️ Sista avgången är inställd — kolla{' '}
          <a href="https://sl.se/sv/reseplaneraren" target="_blank" rel="noopener noreferrer"
             style={{ color: '#fde68a', textDecoration: 'underline' }}>
            SL.se
          </a> för alternativ.
        </p>
      )}
      {!isCancelled && isUrgent && (
        <p style={{
          fontSize: 12, color: 'rgba(255,255,255,0.92)',
          margin: '12px 0 0', lineHeight: 1.5, fontWeight: 600,
        }}>
          🏃 Rör på dig — sista båten går snart.
        </p>
      )}

      <style>{`
        @keyframes lastBoatPulse {
          0%, 100% { box-shadow: 0 4px 22px ${glowColor}; }
          50% { box-shadow: 0 4px 32px ${glowColor.replace('0.45', '0.65')}; }
        }
      `}</style>
    </section>
  )
}

/**
 * Beräknar minuter mellan nu (Europe/Stockholm) och `HH:MM` idag.
 * Returnerar null om input är ogiltig. Negativt om tiden redan passerat.
 */
function minutesUntilTime(hhmm: string, nowMs: number): number | null {
  const m = hhmm.match(/^(\d{1,2}):(\d{2})$/)
  if (!m) return null
  const targetH = parseInt(m[1]!, 10)
  const targetM = parseInt(m[2]!, 10)
  // Hämta nuvarande klockan i Stockholm
  const stockholmNow = new Date(nowMs).toLocaleString('en-GB', {
    timeZone: 'Europe/Stockholm',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const [nowH, nowM] = stockholmNow.split(':').map(s => parseInt(s, 10))
  if ([nowH, nowM].some(n => Number.isNaN(n))) return null
  return (targetH * 60 + targetM) - (nowH! * 60 + nowM!)
}

function formatDuration(min: number): string {
  if (!min || min < 1) return '–'
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m === 0 ? `${h} h` : `${h} h ${m} min`
}
