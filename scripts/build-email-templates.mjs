#!/usr/bin/env node
/**
 * Bakar in /emails/*.md i src/lib/email-templates.generated.ts.
 *
 * VARFÖR:
 *  1. verify-claims.mjs granskar bara `src`. Mailtext i /emails var helt
 *     osynlig för spärren — klockslag och priser i utskick granskades aldrig.
 *     Via den genererade filen i src/lib omfattas de nu.
 *  2. Fyra av nio mallar saknades på disk. readFileSync kastade och koden
 *     föll tyst tillbaka på en inbäddad kopia med annan text. Nu avbryts
 *     bygget i stället för att gissa.
 *
 * Körs i prebuild. Saknad mall = avbrutet bygge, inte tyst gissning.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const mallDir = path.join(rot, 'emails')
const utFil = path.join(rot, 'src', 'lib', 'email-templates.generated.ts')

const MALLAR = {
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

const saknade = []
const poster = []

for (const [nyckel, fil] of Object.entries(MALLAR)) {
  const p = path.join(mallDir, fil)
  if (!fs.existsSync(p)) { saknade.push(fil); continue }
  const rå = fs.readFileSync(p, 'utf-8')
  if (!/^---\n[\s\S]*?\n---\n/.test(rå)) {
    saknade.push(`${fil} (saknar frontmatter)`)
    continue
  }
  // Escapa så texten överlever som template literal
  const säker = rå.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
  poster.push(`  ${nyckel}: \`${säker}\`,`)
}

if (saknade.length) {
  console.error('\n❌ Mailmallar saknas eller är trasiga:\n' + saknade.map(s => '   · ' + s).join('\n'))
  console.error('\n   Varje mall i /emails måste finnas och börja med YAML-frontmatter.\n')
  process.exit(1)
}

const ut = `// GENERERAD FIL — ändra inte här.
// Källa: /emails/*.md · Generator: scripts/build-email-templates.mjs (körs i prebuild)
//
// Filerna bakas in eftersom repo-rotens filer inte följer med i Vercels
// serverless-bundle. Vill du ändra texten i ett mail: redigera .md-filen.

import type { EmailTemplate } from './email'

export const MAIL_MALLAR: Record<EmailTemplate, string> = {
${poster.join('\n')}
}
`

const föregående = fs.existsSync(utFil) ? fs.readFileSync(utFil, 'utf-8') : ''
if (föregående !== ut) {
  fs.writeFileSync(utFil, ut, 'utf-8')
  console.log(`✅ email-templates.generated.ts uppdaterad (${poster.length} mallar)`)
} else {
  console.log(`✅ email-templates.generated.ts oförändrad (${poster.length} mallar)`)
}
