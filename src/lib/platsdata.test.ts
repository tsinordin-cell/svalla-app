import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PLATSDATA_URL, startaPlatshamtning, tagPlatssvar } from '../app/upptack/platsdata'

// Ett anrop delas mellan UpptackLoader (startar) och UpptackExplorer (tar).
// Nästa montering hämtar på nytt; misslyckade svar sparas inte.
const anrop: string[] = []
let svar: () => Promise<Response>

beforeEach(() => {
  anrop.length = 0
  svar = async () => new Response(JSON.stringify([{ id: 'a' }]), { status: 200, headers: { 'content-type': 'application/json' } })
  vi.stubGlobal('fetch', vi.fn((url: string) => { anrop.push(url); return svar() }))
})
afterEach(() => { vi.unstubAllGlobals() })

describe('platsdata', () => {
  it('starta + tag ger ett enda anrop och samma data', async () => {
    const p1 = startaPlatshamtning()
    const p2 = tagPlatssvar()
    expect(p2).toBe(p1)
    const s = await p2
    expect(anrop).toEqual([PLATSDATA_URL])
    expect(s.ok).toBe(true)
    expect(s.data).toEqual([{ id: 'a' }])
  })

  it('efter tag hämtas på nytt vid nästa montering', async () => {
    await tagPlatssvar()
    await tagPlatssvar()
    expect(anrop).toHaveLength(2)
  })

  it('tag utan föregående start fungerar ensam', async () => {
    const s = await tagPlatssvar()
    expect(s.status).toBe(200)
    expect(anrop).toHaveLength(1)
  })

  it('ett 401 kommer fram med status och sparas inte', async () => {
    svar = async () => new Response('', { status: 401 })
    startaPlatshamtning()
    const s = await startaPlatshamtning()
    expect(s).toEqual({ status: 401, ok: false, data: null })
    expect(anrop).toHaveLength(1)
    await Promise.resolve()
    // misslyckat svar: nästa start hämtar igen
    svar = async () => new Response('[]', { status: 200 })
    const s2 = await tagPlatssvar()
    expect(s2.ok).toBe(true)
    expect(anrop).toHaveLength(2)
  })

  it('nätverksfel sparas inte', async () => {
    svar = async () => { throw new TypeError('Failed to fetch') }
    await expect(tagPlatssvar()).rejects.toThrow('Failed to fetch')
    svar = async () => new Response('[]', { status: 200 })
    await expect(startaPlatshamtning()).resolves.toMatchObject({ ok: true })
  })
})
