import { describe, it, expect } from 'vitest'
import { replayTrack, rowToRawFix, type RawFix } from './gpsReplay'
import { SPEED_CEILING_KNOTS } from './tracking'

const T0 = Date.parse('2026-09-06T10:00:00.000Z')

/** Deterministiskt brus (LCG) så att testet är reproducerbart. */
function rng(seed: number) {
  let s = seed >>> 0
  return () => { s = (1664525 * s + 1013904223) >>> 0; return s / 2 ** 32 - 0.5 }
}

/** Rak kurs norrut i given fart, 1 Hz, ±noiseM meter brus. */
function fixes(n: number, speedKn: number, noiseM = 0, seed = 1): RawFix[] {
  const r = rng(seed)
  const mPerS = speedKn * 0.514444
  return Array.from({ length: n }, (_, i) => ({
    lat: 59.3 + (i * mPerS + r() * 2 * noiseM) / 111_320,
    lng: 18.0 + (r() * 2 * noiseM) / (111_320 * Math.cos(59.3 * Math.PI / 180)),
    accuracyM: 5, ts: T0 + i * 1000, deviceSpeedKn: speedKn, heading: 0,
  }))
}

describe('replayTrack — samma kedja som /spara, körd i efterhand', () => {
  it('rak kurs 12 kn utan brus: distans ±2 %, medelfart ±0,5 kn', () => {
    const res = replayTrack(fixes(300, 12))
    const trueNM = 299 * 12 * 0.514444 / 1852
    expect(res.points.length).toBe(300)
    expect(res.distanceNM).toBeGreaterThan(trueNM * 0.98)
    expect(res.distanceNM).toBeLessThan(trueNM * 1.02)
    // medel över sista 100 s (filtret behöver några sekunder på sig)
    const tail = res.points.slice(-100)
    const mean = tail.reduce((s, p) => s + p.speedKnots, 0) / tail.length
    expect(Math.abs(mean - 12)).toBeLessThan(0.5)
  })

  it('första fixen: enhetens fart, inte 0', () => {
    const res = replayTrack(fixes(5, 8))
    expect(res.points[0]!.speedKnots).toBe(8)
  })

  it('accuracy > 80 m kastas och räknas', () => {
    const f = fixes(50, 5)
    f[10]!.accuracyM = 120; f[20]!.accuracyM = 81
    const res = replayTrack(f)
    expect(res.rejectedAccuracy).toBe(2)
    expect(res.points.length).toBe(48)
    expect(res.quality.rejectedAccuracy).toBe(2)
  })

  it('anomali (hopp som kräver > 60 kn rå→rå) kastas och nästa fix jämförs mot föregående GODKÄNDA', () => {
    const f = fixes(50, 5)
    f[25]!.lat += 0.01  // ~1,1 km hopp på 1 s
    const res = replayTrack(f)
    expect(res.rejectedAnomaly).toBe(1)
    expect(res.points.length).toBe(49)
  })

  it('lucka > 30 s räknas som Kalman-omstart', () => {
    const f = fixes(60, 5)
    for (let i = 30; i < 60; i++) f[i]!.ts += 45_000
    const res = replayTrack(f)
    expect(res.kalmanResets).toBe(1)
    expect(res.quality.gapMaxS).toBe(46)
  })

  it('parametrar: högre accuracy-gräns släpper igenom fler', () => {
    const f = fixes(50, 5); f[10]!.accuracyM = 120
    expect(replayTrack(f).rejectedAccuracy).toBe(1)
    expect(replayTrack(f, { maxAccuracyM: 150 }).rejectedAccuracy).toBe(0)
  })

  it('utdata bär rådatan så att den kan sparas igen', () => {
    const res = replayTrack(fixes(3, 5))
    expect(res.points[1]!.rawLat).toBeDefined()
    expect(res.points[1]!.deviceSpeedKnots).toBe(5)
  })

  it('farten är kapad vid SPEED_CEILING_KNOTS', () => {
    const res = replayTrack(fixes(20, 5))
    expect(res.points.every(p => p.speedKnots <= SPEED_CEILING_KNOTS)).toBe(true)
  })

  // MÄTT 2026-09-06 (vitt brus ±5 m, 1 Hz, 300 s, rak kurs):
  //   3 kn: utjämnad distans 1,58× sann, rå 3,49×, filterfart 3,23 kn
  //   6 kn: 1,14× / 1,91× / 6,11 kn
  //  12 kn: 1,03× / 1,24× / 12,05 kn
  //  25 kn: 1,01× / 1,05× / 25,02 kn
  // Slutsats: farten ur filtret håller på alla farter, men DISTANSEN som
  // summa av utjämnade positioner blåses upp vid låg fart — bruset per
  // sekund är större än förflyttningen. Riktigt GPS-brus är korrelerat
  // (mindre hopp än vitt brus), så verkliga tal är lägre — fälttestet
  // avgör. Testet LÅSER dagens beteende så att en fix syns som en ändring
  // här, inte bara i ett fälttest. Kandidat: integrera filterfarten över
  // tid i stället för att summera positioner.
  it('KÄND SVAGHET: brus ±5 m vid 3 kn — filterfarten stämmer, distansen blåses upp', () => {
    const res = replayTrack(fixes(300, 3, 5))
    const trueNM = 299 * 3 * 0.514444 / 1852
    const tail = res.points.slice(-100)
    const mean = tail.reduce((s, p) => s + p.speedKnots, 0) / tail.length
    expect(Math.abs(mean - 3)).toBeLessThan(0.5)
    expect(res.distanceNM / trueNM).toBeGreaterThan(1.4)
    expect(res.distanceNM / trueNM).toBeLessThan(1.8)
    expect(res.quality.distanceRawNM! / trueNM).toBeGreaterThan(3)
  })

  it('brus ±5 m vid 12 kn: distans inom 5 %, medelfart inom 0,5 kn', () => {
    const res = replayTrack(fixes(300, 12, 5))
    const trueNM = 299 * 12 * 0.514444 / 1852
    expect(res.distanceNM / trueNM).toBeLessThan(1.05)
    const tail = res.points.slice(-100)
    const mean = tail.reduce((s, p) => s + p.speedKnots, 0) / tail.length
    expect(Math.abs(mean - 12)).toBeLessThan(0.5)
  })
})

describe('rowToRawFix', () => {
  it('rad utan rådata ger null', () => {
    expect(rowToRawFix({ raw_latitude: null, raw_longitude: null, accuracy: 5, recorded_at: '2026-09-06T10:00:00Z', device_speed_knots: null, heading: null })).toBeNull()
  })
  it('rad med rådata mappas', () => {
    const f = rowToRawFix({ raw_latitude: 59.3, raw_longitude: 18, accuracy: 4, recorded_at: '2026-09-06T10:00:00.000Z', device_speed_knots: 6.5, heading: 90 })
    expect(f).toEqual({ lat: 59.3, lng: 18, accuracyM: 4, ts: T0, deviceSpeedKn: 6.5, heading: 90 })
  })
})
