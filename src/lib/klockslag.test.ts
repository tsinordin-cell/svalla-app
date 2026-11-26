// Klockslag i Svallas texter (faktagranskningen, mallarnas runda 5, 2026-11-10, och runda 6, 2026-11-16).
// Regeln ligger i src/lib/klockslag.mjs och används av scripts/generera-kallor.mjs (källistan), FAQ-svaren och
// korten med färdsätt (src/lib/mallRegler.ts).
import { describe, it, expect } from 'vitest'
import { ersattKlockslag, harKlockslag, hittaKlockslag } from './klockslag.mjs'
import { KALLOR_PER_O } from '../app/o/kallor.generated'

describe('timintervall i en parentes (mo01-k046, mallarnas runda 7)', () => {
  it('räknar "(05–21)" och "(05 till 21)" som klockslag, men inte veckor, datum eller antal', () => {
    expect(hittaKlockslag('Vardagar 26 ordinarie turer Burö till Rörö (05 till 21), därtill kallelseturer nattetid')).toEqual(['05 till 21'])
    expect(hittaKlockslag('Burö–Rörö (05–21)')).toEqual(['05–21'])
    expect(hittaKlockslag('Toatömning längst ut (08 till 18).')).toEqual(['08 till 18'])
    for (const t of ['högsäsong (vecka 25 till 33)', 'Hösten 2026 (17/8 till 11/10)', 'rum (2 till 4)', 'Fre - Sönd (25 - 27 sept)', 'årskurs (1 till 9)'])
      expect(hittaKlockslag(t)).toEqual([])
  })
  it('räknar öppettider efter en dag med "till"', () => {
    expect(hittaKlockslag('öppet dagligen 08 till 20')).toEqual(['08 till 20'])
  })
})

describe('ersattKlockslag', () => {
  it('ersätter klockslag och intervall med …', () => {
    expect(ersattKlockslag('Stavsnäs 20.12 → Sandhamn 20.50 (38 min), 09.45 → 10.45 (60 min)'))
      .toBe('Stavsnäs … → Sandhamn … (38 min), … (60 min)')
    expect(ersattKlockslag('Ropsten 07.05 → Storholmen södra 07.33')).toBe('Ropsten … → Storholmen södra …')
    expect(ersattKlockslag('Söndag 10:00–16:00 Måndag–torsdag stängt')).toBe('Söndag … Måndag–torsdag stängt')
    expect(ersattKlockslag('between 9:00 AM and 6:00 PM')).toBe('between … and …')
  })

  it('tar "kl." utan minuter och fotnotsbokstäver', () => {
    expect(ersattKlockslag('Öppet alla dagar mellan kl. 11–16.')).toBe('Öppet alla dagar mellan ….')
    expect(ersattKlockslag('innan kl 18 undantagsvis')).toBe('innan … undantagsvis')
    expect(ersattKlockslag('Simpnäs brygga 10.05b 12.00 14.30')).toBe('Simpnäs brygga …')
    expect(ersattKlockslag('alla dagar kl. 08–18. Boka hos Blekingetrafiken')).toBe('alla dagar …. Boka hos Blekingetrafiken')
    expect(ersattKlockslag('klockan 9 varje dag')).toBe('… varje dag')
  })

  // Kontrollantens fynd ma5029 (omkontrollen av runda 5, 2026-11-10): de stod kvar i källistan.
  it('tar mönstren som stod kvar i källistan efter runda 5', () => {
    expect(ersattKlockslag('Strömkajen → Finnhamn: 07.15–10.25, 08.15–12.00 m.fl., dvs. ca 3–4 h.'))
      .toBe('Strömkajen → Finnhamn: … m.fl., dvs. ca 3–4 h.')
    expect(ersattKlockslag('Vår restaurang har öppet varje dag från kl.11.30-21.00, fram till 31 augusti.'))
      .toBe('Vår restaurang har öppet varje dag från …, fram till 31 augusti.')
    expect(ersattKlockslag('långtidsparkering som är öppen 05:00–24:00 (övrig tid låst)')).toBe('långtidsparkering som är öppen … (övrig tid låst)')
    expect(ersattKlockslag('Broöppning kan erhållas dagligen varje hel timme kl 0800 - 2000')).toBe('Broöppning kan erhållas dagligen varje hel timme …')
    expect(ersattKlockslag('Den 16 nov 1955 kl 1300 klipptes bandet')).toBe('Den 16 nov 1955 … klipptes bandet')
    expect(ersattKlockslag('Juli Alla dagar 10 - 18 Augusti alla dagar 11 - 16, Vi har öppet nu i helgen Fre - Sönd (25 - 27 sept) 11 - 16'))
      .toBe('Juli Alla dagar … Augusti alla dagar …, Vi har öppet nu i helgen Fre - Sönd (25 - 27 sept) …')
    expect(ersattKlockslag('sista bussen går vid 22-tiden på fredagar')).toBe('sista bussen går vid … på fredagar')
  })

  it('låter årtal, avstånd, priser, datum och andra tal stå', () => {
    for (const t of [
      'fastigheten Fjärdlång 1:18 till', 'ett djup på 2.46 meter', 'Ca 1.5 km', 'version 1.20.3', 'datum 10.05.2026',
      'GÄLLER 2 APRIL 2026 – 18 JUNI 2026, 21A ÅRSTA – UTÖ', 'Den 16 nov 1955 klipptes bandet', 'tidtabell 2025–2026',
      'byggd på 1890-talet', 'avståndet är 2–3 km', 'ca 11 - 16 km', 'Kajak från 370 kr/halvdag (2026)', 'Restid ca 1.15 tim',
      'Vår och höst 2026 går 5–6 turer till Fejan på vardagar', 'Fre - Sönd (25 - 27 sept)', 'öppet fredag–söndag 25–27 september',
      'öppet 1–2 dagar i veckan', 'kundtjänst 08-600 10 00', '1–26 juli går båten', 'cirka 70 gästplatser', 'zon A, 3 h 15 min',
    ]) {
      expect(harKlockslag(t)).toBe(false)
      expect(ersattKlockslag(t)).toBe(t)
    }
  })

  it('rör inte ett citat utan klockslag', () => {
    const t = 'Vi har en microlivs med självbetjäning som är öppen dygnet runt. / Vi  rekommenderar'
    expect(ersattKlockslag(t)).toBe(t)
  })

  it('hittar det som står kvar', () => {
    expect(hittaKlockslag('Dagligen kl 10-16; 15/6 – 16/8 Dagligen kl 10-18')).toEqual(['kl 10-16', 'kl 10-18'])
    expect(hittaKlockslag('går båten kl. 08.00 från Fårösund och är tillbaka vid 21-tiden')).toEqual(['kl. 08.00', '21-tiden'])
  })
})

describe('kallor.generated.ts', () => {
  it('har inga klockslag i något citat (generera-kallor.mjs --kontroll larmar annars)', () => {
    const kvar = Object.entries(KALLOR_PER_O).flatMap(([slug, kallor]) =>
      kallor.filter(k => harKlockslag(k.vad)).map(k => `${slug}: ${k.url}`))
    expect(kvar).toEqual([])
  })
})
