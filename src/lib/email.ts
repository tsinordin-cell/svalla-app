/**
 * Mail: EN renderare, mallfilerna i /emails är enda sanningen.
 *
 * Tidigare fanns tre spår för samma nio mail — markdown-filer, handkodade
 * HTML-funktioner och EMBEDDED_TEMPLATES — med olika text i varje. Den
 * handkodade vann alltid, så markdown-filen kunde vara hur fel som helst
 * utan att någon märkte det. Nu finns bara mallfilen.
 *
 * Anledningen till att de handkodade fanns: markdown-utdata var ostilad och
 * såg billig ut. Därför har renderaren nedan inline-stil på varje element
 * plus blockdirektiv (:::kort, :::panel, :::knapp …) som ger exakt samma
 * kortlayout som de handkodade hade.
 *
 * Kräver env:
 *  - RESEND_API_KEY
 *  - EMAIL_FROM (default "Svalla <hej@mail.svalla.se>" — måste verifieras i Resend)
 */

import fs from 'node:fs'
import path from 'node:path'
import { MAIL_MALLAR } from './email-templates.generated'

export type EmailTemplate = 'welcome' | 'day7' | 'season_open' | 'season_close' | 'weather_tip' | 'newsletter_welcome' | 'day3_newsletter' | 'day14_newsletter' | 'day30_newsletter'

const TEMPLATE_FILES: Record<EmailTemplate, string> = {
  welcome: '01_welcome.md',
  day7: '02_day7.md',
  season_open: '03_season_open.md',
  season_close: '04_season_close.md',
  weather_tip: '05_weather_tip.md',
  newsletter_welcome: '06_newsletter_welcome.md',
  day3_newsletter: '07_day3_newsletter.md',
  day14_newsletter: '08_day14_newsletter.md',
  day30_newsletter: '09_day30_newsletter.md',
}

/** fullt = redaktionellt (välkomst, nyhetsbrev). enkelt = kort och operativt (väder, säsong). */
type Layout = 'fullt' | 'enkelt'

type Frontmatter = {
  trigger?: string
  subject_options?: string[]
  preheader?: string
  from?: string
  layout?: Layout
}

type ParsedTemplate = { meta: Frontmatter; body: string }

/* ─────────────────────────  FÄRG & SKALA  ───────────────────────── */

const F = {
  bläck: '#0d2a3e',
  text: '#3d5865',
  dämpad: '#6a8a96',
  blå: '#1e5c82',
  turkos: '#0a7b8c',
  rost: '#c96e2a',
  kortBg: '#f4f9fb',
  vit: '#ffffff',
  kant: '#e2eaf0',
  serif: "Georgia,'Times New Roman',serif",
}

const SKALA: Record<Layout, { h1: number; h2: number; h3: number; brödtext: number; ingress: number; luft: number }> = {
  fullt: { h1: 28, h2: 19, h3: 17, brödtext: 15, ingress: 16, luft: 32 },
  enkelt: { h1: 24, h2: 17, h3: 16, brödtext: 15, ingress: 15.5, luft: 24 },
}

/* ─────────────────────────  FRONTMATTER  ───────────────────────── */

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
    else if (currentKey === 'layout') meta.layout = value === 'enkelt' ? 'enkelt' : 'fullt'
  }
  return { meta, body: match[2] }
}


/* ─────────────────────────  MARKDOWN  ───────────────────────── */

/** Inline: **fet**, *kursiv*, [länk](url). Kör efter att blocket är valt så länkfärgen kan bli ljus på mörk botten. */
function inline(md: string, mörk: boolean): string {
  const länkFärg = mörk ? '#9fd8e4' : F.blå
  return md
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, `$1<em>$2</em>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:${länkFärg};text-decoration:underline">$1</a>`)
}

/**
 * Renderar vanlig markdown med inline-stil på varje element.
 * Utan stilen ser mailen ostilade ut — det var hela anledningen till att
 * de handkodade HTML-funktionerna en gång skrevs.
 */
