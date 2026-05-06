export const dynamic = 'force-dynamic'

import { getAdminClient } from '@/lib/supabase-admin'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'


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
      .select('id, name, latitude, longitude, type, categories, description, image_url, slug, island, google_photo_refs')
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    // Projicera image_url så Google-foton används automatiskt om de finns.
    // Då slipper UpptackExplorer ha någon special-logik — den använder bara image_url.
    // Bygger thumbnail-storlek (w=400) för list-kort/markers.
    type RawRow = {
      id: string; name: string; latitude: number; longitude: number;
      type: string | null; categories: string[] | null; description: string | null;
      image_url: string | null; slug: string | null; island: string | null;
      google_photo_refs: { reference: string }[] | null;
    }
    const projected = (data as RawRow[] | null ?? []).map((r) => {
      let imageUrl = r.image_url
      const ref = r.google_photo_refs?.[0]?.reference
      if (ref) {
        const encoded = Buffer.from(ref, 'utf-8').toString('base64url')
        imageUrl = `/api/places/photo/${encoded}?w=400`
      }
      // Skicka inte med tunga google_photo_refs i list-svaret (kan vara ~3KB per plats × 288 = 1MB)
      return {
        id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
        type: r.type, categories: r.categories, description: r.description,
        image_url: imageUrl, slug: r.slug, island: r.island,
      }
    })

    // POI-listan uppdateras bara via /admin → aggressiv cache är säker.
    // 1 h fresh, 24 h stale-while-revalidate ger nästan-omedelbara karta-laddningar.
    return NextResponse.json(projected, {
      headers: { 'Cache-Control': 'private, s-maxage=3600, stale-while-revalidate=86400' },
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
