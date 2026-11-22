import { describe, it, expect } from 'vitest'
import { operatorRad, ANSVARIG } from './villkor'

describe('operatorRad', () => {
  it('visar ingenting utan uppgifter', () => {
    expect(operatorRad(null)).toBeNull()
    expect(operatorRad({ typ: 'bolag', namn: 'Exempel AB', orgNr: ' ' })).toBeNull()
    expect(operatorRad({ typ: 'personer', namn: [' '] })).toBeNull()
  })
  it('bolag', () => {
    expect(operatorRad({ typ: 'bolag', namn: 'Exempel AB', orgNr: '000000-0000' }))
      .toBe('Svalla drivs av Exempel AB, organisationsnummer 000000-0000.')
  })
  it('en eller flera privatpersoner', () => {
    expect(operatorRad({ typ: 'personer', namn: ['Anna Exempel'] }))
      .toBe('Svalla drivs av Anna Exempel som privatperson.')
    expect(operatorRad({ typ: 'personer', namn: ['Anna Exempel', 'Bo Exempel'] }))
      .toBe('Svalla drivs av Anna Exempel och Bo Exempel som privatpersoner.')
  })
  it('inga påhittade uppgifter i koden', () => {
    expect(ANSVARIG).toBeNull()
  })
})
