import { describe, it, expect } from 'vitest'
import { parseTransitDate, todayStockholm } from './transitDate'

// 2026-09-28 20:00 UTC = 22:00 i Stockholm (sommartid).
const NOW = new Date('2026-09-28T20:00:00Z')

describe('parseTransitDate', () => {
  it('tom eller dagens datum → null (från nu)', () => {
    expect(parseTransitDate(null, NOW)).toBeNull()
    expect(parseTransitDate('', NOW)).toBeNull()
    expect(parseTransitDate('2026-09-28', NOW)).toBeNull()
  })
  it('i morgon och +14 dagar accepteras', () => {
    expect(parseTransitDate('2026-09-29', NOW)).toBe('2026-09-29')
    expect(parseTransitDate('2026-10-12', NOW)).toBe('2026-10-12')
  })
  it('+15 dagar, gårdagen och skräp avvisas', () => {
    expect(parseTransitDate('2026-10-13', NOW)).toBe('ogiltigt')
    expect(parseTransitDate('2026-09-27', NOW)).toBe('ogiltigt')
    expect(parseTransitDate('2026-9-29', NOW)).toBe('ogiltigt')
    expect(parseTransitDate('2026-02-30', NOW)).toBe('ogiltigt')
    expect(parseTransitDate("'; drop", NOW)).toBe('ogiltigt')
  })
  it('dagens datum räknas i Stockholm, inte UTC', () => {
    // 23:30 UTC 28 sep = 01:30 den 29:e i Stockholm.
    const late = new Date('2026-09-28T23:30:00Z')
    expect(todayStockholm(late)).toBe('2026-09-29')
    expect(parseTransitDate('2026-09-29', late)).toBeNull()
    expect(parseTransitDate('2026-09-28', late)).toBe('ogiltigt')
  })
})
