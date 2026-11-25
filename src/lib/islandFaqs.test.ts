// FAQ-svaret om boende (Kontrollantens fynd mo01-k004; mallarnas runda 7, 2026-11-17).
import { describe, it, expect } from 'vitest'
import { getFaqsForIsland } from './islandFaqs'
import { getIsland } from '@/app/o/island-data'

const svar = (slug: string) => getFaqsForIsland(getIsland(slug)!).find(f => f.q.startsWith('Finns det boende'))?.a

describe('boende-FAQ:n', () => {
  it('svarar inte "Ja" när boendet ligger på en annan ö eller ort', () => {
    expect(svar('vindo')).toBe('På Svalla finns inget boende på själva Vindö. Nära ön finns Djurönäset.')
    expect(svar('ockero')).toMatch(/^På Svalla finns inget boende på själva Öckerö\. Nära ön finns Skärgårdshotellet Hönö\.$/)
  })
  it('skiljer boende på ön från boende nära ön', () => {
    expect(svar('dalaro')).toMatch(/^Ja\. På Svalla finns .*\. Nära ön finns också Smådalarö Gård\.$/)
  })
  it('stryker inte klockslag när stryk är false (Toms beslut 10)', () => {
    const ö = { slug: 'x', name: 'X', getting_there: [{ method: 'Båt', desc: 'Båten går 09.00. Högst sex personer.', icon: '⛴' }], restaurants: [], accommodation: [], harbors: [] } as never
    expect(getFaqsForIsland(ö)[0]!.a).toContain('Högst sex personer.')
    expect(getFaqsForIsland(ö)[0]!.a).not.toContain('09.00')
    expect(getFaqsForIsland(ö, { stryk: false })[0]!.a).toContain('09.00')
  })
})
