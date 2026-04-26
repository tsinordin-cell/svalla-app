import { describe, it, expect } from 'vitest'
import {
  filterByAccuracy,
  removeSpeedOutliers,
  douglasPeucker,
  buildRoutePoints,
  splitAtAnomalies,
  buildSvgPath,
} from './routeSmooth'

// ── helpers ───────────────────────────────────────────────────────────────────

function pt(lat: number, lng: number, recordedAt = '2024-07-01T10:00:00Z', accuracy?: number) {
  return { lat, lng, recordedAt, accuracy }
}

function ptAt(lat: number, lng: number, minutesOffset: number, accuracy?: number) {
  const d = new Date('2024-07-01T10:00:00Z')
  d.setMinutes(d.getMinutes() + minutesOffset)
  return { lat, lng, recordedAt: d.toISOString(), accuracy }
}

// ── filterByAccuracy ──────────────────────────────────────────────────────────

describe('filterByAccuracy', () => {
  it('keeps points with no accuracy field', () => {
    const pts = [pt(59.3, 18.0), pt(59.31, 18.01)]
    expect(filterByAccuracy(pts)).toHaveLength(2)
  })

  it('drops points above threshold', () => {
    // Need 3+ points so removing 1 still leaves >= 2 (no fallback triggered)
    const pts = [
      pt(59.3, 18.0, undefined, 10),
      pt(59.31, 18.01, undefined, 80),  // above threshold — dropped
      pt(59.32, 18.02, undefined, 15),
    ]
    const result = filterByAccuracy(pts, 40)
    expect(result).toHaveLength(2)
    expect(result.every(p => (p.accuracy ?? 0) <= 40)).toBe(true)
  })

  it('returns all points if fewer than 2 would remain', () => {
    const pts = [pt(59.3, 18.0, undefined, 100), pt(59.31, 18.01, undefined, 200)]
    // both above threshold — fallback to original
    const result = filterByAccuracy(pts, 40)
    expect(result).toHaveLength(2)
  })

  it('keeps exact threshold value (<=), drops one above', () => {
    // accuracy=40 is kept (<=40), accuracy=41 is dropped
    const pts = [
      pt(59.3, 18.0, undefined, 40),   // kept
      pt(59.31, 18.01, undefined, 41), // dropped
      pt(59.32, 18.02, undefined, 20), // kept
    ]
    const result = filterByAccuracy(pts, 40)
    expect(result).toHaveLength(2)
    expect(result.some(p => p.accuracy === 41)).toBe(false)
    expect(result.some(p => p.accuracy === 40)).toBe(true)
  })
})

// ── removeSpeedOutliers ────────────────────────────────────────────────────────

describe('removeSpeedOutliers', () => {
  it('keeps realistic speed points unchanged', () => {
    // ~0.9 nm in 10 min = 5.4 kn — well within 30 kn
    const pts = [
      ptAt(59.3293, 18.0686, 0),
      ptAt(59.3293 + 0.009, 18.0686 + 0.009, 10),
    ]
    const result = removeSpeedOutliers(pts, 30)
    expect(result).toHaveLength(2)
  })

  it('drops GPS ghost (teleport to impossible speed)', () => {
    // First and third point are realistic neighbours; second teleports 5° away in 1 min
    const pts = [
      ptAt(59.3293, 18.0686, 0),
      ptAt(64.0000, 23.0000, 1),   // ~271 nm in 1 min — impossible
      ptAt(59.3295, 18.0688, 2),
    ]
    const result = removeSpeedOutliers(pts, 30)
    expect(result).not.toEqual(expect.arrayContaining([expect.objectContaining({ lat: 64.0 })]))
  })

  it('returns single point unchanged', () => {
    const pts = [ptAt(59.3, 18.0, 0)]
    expect(removeSpeedOutliers(pts)).toHaveLength(1)
  })

  it('drops duplicate timestamps (dt=0)', () => {
    const pts = [
      ptAt(59.3, 18.0, 0),
      ptAt(59.31, 18.01, 0),  // same time
      ptAt(59.32, 18.02, 5),
    ]
    const result = removeSpeedOutliers(pts, 30)
    // Duplicate-timestamp point is discarded
    expect(result.some(p => p.lat === 59.31)).toBe(false)
  })
})

// ── douglasPeucker ────────────────────────────────────────────────────────────

