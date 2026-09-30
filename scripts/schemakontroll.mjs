#!/usr/bin/env node
/**
 * Schemakontroll: varje Supabase-fråga i src jämförs med databasens schema.
 *
 * BAKGRUND (2026-09-29): Min skärgård frågade visited_islands efter kolumnen
 * created_at, som inte finns (heter visited_at). Supabase svarade med fel,
 * koden tog null som "inga rader", och alla användare såg "0 besökta öar" i
 * fem månader. Thorkel hade samma fel mot trips.title (heter caption).
 * Sådana fel är TYSTA: bygget blir grönt och sidan ser ut att fungera.
 *
 * Kontrollen läser supabase/schema-snapshot.json (tabell → kolumner) och
 * går igenom varje kedja `.from('tabell')…` i src: select-kolumner,
 * filter (eq/neq/gt/gte/lt/lte/like/ilike/is/in/contains/order/not),
 * och toppnivånycklar i insert/upsert/update. Okänd tabell eller kolumn →
 * bygget failar med fil och rad.
 *
 * Efter en migration: uppdatera snapshoten (SQL:en står i filen) i samma PR.
 *
 * Undantag (TILLATNA) är dokumenterade skulder, inte tysta godkännanden:
 * ta bort raden när tabellen/kolumnen faktiskt finns.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SNAPSHOT = 'supabase/schema-snapshot.json'
const ROT = 'src'

/**
 * Tabeller som koden använder men som aldrig skapats i databasen
 * (migration social-v2 och stripe från 2026-04-28 kördes inte; ytorna gömdes
 * i PR #409). Se claude/schemakontroll-2026-09-29.md i projektet. Ta bort en
 * tabell härifrån när dess migration körts och snapshoten uppdaterats.
 */
const TILLATNA_SAKNADE_TABELLER = new Set([
  'subscriptions', 'images', 'events', 'event_attendees', 'clubs', 'club_members',
  'invite_codes', 'invites', 'user_blocks', 'check_ins', 'follow_prefs',
  'place_reviews', 'reposts', 'stories', 'story_views',
])

/** Kolumner bakom NEXT_PUBLIC_PRO_ENABLED (Stripe) — finns inte förrän stripe-migrationen körs. */
const TILLATNA_SAKNADE_KOLUMNER = new Set([
  'users.stripe_customer_id',
  'forum_threads.boosted_until',
])

const FILTER = new Set(['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in', 'contains', 'containedBy', 'order', 'not', 'textSearch', 'overlaps', 'match'])
const SKRIV = new Set(['insert', 'upsert', 'update'])
const OPTIONSNYCKLAR = new Set(['onConflict', 'ignoreDuplicates', 'count', 'defaultToNull'])

const snapshot = JSON.parse(readFileSync(SNAPSHOT, 'utf8'))
const schema = Object.fromEntries(Object.entries(snapshot.tabeller).map(([t, c]) => [t, new Set(c.split(','))]))

function* filer(dir) {
  for (const namn of readdirSync(dir)) {
    const p = join(dir, namn)
    if (statSync(p).isDirectory()) { if (namn !== 'node_modules') yield* filer(p) }
    else if (/\.(ts|tsx)$/.test(namn) && !/\.test\.tsx?$/.test(namn)) yield p
  }
}

