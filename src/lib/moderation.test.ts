import { describe, it, expect } from 'vitest'
import { arAllvarligtInnehall } from './moderation'

describe('arAllvarligtInnehall', () => {
  it('fångar grova ord och uppmaningar', () => {
    expect(arAllvarligtInnehall('du är en neger')).toBe(true)
    expect(arAllvarligtInnehall('Ta livet av dig')).toBe(true)
    expect(arAllvarligtInnehall('rubrik', 'kill yourself')).toBe(true)
  })
  it('släpper vanliga svordomar och vanlig text', () => {
    expect(arAllvarligtInnehall('fan vad blåsigt det var, skit samma')).toBe(false)
    expect(arAllvarligtInnehall('Bästa hamnen på Utö?', 'Gästhamnen är jävligt fin')).toBe(false)
    expect(arAllvarligtInnehall(null, undefined, '')).toBe(false)
  })
})
