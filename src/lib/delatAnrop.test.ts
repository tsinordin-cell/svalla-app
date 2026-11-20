import { describe, it, expect } from 'vitest'
import { delaAnrop, delaGetUser } from './delatAnrop'

describe('delaAnrop', () => {
  it('35 samtidiga frågor blir ett anrop', async () => {
    let anrop = 0
    const delad = delaAnrop(async () => { anrop++; return 'svar' }, 5000)
    const svar = await Promise.all(Array.from({ length: 35 }, () => delad()))
    expect(anrop).toBe(1)
    expect(new Set(svar)).toEqual(new Set(['svar']))
  })

  it('frågar igen när tiden gått ut', async () => {
    let anrop = 0
    let klocka = 0
    const delad = delaAnrop(async () => ++anrop, 5000, () => true, () => klocka)
    await delad(); klocka = 4999; await delad()
    expect(anrop).toBe(1)
    klocka = 5000; await delad()
    expect(anrop).toBe(2)
  })

  it('sparar inte ett svar som är ett fel', async () => {
    let anrop = 0
    const delad = delaAnrop(async () => ({ error: ++anrop === 1 ? 'fel' : null }), 5000, s => !s.error)
    expect((await delad()).error).toBe('fel')
    expect((await delad()).error).toBeNull()
    await delad()
    expect(anrop).toBe(2)
  })

  it('sparar inte ett avvisat löfte', async () => {
    let anrop = 0
    const delad = delaAnrop(async () => { if (++anrop === 1) throw new Error('nät'); return 'ok' }, 5000)
    await expect(delad()).rejects.toThrow('nät')
    expect(await delad()).toBe('ok')
  })

  it('glom() tvingar fram en ny fråga', async () => {
    let anrop = 0
    const delad = delaAnrop(async () => ++anrop, 5000)
    await delad(); delad.glom(); await delad()
    expect(anrop).toBe(2)
  })
})

describe('delaGetUser', () => {
  function lat() {
    let anrop = 0
    let lyssnare: (() => void) | null = null
    let anv = 'anna'
    const auth = {
      getUser: async (jwt?: string) => { anrop++; return { data: { user: { id: jwt ?? anv } }, error: null } },
      onAuthStateChange: (cb: () => void) => { lyssnare = cb },
    }
    return { auth, antal: () => anrop, handelse: () => lyssnare?.(), bytTill: (n: string) => { anv = n } }
  }

  it('många komponenter, ett nätverksanrop', async () => {
    const l = lat()
    delaGetUser(l.auth)
    const svar = await Promise.all(Array.from({ length: 30 }, () => l.auth.getUser()))
    expect(l.antal()).toBe(1)
    expect(svar[29]!.data.user.id).toBe('anna')
  })

  it('in- eller utloggning ger ett nytt svar direkt', async () => {
    const l = lat()
    delaGetUser(l.auth)
    expect((await l.auth.getUser()).data.user.id).toBe('anna')
    l.bytTill('bertil'); l.handelse()
    expect((await l.auth.getUser()).data.user.id).toBe('bertil')
  })

  it('anrop med eget token går alltid rakt igenom', async () => {
    const l = lat()
    delaGetUser(l.auth)
    await l.auth.getUser(); await l.auth.getUser('t1'); await l.auth.getUser('t2')
    expect(l.antal()).toBe(3)
  })

  it('läggs bara på en gång', async () => {
    const l = lat()
    delaGetUser(l.auth); delaGetUser(l.auth)
    await Promise.all([l.auth.getUser(), l.auth.getUser()])
    expect(l.antal()).toBe(1)
  })
})