function markdownBlock(md: string, s: typeof SKALA['fullt'], mörk: boolean): string {
  const brödFärg = mörk ? 'rgba(255,255,255,0.84)' : F.text
  const rubrikFärg = mörk ? '#ffffff' : F.bläck
  const ut: string[] = []

  for (const stycke of md.trim().split(/\n{2,}/)) {
    const rader = stycke.split('\n').filter(r => r.trim() !== '')
    if (rader.length === 0) continue
    const första = rader[0] ?? ''

    if (/^---+$/.test(första.trim())) {
      ut.push(`<hr style="border:none;border-top:1px solid ${F.kant};margin:${s.luft}px 0">`)
      continue
    }
    if (/^###\s+/.test(första)) {
      ut.push(`<h3 style="font-family:${F.serif};font-size:${s.h3}px;font-weight:700;color:${rubrikFärg};margin:0 0 8px;line-height:1.3">${inline(första.replace(/^###\s+/, ''), mörk)}</h3>`)
      if (rader.length > 1) ut.push(markdownBlock(rader.slice(1).join('\n'), s, mörk))
      continue
    }
    if (/^##\s+/.test(första)) {
      ut.push(`<h2 style="font-family:${F.serif};font-size:${s.h2}px;font-weight:700;color:${rubrikFärg};margin:${s.luft}px 0 14px;letter-spacing:-0.005em;line-height:1.3">${inline(första.replace(/^##\s+/, ''), mörk)}</h2>`)
      if (rader.length > 1) ut.push(markdownBlock(rader.slice(1).join('\n'), s, mörk))
      continue
    }
    if (/^#\s+/.test(första)) {
      ut.push(`<h1 style="font-family:${F.serif};font-size:${s.h1}px;font-weight:700;color:${rubrikFärg};margin:0 0 16px;letter-spacing:-0.01em;line-height:1.2">${inline(första.replace(/^#\s+/, ''), mörk)}</h1>`)
      if (rader.length > 1) ut.push(markdownBlock(rader.slice(1).join('\n'), s, mörk))
      continue
    }
    if (rader.every(r => /^\s*-\s+/.test(r))) {
      const li = rader.map(r => `<li style="margin:0 0 8px;font-size:${s.brödtext}px;line-height:1.6;color:${brödFärg}">${inline(r.replace(/^\s*-\s+/, ''), mörk)}</li>`).join('')
      ut.push(`<ul style="margin:0 0 ${s.luft}px;padding-left:20px">${li}</ul>`)
      continue
    }
    if (rader.every(r => /^\s*\d+\.\s+/.test(r))) {
      const li = rader.map(r => `<li style="margin:0 0 8px;font-size:${s.brödtext}px;line-height:1.6;color:${brödFärg}">${inline(r.replace(/^\s*\d+\.\s+/, ''), mörk)}</li>`).join('')
      ut.push(`<ol style="margin:0 0 ${s.luft}px;padding-left:22px">${li}</ol>`)
      continue
    }
    ut.push(`<p style="font-size:${s.brödtext}px;line-height:1.65;margin:0 0 16px;color:${brödFärg}">${inline(rader.join('\n'), mörk).replace(/\n/g, '<br>')}</p>`)
  }
  return ut.join('\n')
}

/* ─────────────────────────  BLOCKDIREKTIV  ───────────────────────── */

/** Kort med färgad vänsterkant — huvudbyggstenen i välkomst- och nyhetsbrevsmailen. */
function kort(innehåll: string, s: typeof SKALA['fullt'], accent: boolean): string {
  const kantFärg = accent ? F.rost : F.blå
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 12px">
  <tr><td class="card" style="padding:18px 20px;background:${F.kortBg};border-radius:14px;border-left:3px solid ${kantFärg}">
${markdownBlock(innehåll, s, false).replace(/margin:0 0 16px/g, 'margin:0 0 10px')}
  </td></tr>
</table>`
}

/** Vit ruta med tunn kant — listkort i nyhetsbreven. */
function ruta(innehåll: string, s: typeof SKALA['fullt']): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px">
  <tr><td class="card" style="padding:16px 18px;background:${F.vit};border-radius:12px;border:1px solid ${F.kant}">
${markdownBlock(innehåll, s, false).replace(/margin:0 0 16px/g, 'margin:0 0 8px')}
  </td></tr>
</table>`
}

