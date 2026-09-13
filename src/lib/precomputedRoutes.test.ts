// Lås på precomputed-routes.json — datan som /planera levererar som
// "verifierad sjöled" (confidence 5, före all sökning).
//
// Bakgrund 2026-09-13: rutterna var A*-sökta mot ett raster där Skurusundet
// och Baggensstäket var avskurna. Passagerna öppnades 2026-08-14 men
// precompute räknades aldrig om, så Strömkajen→Dalarö låg kvar på 77 km
// (sjövägen genom Baggensstäket är 42) i en månad. Det här testet gör att
// en sådan glidning mellan raster och precompute syns i CI nästa gång.
import { describe, expect, it } from 'vitest'
import data from './data/precomputed-routes.json'
import { inMaskCoverage, validatePathLand } from './landMask'

type Route = { id: string; from: { lat: number; lng: number }; to: { lat: number; lng: number }; distanceKm: number; waypoints?: number[][] }
const ROUTES = (data as { routes: Route[] }).routes
const by = Object.fromEntries(ROUTES.map(r => [r.id, r]))

const gcKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371.0088, toR = (x: number) => x * Math.PI / 180
  const h = Math.sin(toR(b.lat - a.lat) / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(toR(b.lng - a.lng) / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

describe('precomputed-routes', () => {
  it('varje rutt inom rastrets täckning klarar produktionens landkontroll', () => {
    const fel: string[] = []
    for (const r of ROUTES) {
      if (!r.waypoints || r.waypoints.length < 2) continue
      if (!inMaskCoverage(r.from.lat, r.from.lng) || !inMaskCoverage(r.to.lat, r.to.lng)) continue
      const v = validatePathLand(r.waypoints as Array<[number, number]>)
      if (!v.ok) fel.push(`${r.id} korsar land vid ${v.crossesAt}`)
    }
    expect(fel).toEqual([])
  })

  it('rutterna genom Skurusundet/Baggensstäket är omräknade (2026-09-13)', () => {
    // MÄTT med findRasterPath på rastret byggt 2026-08-14 med passagerna öppna.
    expect(by['stromkajen_to_dalaroe']!.distanceKm).toBeLessThan(45)      // var 77,4
    expect(by['nacka-strand_to_ingaro']!.distanceKm).toBeLessThan(28)     // var 67,3
    expect(by['stromkajen_to_ingaro']!.distanceKm).toBeLessThan(33)       // var 72,1
    expect(by['stromkajen_to_uto']!.distanceKm).toBeLessThan(70)          // var 101,0
    expect(by['stromkajen_to_nynashamn']!.distanceKm).toBeLessThan(85)    // var 116,8
    expect(by['stromkajen_to_gustavsberg']!.distanceKm).toBeLessThan(25)  // var 87,1 → 56,5 → 22,6 (Farstaviken öppnad)
    // Öppet vatten, orörda — sidorna citerar dem som källa (KÄLLA-kommentarer).
    expect(by['stromkajen_to_vaxholm']!.distanceKm).toBe(20.3)
    expect(by['stromkajen_to_sandhamn']!.distanceKm).toBe(58.9)
    expect(by['stromkajen_to_moja']!.distanceKm).toBe(58.7)
  })

  it('kända omvägar > 2,5× fågelvägen — listan ska bara krympa', () => {
    // 2026-09-13 kväll: Farstavikens inlopp öppnat (farbara-passager.json, Tom),
    // Gustavsberg snappar nu till gästhamnen. Strömkajen–Gustavsberg 56,5 → 22,6.
    // Kvar: Gustavsberg–Grinda 39 km mot 14 fågelvägen — rutten går ut via
    // Baggensfjärden och Skurusundet. Om det finns en kortare väg österut
    // (Kolström/Torsbyfjärden) är den inte undersökt; ingen passage får läggas
    // till utan att någon som känner vattnen bekräftat den.
    const kvar = ROUTES
      .filter(r => gcKm(r.from, r.to) > 0.5 && r.distanceKm / gcKm(r.from, r.to) > 2.5)
      .map(r => r.id)
      .sort()
    expect(kvar).toEqual(['grinda_to_gustavsberg', 'gustavsberg_to_grinda'])
  })
})
