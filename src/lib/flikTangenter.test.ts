import { describe, expect, it } from 'vitest'
import { nastaFlik } from './flikTangenter'

describe('nastaFlik', () => {
  it('höger går framåt och börjar om efter sista', () => {
    expect(nastaFlik('ArrowRight', 0, 3)).toBe(1)
    expect(nastaFlik('ArrowRight', 2, 3)).toBe(0)
  })
  it('vänster går bakåt och hoppar till sista från första', () => {
    expect(nastaFlik('ArrowLeft', 1, 3)).toBe(0)
    expect(nastaFlik('ArrowLeft', 0, 3)).toBe(2)
  })
  it('Home och End', () => {
    expect(nastaFlik('Home', 2, 5)).toBe(0)
    expect(nastaFlik('End', 0, 5)).toBe(4)
  })
  it('andra tangenter och tom rad gör ingenting', () => {
    expect(nastaFlik('ArrowDown', 0, 3)).toBeNull()
    expect(nastaFlik('Enter', 0, 3)).toBeNull()
    expect(nastaFlik('ArrowRight', 0, 0)).toBeNull()
  })
})
