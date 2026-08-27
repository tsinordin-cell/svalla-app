/**
 * Lättviktig Resend-wrapper för transaktionella mail.
 *
 * EN källa: mallarna ligger i /emails/*.md och bakas till
 * email-templates.generated.ts (scripts/build-email-templates.mjs, prebuild).
 * Den genererade filen importeras här och används i BÅDE dev och prod —
 * repo-rotens /emails följer inte med i Vercels serverless-bundle, så
 * runtime får aldrig läsa dem direkt. Ingen inline-kopia, inga hårdkodade
 * HTML-kroppar. Det du redigerar i .md är exakt det som skickas.
 *
 * Kräver env:
 *  - RESEND_API_KEY
 *  - EMAIL_FROM (default "Svalla <hej@mail.svalla.se>" — måste verifieras i Resend)
 */

import { MAIL_MALLAR } from './email-templates.generated'

export type EmailTemplate =
  | 'welcome' | 'day7' | 'season_open' | 'season_close' | 'weather_tip'
  | 'newsletter_welcome' | 'day3_newsletter' | 'day14_newsletter' | 'day30_newsletter'

type Frontmatter = {
  trigger?: string
  subject_options?: string[]
  preheader?: string
  from?: string
}

type ParsedTemplate = { meta: Frontmatter; body: string }

/* ── Designtokens (håll mailen på ETT visuellt språk) ────────────────── */
const INK = '#0d2a3e'        // rubriker
const BODY = '#3f5a6b'       // brödtext
const MUTE = '#6a8a96'       // sekundärt
const SEA = '#1e5c82'        // primär accent
const TEAL = '#0a7b8c'       // sekundär accent
const SERIF = "Georgia,'Times New Roman',serif"
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif"

/** Parsar enkel YAML-frontmatter (matchar mallarna i /emails/) */
function parseFrontmatter(raw: string): ParsedTemplate {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match || !match[1] || match[2] === undefined) return { meta: {}, body: raw }

  const meta: Frontmatter = {}
  for (const line of match[1].split('\n')) {
    if (/^\s*-\s/.test(line)) {
      const val = line.replace(/^\s*-\s*"?/, '').replace(/"$/, '').trim()
      if (!meta.subject_options) meta.subject_options = []
      meta.subject_options.push(val)
      continue
    }
    const m = line.match(/^([a-z_]+):\s*(.*)$/)
    if (!m || !m[1]) continue
    const value = (m[2] ?? '').trim().replace(/^"|"$/g, '')
    if (m[1] === 'trigger') meta.trigger = value
    else if (m[1] === 'preheader') meta.preheader = value
    else if (m[1] === 'from') meta.from = value
  }
  return { meta, body: match[2] }
}

/** Substituera {{first_name}}, {{temp}} osv */
function substitute(template: string, vars: Record<string, string | number | undefined>): string {
  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (_, key) => {
    const v = vars[key]
    return v !== undefined ? String(v) : ''
  })
}

