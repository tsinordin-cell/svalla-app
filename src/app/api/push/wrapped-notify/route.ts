export const dynamic = 'force-dynamic'

/**
 * Wrapped-notis — skickar push till alla användare med ≥3 turer ett givet år.
 *
 * Säkrat via CRON_SECRET header:
 *   Authorization: Bearer <CRON_SECRET>
 *
 * Anrop:
 *   GET https://svalla.se/api/push/wrapped-notify?year=2025
 *   Authorization: Bearer <din secret>
 */

import { createClient } from '@supabase/supabase-js'
import { NextResponse }  from 'next/server'
import webpush           from 'web-push'

export async function GET(req: Request) {
  // ── Auth ────────────────────────────────────────────────────────────────
  const secret = process.env.CRON_SECRET
  if (!secret) return NextResponse.json({ error: 'CRON_SECRET saknas i env' }, { status: 500 })

  const authHeader = req.headers.get('authorization') ?? ''
  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Obehörig' }, { status: 401 })
  }

  // ── Year param (default: previous calendar year) ─────────────────────
  const url  = new URL(req.url)
  const year = parseInt(url.searchParams.get('year') ?? String(new Date().getFullYear() - 1), 10)
  if (isNaN(year) || year < 2020 || year > 2100) {
    return NextResponse.json({ error: 'Ogiltigt år' }, { status: 400 })
  }

  const yearStart = `${year}-01-01T00:00:00.000Z`
  const yearEnd   = `${year + 1}-01-01T00:00:00.000Z`

  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // ── Trips for the year ─────────────────────────────────────────────────
  const { data: trips, error: tripErr } = await supabaseAdmin
    .from('trips')
    .select('user_id, distance')
    .gte('started_at', yearStart)
    .lt('started_at', yearEnd)

  if (tripErr) {
    console.error('[wrapped-notify] trips query error:', tripErr)
    return NextResponse.json({ error: 'Databasfel' }, { status: 500 })
  }

  // Group trips per user, keep only those with ≥3
  const statsByUser = new Map<string, { count: number; nm: number }>()
  for (const t of (trips ?? [])) {
    if (!t.user_id) continue
    const s = statsByUser.get(t.user_id) ?? { count: 0, nm: 0 }
    s.count += 1
    s.nm    += t.distance ?? 0
    statsByUser.set(t.user_id, s)
  }

  const eligibleUsers = [...statsByUser.entries()].filter(([, s]) => s.count >= 3)
  if (eligibleUsers.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, msg: 'Inga användare med ≥3 turer' })
  }

  const eligibleIds = eligibleUsers.map(([uid]) => uid)

  // ── Usernames ──────────────────────────────────────────────────────────
  const { data: userRows } = await supabaseAdmin
    .from('users')
    .select('id, username')
    .in('id', eligibleIds)

  const usernameById = new Map<string, string>()
  for (const row of (userRows ?? [])) {
    if (row.id && row.username) usernameById.set(row.id, row.username)
  }

  // ── Push subscriptions for eligible users ─────────────────────────────
  const { data: subs, error: subErr } = await supabaseAdmin
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')
    .in('user_id', eligibleIds)

  if (subErr || !subs?.length) {
    return NextResponse.json({ ok: true, sent: 0, msg: 'Inga aktiva push-subscriptions' })
  }

  // Group subs per user
  const subsByUser = new Map<string, typeof subs>()
  for (const s of subs) {
    if (!subsByUser.has(s.user_id)) subsByUser.set(s.user_id, [])
    subsByUser.get(s.user_id)!.push(s)
  }

  // ── Send push ──────────────────────────────────────────────────────────
  let totalSent = 0
  const staleEndpoints: string[] = []

  for (const [userId, userSubs] of subsByUser) {
    const stats    = statsByUser.get(userId)!
    const username = usernameById.get(userId)
    if (!username) continue

    const nm      = stats.nm >= 10 ? `${Math.round(stats.nm)} nm` : `${stats.nm.toFixed(1)} nm`
    const payload = JSON.stringify({
      title: `Din säsong ${year} är redo ⚓`,
      body:  `${stats.count} turer · ${nm} — se din helårssummering`,
      url:   `/wrapped/${username}/${year}`,
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

    userSubs.forEach((sub, i) => {
      const r = results[i]!
      if (r.status === 'rejected') {
        const code = ((r as PromiseRejectedResult).reason as { statusCode?: number }).statusCode
        if (code === 410 || code === 404) staleEndpoints.push(sub.endpoint)
      }
    })
  }

  // ── Cleanup stale subscriptions ────────────────────────────────────────
  if (staleEndpoints.length > 0) {
    await supabaseAdmin
      .from('push_subscriptions')
      .delete()
      .in('endpoint', staleEndpoints)
  }

  return NextResponse.json({
    ok:           true,
    year,
    eligible:     eligibleUsers.length,
    withPush:     subsByUser.size,
    sent:         totalSent,
    staleRemoved: staleEndpoints.length,
  })
}
