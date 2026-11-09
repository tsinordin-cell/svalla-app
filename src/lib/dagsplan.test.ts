import { describe, it, expect } from 'vitest'
import { dagIslands, rankDagIslands, getDagHub } from './dagsplan'

/**
 * P0 20 del 3 och P0 21 (2026-11-09): dagsplaneraren (/utflykt) visade Utö,
 * Ornö och Fjärdlång under "öar från Nynäshamn" året om. Vår och höst går
 * båten från Nynäshamn till Nåttarö och Ålö (Waxholmsbolagets tabell 22);
 * Utö nås från Årsta brygga och Ornö och Fjärdlång från Dalarö. Bara
 * Nord/Sydlinjen går sommartid från Nynäshamn till dem, och planeraren visar
 * ingen säsong.
 */
describe('dagsplan: startpunkten Nynäshamn', () => {
  const nynashamn = rankDagIslands(dagIslands(), 'nynashamn', []).map(i => i.slug)

  it('visar inte Utö, Ornö eller Fjärdlång', () => {
    for (const slug of ['uto', 'orno', 'fjardlang']) expect(nynashamn).not.toContain(slug)
  })

  it('visar Nåttarö och Landsort', () => {
    expect(nynashamn).toContain('nattaro')
    expect(nynashamn).toContain('landsort')
  })

  it('exclude gäller även om ösidans text nämner Nynäshamn', () => {
    expect(getDagHub('nynashamn')?.exclude).toContain('uto')
  })
})
