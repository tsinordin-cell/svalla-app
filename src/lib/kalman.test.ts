import { describe, it, expect } from 'vitest'
import { KalmanFilter, GpsKalmanFilter } from './kalman'

// ── KalmanFilter ──────────────────────────────────────────────────────────────

describe('KalmanFilter', () => {
  it('first update returns the measurement exactly', () => {
    const f = new KalmanFilter()
    expect(f.update(59.3293)).toBe(59.3293)
  })

  it('smooths noisy constant signal toward true value', () => {
    const f = new KalmanFilter(0.001, 0.5)
    const truth = 59.3293
    // Feed 20 noisy measurements around truth
    const noise = [0.001, -0.002, 0.003, -0.001, 0.002, -0.003, 0.001, 0.0, -0.001, 0.002,
                   -0.001, 0.003, -0.002, 0.001, 0.0, -0.001, 0.002, -0.003, 0.001, -0.001]
    let estimate = 0
    for (const n of noise) estimate = f.update(truth + n)
    expect(Math.abs(estimate - truth)).toBeLessThan(0.005)
  })

  it('estimate converges monotonically after step change', () => {
    const f = new KalmanFilter(0.001, 0.5)
    // Warm up at 59.3
    for (let i = 0; i < 10; i++) f.update(59.3)
    // Step to 59.5
    const estimates: number[] = []
    for (let i = 0; i < 20; i++) estimates.push(f.update(59.5))
    // Each successive estimate should be >= previous (converging upward)
    for (let i = 1; i < estimates.length; i++) {
      expect(estimates[i]).toBeGreaterThanOrEqual(estimates[i - 1] - 1e-10)
    }
  })

  it('reset returns to uninitialized state', () => {
    const f = new KalmanFilter()
    f.update(59.3)
    f.update(59.31)
    f.reset()
    // After reset first update should again return measurement exactly
    expect(f.update(60.0)).toBe(60.0)
  })
})

// ── GpsKalmanFilter ───────────────────────────────────────────────────────────

describe('GpsKalmanFilter', () => {
  it('first update returns measurement coordinates exactly', () => {
    const f = new GpsKalmanFilter()
    const result = f.update(59.3293, 18.0686)
    expect(result.lat).toBe(59.3293)
    expect(result.lng).toBe(18.0686)
  })

  it('smooths both lat and lng independently', () => {
    const f = new GpsKalmanFilter(0.001, 0.5)
    const trueLat = 59.3293
    const trueLng = 18.0686
    let last = { lat: 0, lng: 0 }
    for (let i = 0; i < 30; i++) {
      const noise = (Math.random() - 0.5) * 0.002
      last = f.update(trueLat + noise, trueLng + noise)
    }
    expect(Math.abs(last.lat - trueLat)).toBeLessThan(0.002)
    expect(Math.abs(last.lng - trueLng)).toBeLessThan(0.002)
  })

  it('returns object with lat and lng keys', () => {
    const f = new GpsKalmanFilter()
    const result = f.update(59.3, 18.0)
    expect(result).toHaveProperty('lat')
    expect(result).toHaveProperty('lng')
  })

  it('reset makes next update return measurement exactly', () => {
    const f = new GpsKalmanFilter()
    f.update(59.3, 18.0)
    f.update(59.31, 18.01)
    f.reset()
    const result = f.update(60.0, 20.0)
    expect(result.lat).toBe(60.0)
    expect(result.lng).toBe(20.0)
  })

  it('does not cross-contaminate lat and lng channels', () => {
    const f = new GpsKalmanFilter(0.001, 0.5)
    // Warm up with equal values
    for (let i = 0; i < 10; i++) f.update(59.3, 18.0)
    // Large step only in lng — feed many updates so filter has time to converge
    for (let i = 0; i < 30; i++) f.update(59.3, 20.0)
    const result = f.update(59.3, 20.0)
    // lat should stay near 59.3, lng should have moved well toward 20.0
    expect(Math.abs(result.lat - 59.3)).toBeLessThan(0.01)
    expect(result.lng).toBeGreaterThan(19.5)
  })
})
