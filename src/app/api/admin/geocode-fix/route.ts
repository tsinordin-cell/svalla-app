import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export const maxDuration = 300 // 5 min — Vercel Pro/Hobby max

// Kända ö-koordinater — utökad tabell (byggd från faktiska datakörningar)
const ISLAND_COORDS: Record<string, [number, number]> = {
  // Stockholm — innerskärgård
  'sandhamn':        [59.2861, 18.9143], 'grinda':          [59.6028, 18.7275],
  'finnhamn':        [59.6325, 18.8122], 'utö':             [58.9603, 17.8897],
  'möja':            [59.4380, 18.8285], 'ingmarsö':        [59.4752, 18.7445],
  'svartsö':         [59.4658, 18.7285], 'ljusterö':        [59.5100, 18.6200],
  'blidö':           [59.6050, 18.9000], 'arholma':         [59.8450, 19.0800],
  'gällnö':          [59.5600, 18.7800], 'nämndö':          [59.2500, 18.7700],
  'nämdö':           [59.2500, 18.7700], 'ornö':            [59.0500, 18.3800],
  'muskö':           [58.9833, 17.9833], 'huvudskär':       [58.9667, 18.6000],
  'landsort':        [58.7333, 17.8667], 'kymmendö':        [59.0500, 18.5500],
  'trosa':           [58.8950, 17.5500], 'oxelösund':       [58.6800, 17.1000],
  'nynäshamn':       [58.9031, 17.9467], 'dalarö':          [59.1333, 18.4000],
  'gustavsberg':     [59.3300, 18.3900], 'vaxholm':         [59.4022, 18.3283],
  'djurö':           [59.1950, 18.6950], 'tyresö':          [59.2400, 18.2300],
  'nacka':           [59.3100, 18.1600], 'nacka strand':    [59.3000, 18.1500],
  'värmdö':          [59.3200, 18.5000], 'ingarö':          [59.2800, 18.4800],
  'stavsnäs':        [59.1700, 18.6600], 'bullandö':        [59.2400, 18.7400],
  'tenö':            [59.1000, 17.9800], 'aspö':            [58.7800, 17.3300],
  'bockholmen':      [59.2300, 18.3800], 'artipelag':       [59.3500, 18.4800],
  'lidingö':         [59.3600, 18.1700], 'ekerö':           [59.2900, 17.8200],
  'stockholm':       [59.3293, 18.0686], 'finnboda':        [59.3100, 18.1300],
  'sigtuna':         [59.6178, 17.7233], 'norrtälje':       [59.7580, 18.7060],
  'ängsö':           [59.6083, 17.0442], 'rindö':           [59.3990, 18.4050],
  // Stockholm — norra skärgård
  'furusund':        [59.6683, 18.9200], 'fejan':           [59.6700, 18.9600],
  'husarö':          [59.6403, 18.8614],
  'rödlöga':         [59.6200, 18.8100], 'norröra':         [59.7200, 19.0500],
  'lidö':            [59.6400, 18.7900], 'siarö':           [59.5700, 18.7500],
  'högmarsö':        [59.5800, 18.8800], 'harö':            [59.3550, 18.8900],
  'runmarö':         [59.2200, 18.7700], 'räfsnäs':         [59.2000, 18.7500],
  'tjockö':          [59.1600, 18.7200], 'djurhamn':        [59.1867, 18.7100],
  'bullerö':         [59.2200, 18.6822],
  // Stockholm — södra skärgård
  'rånö':            [59.0700, 18.1500], 'nåttarö':         [58.9700, 18.2000],
  'torö':            [58.8500, 17.8800], 'idöborg':         [58.9500, 17.4500],
  'gålö':            [59.0000, 17.8800], 'hölö':            [59.0000, 17.5500],
  'duvnäs':          [59.3050, 18.1700], 'klintsundet':     [59.4000, 18.5000],
  'södermöja':       [59.4400, 18.8900], 'getfoten':        [59.1200, 18.4200],
  'årsta havsbad':   [59.1500, 17.9500], 'rögrund':         [60.0200, 18.4800],
  // Östkusten
  'gotland':         [57.4684, 18.4867], 'visby':           [57.6348, 18.2948],
  'öland':           [56.6700, 16.6300], 'borgholm':        [56.8800, 16.6600],
  'oskarshamn':      [57.2640, 16.4490], 'utlängan':        [55.7933, 15.8433],
  'sturkö':          [56.0833, 15.6833], 'kristianopel':    [56.2700, 15.9900],
  'karlskrona':      [56.1616, 15.5866], 'ronneby':         [56.2100, 15.2800],
  'hanö':            [56.0100, 14.8500], 'sölvesborg':      [56.0500, 14.5800],
  'nogersund':       [55.9250, 14.3000], 'kristianstad':    [56.0310, 14.1570],
  'simrishamn':      [55.5570, 14.3570], 'åhus':            [55.9280, 14.3100],
  // Sydkusten
  'falsterbo':       [55.3800, 12.8300], 'ven':             [55.9167, 12.6833],
  'barsebäck':       [55.7400, 12.9100], 'landskrona':      [55.8700, 12.8300],
  'helsingborg':     [56.0465, 12.6945], 'höganäs':         [56.2000, 12.5600],
  'viken':           [56.1450, 12.5700], 'arild':           [56.2100, 12.5600],
  'mölle':           [56.2800, 12.4960], 'torekov':         [56.4300, 12.6200],
  'ängelholm':       [56.2430, 12.8620],
  // Västkusten
  'göteborg':        [57.7089, 11.9746], 'kungsbacka':      [57.5000, 12.0700],
  'varberg':         [57.1060, 12.2510], 'falkenberg':      [56.9050, 12.4920],
  'halmstad':        [56.6740, 12.8577], 'tylösand':        [56.6600, 12.7000],
  'marstrand':       [57.8864, 11.5950], 'björkö':          [57.6900, 11.6400],
  'styrsö':          [57.5950, 11.7400], 'donsö':           [57.5700, 11.7700],
  'vrångö':          [57.5500, 11.7800], 'hönö':            [57.7050, 11.6467],
  'åstol':           [57.9200, 11.6000], 'grebbestad':      [58.6900, 11.2600],
  'fjällbacka':      [58.5983, 11.2897], 'hamburgsund':     [58.5400, 11.2700],
  'lysekil':         [58.2750, 11.4350], 'smögen':          [58.3550, 11.2250],
  'kungshamn':       [58.3700, 11.2500], 'grundsund':       [58.2500, 11.4100],
  'käringön':        [58.0000, 11.3000], 'kristineberg':    [58.2450, 11.4400],
  'flatön':          [58.2300, 11.4700], 'mollösund':       [58.0533, 11.4550],
  'gullholmen':      [58.0050, 11.3850], 'nösund':          [58.1300, 11.5200],
  'stocken':         [58.1500, 11.6500], 'karlshamn':       [56.1700, 14.8600],
  'fjäderholmarna':  [59.3267, 18.1733], 'norrhamn':        [59.5200, 18.8500],
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)) }

