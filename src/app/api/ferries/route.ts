import { NextResponse } from 'next/server'
import { SEED_FERRY_ROUTES, fetchDepartures } from '@/lib/ferries'

/**
 * GET /api/ferries
 *   → returnerar alla linjer + dagens avgångar
 *     (live om TRAFIKLAB_API_KEY är satt, annars seed-data)
 *
 * GET /api/ferries?route=wxb-vaxholm
 *   → returnerar avgångar för en specifik rutt
 *
 * Cachas 60 sek i fetchLiveDepartures via next.revalidate.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const routeId = searchParams.get('route')
  const count   = Math.min(20, Math.max(1, parseInt(searchParams.get('count') ?? '6', 10) || 6))

  if (routeId) {
    const route = SEED_FERRY_ROUTES.find(r => r.id === routeId)
    if (!route) {
      return NextResponse.json({ error: 'route not found' }, { status: 404 })
    }
    const departures = await fetchDepartures(route, count)
    return NextResponse.json({
      route,
      departures,
      source: departures[0]?.source ?? 'seed',
      updatedAt: new Date().toISOString(),
    })
  }

  const withDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async r => ({
      ...r,
      departures: await fetchDepartures(r, Math.min(count, 4)),
    })),
  )
  const anyLive = withDeps.some(r => r.departures.some(d => d.source === 'live'))

  return NextResponse.json({
    routes: withDeps,
    source: anyLive ? 'mixed' : 'seed',
    updatedAt: new Date().toISOString(),
  })
}
