import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { tripDistanceNM, totalDistanceNM, type GpsPoint } from './gps'
import { replayTrack, parseFixture } from './gpsReplay'

const T0 = Date.parse('2026-09-11T10:00:00.000Z')
const M_PER_DEG = 111_320
function pt(i: number, lat: number, lng: number, kn: number, dev: number | null = kn, dtS = 1): GpsPoint {
  return { lat, lng, speedKnots: kn, heading: 0, accuracy: 5, recordedAt: new Date(T0 + i * dtS * 1000).toISOString(),
    rawLat: lat, rawLng: lng, deviceSpeedKnots: dev }
}

describe('tripDistanceNM — ∫ Doppler-fart dt (beslut 2026-09-11)', () => {
  it('10 kn i 360 s = 1,00 NM, samma som positionerna på en rak linje', () => {
    const pts = Array.from({ length: 361 }, (_, i) => pt(i, 59.3 + (i * 5.14444) / M_PER_DEG, 18, 10))
    expect(tripDistanceNM(pts)).toBeCloseTo(1.0, 3)
    expect(totalDistanceNM(pts)).toBeCloseTo(1.0, 2)
  })
  it('stilla med ±5 m positionsbrus: positionerna ger sträcka, Doppler ger 0 — båten vid bojen', () => {
    let seed = 7
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 - 0.5 }
    const pts = Array.from({ length: 300 }, (_, i) => pt(i, 59.3 + (rnd() * 10) / M_PER_DEG, 18 + (rnd() * 10) / M_PER_DEG, 0))
    expect(totalDistanceNM(pts)).toBeGreaterThan(0.3)   // brus som "sträcka" — det gamla felet
    expect(tripDistanceNM(pts)).toBe(0)
  })
  it('lucka > 10 s: sträckan mellan de råa fixarna används, inte fart × lucka', () => {
    const a = pt(0, 59.3, 18, 10), b = pt(1, 59.3 + 1852 / M_PER_DEG, 18, 10, 10, 120)   // 1 NM bort, 120 s senare
    expect(tripDistanceNM([a, b])).toBeCloseTo(1.0, 2)   // inte 10 kn × 120 s = 0,33
  })
  it('saknad Doppler (GPX-import, gamla punkter): sträcka mellan positioner', () => {
    const pts = Array.from({ length: 61 }, (_, i) => pt(i, 59.3 + (i * 5.14444) / M_PER_DEG, 18, 10, null))
    expect(tripDistanceNM(pts)).toBeCloseTo(totalDistanceNM(pts), 6)
  })
  it('negativ Doppler (iOS: -1 = okänd) behandlas som saknad', () => {
    const pts = Array.from({ length: 61 }, (_, i) => pt(i, 59.3 + (i * 5.14444) / M_PER_DEG, 18, 10, -1))
    expect(tripDistanceNM(pts)).toBeCloseTo(totalDistanceNM(pts), 6)
  })
})

describe('Toms bilturer som facit', () => {
  const load = (id: string, t0: string) =>
    replayTrack(parseFixture(readFileSync(`${__dirname}/__fixtures__/trip-${id}.txt`, 'utf8'), Date.parse(t0))).points
  it('2,7 mi-turen: bilen 2,30–2,39 NM — ∫Doppler träffar, positionssumman gör det inte', () => {
    const pts = load('5fa4cf65', '2026-09-11T00:22:42.945Z')
    const d = tripDistanceNM(pts)
    expect(d).toBeGreaterThanOrEqual(2.30)
    expect(d).toBeLessThanOrEqual(2.39)
    expect(totalDistanceNM(pts)).toBeGreaterThan(2.39)   // 2,415 — det som visades före 11/9
  })
  it('12 NM-turen: 12,1 NM (utan facit, låser bara värdet)', () => {
    expect(tripDistanceNM(load('828d8cbc', '2026-09-11T00:47:53.534Z'))).toBeCloseTo(12.14, 1)
  })
  it('10/9-turen med 158 s-luckan: luckan räknas som sträcka mellan fixarna', () => {
    expect(tripDistanceNM(load('15b47ab2', '2026-09-10T19:07:20.286Z'))).toBeCloseTo(14.81, 1)
  })
  it('20,5 mi-turen (1 305 fixar, stillastående foto): tre metoder, låsta värden', () => {
    const pts = load('06c13078', '2026-09-11T14:58:19.643Z')
    expect(pts.length).toBe(1305)
    expect(tripDistanceNM(pts)).toBeCloseTo(17.45, 1)
    expect(totalDistanceNM(pts)).toBeCloseTo(17.77, 1)
    const raw = pts.map(p => ({ ...p, lat: p.rawLat ?? p.lat, lng: p.rawLng ?? p.lng }))
    expect(totalDistanceNM(raw)).toBeCloseTo(17.61, 1)
  })
  it('bilens mätare som facit: bara ∫Doppler stämmer med EN kalibreringsfaktor på båda giltiga turerna', () => {
    // Mätt: bilen visade 2,7 mi (2,30–2,39 NM) och 20,5 mi (17,77–17,86 NM), båda
    // fotade stillastående. Resonerat: bilens vägmätare har ett okänt men
    // konstant fel k = bil/sant (samma bil, samma däck). En metod som mäter rätt
    // ger då överlappande k-intervall på båda turerna. Positionssumman (utjämnad
    // eller rå) kräver olika k för de två turerna — den kan inte vara rätt på
    // båda. ∫Doppler ger k ≈ 1,02: bilen visar ~2 % för mycket, vilket är
    // vanligt för vägmätare. Det är grunden för beslutet 2026-09-11.
    const car = { short: [2.30, 2.39] as const, long: [17.77, 17.86] as const }
    const short = load('5fa4cf65', '2026-09-11T00:22:42.945Z')
    const long = load('06c13078', '2026-09-11T14:58:19.643Z')
    const rawOf = (p: GpsPoint[]) => p.map(x => ({ ...x, lat: x.rawLat ?? x.lat, lng: x.rawLng ?? x.lng }))
    const kRange = (d: number, c: readonly [number, number]) => [c[0] / d, c[1] / d] as const
    const overlaps = (a: readonly [number, number], b: readonly [number, number]) => a[0] <= b[1] && b[0] <= a[1]
    const methods = {
      doppler: [tripDistanceNM(short), tripDistanceNM(long)],
      smoothed: [totalDistanceNM(short), totalDistanceNM(long)],
      raw: [totalDistanceNM(rawOf(short)), totalDistanceNM(rawOf(long))],
    }
    const consistent = (m: number[]) => overlaps(kRange(m[0]!, car.short), kRange(m[1]!, car.long))
    expect(consistent(methods.doppler)).toBe(true)
    expect(consistent(methods.smoothed)).toBe(false)
    expect(consistent(methods.raw)).toBe(false)
    const k = kRange(methods.doppler[1]!, car.long)
    expect(k[0]).toBeGreaterThan(1.01)
    expect(k[1]).toBeLessThan(1.03)
  })
})
