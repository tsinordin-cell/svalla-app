export const dynamic = 'force-dynamic'

/**
 * Engångs-push: lansering av "Min dag".
 *
 * Säkrat via CRON_SECRET header (samma som weekly-digest).
 * Triggas manuellt en gång:
 *
 *   curl -X POST https://svalla.se/api/push/dag-launch \
 *     -H "Authorization: Bearer <CRON_SECRET>"
 *
 * Skickar pushen till ALLA aktiva push-prenumeranter.
 * Återanvänd inte — om featuren behöver re-marknadsföras, skapa ny endpoint
 * (eller bygg generic broadcast-system senare).
 */

import { getAdminClient } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'
import webpush from 'web-push'

export async function POST(req: Request) {
  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET saknas i env' }, { status: 500 })
  const authHeader = req.headers.get('authorization') ?? ''
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Obehörig' }, { status: 401 })
  }

  const supabaseAdmin = getAdminClient()
  const { data: subs, error: subErr } = await supabaseAdmin
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')

  if (subErr) return NextResponse.json({ error: subErr.message }, { status: 500 })
  if (!subs?.length) return NextResponse.json({ ok: true, sent: 0, msg: 'Inga aktiva subs' })

  const payload = JSON.stringify({
    title: 'Ny på Svalla: Min dag',
    body: 'Få tre stopp föreslagna från din position. Krog, lunch, middag — på 30 sek.',
    url: '/dag',
    tag: 'dag-launch',
  })

  let sent = 0
  let failed = 0
  for (const s of subs) {
    try {
      await webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payload,
      )
      sent++
    } catch (e) {
      failed++
      // 410 Gone = subscription dead, kunde rensas. Lämnar som-är för nu.
      void e
    }
  }

  return NextResponse.json({ ok: true, sent, failed, total: subs.length })
}
