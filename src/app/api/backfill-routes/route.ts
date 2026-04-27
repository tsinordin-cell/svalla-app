export const dynamic = 'force-dynamic'

/**
 * POST /api/backfill-routes
 *
 * Finds all trips where route_points IS NULL but gps_points exist,
 * rebuilds route_points using the same pipeline as /spara, and saves.
 *
 * Protected by BACKFILL_SECRET env var.
 *
 * Usage:
 *   curl -X POST https://svalla.se/api/backfill-routes \
 *        -H "Authorization: Bearer <BACKFILL_SECRET>"
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient }              from '@supabase/supabase-js'
import { buildRoutePoints }          from '@/lib/routeSmooth'
import { checkRateLimit }            from '@/lib/rateLimit'

const PAGE = 50 // process N trips per call

export async function POST(req: NextRequest) {
  // Rate limit: 1 request per second for admin endpoints
  if (!(await checkRateLimit('backfill-routes', 1, 1000))) {
    return NextResponse.json({ error: 'Rate limited' }, { status: 429 })
  }
  const auth = req.headers.get('authorization') ?? ''
  const secret = process.env.BACKFILL_SECRET ?? ''
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // 1. Fetch trips with no route_points (but that have gps data)
  const { data: trips, error: tripsErr } = await supabase
    .from('trips')
    .select('id')
    .is('route_points', null)
    .limit(PAGE)

  if (tripsErr) return NextResponse.json({ error: tripsErr.message }, { status: 500 })
  if (!trips || trips.length === 0) {
    return NextResponse.json({ done: true, updated: 0, message: 'Alla turer har redan route_points' })
  }

  let updated = 0
  let skipped = 0
  const errors: string[] = []

  for (const trip of trips) {
    // 2. Fetch GPS points for this trip
    const { data: pts, error: ptsErr } = await supabase
      .from('gps_points')
      .select('latitude, longitude, recorded_at')
      .eq('trip_id', trip.id)
      .order('recorded_at', { ascending: true })

    if (ptsErr) { errors.push(`${trip.id}: ${ptsErr.message}`); continue }
    if (!pts || pts.length < 2) { skipped++; continue }

    // 3. Map to { lat, lng, recordedAt } shape expected by buildRoutePoints
    // Note: accuracy not stored in gps_points — filter step will pass all through
    const raw = pts.map(p => ({
      lat:        p.latitude  as number,
      lng:        p.longitude as number,
      recordedAt: p.recorded_at as string,
    }))

    // 4. Run the same smoothing pipeline used in /spara (dynamic cap)
    const routePoints = buildRoutePoints(raw)
    if (!routePoints) { skipped++; continue }

    // 5. Update the trip
    const { error: updErr } = await supabase
      .from('trips')
      .update({ route_points: routePoints })
      .eq('id', trip.id)

    if (updErr) { errors.push(`${trip.id}: ${updErr.message}`); continue }
    updated++
  }

  return NextResponse.json({
    done:    trips.length < PAGE,
    batch:   trips.length,
    updated,
    skipped,
    errors:  errors.length > 0 ? errors : undefined,
    remaining: trips.length === PAGE ? 'Kör igen för nästa batch' : 'Klart!',
  })
}
