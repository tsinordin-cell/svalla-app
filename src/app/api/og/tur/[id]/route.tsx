import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const revalidate = 3600   // 1 h — OG-bilder cachas länge av sociala medier

function fmtDur(mins: number): string {
  if (mins <= 0) return ''
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}`.trim() : `${m}m`
}

function buildRoutePath(pts: { lat: number; lng: number }[], W: number, H: number): string {
  if (pts.length < 2) return ''
  const lats = pts.map(p => p.lat)
  const lngs = pts.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const ranLat = maxLat - minLat || 0.001
  const ranLng = maxLng - minLng || 0.001
  const pad = 0.12
  return pts.map((p, i) => {
    const x = (((p.lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W
    const y = H - (((p.lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()

  const [{ data: trip }, ] = await Promise.all([
    supabase
      .from('trips')
      .select('user_id, location_name, start_location, distance, duration, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating')
      .eq('id', id)
      .single(),
  ])

  const { data: userRow } = trip
    ? await supabase.from('users').select('username').eq('id', trip.user_id).single()
    : { data: null }

  // ── Stats ──────────────────────────────────────────────────────────────
  const dist   = trip && trip.distance >= 0.1 ? `${trip.distance.toFixed(1)}` : null
  const dur    = trip && trip.duration > 0    ? fmtDur(trip.duration)         : null
  const speed  = trip && (trip.max_speed_knots ?? 0) >= 0.1 ? `${(trip.max_speed_knots ?? 0).toFixed(1)}` : null
  const avgSpd = trip && (trip.average_speed_knots ?? 0) >= 0.1 ? `${(trip.average_speed_knots ?? 0).toFixed(1)}` : null
  const locLabel = trip?.start_location && trip?.location_name
    ? `${trip.start_location}  →  ${trip.location_name}`
    : trip?.location_name ?? ''
  const username  = userRow?.username ?? 'Seglare'
  const boatEmoji = trip?.boat_type === 'Segelbåt' ? '⛵' : trip?.boat_type === 'Motorbåt' ? '🚤' : trip?.boat_type === 'Kajak' ? '🛶' : '⛵'
  const boatLabel = trip?.boat_type ?? 'Tur'
  const magisk    = trip?.pinnar_rating === 3

  // ── Route SVG path ──────────────────────────────────────────────────────
  const routePts = trip && Array.isArray(trip.route_points) && trip.route_points.length >= 2
    ? (trip.route_points as { lat: number; lng: number }[])
    : null
  const RW = 420, RH = 440
  const routePath = routePts ? buildRoutePath(routePts, RW, RH) : ''

  // ── Stat boxes ─────────────────────────────────────────────────────────
  const statBoxes = [
    dist  && { val: dist,    unit: 'NM',  label: 'DISTANS' },
    dur   && { val: dur,     unit: '',    label: 'TID' },
    speed && { val: speed,   unit: 'kn',  label: 'TOPPFART' },
    avgSpd && !speed && { val: avgSpd, unit: 'kn', label: 'SNITTFART' },
  ].filter(Boolean) as { val: string; unit: string; label: string }[]

  // ── Render ──────────────────────────────────────────────────────────────
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          display: 'flex', flexDirection: 'row',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(145deg, #081828 0%, #0d2a40 45%, #0e3550 100%)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* ── Background texture — subtle wave lines ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 70% 50%, rgba(30,100,160,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* ── Left — content ──────────────────────────────────────────── */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          padding: '52px 44px 44px',
          justifyContent: 'space-between',
          zIndex: 1,
          minWidth: 0,
        }}>

          {/* Top: logo + boat type */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, letterSpacing: '3px',
                color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
              }}>
                SVALLA.SE
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '6px 14px',
            }}>
              <div style={{ fontSize: 16 }}>{boatEmoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.70)' }}>{boatLabel}</div>
            </div>
          </div>

          {/* Location name — big headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {locLabel ? (
              <div style={{
                fontSize: locLabel.length > 32 ? 28 : 34,
                fontWeight: 700, color: '#fff',
                lineHeight: 1.15, letterSpacing: '-0.5px',
              }}>
                {locLabel}
              </div>
            ) : (
              <div style={{ fontSize: 30, fontWeight: 700, color: '#fff' }}>
                {boatEmoji} Svalla-tur
              </div>
            )}
            {magisk && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'rgba(201,110,42,0.20)',
                border: '1px solid rgba(201,110,42,0.40)',
                borderRadius: 20, padding: '5px 14px',
                width: 'fit-content',
              }}>
                <div style={{ fontSize: 14 }}>⚓</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e07828', letterSpacing: '0.5px' }}>
                  MAGISK TUR
                </div>
              </div>
            )}
          </div>

          {/* Stats row */}
          {statBoxes.length > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              {statBoxes.map(({ val, unit, label }) => (
                <div
                  key={label}
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(100,180,230,0.15)',
                    borderRadius: 16, padding: '18px 22px',
                    display: 'flex', flexDirection: 'column', gap: 4,
                    minWidth: 100,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>
                      {val}
                    </div>
                    {unit && (
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(100,200,240,0.80)' }}>
                        {unit}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom: username + branding */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 700, color: '#fff',
              }}>
                {username[0]?.toUpperCase()}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                @{username}
              </div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700,
              color: 'rgba(100,180,230,0.50)',
              letterSpacing: '0.5px',
            }}>
              Loggat med Svalla ⚓
            </div>
          </div>
        </div>

        {/* ── Right — route map ─────────────────────────────────────────── */}
        <div style={{
          width: 380, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(30,100,180,0.22) 0%, transparent 70%)',
            display: 'flex',
          }} />

          {routePath ? (
            /* Route SVG */
            <svg
              width={RW * 0.78}
              height={RH * 0.78}
              viewBox={`0 0 ${RW} ${RH}`}
              style={{ position: 'relative', zIndex: 1 }}
            >
              {/* Glow pass */}
              <path d={routePath} stroke="rgba(80,170,230,0.25)" strokeWidth={12}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Main route */}
              <path d={routePath} stroke="rgba(110,200,255,0.85)" strokeWidth={4}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Start dot */}
              <circle
                cx={routePath.split(' ')[1]} cy={routePath.split(' ')[2]}
                r={7} fill="#0f9e64" />
            </svg>
          ) : (
            /* Fallback — large emoji if no route */
            <div style={{
              fontSize: 120, opacity: 0.18, position: 'relative', zIndex: 1,
              display: 'flex',
            }}>
              {boatEmoji}
            </div>
          )}

          {/* Right edge fade */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 60,
            background: 'linear-gradient(to right, transparent, rgba(8,24,40,0.95))',
            display: 'flex',
          }} />
          {/* Left edge fade */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 40,
            background: 'linear-gradient(to left, transparent, rgba(8,24,40,0.7))',
            display: 'flex',
          }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