/** Plocka ut argumentet till varje metodanrop i kedjan efter .from(...). */
function kedja(kalla, start) {
  const anrop = []
  let i = start
  while (i < kalla.length) {
    const m = /^\s*\.([A-Za-z]+)\(/.exec(kalla.slice(i))
    if (!m) break
    const namn = m[1]
    let j = i + m[0].length, djup = 1, k = j
    while (k < kalla.length && djup > 0) {
      const ch = kalla[k]
      if (ch === '(') djup++
      else if (ch === ')') djup--
      else if (ch === '"' || ch === "'" || ch === '`') { // hoppa över strängar
        const q = ch; k++
        while (k < kalla.length && kalla[k] !== q) { if (kalla[k] === '\\') k++; k++ }
      }
      k++
    }
    anrop.push({ namn, arg: kalla.slice(j, k - 1) })
    i = k
  }
  return anrop
}

/** Kolumner ur en select-sträng; relationer (foo(...), foo:bar(...)) hoppas över. */
function selectKolumner(arg) {
  const m = /^\s*(['"`])([\s\S]*?)\1/.exec(arg)
  if (!m) return []
  // Dela på kommatecken på toppnivå; en del som innehåller '(' är en relation
  // (forum_threads(id, title)) och ingen kolumn i den här tabellen.
  const delar = []; let djup = 0, buf = '', relation = false
  for (const ch of m[2]) {
    if (ch === '(') { djup++; relation = true; continue }
    if (ch === ')') { djup--; continue }
    if (djup === 0 && ch === ',') { delar.push({ text: buf, relation }); buf = ''; relation = false; continue }
    if (djup === 0) buf += ch
  }
  delar.push({ text: buf, relation })
  const ut = []
  for (const d of delar) {
    if (d.relation) continue
    let del = d.text.trim()
    if (!del || del === '*') continue
    if (del.includes(':')) del = del.split(':').pop().trim() // alias:kolumn
    del = del.split('::')[0].split('->')[0].split('!')[0].trim()
    if (/^[a-z_][a-z0-9_]*$/.test(del)) ut.push(del)
  }
  return ut
}

/** Toppnivånycklar i ett objektlitteral `{ a: 1, b: { c: 2 } }` → [a, b]. */
function toppnycklar(arg) {
  const start = arg.indexOf('{')
  if (start < 0) return []
  const ut = []; let djup = 0
  for (let i = start; i < arg.length; i++) {
    const ch = arg[i]
    if (ch === '{' || ch === '[' || ch === '(') { djup++; continue }
    if (ch === '}' || ch === ']' || ch === ')') { djup--; if (djup === 0) break; continue }
    if (ch === '"' || ch === "'" || ch === '`') { const q = ch; i++; while (i < arg.length && arg[i] !== q) { if (arg[i] === '\\') i++; i++ }; continue }
    if (djup === 1) {
      const m = /^\s*([a-z_][a-z0-9_]*)\s*:/.exec(arg.slice(i))
      if (m && (i === start + 1 || /[,{]\s*$/.test(arg.slice(start, i)))) { ut.push(m[1]); i += m[0].length - 1 }
    }
  }
  return ut
}

const fel = []
for (const fil of filer(ROT)) {
  const kalla = readFileSync(fil, 'utf8')
  const re = /\.from\(\s*['"]([a-z_]+)['"]\s*\)/g
  let m
  while ((m = re.exec(kalla))) {
    const tabell = m[1]
    const rad = kalla.slice(0, m.index).split('\n').length
    if (!schema[tabell]) {
      if (!TILLATNA_SAKNADE_TABELLER.has(tabell)) fel.push(`${fil}:${rad}  tabellen "${tabell}" finns inte i schemat`)
      continue
    }
    const kol = schema[tabell]
    const saknas = (k) => !kol.has(k) && !TILLATNA_SAKNADE_KOLUMNER.has(`${tabell}.${k}`)
    for (const { namn, arg } of kedja(kalla, m.index + m[0].length)) {
      if (namn === 'select') {
        for (const k of selectKolumner(arg)) if (saknas(k)) fel.push(`${fil}:${rad}  ${tabell}.select: kolumnen "${k}" finns inte`)
      } else if (FILTER.has(namn)) {
        const mm = /^\s*['"]([a-z_][a-z0-9_]*)['"]/.exec(arg)
        if (mm && saknas(mm[1])) fel.push(`${fil}:${rad}  ${tabell}.${namn}: kolumnen "${mm[1]}" finns inte`)
      } else if (SKRIV.has(namn)) {
        for (const k of toppnycklar(arg)) if (!OPTIONSNYCKLAR.has(k) && saknas(k)) fel.push(`${fil}:${rad}  ${tabell}.${namn}: kolumnen "${k}" finns inte`)
      }
    }
  }
}

if (fel.length) {
  console.error(`\n✗ schemakontroll: ${fel.length} fråga/frågor mot kolumner eller tabeller som inte finns (snapshot ${snapshot._hamtad}):\n`)
  for (const f of fel) console.error('  ' + f)
  console.error('\n  Rätta frågan, eller — om du just kört en migration — uppdatera supabase/schema-snapshot.json (SQL:en står i filen).\n')
  process.exit(1)
}
console.log(`✓ schemakontroll: alla Supabase-frågor i src matchar schemat (snapshot ${snapshot._hamtad}, ${Object.keys(schema).length} tabeller)`)
