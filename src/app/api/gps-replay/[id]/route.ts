export const dynamic = 'force-dynamic'

// GET /api/gps-replay/<tripId>?maxAccuracyM=80&anomalyCeilingKn=150&accelSigma=1&minAccuracyM=3&resetAfterSeconds=30
//
// Spelar upp en tur genom GPS-kedjan från rådatan (gps_points.raw_*) med
// valfria parametrar och jämför med det sparade spåret. Bara ägaren
// (RLS gps_select_own + explicit ägarkontroll). Ingen skrivning.
//
// Svar: { trip: {sparat}, stored: {kvalitet ur sparade punkter},
//         replay: {distans/fart/kvalitet ur uppspelning}, params }
// replay är null om turen saknar rådata (loggad före migration
// 20260906000001, eller GPX-import).

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { computeGpsQuality } from '@/lib/gpsQuality'
import { replayTrack, rowToRawFix, type RawFix, type ReplayOptions } from '@/lib/gpsReplay'
import { SPEED_CEILING_KNOTS } from '@/lib/tracking'
import type { GpsPoint } from '@/lib/gps'
import { fetchAllGpsPoints } from '@/lib/gpsRows'

type GpsPointRow = {
  latitude: number; longitude: number; speed_knots: number | null; heading: number | null; accuracy: number | null
  recorded_at: string; raw_latitude: number | null; raw_longitude: number | null; device_speed_knots: number | null
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function num(v: string | null): number | undefined {
  if (v == null || v === '') return undefined
  const n = Number(v)
  return Number.isFinite(n) ? n : undefined
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!UUID.test(id)) return NextResponse.json({ error: 'Ogiltigt id' }, { status: 400 })

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: trip } = await supabase
    .from('trips')
    // select('*'): gps_quality finns först efter migration 20260906000002 —
    // en explicit kolumnlista skulle ge 400 tills dess.
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .single()
  if (!trip || trip.user_id !== user.id) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Sidindelad — utan det stympade PostgREST allt över 1 000 punkter (fynd 2026-09-11).
  let rows: GpsPointRow[]
  try {
    rows = await fetchAllGpsPoints<GpsPointRow>(supabase, id, '*')   // raw_* finns först efter migration 20260906000001
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 })
  }

  const stored: GpsPoint[] = rows.map(r => ({
    lat: r.latitude, lng: r.longitude, speedKnots: r.speed_knots ?? 0,
    heading: r.heading ?? null, accuracy: r.accuracy ?? 0, recordedAt: r.recorded_at,
    rawLat: r.raw_latitude ?? undefined, rawLng: r.raw_longitude ?? undefined,
    deviceSpeedKnots: r.device_speed_knots ?? null,
  }))

  const url = new URL(req.url)
  const q = url.searchParams
  const kalman = {
    accelSigma: num(q.get('accelSigma')),
    minAccuracyM: num(q.get('minAccuracyM')),
    resetAfterSeconds: num(q.get('resetAfterSeconds')),
  }
  const opts: ReplayOptions = {
    maxAccuracyM: num(q.get('maxAccuracyM')),
    anomalyCeilingKn: num(q.get('anomalyCeilingKn')),
    kalman,
  }

  const fixes = (rows ?? []).map(rowToRawFix).filter((f): f is RawFix => f != null)
  const replay = fixes.length > 0 ? replayTrack(fixes, opts) : null

  return NextResponse.json({
    trip: {
      id: trip.id, started_at: trip.started_at,
      distance: trip.distance, duration_min: trip.duration,
      average_speed_knots: trip.average_speed_knots, max_speed_knots: trip.max_speed_knots,
      gps_quality: trip.gps_quality ?? null,
    },
    stored: { points: stored.length, quality: computeGpsQuality(stored) },
    replay: replay && {
      points: replay.points.length,
      rejectedAccuracy: replay.rejectedAccuracy,
      rejectedAnomaly: replay.rejectedAnomaly,
      kalmanResets: replay.kalmanResets,
      distanceNM: Math.round(replay.distanceNM * 100) / 100,
      avgSpeedKn: Math.round(replay.avgSpeedKn * 10) / 10,
      maxSpeedKn: Math.round(replay.maxSpeedKn * 10) / 10,
      quality: replay.quality,
      track: q.get('track') === '1' ? replay.points.map(p => [p.lat, p.lng, p.speedKnots]) : undefined,
    },
    params: { maxAccuracyM: opts.maxAccuracyM ?? 80, anomalyCeilingKn: opts.anomalyCeilingKn ?? SPEED_CEILING_KNOTS, kalman: { accelSigma: kalman.accelSigma ?? 1, minAccuracyM: kalman.minAccuracyM ?? 3, resetAfterSeconds: kalman.resetAfterSeconds ?? 30 } },
    rawAvailable: fixes.length,
  })
}
