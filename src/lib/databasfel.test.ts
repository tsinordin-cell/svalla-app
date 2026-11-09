import { describe, expect, it } from 'vitest'
import { arDatabasfel, Databasfel, kastaVidDatabasfel } from './databasfel'

describe('databasfel', () => {
  it('ingen rad och ogiltigt id är "finns inte", inte databasfel', () => {
    expect(arDatabasfel(null)).toBe(false)
    expect(arDatabasfel(undefined)).toBe(false)
    expect(arDatabasfel({ code: 'PGRST116', message: 'JSON object requested, multiple (or no) rows returned' })).toBe(false)
    expect(arDatabasfel({ code: '22P02', message: 'invalid input syntax for type uuid' })).toBe(false)
    expect(() => kastaVidDatabasfel({ code: 'PGRST116', message: '' }, 'test')).not.toThrow()
  })

  it('nätverksfel och pausat projekt kastas vidare', () => {
    expect(arDatabasfel({ code: '', message: 'TypeError: fetch failed' })).toBe(true)
    expect(arDatabasfel({ message: 'upstream connect error' })).toBe(true)
    expect(arDatabasfel({ code: '57P01', message: 'terminating connection due to administrator command' })).toBe(true)
    expect(() => kastaVidDatabasfel({ code: '', message: 'fetch failed' }, 'tours')).toThrow(Databasfel)
    expect(() => kastaVidDatabasfel({ code: '', message: 'fetch failed' }, 'tours')).toThrow(/tours/)
  })
})
