import { describe, it, expect } from 'vitest'
import { forbyggUrval, FORBYGG_I_FORHANDSVISNING } from './forbygge'

const alla = Array.from({ length: 10 }, (_, i) => ({ id: String(i) }))

describe('forbyggUrval', () => {
  it('förbygger allt i produktion', () => {
    expect(forbyggUrval(alla, 'production')).toEqual(alla)
  })
  it('förbygger allt lokalt, där miljön saknas', () => {
    expect(forbyggUrval(alla, undefined)).toEqual(alla)
  })
  it('förbygger bara de första få i en förhandsvisning', () => {
    expect(forbyggUrval(alla, 'preview')).toEqual(alla.slice(0, FORBYGG_I_FORHANDSVISNING))
  })
  it('klarar en lista som är kortare än urvalet', () => {
    expect(forbyggUrval(alla.slice(0, 1), 'preview')).toEqual(alla.slice(0, 1))
    expect(forbyggUrval([], 'preview')).toEqual([])
  })
})
