/**
 * GET /api/email/unsubscribe?email=...
 *
 * Avregistrera en email-adress från transaktionsmail. Anropas via länk i
 * mail-footern. Visar HTML-bekräftelse direkt (ingen extra klick krävs —
 * one-click unsubscribe per RFC 8058 / Gmail/Yahoo 2024-krav).
 *
 * Säkerhet:
 *  - Email tas från query-param, ingen auth (mailmottagare har inte session)
 *  - Idempotent (upsert via on conflict do nothing)
 *  - Loggar IP + user-agent för audit (CAN-SPAM-krav)
 *  - sendEmail() kollar email_unsubscribes innan utskick → respekteras direkt
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { logger } from '@/lib/logger'

/** HTML-respons — minimal, mobil-vänlig bekräftelse-sida */
function htmlPage(opts: { title: string; heading: string; body: string }): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>${opts.title} · Svalla</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
       background:#eef3f6;color:#162d3a;min-height:100vh;
       display:flex;align-items:center;justify-content:center;padding:32px 16px}
  .card{background:#fff;border-radius:18px;padding:40px 36px;max-width:480px;width:100%;
        box-shadow:0 4px 24px rgba(0,45,60,0.08);text-align:center}
  .hero{background:linear-gradient(135deg,#1e5c82,#0a7b8c);margin:-40px -36px 32px;
        padding:24px 36px;border-radius:18px 18px 0 0;color:#fff;
        font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;
        letter-spacing:3px;text-align:left}
  h1{font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#0d2a3e;margin-bottom:14px}
  p{font-size:15px;line-height:1.6;color:#3d5865;margin-bottom:14px}
  a{display:inline-block;margin-top:18px;padding:12px 24px;border-radius:12px;
    background:#1e5c82;color:#fff;font-weight:700;text-decoration:none;font-size:14px}
  .meta{font-size:12px;color:#8aa4b0;margin-top:24px}
</style>
</head>
<body>
  <div class="card">
    <div class="hero">SVALLA</div>
    <h1>${opts.heading}</h1>
    ${opts.body}
    <a href="https://svalla.se">Tillbaka till Svalla</a>
  </div>
</body>
</html>`
}

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()

  // Validera — minimal email-check (full RFC 5322 är overkill här,
  // mottagaren har redan fått mail på adressen)
  if (!email || !email.includes('@') || email.length > 254) {
    return new NextResponse(
      htmlPage({
        title: 'Ogiltig länk',
        heading: 'Ogiltig länk',
        body: '<p>Avregistrerings-länken saknar email-adress. Klicka direkt från mailet du fick.</p>',
      }),
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? null
  const userAgent = req.headers.get('user-agent') ?? null

  try {
    const admin = getAdminClient()
    const { error } = await admin.from('email_unsubscribes').upsert(
      {
        email,
        unsubscribed_at: new Date().toISOString(),
        ip,
        user_agent: userAgent,
      },
      { onConflict: 'email', ignoreDuplicates: true },
    )
    if (error) {
      logger.error('email-unsubscribe', 'upsert failed', { email, e: error.message })
      return new NextResponse(
        htmlPage({
          title: 'Något gick fel',
          heading: 'Något gick fel',
          body: '<p>Vi kunde inte registrera din avregistrering just nu. Försök igen om en stund eller maila info@svalla.se så fixar vi det manuellt.</p>',
        }),
        { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
      )
    }
  } catch (e) {
    logger.error('email-unsubscribe', 'unhandled', { email, error: String(e) })
    return new NextResponse(
      htmlPage({
        title: 'Något gick fel',
        heading: 'Något gick fel',
        body: '<p>Tekniskt fel. Maila info@svalla.se så fixar vi det manuellt.</p>',
      }),
      { status: 500, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
    )
  }

  logger.info('email-unsubscribe', 'unsubscribed', { email })

  return new NextResponse(
    htmlPage({
      title: 'Avregistrerad',
      heading: 'Du är avregistrerad',
      body: `<p>Vi skickar inte fler mejl till <strong>${escapeHtml(email)}</strong>. Det kan ta upp till en timme innan eventuella redan-köade mejl slutar.</p><p>Var det av misstag? Skapa ett nytt konto eller maila info@svalla.se så återaktiverar vi.</p>`,
    }),
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  )
}

/** POST stöd för one-click unsubscribe (Gmail/Yahoo 2024-krav, RFC 8058).
 *  Body kan vara tom — själva existensen av POST-anropet är signalen. */
export async function POST(req: NextRequest) {
  return GET(req)
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
