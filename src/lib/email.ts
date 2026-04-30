/**
 * Lättviktig Resend-wrapper för transaktionella mail.
 * Läser markdown-mallar från /emails/ och skickar dem.
 *
 * Kräver env:
 *  - RESEND_API_KEY
 *  - EMAIL_FROM (default "hello@svalla.se" — måste verifieras i Resend)
 */

import fs from 'node:fs'
import path from 'node:path'

export type EmailTemplate = 'welcome' | 'day7' | 'season_open' | 'season_close'

const TEMPLATE_FILES: Record<EmailTemplate, string> = {
  welcome: '01_welcome.md',
  day7: '02_day7.md',
  season_open: '03_season_open.md',
  season_close: '04_season_close.md',
}

type Frontmatter = {
  trigger?: string
  subject_options?: string[]
  preheader?: string
  from?: string
}

type ParsedTemplate = {
  meta: Frontmatter
  body: string
}

/** Parsar enkel YAML-frontmatter (matchar mallarna i /emails/) */
function parseFrontmatter(raw: string): ParsedTemplate {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match || !match[1] || match[2] === undefined) return { meta: {}, body: raw }

  const meta: Frontmatter = {}
  const lines = match[1].split('\n')
  let currentKey: string | null = null
  for (const line of lines) {
    if (/^\s*-\s/.test(line) && currentKey === 'subject_options') {
      const val = line.replace(/^\s*-\s*"?/, '').replace(/"$/, '').trim()
      if (!meta.subject_options) meta.subject_options = []
      meta.subject_options.push(val)
      continue
    }
    const m = line.match(/^([a-z_]+):\s*(.*)$/)
    if (!m || !m[1] || m[2] === undefined) continue
    currentKey = m[1]
    const value = m[2].trim().replace(/^"|"$/g, '')
    if (currentKey === 'subject_options' && !value) continue
    if (currentKey === 'trigger') meta.trigger = value
    else if (currentKey === 'preheader') meta.preheader = value
    else if (currentKey === 'from') meta.from = value
  }

  return { meta, body: match[2] }
}

/** Trivial markdown→html — räcker för våra mallar (rubriker, listor, länkar, stark) */
function markdownToHtml(md: string): string {
  let html = md
  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  // Bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#1e5c82">$1</a>')
  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #e2e2e2;margin:24px 0">')
  // Lists
  html = html.replace(/^(\d+)\.\s+(.+)$/gm, '<li>$2</li>')
  html = html.replace(/(<li>[\s\S]+?<\/li>)/g, m => /^\d/.test(md.match(/<li>/) ? 'x' : '') ? `<ol>${m}</ol>` : `<ul>${m}</ul>`)
  html = html.replace(/^-\s+(.+)$/gm, '<li>$1</li>')
  // Paragraphs (split by blank lines)
  const blocks = html.split(/\n{2,}/).map(b => {
    if (/^<(h[1-3]|ol|ul|li|hr|p|div|blockquote)/.test(b.trim())) return b
    return `<p>${b.replace(/\n/g, '<br>')}</p>`
  })
  html = blocks.join('\n')
  return html
}

/** Substituera {{first_name}}, {{visited_count}} osv */
function substitute(template: string, vars: Record<string, string | number | undefined>): string {
  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (_, key) => {
    const v = vars[key]
    return v !== undefined ? String(v) : ''
  })
}

/** Wrappar HTML i en enkel mailklient-säker layout */
function wrapEmail(htmlBody: string, preheader?: string): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Svalla</title>
</head>
<body style="margin:0;background:#f5f4ef;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1a2530">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden">${preheader}</div>` : ''}
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f4ef;padding:20px 0">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;padding:32px 36px;box-shadow:0 2px 12px rgba(0,0,0,0.04)">
      <tr><td>
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1e5c82;font-weight:700;margin-bottom:24px">Svalla</div>
        ${htmlBody}
        <hr style="border:none;border-top:1px solid #e2e2e2;margin:32px 0 16px">
        <p style="font-size:11px;color:#777;line-height:1.5;margin:0">
          Du får detta mejl för att du anmält dig till Svalla.se eller skapat ett konto.
          <a href="https://svalla.se/notiser" style="color:#777">Hantera utskick</a> ·
          <a href="https://svalla.se/api/email/unsubscribe?email={{email}}" style="color:#777">Avregistrera</a>
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

