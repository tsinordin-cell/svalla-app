export const dynamic = 'force-dynamic'

/**
 * Veckosammanfattning — anropas av valfri cron-tjänst (t.ex. cron-job.org)
 *
 * Säkrat via CRON_SECRET header:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * Kör varje måndag kl 09:00, t.ex.:
 *   GET https://svalla.se/api/push/weekly-digest
 *   Authorization: Bearer <din secret>
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse }  from 'next/server'
import webpush           from 'web-push'

export async function GET(req: Request) {
  // ── Init (inside handler so env vars are available at runtime) ───────────
  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  // Service-role — kringgår Row Level Security för server-side cron
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // ── Auth: kräv CRON_SECRET i Authorization-header ──────────────────────
  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET saknas i env' }, { status: 500 })

  const authHeader = req.headers.get('authorization') ?? ''
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Obehörig' }, { status: 401 })
  }

  // ── Hämta alla användare med aktiva push-subscriptions ─────────────────
  const { data: subs, error: subErr } = await supabaseAdmin
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')

  if (subErr || !subs?.length) {
    return NextResponse.json({ ok: true, sent: 0, msg: 'Inga aktiva subscriptions' })
  }

  // Grupera subscriptions per user
  const byUser = new Map<string, typeof subs>()
  for (const s of subs) {
    if (!byUser.has(s.user_id)) byUser.set(s.user_id, [])
    byUser.get(s.user_id)!.push(s)
  }

  // ── Hämta trip-statistik för senaste 7 dagarna ─────────────────────────
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const { data: recentTrips } = await supabaseAdmin
    .from('trips')
    .select('user_id, distance, duration, max_speed_knots')
    .gte('created_at', since)

  // Summera per användare
  const statsByUser = new Map<string, { trips: number; nm: number; maxSpd: number }>()
  for (const t of (recentTrips ?? [])) {
    if (!t.user_id) continue
    const s = statsByUser.get(t.user_id) ?? { trips: 0, nm: 0, maxSpd: 0 }
    s.trips += 1
    s.nm    += t.distance ?? 0
    s.maxSpd = Math.max(s.maxSpd, t.max_speed_knots ?? 0)
    statsByUser.set(t.user_id, s)
  }

  // ── Skicka push till varje användare ────────────────────────────────────
  let totalSent = 0
  const staleEndpoints: string[] = []

  for (const [userId, userSubs] of byUser) {
    const stats = statsByUser.get(userId)

    const { title, body } = buildMessage(stats)

    const payload = JSON.stringify({
      title,
      body,
      url: '/profil',
    })

    const results = await Promise.allSettled(
      userSubs.map(sub =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        )
      )
    )

    totalSent += results.filter(r => r.status === 'fulfilled').length

    // Samla stale subscriptions
    userSubs.forEach((sub, i) => {
      const r = results[i]!
      if (r.status === 'rejected' && ((r as PromiseRejectedResult).reason as { statusCode?: number }).statusCode === 410) {
        staleEndpoints.push(sub.endpoint)
      }
    })
  }

  // ── Rensa stale subscriptions ────────────────────────────────────────────
  if (staleEndpoints.length > 0) {
    await supabaseAdmin
      .from('push_subscriptions')
      .delete()
      .in('endpoint', staleEndpoints)
  }

  return NextResponse.json({
    ok: true,
    sent: totalSent,
    users: byUser.size,
    staleRemoved: staleEndpoints.length,
  })
}

function buildMessage(
  stats: { trips: number; nm: number; maxSpd: number } | undefined
): { title: string; body: string } {
  if (!stats || stats.trips === 0) {
    return {
      title: 'Dags att segla? ⛵',
      body: 'Du har inte loggat någon tur den här veckan. Vädret kanske passar i helgen!',
    }
  }

  const nm   = stats.nm.toFixed(1)
  const spd  = stats.maxSpd >= 0.1 ? ` · ${stats.maxSpd.toFixed(1)} kn toppfart` : ''
  const body = stats.trips === 1
    ? `${nm} NM loggat den här veckan${spd}. Kolla din statistik!`
    : `${stats.trips} turer · ${nm} NM${spd}. Bra vecka på vattnet!`

  return {
    title: stats.trips === 1 ? 'Veckans tur ⚓' : `${stats.trips} turer den här veckan ⚓`,
    body,
  }
}
