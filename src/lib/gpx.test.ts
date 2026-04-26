import { describe, it, expect } from 'vitest'
import { buildGpx, gpxStats, simplifyPoints, type GpxPoint, type GpxTrack } from './gpx'

// ── buildGpx ──────────────────────────────────────────────────────────────────

describe('buildGpx', () => {
  const track: GpxTrack = {
    name: 'Stockholm → Sandhamn',
    points: [
      { lat: 59.3293, lng: 18.0686, time: '2024-07-01T08:00:00Z' },
      { lat: 59.2820, lng: 18.9130, time: '2024-07-01T12:00:00Z' },
    ],
  }

  it('produces valid GPX header', () => {
    const gpx = buildGpx([track])
    expect(gpx).toContain('<?xml version="1.0"')
    expect(gpx).toContain('<gpx version="1.1"')
  })

  it('includes track name', () => {
    const gpx = buildGpx([track])
    expect(gpx).toContain('Stockholm → Sandhamn')
  })

  it('includes trkpt lat/lon attributes', () => {
    const gpx = buildGpx([track])
    expect(gpx).toContain('lat="59.329300"')
    expect(gpx).toContain('lon="18.068600"')
  })

  it('includes time elements when present', () => {
    const gpx = buildGpx([track])
    expect(gpx).toContain('<time>2024-07-01T08:00:00Z</time>')
  })

  it('omits ele element when not provided', () => {
    const gpx = buildGpx([track])
    expect(gpx).not.toContain('<ele>')
  })

  it('includes ele element when provided', () => {
    const trackWithEle: GpxTrack = {
      name: 'Test',
      points: [{ lat: 59.3, lng: 18.0, ele: 5.0 }],
    }
    const gpx = buildGpx([trackWithEle])
    expect(gpx).toContain('<ele>5.0</ele>')
  })

  it('escapes XML special chars in name', () => {
    const t: GpxTrack = { name: 'A & B <test>', points: [{ lat: 59.3, lng: 18.0 }] }
    const gpx = buildGpx([t])
    expect(gpx).toContain('A &amp; B &lt;test&gt;')
    expect(gpx).not.toContain('A & B <test>')
  })

  it('handles multiple tracks', () => {
    const t2: GpxTrack = { name: 'Tur 2', points: [{ lat: 58.0, lng: 17.0 }] }
    const gpx = buildGpx([track, t2])
    expect((gpx.match(/<trk>/g) ?? []).length).toBe(2)
  })

  it('returns empty trks for empty array', () => {
    const gpx = buildGpx([])
    expect(gpx).toContain('<gpx')
    expect(gpx).not.toContain('<trk>')
  })
})

// ── gpxStats ──────────────────────────────────────────────────────────────────

describe('gpxStats', () => {
  it('returns zeros for fewer than 2 points', () => {
    const result = gpxStats([{ lat: 59.3, lng: 18.0 }])
    expect(result.distNm).toBe(0)
    expect(result.durationMin).toBe(0)
  })

  it('returns null startTime for empty array', () => {
    const result = gpxStats([])
    expect(result.startTime).toBeNull()
  })

  it('computes Stockholm → Sandhamn distance ~26 nm', () => {
    const pts: GpxPoint[] = [
      { lat: 59.3293, lng: 18.0686 },
      { lat: 59.2820, lng: 18.9130 },
    ]
    const { distNm } = gpxStats(pts)
    // ~26 nm air-line (crow flies)
    expect(distNm).toBeGreaterThan(20)
    expect(distNm).toBeLessThan(35)
  })

  it('computes duration from timestamps', () => {
    const pts: GpxPoint[] = [
      { lat: 59.3, lng: 18.0, time: '2024-07-01T08:00:00Z' },
      { lat: 59.4, lng: 18.1, time: '2024-07-01T10:30:00Z' },
    ]
    const { durationMin } = gpxStats(pts)
    expect(durationMin).toBe(150)
  })

  it('returns 0 duration when timestamps are missing', () => {
    const pts: GpxPoint[] = [
      { lat: 59.3, lng: 18.0 },
      { lat: 59.4, lng: 18.1 },
    ]
    const { durationMin } = gpxStats(pts)
    expect(durationMin).toBe(0)
  })

  it('returns startTime from first point', () => {
    const pts: GpxPoint[] = [
      { lat: 59.3, lng: 18.0, time: '2024-07-01T08:00:00Z' },
      { lat: 59.4, lng: 18.1, time: '2024-07-01T10:00:00Z' },
    ]
    expect(gpxStats(pts).startTime).toBe('2024-07-01T08:00:00Z')
  })

  it('accumulates distance across multiple segments', () => {
    // Three points in a line — total should be approx sum of legs
    const pts: GpxPoint[] = [
      { lat: 59.0, lng: 18.0 },
      { lat: 59.5, lng: 18.0 },
      { lat: 60.0, lng: 18.0 },
    ]
    const { distNm } = gpxStats(pts)
    const twoLeg = gpxStats([pts[0]!, pts[2]!]).distNm
    expect(Math.abs(distNm - twoLeg)).toBeLessThan(1)
  })
})

// ── simplifyPoints ────────────────────────────────────────────────────────────

describe('simplifyPoints', () => {
  it('returns unchanged array when under maxCount', () => {
    const pts: GpxPoint[] = [{ lat: 59.3, lng: 18.0 }, { lat: 59.4, lng: 18.1 }]
    expect(simplifyPoints(pts, 300)).toBe(pts)
  })

  it('reduces to at most maxCount points', () => {
    const pts: GpxPoint[] = Array.from({ length: 1000 }, (_, i) => ({
      lat: 59.0 + i * 0.001,
      lng: 18.0,
    }))
    const result = simplifyPoints(pts, 100)
    expect(result.length).toBeLessThanOrEqual(101) // step sampling may include last
  })

  it('always includes last point', () => {
    const pts: GpxPoint[] = Array.from({ length: 500 }, (_, i) => ({
      lat: 59.0 + i * 0.001,
      lng: 18.0,
    }))
    const result = simplifyPoints(pts, 50)
    expect(result[result.length - 1]).toEqual(pts[pts.length - 1])
  })

  it('returns all points when exactly at maxCount', () => {
    const pts: GpxPoint[] = Array.from({ length: 300 }, (_, i) => ({ lat: 59.0 + i * 0.001, lng: 18.0 }))
    expect(simplifyPoints(pts, 300)).toHaveLength(300)
  })
})
