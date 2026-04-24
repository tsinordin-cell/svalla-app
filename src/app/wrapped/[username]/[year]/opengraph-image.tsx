import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase'
import type { Trip } from '@/lib/supabase'

export const runtime = 'nodejs'
export const revalidate = 3600
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function fmtDist(nm: number) {
  return nm >= 1000 ? `${(nm / 1000).toFixed(1)}k` : nm.toFixed(0)
}
function fmtDur(mins: number) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}h${m > 0 ? ` ${m}m` : ''}` : `${m}m`
}

function buildSpaghettiPath(
  allPoints: { lat: number; lng: number }[][],
  W: number,
  H: number,
): string {
  const flat = allPoints.flat()
  if (flat.length < 2) return ''
  const lats = flat.map(p => p.lat)
  const lngs = flat.map(p => p.lng)
  const minLat = Math.min(...lats), maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs), maxLng = Math.max(...lngs)
  const ranLat = maxLat - minLat || 0.001
  const ranLng = maxLng - minLng || 0.001
  const pad = 0.08
  function tx(lng: number) { return (((lng - minLng) / ranLng) * (1 - pad * 2) + pad) * W }
  function ty(lat: number) { return H - (((lat - minLat) / ranLat) * (1 - pad * 2) + pad) * H }
  return allPoints
    .map(pts => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${tx(p.lng).toFixed(1)} ${ty(p.lat).toFixed(1)}`).join(' '))
    .join(' ')
}

export default async function Image({
  params,
}: {
  params: Promise<{ username: string; year: string }>
}) {
  const { username, year } = await params
  const yr = parseInt(year, 10)

  const supabase = createClient()
  const { data: userRow } = await supabase
    .from('users')
    .select('id, username, vessel_name, home_port')
    .eq('username', username)
    .single()

  if (!userRow) {
    return new ImageResponse(
      <div style={{ width: 1200, height: 630, background: '#0d2240', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
        Svalla Wrapped
      </div>,
      { width: 1200, height: 630 },
    )
  }

  const { data: rawTrips } = await supabase
    .from('trips')
    .select('distance, duration, max_speed_knots, location_name, route_points, started_at, created_at')
    .eq('user_id', userRow.id)
    .is('deleted_at', null)
    .gte('started_at', `${yr}-01-01`)
    .lt('started_at', `${yr + 1}-01-01`)

  const trips = (rawTrips ?? []) as Trip[]
  const totalDist = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const totalDur  = trips.reduce((a, t) => a + (t.duration ?? 0), 0)
  const uniqueLocs = new Set(trips.map(t => t.location_name).filter(Boolean)).size

  const routeGroups = trips
    .map(t => t.route_points)
    .filter((p): p is { lat: number; lng: number }[] => Array.isArray(p) && p.length >= 2)

  const SW = 560, SH = 430
  const spaghettiPath = buildSpaghettiPath(routeGroups, SW, SH)

  const u = userRow as Record<string, string | null>

  return new ImageResponse(
    <div style={{
      width: 1200, height: 630,
      display: 'flex',
      background: 'linear-gradient(160deg, #0a1a2e 0%, #0d2a3e 50%, #0a4a58 100%)',
      fontFamily: 'system-ui, sans-serif',
      position: 'relative',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 70% at 70% 50%, rgba(45,125,138,0.35) 0%, transparent 60%)',
      }} />

      {/* Left: stats */}
      <div style={{
        width: 560, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '56px 56px 56px 64px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>⚓</div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', textTransform: 'uppercase' }}>Svalla Wrapped {year}</span>
        </div>

        <div style={{ fontSize: 38, fontWeight: 900, color: '#fff', lineHeight: 1.1, marginBottom: 8 }}>
          {username}s {year}
        </div>
        {u.vessel_name && (
          <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
            ⛵ {u.vessel_name}{u.home_port ? ` · ${u.home_port}` : ''}
          </div>
        )}

        <div style={{ display: 'flex', gap: 28, marginTop: u.vessel_name ? 0 : 36 }}>
          {[
            { val: trips.length.toString(), label: 'Turer' },
            { val: `${fmtDist(totalDist)} nm`, label: 'Distans' },
            { val: fmtDur(totalDur), label: 'Till havs' },
            { val: uniqueLocs.toString(), label: 'Platser' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#4ab8d4', lineHeight: 1 }}>{s.val}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, fontSize: 14, color: 'rgba(255,255,255,0.35)' }}>
          svalla.se/wrapped/{username}/{year}
        </div>
      </div>

      {/* Right: spaghetti map */}
      <div style={{
        width: 640, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          width: SW + 40, height: SH + 40,
          background: 'rgba(10,26,46,0.7)',
          borderRadius: 20,
          border: '1px solid rgba(74,184,212,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {spaghettiPath ? (
            <svg
              width={SW} height={SH}
              viewBox={`0 0 ${SW} ${SH}`}
              style={{ display: 'block' }}
            >
              <path
                d={spaghettiPath}
                fill="none"
                stroke="rgba(74,184,212,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span style={{ fontSize: 48, opacity: 0.3 }}>🗺️</span>
          )}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
