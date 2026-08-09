/**
 * Lättviktig Resend-wrapper för transaktionella mail.
 * Läser markdown-mallar från /emails/ och skickar dem.
 *
 * Kräver env:
 *  - RESEND_API_KEY
 *  - EMAIL_FROM (default "Svalla <hej@mail.svalla.se>" — måste verifieras i Resend)
 */

import fs from 'node:fs'
import path from 'node:path'

export type EmailTemplate = 'welcome' | 'day7' | 'season_open' | 'season_close' | 'weather_tip' | 'newsletter_welcome' | 'day3_newsletter'

const TEMPLATE_FILES: Record<EmailTemplate, string> = {
  welcome: '01_welcome.md',
  day7: '02_day7.md',
  season_open: '03_season_open.md',
  season_close: '04_season_close.md',
  weather_tip: '05_weather_tip.md',
  newsletter_welcome: '06_newsletter_welcome.md',
  day3_newsletter: '07_day3_newsletter.md',
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

/**
 * Logo-URL — hostad PNG på Supabase Storage public bucket.
 * Bytt från inline SVG eftersom Gmail iOS strippar SVG-element.
 * PNG renderar pålitligt i alla mailklienter inkl. Outlook.
 *
 * Källa: scripts/build-email-logo.* (om du vill regenerera) — ankaret + Playfair-text på blå hero-bg.
 * Storlek: 560×128 (rendered as 140×32, retina-ready).
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
    .h1        { font-size:24px !important; line-height:1.2 !important; }
    .lead      { font-size:16px !important; line-height:1.55 !important; }
    .card      { padding:16px 18px !important; }
    .card-title { font-size:16px !important; }
    .card-body  { font-size:14.5px !important; }
    .h2        { font-size:18px !important; }
    .body      { font-size:15px !important; line-height:1.6 !important; }
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
      <!-- HERO BAND med PNG-logo -->
      <tr>
        <td class="hero-pad" style="background:linear-gradient(135deg,#0d3a5c 0%,#1e5c82 50%,#0a7b8c 100%);padding:28px 36px 26px">
          <img src="${EMAIL_LOGO_URL}" width="140" height="32" alt="Svalla" class="logo" style="display:block;border:0;max-width:140px;height:auto;outline:none;margin-bottom:8px">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.65);letter-spacing:0.5px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">skärgården, samlad på ett ställe</p>
        </td>
      </tr>
      <!-- BODY -->
      <tr>
        <td class="body-pad" style="padding:36px 36px 32px">
          ${htmlBody}
        </td>
      </tr>
      <!-- FOOTER -->
      <tr>
        <td style="background:#fafcfd;padding:20px 36px;border-top:1px solid #e8eef2">
          <p style="font-size:11px;color:#6a8a96;line-height:1.6;margin:0">
            Du får detta mejl för att du skapat ett konto på Svalla.
            <a href="https://svalla.se/notiser" style="color:#6a8a96;text-decoration:underline">Hantera utskick</a>
            &nbsp;·&nbsp;
            <a href="https://svalla.se/api/email/unsubscribe?email={{email}}" style="color:#6a8a96;text-decoration:underline">Avregistrera</a>
          </p>
        </td>
      </tr>
    </table>
    <!-- Tag-line under kortet (döljs på mobil) -->
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
 * Kräver RESEND_API_KEY och EMAIL_FROM (eller default hej@mail.svalla.se).
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

/**
 * Hardcoded HTML body för welcome-mailet — markdown-parsern stödjer inte
 * card-layout med colored borders. Built ovanpå wrapEmail() som lägger på
 * hero-band + footer.
 *
 * Designprincip: aktivera, inte överväldiga. 3 huvudhandlingar (planera /
 * spara / logga) + ett kort manifesto + en CTA. Inga TODO-listor för
 * profil/följa/märken — de hör hemma i day-7-mailet och in-app-prompts
 * när användaren har en grund att bygga vidare på.
 */
function renderWelcomeBody(firstName: string): string {
  const safeName = firstName.trim() || 'där'
  return `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;color:#0d2a3e;margin:0 0 18px;letter-spacing:-0.01em;line-height:1.2">Välkommen ombord, ${safeName}.</h1>

<p style="font-size:16px;line-height:1.65;margin:0 0 32px;color:#3d5865">Säsongen öppnar nu. Svalla är skärgården samlad: 84 öguider, alla gästhamnar och naturhamnar, alla bastun, krogarna värda att avvika för. Plus en plats för dina egna turer.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 36px">
  <tr>
    <td style="padding:18px 20px;background:#f4f9fb;border-radius:14px;border-left:3px solid #1e5c82">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#0d2a3e;margin-bottom:6px">1. Planera sommarens tur</div>
      <p style="font-size:14.5px;line-height:1.6;margin:0 0 10px;color:#3d5865">Skriv in start och mål. Du får sjöleden, väder längs vägen och vilka krogar, bastun och hamnar som ligger längs rutten.</p>
      <a href="https://svalla.se/planera/ny" style="font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none">Planera en rutt →</a>
    </td>
  </tr>
  <tr><td style="height:12px"></td></tr>
  <tr>
    <td style="padding:18px 20px;background:#f4f9fb;border-radius:14px;border-left:3px solid #1e5c82">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#0d2a3e;margin-bottom:6px">2. Spara öar och hamnar du vill till</div>
      <p style="font-size:14.5px;line-height:1.6;margin:0 0 10px;color:#3d5865">Hjärtat på varje guide bygger upp <em>Min skärgård</em>. En privat lista att skicka till resten av crewet inför helgen.</p>
      <a href="https://svalla.se/oar" style="font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none">Utforska 84 öar →</a>
    </td>
  </tr>
  <tr><td style="height:12px"></td></tr>
  <tr>
    <td style="padding:18px 20px;background:#f4f9fb;border-radius:14px;border-left:3px solid #c96e2a">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:700;color:#0d2a3e;margin-bottom:6px">3. Logga din första tur</div>
      <p style="font-size:14.5px;line-height:1.6;margin:0 0 10px;color:#3d5865">Tryck <em>Logga tur</em> när du lägger ut. GPS:en sköter resten. Distans, tid, hastighet, en ritad rutt på sjökortet. Med tiden en karta över skärgården du faktiskt seglat.</p>
      <a href="https://svalla.se/logga" style="font-size:14px;font-weight:700;color:#c96e2a;text-decoration:none">Så funkar GPS-loggen →</a>
    </td>
  </tr>
</table>

<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;color:#0d2a3e;margin:0 0 14px;letter-spacing:-0.005em">Varför vi byggde Svalla</h2>

<p style="font-size:15px;line-height:1.65;margin:0 0 14px;color:#3d5865">Skärgården är vacker men bökig. Färjor går olika beroende på vecka. Krogar har varierat öppet. Wikströms räkmacka stänger 16:00 i maj, 21:00 i juli.</p>

<p style="font-size:15px;line-height:1.65;margin:0 0 14px;color:#3d5865">Vi samlade allt på ett ställe. Plus Waxholmsbolagets färjetider och SMHI-väder. Ingen tab-jonglering.</p>

<p style="font-size:15px;line-height:1.65;margin:0 0 32px;color:#3d5865">Loggade turer blir en del av kartan. Ju fler som är med, desto bättre blir den.</p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 28px">
  <tr>
    <td style="background:linear-gradient(135deg,#1e5c82,#0a7b8c);border-radius:12px;padding:0">
      <a href="https://svalla.se" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px">Öppna Svalla</a>
    </td>
  </tr>
</table>

<p style="font-size:15px;line-height:1.65;margin:32px 0 0;color:#0d2a3e;text-align:center">Ses därute.<br><span style="color:#6a8a96">från teamet på Svalla</span></p>`
}

/**
 * Välkomstmail för nyhetsbrevsprenumeranter (från /api/subscribe).
 * Skiljer sig från app-välkomsten: mer redaktionell, lyfter nyhetsbrevets värde,
 * inga app-feature-knappar. Prenumeranten har inget konto.
 */
function renderNewsletterWelcomeBody(): string {
  return `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;color:#0d2a3e;margin:0 0 14px;letter-spacing:-0.01em;line-height:1.2">Välkommen till Svallanyheter.</h1>

<p style="font-size:16px;line-height:1.65;margin:0 0 28px;color:#3d5865">Varannan tisdag i inkorgen. Öppna öar just nu, insider-tips och säsongsguider — utan annonser och utan fluff.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;background:#f4f9fb;border-radius:14px;border-left:3px solid #0a7b8c">
  <tr>
    <td style="padding:20px 22px">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:700;color:#0d2a3e;margin-bottom:10px">Det här kan du förvänta dig:</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr><td style="padding:6px 0;font-size:14.5px;color:#3d5865;line-height:1.55">🏝 <strong>Öar som är öppna just nu</strong> — vad som faktiskt är tillgängligt den här månaden</td></tr>
        <tr><td style="padding:6px 0;font-size:14.5px;color:#3d5865;line-height:1.55">⚓ <strong>Hamnar &amp; krogar</strong> — uppdaterat om vad som öppnat, stängt eller ändrat</td></tr>
        <tr><td style="padding:6px 0;font-size:14.5px;color:#3d5865;line-height:1.55">🌤 <strong>Väderfönster</strong> — när vi ser en bra helg skickar vi ett extra tips</td></tr>
        <tr><td style="padding:6px 0;font-size:14.5px;color:#3d5865;line-height:1.55">📌 <strong>Insider-tips</strong> — platser, lägen och timing som inte syns på Google Maps</td></tr>
      </table>
    </td>
  </tr>
</table>

<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:19px;font-weight:700;color:#0d2a3e;margin:0 0 16px">Bra ställen att börja</h2>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px">
  <tr>
    <td style="padding:14px 18px;background:#fff;border-radius:12px;border:1px solid #e2eaf0;margin-bottom:10px">
      <div style="font-size:15px;font-weight:700;color:#0d2a3e;margin-bottom:4px">Öppet just nu →</div>
      <p style="font-size:13.5px;color:#3d5865;margin:0 0 8px;line-height:1.5">Vilka öar som är i högsäsong, vad som är öppet och vad som har begränsad service — uppdateras varje månad.</p>
      <a href="https://svalla.se/oppet-nu" style="font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none">svalla.se/oppet-nu →</a>
    </td>
  </tr>
  <tr><td style="height:10px"></td></tr>
  <tr>
    <td style="padding:14px 18px;background:#fff;border-radius:12px;border:1px solid #e2eaf0">
      <div style="font-size:15px;font-weight:700;color:#0d2a3e;margin-bottom:4px">Hitta din ö →</div>
      <p style="font-size:13.5px;color:#3d5865;margin:0 0 8px;line-height:1.5">120+ öar. Filtrera på barnvänlig, romantisk, bilfri, segling — eller bläddra igenom och låt dig överraskas.</p>
      <a href="https://svalla.se/oar" style="font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none">svalla.se/oar →</a>
    </td>
  </tr>
  <tr><td style="height:10px"></td></tr>
  <tr>
    <td style="padding:14px 18px;background:#fff;border-radius:12px;border:1px solid #e2eaf0">
      <div style="font-size:15px;font-weight:700;color:#0d2a3e;margin-bottom:4px">Säsongsguider →</div>
      <p style="font-size:13.5px;color:#3d5865;margin:0 0 8px;line-height:1.5">Vad som är bäst per säsong — höst, vinter, vår, sommar. Inklusive tips om när turister försvunnit och öarna är som finast.</p>
      <a href="https://svalla.se/sasong" style="font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none">svalla.se/sasong →</a>
    </td>
  </tr>
</table>

<p style="font-size:15px;line-height:1.65;margin:0 0 12px;color:#3d5865">Nästa nummer kommer om två veckor. Tills dess — har du frågor om en specifik ö eller planerar något konkret? Svara på det här mailet. Vi läser allt.</p>

<p style="font-size:15px;line-height:1.65;margin:0 0 28px;color:#0d2a3e">Ses därute.<br><span style="color:#6a8a96">/ Svalla</span></p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto">
  <tr>
    <td style="background:linear-gradient(135deg,#1e5c82,#0a7b8c);border-radius:12px;padding:0">
      <a href="https://svalla.se/oppet-nu" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px">Utforska vad som är öppet nu →</a>
    </td>
  </tr>
</table>`
}

/**
 * Dag-3-mail för nyhetsbrevsprenumeranter — introducerar Thorkel AI-guiden.
 * Skickas automatiskt 3 dagar efter prenumeration via cron-jobbet.
 * Tonen: redaktionell, inte produktdemo. Fokus på värdet, inte funktionen.
 */
function renderDay3NewsletterBody(): string {
  return `<h1 style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#0d2a3e;margin:0 0 14px;letter-spacing:-0.01em;line-height:1.25">Har du träffat Thorkel?</h1>

<p style="font-size:16px;line-height:1.65;margin:0 0 26px;color:#3d5865">För tre dagar sedan prenumererade du på Svallanyheter. Det här mailet finns för att tipsa om det vi faktiskt är mest stolta över.</p>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 32px;background:linear-gradient(135deg,#0d3a5c 0%,#0a7b8c 100%);border-radius:16px;overflow:hidden">
  <tr>
    <td style="padding:24px 24px 20px">
      <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.6);margin-bottom:8px">Möt Thorkel</div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;color:#fff;margin-bottom:10px;line-height:1.3">Din personliga skärgårdsguide — som kan svara på allt</div>
      <p style="font-size:14px;color:rgba(255,255,255,0.82);margin:0 0 18px;line-height:1.6">Thorkel är vår AI-guide. Ställ en fråga — var kräftskivan är bäst, hur man tar sig till Utö utan bil, vad man bör ha ombord för en nattsejlats — och du får ett konkret svar på sekunder.</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;margin-bottom:6px;display:block">
            <span style="font-size:13.5px;color:rgba(255,255,255,0.9)">💬 <em>"Vilken ö är bäst för en nybörjare med barn?"</em></span>
          </td>
        </tr>
        <tr><td style="height:6px"></td></tr>
        <tr>
          <td style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;display:block">
            <span style="font-size:13.5px;color:rgba(255,255,255,0.9)">💬 <em>"Hur anmäler man man överbord?"</em></span>
          </td>
        </tr>
        <tr><td style="height:6px"></td></tr>
        <tr>
          <td style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;display:block">
            <span style="font-size:13.5px;color:rgba(255,255,255,0.9)">💬 <em>"Hummerpremären i Bohuslän — när och var?"</em></span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<h2 style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#0d2a3e;margin:0 0 14px">Varför det funkar</h2>

<p style="font-size:15px;line-height:1.65;margin:0 0 14px;color:#3d5865">Google ger dig listor. Thorkel ger dig svar. Han känner till alla öar i Stockholms skärgård, Bohuslän, Gotland och Höga Kusten — inklusive färjelägen, säsongsöppet och praktiska tips som inte finns på någon officiell sida.</p>

<p style="font-size:15px;line-height:1.65;margin:0 0 28px;color:#3d5865">Det är ingen chatbot som ber dig klicka vidare. Det är en guide som faktiskt svarar.</p>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 32px">
  <tr>
    <td style="background:linear-gradient(135deg,#1e5c82,#0a7b8c);border-radius:12px;padding:0">
      <a href="https://svalla.se/guide" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px">Prata med Thorkel →</a>
    </td>
  </tr>
</table>

<p style="font-size:13px;line-height:1.65;margin:0;color:#6a8a96;text-align:center">Nästa Svallanyheter kommer varannan tisdag.<br>Svara på det här mailet om du har frågor.</p>`
}

/** Skicka mail via Resend API */
export async function sendEmail(opts: {
  template: EmailTemplate
  to: string
  vars?: Record<string, string | number | undefined>
}): Promise<{ ok: boolean; error?: string; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY saknas' }

  // Respektera unsubscribes — om mottagaren klickat "Avregistrera"
  // tidigare så skipa utskick. Returnera ok:true för att inte trigga
  // retry-loops i kod som anropar oss. Fail-open vid DB-fel (logga +
  // skicka ändå) så ett tillfälligt Supabase-problem inte blockerar
  // alla mail.
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
        if (rows.length > 0) {
          return { ok: true, error: 'unsubscribed' }
        }
      }
    }
  } catch {
    // fail-open: skicka ändå
  }

  // Läs mall — frontmatter används för subject + preheader oavsett om
  // body kommer från markdown eller hardcoded HTML.
  const file = TEMPLATE_FILES[opts.template]
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

  // Hardkodade HTML-mallar (card-layout). Övriga templates kör markdown.
  let htmlBody: string
  if (opts.template === 'welcome') {
    const firstName = String(opts.vars?.first_name ?? 'där')
    htmlBody = renderWelcomeBody(firstName)
  } else if (opts.template === 'newsletter_welcome') {
    htmlBody = renderNewsletterWelcomeBody()
  } else if (opts.template === 'day3_newsletter') {
    htmlBody = renderDay3NewsletterBody()
  } else {
    const bodyFinal = substitute(body, vars)
    htmlBody = markdownToHtml(bodyFinal)
  }
  const html = substitute(wrapEmail(htmlBody, meta.preheader), vars)

  const from = process.env.EMAIL_FROM || meta.from || 'Svalla <info@svalla.se>'

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

