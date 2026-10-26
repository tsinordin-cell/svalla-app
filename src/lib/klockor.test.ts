import { describe, expect, it } from 'vitest'
import { arPlaneradRutt, visaGlobalaKlockor } from './klockor'

// 2026-10-21: klockorna (hem, meddelanden, notiser) låg ovanpå avståndsbadgen
// i headern på en planerad rutt. Testet låser var de visas och inte.
describe('visaGlobalaKlockor', () => {
  it('visas inte för utloggade', () => {
    expect(visaGlobalaKlockor('/oar', false)).toBe(false)
  })

  it('visas på /planera och /planera/ny men inte på en planerad rutt', () => {
    expect(visaGlobalaKlockor('/planera', true)).toBe(true)
    expect(visaGlobalaKlockor('/planera/ny', true)).toBe(true)
    expect(visaGlobalaKlockor('/planera/ny/', true)).toBe(true)
    expect(visaGlobalaKlockor('/planera/3f2a-1234', true)).toBe(false)
    expect(visaGlobalaKlockor('/planera/3f2a-1234/dela', true)).toBe(false)
  })

  it('döljs på sidor med egna klockor och i meddelanden', () => {
    for (const p of ['/feed', '/rutter', '/platser', '/profil', '/forum', '/u/thomas', '/sok', '/upptack', '/upptack/abc', '/meddelanden', '/meddelanden/42']) {
      expect(visaGlobalaKlockor(p, true), p).toBe(false)
    }
  })

  it('visas på vanliga sidor', () => {
    for (const p of ['/', '/oar', '/o/grinda', '/utflykt', '/logga', '/min-skargard', '/planerare']) {
      expect(visaGlobalaKlockor(p, true), p).toBe(true)
    }
  })
})

describe('arPlaneradRutt', () => {
  it('känner igen bara /planera/<id>', () => {
    expect(arPlaneradRutt('/planera/abc')).toBe(true)
    expect(arPlaneradRutt('/planera')).toBe(false)
    expect(arPlaneradRutt('/planera/ny')).toBe(false)
    expect(arPlaneradRutt('/planerare')).toBe(false)
  })
})
