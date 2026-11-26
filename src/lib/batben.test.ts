import { describe, expect, it } from 'vitest'
import { arBatben } from './batben'

// Mallarnas runda 10 (sm08-k011): "· båt" i avgångsrutan.
describe('arBatben', () => {
  it('känner igen ResRobots färjekoder', () => {
    expect(arBatben({ category: 'Färjetrafik - övrigt', catCode: '8', cls: '256' })).toBe(true)
    expect(arBatben({ category: 'Okänd', catCode: 8 })).toBe(true)
    expect(arBatben({ category: 'Okänd', cls: 256 })).toBe(true)
  })
  it('läser kategorin när koderna saknas', () => {
    expect(arBatben({ category: 'Färjetrafik - övrigt' })).toBe(true)
    expect(arBatben({ category: 'Färja' })).toBe(true)
  })
  it('buss, tåg och promenad är inte båt', () => {
    expect(arBatben({ category: 'Buss', catCode: '7', cls: '128' })).toBe(false)
    expect(arBatben({ category: 'Promenad' })).toBe(false)
    expect(arBatben({ category: 'Pendeltåg', catCode: '4', cls: '16' })).toBe(false)
  })
})
