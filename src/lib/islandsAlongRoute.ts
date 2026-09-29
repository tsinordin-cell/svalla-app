import { ALL_ISLANDS, type Island } from '../app/o/island-data'
import { ISLAND_COORD_MAP } from './islandCoords'
import { crossTrack } from './planner'
import { chipsFor, type IslandChip } from './islandChips'

/**
 * Öar längs en planerad rutt (2026-09-28, ruttplanerarens nästa steg).
 *
 * Ruttsidan visade krogar och bryggor ur platstabellen men inte öarna —
 * Svallas starkaste innehåll. Här väljs de ösidor som ligger nära den räta
 * linjen start→mål, i ordning längs rutten.
 *
 * Koordinat: ösidans egen (island.lat/lng) i första hand, annars
 * ISLAND_COORD_MAP (55 Stockholmsöar, kontrollerade mot Lantmäteriet/OSM).
 * Öar utan koordinat (i dag 47, mest Bohuslän/Göteborg/Gotland) kan inte
 * hittas och utelämnas tyst — det är tomt, inte fel.
 *
 * Chips bygger bara på vad ösidan faktiskt innehåller (se lib/islandChips.ts,
 * delad med dagsplaneraren). Inget hittas på.
 */

export type { IslandChip }

export type IslandAlongRoute = {
  slug: string
  name: string
  tagline: string
  regionLabel: string
  lat: number
  lng: number
  /** Vinkelrätt avstånd till linjen start→mål, km, en decimal. */
  distKm: number
  /** Läge längs rutten 0–1 (0 = start, 1 = mål). */
  t: number
  chips: IslandChip[]
}

const REGION_LABEL: Record<Island['region'], string> = {
  norra: 'Norra skärgården',
  mellersta: 'Mellersta skärgården',
  'södra': 'Södra skärgården',
  bohuslan: 'Bohuslän',
  goteborg: 'Göteborgs skärgård',
  ovriga: '',
}

function coordFor(island: Island): { lat: number; lng: number } | null {
  if (typeof island.lat === 'number' && typeof island.lng === 'number') return { lat: island.lat, lng: island.lng }
  const c = ISLAND_COORD_MAP[island.slug]
  return c ? { lat: c.lat, lng: c.lng } : null
}

/**
 * Öar inom `maxKm` från linjen start→mål, sorterade från start till mål.
 * Start- och målpunkten själva räknas med om de är öar med ösida — det är
 * dit man ska, och sidan är det bästa vi har om platsen.
 */
export function islandsAlongRoute(
  startLat: number, startLng: number,
  endLat: number, endLng: number,
  opts: { maxKm?: number; limit?: number } = {},
): IslandAlongRoute[] {
  const maxKm = opts.maxKm ?? 5
  const limit = opts.limit ?? 8
  const out: IslandAlongRoute[] = []
  for (const island of ALL_ISLANDS) {
    const c = coordFor(island)
    if (!c) continue
    const { distKm, t } = crossTrack(c.lat, c.lng, startLat, startLng, endLat, endLng)
    if (distKm > maxKm) continue
    out.push({
      slug: island.slug,
      name: island.name,
      tagline: island.tagline,
      regionLabel: REGION_LABEL[island.region] ?? '',
      lat: c.lat, lng: c.lng,
      distKm: Math.round(distKm * 10) / 10,
      t,
      chips: chipsFor(island),
    })
  }
  out.sort((a, b) => a.t - b.t || a.distKm - b.distKm)
  return out.slice(0, limit)
}
