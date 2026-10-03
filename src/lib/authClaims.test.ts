import { describe, expect, it, vi } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import {
  AuthApiError,
  AuthInvalidJwtError,
  AuthRetryableFetchError,
  AuthSessionMissingError,
} from '@supabase/supabase-js'
import { getViewerId } from './authClaims'

// revision 2026-10-02: getViewerId med mockad klient. Kontrollerar vilket
// svar som ges och vilka Auth-anrop som görs i varje gren.

const URL_ = 'https://abcdefghijklmnopqrst.supabase.co'
const ISS = `${URL_}/auth/v1`
const SUB = '11111111-2222-4333-8444-555555555555'
const TOKEN = 'header.payload.signatur'
const om = (s: number) => Math.floor(Date.now() / 1000) + s

type Opts = {
  session?: { access_token: string } | null
  sessionError?: unknown
  sessionThrows?: unknown
  claims?: Record<string, unknown>
  claimsError?: unknown
  claimsThrows?: unknown
  user?: { id: string } | null
  userError?: unknown
  userThrows?: unknown
}

function klient(o: Opts) {
  const anrop = { getSession: 0, getClaims: [] as unknown[][], getUser: [] as unknown[][] }
  const auth = {
    async getSession() {
      anrop.getSession++
      if (o.sessionThrows) throw o.sessionThrows
      return { data: { session: o.session === undefined ? { access_token: TOKEN } : o.session }, error: o.sessionError ?? null }
    },
    async getClaims(...args: unknown[]) {
      anrop.getClaims.push(args)
      if (o.claimsThrows) throw o.claimsThrows
      if (o.claimsError) return { data: null, error: o.claimsError }
      return { data: { claims: o.claims ?? {}, header: {}, signature: new Uint8Array() }, error: null }
    },
    async getUser(...args: unknown[]) {
      anrop.getUser.push(args)
      if (o.userThrows) throw o.userThrows
      if (o.userError) return { data: { user: null }, error: o.userError }
      return { data: { user: o.user ?? null }, error: null }
    },
  }
  return { supabase: { auth } as unknown as SupabaseClient, anrop }
}

const giltiga = { sub: SUB, exp: om(3600), iss: ISS }

