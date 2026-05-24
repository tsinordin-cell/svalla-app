/**
 * POST /api/route/calculate
 *
 * Beräknar en fullkvalitets sjöledsrutt (precomputed → grid-A* → waypoint-Dijkstra).
 * Kallas från klienten asynkront — aldrig från SSR.
 *
 * Timeout: 300 s (Vercel Pro maxDuration). Grid-A* kan ta 30-120 s för stora
 * bounding boxes (80 000 noder × 500 polygon-checks via turf.js).
 *
 * Caching — två nivåer:
 *   1. Precomputed JSON (täcker 90%+ par efter cache-expansion) → <1 ms
 *   2. Modul-nivå in-memory Map (Vercel warm Lambda) → <1 ms vid cache-träff
 *   Grid-A* körs bara vid cold start för par som inte finns i precomputed.
 */

export const dynamic = 'force-dynamic'
export const maxDuration = 300 // sekunder — Vercel Pro

import { NextRequest, NextResponse } from 'next/server'
import { findSeaPathWithQuality, qualityToConfidence, type RouteQuality } from '@/lib/seaPathfinder'
import { validatePathLand } from '@/lib/landMask'
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
        validated = true
      } else {
        crossesAt = v.crossesAt ?? null
        finalPath = null
        finalQuality = 'unavailable'
        logger.error('route-calculate', `re-validation failed for ${key}, degraded to unavailable`, {
          quality, crossesAt: v.crossesAt,
        })
      }
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

    return NextResponse.json({
      path: finalPath,
      quality: finalQuality,
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
