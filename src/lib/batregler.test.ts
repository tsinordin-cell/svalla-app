import { describe, expect, it } from 'vitest'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { ANKRINGSFORBUD_VID_KABEL, BATRUTA_DOLD, GRANSKADE_UTAN_FORBUD, LOKALA_BATREGLER, SKYDDADE_OMRADEN, SKYDDAT_INLEDNING, batregelInledning, batrutaGranskad } from './batregler'

// Båtrutan på komma-dit och lokala förbud (mallarnas runda 9, 2026-11-17).
describe('batregler', () => {
  const slugs = new Set(ALL_ISLANDS.map(i => i.slug))
  const lokala = Object.keys(LOKALA_BATREGLER)

  it('gäller bara öar som finns', () => {
    for (const s of [...lokala, ...BATRUTA_DOLD, ...GRANSKADE_UTAN_FORBUD]) expect(slugs.has(s), s).toBe(true)
  })

  it('placerar varje ö i högst en grupp', () => {
    const alla = [...lokala, ...BATRUTA_DOLD, ...GRANSKADE_UTAN_FORBUD]
    expect(new Set(alla).size).toBe(alla.length)
  })

  it('delar öarna med lokala förbud i skyddade områden och ankringsförbud vid kabel (runda 10, sm07-k016)', () => {
    const grupper = [...SKYDDADE_OMRADEN, ...ANKRINGSFORBUD_VID_KABEL]
    expect(new Set(grupper).size).toBe(grupper.length)
    expect([...grupper].sort()).toEqual([...lokala].sort())
    expect(batregelInledning('bullero')).toBe(SKYDDAT_INLEDNING)
    expect(batregelInledning('storholmen')).toBeNull()
    expect(SKYDDAT_INLEDNING).not.toMatch(/[–—]/)
  })

  it('visar rutan bara på genomgångna öar (runda 10)', () => {
    expect(batrutaGranskad('storskar')).toBe(true)
    expect(batrutaGranskad('bullero')).toBe(true)
    expect(batrutaGranskad('birka')).toBe(false)
    expect(batrutaGranskad('stora-karlso')).toBe(false)
  })

  it('Birka visar inte rutan (förbudet har bara källa på nivå 2)', () => {
    expect(BATRUTA_DOLD.has('birka')).toBe(true)
  })

  it('har texter utan tankstreck och klockslag, med punkt på slutet', () => {
    for (const [s, regler] of Object.entries(LOKALA_BATREGLER)) {
      expect(regler.length, s).toBeGreaterThan(0)
      for (const r of regler) {
        expect(r, s).not.toMatch(/[–—]/)
        expect(r, s).not.toMatch(/\b\d{1,2}[.:]\d{2}\b/)
        expect(r, s).toMatch(/\.$/)
      }
    }
  })
})
