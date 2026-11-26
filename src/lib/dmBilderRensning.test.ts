import { describe, it, expect } from 'vitest'
import type { SupabaseClient } from '@supabase/supabase-js'
import { taBortDmBilder, rensaBilderForRaderadeSamtal, rensaOverblivnaDmBilder } from './dmBilderRensning'

const S1 = '11111111-1111-1111-1111-111111111111'
const S2 = '22222222-2222-2222-2222-222222222222'
const A = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'
const B = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
const F1 = 'cccccccc-cccc-cccc-cccc-cccccccccccc.jpg'
const F2 = 'dddddddd-dddd-dddd-dddd-dddddddddddd.jpg'

/** Låtsasklient: filer i hinken, anmälda sökvägar och vilka samtal som finns. */
function klient(opts: { filer: string[]; anmalda?: string[]; samtal?: string[]; underlagFel?: boolean; meddelanden?: string[]; tider?: Record<string, string>; meddelandenFel?: boolean }) {
  const filer = new Set(opts.filer)
  const borttagna: string[] = []
  const c = {
    from(tabell: string) {
      return {
        select() {
          return {
            async in(_kol: string, varden: string[]) {
              if (tabell === 'anmalan_underlag') {
                if (opts.underlagFel) return { data: null, error: { message: 'nere' } }
                return { data: (opts.anmalda ?? []).filter(v => varden.includes(v)).map(v => ({ bilaga_sokvag: v })), error: null }
              }
              if (tabell === 'messages') {
                if (opts.meddelandenFel) return { data: null, error: { message: 'nere' } }
                return { data: (opts.meddelanden ?? []).filter(v => varden.includes(v)).map(v => ({ attachment_url: v })), error: null }
              }
              return { data: (opts.samtal ?? []).filter(v => varden.includes(v)).map(id => ({ id })), error: null }
            },
          }
        },
      }
    },
    storage: {
      from() {
        return {
          async list(prefix: string) {
            const delar = prefix === '' ? [] : prefix.split('/')
            const namn = new Set<string>()
            for (const f of filer) {
              const p = f.split('/')
              if (p.slice(0, delar.length).join('/') === prefix && p.length > delar.length) namn.add(p[delar.length])
            }
            return {
              data: [...namn].map(name => {
                const hel = prefix === '' ? name : `${prefix}/${name}`
                return { name, created_at: opts.tider?.[hel] ?? null }
              }),
              error: null,
            }
          },
          async remove(sokvagar: string[]) {
            for (const s of sokvagar) { filer.delete(s); borttagna.push(s) }
            return { data: sokvagar.map(name => ({ name })), error: null }
          },
        }
      },
    },
  }
  return { admin: c as unknown as SupabaseClient, borttagna, filer }
}

describe('taBortDmBilder', () => {
  it('tar bort bilder men låter anmälda ligga kvar', async () => {
    const k = klient({ filer: [`${S1}/${A}/${F1}`, `${S1}/${A}/${F2}`], anmalda: [`${S1}/${A}/${F2}`] })
    expect(await taBortDmBilder(k.admin, [`${S1}/${A}/${F1}`, `${S1}/${A}/${F2}`])).toBe(1)
    expect(k.borttagna).toEqual([`${S1}/${A}/${F1}`])
  })
  it('ignorerar sådant som inte är en chattbildssökväg', async () => {
    const k = klient({ filer: [] })
    expect(await taBortDmBilder(k.admin, ['https://exempel.se/bild.jpg', '../annat', ''])).toBe(0)
    expect(k.borttagna).toEqual([])
  })
  it('tar inte bort något om underlaget inte går att läsa', async () => {
    const k = klient({ filer: [`${S1}/${A}/${F1}`], underlagFel: true })
    await expect(taBortDmBilder(k.admin, [`${S1}/${A}/${F1}`])).rejects.toThrow()
    expect(k.borttagna).toEqual([])
  })
})

describe('rensaBilderForRaderadeSamtal', () => {
  it('rensar bara samtal som inte finns kvar, och sparar anmälda bilder', async () => {
    const k = klient({
      filer: [`${S1}/${A}/${F1}`, `${S1}/${B}/${F2}`, `${S2}/${A}/${F1}`],
      anmalda: [`${S1}/${B}/${F2}`],
      samtal: [S2],
    })
    expect(await rensaBilderForRaderadeSamtal(k.admin, [S1, S2, 'inte-ett-id'])).toBe(1)
    expect(k.borttagna).toEqual([`${S1}/${A}/${F1}`])
    expect(k.filer.has(`${S2}/${A}/${F1}`)).toBe(true)
    expect(k.filer.has(`${S1}/${B}/${F2}`)).toBe(true)
  })
})

describe('rensaOverblivnaDmBilder', () => {
  const NU = Date.parse('2026-11-26T03:00:00Z')
  const gammal = '2026-11-20T10:00:00Z'
  const farsk = '2026-11-26T02:00:00Z'
  const F3 = 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee.jpg'

  it('tar bort gamla filer utan meddelande, sparar använda, färska och anmälda', async () => {
    const k = klient({
      filer: [`${S2}/${A}/${F1}`, `${S2}/${A}/${F2}`, `${S2}/${B}/${F3}`, `${S2}/${B}/${F1}`],
      samtal: [S2],
      meddelanden: [`${S2}/${A}/${F1}`],
      anmalda: [`${S2}/${B}/${F1}`],
      tider: {
        [`${S2}/${A}/${F1}`]: gammal, // ett meddelande pekar på den
        [`${S2}/${A}/${F2}`]: gammal, // överbliven
        [`${S2}/${B}/${F3}`]: farsk,  // kan vara på väg att skickas
        [`${S2}/${B}/${F1}`]: gammal, // anmäld
      },
    })
    expect(await rensaOverblivnaDmBilder(k.admin, NU)).toEqual({ samtal: 1, borttagna: 1 })
    expect(k.borttagna).toEqual([`${S2}/${A}/${F2}`])
  })

  it('tömmer mappen för ett samtal som inte finns, utom anmälda', async () => {
    const k = klient({
      filer: [`${S1}/${A}/${F1}`, `${S1}/${B}/${F2}`],
      samtal: [],
      anmalda: [`${S1}/${B}/${F2}`],
      tider: { [`${S1}/${A}/${F1}`]: farsk, [`${S1}/${B}/${F2}`]: gammal },
    })
    expect(await rensaOverblivnaDmBilder(k.admin, NU)).toEqual({ samtal: 1, borttagna: 1 })
    expect(k.borttagna).toEqual([`${S1}/${A}/${F1}`])
  })

  it('tar inte bort något om meddelandena inte går att läsa', async () => {
    const k = klient({
      filer: [`${S2}/${A}/${F2}`], samtal: [S2], meddelandenFel: true,
      tider: { [`${S2}/${A}/${F2}`]: gammal },
    })
    await expect(rensaOverblivnaDmBilder(k.admin, NU)).rejects.toThrow()
    expect(k.borttagna).toEqual([])
  })

  it('rör inte filer som saknar uppladdningstid', async () => {
    const k = klient({ filer: [`${S2}/${A}/${F2}`], samtal: [S2] })
    expect(await rensaOverblivnaDmBilder(k.admin, NU)).toEqual({ samtal: 1, borttagna: 0 })
    expect(k.borttagna).toEqual([])
  })
})
