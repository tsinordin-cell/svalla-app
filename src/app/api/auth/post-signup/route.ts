export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email'
import { logger } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rateLimit'

/**
 * POST /api/auth/post-signup
 *
 * Triggas från klienten direkt efter `supabase.auth.signUp()` lyckats.
 * Skickar välkomstmail via Resend.
 *
 * Säkerhet:
 *  - Kräver inloggad session (cookies)
 *  - Verifierar att `user.created_at` är inom senaste 5 minuter — annars 403
 *    (förhindrar att äldre konton triggar mailen igen)
 *  - Rate-limit: 1 mail per user per 24h (idempotent)
 *  - Loggar till `email_log` så vi kan se vem som fått vad
 */
export async function POST(_req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })
  }

  // Verifiera "nyligen skapad" — 5 minuter tillbaks från nu
  const createdAt = new Date(user.created_at).getTime()
  const ageMin = (Date.now() - createdAt) / 60_000
  if (ageMin > 5) {
    return NextResponse.json({ error: 'Konto är inte nyskapat' }, { status: 403 })
  }

  // Rate-limit: max 1 anrop per user per dygn (idempotent)
  if (!(await checkRateLimit(`welcome-mail:${user.id}`, 1, 24 * 60 * 60 * 1000))) {
    return NextResponse.json({ ok: true, alreadySent: true })
  }

  if (!user.email) {
    return NextResponse.json({ error: 'Användaren saknar e-post' }, { status: 400 })
  }

  // Hämta username från users-tabell (kan vara null direkt efter signup)
  const { data: profile } = await supabase
    .from('users')
    .select('username')
    .eq('id', user.id)
    .maybeSingle()

  const firstName = (profile?.username as string | undefined) ?? user.email.split('@')[0] ?? 'där'

  const result = await sendEmail({
    template: 'welcome',
    to: user.email,
    vars: { first_name: firstName },
  })

  if (!result.ok) {
    logger.error('post-signup', 'welcome send failed', { e: result.error, userId: user.id })
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  // Logga (best-effort)
  try {
    await supabase.from('email_log').insert({
      email: user.email,
      template: 'welcome',
      sent_at: new Date().toISOString(),
      resend_id: result.id,
    })
  } catch { /* tabell kan saknas, ignorera */ }

  logger.info('post-signup', 'welcome sent', { userId: user.id, email: user.email })
  return NextResponse.json({ ok: true, sent: true })
}
