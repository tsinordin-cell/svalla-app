// Kategorimenyn på /upptack (2026-11-28).
//
// Knappen "Alla kategorier" fick z-index 2 i d1a10326 så att den ligger över
// regionraden i Safari. Det skapar ett lager. Panelens egna z-index 1000
// gäller bara inuti det lagret, så menyn målades som lager 2: under kartans
// rutor (400) och under listan på mobil (500). Klicket öppnade ändå menyn
// (pilen vände upp, siffran satt kvar) men rutan syntes inte.
// Rubriken ska vara lagret menyn hör till, över de lagren.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const KALLA = readFileSync(join(__dirname, '../app/upptack/UpptackExplorer.tsx'), 'utf8')

function regel(selektor: string): string {
  const start = KALLA.indexOf(selektor)
  expect(start, selektor).toBeGreaterThan(-1)
  const fran = KALLA.indexOf('{', start)
  const till = KALLA.indexOf('}', fran)
  return KALLA.slice(fran + 1, till)
}

function zIndex(block: string): number {
  const m = block.match(/z-index:\s*(\d+)/)
  expect(m, block).not.toBeNull()
  return Number(m?.[1])
}

describe('kategorimenyn på upptack', () => {
  it('rubriken är ett lager över kartan och mobilens lista', () => {
    const header = regel('.upx-header {')
    expect(header).toMatch(/position:\s*relative/)
    const headerZ = zIndex(header)
    const lista = zIndex(regel('.upx-list,\n          .upx-split.list-collapsed .upx-list {'))
    expect(lista).toBe(500)
    expect(headerZ).toBeGreaterThan(lista)
    // Kartans rutor (leaflet-pane) ligger på 400. Attributionen är 500 och
    // ska finnas kvar, men den sitter i nederkanten och delar inte yta med menyn.
    expect(headerZ).toBeGreaterThan(400)
    expect(regel('.upx-attr {')).toMatch(/z-index:\s*500/)
    expect(KALLA).toContain('© OpenStreetMap')
  })

  it('knappen ligger kvar över regionraden', () => {
    const knapp = zIndex(regel('.upx-filterrow .upx-fdd {'))
    const rad = zIndex(regel('.upx-filterrow .upx-regions-bar {'))
    expect(knapp).toBeGreaterThan(rad)
  })
})
