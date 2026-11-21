import { describe, it, expect } from 'vitest'
import { bekraftelseMal, sakerNasta } from './epostbekraftelse'

const EGET = 'https://svalla-abc.vercel.app'

describe('bekraftelseMal', () => {
  it('pekar alltid på svalla.se', () => {
    expect(bekraftelseMal('/julkalender')).toBe('https://svalla.se/julkalender')
    expect(bekraftelseMal('/u/anna')).toBe('https://svalla.se/u/anna')
  })
  it('okänt eller farligt blir flödet', () => {
    expect(bekraftelseMal(null)).toBe('https://svalla.se/feed')
    expect(bekraftelseMal('')).toBe('https://svalla.se/feed')
    expect(bekraftelseMal('//evil.com')).toBe('https://svalla.se/feed')
    expect(bekraftelseMal('https://evil.com/x')).toBe('https://svalla.se/feed')
  })
})

describe('sakerNasta', () => {
  it('godtar en intern sökväg', () => {
    expect(sakerNasta('/julkalender', EGET)).toBe('/julkalender')
    expect(sakerNasta('/feed?flik=foljer', EGET)).toBe('/feed?flik=foljer')
  })
  it('godtar en fullständig adress på svalla.se eller den egna adressen', () => {
    expect(sakerNasta('https://svalla.se/julkalender', EGET)).toBe('/julkalender')
    expect(sakerNasta(`${EGET}/u/anna`, EGET)).toBe('/u/anna')
  })
  it('startsidan (Supabases reserv) blir flödet', () => {
    expect(sakerNasta('https://svalla.se', EGET)).toBe('/feed')
    expect(sakerNasta('https://svalla.se/', EGET)).toBe('/feed')
  })
  it('stoppar andra domäner och trick', () => {
    expect(sakerNasta('https://evil.com/feed', EGET)).toBe('/feed')
    expect(sakerNasta('//evil.com', EGET)).toBe('/feed')
    expect(sakerNasta('/\\evil.com', EGET)).toBe('/feed')
    expect(sakerNasta('javascript:alert(1)', EGET)).toBe('/feed')
    expect(sakerNasta(null, EGET)).toBe('/feed')
  })
})
