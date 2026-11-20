import { describe, it, expect } from 'vitest'
import { sessionKommerFranLank } from './aterstallningsSession'

const NU = new Date('2026-11-20T06:30:00Z')
const sek = (d: Date) => Math.floor(d.getTime() / 1000)
function bevis(amr: unknown): string {
  const b = (o: unknown) => Buffer.from(JSON.stringify(o)).toString('base64url')
  return `${b({ alg: 'ES256' })}.${b({ sub: 'x', amr })}.signatur`
}

describe('sessionKommerFranLank', () => {
  it('godkänner en färsk session från återställningslänken', () => {
    expect(sessionKommerFranLank(bevis([{ method: 'recovery', timestamp: sek(NU) - 20 }]), NU)).toBe(true)
    expect(sessionKommerFranLank(bevis([{ method: 'otp', timestamp: sek(NU) - 20 }]), NU)).toBe(true)
  })
  it('underkänner en gammal session, även från en länk', () => {
    expect(sessionKommerFranLank(bevis([{ method: 'recovery', timestamp: sek(NU) - 3600 }]), NU)).toBe(false)
  })
  it('underkänner vanlig inloggning, även om den är färsk', () => {
    expect(sessionKommerFranLank(bevis([{ method: 'password', timestamp: sek(NU) - 20 }]), NU)).toBe(false)
    expect(sessionKommerFranLank(bevis([{ method: 'oauth', timestamp: sek(NU) - 20 }]), NU)).toBe(false)
  })
  it('går på det senaste inloggningssättet', () => {
    expect(sessionKommerFranLank(bevis([{ method: 'password', timestamp: sek(NU) - 90000 }, { method: 'recovery', timestamp: sek(NU) - 10 }]), NU)).toBe(true)
    expect(sessionKommerFranLank(bevis([{ method: 'recovery', timestamp: sek(NU) - 90000 }, { method: 'password', timestamp: sek(NU) - 10 }]), NU)).toBe(false)
  })
  it('underkänner trasigt eller tomt bevis', () => {
    expect(sessionKommerFranLank(null, NU)).toBe(false)
    expect(sessionKommerFranLank('inte-ett-bevis', NU)).toBe(false)
    expect(sessionKommerFranLank(bevis([]), NU)).toBe(false)
    expect(sessionKommerFranLank(bevis(undefined), NU)).toBe(false)
  })
})
