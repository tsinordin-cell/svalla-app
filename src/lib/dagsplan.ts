import { ALL_ISLANDS, type Island } from '../app/o/island-data'
import { chipsFor, type IslandChip } from './islandChips'
import { ISLAND_TRANSIT, ISLAND_NO_TRANSIT, STROMKAJEN_ID, CENTRALEN_ID, NYNASHAMN_ID, SALTHOLMEN_ID } from './transit-stops'

/**
 * Dagsplaneraren "Din dag i skärgården" (2026-09-28).
 *
 * Frågan besökaren har: "jag står här, den här dagen, vill göra det här —
 * vart åker jag och hur?" Svaret byggs bara på sådant vi kan stå för:
 *
 *  - Vilka öar som nås från en startpunkt avgörs av (a) Trafiklab-verifierade
 *    hållplatser i ISLAND_TRANSIT med startpunkten som origin, (b) ösidans
 *    källbelagda "Ta sig dit"-text som nämner startpunkten, (c) transport_meta
 *    .nearest_hub. Inget avstånds- eller hastighetsantagande används — den
 *    gamla haversine/40 km/h-uppskattningen på /utflykt är borttagen ur vyn.
 *  - Restid är ösidans facts.travel_time, med proveniens ('matt' = källbelagd).
 *  - Båttider för vald dag hämtas live från Trafiklab i klienten, per ö, först
 *    när besökaren ber om det (annars 2 anrop × 30 öar per sidvisning).
 *  - Chips (bad, krog, barn …) kommer från lib/islandChips.ts: bara det ösidan
 *    faktiskt listar.
 */

export type DagHub = {
  slug: string
  /** Kort etikett i knappraden. */
  label: string
  /** Hela namnet, visas i rubriken "från …". */
  name: string
  /** Trafiklab-origin-id:n som räknas som "härifrån". */
  originIds: string[]
  /** Ord i ösidans Ta sig dit/nearest_hub som betyder att ön nås härifrån (gemener). */
  keywords: string[]
  /** Kuraterade slugs (från gamla /utflykt). Bara sådana som finns behålls. */
  extra: string[]
}

export const ALLA_HUB_SLUG = 'alla'

export const DAG_HUBS: DagHub[] = [
  {
    slug: 'stockholm', label: 'Stockholm', name: 'Stockholm (Strömkajen, Slussen, Centralen)',
    originIds: [STROMKAJEN_ID, CENTRALEN_ID],
    keywords: ['strömkajen', 'strandvägen', 'slussen', 'nybrokajen', 'vårby', 'stockholms central', 'stockholm central', 't-centralen'],
    extra: ['vaxholm', 'grinda', 'finnhamn', 'sandhamn', 'moja', 'svartso', 'ingmarso', 'gallno', 'fjaderholmarna'],
  },
  {
    slug: 'stavsnas', label: 'Stavsnäs', name: 'Stavsnäs vinterhamn',
    originIds: [], keywords: ['stavsnäs'],
    extra: ['sandhamn', 'moja', 'runmaro', 'gallno', 'svartso', 'namdo', 'bullero'],
  },
  {
    slug: 'nynashamn', label: 'Nynäshamn', name: 'Nynäshamn',
    originIds: [NYNASHAMN_ID], keywords: ['nynäshamn'],
    extra: ['uto', 'nattaro', 'orno', 'fjardlang', 'landsort'],
  },
  {
    slug: 'vaxholm', label: 'Vaxholm', name: 'Vaxholm',
    originIds: [], keywords: ['vaxholm'],
    extra: ['rindo', 'tynningo', 'grinda', 'svartso', 'ingmarso', 'resaro'],
  },
  {
    slug: 'dalaro', label: 'Dalarö', name: 'Dalarö',
    originIds: [], keywords: ['dalarö'],
    extra: ['orno', 'fjardlang', 'uto', 'kymmendo', 'smaadalaro'],
  },
  {
    slug: 'norra', label: 'Norrtälje', name: 'Norrtälje (Simpnäs, Räfsnäs, Furusund)',
    originIds: [], keywords: ['simpnäs', 'räfsnäs', 'norrtälje', 'furusund'],
    extra: ['arholma', 'rodloga', 'fejan', 'furusund', 'blido', 'yxlan', 'norrora', 'graddo', 'vaddo', 'singo', 'lido'],
  },
  {
    slug: 'goteborg', label: 'Göteborg', name: 'Göteborg (Saltholmen, Hönöleden)',
    originIds: [SALTHOLMEN_ID], keywords: ['saltholmen', 'lilla varholmen', 'hönöleden', 'burö'],
    extra: ['donso', 'styrso', 'branno', 'vrango', 'asperon', 'vinga', 'hono', 'ockero', 'roro'],
  },
  {
    slug: 'bohuslan', label: 'Bohuslän', name: 'Bohuslän (Lysekil, Orust, Tjörn)',
    originIds: [], keywords: ['lysekil', 'orust', 'tjörn', 'tuvesvik', 'rönnäng', 'stenungsund', 'marstrand', 'smögen'],
    extra: ['lysekil', 'smogen', 'grundsund', 'kungshamn', 'gullholmen', 'karingon', 'astol', 'dyron', 'kladesholmen', 'marstrand', 'orust', 'tjorn', 'fjallbacka', 'hamburgsund', 'grebbestad', 'kosterhavet', 'pater-noster'],
  },
  {
    slug: ALLA_HUB_SLUG, label: 'Hela kusten', name: 'hela kusten',
    originIds: [], keywords: [], extra: [],
  },
]

