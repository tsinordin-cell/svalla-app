import { describe, it, expect } from 'vitest'
import { computeGpsQuality, bestWindowSpeedKn, metersBetween } from './gpsQuality'
import type { GpsPoint } from './gps'

const T0 = Date.parse('2026-09-06T10:00:00.000Z')
/** Rak kurs norrut, 1 Hz, given fart i knop. */
function track(n: number, speedKn: number, opts: { acc?: number; raw?: boolean; devSpeed?: boolean; gapAt?: number; gapS?: number } = {}): GpsPoint[] {
  const pts: GpsPoint[] = []
  const mPerS = speedKn * 0.514444
  let t = T0
  for (let i = 0; i < n; i++) {
    if (opts.gapAt === i) t += (opts.gapS ?? 0) * 1000
    const lat = 59.3 + (i * mPerS) / 111_320
    pts.push({
      lat, lng: 18.0, speedKnots: speedKn, heading: 0, accuracy: opts.acc ?? 5,
      recordedAt: new Date(t).toISOString(),
      ...(opts.raw ? { rawLat: lat + 3 / 111_320, rawLng: 18.0 } : {}),
      ...(opts.devSpeed ? { deviceSpeedKnots: speedKn } : {}),
    })
    t += 1000
  }
  return pts
}

describe('computeGpsQuality — allt räknas ur punkterna', () => {
  it('tom tur ger nollor, inte NaN', () => {
    const q = computeGpsQuality([])
    expect(q.points).toBe(0)
    expect(q.rejectedPct).toBe(0)
    expect(q.accuracyMeanM).toBe(0)
    expect(q.maxSpeed1pKn).toBe(0)
    expect(q.rawOffsetMeanM).toBeNull()
    expect(q.distanceRawNM).toBeNull()
    expect(Object.values(q).some(v => Number.isNaN(v as number))).toBe(false)
  })

  it('andel kastade räknas mot alla inkomna fixar', () => {
    const q = computeGpsQuality(track(80, 5), { rejectedAccuracy: 10, rejectedAnomaly: 10 })
    expect(q.points).toBe(80)
    expect(q.rejectedPct).toBe(20)
  })

  it('luckor: längsta lucka och antal > 10 s', () => {
    const q = computeGpsQuality(track(60, 5, { gapAt: 30, gapS: 45 }))
    expect(q.gapMaxS).toBe(46)       // 45 s lucka + det vanliga 1 s-steget
    expect(q.gapsOver10s).toBe(1)
    expect(q.spanS).toBe(59 + 45)
    expect(q.intervalMeanS).toBeGreaterThan(1)
  })

  it('accuracy: medel, median, p95', () => {
    const pts = track(100, 5)
    pts.forEach((p, i) => { p.accuracy = i < 95 ? 5 : 50 })
    const q = computeGpsQuality(pts)
    expect(q.accuracyMedianM).toBe(5)
    expect(q.accuracyP95M).toBe(5)
    expect(q.accuracyMeanM).toBeCloseTo(7.3, 1)
  })

  it('rådata: andel, medelförskjutning och rådistans', () => {
    const q = computeGpsQuality(track(30, 6, { raw: true, devSpeed: true }))
    expect(q.rawPct).toBe(100)
    expect(q.rawOffsetMeanM).toBeCloseTo(3, 0)
    expect(q.deviceSpeedPct).toBe(100)
    expect(q.distanceRawNM).toBeCloseTo(q.distanceSmoothedNM, 2)
  })

  it('utan rådata (före migrationen): rawPct 0 och null-fält', () => {
    const q = computeGpsQuality(track(30, 6))
    expect(q.rawPct).toBe(0)
    expect(q.rawOffsetMeanM).toBeNull()
    expect(q.deviceSpeedPct).toBe(0)
  })

  it('toppfart: en enskild spik syns i 1p men inte i 10 s-fönstret', () => {
    const pts = track(60, 5)
    pts[30]!.speedKnots = 40   // en dålig fix
    const q = computeGpsQuality(pts)
    expect(q.maxSpeed1pKn).toBe(40)
    expect(q.maxSpeed10sKn).toBeLessThan(10)
    expect(q.maxSpeed10sKn).toBeGreaterThanOrEqual(5)
  })
})

describe('bestWindowSpeedKn', () => {
  it('konstant fart ger samma fart', () => {
    expect(bestWindowSpeedKn(track(30, 7), 10)).toBeCloseTo(7, 5)
  })
  it('en punkt: faller tillbaka på punktens fart', () => {
    expect(bestWindowSpeedKn(track(1, 7), 10)).toBe(7)
  })
})

describe('metersBetween', () => {
  it('1 bågminut i latitud ≈ 1852 m', () => {
    expect(metersBetween(59, 18, 59 + 1 / 60, 18)).toBeCloseTo(1852, -1)
  })
})
