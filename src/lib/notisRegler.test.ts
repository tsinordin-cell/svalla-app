import { describe, it, expect } from 'vitest'
import { bedomNotis, arKlientTyp, type NotisDb, type NotisRad } from './notisRegler'

const A = '11111111-1111-4111-8111-111111111111' // aktör
const M = '22222222-2222-4222-8222-222222222222' // mottagare
const T = '33333333-3333-4333-8333-333333333333' // tur
const K = '44444444-4444-4444-8444-444444444444' // konversation
const H = '55555555-5555-4555-8555-555555555555' // händelsens id (gillning, kommentar, följning, meddelande)
const NU = Date.parse('2026-10-10T12:00:00Z')

type Varld = {
  agare?: string | null
  gillning?: string | null
  kommentarer?: { id: string; content: string }[]
  foljning?: string | null
  taggat?: boolean
  deltagare?: string[]
  meddelande?: string | null
  konv?: { created_by: string | null; status: string | null } | null
  namn?: Record<string, string>
  finnsRedan?: boolean
}
type Logg = { finnsRedan: [NotisRad, string][] }

function db(v: Varld, logg: Logg = { finnsRedan: [] }): NotisDb {
  return {
    turAgare: async () => (v.agare === undefined ? M : v.agare),
    gillning: async () => v.gillning ?? null,
    kommentarer: async () => v.kommentarer ?? [],
    foljning: async () => v.foljning ?? null,
    harTaggat: async () => !!v.taggat,
    deltagare: async (_c, ids) => new Set(ids.filter(i => (v.deltagare ?? []).includes(i))),
    senasteMeddelande: async () => v.meddelande ?? null,
    konversation: async () => (v.konv === undefined ? null : v.konv),
    anvandarnamn: async id => (v.namn ?? { [A]: 'Anna', [M]: 'Max' })[id] ?? null,
    finnsRedan: async (rad, nyckel) => { logg.finnsRedan.push([rad, nyckel]); return !!v.finnsRedan },
  }
}

const bed = (v: Varld, type: Parameters<typeof bedomNotis>[1]['type'], extra: Record<string, unknown> = {}, logg?: Logg) =>
  bedomNotis(db(v, logg), { actorId: A, targetId: M, type, ...extra }, NU)

describe('arKlientTyp', () => {
  it('tar bara emot typer som webbläsaren skickar', () => {
    expect(arKlientTyp('like')).toBe(true)
    expect(arKlientTyp('forum_reply')).toBe(false)
    expect(arKlientTyp('listing_saved')).toBe(false)
    expect(arKlientTyp(42)).toBe(false)
  })
})

