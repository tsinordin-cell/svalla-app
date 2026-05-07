/**
 * POST /api/analytics/track
 *
 * Tar emot ett event från klienten och skriver till `analytics_events`-tabellen.
 * Parallel med PostHog — PostHog är primary, vår tabell är för snabba
 * SQL-queries och egen dashboard på /admin/insikter.
 *
 * Säkerhet:
 *   - Rate-limit per IP (200 events/min — generöst men skyddar mot spam)
 *   - Validerar event_name mot kända SvallaEvent-namn
 *   - Tar inte emot props större än 4KB (skydd mot stora payloads)
 *
 * Användning:
 *   POST /api/analytics/track
 *   { event: 'place_viewed', props: { place_id: '...' }, sessionId?: '...' }
 */
import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Vit-lista över event-namn — samma som SvallaEvent-katalogen i
// lib/analytics-events.ts. Vi vägrar okända events för att undvika
// förorenad data.
const KNOWN_EVENTS = new Set([
  'user_signup', 'user_login', 'user_logout', 'account_deleted',
  'onboarding_started', 'onboarding_step', 'onboarding_completed',
  'trip_logging_started', 'trip_logged', 'trip_viewed', 'trip_liked', 'trip_commented',
  'forum_thread_created', 'forum_post_created', 'forum_subscribed', 'forum_best_answer_marked',
  'follow_added', 'push_prompt_shown', 'push_prompt_response',
  'search_performed', 'island_viewed', 'place_viewed',
  'route_planned', 'route_saved',
  'dag_pill_clicked', 'dag_page_viewed', 'dag_position_set', 'dag_plan_generated',
  'dag_save_clicked', 'dag_plan_saved', 'dag_save_failed',
  'pricing_viewed', 'checkout_started', 'checkout_completed', 'partner_inquiry_sent',
  'feature_friction', 'paywall_hit',
  // Nya 2026-05-07
  'share_clicked', 'directions_clicked', 'action_pill_clicked',
  'filter_changed', 'bookmark_toggled',
])

const MAX_PROPS_BYTES = 4096

export async function POST(req: NextRequest) {
  try {
    // Rate-limit per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown'
    if (!(await checkRateLimit(`analytics:${ip}`, 200, 60_000))) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const body = await req.json().catch(() => null) as
      | { event?: string; props?: Record<string, unknown>; sessionId?: string; path?: string }
      | null

    if (!body?.event || typeof body.event !== 'string' || !KNOWN_EVENTS.has(body.event)) {
      return NextResponse.json({ ok: false, error: 'unknown_event' }, { status: 400 })
    }

    // Storleks-kontroll på props
    const propsJson = JSON.stringify(body.props ?? {})
    if (propsJson.length > MAX_PROPS_BYTES) {
      return NextResponse.json({ ok: false, error: 'props_too_large' }, { status: 400 })
    }

    // Hitta inloggad user (om finns) — men kräv inte
    let userId: string | null = null
    try {
      const sb = await createServerSupabaseClient()
      const { data: { user } } = await sb.auth.getUser()
      userId = user?.id ?? null
    } catch { /* anonymt event */ }

    // Skriv via service-role för att bypassa RLS
    const admin = getAdminClient()
    const { error } = await admin.from('analytics_events').insert({
      event_name: body.event,
      user_id: userId,
      session_id: body.sessionId ?? null,
      path: body.path ?? null,
      props: body.props ?? {},
      country_code: req.headers.get('x-vercel-ip-country') ?? null,
      user_agent: req.headers.get('user-agent')?.slice(0, 500) ?? null,
      referer: req.headers.get('referer')?.slice(0, 500) ?? null,
    })

    if (error) {
      // Logga men returnera 200 så klient inte retry:ar. Ej kritiskt om event tappas.
      console.error('[analytics/track] insert error:', error.message)
      return NextResponse.json({ ok: false, error: 'insert_failed' }, { status: 200 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[analytics/track] unexpected:', err)
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
