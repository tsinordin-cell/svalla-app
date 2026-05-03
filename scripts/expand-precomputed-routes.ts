/**
 * expand-precomputed-routes.ts
 *
 * Hämtar de top-N par från `route_metrics` som faller tillbaka på 'straight'
 * eller 'waypoint' (= dålig kvalitet), försöker köra grid-A* lokalt med
 * obegränsad tid, validerar mot land-masken, och genererar nya entries i
 * precomputed-routes.json-format.
 *
 * Lokal grid-A* har inga timeout-restriktioner (Vercel maxDuration=300s).
 * Det betyder att par som timeoutar i prod kan lyckas här.
 *
 * Användning:
 *   npx tsx scripts/expand-precomputed-routes.ts --top 30
 *   npx tsx scripts/expand-precomputed-routes.ts --top 50 --write
 *   npx tsx scripts/expand-precomputed-routes.ts --since-days 14 --top 20
 *
 * Flaggor:
 *   --top N            Antal failing-par att försöka konvertera (default: 30)
 *   --since-days N     Hur långt bak i tiden vi tittar (default: 30)
 *   --write            Skriv resultat till precomputed-routes.json istället
 *                      för att dumpa till stdout (default: dry-run)
 *   --min-hits N       Minst N hits krävs för att försöka (default: 2)
 *
 * Krav i miljö:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Workflow:
 *   1. Kör scriptet i dry-run (default)
 *   2. Granska output — passar nya rutter visuellt mot karta?
 *   3. Kör med --write för att appenda till JSON
 *   4. Kör `npx tsx scripts/verify-routes.ts` för att kontrollera land-överlap
 *   5. Commit + push → nästa /api/route/calculate-anrop använder dem
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { findSeaPathWithQuality, type RouteQuality } from '../src/lib/seaPathfinder'

// ── Argv parsing ────────────────────────────────────────────────────────────

function getArg(name: string, fallback?: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`)
  if (idx === -1) return fallback
  return process.argv[idx + 1] ?? fallback
}

function hasFlag(name: string): boolean {
  return process.argv.includes(`--${name}`)
}

const TOP = parseInt(getArg('top', '30')!, 10)
const SINCE_DAYS = parseInt(getArg('since-days', '30')!, 10)
const MIN_HITS = parseInt(getArg('min-hits', '2')!, 10)
const WRITE = hasFlag('write')

// ── Supabase ────────────────────────────────────────────────────────────────

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('FEL: NEXT_PUBLIC_SUPABASE_URL och SUPABASE_SERVICE_ROLE_KEY krävs i env.')
  console.error('Tips: kör med `npx dotenv -e .env.local -- npx tsx scripts/expand-precomputed-routes.ts`')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { persistSession: false } })

// ── Aggregering ─────────────────────────────────────────────────────────────

type MetricRow = {
  start_lat: number
  start_lng: number
  end_lat: number
  end_lng: number
  quality: RouteQuality
  ms: number
  created_at: string
}

/** Grid-rounded key — matchar exakt admin-vyns aggregation (0.05° ≈ 5–6 km). */
function gridKey(lat: number, lng: number): string {
  return `${(Math.round(lat * 20) / 20).toFixed(2)},${(Math.round(lng * 20) / 20).toFixed(2)}`
}

type FailingPair = {
  key: string
  count: number
  worstQuality: RouteQuality
  avgMs: number
  sample: MetricRow
}

async function fetchFailingPairs(): Promise<FailingPair[]> {
  const since = new Date(Date.now() - SINCE_DAYS * 24 * 60 * 60 * 1000).toISOString()

  console.log(`→ Hämtar route_metrics sedan ${since.slice(0, 10)} (${SINCE_DAYS} dagar)…`)

  const { data, error } = await supabase
    .from('route_metrics')
    .select('start_lat, start_lng, end_lat, end_lng, quality, ms, created_at')
    .gte('created_at', since)
    .in('quality', ['straight', 'waypoint'])
    .limit(10000)

  if (error) {
    console.error('FEL vid Supabase-hämtning:', error.message)
    process.exit(1)
  }

  const rows = (data ?? []) as MetricRow[]
  console.log(`  ${rows.length} 'straight'/'waypoint' träffar funna.`)

  const groups = new Map<string, MetricRow[]>()
  for (const r of rows) {
    const k = `${gridKey(r.start_lat, r.start_lng)}→${gridKey(r.end_lat, r.end_lng)}`
    const arr = groups.get(k) ?? []
    arr.push(r)
    groups.set(k, arr)
  }

  const pairs: FailingPair[] = []
  for (const [key, arr] of groups) {
    if (arr.length < MIN_HITS) continue
    // Pick most-recent sample (best chance koordinaterna är levande)
    const sample = arr.reduce((a, b) => (a.created_at > b.created_at ? a : b))
    const worstQuality: RouteQuality = arr.some(r => r.quality === 'straight') ? 'straight' : 'waypoint'
    const avgMs = arr.reduce((s, r) => s + r.ms, 0) / arr.length
    pairs.push({ key, count: arr.length, worstQuality, avgMs, sample })
  }

  pairs.sort((a, b) => b.count - a.count)
  return pairs.slice(0, TOP)
}

// ── Generation ──────────────────────────────────────────────────────────────

