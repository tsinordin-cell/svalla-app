import { describe, it, expect } from 'vitest'
import {
  msToKnots,
  distanceNM,
  totalDistanceNM,
  avgSpeedKnots,
  maxSpeedKnots,
  detectStops,
  formatDuration,
  formatDurationMin,
  isGpsAnomaly,
  calculateBearing,
  bearingLabel,
  computeMovementState,
  getLiveInsights,
  computeRouteStats,
  restaurantsAlongRoute,
  type GpsPoint,
  type StopEvent,
} from './gps'

// ── helpers ───────────────────────────────────────────────────────────────────

function gpt(
  lat: number, lng: number, speedKnots: number,
  recordedAt = '2024-07-01T10:00:00Z',
  heading: number | null = null,
  accuracy = 5,
): GpsPoint {
  return { lat, lng, speedKnots, heading, accuracy, recordedAt }
}

function gptAt(lat: number, lng: number, speedKnots: number, minutesOffset: number): GpsPoint {
  const d = new Date('2024-07-01T10:00:00Z')
  d.setMinutes(d.getMinutes() + minutesOffset)
  return { lat, lng, speedKnots, heading: null, accuracy: 5, recordedAt: d.toISOString() }
}

// ── msToKnots ─────────────────────────────────────────────────────────────────

describe('msToKnots', () => {
  it('converts 0 m/s to 0 kn', () => {
    expect(msToKnots(0)).toBe(0)
  })

  it('converts 1 m/s ≈ 1.944 kn', () => {
    expect(msToKnots(1)).toBeCloseTo(1.944, 2)
  })

  it('converts 10 m/s ≈ 19.4 kn', () => {
    expect(msToKnots(10)).toBeCloseTo(19.44, 1)
  })
})

// ── distanceNM ────────────────────────────────────────────────────────────────

describe('distanceNM', () => {
  it('returns 0 for identical points', () => {
    expect(distanceNM(59.3, 18.0, 59.3, 18.0)).toBe(0)
  })

  it('Stockholm → Sandhamn ≈ 26 NM', () => {
    const d = distanceNM(59.3293, 18.0686, 59.2820, 18.9130)
    expect(d).toBeGreaterThan(22)
    expect(d).toBeLessThan(30)
  })

  it('is symmetric', () => {
    const d1 = distanceNM(59.3, 18.0, 59.4, 18.1)
    const d2 = distanceNM(59.4, 18.1, 59.3, 18.0)
    expect(d1).toBeCloseTo(d2, 10)
  })

  it('scales with distance', () => {
    const short = distanceNM(59.3, 18.0, 59.31, 18.0)
    const long  = distanceNM(59.3, 18.0, 59.6,  18.0)
    expect(long).toBeGreaterThan(short * 5)
  })
})

// ── totalDistanceNM ───────────────────────────────────────────────────────────

describe('totalDistanceNM (GpsPoint[])', () => {
  it('returns 0 for 0–1 points', () => {
    expect(totalDistanceNM([])).toBe(0)
    expect(totalDistanceNM([gpt(59.3, 18.0, 5)])).toBe(0)
  })

  it('sums legs correctly', () => {
    const pts = [gpt(59.3, 18.0, 5), gpt(59.4, 18.0, 5), gpt(59.5, 18.0, 5)]
    const twoLegs = totalDistanceNM(pts)
    const oneByOne = distanceNM(59.3, 18.0, 59.4, 18.0) + distanceNM(59.4, 18.0, 59.5, 18.0)
    expect(twoLegs).toBeCloseTo(oneByOne, 10)
  })
})

// ── avgSpeedKnots ─────────────────────────────────────────────────────────────

describe('avgSpeedKnots', () => {
  it('returns 0 for empty array', () => {
    expect(avgSpeedKnots([])).toBe(0)
  })

  it('ignores points at or below 0.3 kn', () => {
    const pts = [gpt(59.3, 18.0, 0), gpt(59.3, 18.0, 0.2), gpt(59.3, 18.0, 0.3)]
    expect(avgSpeedKnots(pts)).toBe(0)
  })

  it('averages only moving points', () => {
    const pts = [
      gpt(59.3, 18.0, 0.1),  // stopped — excluded
      gpt(59.3, 18.0, 4.0),  // moving
      gpt(59.3, 18.0, 6.0),  // moving
    ]
    expect(avgSpeedKnots(pts)).toBeCloseTo(5.0, 5)
  })
})

// ── maxSpeedKnots ─────────────────────────────────────────────────────────────

