/**
 * Låser beslutet från 2026-09-04: /tur/[id] är viewer-medveten.
 *  - Publik tur: läses ur cachen (anon-klient).
 *  - Privat tur: anon ser inget (null) → ägaren läser med sin egen klient.
 *  - Raderad tur: null oavsett klient.
 *  - Cachen får ALDRIG innehålla något som anon inte får se.
 */
import { describe, it, expect, vi } from 'vitest'

// next/cache finns inte i vitest — ersätt unstable_cache med en genomgång
// som registrerar taggar, så vi kan verifiera att rätt tagg sätts.
const tagsSeen: string[][] = []
vi.mock('next/cache', () => ({
  unstable_cache: (fn: () => Promise<unknown>, _keys: string[], opts: { tags: string[] }) => {
    tagsSeen.push(opts.tags)
    return fn
  },
}))

// Anon-klient: en fejk-Supabase som bara "ser" publika turer.
type Row = Record<string, unknown>
function fakeClient(visibleTrips: Row[]) {
  const table = (name: string) => {
    let rows: Row[] = name === 'trips' ? visibleTrips : []
    const q: Record<string, unknown> = {}
    const chain = () => q
    Object.assign(q, {
      select: chain, eq: (col: string, v: unknown) => { rows = rows.filter(r => r[col] === v); return q },
      is: (col: string, v: unknown) => { rows = rows.filter(r => r[col] === v); return q },
      in: chain, order: chain, limit: chain,
      single: async () => rows[0] ? { data: rows[0], error: null } : { data: null, error: { message: 'no rows' } },
      maybeSingle: async () => ({ data: rows[0] ?? null, error: null }),
      then: (res: (v: { data: Row[]; error: null }) => void) => res({ data: rows, error: null }),
    })
    return q
  }
  return { from: table } as never
}
vi.mock('./supabase-server', () => ({
  createPublicSupabaseClient: () => fakeClient([PUBLIC_TRIP]),
}))

const PUBLIC_TRIP  = { id: 'pub-1',  user_id: 'u1', visibility: 'public',  status: 'done', deleted_at: null, route_points: null, started_at: null }
const PRIVATE_TRIP = { id: 'priv-1', user_id: 'u1', visibility: 'private', status: 'done', deleted_at: null, route_points: null, started_at: null }

import { getCachedPublicTripBundle, loadTripBundle, tripCacheTag } from './trip-cache'

describe('trip-cache — en tursida, per betraktare', () => {
  it('publik tur hämtas ur cachen med tagg trip:<id>', async () => {
    const b = await getCachedPublicTripBundle('pub-1')
    expect(b?.trip.id).toBe('pub-1')
    expect(tagsSeen.at(-1)).toEqual([tripCacheTag('pub-1')])
  })

  it('privat tur är null för anon — cachen innehåller aldrig privat data', async () => {
    const b = await getCachedPublicTripBundle('priv-1')
    expect(b).toBeNull()
  })

  it('ägaren läser sin privata tur med sin egen klient (RLS släpper igenom)', async () => {
    const ownerClient = fakeClient([PUBLIC_TRIP, PRIVATE_TRIP])
    const b = await loadTripBundle('priv-1', ownerClient)
    expect(b?.trip.id).toBe('priv-1')
  })

  it('raderad tur är null även för ägaren', async () => {
    const ownerClient = fakeClient([{ ...PRIVATE_TRIP, id: 'del-1', deleted_at: '2026-09-01T00:00:00Z' }])
    expect(await loadTripBundle('del-1', ownerClient)).toBeNull()
  })

  it('taggen är stabil per tur — det är den revalidateTag måste träffa', () => {
    expect(tripCacheTag('abc')).toBe('trip:abc')
  })
})
