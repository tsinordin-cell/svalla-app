import { describe, it, expect } from 'vitest'
import { STILAR, arStil, tillgangligaStilar, forvaldStil, ruttPath, ruttStartSlut, formatTid, formatDelTid, delstrackStaplar, talRutor, ruttArAnvandbar, avstandM, datumLang, turRubrik, harTal } from './dela-klistermarken'

describe('stilar', () => {
  it('känner igen giltiga stilar', () => {
    expect(arStil('rutt')).toBe(true)
    expect(arStil('photo')).toBe(true)
    expect(arStil('banan')).toBe(false)
    expect(arStil(null)).toBe(false)
  })
  it('ger bara det turen har underlag för', () => {
    const bara = tillgangligaStilar({ harBild: false, harRutt: false, agare: false }).map(s => s.id)
    expect(bara).toEqual(['tal'])
    const gps = tillgangligaStilar({ harBild: false, harRutt: true, agare: true }).map(s => s.id)
    expect(gps).toEqual(['map', 'rutt', 'tal', 'rutt-tal', 'delstrackor'])
    const bild = tillgangligaStilar({ harBild: true, harRutt: false, agare: true }).map(s => s.id)
    expect(bild).toEqual(['photo', 'tal'])
    const annan = tillgangligaStilar({ harBild: true, harRutt: true, agare: false }).map(s => s.id)
    expect(annan).not.toContain('delstrackor')
  })
  it('en tur utan tal får inget Tal-klistermärke utan kortet utan underlag (2026-10-26)', () => {
    const inget = tillgangligaStilar({ harBild: false, harRutt: false, agare: true, harTal: false })
    expect(inget.map(s => s.id)).toEqual(['photo'])
    expect(inget[0]!.namn).toBe('Kort')
    expect(forvaldStil({ harBild: false, harRutt: false, harTal: false })).toBe('photo')
    expect(harTal({ distanceNM: 0, sekunder: 4, toppKn: 0, snittKn: 0 })).toBe(false)
    expect(harTal({ distanceNM: 3.62, sekunder: 737, toppKn: 22.3, snittKn: 22 })).toBe(true)
  })
  it('väljer förvald mall', () => {
    expect(forvaldStil({ harBild: true, harRutt: true })).toBe('photo')
    expect(forvaldStil({ harBild: false, harRutt: true })).toBe('map')
    expect(forvaldStil({ harBild: false, harRutt: false })).toBe('tal')
  })
  it('klistermärkena är genomskinliga och korten inte', () => {
    expect(STILAR.filter(s => s.klistermarke).map(s => s.id)).toEqual(['rutt', 'tal', 'rutt-tal', 'delstrackor'])
    expect(STILAR.filter(s => !s.klistermarke).every(s => s.hojd === 1920)).toBe(true)
  })
})

describe('ruttPath', () => {
  const pts = [{ lat: 59.329, lng: 18.0775 }, { lat: 59.3215, lng: 18.087 }, { lat: 59.3325, lng: 18.18 }]
  it('håller sig inom rutan med marginal', () => {
    const d = ruttPath(pts, 1000, 1000, 0.1)
    const tal = d.match(/-?\d+(\.\d+)?/g)!.map(Number)
    const xs = tal.filter((_, i) => i % 2 === 0), ys = tal.filter((_, i) => i % 2 === 1)
    expect(Math.min(...xs)).toBeGreaterThanOrEqual(99)
    expect(Math.max(...xs)).toBeLessThanOrEqual(901)
    expect(Math.min(...ys)).toBeGreaterThanOrEqual(99)
    expect(Math.max(...ys)).toBeLessThanOrEqual(901)
  })
  it('behåller proportionerna: en östvästlig rutt fyller bredden, inte höjden', () => {
    const d = ruttPath(pts, 1000, 1000, 0.1)
    const tal = d.match(/-?\d+(\.\d+)?/g)!.map(Number)
    const xs = tal.filter((_, i) => i % 2 === 0), ys = tal.filter((_, i) => i % 2 === 1)
    expect(Math.max(...xs) - Math.min(...xs)).toBeCloseTo(800, 0)
    expect(Math.max(...ys) - Math.min(...ys)).toBeLessThan(400)
  })
  it('norr är uppåt', () => {
    const ss = ruttStartSlut(pts, 1000, 1000)!
    expect(ss.slut[1]).toBeLessThan(ss.start[1])   // slutet (59,3325) ligger norr om starten (59,329)
  })
  it('ger tom path för färre än två punkter', () => {
    expect(ruttPath([pts[0]!], 100, 100)).toBe('')
    expect(ruttStartSlut([], 100, 100)).toBeNull()
  })
})

