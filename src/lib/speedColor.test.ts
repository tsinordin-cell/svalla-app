import { describe, it, expect } from 'vitest'
import { speedColor, speedRuns } from './speedColor'

describe('speedColor', () => {
  it('trösklar som legenden', () => {
    expect(speedColor(1.9)).toBe('var(--txt3)')
    expect(speedColor(2)).toBe('#1e5c82')
    expect(speedColor(7.9)).toBe('#1e5c82')
    expect(speedColor(8)).toBe('#0f9e64')
    expect(speedColor(15)).toBe('#c96e2a')
  })
})

describe('speedRuns', () => {
  const p = (i: number, kn: number) => ({ lat: 59 + i / 1000, lng: 18, speedKnots: kn })
  it('samma fart hela vägen = ett segment med alla punkter', () => {
    const r = speedRuns([p(0, 5), p(1, 5), p(2, 5), p(3, 5)])
    expect(r.length).toBe(1)
    expect(r[0]!.latlngs.length).toBe(4)
  })
  it('färgbyte ger nytt segment som delar punkten', () => {
    const r = speedRuns([p(0, 5), p(1, 5), p(2, 20), p(3, 20)])
    // paren: 5/5 = 5 blå · 5/20 = 12,5 grön · 20/20 = 20 bärnsten
    expect(r.map(x => x.color)).toEqual(['#1e5c82', '#0f9e64', '#c96e2a'])
    expect(r[0]!.latlngs.at(-1)).toEqual(r[1]!.latlngs[0])   // delar punkten
  })
  it('14 400 punkter i en fart blir ett lager, inte 14 399', () => {
    const pts = Array.from({ length: 14_400 }, (_, i) => p(i, 6))
    expect(speedRuns(pts).length).toBe(1)
  })
  it('färre än två punkter ger inget', () => {
    expect(speedRuns([p(0, 5)])).toEqual([])
    expect(speedRuns([])).toEqual([])
  })
  it('saknad fart räknas som 0', () => {
    const r = speedRuns([{ lat: 59, lng: 18 }, { lat: 59.001, lng: 18 }])
    expect(r[0]!.color).toBe('var(--txt3)')
  })
})
