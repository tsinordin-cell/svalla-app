/**
 * POST /api/admin/enrich-places
 *
 * Berikar restaurants från OpenStreetMap. Hämtar opening_hours, phone,
 * website där OSM har tag-data och vår kolumn är NULL. Överskriver
 * aldrig befintligt content.
 *
 * Kör i batchar á 30 platser per anrop (OSM Overpass-API tillåter ~1 req/sek).
 * Tar ~35 sek per batch. För 288 platser totalt: 10 batchar.
 *
 * Anrop:
 *   curl -X POST "https://svalla.se/api/admin/enrich-places?offset=0" \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * När `done: true` är allt processat. Annars increment offset och kör igen.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const OVERPASS = 'https://overpass-api.de/api/interpreter'
const BATCH_SIZE = 30

function normalizeName(s: string) {
  return s.toLowerCase()
    .replaceAll('å', 'a').replaceAll('ä', 'a').replaceAll('ö', 'o')
    .replaceAll('é', 'e').replaceAll('è', 'e').replaceAll('ü', 'u')
    .replace(/[^a-z0-9]/g, '')
}

interface OsmTags {
  name?: string
  opening_hours?: string
  phone?: string
  'contact:phone'?: string
  website?: string
  'contact:website'?: string
}
interface OsmElement { tags?: OsmTags }

async function queryOSM(lat: number, lng: number): Promise<OsmElement[] | null> {
  const radius = 100
  const query = `[out:json][timeout:15];
(
  node(around:${radius},${lat},${lng})[name];
  way(around:${radius},${lat},${lng})[name];
);
out tags;`
  try {
    const res = await fetch(OVERPASS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Svalla-Enrich/1.0 (info@svalla.se)',
        'Accept': 'application/json',
      },
      body: 'data=' + encodeURIComponent(query),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.elements ?? []
  } catch { return null }
}

function findBestMatch(elements: OsmElement[], restaurantName: string): OsmElement | null {
  const target = normalizeName(restaurantName)
  let best: OsmElement | null = null
  let bestScore = 0
  for (const el of elements) {
    if (!el.tags?.name) continue
    const candidate = normalizeName(el.tags.name)
    let score = 0
    if (candidate === target) score = 100
    else if (candidate.includes(target) || target.includes(candidate)) score = 70
    else {
      const a = new Set<string>()
      const b = new Set<string>()
      for (let i = 0; i < target.length - 2; i++) a.add(target.substring(i, i + 3))
      for (let i = 0; i < candidate.length - 2; i++) b.add(candidate.substring(i, i + 3))
      const inter = [...a].filter(x => b.has(x)).length
      const union = new Set([...a, ...b]).size
      score = union > 0 ? Math.round(100 * inter / union) : 0
    }
    if (score > bestScore) { bestScore = score; best = el }
  }
  return bestScore >= 50 ? best : null
}

export async function POST(req: NextRequest) {
  // Auth
  const auth = req.headers.get('authorization') ?? ''
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const offset = parseInt(url.searchParams.get('offset') ?? '0', 10)

  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  // Hämta nästa batch — bara platser med koordinater och som saknar minst ett fält
  const { data: places, count } = await sb
    .from('restaurants')
    .select('id, name, latitude, longitude, opening_hours, contact_phone, website', { count: 'exact' })
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .order('id')
    .range(offset, offset + BATCH_SIZE - 1)

  if (!places || places.length === 0) {
    return NextResponse.json({ done: true, total: count ?? 0, offset })
  }

  let enriched = 0
  let skipped = 0
  let failed = 0
  const enrichedNames: string[] = []

  for (const place of places) {
    if (place.opening_hours && place.contact_phone && place.website) {
      skipped++
      continue
    }
    const elements = await queryOSM(place.latitude, place.longitude)
    if (!elements) { failed++; await new Promise(r => setTimeout(r, 1100)); continue }
    const match = findBestMatch(elements, place.name)
    if (match?.tags) {
      const update: Record<string, string> = {}
      if (!place.opening_hours && match.tags.opening_hours) update.opening_hours = match.tags.opening_hours
      const phone = match.tags.phone || match.tags['contact:phone']
      if (!place.contact_phone && phone) update.contact_phone = phone
      const web = match.tags.website || match.tags['contact:website']
      if (!place.website && web) update.website = web
      if (Object.keys(update).length > 0) {
        const { error } = await sb.from('restaurants').update(update).eq('id', place.id)
        if (!error) {
          enriched++
          enrichedNames.push(`${place.name} (${Object.keys(update).join('+')})`)
        }
      }
    }
    // Rate-limit Overpass — 1 req/sec
    await new Promise(r => setTimeout(r, 1100))
  }

  const nextOffset = offset + places.length
  const done = nextOffset >= (count ?? 0)
  return NextResponse.json({
    processed: places.length,
    enriched,
    skipped,
    failed,
    enrichedNames,
    offset,
    nextOffset,
    total: count ?? 0,
    done,
  })
}