/** Mörk gradientpanel — används sparsamt, för ett enda blickfång per mail. */
function panel(innehåll: string, s: typeof SKALA['fullt']): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${s.luft}px;background:#0d3a5c;border-radius:16px">
  <tr><td class="card" style="padding:24px;background:linear-gradient(135deg,#0d3a5c 0%,#0a7b8c 100%);border-radius:16px">
${markdownBlock(innehåll, s, true)}
  </td></tr>
</table>`
}

/** Ljus citatpanel. */
function citat(innehåll: string, s: typeof SKALA['fullt']): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${s.luft}px;background:${F.kortBg};border-radius:16px">
  <tr><td class="card" style="padding:24px;background:linear-gradient(135deg,#f4f9fb 0%,#edf4f7 100%);border-radius:16px">
${markdownBlock(innehåll, s, false)}
  </td></tr>
</table>`
}

/** Bulletproof-knapp. Innehållet ska vara exakt en markdown-länk. */
function knapp(innehåll: string): string {
  const m = innehåll.trim().match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (!m) return markdownBlock(innehåll, SKALA.fullt, false)
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto 28px">
  <tr><td class="cta" style="background:#1e5c82;background-image:linear-gradient(135deg,#1e5c82,#0a7b8c);border-radius:12px">
    <a href="${m[2]}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px">${m[1]}</a>
  </td></tr>
</table>`
}

/**
 * Avsändarblock. Rad 1 = hälsning, rad 2 = "— Team Svalla", rad 3 = kursiv underrad.
 * Alla mail signeras av teamet, aldrig av en enskild person — ett enmansnamn
 * får avsändaren att se mindre ut än vi är.
 */
function signatur(innehåll: string): string {
  const rader = innehåll.trim().split('\n').filter(r => r.trim() !== '')
  const hälsning = rader[0] ?? ''
  const namn = rader[1] ?? '— Team Svalla'
  const underrad = (rader[2] ?? '').replace(/^\*|\*$/g, '')
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0;border-top:1px solid ${F.kant}">
  <tr><td style="padding:20px 0 0">
    <p style="font-size:15px;line-height:1.6;margin:0 0 4px;color:${F.text}">${inline(hälsning, false)}</p>
    <p style="font-size:15px;line-height:1.5;margin:0 0 2px;color:${F.bläck};font-weight:700">${inline(namn.replace(/^—\s*/, '— '), false)}</p>
    ${underrad ? `<p style="font-size:13.5px;line-height:1.5;margin:0;color:${F.dämpad};font-style:italic">${inline(underrad, false)}</p>` : ''}
  </td></tr>
</table>`
}

const BLOCK: Record<string, (innehåll: string, s: typeof SKALA['fullt'], flagga: boolean) => string> = {
  kort: (i, s, accent) => kort(i, s, accent),
  ruta: (i, s) => ruta(i, s),
  panel: (i, s) => panel(i, s),
  citat: (i, s) => citat(i, s),
  knapp: i => knapp(i),
  signatur: i => signatur(i),
}

/**
 * Kör hela mallkroppen genom block- och markdownrenderarna.
 *
 * HTML-kommentarer strippas först. Där ligger källhänvisningarna
 * (`<!-- KÄLLA: ... -->`) intill sitt påstående: osynliga för läsaren,
 * synliga för scripts/verify-claims.mjs via den genererade TS-filen.
 */
function renderBody(body: string, layout: Layout): string {
  const s = SKALA[layout]
  const rader = body.replace(/<!--[\s\S]*?-->/g, '').split('\n')
  const ut: string[] = []
  let vanlig: string[] = []
  let öppet: { namn: string; flagga: boolean; rader: string[] } | null = null

  const spolaVanlig = () => {
    if (vanlig.join('').trim()) ut.push(markdownBlock(vanlig.join('\n'), s, false))
    vanlig = []
  }

  for (const rad of rader) {
    const start = rad.match(/^:::([a-zåäö]+)\s*(.*)$/)
    if (!öppet && start && BLOCK[start[1] as string]) {
      spolaVanlig()
      öppet = { namn: start[1] as string, flagga: (start[2] ?? '').trim() === 'accent', rader: [] }
      continue
    }
    if (öppet && /^:::\s*$/.test(rad)) {
      const fn = BLOCK[öppet.namn]
      if (fn) ut.push(fn(öppet.rader.join('\n'), s, öppet.flagga))
      öppet = null
      continue
    }
    if (öppet) öppet.rader.push(rad)
    else vanlig.push(rad)
  }
  // Oavslutat block är ett skrivfel i mallen — rendera innehållet hellre än att tappa det.
  if (öppet) {
    const fn = BLOCK[öppet.namn]
    if (fn) ut.push(fn(öppet.rader.join('\n'), s, öppet.flagga))
  }
  spolaVanlig()
  return ut.join('\n')
}

