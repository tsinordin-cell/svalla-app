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
      expect(estimates[i]!).toBeGreaterThanOrEqual(estimates[i - 1]! - 1e-10)
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

// ── CvGpsKalmanFilter — låser mätningen bakom bytet 2026-09-05 ──────────────
import { CvGpsKalmanFilter } from './kalman'

function synth(speedKn: number, seconds: number, noiseM: number, curvy: boolean, seed = 7) {
  let s = seed; const rnd = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return (s / 0x7fffffff - 0.5) * 2 }
  const v = speedKn * 0.514444, degM = 1 / 111320, degMlng = 1 / (111320 * Math.cos(59.3 * Math.PI / 180))
  const truth: { lat: number; lng: number }[] = [], meas: { lat: number; lng: number; ts: number }[] = []
  for (let i = 0; i < seconds; i++) {
    const along = v * i, x = curvy ? 60 * Math.sin(2 * Math.PI * along / 300) : 0
    truth.push({ lat: 59.3 + along * degM, lng: 18.1 + x * degMlng })
    meas.push({ lat: 59.3 + (along + rnd() * noiseM) * degM, lng: 18.1 + (x + rnd() * noiseM) * degMlng, ts: 1_700_000_000_000 + i * 1000 })
  }
  return { truth, meas }
}
const errM = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  Math.hypot((a.lat - b.lat) * 111320, (a.lng - b.lng) * 111320 * Math.cos(59.3 * Math.PI / 180))
const pathM = (p: { lat: number; lng: number }[]) => { let d = 0; for (let i = 1; i < p.length; i++) d += errM(p[i]!, p[i - 1]!); return d }

describe('CvGpsKalmanFilter — hastighet i modellen, ingen släpning', () => {
  it('första fixen returneras oförändrad', () => {
    const f = new CvGpsKalmanFilter()
    const r = f.update(59.3, 18.1, 5, 1_700_000_000_000)
    expect(r.lat).toBe(59.3); expect(r.lng).toBe(18.1); expect(r.speedMs).toBe(0)
  })

  it('rak kurs 12 kn, brus ±5 m: medelfel < 5 m efter inkörning (dagens filter: 141 m i kurvor)', () => {
    const { truth, meas } = synth(12, 300, 5, false)
    const f = new CvGpsKalmanFilter()
    const out = meas.map(m => f.update(m.lat, m.lng, 5, m.ts))
    let e = 0, n = 0
    for (let i = 60; i < out.length; i++) { e += errM(out[i]!, truth[i]!); n++ }
    expect(e / n).toBeLessThan(5)
  })

  it('slingrande led 12 kn, brus ±5 m: medelfel < 12 m och distans 95–115 % av sann', () => {
    const { truth, meas } = synth(12, 900, 5, true)
    const f = new CvGpsKalmanFilter()
    const out = meas.map(m => f.update(m.lat, m.lng, 5, m.ts))
    let e = 0, n = 0
    for (let i = 300; i < out.length; i++) { e += errM(out[i]!, truth[i]!); n++ }
    expect(e / n).toBeLessThan(12)
    const ratio = pathM(out) / pathM(truth)
    expect(ratio).toBeGreaterThan(0.95); expect(ratio).toBeLessThan(1.15)
  })

  it('uppskattad fart på rak kurs 6 kn hamnar inom ±0,5 kn', () => {
    // Enskilda värden brusar (accelSigma 1 m/s² tillåter det), så medel över
    // de sista 100 sekunderna. Visad fart i appen kommer ändå ur råa deltan
    // + cleanGpsSpeed, inte härifrån.
    const { meas } = synth(6, 200, 5, false)
    const f = new CvGpsKalmanFilter()
    const v: number[] = []
    meas.forEach((m, i) => { const r = f.update(m.lat, m.lng, 5, m.ts); if (i >= 100) v.push(r.speedMs) })
    const mean = v.reduce((a, b) => a + b, 0) / v.length
    expect(Math.abs(mean / 0.514444 - 6)).toBeLessThan(0.5)
  })

  it('sämre accuracy → fixen vägs lättare (mindre hopp mot en avvikande punkt)', () => {
    const base = synth(6, 60, 0, false).meas
    const run = (acc: number) => {
      const f = new CvGpsKalmanFilter()
      let out = { lat: 0, lng: 0, speedMs: 0 }
      base.forEach((m, i) => { out = f.update(m.lat + (i === 59 ? 0.0005 : 0), m.lng, i === 59 ? acc : 5, m.ts) })
      return out
    }
    // avstånd från filtrerat läge till den O-hoppade sanna punkten:
    // med accuracy 5 m följer filtret hoppet (stort avstånd), med 50 m
    // litar det på sin egen prediktion (litet avstånd)
    const followedWithGoodAcc = errM(run(5), base[59]!)
    const followedWithBadAcc  = errM(run(50), base[59]!)
    expect(followedWithBadAcc).toBeLessThan(followedWithGoodAcc)
  })

  it('lucka > 30 s startar om filtret på nya fixen', () => {
    const f = new CvGpsKalmanFilter()
    f.update(59.3, 18.1, 5, 1_700_000_000_000)
    f.update(59.3001, 18.1, 5, 1_700_000_001_000)
    const r = f.update(59.4, 18.2, 5, 1_700_000_001_000 + 60_000)
    expect(r.lat).toBe(59.4); expect(r.lng).toBe(18.2); expect(r.speedMs).toBe(0)
  })
})