describe('getViewerId', () => {
  it('ingen session: null utan verifiering eller serveranrop', async () => {
    const { supabase, anrop } = klient({ session: null })
    expect(await getViewerId(supabase, URL_)).toBeNull()
    expect(anrop.getClaims).toHaveLength(0)
    expect(anrop.getUser).toHaveLength(0)
  })

  it('fel från getSession (t.ex. misslyckad förnyelse): null', async () => {
    const { supabase, anrop } = klient({ session: null, sessionError: new AuthApiError('Invalid Refresh Token', 400, 'refresh_token_not_found') })
    expect(await getViewerId(supabase, URL_)).toBeNull()
    expect(anrop.getClaims).toHaveLength(0)
    expect(anrop.getUser).toHaveLength(0)
    // Defensivt: ett fel räcker även om en session skulle följa med.
    const medSession = klient({ sessionError: new AuthRetryableFetchError('fetch failed', 503) })
    expect(await getViewerId(medSession.supabase, URL_)).toBeNull()
    expect(medSession.anrop.getClaims).toHaveLength(0)
  })

  it('getSession kastar: null', async () => {
    const { supabase, anrop } = klient({ sessionThrows: new TypeError('trasig cookie') })
    expect(await getViewerId(supabase, URL_)).toBeNull()
    expect(anrop.getUser).toHaveLength(0)
  })

  it('giltiga claims: sub, token verifieras med allowExpired och utan getUser', async () => {
    const { supabase, anrop } = klient({ claims: giltiga })
    expect(await getViewerId(supabase, URL_)).toBe(SUB)
    expect(anrop.getClaims).toEqual([[TOKEN, { allowExpired: true }]])
    expect(anrop.getUser).toHaveLength(0)
  })

  it('URL med avslutande snedstreck ger samma iss', async () => {
    const { supabase } = klient({ claims: giltiga })
    expect(await getViewerId(supabase, `${URL_}/`)).toBe(SUB)
  })

  it('utgången token: null utan getUser', async () => {
    const { supabase, anrop } = klient({ claims: { ...giltiga, exp: om(-1) } })
    expect(await getViewerId(supabase, URL_)).toBeNull()
    expect(anrop.getUser).toHaveLength(0)
  })

  it('saknad exp eller saknat sub: null', async () => {
    const utanExp = klient({ claims: { sub: SUB, iss: ISS } })
    expect(await getViewerId(utanExp.supabase, URL_)).toBeNull()
    const utanSub = klient({ claims: { exp: om(3600), iss: ISS, role: 'anon' } })
    expect(await getViewerId(utanSub.supabase, URL_)).toBeNull()
    expect(utanExp.anrop.getUser).toHaveLength(0)
    expect(utanSub.anrop.getUser).toHaveLength(0)
  })

  it('annan iss: Auth-servern avgör via getUser(token)', async () => {
    const ja = klient({ claims: { ...giltiga, iss: 'https://annat.supabase.co/auth/v1' }, user: { id: SUB } })
    expect(await getViewerId(ja.supabase, URL_)).toBe(SUB)
    expect(ja.anrop.getUser).toEqual([[TOKEN]])
    const nej = klient({ claims: { ...giltiga, iss: 'https://annat.supabase.co/auth/v1' }, userError: new AuthApiError('bad_jwt', 403, 'bad_jwt') })
    expect(await getViewerId(nej.supabase, URL_)).toBeNull()
  })

  it('saknad projekt-URL: Auth-servern avgör', async () => {
    // Standardvärdet läses ur process.env, så töm det för att verkligen
    // pröva en saknad URL (granskningen 2026-10-02).
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '')
    try {
      const { supabase, anrop } = klient({ claims: giltiga, user: { id: SUB } })
      expect(await getViewerId(supabase, undefined)).toBe(SUB)
      expect(anrop.getUser).toHaveLength(1)
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it.each([
    ['AuthInvalidJwtError (signatur/struktur)', new AuthInvalidJwtError('Invalid JWT signature')],
    ['AuthSessionMissingError (från serverns svar)', new AuthSessionMissingError()],
    ['AuthApiError 403 (servern avvisade tokenen)', new AuthApiError('invalid JWT', 403, 'bad_jwt')],
  ])('%s: null utan getUser', async (_namn, fel) => {
    const returnerat = klient({ claimsError: fel })
    expect(await getViewerId(returnerat.supabase, URL_)).toBeNull()
    expect(returnerat.anrop.getUser).toHaveLength(0)
    const kastat = klient({ claimsThrows: fel })
    expect(await getViewerId(kastat.supabase, URL_)).toBeNull()
    expect(kastat.anrop.getUser).toHaveLength(0)
  })

  it.each([
    ['AuthRetryableFetchError (JWKS gick inte att nå)', { claimsError: new AuthRetryableFetchError('fetch failed', 0) }],
    ['AuthApiError 500', { claimsError: new AuthApiError('fel', 500, undefined) }],
    ['kastat icke-auth-fel (t.ex. okänd algoritm)', { claimsThrows: new Error('Invalid alg claim') }],
  ])('%s: getUser(token) en gång', async (_namn, o: Opts) => {
    const { supabase, anrop } = klient({ ...o, user: { id: SUB } })
    expect(await getViewerId(supabase, URL_)).toBe(SUB)
    expect(anrop.getUser).toEqual([[TOKEN]])
    expect(anrop.getSession).toBe(1)
  })

  it('fallback som misslyckas eller kastar: null', async () => {
    const fel = klient({ claimsError: new AuthRetryableFetchError('fetch failed', 0), userError: new AuthRetryableFetchError('fetch failed', 0) })
    expect(await getViewerId(fel.supabase, URL_)).toBeNull()
    const kast = klient({ claimsError: new AuthRetryableFetchError('fetch failed', 0), userThrows: new Error('nätverk') })
    expect(await getViewerId(kast.supabase, URL_)).toBeNull()
  })
})
