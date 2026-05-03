import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import type { DagStop } from '@/lib/dagPlanner'

/**
 * POST /api/dag/save
 *
 * Sparar en föreslagen "Min dag"-plan i `planned_routes` med status='day_plan'.
 * Återanvänder befintlig tabell för att inte skapa nytt schema.
 *
 * Body: { startLat, startLng, startName, startTime, stops[] }
 */
export async function POST(req: Request) {
  let body: {
    startLat?: number
    startLng?: number
    startName?: string
    startTime?: string
    stops?: DagStop[]
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const { startLat, startLng, startName, startTime, stops } = body

  if (
    typeof startLat !== 'number' ||
    typeof startLng !== 'number' ||
    typeof startName !== 'string' ||
    typeof startTime !== 'string' ||
    !Array.isArray(stops) ||
    stops.length === 0
  ) {
    return NextResponse.json({ error: 'Ofullständiga data' }, { status: 400 })
  }

  // Sanity-cap — vi förväntar oss 1–5 stopp, ej fler
  if (stops.length > 5) {
    return NextResponse.json({ error: 'För många stopp' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Logga in för att spara' }, { status: 401 })
  }

  const lastStop = stops[stops.length - 1]!
  const interests = Array.from(new Set(stops.map(s => s.type).filter(Boolean) as string[]))

  const { data, error } = await supabase
    .from('planned_routes')
    .insert({
      user_id: user.id,
      start_name: startName,
      end_name: lastStop.name,
      start_lat: startLat,
      start_lng: startLng,
      end_lat: lastStop.lat,
      end_lng: lastStop.lng,
      interests,
      suggested_stops: stops,
      status: 'day_plan',
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Kunde inte spara: ' + error.message }, { status: 500 })
  }

  return NextResponse.json({ id: data.id })
}
