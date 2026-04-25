export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { buildGpx } from '@/lib/gpx'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: trip } = await supabase
    .from('trips')
    .select('id, user_id, caption, location_name, started_at, route_points')
    .eq('id', id)
    .is('deleted_at', null)
    .single()

  if (!trip) return NextResponse.json({ error: 'Inte hittad' }, { status: 404 })
  if (trip.user_id !== user.id) return NextResponse.json({ error: 'Ej tillåtet' }, { status: 403 })

  const routePts = Array.isArray(trip.route_points) ? trip.route_points as { lat: number; lng: number }[] : []

  const { data: gpsPts } = await supabase
    .from('gps_points')
    .select('latitude, longitude, recorded_at')
    .eq('trip_id', id)
    .order('recorded_at', { ascending: true })
    .limit(5000)

  const rawPts = gpsPts && gpsPts.length > 0
    ? gpsPts.map(p => ({ lat: p.latitude, lng: p.longitude, time: p.recorded_at ?? undefined }))
    : routePts.map(p => ({ lat: p.lat, lng: p.lng }))

  const name = trip.location_name ?? trip.caption ?? `Tur ${id.slice(0, 8)}`
  const gpx = buildGpx([{ name, points: rawPts }])
  const filename = `svalla-${name.replace(/[^a-zA-Z0-9åäöÅÄÖ\s]/g, '').replace(/\s+/g, '-').toLowerCase()}.gpx`

  return new Response(gpx, {
    headers: {
      'Content-Type': 'application/gpx+xml',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
