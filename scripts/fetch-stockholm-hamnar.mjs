/**
 * Hämtar gästhamnar/marinor för Stockholms öar via Google Places API v1.
 *
 * Strikt regel: alla data från Google. Ingen sub-agent, inga gissade koordinater.
 *
 * Pipeline:
 *   1. node scripts/fetch-stockholm-hamnar.mjs
 *      → /tmp/stockholm-harbors.json
 *   2. node scripts/seed-stockholm-hamnar-from-google.mjs
 *      → INSERT i restaurants-tabellen
 *
 * Kräver GOOGLE_MAPS_API_KEY i .env.local.
 */
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const KEY = process.env.GOOGLE_MAPS_API_KEY
if (!KEY) {
  console.error('Saknar GOOGLE_MAPS_API_KEY i .env.local')
  process.exit(1)
}

// Stockholms öar med koordinater (från island-data.ts/islandCoords.ts)
// Sökradius i meter — gör generös för att fånga hamnar nära ön
const ISLANDS = [
  // Innerskärgården
  { slug: 'vaxholm',       name: 'Vaxholm',       lat: 59.4033, lng: 18.3264, radius: 3000 },
  { slug: 'resaro',        name: 'Resarö',        lat: 59.4288, lng: 18.3356, radius: 3000 },
  { slug: 'rindo',         name: 'Rindö',         lat: 59.3961, lng: 18.4009, radius: 3000 },
  { slug: 'fjaderholmarna',name: 'Fjäderholmarna',lat: 59.3263, lng: 18.1314, radius: 1500 },
  // Mellanskärgården
  { slug: 'grinda',        name: 'Grinda',        lat: 59.4111, lng: 18.5630, radius: 2500 },
  { slug: 'finnhamn',      name: 'Finnhamn',      lat: 59.4775, lng: 18.8156, radius: 2500 },
  { slug: 'moja',          name: 'Möja',          lat: 59.4266, lng: 18.8861, radius: 5000 },
  { slug: 'svartso',       name: 'Svartsö',       lat: 59.4531, lng: 18.6842, radius: 3000 },
  { slug: 'ingmarso',      name: 'Ingmarsö',      lat: 59.4737, lng: 18.7694, radius: 3000 },
  { slug: 'husaro',        name: 'Husarö',        lat: 59.5067, lng: 18.8472, radius: 2500 },
  { slug: 'gallno',        name: 'Gällnö',        lat: 59.3936, lng: 18.7228, radius: 3000 },
  { slug: 'runmaro',       name: 'Runmarö',       lat: 59.2769, lng: 18.7743, radius: 3500 },
  { slug: 'namdo',         name: 'Nämdö',         lat: 59.1833, lng: 18.6833, radius: 3500 },
  { slug: 'ljustero',      name: 'Ljusterö',      lat: 59.5061, lng: 18.5969, radius: 5000 },
  { slug: 'sandhamn',      name: 'Sandhamn',      lat: 59.2879, lng: 18.9108, radius: 2500 },
  // Södra
  { slug: 'uto',           name: 'Utö',           lat: 58.9361, lng: 18.2503, radius: 4000 },
  { slug: 'orno',          name: 'Ornö',          lat: 59.0582, lng: 18.4006, radius: 5000 },
  { slug: 'dalaro',        name: 'Dalarö',        lat: 59.1353, lng: 18.4106, radius: 3000 },
  { slug: 'smaadalaro',    name: 'Smådalarö',     lat: 59.1619, lng: 18.4446, radius: 2500 },
  { slug: 'galo',          name: 'Gålö',          lat: 59.0914, lng: 18.2814, radius: 3000 },
  { slug: 'fjardlang',     name: 'Fjärdlång',     lat: 59.0371, lng: 18.5233, radius: 2500 },
  { slug: 'nattaro',       name: 'Nåttarö',       lat: 58.8717, lng: 18.1203, radius: 3000 },
  { slug: 'landsort',      name: 'Landsort',      lat: 58.7440, lng: 17.8640, radius: 2500 },
  { slug: 'asko',          name: 'Askö',          lat: 58.8226, lng: 17.6426, radius: 3000 },
  { slug: 'morko',         name: 'Mörkö',         lat: 59.0050, lng: 17.6400, radius: 4000 },
  { slug: 'musko',         name: 'Muskö',         lat: 58.9958, lng: 18.1149, radius: 4000 },
  { slug: 'toro',          name: 'Torö',          lat: 58.8246, lng: 17.8414, radius: 4000 },
  // Norra (Roslagen)
  { slug: 'arholma',       name: 'Arholma',       lat: 59.8500, lng: 19.1167, radius: 3000 },
  { slug: 'furusund',      name: 'Furusund',      lat: 59.6606, lng: 18.9069, radius: 2500 },
  { slug: 'blido',         name: 'Blidö',         lat: 59.6072, lng: 18.8944, radius: 5000 },
  { slug: 'norrora',       name: 'Norröra',       lat: 59.6458, lng: 19.0377, radius: 2500 },
  { slug: 'fejan',         name: 'Fejan',         lat: 59.7399, lng: 19.1659, radius: 2000 },
  { slug: 'rodloga',       name: 'Rödlöga',       lat: 59.5919, lng: 19.1663, radius: 2500 },
  { slug: 'singo',         name: 'Singö',         lat: 60.1859, lng: 18.7543, radius: 5000 },
  { slug: 'lido',          name: 'Lidö',          lat: 59.7854, lng: 19.0656, radius: 2500 },
  { slug: 'graddo',        name: 'Gräddö',        lat: 59.7642, lng: 19.0321, radius: 2500 },
  { slug: 'vaddo',         name: 'Väddö',         lat: 60.0037, lng: 18.8310, radius: 7000 },
  { slug: 'yxlan',         name: 'Yxlan',         lat: 59.6167, lng: 18.8532, radius: 3500 },
]

