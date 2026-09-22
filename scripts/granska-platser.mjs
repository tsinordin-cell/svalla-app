#!/usr/bin/env node
/**
 * granska-platser.mjs — datakvalitet i tabellen restaurants.
 *
 * Bakgrunden: 2026-09-21 hittades en krog på Nämndö med adress, webbplats,
 * betyg och foton från Helsingfors hamn, en bistro registrerad på fel ö, och
 * poster som hette "not the public sauna". Felen hittades för hand, en i taget.
 * Det här skriptet letar efter samma sorters fel i hela tabellen på en gång.
 *
 * Skriptet ÄNDRAR INGENTING. Det skriver en lista och avslutar med 0. Rättelser
 * görs som vanligt: SQL i supabase/datafix/ som körs via Supabase MCP.
 *
 *   node scripts/granska-platser.mjs            # alla kontroller
 *   node scripts/granska-platser.mjs --json     # maskinläsbart
 *
 * Kräver NEXT_PUBLIC_SUPABASE_URL och en nyckel: SUPABASE_SERVICE_ROLE_KEY,
 * annars NEXT_PUBLIC_SUPABASE_ANON_KEY (räcker — tabellen är läsbar publikt).
 */

import { createClient } from '@supabase/supabase-js'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!URL || !KEY) {
  console.error('✗ NEXT_PUBLIC_SUPABASE_URL och SUPABASE_SERVICE_ROLE_KEY (eller NEXT_PUBLIC_SUPABASE_ANON_KEY) måste vara satta.')
  process.exit(1)
}
const json = process.argv.includes('--json')
const db = createClient(URL, KEY, { auth: { persistSession: false } })

// Sverige plus Åland, grovt. Utanför rutan är det inte en svensk skärgårdsplats.
const SVERIGE = { minLat: 55, maxLat: 69.1, minLon: 10.5, maxLon: 24.2 }

// Länkar som inte är verksamhetens egen sida. Facebook och Instagram räknas som
// egen sida — många öbutiker har inget annat — men aggregatorer gör det inte.
const AGGREGATOR = /(tripadvisor|booking\.com|hotels\.com|expedia|yelp|foursquare|thefork|wolt|foodora|google\.[a-z.]+\/(maps|search)|hitta\.se|eniro|allabolag)/i

// Ord som avslöjar att "namnet" är en beskrivning ur en kartimport.
const ICKE_NAMN = /^(not |the |a )|^[a-zåäö]/

const avstandKm = (a, b) =>
  111 * Math.hypot(a.lat - b.lat, (a.lon - b.lon) * Math.cos((a.lat * Math.PI) / 180))

const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b)
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2
}

const { data: rader, error } = await db
  .from('restaurants')
  .select('id, slug, name, island, archipelago_region, latitude, longitude, website, description, opening_hours, verified_at, place_data_source, formatted_address, type')
  .is('hidden_at', null)
  .limit(5000)
if (error) {
  console.error('✗ kunde inte läsa restaurants:', error.message)
  process.exit(1)
}

const fynd = []
const anm = (allvar, kontroll, plats, detalj) =>
  fynd.push({ allvar, kontroll, slug: plats.slug, namn: plats.name, detalj })

// ── 1. Koordinater ────────────────────────────────────────────────────────────
for (const p of rader) {
  if (p.latitude == null || p.longitude == null) {
    anm('hög', 'saknar koordinat', p, 'syns inte på kartan')
  } else if (
    p.latitude < SVERIGE.minLat || p.latitude > SVERIGE.maxLat ||
    p.longitude < SVERIGE.minLon || p.longitude > SVERIGE.maxLon
  ) {
    anm('hög', 'koordinat utanför Sverige', p, `${p.latitude.toFixed(3)}, ${p.longitude.toFixed(3)}`)
  }
}

// ── 2. Platsen ligger långt från de andra på samma ö ──────────────────────────
// Ön har ingen egen koordinat i databasen, så medianen av öns platser får
// representera ön. Fungerar när ön har minst fyra platser.
const perO = new Map()
for (const p of rader) {
  if (!p.island || p.latitude == null) continue
  if (!perO.has(p.island)) perO.set(p.island, [])
  perO.get(p.island).push(p)
}
for (const [o, platser] of perO) {
  if (platser.length < 4) continue
  const mitt = { lat: median(platser.map(p => p.latitude)), lon: median(platser.map(p => p.longitude)) }
  for (const p of platser) {
    const km = avstandKm({ lat: p.latitude, lon: p.longitude }, mitt)
    if (km > 12) anm('hög', 'långt från sin ö', p, `${km.toFixed(0)} km från mitten av ${o} (${platser.length} platser)`)
  }
}

// ── 3. Adress i ett annat land ────────────────────────────────────────────────
for (const p of rader) {
  if (p.formatted_address && /\b(Finland|Norge|Norway|Danmark|Denmark|Eesti|Estonia|Deutschland|Suomi)\b/i.test(p.formatted_address)) {
    anm('hög', 'adress i annat land', p, p.formatted_address.slice(0, 60))
  }
}

// ── 4. Namn som inte är ett namn ──────────────────────────────────────────────
for (const p of rader) {
  const n = (p.name ?? '').trim()
  if (!n || ICKE_NAMN.test(n)) anm('hög', 'ser inte ut som ett namn', p, n || '(tomt)')
}

