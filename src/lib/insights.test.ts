import { describe, it, expect } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { computeInsights, type InsightTrip } from './insights'

// ── Minimal Supabase mock ─────────────────────────────────────────────────────
// Each method in the chain returns the same thenable object, which resolves
// when awaited. The terminal result differs per table.

function makeChain(result: unknown) {
  const self: Record<string, unknown> = {
    then(resolve: (v: unknown) => void) {
      return Promise.resolve(result).then(resolve)
    },
  }
  for (const m of ['select', 'eq', 'gte', 'lt', 'lte', 'order', 'limit']) {
    self[m] = () => self
  }
  return self
}

function mockSupa(trips: InsightTrip[], followers = 0, achievements = 0): SupabaseClient {
  return {
    from(table: string) {
      if (table === 'trips')              return makeChain({ data: trips, error: null })
      if (table === 'follows')            return makeChain({ count: followers,    error: null })
      /* achievement_events */            return makeChain({ count: achievements, error: null })
    },
  } as unknown as SupabaseClient
}

// ── Trip builder helpers ──────────────────────────────────────────────────────

let _id = 0
function trip(overrides: Partial<InsightTrip> = {}): InsightTrip {
  return {
    id: String(++_id),
    distance: 10,
    duration: 120,           // 2h in minutes
    average_speed_knots: 5,
    max_speed_knots: 8,
    pinnar_rating: null,
    boat_type: 'Segelbåt',
    location_name: 'Sandhamn',
    started_at: '2024-07-01T08:00:00Z',
    ended_at:   '2024-07-01T10:00:00Z',
    created_at: '2024-07-01T08:00:00Z',
    ...overrides,
  }
}

// ── Basic aggregates ──────────────────────────────────────────────────────────

