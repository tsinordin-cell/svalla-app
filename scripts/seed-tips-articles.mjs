/**
 * Seed 5 long-tail SEO-artiklar i articles-tabellen.
 * Körs en gång — skip om slug redan finns.
 *
 * Targets högvolym sökord: krogar i skärgården, övernattning skärgård,
 * naturhamn Stockholm, barnvänliga öar, ankarplats Stockholms skärgård.
 * Total potential: 3200+ sök/månad om vi rankar topp-3.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const ARTICLES = [
  {
    slug: 'basta-krogarna-skargarden-2026',
    title: 'De 12 bästa krogarna i Stockholms skärgård 2026',
    excerpt: 'Krogar i skärgården erbjuder mat med utsikt över salt vatten och båtliv. Här är 12 måsten från Vaxholm till Svenska Högarna — med praktisk planering.',
    category: 'Mat & dryck',
    tags: ['Krogar', 'Restauranger', 'Skärgård', 'Mat', 'Sommar'],
    reading_min: 8,
    body_md_file: 'krogar.md',
  },
  {
    slug: 'overnattning-stockholms-skargard-2026',
    title: 'Övernattning i Stockholms skärgård — den kompletta guiden 2026',
    excerpt: 'Allt du behöver veta om övernattning i skärgården: hotell, vandrarhem, stugor och naturhamn. Från Sandhamn till Utö — vår guide täcker alla sätt att sova ute.',
    category: 'Praktiskt',
    tags: ['Övernattning', 'Hotell', 'STF', 'Vandrarhem', 'Stugor'],
    reading_min: 8,
    body_md_file: 'overnattning.md',
  },
  {
    slug: 'basta-naturhamnarna-stockholms-skargard',
    title: 'De 15 bästa naturhamnarna i Stockholms skärgård',
    excerpt: 'Hitta de bästa naturhamnarna i Stockholms skärgård. Gratis ankring, inget kaos, bara lugn och vind. Din guide till rätt skyddade lägen för segel- och motorbåt.',
    category: 'Praktiskt',
    tags: ['Naturhamn', 'Ankring', 'Segling', 'Båt', 'Skärgård'],
    reading_min: 9,
    body_md_file: 'naturhamnar.md',
  },
  {
    slug: 'barnvanliga-oar-stockholms-skargard',
    title: '10 barnvänliga öar i Stockholms skärgård — guide för barnfamiljer 2026',
    excerpt: 'Upptäck de bästa barnvänliga öarna i Stockholms skärgård. Från Fjäderholmarna till Sandhamn — vår guide för familjer som vill kombinera äventyr, bad och lugn.',
    category: 'Familj',
    tags: ['Barnfamilj', 'Barn', 'Familjeresor', 'Skärgård', 'Sommar'],
    reading_min: 8,
    body_md_file: 'barnvanliga.md',
  },
  {
    slug: 'ankarplatser-stockholms-skargard-guide',
    title: 'Ankarplatser i Stockholms skärgård — kompletta guiden för seglare',
    excerpt: 'Hitta perfekta ankarplatser i Stockholms skärgård. Guide till 10 testade lägen med koordinater, djup och väderanalys för säker och skön ankring.',
    category: 'Segling',
    tags: ['Ankring', 'Ankarplats', 'Segling', 'Båt', 'Naturhamn'],
    reading_min: 9,
    body_md_file: 'ankarplatser.md',
  },
]

async function main() {
  const articlesDir = path.join(__dirname, 'tips-content')
  console.log(`Läser ${ARTICLES.length} artiklar från ${articlesDir}/`)
  let inserted = 0
  let skipped = 0
  for (const art of ARTICLES) {
    const bodyPath = path.join(articlesDir, art.body_md_file)
    if (!fs.existsSync(bodyPath)) {
      console.error(`✗ Saknar ${bodyPath}`)
      continue
    }
    const body_md = fs.readFileSync(bodyPath, 'utf8')
    // Skip om slug redan finns
    const { data: existing } = await sb.from('articles').select('id').eq('slug', art.slug).maybeSingle()
    if (existing) {
      console.log(`⊘ ${art.slug} finns redan — skip`)
      skipped++
      continue
    }
    const { error } = await sb.from('articles').insert({
      slug: art.slug,
      title: art.title,
      excerpt: art.excerpt,
      body_md,
      category: art.category,
      tags: art.tags,
      reading_min: art.reading_min,
      author_name: 'Svalla redaktion',
      published: true,
      published_at: new Date().toISOString(),
    })
    if (error) { console.error(`✗ ${art.slug}: ${error.message}`); continue }
    console.log(`✓ ${art.slug}`)
    inserted++
  }
  console.log(`\nKlart: ${inserted} insatta, ${skipped} skippade.`)
}
main().catch(err => { console.error(err); process.exit(1) })
