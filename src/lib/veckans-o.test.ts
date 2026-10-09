import { describe, it, expect } from 'vitest'
import { kommandeUtskick, veckansNyckel } from '@/lib/veckans-o'

describe('Veckans ö', () => {
  it('hoppar över vintern: nästa utskick efter 9 okt 2026 är första tisdagen i april 2027', () => {
    const [forsta] = kommandeUtskick(new Date('2026-10-09T08:00:00Z'), 1)
    expect(forsta.toISOString().slice(0, 10)).toBe('2027-04-06')
  })
  it('ger bara tisdagar april till september', () => {
    for (const d of kommandeUtskick(new Date('2027-01-01T00:00:00Z'), 30)) {
      expect(d.getUTCDay()).toBe(2)
      expect(d.getUTCMonth() + 1).toBeGreaterThanOrEqual(4)
      expect(d.getUTCMonth() + 1).toBeLessThanOrEqual(9)
    }
  })
  it('nyckeln är unik per vecka', () => {
    expect(veckansNyckel(new Date('2027-04-06T12:00:00Z'))).toBe('veckans_o:2027-v14')
  })
})