describe('douglasPeucker', () => {
  it('keeps 2-point input unchanged', () => {
    const pts = [{ lat: 59.3, lng: 18.0 }, { lat: 59.4, lng: 18.1 }]
    expect(douglasPeucker(pts)).toHaveLength(2)
  })

  it('always preserves first and last point', () => {
    const pts = Array.from({ length: 10 }, (_, i) => ({
      lat: 59.3 + i * 0.01,
      lng: 18.0 + i * 0.005,
    }))
    const result = douglasPeucker(pts, 0.0002)
    expect(result[0]).toEqual(pts[0])
    expect(result[result.length - 1]).toEqual(pts[pts.length - 1])
  })

  it('removes collinear middle points', () => {
    // Perfectly straight line — all middle points are collinear → should reduce to 2
    const pts = Array.from({ length: 10 }, (_, i) => ({
      lat: 59.3 + i * 0.01,
      lng: 18.0 + i * 0.01,
    }))
    const result = douglasPeucker(pts, 0.0002)
    expect(result).toHaveLength(2)
  })

  it('keeps bend points', () => {
    // L-shaped path: first leg straight east, then straight north
    const pts = [
      { lat: 59.3, lng: 18.0 },
      { lat: 59.3, lng: 18.05 },  // mid-east — collinear, will be removed
      { lat: 59.3, lng: 18.1 },   // corner
      { lat: 59.35, lng: 18.1 },  // mid-north — collinear, will be removed
      { lat: 59.4, lng: 18.1 },
    ]
    const result = douglasPeucker(pts, 0.0002)
    // Corner must survive
    expect(result.some(p => p.lat === 59.3 && p.lng === 18.1)).toBe(true)
  })
})

// ── buildRoutePoints ──────────────────────────────────────────────────────────

describe('buildRoutePoints', () => {
  it('returns null for fewer than 2 points', () => {
    expect(buildRoutePoints([ptAt(59.3, 18.0, 0)])).toBeNull()
    expect(buildRoutePoints([])).toBeNull()
  })

  it('rounds coordinates to 6 decimal places', () => {
    const raw = [ptAt(59.329312345, 18.068612345, 0), ptAt(59.329912345, 18.069612345, 10)]
    const result = buildRoutePoints(raw)
    expect(result).not.toBeNull()
    result!.forEach(p => {
      expect(p.lat.toString().replace(/^\d+\./, '').length).toBeLessThanOrEqual(6)
      expect(p.lng.toString().replace(/^\d+\./, '').length).toBeLessThanOrEqual(6)
    })
  })

  it('respects maxPoints cap', () => {
    // 100 points on a realistic route
    const raw = Array.from({ length: 100 }, (_, i) => ptAt(59.3 + i * 0.001, 18.0 + i * 0.001, i * 2))
    const result = buildRoutePoints(raw, 10)
    expect(result).not.toBeNull()
    expect(result!.length).toBeLessThanOrEqual(11) // +1 for forced last point
  })

  it('drops all-bad-accuracy input gracefully', () => {
    // If all points have bad accuracy and fallback returns < 2, returns null
    const raw = [ptAt(59.3, 18.0, 0, 200)]
    expect(buildRoutePoints(raw)).toBeNull()
  })
})

// ── splitAtAnomalies ──────────────────────────────────────────────────────────

describe('splitAtAnomalies', () => {
  it('returns empty for empty input', () => {
    expect(splitAtAnomalies([])).toEqual([])
  })

  it('wraps single point in an array', () => {
    expect(splitAtAnomalies([{ lat: 59.3, lng: 18.0 }])).toEqual([[{ lat: 59.3, lng: 18.0 }]])
  })

  it('returns one segment for uniform steps', () => {
    const pts = Array.from({ length: 5 }, (_, i) => ({ lat: 59.3 + i * 0.01, lng: 18.0 }))
    const segs = splitAtAnomalies(pts)
    expect(segs).toHaveLength(1)
    expect(segs[0]).toHaveLength(5)
  })

  it('splits on anomalous jump', () => {
    const pts = [
      { lat: 59.30, lng: 18.0 },
      { lat: 59.31, lng: 18.0 },
      { lat: 59.32, lng: 18.0 },
      { lat: 61.00, lng: 18.0 },  // teleport ~188 km north
      { lat: 61.01, lng: 18.0 },
      { lat: 61.02, lng: 18.0 },
    ]
    const segs = splitAtAnomalies(pts)
    expect(segs.length).toBeGreaterThanOrEqual(2)
  })
})

// ── buildSvgPath ──────────────────────────────────────────────────────────────

describe('buildSvgPath', () => {
  const toX = (lng: number) => (lng - 18.0) * 1000
  const toY = (lat: number) => (60.0 - lat) * 1000

  it('returns empty string for empty input', () => {
    expect(buildSvgPath([], toX, toY)).toBe('')
  })

  it('produces M/L path commands for continuous track', () => {
    const pts = [
      { lat: 59.3, lng: 18.0 },
      { lat: 59.31, lng: 18.01 },
      { lat: 59.32, lng: 18.02 },
    ]
    const d = buildSvgPath(pts, toX, toY)
    expect(d).toMatch(/^M/)
    expect(d).toContain('L')
  })

  it('inserts M break at anomalous jump', () => {
    const pts = [
      { lat: 59.30, lng: 18.0 },
      { lat: 59.31, lng: 18.0 },
      { lat: 61.00, lng: 18.0 },  // teleport
      { lat: 61.01, lng: 18.0 },
      { lat: 61.02, lng: 18.0 },
    ]
    const d = buildSvgPath(pts, toX, toY)
    // Should have two M commands — one per segment
    const mCount = (d.match(/M/g) ?? []).length
    expect(mCount).toBeGreaterThanOrEqual(2)
  })
})