describe('format', () => {
  it('tid', () => {
    expect(formatTid(47)).toBe('47 s')
    expect(formatTid(737)).toBe('12 min')
    expect(formatTid(3900)).toBe('1 h 5 min')
    expect(formatTid(7200)).toBe('2 h')
  })
  it('deltid', () => {
    expect(formatDelTid(163)).toBe('2:43')
    expect(formatDelTid(3723)).toBe('1:02:03')
  })
  it('staplar', () => {
    const st = delstrackStaplar([
      { index: 1, distanceNM: 1, seconds: 163, avgKnots: 22.0 },
      { index: 2, distanceNM: 1, seconds: 235, avgKnots: 15.3 },
      { index: 3, distanceNM: 0.67, seconds: 175, avgKnots: 13.8 },
    ])
    expect(st[0]).toEqual({ etikett: '1', tid: '2:43', fart: '22.0 kn', andel: 1 })
    expect(st[1]!.andel).toBeCloseTo(15.3 / 22, 3)
    expect(st[2]!.etikett).toBe('3 (0,67)')
  })
  it('staplar högst tolv', () => {
    const many = Array.from({ length: 20 }, (_, i) => ({ index: i + 1, distanceNM: 1, seconds: 200, avgKnots: 18 }))
    expect(delstrackStaplar(many)).toHaveLength(12)
  })
  it('talrutor hoppar över det som saknas', () => {
    expect(talRutor({ distanceNM: 3.62, sekunder: 737, toppKn: 22.3, snittKn: 22.0 }).map(r => r.etikett)).toEqual(['DISTANS', 'TID', 'TOPPFART'])
    expect(talRutor({ distanceNM: 0, sekunder: 0, toppKn: 0, snittKn: 0 })).toEqual([])
    expect(talRutor({ distanceNM: 1.5, sekunder: 600, toppKn: null, snittKn: 4.2 }).map(r => r.etikett)).toEqual(['DISTANS', 'TID', 'SNITTFART'])
  })
})

describe('ruttArAnvandbar (2026-10-26: testtur på samma plats gav gatukarta med en prick)', () => {
  it('nekar tomt, en punkt och punkter inom några meter', () => {
    expect(ruttArAnvandbar(null)).toBe(false)
    expect(ruttArAnvandbar([])).toBe(false)
    expect(ruttArAnvandbar([{ lat: 38.66, lng: -121.52 }])).toBe(false)
    expect(ruttArAnvandbar([{ lat: 38.66000, lng: -121.52000 }, { lat: 38.66005, lng: -121.52004 }])).toBe(false)
  })
  it('godkänner Strömkajen–Fjäderholmarna', () => {
    expect(ruttArAnvandbar([{ lat: 59.329, lng: 18.0775 }, { lat: 59.3325, lng: 18.18 }])).toBe(true)
  })
  it('avstandM: Strömkajen–Fjäderholmarna är ungefär 5,8 km', () => {
    const m = avstandM({ lat: 59.329, lng: 18.0775 }, { lat: 59.3325, lng: 18.18 })
    expect(m).toBeGreaterThan(5500)
    expect(m).toBeLessThan(6100)
  })
})

describe('datumLang och turRubrik', () => {
  it('skriver datumet på svenska i svensk tid', () => {
    expect(datumLang('2026-10-25T23:45:59.293+00:00')).toBe('26 oktober 2026')
    expect(datumLang('2026-04-24T05:54:05.974+00:00')).toBe('24 april 2026')
    expect(datumLang(null)).toBeNull()
    expect(datumLang('trasigt')).toBeNull()
  })
  it('rubrik utan platsnamn följer båttypen', () => {
    expect(turRubrik('Segelbåt')).toBe('Segeltur')
    expect(turRubrik('Motorbåt')).toBe('Båttur')
    expect(turRubrik('Kajak')).toBe('Paddeltur')
    expect(turRubrik(null)).toBe('Tur på sjön')
  })
})
