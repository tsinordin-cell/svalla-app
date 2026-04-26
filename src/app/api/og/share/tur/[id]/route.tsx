import { ImageResponse } from 'next/og'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { Buffer } from 'buffer'

export const runtime = 'nodejs'
export const revalidate = 0

// ── Helpers ────────────────────────────────────────────────────────────────

function fmtDur(mins: number): string {
  if (mins <= 0) return ''
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ''}`.trim() : `${m}m`
}

// Simple lat/lng → SVG path (for photo mode — no projection needed)
function buildRoutePath(pts: { lat: number; lng: number }[], W: number, H: number): string {
  if (pts.length < 2) return ''
  const lats = pts.map(p => p.lat)
  const lngs = pts.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const ranLat = maxLat - minLat || 0.001
  const ranLng = maxLng - minLng || 0.001
  const pad = 0.10
  const step = Math.max(1, Math.floor(pts.length / 150))
  const sampled = pts.filter((_, i) => i % step === 0 || i === pts.length - 1)
  return sampled.map((p, i) => {
    const x = (((p.lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W
    const y = H - (((p.lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

// ── Tile math (Mercator, identical to RouteMapSVG) ─────────────────────────

const lngToTX = (lng: number, z: number) => ((lng + 180) / 360) * 2 ** z
const latToTY = (lat: number, z: number) => {
  const r = lat * Math.PI / 180
  return (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * 2 ** z
}

async function fetchTileB64(tx: number, ty: number, z: number): Promise<string | null> {
  const max = 2 ** z
  if (ty < 0 || ty >= max) return null
  const ntx = ((tx % max) + max) % max
  try {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 4000)
    const res = await fetch(`https://tile.openstreetmap.org/${z}/${ntx}/${ty}.png`, {
      headers: { 'User-Agent': 'Svalla/1.0 (+https://svalla.se)' },
      next: { revalidate: 86400 },
      signal: ctrl.signal,
    })
    clearTimeout(t)
    if (!res.ok) return null
    const buf = await res.arrayBuffer()
    return `data:image/png;base64,${Buffer.from(buf).toString('base64')}`
  } catch { return null }
}

