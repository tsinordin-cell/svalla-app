import { describe, expect, it } from 'vitest'
import { kartytaFor } from './kartvy'

// Samma formel som Leaflets EPSG:3857 (SphericalMercator + skala 256·2^zoom).
// Mobilens startvy: 390×613 px, center [59.35, 18.95], zoom 10.
describe('kartytaFor', () => {
  it('ger Leaflets yta för mobilens startvy', () => {
    const y = kartytaFor([59.35, 18.95], 10, 390, 613)!
    // Longitud är linjär: 360° över 256·2^10 px.
    expect(y.swLng).toBeCloseTo(18.95 - (390 / 2) * (360 / (256 * 1024)), 6)
    expect(y.neLng).toBeCloseTo(18.95 + (390 / 2) * (360 / (256 * 1024)), 6)
    // Mercator: en pixel motsvarar färre grader ju längre norrut man är,
    // så nordkanten ligger närmare mitten i grader än sydkanten.
    expect(y.neLat - 59.35).toBeLessThan(59.35 - y.swLat)
    expect(y.neLat).toBeGreaterThan(59.35)
    expect(y.swLat).toBeLessThan(59.35)
    expect(y.neLat - y.swLat).toBeGreaterThan(0.4)
    expect(y.neLat - y.swLat).toBeLessThan(0.6)
  })

  it('mittpunkten ligger i ytan och ytan växer när man zoomar ut', () => {
    const z10 = kartytaFor([57.66, 11.72], 10, 1200, 700)!
    const z9 = kartytaFor([57.66, 11.72], 9, 1200, 700)!
    expect(z10.swLat).toBeLessThan(57.66); expect(z10.neLat).toBeGreaterThan(57.66)
    expect(z10.swLng).toBeLessThan(11.72); expect(z10.neLng).toBeGreaterThan(11.72)
    expect(z9.neLng - z9.swLng).toBeCloseTo(2 * (z10.neLng - z10.swLng), 9)
  })

  it('null när containern saknar storlek', () => {
    expect(kartytaFor([59.35, 18.95], 10, 0, 613)).toBeNull()
    expect(kartytaFor([59.35, 18.95], 10, 390, 0)).toBeNull()
  })
})
