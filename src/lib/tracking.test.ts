/**
 * tracking.test.ts — låser fälttestbuggarna från 2026-08-19.
 * Varje describe-block motsvarar en bugg som faktiskt nådde produktion.
 */
import { describe, it, expect } from 'vitest'
import {
  cleanGpsSpeed, recoveryExtraSeconds, mergeRecoveredPoints, mergeRecoveredStops,
  impliedSpeedKnots,
  SPEED_CEILING_KNOTS, ANOMALY_REANCHOR_AFTER, shouldRejectAsAnomaly, type ServerGpsRow,
} from './tracking'
import type { GpsPoint, StopEvent } from './gps'

function pt(recordedAt: string, lat = 59.3): GpsPoint {
  return { lat, lng: 18.1, speedKnots: 5, heading: null, accuracy: 5, recordedAt }
}

describe('cleanGpsSpeed — fälttestbugg 3: snitt = topp = exakt 30,00', () => {
  it('klipper vid taket, inte vid gamla 30 (eller 60)', () => {
    // 60 → 150, fälttest 2026-09-10: bil i 70 mph (61 kn) klipptes till 60
    // och kastades av grinden. Taket ska skilja glitch från fordon.
    expect(SPEED_CEILING_KNOTS).toBe(150)
    expect(cleanGpsSpeed(400, 5, [])).toBe(150)
    expect(cleanGpsSpeed(58, 5, [])).toBe(58)
    expect(cleanGpsSpeed(61, 5, [])).toBe(61)   // 70 mph i bil
  })
  it('negativ fart golvas till 0', () => {
    expect(cleanGpsSpeed(-3, 5, [])).toBe(0)
  })
  it('dålig accuracy (>30 m) ger 0 — hellre tomt än fel', () => {
    expect(cleanGpsSpeed(20, 31, [10, 12])).toBe(0)
  })
  it('median av 3 äter en ensam spik', () => {
    expect(cleanGpsSpeed(55, 5, [6, 7])).toBe(7)
  })
  it('färre än 3 mätningar: ingen median, bara tak/golv', () => {
    expect(cleanGpsSpeed(12, 5, [])).toBe(12)
    expect(cleanGpsSpeed(12, 5, [8])).toBe(12)
  })
})

describe('recoveryExtraSeconds — fälttestbugg 1: 19 min blev 18 h 47 min', () => {
  const T0 = Date.parse('2026-08-18T20:25:00Z')
  it('en natt med död telefon ger högst 60 s, inte 18 h', () => {
    const enNattSenare = T0 + 18.75 * 3600 * 1000
    expect(recoveryExtraSeconds('2026-08-18T20:25:00Z', enNattSenare)).toBe(60)
  })
  it('en vanlig webbläsarkrasch (20 s) räknas fullt ut', () => {
    expect(recoveryExtraSeconds('2026-08-18T20:25:00Z', T0 + 20_000)).toBe(20)
  })
  it('klockskev (snapshot i framtiden) ger 0, aldrig negativt', () => {
    expect(recoveryExtraSeconds('2026-08-18T20:25:00Z', T0 - 5_000)).toBe(0)
  })
})

