import { describe, expect, it } from 'vitest'
import { commonsTumme } from './commonsTumme'

describe('commonsTumme', () => {
  it('byter bredd på en miniatyr', () => {
    expect(commonsTumme('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Finnhamn.jpg/1280px-Finnhamn.jpg', 960))
      .toBe('https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Finnhamn.jpg/960px-Finnhamn.jpg')
  })
  it('gör en originalfil till miniatyr (originalen svarar 429)', () => {
    expect(commonsTumme('https://upload.wikimedia.org/wikipedia/commons/7/79/Wikipedia_namdobote.jpg', 960))
      .toBe('https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Wikipedia_namdobote.jpg/960px-Wikipedia_namdobote.jpg')
  })
  it('lämnar andra adresser orörda', () => {
    expect(commonsTumme('https://svalla.se/bild.jpg', 960)).toBe('https://svalla.se/bild.jpg')
  })
})