describe('maxSpeedKnots', () => {
  it('returns 0 for empty array', () => {
    expect(maxSpeedKnots([])).toBe(0)
  })

  it('returns highest speed', () => {
    const pts = [gpt(59.3, 18.0, 3), gpt(59.3, 18.0, 12), gpt(59.3, 18.0, 7)]
    expect(maxSpeedKnots(pts)).toBe(12)
  })
})

// ── detectStops ───────────────────────────────────────────────────────────────

describe('detectStops', () => {
  it('returns empty for moving-only track', () => {
    const pts = Array.from({ length: 5 }, (_, i) => gptAt(59.3, 18.0, 5, i * 2))
    expect(detectStops(pts)).toHaveLength(0)
  })

  it('detects mid-trip stop lasting > 2 min', () => {
    const pts = [
      gptAt(59.3, 18.0, 5, 0),    // moving
      gptAt(59.3, 18.0, 0.1, 5),  // stop starts
      gptAt(59.3, 18.0, 0.1, 8),  // still stopped (3 min into stop)
      gptAt(59.3, 18.0, 5, 10),   // moving again
    ]
    const stops = detectStops(pts)
    expect(stops).toHaveLength(1)
    expect(stops[0]!.type).toBe('stop')
    expect(stops[0]!.durationSeconds).toBeGreaterThanOrEqual(180)
  })

  it('ignores brief pause under 2 min', () => {
    const pts = [
      gptAt(59.3, 18.0, 5, 0),
      gptAt(59.3, 18.0, 0.1, 1),  // slow for only 1 min
      gptAt(59.3, 18.0, 5, 2),
    ]
    expect(detectStops(pts)).toHaveLength(0)
  })

  it('detects stop at end of track', () => {
    const pts = [
      gptAt(59.3, 18.0, 5, 0),
      gptAt(59.3, 18.0, 0.1, 5),
      gptAt(59.3, 18.0, 0.1, 8),
      // No resume — trip ends while stopped
    ]
    const stops = detectStops(pts)
    expect(stops).toHaveLength(1)
  })

  it('preserves stop position (first slow point)', () => {
    const pts = [
      gptAt(59.3, 18.0, 5, 0),
      gptAt(59.5, 19.0, 0.1, 5),  // stop starts here
      gptAt(59.5, 19.0, 0.1, 8),
      gptAt(59.5, 19.0, 5, 10),
    ]
    const stops = detectStops(pts)
    expect(stops[0]!.lat).toBe(59.5)
    expect(stops[0]!.lng).toBe(19.0)
  })
})

// ── formatDuration ────────────────────────────────────────────────────────────

describe('formatDuration', () => {
  it('formats seconds only', () => {
    expect(formatDuration(45)).toBe('45s')
  })

  it('formats minutes only', () => {
    expect(formatDuration(120)).toBe('2min')
  })

  it('formats minutes and seconds', () => {
    expect(formatDuration(90)).toBe('1min 30s')
  })

  it('formats hours only', () => {
    expect(formatDuration(7200)).toBe('2h')
  })

  it('formats hours and minutes', () => {
    expect(formatDuration(3660)).toBe('1h 1min')
  })
})

// ── formatDurationMin ─────────────────────────────────────────────────────────

describe('formatDurationMin', () => {
  it('returns null for 0', () => {
    expect(formatDurationMin(0)).toBeNull()
  })

  it('formats minutes under 1h', () => {
    expect(formatDurationMin(45)).toBe('45min')
  })

  it('formats exact hours', () => {
    expect(formatDurationMin(120)).toBe('2h')
  })

  it('formats hours and minutes', () => {
    expect(formatDurationMin(75)).toBe('1h 15min')
  })
})

// ── isGpsAnomaly ──────────────────────────────────────────────────────────────

