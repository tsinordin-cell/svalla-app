import { describe, it, expect } from 'vitest'
import { regionEtikett } from './regionEtikett'

describe('regionEtikett', () => {
  it('översätter koder som finns i restaurants.archipelago_region', () => {
    expect(regionEtikett('north')).toBe('Norra skärgården')
    expect(regionEtikett('bohuslan')).toBe('Bohuslän')
    expect(regionEtikett('goteborg')).toBe('Göteborgs skärgård')
  })
  it('okänd kod eller tomt ger null – aldrig rå kod till besökaren', () => {
    expect(regionEtikett('nagot_nytt')).toBeNull()
    expect(regionEtikett(null)).toBeNull()
    expect(regionEtikett('')).toBeNull()
  })
})
