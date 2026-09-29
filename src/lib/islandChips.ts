import type { Island } from '../app/o/island-data'

/**
 * Chips för en ö, byggda bara på vad ösidan faktiskt innehåller (2026-09-28).
 * Delas av "Öar längs rutten" (ruttplaneraren) och "Din dag i skärgården".
 *
 * - gästhamn: ön har hamnar listade, eller taggen.
 * - krog: ön har restauranger listade.
 * - bad/bastu: taggen finns eller en aktivitet nämner det.
 * - natur: tagg natur/naturreservat/nationalpark/vandring.
 * - barn: tagg familjer/barn eller en aktivitet nämner barn.
 * - lugnt: taggen lugnt/orört (redaktionell tagg på ösidan, ingen källa —
 *   den visas därför bara som filter, aldrig som påstående i text).
 */
export type IslandChip = 'gästhamn' | 'krog' | 'bad' | 'bastu' | 'natur' | 'barn' | 'lugnt'

export const CHIP_LABEL: Record<IslandChip, string> = {
  'gästhamn': 'Gästhamn', krog: 'Krog', bad: 'Bad', bastu: 'Bastu', natur: 'Natur', barn: 'Med barn', lugnt: 'Lugnt',
}

export function chipsFor(island: Pick<Island, 'tags' | 'activities' | 'harbors' | 'restaurants'>): IslandChip[] {
  const chips: IslandChip[] = []
  const tags = new Set((island.tags ?? []).map(t => t.toLowerCase()))
  const acts = (island.activities ?? []).map(a => `${a.name} ${a.desc}`.toLowerCase())
  const has = (needle: string) => tags.has(needle) || acts.some(a => a.includes(needle))
  if ((island.harbors ?? []).length > 0 || tags.has('gästhamn')) chips.push('gästhamn')
  if ((island.restaurants ?? []).length > 0) chips.push('krog')
  if (has('bad') || tags.has('sandstrand') || tags.has('klippbad')) chips.push('bad')
  if (has('bastu')) chips.push('bastu')
  if (tags.has('natur') || tags.has('naturreservat') || tags.has('nationalpark') || tags.has('vandring')) chips.push('natur')
  if (tags.has('familjer') || tags.has('barn') || tags.has('barnvänligt') || acts.some(a => a.includes('barn'))) chips.push('barn')
  if (tags.has('lugnt') || tags.has('orört')) chips.push('lugnt')
  return chips
}
