import { describe, it, expect } from 'vitest'
import { utf8TillBas64url } from './bas64url'

describe('utf8TillBas64url', () => {
  it('matchar Node Buffer base64url, även med åäö och snedstreck', () => {
    for (const text of ['places/ChIJ', 'Gällnö/foto+1', 'a/b?c=d&e', '']) {
      expect(utf8TillBas64url(text)).toBe(Buffer.from(text, 'utf8').toString('base64url'))
      expect(Buffer.from(utf8TillBas64url(text), 'base64url').toString('utf8')).toBe(text)
    }
  })
})
