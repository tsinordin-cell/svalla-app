#!/usr/bin/env node
/**
 * CREATE_COMFORT32_LISTING.mjs
 *
 * Skapar Comfort 32-annonsen i Loppis-kategorin med ALLA bilder uppladdade
 * till Supabase Storage. Eliminerar manuellt formulärifyllande.
 *
 * Användning:
 *   1. Spara bilderna från Blocket till en lokal mapp, t.ex.:
 *        mkdir -p ~/Downloads/comfort32
 *        # högerklicka på varje bild på blocket.se → "Spara bild som…" till mappen
 *      ELLER släpp bilderna från denna chatt direkt till mappen.
 *
 *   2. Ladda dotenv + kör skriptet:
 *        cd svalla-app
 *        node --env-file=.env.local scripts/CREATE_COMFORT32_LISTING.mjs ~/Downloads/comfort32
 *
 *   3. Skriptet:
 *      - Sorterar bilder alfabetiskt (filnamn 1, 2, 3 → ordning i galleriet)
 *      - Laddar upp varje bild till forum-images-bucket
 *      - Tar bort den gamla Comfort 32-tråden (om finns)
 *      - Skapar ny thread i Loppis-kategorin med komplett listing_data
 *      - Skriver ut den publika URL:en
 *
 * Kräver i .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { readFile, readdir, stat } from 'node:fs/promises'
import { extname, join, basename } from 'node:path'
import { homedir } from 'node:os'
import { createClient } from '@supabase/supabase-js'

const TOM_USER_ID  = '9520b990-4818-45aa-88bc-c21081fdb05a'
const OLD_THREAD_ID = '19cb8f74-225f-457b-87cc-57b4d73a7a73'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌  Saknar NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i miljön.')
  console.error('    Kör med: node --env-file=.env.local scripts/CREATE_COMFORT32_LISTING.mjs <bildmapp>')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic'])
const CONTENT_TYPE = {
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png',  '.webp': 'image/webp',
  '.heic': 'image/heic',
}

// Auto-mode: om ingen mapp anges, leta efter de 9 senaste bilderna på Desktop
// (där macOS lägger printscreens som standard) inom de senaste 2 timmarna.
async function autoFindRecentImages() {
  const candidates = [
    join(homedir(), 'Desktop'),
    join(homedir(), 'Downloads'),
    join(homedir(), 'Library', 'Mobile Documents', 'com~apple~CloudDocs', 'Desktop'),
    join(homedir(), 'Library', 'Mobile Documents', 'com~apple~CloudDocs', 'Downloads'),
  ]
  const TWO_HOURS = 2 * 60 * 60 * 1000
  const cutoff = Date.now() - TWO_HOURS
  const all = []
  for (const dir of candidates) {
    try {
      const entries = await readdir(dir)
      for (const name of entries) {
        if (!ALLOWED_EXT.has(extname(name).toLowerCase())) continue
        const full = join(dir, name)
        try {
          const st = await stat(full)
          if (st.isFile() && st.mtimeMs >= cutoff) {
            all.push({ path: full, mtime: st.mtimeMs })
          }
        } catch { /* skip unreadable */ }
      }
    } catch { /* dir missing — skip */ }
  }
  // Sortera kronologiskt (äldsta först → första printscreenen blir hero)
  all.sort((a, b) => a.mtime - b.mtime)
  return all.map(x => x.path).slice(0, 9)
}

let filePaths = []
const imageDir = process.argv[2]

if (imageDir) {
  console.log(`\n📂  Läser bilder från ${imageDir}...`)
  const names = (await readdir(imageDir))
    .filter(f => ALLOWED_EXT.has(extname(f).toLowerCase()))
    .sort()
  filePaths = names.map(n => join(imageDir, n))
} else {
  console.log('\n🔍  Letar efter senaste printscreens på Desktop / Downloads (senaste 2h)...')
  filePaths = await autoFindRecentImages()
}

if (filePaths.length === 0) {
  console.error('\n❌  Hittade inga bilder.')
  console.error('    Kontrollera att bilderna ligger på Desktop eller Downloads, eller ge sökväg explicit:')
  console.error('    node --env-file=.env.local scripts/CREATE_COMFORT32_LISTING.mjs ~/Downloads/comfort32\n')
  process.exit(1)
}

