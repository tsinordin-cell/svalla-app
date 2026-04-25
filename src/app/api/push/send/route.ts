export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import webpush from 'web-push'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

export async function POST(req: Request) {
  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Rate limit: max 30 push-notiser per användare per minut (like/comment/follow-storms)
  if (!checkRateLimit(`push-send:${user.id}`, 30, 60_000)) {
    return NextResponse.json({ error: 'För många notifieringar. Vänta en stund.' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try { payload = await req.json() } catch { return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 }) }
  const { targetUserId, title, body, url } = payload as Record<string, unknown>

  // Validera obligatoriska fält
  if (!targetUserId || typeof targetUserId !== 'string') {
    return NextResponse.json({ error: 'targetUserId krävs' }, { status: 400 })
  }
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return NextResponse.json({ error: 'title krävs' }, { status: 400 })
  }
  if (!body || typeof body !== 'string' || body.trim().length === 0) {
    return NextResponse.json({ error: 'body krävs' }, { status: 400 })
  }
  // Sanitize lengths
  const safeTitle = title.trim().slice(0, 100)
  const safeBody  = (body as string).trim().slice(0, 200)
  const safeUrl   = typeof url === 'string' && url.startsWith('/') ? url.slice(0, 200) : '/feed'

  // Inloggad användare får bara skicka push till sig själv ELLER till andra
  // om det är en social interaktion (like, comment, follow) — avsändaren är
  // den inloggade, mottagaren är targetUserId. Båda är legitima anrop.

  // Hämta alla subscriptions för target-användaren
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', targetUserId)

  if (!subs || subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 })
  }

  const jsonPayload = JSON.stringify({ title: safeTitle, body: safeBody, url: safeUrl })

  const results = await Promise.allSettled(
    subs.map(sub =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        jsonPayload,
      )
    )
  )

  const sent = results.filter(r => r.status === 'fulfilled').length

  // Ta bort subscriptions som returnerat 410 Gone (inaktuella)
  const stale = subs.filter((_, i) => {
    const r = results[i]
    return r.status === 'rejected' && (r.reason as { statusCode?: number }).statusCode === 410
  })
  if (stale.length > 0) {
    await supabase
      .from('push_subscriptions')
      .delete()
      .in('endpoint', stale.map(s => s.endpoint))
    logger.info('push', 'Rensade inaktuella subscriptions', { stale: stale.length })
  }

  logger.info('push', 'Push skickad', { targetUserId, sent, total: subs.length })
  return NextResponse.json({ ok: true, sent })
}
