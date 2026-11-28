import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@sentry/nextjs', () => ({
  captureException: vi.fn(),
}))
vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}))

import * as Sentry from '@sentry/nextjs'
import { logger } from '@/lib/logger'
import {
  epostAdresser,
  rapporteraRaderingsfel,
  stadaPersonuppgifter,
  type RaderingsDb,
} from './kontoRadering'

const ID = '11111111-1111-4111-8111-111111111111'

interface Rad {
  tabell: string
  kolumn: string
  varde: string
}
interface Bort {
  hink: string
  sokvagar: string[]
}

function db(opts: {
  filer?: { hink: string; sokvag: string }[]
  felTabell?: string
  felHinkLista?: string
  felHinkBort?: string
} = {}) {
  const raderingar: Rad[] = []
  const borttag: Bort[] = []
  const listor: { hink: string; mapp: string; offset: number }[] = []
  const filer = opts.filer ?? []
  const klient: RaderingsDb = {
    from(tabell: string) {
      return {
        delete: () => ({
          eq: async (kolumn: string, varde: string) => {
            if (opts.felTabell === tabell && kolumn === 'user_id') {
              return { error: { message: `${tabell} nere` } }
            }
            raderingar.push({ tabell, kolumn, varde })
            return { error: null }
          },
        }),
      }
    },
    storage: {
      from(hink: string) {
        return {
          list: async (mapp: string, listOpts?: { limit?: number; offset?: number }) => {
            listor.push({ hink, mapp, offset: listOpts?.offset ?? 0 })
            if (opts.felHinkLista === hink) return { data: null, error: { message: 'lista nere' } }
            const limit = listOpts?.limit ?? 100
            const offset = listOpts?.offset ?? 0
            const prefix = `${mapp}/`
            const namn = filer
              .filter(f => f.hink === hink && f.sokvag.startsWith(prefix))
              .map(f => f.sokvag.slice(prefix.length))
              .filter(n => n && !n.includes('/'))
            const sida = namn.slice(offset, offset + limit)
            return { data: sida.map(name => ({ name })), error: null }
          },
          remove: async (sokvagar: string[]) => {
            if (opts.felHinkBort === hink) return { error: { message: 'bort nere' } }
            borttag.push({ hink, sokvagar })
            return { error: null }
          },
        }
      },
    },
  }
  return { klient, raderingar, borttag, listor }
}

beforeEach(() => {
  vi.mocked(Sentry.captureException).mockClear()
  vi.mocked(logger.error).mockClear()
})

describe('epostAdresser', () => {
  it('ger gemener, och båda formerna när de skiljer sig', () => {
    expect(epostAdresser('  Ada@Svalla.se ')).toEqual(['Ada@Svalla.se', 'ada@svalla.se'])
    expect(epostAdresser('ada@svalla.se')).toEqual(['ada@svalla.se'])
    expect(epostAdresser('  ')).toEqual([])
    expect(epostAdresser(null)).toEqual([])
  })
})

