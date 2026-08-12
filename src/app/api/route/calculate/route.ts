/**
 * POST /api/route/calculate
 *
 * Beräknar en fullkvalitets sjöledsrutt (precomputed → grid-A* → waypoint-Dijkstra).
 * Kallas från klienten asynkront — aldrig från SSR.
 *
 * Timeout: 150 s. Grid-A* kan ta 30-120 s för stora
 * bounding boxes (80 000 noder × 500 polygon-checks via turf.js).
 *
 * Caching — två nivåer:
 *   1. Precomputed JSON (täcker 90%+ par efter cache-expansion) → <1 ms
 *   2. Modul-nivå in-memory Map (Vercel warm Lambda) → <1 ms vid cache-träff
 *   Grid-A* körs bara vid cold start för par som inte finns i precomputed.
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 150 // sekunder. Sänkt från 300 2026-08-12:
// uppmätt värsta fall för grid-A* är 120 s, och varje sekund en funktion
// kör räknas mot Fluid-minnesposten på fakturan ($41 av $94 i juli–aug).
// 150 täcker det uppmätta med marginal men halverar taket för skenande anrop.

import { NextRequest, NextResponse } from 'next/server'
import { DEPARTURES, requiresLock, isLandlocked } from '@/lib/planner-client'
import { findSeaPathWithQuality, qualityToConfidence, type RouteQuality } from '@/lib/seaPathfinder'
import { validatePathLand, inMaskCoverage, hasNavigableWaterNear } from '@/lib/landMask'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'
import { getAdminClient } from '@/lib/supabase-admin'

/**
 * Logga rutt-beräkning till route_metrics. Best-effort, blockerar aldrig svaret.
 * Används av admin-vyn för att hitta vilka start/slut-par som ofta faller på
 * grid/waypoint/straight (= kandidater för precomputed-expansion).
 */
function logMetric(payload: {
  startLat: number; startLng: number; endLat: number; endLng: number
  quality: RouteQuality; ms: number; waypointsCount: number
}) {
  try {
    const admin = getAdminClient()
    admin.from('route_metrics').insert({
      start_lat: payload.startLat,
      start_lng: payload.startLng,
      end_lat:   payload.endLat,
      end_lng:   payload.endLng,
      quality:   payload.quality,
      ms:        payload.ms,
      waypoints_count: payload.waypointsCount,
    }).then(({ error }) => {
      if (error) logger.error('route-calculate', 'metric-insert failed', { e: error.message })
    })
  } catch (e) {
    logger.error('route-calculate', 'metric-log threw', { error: String(e) })
  }
}

// ── In-memory route cache (warm Lambda) ────────────────────────────────────
// Nyckel: "lat,lng→lat,lng" (4 decimaler ≈ 11 m precision)
// Värde: beräknad rutt + kvalitet (för att kunna visa rätt disclaimer i UI:n)
// path kan vara null när 'unavailable' returneras — vi cachar även det
// så vi inte kör om grid-A* för par som vi vet inte går.
type CachedRoute = {
  path: Array<[number, number]> | null
  quality: RouteQuality
  validated: boolean
  crossesAt: string | null
}
const _routeCache = new Map<string, CachedRoute>()

function cacheKey(slat: number, slng: number, elat: number, elng: number): string {
  return `${slat.toFixed(4)},${slng.toFixed(4)}→${elat.toFixed(4)},${elng.toFixed(4)}`
}

// ── Handler ────────────────────────────────────────────────────────────────


/**
 * Varför gick det inte att rita en rutt? Svaret måste vara exakt — en gissning
 * här är värre än tystnad, eftersom användaren tror på det som står.
 *
 *   outside_coverage      punkten ligger utanför den verifierade kustlinjen
 *   harbour_not_in_water  ingen farbar vattenyta vid bryggan (koordinatfel)
 *   lock_required         hamnarna ligger i skilda vattensystem — Mälaren och
 *                         Saltsjön möts bara genom en sluss, och en slussning
 *                         är ingen sjöled som kan ritas
 *   no_sea_route          allt annat: ingen sammanhängande vattenväg hittad
 *
 * lock_required avgörs mot den verifierade hamnlistan i planner-client.ts
 * (region-fältet), inte mot en gissad bounding box.
 */
