export const dynamic = 'force-dynamic'

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') ?? 'poi'

  if (type === 'heat') {
    const minLat = parseFloat(searchParams.get('min_lat') ?? '55')
    const minLng = parseFloat(searchParams.get('min_lng') ?? '14')
    const maxLat = parseFloat(searchParams.get('max_lat') ?? '60')
    const maxLng = parseFloat(searchParams.get('max_lng') ?? '20')
    const zoom   = parseInt(searchParams.get('zoom') ?? '10', 10)

    const { data, error } = await supabase.rpc('gps_heat', {
      min_lat: minLat,
      min_lng: minLng,
      max_lat: maxLat,
      max_lng: maxLng,
      zoom,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=300' },
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
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
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
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    })
  }

  return NextResponse.json({ error: 'Okänd typ' }, { status: 400 })
}
