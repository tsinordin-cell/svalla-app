import { describe, it, expect } from 'vitest'
import { arAutomatisktNamn, namnForslag, fornamnAv } from './onboardingNamn'
import { validateUsername } from './username'

describe('namnsteget i onboardingen', () => {
  it('känner igen namn som databasen satte från e-posten', () => {
    expect(arAutomatisktNamn('nordin.thomas', 'nordin.thomas@live.se')).toBe(true)
    expect(arAutomatisktNamn('Nordin.Thomas', 'nordin.thomas@live.se')).toBe(true)
    expect(arAutomatisktNamn('seglare', 'x@y.se')).toBe(true)
    expect(arAutomatisktNamn('seglare-1a2b3c4d', 'x@y.se')).toBe(true)
    expect(arAutomatisktNamn('', 'x@y.se')).toBe(true)
    expect(arAutomatisktNamn(null, 'x@y.se')).toBe(true)
  })
  it('ett eget namn räknas inte som automatiskt', () => {
    expect(arAutomatisktNamn('skargardsmax', 'max@svalla.se')).toBe(false)
    expect(arAutomatisktNamn('seglarekalle', 'k@y.se')).toBe(false)
    expect(arAutomatisktNamn('tom', null)).toBe(false)
  })
  it('förslaget bygger på namnet, med å ä ö omskrivna', () => {
    expect(namnForslag('Thomas Nordin')).toBe('thomas-nordin')
    expect(namnForslag('Åsa Öberg-Lind')).toBe('asa-oberg-lind')
    expect(namnForslag('  Märta   Ek ')).toBe('marta-ek')
    expect(namnForslag('Jo')).toBe('')
    expect(namnForslag('anna@exempel.se')).toBe('')
    expect(namnForslag(undefined)).toBe('')
  })
  it('förslaget klarar alltid reglerna för användarnamn', () => {
    for (const n of ['Thomas Nordin', 'Åsa Öberg-Lind', 'Bartholomeus Christophersen-Wallenberg', 'Zoë Müller', 'Ø. Søren', 'Ann-Charlotte  von Platen.']) {
      const f = namnForslag(n)
      if (f) expect(validateUsername(f)).toBeNull()
    }
  })
  it('förnamnet till hälsningen', () => {
    expect(fornamnAv('Thomas Nordin')).toBe('Thomas')
    expect(fornamnAv('')).toBe('')
    expect(fornamnAv('a@b.se')).toBe('')
  })
})
