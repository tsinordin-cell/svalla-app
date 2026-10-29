#!/usr/bin/env node
/**
 * faktaregister.mjs — Utvinnarens underlag och Vaktens mätinstrument
 * för faktagranskningen (docs/faktagranskning/README.md).
 *
 * Läser ödatan med TypeScript-parsern, inte med regex, så att VARJE fält i en
 * ö-post kommer med: text, siffror, flaggor, månader, koordinater. Varje värde
 * får fil:rad, fältets sökväg (t.ex. getting_there[1].desc) och de KÄLLA-rader
 * som står närmast ovanför fältet eller ovanför det objekt fältet ligger i.
 *
 * Användning:
 *   node scripts/faktaregister.mjs --baslinje [--platser fil.json]
 *       Skriver docs/faktagranskning/baslinje.json. Vägrar skriva över en
 *       befintlig baslinje — den ändras aldrig i efterhand (DEL 7).
 *   node scripts/faktaregister.mjs --register slug1,slug2 [--platser fil.json] > rå.tsv
 *       Rått register: en rad per mening eller datavärde, med fil:rad, fält,
 *       befintlig källa. Utvinnaren bryter sedan ner raderna atomärt.
 *   node scripts/faktaregister.mjs --mat slug1,slug2 [--platser fil.json]
 *       Mäter nuläget mot baslinjen enligt DEL 7 och skriver ut avvikelser.
 *       Avslutar med kod 1 om någon sida har blivit tunnare.
 *
 * --platser pekar på en export av tabellen restaurants (slug, name, type,
 * island, latitude, longitude, ord, hidden). Utan den räknas platserna inte.
 *
 * Mätenheter (MÄTT, mekaniskt — inte samma sak som Utvinnarens atomära
 * påståenden):
 *   ord          ord i synlig text (strängar i fält som visas för besökaren)
 *   enheter      en mening i en textsträng, eller ett datavärde (siffra,
 *                flagga, månad, koordinat) = en enhet
 *   medKalla     enheter som har minst en KÄLLA-rad i sin kedja
 *   uppskattning enheter vars kedja har en UPPSKATTNING-rad
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const rel = (p) => relative(ROOT, p)
const DATAFILER = [
  { fil: `${ROOT}/src/app/o/island-data.ts`, variabel: 'ISLANDS' },
  { fil: `${ROOT}/src/app/o/bohuslan-data.ts`, variabel: 'BOHUSLAN_ISLANDS' },
]
const BASLINJE = `${ROOT}/docs/faktagranskning/baslinje.json`

// Fält som inte visas för besökaren eller bara är nycklar/ikoner.
const OSYNLIGA = new Set(['slug', 'related', 'emoji', 'icon', 'region', 'slag'])
const OSYNLIGA_SOKVAGAR = [/^blogLinks\[\d+\]\.slug$/, /^tags\[\d+\]$/, /^facts_provenance\./]

// ── Hjälpare ────────────────────────────────────────────────────────────────
function delaMeningar(text) {
  const t = text.replace(/\s+/g, ' ').trim()
  if (!t) return []
  return t.split(/(?<=[.!?])\s+(?=[A-ZÅÄÖÉ0-9"„“(])/u).map((s) => s.trim()).filter(Boolean)
}
const raknaOrd = (text) => (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’\-–:.,/]*/gu) || []).length

function propNamn(node) {
  if (!node.name) return null
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name)) return node.name.text
  return node.name.getText()
}

function kommentarer(sf, node) {
  const text = sf.getFullText()
  const ranges = ts.getLeadingCommentRanges(text, node.getFullStart()) || []
  return ranges.map((r) => text.slice(r.pos, r.end))
}

function kallaRader(sf, node) {
  const ut = []
  for (const k of kommentarer(sf, node)) {
    for (const rad of k.split('\n')) {
      const r = rad.replace(/^\s*(\/\/|\/\*+|\*)\s?/, '').replace(/\*\/\s*$/, '').trim()
      if (/KÄLLA\s*:/i.test(r) || /UPPSKATTNING\s*:/i.test(r) || /Rättad|Kontrollant/i.test(r)) ut.push(r)
    }
  }
  return ut
}

function strangvarde(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isTemplateExpression(node)) return node.getText().slice(1, -1)
  return null
}

