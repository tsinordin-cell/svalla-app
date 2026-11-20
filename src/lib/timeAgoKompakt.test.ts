import { describe, it, expect } from 'vitest'
import { timeAgoKompakt } from './utils'

const NU = new Date('2026-11-20T12:00:00Z').getTime()
const for_ = (min: number) => new Date(NU - min * 60000).toISOString()

describe('timeAgoKompakt', () => {
  it('ger korta former som får plats bredvid båttyp och plats', () => {
    expect(timeAgoKompakt(for_(0), NU)).toBe('Just nu')
    expect(timeAgoKompakt(for_(12), NU)).toBe('12 min')
    expect(timeAgoKompakt(for_(5 * 60), NU)).toBe('5 h')
    expect(timeAgoKompakt(for_(26 * 60), NU)).toBe('Igår')
    expect(timeAgoKompakt(for_(3 * 24 * 60), NU)).toBe('3 d')
  })
  it('visar datum efter en vecka', () => {
    expect(timeAgoKompakt(for_(16 * 24 * 60), NU)).toMatch(/^4 nov/)
  })
  it('är aldrig längre än sju tecken före datumgränsen', () => {
    for (const min of [0, 1, 59, 60, 23 * 60, 24 * 60, 6 * 24 * 60]) {
      expect(timeAgoKompakt(for_(min), NU).length).toBeLessThanOrEqual(7)
    }
  })
})