— Teamet på Svalla`,

  day7: `---
subject_options:
  - "En ö du förmodligen inte tänkt på"
preheader: Det är inte Sandhamn. Inte Fjäderholmarna heller.
---
Hej {{first_name}},

Det är en vecka sedan du prenumererade. Har du hunnit planera något, eller är det fortfarande ett vagt "i sommar"-projekt?

De flesta börjar med Sandhamn eller Fjäderholmarna. Inget fel med det. Men om du vill ha något som inte är fullt av turister, som faktiskt är enkelt att ta sig till och som har mat som håller — prova Grinda.

Det är ungefär 2,5 timmar med Waxholmsbåten från Strömkajen. Naturreservat, vandringsleder, klippbad och ett värdshus som har ett av de bättre köken i skärgården. Det fullbokas inte till tusen på en dag i juli.

[Läs Grinda-guiden →](https://svalla.se/o/grinda)

Om du redan vet vart du ska och bara behöver hjälp att planera:

[Planera turen →](https://svalla.se/utflykt)

Nästa brev från oss kommer varannan tisdag. Hör av dig om du har frågor om en specifik ö — svara bara på det här mailet.

/ Svalla`,

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

— Teamet på Svalla`,

  season_close: `---
subject_options:
  - "Säsongen är slut — du besökte {{visited_count}} öar"
preheader: Året i siffror.
---
# Tack för säsongen, {{first_name}}!
Du loggade {{trip_count}} turer och besökte {{visited_count}} öar.

[Se din wrapped →](https://svalla.se/wrapped/{{username}}/2026)

— Teamet på Svalla`,

  newsletter_welcome: `---
subject_options:
  - "Välkommen till Svallanyheter — din första öinsider"
preheader: Varannan tisdag i inkorgen. Öppna öar, tips och skärgårdsinsider.
---
Välkommen till Svallanyheter!
`,

  day3_newsletter: `---
subject_options:
  - "Har du träffat Thorkel? Din personliga skärgårdsguide"
preheader: Han kan svara på allt — från kräftskiva till hur man anmäler man överbord.
---
Dag-3-mail för nyhetsbrevsprenumeranter.
`,

  weather_tip: `---
subject_options:
  - "{{temp}}° i skärgården i helgen — dags att planera"
preheader: Prognosen ser bra ut. Tre öar att fundera på.
from: "Svalla <hej@svalla.se>"
---
# Skärgårdsväder i helgen

Hej {{first_name}}! Prognosen för {{best_day}} ser bra ut: **{{temp}}°** och bara **{{wind}} m/s vind**. Det är skärgårdsväder.

Tre öar att fundera på:

## Grinda

Naturreservat mitt i skärgården. Vandringsleder, klippbad och ett av skärgårdens bästa värdshus. Nås med Waxholmsbåten på ungefär 2 timmar från Strömkajen.

[Grinda-guiden →](https://svalla.se/o/grinda)

## Sandhamn

Seglarcentrum med bakeri, klippor mot öppet hav och Sandhamns Värdshus. Boka bord innan du åker.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)

## Finnhamn

STF-anläggning med naturreservat, fri camping och bra kajaktillgång. Lugnt och välskött.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)

---

[Planera helgturen →](https://svalla.se/planera)

— Svalla`,
}
