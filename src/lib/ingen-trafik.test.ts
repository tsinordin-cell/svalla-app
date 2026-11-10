import { describe, it, expect } from 'vitest'
import { ingenTrafikText, vagDitText } from './ingen-trafik'
import { ISLAND_NO_TRANSIT } from './transit-stops'

describe('ingenTrafikText', () => {
  it('behåller den gamla texten för öar utan hållplats inom 5 km', () => {
    expect(ingenTrafikText('ingen hållplats inom 5 km')).toBe('Ingen kollektivtrafik hit — egen båt eller taxibåt.')
  })
  it('säger inte "ingen kollektivtrafik" när en hållplats finns men inte kunde knytas till ön (Birka)', () => {
    const t = ingenTrafikText('närmaste hållplats (Lökholmen, 1398 m) kunde inte knytas till ön')
    expect(t).toBe('Båttider hit finns inte hos Trafiklab. Se ösidan för hur du tar dig hit.')
  })
  it('tar med vad listan själv säger om hur ön nås', () => {
    expect(ingenTrafikText(ISLAND_NO_TRANSIT['lilla-karlso']!))
      .toBe('Ingen kollektivtrafik hit — ön nås bara med Naturskyddsföreningens turbåt från Klintehamn.')
  })
  it('ger en text för varje ö i listan', () => {
    for (const skal of Object.values(ISLAND_NO_TRANSIT)) expect(ingenTrafikText(skal).length).toBeGreaterThan(20)
  })
  it('säger hur man tar sig till Bullerö och inte "ingen kollektivtrafik" (P0 22)', () => {
    const t = ingenTrafikText(ISLAND_NO_TRANSIT['bullero']!)
    expect(t).toContain('Stavsnäs vinterhamn')
    expect(t).not.toMatch(/ingen kollektivtrafik/i)
    expect(vagDitText(ISLAND_NO_TRANSIT['bullero']!)).toBe(t)
  })
  it('ändrar inte texten för de andra öarna i listan (P0 22)', () => {
    for (const [slug, skal] of Object.entries(ISLAND_NO_TRANSIT)) {
      if (slug !== 'bullero') expect(vagDitText(skal)).toBeNull()
    }
  })
})