/**
 * Substituera {{first_name}}, {{visited_count}} osv.
 *
 * En variabel som saknas SAMLAS UPP i stället för att bli tom sträng.
 * Tidigare gav en felstavad platshållare texten "du besökte  öar" utan att
 * något gick sönder — samma familj av fel som resten av kodbasen: tomhet som
 * fylls tyst. Nu stoppas mailet i stället, och renderEmail talar om vilken
 * variabel som fattas.
 */
function substitute(
  template: string,
  vars: Record<string, string | number | undefined>,
  saknade?: Set<string>,
): string {
  return template.replace(/\{\{\s*([a-z_]+)\s*\}\}/g, (_, key: string) => {
    const v = vars[key]
    if (v === undefined || v === null || String(v).trim() === '') {
      saknade?.add(key)
      return ''
    }
    return String(v)
  })
}

/* ─────────────────────────  RAM  ───────────────────────── */

/**
 * Logo-URL — hostad PNG på Supabase Storage public bucket.
 * Bytt från inline SVG eftersom Gmail iOS strippar SVG-element.
 * PNG renderar pålitligt i alla mailklienter inkl. Outlook.
 */
const EMAIL_LOGO_URL = 'https://oiklttwylndesewauytj.supabase.co/storage/v1/object/public/images/email/svalla-logo.png'

