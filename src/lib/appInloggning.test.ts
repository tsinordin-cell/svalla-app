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

describe('Apple-inloggning', () => {
  it('är av tills flaggan sätts', async () => {
    const { appleInloggningPa } = await import('./appInloggning')
    const tidigare = process.env.NEXT_PUBLIC_APPLE_INLOGGNING
    delete process.env.NEXT_PUBLIC_APPLE_INLOGGNING
    expect(appleInloggningPa()).toBe(false)
    process.env.NEXT_PUBLIC_APPLE_INLOGGNING = 'true'
    expect(appleInloggningPa()).toBe(true)
    if (tidigare === undefined) delete process.env.NEXT_PUBLIC_APPLE_INLOGGNING
    else process.env.NEXT_PUBLIC_APPLE_INLOGGNING = tidigare
  })

  it('startaOAuthInloggning skickar vald leverantör och rätt tillbaka-url', async () => {
    const { startaOAuthInloggning } = await import('./appInloggning')
    const anrop: Array<{ provider: string; options: { redirectTo: string } }> = []
    const klient = {
      auth: {
        signInWithOAuth: async (a: { provider: 'google' | 'apple'; options: { redirectTo: string } }) => {
          anrop.push(a)
          return { error: null }
        },
      },
    }
    ;(globalThis as { location?: { origin: string } }).location = { origin: 'https://svalla.se' }
    const svar = await startaOAuthInloggning(klient as never, 'apple', { next: '/feed', villkor: '2026-11-22' })
    expect(svar.error).toBeNull()
    expect(anrop[0]?.provider).toBe('apple')
    expect(anrop[0]?.options.redirectTo).toBe('https://svalla.se/auth/callback?next=%2Ffeed&villkor=2026-11-22')
  })
})
