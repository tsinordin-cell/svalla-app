// Platslistan på ösidornas undersidor (mallarnas runda 5, 2026-11-10):
// A1 – ett ifyllt ö-fält med en annan ös namn gör att platsen inte räknas som på ön, även inom radien.
// A2 – platslistan använder platsRadieKm före GPS-radien radiusKm.
import { describe, it, expect, vi } from 'vitest'

type Rad = { slug: string; name: string; type: string; description: string | null; island: string | null; latitude: number; longitude: number }
let rader: Rad[] = []

// Platsdatabasen: svarar med alla rader; getIslandPlaces räknar avstånd och ö själv.
// Main hämtar hela platslistan en gång med unstable_cache (2026-11-20); i testet anropas hämtningen direkt.
vi.mock('next/cache', () => ({ unstable_cache: <T,>(fn: T) => fn }))
vi.mock('@/lib/supabase-server', () => {
  const fraga = () => {
    const q: Record<string, unknown> = {}
    for (const m of ['select', 'is', 'in', 'limit', 'or', 'ilike', 'order']) q[m] = () => q
    q.then = (res: (v: unknown) => void) => res({ data: rader, error: null })
    return q
  }
  return { createPublicSupabaseClient: () => ({ from: () => fraga() }) }
})

import { ofaltMotOn, arPaOn, platsRadie, getIslandPlaces, utanDubbletter, normaliseraPlatsnamn } from './islandPlaces'
import { ISLAND_COORD_MAP } from './islandCoords'
import { boendeINamnet, arBoendetyp, BOENDETYPER } from './platstyper'

describe('ofaltMotOn', () => {
  it('skiljer på samma ö, annan ö och tomt fält', () => {
    expect(ofaltMotOn('Utö', { slug: 'uto', name: 'Utö' })).toBe('samma')
    expect(ofaltMotOn('Rånö', { slug: 'uto', name: 'Utö' })).toBe('annan')
    expect(ofaltMotOn('Donsö', { slug: 'styrso', name: 'Styrsö' })).toBe('annan')
    expect(ofaltMotOn('Kastellet', { slug: 'vaxholm', name: 'Vaxholm' })).toBe('annan')
    expect(ofaltMotOn('', { slug: 'uto', name: 'Utö' })).toBe('tomt')
    expect(ofaltMotOn(null, { slug: 'uto', name: 'Utö' })).toBe('tomt')
  })

  it('jämför utan versaler och diakritiska tecken, och tar de belagda namnen för samma ö', () => {
    expect(ofaltMotOn('Moja', { slug: 'moja', name: 'Möja' })).toBe('samma')
    expect(ofaltMotOn('Södermöja', { slug: 'moja', name: 'Möja' })).toBe('samma')
    expect(ofaltMotOn('Björkö', { slug: 'birka', name: 'Birka' })).toBe('samma')
    expect(ofaltMotOn('Nämndö', { slug: 'namdo', name: 'Nämdö' })).toBe('samma')
    // Inget närmande mellan olika öar: Blidö är inte Lidö.
    expect(ofaltMotOn('Blidö', { slug: 'lido', name: 'Lidö' })).toBe('annan')
  })
})

describe('arPaOn och platsRadie', () => {
  it('låter ö-fältet gå före avståndet', () => {
    expect(arPaOn('annan', 0.5, 3)).toBe(false)
    expect(arPaOn('samma', 15, 3)).toBe(true)
    expect(arPaOn('tomt', 2.9, 3)).toBe(true)
    expect(arPaOn('tomt', 3.1, 3)).toBe(false)
    expect(arPaOn('tomt', null, 3)).toBe(false)
  })

  it('använder platsRadieKm före radiusKm, annars 3 km', () => {
    expect(platsRadie({ radiusKm: 1.5, platsRadieKm: 1.4 })).toBe(1.4)
    expect(platsRadie({ radiusKm: 7 })).toBe(7)
    expect(platsRadie(undefined)).toBe(3)
  })
})

describe('getIslandPlaces', () => {
  // Styrsös nål och namn med en slug som inte finns i islandCoords, så att radien alltid är standardvärdet 3 km och testet
  // inte beror på öarnas egna rader där (Styrsö får 2,0 km enligt Toms beslut 3; mallarnas runda 6, 2026-11-16). Donsös och
  // Brännös krogar ligger inom 3 km (full-28 k041).
  const styrso = { slug: 'test-utan-koordinatpost', name: 'Styrsö', lat: 57.6152, lng: 11.7757 }

  it('har ingen post i islandCoords för testets slug', () => {
    expect(ISLAND_COORD_MAP[styrso.slug]).toBeUndefined()
  })

  it('räknar inte grannöarnas platser som på ön, men visar dem som i närheten', async () => {
    rader = [
      { slug: 'batebacken', name: 'Båtebacken', type: 'restaurant', description: null, island: 'Styrsö', latitude: 57.6206816, longitude: 11.7683034 },
      { slug: 'donso-hamnkrog', name: 'Donsö Hamnkrog', type: 'restaurant', description: null, island: 'Donsö', latitude: 57.6006, longitude: 11.7967 },
      { slug: 'branno-vardshus', name: 'Brännö Värdshus & Pensionat Baggen', type: 'restaurant', description: null, island: 'Brännö', latitude: 57.6399, longitude: 11.7752 },
      { slug: 'saltholmens-bastu', name: 'Saltholmens bastu', type: 'sauna', description: null, island: null, latitude: 57.6408, longitude: 11.7810 },
    ]
    const p = await getIslandPlaces(styrso, ['restaurant', 'sauna'], { extraKm: 0.5 })
    const pa = Object.fromEntries(p.map(x => [x.slug, x.onIsland]))
    expect(pa).toEqual({ 'batebacken': true, 'donso-hamnkrog': false, 'branno-vardshus': false, 'saltholmens-bastu': true })
    // På ön först, sedan efter avstånd.
    expect(p.map(x => x.slug)).toEqual(['batebacken', 'saltholmens-bastu', 'donso-hamnkrog', 'branno-vardshus'])
  })

  it('väljer före gränsen på antal (boendesidans urval)', async () => {
    rader = [
      ...Array.from({ length: 15 }, (_, i) => ({ slug: `krog-${i}`, name: `Krog ${i}`, type: 'restaurant', description: null, island: 'Styrsö', latitude: 57.6152, longitude: 11.7757 + i * 0.0001 })),
      { slug: 'pensionat-styrso', name: 'Pensionat Styrsö Skäret', type: 'restaurant', description: null, island: 'Styrsö', latitude: 57.62, longitude: 11.79 },
      { slug: 'camping-x', name: 'Camping X', type: 'camping', description: null, island: 'Styrsö', latitude: 57.61, longitude: 11.78 },
    ]
    const p = await getIslandPlaces(styrso, [...BOENDETYPER, 'restaurant'], { urval: x => arBoendetyp(x.type) || boendeINamnet(x.name) })
    expect(p.map(x => x.slug).sort()).toEqual(['camping-x', 'pensionat-styrso'])
  })
})

