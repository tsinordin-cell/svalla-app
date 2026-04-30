import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import type { Interest } from '@/lib/planner'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

const VALID_INTERESTS: Interest[] = ['krog', 'bastu', 'bad', 'brygga', 'natur', 'bensin']

/**
 * POST /api/planera/create
 * Skapar en planned_route och returnerar id:t.
 * Kör server-side för att undvika RLS-problem med anonyma användare.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
  if (!(await checkRateLimit(`planera-create:${ip}`, 20, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const { startName, endName, startLat, startLng, endLat, endLng, interests } = body

    if (
      typeof startName !== 'string' || typeof endName !== 'string' ||
      typeof startLat !== 'number' || typeof startLng !== 'number' ||
      typeof endLat !== 'number' || typeof endLng !== 'number' ||
      !Array.isArray(interests) || interests.length === 0 ||
      !interests.every((i: unknown) => VALID_INTERESTS.includes(i as Interest))
    ) {
      return NextResponse.json({ error: 'Ogiltiga parametrar' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const { data, error: dbError } = await supabase
      .from('planned_routes')
      .insert({
        user_id:    session?.user.id ?? null,
        start_name: startName,
        end_name:   endName,
        start_lat:  startLat,
        start_lng:  startLng,
        end_lat:    endLat,
        end_lng:    endLng,
        interests,
        status:     'published',
      })
      .select('id')
      .single()

    if (dbError || !data) {
      logger.error('planera-create', 'insert failed', {
        code: dbError?.code,
        message: dbError?.message,
        hint: dbError?.hint,
      })
      return NextResponse.json({ error: 'Kunde inte spara rutten' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (err) {
    logger.error('planera-create', 'unhandled exception', { error: String(err) })
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 })
  }
}