// Söktermer per ö — kombinerar alla resultat per ö och deduperar via google_place_id
const QUERIES = ['gästhamn', 'marina', 'guest harbor', 'hamn']

const PLACES_API = 'https://places.googleapis.com/v1/places:searchText'

async function searchTextForIsland(island, query) {
  const body = {
    textQuery: `${query} ${island.name}`,
    locationBias: {
      circle: {
        center: { latitude: island.lat, longitude: island.lng },
        radius: island.radius,
      },
    },
    languageCode: 'sv',
    regionCode: 'SE',
    maxResultCount: 10,
  }
  const res = await fetch(PLACES_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.rating,places.userRatingCount,places.primaryType,places.websiteUri,places.nationalPhoneNumber,places.photos',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    console.error(`  API-fel (${res.status}) för "${query} ${island.name}": ${text.slice(0, 200)}`)
    return []
  }
  const json = await res.json()
  return json.places || []
}

// Filter: är detta verkligen en hamn?
const HARBOR_TYPES = new Set(['marina', 'harbor', 'boat_ramp', 'boating_facility', 'fishing_charter'])
const HARBOR_KEYWORDS = ['gästhamn', 'marina', 'hamn', 'brygga', 'bryggan', 'kaj']

function isHarborLikely(p) {
  const types = (p.types || []).map(t => t.toLowerCase())
  if (types.some(t => HARBOR_TYPES.has(t))) return true
  if (p.primaryType && HARBOR_TYPES.has(p.primaryType.toLowerCase())) return true
  const name = (p.displayName?.text || '').toLowerCase()
  if (HARBOR_KEYWORDS.some(k => name.includes(k))) return true
  return false
}

// Avstånd mellan koord 1 och 2 i km (Haversine)
function distKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function main() {
  console.log(`Söker hamnar för ${ISLANDS.length} öar med ${QUERIES.length} söktermer/ö...`)
  const all = new Map()  // google_place_id → place

  for (const island of ISLANDS) {
    console.log(`\n→ ${island.name}`)
    const islandResults = new Map()
    for (const q of QUERIES) {
      const places = await searchTextForIsland(island, q)
      for (const p of places) {
        if (!isHarborLikely(p)) continue
        if (!p.id) continue
        // Dedupera per ö
        if (islandResults.has(p.id)) continue
        // Validera distans (skip om >2 × radius — Google kan returnera långt utanför)
        if (p.location) {
          const km = distKm(island.lat, island.lng, p.location.latitude, p.location.longitude)
          if (km > island.radius / 1000 * 2) continue
        }
        islandResults.set(p.id, {
          google_place_id: p.id,
          name: p.displayName?.text || '?',
          lat: p.location?.latitude,
          lng: p.location?.longitude,
          address: p.formattedAddress,
          types: p.types,
          primary_type: p.primaryType,
          rating: p.rating,
          ratings_count: p.userRatingCount,
          website: p.websiteUri,
          phone: p.nationalPhoneNumber,
          photo_refs: (p.photos || []).slice(0, 3).map(ph => ph.name),
          area: island.name,
          island_slug: island.slug,
          archipelago_region: 'stockholm',
          city: 'Stockholm',
          query_used: q,
        })
      }
      // Liten paus så vi inte hammrar API:et
      await new Promise(r => setTimeout(r, 100))
    }
    console.log(`  Hittade ${islandResults.size} unika hamn-kandidater`)
    for (const [id, p] of islandResults) {
      if (!all.has(id)) all.set(id, p)
    }
  }

  const result = {
    fetched_at: new Date().toISOString(),
    count: all.size,
    by_category: {
      harbor: Array.from(all.values()),
    },
  }

  const out = '/tmp/stockholm-harbors.json'
  fs.writeFileSync(out, JSON.stringify(result, null, 2))

  console.log(`\n=== KLART ===`)
  console.log(`Totalt: ${all.size} unika hamn-kandidater`)
  console.log(`Output: ${out}`)
  console.log(`\nNästa steg: kontrollera ${out} manuellt och kör sedan:`)
  console.log(`  node scripts/seed-stockholm-hamnar-from-google.mjs`)
}
main().catch(err => { console.error(err); process.exit(1) })
