#!/usr/bin/env node
/**
 * SVALLA — Geocoding-script
 * Hämtar alla platser från Supabase, frågar Nominatim/OpenStreetMap,
 * jämför koordinater och genererar fix-coordinates-v3.sql
 *
 * Kör: node scripts/fix-coordinates.mjs
 * Output: scripts/fix-coordinates-v3.sql + scripts/fix-coordinates-report.txt
 */

const SUPABASE_URL  = 'https://oiklttwylndesewauytj.supabase.co'
const SUPABASE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pa2x0dHd5bG5kZXNld2F1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTIwNjgsImV4cCI6MjA5MTgyODA2OH0.rFt1VOaV9QVSKTbt3E_64krTtpmOIiU5fonxnb7Ml4g'

// Avstånd i meter där vi flaggar som "granska manuellt"
const MANUAL_REVIEW_THRESHOLD_M = 500
// Avstånd i meter — uppdaterar bara om Nominatim föreslår mer än denna flytt
const MIN_UPDATE_THRESHOLD_M    = 80

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Hjälpfunktioner ──────────────────────────────────────────────

/** Haversine-avstånd i meter mellan två koordinatpar */
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

/** Hämtar alla restauranger/platser från Supabase */
async function fetchPlaces() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/restaurants?select=id,name,island,latitude,longitude,type&order=name.asc&limit=1000`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  if (!res.ok) throw new Error(`Supabase-fel: ${res.status} ${await res.text()}`)
  return res.json()
}

/** Frågar Nominatim om bästa koordinat för en plats */
async function geocode(name, island) {
  const query = island ? `${name} ${island} Sweden` : `${name} Sweden`
  const url   = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=3&countrycodes=se`

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Svalla.se-coordinate-fixer/1.0 (tsinordin@gmail.com)' }
  })
  if (!res.ok) return null

  const results = await res.json()
  if (!results.length) return null

  // Prioritera resultat med "skärgård"-nyckelord i display_name
  const best = results.find(r =>
    r.display_name.toLowerCase().includes('skärgård') ||
    r.display_name.toLowerCase().includes('archipelago') ||
    (island && r.display_name.toLowerCase().includes(island.toLowerCase()))
  ) || results[0]

  return { lat: parseFloat(best.lat), lng: parseFloat(best.lon), display: best.display_name }
}

/** Väntar lite mellan requests för att respektera Nominatim rate limit (1 req/s) */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

// ── Huvudlogik ────────────────────────────────────────────────────

