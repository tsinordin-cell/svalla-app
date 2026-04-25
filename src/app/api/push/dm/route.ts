export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import webpush from 'web-push'

const THROTTLE_SECONDS = 8
const PRESENCE_ACTIVE_WINDOW_MS = 30_000

type Kind = 'message' | 'request' | 'accept'

type PushLogRow = { target_user_id: string; last_sent_at: string }
type PresenceRow = { user_id: string; current_chat_id: string | null; updated_at: string }
type SubRow = { user_id: string; endpoint: string; p256dh: string; auth: string }

export async function POST(req: Request) {
  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const cookieStore = await cookies()
  const userClient = createServerClient(
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
  const { data: { user } } = await userClient.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const payloadIn = await req.json().catch(() => ({})) as {
    conversationId?: string
    preview?: string
    kind?: Kind
  }
  const conversationId = typeof payloadIn.conversationId === 'string' ? payloadIn.conversationId : ''
  const preview = typeof payloadIn.preview === 'string' ? payloadIn.preview : ''
  const kind: Kind = payloadIn.kind === 'request' || payloadIn.kind === 'accept' ? payloadIn.kind : 'message'

  if (!conversationId || !preview.trim()) {
    return NextResponse.json({ error: 'conversationId och preview krävs' }, { status: 400 })
  }

  // Service role krävs för att läsa/uppdatera privata tabeller (presence, push_log) oberoende av callerns RLS.
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }
  const svc = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  // 1. Verifiera medlemskap (hindra missbruk)
  const { data: myPart } = await svc
    .from('conversation_participants')
    .select('conversation_id')
    .eq('conversation_id', conversationId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!myPart) return NextResponse.json({ error: 'Ej medlem' }, { status: 403 })

  // 2. Avsändarens namn
  const { data: senderRow } = await svc
    .from('users').select('username').eq('id', user.id).maybeSingle()
  const senderName = (senderRow?.username as string | undefined) ?? 'Svalla'

  // 3. Övriga deltagare (ej muted, ej jag själv)
  const { data: others } = await svc
    .from('conversation_participants')
    .select('user_id, muted')
    .eq('conversation_id', conversationId)
    .neq('user_id', user.id)

  const targets = (others ?? [])
    .filter((o: { muted: boolean | null }) => !o.muted)
    .map((o: { user_id: string }) => o.user_id)
  if (targets.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'none_or_muted' })
  }

  // 4. Filtrera bort de som är aktiva i just denna chatt
  const { data: presences } = await svc
    .from('user_presence')
    .select('user_id, current_chat_id, updated_at')
    .in('user_id', targets)

  const now = Date.now()
  const activeInThisChat = new Set<string>(
    ((presences ?? []) as PresenceRow[])
      .filter(p =>
        p.current_chat_id === conversationId &&
        now - new Date(p.updated_at).getTime() < PRESENCE_ACTIVE_WINDOW_MS,
      )
      .map(p => p.user_id),
  )
  let candidates = targets.filter((t: string) => !activeInThisChat.has(t))
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'all_active' })
  }

  // 5. Throttle per (target, conv) — undvik att 10 snabba meddelanden ger 10 pushar
  const { data: logs } = await svc
    .from('push_log')
    .select('target_user_id, last_sent_at')
    .in('target_user_id', candidates)
    .eq('conversation_id', conversationId)
  const recentSet = new Set<string>(
    ((logs ?? []) as PushLogRow[])
      .filter(l => now - new Date(l.last_sent_at).getTime() < THROTTLE_SECONDS * 1000)
      .map(l => l.target_user_id),
  )
  candidates = candidates.filter((c: string) => !recentSet.has(c))
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'throttled' })
  }

  // 6. Hämta subscriptions för kvarvarande targets
  const { data: subsRaw } = await svc
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')
    .in('user_id', candidates)
  const subs = (subsRaw ?? []) as SubRow[]
  if (subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'no_subs' })
  }

  // 7. Bygg titel per kind. Preview trimmas.
  const title =
    kind === 'request' ? `${senderName} vill skriva till dig` :
    kind === 'accept'  ? `${senderName} accepterade din förfrågan` :
    senderName
  const url = `/meddelanden/${conversationId}`
  const bodyText = preview.trim().slice(0, 120)

  const payload = JSON.stringify({ title, body: bodyText, url })

  const results = await Promise.allSettled(
    subs.map(sub =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
      )
    )
  )

  const sent = results.filter(r => r.status === 'fulfilled').length

  // Cleanup döda subs
  const stale = subs.filter((_, i) => {
    const r = results[i]
    if (r.status !== 'rejected') return false
    const code = (r.reason as { statusCode?: number }).statusCode
    return code === 410 || code === 404
  })
  if (stale.length > 0) {
    await svc.from('push_subscriptions').delete().in('endpoint', stale.map(s => s.endpoint))
  }

  // Uppdatera push_log per target (dedupliceras eftersom en user kan ha flera subs)
  const uniqueTargets = [...new Set(subs.map(s => s.user_id))]
  if (uniqueTargets.length > 0) {
    const nowIso = new Date().toISOString()
    await svc.from('push_log').upsert(
      uniqueTargets.map(u => ({
        target_user_id: u,
        conversation_id: conversationId,
        last_sent_at: nowIso,
      })),
      { onConflict: 'target_user_id,conversation_id' },
    )
  }

  return NextResponse.json({ ok: true, sent })
}