describe('stadaPersonuppgifter', () => {
  it('tar bort mejllogg och prenumeration på konto och adress, och bilderna i användarens mappar', async () => {
    const k = db({
      filer: [
        { hink: 'forum-images', sokvag: `${ID}/a.jpg` },
        { hink: 'forum-images', sokvag: `${ID}/b.jpg` },
        { hink: 'forum-images', sokvag: 'annan/c.jpg' },
        { hink: 'trip-images', sokvag: `stories/${ID}/s.jpg` },
        { hink: 'trip-images', sokvag: `checkin/${ID}/x.jpg` },
      ],
    })
    const fel: string[] = []
    await stadaPersonuppgifter(k.klient, ID, 'Ada@Svalla.se', steg => fel.push(steg))
    expect(fel).toEqual([])
    expect(k.raderingar).toEqual([
      { tabell: 'email_log', kolumn: 'user_id', varde: ID },
      { tabell: 'email_log', kolumn: 'email', varde: 'Ada@Svalla.se' },
      { tabell: 'email_log', kolumn: 'email', varde: 'ada@svalla.se' },
      { tabell: 'email_subscribers', kolumn: 'user_id', varde: ID },
      { tabell: 'email_subscribers', kolumn: 'email', varde: 'Ada@Svalla.se' },
      { tabell: 'email_subscribers', kolumn: 'email', varde: 'ada@svalla.se' },
    ])
    expect(k.borttag).toEqual([
      { hink: 'forum-images', sokvagar: [`${ID}/a.jpg`, `${ID}/b.jpg`] },
      { hink: 'trip-images', sokvagar: [`stories/${ID}/s.jpg`] },
    ])
  })

  it('hoppar över adressraderingen när kontot saknar e-post', async () => {
    const k = db()
    await stadaPersonuppgifter(k.klient, ID, undefined, () => {})
    expect(k.raderingar.map(r => r.kolumn)).toEqual(['user_id', 'user_id'])
  })

  it('listar fler än en sida och tar bort alla filer', async () => {
    const filer = Array.from({ length: 1001 }, (_, i) => ({
      hink: 'forum-images',
      sokvag: `${ID}/f${i}.jpg`,
    }))
    const k = db({ filer })
    await stadaPersonuppgifter(k.klient, ID, null, () => {})
    const forumListor = k.listor.filter(l => l.hink === 'forum-images')
    expect(forumListor.map(l => l.offset)).toEqual([0, 1000])
    const sokvagar = k.borttag.filter(b => b.hink === 'forum-images').flatMap(b => b.sokvagar)
    expect(sokvagar).toHaveLength(1001)
    expect(sokvagar[0]).toBe(`${ID}/f0.jpg`)
    expect(sokvagar[1000]).toBe(`${ID}/f1000.jpg`)
  })

  it('fortsätter med nästa steg när ett steg fallerar, och rapporterar felet', async () => {
    const k = db({ felTabell: 'email_log', felHinkLista: 'forum-images' })
    const fel: string[] = []
    await stadaPersonuppgifter(k.klient, ID, 'a@b.se', (steg) => fel.push(steg))
    expect(fel).toEqual(['email_log', 'forum-images'])
    expect(k.raderingar.some(r => r.tabell === 'email_subscribers')).toBe(true)
    expect(k.raderingar.some(r => r.tabell === 'email_log' && r.kolumn === 'email')).toBe(true)
    expect(k.listor.some(l => l.hink === 'trip-images')).toBe(true)
  })

  it('kastar inte om felrapporten själv kastar', async () => {
    const k = db({ felTabell: 'email_subscribers' })
    await expect(stadaPersonuppgifter(k.klient, ID, 'a@b.se', () => {
      throw new Error('sentry nere')
    })).resolves.toBeUndefined()
    expect(k.borttag.some(b => b.hink === 'forum-images')).toBe(false)
    expect(k.listor.some(l => l.hink === 'forum-images')).toBe(true)
  })

  it('raderar inte lagring för ett id som inte är ett konto-id', async () => {
    const k = db({ filer: [{ hink: 'forum-images', sokvag: 'inte-ett-id/a.jpg' }] })
    const fel: string[] = []
    await stadaPersonuppgifter(k.klient, 'inte-ett-id', 'a@b.se', steg => fel.push(steg))
    expect(fel).toEqual(['lagring'])
    expect(k.listor).toEqual([])
    expect(k.raderingar.some(r => r.tabell === 'email_log')).toBe(true)
  })

  it('rapporterar ett misslyckat borttag utan att tappa mejlstädningen', async () => {
    const k = db({
      filer: [{ hink: 'forum-images', sokvag: `${ID}/a.jpg` }],
      felHinkBort: 'forum-images',
    })
    const fel: string[] = []
    await stadaPersonuppgifter(k.klient, ID, 'a@b.se', steg => fel.push(steg))
    expect(fel).toEqual(['forum-images'])
    expect(k.raderingar.some(r => r.tabell === 'email_subscribers')).toBe(true)
  })
})

describe('rapporteraRaderingsfel', () => {
  it('skickar felet till Sentry och loggen, utan att kasta', () => {
    rapporteraRaderingsfel('email_log', new Error('nere'), ID)
    expect(Sentry.captureException).toHaveBeenCalledTimes(1)
    const [err, kontext] = vi.mocked(Sentry.captureException).mock.calls[0]
    expect(err).toBeInstanceOf(Error)
    expect((err as Error).message).toBe('nere')
    expect(kontext).toMatchObject({ tags: { scope: 'account-delete', steg: 'email_log' }, extra: { userId: ID } })
    expect(logger.error).toHaveBeenCalledWith('account-delete', 'email_log cleanup failed', { e: 'nere', userId: ID })
  })

  it('gör en Error av något som inte redan är ett fel', () => {
    rapporteraRaderingsfel('forum-images', 'strängfel', ID)
    const [err] = vi.mocked(Sentry.captureException).mock.calls[0]
    expect((err as Error).message).toBe('strängfel')
  })
})
