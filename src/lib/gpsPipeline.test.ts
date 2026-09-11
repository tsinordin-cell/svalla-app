import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { GpsPipeline, type RawFix } from './gpsPipeline'
import { replayTrack, parseFixture } from './gpsReplay'

// FACIT: Toms biltest 2026-09-10 (tur 15b47ab2). Rådatan exporterades ur
// gps_points och ligger i __fixtures__. Det som SPARADES i databasen av
// /spara live var distance 15.03, average 49.1, max 76.7, 887 punkter.
// Uppspelning via /api/gps-replay samma kväll gav 883 punkter, 4 kastade
// (återförankringar som live redan hanterat), 15.03 / 49.1 / 76.7.
// Testet låser BÅDA: en ändring i kedjan som flyttar siffrorna syns här,
// utan nytt fälttest.
const T0 = Date.parse('2026-09-10T19:07:20.286Z')
const fixture = parseFixture(readFileSync(__dirname + '/__fixtures__/trip-15b47ab2.txt', 'utf8'), T0)

describe('GpsPipeline — Toms fälttest 2026-09-10 som facit', () => {
  it('fixturen är komplett: 887 fixar, 17,6 minuter', () => {
    expect(fixture.length).toBe(887)
    expect((fixture.at(-1)!.ts - fixture[0]!.ts) / 1000).toBeCloseTo(1054.1, 0)
  })

  it('uppspelning ger exakt det som sparades: 15,03 NM längs spåret (nu 14,81 som ∫Doppler), 49,1 kn snitt; topp 75,6 (10 s) där 76,7 var en ensam punkt — nu 75,8/77,7 med Doppler', () => {
    const res = replayTrack(fixture)
    expect(res.points.length).toBe(883)
    expect(res.rejectedAccuracy).toBe(0)
    expect(res.rejectedAnomaly).toBe(4)
    expect(res.kalmanResets).toBe(1)
    // Sedan 2026-09-11 är distansen ∫Doppler-fart (tripDistanceNM); det som
    // sparades 10/9 var summan av utjämnade positioner = distanceSmoothedNM.
    expect(res.distanceNM).toBeCloseTo(14.81, 1)
    expect(res.quality.distanceSmoothedNM).toBeCloseTo(15.03, 2)
    expect(res.quality.distanceIntegratedNM).toBeCloseTo(14.81, 1)
    // Snitt sedan 2026-09-11 = distans / rörelsetid = 14,81 NM / 1 054 s = 50,6 (sparat 10/9 var medel av punktfarter: 49,1)
    expect(res.avgSpeedKn).toBeCloseTo(50.6, 1)
    // Fart sedan 2026-09-11 = enhetens Doppler (filtrets fart släpade 4–5 s).
    // Sparat 10/9 med filterfart: topp 75,6 (10 s), 76,7 (1 punkt). Doppler:
    // 75,8 / 77,7 — samma toppfart inom 0,2 kn, ingen tolkning har ändrats.
    expect(res.maxSpeedKn).toBe(75.8)
    expect(res.quality.maxSpeed1pKn).toBe(77.7)
    expect(res.quality.maxSpeed10sKn).toBe(75.8)
    expect(res.quality.gapMaxS).toBe(157.9)
    expect(res.quality.distanceRawNM).toBeCloseTo(14.93, 2)
  })

  it('pipelinen steg för steg ger samma som replayTrack (samma kod, inte en spegling)', () => {
    const p = new GpsPipeline()
    const pts = fixture.map(f => p.push(f)).filter(x => x != null)
    const res = replayTrack(fixture)
    expect(pts.length).toBe(res.points.length)
    expect(pts.map(x => [x.lat, x.lng, x.speedKnots])).toEqual(res.points.map(x => [x.lat, x.lng, x.speedKnots]))
    expect(p.stats).toEqual({ accepted: 883, rejectedAccuracy: 0, rejectedAnomaly: 4, kalmanResets: 1 })
  })

  it('punkten bär rådata och telefonens tidsstämpel', () => {
    const p = new GpsPipeline()
    const pt = p.push(fixture[0]!)!
    expect(pt.rawLat).toBe(fixture[0]!.lat)
    expect(pt.deviceSpeedKnots).toBe(62.6)
    expect(pt.recordedAt).toBe('2026-09-10T19:07:20.286Z')
    expect(pt.speedKnots).toBe(62.6)   // första fixen: enhetens fart
  })

  it('softReset (paus): nästa fix behandlas som start, räknarna behålls', () => {
    const p = new GpsPipeline()
    for (const f of fixture.slice(0, 14)) p.push(f)
    const before = p.stats
    p.softReset()
    // fix 14 ligger 5 km bort (158 s lucka) — utan softReset hade grinden bedömt den; nu är den en start
    const pt = p.push(fixture[14]!)!
    expect(pt.speedKnots).toBe(fixture[14]!.deviceSpeedKn)
    expect(p.stats.rejectedAnomaly).toBe(before.rejectedAnomaly)
    expect(p.stats.accepted).toBe(before.accepted + 1)
  })

  it('parametrar går igenom: accuracy-gräns 5 m kastar allt (fixturen har 10 m)', () => {
    const res = replayTrack(fixture, { maxAccuracyM: 5 })
    expect(res.points.length).toBe(0)
    expect(res.rejectedAccuracy).toBe(887)
  })
})

