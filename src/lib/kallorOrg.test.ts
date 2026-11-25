// Källistans avsändare: varianter av samma organisation räknas som en källa (mallarnas runda 6, 2026-11-16; Redaktörens
// tillägg 12). Regeln ligger i src/lib/kallorOrg.mjs och används av scripts/generera-kallor.mjs.
import { describe, it, expect } from 'vitest'
import { orgNyckel, registrerbarDoman, slaIhopOrganisationer } from './kallorOrg.mjs'
import { KALLOR_PER_O } from '../app/o/kallor.generated'

const namn = (kallor: { url: string; org: string }[]) => slaIhopOrganisationer(kallor).map(k => k.org)

describe('registrerbarDoman och orgNyckel', () => {
  it('tar den registrerbara domänen', () => {
    expect(registrerbarDoman('utoskola.haninge.se')).toBe('haninge.se')
    expect(registrerbarDoman('www.catalog.lansstyrelsen.se')).toBe('lansstyrelsen.se')
    expect(registrerbarDoman('example.co.uk')).toBe('example.co.uk')
  })

  it('skiljer operatörerna på den delade tidtabellsvärden och länsstyrelserna per län', () => {
    expect(orgNyckel('https://kund.printhuset-sthlm.se/wa/h12.pdf').nyckel).toBe('waxholmsbolaget.se')
    expect(orgNyckel('https://kund.printhuset-sthlm.se/sl/h433.pdf').nyckel).toBe('sl.se')
    expect(orgNyckel('https://vtstorage002.blob.core.windows.net/x.pdf').nyckel).toBe('vasttrafik.se')
    expect(orgNyckel('https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html').nyckel).toBe('lansstyrelsen.se|Stockholm')
    expect(orgNyckel('https://catalog.lansstyrelsen.se/store/1/resource/2', 'catalog.lansstyrelsen.se').nyckel).toBe('lansstyrelsen.se')
  })
})

describe('slaIhopOrganisationer', () => {
  it('räknar Länsstyrelsen en gång när en sida saknar län (Fjäderholmarna)', () => {
    expect(new Set(namn([
      { url: 'https://catalog.lansstyrelsen.se/store/1/resource/2', org: 'catalog.lansstyrelsen.se' },
      { url: 'https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/x.html', org: 'Länsstyrelsen Stockholm' },
    ]))).toEqual(new Set(['Länsstyrelsen Stockholm']))
  })

  it('slår ihop domän och namn, och underdomäner', () => {
    expect(new Set(namn([{ url: 'https://www.varmdo.se/a', org: 'varmdo.se' }, { url: 'https://www.varmdo.se/b', org: 'Värmdö kommun' }])))
      .toEqual(new Set(['Värmdö kommun']))
    expect(new Set(namn([{ url: 'https://www.vaxholm.se/a', org: 'vaxholm.se' }, { url: 'https://www.vaxholm.se/b', org: 'Vaxholms stad' }])))
      .toEqual(new Set(['Vaxholms stad']))
    expect(new Set(namn([{ url: 'https://haninge.se/a', org: 'haninge.se' }, { url: 'https://utoskola.haninge.se/b', org: 'utoskola.haninge.se' }])))
      .toEqual(new Set(['haninge.se']))
    expect(new Set(namn([{ url: 'https://furusund.se/a', org: 'furusund.se' }, { url: 'https://furusund.se/b', org: 'Furusund Hamn' }])))
      .toEqual(new Set(['Furusund Hamn']))
    // Bara domännamn i gruppen: den registrerbara domänen (Utö: statistikdatabasen.scb.se och api.scb.se).
    expect(new Set(namn([{ url: 'https://statistikdatabasen.scb.se/a', org: 'statistikdatabasen.scb.se' }, { url: 'https://api.scb.se/b', org: 'api.scb.se' }])))
      .toEqual(new Set(['scb.se']))
    expect(new Set(namn([{ url: 'https://kund.printhuset-sthlm.se/wa/h12.pdf', org: 'Waxholmsbolaget (tryckt tidtabell)' }, { url: 'https://waxholmsbolaget.se/x', org: 'Waxholmsbolaget' }])))
      .toEqual(new Set(['Waxholmsbolaget']))
  })

  it('håller isär olika organisationer', () => {
    expect(namn([
      { url: 'https://kund.printhuset-sthlm.se/wa/h12.pdf', org: 'Waxholmsbolaget (tryckt tidtabell)' },
      { url: 'https://kund.printhuset-sthlm.se/sl/h433.pdf', org: 'SL (tryckt tidtabell)' },
    ])).toEqual(['Waxholmsbolaget (tryckt tidtabell)', 'SL (tryckt tidtabell)'])
    // Två län på samma ö: en sida utan län räknas inte till något av dem.
    expect(namn([
      { url: 'https://www.lansstyrelsen.se/stockholm/a.html', org: 'Länsstyrelsen Stockholm' },
      { url: 'https://www.lansstyrelsen.se/uppsala/b.html', org: 'Länsstyrelsen Uppsala län' },
      { url: 'https://catalog.lansstyrelsen.se/c', org: 'catalog.lansstyrelsen.se' },
    ])).toEqual(['Länsstyrelsen Stockholm', 'Länsstyrelsen Uppsala län', 'catalog.lansstyrelsen.se'])
  })

  it('tar domänen när samma domän har flera ämnen som namn', () => {
    expect(new Set(namn([
      { url: 'https://www.kungalv.se/a', org: 'Besöksparkering i Marstrand' },
      { url: 'https://www.kungalv.se/b', org: 'Samlastning Marstrand' },
      { url: 'https://www.kungalv.se/c', org: 'kungalv.se' },
    ]))).toEqual(new Set(['kungalv.se']))
  })
})

describe('kallor.generated.ts', () => {
  it('har varje organisation under ett namn per ö', () => {
    const dubbla = Object.entries(KALLOR_PER_O).flatMap(([slug, kallor]) => {
      const perNyckel = new Map<string, Set<string>>()
      for (const k of kallor) {
        const { nyckel } = orgNyckel(k.url, k.org)
        if (nyckel === 'lansstyrelsen.se') continue
        perNyckel.set(nyckel, (perNyckel.get(nyckel) ?? new Set()).add(k.org.toLocaleLowerCase('sv')))
      }
      return [...perNyckel].filter(([, n]) => n.size > 1).map(([nyckel, n]) => `${slug}: ${nyckel} (${[...n].join(', ')})`)
    })
    expect(dubbla).toEqual([])
  })
})
