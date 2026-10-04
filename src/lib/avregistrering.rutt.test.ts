import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

// Revision 2026-10-02: GET får aldrig avregistrera (e-postskannrar öppnar
// länkar i förväg). Bara POST – knappen på sidan eller one-click – gör det.
const upserts = vi.hoisted(() => [] as unknown[])
const loggar = vi.hoisted(() => [] as unknown[])
vi.mock('@/lib/supabase-admin', () => ({
  getAdminClient: () => ({
    from: () => ({ upsert: async (rad: unknown) => { upserts.push(rad); return { error: null } } }),
  }),
}))
vi.mock('@/lib/logger', () => ({
  logger: { info: (...a: unknown[]) => loggar.push(a), error: (...a: unknown[]) => loggar.push(a) },
}))

import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/email/unsubscribe/route'
import { avregLank } from './avregistrering'

const NYCKEL = 'rutt-test-nyckel'
const GAMMAL = 'https://svalla.se/api/email/unsubscribe?email=anna@exempel.se'

const begaran = (url: string, method = 'GET', body?: string) =>
  new NextRequest(url, {
    method,
    body,
    headers: body ? { 'content-type': 'application/x-www-form-urlencoded' } : {},
  })

beforeEach(() => {
  upserts.length = 0
  loggar.length = 0
  vi.stubEnv('UNSUBSCRIBE_SECRET', NYCKEL)
  vi.stubEnv('UNSUBSCRIBE_SECRET_PREVIOUS', '')
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-10-10T12:00:00Z'))
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.useRealTimers()
})

describe('/api/email/unsubscribe', () => {
  it('GET med signerad länk visar bekräftelse och avregistrerar inte', async () => {
    const svar = await GET(begaran(avregLank('anna@exempel.se', NYCKEL)))
    const html = await svar.text()
    expect(svar.status).toBe(200)
    expect(html).toContain('<form method="post"')
    expect(html).toContain('name="referrer" content="no-referrer"')
    expect(svar.headers.get('cache-control')).toBe('no-store')
    expect(upserts).toHaveLength(0)
  })

  it('POST (one-click) avregistrerar rätt adress utan att logga den', async () => {
    const svar = await POST(begaran(avregLank('Anna@Exempel.se', NYCKEL), 'POST', 'List-Unsubscribe=One-Click'))
    expect(svar.status).toBe(200)
    expect(upserts).toHaveLength(1)
    expect((upserts[0] as { email: string }).email).toBe('anna@exempel.se')
    expect(JSON.stringify(loggar)).not.toContain('anna@')
  })

  it('POST med ändrad adress ger 400 och avregistrerar inte', async () => {
    const url = new URL(avregLank('anna@exempel.se', NYCKEL))
    url.searchParams.set('e', Buffer.from('bertil@exempel.se').toString('base64url'))
    const svar = await POST(begaran(url.toString(), 'POST'))
    expect(svar.status).toBe(400)
    expect(upserts).toHaveLength(0)
  })

  it('länk med förra nyckeln godtas efter nyckelbyte', async () => {
    vi.stubEnv('UNSUBSCRIBE_SECRET', 'ny-nyckel')
    vi.stubEnv('UNSUBSCRIBE_SECRET_PREVIOUS', NYCKEL)
    const svar = await POST(begaran(avregLank('anna@exempel.se', NYCKEL), 'POST'))
    expect(svar.status).toBe(200)
    expect(upserts).toHaveLength(1)
  })

  it('gammal länk: GET bekräftar, POST avregistrerar', async () => {
    expect((await GET(begaran(GAMMAL))).status).toBe(200)
    expect(upserts).toHaveLength(0)
    expect((await POST(begaran(GAMMAL, 'POST'))).status).toBe(200)
    expect(upserts).toHaveLength(1)
  })

  it('gammal länk efter brytdatumet ger 410', async () => {
    vi.setSystemTime(new Date('2027-02-02T00:00:00Z'))
    expect((await POST(begaran(GAMMAL, 'POST'))).status).toBe(410)
    expect(upserts).toHaveLength(0)
  })
})
