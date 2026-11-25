import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS } from '../app/o/island-data'
import { KOMMA_DIT_TITLAR, kommaDitTitel, franOrten } from './kommaDitTitlar'

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

  it('öar utan egen titel får den gemensamma, med båt bara där båt finns', () => {
    expect(kommaDitTitel('sandhamn', 'Sandhamn', ['Waxholmsbåt från Stavsnäs'])).toBe('Hur tar man sig till Sandhamn? Båt och resväg 2026')
    expect(kommaDitTitel('oland', 'Öland', ['Bil', 'Tåg + buss', 'Direktbuss'])).toBe('Hur tar man sig till Öland? Bil och buss 2026')
  })

  // Runda 10 (sm07-k009): bara en båt som går från orten själv faller bort ur titeln, inte alla båtar på en ort.
  it('franOrten känner igen färdsätt från orten själv', () => {
    expect(franOrten('Hamburgsund', 'Hamburgsund')).toBe(true)
    expect(franOrten('Grebbestad', 'Grebbestad, gästhamnen')).toBe(true)
    expect(franOrten('Vaxholm', 'Strömkajen')).toBe(false)
    expect(franOrten('Lysekil', 'Fiskebäckskil, Skaftö')).toBe(false)
    expect(franOrten('Öckerö', 'Öckeröleden')).toBe(false)
    expect(franOrten('Möja', undefined)).toBe(false)
  })
})
