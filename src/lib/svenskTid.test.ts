import { describe, it, expect } from 'vitest'
import { timmeIStockholm } from './svenskTid'

// revision 2026-10-02: hälsningen på /feed ska följa svensk tid, inte UTC.
describe('timmeIStockholm', () => {
  it('sommartid: UTC+2', () => {
    expect(timmeIStockholm(new Date('2026-09-28T20:00:00Z'))).toBe(22)
    expect(timmeIStockholm(new Date('2026-07-01T04:59:00Z'))).toBe(6)
  })
  it('vintertid: UTC+1', () => {
    expect(timmeIStockholm(new Date('2026-12-15T05:30:00Z'))).toBe(6)
    expect(timmeIStockholm(new Date('2026-12-15T23:10:00Z'))).toBe(0)
  })
  it('midnatt blir 0, inte 24', () => {
    expect(timmeIStockholm(new Date('2026-06-30T22:00:00Z'))).toBe(0)
  })
  it('dygnen när sommartiden börjar och slutar 2026', () => {
    // 29 mars 01:00 UTC: klockan går från 02:00 till 03:00.
    expect(timmeIStockholm(new Date('2026-03-29T00:30:00Z'))).toBe(1)
    expect(timmeIStockholm(new Date('2026-03-29T01:30:00Z'))).toBe(3)
    // 25 oktober 01:00 UTC: klockan går från 03:00 tillbaka till 02:00.
    expect(timmeIStockholm(new Date('2026-10-25T00:30:00Z'))).toBe(2)
    expect(timmeIStockholm(new Date('2026-10-25T01:30:00Z'))).toBe(2)
  })
})