// ── 5. Samma webbplats på flera platser ───────────────────────────────────────
// Ofta rätt (en ägare driver hamn och krog) men det är så Blidö Värdshus fick
// Lidö Värdshus sida. Flaggas när namnen inte har något gemensamt ord.
// Generiska ord säger inget om att två platser hör ihop: "Blidö Värdshus" och
// "Lidö Värdshus" delar ordet värdshus och ligger ändå på olika öar.
const GENERISKT = new Set(['värdshus', 'wärdshus', 'krog', 'krogen', 'café', 'cafe', 'kafé', 'restaurang', 'bistro', 'hamn', 'hamnen', 'gästhamn', 'bastu', 'bastun', 'camping', 'strand', 'stranden', 'badet', 'brygga', 'bryggan', 'sjökrog', 'hotell', 'kiosk', 'marina', 'stugor', 'sjömack'])
const ord = (s) => new Set(((s ?? '').toLowerCase().match(/[a-zåäö]{4,}/g) ?? []).filter(w => !GENERISKT.has(w)))
const perWebb = new Map()
for (const p of rader) {
  if (!p.website) continue
  if (!perWebb.has(p.website)) perWebb.set(p.website, [])
  perWebb.get(p.website).push(p)
}
for (const [webb, platser] of perWebb) {
  if (platser.length < 2) continue
  for (let i = 0; i < platser.length; i++) {
    for (let j = i + 1; j < platser.length; j++) {
      const gemensamt = [...ord(platser[i].name)].some(w => ord(platser[j].name).has(w))
      // Samma ägare driver ofta flera saker på samma ö (Finnhamns krog, tältplats
      // och bastu delar sida med rätta). Det som skiljer ett fel från det normala
      // är avståndet: Blidö Värdshus hade Lidö Värdshus sida, tre mil bort.
      const kmIsar = platser[i].latitude != null && platser[j].latitude != null
        ? avstandKm({ lat: platser[i].latitude, lon: platser[i].longitude }, { lat: platser[j].latitude, lon: platser[j].longitude })
        : Infinity
      if (!gemensamt && kmIsar > 5) {
        anm('mellan', 'delar webbplats med en plats långt bort', platser[i], `samma länk som ${platser[j].name}, ${kmIsar === Infinity ? 'okänt avstånd' : kmIsar.toFixed(0) + ' km bort'}: ${webb.slice(0, 45)}`)
      }
    }
  }
}

// ── 6. Länk som inte är verksamhetens egen ────────────────────────────────────
for (const p of rader) {
  if (p.website && AGGREGATOR.test(p.website)) anm('mellan', 'länk till aggregator', p, p.website.slice(0, 60))
}

// ── 7. Dubbletter ─────────────────────────────────────────────────────────────
const nyckel = new Map()
for (const p of rader) {
  const k = `${(p.name ?? '').toLowerCase().trim()}|${p.island ?? ''}`
  if (nyckel.has(k)) anm('mellan', 'dubblett', p, `samma namn och ö som ${nyckel.get(k).slug}`)
  else nyckel.set(k, p)
}

// ── 7b. Exakt samma koordinat ────────────────────────────────────────────────
// Två platser kan ligga i samma hus, men exakt samma decimaler kommer nästan
// alltid från samma kartträff. Så hittades "Blidö Värdshus" — en kopia av
// Lidö Värdshus med fel namn, på Lidös koordinat.
const perPunkt = new Map()
for (const p of rader) {
  if (p.latitude == null) continue
  const k = `${p.latitude.toFixed(4)},${p.longitude.toFixed(4)}`
  if (!perPunkt.has(k)) perPunkt.set(k, [])
  perPunkt.get(k).push(p)
}
for (const [punkt, platser] of perPunkt) {
  if (platser.length < 2) continue
  anm('mellan', 'exakt samma koordinat', platser[0], `${platser.length} platser på ${punkt}: ${platser.map(p => p.name).join(', ')}`)
}

// ── 8. Uppgifter utan täckning ────────────────────────────────────────────────
const obekraftadeTider = rader.filter(p => p.opening_hours && !p.verified_at).length
const utanText = rader.filter(p => !p.description).length
const utanO = rader.filter(p => !p.island).length

// ── Utskrift ──────────────────────────────────────────────────────────────────
if (json) {
  console.log(JSON.stringify({ totalt: rader.length, obekraftadeTider, utanText, utanO, fynd }, null, 2))
  process.exit(0)
}

const ordning = { hög: 0, mellan: 1 }
fynd.sort((a, b) => ordning[a.allvar] - ordning[b.allvar] || a.kontroll.localeCompare(b.kontroll))

console.log(`\nGranskade ${rader.length} synliga platser.\n`)
let senast = ''
for (const f of fynd) {
  if (f.kontroll !== senast) {
    console.log(`\n── ${f.kontroll.toUpperCase()} (${f.allvar}) ${'─'.repeat(Math.max(0, 50 - f.kontroll.length))}`)
    senast = f.kontroll
  }
  console.log(`  ${f.namn} [${f.slug}] — ${f.detalj}`)
}

console.log(`\n── SAMMANFATTNING ─────────────────────────────────`)
console.log(`  ${fynd.filter(f => f.allvar === 'hög').length} fel att rätta, ${fynd.filter(f => f.allvar === 'mellan').length} att titta på`)
console.log(`  ${obekraftadeTider} platser har öppettider som ingen kontrollerat (visas inte förrän verified_at är satt)`)
console.log(`  ${utanText} platser saknar beskrivning`)
console.log(`  ${utanO} platser saknar ö\n`)
