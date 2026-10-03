/**
 * /api/email/unsubscribe – avregistrering från Svallas mejl.
 *
 * GET  visar en bekräftelsesida och ändrar ingenting. E-postskannrar (t.ex.
 *      Outlook Safe Links) öppnar länkar i förväg; tidigare avregistrerade de
 *      mottagare som aldrig klickat.
 * POST avregistrerar: knappen på bekräftelsesidan, eller e-postklientens
 *      one-click enligt RFC 8058 (List-Unsubscribe-Post).
 *
 * Länkarna är signerade (src/lib/avregistrering.ts, UNSUBSCRIBE_SECRET).
 * Gamla länkar utan token godtas till GAMLA_LANKAR_TILL (sidan, POST och
 * one-click).
 *
 * Övrigt:
 *  - Idempotent (upsert, on conflict do nothing).
 *  - IP och user-agent sparas i email_unsubscribes som underlag.
 *  - Adressen skrivs inte i loggen.
 *  - sendEmail() kollar email_unsubscribes före varje utskick.
 */

export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { logger } from '@/lib/logger'
import { tolkaBegaran, type AvregBegaran } from '@/lib/avregistrering'

/** HTML-respons — minimal, mobil-vänlig bekräftelse-sida */
function htmlPage(opts: { title: string; heading: string; body: string }): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<meta name="referrer" content="no-referrer">
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
  form{margin-top:8px}
  button{padding:12px 24px;border-radius:12px;border:0;background:#c0392b;color:#fff;
         font-weight:700;font-size:15px;cursor:pointer;font-family:inherit}
  button:focus-visible,a:focus-visible{outline:2px solid #0d2a3e;outline-offset:3px}
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

const HTML_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex',
}

function sida(status: number, opts: { title: string; heading: string; body: string }): NextResponse {
  return new NextResponse(htmlPage(opts), { status, headers: HTML_HEADERS })
}

function tolka(req: NextRequest): AvregBegaran {
  return tolkaBegaran(
    req.nextUrl.searchParams,
    process.env.UNSUBSCRIBE_SECRET,
    undefined,
    process.env.UNSUBSCRIBE_SECRET_PREVIOUS,
  )
}

type AnvandbarBegaran = Extract<AvregBegaran, { email: string }>

function anvandbar(b: AvregBegaran): b is AnvandbarBegaran {
  return b.typ === 'signerad' || b.typ === 'gammal'
}

/** Svar för en länk som inte går att använda. */
function ogiltigLank(b: AvregBegaran): NextResponse {
  if (b.typ === 'gammal_utgangen') {
    return sida(410, {
      title: 'Länken är för gammal',
      heading: 'Länken är för gammal',
      body: '<p>Använd länken i ett nyare mejl från Svalla, eller maila <strong>info@svalla.se</strong> så avregistrerar vi dig.</p>',
    })
  }
  return sida(400, {
    title: 'Ogiltig länk',
    heading: 'Länken fungerar inte',
    body: '<p>Avregistreringslänken är ofullständig eller ändrad. Klicka direkt på länken i mejlet, eller maila <strong>info@svalla.se</strong> så avregistrerar vi dig.</p>',
  })
}

export async function GET(req: NextRequest) {
  const b = tolka(req)
  if (!anvandbar(b)) return ogiltigLank(b)

  // Bekräftelsesida. Formuläret skickar till samma adress (med e/t eller email).
  const action = `${req.nextUrl.pathname}${req.nextUrl.search}`
  return sida(200, {
    title: 'Avregistrera',
    heading: 'Vill du sluta få mejl från Svalla?',
    body: `<p>Vi slutar skicka mejl till <strong>${escapeHtml(b.email)}</strong>.</p>
    <form method="post" action="${escapeHtml(action)}"><button type="submit">Ja, avregistrera mig</button></form>`,
  })
}

/** Avregistrera. Anropas av knappen på bekräftelsesidan och av e-postklientens
 *  one-click (RFC 8058); kroppen ("List-Unsubscribe=One-Click") behövs inte. */
export async function POST(req: NextRequest) {
  const b = tolka(req)
  if (!anvandbar(b)) return ogiltigLank(b)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? req.headers.get('x-real-ip')
    ?? null
  const userAgent = req.headers.get('user-agent') ?? null

  try {
    const admin = getAdminClient()
    const { error } = await admin.from('email_unsubscribes').upsert(
      {
        email: b.email,
        unsubscribed_at: new Date().toISOString(),
        ip,
        user_agent: userAgent,
      },
      { onConflict: 'email', ignoreDuplicates: true },
    )
    if (error) {
      logger.error('email-unsubscribe', 'upsert failed', { e: error.message })
      return sida(500, {
        title: 'Något gick fel',
        heading: 'Något gick fel',
        body: '<p>Vi kunde inte registrera din avregistrering just nu. Försök igen om en stund, eller maila info@svalla.se så ordnar vi det.</p>',
      })
    }
  } catch (e) {
    logger.error('email-unsubscribe', 'unhandled', { error: String(e) })
    return sida(500, {
      title: 'Något gick fel',
      heading: 'Något gick fel',
      body: '<p>Tekniskt fel. Maila info@svalla.se så ordnar vi det.</p>',
    })
  }

  logger.info('email-unsubscribe', 'unsubscribed', { lank: b.typ })

  return sida(200, {
    title: 'Avregistrerad',
    heading: 'Du är avregistrerad',
    body: `<p>Vi skickar inte fler mejl till <strong>${escapeHtml(b.email)}</strong>. Mejl som redan ligger i kö kan komma fram inom en timme.</p><p>Var det fel? Maila info@svalla.se så återaktiverar vi.</p>`,
  })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
