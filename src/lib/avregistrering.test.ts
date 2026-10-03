import { describe, expect, it } from 'vitest'
import {
  GAMLA_LANKAR_TILL,
  avkodaEpost,
  avregLank,
  avregToken,
  kodaEpost,
  tokenGiltig,
  tolkaBegaran,
} from './avregistrering'

const NYCKEL = 'testnyckel-som-bara-finns-i-testet'
const FORE = '2026-10-03'
const EFTER = GAMLA_LANKAR_TILL

const params = (lank: string) => new URL(lank).searchParams

describe('signerade länkar', () => {
  it('en länk från avregLank godtas och ger rätt adress', () => {
    const b = tolkaBegaran(params(avregLank('Anna.B+segling@Exempel.se', NYCKEL)), NYCKEL, FORE)
    expect(b).toEqual({ typ: 'signerad', email: 'anna.b+segling@exempel.se' })
  })

  it('stora och små bokstäver ger samma token', () => {
    expect(avregToken('Anna@Exempel.se', NYCKEL)).toBe(avregToken('anna@exempel.se', NYCKEL))
  })

  it('en ändrad adress eller fel nyckel godtas inte', () => {
    const lank = new URL(avregLank('anna@exempel.se', NYCKEL))
    lank.searchParams.set('e', kodaEpost('bertil@exempel.se'))
    expect(tolkaBegaran(lank.searchParams, NYCKEL, FORE)).toEqual({ typ: 'ogiltig' })
    expect(tolkaBegaran(params(avregLank('anna@exempel.se', NYCKEL)), 'annan-nyckel', FORE)).toEqual({ typ: 'ogiltig' })
  })

  it('token saknas, är trasig eller nyckeln saknas på servern', () => {
    const e = kodaEpost('anna@exempel.se')
    expect(tolkaBegaran(new URLSearchParams({ e }), NYCKEL, FORE)).toEqual({ typ: 'ogiltig' })
    expect(tolkaBegaran(new URLSearchParams({ e, t: 'x' }), NYCKEL, FORE)).toEqual({ typ: 'ogiltig' })
    expect(tolkaBegaran(params(avregLank('anna@exempel.se', NYCKEL)), undefined, FORE)).toEqual({ typ: 'ogiltig' })
  })

  it('tokenGiltig jämför säkert även när längden skiljer', () => {
    expect(tokenGiltig('anna@exempel.se', avregToken('anna@exempel.se', NYCKEL), NYCKEL)).toBe(true)
    expect(tokenGiltig('anna@exempel.se', 'kort', NYCKEL)).toBe(false)
    expect(tokenGiltig('anna@exempel.se', '', NYCKEL)).toBe(false)
  })

  it('avkodaEpost avvisar skräp', () => {
    expect(avkodaEpost('!!!')).toBeNull()
    expect(avkodaEpost(kodaEpost('inte-en-adress'))).toBeNull()
    expect(avkodaEpost(kodaEpost('anna@exempel.se'))).toBe('anna@exempel.se')
  })
})

describe('gamla länkar utan token (redan skickade mejl)', () => {
  it('godtas fram till brytdatumet', () => {
    expect(tolkaBegaran(new URLSearchParams('email=anna@exempel.se'), NYCKEL, FORE))
      .toEqual({ typ: 'gammal', email: 'anna@exempel.se' })
  })

  it('efter brytdatumet: hänvisa till info@svalla.se', () => {
    expect(tolkaBegaran(new URLSearchParams('email=anna@exempel.se'), NYCKEL, EFTER))
      .toEqual({ typ: 'gammal_utgangen' })
  })

  it('utan nyckel på servern godtas de alltid (mejlen har då osignerade länkar)', () => {
    expect(tolkaBegaran(new URLSearchParams('email=anna@exempel.se'), undefined, EFTER))
      .toEqual({ typ: 'gammal', email: 'anna@exempel.se' })
  })

  it('"+" som blev mellanslag i en okodad länk återställs', () => {
    // De gamla mallarna URL-kodade inte adressen: a+b@x.se kom fram som "a b@x.se".
    expect(tolkaBegaran(new URLSearchParams('email=anna+segling@exempel.se'), NYCKEL, FORE))
      .toEqual({ typ: 'gammal', email: 'anna+segling@exempel.se' })
  })

  it('ogiltig adress godtas inte', () => {
    expect(tolkaBegaran(new URLSearchParams('email=inget-snabel-a'), NYCKEL, FORE)).toEqual({ typ: 'ogiltig' })
    expect(tolkaBegaran(new URLSearchParams(''), NYCKEL, FORE)).toEqual({ typ: 'ogiltig' })
  })
})

describe('avregLank', () => {
  it('med nyckel: e och t; adressen står inte direkt i länken (den är bara base64-kodad)', () => {
    const lank = avregLank('anna@exempel.se', NYCKEL)
    expect(lank).toMatch(/^https:\/\/svalla\.se\/api\/email\/unsubscribe\?e=[A-Za-z0-9_-]+&t=[A-Za-z0-9_-]+$/)
    expect(lank).not.toContain('anna@')
  })

  it('utan nyckel: gamla formatet, URL-kodat', () => {
    expect(avregLank('Anna+x@Exempel.se', '')).toBe('https://svalla.se/api/email/unsubscribe?email=anna%2Bx%40exempel.se')
  })
})