export function getDagHub(slug: string | null | undefined): DagHub | undefined {
  if (!slug) return undefined
  return DAG_HUBS.find(h => h.slug === slug)
}

export type DagIsland = {
  slug: string
  name: string
  slag: 'ö' | 'ort' | 'nationalpark'
  tagline: string
  regionLabel: string
  /** facts.travel_time från ösidan, '' om saknas. */
  travelTime: string
  /** true = facts_provenance.travel_time === 'matt' (källbelagd). */
  travelTimeMatt: boolean
  chips: IslandChip[]
  /** Ön finns i ISLAND_TRANSIT → båttider kan hämtas live. */
  hasTransit: boolean
  /** Uppmätt skäl till att ingen kollektivtrafik går, annars null. */
  noTransit: string | null
  /** Vilka startpunkter ön nås från (hub-slugs). */
  hubs: string[]
  /** Hur starkt hub-matchningen är per hub: 2 = Trafiklab-origin, 1 = ösidans text/nearest_hub, 0 = kuraterad lista. */
  hubStrength: Record<string, number>
}

const REGION_LABEL: Record<Island['region'], string> = {
  norra: 'Norra skärgården',
  mellersta: 'Mellersta skärgården',
  'södra': 'Södra skärgården',
  bohuslan: 'Bohuslän',
  goteborg: 'Göteborgs skärgård',
  ovriga: '',
}

function hubMatch(island: Island, hub: DagHub): number | null {
  const transit = ISLAND_TRANSIT[island.slug]
  if (transit && hub.originIds.includes(transit.originStopId)) return 2
  if (hub.keywords.length > 0) {
    const text = [
      ...(island.getting_there ?? []).map(g => `${g.from ?? ''} ${g.desc}`),
      island.transport_meta?.nearest_hub ?? '',
    ].join(' ').toLowerCase()
    if (hub.keywords.some(k => text.includes(k))) return 1
  }
  if (hub.extra.includes(island.slug)) return 0
  return null
}

let cache: DagIsland[] | null = null

/** Alla öar med den data dagsplaneraren behöver. Räknas en gång per process. */
export function dagIslands(): DagIsland[] {
  if (cache) return cache
  const out: DagIsland[] = []
  for (const island of ALL_ISLANDS) {
    const hubs: string[] = []
    const hubStrength: Record<string, number> = {}
    for (const hub of DAG_HUBS) {
      if (hub.slug === ALLA_HUB_SLUG) continue
      const m = hubMatch(island, hub)
      if (m === null) continue
      hubs.push(hub.slug)
      hubStrength[hub.slug] = m
    }
    out.push({
      slug: island.slug,
      name: island.name,
      slag: island.slag ?? 'ö',
      tagline: island.tagline,
      regionLabel: island.regionLabel ?? REGION_LABEL[island.region] ?? '',
      travelTime: island.facts?.travel_time ?? '',
      travelTimeMatt: island.facts_provenance?.travel_time === 'matt',
      chips: chipsFor(island),
      hasTransit: Boolean(ISLAND_TRANSIT[island.slug]),
      noTransit: ISLAND_NO_TRANSIT[island.slug] ?? null,
      hubs,
      hubStrength,
    })
  }
  cache = out
  return out
}

/**
 * Öar för en startpunkt och valda önskemål, i den ordning de ska visas.
 * Alla valda chips måste finnas (AND). Ordning: Trafiklab-verifierad trafik
 * härifrån först, sedan ösidans egen text, sedan kuraterade; inom samma nivå
 * öar med källbelagd restid före, därefter namn.
 */
export function rankDagIslands(
  islands: DagIsland[],
  hubSlug: string,
  vill: IslandChip[],
): DagIsland[] {
  const alla = hubSlug === ALLA_HUB_SLUG
  const kandidater = islands.filter(i => (alla || i.hubs.includes(hubSlug)) && vill.every(c => i.chips.includes(c)))
  const strength = (i: DagIsland) => (alla ? (i.hasTransit ? 2 : 0) : i.hubStrength[hubSlug] ?? 0)
  return kandidater.sort((a, b) =>
    strength(b) - strength(a)
    || Number(b.hasTransit) - Number(a.hasTransit)
    || Number(b.travelTimeMatt) - Number(a.travelTimeMatt)
    || a.name.localeCompare(b.name, 'sv'),
  )
}
