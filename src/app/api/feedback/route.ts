export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'
import { sendAdminEmail } from '@/lib/email'

/**
 * POST /api/feedback
 *
 * Tar emot allmän site-feedback (tips, felrapporter, saknad info) från
 * besökare — oavsett om de är inloggade eller ej. Sparas i `site_feedback`
 * och ett mail skickas till ADMIN_EMAIL via Resend.
 *
 * Skapa tabellen i Supabase:
 *   Se scripts/MIGRATION_2026_07_03_site_feedback.sql
 *
 * Fält:
 *   feedbackType  – 'fel-info' | 'saknar-info' | 'tips' | 'annat'
 *   message       – fritext (5–1000 tecken)
 *   pageUrl       – full URL varifrån feedbacken skickades
 */

const VALID_TYPES = new Set(['fel-info', 'saknar-info', 'tips', 'annat'])

const TYPE_LABELS: Record<string, string> = {
  'fel-info':    'Fel information',
  'saknar-info': 'Saknar info',
  'tips':        'Tips / förslag',
  'annat':       'Annat',
}

type FeedbackBody = {
  feedbackType?: unknown
  message?:      unknown
  pageUrl?:      unknown
}

export async function POST(req: NextRequest) {
  // ── Parsning ──────────────────────────────────────────────────────────────
  let body: FeedbackBody
  try {
    body = await req.json() as FeedbackBody
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const feedbackType = typeof body.feedbackType === 'string' && VALID_TYPES.has(body.feedbackType)
    ? body.feedbackType
    : null

  const message = typeof body.message === 'string'
    ? body.message.trim().slice(0, 1000)
    : null

  const pageUrl = typeof body.pageUrl === 'string'
    ? body.pageUrl.slice(0, 500)
    : null

  if (!feedbackType || !message || message.length < 5) {
    return NextResponse.json(
      { error: 'feedbackType och message (min 5 tecken) krävs' },
      { status: 400 },
    )
  }

  // ── Auth (frivillig — sparas om inloggad) ────────────────────────────────
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
    }
  )
  const { data: { user } } = await supabase.auth.getUser()

  // ── Rate limit: 10 per IP / timme ────────────────────────────────────────
  const { checkRateLimit } = await import('@/lib/rateLimit')
  const rateKey = user?.id ?? req.headers.get('x-forwarded-for') ?? 'anon'
  if (!(await checkRateLimit(`site-feedback:${rateKey}`, 10, 60 * 60 * 1000))) {
    return NextResponse.json(
      { error: 'För många tips. Vänta lite och försök igen.' },
      { status: 429 },
    )
  }

  // ── Spara i Supabase ──────────────────────────────────────────────────────
  const { error: dbError } = await supabase.from('site_feedback').insert({
    feedback_type: feedbackType,
    message,
    page_url:      pageUrl,
    user_id:       user?.id ?? null,
  })

  if (dbError) {
    logger.error('api/feedback', 'insert failed', { error: dbError.message })
    return NextResponse.json({ error: 'Kunde inte spara feedbacken' }, { status: 500 })
  }

  // ── Skicka admin-mail ─────────────────────────────────────────────────────
  const typeLabel = TYPE_LABELS[feedbackType] ?? feedbackType
  const pageDisplay = pageUrl ?? '(okänd sida)'
  const fromUser = user
    ? `Inloggad (${user.email ?? user.id})`
    : 'Anonym besökare'

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#162d3a">
      <div style="background:linear-gradient(135deg,#0d3a5c,#0a7b8c);border-radius:12px 12px 0 0;padding:20px 24px">
        <h2 style="margin:0;color:#fff;font-size:18px">💬 Ny feedback på Svalla</h2>
      </div>
      <div style="border:1px solid #e2eaf0;border-top:none;border-radius:0 0 12px 12px;padding:24px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5;color:#6a8a96;width:130px;vertical-align:top">Typ</td>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5;font-weight:700;color:#1e5c82">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5;color:#6a8a96;vertical-align:top">Sida</td>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5;word-break:break-all">
              <a href="${pageUrl ?? '#'}" style="color:#0a7b8c;text-decoration:none">${pageDisplay}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5;color:#6a8a96;vertical-align:top">Från</td>
            <td style="padding:10px 0;border-bottom:1px solid #eef2f5">${fromUser}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#6a8a96;vertical-align:top">Meddelande</td>
            <td style="padding:10px 0">
              <div style="background:#f4f9fb;border-radius:8px;padding:14px;font-size:15px;line-height:1.6;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </td>
          </tr>
        </table>
        <div style="margin-top:20px">
          <a href="https://svalla.se/admin/site-feedback" style="display:inline-block;background:#1e5c82;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:700">
            Visa i admin →
          </a>
        </div>
      </div>
    </div>
  `

  const mailResult = await sendAdminEmail({
    subject: `[Svalla] ${typeLabel}: ${message.slice(0, 60)}${message.length > 60 ? '…' : ''}`,
    html,
  })

  if (!mailResult.ok) {
    // Mailet misslyckades — logga men returnera ändå ok (data är sparad i DB)
    logger.error('api/feedback', 'email failed', { error: mailResult.error })
  }

  logger.info('api/feedback', 'submitted', { feedbackType, hasUser: !!user, pageUrl })
  return NextResponse.json({ ok: true })
}