describe('isGpsAnomaly', () => {
  const base = new Date('2024-07-01T10:00:00Z').getTime()
  const plus10min = base + 10 * 60 * 1000

  it('returns false for realistic speed (5 kn over 10 min)', () => {
    // ~0.9 NM in 10 min = 5.4 kn — fine
    const result = isGpsAnomaly(59.3293, 18.0686, base, 59.3293 + 0.009, 18.0686 + 0.009, plus10min)
    expect(result).toBe(false)
  })

  it('returns true for teleport (impossible speed)', () => {
    // Jump 5 degrees in 1 minute — hundreds of knots
    const plus1min = base + 60 * 1000
    const result = isGpsAnomaly(59.3, 18.0, base, 64.0, 23.0, plus1min)
    expect(result).toBe(true)
  })

  it('returns false when timestamps are too close (< 0.18s)', () => {
    // dt = 0.1 s — below the skip threshold
    const result = isGpsAnomaly(59.3, 18.0, base, 65.0, 25.0, base + 100)
    expect(result).toBe(false)
  })

  it('respects custom maxSpeedKnots', () => {
    // 10 kn over 10 min — fine at 45 kn limit, anomaly at 5 kn limit
    const result5  = isGpsAnomaly(59.3293, 18.0686, base, 59.3293 + 0.018, 18.0686 + 0.018, plus10min, 5)
    const result45 = isGpsAnomaly(59.3293, 18.0686, base, 59.3293 + 0.018, 18.0686 + 0.018, plus10min, 45)
    expect(result5).toBe(true)
    expect(result45).toBe(false)
  })
})

// ── calculateBearing ──────────────────────────────────────────────────────────

describe('calculateBearing', () => {
  it('north: same lng, increasing lat → ~0°', () => {
    const b = calculateBearing(59.0, 18.0, 60.0, 18.0)
    expect(b).toBeCloseTo(0, 0)
  })

  it('east: same lat, increasing lng → ~90°', () => {
    const b = calculateBearing(59.0, 18.0, 59.0, 20.0)
    // At lat 59° spherical bearing deviates ~0.9° from 90 — allow 2° tolerance
    expect(Math.abs(b - 90)).toBeLessThan(2)
  })

  it('south: same lng, decreasing lat → ~180°', () => {
    const b = calculateBearing(60.0, 18.0, 59.0, 18.0)
    expect(b).toBeCloseTo(180, 0)
  })

  it('west: same lat, decreasing lng → ~270°', () => {
    const b = calculateBearing(59.0, 20.0, 59.0, 18.0)
    expect(Math.abs(b - 270)).toBeLessThan(2)
  })

  it('result is always in [0, 360)', () => {
    for (let i = 0; i < 8; i++) {
      const angle = i * 45
      const rad = angle * Math.PI / 180
      const b = calculateBearing(59.0, 18.0, 59.0 + Math.cos(rad) * 0.1, 18.0 + Math.sin(rad) * 0.1)
      expect(b).toBeGreaterThanOrEqual(0)
      expect(b).toBeLessThan(360)
    }
  })
})

// ── bearingLabel ──────────────────────────────────────────────────────────────

describe('bearingLabel', () => {
  it('0° → N', () => expect(bearingLabel(0)).toBe('N'))
  it('90° → O', () => expect(bearingLabel(90)).toBe('O'))
  it('180° → S', () => expect(bearingLabel(180)).toBe('S'))
  it('270° → V', () => expect(bearingLabel(270)).toBe('V'))
  it('45° → NO', () => expect(bearingLabel(45)).toBe('NO'))
  it('360° → N (wraps)', () => expect(bearingLabel(360)).toBe('N'))
})

// ── computeMovementState ──────────────────────────────────────────────────────

describe('computeMovementState', () => {
  it('returns STILLA for empty array', () => {
    expect(computeMovementState([])).toBe('STILLA')
  })

  it('returns SEGLING when avg speed >= 0.8 kn', () => {
    const pts = Array.from({ length: 12 }, () => gpt(59.3, 18.0, 5))
    expect(computeMovementState(pts)).toBe('SEGLING')
  })

  it('returns DRIFTAR when avg speed 0.25–0.8 kn', () => {
    const pts = Array.from({ length: 12 }, () => gpt(59.3, 18.0, 0.5))
    expect(computeMovementState(pts)).toBe('DRIFTAR')
  })

  it('returns STILLA when speed is near zero and no position spread', () => {
    const pts = Array.from({ length: 12 }, () => gpt(59.300001, 18.000001, 0.0))
    expect(computeMovementState(pts)).toBe('STILLA')
  })

  it('returns ANKRAT when slow but position oscillates > anchor threshold', () => {
    // Spread lat > 0.000072° (boat swinging at anchor)
    const pts = Array.from({ length: 12 }, (_, i) => gpt(59.3 + (i % 2) * 0.0001, 18.0, 0.1))
    expect(computeMovementState(pts)).toBe('ANKRAT')
  })
})

// ── getLiveInsights ───────────────────────────────────────────────────────────

