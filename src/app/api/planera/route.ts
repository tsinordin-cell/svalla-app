import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { suggestStops, type Interest, type PlaceInput } from '@/lib/planner'

/**
 * POST /api/planera
 * Tar ett planned_route id, hämtar platser, kör algoritmen,
 * sparar suggested_stops och returnerar dem.
 */
export async function POST(req: NextRequest) {
  try {
    const { routeId } = await req.json()
    if (!routeId) {
      return NextResponse.json({ error: 'routeId krävs' }, { status: 400 })
    }

    const supabase = await createClient()

    // Hämta rutten
    const { data: route, error: routeErr } = await supabase
      .from('planned_routes')
      .select('id, start_lat, start_lng, end_lat, end_lng, interests')
      .eq('id', routeId)
      .single()

    if (routeErr || !route) {
      return NextResponse.json({ error: 'Rutten hittades inte' }, { status: 404 })
    }

    // Hämta alla platser
    const { data: places, error: placesErr } = await supabase
      .from('restaurants')
      .select('id, name, latitude, longitude, type, categories, tags, island')

    if (placesErr) {
      return NextResponse.json({ error: 'Kunde inte hämta platser' }, { status: 500 })
    }

    const allPlaces: PlaceInput[] = (places ?? []).map(p => ({
      id:         p.id,
      name:       p.name,
      lat:        p.latitude,
      lng:        p.longitude,
      type:       p.type ?? null,
      categories: p.categories ?? null,
      tags:       p.tags ?? null,
      island:     p.island ?? null,
    }))

    const stops = suggestStops(
      { lat: route.start_lat, lng: route.start_lng },
      { lat: route.end_lat,   lng: route.end_lng },
      route.interests as Interest[],
      allPlaces,
    )

    // Spara tillbaka
    await supabase
      .from('planned_routes')
      .update({ suggested_stops: stops })
      .eq('id', routeId)

    return NextResponse.json({ stops })
  } catch (err) {
    console.error('[api/planera]', err)
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 })
  }
}
