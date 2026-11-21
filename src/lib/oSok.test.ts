import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { O_SOK } from './oSok'

describe('O_SOK', () => {
  it('är exakt samma som ALL_ISLANDS för fälten sökningen använder', () => {
    const facit = ALL_ISLANDS.map(i => JSON.parse(JSON.stringify({
      slug: i.slug, name: i.name, regionLabel: i.regionLabel, tagline: i.tagline, tags: i.tags, slag: i.slag,
    })))
    expect(O_SOK, 'Uppdatera src/lib/oSok.ts så att den följer island-data.ts').toEqual(facit)
  })
})