// Mercator-projected route path for map style
function buildRoutePathMercator(
  pts: { lat: number; lng: number }[],
  Z: number,
  tx0: number, ty0: number,
  gLeft: number, gTop: number,
): string {
  if (pts.length < 2) return ''
  const step = Math.max(1, Math.floor(pts.length / 200))
  const sampled = pts.filter((_, i) => i % step === 0 || i === pts.length - 1)
  return sampled.map((p, i) => {
    const x = gLeft + (lngToTX(p.lng, Z) - tx0) * 256
    const y = gTop  + (latToTY(p.lat, Z) - ty0) * 256
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(' ')
}

// ── Constants ──────────────────────────────────────────────────────────────

const W = 1080, H = 1920

// ── Route handler ──────────────────────────────────────────────────────────

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const style = new URL(req.url).searchParams.get('style') ?? 'photo'

  const supabase = await createClient()

  const { data: trip } = await supabase
    .from('trips')
    .select('user_id, location_name, start_location, distance, duration, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image, images')
    .eq('id', id)
    .single()

  const { data: userRow } = trip
    ? await supabase.from('users').select('username').eq('id', trip.user_id).single()
    : { data: null }

  const dist   = trip && trip.distance >= 0.1 ? `${trip.distance.toFixed(1)}` : null
  const dur    = trip && trip.duration > 4    ? fmtDur(trip.duration)         : null
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

  // Photo: primary image or first from images array
  const photoUrl = trip?.image ?? (Array.isArray(trip?.images) ? (trip!.images as string[])[0] : null) ?? null
  const hasPhoto = !!photoUrl

  const statBoxes = [
    dist  && { val: dist,    unit: 'NM',  label: 'DISTANS' },
    dur   && { val: dur,     unit: '',    label: 'TID' },
    spd   && { val: spd,     unit: 'kn',  label: 'TOPPFART' },
    !spd && avgSpd && { val: avgSpd, unit: 'kn', label: 'SNITTFART' },
  ].filter(Boolean) as { val: string; unit: string; label: string }[]

  // ── MAP MODE — no route fallback ────────────────────────────────────────

  if (style === 'map' && !routePts) {
    return new ImageResponse(
      (
        <div style={{
          width: W, height: H,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: 'linear-gradient(170deg, #060e18 0%, #0a2235 50%, #071420 100%)',
          gap: 28,
        }}>
          <div style={{ fontSize: 120, display: 'flex' }}>{boatEmoji}</div>
          <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-2px', display: 'flex' }}>
            {locLabel || `${boatEmoji} Svalla-tur`}
          </div>
          <div style={{ fontSize: 34, color: 'rgba(255,255,255,0.35)', display: 'flex' }}>Ingen GPS-data för den här turen</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20 }}>
            <svg viewBox="0 0 20 22" width={40} height={40} style={{ display: 'flex' }}>
              <line x1="9" y1="20" x2="9" y2="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9,3 L18,18 L9,18 Z" fill="rgba(255,255,255,0.55)"/>
              <path d="M9,7 L1,17 L9,17 Z" fill="rgba(255,255,255,0.30)"/>
              <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke="rgba(255,255,255,0.40)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '6px', color: 'rgba(255,255,255,0.55)', display: 'flex' }}>SVALLA</div>
          </div>
        </div>
      ),
      { width: W, height: H }
    )
  }

  // ── MAP MODE ────────────────────────────────────────────────────────────

  if (style === 'map' && routePts) {
    // Bounds
    const lats = routePts.map(p => p.lat)
    const lngs = routePts.map(p => p.lng)
    const minLat = Math.min(...lats), maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)

    // Zoom: route should fill ~65% of W × 1300
    const MH = 1300
    let Z = 16
    for (; Z >= 5; Z--) {
      const spanX = (lngToTX(maxLng, Z) - lngToTX(minLng, Z)) * 256
      const spanY = (latToTY(minLat, Z) - latToTY(maxLat, Z)) * 256
      if (spanX <= W * 0.65 && spanY <= MH * 0.65) break
    }

    // 5×6 tile grid centered on route
    const cx = (lngToTX(minLng, Z) + lngToTX(maxLng, Z)) / 2
    const cy = (latToTY(minLat, Z) + latToTY(maxLat, Z)) / 2
    const tx0 = Math.floor(cx) - 2
    const ty0 = Math.floor(cy) - 3
    const COLS = 5, ROWS = 6

    const gLeft = W / 2 - (cx - tx0) * 256
    const gTop  = MH / 2 - (cy - ty0) * 256

    // Fetch all tiles in parallel
    const tileJobs: Promise<{ dx: number; dy: number; src: string | null }>[] = []
    for (let dy = 0; dy < ROWS; dy++) {
      for (let dx = 0; dx < COLS; dx++) {
        tileJobs.push(
          fetchTileB64(tx0 + dx, ty0 + dy, Z).then(src => ({ dx, dy, src }))
        )
      }
    }
    const tiles = await Promise.all(tileJobs)

    // Mercator route path
    const mapPath = buildRoutePathMercator(routePts, Z, tx0, ty0, gLeft, gTop)

    // Start / end dots
    const sp = routePts[0]!
    const ep = routePts[routePts.length - 1]!
    const sx = gLeft + (lngToTX(sp.lng, Z) - tx0) * 256
    const sy = gTop  + (latToTY(sp.lat, Z) - ty0) * 256
    const ex = gLeft + (lngToTX(ep.lng, Z) - tx0) * 256
    const ey = gTop  + (latToTY(ep.lat, Z) - ty0) * 256

    return new ImageResponse(
      (
        <div style={{
          width: W, height: H,
          display: 'flex', flexDirection: 'column',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          background: '#aad3df', // OSM water color fallback
          overflow: 'hidden', position: 'relative',
        }}>

          {/* ── Map tile layer ── */}
          <div style={{
            position: 'absolute', left: 0, top: 0,
            width: W, height: MH,
            overflow: 'hidden', display: 'flex',
          }}>
            {tiles.map(({ dx, dy, src }) =>
              src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={`${dx}-${dy}`} src={src} alt="" style={{
                  position: 'absolute',
                  left: gLeft + dx * 256,
                  top: gTop + dy * 256,
                  width: 256, height: 256,
                }} />
              ) : null
            )}

            {/* Route SVG on top of tiles */}
            {mapPath && (
              <svg
                width={W} height={MH}
                viewBox={`0 0 ${W} ${MH}`}
                style={{ position: 'absolute', left: 0, top: 0 }}
              >
                {/* Outer glow */}
                <path d={mapPath} stroke="rgba(255,100,40,0.30)" strokeWidth={22}
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Mid glow */}
                <path d={mapPath} stroke="rgba(255,120,50,0.60)" strokeWidth={10}
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Sharp line */}
                <path d={mapPath} stroke="#ff5c2e" strokeWidth={5}
                  fill="none" strokeLinecap="round" strokeLinejoin="round" />
                {/* Start dot */}
                <circle cx={sx} cy={sy} r={10} fill="#22c55e" stroke="#fff" strokeWidth={3} />
                {/* End dot */}
                <circle cx={ex} cy={ey} r={10} fill="#ff5c2e" stroke="#fff" strokeWidth={3} />
              </svg>
            )}

            {/* Gradient fade at the bottom of the map */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 400,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(10,16,24,0.95) 100%)',
              display: 'flex',
            }} />
          </div>

          {/* ── Bottom info panel ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '0 72px 72px',
            display: 'flex', flexDirection: 'column',
            background: 'linear-gradient(to bottom, transparent 0%, #0a1018 25%)',
          }}>

            {/* Top bar inside info panel */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingBottom: 32,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg viewBox="0 0 20 22" width={30} height={30} style={{ display: 'flex' }}>
                  <line x1="9" y1="20" x2="9" y2="2" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" strokeLinecap="round"/>
                  <path d="M9,3 L18,18 L9,18 Z" fill="rgba(255,255,255,0.55)"/>
                  <path d="M9,7 L1,17 L9,17 Z" fill="rgba(255,255,255,0.30)"/>
                  <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke="rgba(255,255,255,0.40)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                </svg>
                <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.50)' }}>SVALLA</div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(0,0,0,0.45)', borderRadius: 40, padding: '8px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <div style={{ fontSize: 26 }}>{boatEmoji}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.75)' }}>{boatLabel}</div>
              </div>
            </div>

            {/* Location */}
            {locLabel ? (
              <div style={{
                fontSize: locLabel.length > 20 ? 64 : 80,
                fontWeight: 800, color: '#fff',
                letterSpacing: '-2px', lineHeight: 1.05,
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}>
                {locLabel}
              </div>
            ) : (
              <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-2px', display: 'flex' }}>
                {`${boatEmoji} Svalla-tur`}
              </div>
            )}

            {magisk && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'rgba(201,110,42,0.30)', border: '1px solid rgba(201,110,42,0.60)',
                borderRadius: 40, padding: '10px 24px', marginTop: 10,
                width: 'fit-content',
              }}>
                <div style={{ fontSize: 20 }}>⚓</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#f08030', letterSpacing: '1px' }}>MAGISK TUR</div>
              </div>
            )}

            {/* Stats */}
            {statBoxes.length > 0 && (
              <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
                {statBoxes.map(({ val, unit, label }) => (
                  <div key={label} style={{
                    flex: 1,
                    background: 'rgba(0,0,0,0.50)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 24, padding: '24px 22px',
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
                      <div style={{ fontSize: 52, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>{val}</div>
                      {unit ? <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,180,80,0.85)' }}>{unit}</div> : null}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.60)', letterSpacing: '2px' }}>{label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 32,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(10,100,130,0.70)',
                  border: '2px solid rgba(255,255,255,0.20)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 800, color: '#fff',
                }}>
                  {username[0]?.toUpperCase() ?? 'S'}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'rgba(255,255,255,0.90)' }}>
                  {`@${username}`}
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,180,80,0.45)', letterSpacing: '0.5px' }}>
                Loggat med Svalla
              </div>
            </div>
          </div>

        </div>
      ),
      { width: W, height: H }
    )
  }

  // ── PHOTO MODE (default) ────────────────────────────────────────────────

  const RW = 860, RH = 860
  const routePath = routePts ? buildRoutePath(routePts, RW, RH) : ''

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H,
        display: 'flex', flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#060e18',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Background: trip photo or dark gradient */}
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl!} alt="" style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(170deg, #060e18 0%, #0d2a40 40%, #0e3a52 70%, #071420 100%)',
            display: 'flex',
          }} />
        )}

        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hasPhoto
            ? 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.20) 25%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.94) 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 45%, rgba(30,100,160,0.18) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '80px 80px 0', position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg viewBox="0 0 20 22" width={36} height={36} style={{ display: 'flex' }}>
              <line x1="9" y1="20" x2="9" y2="2" stroke="rgba(255,255,255,0.70)" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9,3 L18,18 L9,18 Z" fill="rgba(255,255,255,0.70)"/>
              <path d="M9,7 L1,17 L9,17 Z" fill="rgba(255,255,255,0.40)"/>
              <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '5px', color: 'rgba(255,255,255,0.70)' }}>SVALLA</div>
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

        {/* Route map — center */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', zIndex: 1, padding: '60px 60px 0',
        }}>
          {routePath ? (
            <svg width={RW} height={RH} viewBox={`0 0 ${RW} ${RH}`} style={{ position: 'relative', zIndex: 1 }}>
              {/* Dark outline for visibility on any background */}
              <path d={routePath} stroke="rgba(0,0,0,0.45)" strokeWidth={36}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Blue glow */}
              <path d={routePath} stroke="rgba(30,120,200,0.50)" strokeWidth={26}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <path d={routePath} stroke="rgba(80,180,255,0.65)" strokeWidth={12}
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
              {/* Bright core */}
              <path d={routePath} stroke="rgba(200,240,255,0.98)" strokeWidth={4}
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
              fontWeight: 800, color: '#fff', letterSpacing: '-2px', lineHeight: 1.05,
              textShadow: '0 2px 32px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.7)',
            }}>
              {locLabel}
            </div>
          ) : (
            <div style={{ fontSize: 72, fontWeight: 800, color: '#fff', letterSpacing: '-2px', display: 'flex' }}>
              {`${boatEmoji} Svalla-tur`}
            </div>
          )}
          {magisk && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(201,110,42,0.30)', border: '1px solid rgba(201,110,42,0.60)',
              borderRadius: 40, padding: '10px 24px', marginTop: 8,
            }}>
              <div style={{ fontSize: 22 }}>⚓</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#f08030', letterSpacing: '1px' }}>MAGISK TUR</div>
            </div>
          )}
        </div>

        {/* Stats */}
        {statBoxes.length > 0 && (
          <div style={{ display: 'flex', gap: 20, padding: '48px 80px 0' }}>
            {statBoxes.map(({ val, unit, label }) => (
              <div key={label} style={{
                flex: 1, background: 'rgba(0,0,0,0.40)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 28, padding: '30px 28px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <div style={{ fontSize: 58, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-2px' }}>{val}</div>
                  {unit ? <div style={{ fontSize: 22, fontWeight: 700, color: 'rgba(120,210,255,0.80)' }}>{unit}</div> : null}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'rgba(255,255,255,0.60)', letterSpacing: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '48px 80px 90px', position: 'relative', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(10,100,130,0.70)', border: '2px solid rgba(255,255,255,0.20)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, fontWeight: 800, color: '#fff',
            }}>
              {username[0]?.toUpperCase() ?? 'S'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'rgba(255,255,255,0.90)' }}>
              {`@${username}`}
            </div>
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'rgba(180,220,255,0.50)', letterSpacing: '0.5px' }}>
            Loggat med Svalla
          </div>
        </div>
      </div>
    ),
    { width: W, height: H }
  )
}
