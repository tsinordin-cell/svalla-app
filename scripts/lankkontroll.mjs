#!/usr/bin/env node
// lankkontroll.mjs — veckovis kontroll: alla sidor och klick på svalla.se ska leda någonstans.
//
// Bakgrund (kort 64598daf, Tom 2026-08-24): vi har återkommande sidor som inte leder
// någonstans, och HTTP-status räcker inte — Next.js svarar 200 för trasiga sidor.
// Tre feltyper, bara den första syns i statuskoden:
//   ÄKTA 404        servern svarar 404 (eller 5xx).
//   SOFT-404        200 men sidan visar 404-innehållet ("Den här sidan finns inte").
//   ÅTERVÄNDSGRÄND  200 med eget innehåll men ingen väg vidare: lite text + nästan inga
//                   interna länkar. En välgjord tom sida (rubrik + förklaring + minst en
//                   väg vidare) flaggas ALDRIG.
//
// Sidor hämtas från tre håll: sitemap.xml, en crawl från startsidan (2 nivåer) och en
// korsning mot datafilerna (island-data, bohuslan-data, guides-data) — sidor som finns i
// datan men saknar route hittas aldrig av en crawler.
//
// RENDERINGSPASS: /planera, /feed, /spara, /upptack m.fl. är tomma i serversvaret och
// fylls i webbläsaren. Sidor med tunn server-HTML renderas därför i Chromium (playwright-
// core) innan de får kallas återvändsgränd. Saknas playwright-core hoppas passet över och
// rapporten säger det — den ljuger inte om att den tittat.
//
// Rapporten skrivs LÖPANDE till --ut (standard: lankkontroll-ÅÅÅÅMMDD.md) så ett avbrott
// inte raderar allt, och slutar med en statusrad KOMPLETT eller AVBRUTEN. JSON med samma
// innehåll skrivs bredvid (.json) för jämförelse mot förra veckan (--forra=fil.json).
//
// KÖR
//   node scripts/lankkontroll.mjs                       # mot https://svalla.se
//   node scripts/lankkontroll.mjs --forra=lankkontroll-20260913.json
//   node scripts/lankkontroll.mjs --max=200             # snabbtest
//   node scripts/lankkontroll.mjs --utan-rendering      # hoppa över Chromium
//
// Inga beroenden utöver node för själva kontrollen. Renderingspasset vill ha playwright-core
// (npm i --no-save playwright-core, eller LANKKONTROLL_PW=/…/node_modules/playwright-core)
// och en Chromium (PLAYWRIGHT_CHROMIUM=/sökväg/till/chrome om den inte hittas själv).
//
// VECKOJOBBET (schemalagt 2026-09-13, Toms beslut): måndagar 05:00 UTC i en Claude-session
// som klonar repot, kör skriptet, sparar rapporten i tabellen lankkontroll_rapporter och
// skriver sammanfattningen på kort 64598daf. MÄTT 2026-09-13: 2 789 sidor, 110 renderade,
// ~10 min. Baslinje: 1 äkta 404 (/nyborjarguider), 3 sidor utan väg vidare (/faq, /farjor,
// /integritetspolicy).
//
// Ändrar ingen kod. Rapporterar bara.
import fs from 'node:fs'
import path from 'node:path'

