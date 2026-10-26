import { describe, it, expect, vi } from 'vitest'

// next/cache finns inte i vitest — samma knep som i trip-cache.test.ts.
vi.mock('next/cache', () => ({ unstable_cache: (fn: unknown) => fn }))

import { summarize, fyllLuckor } from './gsc'

const dag = (date: string, clicks: number, impressions: number, position = 10) => ({ date, clicks, impressions, position })

describe('fyllLuckor', () => {
  it('fyller dagar Google utelämnar med nollor', () => {
    const out = fyllLuckor([dag('2026-09-01', 1, 10), dag('2026-09-04', 2, 20)])
    expect(out.map(d => d.date)).toEqual(['2026-09-01', '2026-09-02', '2026-09-03', '2026-09-04'])
    expect(out[1]?.clicks).toBe(0)
  })
  it('tom lista ger tom lista', () => {
    expect(fyllLuckor([])).toEqual([])
  })
})

describe('summarize', () => {
  it('räknar senaste 28 kalenderdagar och milstolpar på rullande fönster', () => {
    const days = Array.from({ length: 60 }, (_, i) => {
      const d = new Date(Date.UTC(2026, 7, 1) + i * 86_400_000).toISOString().slice(0, 10)
      return dag(d, 5, 100, 8)
    })
    const s = summarize(days)
    expect(s.clicks28).toBe(140)
    expect(s.impressions28).toBe(2800)
    expect(s.clicksPrev28).toBe(140)
    expect(s.position28).toBeCloseTo(8)
    // 100 klick i ett 28-dagarsfönster nås dag 20 (5 × 20).
    expect(s.clickMilestones.find(m => m.threshold === 100)?.reachedAt).toBe('2026-08-20')
    expect(s.clickMilestones.find(m => m.threshold === 500)?.reachedAt).toBeNull()
    expect(s.weeks.length).toBe(8)
  })
})
