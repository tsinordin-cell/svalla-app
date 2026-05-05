/**
 * Uppdaterar listing_data.images på de 5 seed-Loppis-annonserna med verifierade Unsplash-URL:er.
 * (De första 4 av 8 photo-IDs jag gissade på var 404.)
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const IMG = (id) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format`

const UPDATES = [
  {
    title: 'Bavaria 32 från 2008 — välunderhållen havsseglare',
    images: [IMG('photo-1542856391-010fb87dcfed'), IMG('photo-1500530855697-b586d89ba3ee'), IMG('photo-1505228395891-9a51e7e86bf6')],
  },
  {
    title: 'Hanse 348 från 2014 — modern cruiser i toppskick',
    images: [IMG('photo-1528155124528-06c125d81e89'), IMG('photo-1473093226795-af9932fe5856')],
  },
  {
    title: 'Yamaha F40 utombordare — låga timmar, full service',
    images: [IMG('photo-1505228395891-9a51e7e86bf6')],
  },
  {
    title: 'Prijon Marlin havskajak — komplett paket med utrustning',
    images: [IMG('photo-1517760444937-f6397edcbbcd')],
  },
  {
    title: 'Räddningsväst-set Baltic 165N (4 st vuxen)',
    images: [IMG('photo-1559131397-f94da358f7ca')],
  },
]

async function main() {
  for (const upd of UPDATES) {
    const { data: row, error: getErr } = await sb
      .from('forum_threads')
      .select('id, listing_data')
      .eq('title', upd.title)
      .single()
    if (getErr || !row) {
      console.error(`✗ Hittar inte: ${upd.title} — ${getErr?.message}`)
      continue
    }
    const newListing = { ...row.listing_data, images: upd.images }
    const { error: setErr } = await sb
      .from('forum_threads')
      .update({ listing_data: newListing })
      .eq('id', row.id)
    if (setErr) {
      console.error(`✗ Update-fel: ${setErr.message}`)
      continue
    }
    console.log(`✓ ${upd.title} → ${upd.images.length} bilder`)
  }
}
main()
