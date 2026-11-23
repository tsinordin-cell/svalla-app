import { describe, it, expect } from 'vitest'
import { startlage, harHaftKonto, skapaKontoRad, franSokvag } from './kontoLage'

describe('harHaftKonto', () => {
  it('svalla_har_konto räknas', () => expect(harHaftKonto(['a', 'svalla_har_konto'])).toBe(true))
  it('Supabase-sessionskaka räknas, även uppdelad', () => {
    expect(harHaftKonto(['sb-oiklttwylndesewauytj-auth-token'])).toBe(true)
    expect(harHaftKonto(['sb-oiklttwylndesewauytj-auth-token.0'])).toBe(true)
  })
  it('PKCE-verifieraren räknas inte (finns under en pågående Google-inloggning för nya)', () => {
    expect(harHaftKonto(['sb-oiklttwylndesewauytj-auth-token-code-verifier'])).toBe(false)
  })
  it('inga kakor = aldrig haft konto', () => expect(harHaftKonto([])).toBe(false))
})

describe('startlage', () => {
  it('Thorkel och Spara för ny webbläsare ger Skapa konto', () => {
    expect(startlage({ returnTo: '/guide' }, false)).toBe('ny')
    expect(startlage({ returnTo: '/plats/ekno' }, false)).toBe('ny')
  })
  it('samma knappar för webbläsare som haft konto ger Logga in', () => {
    expect(startlage({ returnTo: '/guide' }, true)).toBe('logga-in')
  })
  it('menyns Logga in (ingen returnTo) ger Logga in', () => {
    expect(startlage({}, false)).toBe('logga-in')
  })
  it('mode=ny vinner alltid, mode=login och existing=1 ger Logga in', () => {
    expect(startlage({ mode: 'ny' }, true)).toBe('ny')
    expect(startlage({ mode: 'login', returnTo: '/guide' }, false)).toBe('logga-in')
    expect(startlage({ existing: '1', returnTo: '/planera/x' }, false)).toBe('logga-in')
  })
  it('extern returnTo räknas inte', () => {
    expect(startlage({ returnTo: 'https://example.com' }, false)).toBe('logga-in')
  })
})

describe('skapaKontoRad', () => {
  it('säger vad kontot ger', () => {
    expect(skapaKontoRad('/guide')).toBe('Skapa konto och fråga Thorkel')
    expect(skapaKontoRad('/plats/ekno')).toBe('Skapa konto och spara det du hittat')
    expect(skapaKontoRad('/o/uto')).toBe('Skapa konto och spara dina öar')
    expect(skapaKontoRad(null)).toBe('Skapa konto och börja logga turer')
  })
})

describe('franSokvag', () => {
  it('tar bort query och vägrar externa adresser', () => {
    expect(franSokvag('/planera/abc?claim=1')).toBe('/planera/abc')
    expect(franSokvag('//evil.com')).toBeUndefined()
    expect(franSokvag('https://evil.com')).toBeUndefined()
    expect(franSokvag(undefined)).toBeUndefined()
  })
})
