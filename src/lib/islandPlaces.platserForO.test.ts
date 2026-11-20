import { describe, it, expect } from 'vitest'
import { platserForO } from './islandPlaces'

// Grinda i islandCoords: 59.4109, 18.5618, radie 2,5 km.
const GRINDA = { slug: 'grinda', name: 'Grinda' }
const rad = (o: Partial<{ slug: string | null; name: string | null; type: string | null; description: string | null; island: string | null; latitude: number | null; longitude: number | null }>) => ({
  slug: 'x', name: 'X', type: 'beach', description: null, island: null, latitude: null, longitude: null, ...o,
})

const alla = [
  rad({ slug: 'mitt-pa', name: 'Mitt på ön', latitude: 59.4109, longitude: 18.5618 }),
  rad({ slug: 'namn-utan-lage', name: 'Bär öns namn', island: 'grinda' }),
  rad({ slug: 'strax-utanfor', name: 'Tre km bort', latitude: 59.4109 + 3 / 111, longitude: 18.5618 }),
  rad({ slug: 'langt-bort', name: 'Tio km bort', latitude: 59.4109 + 10 / 111, longitude: 18.5618 }),
  rad({ slug: 'fel-typ', name: 'Krog', type: 'restaurant', latitude: 59.4109, longitude: 18.5618 }),
  rad({ slug: null, name: 'Utan slug', latitude: 59.4109, longitude: 18.5618 }),
  rad({ slug: 'annan-o', name: 'Annan ö utan läge', island: 'Möja' }),
]

describe('platserForO', () => {
  it('tar platser på ön och inom räckvidden, med rätt typ', () => {
    expect(platserForO(alla, GRINDA, ['beach']).map(p => p.slug)).toEqual(['mitt-pa', 'namn-utan-lage', 'strax-utanfor'])
  })
  it('märker ut vad som ligger på ön och vad som bara ligger nära', () => {
    const ut = Object.fromEntries(platserForO(alla, GRINDA, ['beach']).map(p => [p.slug, p.onIsland]))
    expect(ut).toEqual({ 'mitt-pa': true, 'namn-utan-lage': true, 'strax-utanfor': false })
  })
  it('extraKm = 0 släpper bara igenom det som ligger på ön', () => {
    expect(platserForO(alla, GRINDA, ['beach'], { extraKm: 0 }).map(p => p.slug)).toEqual(['mitt-pa', 'namn-utan-lage'])
  })
  it('matchar önamnet oavsett versaler', () => {
    expect(platserForO([rad({ slug: 'a', island: 'GRINDA' })], GRINDA, ['beach'])).toHaveLength(1)
  })
  it('håller sig till limit', () => {
    expect(platserForO(alla, GRINDA, ['beach'], { limit: 1 }).map(p => p.slug)).toEqual(['mitt-pa'])
  })
  it('en ö utan känt läge får bara platser som bär öns namn', () => {
    const okand = { slug: 'finns-inte-i-coords', name: 'Möja' }
    expect(platserForO(alla, okand, ['beach']).map(p => p.slug)).toEqual(['annan-o'])
  })
})