const BAS = process.env.LANKKONTROLL_BAS ?? 'https://svalla.se'
const arg = (n, d) => { const a = process.argv.find(x => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : d }
const MAX = Number(arg('max', 0)) || Infinity
const UTAN_RENDERING = process.argv.includes('--utan-rendering')
const DATUM = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const UT = arg('ut', `lankkontroll-${DATUM}.md`)
const FORRA = arg('forra', null)
const SAMTIDIGA = 8
const UA = 'SvallaLankkontroll/1.0 (+https://svalla.se; veckorutin)'

const SOFT404 = [/Den här sidan finns inte/i, /Borttappad till havs/i, /Sidan kunde inte hittas/i]
/** Återvändsgränd = text under TUNN_TEXT ELLER ingen väg vidare. En "väg vidare" är en
 *  intern länk som inte är logotypen (/) eller cookie-bannerns /integritetspolicy, eller
 *  (i renderad DOM) en knapp som inte hör till cookie-bannern/feedback-widgeten. */
const TUNN_TEXT = 250
const LANK_BRUS = new Set(['/', '/integritetspolicy'])
const KNAPP_BRUS = /^(Acceptera alla|Endast nödvändiga|Skicka feedback.*|Öppna meny|Stäng)$/i
const vagarVidare = (lankar, knappar = []) => lankar.filter(l => !LANK_BRUS.has(l)).length + knappar.filter(k => !KNAPP_BRUS.test(k)).length
/** Sidor vars server-HTML har mindre text än så här skickas till renderingspasset. */
const RENDERA_UNDER = 400

// ── Rapport, skriven löpande ─────────────────────────────────────────────────
const rader = []
const skriv = (s = '') => { rader.push(s); fs.writeFileSync(UT, rader.join('\n') + '\n') }
skriv(`# Länkkontroll svalla.se — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC`)
skriv(`Status: PÅGÅR`)
skriv('')
// Kraschar skriptet ska rapporten säga det — inte stå kvar på PÅGÅR för alltid.
const avbryt = (e) => { rader[1] = `Status: AVBRUTEN — ${String(e).slice(0, 100)}`; fs.writeFileSync(UT, rader.join('\n') + '\n'); console.error(rader[1]); console.error(e?.stack ?? e); process.exit(1) }
process.on('uncaughtException', avbryt)
process.on('unhandledRejection', avbryt)

// ── 1. Källor ────────────────────────────────────────────────────────────────
const text = (html) => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<template[\s\S]*?<\/template>/gi, ' ')
  .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

const internaLankar = (html) => {
  const ut = new Set()
  for (const m of html.matchAll(/href=["']([^"'#?]+)(?:[?#][^"']*)?["']/g)) {
    let h = m[1]
    if (h.startsWith(BAS)) h = h.slice(BAS.length)
    if (!h.startsWith('/') || h.startsWith('//')) continue
    if (/\.(png|jpe?g|svg|webp|ico|css|js|json|xml|txt|pdf|gpx|woff2?)$/i.test(h)) continue
    if (h.startsWith('/_next') || h.startsWith('/api/')) continue
    ut.add(h.replace(/\/$/, '') || '/')
  }
  return [...ut]
}

async function hamta(url, { redirect = 'follow' } = {}) {
  const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 30000)
  try {
    const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'text/html' }, redirect, signal: ctl.signal })
    const html = await r.text()
    return { status: r.status, html, url: r.url }
  } catch (e) {
    return { status: 0, html: '', fel: String(e).slice(0, 80) }
  } finally { clearTimeout(t) }
}

