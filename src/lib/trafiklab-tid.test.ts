import { describe, it, expect } from 'vitest'
import { nuIStockholm, arGammalResa } from './trafiklab'

describe('nuIStockholm', () => {
  it('ger Stockholm-tid (sommartid = UTC+2) nedrundad till 5 min', () => {
    expect(nuIStockholm(new Date('2026-09-21T03:49:25Z'))).toEqual({ date: '2026-09-21', time: '05:45' })
  })
  it('byter datum vid midnatt lokal tid, inte UTC', () => {
    expect(nuIStockholm(new Date('2026-09-20T22:30:00Z'))).toEqual({ date: '2026-09-21', time: '00:30' })
  })
  it('vintertid = UTC+1', () => {
    expect(nuIStockholm(new Date('2026-12-01T12:04:59Z'))).toEqual({ date: '2026-12-01', time: '13:00' })
  })
})

describe('arGammalResa', () => {
  it('resa från i går är gammal, i dag och i morgon är det inte', () => {
    expect(arGammalResa('2026-09-19', '2026-09-21')).toBe(true)
    expect(arGammalResa('2026-09-21', '2026-09-21')).toBe(false)
    expect(arGammalResa('2026-09-22', '2026-09-21')).toBe(false)
  })
  it('okänt datumformat släpps igenom (hellre visa än gissa)', () => {
    expect(arGammalResa('', '2026-09-21')).toBe(false)
  })
})