export type UnavailableReason =
  | 'outside_coverage' | 'harbour_not_in_water' | 'lock_required' | 'no_sea_route'
  | 'landlocked'

/** Samma tolerans som lookupPrecomputed använder: 0,0008° ≈ 80 m. */
const HAMN_TOL = 0.0008
function hamnVid(lat: number, lng: number) {
  return DEPARTURES.find(d =>
    Math.abs(d.lat - lat) < HAMN_TOL && Math.abs(d.lng - lng) < HAMN_TOL) ?? null
}

/**
 * Närmaste hamn inom ~600 m — används BARA för att klassificera VARFÖR en
 * rutt är unavailable, aldrig för själva ruttberäkningen.
 *
 * Varför inte hamnVid (80 m): sparade rutter fryser sina koordinater vid
 * skapandet, och hamnlistan har korrigerats efteråt (bc1103e4 flyttade 52
 * hamnar). En rutt sparad före korrigeringen missar då 80 m-matchningen och
 * ett slussfall klassas som no_sea_route — den röda rutan "ingen vattenväg
 * hittad" i stället för den lugna slussförklaringen. Uppmätt 2026-08-11:
 * medvetet skeva koordinater (~1 km) gav no_sea_route där exakta gav
 * lock_required. 600 m fångar driften utan att para ihop grannhamnar.
 */
function hamnNara(lat: number, lng: number) {
  let bast: (typeof DEPARTURES)[number] | null = null
  let bastKm = 0.6
  for (const d of DEPARTURES) {
    const km = haversineKmLokal(lat, lng, d.lat, d.lng)
    if (km < bastKm) { bast = d; bastKm = km }
  }
  return bast
}
function haversineKmLokal(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371, rad = Math.PI / 180
  const dLat = (bLat - aLat) * rad, dLng = (bLng - aLng) * rad
  const s = Math.sin(dLat/2)**2 + Math.cos(aLat*rad) * Math.cos(bLat*rad) * Math.sin(dLng/2)**2
  return 2 * R * Math.asin(Math.sqrt(s))
}

/**
 * Sant när de två hamnarna ligger i skilda vattensystem — Mälaren respektive
 * Saltsjön. Mellan dem finns bara Slussen och Hammarbyslussen, och en
 * slussning är ingen sjöled. Avgörs mot region-fältet i den verifierade
 * hamnlistan, inte mot en gissad bounding box.
 */
function harbourLockConflict(
  startLat: number, startLng: number, endLat: number, endLng: number,
): boolean {
  const a = hamnNara(startLat, startLng)
  const b = hamnNara(endLat, endLng)
  if (!a || !b) return false
  // 2026-08-05: jämför vattensystem, inte region-strängen. Tullinge-hamnarna
  // stod som region 'Mälaren' men ligger i Tullingesjön — med den gamla
  // jämförelsen hade de räknats som slussfall i stället för som det de är:
  // hamnar utan farbar förbindelse alls.
  if (isLandlocked(a) || isLandlocked(b)) return false
  return requiresLock(a, b)
}

