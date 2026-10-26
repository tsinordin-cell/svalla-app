import { describe, it, expect } from 'vitest'
import { svallaOar } from './svalla-oar-sok'

describe('svallaOar', () => {
  it('hittar Fjäderholmarna på början av namnet', () => {
    const t = svallaOar('Fjäd')
    expect(t[0]?.name).toBe('Fjäderholmarna')
    expect(t[0]?.svalla).toBe(true)
    expect(parseFloat(t[0]!.lat)).toBeCloseTo(59.3333, 3)
  })
  it('prefix före innehåll, och högst tre', () => {
    const t = svallaOar('ö')
    expect(t.length).toBeLessThanOrEqual(3)
    const u = svallaOar('Grin')
    expect(u[0]?.name).toBe('Grinda')
  })
  it('kräver två tecken och tål NFD', () => {
    expect(svallaOar('G')).toEqual([])
    expect(svallaOar('Möja')[0]?.name).toBe('Möja')
  })
})
