import { describe, it, expect } from 'vitest'
import { filnamnUrAdress, filnamnIVarde, overgivnaFiler, stadaTurbilder } from './turbildStadning'
import type { SupabaseClient } from '@supabase/supabase-js'

const BAS = 'https://exempel.supabase.co/storage/v1/object/public/trips/'
const NU = new Date('2026-11-20T12:00:00Z')
const gammal = '2026-08-01T10:00:00Z'
const ny = '2026-11-10T10:00:00Z'

describe('filnamnUrAdress', () => {
  it('plockar filnamnet ur en publik adress', () => {
    expect(filnamnUrAdress(BAS + 'abc-123.jpg')).toBe('abc-123.jpg')
  })
  it('tar inte med frågesträng', () => {
    expect(filnamnUrAdress(BAS + 'abc.jpg?width=400')).toBe('abc.jpg')
  })
  it('ger null för andra hinkar och andra adresser', () => {
    expect(filnamnUrAdress('https://exempel.supabase.co/storage/v1/object/public/images/places/x.jpg')).toBeNull()
    expect(filnamnUrAdress('https://svalla.se/tur/123')).toBeNull()
  })
})

describe('filnamnIVarde', () => {
  it('hittar namn i sträng, lista och nästlat objekt', () => {
    const rader = [
      { image: BAS + 'a.jpg', images: [BAS + 'b.jpg', BAS + 'c.jpg'] },
      { image: null, images: null },
      { attachment_url: 'https://svalla.se/tur/1', attachment_meta: { tur: { bild: BAS + 'd.jpg' } } },
    ]
    expect([...filnamnIVarde(rader)].sort()).toEqual(['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg'])
  })
  it('hittar namn i en lista som sparats som text', () => {
    expect([...filnamnIVarde(JSON.stringify([BAS + 'e.jpg', BAS + 'f.jpg']))].sort()).toEqual(['e.jpg', 'f.jpg'])
  })
})

describe('overgivnaFiler', () => {
  const filer = [
    { name: 'anvand.jpg', created_at: gammal },
    { name: 'overgiven-gammal.jpg', created_at: gammal },
    { name: 'overgiven-ny.jpg', created_at: ny },
    { name: 'utan-datum.jpg', created_at: null },
  ]
  it('tar bara filer som ingen pekar på och som är äldre än 30 dagar', () => {
    expect(overgivnaFiler(filer, new Set(['anvand.jpg']), NU).map(f => f.name)).toEqual(['overgiven-gammal.jpg'])
  })
  it('rör inte en fil utan känt datum', () => {
    expect(overgivnaFiler(filer, new Set(), NU).map(f => f.name)).not.toContain('utan-datum.jpg')
  })
  it('håller sig till taket och tar de äldsta först', () => {
    const manga = Array.from({ length: 5 }, (_, i) => ({ name: `f${i}.jpg`, created_at: `2026-0${i + 1}-01T00:00:00Z` }))
    expect(overgivnaFiler(manga, new Set(), NU, 30, 2).map(f => f.name)).toEqual(['f0.jpg', 'f1.jpg'])
  })
})

// En liten låtsasklient: bara det stadaTurbilder använder.
function klient(o: { filer: { name: string; created_at: string | null }[]; turer: unknown[] | 'fel'; meddelanden?: unknown[] }) {
  const borttagna: string[] = []
  const tabell = (rader: unknown[] | 'fel') => {
    const svar = rader === 'fel' ? { data: null, error: { message: 'trasigt' } } : { data: rader, error: null }
    const kedja = { select: () => kedja, not: () => kedja, range: async () => svar }
    return kedja
  }
  const admin = {
    storage: {
      from: () => ({
        list: async () => ({ data: o.filer.map(f => ({ ...f, id: 'x' })), error: null }),
        remove: async (namn: string[]) => { borttagna.push(...namn); return { data: namn.map(n => ({ name: n })), error: null } },
      }),
    },
    from: (t: string) => tabell(t === 'trips' ? o.turer : (o.meddelanden ?? [])),
  }
  return { admin: admin as unknown as SupabaseClient, borttagna }
}

describe('stadaTurbilder', () => {
  const filer = [
    { name: 'tur.jpg', created_at: gammal },
    { name: 'meddelande.jpg', created_at: gammal },
    { name: 'overgiven.jpg', created_at: gammal },
    { name: 'nyss-uppladdad.jpg', created_at: ny },
  ]
  const turer = [{ image: BAS + 'tur.jpg', images: null }]
  const meddelanden = [{ attachment_url: null, attachment_meta: { bild: BAS + 'meddelande.jpg' } }]

  it('tar bort bara den övergivna, gamla filen', async () => {
    const { admin, borttagna } = klient({ filer, turer, meddelanden })
    const res = await stadaTurbilder(admin, { nu: NU })
    expect(borttagna).toEqual(['overgiven.jpg'])
    expect(res).toMatchObject({ filer: 4, anvanda: 2, overgivna: 1, borttagna: 1 })
  })

  it('torrkörning tar inte bort något men räknar', async () => {
    const { admin, borttagna } = klient({ filer, turer, meddelanden })
    const res = await stadaTurbilder(admin, { nu: NU, torrkor: true })
    expect(borttagna).toEqual([])
    expect(res).toMatchObject({ overgivna: 1, borttagna: 0 })
  })

  it('tar inte bort något när turerna inte går att läsa', async () => {
    const { admin, borttagna } = klient({ filer, turer: 'fel' })
    const res = await stadaTurbilder(admin, { nu: NU })
    expect(borttagna).toEqual([])
    expect(res.avbrutet).toMatch(/turer/)
  })

  it('tar inte bort något när listan över turer är tom', async () => {
    const { admin, borttagna } = klient({ filer, turer: [] })
    const res = await stadaTurbilder(admin, { nu: NU })
    expect(borttagna).toEqual([])
    expect(res.avbrutet).toMatch(/inga turer/)
  })
})
