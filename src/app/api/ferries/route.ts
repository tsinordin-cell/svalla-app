import { NextResponse } from 'next/server'
import { SEED_FERRY_ROUTES, fetchDeparturesResult } from '@/lib/ferries'

/**
 * GET /api/ferries
 *   → returnerar alla linjer + dagens avgångar
 *     (revision 2026-10-02: alltid live från Trafiklab. Seed-avgångar finns
 *     inte sedan 2026-08-05; `source: 'seed'` betyder bara "ingen live-avgång")
 *
 * GET /api/ferries?route=wxb-vaxholm
 *   → returnerar avgångar för en specifik rutt
 *
 * CDN-cachas 60 s (public + s-maxage — 'private' hade gjort s-maxage
 * verkningslös, se CLAUDE.md p19). Upstream-fetchen cachas också 60 s.
 *
 * revision 2026-10-02: svaret har ett `fel`-fält, per rutt i listan och på
 * toppnivå för ?route=. Samma mönster som /api/transit/departures:
 *   fel: null + tom lista  → källan svarade, ingen båtavgång hittad
 *                            (även ResRobots SVC_NO_RESULT)
 *   fel: 'kvot' m.fl.      → avgångarna kunde inte hämtas, listan säger inget
 * Koder: 'ingen_nyckel' | 'api_fel' | 'kvot' | 'timeout' | 'stopp_saknas'
 * ('stopp_saknas' = rutten saknar låsta hållplats-id). Mappningen från
 * ResRobots errorCode står vid felFranResRobot i lib/ferries.ts.
 * Bara tillagt, inget borttaget: befintliga fält har samma form som förut.
 * Högst 6 avgångar per rutt oavsett `count` (ResRobots tak per anrop).
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
    const { departures, fel } = await fetchDeparturesResult(route, count)
    return NextResponse.json({
      route,
      departures,
      source: departures[0]?.source ?? 'seed',
      fel,
      updatedAt: new Date().toISOString(),
    }, { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } })
  }

  const withDeps = await Promise.all(
    SEED_FERRY_ROUTES.map(async r => {
      const { departures, fel } = await fetchDeparturesResult(r, Math.min(count, 4))
      return { ...r, departures, fel }
    }),
  )
  const anyLive = withDeps.some(r => r.departures.some(d => d.source === 'live'))

  return NextResponse.json({
    routes: withDeps,
    source: anyLive ? 'mixed' : 'seed',
    updatedAt: new Date().toISOString(),
  }, { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' } })
}
