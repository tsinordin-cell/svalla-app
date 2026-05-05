/**
 * Tar bort listing_data.images på de 5 seed-Loppis-annonserna.
 * Verkligheten: jag gissade Unsplash-photo-IDs men många var antingen 404 eller
 * fel kontext (vattenfall för "Prijon Marlin havskajak"). Better none than wrong.
 * Annonserna visar då pris/titel/plats på premium navy bakgrund.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const TITLES = [
  'Bavaria 32 från 2008 — välunderhållen havsseglare',
  'Hanse 348 från 2014 — modern cruiser i toppskick',
  'Yamaha F40 utombordare — låga timmar, full service',
  'Prijon Marlin havskajak — komplett paket med utrustning',
  'Räddningsväst-set Baltic 165N (4 st vuxen)',
]

async function main() {
  for (const title of TITLES) {
    const { data: row } = await sb.from('forum_threads').select('id, listing_data').eq('title', title).single()
    if (!row) { console.error(`✗ ${title} — not found`); continue }
    const newListing = { ...row.listing_data }
    delete newListing.images
    const { error } = await sb.from('forum_threads').update({ listing_data: newListing }).eq('id', row.id)
    if (error) { console.error(`✗ ${title} — ${error.message}`); continue }
    console.log(`✓ ${title} — bilder borttagna`)
  }
}
main()
