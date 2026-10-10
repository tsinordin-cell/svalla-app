import { describe, it, expect, vi, beforeEach } from 'vitest'

const ME = '11111111-1111-4111-8111-111111111111'
const DU = '22222222-2222-4222-8222-222222222222'
const TUR = '33333333-3333-4333-8333-333333333333'

const insert = vi.fn(async (_rad: unknown): Promise<{ error: null | { code: string } }> => ({ error: null }))
const push = vi.fn(async () => {})
let bedomning: unknown = { ok: true, rad: { user_id: DU, actor_id: ME, type: 'like', trip_id: TUR }, push: { title: 't', body: 'b', url: '/tur/x' } }

vi.mock('@/lib/supabase-admin', () => ({ getAdminClient: () => ({ from: () => ({ insert }) }) }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => true }))
vi.mock('@/lib/push-server', () => ({ sendPushToUsers: (...a: unknown[]) => push(...(a as [])) }))
vi.mock('@/lib/notisRegler', async (orig) => {
  const riktig = await orig<typeof import('@/lib/notisRegler')>()
  return { ...riktig, notisDb: () => ({}), bedomNotis: async () => bedomning }
})
vi.mock('next/headers', () => ({ cookies: async () => ({ getAll: () => [], set: () => {} }) }))
vi.mock('next/server', async (orig) => ({ ...(await orig<typeof import('next/server')>()), after: (fn: () => unknown) => { void fn() } }))
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({ auth: { getUser: async () => ({ data: { user: { id: ME } } }) } }),
}))

import { POST } from './route'
const post = (b: unknown) => POST(new Request('https://svalla.se/api/notifications/insert', { method: 'POST', body: JSON.stringify(b) }))

describe('/api/notifications/insert', () => {
  beforeEach(() => { insert.mockClear(); push.mockClear() })

  it('avvisar typer som skapas av servern själv', async () => {
    expect((await post({ targetUserId: DU, type: 'forum_reply' })).status).toBe(400)
    expect((await post({ targetUserId: DU, type: 'listing_saved' })).status).toBe(400)
  })
  it('sparar raden från regelbedömningen och skickar serverns push', async () => {
    const res = await post({ targetUserId: DU, type: 'like', tripId: TUR, referenceId: 'ignoreras' })
    expect(res.status).toBe(200)
    expect(insert).toHaveBeenCalledWith({ user_id: DU, actor_id: ME, type: 'like', trip_id: TUR })
    expect(push).toHaveBeenCalledWith([DU], { title: 't', body: 'b', url: '/tur/x' })
  })
  it('403 från reglerna skapar ingen notis', async () => {
    bedomning = { ok: false, status: 403, fel: 'Ingen gillning' }
    expect((await post({ targetUserId: DU, type: 'like', tripId: TUR })).status).toBe(403)
    expect(insert).not.toHaveBeenCalled()
    expect(push).not.toHaveBeenCalled()
  })
  it('dubblett ger 200 utan ny notis', async () => {
    bedomning = { ok: 'hoppa', skal: 'dubblett' }
    const res = await post({ targetUserId: DU, type: 'like', tripId: TUR })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, skipped: 'dubblett' })
    expect(insert).not.toHaveBeenCalled()
  })
  it('unik-konflikt i databasen räknas som dubblett, utan push', async () => {
    bedomning = { ok: true, rad: { user_id: DU, actor_id: ME, type: 'like', trip_id: TUR, reference_id: TUR }, push: { title: 't', body: 'b', url: '/x' } }
    insert.mockResolvedValueOnce({ error: { code: '23505' } })
    const res = await post({ targetUserId: DU, type: 'like', tripId: TUR })
    expect(await res.json()).toEqual({ ok: true, skipped: 'dubblett' })
    expect(push).not.toHaveBeenCalled()
  })
  it('notis till sig själv hoppas över', async () => {
    expect(await (await post({ targetUserId: ME, type: 'follow' })).json()).toEqual({ ok: true, skipped: true })
  })
})
