import { describe, expect, it } from 'vitest'
import { NextResponse } from 'next/server'
import { clearSupabaseAuthCookies, supabaseAuthCookieKey } from './authCookies'

// revision 2026-10-02: utloggningen vid kontoradering tar bort de cookies
// som @supabase/ssr faktiskt använder.

const URL_ = 'https://abcdefghijklmnopqrst.supabase.co'
const KEY = 'sb-abcdefghijklmnopqrst-auth-token'

describe('supabaseAuthCookieKey', () => {
  it('följer supabase-js: första ledet i värdnamnet', () => {
    expect(supabaseAuthCookieKey(URL_)).toBe(KEY)
    expect(supabaseAuthCookieKey('http://127.0.0.1:54321')).toBe('sb-127-auth-token')
  })
})

describe('clearSupabaseAuthCookies', () => {
  it('tar bort bascookien, delarna och code-verifier men inget annat', () => {
    const res = NextResponse.json({ ok: true })
    const borttagna = clearSupabaseAuthCookies(res, [
      `${KEY}.0`, `${KEY}.1`, `${KEY}-code-verifier`,
      'svalla_admin', 'ph_phc_x_posthog', 'sb-access-token', 'sb-refresh-token',
    ], URL_)
    expect(borttagna).toEqual([KEY, `${KEY}-code-verifier`, `${KEY}.0`, `${KEY}.1`].sort())
    const setCookie = res.headers.getSetCookie()
    expect(setCookie).toHaveLength(4)
    for (const c of setCookie) {
      expect(c).toMatch(/^sb-abcdefghijklmnopqrst-auth-token(\.\d|-code-verifier)?=;/)
      expect(c).toContain('Path=/')
      // Expires (inte Max-Age=0), se kommentaren i authCookies.ts
      expect(c).toContain('Expires=Thu, 01 Jan 1970 00:00:00 GMT')
    }
  })

  it('bascookien tas bort även om den inte syns i förfrågan', () => {
    const res = NextResponse.json({ ok: true })
    expect(clearSupabaseAuthCookies(res, [], URL_)).toEqual([KEY])
  })

  it('utan eller med ogiltig URL: bara befintliga auth-cookies', () => {
    const a = NextResponse.json({ ok: true })
    expect(clearSupabaseAuthCookies(a, [KEY, 'annat'], undefined)).toEqual([KEY])
    const b = NextResponse.json({ ok: true })
    expect(clearSupabaseAuthCookies(b, [`${KEY}.0`], 'inte en url')).toEqual([`${KEY}.0`])
  })
})