/* ── Inline-formattering: **fet**, *kursiv*, [länk](url) ─────────────── */
function inline(t: string): string {
  return t
    .replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${INK};font-weight:700">$1</strong>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:${SEA};font-weight:600;text-decoration:none">$1</a>`)
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>')
}

/**
 * Delar upp markdown i strukturella block — oberoende av tomrader.
 * En rubrik, en listgrupp och ett stycke blir alltid egna block, även
 * när de står direkt efter varandra (som i :::korten). Det gör att
 * "### Rubrik\n- punkt\n- punkt" renderas som rubrik + lista, inte en klump.
 */
function toBlocks(md: string): string[] {
  const lines = md.replace(/\r/g, '').split('\n')
  const blocks: string[] = []
  let cur: string[] = []
  let mode: 'p' | 'list' | null = null
  const flush = () => { if (cur.length) blocks.push(cur.join('\n')); cur = []; mode = null }
  for (const line of lines) {
    const t = line.trim()
    if (t === '') { flush(); continue }
    if (t === '---') { flush(); blocks.push('---'); continue }
    if (/^#{1,3}\s/.test(t)) { flush(); blocks.push(t); continue }
    if (/^-\s/.test(t) || /^\d+\.\s/.test(t)) {
      if (mode !== 'list') flush()
      mode = 'list'; cur.push(t); continue
    }
    // vanlig rad: fortsättning på ett listobjekt annars eget stycke
    if (mode === 'list' && cur.length) {
      const i = cur.length - 1
      cur[i] = (cur[i] ?? '') + ' ' + t
      continue
    }
    if (mode !== 'p') flush()
    mode = 'p'; cur.push(t)
  }
  flush()
  return blocks
}

/** En stapel med öppen markdown (rubriker, stycken, listor, hr) → HTML */
function renderMarkdown(md: string): string {
  const out: string[] = []
  for (const raw of toBlocks(md)) {
    const b = raw.trim()
    if (!b) continue
    if (b === '---') {
      out.push(`<hr style="border:0;border-top:1px solid #e4edf1;margin:28px 0">`)
    } else if (/^###\s/.test(b)) {
      out.push(`<h3 style="font-family:${SERIF};font-size:17px;font-weight:700;color:${INK};margin:0 0 8px;line-height:1.3">${inline(b.replace(/^###\s/, ''))}</h3>`)
    } else if (/^##\s/.test(b)) {
      out.push(`<h2 style="font-family:${SERIF};font-size:20px;font-weight:700;color:${INK};margin:6px 0 14px;letter-spacing:-0.01em;line-height:1.25">${inline(b.replace(/^##\s/, ''))}</h2>`)
    } else if (/^#\s/.test(b)) {
      out.push(`<h1 style="font-family:${SERIF};font-size:27px;font-weight:700;color:${INK};margin:0 0 16px;letter-spacing:-0.015em;line-height:1.2">${inline(b.replace(/^#\s/, ''))}</h1>`)
    } else if (/^(\d+)\.\s/m.test(b) && b.split('\n').every(l => /^\s*(\d+)\.\s/.test(l) || /^\s+/.test(l))) {
      const items = b.split(/\n(?=\d+\.\s)/).map(li =>
        `<li style="margin:0 0 8px;padding-left:4px">${inline(li.replace(/^\s*\d+\.\s/, '').replace(/\n\s+/g, ' '))}</li>`).join('')
      out.push(`<ol style="margin:0 0 18px;padding-left:22px;font-size:15px;line-height:1.65;color:${BODY}">${items}</ol>`)
    } else if (/^-\s/m.test(b) && b.split('\n').every(l => /^-\s/.test(l) || /^\s+/.test(l))) {
      const items = b.split(/\n(?=-\s)/).map(li =>
        `<li style="margin:0 0 8px;padding-left:4px">${inline(li.replace(/^-\s/, '').replace(/\n\s+/g, ' '))}</li>`).join('')
      out.push(`<ul style="margin:0 0 18px;padding-left:20px;font-size:15px;line-height:1.65;color:${BODY}">${items}</ul>`)
    } else {
      out.push(`<p style="font-size:15px;line-height:1.7;margin:0 0 18px;color:${BODY}">${inline(b.replace(/\n/g, ' '))}</p>`)
    }
  }
  return out.join('\n')
}

/* ── Block-komponenter (:::namn … :::) ──────────────────────────────── */
function gradientButton(label: string, url: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px auto 22px"><tr>
    <td style="background-color:${SEA};background-image:linear-gradient(135deg,${SEA},${TEAL});border-radius:12px">
      <a href="${url}" style="display:inline-block;padding:15px 34px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;font-family:${SANS}">${label}</a>
    </td></tr></table>`
}

function renderBlock(name: string, inner: string): string {
  const body = inner.trim()
  if (name === 'knapp') {
    const m = body.match(/\[([^\]]+)\]\(([^)]+)\)/)
    return m ? gradientButton(m[1]!, m[2]!) : renderMarkdown(body)
  }
  if (name === 'signatur') {
    // rad 1 = hälsning, rad 2 = "— Team Svalla", ev. *kursiv PS*
    const lines = body.split('\n').map(l => l.trim()).filter(Boolean)
    const greet = lines.find(l => !l.startsWith('—') && !l.startsWith('*')) ?? 'Ses därute.'
    const ps = lines.find(l => l.startsWith('*'))?.replace(/^\*|\*$/g, '') ?? ''
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:34px 0 0;border-top:1px solid #e9f0f3">
      <tr><td style="padding:22px 0 0">
        <p style="font-size:15px;line-height:1.6;margin:0;color:${INK}">${inline(greet)}</p>
        <p style="font-family:${SERIF};font-size:16px;font-weight:700;color:${SEA};margin:2px 0 0">Team Svalla</p>
        ${ps ? `<p style="font-size:12.5px;line-height:1.55;margin:12px 0 0;color:${MUTE};font-style:italic">${inline(ps)}</p>` : ''}
      </td></tr></table>`
  }
  if (name === 'panel') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px;background-color:#0d3a5c;background-image:linear-gradient(135deg,#0d3a5c 0%,${TEAL} 100%);border-radius:16px">
      <tr><td style="padding:26px 26px 22px" class="panel-pad">${renderMarkdownOnDark(body)}</td></tr></table>`
  }
  if (name === 'citat') {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 26px;background-color:#f1f7f9;background-image:linear-gradient(135deg,#f4f9fb 0%,#edf4f7 100%);border-radius:16px">
      <tr><td style="padding:24px 26px;border-left:4px solid ${TEAL}">${renderMarkdown(body)}</td></tr></table>`
  }
  // kort = mjuk accentbox · ruta = vit kantad box
  const boxStyle = name === 'kort'
    ? `background:#f4f9fb;border-radius:14px;border-left:3px solid ${SEA}`
    : `background:#ffffff;border-radius:12px;border:1px solid #e4edf1`
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px"><tr>
    <td class="card" style="padding:18px 20px;${boxStyle}">${renderMarkdown(body)}</td></tr></table>`
}

/** Panel-innehåll på mörk botten (ljus text) */
function renderMarkdownOnDark(md: string): string {
  return toBlocks(md).map(raw => {
    const b = raw.trim()
    if (!b) return ''
    if (/^###\s/.test(b)) return `<div style="font-family:${SERIF};font-size:19px;font-weight:700;color:#fff;margin:0 0 10px;line-height:1.3">${inline(b.replace(/^###\s/, ''))}</div>`
    if (/^-\s/m.test(b)) return b.split('\n').map(li => `<div style="font-size:13.5px;color:rgba(255,255,255,0.92);margin:0 0 7px;line-height:1.5;padding-left:14px;text-indent:-14px">•&nbsp;&nbsp;${inline(li.replace(/^-\s/, ''))}</div>`).join('')
    return `<p style="font-size:14px;line-height:1.6;margin:0 0 14px;color:rgba(255,255,255,0.88)">${inline(b.replace(/\n/g, ' '))}</p>`
  }).join('')}

