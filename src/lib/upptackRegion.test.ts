import { describe, it, expect } from 'vitest'
import { upptackRegion } from './upptackRegion'

describe('upptackRegion', () => {
  it('koordinaten avgör före koden', () => {
    // Sandhamn med felaktig kod
    expect(upptackRegion({ latitude: 59.289, longitude: 18.912, archipelago_region: 'bohuslan' })).toBe('stockholm')
  })
  it('sorterar kända platser rätt', () => {
    expect(upptackRegion({ latitude: 60.097, longitude: 19.934 })).toBe('aland') // Mariehamn
    expect(upptackRegion({ latitude: 57.634, longitude: 18.296 })).toBe('gotland') // Visby
    expect(upptackRegion({ latitude: 56.879, longitude: 16.656 })).toBe('oland') // Borgholm
    expect(upptackRegion({ latitude: 57.61, longitude: 11.77 })).toBe('goteborg') // Styrsö
    expect(upptackRegion({ latitude: 58.35, longitude: 11.22 })).toBe('bohuslan') // Smögen
    expect(upptackRegion({ latitude: 59.848, longitude: 19.147 })).toBe('stockholm') // Arholma
  })
  it('faller tillbaka på koden utanför rutorna, annars null', () => {
    expect(upptackRegion({ latitude: null, longitude: null, archipelago_region: 'north' })).toBe('stockholm')
    expect(upptackRegion({ latitude: 56.16, longitude: 15.59, archipelago_region: 'blekinge' })).toBeNull()
  })
})