describe('mergeRecoveredPoints — recovery får inte ge stympat spår', () => {
  const rows: ServerGpsRow[] = [
    { latitude: 59.31, longitude: 18.11, speed_knots: 4, heading: 90, accuracy: 6, recorded_at: '2026-08-19T10:00:01Z' },
    { latitude: 59.32, longitude: 18.12, speed_knots: null, heading: null, accuracy: null, recorded_at: '2026-08-19T10:00:03Z' },
    { latitude: 59.33, longitude: 18.13, speed_knots: 5, heading: 91, accuracy: 6, recorded_at: null },
  ]
  it('slår ihop, dedupar på recordedAt (bufferten vinner) och sorterar', () => {
    const buffer = [pt('2026-08-19T10:00:03Z', 59.999), pt('2026-08-19T10:00:05Z')]
    const merged = mergeRecoveredPoints(buffer, rows)
    expect(merged.map(p => p.recordedAt)).toEqual([
      '2026-08-19T10:00:01Z', '2026-08-19T10:00:03Z', '2026-08-19T10:00:05Z',
    ])
    // dubbletten kom fran bufferten, inte servern
    expect(merged[1]!.lat).toBe(59.999)
    // null-falt fylls med defaults
    expect(merged[0]!.heading).toBe(90)
  })
  it('rader utan recorded_at kastas', () => {
    expect(mergeRecoveredPoints([], rows)).toHaveLength(2)
  })
  it('tom buffert + tom server ger tom lista', () => {
    expect(mergeRecoveredPoints([], [])).toEqual([])
  })
})

// ── Kort "Pauser överlever inte en krasch — snapshoten sparar inte stops" ────
describe('mergeRecoveredStops — pauser överlever recovery', () => {
  const pause: StopEvent = { lat: 59.3, lng: 18.1, type: 'pause', startedAt: '2026-08-19T10:00:00Z', endedAt: '2026-08-19T10:05:00Z', durationSeconds: 300 }
  const autoStop: StopEvent = { lat: 59.31, lng: 18.12, type: 'stop', startedAt: '2026-08-19T10:20:00Z', durationSeconds: 180 }

  it('pausposter ur snapshoten behålls före de omdetekterade stoppen', () => {
    const out = mergeRecoveredStops([pause], [autoStop])
    expect(out).toEqual([pause, autoStop])
  })

  it('bara type=pause tas ur snapshoten — gamla auto-stopp där ersätts av omdetekteringen', () => {
    const staleStop: StopEvent = { ...autoStop, durationSeconds: 1 }
    const out = mergeRecoveredStops([pause, staleStop], [autoStop])
    expect(out).toEqual([pause, autoStop])
  })

  it('snapshot utan stops (äldre version) ger enbart omdetekterade stopp', () => {
    expect(mergeRecoveredStops(undefined, [autoStop])).toEqual([autoStop])
    expect(mergeRecoveredStops([], [])).toEqual([])
  })
})

describe('impliedSpeedKnots — fart raknas pa matningar, inte pa utjamnade lagen', () => {
  const degPerM = 1 / 111320
  const t0 = 1_700_000_000_000

  it('ger sann fart mellan tva ra fixar (bat 6,5 kn, 1 Hz)', () => {
    const v = 12 / 3.6 // m/s
    const got = impliedSpeedKnots(59.30, 18.10, t0, 59.30 + v * degPerM, 18.10, t0 + 1000)
    expect(got).toBeGreaterThan(6.0)
    expect(got).toBeLessThan(7.0)
  })

  it('1 Hz ger INTE 0 — den gamla garden pa 1,8 s nollade varje fart', () => {
    const v = 25 / 3.6
    expect(impliedSpeedKnots(59.30, 18.10, t0, 59.30 + v * degPerM, 18.10, t0 + 1000))
      .toBeGreaterThan(1)
  })

  it('ett utjamnat lage som slapar efter ger orimlig fart — darfor far det inte anvandas', () => {
    // Kalman-gain ~0,044 => slapet ar ~23 sampel. Bat i 6,5 kn, 1 Hz.
    const v = 12 / 3.6
    const lagg = v * 23 * degPerM
    const got = impliedSpeedKnots(59.30 - lagg, 18.10, t0, 59.30 + v * degPerM, 18.10, t0 + 1000)
    expect(got).toBeGreaterThan(100) // hade kastats som anomali med gamla taket
  })

  it('for tatt i tiden ger 0 (samma undre grans som isGpsAnomaly)', () => {
    expect(impliedSpeedKnots(59.30, 18.10, t0, 59.31, 18.10, t0 + 100)).toBe(0)
  })
})

