/**
 * Svalla Wrapped — personliga insights beräknade från en användares turer.
 * Allt körs client-side från en lista trips + ev. tags/check-ins.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type InsightTrip = {
  id: string
  distance: number
  duration: number
  average_speed_knots: number | null
  max_speed_knots: number | null
  pinnar_rating: number | null
  boat_type: string | null
  location_name: string | null
  started_at: string | null
  ended_at: string | null
  created_at: string
}

export type Insights = {
  scope: 'all' | 'year'
  year?: number
  total_trips: number
  total_nm: number
  total_hours: number
  top_nm_trip?: InsightTrip
  top_speed: number
  magic_count: number
  boat_breakdown: Array<{ type: string; count: number; share: number }>
  top_places: Array<{ name: string; count: number }>
  most_active_month?: { key: string; label: string; count: number }
  active_days: number
  earliest_trip?: string
  latest_trip?: string
  sunrise_trips: number      // startade före 07
  sunset_trips: number       // slutade efter 22
  longest_streak_weeks: number
  unique_boat_types: number
  total_followers: number
  total_achievements: number
}

const MONTHS_SV = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec']

function monthKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}
function monthLabel(key: string): string {
  const [y, m] = key.split('-')
  return `${MONTHS_SV[Number(m) - 1]} ${y}`
}

function isoWeekKey(d: Date): string {
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d.getTime() - jan1.getTime()) / 86_400_000) + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}

function longestStreakWeeks(trips: InsightTrip[]): number {
  if (trips.length === 0) return 0
  const weeks = new Set(trips.map(t => isoWeekKey(new Date(t.created_at))))
  const sorted = [...weeks].sort()
  let best = 1, cur = 1
  for (let i = 1; i < sorted.length; i++) {
    // räkna om veckan direkt innan finns
    const [y, w] = sorted[i].split('-W').map(Number)
    const prevDate = new Date(y, 0, 1 + (w - 1) * 7 - 7)
    if (weeks.has(isoWeekKey(prevDate))) {
      cur++
      if (cur > best) best = cur
    } else {
      cur = 1
    }
  }
  return best
}

export async function computeInsights(
  supabase: SupabaseClient,
  userId: string,
  scope: 'all' | 'year' = 'all',
  year?: number,
): Promise<Insights> {
  const y = year ?? new Date().getFullYear()
  let q = supabase.from('trips')
    .select('id, distance, duration, average_speed_knots, max_speed_knots, pinnar_rating, boat_type, location_name, started_at, ended_at, created_at')
    .eq('user_id', userId)
  if (scope === 'year') {
    const from = `${y}-01-01T00:00:00Z`
    const to = `${y + 1}-01-01T00:00:00Z`
    q = q.gte('created_at', from).lt('created_at', to)
  }
  const { data } = await q
  const trips = (data ?? []) as InsightTrip[]

  // Basmått
  const total_trips = trips.length
  const total_nm = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const total_hours = trips.reduce((a, t) => a + (t.duration ?? 0), 0) / 60

  // Topp-trip (distans)
  const top_nm_trip = trips.slice().sort((a, b) => (b.distance ?? 0) - (a.distance ?? 0))[0]
  const top_speed = trips.reduce((m, t) => Math.max(m, t.max_speed_knots ?? 0), 0)
  const magic_count = trips.filter(t => t.pinnar_rating === 3).length

  // Boat breakdown
  const boatCounts: Record<string, number> = {}
  for (const t of trips) {
    const b = t.boat_type ?? 'Annat'
    boatCounts[b] = (boatCounts[b] ?? 0) + 1
  }
  const boat_breakdown = Object.entries(boatCounts)
    .map(([type, count]) => ({ type, count, share: total_trips > 0 ? count / total_trips : 0 }))
    .sort((a, b) => b.count - a.count)

  // Top places
  const placeCounts: Record<string, number> = {}
  for (const t of trips) {
    const p = (t.location_name ?? '').trim()
    if (!p) continue
    placeCounts[p] = (placeCounts[p] ?? 0) + 1
  }
  const top_places = Object.entries(placeCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Most active month
  const monthCounts: Record<string, number> = {}
  for (const t of trips) {
    const k = monthKey(new Date(t.created_at))
    monthCounts[k] = (monthCounts[k] ?? 0) + 1
  }
  let most_active_month: Insights['most_active_month'] = undefined
  if (Object.keys(monthCounts).length > 0) {
    const [k, v] = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0]
    most_active_month = { key: k, label: monthLabel(k), count: v }
  }

  // Active days
  const dayKeys = new Set(trips.map(t => new Date(t.created_at).toISOString().slice(0, 10)))
  const active_days = dayKeys.size

  // Earliest/latest
  const earliest_trip = trips.length > 0 ? trips.map(t => t.created_at).sort()[0] : undefined
  const latest_trip = trips.length > 0 ? trips.map(t => t.created_at).sort()[trips.length - 1] : undefined

  // Sunrise/sunset
  const sunrise_trips = trips.filter(t => t.started_at && new Date(t.started_at).getHours() < 7).length
  const sunset_trips = trips.filter(t => t.ended_at && new Date(t.ended_at).getHours() >= 22).length

  // Streak
  const longest_streak_weeks = longestStreakWeeks(trips)

  // Unique boat types
  const unique_boat_types = new Set(trips.map(t => t.boat_type).filter(Boolean)).size

  // Followers + achievements (parallellt)
  const [{ count: fCount }, { count: aCount }] = await Promise.all([
    supabase.from('follows').select('follower_id', { count: 'exact', head: true }).eq('following_id', userId),
    supabase.from('achievement_events').select('id', { count: 'exact', head: true }).eq('user_id', userId),
  ])

  return {
    scope,
    year: scope === 'year' ? y : undefined,
    total_trips,
    total_nm,
    total_hours,
    top_nm_trip,
    top_speed,
    magic_count,
    boat_breakdown,
    top_places,
    most_active_month,
    active_days,
    earliest_trip,
    latest_trip,
    sunrise_trips,
    sunset_trips,
    longest_streak_weeks,
    unique_boat_types,
    total_followers: fCount ?? 0,
    total_achievements: aCount ?? 0,
  }
}
