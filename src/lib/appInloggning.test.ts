import { describe, it, expect } from 'vitest'
import { appensTillbakaLank, webbvagForAppLank, oauthTillbakaUrl, sakerNasta } from './appInloggning'

describe('appInloggning', () => {
  it('callback i Safari skickar koden vidare till appen utan app=1', () => {
    const p = new URLSearchParams('next=%2Ffeed&villkor=2026-11-22&app=1&code=abc123')
    expect(appensTillbakaLank(p)).toBe('se.svalla.app://auth/callback?next=%2Ffeed&villkor=2026-11-22&code=abc123')
  })

  it('felet från Google följer med till appen', () => {
    const p = new URLSearchParams('app=1&error=access_denied&error_description=x')
    expect(appensTillbakaLank(p)).toBe('se.svalla.app://auth/callback?error=access_denied&error_description=x')
  })

  it('next till annan värd byts mot /feed', () => {
    const p = new URLSearchParams('app=1&next=%2F%2Fevil.example&code=c')
    expect(appensTillbakaLank(p)).toContain('next=%2Ffeed')
    expect(webbvagForAppLank('se.svalla.app://auth/callback?next=https://evil.example&code=c'))
      .toBe('/auth/callback?next=%2Ffeed&code=c')
  })

  it('applänken blir en sökväg på svalla.se', () => {
    expect(webbvagForAppLank('se.svalla.app://auth/callback?code=abc&next=%2Fprofil'))
      .toBe('/auth/callback?code=abc&next=%2Fprofil')
  })

  it('applänken kan aldrig ge app=1 tillbaka (ingen loop)', () => {
    expect(webbvagForAppLank('se.svalla.app://auth/callback?code=abc&app=1')).toBe('/auth/callback?code=abc')
  })

  it('andra länkar ignoreras', () => {
    expect(webbvagForAppLank('https://svalla.se/auth/callback?code=x')).toBeNull()
    expect(webbvagForAppLank('se.svalla.app://annat?code=x')).toBeNull()
    expect(webbvagForAppLank('inte en url')).toBeNull()
  })

  it('oauthTillbakaUrl lägger bara till app=1 i appen', () => {
    expect(oauthTillbakaUrl('https://svalla.se', { next: '/feed', iApp: false }))
      .toBe('https://svalla.se/auth/callback?next=%2Ffeed')
    expect(oauthTillbakaUrl('https://svalla.se', { next: '/feed', iApp: true, villkor: '2026-11-22' }))
      .toBe('https://svalla.se/auth/callback?next=%2Ffeed&villkor=2026-11-22&app=1')
  })

  it('sakerNasta', () => {
    expect(sakerNasta('/u/tom')).toBe('/u/tom')
    expect(sakerNasta('//x')).toBe('/feed')
    expect(sakerNasta(null)).toBe('/feed')
  })
})
