// Spärr för GUIDER_UTAN_INNEHALL (2026-09-29). En guide som saknar innehåll i
// guide-content.ts visar platshållaren "Innehåll kommer snart" och ska stå i
// listan (noindex, ur sitemapen och listorna). En guide med riktigt innehåll
// får inte stå kvar där — då skulle den skrivna guiden förbli osynlig.
//
// guide-content.ts läses som text: den importerar via '@/'-alias, som vitest
// här inte har, och 21 000 rader mallsträngar behöver inte köras för att se
// vilka nycklar som finns.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { GUIDES, GUIDER_UTAN_INNEHALL, PUBLICERADE_GUIDER } from '../app/guider/guides-data'

const kalla = readFileSync(join(__dirname, '../app/guider/[slug]/guide-content.ts'), 'utf8')
const nycklar = new Set([...kalla.matchAll(/^\s*['"]?([a-z0-9-]+)['"]?\s*:\s*`/gm)].map(m => m[1]))

describe('guider utan innehåll', () => {
  const utan = GUIDES.map(g => g.slug).filter(s => !nycklar.has(s)).sort()

  it('listan stämmer exakt med guiderna som saknar innehåll', () => {
    expect([...GUIDER_UTAN_INNEHALL].sort()).toEqual(utan)
  })

  it('PUBLICERADE_GUIDER innehåller ingen platshållare', () => {
    expect(PUBLICERADE_GUIDER.some(g => GUIDER_UTAN_INNEHALL.has(g.slug))).toBe(false)
    expect(PUBLICERADE_GUIDER.length + GUIDER_UTAN_INNEHALL.size).toBe(GUIDES.length)
  })
})
