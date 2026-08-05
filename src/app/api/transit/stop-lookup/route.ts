/**
 * GET /api/transit/stop-lookup?q=<sökord>
 *
 * Slår upp hållplatser i ResRobot location.name och returnerar id + namn.
 * Finns för att kunna VERIFIERA stop-ID:n empiriskt i stället för att lita
 * på en spec — samma princip som land-masken: mät, gissa inte.
 *
 * Läsande, ingen känslig data, ingen skrivning. Nyckeln stannar server-side.
 * Rate-limitas till 20 anrop/minut och IP.
 */
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const KEY = process.env.TRAFIKLAB_RESROBOT_KEY ?? process.env.TRAFIKLAB_API_KEY

type Stop = { id?: string; extId?: string; name?: string; lat?: number; lon?: number }

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!(await checkRateLimit(`stop-lookup:${ip}`, 20, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
  }

  const q = req.nextUrl.searchParams.get('q')?.trim()
  if (!q) return NextResponse.json({ error: 'q krävs' }, { status: 400 })
  if (!KEY) return NextResponse.json({ error: 'nyckel saknas', stops: [] }, { status: 503 })

  try {
    const url = `https://api.resrobot.se/v2.1/location.name?input=${encodeURIComponent(q)}&maxNo=8&format=json&accessId=${KEY}`
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return NextResponse.json({ error: 'resrobot ' + res.status, stops: [] }, { status: 502 })
    const json = await res.json() as { stopLocationOrCoordLocation?: Array<{ StopLocation?: Stop }> }
    const stops = (json.stopLocationOrCoordLocation ?? [])
      .map(x => x.StopLocation)
      .filter((s): s is Stop => !!s?.extId || !!s?.id)
      .map(s => ({ id: s.extId ?? s.id, namn: s.name, lat: s.lat, lng: s.lon }))
    return NextResponse.json({ q, stops })
  } catch (e) {
    return NextResponse.json({ error: String(e), stops: [] }, { status: 502 })
  }
}
