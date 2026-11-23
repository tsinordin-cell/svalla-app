// Dubbel bekräftelse för nyhetsbrevet och anspråksnyckel för rutter (2026-11-22).
import { describe, it, expect } from 'vitest'
import { bekraftaLank, tolkaBekraftelse, adressRedanBekraftad, bekraftaToken } from './prenumeration'
import { avregToken } from './avregistrering'
import { nyAnsprakNyckel, ansprakHash, ansprakGiltigt } from './ruttAnsprak'
import { renderEmail } from './email'

const NYCKEL = 'testnyckel-som-inte-finns-i-produktion'

describe('bekräftelselänken för nyhetsbrevet', () => {
  it('länken tolkas tillbaka till adressen', () => {
    const url = new URL(bekraftaLank('Anna.B+segling@Exempel.se', NYCKEL)!)
    expect(url.origin + url.pathname).toBe('https://svalla.se/nyhetsbrev/bekrafta')
    expect(tolkaBekraftelse(url.searchParams.get('e'), url.searchParams.get('t'), NYCKEL)).toBe('anna.b+segling@exempel.se')
  })
  it('fel nyckel, ändrad adress eller saknad token: ingen adress', () => {
    const url = new URL(bekraftaLank('anna@exempel.se', NYCKEL)!)
    const e = url.searchParams.get('e')!
    const t = url.searchParams.get('t')!
    expect(tolkaBekraftelse(e, t, 'annan-nyckel')).toBeNull()
    expect(tolkaBekraftelse(Buffer.from('bertil@exempel.se').toString('base64url'), t, NYCKEL)).toBeNull()
    expect(tolkaBekraftelse(e, '', NYCKEL)).toBeNull()
    expect(tolkaBekraftelse(e, t, undefined)).toBeNull()
    expect(tolkaBekraftelse(null, t, NYCKEL)).toBeNull()
  })
  it('avregistreringens token duger inte som bekräftelse', () => {
    expect(bekraftaToken('anna@exempel.se', NYCKEL)).not.toBe(avregToken('anna@exempel.se', NYCKEL))
    const e = Buffer.from('anna@exempel.se').toString('base64url')
    expect(tolkaBekraftelse(e, avregToken('anna@exempel.se', NYCKEL), NYCKEL)).toBeNull()
  })
  it('utan nyckel ingen länk', () => {
    expect(bekraftaLank('anna@exempel.se', undefined)).toBeNull()
    expect(bekraftaLank('anna@exempel.se', '')).toBeNull()
  })
  it('bara egen bekräftad kontoadress räknas som redan bekräftad', () => {
    const user = { email: 'Anna@Exempel.se', email_confirmed_at: '2026-11-20T10:00:00Z' }
    expect(adressRedanBekraftad(user, 'anna@exempel.se')).toBe(true)
    expect(adressRedanBekraftad(user, 'bertil@exempel.se')).toBe(false)
    expect(adressRedanBekraftad({ ...user, email_confirmed_at: null }, 'anna@exempel.se')).toBe(false)
    expect(adressRedanBekraftad(null, 'anna@exempel.se')).toBe(false)
  })
  it('mallen fyller i länken', () => {
    const r = renderEmail('prenumeration_bekrafta', { bekrafta_url: 'https://svalla.se/nyhetsbrev/bekrafta?e=x&t=y' })
    expect(r.ok).toBe(true)
    expect(r.html).toContain('href="https://svalla.se/nyhetsbrev/bekrafta?e=x&t=y"')
    expect(r.html).not.toMatch(/\{\{/)
  })
})

describe('anspråksnyckel för rutter utan ägare', () => {
  it('rätt nyckel godtas, allt annat nekas', () => {
    const n = nyAnsprakNyckel()
    const h = ansprakHash(n)
    expect(h).toMatch(/^[0-9a-f]{64}$/)
    expect(ansprakGiltigt(n, h)).toBe(true)
    expect(ansprakGiltigt(nyAnsprakNyckel(), h)).toBe(false)
    expect(ansprakGiltigt(undefined, h)).toBe(false)
    expect(ansprakGiltigt('', h)).toBe(false)
  })
  it('rutt från före nyckeln (hash saknas) kan inte tas över', () => {
    expect(ansprakGiltigt(nyAnsprakNyckel(), null)).toBe(false)
    expect(ansprakGiltigt('x', 'inte-hex')).toBe(false)
  })
  it('nycklarna är olika och långa nog', () => {
    const a = nyAnsprakNyckel()
    expect(a.length).toBeGreaterThanOrEqual(32)
    expect(a).not.toBe(nyAnsprakNyckel())
  })
})
