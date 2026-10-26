import { describe, it, expect } from 'vitest'
import { byggPlatslista, rensaLankar, platsUrl, type PlatsRad } from './thorkel-platser'

const GRINDA_ID = '11111111-2222-3333-4444-555555555555'
const FINNHAMN_ID = '66666666-7777-8888-9999-000000000000'

const rad = (r: Partial<PlatsRad> & { id: string }): PlatsRad => ({
  name: null, island: null, type: 'restaurant', booking_url: null, opening_hours: null, endast_medlemmar: false, ...r,
})

describe('byggPlatslista', () => {
  const lista = byggPlatslista([
    rad({ id: FINNHAMN_ID, name: 'Finnhamns Krog', island: 'Finnhamn', booking_url: 'http://www.finnhamn.se', opening_hours: 'Juni–Augusti: dagligen 12–21.' }),
    rad({ id: GRINDA_ID, name: 'Grinda Wärdshus', island: 'Grinda', booking_url: 'https://grinda.se/mat-fest/wardshuset/' }),
    rad({ id: 'a', name: 'Bastu utan ö', island: null, type: 'sauna' }),
    rad({ id: 'b', name: '  ', island: 'Grinda' }),
    rad({ id: 'c', name: 'Klubbastun', island: 'Ängsö', type: 'sauna', endast_medlemmar: true }),
    rad({ id: 'd', name: 'Utö Värdshus', island: 'Utö', type: 'hotel', booking_url: 'https://utovardshus.se' }),
  ])

  it('hoppar över platser utan ö eller namn', () => {
    expect(lista.antal).toBe(4)
    expect(lista.idn.has('a')).toBe(false)
    expect(lista.idn.has('b')).toBe(false)
  })

  it('sorterar per ö och namn med svensk ordning (Å, Ä, Ö sist)', () => {
    const oar = lista.text.split('\n').map(r => r.split(' (')[1]!.split(',')[0])
    expect(oar).toEqual(['Finnhamn', 'Grinda', 'Utö', 'Ängsö'])
  })

  it('tar med bokningslänk, öppettider och medlemsmärkning', () => {
    const rader = lista.text.split('\n')
    expect(rader[1]).toBe(`Grinda Wärdshus (Grinda, krog): ${platsUrl(GRINDA_ID)} · Boka bord: https://grinda.se/mat-fest/wardshuset/`)
    expect(rader[0]).toContain('Öppettider enligt Svalla: Juni–Augusti: dagligen 12–21.')
    expect(rader[2]).toContain('(Utö, boende)')
    expect(rader[2]).toContain('Boka: https://utovardshus.se')
    expect(rader[3]).toContain('Endast för medlemmar')
    expect(lista.bokningslankar.has('https://grinda.se/mat-fest/wardshuset/')).toBe(true)
  })

  it('kortar långa öppettider', () => {
    const lang = byggPlatslista([rad({ id: 'e', name: 'Kafé', island: 'Möja', type: 'cafe', opening_hours: 'x '.repeat(200) })])
    const del = lang.text.split('Öppettider enligt Svalla: ')[1]!
    expect(del.length).toBeLessThanOrEqual(120)
    expect(del.endsWith('…')).toBe(true)
  })
})

describe('rensaLankar', () => {
  const tillatet = {
    platsIdn: new Set([GRINDA_ID]),
    bokningslankar: new Set(['https://grinda.se/mat-fest/wardshuset/']),
    oSlugs: new Set(['grinda']),
  }

  it('behåller länkar till platssidor ur listan, både /upptack och /platser', () => {
    const t = `[Grinda Wärdshus](${platsUrl(GRINDA_ID)}) och [samma](https://svalla.se/platser/${GRINDA_ID})`
    expect(rensaLankar(t, tillatet)).toBe(t)
  })

  it('stryker länkar till platser som inte finns i listan men behåller namnet', () => {
    expect(rensaLankar(`[Påhittad krog](${platsUrl(FINNHAMN_ID)})`, tillatet)).toBe('Påhittad krog')
  })

  it('behåller bokningslänkar ur listan och stryker andra externa länkar', () => {
    expect(rensaLankar('[Boka bord →](https://grinda.se/mat-fest/wardshuset/)', tillatet))
      .toBe('[Boka bord →](https://grinda.se/mat-fest/wardshuset/)')
    expect(rensaLankar('[Boka här](https://example.com/boka)', tillatet)).toBe('Boka här')
  })

  it('behåller ösidor som finns, med undersidor, och Svallas egna sidor', () => {
    const t = '[Grinda](/o/grinda) [Krogar](https://svalla.se/o/grinda/restauranger) [Planera](/planera) [Karta](https://svalla.se/karta?o=grinda)'
    expect(rensaLankar(t, tillatet)).toBe(t)
    expect(rensaLankar('[Okänd ö](/o/okand)', tillatet)).toBe('Okänd ö')
  })
})
