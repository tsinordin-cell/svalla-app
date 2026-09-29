import { describe, it, expect } from 'vitest'
import { hummerpremiar, surstrommingspremiar, kraftpremiar, midsommardagen, midsommarafton, allaHelgonsDag } from './arsdatum'

describe('hummerpremiar — HaV: första måndagen efter 20 september', () => {
  it('2026 = måndag 21 september (HaV:s egen sida)', () => {
    expect(hummerpremiar(2026).iso).toBe('2026-09-21')
    expect(hummerpremiar(2026).text).toBe('måndag 21 september 2026')
  })
  it('2027 = 27 september (HaV:s egen sida)', () => {
    expect(hummerpremiar(2027).iso).toBe('2027-09-27')
  })
  it('när 20 september själv är en måndag är premiären veckan efter — "efter", inte "från"', () => {
    // 2021-09-20 var en måndag
    expect(new Date('2021-09-20').getUTCDay()).toBe(1)
    expect(hummerpremiar(2021).iso).toBe('2021-09-27')
  })
  it('när 21 september är en måndag är det premiär samma dag', () => {
    expect(hummerpremiar(2026).datum.getUTCDay()).toBe(1)
  })
})

describe('surstrommingspremiar — Isof: tredje torsdagen i augusti', () => {
  it('2026 = torsdag 20 augusti', () => {
    expect(surstrommingspremiar(2026).iso).toBe('2026-08-20')
    expect(surstrommingspremiar(2026).datum.getUTCDay()).toBe(4)
  })
  it('2027 = 19 augusti', () => {
    expect(surstrommingspremiar(2027).iso).toBe('2027-08-19')
  })
})

describe('kraftpremiar — Isof: första onsdagen i augusti, av tradition', () => {
  it('2026 = onsdag 5 augusti', () => {
    expect(kraftpremiar(2026).iso).toBe('2026-08-05')
  })
  it('regeln säger att det är tradition, inte lag', () => {
    expect(kraftpremiar(2026).regel).toMatch(/tradition/)
  })
})

describe('midsommar — lag 1989:253: lördagen 20–26 juni', () => {
  it('2026: midsommardagen 20 juni, midsommarafton 19 juni', () => {
    expect(midsommardagen(2026).iso).toBe('2026-06-20')
    expect(midsommarafton(2026).iso).toBe('2026-06-19')
    expect(midsommarafton(2026).datum.getUTCDay()).toBe(5)
  })
  it('2027: midsommardagen 26 juni (sista möjliga dagen)', () => {
    expect(midsommardagen(2027).iso).toBe('2027-06-26')
  })
})

describe('allaHelgonsDag — lag 1989:253: lördagen 31 okt–6 nov', () => {
  it('2026 = 31 oktober', () => {
    expect(allaHelgonsDag(2026).iso).toBe('2026-10-31')
  })
})
