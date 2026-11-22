import { describe, it, expect } from 'vitest'
import { harLosenord, inloggningAlderSekunder, farskInloggning, FARSK_INLOGGNING_SEKUNDER } from './kontoBekraftelse'

const NU = new Date('2026-11-20T20:00:00Z')
const t0 = Math.floor(NU.getTime() / 1000)
const bevis = (amr: unknown) => ['x', Buffer.from(JSON.stringify({ amr })).toString('base64url'), 'y'].join('.')

describe('harLosenord', () => {
  it('Google-konto saknar lösenord', () => {
    expect(harLosenord([{ provider: 'google' }])).toBe(false)
  })
  it('konto med e-post, ensamt eller ihop med Google, har lösenord', () => {
    expect(harLosenord([{ provider: 'email' }])).toBe(true)
    expect(harLosenord([{ provider: 'google' }, { provider: 'email' }])).toBe(true)
  })
  it('tom lista: inget lösenord', () => {
    expect(harLosenord([])).toBe(false)
  })
  it('okänt räknas som att lösenord finns', () => {
    expect(harLosenord(undefined)).toBe(true)
    expect(harLosenord(null, null)).toBe(true)
  })
  it('faller tillbaka på leverantörslistan', () => {
    expect(harLosenord(undefined, ['google'])).toBe(false)
    expect(harLosenord(undefined, ['email', 'google'])).toBe(true)
  })
})

describe('färsk inloggning', () => {
  it('nyss inloggad med Google är färsk', () => {
    expect(farskInloggning(bevis([{ method: 'oauth', timestamp: t0 - 30 }]), NU)).toBe(true)
  })
  it('gränsen är tio minuter', () => {
    expect(farskInloggning(bevis([{ method: 'oauth', timestamp: t0 - FARSK_INLOGGNING_SEKUNDER }]), NU)).toBe(true)
    expect(farskInloggning(bevis([{ method: 'oauth', timestamp: t0 - FARSK_INLOGGNING_SEKUNDER - 1 }]), NU)).toBe(false)
  })
  it('en vecka gammal session är inte färsk', () => {
    expect(farskInloggning(bevis([{ method: 'oauth', timestamp: t0 - 7 * 86400 }]), NU)).toBe(false)
  })
  it('den senaste inloggningen avgör', () => {
    const b = bevis([{ method: 'oauth', timestamp: t0 - 86400 }, { method: 'oauth', timestamp: t0 - 60 }])
    expect(inloggningAlderSekunder(b, NU)).toBe(60)
  })
  it('oläsligt bevis, tomt amr eller en tid i framtiden godtas inte', () => {
    expect(farskInloggning('skräp', NU)).toBe(false)
    expect(farskInloggning(null, NU)).toBe(false)
    expect(farskInloggning(bevis([]), NU)).toBe(false)
    expect(farskInloggning(bevis([{ method: 'oauth' }]), NU)).toBe(false)
    expect(farskInloggning(bevis([{ method: 'oauth', timestamp: t0 + 3600 }]), NU)).toBe(false)
  })
})

describe('radering: Google eller färsk inloggning (2026-11-22)', () => {
  it('harGoogle läser identiteter och leverantörer', async () => {
    const { harGoogle } = await import('./kontoBekraftelse')
    expect(harGoogle([{ provider: 'email' }, { provider: 'google' }])).toBe(true)
    expect(harGoogle([{ provider: 'email' }])).toBe(false)
    expect(harGoogle(undefined, ['email', 'google'])).toBe(true)
    expect(harGoogle(null, null)).toBe(false)
  })
  it('färsk inloggning räcker även för konto med lösenord', async () => {
    const { raderingBekraftad } = await import('./kontoBekraftelse')
    expect(raderingBekraftad({ nyssInloggad: true, medLosenord: true, losenordRatt: false })).toBe(true)
    expect(raderingBekraftad({ nyssInloggad: true, medLosenord: false, losenordRatt: false })).toBe(true)
  })
  it('utan färsk inloggning krävs rätt lösenord', async () => {
    const { raderingBekraftad } = await import('./kontoBekraftelse')
    expect(raderingBekraftad({ nyssInloggad: false, medLosenord: true, losenordRatt: true })).toBe(true)
    expect(raderingBekraftad({ nyssInloggad: false, medLosenord: true, losenordRatt: false })).toBe(false)
    expect(raderingBekraftad({ nyssInloggad: false, medLosenord: false, losenordRatt: true })).toBe(false)
  })
})
