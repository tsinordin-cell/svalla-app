import { ALL_ISLANDS, type Island } from '../o/island-data'
import { getActivity, type ActivityType } from './activity-data'

// Flyttad ur activity-data.ts 2026-11-21: den behöver hela ö-listan, och
// activity-data.ts läses även av söksidan i webbläsaren.

/** Returnerar öar som matchar en aktivitet baserat på tags + activities.name + accommodation.type */
export function islandsForActivity(type: ActivityType): Island[] {
  const meta = getActivity(type)!
  const matchers = meta.matchers
  return ALL_ISLANDS.filter(island => {
    const haystack = [
      ...island.tags,
      ...island.activities.map(a => a.name.toLowerCase()),
      ...island.activities.map(a => a.desc.toLowerCase()),
      ...island.restaurants.map(r => r.type.toLowerCase()),
    ].join(' ').toLowerCase()
    return matchers.some(m => haystack.includes(m))
  })
}

