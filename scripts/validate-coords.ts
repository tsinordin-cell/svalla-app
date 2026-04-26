/**
 * validate-coords.ts — regressionsskydd för geografi-fel
 *
 * Kontrollerar att alla koordinater i seed-data ligger inom
 * Stockholms skärgård bounding box. Körs i CI eller lokalt:
 *
 *   npx tsx scripts/validate-coords.ts
 *
 * Exit-kod 1 om något fel hittas, 0 om allt är OK.
 */

import { ISLAND_COORDS } from '../src/lib/islandCoords'

// Stockholms skärgård bounding box (generös för att täcka även Roslagen + Singö)
const BOX = {
  minLat: 58.5, // söder om Landsort/Hasselö
  maxLat: 60.3, // norr om Singö (Norrtälje yttre)
  minLng: 17.0, // väster om Mörkö
  maxLng: 19.6, // öster om Söderarm/Rödlöga
} as const

type CoordEntry = {
  source: string
  name: string
  lat: number
  lng: number
}

function inBox(lat: number, lng: number): boolean {
  return (
    lat >= BOX.minLat &&
    lat <= BOX.maxLat &&
    lng >= BOX.minLng &&
    lng <= BOX.maxLng
  )
}

function classifyError(lat: number, lng: number): string {
  if (lat === 0 && lng === 0) return 'Null Island (saknar koord)'
  if (lng > 21) return 'Åbolands skärgård (Finland)'
  if (lng < 12 && lat > 58) return 'Norge eller västkusten'
  if (lat < 58.5) return 'För långt söder ut (Småland?)'
  if (lat > 60.3) return 'För långt norr ut (Bottenhavet?)'
  if (lng < 17.0) return 'För långt väster (inland?)'
  if (lng > 19.6) return 'För långt öster (öppet hav?)'
  return 'Utanför Stockholms skärgård'
}

function main(): number {
  const errors: Array<CoordEntry & { reason: string }> = []
  const entries: CoordEntry[] = []

  // ── Källa: src/lib/islandCoords.ts ────────────────────────────────
  for (const island of ISLAND_COORDS) {
    entries.push({
      source: 'islandCoords.ts',
      name: island.name,
      lat: island.lat,
      lng: island.lng,
    })
  }

  // (Lägg till fler källor här när de växer — t.ex. SEED_FERRY_ROUTES
  //  om de får koord, default map centers extraherade till konstanter, osv)

  for (const e of entries) {
    if (!inBox(e.lat, e.lng)) {
      errors.push({ ...e, reason: classifyError(e.lat, e.lng) })
    }
  }

  console.log(`\n📍 Geografi-validering — Svalla.se`)
  console.log(`Stockholms skärgård: ${BOX.minLat}–${BOX.maxLat}°N, ${BOX.minLng}–${BOX.maxLng}°E`)
  console.log(`Granskade: ${entries.length} koordinater`)

  if (errors.length === 0) {
    console.log(`✅ Alla koordinater ligger inom Stockholms skärgård.\n`)
    return 0
  }

  console.error(`\n❌ ${errors.length} koordinat(er) ligger utanför skärgården:\n`)
  for (const err of errors) {
    console.error(
      `  ${err.source}: "${err.name}" lat=${err.lat}, lng=${err.lng}\n` +
      `    → ${err.reason}\n`
    )
  }
  console.error(`Kör om efter fix.\n`)
  return 1
}

const exitCode = main()
process.exit(exitCode)
