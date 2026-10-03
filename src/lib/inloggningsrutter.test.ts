import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { kraverInloggning, prefetchFor, SKYDDADE, PUBLIK_PLANERA_GUIDE, PUBLIK_PLANERA_RUTT } from './inloggningsrutter'

// revision 2026-10-02: middleware.ts kan inte importera listan i dag, så testet
// läser filen som text och fäller bygget (prebuild kör vitest) om de skiljer sig.
const MIDDLEWARE = readFileSync(fileURLToPath(new URL('../middleware.ts', import.meta.url)), 'utf8')

describe('speglar src/middleware.ts', () => {
  it('PROTECTED_ROUTES har samma sökvägar som SKYDDADE', () => {
    const block = /const PROTECTED_ROUTES\s*=\s*\[([\s\S]*?)\]/.exec(MIDDLEWARE)?.[1]
    expect(block, 'PROTECTED_ROUTES hittades inte i middleware.ts').toBeTruthy()
    const rutter = [...(block ?? '').matchAll(/'([^']*)'/g)].map(m => m[1])
    expect([...rutter].sort()).toEqual([...SKYDDADE].sort())
  })
  it('samma matchning: exakt sökväg eller undersida', () => {
    expect(MIDDLEWARE).toContain("pathname === route || pathname.startsWith(route + '/')")
  })
  it('samma undantag: bara /planera/ny och /planera/<uuid> görs publika', () => {
    const undantag = [...MIDDLEWARE.matchAll(/if \(([^\n]+)\) \{\s*isProtected = false/g)].map(m => m[1])
    expect(undantag).toEqual([`pathname === '${PUBLIK_PLANERA_GUIDE}' || ${PUBLIK_PLANERA_RUTT}.test(pathname)`])
  })
})

// revision 2026-10-02: listan ska ge samma svar som middleware.
describe('kraverInloggning', () => {
  it('skyddade sidor, även med query, hash och undersidor', () => {
    for (const h of ['/feed', '/feed?flik=foljer', '/profil', '/profil/installningar', '/logga',
      '/logga/manuell?plats=x', '/planera', '/planera?x=1', '/sparade', '/spara', '/meddelanden',
      '/meddelanden/ny?to=1', '/notiser#topp', '/min-skargard', '/check-in?place_id=1',
      '/loppis/sparat', '/loppis/mina-annonser', '/onboarding']) {
      expect(kraverInloggning(h), h).toBe(true)
    }
  })
  it('publika sidor, även de som börjar med samma bokstäver', () => {
    for (const h of ['/', '/logga-in', '/logga-in?returnTo=%2Ffeed', '/planera-tur', '/planera/ny',
      '/planera/0b9c4f3e-1a2b-4c5d-8e9f-0123456789ab', '/sparad', '/loppis', '/upptack', '/rutter',
      '/forum/ny-trad', '/feedback', 'https://svalla.se/feed', '#feed']) {
      expect(kraverInloggning(h), h).toBe(false)
    }
  })
  it('prefetchFor: false för skyddade, annars Next standard (undefined)', () => {
    expect(prefetchFor('/planera')).toBe(false)
    expect(prefetchFor('/planera/ny')).toBeUndefined()
    expect(prefetchFor('/upptack')).toBeUndefined()
  })
})