function avgorSkal(
  startLat: number, startLng: number, endLat: number, endLng: number,
): UnavailableReason {
  if (!inMaskCoverage(startLat, startLng) || !inMaskCoverage(endLat, endLng)) {
    return 'outside_coverage'
  }
  // Insjöhamn FÖRE vatten-nära-kollen: en hamn i t.ex. Tullingesjön ligger
  // helt riktigt utanför den farbara masken, men det är inget koordinatfel —
  // sjön saknar förbindelse med havet. Utan den här ordningen fick riktiga
  // insjörutter etiketten "troligen ett fel i vår hamnkoordinat, rapportera
  // gärna", vilket ber användaren felanmäla något som är avsiktligt.
  {
    const a = hamnNara(startLat, startLng)
    const b = hamnNara(endLat, endLng)
    if ((a && isLandlocked(a)) || (b && isLandlocked(b))) {
      return 'landlocked'
    }
  }
  if (!hasNavigableWaterNear(startLat, startLng) || !hasNavigableWaterNear(endLat, endLng)) {
    return 'harbour_not_in_water'
  }
  if (harbourLockConflict(startLat, startLng, endLat, endLng)) {
    return 'lock_required'
  }
  return 'no_sea_route'
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: max 30 requests/minut per IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      ?? req.headers.get('x-real-ip')
      ?? 'unknown'
    if (!(await checkRateLimit(`route-calculate:${ip}`, 30, 60_000))) {
      return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
    }

    const body = await req.json()
    const { startLat, startLng, endLat, endLng, routeId } = body as {
      startLat: number; startLng: number; endLat: number; endLng: number
      routeId?: string  // Optional — om angivet läses/skrivs DB-cache på planned_routes
    }

    if (
      typeof startLat !== 'number' || typeof startLng !== 'number' ||
      typeof endLat   !== 'number' || typeof endLng   !== 'number'
    ) {
      return NextResponse.json({ error: 'Ogiltiga koordinater' }, { status: 400 })
    }

    const key = cacheKey(startLat, startLng, endLat, endLng)

    // 1. In-memory cache hit (per Lambda)
    const cached = _routeCache.get(key)
    if (cached) {
      logger.info('route-calculate', `mem-cache-hit: ${key}`)
      return NextResponse.json({
        path: cached.path,
        quality: cached.quality,
        confidence: qualityToConfidence(cached.quality),
        validated: cached.validated,
        crossesAt: cached.crossesAt,
        source: 'cache',
        // Cachen bär inte skälet, men skälet är deterministiskt och billigt.
        // Utan detta visade ett cachat slussfall den röda "ingen vattenväg"-
        // rutan medan samma rutt på kall lambda fick den lugna sluss-texten.
        reason: cached.quality === 'unavailable'
          ? avgorSkal(startLat, startLng, endLat, endLng) : null,
      })
    }

    // 2. DB-cache hit (persistent över cold-starts, 2026-05-23 routing safety layer P2)
    // Bara om routeId angetts — annars vet vi inte vilken planned_routes-rad att läsa.
    if (routeId && typeof routeId === 'string') {
      try {
        const admin = getAdminClient()
        const { data: dbCached } = await admin
          .from('planned_routes')
          .select('cached_path, cached_quality, cached_validated, cached_at')
          .eq('id', routeId)
          .maybeSingle()

        if (dbCached?.cached_path && dbCached?.cached_quality && dbCached?.cached_at) {
          const dbQuality = dbCached.cached_quality as RouteQuality
          // Validera att DB-quality är aktuell — om legacy 'straight' ligger där,
          // ignorera cache (kommer beräknas om och uppdateras till unavailable).
          const validQualities: RouteQuality[] = ['precomputed', 'grid', 'waypoint', 'unavailable']
          if (validQualities.includes(dbQuality)) {
            const dbPath = dbCached.cached_path as Array<[number, number]> | null
            // Värm in-memory cache också
            _routeCache.set(key, {
              path: dbPath,
              quality: dbQuality,
              validated: !!dbCached.cached_validated,
              crossesAt: null,
            })
            logger.info('route-calculate', `db-cache-hit: ${routeId} (${dbQuality})`)
            return NextResponse.json({
              path: dbPath,
              quality: dbQuality,
              confidence: qualityToConfidence(dbQuality),
              validated: !!dbCached.cached_validated,
              crossesAt: null,
              source: 'db-cache',
              // Samma sak som mem-cachen: skälet räknas om, annars tappas det.
              reason: dbQuality === 'unavailable'
                ? avgorSkal(startLat, startLng, endLat, endLng) : null,
            })
          }
        }
      } catch (e) {
        logger.error('route-calculate', 'db-cache read failed, falling through to compute', { error: String(e) })
      }
    }

    // 3. Compute — precomputed JSON hit är O(n); grid är 30-120 s
    const t0 = Date.now()
    const { path, quality } = findSeaPathWithQuality(startLat, startLng, endLat, endLng)
    const ms = Date.now() - t0

    // Defense in depth: re-validera output mot land-mask innan vi cachar
    // och returnerar. Om en path skulle slippa igenom utan validering, fångar
    // detta steg det. Vi degraderar då quality → unavailable och returnerar null.
    let finalPath = path
    let finalQuality = quality
    let validated = false
    let crossesAt: string | null = null

    if (path !== null) {
      const v = validatePathLand(path)
      if (v.ok) {
        // Verifierad = inga landfel OCH hela vägen inom maskens täckning.
        // Utanför täckning är ett "ok" vakuöst och får inte kallas verifierat.
        validated = v.coverage === 'full'
      } else {
        crossesAt = v.crossesAt ?? null
        finalPath = null
        finalQuality = 'unavailable'
        logger.error('route-calculate', `re-validation failed for ${key}, degraded to unavailable`, {
          quality, crossesAt: v.crossesAt,
        })
      }
    }

    // 2026-08-05: sluss-spärren måste gälla ÄVEN när en path producerats.
    //
    // Riddarholmen -> Saltsjöqvarn gav quality='waypoint' med fyra punkter rakt
    // genom Slussen, och validated=true. Valideringen har rätt på sitt eget
    // villkor — segmenten går över vatten — men den känner inte till att
    // Mälaren och Saltsjön ligger på olika nivå och bara möts genom en sluss.
    // En rutt som ser ut som öppet vatten men kräver slussning är en osann
    // rutt, och den är farligare än ingen rutt eftersom den ser verifierad ut.
    //
    // Waypoint-grenen bygger vägen av huvudleder och kringgår därmed rastrets
    // vattenkomponenter, som är det enda som annars stoppar passagen.
    const kraverSluss = harbourLockConflict(startLat, startLng, endLat, endLng)
    if (kraverSluss && finalPath !== null) {
      logger.info('route-calculate', `sluss-spärr: ${key} underkänd trots quality=${finalQuality}`, {
        key, quality: finalQuality, points: finalPath.length,
      })
      finalPath = null
      finalQuality = 'unavailable'
      validated = false
    }

    logger.info('route-calculate', `computed in ${ms} ms — ${finalPath?.length ?? 0} waypoints, quality=${finalQuality}`, {
      key,
      ms,
      points: finalPath?.length ?? 0,
      quality: finalQuality,
      validated,
    })

    // Cacha resultatet i memory (även null-path så vi inte gör om grid-A* på samma par)
    _routeCache.set(key, { path: finalPath, quality: finalQuality, validated, crossesAt })

    // Cacha i DB om routeId angetts (persistent över cold-starts).
    // Best-effort, icke-blockerande — failar fetch ändå returneras svaret.
    if (routeId && typeof routeId === 'string') {
      try {
        const admin = getAdminClient()
        admin.from('planned_routes')
          .update({
            cached_path: finalPath,
            cached_quality: finalQuality,
            cached_validated: validated,
            cached_at: new Date().toISOString(),
          })
          .eq('id', routeId)
          .then(({ error }) => {
            if (error) logger.error('route-calculate', 'db-cache write failed', { routeId, error: error.message })
          })
      } catch (e) {
        logger.error('route-calculate', 'db-cache write threw', { error: String(e) })
      }
    }

    // Logga metric (best-effort, icke-blockerande)
    logMetric({
      startLat, startLng, endLat, endLng,
      quality: finalQuality, ms, waypointsCount: finalPath?.length ?? 0,
    })

    const reason = finalQuality === 'unavailable'
      ? avgorSkal(startLat, startLng, endLat, endLng)
      : null

    return NextResponse.json({
      path: finalPath,
      quality: finalQuality,
      reason,
      confidence: qualityToConfidence(finalQuality),
      validated,
      crossesAt,
      source: finalQuality === 'precomputed' ? 'precomputed' : 'computed',
      ms,
    })
  } catch (err) {
    logger.error('route-calculate', 'unhandled exception', { error: String(err) })
    return NextResponse.json({ error: 'Serverfel vid ruttberäkning' }, { status: 500 })
  }
}
