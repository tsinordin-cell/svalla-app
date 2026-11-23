import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { ACTIVITY_LIST } from '@/app/aktivitet/activity-data'
import { foldSok, valjOar, aktivitetMatchar, hashtagMatchar, delaOrd, ordFilter, oMatchar } from './sok-traff'

describe('foldSok', () => {
  it('jämnar ut åäö och versaler', () => {
    expect(foldSok('Gällnö')).toBe('gallno')
    expect(foldSok('GALLNÖ')).toBe('gallno')
    expect(foldSok('Möja')).toBe('moja')
    expect(foldSok('Utö')).toBe('uto')
    expect(foldSok('Ålö')).toBe('alo')
    expect(foldSok('  Sandhamn  ')).toBe('sandhamn')
  })

  it('tål NFD', () => {
    expect(foldSok('Ga\u0308llno\u0308')).toBe('gallno')
    expect(foldSok('Mo\u0308ja')).toBe('moja')
  })
})

describe('valjOar', () => {
  it('hittar Gällnö utan prickar', () => {
    for (const q of ['Gällnö', 'gallno', 'gällno', 'GALLNO', 'Ga\u0308llno\u0308']) {
      expect(valjOar(ALL_ISLANDS, q)[0]?.slug, q).toBe('gallno')
    }
  })

  it('hittar Möja och Utö på ascii', () => {
    expect(valjOar(ALL_ISLANDS, 'moja')[0]?.slug).toBe('moja')
    expect(valjOar(ALL_ISLANDS, 'utö')[0]?.slug).toBe('uto')
    expect(valjOar(ALL_ISLANDS, 'sandhamn')[0]?.name).toBe('Sandhamn')
  })

  it('tom sökning och nonsens ger inga öar', () => {
    expect(valjOar(ALL_ISLANDS, '')).toEqual([])
    expect(valjOar(ALL_ISLANDS, '   ')).toEqual([])
    expect(valjOar(ALL_ISLANDS, 'xqzzyplonk')).toEqual([])
  })

  it('exakt namn ligger först och ryms inom taket', () => {
    const brus = Array.from({ length: 12 }, (_, i) => ({
      slug: `annan-${i}`,
      name: `Annan ${i}`,
      tagline: 'Text som nämner Gällnö i förbifarten',
      tags: [] as string[],
    }))
    const gallno = { slug: 'gallno', name: 'Gällnö', tagline: 'Ön själv', tags: [] as string[] }
    const traffar = valjOar([...brus, gallno], 'gallno', 10)
    expect(traffar[0]?.slug).toBe('gallno')
    expect(traffar).toHaveLength(10)
    expect(traffar.some(o => o.slug === 'gallno')).toBe(true)
  })
})

describe('aktivitet och hashtag', () => {
  it('krog träffar mat, med och utan é', () => {
    const mat = ACTIVITY_LIST.find(a => a.slug === 'mat')!
    expect(aktivitetMatchar(mat, 'krog')).toBe(true)
    expect(aktivitetMatchar(mat, 'kafé')).toBe(true)
    expect(aktivitetMatchar(mat, 'kafe')).toBe(true)
  })

  it('hashtag ignorerar diakriter', () => {
    expect(hashtagMatchar('#skärgård', 'skargard')).toBe(true)
    expect(hashtagMatchar('#skärgård', 'skärgård')).toBe(true)
    expect(hashtagMatchar('#sandhamn', 'sand')).toBe(true)
    expect(hashtagMatchar('#sand', 'xqzzyplonk')).toBe(false)
  })
})

describe('flera sökord (granskningen 2026-11-23)', () => {
  it('delar på mellanslag, tar bort dubbletter och slutar efter fem ord', () => {
    expect(delaOrd('  gästhamn   Utö ')).toEqual(['gästhamn', 'Utö'])
    expect(delaOrd('Utö utö')).toEqual(['Utö'])
    expect(delaOrd('a b c d e f g')).toHaveLength(5)
    expect(delaOrd('')).toEqual([])
  })

  it('ger ett or-filter per ord, så att alla ord måste träffa', () => {
    expect(ordFilter(['name', 'island'], ['gästhamn', 'Utö'])).toEqual([
      'name.ilike.%gästhamn%,island.ilike.%gästhamn%',
      'name.ilike.%Utö%,island.ilike.%Utö%',
    ])
    expect(ordFilter(['name'], ['Utö'])).toEqual(['name.ilike.%Utö%'])
  })

  it('en ö träffar när varje ord finns i något fält, inte bara hela frasen', () => {
    const o = { slug: 'uto', name: 'Utö', regionLabel: 'Södra skärgården', tagline: 'Gruvor och gästhamn', tags: [] as string[] }
    expect(oMatchar(o, 'gästhamn Utö')).toBe(true)
    expect(oMatchar(o, 'Utö')).toBe(true)
    expect(oMatchar(o, 'gästhamn Grinda')).toBe(false)
  })
})
