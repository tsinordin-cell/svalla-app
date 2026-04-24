import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const revalidate = 3600

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
  const pad = 0.10
  // Limit points to avoid excessively long SVG paths
  const step = Math.max(1, Math.floor(pts.length / 120))
  const sampled = pts.filter((_, i) => i % step === 0 || i === pts.length - 1)
  return sampled.map((p, i) => {
    const x = (((p.lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W
    const y = H - (((p.lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

const W = 1080, H = 1920

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()

  const { data: trip } = await supabase
    .from('trips')
    .select('user_id, location_name, start_location, distance, duration, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating')
    .eq('id', id)
    .single()

  const { data: userRow } = trip
    ? await supabase.from('users').select('username').eq('id', trip.user_id).single()
    : { data: null }

  const dist   = trip && trip.distance >= 0.1 ? `${trip.distance.toFixed(1)}` : null
  const dur    = trip && trip.duration > 0    ? fmtDur(trip.duration)         : null
  const spd    = trip && (trip.max_speed_knots ?? 0) >= 0.1 ? `${(trip.max_speed_knots ?? 0).toFixed(1)}` : null
  const avgSpd = trip && (trip.average_speed_knots ?? 0) >= 0.1 ? `${(trip.average_speed_knots ?? 0).toFixed(1)}` : null
  const loc    = trip?.location_name ?? null
  const from   = trip?.start_location ?? null
  const username  = userRow?.username ?? 'Seglare'
  const boatEmoji = trip?.boat_type === 'Segelbåt' ? '⛵' : trip?.boat_type === 'Motorbåt' ? '🚤' : trip?.boat_type === 'Kajak' ? '🛶' : '⛵'
  const boatLabel = trip?.boat_type ?? 'Tur'
  const magisk = trip?.pinnar_rating === 3

  const locLabel = from && loc ? `${from} → ${loc}` : loc ?? from ?? ''

  const routePts = trip && Array.isArray(trip.route_points) && trip.route_points.length >= 2
    ? (trip.route_points as { lat: number; lng: number }[])
    : null
  const RW = 860, RH = 860
  const routePath = routePts ? buildRoutePath(routePts, RW, RH) : ''

  const statBoxes = [
    dist  && { val: dist,    unit: 'NM',  label: 'DISTANS' },
    dur   && { val: dur,     unit: '',    label: 'TID' },
    spd   && { val: spd,     unit: 'kn',  label: 'TOPPFART' },
    !spd && avgSpd && { val: avgSpd, unit: 'kn', label: 'SNITTFART' },
  ].filter(Boolean) as { val: string; unit: string; label: string }[]

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(170deg, #060e18 0%, #0d2a40 40%, #0e3a52 70%, #071420 100%)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(30,100,160,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '80px 80px 0',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.35)' }}>
            SVALLA.SE
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(255,255,255,0.07)', borderRadius: 40, padding: '10px 24px',
          }}>
            <div style={{ fontSize: 30 }}>{boatEmoji}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.60)' }}>{boatLabel}</div>
          </div>
        </div>

        {/* Route map — center */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          padding: '60px 60px 0',
        }}>
          {routePath ? (
            <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'relative', zIndex: 1 }}>
              <path d={routePath} stroke="rgba(80,170,230,0.25)" strokeWidth={16}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={routePath} stroke="rgba(110,200,255,0.85)" strokeWidth={6}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <div style={{ fontSize: 220, opacity: 0.10, display: 'flex' }}>{boatEmoji}</div>
          )}
        </div>

        {/* Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '48px 80px 0', position: 'relative', zIndex: 2 }}>
          {locLabel ? (
            <div style={{
              fontSize: locLabel.length > 20 ? 68 : 84,
              fontWeight: 800, color: '#fff',
              letterSpacing: '-2px', lineHeight: 1.05,
            }}>
              {locLabel}
            </div>
          ) : (
            <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-2px', display: 'flex' }}>
              {`${boatEmoji} Svalla-tur`}
            </div>
          )}
          {magisk ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(201,110,42,0.22)', border: '1px solid rgba(201,110,42,0.50)',
              borderRadius: 40, padding: '10px 24px', marginTop: 8,
            }}>
              <div style={{ fontSize: 22 }}>⚓</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#e07828', letterSpacing: '1px' }}>MAGISK TUR</div>
            </div>
          ) : null}
        </div>

        {/* Stats row */}
        {statBoxes.length > 0 ? (
          <div style={{ display: 'flex', gap: 20, padding: '48px 80px 0' }}>
            {statBoxes.map(({ val, unit, label }) => (
              <div key={label} style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(100,180,230,0.12)',
                borderRadius: 28, padding: '30px 28px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>{val}</div>
                  {unit ? <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(100,200,240,0.70)' }}>{unit}</div> : null}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.30)', letterSpacing: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 80px 90px',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(10,123,140,0.60)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, color: '#fff',
            }}>
              {username[0]?.toUpperCase() ?? 'S'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.80)' }}>
              {`@${username}`}
            </div>
          </div>
          <div style={{
            fontSize: 20, fontWeight: 700,
            color: 'rgba(100,180,230,0.40)', letterSpacing: '0.5px',
          }}>
            Loggat med Svalla
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  )
}
