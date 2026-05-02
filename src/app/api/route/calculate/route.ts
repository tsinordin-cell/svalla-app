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
import { findSeaPath } from '@/lib/seaPathfinder'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

// ── In-memory route cache (warm Lambda) ────────────────────────────────────
// Nyckel: "lat,lng→lat,lng" (4 decimaler ≈ 11 m precision)
// Värde: beräknad rutt som [lat,lng]-tuples
const _routeCache = new Map<string, Array<[number, number]>>()

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
    const { startLat, startLng, endLat, endLng } = body as {
      startLat: number; startLng: number; endLat: number; endLng: number
    }

    if (
      typeof startLat !== 'number' || typeof startLng !== 'number' ||
      typeof endLat   !== 'number' || typeof endLng   !== 'number'
    ) {
      return NextResponse.json({ error: 'Ogiltiga koordinater' }, { status: 400 })
    }

    const key = cacheKey(startLat, startLng, endLat, endLng)

    // 1. In-memory cache hit
    if (_routeCache.has(key)) {
      logger.info('route-calculate', `cache-hit: ${key}`)
      return NextResponse.json({ path: _routeCache.get(key), source: 'cache' })
    }

    // 2. Compute — precomputed JSON hit är O(n) i findSeaPath; grid är 30-120 s
    const t0 = Date.now()
    const path = findSeaPath(startLat, startLng, endLat, endLng)
    const ms = Date.now() - t0

    logger.info('route-calculate', `computed in ${ms} ms — ${path.length} waypoints`, {
      key,
      ms,
      points: path.length,
    })

    // Cacha resultatet
    _routeCache.set(key, path)

    return NextResponse.json({ path, source: ms < 50 ? 'precomputed' : 'computed', ms })
  } catch (err) {
    logger.error('route-calculate', 'unhandled exception', { error: String(err) })
    return NextResponse.json({ error: 'Serverfel vid ruttberäkning' }, { status: 500 })
  }
}
