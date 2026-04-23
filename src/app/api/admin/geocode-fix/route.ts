import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export const maxDuration = 300 // 5 min — Vercel Pro/Hobby max

// Kända ö-koordinater — används om Nominatim inte hittar
const ISLAND_COORDS: Record<string, [number, number]> = {
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
  'nynäshamn':       [58.9031, 17.9467],
  'dalarö':          [59.1333, 18.4000],
  'gustavsberg':     [59.3300, 18.3900],
  'vaxholm':         [59.4022, 18.3283],
  'djurö':           [59.1950, 18.6950],
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
  'bockholmen':      [59.2300, 18.3800],
  'artipelag':       [59.3500, 18.4800],
  'lidingö':         [59.3600, 18.1700],
  'barsebäck':       [55.7400, 12.9100],
  'arild':           [56.2100, 12.5600],
  'åhus':            [55.9280, 14.3100],
  'mölle':           [56.2800, 12.4960],
  'torekov':         [56.4300, 12.6200],
  'borgholm':        [56.8800, 16.6600],
  'öland':           [56.6700, 16.6300],
  'gotland':         [57.4684, 18.4867],
  'visby':           [57.6348, 18.2948],
  'gällö':           [62.5800, 15.4700],
  'norrhamn':        [59.5200, 18.8500],
  'finnboda':        [59.3100, 18.1300],
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

export async function POST(req: NextRequest) {
  // ── Auth-kontroll ─────────────────────────────────────────────
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Ej inloggad' }, { status: 401 })

  const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
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
