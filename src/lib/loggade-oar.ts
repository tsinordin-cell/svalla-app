/**
 * Öar ur loggade turer (2026-10-24).
 *
 * - oNamn: visningsnamn för en ö-slug ("moja" → "Möja"). Done-skärmen i
 *   /spara gjorde förut om slugen till versaler och visade "Moja", "Gallno".
 * - oarForPlats: vilka öar en snabb-loggad tur hör till. Min skärgård säger
 *   "logga en tur, så dyker öarna upp här", men bara GPS-turer gjorde det.
 *   Har användaren valt ett förslag i platssökningen används punkten (samma
 *   radie som för GPS-rutter), annars namnet, del för del ("Grinda, Värmdö").
 * - kortPlats: första delen av ett geokodat namn ("Sandhamn, Stockholms län,
 *   Sverige" → "Sandhamn"), för meningar som "Välkommen till Sandhamn-gänget."
 */
import { ISLAND_COORDS, ISLAND_COORD_MAP, detectVisitedIslands } from './islandCoords'

export function oNamn(slug: string): string {
  const k = ISLAND_COORD_MAP[slug]
  if (k) return k.name
  return slug.replace(/-/g, ' ').replace(/(^|\s)\S/g, c => c.toUpperCase())
}

function norm(s: string): string {
  return s.normalize('NFC').trim().toLocaleLowerCase('sv-SE')
}

export function oarForPlats(namn: string, lat?: number, lng?: number): string[] {
  if (typeof lat === 'number' && typeof lng === 'number' && Number.isFinite(lat) && Number.isFinite(lng)) {
    const traff = detectVisitedIslands([{ lat, lng }])
    if (traff.length > 0) return traff
  }
  const delar = namn.split(',').map(norm).filter(Boolean)
  const slugs: string[] = []
  for (const d of delar) {
    const o = ISLAND_COORDS.find(i => norm(i.name) === d)
    if (o && !slugs.includes(o.slug)) slugs.push(o.slug)
  }
  return slugs
}

export function kortPlats(namn: string): string {
  return (namn.split(',')[0] ?? '').trim()
}

export function markeradText(antal: number): string {
  return antal === 1
    ? 'Markerad automatiskt utifrån din GPS-rutt'
    : 'Markerade automatiskt utifrån din GPS-rutt'
}