console.log(`📸  Hittade ${filePaths.length} bilder (kronologisk ordning):`)
for (const p of filePaths) console.log(`    · ${basename(p)}`)
console.log('\n⬆️   Laddar upp till Supabase Storage...')

const uploaded = []
for (const [i, fullPath] of filePaths.entries()) {
  const file = basename(fullPath)
  const ext = extname(file).toLowerCase()
  const buf = await readFile(fullPath)
  const filename = `${TOM_USER_ID}/comfort32-${Date.now()}-${i + 1}${ext}`
  const { error } = await sb.storage
    .from('forum-images')
    .upload(filename, buf, {
      upsert: false,
      contentType: CONTENT_TYPE[ext] ?? 'application/octet-stream',
      cacheControl: '31536000',
    })
  if (error) {
    console.error(`❌  Upload-fel för ${file}: ${error.message}`)
    process.exit(1)
  }
  const { data: pub } = sb.storage.from('forum-images').getPublicUrl(filename)
  uploaded.push(pub.publicUrl)
  console.log(`  ✓ ${i + 1}/${files.length}  ${basename(file)}`)
}

console.log(`\n🗑️   Tar bort gamla Comfort 32-tråden (om den finns)...`)
const { error: delErr } = await sb
  .from('forum_threads')
  .delete()
  .eq('id', OLD_THREAD_ID)
if (delErr) {
  console.warn(`⚠️   Kunde inte ta bort gamla tråden: ${delErr.message} (fortsätter)`)
} else {
  console.log('  ✓ Borttagen.')
}

const listingData = {
  price:        150000,
  currency:     'SEK',
  condition:    'Mycket bra',
  category:     'Båt',
  images:       uploaded,
  specs: [
    { label: 'Modell',     value: 'Comfort 32' },
    { label: 'Årsmodell',  value: '1979' },
    { label: 'Designer',   value: 'Bengt-Erik Bengtsson' },
    { label: 'Varv',       value: 'Comfortvarvet, Halmstad' },
    { label: 'Skrov',      value: 'GRP' },
    { label: 'Längd',      value: '9,75 m' },
    { label: 'Pentry',     value: 'Optimus 2-låg gasspis med ugn' },
    { label: 'Plotter',    value: 'Garmin' },
    { label: 'Status',     value: 'På land — vårrustning behövs' },
  ],
  location:      'Halmstad',
  external_link: 'https://www.blocket.se/mobility/item/22475159',
  status:        'aktiv',
}

const body = `En kompis säljer sin **Comfort 32** från 1979 — en välhållen klassisk svensk havssegelbåt som har älskats och skötts om i många säsonger. Ursprungsinredning i mahogny, gröna sammetsdynor och repsklädda mastpelare ger henne en otroligt fin patina.

**Utrustning**
- Sprayhood och bimini i blått
- Garmin-plotter installerad i sittbrunnen
- Optimus 2-låg gasspis med ugn
- Komplett pentry med diskbänk
- Separat toalett med dörr
- Förpik med dubbelkoj

**Varför Comfort 32?**
- Robust GRP-skrov som tål nordiska vatten
- Måttligt djupgående — passar Stockholms skärgård utmärkt
- Pålitlig och förlåtande — populär bland familjeseglare i 50 år

Båten har stått på land i två år och behöver vårrustning + lite finputs innan säsongen, men är i grunden i mycket bra skick. Hör gärna av dig om du har frågor eller vill se båten.`

console.log('\n📝  Skapar ny tråd i Loppis-kategorin...')
const { data: thread, error: insErr } = await sb
  .from('forum_threads')
  .insert({
    category_id:   'loppis',
    user_id:       TOM_USER_ID,
    title:         'Comfort 32 från 1979 — välhållen klassisk havssegelbåt',
    body,
    in_spam_queue: false,
    listing_data:  listingData,
  })
  .select('id')
  .single()

if (insErr || !thread) {
  console.error(`❌  Insert-fel: ${insErr?.message ?? 'okänt'}`)
  process.exit(1)
}

const url = `https://svalla.se/forum/loppis/${thread.id}`
console.log(`\n✅  Klart! Annonsen finns på:\n    ${url}\n`)
console.log(`   Thread ID: ${thread.id}`)
console.log(`   Bilder uppladdade: ${uploaded.length}`)
console.log(`   Pris: 150 000 kr · Plats: Halmstad · Skick: Mycket bra\n`)
