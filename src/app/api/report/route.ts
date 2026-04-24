export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createReport } from '@/lib/moderation'
import type { ReportReason, ReportTargetType } from '@/lib/moderation'

const VALID_TARGET_TYPES: ReportTargetType[] = [
  'trip', 'comment', 'user', 'message', 'review', 'story', 'checkin',
]
const VALID_REASONS: ReportReason[] = [
  'spam', 'harassment', 'inappropriate', 'misinformation', 'underage', 'other',
]

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const { targetType, targetId, reason, note } = body as {
    targetType?: string
    targetId?: string
    reason?: string
    note?: string
  }

  if (!targetType || !VALID_TARGET_TYPES.includes(targetType as ReportTargetType)) {
    return NextResponse.json({ error: 'Ogiltig måltyp' }, { status: 400 })
  }
  if (!targetId || typeof targetId !== 'string') {
    return NextResponse.json({ error: 'targetId saknas' }, { status: 400 })
  }
  if (!reason || !VALID_REASONS.includes(reason as ReportReason)) {
    return NextResponse.json({ error: 'Ogiltig anledning' }, { status: 400 })
  }
  if (note && typeof note === 'string' && note.length > 500) {
    return NextResponse.json({ error: 'Notering för lång (max 500 tecken)' }, { status: 400 })
  }

  // Hindra användare från att anmäla sig själva (för user-target)
  if (targetType === 'user' && targetId === user.id) {
    return NextResponse.json({ error: 'Du kan inte anmäla dig själv' }, { status: 400 })
  }

  const result = await createReport(supabase, user.id, {
    targetType: targetType as ReportTargetType,
    targetId,
    reason: reason as ReportReason,
    note: typeof note === 'string' ? note : undefined,
  })

  if (result === 'already_reported') {
    return NextResponse.json({ ok: true, already: true })
  }
  if (!result) {
    return NextResponse.json({ error: 'Kunde inte spara anmälan' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: result })
}
