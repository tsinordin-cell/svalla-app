import webpush from 'web-push'
import { createClient } from '@supabase/supabase-js'

type SubRow = { endpoint: string; p256dh: string; auth: string }

export interface PushPayload {
  title: string
  body:  string
  url:   string
}

function svcClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * Sends a web push notification to all devices registered by the given users.
 * Uses the service role key to bypass RLS on push_subscriptions.
 * Errors are swallowed — push is best-effort and must never block the caller.
 */
export async function sendPushToUsers(
  userIds: string[],
  payload: PushPayload,
): Promise<void> {
  if (userIds.length === 0) return

  try {
    webpush.setVapidDetails(
      'mailto:info@svalla.se',
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      process.env.VAPID_PRIVATE_KEY!,
    )

    const svc = svcClient()

    const { data: subsRaw } = await svc
      .from('push_subscriptions')
      .select('endpoint, p256dh, auth')
      .in('user_id', userIds)

    const subs = (subsRaw ?? []) as SubRow[]
    if (subs.length === 0) return

    const jsonPayload = JSON.stringify(payload)

    const results = await Promise.allSettled(
      subs.map(sub =>
        webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          jsonPayload,
        )
      )
    )

    // Remove expired subscriptions (410 Gone / 404)
    const stale = subs.filter((_, i) => {
      const r = results[i]!
      if (r.status !== 'rejected') return false
      const code = ((r as PromiseRejectedResult).reason as { statusCode?: number }).statusCode
      return code === 410 || code === 404
    })
    if (stale.length > 0) {
      await svc
        .from('push_subscriptions')
        .delete()
        .in('endpoint', stale.map(s => s.endpoint))
    }
  } catch (err) {
    console.error('[push-server] sendPushToUsers failed:', err)
  }
}