/** Wrappar HTML i mailklient-säker layout: hero-band med PNG-logo + responsive @media + footer. */
function wrapEmail(htmlBody: string, preheader?: string): string {
  return `<!doctype html>
<html lang="sv">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Svalla</title>
<style>
  /* Mobil-respons: större typografi, mindre padding, kant-till-kant container */
  @media only screen and (max-width:600px) {
    .container { border-radius:0 !important; }
    .body-pad  { padding:24px 20px !important; }
    .hero-pad  { padding:22px 20px 18px !important; }
    .card      { padding:16px 18px !important; }
    .cta a     { padding:14px 26px !important; font-size:15px !important; }
    .tagline   { display:none !important; }
    .logo      { width:120px !important; height:auto !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#eef3f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#162d3a;-webkit-font-smoothing:antialiased">
${preheader ? `<div style="display:none;max-height:0;overflow:hidden;color:#eef3f6">${preheader}</div>` : ''}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef3f6">
  <tr><td align="center" style="padding:24px 0">
    <table role="presentation" width="600" class="container" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 24px rgba(0,45,60,0.08)">
      <tr>
        <td class="hero-pad" style="background:#0d3a5c;background-image:linear-gradient(135deg,#0d3a5c 0%,#1e5c82 50%,#0a7b8c 100%);padding:28px 36px 26px">
          <img src="${EMAIL_LOGO_URL}" width="140" height="32" alt="Svalla" class="logo" style="display:block;border:0;max-width:140px;height:auto;outline:none;margin-bottom:8px">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.65);letter-spacing:0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">skärgården, samlad på ett ställe</p>
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
            Du får detta mejl för att du har ett konto på Svalla eller prenumererar på våra utskick.
            <a href="https://svalla.se/notiser" style="color:#6a8a96;text-decoration:underline">Hantera utskick</a>
            &nbsp;·&nbsp;
            <a href="https://svalla.se/api/email/unsubscribe?email={{email}}" style="color:#6a8a96;text-decoration:underline">Avregistrera</a>
          </p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="tagline" style="max-width:600px;margin-top:12px">
      <tr><td align="center">
        <p style="font-size:11px;color:#8aa4b0;margin:0;letter-spacing:0.3px">Svalla AB · Stockholm · skärgården, samlad på ett ställe</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

/**
 * Skicka ett enkelt admin-mail utan mall — för interna notiser.
 */
export async function sendAdminEmail(opts: {
  subject: string
  html: string
}): Promise<{ ok: boolean; error?: string }> {
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

/**
 * Hämtar mallens råtext.
 *
 * Källan är MAIL_MALLAR, som genereras från /emails/*.md av
 * scripts/build-email-templates.mjs i prebuild. Två skäl, båda uppmätta:
 *
 * 1. **Spärren såg aldrig mailen.** scripts/verify-claims.mjs har `src` som
 *    omfång. /emails ligger utanför, så varje klockslag och pris i ett utskick
 *    var osynligt för den. Via den genererade filen i src/lib granskas
 *    mailtexten nu som all annan användarsynlig text.
 * 2. **Saknad fil gav tyst fel text.** Fyra av nio mallar fanns inte på disk;
 *    readFileSync kastade och koden föll tillbaka på en inbäddad kopia med
 *    helt annan text. Nu avbryts bygget i stället.
 *
 * (Att filerna inte skulle följa med i Vercels bundle var en hypotes jag
 * hade — den stämde inte. Next spårar dem via TEMPLATE_FILES. Skälen ovan
 * är de som faktiskt håller.)
 *
 * I utvecklingsläge läses .md-filen direkt så en ändring syns utan ombygge.
 */
function läsMall(template: EmailTemplate): string | null {
  if (process.env.NODE_ENV !== 'production') {
    try {
      return fs.readFileSync(path.join(process.cwd(), 'emails', TEMPLATE_FILES[template]), 'utf-8')
    } catch {
      // faller igenom till den inbyggda
    }
  }
  return MAIL_MALLAR[template] ?? null
}

/** Renderar ett mail till färdig HTML utan att skicka — används av förhandsvisning och tester. */
export function renderEmail(template: EmailTemplate, vars: Record<string, string | number | undefined> = {}):
  { ok: true; subject: string; html: string; from?: string } | { ok: false; error: string } {
  const raw = läsMall(template)
  if (!raw) return { ok: false, error: `Mall saknas: ${TEMPLATE_FILES[template]}` }

  const { meta, body } = parseFrontmatter(raw)
  const saknade = new Set<string>()

  // Kommentarerna bär källhänvisningarna och ska aldrig substitueras eller visas.
  const kropp = body.replace(/<!--[\s\S]*?-->/g, '')

  const subject = substitute(meta.subject_options?.[0] || 'Svalla', vars, saknade)
  const html = substitute(
    wrapEmail(renderBody(substitute(kropp, vars, saknade), meta.layout ?? 'fullt'), meta.preheader),
    vars,
    saknade,
  )

  if (saknade.size > 0) {
    return { ok: false, error: `Variabler saknas i ${TEMPLATE_FILES[template]}: ${[...saknade].join(', ')}` }
  }
  return { ok: true, subject, html, ...(meta.from ? { from: meta.from } : {}) }
}

/** Skicka mail via Resend API */
export async function sendEmail(opts: {
  template: EmailTemplate
  to: string
  vars?: Record<string, string | number | undefined>
}): Promise<{ ok: boolean; error?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY saknas' }

  // Respektera unsubscribes. Fail-open vid DB-fel så ett tillfälligt
  // Supabase-problem inte blockerar alla mail.
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceKey) {
      const r = await fetch(
        `${supabaseUrl}/rest/v1/email_unsubscribes?email=eq.${encodeURIComponent(opts.to.toLowerCase())}&select=email`,
        { headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` } },
      )
      if (r.ok) {
        const rows = await r.json() as Array<{ email: string }>
        if (rows.length > 0) return { ok: true, error: 'unsubscribed' }
      }
    }
  } catch {
    // fail-open: skicka ändå
  }

  const vars = { email: opts.to, ...opts.vars }
  const renderad = renderEmail(opts.template, vars)
  if (!renderad.ok) return { ok: false, error: renderad.error }

  const from = process.env.EMAIL_FROM || renderad.from || 'Svalla <info@svalla.se>'

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: renderad.subject,
        html: renderad.html,
        // One-click unsubscribe (RFC 8058). Gmail och Yahoo kräver detta av
        // avsändare sedan 2024 — utan headern räknas utskicken som bulk utan
        // opt-out, vilket sänker leveransbarheten rejält.
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