skriv('## Källor')
// Sitemap (inkl. index)
const sitemapUrls = new Set()
async function lasSitemap(u, djup = 0) {
  const r = await hamta(u)
  if (r.status !== 200) { skriv(`- sitemap ${u}: HTTP ${r.status}`); return }
  const locs = [...r.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
  const underSitemaps = locs.filter(l => /sitemap.*\.xml$/i.test(l))
  for (const l of locs) if (!underSitemaps.includes(l)) sitemapUrls.add(l)
  if (djup < 2) for (const s of underSitemaps) await lasSitemap(s, djup + 1)
}
await lasSitemap(`${BAS}/sitemap.xml`)
skriv(`- sitemap.xml: ${sitemapUrls.size} URL:er`)

// Datafiler → sidor som SKA finnas
const dataSidor = new Map()  // sökväg → källfil
const lasSlugs = (fil, re, mall) => {
  if (!fs.existsSync(fil)) { skriv(`- ${fil}: saknas i klonen, hoppar över`); return 0 }
  const s = fs.readFileSync(fil, 'utf8'); let n = 0
  for (const m of s.matchAll(re)) { dataSidor.set(mall(m[1]), fil); n++ }
  return n
}
const nO = lasSlugs('src/app/o/island-data.ts', /^ {4}slug: '([a-z0-9-]+)'/gm, s => `/o/${s}`)
const nB = lasSlugs('src/app/o/bohuslan-data.ts', /^ {4}slug: '([a-z0-9-]+)'/gm, s => `/o/${s}`)
const nG = lasSlugs('src/app/guider/guides-data.ts', /slug: "([a-z0-9-]+)"/g, s => `/guider/${s}`)
skriv(`- datafiler: ${nO} öar (island-data), ${nB} (bohuslan-data), ${nG} guider → ${dataSidor.size} sidor som ska finnas`)

// Crawl från startsidan, 2 nivåer
const crawl = new Map()  // sökväg → första sida som länkade dit
const startR = await hamta(BAS + '/')
const niva1 = internaLankar(startR.html)
for (const l of niva1) crawl.set(l, '/')
for (const l of niva1.slice(0, 400)) {
  const r = await hamta(BAS + l)
  if (r.status === 200) for (const l2 of internaLankar(r.html)) if (!crawl.has(l2)) crawl.set(l2, l)
}
skriv(`- crawl från /: ${crawl.size} unika sökvägar (2 nivåer)`)

// Sammanslagen lista
const alla = new Map()  // sökväg → { kallor: [], lankadFran }
const lagg = (p, kalla, fran) => {
  const s = (p.startsWith('http') ? p.slice(BAS.length) : p).replace(/\/$/, '') || '/'
  if (!alla.has(s)) alla.set(s, { kallor: new Set(), lankadFran: fran ?? null })
  alla.get(s).kallor.add(kalla)
}
for (const u of sitemapUrls) if (u.startsWith(BAS)) lagg(u, 'sitemap')
for (const [p, fil] of dataSidor) lagg(p, `data:${path.basename(fil)}`)
for (const [p, fran] of crawl) lagg(p, 'crawl', fran)
let lista = [...alla.keys()].sort()
if (lista.length > MAX) lista = lista.slice(0, MAX)
skriv(`- totalt att kontrollera: ${lista.length}`)
skriv('')

// ── 2. Kontroll, serversvar ──────────────────────────────────────────────────
const resultat = new Map()
let klara = 0
async function kontrollera(p) {
  const r = await hamta(BAS + p)
  const t = text(r.html)
  const lankar = internaLankar(r.html).filter(l => l !== p)
  let typ = 'ok'
  if (r.status === 0) typ = 'natverksfel'
  else if (r.status >= 500) typ = '5xx'
  else if (r.status === 404 || r.status === 410) typ = '404'
  else if (r.status >= 400) typ = `${r.status}`
  else if (SOFT404.some(re => re.test(t))) typ = 'soft404'
  // Tunn text ELLER ingen väg vidare i serversvaret → rendera innan något sägs. Många sidor
  // (t.ex. /faq, /ta-dig-till/*) har navigation och knappar som bara finns efter hydrering.
  else if (t.length < RENDERA_UNDER || vagarVidare(lankar) < 1) typ = 'behover-rendering'
  resultat.set(p, { status: r.status, typ, textLangd: t.length, lankar: lankar.length, fel: r.fel })
  klara++
  if (klara % 250 === 0) { skriv(`<!-- ${klara}/${lista.length} kontrollerade -->`) }
}
const ko = [...lista]
await Promise.all(Array.from({ length: SAMTIDIGA }, async () => { while (ko.length) await kontrollera(ko.shift()) }))

// ── 3. Renderingspass för tunna serversvar ───────────────────────────────────
const attRendera = [...resultat].filter(([, r]) => r.typ === 'behover-rendering').map(([p]) => p)
let renderingsStatus = 'ej behövd'
const proxy = process.env.HTTPS_PROXY
skriv(`<!-- serversvar klara: ${resultat.size}/${lista.length}; renderingspass: ${attRendera.length} sidor -->`)
if (attRendera.length && UTAN_RENDERING) {
  renderingsStatus = `HOPPAD ÖVER (--utan-rendering) — ${attRendera.length} sidor kunde inte bedömas`
  for (const p of attRendera) resultat.get(p).typ = 'obedomd'
} else if (attRendera.length) {
  // playwright-core: från node_modules, eller från en katalog utanför repot via
  // LANKKONTROLL_PW=/sökväg/till/node_modules/playwright-core (veckojobbet kör i en
  // färsk klon utan npm ci — bara node behövs för själva kontrollen).
  let pw = null
  for (const m of ['playwright-core', 'playwright', process.env.LANKKONTROLL_PW].filter(Boolean)) {
    try { pw = await import(m.startsWith('/') ? 'file://' + (m.endsWith('.js') ? m : m + '/index.mjs') : m); break } catch { pw = null }
  }
  let browser = null
  if (pw) {
    const exe = process.env.PLAYWRIGHT_CHROMIUM ?? undefined
    // Bakom en egress-proxy (HTTPS_PROXY, t.ex. Anthropic-containern) måste Chromium gå via
    // den och acceptera dess CA. Proxyns TLS-terminering klarar inte Chromiums post-kvant-
    // ClientHello (MÄTT 2026-09-13: ERR_CONNECTION_RESET på varje sida) — lägg policyn
    //   echo '{"PostQuantumKeyAgreementEnabled":false}' > /etc/chromium/policies/managed/pq.json
    // före körning; flaggor räcker inte i Chromium 141.
    try { browser = await pw.chromium.launch({ headless: true, ...(exe ? { executablePath: exe } : {}), ...(proxy ? { proxy: { server: proxy }, args: ['--ignore-certificate-errors'] } : {}) }) }
    catch (e) { renderingsStatus = `HOPPAD ÖVER — Chromium kunde inte startas (${String(e).slice(0, 80)}) — ${attRendera.length} sidor kunde inte bedömas` }
  } else {
    renderingsStatus = `HOPPAD ÖVER — playwright-core saknas (npm i --no-save playwright-core) — ${attRendera.length} sidor kunde inte bedömas`
  }
  if (!browser) {
    for (const p of attRendera) resultat.get(p).typ = 'obedomd'
  } else {
    const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 390, height: 844 }, ignoreHTTPSErrors: !!proxy })
    let n = 0
    const rendera = async (p) => {
      const page = await ctx.newPage()
      try {
        // 'domcontentloaded' + vänta på att texten fyllts i, inte 'load'/'networkidle':
        // sidor med bildproxy som svarar 502 sent, analytics och polling blir aldrig
        // färdigladdade och tog 30 s var (MÄTT 2026-09-13: 105 sidor → 40 min). Hinner
        // sidan inte på 20 s bedöms det som syns ändå.
        try { await page.goto(BAS + p, { waitUntil: 'domcontentloaded', timeout: 20000 }) } catch (e) { if (!/Timeout/i.test(String(e))) throw e }
        await page.waitForFunction((min) => (document.body?.innerText ?? '').length >= min, RENDERA_UNDER, { timeout: 15000 }).catch(() => {})
        await page.waitForTimeout(2000)
        const t = (await page.evaluate(() => document.body?.innerText ?? '')).replace(/\s+/g, ' ').trim()
        const { lankar, knappar } = await page.evaluate(() => ({
          lankar: [...new Set([...document.querySelectorAll('a[href]')].map(a => (a.getAttribute('href') || '').replace(/[?#].*$/, '').replace(/\/$/, '') || '/').filter(h => h.startsWith('/') && !h.startsWith('//')))],
          knappar: [...document.querySelectorAll('button, [role="button"]')].map(b => (b.getAttribute('aria-label') || b.textContent || '').replace(/\s+/g, ' ').trim()).filter(Boolean),
        }))
        const vagar = vagarVidare(lankar, knappar)
        const r = resultat.get(p)
        r.renderad = true; r.textLangd = t.length; r.lankar = lankar.length; r.vagar = vagar
        r.typ = SOFT404.some(re => re.test(t)) ? 'soft404' : (t.length < TUNN_TEXT || vagar < 1) ? 'atervandsgrand' : 'ok'
      } catch (e) {
        const r = resultat.get(p); r.typ = 'obedomd'; r.fel = String(e).slice(0, 80)
      } finally { await page.close() }
      n++
      if (n % 25 === 0) skriv(`<!-- ${n}/${attRendera.length} renderade -->`)
    }
    const rko = [...attRendera]
    await Promise.all(Array.from({ length: 3 }, async () => { while (rko.length) await rendera(rko.shift()) }))
    await browser.close()
    renderingsStatus = `${n} sidor renderade i Chromium`
  }
}

// ── 4. Rapport ───────────────────────────────────────────────────────────────
const grupp = (typ) => [...resultat].filter(([, r]) => r.typ === typ).map(([p, r]) => ({ p, ...r, kallor: [...alla.get(p).kallor], fran: alla.get(p).lankadFran }))
const G = { '404': grupp('404'), '5xx': grupp('5xx'), soft404: grupp('soft404'), atervandsgrand: grupp('atervandsgrand'), natverksfel: grupp('natverksfel'), obedomd: grupp('obedomd') }
const ovriga = [...resultat].filter(([, r]) => /^\d{3}$/.test(r.typ) && r.typ !== '404').map(([p, r]) => ({ p, ...r }))
const ok = [...resultat].filter(([, r]) => r.typ === 'ok').length
const saknadeDataSidor = [...dataSidor.keys()].filter(p => resultat.has(p) && ['404', 'soft404'].includes(resultat.get(p).typ))

skriv('## Utfall')
skriv(`- OK: ${ok}`)
skriv(`- Äkta 404: ${G['404'].length}`)
skriv(`- 5xx: ${G['5xx'].length}`)
skriv(`- Soft-404: ${G.soft404.length}`)
skriv(`- Återvändsgränd: ${G.atervandsgrand.length}`)
skriv(`- Övriga statuskoder: ${ovriga.length}`)
skriv(`- Nätverksfel: ${G.natverksfel.length}`)
skriv(`- Obedömda (renderingspass saknades/fallerade): ${G.obedomd.length}`)
skriv(`- Renderingspass: ${renderingsStatus}`)
skriv(`- Datafiler → sidor som saknas: ${saknadeDataSidor.length}${saknadeDataSidor.length ? ' — ' + saknadeDataSidor.join(', ') : ''}`)
skriv('')
const skrivGrupp = (rubrik, lista) => {
  if (!lista.length) return
  skriv(`## ${rubrik} (${lista.length})`)
  for (const r of lista) skriv(`- ${r.p} — HTTP ${r.status}${r.renderad ? `, renderad: ${r.textLangd} tecken, ${r.vagar} väg${r.vagar === 1 ? '' : 'ar'} vidare` : ''}${r.fran ? `, länkad från ${r.fran}` : ''} [${r.kallor.join(', ')}]${r.fel ? ` (${r.fel.replace(/\s+/g, ' ')})` : ''}`)
  skriv('')
}
skrivGrupp('Äkta 404', G['404']); skrivGrupp('5xx', G['5xx']); skrivGrupp('Soft-404', G.soft404)
skrivGrupp('Återvändsgränd — lite text och ingen väg vidare', G.atervandsgrand)
if (ovriga.length) { skriv(`## Övriga statuskoder (${ovriga.length})`); for (const r of ovriga) skriv(`- ${r.p} — HTTP ${r.status}`); skriv('') }
skrivGrupp('Nätverksfel (kör om)', G.natverksfel); skrivGrupp('Obedömda', G.obedomd)

// Jämförelse mot förra körningen
const json = { datum: DATUM, bas: BAS, antal: lista.length, ok, grupper: Object.fromEntries(Object.entries(G).map(([k, v]) => [k, v.map(r => r.p)])), renderingsStatus }
if (FORRA && fs.existsSync(FORRA)) {
  const f = JSON.parse(fs.readFileSync(FORRA, 'utf8'))
  skriv(`## Jämfört med ${f.datum}`)
  for (const k of Object.keys(G)) {
    const nu = new Set(json.grupper[k]), da = new Set(f.grupper?.[k] ?? [])
    const nya = [...nu].filter(x => !da.has(x)), borta = [...da].filter(x => !nu.has(x))
    skriv(`- ${k}: ${da.size} → ${nu.size} (nya ${nya.length}, borta ${borta.length})${nya.length ? ' nya: ' + nya.slice(0, 10).join(', ') : ''}`)
  }
  skriv('')
} else {
  skriv(`## Jämfört med förra veckan`); skriv(FORRA ? `- ${FORRA} hittades inte` : '- ingen tidigare körning angiven (--forra=fil.json) — detta är baslinjen'); skriv('')
}
fs.writeFileSync(UT.replace(/\.md$/, '.json'), JSON.stringify(json, null, 1))

rader[1] = `Status: KOMPLETT — ${lista.length} sidor, ${G['404'].length} äkta 404, ${G.soft404.length} soft-404, ${G.atervandsgrand.length} återvändsgränder, ${G.obedomd.length} obedömda`
// Lägesmarkörerna (<!-- n/m kontrollerade -->) var till för ett avbrott — bort i den färdiga rapporten.
const fardig = rader.filter(r => !/^<!-- .*(kontrollerade|renderade|renderingspass).* -->$/.test(r))
fs.writeFileSync(UT, fardig.join('\n') + '\n')
console.log(rader[1]); console.log('rapport:', UT)
