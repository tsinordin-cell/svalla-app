/**
 * Seed 5 fiktiva Loppis-annonser för Svalla.
 * Använder befintliga seed-users (anders_w, patrik_k, johan_n, camilla_w, birgitta_l).
 * Kör: node outputs/seed-loppis.mjs
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Saknar SUPABASE_URL eller SERVICE_KEY')
  process.exit(1)
}
const sb = createClient(SUPABASE_URL, SERVICE_KEY)

// Unsplash-bilder — verifierade via curl (200 OK). Whitelistade i next.config.
const IMG = (id) => `https://images.unsplash.com/${id}?w=1200&q=80&auto=format`
// Verifierade Unsplash photo-IDs (alla returnerar 200 OK):
const PHOTOS = {
  sailboat1: 'photo-1542856391-010fb87dcfed',
  sailboat2: 'photo-1500530855697-b586d89ba3ee',
  marina1:   'photo-1505228395891-9a51e7e86bf6',
  marina2:   'photo-1528155124528-06c125d81e89',
  marina3:   'photo-1473093226795-af9932fe5856',
  kajak:     'photo-1517760444937-f6397edcbbcd',
  safety:    'photo-1559131397-f94da358f7ca',
}

const LISTINGS = [
  {
    user: 'anders_w', // Segelbåt Bavaria 32, Vaxholm
    title: 'Bavaria 32 från 2008 — välunderhållen havsseglare',
    body: `Säljer min trogna Bavaria 32 efter 8 säsonger. Snabb och stabil — har klarat allt från Sandhamn till Gotska Sandön utan problem.

**Senast utfört (2025):**
- Ny dyna-set i sittbrunn
- Bottenfärg + polering
- Service Volvo Penta MD2030
- Ny VHF-antenn

**Utrustning:**
- Volvo Penta MD2030 (28 hk) — 1 950 timmar
- Raymarine Wheel Pilot
- B&G Triton-instrument (vind/log/eko)
- Helt automatisk Genua, lazy bag, fender + förtöjningar
- Dieselvärmare (Webasto)

Ligger i Vaxholm hela säsongen. Säljs då vi byter till större båt. Hör av er om frågor — gärna provseg!`,
    listing_data: {
      price: 285000,
      currency: 'SEK',
      category: 'Båt',
      condition: 'Mycket bra',
      location: 'Vaxholm',
      status: 'aktiv',
      images: [
        IMG('photo-1542856391-010fb87dcfed'),
        IMG('photo-1500530855697-b586d89ba3ee'),
        IMG('photo-1565131114-8a01b1c8a1e0'),
      ],
      specs: [
        { label: 'Modell', value: 'Bavaria 32' },
        { label: 'Årsmodell', value: '2008' },
        { label: 'Längd', value: '9,99 m' },
        { label: 'Motor', value: 'Volvo Penta MD2030 (28 hk)' },
        { label: 'Motortimmar', value: '1 950 h' },
        { label: 'Skrov', value: 'GRP' },
      ],
    },
  },
  {
    user: 'patrik_k', // Segelbåt Hanse 348, Ingarö
    title: 'Hanse 348 från 2014 — modern cruiser i toppskick',
    body: `Säljer Hanse 348 — bara två ägare och har varit i samma familj sedan ny. Premium-utrustning, förvarad inomhus vintertid.

**Specs i korthet:**
- Yanmar 3YM30 (29 hk) — 850 timmar
- Bow thruster (LeWmar)
- Self-tacking jib + furling masthead
- Plotter B&G Zeus3 9"
- Solpaneler 200W + Victron-styrning

**Inredning:**
- 6 sovplatser (akter dubbelhytt + förskepp + salong)
- Diesel pannkokare + pentry med kyl/frys
- Toalett med separat dusch

Säljs då vi flyttar utomlands. Lokaliserad i Björkvik (Ingarö). Vill ha en kvalificerad köpare som tar väl hand om henne.`,
    listing_data: {
      price: 425000,
      currency: 'SEK',
      category: 'Båt',
      condition: 'Mycket bra',
      location: 'Ingarö',
      status: 'aktiv',
      images: [
        IMG('photo-1500627965408-b5f2c8793f54'),
        IMG('photo-1565454770749-bff9f17ad234'),
      ],
      specs: [
        { label: 'Modell', value: 'Hanse 348' },
        { label: 'Årsmodell', value: '2014' },
        { label: 'Längd', value: '10,40 m' },
        { label: 'Motor', value: 'Yanmar 3YM30 (29 hk)' },
        { label: 'Motortimmar', value: '850 h' },
        { label: 'Skrov', value: 'GRP' },
        { label: 'Plotter', value: 'B&G Zeus3 9"' },
      ],
    },
  },
  {
    user: 'johan_n', // Hyrbåt, Stockholm
    title: 'Yamaha F40 utombordare — låga timmar, full service',
    body: `Yamaha F40HET 4-takt — nyserviceerad förra månaden. Säljs då jag uppgraderat till starkare motor.

**Servicehistorik:**
- Vatten-/oljepump bytt 2024
- Tändstift + filter bytt vår 2026
- Propeller i toppskick

Köptes ny 2019 av familjevänlig kapten — bara använd 380 timmar (loggbok följer med).

Passar perfekt på styrpulpetbåt 5-6 meter. Inkluderar fjärr-styrning, propeller och låsbar kåpa.

**Hämtas i Stockholm**. Kan transporteras inom Mälardalen mot självkostnad.`,
    listing_data: {
      price: 38000,
      currency: 'SEK',
      category: 'Motor',
      condition: 'Mycket bra',
      location: 'Stockholm',
      status: 'aktiv',
      images: [
        IMG('photo-1582731595404-2604fe89cb5b'),
      ],
      specs: [
        { label: 'Modell', value: 'Yamaha F40HET' },
        { label: 'Årsmodell', value: '2019' },
        { label: 'Effekt', value: '40 hk' },
        { label: 'Takt', value: '4-takt' },
        { label: 'Drifttimmar', value: '380 h' },
      ],
    },
  },
  {
    user: 'camilla_w', // Kajak, Tyresö
    title: 'Prijon Marlin havskajak — komplett paket med utrustning',
    body: `Säljer min Prijon Marlin (tysktillverkad havskajak i HTP-plast — i princip oförstörbar). Använd 3 säsonger, alltid sköljd och förvarad inomhus.

**Komplett paket inkluderar:**
- Prijon Marlin havskajak (gul/grafit)
- Prijon-paddel i kolfiber
- Spraydeck (neopren)
- Räddningsväst (Palm)
- Vattentäta packsäckar (3 st)
- Pump + reparationskit

**Bra för:**
- Långa skärgårdsturer (rätt sittposition i timmar)
- Vinden tar inte tag som i kompositkajaker
- Tål allt — perfekt för nybörjare som vill köpa "rätt från start"

**Hämtas i Tyresö.** Kan visa funktion vid kajaken före köp.`,
    listing_data: {
      price: 8500,
      currency: 'SEK',
      category: 'Båt',
      condition: 'Bra',
      location: 'Tyresö',
      status: 'aktiv',
      images: [
        IMG('photo-1517760444937-f6397edcbbcd'),
      ],
      specs: [
        { label: 'Modell', value: 'Prijon Marlin' },
        { label: 'Längd', value: '5,30 m' },
        { label: 'Material', value: 'HTP-plast' },
        { label: 'Vikt', value: '24 kg' },
      ],
    },
  },
  {
    user: 'birgitta_l', // Linjett 33, Sandhamn
    title: 'Räddningsväst-set Baltic 165N (4 st vuxen)',
    body: `Säljer 4 st Baltic Legend 165N uppblåsbara räddningsvästar. Köpta 2024, använda en säsong — inga utlösningar.

**Spec per väst:**
- 165N flytkraft (havsklassad)
- Hammar MA1 hydrostatisk utlösare
- Lifeline D-ring + reflexer
- Storlek: 40-150 kg (justerbar)
- Service-status: alla godkända, certifikat följer med

**Säljs som paket** — perfekt för segelbåt eller motorbåt med 2-4 personer ombord. Sparar ~3 000 kr jämfört med att köpa nya.

Ligger i Sandhamn — kan möta upp i Stavsnäs eller Värmdö efter överenskommelse.`,
    listing_data: {
      price: 1800,
      currency: 'SEK',
      category: 'Säkerhet',
      condition: 'Mycket bra',
      location: 'Sandhamn',
      status: 'aktiv',
      images: [
        IMG('photo-1559131397-f94da358f7ca'),
      ],
      specs: [
        { label: 'Modell', value: 'Baltic Legend 165N' },
        { label: 'Antal', value: '4 st' },
        { label: 'Flytkraft', value: '165 N' },
        { label: 'Inköpsår', value: '2024' },
      ],
    },
  },
]

async function getUserId(username) {
  const { data, error } = await sb.from('users').select('id').eq('username', username).single()
  if (error || !data) throw new Error(`User ${username} hittas inte: ${error?.message}`)
  return data.id
}

async function main() {
  console.log(`Seedar ${LISTINGS.length} Loppis-annonser...`)
  let inserted = 0
  let skipped = 0
  for (const listing of LISTINGS) {
    try {
      const userId = await getUserId(listing.user)

      // Skip om titel redan finns för samma user
      const { data: existing } = await sb
        .from('forum_threads')
        .select('id')
        .eq('user_id', userId)
        .eq('title', listing.title)
        .maybeSingle()
      if (existing) {
        console.log(`  ⊘ "${listing.title}" finns redan (skip)`)
        skipped++
        continue
      }

      const { data, error } = await sb.from('forum_threads').insert({
        category_id: 'loppis',
        user_id: userId,
        title: listing.title,
        body: listing.body,
        listing_data: listing.listing_data,
        // Sprid created_at: -1d till -14d, slumpmässigt
        created_at: new Date(Date.now() - (1 + Math.random() * 13) * 86400_000).toISOString(),
      }).select().single()

      if (error) throw error
      console.log(`  ✓ ${listing.user}: "${listing.title}" → ${data.id}`)
      inserted++
    } catch (err) {
      console.error(`  ✗ ${listing.user}: ${err.message}`)
    }
  }
  console.log(`\nKlart: ${inserted} insatta, ${skipped} skippade.`)
}

main()
