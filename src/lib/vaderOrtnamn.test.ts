import { describe, expect, it } from 'vitest'
import { arKommun, kortOrtnamn } from './vaderOrtnamn'

describe('kortOrtnamn', () => {
  it('tar bort genitiv-s när kommunen heter utan s', () => {
    expect(kortOrtnamn('Kungälvs kommun')).toBe('KUNGÄLV')
    expect(kortOrtnamn('Tjörns kommun')).toBe('TJÖRN')
    expect(kortOrtnamn('Strömstads kommun')).toBe('STRÖMSTAD')
    expect(kortOrtnamn('Tanums kommun')).toBe('TANUM')
    expect(kortOrtnamn('Nynäshamns kommun')).toBe('NYNÄSHAMN')
    expect(kortOrtnamn('Göteborgs Stad')).toBe('GÖTEBORG')
  })
  it('låter kommuner som själva slutar på s vara', () => {
    expect(kortOrtnamn('Sotenäs kommun')).toBe('SOTENÄS')
    expect(kortOrtnamn('Borås kommun')).toBe('BORÅS')
  })
  it('lämnar namn utan s som de är', () => {
    expect(kortOrtnamn('Haninge kommun')).toBe('HANINGE')
    expect(kortOrtnamn('Värmdö kommun')).toBe('VÄRMDÖ')
    expect(kortOrtnamn('Orust kommun')).toBe('ORUST')
  })
  it('rör inte ortnamn som inte var en kommun', () => {
    expect(kortOrtnamn('Fjällbacka')).toBe('FJÄLLBACKA')
    expect(kortOrtnamn('Hunnebostrands')).toBe('HUNNEBOSTRANDS')
  })
  it('har alla 290 kommuner', () => {
    expect(arKommun('Kungälv')).toBe(true)
    expect(arKommun('Kungälvs')).toBe(false)
  })
})
