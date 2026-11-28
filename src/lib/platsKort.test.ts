import { describe, expect, it } from 'vitest'
import { betygRad, faltFranKalla, platsOmrade, tiderRad } from './platsKort'

describe('platsOmrade', () => {
  it('skriver kategori i singular och ön', () => {
    expect(platsOmrade('krog', 'Möja', 'middle')).toEqual({ etikett: 'Krog', omrade: 'Möja' })
  })

  it('tar regionens namn när ön saknas', () => {
    expect(platsOmrade('hamn', '  ', 'outer')).toEqual({
      etikett: 'Gästhamn',
      omrade: 'Ytterskärgården',
    })
  })

  it('utelämnar område när varken ö eller känd region finns', () => {
    expect(platsOmrade('bad', null, 'okand-kod')).toEqual({ etikett: 'Bad', omrade: null })
  })
})

describe('betygRad', () => {
  it('visar bara ett riktigt betyg', () => {
    expect(betygRad(4.6, 128)).toBe('4,6 på Google (128)')
    expect(betygRad(4, null)).toBe('4,0 på Google')
  })

  it('hittar inte på betyg', () => {
    expect(betygRad(null, 10)).toBeNull()
    expect(betygRad(undefined, undefined)).toBeNull()
    expect(betygRad(0, 4)).toBeNull()
    expect(betygRad(Number.NaN, 4)).toBeNull()
  })
})

describe('tiderRad', () => {
  it('visar texten och byter tankstreck', () => {
    expect(tiderRad('Juni\u2013augusti: 12\u201421')).toBe('Juni-augusti: 12-21')
  })

  it('ger ingen rad utan text', () => {
    expect(tiderRad(null)).toBeNull()
    expect(tiderRad('   ')).toBeNull()
    expect(tiderRad(undefined)).toBeNull()
  })
})

describe('faltFranKalla', () => {
  it('tar med betyg och kontrollerade öppettider', () => {
    expect(faltFranKalla({
      google_rating: '4.6',
      google_ratings_total: 12,
      opening_hours: 'Dagligen 12-18',
      verified_at: '2026-06-01T00:00:00Z',
    })).toEqual({
      google_rating: 4.6,
      google_ratings_total: 12,
      opening_hours: 'Dagligen 12-18',
    })
  })

  it('släpper okontrollerade öppettider och tomt betyg', () => {
    expect(faltFranKalla({
      google_rating: null,
      google_ratings_total: 8,
      opening_hours: 'Dagligen 12-18',
      verified_at: null,
    })).toEqual({})
  })

  it('släpper öppettider när kontrollen saknas även om texten finns', () => {
    expect(faltFranKalla({
      google_rating: 0,
      opening_hours: 'Alltid öppet',
      verified_at: '',
    })).toEqual({})
  })
})
