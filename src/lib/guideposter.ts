/**
 * FÖRHANDSVISNING 2026-11-20 (Max: guider och dagsplaner slås ihop, man väljer område som på
 * krog-, boende- och aktivitetssidorna). Alla guider och dagsplaner i en lista, var och en
 * kopplad till ett eller flera av samma områden som där (OMRADEN i lib/omraden).
 *
 * Inget gissas. Området tas, i den här ordningen, ur:
 *  1. Öarna som posten redan är kopplad till: GUIDE_ISLAND_MAP för guider, islandSlugs för
 *     dagsplaner. Öns regionLabel i island-data avgör området.
 *  2. Ortnamn i titeln: namn på öar i island-data, eller orter och landskap i ORTER nedan.
 *  3. Guidens region i guides-data (GUIDE_REGION_MAP). "Göteborg & Bohuslän" blir båda områdena,
 *     "Praktiska guider" blir Hela landet.
 * Adresserna ändras inte: guider ligger kvar på /guider/…, dagsplaner på /resetips/….
 */
import { PUBLICERADE_GUIDER, getGuideRegion, type GuideRegion } from '@/app/guider/guides-data'
import { GUIDE_ISLAND_MAP } from '@/app/guider/guide-island-map'
import { TRIPS } from '@/app/resetips/trips-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { OMRADEN } from '@/lib/omraden'

export type GuideTyp = 'Dagsplan' | 'Guide'
export type GuidePost = {
  typ: GuideTyp
  titel: string
  text: string
  href: string
  omraden: string[]
  utvald?: boolean
}

export const HELA_LANDET = 'Hela landet'
export const UTOMLANDS = 'Utomlands'

const omradeForEtikett = new Map<string, string>()
for (const o of OMRADEN) for (const e of o.etiketter) omradeForEtikett.set(e, o.namn)

const omradeForO = new Map<string, string>()
for (const i of ALL_ISLANDS) {
  const o = i.regionLabel ? omradeForEtikett.get(i.regionLabel) : undefined
  if (o) omradeForO.set(i.slug, o)
}

// Orter och landskap som kan stå i en titel, och området de ligger i.
const ORTER: [RegExp, string][] = [
  [/Roslagen/i, 'Roslagen'],
  [/Bohuslän|Koster|Strömstad|Skaftö|Fiskebäckskil|Tanum/i, 'Bohuslän'],
  [/Gotland|Visby|Fårö/i, 'Gotland'],
  [/Öland|Borgholm/i, 'Kalmar och Öland'],
  [/Blekinge|Karlskrona/i, 'Blekinge'],
  [/Halland|Varberg/i, 'Halland'],
  [/Östergötland|Östgöta/i, 'Östergötland'],
  [/Sörmland/i, 'Sörmland'],
  [/Höga Kusten/i, 'Norrlandskusten'],
  [/Göteborg/i, 'Göteborgs skärgård'],
  [/Stockholms skärgård|Stockholm(?![a-zåäö])|Gustavsberg|Värmdö|Nacka/i, 'Stockholms skärgård'],
  [/Båstad|Hovs hallar/i, 'Skåne och Öresund'],
  [/Mälaren/i, 'Insjöar'],
  [/Åland/i, 'Åland'],
  [/Bornholm/i, UTOMLANDS],
]

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const ONAMN: [RegExp, string][] = ALL_ISLANDS
  .filter(i => i.name && i.name.length > 3 && omradeForO.has(i.slug))
  .map(i => [new RegExp(`(^|[^\\p{L}])${esc(i.name)}($|[^\\p{L}])`, 'u'), omradeForO.get(i.slug)!])

const GROV: Record<GuideRegion, string[]> = {
  stockholm: ['Stockholms skärgård'],
  goteborg: ['Göteborgs skärgård', 'Bohuslän'],
  gotland: ['Gotland'],
  oland: ['Kalmar och Öland'],
  hogakusten: ['Norrlandskusten'],
  sydkusten: ['Blekinge', 'Skåne och Öresund', 'Halland'],
  utlandet: ['Åland', UTOMLANDS],
  sverige: [HELA_LANDET],
}

function omradenFor(titel: string, oar: string[] | undefined, grov: GuideRegion | null): string[] {
  const s = new Set<string>()
  for (const o of oar ?? []) { const n = omradeForO.get(o); if (n) s.add(n) }
  if (s.size === 0) {
    for (const [re, n] of ORTER) if (re.test(titel)) s.add(n)
    for (const [re, n] of ONAMN) if (re.test(titel)) s.add(n)
  }
  if (s.size === 0 && grov) for (const n of GROV[grov]) s.add(n)
  if (s.size === 0) s.add(HELA_LANDET)
  return [...s]
}

export function allaGuidePoster(): GuidePost[] {
  const dagsplaner: GuidePost[] = TRIPS.map(t => ({
    typ: 'Dagsplan',
    titel: t.title,
    text: t.tagline,
    href: `/resetips/${t.slug}`,
    omraden: omradenFor(t.title, t.islandSlugs, null),
    utvald: !!t.featured,
  }))
  const guider: GuidePost[] = PUBLICERADE_GUIDER.map(g => ({
    typ: 'Guide',
    titel: g.title,
    text: g.excerpt,
    href: `/guider/${g.slug}`,
    omraden: omradenFor(g.title, GUIDE_ISLAND_MAP[g.slug], getGuideRegion(g.slug)),
    utvald: !!g.featured,
  }))
  // Utvalda först, sedan dagsplaner och guider i den ordning de står i datafilerna.
  return [...dagsplaner, ...guider].sort((a, b) => Number(!!b.utvald) - Number(!!a.utvald))
}
