import { describe, expect, it } from 'vitest'
import { arGiltigPlats, hamtaPlatslista, projiceraPlats } from './platslista'

const rad = {
  id: '1', name: 'Café Strindbergsgården', latitude: 59.4, longitude: 18.9,
  type: 'cafe', categories: ['cafe'], description: 'x'.repeat(400),
  image_url: null, slug: 'cafe', island: 'Ljusterö', archipelago_region: 'stockholm',
  google_photo_refs: [{ reference: 'ref-1' }], endast_medlemmar: null,
}

describe('arGiltigPlats', () => {
  it('godtar koordinater i Skandinavien och namn med versal', () => {
    expect(arGiltigPlats(rad)).toBe(true)
    expect(arGiltigPlats({ ...rad, name: 'Öregrund' })).toBe(true)
  })
  it('kastar bort (0,0), koordinater utanför och beskrivningar som namn', () => {
    expect(arGiltigPlats({ ...rad, latitude: 0, longitude: 0 })).toBe(false)
    expect(arGiltigPlats({ ...rad, latitude: 48.8, longitude: 2.3 })).toBe(false)
    expect(arGiltigPlats({ ...rad, latitude: NaN })).toBe(false)
    expect(arGiltigPlats({ ...rad, name: 'not the public sauna' })).toBe(false)
    expect(arGiltigPlats({ ...rad, name: 'åsa' })).toBe(false)
  })
})

describe('projiceraPlats', () => {
  it('egen bild vinner, annars Google-fotot via proxyn; beskrivningen klipps; refs skickas inte', () => {
    const p = projiceraPlats(rad)
    expect(p.image_url).toBe(`/api/places/photo/${Buffer.from('ref-1').toString('base64url')}?w=400`)
    expect(p.description).toHaveLength(300)
    expect('google_photo_refs' in p).toBe(false)
    expect('endast_medlemmar' in p).toBe(false)
    expect(projiceraPlats({ ...rad, image_url: 'https://x/egen.jpg' }).image_url).toBe('https://x/egen.jpg')
    expect(projiceraPlats({ ...rad, google_photo_refs: null }).image_url).toBeNull()
    expect(projiceraPlats({ ...rad, endast_medlemmar: true }).endast_medlemmar).toBe(true)
  })
})

describe('hamtaPlatslista', () => {
  function klient(svar: { data: unknown; error: { message: string } | null }) {
    const fraga = { select: () => fraga, not: () => fraga, then: (r: (v: unknown) => unknown) => Promise.resolve(svar).then(r) }
    return { from: () => fraga } as never
  }
  it('projicerar alla rader', async () => {
    const ut = await hamtaPlatslista(klient({ data: [rad, { ...rad, id: '2' }], error: null }))
    expect(ut.map(p => p.id)).toEqual(['1', '2'])
  })
  it('kastar vid databasfel', async () => {
    await expect(hamtaPlatslista(klient({ data: null, error: { message: 'nere' } }))).rejects.toThrow('nere')
  })
})
