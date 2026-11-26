// Läget för aktivitetskorten på badsidan och med barn-sidan (mallarnas runda 6, 2026-11-16; Kontrollantens fynd ma5021, ma5027).
import { describe, it, expect } from 'vitest'
import { aktivitetensLage } from './badLage'

describe('aktivitetensLage', () => {
  it('räknar "utanför <ort>" som en annan plats, vilken ort det än är', () => {
    expect(aktivitetensLage({ name: 'Nordens Ark', desc: 'Zoologisk park för hotade djur sedan 1989, på Åby säteri utanför Hunnebostrand. Buss 860 från Kungshamn stannar vid parken.' }, 'Kungshamn', []))
      .toBe('annan')
  })

  it('avgör inte ett kort om både ön och en grannö på första meningen', () => {
    expect(aktivitetensLage({ name: 'Bad & stränder', desc: 'Ålö Storsand på grannön Ålö nås med båt eller via vandringsled. Leden från Utö följer grusvägen genom Utö skjutfält. Närmare Gruvbyn ligger Barnens bad, en långgrund sandstrand.' }, 'Utö', ['Ålö']))
      .toBe('bada')
  })

  it('låter kort om bara en annan plats stå under "nära"', () => {
    expect(aktivitetensLage({ name: 'Björköörens badplats', desc: 'Kommunal badplats vid Norrtäljevikens södra strand, väster om Gräddö: cirka 85 meter sandstrand. Ingen brygga. Hund är inte tillåten 15 maj–15 september.' }, 'Gräddö', []))
      .toBe('annan')
    expect(aktivitetensLage({ name: 'Bad på Djurö', desc: 'Värmdö kommuns lista över badplatser har ingen badplats på Vindö. Närmast är Vita grindarna, Djurö havsbad.' }, 'Vindö', []))
      .toBe('annan')
    expect(aktivitetensLage({ name: 'Vandra på Härmanö', desc: 'Uppmärkta stigar leder ut till Härmanö huvud, med badplats och utkiksplats.' }, 'Gullholmen', ['Härmanö']))
      .toBe('annan')
  })

  it('räknar kort utan annan plats som på ön', () => {
    expect(aktivitetensLage({ name: 'Klippbad på Stenbogen', desc: 'Kommunal badplats i Kungshamn med badstegar, hopptorn och trampolin.' }, 'Kungshamn', [])).toBe('pa')
    expect(aktivitetensLage({ name: 'Badplatsen på Örens norra sida', desc: 'Långgrund sandstrand på reservatets norra sida.' }, 'Torö', [])).toBe('pa')
  })
})

// Mallarnas runda 7 (2026-11-17).
describe('aktivitetensLage, runda 7', () => {
  it('räknar "<väderstreck> om <ön> kyrka" som på ön', () => {
    expect(aktivitetensLage({ name: 'Slessberget', desc: 'Skogsstig till en fornborg och en utsiktsplats över Kålsöfjärden, 4 km söder om Mörkö kyrka.' }, 'Mörkö', [])).toBe('pa')
  })
  it('låter "på <ön>" i första meningen gå före "utanför <ort>"', () => {
    expect(aktivitetensLage({ name: 'Slussens Pensionat', desc: 'Pensionat med restaurang och musikscen i innerskärgården på norra Orust, i Slussen utanför Henån, sedan 1987.' }, 'Orust', [])).toBe('pa')
    expect(aktivitetensLage({ name: 'STF Bogesunds Vandrarhem', desc: 'Vandrarhem vid Bogesunds slott utanför Vaxholm.' }, 'Vaxholm', [])).toBe('annan')
  })
})
