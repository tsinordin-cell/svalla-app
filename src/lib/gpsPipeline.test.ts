import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { GpsPipeline } from './gpsPipeline'
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

  it('uppspelning ger exakt det som sparades: 15,03 NM längs spåret (nu 14,81 som ∫Doppler), 49,1 kn snitt; topp 75,6 (10 s) där 76,7 var en ensam punkt', () => {
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
    expect(res.maxSpeedKn).toBe(75.6)
    expect(res.quality.maxSpeed1pKn).toBe(76.7)
    expect(res.quality.maxSpeed10sKn).toBe(75.6)
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