// ── Läs ödatan ──────────────────────────────────────────────────────────────
export function lasOar() {
  const oar = []
  for (const { fil, variabel } of DATAFILER) {
    const kod = readFileSync(fil, 'utf8')
    const sf = ts.createSourceFile(fil, kod, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    let arr = null
    sf.forEachChild(function hitta(n) {
      if (ts.isVariableDeclaration(n) && n.name.getText() === variabel && n.initializer && ts.isArrayLiteralExpression(n.initializer)) arr = n.initializer
      n.forEachChild(hitta)
    })
    if (!arr) throw new Error(`Hittar inte ${variabel} i ${rel(fil)}`)
    for (const el of arr.elements) {
      if (!ts.isObjectLiteralExpression(el)) continue
      const o = { fil: rel(fil), rad: sf.getLineAndCharacterOfPosition(el.getStart()).line + 1, varden: [] }
      const besok = (node, sokvag, kedja) => {
        const egna = kallaRader(sf, node)
        const nyKedja = egna.length ? [...kedja, ...egna] : kedja
        if (ts.isObjectLiteralExpression(node)) {
          for (const p of node.properties) {
            if (!ts.isPropertyAssignment(p)) continue
            const namn = propNamn(p)
            const pk = kallaRader(sf, p)
            besok(p.initializer, sokvag ? `${sokvag}.${namn}` : namn, pk.length ? [...nyKedja, ...pk] : nyKedja)
          }
          return
        }
        if (ts.isArrayLiteralExpression(node)) {
          node.elements.forEach((e, i) => besok(e, `${sokvag}[${i}]`, nyKedja))
          return
        }
        if (ts.isAsExpression(node) || ts.isParenthesizedExpression(node)) return besok(node.expression, sokvag, nyKedja)
        const rad = sf.getLineAndCharacterOfPosition(node.getStart()).line + 1
        const s = strangvarde(node)
        let typ, varde
        if (s !== null) { typ = 'text'; varde = s }
        else if (ts.isNumericLiteral(node) || ts.isPrefixUnaryExpression(node)) { typ = 'tal'; varde = node.getText() }
        else if (node.kind === ts.SyntaxKind.TrueKeyword || node.kind === ts.SyntaxKind.FalseKeyword) { typ = 'flagga'; varde = node.getText() }
        else { typ = 'uttryck'; varde = node.getText().slice(0, 200) }
        o.varden.push({ sokvag, rad, typ, varde, kedja: nyKedja })
      }
      besok(el, '', [])
      const hamta = (k) => o.varden.find((v) => v.sokvag === k)?.varde
      o.slug = hamta('slug')
      o.namn = hamta('name')
      o.region = hamta('region')
      oar.push(o)
    }
  }
  return oar
}

const arSynlig = (v) => {
  const topp = v.sokvag.split(/[.[]/)[0]
  if (OSYNLIGA.has(topp)) return false
  const sista = v.sokvag.split('.').pop().replace(/\[\d+\]$/, '')
  if (OSYNLIGA.has(sista)) return false
  if (OSYNLIGA_SOKVAGAR.some((r) => r.test(v.sokvag))) return false
  if (/(Url|url|booking_url)$/.test(sista)) return false
  return true
}

// Enheter: en per mening i text, en per datavärde.
export function enheterFor(o) {
  const ut = []
  for (const v of o.varden) {
    if (!arSynlig(v) && !/^(lat|lng)$/.test(v.sokvag)) continue
    const harKalla = v.kedja.some((k) => /KÄLLA\s*:/i.test(k))
    const uppsk = v.kedja.some((k) => /UPPSKATTNING\s*:/i.test(k))
    const sektion = v.sokvag.split(/[.[]/)[0]
    if (v.typ === 'text' && !/^seasonal\.months\[/.test(v.sokvag)) {
      const meningar = delaMeningar(v.varde)
      meningar.forEach((m, i) => ut.push({ ...v, sektion, mening: i, text: m, ord: raknaOrd(m), harKalla, uppsk }))
    } else {
      ut.push({ ...v, sektion, mening: 0, text: String(v.varde), ord: 0, harKalla, uppsk })
    }
  }
  return ut
}

// ── Kringdata (moduler som importeras direkt) ───────────────────────────────
async function kringdata() {
  const { tsImport } = await import('tsx/esm/api')
  // tsx kan lämna exporterna under default när modulen tolkas som CJS.
  const imp = async (p) => { const m = await tsImport(`${ROOT}/${p}`, import.meta.url); return m.default && typeof m.default === 'object' ? { ...m.default, ...m } : m }
  const scb = await imp('src/app/o/scb-oar.generated.ts')
  const obilder = await imp('src/app/o/obilder.generated.ts')
  const hantv = await imp('src/app/o/hantverkare-data.ts')
  const koord = await imp('src/lib/islandCoords.ts')
  return { SCB: scb.SCB_OAR, OBILDER: obilder.OBILDER, HANTVERKARE: hantv.HANTVERKARE, getH: hantv.getHantverkareForIsland, KOORD: koord.ISLAND_COORD_MAP }
}

function hav(lat1, lng1, lat2, lng2) {
  const R = 6371, dLat = ((lat2 - lat1) * Math.PI) / 180, dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Samma urval som src/lib/islandPlaces.ts: ö-fältet = öns namn, eller inom radie + 2 km.
function platserForO(o, platser, KOORD) {
  if (!platser) return null
  const c = KOORD[o.slug]
  const lat = Number(o.varden.find((v) => v.sokvag === 'lat')?.varde ?? c?.lat)
  const lng = Number(o.varden.find((v) => v.sokvag === 'lng')?.varde ?? c?.lng)
  const reach = (c?.radiusKm ?? 3) + 2
  return platser.filter((p) => {
    if (p.hidden) return false
    if (p.island && o.namn && p.island.toLowerCase() === o.namn.toLowerCase()) return true
    if (!Number.isFinite(lat) || p.latitude == null) return false
    return hav(lat, lng, p.latitude, p.longitude) <= reach
  })
}

// ── Mallarna: hårdkodad text i sidmallarna ──────────────────────────────────
function mallText() {
  const filer = [
    ...ts.sys.readDirectory(`${ROOT}/src/app/o/[slug]`, ['.tsx']),
    ...ts.sys.readDirectory(`${ROOT}/src/components`, ['.tsx']).filter((f) => /\/Island[^/]*\.tsx$/.test(f)),
  ]
  const ut = {}
  for (const fil of filer) {
    const sf = ts.createSourceFile(fil, readFileSync(fil, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    let ord = 0, rader = 0
    sf.forEachChild(function g(n) {
      if (ts.isJsxText(n) && /\p{L}/u.test(n.text)) { ord += raknaOrd(n.text); rader++ }
      n.forEachChild(g)
    })
    ut[rel(fil)] = { ord, textnoder: rader }
  }
  return ut
}

// ── Mätning per ö ───────────────────────────────────────────────────────────
function matO(o, k, platser) {
  const enh = enheterFor(o)
  const sektioner = {}
  for (const e of enh) {
    const s = (sektioner[e.sektion] ??= { ord: 0, enheter: 0, medKalla: 0 })
    s.ord += e.ord; s.enheter++; if (e.harKalla) s.medKalla++
  }
  const p = platserForO(o, platser, k.KOORD)
  const h = k.getH(o.slug)
  const hOrd = h.reduce((n, x) => n + raknaOrd(JSON.stringify(Object.values(x).filter((v) => typeof v === 'string'))), 0)
  return {
    namn: o.namn, region: o.region, fil: `${o.fil}:${o.rad}`,
    ord: enh.reduce((n, e) => n + e.ord, 0),
    enheter: enh.length,
    medKalla: enh.filter((e) => e.harKalla).length,
    uppskattning: enh.filter((e) => e.uppsk).length,
    sektioner,
    platser: p ? { antal: p.length, ord: p.reduce((n, x) => n + (x.ord || 0), 0), slugs: p.map((x) => x.slug).sort() } : null,
    hantverkare: { antal: h.length, ord: hOrd },
    scb: k.SCB[o.slug] ? { scbNamn: k.SCB[o.slug].scbNamn, kommun: k.SCB[o.slug].kommun, folkbokforda: k.SCB[o.slug].folkbokforda } : null,
    obild: k.OBILDER[o.slug] ? { url: k.OBILDER[o.slug].url } : null,
  }
}

// ── CLI ─────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2)
const arg = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined }
const platsFil = arg('--platser')
const platser = platsFil ? JSON.parse(readFileSync(platsFil, 'utf8')) : null

if (args.includes('--baslinje')) {
  if (existsSync(BASLINJE) && !args.includes('--tvinga-forsta')) {
    console.error(`Baslinjen finns redan (${rel(BASLINJE)}) och ändras aldrig i efterhand.`)
    process.exit(1)
  }
  const oar = lasOar()
  const k = await kringdata()
  const ut = {
    skapad: new Date().toISOString(),
    metod: 'scripts/faktaregister.mjs — se filhuvudet. Enheter är mekaniska (mening eller datavärde), inte atomära påståenden.',
    platsexport: platsFil ? rel(platsFil) : null,
    summa: {},
    oar: {},
    platser: platser ? Object.fromEntries(platser.map((p) => [p.slug, { ord: p.ord, typ: p.type, ö: p.island, dold: !!p.hidden }])) : null,
    mallar: mallText(),
  }
  for (const o of oar) ut.oar[o.slug] = matO(o, k, platser)
  const v = Object.values(ut.oar)
  ut.summa = {
    oar: v.length,
    ord: v.reduce((n, x) => n + x.ord, 0),
    enheter: v.reduce((n, x) => n + x.enheter, 0),
    medKalla: v.reduce((n, x) => n + x.medKalla, 0),
    uppskattning: v.reduce((n, x) => n + x.uppskattning, 0),
    platser: platser ? platser.length : null,
    platserMedText: platser ? platser.filter((p) => p.ord > 0).length : null,
  }
  mkdirSync(dirname(BASLINJE), { recursive: true })
  writeFileSync(BASLINJE, JSON.stringify(ut, null, 1) + '\n')
  console.log(`Baslinje skriven: ${rel(BASLINJE)}`)
  console.log(JSON.stringify(ut.summa))
} else if (arg('--register')) {
  const vill = new Set(arg('--register').split(','))
  const oar = lasOar().filter((o) => vill.has(o.slug))
  const kol = ['id', 'sida', 'fil:rad', 'fält', 'påstående', 'typ', 'befintlig källa']
  console.log(kol.join('\t'))
  const ren = (s) => String(s).replace(/[\t\n\r]+/g, ' ')
  for (const o of oar) {
    enheterFor(o).forEach((e, i) => {
      const typ = e.typ === 'text' ? '' : 'SAKUPPGIFT'
      const kalla = e.kedja.filter((k) => /KÄLLA|UPPSKATTNING/i.test(k)).join(' || ')
      console.log([`${o.slug}-${String(i + 1).padStart(4, '0')}`, `/o/${o.slug}`, `${o.fil}:${e.rad}`, e.mening ? `${e.sokvag}#${e.mening}` : e.sokvag, e.text, typ, kalla].map(ren).join('\t'))
    })
  }
} else if (arg('--mat')) {
  if (!existsSync(BASLINJE)) { console.error('Ingen baslinje.'); process.exit(1) }
  const bas = JSON.parse(readFileSync(BASLINJE, 'utf8'))
  const vill = new Set(arg('--mat').split(','))
  const k = await kringdata()
  let fel = 0
  for (const o of lasOar().filter((x) => vill.has(x.slug))) {
    const nu = matO(o, k, platser), b = bas.oar[o.slug]
    if (!b) { console.log(`${o.slug}: saknas i baslinjen`); continue }
    const brister = []
    if (nu.ord < 0.95 * b.ord) brister.push(`ord ${nu.ord} < 95 % av ${b.ord}`)
    for (const [s, x] of Object.entries(b.sektioner)) if (x.ord + x.enheter > 0 && !nu.sektioner[s]) brister.push(`sektion ${s} tom`)
    if (b.platser && nu.platser && nu.platser.ord < 0.95 * b.platser.ord) brister.push(`platstext ${nu.platser.ord} < 95 % av ${b.platser.ord}`)
    console.log(`${o.slug}: ord ${b.ord}→${nu.ord}, enheter ${b.enheter}→${nu.enheter}, med källa ${b.medKalla}→${nu.medKalla}${brister.length ? '  BRIST: ' + brister.join('; ') : '  OK'}`)
    if (brister.length) fel++
  }
  process.exit(fel ? 1 : 0)
} else {
  console.error('Ange --baslinje, --register <slugs> eller --mat <slugs>. Se filhuvudet.')
  process.exit(2)
}