type PrecomputedRoute = {
  id: string
  from: { name: string; lat: number; lng: number }
  to: { name: string; lat: number; lng: number }
  validated: boolean
  distanceKm: number
  waypoints: number[][]
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function pathDistanceKm(p: Array<[number, number]>): number {
  let d = 0
  for (let i = 1; i < p.length; i++) {
    d += haversineKm(p[i - 1]![0], p[i - 1]![1], p[i]![0], p[i]![1])
  }
  return Math.round(d * 10) / 10
}

function makeId(slat: number, slng: number, elat: number, elng: number): string {
  const f = (n: number) => n.toFixed(3).replace('.', '_').replace('-', 'n')
  return `auto_${f(slat)}_${f(slng)}_to_${f(elat)}_${f(elng)}`
}

function makeName(lat: number, lng: number): string {
  // Format: "Lat 59.331, Lng 18.652" — Tom kan rename manuellt efteråt.
  return `${lat.toFixed(3)},${lng.toFixed(3)}`
}

type Result =
  | { ok: true; route: PrecomputedRoute; pair: FailingPair; ms: number }
  | { ok: false; reason: string; pair: FailingPair; ms: number }

async function tryConvertPair(pair: FailingPair): Promise<Result> {
  const { sample } = pair
  const t0 = Date.now()

  try {
    const result = findSeaPathWithQuality(
      sample.start_lat, sample.start_lng,
      sample.end_lat, sample.end_lng,
    )
    const ms = Date.now() - t0

    if (result.quality === 'precomputed') {
      // Räddat av annan precomputed sedan dess (eller koordinaterna matchar
      // en redan-existerande). Skip.
      return { ok: false, reason: 'redan precomputed', pair, ms }
    }

    if (result.quality !== 'grid') {
      // Waypoint eller straight — inte tillförlitlig nog att precomputa.
      return { ok: false, reason: `kvalitet: ${result.quality}`, pair, ms }
    }

    if (result.path.length < 2) {
      return { ok: false, reason: 'path för kort', pair, ms }
    }

    const route: PrecomputedRoute = {
      id: makeId(sample.start_lat, sample.start_lng, sample.end_lat, sample.end_lng),
      from: { name: makeName(sample.start_lat, sample.start_lng), lat: sample.start_lat, lng: sample.start_lng },
      to:   { name: makeName(sample.end_lat,   sample.end_lng),   lat: sample.end_lat,   lng: sample.end_lng },
      validated: true,
      distanceKm: pathDistanceKm(result.path as Array<[number, number]>),
      waypoints: result.path.map(p => [p[0], p[1]]),
    }
    return { ok: true, route, pair, ms }
  } catch (e) {
    const ms = Date.now() - t0
    return { ok: false, reason: `exception: ${(e as Error).message}`, pair, ms }
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Expand precomputed-routes ===')
  console.log(`top=${TOP}, since-days=${SINCE_DAYS}, min-hits=${MIN_HITS}, write=${WRITE}\n`)

  const pairs = await fetchFailingPairs()
  console.log(`\n→ Topp ${pairs.length} failing-par att försöka konvertera:\n`)

  if (pairs.length === 0) {
    console.log('Inga par över min-hits-tröskel. Inget att göra.')
    return
  }

  const results: Result[] = []
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]!
    process.stdout.write(`  [${i + 1}/${pairs.length}] ${pair.key} (${pair.count} hits) … `)
    const result = await tryConvertPair(pair)
    results.push(result)
    if (result.ok) {
      console.log(`✓ grid-A* ${result.ms}ms — ${result.route.waypoints.length} waypoints, ${result.route.distanceKm} km`)
    } else {
      console.log(`✗ ${result.reason} (${result.ms}ms)`)
    }
  }

  const succeeded = results.filter((r): r is Extract<Result, { ok: true }> => r.ok)
  const failed = results.filter(r => !r.ok)

  console.log(`\n=== Resultat ===`)
  console.log(`Lyckades: ${succeeded.length}`)
  console.log(`Misslyckades: ${failed.length}`)

  if (succeeded.length === 0) {
    console.log('\nIngen ny precomputed-rutt genererad. Inget att skriva.')
    return
  }

  if (!WRITE) {
    console.log('\n=== DRY-RUN: Nya entries (kör med --write för att appenda) ===\n')
    console.log(JSON.stringify(succeeded.map(r => r.route), null, 2))
    return
  }

  // Append to precomputed-routes.json
  const jsonPath = path.resolve(__dirname, '../src/lib/data/precomputed-routes.json')
  const raw = fs.readFileSync(jsonPath, 'utf-8')
  const data = JSON.parse(raw) as { routes: PrecomputedRoute[] }

  // Filtrera bort dubletter (samma id)
  const existingIds = new Set(data.routes.map(r => r.id))
  const newRoutes = succeeded.map(r => r.route).filter(r => !existingIds.has(r.id))

  if (newRoutes.length === 0) {
    console.log('\nAlla nya rutter finns redan (samma id). Inget skrivet.')
    return
  }

  data.routes.push(...newRoutes)
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2) + '\n', 'utf-8')

  console.log(`\n✓ Skrev ${newRoutes.length} nya rutter till ${path.relative(process.cwd(), jsonPath)}`)
  console.log(`  Total i fil nu: ${data.routes.length}`)
  console.log(`\nNästa steg:`)
  console.log(`  1. npx tsx scripts/verify-routes.ts   # land-överlap-check`)
  console.log(`  2. git diff src/lib/data/precomputed-routes.json`)
  console.log(`  3. (Optional) Rename auto_*-id:n och .name till läsbara namn`)
  console.log(`  4. git commit + push`)
}

main().catch(err => {
  console.error('Fel:', err)
  process.exit(1)
})
