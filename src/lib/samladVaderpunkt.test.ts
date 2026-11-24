import { describe, expect, it } from 'vitest'
import { samladVaderpunkt } from './samladVaderpunkt'

describe('samladVaderpunkt', () => {
  it('ger null utan träffar', () => {
    expect(samladVaderpunkt([])).toBeNull()
  })
  it('ger platsen för en enda träff', () => {
    expect(samladVaderpunkt([{ latitude: 58.96, longitude: 18.31 }])).toEqual({ lat: 58.96, lng: 18.31 })
  })
  it('ger mitten av träffar som ligger samlat', () => {
    const p = samladVaderpunkt([
      { latitude: 58.95, longitude: 18.28 },
      { latitude: 58.97, longitude: 18.34 },
    ])
    expect(p?.lat).toBeCloseTo(58.96)
    expect(p?.lng).toBeCloseTo(18.31)
  })
  it('ger null när träffarna är utspridda', () => {
    expect(samladVaderpunkt([
      { latitude: 59.3, longitude: 18.9 },
      { latitude: 57.7, longitude: 11.9 },
    ])).toBeNull()
  })
})