describe('like', () => {
  it('kräver gillning och att mottagaren äger turen', async () => {
    expect(await bed({ gillning: null }, 'like', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    expect(await bed({ gillning: H, agare: A }, 'like', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    expect(await bed({ gillning: H, agare: null }, 'like', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    expect(await bed({ gillning: H }, 'like', {})).toMatchObject({ ok: false, status: 400 })
  })
  it('knyts till gillningen, med serverbyggd push', async () => {
    expect(await bed({ gillning: H }, 'like', { tripId: T })).toEqual({
      ok: true,
      rad: { user_id: M, actor_id: A, type: 'like', trip_id: T, reference_id: H },
      push: { title: 'Ny gillning', body: 'Anna gillade din tur', url: `/tur/${T}` },
    })
  })
  it('en notis per tur, även efter gilla–ta bort–gilla', async () => {
    const logg: Logg = { finnsRedan: [] }
    expect(await bed({ gillning: H, finnsRedan: true }, 'like', { tripId: T }, logg)).toEqual({ ok: 'hoppa', skal: 'dubblett' })
    expect(logg.finnsRedan[0]![1]).toBe('tur')
  })
})

describe('comment och mention', () => {
  it('comment kräver en ny kommentar och knyts till den', async () => {
    expect(await bed({ kommentarer: [] }, 'comment', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    const logg: Logg = { finnsRedan: [] }
    const r = await bed({ kommentarer: [{ id: H, content: 'Fin tur!' }] }, 'comment', { tripId: T }, logg)
    expect(r).toMatchObject({ ok: true, rad: { reference_id: H }, push: { body: 'Anna: Fin tur!' } })
    expect(logg.finnsRedan[0]![1]).toBe('handelse')
  })
  it('mention kräver att kommentaren nämner just mottagaren', async () => {
    const k = (content: string) => ({ kommentarer: [{ id: H, content }], agare: A })
    expect(await bed(k('Hej @Maxi'), 'mention', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    expect(await bed(k('skicka till hej@max'), 'mention', { tripId: T })).toMatchObject({ ok: false })
    expect(await bed({ ...k('Följ med @max.berg'), namn: { [A]: 'Anna', [M]: 'max' } }, 'mention', { tripId: T })).toMatchObject({ ok: false })
    const r = await bed(k('Följ med @max nästa gång.'), 'mention', { tripId: T })
    expect(r).toMatchObject({ ok: true, rad: { type: 'mention', trip_id: T, reference_id: H }, push: { title: 'Anna nämnde dig' } })
  })
  it('mention av turens ägare ger notis men ingen extra push', async () => {
    const r = await bed({ kommentarer: [{ id: H, content: 'Snyggt @Max' }] }, 'mention', { tripId: T })
    expect(r).toMatchObject({ ok: true, push: null })
  })
})

describe('follow och tag', () => {
  it('follow kräver följning, en notis per par', async () => {
    expect(await bed({ foljning: null }, 'follow')).toMatchObject({ ok: false, status: 403 })
    const logg: Logg = { finnsRedan: [] }
    const r = await bed({ foljning: H }, 'follow', {}, logg)
    expect(r).toMatchObject({ ok: true, rad: { type: 'follow', reference_id: H }, push: { url: '/u/Anna' } })
    expect(logg.finnsRedan[0]![1]).toBe('par')
  })
  it('tag kräver taggning, en per tur', async () => {
    expect(await bed({ taggat: false }, 'tag', { tripId: T })).toMatchObject({ ok: false, status: 403 })
    const logg: Logg = { finnsRedan: [] }
    expect(await bed({ taggat: true }, 'tag', { tripId: T }, logg)).toMatchObject({ ok: true, rad: { trip_id: T, reference_id: T } })
    expect(logg.finnsRedan[0]![1]).toBe('tur')
  })
})

describe('message och dm_accepted', () => {
  it('message kräver båda i konversationen och ett nytt meddelande, ingen push härifrån', async () => {
    expect(await bed({ deltagare: [A], meddelande: H }, 'message', { conversationId: K })).toMatchObject({ ok: false, status: 403 })
    expect(await bed({ deltagare: [A, M], meddelande: null }, 'message', { conversationId: K })).toMatchObject({ ok: false, status: 403 })
    expect(await bed({ deltagare: [A, M], meddelande: H }, 'message', {})).toMatchObject({ ok: false, status: 400 })
    expect(await bed({ deltagare: [A, M], meddelande: H }, 'message', { conversationId: K })).toMatchObject({ ok: true, rad: { reference_id: H }, push: null })
  })
  it('dm_accepted kräver accepterad förfrågan från mottagaren', async () => {
    expect(await bed({ deltagare: [A, M], konv: { created_by: M, status: 'request' } }, 'dm_accepted', { conversationId: K })).toMatchObject({ ok: false })
    expect(await bed({ deltagare: [A, M], konv: { created_by: A, status: 'active' } }, 'dm_accepted', { conversationId: K })).toMatchObject({ ok: false })
    expect(await bed({ deltagare: [A, M], konv: { created_by: M, status: 'active' } }, 'dm_accepted', { conversationId: K })).toMatchObject({ ok: true, rad: { reference_id: K } })
  })
})
