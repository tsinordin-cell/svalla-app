/**
 * seaPathfinder.test.ts — regression-tester för routing safety layer.
 *
 * Skapad 2026-05-23, återskapad 2026-05-23 efter partial revert.
 * Skyddar invarianter som infördes som del av safety-layer:
 * 1. findSeaPathWithQuality returnerar ALDRIG en straight-fallback tyst.
 * 2. När path returneras får den ALDRIG korsa land (validatePathLand passes).
 * 3. Endpoint-check: inland-punkter (>5 km från saltvatten) → unavailable.
 * 4. qualityToConfidence mappar korrekt 0–5.
 */

import { describe, it, expect } from 'vitest'
import {
  findSeaPath,
  findSeaPathWithQuality,
  qualityToConfidence,
  calculatePathDistance,
  type RouteQuality,
} from './seaPathfinder'
import { validatePathLand } from './landMask'

// ── qualityToConfidence ─────────────────────────────────────────────────────

describe('qualityToConfidence', () => {
  it('mappar precomputed → 5', () => {
    expect(qualityToConfidence('precomputed')).toBe(5)
  })
  it('mappar grid → 4', () => {
    expect(qualityToConfidence('grid')).toBe(4)
  })
  it('mappar waypoint → 3', () => {
    expect(qualityToConfidence('waypoint')).toBe(3)
  })
  it('mappar unavailable → 0', () => {
    expect(qualityToConfidence('unavailable')).toBe(0)
  })
})

// ── findSeaPathWithQuality — safety invariants ──────────────────────────────

describe('findSeaPathWithQuality — safety invariants', () => {
  it('returnerar aldrig quality: "straight" (borttagen 2026-05-23)', () => {
    const result = findSeaPathWithQuality(59.32, 18.10, 59.30, 18.55)
    const validQualities: RouteQuality[] = ['precomputed', 'grid', 'waypoint', 'unavailable']
    expect(validQualities).toContain(result.quality)
    expect(result.quality as string).not.toBe('straight')
  })

  it('Stadshuskajen → Tullinge (inland-sjö) returnerar unavailable', () => {
    // Stadshuskajen ~ 59.327, 18.054 (saltvatten)
    // Tullinge Båtsällskap ~ 59.181, 17.892 (Tullingesjön, insjö, ~15 km från saltvatten)
    const result = findSeaPathWithQuality(59.327, 18.054, 59.181, 17.892)
    expect(result.quality).toBe('unavailable')
    expect(result.path).toBeNull()
  }, 30_000)

  it('returnerad path korsar aldrig land om path !== null', () => {
    const result = findSeaPathWithQuality(59.33, 18.07, 59.29, 18.92)
    if (result.path) {
      const validation = validatePathLand(result.path)
      expect(validation.ok).toBe(true)
      expect(result.path.length).toBeGreaterThanOrEqual(2)
    }
  }, 120_000)
})

// ── findSeaPath legacy — backwards compat for planner.ts ────────────────────

describe('findSeaPath (legacy) — backwards compat', () => {
  it('returnerar alltid Array<[number, number]> (aldrig null) för planner.ts', () => {
    const path = findSeaPath(59.33, 18.07, 59.29, 18.92)
    expect(Array.isArray(path)).toBe(true)
    expect(path.length).toBeGreaterThanOrEqual(2)
    expect(path[0]).toEqual([59.33, 18.07])
    expect(path[path.length - 1]).toEqual([59.29, 18.92])
  }, 120_000)

  it('fallback till straight ger 2-punkts-array (start+end) för inland', () => {
    // Tullinge → annan inland-punkt
    const path = findSeaPath(59.181, 17.892, 59.20, 17.95)
    expect(path.length).toBeGreaterThanOrEqual(2)
    expect(path[0]).toEqual([59.181, 17.892])
  }, 30_000)
})

// ── calculatePathDistance ────────────────────────────────────────────────────

describe('calculatePathDistance', () => {
  it('returnerar 0 för en enda punkt', () => {
    expect(calculatePathDistance([[59.32, 18.07]])).toBe(0)
  })
  it('beräknar haversine-summa för flera segment', () => {
    const path: [number, number][] = [
      [59.32, 18.07],
      [59.32, 18.17],
      [59.32, 18.27],
    ]
    const total = calculatePathDistance(path)
    expect(total).toBeGreaterThan(10)
    expect(total).toBeLessThan(13)
  })
})
