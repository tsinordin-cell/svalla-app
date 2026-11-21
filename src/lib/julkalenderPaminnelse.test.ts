import { describe, it, expect } from 'vitest'
import { paminnelseFor, LUCKOR } from './julkalender'
import { renderEmail } from './email'
import { flodePa } from './mailfloden'

describe('paminnelseFor', () => {
  it('inget mejl före 1 december eller efter julafton', () => {
    expect(paminnelseFor(new Date('2026-11-30T09:00:00Z'))).toBeNull()
    expect(paminnelseFor(new Date('2026-12-25T09:00:00Z'))).toBeNull()
  })
  it('kl 10 svensk tid 1 december gäller lucka 1', () => {
    const p = paminnelseFor(new Date('2026-12-01T09:00:00Z'))
    expect(p?.dag).toBe(1)
    expect(p?.vars.lucka_url).toBe('https://svalla.se/julkalender/1')
  })
  it('mejlet innehåller bara titel och teaser, som utloggade redan ser', () => {
    for (const l of LUCKOR) {
      const p = paminnelseFor(new Date(Date.UTC(2026, 11, l.dag, 9)))
      expect(p?.vars).toEqual({ dag: String(l.dag), titel: l.titel, teaser: l.teaser, lucka_url: `https://svalla.se/julkalender/${l.dag}` })
    }
  })
  it('mallen fyller i alla fält', () => {
    const p = paminnelseFor(new Date('2026-12-02T09:00:00Z'))!
    const r = renderEmail('julkalender', p.vars)
    expect(r.ok).toBe(true)
    expect(r.subject).toBe(`Lucka 2 är öppen: ${p.vars.titel}`)
    expect(r.html).not.toMatch(/\{\{/)
    expect(r.html).toContain('https://svalla.se/julkalender/2')
  })
  it('flödet är avstängt tills det står i EMAIL_AUTOMATIK', () => {
    expect(flodePa('julkalender', undefined)).toBe(false)
    expect(flodePa('julkalender', 'manadsbrev')).toBe(false)
    expect(flodePa('julkalender', 'manadsbrev,julkalender')).toBe(true)
  })
})
