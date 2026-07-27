/**
 * POST /api/admin/newsletter/send
 *
 * Skickar ett redaktionellt nyhetsbrev till alla bekräftade prenumeranter
 * som inte avregistrerat sig och som INTE redan fått detta issue_id.
 *
 * Body (JSON):
 *   issue_id   — unikt ID för detta nummer, t.ex. "2026-08-12"  (dubbel-skydd mot oavsiktliga sändningar)
 *   subject    — e-postämnesrad
 *   preheader  — (valfritt) preheader-text
 *   html_body  — HTML-kropp att wrappa i Svallamallen
 *   dry_run    — (valfritt) true = logga utan att skicka
 *   batch_size — (valfritt) max antal per körning, default 500
 *
 * Auth: Bearer ${CRON_SECRET}  (samma hemlig som cronen)
 *
 * Respons:
 *   { ok, sent, skipped, errors, dry_run }
 */

import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const EMAIL_LOGO_URL =
  'https://oiklttwylndesewauytj.supabase.co/storage/v1/object/public/images/email/svalla-logo.png'

function wrapNewsletterEmail(htmlBody: string, preheader?: string): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>Svallanyheter</title>
<style>
  @media only screen and (max-width:600px){
    .container{border-radius:0!important}
    .body-pad{padding:24px 20px!important}
    .hero-pad{padding:20px 20px 16px!important}
    .logo{width:120px!important;height:auto!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:#eef3f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#162d3a">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;color:#eef3f6">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef3f6">
  <tr><td align="center" style="padding:24px 0">
    <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" border="0"
      style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px rgba(0,45,60,0.08)">
      <tr>
        <td class="hero-pad" style="background:linear-gradient(135deg,#0d3a5c 0%,#1e5c82 50%,#0a7b8c 100%);padding:28px 36px 24px">
          <img src="${EMAIL_LOGO_URL}" width="140" height="32" alt="Svalla" class="logo"
            style="display:block;border:0;max-width:140px;height:auto;outline:none;margin-bottom:6px">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.55);letter-spacing:0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
            Svallanyheter — skärgårdsnyhetsbrevet
          </p>
        </td>
      </tr>
      <tr>
        <td class="body-pad" style="padding:36px 36px 32px">
          ${htmlBody}
        </td>
      </tr>
      <tr>
        <td style="background:#fafcfd;padding:20px 36px;border-top:1px solid #e8eef2">
          <p style="font-size:11px;color:#6a8a96;line-height:1.6;margin:0">
            Du får detta mejl för att du prenumererar på Svallanyheter.
            <a href="https://svalla.se/nyhetsbrev" style="color:#6a8a96;text-decoration:underline">Om nyhetsbrevet</a>
            &nbsp;·&nbsp;
            <a href="https://svalla.se/api/email/unsubscribe?email={{email}}" style="color:#6a8a96;text-decoration:underline">Avregistrera</a>
          </p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin-top:12px">
      <tr><td align="center">
        <p style="font-size:11px;color:#8aa4b0;margin:0">Svalla AB · Stockholm · svalla.se</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function POST(req: Request) {
  // Auth
  const auth = req.headers.get('authorization') || ''
  const secret = process.env.CRON_SECRET
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: {
    issue_id?: string
    subject?: string
    preheader?: string
    html_body?: string
    dry_run?: boolean
    batch_size?: number
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const { issue_id, subject, html_body, preheader, dry_run = false, batch_size = 500 } = body

  if (!issue_id || !subject || !html_body) {
    return NextResponse.json(
      { error: 'issue_id, subject och html_body krävs' },
      { status: 400 },
    )
  }

  const service = getAdminClient()
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM || 'Svalla <info@svalla.se>'

  if (!apiKey && !dry_run) {
    return NextResponse.json({ error: 'RESEND_API_KEY saknas' }, { status: 500 })
  }

  // Hämta alla bekräftade, aktiva prenumeranter
  const { data: subscribers, error: fetchErr } = await service
    .from('email_subscribers')
    .select('email')
    .eq('confirmed', true)
    .eq('unsubscribed', false)
    .limit(batch_size)

  if (fetchErr) {
    return NextResponse.json({ error: fetchErr.message }, { status: 500 })
  }

  const allEmails = (subscribers ?? []).map(s => s.email as string).filter(Boolean)

  // Deduplicera: skippa de som redan fått detta issue
  const { data: alreadySent } = await service
    .from('email_log')
    .select('email')
    .eq('template', `newsletter_${issue_id}`)
    .in('email', allEmails)

  const sentSet = new Set((alreadySent ?? []).map(r => r.email as string))
  const toSend = allEmails.filter(e => !sentSet.has(e))

  if (dry_run) {
    return NextResponse.json({
      ok: true,
      dry_run: true,
      total_subscribers: allEmails.length,
      already_sent: sentSet.size,
      would_send: toSend.length,
      issue_id,
      subject,
    })
  }

  // Skicka + logga
  let sent = 0
  let skipped = 0
  let errors = 0
  const template_key = `newsletter_${issue_id}`
  const html = wrapNewsletterEmail(html_body, preheader)

  for (const email of toSend) {
    // Kolla unsubscribe-tabell (extra säkerhet utöver confirmed-flaggan)
    const { data: unsub } = await service
      .from('email_unsubscribes')
      .select('email')
      .eq('email', email.toLowerCase())
      .maybeSingle()

    if (unsub) {
      skipped++
      continue
    }

    // Byt ut {{email}} i footer
    const personalizedHtml = html.replace(/\{\{email\}\}/g, encodeURIComponent(email))

    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: email,
          subject,
          html: personalizedHtml,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        sent++
        await service.from('email_log').insert({
          email,
          template: template_key,
          sent_at: new Date().toISOString(),
          resend_id: data.id ?? null,
        }).then(() => {}, () => {})
      } else {
        errors++
        console.error(`Newsletter send error for ${email}:`, data)
      }
    } catch (e) {
      errors++
      console.error(`Newsletter fetch error for ${email}:`, e)
    }

    // Kort paus för att inte hammra Resend-API:t
    await new Promise(r => setTimeout(r, 50))
  }

  return NextResponse.json({
    ok: true,
    issue_id,
    sent,
    skipped,
    errors,
    total_subscribers: allEmails.length,
    dry_run: false,
  })
}
