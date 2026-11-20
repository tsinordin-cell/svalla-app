import { describe, it, expect } from 'vitest'
import { adminRad } from './adminRad'

const klient = (svar: { data: unknown; error: unknown } | 'kast') => ({
  rpc: async () => { if (svar === 'kast') throw new Error('nät'); return svar },
})

describe('adminRad', () => {
  it('admin när funktionen svarar true', async () => {
    expect((await adminRad(klient({ data: true, error: null }))).data?.is_admin).toBe(true)
  })
  it('inte admin när funktionen svarar false, null eller något annat', async () => {
    for (const d of [false, null, 'true', 1, {}]) {
      expect((await adminRad(klient({ data: d, error: null }))).data?.is_admin).toBe(false)
    }
  })
  it('nekar vid fel', async () => {
    expect((await adminRad(klient({ data: true, error: { message: 'x' } }))).data).toBeNull()
    expect((await adminRad(klient('kast'))).data).toBeNull()
  })
})
