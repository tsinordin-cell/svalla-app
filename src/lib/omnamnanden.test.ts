import { describe, it, expect } from 'vitest'
import { omnamndaNamn, namner, hittaOmnamnda } from './omnamnanden'
import { NAMN_I_OMNAMNANDE } from './omnamnanden'
import { extractMentions as forumMentions } from './forum-mentions'
import type { SupabaseClient } from '@supabase/supabase-js'

describe('omnamndaNamn', () => {
  it('tar med . och - inne i namnet men inte sist', () => {
    expect(omnamndaNamn('Hej @max.berg och @anna-li!')).toEqual(['max.berg', 'anna-li'])
    expect(omnamndaNamn('Tack @max.')).toEqual(['max'])
    expect(omnamndaNamn('skriv till a@exempel.se')).toEqual([])
    expect(omnamndaNamn('@a')).toEqual([])
    expect(omnamndaNamn('ses @10.30 eller @2-3')).toEqual([])
  })
  it('namner jämför hela namnet, skiftlägesokänsligt', () => {
    expect(namner('hej @Elin', 'elin')).toBe(true)
    expect(namner('hej @max.berg', 'max')).toBe(false)
    expect(namner('hej @maxi', 'max')).toBe(false)
  })
})

describe('kommentarer och forum använder samma namnregel', () => {
  // mentions.tsx (parseTokens) innehåller JSX och kan inte laddas i vitest; den bygger sitt
  // mönster av samma NAMN_I_OMNAMNANDE, som provas här i samma form som där.
  it('kommentarsmönstret och forumets extractMentions läser max.berg som ett namn', () => {
    const kommentarer = new RegExp(`(@${NAMN_I_OMNAMNANDE})|(#[a-zA-Z0-9_\\u00C0-\\u024F]{2,50})`, 'g')
    expect([...'hej @max.berg #skärgård'.matchAll(kommentarer)].map(m => m[0])).toEqual(['@max.berg', '#skärgård'])
    expect(forumMentions('hej @Max.Berg och @x-y')).toEqual(['max.berg', 'x-y'])
  })
})

describe('hittaOmnamnda', () => {
  const anvandare = [
    { id: '1', username: 'Elin' },
    { id: '2', username: 'max.berg' },
    { id: '3', username: 'Kim' }, { id: '4', username: 'kim' },
  ]
  const db = {
    from: () => ({
      select: () => ({
        ilike: (_k: string, monster: string) => ({
          limit: async () => ({
            data: anvandare.filter(u => u.username.toLowerCase() === monster.replace(/\\(.)/g, '$1').toLowerCase()),
          }),
        }),
      }),
    }),
  } as unknown as SupabaseClient

  it('hittar namn oavsett skiftläge och med punkt', async () => {
    expect(await hittaOmnamnda(db, ['elin', 'Max.Berg'])).toEqual([anvandare[0], anvandare[1]])
  })
  it('vid två namn som bara skiljer i skiftläge vinner exakt skiftläge, annars ingen', async () => {
    expect(await hittaOmnamnda(db, ['kim'])).toEqual([{ id: '4', username: 'kim' }])
    expect(await hittaOmnamnda(db, ['KIM'])).toEqual([])
  })
})