describe('cleanGpsSpeed — medianfönstret måste matas med RÅA farter', () => {
  // Uppmätt 2026-09-05: /spara matade fönstret med sina egna rensade utdata.
  // Median av [a, a, x] är a oavsett x, så visningen låste sig så fort två
  // utdata i rad blev lika — vid 12 kn fastnade den på 7,8 kn.
  it('självmatat fönster låser sig; råmatat följer farten', () => {
    const raw = [5, 5, 6, 7, 8, 9, 10, 11, 12, 12, 12, 12]
    const selfFed: number[] = [], rawFed: number[] = []
    raw.forEach((r, i) => {
      selfFed.push(cleanGpsSpeed(r, 5, selfFed.slice(-2)))
      rawFed.push(cleanGpsSpeed(r, 5, raw.slice(Math.max(0, i - 2), i)))
    })
    expect(selfFed.at(-1)).toBe(5)   // låst på första värdet
    expect(rawFed.at(-1)).toBe(12)   // följer med
  })
})

describe('shouldRejectAsAnomaly — fälttest 2026-09-10 (tur ee7ef62f, MÄTT: 131 punkter på 56 min, luckor 18 + 26 min)', () => {
  const t0 = Date.parse('2026-09-10T15:11:00.000Z')
  const degPerM = 1 / 111_320
  /** Rak kurs norrut i given fart, 1 Hz, n fixar. */
  const run = (speedKn: number, n: number) =>
    Array.from({ length: n }, (_, i) => ({ lat: 59.3 + i * speedKn * 0.514444 * degPerM, lng: 18.1, ts: t0 + i * 1000 }))

  it('70 mph i bil (61 kn) passerar grinden — det var vad som låste ute allt', () => {
    const fixes = run(61, 30)
    let prev: { lat: number; lng: number; ts: number } | null = null
    let streak = 0, rejected = 0
    for (const f of fixes) {
      const g = shouldRejectAsAnomaly(prev, f.lat, f.lng, f.ts, streak)
      streak = g.streak
      if (g.reject) { rejected++; continue }
      prev = f
    }
    expect(rejected).toBe(0)
  })

  it('en riktig glitch (1 km på 1 s ≈ 1 900 kn) kastas och referensen står kvar', () => {
    const prev = { lat: 59.3, lng: 18.1, ts: t0 }
    const g = shouldRejectAsAnomaly(prev, 59.3 + 1000 * degPerM, 18.1, t0 + 1000, 0)
    expect(g).toEqual({ reject: true, streak: 1, reanchored: false })
  })

  it('efter ANOMALY_REANCHOR_AFTER avvisade i rad accepteras fixen (återförankring) — ingen evig lucka', () => {
    // Referens: gammal punkt. Bilen är 5 km bort och kör vidare i 61 kn.
    const prev = { lat: 59.3, lng: 18.1, ts: t0 }
    let streak = 0
    const results = []
    for (let i = 1; i <= ANOMALY_REANCHOR_AFTER; i++) {
      const g = shouldRejectAsAnomaly(prev, 59.3 + (5000 + i * 31) * degPerM, 18.1, t0 + i * 1000, streak)
      streak = g.streak
      results.push(g)
    }
    expect(results.slice(0, -1).every(r => r.reject)).toBe(true)
    expect(results.at(-1)).toEqual({ reject: false, streak: 0, reanchored: true })
  })

  it('utan referens accepteras första fixen', () => {
    expect(shouldRejectAsAnomaly(null, 59.3, 18.1, t0, 0)).toEqual({ reject: false, streak: 0, reanchored: false })
  })

  it('en godkänd fix nollar räknaren', () => {
    const prev = { lat: 59.3, lng: 18.1, ts: t0 }
    const g = shouldRejectAsAnomaly(prev, 59.3 + 10 * degPerM, 18.1, t0 + 1000, 2)
    expect(g).toEqual({ reject: false, streak: 0, reanchored: false })
  })
})
