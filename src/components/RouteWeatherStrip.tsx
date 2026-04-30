import Icon from '@/components/Icon'
import type { RouteForecast } from '@/lib/routeForecast'

/**
 * RouteWeatherStrip — visar vindprognos för en planerad rutt.
 *
 * Tre delar:
 * 1. Sammanfattning (medelvind + max byar) med Beaufort-färg
 * 2. Tre vindpilar: start / mitten / slut — så seglaren ser om vinden vänder längs vägen
 * 3. Källa + tidpunkt
 */

const BAND_COLORS = {
  calm:     { bg: 'rgba(34,197,94,0.10)',  border: 'rgba(34,197,94,0.3)',  txt: '#15803d', label: 'Lugnt' },
  moderate: { bg: 'rgba(59,130,246,0.10)', border: 'rgba(59,130,246,0.3)', txt: '#1d4ed8', label: 'Måttligt' },
  fresh:    { bg: 'rgba(217,119,6,0.10)',  border: 'rgba(217,119,6,0.35)', txt: '#c05010', label: 'Friskt' },
  strong:   { bg: 'rgba(220,38,38,0.10)',  border: 'rgba(220,38,38,0.35)', txt: '#c02020', label: 'Hårt' },
  unknown:  { bg: 'rgba(120,120,120,0.08)',border: 'rgba(120,120,120,0.25)',txt: '#666',    label: '—' },
} as const

/** Renderar en vindpil som SVG. Riktningen är "vinden FRÅN" (meteorologisk standard). */
function WindArrow({ directionDeg, size = 32 }: { directionDeg: number; size?: number }) {
  // Pilen pekar I VINDENS RIKTNING (dvs där den blåser TILL — vridning + 180°)
  const rotation = (directionDeg + 180) % 360
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 250ms ease' }}
      aria-label={`Vindriktning ${directionDeg}°`}
    >
      <path
        d="M12 3 L18 17 L12 14 L6 17 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function RouteWeatherStrip({ forecast }: { forecast: RouteForecast }) {
  const band = BAND_COLORS[forecast.summary.band]

  return (
    <section
      aria-label="Vindprognos längs rutten"
      style={{
        marginBottom: 16,
        background: 'var(--white)',
        borderRadius: 16,
        border: '1px solid rgba(10,123,140,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Header — sammanfattning */}
      <div style={{
        background: band.bg,
        borderBottom: `1px solid ${band.border}`,
        padding: '12px 14px',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ color: band.txt, flexShrink: 0 }}>
          <Icon name="wind" size={22} stroke={2} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: band.txt,
            textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            Vindprognos · {band.label}
          </div>
          {forecast.summary.band === 'unknown' ? (
            <div style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 2 }}>
              Ingen prognos tillgänglig just nu
            </div>
          ) : (
            <div style={{ fontSize: 13, color: 'var(--txt)', marginTop: 2 }}>
              <strong>{forecast.summary.avgSpeedMs} m/s</strong>
              <span style={{ color: 'var(--txt3)' }}> ({forecast.summary.avgSpeedKnots} knop)</span>
              {forecast.summary.maxGustMs !== null && (
                <span style={{ marginLeft: 8 }}>
                  · byar till <strong>{forecast.summary.maxGustMs} m/s</strong>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Vindpilar — start / mitten / slut */}
      {forecast.summary.band !== 'unknown' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
        }}>
          {forecast.waypoints.map((wp, i) => (
            <div
              key={i}
              style={{
                padding: '14px 10px 12px',
                textAlign: 'center',
                borderRight: i < 2 ? '1px solid rgba(10,123,140,0.08)' : 'none',
              }}
            >
              <div style={{
                fontSize: 10, fontWeight: 700, color: 'var(--txt3)',
                textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {wp.name}
              </div>
              {wp.forecast ? (
                <>
                  <div style={{ color: band.txt, marginBottom: 4 }}>
                    <WindArrow directionDeg={wp.forecast.directionDeg} size={28} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--txt)' }}>
                    {wp.forecast.directionCompass} {wp.forecast.speedMs}
                    <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)' }}> m/s</span>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--txt3)', padding: '8px 0' }}>—</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Källa */}
      <div style={{
        background: 'rgba(10,123,140,0.04)',
        padding: '7px 14px',
        borderTop: '1px solid rgba(10,123,140,0.08)',
        fontSize: 10, color: 'var(--txt3)',
      }}>
        Open-Meteo · prognos ~6 h fram · uppdateras varje halvtimme
      </div>
    </section>
  )
}