/** Markdown + block (:::namn) → e-postsäker HTML */
function markdownToHtml(md: string): string {
  // Strippa HTML-kommentarer (t.ex. <!-- KÄLLA: ... -->) — de är källmarkörer
  // för verify-claims i .md-källan och ska aldrig med i det skickade mejlet.
  md = md.replace(/<!--[\s\S]*?-->/g, '')
  const parts: string[] = []
  let last = 0
  const re = /:::(\w+)\n([\s\S]*?)\n:::/g
  let m: RegExpExecArray | null
  while ((m = re.exec(md)) !== null) {
    const before = md.slice(last, m.index)
    if (before.trim()) parts.push(renderMarkdown(before))
    parts.push(renderBlock(m[1]!, m[2]!))
    last = m.index + m[0].length
  }
  const rest = md.slice(last)
  if (rest.trim()) parts.push(renderMarkdown(rest))
  return parts.join('\n')
}

/**
 * Svallas logga.
 *  - I mejl bäddas den in inline (cid:) via Resend → syns ALLTID, oavsett om
 *    mottagaren har externa bilder avstängda.
 *  - I förhandsvisning (renderEmail/admin) används den hostade URL:en så
 *    loggan syns i webbläsaren.
 *  - alt="SVALLA" är stylad vit/fet → även om en klient skulle blocka bilden
 *    står det "SVALLA", aldrig en tom ruta.
 */
const HOSTED_LOGO_URL = 'https://oiklttwylndesewauytj.supabase.co/storage/v1/object/public/images/email/svalla-logo.png'
const LOGO_CID = 'svalla-logo'
const LOGO_B64 = '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'

/** Wrappar HTML i mailklient-säker layout: hero + responsivt + footer */
function wrapEmail(htmlBody: string, preheader?: string, logoSrc: string = HOSTED_LOGO_URL): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Svalla</title>
<style>
  @media only screen and (max-width:600px) {
    .container { border-radius:0 !important; }
    .body-pad  { padding:26px 22px 30px !important; }
    .hero-pad  { padding:24px 22px !important; }
    .card      { padding:16px 18px !important; }
    .panel-pad { padding:22px 20px 18px !important; }
    .tagline   { display:none !important; }
  }
  a { text-decoration:none }
