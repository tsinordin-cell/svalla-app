import { describe, expect, it } from 'vitest'
import { arDmBildSokvag } from './dmBilder'
import { rostTid } from './useRostInspelning'

const U = '11111111-1111-1111-1111-111111111111'

describe('arDmBildSokvag', () => {
  it('godtar bilder och röstmeddelanden i den privata hinken', () => {
    expect(arDmBildSokvag(`${U}/${U}/${U}.jpg`)).toBe(true)
    expect(arDmBildSokvag(`${U}/${U}/${U}.m4a`)).toBe(true)
    expect(arDmBildSokvag(`${U}/${U}/${U}.webm`)).toBe(true)
  })
  it('nekar andra filtyper, publika länkar och fel antal delar', () => {
    expect(arDmBildSokvag(`${U}/${U}/${U}.mp3`)).toBe(false)
    expect(arDmBildSokvag(`${U}/${U}/${U}.png`)).toBe(false)
    expect(arDmBildSokvag(`${U}/${U}.m4a`)).toBe(false)
    expect(arDmBildSokvag(`https://x.supabase.co/storage/v1/object/public/a/${U}.jpg`)).toBe(false)
    expect(arDmBildSokvag(null)).toBe(false)
  })
})

describe('rostTid', () => {
  it('skriver minuter och sekunder', () => {
    expect(rostTid(0)).toBe('0:00')
    expect(rostTid(7.9)).toBe('0:07')
    expect(rostTid(102)).toBe('1:42')
    expect(rostTid(120)).toBe('2:00')
  })
})
