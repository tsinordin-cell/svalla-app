import { NextResponse } from 'next/server'
import { SEED_FERRY_ROUTES, mockDeparturesFor } from '@/lib/ferries'

/**
 * GET /api/ferries
 *   → returnerar alla linjer + avgångsstubar
 *
 * GET /api/ferries?route=wxb-vaxholm
 *   → returnerar dagens avgångar för en specifik rutt
 *
 * TODO: byt ut till live-data från Trafiklab Resrobot v2 eller Waxholmsbolagets GTFS.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const routeId = searchParams.get('route')

  if (routeId) {
    const route = SEED_FERRY_ROUTES.find(r => r.id === routeId)
    if (!route) {
      return NextResponse.json({ error: 'route not found' }, { status: 404 })
    }
    return NextResponse.json({
      route,
      departures: mockDeparturesFor(route, 6),
      source: 'stub',
      updatedAt: new Date().toISOString(),
    })
  }

  return NextResponse.json({
    routes: SEED_FERRY_ROUTES,
    source: 'stub',
    updatedAt: new Date().toISOString(),
  })
}
