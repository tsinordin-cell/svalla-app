import { describe, it, expect } from 'vitest'
import { ingenTrafikText, vagDitText } from './ingen-trafik'
import { ISLAND_NO_TRANSIT } from './transit-stops'

describe('ingenTrafikText', () => {
  it('behåller den gamla texten för öar utan hållplats inom 5 km', () => {
    expect(ingenTrafikText('ingen hållplats inom 5 km')).toBe('Ingen kollektivtrafik hit: egen båt eller taxibåt.')
  })
  it('säger inte "ingen kollektivtrafik" när en hållplats finns men inte kunde knytas till ön (Birka)', () => {
    const t = ingenTrafikText('närmaste hållplats (Lökholmen, 1398 m) kunde inte knytas till ön')
    expect(t).toBe('Båttider hit visas inte här. Se ösidan för hur du tar dig hit.')
  })
  it('tar med vad listan själv säger om hur ön nås', () => {
    // Faktagranskning fas 3 (2026-11-28, f300a-0252): tillägget för Lilla Karlsö skrevs om.
    // Rättelse P0 28 (2026-11-28, k16 och k24): båten går från Djupvik, och tillägget visas utan "Ingen kollektivtrafik hit:".
    const t = ingenTrafikText(ISLAND_NO_TRANSIT['lilla-karlso']!)
    expect(t.startsWith('Under säsongen går båten till ön från Djupvik')).toBe(true)
    expect(t).not.toContain('Klintehamn')
    expect(t).toContain('bryggan på öns östra sida')
  })
  it('säger inte "ingen kollektivtrafik" om Mörkö, dit SL-buss 727 och vägfärjan går (P0 28, k24)', () => {
    const t = ingenTrafikText(ISLAND_NO_TRANSIT['morko']!)
    expect(t).not.toMatch(/ingen kollektivtrafik/i)
    expect(t).toContain('SL-buss 727')
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