async function isInWater(lat: number, lon: number): Promise<boolean> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&zoom=14`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Svalla.se-geocode-fix/3.0 (tsinordin@gmail.com)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return false
    const data = await res.json()
    if (!data || data.error) return true

    const type    = (data.type ?? '').toLowerCase()
    const cls     = (data.class ?? '').toLowerCase()
    const display = (data.display_name ?? '').toLowerCase()

    const waterTypes = ['water', 'bay', 'sea', 'ocean', 'strait', 'sound', 'wetland', 'harbour']
    const waterWords = ['sundet', 'viken', 'fjärden', 'bukten', 'havet', ' sea ', 'strait', ' bay', ' sound']

    if (waterTypes.includes(type)) return true
    if (cls === 'natural' && type === 'water') return true
    if (waterWords.some(w => display.includes(w))) return true
    return false
  } catch {
    return false
  }
}

async function geocodeIsland(islandName: string): Promise<{ lat: number; lng: number; source: string } | null> {
  if (!islandName) return null
  const key = islandName.toLowerCase().trim()
  const local = ISLAND_COORDS[key]
  if (local) return { lat: local[0], lng: local[1], source: 'intern tabell' }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(islandName + ' Sweden')}&format=json&limit=2&countrycodes=se`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Svalla.se-geocode-fix/3.0 (tsinordin@gmail.com)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return null
    const results = await res.json()
    if (!results.length) return null
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon), source: 'nominatim' }
  } catch {
    return null
  }
}

export async function POST(_req: NextRequest) {
  // ── Auth-kontroll ─────────────────────────────────────────────
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })

  const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', user.id).maybeSingle()
  if (!userRow?.is_admin) return NextResponse.json({ error: 'Ej admin' }, { status: 403 })

  // ── Service role client för writes ───────────────────────────
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return NextResponse.json({
      error: 'SUPABASE_SERVICE_ROLE_KEY saknas i miljövariabler. Lägg till i Vercel → Settings → Environment Variables.'
    }, { status: 500 })
  }

  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
  )

  // ── Hämta alla platser ────────────────────────────────────────
  const { data: places, error: fetchErr } = await serviceClient
    .from('restaurants')
    .select('id, name, island, latitude, longitude')
    .order('name', { ascending: true })

  if (fetchErr || !places) {
    return NextResponse.json({ error: 'Kunde inte hämta platser' }, { status: 500 })
  }

  const results = {
    total:      places.length,
    alreadyOk:  0,
    fixed:      0,
    noCoords:   0,
    cantFix:    0,
    fixes:      [] as { name: string; island: string; oldLat: number; oldLng: number; newLat: number; newLng: number; source: string }[],
    cantFixList:[] as { name: string; island: string }[],
    noCoordsList:[] as { name: string; island: string }[],
  }

  // ── Kör igenom alla platser ───────────────────────────────────
  for (const p of places) {
    if (!p.latitude || !p.longitude) {
      results.noCoords++
      results.noCoordsList.push({ name: p.name, island: p.island ?? '?' })
      continue
    }

    const inWater = await isInWater(p.latitude, p.longitude)
    await sleep(1100)

    if (!inWater) {
      results.alreadyOk++
      continue
    }

    // Plats i vatten → hitta ö-koordinater
    const islandGeo = p.island ? await geocodeIsland(p.island) : null
    if (p.island) await sleep(1100)

    if (!islandGeo) {
      results.cantFix++
      results.cantFixList.push({ name: p.name, island: p.island ?? '?' })
      continue
    }

    // Uppdatera i Supabase
    await serviceClient
      .from('restaurants')
      .update({ latitude: islandGeo.lat, longitude: islandGeo.lng })
      .eq('id', p.id)

    results.fixed++
    results.fixes.push({
      name:   p.name,
      island: p.island ?? '?',
      oldLat: p.latitude,
      oldLng: p.longitude,
      newLat: islandGeo.lat,
      newLng: islandGeo.lng,
      source: islandGeo.source,
    })
  }

  return NextResponse.json(results)
}
