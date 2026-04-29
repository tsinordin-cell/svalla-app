export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createReport, REASON_LABELS, TARGET_TYPE_LABELS } from '@/lib/moderation'
import type { ReportReason, ReportTargetType } from '@/lib/moderation'
import { checkRateLimit } from '@/lib/rateLimit'
import { sendAdminEmail } from '@/lib/email'

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

  // Rate limit: max 10 anmälningar per dygn per användare. Hindrar
  // grief-anmälningar mot specifika användare och spam-flöden mot moderatorerna.
  if (!(await checkRateLimit(`report:${user.id}`, 10, 24 * 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många anmälningar idag. Försök imorgon.' }, { status: 429 })
  }

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

  // Skicka admin-notis (fire-and-forget)
  const targetLabel = TARGET_TYPE_LABELS[targetType as ReportTargetType] ?? targetType
  const reasonLabel = REASON_LABELS[reason as ReportReason] ?? reason
  sendAdminEmail({
    subject: `🚨 Ny anmälan på Svalla — ${reasonLabel}`,
    html: `
      <h2 style="margin:0 0 16px;font-family:sans-serif">Ny anmälan</h2>
      <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:4px 12px 4px 0;color:#666">Typ:</td><td><strong>${targetLabel}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#666">Anledning:</td><td><strong>${reasonLabel}</strong></td></tr>
        ${note ? `<tr><td style="padding:4px 12px 4px 0;color:#666">Notering:</td><td>${note}</td></tr>` : ''}
        <tr><td style="padding:4px 12px 4px 0;color:#666">Rapport-ID:</td><td><code>${result}</code></td></tr>
      </table>
      <p style="margin-top:20px">
        <a href="https://svalla.se/admin/moderation" style="display:inline-block;background:#0a4a5e;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-family:sans-serif;font-size:14px">
          Öppna moderationskön →
        </a>
      </p>
    `,
  }).catch(() => {}) // Tyst fel — påverkar inte svaret till användaren

  return NextResponse.json({ ok: true, id: result })
}
