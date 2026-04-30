export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rateLimit'

/**
 * POST /api/planera/claim
 * Body: { routeId }
 *
 * Anonym användare skapar en rutt → senare loggar in → vi knyter rutten
 * till deras konto. Bara rutter med user_id = null kan claim:as.
 *
 * Säkerhet: Bara inloggad användare får anropa, och bara claim:a om rutten
 * är obesatt. Annars 403.
 */
export async function POST(req: NextRequest) {
  let body: { routeId?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }
  const routeId = typeof body.routeId === 'string' ? body.routeId : null
  if (!routeId) {
    return NextResponse.json({ error: 'routeId krävs' }, { status: 400 })
  }

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
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Logga in först' }, { status: 401 })
  }

  // Rate limit: 20 claim-försök per 5 min per user
  if (!(await checkRateLimit(`planera-claim:${user.id}`, 20, 5 * 60_000))) {
    return NextResponse.json({ error: 'För många försök. Vänta en stund.' }, { status: 429 })
  }

  // Hämta rutten — om user_id != null kan den inte claim:as
  const { data: route, error: fetchError } = await supabase
    .from('planned_routes')
    .select('id, user_id')
    .eq('id', routeId)
    .single()

  if (fetchError || !route) {
    return NextResponse.json({ error: 'Rutt hittades inte' }, { status: 404 })
  }

  if (route.user_id === user.id) {
    // Redan claim:ad av samma user — idempotent OK
    return NextResponse.json({ ok: true, alreadyOwned: true })
  }

  if (route.user_id !== null) {
    // Tillhör någon annan
    return NextResponse.json({ error: 'Rutten tillhör redan en användare' }, { status: 403 })
  }

  const { error: updateError } = await supabase
    .from('planned_routes')
    .update({ user_id: user.id })
    .eq('id', routeId)
    .is('user_id', null) // race-skydd: bara om fortfarande null

  if (updateError) {
    logger.error('planera-claim', 'update failed', { routeId, error: updateError.message })
    return NextResponse.json({ error: 'Kunde inte spara rutten' }, { status: 500 })
  }

  logger.info('planera-claim', 'claimed', { routeId, userId: user.id })
  return NextResponse.json({ ok: true, claimed: true })
}