</style>
</head>
<body style="margin:0;padding:0;background:#e8eef2;font-family:${SANS};color:${INK};-webkit-font-smoothing:antialiased">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;color:#e8eef2;opacity:0">${preheader}</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#e8eef2">
  <tr><td align="center" style="padding:28px 12px">
    <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 6px 30px rgba(6,42,58,0.10)">
      <tr>
        <td class="hero-pad" style="background-color:#0b3350;background-image:linear-gradient(135deg,#0b3350 0%,${SEA} 55%,${TEAL} 100%);padding:30px 40px 28px">
          <img src="${logoSrc}" width="150" height="34" alt="SVALLA" style="display:block;border:0;width:150px;max-width:150px;height:auto;outline:none;margin:0 0 8px;color:#ffffff;font-family:${SANS};font-size:22px;font-weight:800;letter-spacing:4px;line-height:34px">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.74);letter-spacing:0.4px;font-family:${SANS}">Sveriges samlade skärgårdssida</p>
        </td>
      </tr>
      <tr>
        <td class="body-pad" style="padding:38px 40px 34px">
          ${htmlBody}
        </td>
      </tr>
      <tr>
        <td style="background:#f6fafb;padding:22px 40px;border-top:1px solid #e8eef2">
          <p style="font-size:11px;color:${MUTE};line-height:1.6;margin:0">
            Du får detta mejl för att du har ett konto på Svalla eller prenumererar på våra utskick.
            <a href="https://svalla.se/notiser" style="color:${MUTE};text-decoration:underline">Hantera utskick</a>
            &nbsp;·&nbsp;
            <a href="https://svalla.se/api/email/unsubscribe?email={{email}}" style="color:${MUTE};text-decoration:underline">Avregistrera</a>
          </p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="tagline" style="max-width:600px;margin-top:14px">
      <tr><td align="center">
        <p style="font-size:11px;color:#93aab6;margin:0;letter-spacing:0.3px">Svalla AB · Stockholm · Sveriges samlade skärgårdssida</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

/** Bygg subject + html för en mall (utan att skicka) */
function build(
  template: EmailTemplate,
  vars: Record<string, string | number | undefined>,
  logoSrc?: string,
): { subject: string; html: string; meta: Frontmatter } {
  const raw = MAIL_MALLAR[template]
  const { meta, body } = parseFrontmatter(raw)
  const allVars = { email: '', ...vars }
  const htmlBody = markdownToHtml(substitute(body, allVars))
  const html = substitute(wrapEmail(htmlBody, meta.preheader, logoSrc), allVars)
  const subject = substitute(meta.subject_options?.[0] ?? 'Svalla', allVars)
  return { subject, html, meta }
}

/** Rendera en mall till HTML utan att skicka — används av /admin/mail */
export function renderEmail(
  template: EmailTemplate,
  vars?: Record<string, string | number | undefined>,
): { ok: boolean; subject?: string; html?: string; error?: string } {
  try {
    const { subject, html } = build(template, vars ?? {})
    return { ok: true, subject, html }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/** Enkelt admin-mail utan mall — för interna notiser */
export async function sendAdminEmail(opts: { subject: string; html: string }): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY saknas' }
  const adminEmail = process.env.ADMIN_EMAIL || 'info@svalla.se'
  const from = process.env.EMAIL_FROM || 'Svalla <info@svalla.se>'
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: adminEmail, subject: opts.subject, html: opts.html }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.message || `Resend ${res.status}` }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network' }
  }
}

/** Skicka mail via Resend API */
export async function sendEmail(opts: {
  template: EmailTemplate
  to: string
  vars?: Record<string, string | number | undefined>
}): Promise<{ ok: boolean; error?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY saknas' }

  // Respektera unsubscribes. Fail-open vid DB-fel (logga + skicka ändå) så
  // ett tillfälligt Supabase-problem inte blockerar alla mail.
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceKey) {
      const r = await fetch(
        `${supabaseUrl}/rest/v1/email_unsubscribes?email=eq.${encodeURIComponent(opts.to.toLowerCase())}&select=email`,
        { headers: { apikey: serviceKey } },
      )
      if (r.ok) {
        const rows = await r.json() as Array<{ email: string }>
        if (rows.length > 0) return { ok: true, error: 'unsubscribed' }
      } else {
        console.error('[email] unsubscribe-kontrollen svarade', r.status, '- skickar anda')
      }
    }
  } catch {
    // fail-open: skicka ändå
  }

  const vars = { email: opts.to, ...opts.vars }
  // Loggan bäddas in inline (cid:) → syns även med externa bilder avstängda.
  const { subject, html, meta } = build(opts.template, vars, `cid:${LOGO_CID}`)
  const from = process.env.EMAIL_FROM || meta.from || 'Svalla <info@svalla.se>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject,
        html,
        // Inbäddad logga (cid:svalla-logo) — refereras från <img src="cid:..."> i headern.
        attachments: [{ filename: 'svalla-logo.png', content: LOGO_B64, content_id: LOGO_CID }],
        // One-click unsubscribe (RFC 8058) — Gmail/Yahoo kräver det av bulk sedan 2024.
        headers: {
          'List-Unsubscribe': `<https://svalla.se/api/email/unsubscribe?email=${encodeURIComponent(opts.to)}>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.message || `Resend ${res.status}` }
    return { ok: true, id: data.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network' }
  }
}