describe('getLiveInsights', () => {
  it('returns empty for fewer than 10 points', () => {
    expect(getLiveInsights([], 0, [])).toEqual([])
    expect(getLiveInsights(Array.from({ length: 9 }, () => gpt(59.3, 18.0, 5)), 0, [])).toEqual([])
  })

  it('returns at most 2 insights', () => {
    const manyPts = Array.from({ length: 20 }, () => gpt(59.3, 18.0, 20))
    const ins = getLiveInsights(manyPts, 7250, [])
    expect(ins.length).toBeLessThanOrEqual(2)
  })

  it('triggers speed insight when max speed >= 15 kn', () => {
    const pts = [
      ...Array.from({ length: 9 }, () => gpt(59.3, 18.0, 5)),
      gpt(59.3, 18.0, 16),
    ]
    const ins = getLiveInsights(pts, 0, [])
    expect(ins.some(i => i.key === 'fast')).toBe(true)
  })

  it('triggers 1h insight when elapsed is in 3600–3699s window', () => {
    const pts = Array.from({ length: 10 }, () => gpt(59.3, 18.0, 5))
    const ins = getLiveInsights(pts, 3650, [])
    expect(ins.some(i => i.key === '1h')).toBe(true)
  })

  it('triggers first-stop insight on exactly 1 stop', () => {
    const pts = Array.from({ length: 10 }, () => gpt(59.3, 18.0, 5))
    const stops: StopEvent[] = [{ lat: 59.3, lng: 18.0, type: 'stop', startedAt: '', durationSeconds: 300 }]
    const ins = getLiveInsights(pts, 0, stops)
    expect(ins.some(i => i.key === 'stop1')).toBe(true)
  })
})

// ── computeRouteStats ─────────────────────────────────────────────────────────

describe('computeRouteStats', () => {
  const pts = [
    gpt(59.3, 18.0, 5),
    gpt(59.35, 18.05, 6),
    gpt(59.4, 18.1, 0),
  ]
  const stops: StopEvent[] = [
    { lat: 59.35, lng: 18.05, type: 'stop', startedAt: '', durationSeconds: 600 },
  ]

  it('computes distanceNM from points', () => {
    const stats = computeRouteStats(pts, [], 3600)
    expect(stats.distanceNM).toBeGreaterThan(0)
  })

  it('subtracts stopped time from moving time', () => {
    const stats = computeRouteStats(pts, stops, 3600)
    expect(stats.movingTimeSec).toBe(3600 - 600)
    expect(stats.stoppedTimeSec).toBe(600)
  })

  it('counts only stops with type=stop', () => {
    const mixedStops: StopEvent[] = [
      { lat: 59.3, lng: 18.0, type: 'stop',  startedAt: '', durationSeconds: 300 },
      { lat: 59.3, lng: 18.0, type: 'pause', startedAt: '', durationSeconds: 60  },
    ]
    const stats = computeRouteStats(pts, mixedStops, 3600)
    expect(stats.stopCount).toBe(1)
  })

  it('overallBearing is null for single point', () => {
    const stats = computeRouteStats([gpt(59.3, 18.0, 5)], [], 60)
    expect(stats.overallBearing).toBeNull()
  })

  it('overallBearing is a number for multi-point track', () => {
    const stats = computeRouteStats(pts, [], 3600)
    expect(typeof stats.overallBearing).toBe('number')
  })

  it('movingTimeSec never goes below 0', () => {
    const bigStop: StopEvent[] = [{ lat: 59.3, lng: 18.0, type: 'stop', startedAt: '', durationSeconds: 9999 }]
    const stats = computeRouteStats(pts, bigStop, 100)
    expect(stats.movingTimeSec).toBe(0)
  })
})

// ── restaurantsAlongRoute ─────────────────────────────────────────────────────

describe('restaurantsAlongRoute', () => {
  const pts = [gpt(59.3293, 18.0686, 5), gpt(59.2820, 18.9130, 5)]

  it('includes restaurant within threshold', () => {
    const restaurants = [{ id: '1', name: 'Sandhamns Värdshus', latitude: 59.2820, longitude: 18.9130 }]
    const result = restaurantsAlongRoute(pts, restaurants, 0.5)
    expect(result).toHaveLength(1)
  })

  it('excludes restaurant outside threshold', () => {
    const restaurants = [{ id: '2', name: 'Gotland', latitude: 57.6, longitude: 18.3 }]
    const result = restaurantsAlongRoute(pts, restaurants, 0.5)
    expect(result).toHaveLength(0)
  })

  it('returns empty for empty restaurants list', () => {
    expect(restaurantsAlongRoute(pts, [], 0.5)).toHaveLength(0)
  })
})
