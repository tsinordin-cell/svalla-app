import { describe, it, expect } from 'vitest'
import { kontrolleraLogg } from './loggKontroll'

const T = '2026-11-23T10:00'

describe('kontrolleraLogg', () => {
  it('godkänner tomma fält och samma tid', () => {
    expect(kontrolleraLogg('', '', T, T)).toBeNull()
    expect(kontrolleraLogg('12.5', '90', T, '2026-11-23T11:30')).toBeNull()
    expect(kontrolleraLogg('12,5', '0', T, T)).toBeNull()
  })

  it('stoppar negativ distans och tid', () => {
    expect(kontrolleraLogg('-5', '', T, T)?.falt).toBe('distans')
    expect(kontrolleraLogg('', '-1', T, T)?.falt).toBe('tid')
  })

  it('stoppar Ankrar före Kasta loss', () => {
    expect(kontrolleraLogg('', '', T, '2026-11-23T09:59')?.falt).toBe('tider')
  })

  it('stoppar text som inte är en siffra', () => {
    expect(kontrolleraLogg('abc', '', T, T)?.falt).toBe('distans')
  })
})
