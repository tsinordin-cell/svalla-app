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

import { behoverGuiden, guidenFarVisasPa, GUIDE_VERSION } from './guidenForst'

describe('guiden för befintliga konton', () => {
  it('null och äldre version behöver guiden, aktuell gör det inte', () => {
    expect(behoverGuiden(null)).toBe(true)
    expect(behoverGuiden(undefined)).toBe(true)
    expect(behoverGuiden(1)).toBe(true)
    expect(behoverGuiden(GUIDE_VERSION)).toBe(false)
    expect(behoverGuiden(GUIDE_VERSION + 1)).toBe(false)
  })
  it('tar inte över inloggning, admin, radering och juridik', () => {
    for (const s of ['/onboarding', '/logga-in', '/admin/mail', '/team', '/profil/installningar/radera', '/integritetspolicy', '/auth/callback', '/goodbye']) {
      expect(guidenFarVisasPa(s)).toBe(false)
    }
  })
  it('tar över vanliga sidor', () => {
    for (const s of ['/', '/feed', '/o/sandhamn', '/upptack', '/profil', '/teamet']) {
      expect(guidenFarVisasPa(s)).toBe(true)
    }
  })
})
