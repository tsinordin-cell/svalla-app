/**
 * Ritar delningsbilderna för en tur lokalt, utan webbserver, så att designen
 * kan granskas som filer innan något går ut (2026-10-26).
 *
 *   npx tsx --tsconfig scripts/tsconfig.forhandsvisning.json scripts/dela-forhandsvisning.tsx <trip-id | fil.json> [utmapp] [stil,stil]
 *
 * Ett trip-id läses med SUPABASE_SERVICE_ROLE_KEY ur .env.local (bara lokalt);
 * en JSON-fil ({ username, trip }) ritas som den är, se forhandsvisning-data/.
 * Skriver <utmapp>/<stil>.png.
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { ImageResponse } from 'next/og'
import { ritaBild, type TripRad } from '../src/app/api/og/share/tur/[id]/rita'
import { ogTypsnitt } from '../src/app/api/og/_typsnitt/typsnitt'
import { STILAR, stil, type StilId } from '../src/lib/dela-klistermarken'
import type { GpsPoint } from '../src/lib/gps'

function env(): Record<string, string> {
  const ut: Record<string, string> = {}
  for (const rad of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = rad.match(/^([A-Z_]+)=(.*)$/)
    if (m) ut[m[1]!] = m[2]!.replace(/^"|"$/g, '')
  }
  return ut
}

async function main() {
  const [id, utmapp = 'forhandsvisning', stilar] = process.argv.slice(2)
  if (!id) throw new Error('ange trip-id')
  let trip: TripRad, username: string, punkter: GpsPoint[] = []
  if (id.endsWith('.json')) {
    const fil = JSON.parse(readFileSync(id, 'utf8')) as { username: string; trip: TripRad; punkter?: GpsPoint[] }
    trip = fil.trip; username = fil.username; punkter = fil.punkter ?? []
  } else {
    const e = env()
    const sb = createClient(e.NEXT_PUBLIC_SUPABASE_URL!, e.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } })
    const { data, error } = await sb.from('trips')
      .select('user_id, location_name, start_location, distance, duration, duration_seconds, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image, images')
      .eq('id', id).single()
    if (error || !data) throw new Error('turen finns inte: ' + error?.message)
    trip = data as TripRad
    const { data: u } = await sb.from('users').select('username').eq('id', trip.user_id).single()
    username = u?.username ?? 'Seglare'
    const { data: rows } = await sb.from('gps_points').select('latitude, longitude, speed_knots, heading, recorded_at').eq('trip_id', id).order('recorded_at').limit(20000)
    punkter = (rows ?? []).map(r => ({ lat: r.latitude, lng: r.longitude, speedKnots: r.speed_knots ?? 0, heading: r.heading ?? null, accuracy: 0, recordedAt: r.recorded_at }))
  }
  const fonts = await ogTypsnitt()
  mkdirSync(utmapp, { recursive: true })
  const valda = (stilar ? stilar.split(',') : STILAR.map(s => s.id)) as StilId[]
  for (const style of valda) {
    const t0 = Date.now()
    const res = await ritaBild({ trip, username, punkter, style, fonts })
    if (!(res instanceof ImageResponse)) { console.log(style, '→', res.status, await res.text()); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    const fil = join(utmapp, `${style}.png`)
    writeFileSync(fil, buf)
    console.log(style, stil(style).bredd + '×' + stil(style).hojd, Math.round(buf.length / 1024) + ' kB', (Date.now() - t0) + ' ms', '→', fil)
  }
}
main().catch(e => { console.error(e); process.exit(1) })
