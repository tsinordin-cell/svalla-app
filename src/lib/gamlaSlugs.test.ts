import { describe, it, expect } from 'vitest'
import { ALL_ISLANDS, getIsland } from '@/app/o/island-data'
import { GAMLA_SLUGS, slugVarianter } from './gamlaSlugs'
import { oNamn } from './oNamn'

describe('gamla ö-sluggar (beslut 4, 2026-11-22)', () => {
  it('varje gammal slug pekar på en ö som finns', () => {
    const finns = new Set(ALL_ISLANDS.map(i => i.slug))
    for (const [gammal, ny] of Object.entries(GAMLA_SLUGS)) {
      expect(finns.has(ny), `${gammal} → ${ny}`).toBe(true)
      expect(finns.has(gammal), `${gammal} får inte finnas kvar som egen ö`).toBe(false)
    }
  })
  it('slugVarianter ger nuvarande slug och de gamla', () => {
    expect(slugVarianter('adelso')).toEqual(['adelso', 'adelsjo'])
    expect(slugVarianter('adelsjo')).toEqual(['adelso', 'adelsjo'])
    expect(slugVarianter('smadalaro')).toEqual(['smadalaro', 'smaadalaro'])
    expect(slugVarianter('sandhamn')).toEqual(['sandhamn'])
  })
  it('notiser med gammal slug får rätt önamn', () => {
    expect(oNamn('adelsjo')).toBe('Adelsö')
    expect(oNamn('smaadalaro')).toBe(getIsland('smadalaro')?.name)
  })
})
