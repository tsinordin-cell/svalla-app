import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { computeSplits, speedSeries, movingSeconds, resolveDurationSeconds } from './tripSplits'
import { replayTrack, parseFixture } from './gpsReplay'
import type { GpsPoint } from './gps'

const T0 = Date.parse('2026-09-06T10:00:00.000Z')
/** Rak kurs norrut i given fart, 1 Hz. */
function track(n: number, speedKn: number, startOffsetS = 0): GpsPoint[] {
  const mPerS = speedKn * 0.514444
  return Array.from({ length: n }, (_, i) => ({
    lat: 59.3 + (i * mPerS) / 111_320, lng: 18.0, speedKnots: speedKn, heading: 0, accuracy: 5,
    recordedAt: new Date(T0 + (startOffsetS + i) * 1000).toISOString(),
  }))
}

describe('computeSplits', () => {
  it('10 kn i 20 min = 3,33 NM → 3 hela delsträckor à 6 min + en rest', () => {
    const s = computeSplits(track(1201, 10))
    expect(s.length).toBe(4)
    expect(s[0]!.distanceNM).toBe(1)
    expect(s[0]!.seconds).toBe(360)
    expect(s[0]!.avgKnots).toBe(10)
    expect(Math.abs(s[2]!.endOffsetS - 1080)).toBeLessThanOrEqual(2)
    expect(s[3]!.distanceNM).toBeCloseTo(0.33, 1)
  })
  it('kortare än 0,1 NM rest tas inte med', () => {
    expect(computeSplits(track(361, 10)).length).toBe(1)   // exakt 1 NM + 0 rest
  })
  it('färre än 2 punkter ger inget', () => {
    expect(computeSplits(track(1, 5))).toEqual([])
  })
  it('ett segment längre än 1 NM (lucka) ger flera delsträckor, ingen orimlig fart', () => {
    // 10 kn i 60 s, sedan en lucka: nästa punkt 2,5 NM bort 900 s senare, sedan 10 kn igen
    const a = track(61, 10)
    const jumpNM = 2.5
    const b = track(61, 10, 60 + 900).map(p => ({ ...p, lat: p.lat + (60 * 10 * 0.514444) / 111_320 + jumpNM * 1852 / 111_320 }))
    const s = computeSplits([...a, ...b])
    // 0,167 + 2,5 + 0,167 = 2,83 NM → 2 hela + rest 0,83
    expect(s.length).toBe(3)
    for (const x of s) expect(x.avgKnots).toBeLessThan(15)   // buggen gav 400+ kn här
    expect(s[0]!.seconds + s[1]!.seconds).toBeGreaterThan(900 * 0.7)   // luckan ligger i de två första
  })
  it('paus mitt i en delsträcka sänker snittfarten — det är sant, inte fel', () => {
    const a = track(200, 10)
    const b = track(200, 10, 200 + 300).map(p => ({ ...p, lat: p.lat + (199 * 10 * 0.514444) / 111_320 }))
    const s = computeSplits([...a, ...b])
    expect(s[0]!.seconds).toBeGreaterThan(600)
    expect(s[0]!.avgKnots).toBeLessThan(6)
  })
})

describe('speedSeries', () => {
  it('medel per 5 s, bryter vid lucka > 60 s', () => {
    const pts = [...track(20, 4), ...track(20, 8, 20 + 120)]
    const s = speedSeries(pts)
    expect(s.filter(x => x === null).length).toBe(1)
    expect(s[0]).toEqual({ t: 0, kn: 4 })
    expect(s.at(-1)!).toEqual({ t: 155, kn: 8 })
  })
})

describe('movingSeconds', () => {
  it('räknar bara tid i rörelse och hoppar över luckor', () => {
    const pts = [...track(60, 5), ...track(60, 0, 60), ...track(60, 5, 60 + 60 + 300)]
    expect(movingSeconds(pts)).toBe(118)   // 59 + 59, stilla-delen och luckan räknas inte
  })
})

describe('Toms biltest som facit', () => {
  const fixture = parseFixture(readFileSync(__dirname + '/__fixtures__/trip-15b47ab2.txt', 'utf8'), Date.parse('2026-09-10T19:07:20.286Z'))
  const points = replayTrack(fixture).points
  it('15 delsträckor à 1 NM (resten 0,03 NM är under 10 % och tas inte med)', () => {
    const s = computeSplits(points)
    expect(s.length).toBe(15)
    expect(s.reduce((a, x) => a + x.distanceNM, 0)).toBe(15)
    // 158 s-luckan ligger i ett ~5 km-segment (fix 13→14). NM-gränsen faller
    // inuti segmentet och tiden interpoleras linjärt → luckan fördelas över
    // de tre första delsträckorna. Summan bär hela luckan; ingen enskild gör det.
    expect(s[0]!.seconds + s[1]!.seconds + s[2]!.seconds).toBeGreaterThan(158)
    expect(s[0]!.avgKnots).toBeLessThan(s[7]!.avgKnots)   // starten är långsammare än motorvägen
    // en motorvägs-delsträcka: ~60–70 kn
    const fastest = Math.max(...s.map(x => x.avgKnots))
    expect(fastest).toBeGreaterThan(60)
    expect(fastest).toBeLessThan(80)
  })
  it('fartserien bryts exakt en gång (luckan) och slutar vid 1054 s', () => {
    const s = speedSeries(points)
    expect(s.filter(x => x === null).length).toBe(1)
    expect(s.at(-1)!.t).toBe(1050)
  })
  it('rörelsetid = hela spannet 1 054 s — bilen rullade även under 158 s-luckan (5 km i 63 kn)', () => {
    // "15 min" som sparades 10/9 var tick-räknaren som stannat i bakgrunden, inte rörelsetiden.
    expect(movingSeconds(points)).toBe(1054)
  })
})

describe('resolveDurationSeconds', () => {
  const s = '2026-09-10T19:07:20.000Z'
  it('duration_seconds vinner', () => {
    expect(resolveDurationSeconds({ duration_seconds: 1054, duration: 15, started_at: s, ended_at: '2026-09-10T19:25:11.000Z' })).toBe(1054)
  })
  it('gammal tur: klockspannet används när det stämmer med minuten', () => {
    expect(resolveDurationSeconds({ duration: 18, started_at: s, ended_at: '2026-09-10T19:24:54.000Z' })).toBe(1054)
  })
  it('gammal tur: avviker spannet (paus, död telefon) → minuten × 60', () => {
    // tur 15b47ab2 som sparad: duration 15, spann 1071 s (tick-räknaren tappade bakgrundstiden)
    expect(resolveDurationSeconds({ duration: 15, started_at: s, ended_at: '2026-09-10T19:25:11.000Z' })).toBe(900)
    expect(resolveDurationSeconds({ duration: 19, started_at: s, ended_at: '2026-09-11T13:54:00.000Z' })).toBe(1140)
  })
  it('inget alls → 0', () => {
    expect(resolveDurationSeconds({})).toBe(0)
  })
})
