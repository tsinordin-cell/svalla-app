export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import webpush from 'web-push'

/**
 * Push vid nytt direktmeddelande.
 *
 * SÄKERHET (2026-11-25): tidigare skickade webbläsaren själv texten som
 * hamnade i pushen, och servern kontrollerade bara att anroparen var
 * deltagare. Det gick alltså att skicka valfri text till andras telefoner,
 * även efter blockering och i avvisade konversationer. Nu skickar klienten
 * bara meddelandets id (eller konversationens id vid "accept"), och servern
 * hämtar själv innehållet och kontrollerar:
 *   - att anroparen skrev meddelandet, för högst 60 sekunder sedan
 *   - att konversationen inte är avvisad
 *   - att ingen mottagare har blockerat avsändaren eller tvärtom
 *   - att en förfrågan bara ger EN push (det första meddelandet)
 * plus en hastighetsgräns per avsändare.
 */

const THROTTLE_SECONDS = 8
const PRESENCE_ACTIVE_WINDOW_MS = 30_000
const MAX_ALDER_MS = 60_000
const RATE_MAX = 30
const RATE_FONSTER_MS = 60_000

type PushLogRow = { target_user_id: string; last_sent_at: string }
type PresenceRow = { user_id: string; current_chat_id: string | null; updated_at: string }
type SubRow = { user_id: string; endpoint: string; p256dh: string; auth: string }
type MsgRow = {
  id: string; conversation_id: string; user_id: string; content: string | null
  attachment_type: string | null; created_at: string
}
type ConvRow = { id: string; status: string | null; created_by: string | null; is_group: boolean | null }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function bilagaText(typ: string | null): string {
  if (typ === 'image') return 'Bild'
  if (typ === 'geo') return 'Position'
  if (typ === 'trip') return 'Tur'
  if (typ === 'audio') return 'Röstmeddelande'
  return 'Nytt meddelande'
}