describe('computeInsights — basic aggregates', () => {
  it('returns zero-state for empty trip list', async () => {
    const r = await computeInsights(mockSupa([]), 'u1')
    expect(r.total_trips).toBe(0)
    expect(r.total_nm).toBe(0)
    expect(r.total_hours).toBe(0)
    expect(r.top_speed).toBe(0)
    expect(r.magic_count).toBe(0)
    expect(r.active_days).toBe(0)
    expect(r.longest_streak_weeks).toBe(0)
  })

  it('counts trips, nm and hours correctly', async () => {
    const trips = [
      trip({ distance: 15, duration: 90 }),
      trip({ distance: 25, duration: 150 }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.total_trips).toBe(2)
    expect(r.total_nm).toBeCloseTo(40)
    expect(r.total_hours).toBeCloseTo(4)   // (90+150)/60
  })

  it('picks the highest max_speed_knots as top_speed', async () => {
    const trips = [trip({ max_speed_knots: 6 }), trip({ max_speed_knots: 12 })]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.top_speed).toBe(12)
  })

  it('counts magic trips (pinnar_rating === 3)', async () => {
    const trips = [
      trip({ pinnar_rating: 3 }),
      trip({ pinnar_rating: 2 }),
      trip({ pinnar_rating: 3 }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.magic_count).toBe(2)
  })

  it('includes follower and achievement counts from DB', async () => {
    const r = await computeInsights(mockSupa([trip()], 7, 3), 'u1')
    expect(r.total_followers).toBe(7)
    expect(r.total_achievements).toBe(3)
  })
})

// ── top_nm_trip ───────────────────────────────────────────────────────────────

describe('computeInsights — top_nm_trip', () => {
  it('returns the trip with the highest distance', async () => {
    const big = trip({ id: 'big', distance: 50 })
    const r = await computeInsights(mockSupa([trip({ distance: 10 }), big, trip({ distance: 5 })]), 'u1')
    expect(r.top_nm_trip?.id).toBe('big')
  })

  it('is undefined for empty trip list', async () => {
    const r = await computeInsights(mockSupa([]), 'u1')
    expect(r.top_nm_trip).toBeUndefined()
  })
})

// ── boat_breakdown ────────────────────────────────────────────────────────────

describe('computeInsights — boat_breakdown', () => {
  it('counts boat types and calculates share', async () => {
    const trips = [
      trip({ boat_type: 'Segelbåt' }),
      trip({ boat_type: 'Segelbåt' }),
      trip({ boat_type: 'Motorbåt' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    const seg = r.boat_breakdown.find(b => b.type === 'Segelbåt')!
    const mot = r.boat_breakdown.find(b => b.type === 'Motorbåt')!
    expect(seg.count).toBe(2)
    expect(seg.share).toBeCloseTo(2 / 3)
    expect(mot.count).toBe(1)
    expect(mot.share).toBeCloseTo(1 / 3)
  })

  it('falls back to "Annat" when boat_type is null', async () => {
    const r = await computeInsights(mockSupa([trip({ boat_type: null })]), 'u1')
    expect(r.boat_breakdown[0]!.type).toBe('Annat')
  })

  it('sorts descending by count', async () => {
    const trips = [
      trip({ boat_type: 'Motorbåt' }),
      trip({ boat_type: 'Segelbåt' }),
      trip({ boat_type: 'Segelbåt' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.boat_breakdown[0]!.type).toBe('Segelbåt')
  })
})

// ── top_places ────────────────────────────────────────────────────────────────

describe('computeInsights — top_places', () => {
  it('ranks places by visit count', async () => {
    const trips = [
      trip({ location_name: 'Sandhamn' }),
      trip({ location_name: 'Sandhamn' }),
      trip({ location_name: 'Utö' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.top_places[0]!.name).toBe('Sandhamn')
    expect(r.top_places[0]!.count).toBe(2)
  })

  it('ignores trips without location_name', async () => {
    const trips = [trip({ location_name: null }), trip({ location_name: '' })]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.top_places).toHaveLength(0)
  })

  it('returns at most 5 places', async () => {
    const trips = ['A','B','C','D','E','F'].map(n => trip({ location_name: n }))
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.top_places.length).toBeLessThanOrEqual(5)
  })
})

// ── most_active_month ─────────────────────────────────────────────────────────

describe('computeInsights — most_active_month', () => {
  it('identifies the month with most trips', async () => {
    const trips = [
      trip({ created_at: '2024-07-01T10:00:00Z' }),
      trip({ created_at: '2024-07-15T10:00:00Z' }),
      trip({ created_at: '2024-08-01T10:00:00Z' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.most_active_month?.key).toBe('2024-07')
    expect(r.most_active_month?.count).toBe(2)
  })

  it('is undefined for empty trip list', async () => {
    const r = await computeInsights(mockSupa([]), 'u1')
    expect(r.most_active_month).toBeUndefined()
  })
})

// ── active_days ───────────────────────────────────────────────────────────────

describe('computeInsights — active_days', () => {
  it('counts unique sailing days', async () => {
    const trips = [
      trip({ created_at: '2024-07-01T08:00:00Z' }),
      trip({ created_at: '2024-07-01T14:00:00Z' }),  // same day
      trip({ created_at: '2024-07-02T10:00:00Z' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.active_days).toBe(2)
  })
})

// ── sunrise / sunset trips ────────────────────────────────────────────────────

describe('computeInsights — sunrise_trips and sunset_trips (UTC)', () => {
  it('counts sunrise trips (started_at UTC hour < 7)', async () => {
    const trips = [
      trip({ started_at: '2024-07-01T05:30:00Z' }),  // 05:30 UTC → sunrise
      trip({ started_at: '2024-07-01T07:00:00Z' }),  // 07:00 UTC → not sunrise
      trip({ started_at: '2024-07-01T10:00:00Z' }),  // 10:00 UTC → not sunrise
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.sunrise_trips).toBe(1)
  })

  it('counts sunset trips (ended_at UTC hour >= 22)', async () => {
    const trips = [
      trip({ ended_at: '2024-07-01T22:00:00Z' }),  // 22:00 UTC → sunset
      trip({ ended_at: '2024-07-01T23:59:00Z' }),  // 23:59 UTC → sunset
      trip({ ended_at: '2024-07-01T21:59:00Z' }),  // 21:59 UTC → not sunset
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.sunset_trips).toBe(2)
  })
})

// ── longest_streak_weeks ──────────────────────────────────────────────────────

describe('computeInsights — longest_streak_weeks', () => {
  it('returns 0 for empty trips', async () => {
    const r = await computeInsights(mockSupa([]), 'u1')
    expect(r.longest_streak_weeks).toBe(0)
  })

  it('returns 1 for a single trip', async () => {
    const r = await computeInsights(mockSupa([trip({ created_at: '2024-01-01T10:00:00Z' })]), 'u1')
    expect(r.longest_streak_weeks).toBe(1)
  })

  it('returns 1 when all trips are in the same week', async () => {
    const trips = [
      trip({ created_at: '2024-01-01T10:00:00Z' }),
      trip({ created_at: '2024-01-02T10:00:00Z' }),
      trip({ created_at: '2024-01-03T10:00:00Z' }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.longest_streak_weeks).toBe(1)
  })

  it('counts consecutive weekly trips as a streak', async () => {
    const trips = [
      trip({ created_at: '2024-01-01T10:00:00Z' }),  // week 1
      trip({ created_at: '2024-01-08T10:00:00Z' }),  // week 2
      trip({ created_at: '2024-01-15T10:00:00Z' }),  // week 3
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.longest_streak_weeks).toBe(3)
  })

  it('resets streak on a gap week', async () => {
    const trips = [
      trip({ created_at: '2024-01-01T10:00:00Z' }),  // week 1
      trip({ created_at: '2024-01-08T10:00:00Z' }),  // week 2
      trip({ created_at: '2024-01-15T10:00:00Z' }),  // week 3
      // gap — week 4 missing
      trip({ created_at: '2024-01-29T10:00:00Z' }),  // week 5
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.longest_streak_weeks).toBe(3)
  })

  it('returns the longest run when multiple streaks exist', async () => {
    const trips = [
      trip({ created_at: '2024-01-01T10:00:00Z' }),  // week 1
      // gap
      trip({ created_at: '2024-01-15T10:00:00Z' }),  // week 3
      trip({ created_at: '2024-01-22T10:00:00Z' }),  // week 4
      trip({ created_at: '2024-01-29T10:00:00Z' }),  // week 5
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.longest_streak_weeks).toBe(3)
  })
})

// ── unique_boat_types ─────────────────────────────────────────────────────────

describe('computeInsights — unique_boat_types', () => {
  it('counts distinct non-null boat types', async () => {
    const trips = [
      trip({ boat_type: 'Segelbåt' }),
      trip({ boat_type: 'Segelbåt' }),
      trip({ boat_type: 'Motorbåt' }),
      trip({ boat_type: null }),
    ]
    const r = await computeInsights(mockSupa(trips), 'u1')
    expect(r.unique_boat_types).toBe(2)
  })
})

// ── scope: year ───────────────────────────────────────────────────────────────

describe('computeInsights — scope year', () => {
  it('sets scope and year on the result', async () => {
    const r = await computeInsights(mockSupa([trip()]), 'u1', 'year', 2024)
    expect(r.scope).toBe('year')
    expect(r.year).toBe(2024)
  })

  it('scope all does not set year', async () => {
    const r = await computeInsights(mockSupa([trip()]), 'u1', 'all')
    expect(r.scope).toBe('all')
    expect(r.year).toBeUndefined()
  })
})