describe('fart vid stopp — Doppler i stället för filterfart (beslut 2026-09-11)', () => {
  const fixture = parseFixture(readFileSync(__dirname + '/__fixtures__/trip-06c13078.txt', 'utf8'), Date.parse('2026-09-11T14:58:19.643Z'))
  const points = replayTrack(fixture).points
  const t0 = Date.parse(points[0]!.recordedAt)
  const at = (s: number) => points.find(p => Math.round((Date.parse(p.recordedAt) - t0) / 1000) === s)!

  it('hårt stopp 1 177–1 202 s: visad fart följer Doppler, inte 15,6 kn när bilen står stilla', () => {
    // Uppmätt med filterfart: 15,6 kn vid 1 182 s (Doppler 0), under 1 kn först
    // vid 1 187 s, sedan 1,5 kn i 4 s stillastående. Medianen (3 sampel) får
    // släpa högst 1 s.
    expect(at(1182).deviceSpeedKnots).toBe(0)
    expect(at(1183).speedKnots).toBe(0)
    for (let s = 1184; s <= 1202; s++) expect(at(s).speedKnots).toBe(0)
  })
  it('slutstoppet visar 0, inte 0,19 kn', () => {
    expect(points.at(-1)!.speedKnots).toBe(0)
    expect(points.at(-2)!.speedKnots).toBe(0)
  })
  it('stillastående sekunder (Doppler 0): fart > 0,5 kn bara i medianens första sekund efter stopp', () => {
    const still = points.map((p, i) => ({ p, prevDoppler: points[i - 1]?.deviceSpeedKnots ?? 0 })).filter(x => x.p.deviceSpeedKnots === 0)
    expect(still.length).toBe(47)
    const ghost = still.filter(x => x.p.speedKnots > 0.5)
    expect(ghost.length).toBe(2)                                    // var 24 med filterfart
    for (const g of ghost) expect(g.prevDoppler).toBeGreaterThan(0)   // sekunden efter att Doppler blev 0 (median av 3)
  })
  it('toppfart (10 s) ändras < 1 kn av bytet: 82,5 → 83,1', () => {
    expect(replayTrack(fixture).maxSpeedKn).toBe(83.1)
  })
})

describe('Doppler betros först när den levt — telefon som alltid säger 0 kör som förut', () => {
  const T0 = Date.parse('2026-09-11T10:00:00.000Z')
  const mPerS = 5 * 0.514444   // 5 kn norrut
  const fix = (i: number, doppler: number | null): RawFix => ({ lat: 59.3 + (i * mPerS) / 111_320, lng: 18, accuracyM: 5, ts: T0 + i * 1000, deviceSpeedKn: doppler, heading: 0 })
  it('Doppler alltid 0: farten kommer ur filtret (≈ 5 kn), inte 0', () => {
    const p = new GpsPipeline()
    const pts = Array.from({ length: 60 }, (_, i) => p.push(fix(i, 0))!)
    expect(pts.at(-1)!.speedKnots).toBeGreaterThan(4)
    expect(pts.at(-1)!.speedKnots).toBeLessThan(6)
  })
  it('Doppler null: samma sak', () => {
    const p = new GpsPipeline()
    const pts = Array.from({ length: 60 }, (_, i) => p.push(fix(i, null))!)
    expect(pts.at(-1)!.speedKnots).toBeGreaterThan(4)
  })
  it('Doppler lever (> 1 kn en gång): därefter är den farten, även när den säger 0', () => {
    const p = new GpsPipeline()
    for (let i = 0; i < 30; i++) p.push(fix(i, 5))
    const stopped = p.push(fix(30, 0))!   // positionen rör sig fortfarande, Doppler säger stopp
    const next = p.push(fix(31, 0))!
    expect(next.speedKnots).toBe(0)      // medianen av [5, 0, 0]
    expect(stopped.speedKnots).toBe(5)   // medianen av [5, 5, 0] — 1 s släp, sedan 0
  })
})

