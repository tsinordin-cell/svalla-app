/**
 * tracking.test.ts — låser fälttestbuggarna från 2026-08-19.
 * Varje describe-block motsvarar en bugg som faktiskt nådde produktion.
 */
import { describe, it, expect } from 'vitest'
import {
  cleanGpsSpeed, recoveryExtraSeconds, mergeRecoveredPoints, mergeRecoveredStops,
  SPEED_CEILING_KNOTS, type ServerGpsRow,
} from './tracking'
import type { GpsPoint, StopEvent } from './gps'

function pt(recordedAt: string, lat = 59.3): GpsPoint {
  return { lat, lng: 18.1, speedKnots: 5, heading: null, accuracy: 5, recordedAt }
}

describe('cleanGpsSpeed — fälttestbugg 3: snitt = topp = exakt 30,00', () => {
  it('klipper vid taket, inte vid gamla 30', () => {
    expect(SPEED_CEILING_KNOTS).toBe(60)
    expect(cleanGpsSpeed(82, 5, [])).toBe(60)
    // bil pa motorvag (~58 kn) ska INTE klippas — det var karnfelet
    expect(cleanGpsSpeed(58, 5, [])).toBe(58)
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
