#!/usr/bin/env node
/**
 * backup-innehall.mjs: exporterar Svallas innehåll ur databasen till JSON-filer.
 *
 * Varför: ödatan och guiderna ligger i git och har därmed historik, men de
 * 699 platserna (tabellen restaurants), turerna, rutterna och evenemangen
 * finns bara i Supabase. Om databasen förloras eller skrivs över av misstag
 * finns de inte någon annanstans. Supabase egna backuper beror på planen och
 * har inte verifierats (docs/RUNBOOK_BACKUP_RESTORE.md).
 *
 * Bara innehållstabeller exporteras. Inga användare, mejladresser, meddelanden
 * eller turer som användare loggat: det är personuppgifter och ska inte ligga
 * i en fil som laddas ner från GitHub.
 *
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/backup-innehall.mjs [utkatalog]
 *
 * Körs varje vecka av .github/workflows/backup-innehall.yml.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const NYCKEL = process.env.SUPABASE_SERVICE_ROLE_KEY
const UT = resolve(process.argv[2] || 'backup')
const TABELLER = ['restaurants', 'tours', 'routes', 'events']
const SIDA = 1000

if (!URL || !NYCKEL) {
  console.log('SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas, ingen backup gjord.')
  process.exit(0)
}

mkdirSync(UT, { recursive: true })
const sammanfattning = {}
let fel = 0

for (const tabell of TABELLER) {
  const rader = []
  for (let fran = 0; ; fran += SIDA) {
    const r = await fetch(`${URL}/rest/v1/${tabell}?select=*&order=id`, {
      headers: {
        apikey: NYCKEL,
        Authorization: `Bearer ${NYCKEL}`,
        Range: `${fran}-${fran + SIDA - 1}`,
        'Range-Unit': 'items',
      },
    })
    if (!r.ok && r.status !== 206) {
      console.error(`✗ ${tabell}: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`)
      fel++
      break
    }
    const sida = await r.json()
    rader.push(...sida)
    if (sida.length < SIDA) break
  }
  writeFileSync(resolve(UT, `${tabell}.json`), JSON.stringify(rader, null, 1))
  sammanfattning[tabell] = rader.length
  console.log(`✓ ${tabell}: ${rader.length} rader`)
}

writeFileSync(resolve(UT, 'sammanfattning.json'), JSON.stringify({ tid: new Date().toISOString(), rader: sammanfattning }, null, 1))
// Tom tabell där det borde finnas innehåll är ett tecken på att något gått fel.
if (fel || (sammanfattning.restaurants ?? 0) === 0) process.exit(1)
