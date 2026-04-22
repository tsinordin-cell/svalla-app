export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// Service-role client för RPC-anrop (gps_heat) som kräver service-role
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}

export async function GET(req: Request) {
  // Auth krävs för alla discovery-endpoints — GPS-heatmap är känslig data
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

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') ?? 'poi'

  if (type === 'heat') {
    const minLat = parseFloat(searchParams.get('min_lat') ?? '55')
    const minLng = parseFloat(searchParams.get('min_lng') ?? '14')
    const maxLat = parseFloat(searchParams.get('max_lat') ?? '60')
    const maxLng = parseFloat(searchParams.get('max_lng') ?? '20')
    const zoom   = parseInt(searchParams.get('zoom') ?? '10', 10)

    const admin = getAdminClient()
    const { data, error } = await admin.rpc('gps_heat', {
      min_lat: minLat,
      min_lng: minLng,
      max_lat: maxLat,
      max_lng: maxLng,
      zoom,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, s-maxage=3600, stale-while-revalidate=300' },
    })
  }

  if (type === 'poi') {
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name, latitude, longitude, type, categories, description, image_url, slug, island')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, s-maxage=300, stale-while-revalidate=60' },
    })
  }

  if (type === 'routes') {
    const { data, error } = await supabase
      .from('routes')
      .select('id, name, description, distance, difficulty, waypoints')
      .order('distance', { ascending: false })
      .limit(20)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'private, s-maxage=300, stale-while-revalidate=60' },
    })
  }

  return NextResponse.json({ error: 'Okänd typ' }, { status: 400 })
}
