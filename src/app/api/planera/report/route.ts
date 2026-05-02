/**
 * POST /api/planera/report
 *
 * Användare flaggar en rutt som felaktig (rak linje, går genom land etc).
 * Rapporten landar i route_reports och visas sedan i /admin/routes så vi kan
 * prioritera vilka rutter som ska precomputeras eller manuellt fixas.
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(req: NextRequest) {
  // Rate-limit per IP — max 10 rapporter/min
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? 'unknown'
  if (!(await checkRateLimit(`route-report:${ip}`, 10, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
  }

  let payload: { routeId?: unknown; reason?: unknown }
  try { payload = await req.json() }
  catch { return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 }) }

  const { routeId, reason } = payload
  if (typeof routeId !== 'string' || !UUID_RE.test(routeId)) {
    return NextResponse.json({ error: 'Ogiltigt routeId' }, { status: 400 })
  }
  const reasonText = (typeof reason === 'string' ? reason : '').trim().slice(0, 500)
  if (reasonText.length < 3) {
    return NextResponse.json({ error: 'Anledning krävs (minst 3 tecken)' }, { status: 400 })
  }

  // Hämta inloggad user (om finns) — anonym tillåtet
  let userId: string | null = null
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    userId = user?.id ?? null
  } catch { /* anonym */ }

  // Insert via service-role (bypassar RLS)
  const { error } = await getAdminClient().from('route_reports').insert({
    route_id: routeId,
    user_id:  userId,
    reason:   reasonText,
    status:   'open',
  })

  if (error) {
    logger.error('planera-report', 'insert failed', { e: error.message, routeId })
    return NextResponse.json({ error: 'Kunde inte spara rapporten' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