/**
 * Skicka ett enkelt admin-mail utan mall — för interna notiser.
 * Kräver RESEND_API_KEY och EMAIL_FROM (eller default hello@svalla.se).
 */
export async function sendAdminEmail(opts: {
  subject: string
  html: string
}): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY saknas' }

  const adminEmail = process.env.ADMIN_EMAIL || 'info@svalla.se'
  const from = process.env.EMAIL_FROM || 'Svalla <hello@svalla.se>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
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

  // Läs mall
  const file = TEMPLATE_FILES[opts.template]
  // Fil-resolving: i Vercel är /emails/ inte med i bundle. Embedda mallar nedan.
  let raw: string
  try {
    const filePath = path.join(process.cwd(), 'emails', file)
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    raw = EMBEDDED_TEMPLATES[opts.template]
  }

  const { meta, body } = parseFrontmatter(raw)
  const vars = { email: opts.to, ...opts.vars }
  const subject = (meta.subject_options?.[0] || 'Svalla')
  const subjectFinal = substitute(subject, vars)
  const bodyFinal = substitute(body, vars)
  const htmlBody = markdownToHtml(bodyFinal)
  const html = substitute(wrapEmail(htmlBody, meta.preheader), vars)

  const from = process.env.EMAIL_FROM || meta.from || 'Svalla <hello@svalla.se>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: subjectFinal,
        html,
      }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return { ok: false, error: data.message || `Resend ${res.status}` }
    return { ok: true, id: data.id }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network' }
  }
}

/** Embedded fallback om filsystemet inte är tillgängligt vid runtime */
const EMBEDDED_TEMPLATES: Record<EmailTemplate, string> = {
  welcome: `---
subject_options:
  - "Välkommen till Svalla"
preheader: 5 öar att börja med.
---
# Välkommen, {{first_name}}!
Tack för att du gick med. Svalla är skärgårdens guide — vart du ska, vad som finns där, hur du tar dig dit.

## 5 öar att börja med
1. **Sandhamn** — [Läs guiden](https://svalla.se/o/sandhamn)
2. **Grinda** — [Läs guiden](https://svalla.se/o/grinda)
3. **Möja** — [Läs guiden](https://svalla.se/o/moja)
4. **Utö** — [Läs guiden](https://svalla.se/o/uto)
5. **Finnhamn** — [Läs guiden](https://svalla.se/o/finnhamn)

[Se din profil](https://svalla.se/min-skargard)

— Thomas, Svalla`,

  day7: `---
subject_options:
  - "Har du planerat sommarturen än?"
preheader: En vecka senare — här är några konkreta starts.
---
# Hej {{first_name}}!
Ser att du varit i kontakt med Svalla en vecka. Vill du komma igång med en riktig tur?

## Tre vägar in
- **Boka middag på Sandhamn** — [Sandhamn-guiden](https://svalla.se/o/sandhamn)
- **Cykla Utö** — [Utö-guiden](https://svalla.se/o/uto)
- **Övernatta Finnhamn** — [Finnhamn-guiden](https://svalla.se/o/finnhamn)

[Planera utflykt →](https://svalla.se/utflykt)

— Thomas`,

  season_open: `---
subject_options:
  - "Skärgårdssäsongen öppnar — är du redo?"
preheader: Säsongen är här. Tre saker att veta.
---
# Säsongen är öppen, {{first_name}}!
Maj är här och färjorna går igen.

## Tre saker att veta
1. **Boka tidigt** — populära krogar fyller juli redan i april
2. **Färjetider** är uppdaterade på [/farjor](https://svalla.se/farjor)
3. **Skärgårdsbingo 2026** — [25 utmaningar](https://svalla.se/bingo)

— Thomas`,

  season_close: `---
subject_options:
  - "Säsongen är slut — du besökte {{visited_count}} öar"
preheader: Året i siffror.
---
# Tack för säsongen, {{first_name}}!
Du loggade {{trip_count}} turer och besökte {{visited_count}} öar.

[Se din wrapped →](https://svalla.se/wrapped/{{username}}/2026)

— Thomas`,
}
