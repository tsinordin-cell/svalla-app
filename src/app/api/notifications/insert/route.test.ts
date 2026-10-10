import { describe, it, expect, vi, beforeEach } from 'vitest'

const ME = '11111111-1111-4111-8111-111111111111'
const DU = '22222222-2222-4222-8222-222222222222'
const TUR = '33333333-3333-4333-8333-333333333333'
const KONV = '44444444-4444-4444-8444-444444444444'

let taggFinns = false
let deltagare: string[] = []
const insert = vi.fn(async () => ({ error: null }))

function kedja(tabell: string) {
  const q: Record<string, unknown> = {}
  const self = () => q
  Object.assign(q, {
    select: self, eq: self, limit: self,
    in: async () => ({ data: deltagare.map(user_id => ({ user_id })) }),
    maybeSingle: async () => ({ data: taggFinns ? { trip_id: TUR } : null }),
    insert,
  })
  if (tabell === 'notifications') return { insert }
  return q
}
vi.mock('@/lib/supabase-admin', () => ({ getAdminClient: () => ({ from: kedja }) }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => true }))
vi.mock('next/headers', () => ({ cookies: async () => ({ getAll: () => [], set: () => {} }) }))
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({ auth: { getUser: async () => ({ data: { user: { id: ME } } }) } }),
}))

import { POST } from './route'
const post = (b: unknown) => POST(new Request('https://svalla.se/api/notifications/insert', { method: 'POST', body: JSON.stringify(b) }))

describe('/api/notifications/insert relationskontroll', () => {
  beforeEach(() => { insert.mockClear(); taggFinns = false; deltagare = [] })

  it('tag utan taggning ger 403', async () => {
    expect((await post({ targetUserId: DU, type: 'tag', tripId: TUR })).status).toBe(403)
    expect(insert).not.toHaveBeenCalled()
  })
  it('tag med taggning skapar notisen', async () => {
    taggFinns = true
    expect((await post({ targetUserId: DU, type: 'tag', tripId: TUR })).status).toBe(200)
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({ user_id: DU, actor_id: ME, type: 'tag', trip_id: TUR }))
  })
  it('message kräver att båda är med i konversationen', async () => {
    deltagare = [ME]
    expect((await post({ targetUserId: DU, type: 'message', conversationId: KONV })).status).toBe(403)
    deltagare = [ME, DU]
    expect((await post({ targetUserId: DU, type: 'message', conversationId: KONV })).status).toBe(200)
  })
  it('message utan conversationId ger 400', async () => {
    expect((await post({ targetUserId: DU, type: 'message' })).status).toBe(400)
  })
})
