export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

const VALID_TYPES = ['like', 'comment', 'follow', 'tag', 'mention', 'forum_reply', 'forum_like']
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function svcClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY not set')
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

/**
 * POST /api/notifications/insert
 * Inserts a notification for another user using the service role key (bypasses RLS).
 * The caller must be authenticated — actor_id is always set to auth.uid().
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

  const { targetUserId, type, tripId, referenceId } = payload as Record<string, unknown>

  if (!targetUserId || typeof targetUserId !== 'string' || !UUID_RE.test(targetUserId)) {
    return NextResponse.json({ error: 'Ogiltigt targetUserId' }, { status: 400 })
  }
  if (!type || typeof type !== 'string' || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: 'Ogiltig type' }, { status: 400 })
  }
  // Don't notify yourself
  if (targetUserId === user.id) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  const row: Record<string, string> = {
    user_id:  targetUserId,
    actor_id: user.id,
    type,
  }
  if (tripId && typeof tripId === 'string' && UUID_RE.test(tripId)) row.trip_id = tripId
  if (referenceId && typeof referenceId === 'string' && UUID_RE.test(referenceId)) row.reference_id = referenceId

  const { error } = await svcClient().from('notifications').insert(row)
  if (error) {
    console.error('[notifications/insert] DB error:', error)
    return NextResponse.json({ error: 'Kunde inte skapa notis.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
