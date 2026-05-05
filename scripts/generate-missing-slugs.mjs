/**
 * Genererar slug för restaurants som saknar det. Tom rapporterade 404 på
 * /platser/finnhamns-krog — många slugs saknas vilket gör URL:erna brutna.
 *
 * Slug-format: lowercase, ASCII-säker, åäö → aao, mellanslag → -.
 * Vid kollision (två platser med samma namn): suffix -2, -3 etc.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

function slugify(name) {
  return name
    .toLowerCase()
    .replaceAll('å', 'a').replaceAll('ä', 'a').replaceAll('ö', 'o')
    .replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ü', 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60)
}

async function main() {
  // Hämta alla utan slug + befintliga slugs så vi kan undvika kollisioner
  const { data: all } = await sb.from('restaurants').select('id, name, slug')
  const existingSlugs = new Set(all.filter(r => r.slug).map(r => r.slug))
  const needsSlug = all.filter(r => !r.slug)

  console.log(`Av ${all.length} platser saknar ${needsSlug.length} slug`)

  let updated = 0
  let skipped = 0
  for (const row of needsSlug) {
    let base = slugify(row.name)
    if (!base || base.length < 2) {
      console.error(`  ✗ Skip: '${row.name}' (id ${row.id}) — kunde inte generera slug`)
      skipped++
      continue
    }
    let slug = base
    let counter = 2
    while (existingSlugs.has(slug)) {
      slug = `${base}-${counter}`
      counter++
    }
    const { error } = await sb.from('restaurants').update({ slug }).eq('id', row.id)
    if (error) {
      console.error(`  ✗ ${row.name}: ${error.message}`)
      continue
    }
    existingSlugs.add(slug)
    updated++
    if (updated <= 10) console.log(`  ✓ ${row.name} → ${slug}`)
  }
  console.log(`\nKlart: ${updated} slugs satta, ${skipped} skippade.`)
}

main().catch(err => { console.error(err); process.exit(1) })
