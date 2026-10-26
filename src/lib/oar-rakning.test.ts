import { describe, expect, it } from 'vitest'
import { ALL_ISLANDS, OAR, ANTAL_OAR, GAMLA_SLUGS, getIsland } from '@/app/o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from '@/app/oar/oar-categories'

/**
 * 2026-10-21: sajten sa "102 öar" medan fem av posterna var fastlandsorter,
 * en var en nationalpark och Birka låg inne två gånger. Testet låser att
 * "X öar" räknar öar, och att gamla adresser fortfarande hittar sin ö.
 */
describe('öräkningen', () => {
  it('har unika slugs och inga dubbla öar', () => {
    const slugs = ALL_ISLANDS.map(i => i.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    // Birka och Björkö (Birka) var samma ö i Mälaren
    expect(slugs.filter(s => s === 'bjorko' || s === 'birka')).toEqual(['birka'])
  })

  it('räknar bara öar, inte fastlandsorter eller nationalparker', () => {
    expect(ANTAL_OAR).toBe(OAR.length)
    expect(OAR.every(i => (i.slag ?? 'ö') === 'ö')).toBe(true)
    expect(ANTAL_OAR).toBeLessThan(ALL_ISLANDS.length)
    for (const ort of ['lysekil', 'grebbestad', 'kungshamn', 'fjallbacka', 'hamburgsund']) {
      expect(getIsland(ort)?.slag, ort).toBe('ort')
    }
    expect(getIsland('kosterhavet')?.slag).toBe('nationalpark')
  })

  it('låter gamla adresser hitta den sammanslagna ön', () => {
    for (const [gammal, ny] of Object.entries(GAMLA_SLUGS)) {
      expect(ALL_ISLANDS.some(i => i.slug === gammal), gammal).toBe(false)
      expect(getIsland(gammal)?.slug, gammal).toBe(ny)
    }
  })

  it('kategorierna på /oar innehåller bara öar', () => {
    for (const c of OAR_CATEGORIES) {
      const ejOar = islandsForCategory(c.slug).filter(i => (i.slag ?? 'ö') !== 'ö').map(i => i.slug)
      expect(ejOar, c.slug).toEqual([])
    }
  })
})
