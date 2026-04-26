import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'

export const runtime = 'nodejs'
export const revalidate = 0

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
    .select('user_id, location_name, start_location, distance, duration, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image')
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

  const hasPhoto = !!trip?.image

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#060e18',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Background: trip photo or fallback dark gradient */}
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={trip!.image!}
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(170deg, #060e18 0%, #0d2a40 40%, #0e3a52 70%, #071420 100%)',
            display: 'flex',
          }} />
        )}

        {/* Dark overlay — stronger at bottom for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hasPhoto
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.20) 30%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.90) 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(30,100,160,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '80px 80px 0',
          position: 'relative', zIndex: 2,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.60)' }}>
            SVALLA.SE
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'rgba(0,0,0,0.35)', borderRadius: 40, padding: '10px 24px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <div style={{ fontSize: 30 }}>{boatEmoji}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{boatLabel}</div>
          </div>
        </div>

        {/* Route map — center, always shown when route exists */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1,
          padding: '60px 60px 0',
        }}>
          {routePath ? (
            <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'relative', zIndex: 1 }}>
              {/* Glow shadow */}
              <path d={routePath} stroke="rgba(30,120,200,0.35)" strokeWidth={28}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Mid glow */}
              <path d={routePath} stroke="rgba(80,180,255,0.50)" strokeWidth={14}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Sharp line */}
              <path d={routePath} stroke="rgba(160,230,255,0.95)" strokeWidth={5}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <div style={{ fontSize: 220, opacity: hasPhoto ? 0 : 0.10, display: 'flex' }}>{boatEmoji}</div>
          )}
        </div>

        {/* Location */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '48px 80px 0', position: 'relative', zIndex: 2 }}>
          {locLabel ? (
            <div style={{
              fontSize: locLabel.length > 20 ? 68 : 84,
              fontWeight: 800, color: '#fff',
              letterSpacing: '-2px', lineHeight: 1.05,
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
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
              background: 'rgba(201,110,42,0.30)', border: '1px solid rgba(201,110,42,0.60)',
              borderRadius: 40, padding: '10px 24px', marginTop: 8,
            }}>
              <div style={{ fontSize: 22 }}>⚓</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f08030', letterSpacing: '1px' }}>MAGISK TUR</div>
            </div>
          ) : null}
        </div>

        {/* Stats row */}
        {statBoxes.length > 0 ? (
          <div style={{ display: 'flex', gap: 20, padding: '48px 80px 0' }}>
            {statBoxes.map(({ val, unit, label }) => (
              <div key={label} style={{
                flex: 1,
                background: 'rgba(0,0,0,0.40)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 28, padding: '30px 28px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>{val}</div>
                  {unit ? <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(120,210,255,0.80)' }}>{unit}</div> : null}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.40)', letterSpacing: '2px' }}>{label}</div>
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
              background: 'rgba(10,100,130,0.70)',
              border: '2px solid rgba(255,255,255,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, color: '#fff',
            }}>
              {username[0]?.toUpperCase() ?? 'S'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.90)' }}>
              {`@${username}`}
            </div>
          </div>
          <div style={{
            fontSize: 20, fontWeight: 700,
            color: 'rgba(180,220,255,0.50)', letterSpacing: '0.5px',
          }}>
            Loggat med Svalla
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  )
}
