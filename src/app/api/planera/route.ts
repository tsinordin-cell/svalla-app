import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { suggestStops, type Interest, type PlaceInput } from '@/lib/planner'
import { checkRateLimit } from '@/lib/rateLimit'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /api/planera
 * Tar ett planned_route id, hämtar platser, kör algoritmen,
 * sparar suggested_stops och returnerar dem.
 */
export async function POST(req: NextRequest) {
  try {
    // Rate limit per IP (anrop är öppet — lazy compute triggas från publik sida)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown'
    if (!checkRateLimit(`planera:${ip}`, 10, 60_000)) {
      return NextResponse.json({ error: 'För många förfrågningar, försök igen om en minut' }, { status: 429 })
    }

    const { routeId } = await req.json()
    if (!routeId || typeof routeId !== 'string' || !UUID_RE.test(routeId)) {
      return NextResponse.json({ error: 'Ogiltig routeId' }, { status: 400 })
    }

    const supabase = await createClient()

    // Hämta endast publicerade rutter (matchar beteendet på /planera/[id])
    const { data: route, error: routeErr } = await supabase
      .from('planned_routes')
      .select('id, start_lat, start_lng, end_lat, end_lng, interests, suggested_stops')
      .eq('id', routeId)
      .eq('status', 'published')
      .maybeSingle()

    if (routeErr || !route) {
      return NextResponse.json({ error: 'Rutten hittades inte' }, { status: 404 })
    }

    // Idempotens: om stopp redan beräknats, returnera dem utan att köra om algoritmen
    if (Array.isArray(route.suggested_stops) && route.suggested_stops.length > 0) {
      return NextResponse.json({ stops: route.suggested_stops })
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
