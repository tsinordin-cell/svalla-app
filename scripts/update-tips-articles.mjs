/**
 * UPDATE redan publicerade artiklar i articles-tabellen
 * efter fakta-granskning av .md-filerna i tips-content/.
 *
 * Skiljer sig från seed-tips-articles.mjs som bara INSERT:ar.
 * Det här skriptet uppdaterar body_md, excerpt och title på befintliga slugs.
 *
 * Kör: node scripts/update-tips-articles.mjs
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Mappning slug → md-fil + ev. ny excerpt
const ARTICLES = [
  {
    slug: 'basta-krogarna-skargarden-2026',
    body_md_file: 'krogar.md',
    excerpt: 'Krogar i skärgården erbjuder mat med utsikt över salt vatten och båtliv. Här är 12 måsten från Vaxholm till Rödlöga — med praktisk planering.',
  },
  {
    slug: 'overnattning-stockholms-skargard-2026',
    body_md_file: 'overnattning.md',
    excerpt: 'Allt du behöver veta om övernattning i skärgården: hotell, vandrarhem, stugor och naturhamn. Från Sandhamn till Utö — vår guide täcker alla sätt att sova ute.',
  },
  {
    slug: 'basta-naturhamnarna-stockholms-skargard',
    body_md_file: 'naturhamnar.md',
    excerpt: 'Hitta de bästa naturhamnarna i Stockholms skärgård. Skyddade vikar, fri ankring och praktiska tips. Använd Svalla-kartan för exakta lägen.',
  },
  {
    slug: 'barnvanliga-oar-stockholms-skargard',
    body_md_file: 'barnvanliga.md',
    excerpt: 'Upptäck de bästa barnvänliga öarna i Stockholms skärgård. Från Fjäderholmarna till Sandhamn — vår guide för familjer som vill kombinera äventyr, bad och lugn.',
  },
  {
    slug: 'ankarplatser-stockholms-skargard-guide',
    body_md_file: 'ankarplatser.md',
    excerpt: 'Hitta perfekta ankarplatser i Stockholms skärgård. Guide till 10 testade områden med väderprofil och praktiska tips för säker och skön ankring.',
  },
]

async function main() {
  const articlesDir = path.join(__dirname, 'tips-content')
  console.log(`Läser ${ARTICLES.length} artiklar från ${articlesDir}/`)
  let updated = 0
  let missing = 0
  for (const art of ARTICLES) {
    const bodyPath = path.join(articlesDir, art.body_md_file)
    if (!fs.existsSync(bodyPath)) {
      console.error(`✗ Saknar ${bodyPath}`)
      missing++
      continue
    }
    const body_md = fs.readFileSync(bodyPath, 'utf8')
    const { error } = await sb
      .from('articles')
      .update({
        body_md,
        excerpt: art.excerpt,
        updated_at: new Date().toISOString(),
      })
      .eq('slug', art.slug)
    if (error) {
      console.error(`✗ ${art.slug}: ${error.message}`)
      continue
    }
    console.log(`✓ ${art.slug}`)
    updated++
  }
  console.log(`\nKlart: ${updated} uppdaterade, ${missing} saknade md-filer.`)
}
main().catch(err => { console.error(err); process.exit(1) })
