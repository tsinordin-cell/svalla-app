import { describe, it, expect } from 'vitest'
import { operatorRad, OPERATOR_NAMN, OPERATOR_ORGNR } from './villkor'

describe('operatorRad', () => {
  it('visar ingenting förrän båda fälten är ifyllda', () => {
    expect(operatorRad(null, null)).toBeNull()
    expect(operatorRad('Exempel AB', null)).toBeNull()
    expect(operatorRad(null, '000000-0000')).toBeNull()
  })
  it('bygger raden när båda finns', () => {
    expect(operatorRad('Exempel AB', '000000-0000'))
      .toBe('Svalla drivs av Exempel AB, organisationsnummer 000000-0000.')
  })
  it('inga påhittade uppgifter i koden ännu', () => {
    expect(OPERATOR_NAMN).toBeNull()
    expect(OPERATOR_ORGNR).toBeNull()
  })
})
