import { describe, it, expect } from 'vitest'
import { oNamn, oarForPlats, kortPlats, markeradText } from './loggade-oar'

describe('oNamn', () => {
  it('ger riktiga namn med å, ä och ö', () => {
    expect(oNamn('moja')).toBe('Möja')
    expect(oNamn('gallno')).toBe('Gällnö')
    expect(oNamn('grinda')).toBe('Grinda')
  })
  it('faller tillbaka på slugen för okända öar', () => {
    expect(oNamn('ny-o')).toBe('Ny O')
  })
})

describe('oarForPlats', () => {
  it('känner igen ön i ett geokodat namn', () => {
    expect(oarForPlats('Sandhamn, Stockholms län, Sverige')).toEqual(['sandhamn'])
    expect(oarForPlats('Möja, Stockholms län, Sverige')).toEqual(['moja'])
    expect(oarForPlats('Grinda Wärdshus, Grinda, Värmdö kommun')).toEqual(['grinda'])
  })
  it('ger inget för platser som inte är öar', () => {
    expect(oarForPlats('Tullinge sjön')).toEqual([])
    expect(oarForPlats('')).toEqual([])
  })
  it('använder punkten när den finns', () => {
    expect(oarForPlats('Något annat namn', 59.4109, 18.5618)).toContain('grinda')
  })
  it('faller tillbaka på namnet när punkten inte träffar en ö', () => {
    expect(oarForPlats('Grinda, Värmdö', 57.7, 11.9)).toEqual(['grinda'])
  })
})

describe('kortPlats och markeradText', () => {
  it('kortar geokodade namn', () => {
    expect(kortPlats('Sandhamn, Stockholms län, Sverige')).toBe('Sandhamn')
    expect(kortPlats('Tullinge sjön')).toBe('Tullinge sjön')
  })
  it('böjer efter antal', () => {
    expect(markeradText(1)).toBe('Markerad automatiskt utifrån din GPS-rutt')
    expect(markeradText(3)).toBe('Markerade automatiskt utifrån din GPS-rutt')
  })
})
