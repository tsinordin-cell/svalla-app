#!/usr/bin/env node
/**
 * SVALLA — Smart koordinatfixare
 * Strategi:
 *  1. Reverse geocode varje plats → kolla om den ligger i vatten
 *  2. Om vatten: geocoda ÖNS namn → flytta till ö-centrum
 *  3. Generera UPDATE SQL för service_role-körning
 *
 * Kör: node scripts/fix-coordinates.mjs
 */

import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SUPABASE_URL = 'https://oiklttwylndesewauytj.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pa2x0dHd5bG5kZXNld2F1eXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNTIwNjgsImV4cCI6MjA5MTgyODA2OH0.rFt1VOaV9QVSKTbt3E_64krTtpmOIiU5fonxnb7Ml4g'

// Kända ö-koordinater — fallback om Nominatim inte hittar ön
const ISLAND_COORDS = {
  'sandhamn':        [59.2861, 18.9143],
  'grinda':          [59.6028, 18.7275],
  'finnhamn':        [59.6325, 18.8122],
  'utö':             [58.9603, 17.8897],
  'möja':            [59.4398, 18.8312],
  'ingmarsö':        [59.4752, 18.7445],
  'svartsö':         [59.4658, 18.7285],
  'ljusterö':        [59.5100, 18.6200],
  'blidö':           [59.6050, 18.9000],
  'arholma':         [59.8450, 19.0800],
  'gällnö':          [59.5600, 18.7800],
  'nämndö':          [59.3300, 18.7400],
  'ornö':            [59.0500, 18.3800],
  'muskö':           [58.9833, 17.9833],
  'huvudskär':       [58.9667, 18.6000],
  'landsort':        [58.7333, 17.8667],
  'kymmendö':        [58.9500, 18.5500],
  'trosa':           [58.8950, 17.5500],
  'oxelösund':       [58.6800, 17.1000],
  'nynäshamn':       [58.9031, 17.9467],
  'dalarö':          [59.1333, 18.4000],
  'gustavsberg':     [59.3300, 18.3900],
  'vaxholm':         [59.4022, 18.3283],
  'djurö':           [59.1950, 18.6950],
  'tyresö':          [59.2400, 18.2300],
  'nacka':           [59.3100, 18.1600],
  'värmdö':          [59.3200, 18.5000],
  'ingarö':          [59.2800, 18.4800],
  'stavsnäs':        [59.1700, 18.6600],
  'bullandö':        [59.2400, 18.7400],
  'tenö':            [59.1000, 17.9800],
  'björkö':          [57.6900, 11.6400],
  'marstrand':       [57.8864, 11.5950],
  'grebbestad':      [58.6900, 11.2600],
  'fjällbacka':      [58.5983, 11.2897],
  'hamburgsund':     [58.5400, 11.2700],
  'lysekil':         [58.2750, 11.4350],
  'smögen':          [58.3550, 11.2250],
  'kungshamn':       [58.3700, 11.2500],
  'grundsund':       [58.2500, 11.4100],
  'käringön':        [58.0000, 11.3000],
  'åstol':           [57.9200, 11.6000],
  'styrsö':          [57.5950, 11.7400],
  'donsö':           [57.5700, 11.7700],
  'vrångö':          [57.5500, 11.7800],
  'aspö':            [58.7800, 17.3300],
  'tylösand':        [56.6600, 12.7000],
  'landskrona':      [55.8700, 12.8300],
  'barsebäck':       [55.7400, 12.9100],
  'arild':           [56.2100, 12.5600],
  'ängelholm':       [56.2430, 12.8620],
  'bockholmen':      [59.2300, 18.3800],
  'finnboda':        [59.3100, 18.1300],
  'nacka strand':    [59.3000, 18.1500],
  'stockholm':       [59.3293, 18.0686],
  'artipelag':       [59.3500, 18.4800],
  'lidingö':         [59.3600, 18.1700],
  'ekerö':           [59.2900, 17.8200],
  'mälaröarna':      [59.2800, 17.8000],
  'sigtuna':         [59.6178, 17.7233],
  'norrtälje':       [59.7580, 18.7060],
  'åhus':            [55.9280, 14.3100],
  'falsterbo':       [55.3800, 12.8300],
  'mölle':           [56.2800, 12.4960],
  'torekov':         [56.4300, 12.6200],
  'viken':           [56.1450, 12.5700],
  'höganäs':         [56.2000, 12.5600],
  'helsingborg':     [56.0465, 12.6945],
  'gothenburg':      [57.7089, 11.9746],
  'göteborg':        [57.7089, 11.9746],
  'kungsbacka':      [57.5000, 12.0700],
  'varberg':         [57.1060, 12.2510],
  'falkenberg':      [56.9050, 12.4920],
  'halmstad':        [56.6740, 12.8577],
  'borgholm':        [56.8800, 16.6600],
  'öland':           [56.6700, 16.6300],
  'gotland':         [57.4684, 18.4867],
  'visby':           [57.6348, 18.2948],
  'oskarshamn':      [57.2640, 16.4490],
  'karlskrona':      [56.1616, 15.5866],
  'ronneby':         [56.2100, 15.2800],
  'hanö':            [56.0100, 14.8500],
  'kristianstad':    [56.0310, 14.1570],
  'simrishamn':      [55.5570, 14.3570],
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) *
            Math.sin(dLon/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

/** Returnerar true om koordinaten troligen är i vatten */
async function isInWater(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=14`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Svalla.se-coordinate-fixer/2.0 (tsinordin@gmail.com)' }
  })
  if (!res.ok) return false
  const data = await res.json()

  if (!data || data.error) return true // Ingen träff = troligen hav

  const type    = (data.type ?? '').toLowerCase()
  const cls     = (data.class ?? '').toLowerCase()
  const display = (data.display_name ?? '').toLowerCase()

  // Vatten-indikatorer
  const waterTypes = ['water', 'bay', 'sea', 'ocean', 'strait', 'sound', 'fjord',
                      'wetland', 'harbour', 'anchorage', 'natural']
  const waterWords = ['sundet', 'viken', 'fjärden', 'bukten', 'hamnen', 'havet',
                      'sjön', 'ocean', 'sea', 'strait', ' bay', 'sound']

  if (waterTypes.includes(type)) return true
  if (cls === 'natural' && type === 'water') return true
  if (waterWords.some(w => display.includes(w))) return true

  return false
}

/** Försöker hitta ö-koordinater via Nominatim */
async function geocodeIsland(islandName) {
  if (!islandName) return null

  // Kolla lokal lookup först (snabb)
  const key = islandName.toLowerCase().trim()
  const local = ISLAND_COORDS[key]
  if (local) return { lat: local[0], lng: local[1], source: 'lokalt' }

  // Nominatim
  const query = `${islandName} Sweden island`
  const url   = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=3&countrycodes=se`
  const res   = await fetch(url, {
    headers: { 'User-Agent': 'Svalla.se-coordinate-fixer/2.0 (tsinordin@gmail.com)' }
  })
  if (!res.ok) return null
  const results = await res.json()
  if (!results.length) return null

  return {
    lat: parseFloat(results[0].lat),
    lng: parseFloat(results[0].lon),
    source: 'nominatim'
  }
}

async function fetchPlaces() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/restaurants?select=id,name,island,latitude,longitude,type&order=name.asc&limit=1000`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  )
  if (!res.ok) throw new Error(`Supabase-fel: ${res.status}`)
  return res.json()
}

async function main() {
  console.log('Hämtar alla platser från Supabase...')
  const places = await fetchPlaces()
  console.log(`${places.length} platser laddade\n`)

  const fixes        = []   // Säkra fixes — i vatten, ersätts med ö-centrum
  const noCoords     = []   // Saknar koordinater helt
  const alreadyOk    = []   // Ligger redan på land
  const cantFix      = []   // I vatten men hittar inte ö-koordinater

  for (let i = 0; i < places.length; i++) {
    const p = places[i]
    const progress = `[${String(i+1).padStart(3)}/${places.length}]`

    if (!p.latitude || !p.longitude) {
      process.stdout.write(`${progress} ${p.name} — SAKNAR KOORDINATER\n`)
      noCoords.push(p)
      continue
    }

    process.stdout.write(`${progress} ${p.name}... `)
    const inWater = await isInWater(p.latitude, p.longitude)
    await sleep(1200)

    if (!inWater) {
      process.stdout.write(`✓ land\n`)
      alreadyOk.push(p)
      continue
    }

    process.stdout.write(`⚠ VATTEN → söker ö... `)

    // Försök hitta ö-koordinater
    const islandGeo = await geocodeIsland(p.island)
    await sleep(1200)

    if (!islandGeo) {
      process.stdout.write(`✗ hittade inte ${p.island ?? '?'}\n`)
      cantFix.push({ ...p, reason: `Okänd ö: ${p.island ?? '?'}` })
      continue
    }

    const dist = Math.round(haversine(p.latitude, p.longitude, islandGeo.lat, islandGeo.lng))
    process.stdout.write(`→ ${islandGeo.source} (${dist}m) ✓\n`)
    fixes.push({ ...p, newLat: islandGeo.lat, newLng: islandGeo.lng, dist, source: islandGeo.source })
  }

  // ── Sammanfattning ────────────────────────────────────────────
  console.log(`\n${'═'.repeat(60)}`)
  console.log(`Resultat:`)
  console.log(`  ✓ Redan på land:      ${alreadyOk.length}`)
  console.log(`  → Fixas automatiskt:  ${fixes.length}`)
  console.log(`  ✗ Saknar koordinater: ${noCoords.length}`)
  console.log(`  ? Kan ej fixas auto:  ${cantFix.length}`)
  console.log(`${'═'.repeat(60)}\n`)

  // ── Generera SQL ─────────────────────────────────────────────
  const now = new Date().toISOString().split('T')[0]
  let sql = `-- ============================================================
-- SVALLA — Automatiska koordinatkorrigeringar v3
-- Genererat: ${now}
-- Strategi: reverse geocoding → flytta vatten-platser till ö-centrum
--
-- Totalt kontrollerade: ${places.length}
-- Redan korrekta (land): ${alreadyOk.length}
-- Fixas i detta script: ${fixes.length}
-- Saknar koordinater:   ${noCoords.length}
-- Kunde ej fixas auto:  ${cantFix.length}
--
-- KÖR DETTA I SUPABASE SQL EDITOR (kräver service_role)
-- ============================================================

BEGIN;

`

  for (const f of fixes) {
    sql += `-- ${f.name} (${f.island ?? '?'}) — ${f.dist}m flytt via ${f.source}\n`
    sql += `UPDATE restaurants SET latitude = ${f.newLat}, longitude = ${f.newLng} WHERE id = '${f.id}';\n\n`
  }

  sql += `COMMIT;\n`

  if (cantFix.length) {
    sql += `\n-- ── Kan EJ fixas automatiskt — hantera via /admin/koordinater ──\n`
    for (const p of cantFix) {
      sql += `-- ${p.name} (${p.island ?? '?'}) — ${p.reason}\n`
      sql += `--   Nuvarande: ${p.latitude}, ${p.longitude}\n`
    }
  }

  if (noCoords.length) {
    sql += `\n-- ── SAKNAR koordinater helt ──\n`
    for (const p of noCoords) {
      sql += `-- ${p.name} (${p.island ?? '?'}) — lägg till koordinater via /admin/koordinater\n`
    }
  }

  // ── Generera rapport ─────────────────────────────────────────
  let report = `SVALLA — Koordinatrapport ${now}\n${'='.repeat(60)}\n\n`
  report += `Totalt: ${places.length} platser kontrollerade\n`
  report += `✓ Redan på land:     ${alreadyOk.length}\n`
  report += `→ Fixas automatiskt: ${fixes.length}\n`
  report += `✗ Saknar coords:     ${noCoords.length}\n`
  report += `? Kan ej fixas:      ${cantFix.length}\n\n`

  if (cantFix.length) {
    report += `\nMÅSTE FIXAS MANUELLT via /admin/koordinater:\n${'-'.repeat(40)}\n`
    for (const p of cantFix) {
      report += `• ${p.name} (${p.island ?? '?'}) — ${p.latitude}, ${p.longitude}\n`
    }
  }

  if (noCoords.length) {
    report += `\nSAKNAR KOORDINATER:\n${'-'.repeat(40)}\n`
    for (const p of noCoords) {
      report += `• ${p.name} (${p.island ?? '?'})\n`
    }
  }

  const sqlPath    = path.join(__dirname, 'fix-coordinates-v3.sql')
  const reportPath = path.join(__dirname, 'fix-coordinates-report.txt')
  writeFileSync(sqlPath, sql, 'utf8')
  writeFileSync(reportPath, report, 'utf8')

  console.log(`✓ SQL-fil:   scripts/fix-coordinates-v3.sql  (${fixes.length} fixes)`)
  console.log(`✓ Rapport:   scripts/fix-coordinates-report.txt`)
  console.log(`\nNästa steg:`)
  console.log(`  1. Kör scripts/fix-coordinates-v3.sql i Supabase SQL Editor`)
  console.log(`  2. Rätta resterande ${cantFix.length + noCoords.length} platser via /admin/koordinater`)
}

main().catch(err => { console.error(err); process.exit(1) })
