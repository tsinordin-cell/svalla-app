import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { SCB_OAR } from '../app/o/scb-oar.generated'
import { befolkningsFaq } from './islandFaqs'

// Ösidorna ligger i två filer (Bohuslän för sig).
const oData = ['island-data.ts', 'bohuslan-data.ts']
  .map(f => readFileSync(new URL(`../app/o/${f}`, import.meta.url), 'utf8'))
  .join('\n')

describe('SCB-statistik per ö', () => {
  it('varje slug finns som ösida', () => {
    for (const slug of Object.keys(SCB_OAR)) {
      expect(oData.includes(`slug: '${slug}'`), slug).toBe(true)
    }
  })

  it('kopplar inte Värmdö-öarna Eknö och Hasselö till SCB:s namnar i Västervik', () => {
    expect(SCB_OAR.ekno).toBeUndefined()
    expect(SCB_OAR.hasselo).toBeUndefined()
  })

  it('FAQ saknas när SCB inte redovisar någon siffra', () => {
    expect(SCB_OAR.grinda?.folkbokforda).toBeNull()
    expect(befolkningsFaq({ slug: 'grinda', name: 'Grinda' })).toBeNull()
  })

  it('FAQ säger vilket namn SCB använder när det skiljer sig', () => {
    const f = befolkningsFaq({ slug: 'sandhamn', name: 'Sandhamn' })
    expect(f?.q).toBe('Hur många bor på Sandhamn?')
    expect(f?.a).toContain('som Sandön')
    expect(f?.a).toContain('31 december 2020')
  })
})
