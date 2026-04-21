export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import webpush from 'web-push'

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

  const { targetUserId, title, body, url } = await req.json()

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

  // Authorize: only can send to yourself or be an admin
  // For now, enforce that only the target user can trigger sends to themselves
  if (user.id !== targetUserId) {
    return NextResponse.json({ error: 'Du kan bara skicka notifieringar till dig själv' }, { status: 403 })
  }

  // Hämta alla subscriptions för target-användaren
  const { data: subs } = await supabase
    .from('push_subscriptions')
    .select('endpoint, p256dh, auth')
    .eq('user_id', targetUserId)

  if (!subs || subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0 })
  }

  const payload = JSON.stringify({ title, body, url })

  const results = await Promise.allSettled(
    subs.map(sub =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
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
  }

  return NextResponse.json({ ok: true, sent })
}
