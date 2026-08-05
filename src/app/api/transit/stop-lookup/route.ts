/**
 * GET /api/transit/stop-lookup
 *
 * Mätinstrument för transit-konfiguration. Finns för att stop-ID:n ska kunna
 * VERIFIERAS empiriskt i stället för att hämtas ur en spec — samma princip som
 * land-masken: mät, gissa inte. Se även lib/transit-stops.ts.
 *
 * Tre lägen:
 *   ?q=Rindö                  → sök hållplats på namn (location.name)
 *   ?lat=59.40&lng=18.40      → hållplatser nära en punkt (location.nearbystops)
 *                               Bättre än namnsökning för öar: bryggan heter
 *                               ofta något helt annat än ön.
 *   ?from=<id>&to=<id>        → provresa mellan två stopp (trip), med benen
 *                               utskrivna så att man ser om det faktiskt går
 *                               en båt eller om ResRobot hittar en bussväg.
 *
 * Läsande, ingen skrivning, ingen känslig data. Nyckeln stannar server-side.
 * Rate-limitas till 20 anrop/minut och IP.
 */
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { fetchTrips } from '@/lib/trafiklab'

export const dynamic = 'force-dynamic'

const KEY = process.env.TRAFIKLAB_RESROBOT_KEY ?? process.env.TRAFIKLAB_API_KEY
const BASE = 'https://api.resrobot.se/v2.1'

type Stop = { id?: string; extId?: string; name?: string; lat?: number; lon?: number; dist?: number }

function mapStops(list: Array<{ StopLocation?: Stop }>) {
  return list
    .map(x => x.StopLocation)
    .filter((s): s is Stop => !!s?.extId || !!s?.id)
    .map(s => ({
      id: s.extId ?? s.id,
      namn: s.name,
      lat: s.lat,
      lng: s.lon,
      ...(s.dist != null ? { avstand_m: s.dist } : {}),
    }))
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!(await checkRateLimit(`stop-lookup:${ip}`, 20, 60_000))) {
    return NextResponse.json({ error: 'För många förfrågningar' }, { status: 429 })
  }
  if (!KEY) return NextResponse.json({ error: 'nyckel saknas', stops: [] }, { status: 503 })

  const p = req.nextUrl.searchParams
  const q = p.get('q')?.trim()
  const lat = p.get('lat')?.trim()
  const lng = p.get('lng')?.trim()
  const from = p.get('from')?.trim()
  const to = p.get('to')?.trim()

  try {
    // ── Läge 3: provresa ────────────────────────────────────────────────
    if (from && to) {
      if (from === to) return NextResponse.json({ error: 'from och to är samma stopp' }, { status: 400 })
      const trips = await fetchTrips(from, to, 4)
      return NextResponse.json({
        from, to,
        antal: trips.length,
        resor: trips.map(t => ({
          avgar: `${t.startDate} ${t.startTime}`,
          anlander: t.endTime,
          minuter: t.durationMin,
          byten: t.changes,
          barabat: t.legs.length > 0 && t.legs.every(l => /FÄRJA|BÅT|FERRY|SHIP/i.test(l.category || '')),
          ben: t.legs.map(l => `${l.category}${l.line ? ' ' + l.line : ''}: ${l.fromName} ${l.fromTime} → ${l.toName} ${l.toTime}`),
        })),
      })
    }

    // ── Läge 2: nära en koordinat ───────────────────────────────────────
    if (lat && lng) {
      const url = `${BASE}/location.nearbystops?originCoordLat=${encodeURIComponent(lat)}&originCoordLong=${encodeURIComponent(lng)}&maxNo=15&r=5000&format=json&accessId=${KEY}`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) return NextResponse.json({ error: 'resrobot ' + res.status, stops: [] }, { status: 502 })
      const json = await res.json() as { stopLocationOrCoordLocation?: Array<{ StopLocation?: Stop }> }
      return NextResponse.json({ lat, lng, stops: mapStops(json.stopLocationOrCoordLocation ?? []) })
    }

    // ── Läge 1: namnsökning ─────────────────────────────────────────────
    if (q) {
      const url = `${BASE}/location.name?input=${encodeURIComponent(q)}&maxNo=8&format=json&accessId=${KEY}`
      const res = await fetch(url, { next: { revalidate: 3600 } })
      if (!res.ok) return NextResponse.json({ error: 'resrobot ' + res.status, stops: [] }, { status: 502 })
      const json = await res.json() as { stopLocationOrCoordLocation?: Array<{ StopLocation?: Stop }> }
      return NextResponse.json({ q, stops: mapStops(json.stopLocationOrCoordLocation ?? []) })
    }

    return NextResponse.json({ error: 'ange q, eller lat+lng, eller from+to' }, { status: 400 })
  } catch (e) {
    return NextResponse.json({ error: String(e), stops: [] }, { status: 502 })
  }
}
