import { describe, it, expect } from 'vitest'
import { KPIS, medMal, giltigaMal, currentStage, targetFor, type KpiValues } from './roadmap-config'

const noll = Object.fromEntries(KPIS.map(k => [k.key, 0])) as KpiValues

describe('justerbara mål (2026-11-28)', () => {
  it('utan ändrade mål gäller standardmålen', () => {
    expect(medMal({}).map(k => k.targets)).toEqual(KPIS.map(k => k.targets))
    expect(medMal(null)).toEqual(KPIS)
  })

  it('ett ändrat mål ersätter bara det nyckeltalet', () => {
    const lista = medMal({ partners: [5, 20, 50] })
    expect(targetFor(lista.find(k => k.key === 'partners')!, 1)).toBe(5)
    expect(lista.find(k => k.key === 'subs')!.targets).toEqual([1_000, 5_000, 15_000])
  })

  it('steget räknas mot de ändrade målen', () => {
    const allaUppfyllda = Object.fromEntries(KPIS.map(k => [k.key, k.targets[0]])) as KpiValues
    expect(currentStage(allaUppfyllda)).toBe(2)
    // Höjt partnermål för steg 1 gör att steg 1 inte längre är nått.
    expect(currentStage(allaUppfyllda, medMal({ partners: [10, 20, 50] }))).toBe(1)
    expect(currentStage(noll)).toBe(1)
  })

  it('godkänner bara mål som är större än noll och stiger', () => {
    expect(giltigaMal([3, 15, 40])).toBe(true)
    expect(giltigaMal([3, 3, 3])).toBe(true)
    expect(giltigaMal([0, 15, 40])).toBe(false)
    expect(giltigaMal([20, 15, 40])).toBe(false)
    expect(giltigaMal([3, 15, Number.NaN])).toBe(false)
  })
})
