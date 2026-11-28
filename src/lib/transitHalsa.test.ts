import { describe, it, expect } from 'vitest'
import { bedom } from '../../scripts/transit-halsa.mjs'

describe('hälsovakten för avgångsrutorna', () => {
  it('svar med fel räknas som trasigt', () => {
    expect(bedom(200, { fel: 'api_fel', trips: [] }).ok).toBe(false)
  })
  it('svar med error räknas som trasigt', () => {
    expect(bedom(200, { error: 'missing_dest' }).ok).toBe(false)
  })
  it('HTTP-fel räknas som trasigt', () => {
    expect(bedom(500, null).ok).toBe(false)
  })
  it('svar utan fel räknas som fungerande, även med noll turer', () => {
    expect(bedom(200, { trips: [] }).ok).toBe(true)
    expect(bedom(200, { trips: [{}, {}] }).skal).toBe('2 turer')
  })
})