async function main() {
  console.log('Hämtar platser från Supabase...')
  const places = await fetchPlaces()
  console.log(`Hittade ${places.length} platser\n`)

  const updates      = []  // Säkra uppdateringar (< MANUAL_REVIEW_THRESHOLD_M)
  const manualReview = []  // Stora avvikelser — granska manuellt
  const noResult     = []  // Nominatim hittade ingenting
  const unchanged    = []  // Koordinater redan korrekta

  for (let i = 0; i < places.length; i++) {
    const p = places[i]
    process.stdout.write(`[${i+1}/${places.length}] ${p.name} (${p.island ?? '?'})... `)

    if (!p.latitude || !p.longitude) {
      console.log('⚠ SAKNAR koordinater — hoppar över')
      noResult.push({ ...p, reason: 'Saknar koordinater i DB' })
      await sleep(1100)
      continue
    }

    const geo = await geocode(p.name, p.island)
    if (!geo) {
      console.log('✗ Nominatim hittade inget')
      noResult.push({ ...p, reason: 'Nominatim: inga resultat' })
      await sleep(1100)
      continue
    }

    const dist = Math.round(haversine(p.latitude, p.longitude, geo.lat, geo.lng))

    if (dist < MIN_UPDATE_THRESHOLD_M) {
      console.log(`✓ OK (${dist}m — ingen ändring behövs)`)
      unchanged.push(p)
    } else if (dist < MANUAL_REVIEW_THRESHOLD_M) {
      console.log(`→ Uppdaterar (${dist}m flytt)`)
      updates.push({ ...p, newLat: geo.lat, newLng: geo.lng, dist, display: geo.display })
    } else {
      console.log(`⚠ STOR AVVIKELSE ${dist}m — kräver manuell granskning`)
      manualReview.push({ ...p, newLat: geo.lat, newLng: geo.lng, dist, display: geo.display })
    }

    await sleep(1100) // Nominatim: max 1 req/s
  }

  // ── Generera SQL ────────────────────────────────────────────────
  const now = new Date().toISOString().split('T')[0]
  let sql = `-- ============================================================
-- SVALLA — Auto-genererade koordinatkorrigeringar
-- Genererat: ${now}
-- Script: scripts/fix-coordinates.mjs
-- Källa: Nominatim/OpenStreetMap
--
-- Kontrollerade: ${places.length} platser
-- Uppdateras här: ${updates.length}
-- Kräver manuell granskning: ${manualReview.length}
-- Inga resultat: ${noResult.length}
-- Redan korrekta: ${unchanged.length}
-- ============================================================

`

  if (updates.length) {
    sql += `-- ── Säkra korrigeringar (avvikelse ${MIN_UPDATE_THRESHOLD_M}–${MANUAL_REVIEW_THRESHOLD_M}m) ──────────────────\n`
    for (const u of updates) {
      sql += `-- ${u.name} (${u.island ?? '?'}) — ${u.dist}m flytt\n`
      sql += `-- Nominatim: ${u.display}\n`
      sql += `UPDATE restaurants SET latitude = ${u.newLat}, longitude = ${u.newLng} WHERE id = '${u.id}';\n\n`
    }
  }

  if (manualReview.length) {
    sql += `\n-- ── GRANSKA MANUELLT (avvikelse > ${MANUAL_REVIEW_THRESHOLD_M}m) ──────────────────────────────\n`
    sql += `-- Avkommentera och kör RAD FÖR RAD efter att du verifierat i Google Maps\n\n`
    for (const u of manualReview) {
      sql += `-- ${u.name} (${u.island ?? '?'}) — ${u.dist}m AVVIKELSE\n`
      sql += `-- Nuvarande: ${u.latitude}, ${u.longitude}\n`
      sql += `-- Nominatim: ${u.newLat}, ${u.newLng}  →  ${u.display}\n`
      sql += `-- UPDATE restaurants SET latitude = ${u.newLat}, longitude = ${u.newLng} WHERE id = '${u.id}';\n\n`
    }
  }

  // ── Generera rapport ────────────────────────────────────────────
  let report = `SVALLA — Koordinatrapport ${now}\n${'='.repeat(60)}\n\n`
  report += `Totalt kontrollerade: ${places.length}\n`
  report += `Uppdateras automatiskt: ${updates.length}\n`
  report += `Kräver manuell granskning: ${manualReview.length}\n`
  report += `Inga träffar i Nominatim: ${noResult.length}\n`
  report += `Redan korrekta: ${unchanged.length}\n\n`

  if (manualReview.length) {
    report += `\nMANUELL GRANSKNING KRÄVS:\n${'-'.repeat(40)}\n`
    for (const u of manualReview) {
      report += `${u.name} (${u.island ?? '?'})\n`
      report += `  Nuvarande:  ${u.latitude}, ${u.longitude}\n`
      report += `  Nominatim:  ${u.newLat}, ${u.newLng} (${u.dist}m skillnad)\n`
      report += `  Nominatim-svar: ${u.display}\n\n`
    }
  }

  if (noResult.length) {
    report += `\nINGA TRÄFFAR (kontrollera manuellt):\n${'-'.repeat(40)}\n`
    for (const u of noResult) {
      report += `${u.name} (${u.island ?? '?'}) — ${u.reason}\n`
      report += `  Nuvarande: ${u.latitude}, ${u.longitude}\n\n`
    }
  }

  // ── Skriv filer ─────────────────────────────────────────────────
  const sqlPath    = path.join(__dirname, 'fix-coordinates-v3.sql')
  const reportPath = path.join(__dirname, 'fix-coordinates-report.txt')
  writeFileSync(sqlPath, sql, 'utf8')
  writeFileSync(reportPath, report, 'utf8')

  console.log(`\n${'='.repeat(60)}`)
  console.log(`✓ SQL-fil:    scripts/fix-coordinates-v3.sql`)
  console.log(`✓ Rapport:    scripts/fix-coordinates-report.txt`)
  console.log(`\nNästa steg:`)
  console.log(`  1. Kör SQL-filen i Supabase SQL Editor (säkra fixes direkt)`)
  console.log(`  2. Granska "MANUELL GRANSKNING"-sektionen i rapporten`)
  console.log(`  3. Använd /admin/koordinater i appen för visuell finjustering`)
}

main().catch(err => { console.error(err); process.exit(1) })
