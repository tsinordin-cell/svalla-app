/**
 * Varje bildyta på startsidan ska ha en bild som inte hänger på Google.
 *
 * Bakgrund: Google Places svarar 403 sedan september 2026. Kort som bara
 * hade Google som källa stod då som tomma färgrutor i veckor (Badplatser,
 * Kajak, Åland, Halland) utan att något larmade. Det här testet läser
 * startsidans HTML och kräver en reservkälla för varje data-lp-photo-nyckel.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { COMMONS_FOR_KORT, HANDPLOCKADE } from './startsidaBilder'
import { OBILDER } from '@/app/o/obilder.generated'

const html = readFileSync(fileURLToPath(new URL('../app/LandingPageClient.tsx', import.meta.url)), 'utf8')
const nycklar = [...new Set([...html.matchAll(/data-lp-photo="([^"]+)"/g)].map(m => m[1] ?? ''))].filter(Boolean)

describe('startsidans bilder', () => {
  it('hittar bildytorna i startsidans HTML', () => {
    expect(nycklar.length).toBeGreaterThan(10)
  })

  it.each(nycklar)('%s har en bild utan Google', nyckel => {
    const handplockad = HANDPLOCKADE[nyckel]
    const o = COMMONS_FOR_KORT[nyckel]
    expect(Boolean(handplockad) || Boolean(o && OBILDER[o.slug])).toBe(true)
  })

  it.each(Object.entries(HANDPLOCKADE))('%s har fotograf, licens och källa (licensvillkor)', (_, b) => {
    expect(b.url).toMatch(/^https:\/\/thumb\.wikimedia\.org\/wikipedia\/commons\/thumb\/.+\/960px-/)
    expect(b.kalla).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
    expect(b.fotograf.trim()).not.toBe('')
    expect(b.licens).toMatch(/^(CC BY(-SA)? \d\.\d|CC0)/)
  })
})