export async function POST(req: Request) {
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

  if (!(await checkRateLimit(`push-dm:${user.id}`, RATE_MAX, RATE_FONSTER_MS))) {
    return NextResponse.json({ error: 'För många anrop' }, { status: 429 })
  }

  const payloadIn = await req.json().catch(() => ({})) as {
    messageId?: unknown
    conversationId?: unknown
    kind?: unknown
  }
  const arAccept = payloadIn.kind === 'accept'
  const messageId = typeof payloadIn.messageId === 'string' && UUID_RE.test(payloadIn.messageId) ? payloadIn.messageId : ''
  const acceptConvId = typeof payloadIn.conversationId === 'string' && UUID_RE.test(payloadIn.conversationId) ? payloadIn.conversationId : ''
  if (arAccept ? !acceptConvId : !messageId) {
    return NextResponse.json({ error: arAccept ? 'conversationId krävs' : 'messageId krävs' }, { status: 400 })
  }

  const svc = getAdminClient()

  // 1. Hämta underlaget från databasen — aldrig från klienten.
  let conversationId: string
  let kind: 'message' | 'request' | 'accept'
  let bodyText: string
  let meddelandeTid = 0

  if (arAccept) {
    const { data: c } = await svc
      .from('conversations').select('id, status, created_by, is_group').eq('id', acceptConvId).maybeSingle()
    const conv = c as ConvRow | null
    // Bara mottagaren av en förfrågan kan acceptera, och då är status redan 'active'.
    if (!conv || conv.is_group || conv.status !== 'active' || !conv.created_by || conv.created_by === user.id) {
      return NextResponse.json({ ok: true, sent: 0, skipped: 'not_allowed' })
    }
    // En accept-push per samtal och dygn, så att den inte kan upprepas.
    if (!(await checkRateLimit(`push-dm-accept:${conv.id}`, 1, 24 * 60 * 60 * 1000))) {
      return NextResponse.json({ ok: true, sent: 0, skipped: 'accept_already_pushed' })
    }
    conversationId = conv.id
    kind = 'accept'
    bodyText = 'Ni kan nu skriva till varandra'
  } else {
    const { data: m } = await svc
      .from('messages')
      .select('id, conversation_id, user_id, content, attachment_type, created_at')
      .eq('id', messageId)
      .maybeSingle()
    const msg = m as MsgRow | null
    if (!msg || msg.user_id !== user.id) {
      return NextResponse.json({ error: 'Meddelandet finns inte' }, { status: 404 })
    }
    const alder = Date.now() - new Date(msg.created_at).getTime()
    // Negativ ålder = framtidsdaterat (databasen sätter tiden efter
    // migrationen, men den här kontrollen gäller även före).
    if (alder > MAX_ALDER_MS || alder < -5_000) {
      return NextResponse.json({ ok: true, sent: 0, skipped: 'too_old' })
    }
    meddelandeTid = new Date(msg.created_at).getTime()
    const { data: c } = await svc
      .from('conversations').select('id, status, created_by, is_group').eq('id', msg.conversation_id).maybeSingle()
    const conv = c as ConvRow | null
    if (!conv || conv.status === 'declined') {
      return NextResponse.json({ ok: true, sent: 0, skipped: 'declined' })
    }
    conversationId = conv.id
    if (conv.status === 'request') {
      // En förfrågan ger bara en push: det första meddelandet.
      const { count } = await svc
        .from('messages').select('id', { count: 'exact', head: true })
        .eq('conversation_id', conv.id)
      if ((count ?? 0) > 1) return NextResponse.json({ ok: true, sent: 0, skipped: 'request_already_pushed' })
      kind = 'request'
    } else {
      kind = 'message'
    }
    bodyText = (msg.content ?? '').trim().slice(0, 120) || bilagaText(msg.attachment_type)
  }

  // 2. Anroparen måste vara deltagare.
  const { data: myPart } = await svc
    .from('conversation_participants')
    .select('conversation_id')
    .eq('conversation_id', conversationId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!myPart) return NextResponse.json({ error: 'Ej medlem' }, { status: 403 })

  // 3. Avsändarens namn
  const { data: senderRow } = await svc
    .from('users').select('username').eq('id', user.id).maybeSingle()
  const senderName = (senderRow?.username as string | undefined) ?? 'Svalla'

  // 4. Övriga deltagare (ej muted, ej jag själv)
  const { data: others } = await svc
    .from('conversation_participants')
    .select('user_id, muted')
    .eq('conversation_id', conversationId)
    .neq('user_id', user.id)

  let candidates = (others ?? [])
    .filter((o: { muted: boolean | null }) => !o.muted)
    .map((o: { user_id: string }) => o.user_id)
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'none_or_muted' })
  }

  // 5. Blockering åt något håll → ingen push till den mottagaren.
  const { data: blocks } = await svc
    .from('user_blocks')
    .select('blocker_id, blocked_id')
    .or(`blocker_id.eq.${user.id},blocked_id.eq.${user.id}`)
  const blockerade = new Set<string>()
  for (const b of (blocks ?? []) as { blocker_id: string; blocked_id: string }[]) {
    blockerade.add(b.blocker_id === user.id ? b.blocked_id : b.blocker_id)
  }
  candidates = candidates.filter(c => !blockerade.has(c))
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'blocked' })
  }

  // 6. Filtrera bort de som är aktiva i just denna chatt
  const { data: presences } = await svc
    .from('user_presence')
    .select('user_id, current_chat_id, updated_at')
    .in('user_id', candidates)

  const now = Date.now()
  const activeInThisChat = new Set<string>(
    ((presences ?? []) as PresenceRow[])
      .filter(p =>
        p.current_chat_id === conversationId &&
        now - new Date(p.updated_at).getTime() < PRESENCE_ACTIVE_WINDOW_MS,
      )
      .map(p => p.user_id),
  )
  candidates = candidates.filter(t => !activeInThisChat.has(t))
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'all_active' })
  }

  // 7. Throttle per (target, conv) — undvik att 10 snabba meddelanden ger 10 pushar
  const { data: logs } = await svc
    .from('push_log')
    .select('target_user_id, last_sent_at')
    .in('target_user_id', candidates)
    .eq('conversation_id', conversationId)
  const recentSet = new Set<string>(
    ((logs ?? []) as PushLogRow[])
      // Strypning, och samma meddelande pushas aldrig två gånger: har vi
      // redan skickat efter att meddelandet skrevs hoppas mottagaren över.
      .filter(l => {
        const t = new Date(l.last_sent_at).getTime()
        return now - t < THROTTLE_SECONDS * 1000 || (meddelandeTid > 0 && t >= meddelandeTid)
      })
      .map(l => l.target_user_id),
  )
  candidates = candidates.filter(c => !recentSet.has(c))
  if (candidates.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'throttled' })
  }

  // 8. Hämta subscriptions för kvarvarande targets
  const { data: subsRaw } = await svc
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')
    .in('user_id', candidates)
  const subs = (subsRaw ?? []) as SubRow[]
  if (subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, skipped: 'no_subs' })
  }

  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const title =
    kind === 'request' ? `${senderName} vill skriva till dig` :
    kind === 'accept'  ? `${senderName} accepterade din förfrågan` :
    senderName
  const url = `/meddelanden/${conversationId}`
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
    const r = results[i]!
    if (r.status !== 'rejected') return false
    const code = ((r as PromiseRejectedResult).reason as { statusCode?: number }).statusCode
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
