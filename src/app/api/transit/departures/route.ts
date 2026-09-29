/**
 * GET /api/transit/departures?dest=<slug>[&date=YYYY-MM-DD]
 *
 * Returnerar nästa 4 resor från fastlandet (Strömkajen / Nynäshamn) till
 * önskad ö. Använder ResRobot via lib/trafiklab.ts. Cachar 5 min in-memory.
 *
 * `date` (2026-09-28, dagsplaneraren): resor en annan dag, från kl 06:00.
 * Bara i dag t.o.m. 14 dagar fram accepteras — längre fram saknar ResRobot
 * ofta tidtabell, och då hellre 400 än ett tomt svar som ser ut som "inga
 * båtar". Utan `date` (eller med dagens datum) gäller "från nu" som förut.
 *
 * Säkerhet: API-nyckeln finns bara server-side. Klienten ser aldrig
 * Trafiklab-credentials.
 *
 * Svarsformat:
 *   { slug, originName, destName, note?, trips: TripSummary[] }
 *   eller { error: 'unknown_destination' } / { error: 'unavailable' }
 */
import { NextRequest, NextResponse } from 'next/server'
import { getIslandTransit, getIslandNoTransitReason } from '@/lib/transit-stops'
import { fetchTripsResult } from '@/lib/trafiklab'
import { parseTransitDate } from '@/lib/transitDate'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('dest')?.trim().toLowerCase() ?? ''
  if (!slug) {
    return NextResponse.json({ error: 'missing_dest' }, { status: 400 })
  }
  const datum = parseTransitDate(req.nextUrl.searchParams.get('date'))
  if (datum === 'ogiltigt') {
    return NextResponse.json({ error: 'invalid_date' }, { status: 400 })
  }

  // Uppmätt frånvaro av trafik är ett eget svar. "Vi vet inte" och "det går
  // ingen båt hit" är två olika sanningar och ska inte se likadana ut.
  const utanTrafik = getIslandNoTransitReason(slug)
  if (utanTrafik) {
    return NextResponse.json(
      { error: 'no_transit', slug, skal: utanTrafik, trips: [] },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=3600' } },
    )
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

  // fel skickas med (2026-09-28): tom lista + fel är "vi vet inte", tom lista
  // utan fel är "inga resor". Klienten ska inte visa det förra som det senare.
  const { trips, fel } = await fetchTripsResult(
    cfg.originStopId, cfg.destStopId, 4,
    datum ? { date: datum, time: '06:00' } : undefined,
  )

  return NextResponse.json(
    {
      slug,
      originName: cfg.originStopName,
      destName: cfg.destStopName,
      note: cfg.note ?? null,
      date: datum,
      fel,
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
