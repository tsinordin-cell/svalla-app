export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { getAdminClient } from '@/lib/supabase-admin'
import { cookies } from 'next/headers'
import { NextResponse, after } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { sendPushToUsers } from '@/lib/push-server'
import { arKlientTyp, bedomNotis, notisDb } from '@/lib/notisRegler'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/**
 * POST /api/notifications/insert — { targetUserId, type, tripId?, conversationId? }
 *
 * Den ENDA vägen för webbläsaren att skapa notiser (notifications har ingen
 * insert-policy sedan 2026-10). actor_id är alltid den inloggade.
 *
 * Varje typ kräver att händelsen finns i databasen (gillningen, kommentaren,
 * följningen, taggningen, meddelandet, accepterade förfrågan) och samma notis
 * skapas inte två gånger i rad – se src/lib/notisRegler.ts. Pushen till
 * mottagaren byggs här av servern; klienten väljer inte text eller länk.
 *
 * Forumnotiser, sparade annonser och ö-besök skapas av sina egna routes på
 * servern och tas inte emot här.
 */
export async function POST(req: Request) {
  const cookieStore = await cookies()
  const userSupabase = createServerClient(
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

  const { data: { user } } = await userSupabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Rate limit: 60 notifications per minute per user
  if (!(await checkRateLimit(`notif-insert:${user.id}`, 60, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar.' }, { status: 429 })
  }

  let payload: Record<string, unknown>
  try { payload = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const { targetUserId, type, tripId, conversationId } = payload as Record<string, unknown>

  if (typeof targetUserId !== 'string' || !UUID_RE.test(targetUserId)) {
    return NextResponse.json({ error: 'Ogiltigt targetUserId' }, { status: 400 })
  }
  if (!arKlientTyp(type)) {
    return NextResponse.json({ error: 'Ogiltig type' }, { status: 400 })
  }
  // Don't notify yourself
  if (targetUserId === user.id) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const admin = getAdminClient()
  const bedomning = await bedomNotis(notisDb(admin), { actorId: user.id, targetId: targetUserId, type, tripId, conversationId })

  if (bedomning.ok === false) {
    return NextResponse.json({ error: bedomning.fel }, { status: bedomning.status })
  }
  if (bedomning.ok === 'hoppa') {
    return NextResponse.json({ ok: true, skipped: bedomning.skal })
  }

  const { error } = await admin.from('notifications').insert(bedomning.rad)
  if (error?.code === '23505') {
    // Unikt index: samma händelse har redan gett en notis (samtidiga anrop).
    return NextResponse.json({ ok: true, skipped: 'dubblett' })
  }
  if (error) {
    console.error('[notifications/insert] DB error:', error)
    return NextResponse.json({ error: 'Kunde inte skapa notis.' }, { status: 500 })
  }

  // Pushen skickas efter svaret, så att klienten inte väntar på telefonernas pushtjänster.
  const push = bedomning.push
  if (push) after(() => sendPushToUsers([targetUserId], push))

  return NextResponse.json({ ok: true })
}
