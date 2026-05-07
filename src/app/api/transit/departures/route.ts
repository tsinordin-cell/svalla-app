/**
 * GET /api/transit/departures?dest=<slug>
 *
 * Returnerar nästa 4 resor från fastlandet (Strömkajen / Nynäshamn) till
 * önskad ö. Använder ResRobot via lib/trafiklab.ts. Cachar 5 min in-memory.
 *
 * Säkerhet: API-nyckeln finns bara server-side. Klienten ser aldrig
 * Trafiklab-credentials.
 *
 * Svarsformat:
 *   { slug, originName, destName, note?, trips: TripSummary[] }
 *   eller { error: 'unknown_destination' } / { error: 'unavailable' }
 */
import { NextRequest, NextResponse } from 'next/server'
import { getIslandTransit } from '@/lib/transit-stops'
import { fetchTrips } from '@/lib/trafiklab'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('dest')?.trim().toLowerCase() ?? ''
  if (!slug) {
    return NextResponse.json({ error: 'missing_dest' }, { status: 400 })
  }

  const cfg = getIslandTransit(slug)
  if (!cfg) {
    // 200 + empty så widgeten kan rendera "tidtabell ej tillgänglig"
    // istället för 404 som triggar Next.js error-overlay i dev.
    return NextResponse.json(
      { error: 'unknown_destination', slug, trips: [] },
      { status: 200 },
    )
  }

  const trips = await fetchTrips(cfg.originStopId, cfg.destStopId, 4)

  return NextResponse.json(
    {
      slug,
      originName: cfg.originStopName,
      destName: cfg.destStopName,
      note: cfg.note ?? null,
      trips,
    },
    {
      // CDN-cache: 60 s fresh + 5 min stale-while-revalidate.
      // Vår egen in-memory-cache i trafiklab.ts har 5 min TTL — de två
      // staplas så att vi i praktiken slår mot ResRobot < 1 ggr/min/destination.
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    },
  )
}
