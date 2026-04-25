import { describe, it, expect } from 'vitest'
import { ACHIEVEMENTS, calcStreak, computeUnlocked, totalDistanceNM, type TripForAch } from './achievements'

// ── helpers ───────────────────────────────────────────────────────────────────

function trip(overrides: Partial<TripForAch> = {}): TripForAch {
  return {
    created_at: '2024-07-01T10:00:00Z',
    distance: 10,
    ...overrides,
  }
}

function tripsOnDate(date: string, count = 1): TripForAch[] {
  return Array.from({ length: count }, () => trip({ created_at: date }))
}

function weekAgo(weeksBack: number): string {
  const d = new Date()
  d.setDate(d.getDate() - weeksBack * 7)
  return d.toISOString()
}

// ── totalDistanceNM ───────────────────────────────────────────────────────────

describe('totalDistanceNM', () => {
  it('returns 0 for empty trips', () => {
    expect(totalDistanceNM([])).toBe(0)
  })

  it('sums trip distances', () => {
    const trips = [trip({ distance: 20 }), trip({ distance: 30 }), trip({ distance: 5 })]
    expect(totalDistanceNM(trips)).toBe(55)
  })

  it('treats undefined distance as 0', () => {
    const trips = [trip({ distance: undefined }), trip({ distance: 10 })]
    expect(totalDistanceNM(trips)).toBe(10)
  })
})

// ── calcStreak ────────────────────────────────────────────────────────────────

describe('calcStreak', () => {
  it('returns 0 for empty trips', () => {
    expect(calcStreak([])).toBe(0)
  })

  it('returns 0 when all trips are older than last week', () => {
    const old = tripsOnDate('2020-01-01T10:00:00Z')
    expect(calcStreak(old)).toBe(0)
  })

  it('returns 1 for a single trip this week', () => {
    const trips = tripsOnDate(weekAgo(0))
    expect(calcStreak(trips)).toBeGreaterThanOrEqual(1)
  })

  it('returns >= 2 for trips in two consecutive recent weeks', () => {
    const trips = [
      ...tripsOnDate(weekAgo(0)),
      ...tripsOnDate(weekAgo(1)),
    ]
    expect(calcStreak(trips)).toBeGreaterThanOrEqual(2)
  })

  it('stops streak at gap week', () => {
    // Trips this week and 2 weeks ago (no trip last week)
    const trips = [
      ...tripsOnDate(weekAgo(0)),
      ...tripsOnDate(weekAgo(2)),
    ]
    const streak = calcStreak(trips)
    // Streak should be 1 (only current week, gap breaks it)
    expect(streak).toBe(1)
  })
})

// ── computeUnlocked ───────────────────────────────────────────────────────────

