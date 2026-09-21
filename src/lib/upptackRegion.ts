/**
 * Vilken region-flik på /upptack en plats hör till.
 *
 * 2026-09-21: MÄTT — /api/discovery?type=poi gav 686 platser, men flikarna
 * matchade bara fälten archipelago_region = inner/middle/outer/south,
 * goteborg, bohuslan, aland, oland, gotland. 172 platser saknar regionkod och
 * flera har koder som ingen flik kände till (stockholm, north,
 * stockholm_sodra, bohuslan_nord, west_coast). De syntes bara under "Alla".
 * Koden kan också vara fel (Lillströmma låg på Ljusterö).
 *
 * Därför avgör koordinaten först — den är vad kartan faktiskt visar — och
 * regionkoden används bara när punkten ligger utanför alla rutor.
 */

export type UpptackRegion = 'stockholm' | 'goteborg' | 'bohuslan' | 'aland' | 'oland' | 'gotland'

// [minLat, maxLat, minLng, maxLng]. Ungefärliga rutor, grova med flit: de ska
// sortera platser i rätt flik, inte dra administrativa gränser.
const RUTOR: Array<[UpptackRegion, number, number, number, number]> = [
  ['aland', 59.75, 60.75, 19.5, 21.2],
  ['stockholm', 58.6, 60.35, 17.6, 19.5],
  ['gotland', 56.85, 58.05, 17.9, 19.4],
  ['oland', 56.15, 57.4, 16.3, 17.2],
  ['goteborg', 57.4, 57.85, 11.4, 12.3],
  ['bohuslan', 57.85, 59.2, 10.9, 12.0],
]

const KODER: Record<string, UpptackRegion> = {
  stockholm: 'stockholm', inner: 'stockholm', middle: 'stockholm', outer: 'stockholm',
  south: 'stockholm', north: 'stockholm', stockholm_sodra: 'stockholm',
  goteborg: 'goteborg',
  bohuslan: 'bohuslan', bohuslan_nord: 'bohuslan',
  aland: 'aland', oland: 'oland', gotland: 'gotland',
}

export function upptackRegion(p: { latitude?: number | null; longitude?: number | null; archipelago_region?: string | null }): UpptackRegion | null {
  const { latitude: lat, longitude: lng } = p
  if (typeof lat === 'number' && typeof lng === 'number') {
    for (const [r, a, b, c, d] of RUTOR) {
      if (lat >= a && lat <= b && lng >= c && lng <= d) return r
    }
  }
  return (p.archipelago_region && KODER[p.archipelago_region]) || null
}
