export const dynamic = 'force-dynamic'

/**
 * Säsongs-kickoff push — triggas 1 maj 2026 kl 09:00 via GitHub Actions.
 *
 * Skickar en engångs-push till alla aktiva subscriptions:
 *   "Sommaren 2026 är här ⚓"
 *   "Logga din första tur och starta säsongens leaderboard."
 *
 * Säkrat via CRON_SECRET:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * Kan köras manuellt från GitHub Actions-UI (workflow_dispatch).
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse }  from 'next/server'
import webpush           from 'web-push'

export async function GET(req: Request) {
  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Auth
  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET saknas' }, { status: 500 })
  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Obehörig' }, { status: 401 })
  }

  // Hämta alla aktiva subscriptions
  const { data: subs, error } = await supabaseAdmin
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!subs?.length) return NextResponse.json({ ok: true, sent: 0, msg: 'Inga subscriptions' })

  const payload = JSON.stringify({
    title: 'Sommaren 2026 är här ⚓',
    body:  'Logga din första tur och starta säsongens leaderboard.',
    url:   '/logga',
  })

  const results = await Promise.allSettled(
    subs.map(sub =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
      )
    )
  )

  const sent = results.filter(r => r.status === 'fulfilled').length

  // Rensa stale
  const stale = subs.filter((_, i) => {
    const r = results[i]
    return r.status === 'rejected' && (r.reason as { statusCode?: number }).statusCode === 410
  })
  if (stale.length > 0) {
    await supabaseAdmin
      .from('push_subscriptions')
      .delete()
      .in('endpoint', stale.map(s => s.endpoint))
  }

  return NextResponse.json({
    ok: true,
    sent,
    total: subs.length,
    staleRemoved: stale.length,
  })
}
