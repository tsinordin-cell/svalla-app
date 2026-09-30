// Spärr för de avstängda mejlflödena (2026-09-29, Toms beslut "Bygg avstängt").
// Standardläget måste vara AV för varje flöde — regel 6: utskick kräver Toms ja.
import { describe, expect, it } from 'vitest'
import { MAILFLODEN, flodePa, manadsbrevFonster, arVeckansOdag, isoVecka, valjVeckansO } from './mailfloden'

describe('mejlflöden är avstängda som standard', () => {
  // Testet får inte bero på byggmiljön. Att skicka undefined som argument
  // triggar standardvärdet process.env.EMAIL_AUTOMATIK, och när variabeln är
  // satt i Vercel (2026-09-30: manadsbrev) föll bygget. Därför tas variabeln
  // bort under testet och läggs tillbaka efteråt.
  it('inget flöde är på utan EMAIL_AUTOMATIK', () => {
    const sparad = process.env.EMAIL_AUTOMATIK
    delete process.env.EMAIL_AUTOMATIK
    try {
      for (const f of MAILFLODEN) {
        expect(flodePa(f)).toBe(false)
        expect(flodePa(f, '')).toBe(false)
      }
    } finally {
      if (sparad !== undefined) process.env.EMAIL_AUTOMATIK = sparad
    }
  })
  it('läser EMAIL_AUTOMATIK från miljön', () => {
    const sparad = process.env.EMAIL_AUTOMATIK
    process.env.EMAIL_AUTOMATIK = 'manadsbrev'
    try {
      expect(flodePa('manadsbrev')).toBe(true)
      expect(flodePa('day60')).toBe(false)
    } finally {
      if (sparad === undefined) delete process.env.EMAIL_AUTOMATIK
      else process.env.EMAIL_AUTOMATIK = sparad
    }
  })
  it('bara uttryckligen namngivna flöden slås på', () => {
    expect(flodePa('day60', 'day60, day90')).toBe(true)
    expect(flodePa('day90', 'day60, day90')).toBe(true)
    expect(flodePa('manadsbrev', 'day60, day90')).toBe(false)
    expect(flodePa('day60', 'day600')).toBe(false)
  })
})

describe('tidsfönster', () => {
  it('månadsbrevet: första tisdagen t.o.m. den 14:e, okt–mars', () => {
    expect(manadsbrevFonster(new Date('2026-10-05T09:00:00Z'))).toBe(false) // måndag före
    expect(manadsbrevFonster(new Date('2026-10-06T09:00:00Z'))).toBe(true)  // första tisdagen
    expect(manadsbrevFonster(new Date('2026-10-14T09:00:00Z'))).toBe(true)
    expect(manadsbrevFonster(new Date('2026-10-15T09:00:00Z'))).toBe(false)
    expect(manadsbrevFonster(new Date('2026-06-02T09:00:00Z'))).toBe(false) // sommar
  })
  it('veckans ö: tisdagar april–september', () => {
    expect(arVeckansOdag(new Date('2027-05-04T09:00:00Z'))).toBe(true)
    expect(arVeckansOdag(new Date('2027-05-05T09:00:00Z'))).toBe(false)
    expect(arVeckansOdag(new Date('2026-10-06T09:00:00Z'))).toBe(false)
  })
  it('rotationen är deterministisk och byter ö mellan veckor', () => {
    expect(isoVecka(new Date('2026-10-01T00:00:00Z'))).toBe(40)
    const lista = ['a', 'b', 'c', 'd', 'e']
    const v1 = valjVeckansO(lista, new Date('2027-05-04T09:00:00Z'))
    const v2 = valjVeckansO(lista, new Date('2027-05-11T09:00:00Z'))
    expect(v1).toBe(valjVeckansO(lista, new Date('2027-05-04T09:00:00Z')))
    expect(v1).not.toBe(v2)
  })
})
