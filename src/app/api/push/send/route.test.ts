import { describe, it, expect, vi } from 'vitest'

const ME = '11111111-1111-4111-8111-111111111111'
const DU = '22222222-2222-4222-8222-222222222222'
const skickat: string[] = []

vi.mock('web-push', () => ({ default: { setVapidDetails: () => {}, sendNotification: async (_s: unknown, p: string) => { skickat.push(p) } } }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => true }))
vi.mock('next/headers', () => ({ cookies: async () => ({ getAll: () => [], set: () => {} }) }))
vi.mock('@supabase/ssr', () => ({
  createServerClient: () => ({
    auth: { getUser: async () => ({ data: { user: { id: ME } } }) },
    from: () => ({ select: () => ({ eq: async () => ({ data: [{ endpoint: 'e', p256dh: 'p', auth: 'a' }] }) }) }),
  }),
}))

import { POST } from './route'
const post = (b: unknown) => POST(new Request('https://svalla.se/api/push/send', { method: 'POST', body: JSON.stringify(b) }))

describe('/api/push/send', () => {
  it('nekar push till någon annan', async () => {
    expect((await post({ targetUserId: DU, title: 'Hej', body: 'Klicka här', url: '/x' })).status).toBe(403)
    expect(skickat).toHaveLength(0)
  })
  it('skickar till sig själv och byter externa länkar mot /feed', async () => {
    expect((await post({ targetUserId: ME, title: 'Test', body: 'Test', url: '//exempel.se/x' })).status).toBe(200)
    expect(JSON.parse(skickat[0]!).url).toBe('/feed')
    await post({ targetUserId: ME, title: 'Test', body: 'Test', url: '/\\exempel.se' })
    expect(JSON.parse(skickat[1]!).url).toBe('/feed')
    await post({ targetUserId: ME, title: 'Test', body: 'Test', url: '/tur/abc' })
    expect(JSON.parse(skickat[2]!).url).toBe('/tur/abc')
  })
})
