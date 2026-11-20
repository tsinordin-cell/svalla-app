import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { O_NAMN, oNamn } from './oNamn'

describe('O_NAMN', () => {
  it('är exakt samma slug → namn som ALL_ISLANDS', () => {
    const facit = Object.fromEntries(ALL_ISLANDS.map(i => [i.slug, i.name]))
    expect(O_NAMN, 'Uppdatera src/lib/oNamn.ts så att den följer island-data.ts').toEqual(facit)
  })
  it('ger sluggen tillbaka för en okänd ö', () => {
    expect(oNamn('finns-inte')).toBe('finns-inte')
    expect(oNamn('sandhamn')).toBe('Sandhamn')
  })
})