describe('boendeINamnet', () => {
  it('känner igen namn som säger att stället har rum', () => {
    expect(boendeINamnet('Brännö Värdshus & Pensionat Baggen')).toBe(true)
    expect(boendeINamnet('Smögens Hafvshotell')).toBe(true)
    expect(boendeINamnet('Utö Värdshus')).toBe(false)
    expect(boendeINamnet('Waxholms Camping Servering')).toBe(false)
    expect(boendeINamnet('Hotellet i Hotelli')).toBe(true)
    expect(boendeINamnet('Hotelbryggan')).toBe(false)
  })
})

describe('utanDubbletter', () => {
  // Kontrollantens fynd ma5013 och ma5014 (omkontrollen av runda 5): samma ställe stod två gånger när databasen stavade
  // utan å, ä och ö eller när bara sluggen var densamma (mallarnas runda 6, 2026-11-16).
  it('jämför namn utan diakritiska tecken och utan önamnet', () => {
    expect(normaliseraPlatsnamn('Nåttarö Krog', 'Nåttarö')).toBe('krog')
    expect(normaliseraPlatsnamn('Nattaro Krog', 'Nåttarö')).toBe('krog')
    expect(normaliseraPlatsnamn('Bakfickan Utö', 'Utö')).toBe('bakfickan')
    expect(utanDubbletter([{ name: 'Nattaro Krog', slug: 'nattaro-krog' }], ['Nåttarö Krog'], 'Nåttarö')).toEqual([])
    const ut = utanDubbletter([{ name: 'Uto Bakficka', slug: 'uto-bakficka' }, { name: 'Seglarbaren', slug: 'seglarbaren' }], ['Bakfickan Utö'], 'Utö')
    expect(ut.map(p => p.slug)).toEqual(['seglarbaren'])
  })

  it('känner igen samma slug även när namnen skiljer sig', () => {
    const ut = utanDubbletter([{ name: 'Bakfickan Uto', slug: 'bakfickan-uto' }, { name: 'Utö Värdshus', slug: 'uto-vardshus' }], ['Bakfickan'], 'Utö', ['bakfickan-uto'])
    expect(ut.map(p => p.slug)).toEqual(['uto-vardshus'])
  })

  it('slår inte ihop olika ställen', () => {
    const ut = utanDubbletter([{ name: 'Krogen', slug: 'krogen' }, { name: 'Utö Krog', slug: 'uto-krog' }], [], 'Utö')
    expect(ut.map(p => p.slug)).toEqual(['krogen', 'uto-krog'])
    // "Donsö gästhamn" blir "gasthamn" utan önamnet; det gör inte grannöarnas gästhamnar till samma ställe.
    const hamnar = utanDubbletter(
      [{ name: 'Vrångö gästhamn', slug: 'vrango-gasthamn', onIsland: false }, { name: 'Styrsö Tången gästhamn', slug: 'styrso-tangen-gasthamn', onIsland: false }, { name: 'Donso Gasthamn', slug: 'donso-gasthamn', onIsland: true }],
      ['Donsö gästhamn'], 'Donsö')
    expect(hamnar.map(p => p.slug)).toEqual(['vrango-gasthamn', 'styrso-tangen-gasthamn'])
    // På ön: "Grinda Gästhamn" i databasen är ödatans "Grinda Gästhamn (Hemviken)", och "STF Vandrarhem Landsort" är
    // "Landsorts Vandrarhem", men "Gästhamn Sandudden Utö" är inte "Utö Gästhamn".
    expect(utanDubbletter([{ name: 'Grinda Gästhamn', slug: 'grinda-gasthamn', onIsland: true }], ['Grinda Gästhamn (Hemviken)'], 'Grinda')).toEqual([])
    expect(utanDubbletter([{ name: 'STF Vandrarhem Landsort', slug: 'landsort-stf', onIsland: true }], ['Landsorts Vandrarhem'], 'Landsort')).toEqual([])
    expect(utanDubbletter([{ name: 'Gästhamn Sandudden Utö', slug: 'sandudden', onIsland: true }], ['Utö Gästhamn'], 'Utö').map(p => p.slug)).toEqual(['sandudden'])
  })
})
