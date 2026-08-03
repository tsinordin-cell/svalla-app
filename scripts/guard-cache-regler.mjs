#!/usr/bin/env node
/**
 * CI-guard: en sida som deklarerar `revalidate` får inte samtidigt använda
 * något som tvingar dynamisk rendering. Körs som prebuild — bygget failar
 * i stället för att sidan tyst slutar cachas.
 *
 * BAKGRUND (2026-08-02, CLAUDE.md p27): fem sidor gjordes cachebara genom
 * att auth.getUser()/cookies() och searchParams flyttades till klienten
 * (/u/[username], /tur/[id], /forum/[kategori]/[trad], /o/[slug],
 * /upptack/[id]). Regressionen är TYST: bygget blir grönt, byggsymbolen kan
 * till och med visa ● medan runtime svarar private/no-store, och enda sättet
 * att upptäcka det är att mäta cache-control i produktion. Det hände oss
 * fyra gånger under utrullningen — och auto-commit-verktyget har skrivit om
 * exakt de här filerna förut (CLAUDE.md p1/p10/p11), så risken är inte
 * teoretisk.
 *
 * Regeln som upprätthålls: en serversida med `revalidate` får inte fråga
 * requesten om VEM som tittar eller VAD som står i query-strängen. Sådant
 * hör hemma i klienten — se ViewerGate.tsx, ProfileTabs.tsx,
 * ForumViewer.tsx för mallarna.
 *
 * Vill du medvetet göra en sida dynamisk: ta bort `revalidate` och sätt
 * `export const dynamic = 'force-dynamic'` — då säger koden sanningen och
 * guarden tystnar.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const ROT = 'src/app'

/** Strippa kommentarer och strängar så att omnämnanden i dokumentation
 *  (som den här filens egna citat av mönstren) inte ger falsklarm. */
function bareKod(kalla) {
  return kalla
    .replace(/\/\*[\s\S]*?\*\//g, '')   // blockkommentarer (inkl. JSDoc)
    .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // JSX-kommentarer
    .replace(/\/\/[^\n]*/g, '')          // radkommentarer
    .replace(/(["'`])(?:\\.|(?!\1)[^\\\n])*\1/g, '""') // stränglitteraler
}

const FORBJUDNA = [
  { re: /\bauth\s*\.\s*getUser\s*\(/, namn: 'auth.getUser()' },
  { re: /\bcreateServerSupabaseClient\s*\(/, namn: 'createServerSupabaseClient() (läser cookies)' },
  { re: /\bcookies\s*\(\)/, namn: 'cookies()' },
  { re: /\bheaders\s*\(\)/, namn: 'headers()' },
  { re: /\bsearchParams\b/, namn: 'searchParams' },
]

function* pageFiler(dir) {
  for (const namn of readdirSync(dir)) {
    const p = join(dir, namn)
    if (statSync(p).isDirectory()) yield* pageFiler(p)
    else if (namn === 'page.tsx' || namn === 'page.ts') yield p
  }
}

const fel = []
let granskade = 0

for (const fil of pageFiler(ROT)) {
  const kalla = readFileSync(fil, 'utf-8')
  const kod = bareKod(kalla)
  // Bara sidor som lovar cachning granskas. force-dynamic = ärligt dynamisk.
  if (!/export\s+const\s+revalidate\s*=/.test(kod)) continue
  if (/export\s+const\s+dynamic\s*=\s*""/.test(kod)) continue // strippad sträng — hade force-dynamic
  granskade++
  for (const { re, namn } of FORBJUDNA) {
    if (re.test(kod)) fel.push({ fil, namn })
  }
}

if (fel.length > 0) {
  console.error('\n✗ CACHE-GUARD: sidor med `revalidate` använder dynamiska API:er.\n')
  for (const { fil, namn } of fel) console.error(`  ${fil}\n    → ${namn}\n`)
  console.error(
    'En sida som deklarerar `revalidate` men läser cookies/auth/searchParams\n' +
    'renderas dynamiskt vid VARJE besök — cachningen slutar tyst att gälla.\n' +
    'Flytta betraktarberoende UI till klienten (se ViewerGate.tsx,\n' +
    'ProfileTabs.tsx, ForumViewer.tsx) eller gör sidan ärligt dynamisk med\n' +
    "`export const dynamic = 'force-dynamic'`. Bakgrund: CLAUDE.md p27.\n",
  )
  process.exit(1)
}

console.log(`✓ cache-guard: ${granskade} sidor med revalidate granskade, inga dynamiska API:er.`)
