// Spärrar från granskningen av serverroutes med tjänstenyckeln (2026-11-22).
import { describe, it, expect } from 'vitest'
import { ruttCacheNyckel, dbCacheGaller, UUID_RE } from './ruttCache'
import {
  stadaKalla, stadaPreferenser, valkomstTillaten, VALKOMST_PER_TIMME,
} from './prenumeration'
import { giltigPlatsSlug, nyHojdpunktsplats } from './hojdpunktPush'

describe('ruttcachen i databasen gäller bara ruttens egna koordinater', () => {
  const rutt = { start_lat: 59.3247, start_lng: 18.0721, end_lat: 59.2875, end_lng: 18.9155 }
  const egen = ruttCacheNyckel(59.3247, 18.0721, 59.2875, 18.9155)

  it('samma koordinater: cachen får användas', () => {
    expect(dbCacheGaller(egen, rutt)).toBe(true)
  })
  it('skillnad under 4 decimaler räknas som samma rutt (som minnescachen)', () => {
    expect(dbCacheGaller(ruttCacheNyckel(59.32471, 18.07209, 59.28751, 18.91549), rutt)).toBe(true)
  })
  it('andra koordinater med samma routeId: cachen används inte', () => {
    expect(dbCacheGaller(ruttCacheNyckel(57.6348, 18.2948, 55.6050, 13.0038), rutt)).toBe(false)
    expect(dbCacheGaller(ruttCacheNyckel(59.2875, 18.9155, 59.3247, 18.0721), rutt)).toBe(false) // omvänd
  })
  it('rutt som saknas eller saknar koordinater: cachen används inte', () => {
    expect(dbCacheGaller(egen, null)).toBe(false)
    expect(dbCacheGaller(egen, undefined)).toBe(false)
    expect(dbCacheGaller(egen, { ...rutt, end_lng: null })).toBe(false)
    expect(dbCacheGaller(egen, { ...rutt, start_lat: Number.NaN })).toBe(false)
  })
  it('routeId måste vara ett uuid', () => {
    expect(UUID_RE.test('3f1c2b9a-0d4e-4c3b-9a1f-2e5d6c7b8a90')).toBe(true)
    expect(UUID_RE.test("x' or 1=1")).toBe(false)
  })
})

describe('prenumerationer sparar bara kända fält', () => {
  it('formulärets namn passerar, annat blir unknown', () => {
    expect(stadaKalla('nyhetsbrev-page-hero')).toBe('nyhetsbrev-page-hero')
    expect(stadaKalla('app-fraga')).toBe('app-fraga')
    expect(stadaKalla(undefined)).toBe('unknown')
    expect(stadaKalla('<script>')).toBe('unknown')
    expect(stadaKalla('x'.repeat(61))).toBe('unknown')
    expect(stadaKalla({ a: 1 })).toBe('unknown')
  })
  it('preferenser: bara de två valen, båda på som standard', () => {
    expect(stadaPreferenser(undefined)).toEqual({ weekly_tips: true, season_alerts: true })
    expect(stadaPreferenser({ weekly_tips: true, season_alerts: true })).toEqual({ weekly_tips: true, season_alerts: true })
    expect(stadaPreferenser({ weekly_tips: false })).toEqual({ weekly_tips: false, season_alerts: true })
    expect(stadaPreferenser({ segment: 'batagare', kampanj: 'x', stor: 'y'.repeat(10000) }))
      .toEqual({ weekly_tips: true, season_alerts: true })
    expect(stadaPreferenser('sträng')).toEqual({ weekly_tips: true, season_alerts: true })
  })
  it('välkomstmejl: högst VALKOMST_PER_TIMME per timme', () => {
    expect(valkomstTillaten(0)).toBe(true)
    expect(valkomstTillaten(null)).toBe(true)
    expect(valkomstTillaten(VALKOMST_PER_TIMME - 1)).toBe(true)
    expect(valkomstTillaten(VALKOMST_PER_TIMME)).toBe(false)
    expect(valkomstTillaten(500)).toBe(false)
  })
})

describe('pushen från en höjdpunkt', () => {
  it('platsadresser: gemener, siffror, å/ä/ö och bindestreck', () => {
    expect(giltigPlatsSlug('sandhamns-sjöstation')).toBe(true)
    expect(giltigPlatsSlug('dyvik-strand')).toBe(true)
    expect(giltigPlatsSlug('../../admin')).toBe(false)
    expect(giltigPlatsSlug('Gratis båt! klicka här')).toBe(false)
    expect(giltigPlatsSlug('')).toBe(false)
    expect(giltigPlatsSlug(42)).toBe(false)
  })
  it('samma plats igen ger ingen ny push', () => {
    expect(nyHojdpunktsplats('dyvik-strand', 'dyvik-strand')).toBe(false)
    expect(nyHojdpunktsplats(null, 'dyvik-strand')).toBe(true)
    expect(nyHojdpunktsplats('grinda-wardshus', 'dyvik-strand')).toBe(true)
  })
})
