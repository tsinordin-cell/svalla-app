import { describe, it, expect } from 'vitest'
import { forbyggUrval, FORBYGG_I_FORHANDSVISNING } from './forbygge'

const alla = Array.from({ length: 10 }, (_, i) => ({ id: String(i) }))

describe('forbyggUrval', () => {
  it('förbygger allt i produktion', () => {
    expect(forbyggUrval(alla, 'production')).toEqual(alla)
  })
  it('förbygger allt lokalt', () => {
    // Inte undefined här: då läser funktionen byggets egen miljö, och testet
    // körs även i Vercels förhandsvisningsbygge.
    expect(forbyggUrval(alla, 'development')).toEqual(alla)
    expect(forbyggUrval(alla, '')).toEqual(alla)
  })
  it('läser VERCEL_ENV när ingen miljö anges', () => {
    const fore = process.env.VERCEL_ENV
    try {
      process.env.VERCEL_ENV = 'preview'
      expect(forbyggUrval(alla)).toHaveLength(FORBYGG_I_FORHANDSVISNING)
      delete process.env.VERCEL_ENV
      expect(forbyggUrval(alla)).toHaveLength(alla.length)
    } finally {
      if (fore === undefined) delete process.env.VERCEL_ENV
      else process.env.VERCEL_ENV = fore
    }
  })
  it('förbygger bara de första få i en förhandsvisning', () => {
    expect(forbyggUrval(alla, 'preview')).toEqual(alla.slice(0, FORBYGG_I_FORHANDSVISNING))
  })
  it('klarar en lista som är kortare än urvalet', () => {
    expect(forbyggUrval(alla.slice(0, 1), 'preview')).toEqual(alla.slice(0, 1))
    expect(forbyggUrval([], 'preview')).toEqual([])
  })
})
