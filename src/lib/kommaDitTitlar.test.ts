import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS } from '../app/o/island-data'
import { KOMMA_DIT_TITLAR, kommaDitTitel } from './kommaDitTitlar'

// Titlarna får bara bygga på öns egna, källbelagda uppgifter (2026-10-04).
describe('egna titlar för komma-dit-sidorna', () => {
  for (const [slug, { titel, hamn }] of Object.entries(KOMMA_DIT_TITLAR)) {
    const o = ALL_ISLANDS.find(i => i.slug === slug)

    it(`${slug}: ön finns och titeln nämner ön och hamnen`, () => {
      expect(o, slug).toBeDefined()
      expect(titel).toContain(o!.name)
      expect(titel).toContain(hamn)
    })

    it(`${slug}: hamnen står i öns egna uppgifter`, () => {
      const kalla = [o!.facts.travel_time ?? '', ...o!.getting_there.map(g => `${g.from ?? ''} ${g.method}`)].join(' ')
      expect(kalla, `${hamn} saknas i island-data för ${slug}`).toContain(hamn)
    })

    it(`${slug}: buss bara om ön har buss i sina uppgifter`, () => {
      if (!/buss/i.test(titel)) return
      expect(o!.getting_there.some(g => /buss/i.test(g.method))).toBe(true)
    })

    it(`${slug}: behåller "hur tar man sig dit" och året`, () => {
      expect(titel.toLowerCase()).toContain('hur tar man sig dit')
      expect(titel).toContain('2026')
    })
  }

  it('öar utan egen titel behåller den gemensamma', () => {
    expect(kommaDitTitel('sandhamn', 'Sandhamn')).toBe('Hur tar man sig till Sandhamn? — Båt, buss, färja 2026')
  })
})
