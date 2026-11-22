import { describe, expect, it } from 'vitest'
import { forstaRaden, tolkaDsn, vidarebefordringsAdress } from './sentryTunnel'

const MAL = { host: 'o111.ingest.de.sentry.io', projektId: '4242' }

describe('tolkaDsn', () => {
  it('läser värd och projekt-id', () => {
    expect(tolkaDsn('https://abc@o111.ingest.de.sentry.io/4242')).toEqual(MAL)
  })
  it('säger nej till tomt, http och konstiga projekt-id', () => {
    expect(tolkaDsn(undefined)).toBeNull()
    expect(tolkaDsn('')).toBeNull()
    expect(tolkaDsn('http://abc@o111.ingest.de.sentry.io/4242')).toBeNull()
    expect(tolkaDsn('https://abc@o111.ingest.de.sentry.io/x/4242')).toBeNull()
    expect(tolkaDsn('inte en adress')).toBeNull()
  })
})

describe('vidarebefordringsAdress', () => {
  it('skickar vidare envelopes till vårt eget projekt', () => {
    const rad = JSON.stringify({ dsn: 'https://abc@o111.ingest.de.sentry.io/4242', event_id: 'e' })
    expect(vidarebefordringsAdress(rad, MAL)).toBe('https://o111.ingest.de.sentry.io/api/4242/envelope/')
  })
  it('vägrar andra värdar och andra projekt', () => {
    const annanVard = JSON.stringify({ dsn: 'https://abc@evil.example.com/4242' })
    const annatProjekt = JSON.stringify({ dsn: 'https://abc@o111.ingest.de.sentry.io/9999' })
    expect(vidarebefordringsAdress(annanVard, MAL)).toBeNull()
    expect(vidarebefordringsAdress(annatProjekt, MAL)).toBeNull()
  })
  it('vägrar trasig rubrik eller rubrik utan dsn', () => {
    expect(vidarebefordringsAdress('{inte json', MAL)).toBeNull()
    expect(vidarebefordringsAdress('{}', MAL)).toBeNull()
    expect(vidarebefordringsAdress('null', MAL)).toBeNull()
  })
})

describe('forstaRaden', () => {
  it('tar bara första raden', () => {
    const bytes = new TextEncoder().encode('{"dsn":"x"}\n{"type":"event"}\n{}')
    expect(forstaRaden(bytes)).toBe('{"dsn":"x"}')
  })
  it('klarar envelope utan radbrytning', () => {
    expect(forstaRaden(new TextEncoder().encode('{"a":1}'))).toBe('{"a":1}')
  })
})
