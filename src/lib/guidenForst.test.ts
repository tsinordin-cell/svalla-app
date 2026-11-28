import { describe, it, expect } from 'vitest'
import { tillGuiden, tolkaTillbaka } from './guidenForst'

describe('nya konton till guiden först', () => {
  it('flödet och startsidan ger guiden utan tillbaka', () => {
    expect(tillGuiden('/feed')).toBe('/onboarding')
    expect(tillGuiden('/')).toBe('/onboarding')
    expect(tillGuiden(null)).toBe('/onboarding')
  })
  it('annan sida: guiden och sedan tillbaka dit', () => {
    expect(tillGuiden('/u/skargardsmax')).toBe('/onboarding?tillbaka=%2Fu%2Fskargardsmax')
    expect(tillGuiden('/tur/abc?x=1')).toBe('/onboarding?tillbaka=%2Ftur%2Fabc%3Fx%3D1')
  })
  it('externa och konstiga adresser släpps inte igenom', () => {
    for (const v of ['//evil.com', '/\\evil.com', 'https://evil.com', 'javascript:alert(1)', '/a\nb', '']) {
      expect(tolkaTillbaka(v)).toBeNull()
    }
  })
  it('inloggning och guiden själv blir inte tillbaka-mål', () => {
    for (const v of ['/onboarding', '/onboarding?tillbaka=%2Fx', '/logga-in?returnTo=/x', '/kom-igang', '/auth/callback', '/bekrafta-epost']) {
      expect(tolkaTillbaka(v)).toBeNull()
    }
    expect(tolkaTillbaka('/onboardingar')).toBe('/onboardingar')
  })
})
