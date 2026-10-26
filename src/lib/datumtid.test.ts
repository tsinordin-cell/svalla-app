import { describe, it, expect } from 'vitest'
import { formateraDatumTid } from './datumtid'

describe('formateraDatumTid', () => {
  it('visar svensk veckodag, dag, månad och klockslag', () => {
    expect(formateraDatumTid('2026-10-25T17:11')).toBe('sön 25 okt · 17:11')
    expect(formateraDatumTid('2026-07-15T09:05')).toBe('ons 15 juli · 09:05')
  })
  it('lämnar ogiltiga värden orörda', () => {
    expect(formateraDatumTid('')).toBe('')
    expect(formateraDatumTid('nonsens')).toBe('nonsens')
  })
})
