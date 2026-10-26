import { describe, it, expect } from 'vitest'
import { klassaOarPaTuren, ISLAND_COORD_MAP, BESOK_MIN_S } from './islandCoords'

const G = ISLAND_COORD_MAP['grinda']!          // 59.4109, 18.5618, radie 2.5 km
const F = ISLAND_COORD_MAP['fjaderholmarna']!  // 59.3333, 18.1833, radie 1.5 km
const STHLM = { lat: 59.3290, lng: 18.0775 }
// Strömkajen → förbi Fjäderholmarna (inom 1,5 km) → ut på fjärden, 11 punkter som en riktig inspelning
const FORBI = [STHLM, { lat: 59.327, lng: 18.10 }, { lat: 59.330, lng: 18.13 }, { lat: 59.334, lng: 18.16 }, { lat: 59.337, lng: 18.185 },
  { lat: 59.340, lng: 18.21 }, { lat: 59.345, lng: 18.24 }, { lat: 59.350, lng: 18.27 }, { lat: 59.355, lng: 18.29 }, { lat: 59.36, lng: 18.30 }, { lat: 59.365, lng: 18.32 }]

describe('klassaOarPaTuren', () => {
  it('turen slutar vid ön → besökt', () => {
    const r = klassaOarPaTuren([STHLM, { lat: 59.331, lng: 18.14 }, { lat: F.lat, lng: F.lng }])
    expect(r.besokta).toEqual(['fjaderholmarna'])
    expect(r.passerade).toEqual([])
  })
  it('turen börjar vid ön → besökt', () => {
    const r = klassaOarPaTuren([{ lat: G.lat, lng: G.lng }, { lat: 59.38, lng: 18.40 }, STHLM])
    expect(r.besokta).toContain('grinda')
  })
  it('kör förbi utan att stanna → passerad, inte besökt', () => {
    // Förbi Fjäderholmarna (inom 1,5 km) på väg till Vaxholm-hållet, slutar ute på fjärden
    const r = klassaOarPaTuren(FORBI)
    expect(r.passerade).toContain('fjaderholmarna')
    expect(r.besokta).not.toContain('fjaderholmarna')
  })
  it('stopp på minst tio minuter vid ön → besökt', () => {
    const pts = FORBI
    const kort = klassaOarPaTuren(pts, [{ lat: 59.337, lng: 18.185, durationSeconds: BESOK_MIN_S - 1 }])
    expect(kort.besokta).not.toContain('fjaderholmarna')
    const langt = klassaOarPaTuren(pts, [{ lat: 59.337, lng: 18.185, durationSeconds: BESOK_MIN_S }])
    expect(langt.besokta).toContain('fjaderholmarna')
    expect(langt.passerade).not.toContain('fjaderholmarna')
  })
  it('inga punkter → inget', () => {
    expect(klassaOarPaTuren([])).toEqual({ besokta: [], passerade: [] })
  })
  it('en ö hamnar aldrig i båda listorna', () => {
    const r = klassaOarPaTuren([{ lat: G.lat, lng: G.lng }, { lat: 59.338, lng: 18.19 }, STHLM])
    for (const s of r.besokta) expect(r.passerade).not.toContain(s)
  })
})
