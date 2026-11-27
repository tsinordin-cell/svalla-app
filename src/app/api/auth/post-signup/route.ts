export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { sendEmail } from '@/lib/email'
import { logger } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rateLimit'
import { getAdminClient } from '@/lib/supabase-admin'
import { skickaPrenumerationsmejl } from '@/lib/prenumerationUtskick'

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

  // Verifiera "nyligen skapad" — 5 minuter tillbaks från nu. Sedan e-post-
  // bekräftelsen slogs på (2026-11-21) går välkomstmejlet när adressen
  // bekräftas, vilket kan vara långt efter att kontot skapades: då räknas
  // tiden från bekräftelsen.
  const nyligen = (iso: string | null | undefined) =>
    !!iso && (Date.now() - new Date(iso).getTime()) / 60_000 <= 5
  if (!nyligen(user.created_at) && !nyligen(user.email_confirmed_at)) {
    return NextResponse.json({ error: 'Konto är inte nyskapat' }, { status: 403 })
  }

  // Kryssade användaren i nyhetsbrevet vid registreringen sparades adressen
  // obekräftad (/api/subscribe, source 'registrering'). Nu är kontots adress
  // bekräftad, alltså är nyhetsbrevets också det (dubbel bekräftelse
  // 2026-11-22). Bara en rad som skapades i samband med kontot (inom 10 min),
  // så att en anmälan som någon annan gjort tidigare inte räknas.
  if (user.email && user.email_confirmed_at && user.created_at) {
    try {
      const skapad = new Date(user.created_at).getTime()
      const service = getAdminClient()
      const { data: rader } = await service
        .from('email_subscribers')
        .update({ confirmed: true, confirmed_at: new Date().toISOString(), user_id: user.id })
        .eq('email', user.email.toLowerCase())
        .eq('source', 'registrering')
        .eq('confirmed', false)
        .eq('unsubscribed', false)
        .gte('created_at', new Date(skapad - 10 * 60_000).toISOString())
        .lte('created_at', new Date(skapad + 10 * 60_000).toISOString())
        .select('id')
      if (rader && rader.length > 0) await skickaPrenumerationsmejl(service, user.email.toLowerCase(), 'newsletter_welcome')
    } catch (e) {
      logger.error('post-signup', 'nyhetsbrevet kunde inte bekräftas', { e: String(e) })
    }
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
