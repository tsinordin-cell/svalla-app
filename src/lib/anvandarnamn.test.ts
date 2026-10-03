import { describe, it, expect, vi, beforeEach } from 'vitest'

// revision 2026-10-02: falsk Supabase-klient. eq jämför exakt, ilike tolkar
// mönstret som Postgres gör (\ escapar, % och _ är jokertecken, inget skiftläge).
const ANVANDARE = ['Elin', 'Kalle', 'kalle', 'ann_li']
const anrop: string[] = []

function likeTillRegex(monster: string): RegExp {
  let re = ''
  for (let i = 0; i < monster.length; i++) {
    const c = monster[i]!
    if (c === '\\') { re += (monster[++i] ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); continue }
    re += c === '%' ? '.*' : c === '_' ? '.' : c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }
  return new RegExp(`^${re}$`, 'i')
}

vi.mock('./supabase-server', () => ({
  createPublicSupabaseClient: () => ({
    from: () => ({
      select: () => ({
        eq: (_kol: string, varde: string) => ({
          maybeSingle: async () => {
            anrop.push(`eq:${varde}`)
            const traff = ANVANDARE.find(u => u === varde)
            return { data: traff ? { username: traff } : null, error: null }
          },
        }),
        ilike: (_kol: string, monster: string) => ({
          limit: async (n: number) => {
            anrop.push(`ilike:${monster}`)
            const re = likeTillRegex(monster)
            return { data: ANVANDARE.filter(u => re.test(u)).slice(0, n).map(username => ({ username })), error: null }
          },
        }),
      }),
    }),
  }),
}))

import { hittaAnvandarnamn, ilikeExakt } from './anvandarnamn'

beforeEach(() => { anrop.length = 0 })

describe('ilikeExakt', () => {
  it('escapar \\ % _ och vägrar *', () => {
    expect(ilikeExakt('elin')).toBe('elin')
    expect(ilikeExakt('ann_li')).toBe('ann\\_li')
    expect(ilikeExakt('50%')).toBe('50\\%')
    expect(ilikeExakt('a\\b')).toBe('a\\\\b')
    expect(ilikeExakt('a*')).toBeNull()
  })
})

describe('hittaAnvandarnamn', () => {
  it('exakt träff: ett enda uppslag, som förut', async () => {
    expect(await hittaAnvandarnamn('Elin')).toBe('Elin')
    expect(anrop).toEqual(['eq:Elin'])
  })
  it('fel skiftläge hittar rätt namn', async () => {
    expect(await hittaAnvandarnamn('elin')).toBe('Elin')
    expect(await hittaAnvandarnamn('ELIN')).toBe('Elin')
    expect(await hittaAnvandarnamn('ANN_LI')).toBe('ann_li')
  })
  it('namn som bara skiljer i skiftläge: exakt träff vinner, annars 404', async () => {
    expect(await hittaAnvandarnamn('kalle')).toBe('kalle')
    expect(await hittaAnvandarnamn('Kalle')).toBe('Kalle')
    expect(await hittaAnvandarnamn('KALLE')).toBeNull()
  })
  it('jokertecken i adressen matchar inte andra användare', async () => {
    expect(await hittaAnvandarnamn('el_n')).toBeNull()
    expect(await hittaAnvandarnamn('e%')).toBeNull()
    expect(await hittaAnvandarnamn('e*')).toBeNull()
    expect(await hittaAnvandarnamn('okand')).toBeNull()
  })
})