describe('computeUnlocked', () => {
  it('returns empty for no trips', () => {
    expect(computeUnlocked([])).toHaveLength(0)
  })

  it('unlocks "first" after 1 trip', () => {
    const unlocked = computeUnlocked([trip()])
    expect(unlocked.some(a => a.id === 'first')).toBe(true)
  })

  it('does not unlock "five" for 4 trips', () => {
    const trips = Array.from({ length: 4 }, () => trip())
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'five')).toBe(false)
  })

  it('unlocks "five" for exactly 5 trips', () => {
    const trips = Array.from({ length: 5 }, () => trip())
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'five')).toBe(true)
  })

  it('unlocks distance badges based on total distance', () => {
    const trips = Array.from({ length: 5 }, () => trip({ distance: 25 })) // 125 NM total
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'dist50')).toBe(true)
    expect(unlocked.some(a => a.id === 'dist100')).toBe(true)
    expect(unlocked.some(a => a.id === 'dist250')).toBe(false) // 125 < 250
  })

  it('unlocks "magic" for a pinnar_rating=3 trip', () => {
    const trips = [trip({ pinnar_rating: 3 })]
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'magic')).toBe(true)
  })

  it('does not unlock "magic" for pinnar_rating=2', () => {
    const trips = [trip({ pinnar_rating: 2 })]
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'magic')).toBe(false)
  })

  it('unlocks "explorer" for 5 unique locations', () => {
    const trips = ['Sandhamn', 'Grinda', 'Utö', 'Möja', 'Finnhamn'].map(loc =>
      trip({ location_name: loc }),
    )
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'explorer')).toBe(true)
  })

  it('does not unlock "explorer" when locations repeat', () => {
    const trips = ['Sandhamn', 'Sandhamn', 'Sandhamn', 'Sandhamn', 'Sandhamn'].map(loc =>
      trip({ location_name: loc }),
    )
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'explorer')).toBe(false)
  })

  it('unlocks "boats" for 3 unique boat types', () => {
    const trips = ['Segelbåt', 'Motorbåt', 'Kajak'].map(bt => trip({ boat_type: bt }))
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'boats')).toBe(true)
  })

  it('unlocks streak badges using provided streak value', () => {
    const unlocked3 = computeUnlocked([trip()], 3)
    expect(unlocked3.some(a => a.id === 'streak3')).toBe(true)
    expect(unlocked3.some(a => a.id === 'streak8')).toBe(false)

    const unlocked8 = computeUnlocked([trip()], 8)
    expect(unlocked8.some(a => a.id === 'streak8')).toBe(true)
  })

  it('unlocks "earlybird" for pre-07:00 UTC start', () => {
    const trips = [trip({ started_at: '2024-07-01T05:30:00Z' })]
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'earlybird')).toBe(true)
  })

  it('does not unlock "earlybird" for 08:00 UTC start', () => {
    const trips = [trip({ started_at: '2024-07-01T08:00:00Z' })]
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'earlybird')).toBe(false)
  })

  it('unlocks "nightsail" for post-22:00 UTC end', () => {
    const trips = [trip({ ended_at: '2024-07-01T22:30:00Z' })]
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 'nightsail')).toBe(true)
  })

  it('unlocks "speed15" for max_speed_knots >= 15', () => {
    const trips = [trip({ max_speed_knots: 16 })]
    expect(computeUnlocked(trips).some(a => a.id === 'speed15')).toBe(true)
  })

  it('does not unlock "speed15" for 14 kn', () => {
    const trips = [trip({ max_speed_knots: 14 })]
    expect(computeUnlocked(trips).some(a => a.id === 'speed15')).toBe(false)
  })
})

// ── Sommar 2026 märken ────────────────────────────────────────────────────────

describe('summer 2026 achievements', () => {
  const summerTrip = trip({ created_at: '2026-06-15T10:00:00Z', pinnar_rating: 3 })
  const winterTrip = trip({ created_at: '2026-02-01T10:00:00Z' })

  it('s26_first: unlocks for a trip in may–aug 2026', () => {
    const unlocked = computeUnlocked([summerTrip])
    expect(unlocked.some(a => a.id === 's26_first')).toBe(true)
  })

  it('s26_first: does not unlock for winter 2026 trip', () => {
    const unlocked = computeUnlocked([winterTrip])
    expect(unlocked.some(a => a.id === 's26_first')).toBe(false)
  })

  it('s26_magic: unlocks for pinnar_rating=3 in summer 2026', () => {
    const unlocked = computeUnlocked([summerTrip])
    expect(unlocked.some(a => a.id === 's26_magic')).toBe(true)
  })

  it('s26_ten: unlocks for 10 summer 2026 trips', () => {
    const trips = Array.from({ length: 10 }, () => summerTrip)
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 's26_ten')).toBe(true)
  })

  it('s26_ten: does not unlock for 9 trips', () => {
    const trips = Array.from({ length: 9 }, () => summerTrip)
    const unlocked = computeUnlocked(trips)
    expect(unlocked.some(a => a.id === 's26_ten')).toBe(false)
  })
})

// ── ACHIEVEMENTS registry ─────────────────────────────────────────────────────

describe('ACHIEVEMENTS registry', () => {
  it('all achievements have unique ids', () => {
    const ids = ACHIEVEMENTS.map(a => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all achievements have non-empty label and desc', () => {
    for (const a of ACHIEVEMENTS) {
      expect(a.label.length).toBeGreaterThan(0)
      expect(a.desc.length).toBeGreaterThan(0)
    }
  })

  it('all check functions are callable and return boolean', () => {
    const sampleTrip = trip()
    for (const a of ACHIEVEMENTS) {
      const result = a.check([sampleTrip], 100, 5)
      expect(typeof result).toBe('boolean')
    }
  })
})
