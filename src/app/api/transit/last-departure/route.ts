/**
 * GET /api/transit/last-departure?dest=<slug>
 *
 * Returnerar dagens SISTA avgång från fastlandet → ön (forward) OCH
 * dagens sista avgång från ön → fastlandet (return). Den senare är det
 * användaren faktiskt bryr sig om när hen står på en brygga kl 18 och
 * undrar "när måste jag åka hem för att inte fastna här?".
 *
 * Svarsformat:
 *   {
 *     slug, originName, destName,
 *     outbound: TripSummary | null,   // fastlandet → ön (idag)
 *     return:   TripSummary | null,   // ön → fastlandet (idag)
 *     checkedAt: ISO timestamp,
 *   }
 *
 * Cachas 5 min via ResRobot-cachen i lib/trafiklab.ts. CDN-edge cachar
 * 60 s + 5 min stale-while-revalidate — tidtabeller ändras inte ofta.
 */
import { NextRequest, NextResponse } from 'next/server'
import { getIslandTransit } from '@/lib/transit-stops'
import { fetchLastTripOfDay } from '@/lib/trafiklab'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('dest')?.trim().toLowerCase() ?? ''
  if (!slug) {
    return NextResponse.json({ error: 'missing_dest' }, { status: 400 })
  }

  const cfg = getIslandTransit(slug)
  if (!cfg) {
    return NextResponse.json(
      { error: 'unknown_destination', slug, outbound: null, return: null },
      { status: 200 },
    )
  }

  // Parallella anrop — outbound och return är oberoende
  const [outbound, returnTrip] = await Promise.all([
    fetchLastTripOfDay(cfg.originStopId, cfg.destStopId),
    fetchLastTripOfDay(cfg.destStopId, cfg.originStopId),
  ])

  return NextResponse.json(
    {
      slug,
      originName: cfg.originStopName,
      destName: cfg.destStopName,
      outbound,
      return: returnTrip,
      checkedAt: new Date().toISOString(),
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    },
  )
}
