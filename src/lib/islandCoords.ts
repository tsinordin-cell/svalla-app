// ── Ö-koordinater för Stockholms skärgård ────────────────────────────────────
// Verifierade mot Nominatim/Wikipedia (2026-04-25). Centrumkoord per ö —
// detektionsradien (3km default) gör finjustering onödig.

export interface IslandCoord {
  slug: string
  name: string
  lat: number
  lng: number
  radiusKm?: number  // anpassad detektionsradie (default 3km)
}

export const ISLAND_COORDS: IslandCoord[] = [
  // ── Innerskärgården ──────────────────────────────────────────────────────
  { slug: 'fjaderholmarna',    name: 'Fjäderholmarna',    lat: 59.3333, lng: 18.1833, radiusKm: 1.5 },
  { slug: 'vaxholm',           name: 'Vaxholm',           lat: 59.4022, lng: 18.3520, radiusKm: 2.0 },
  { slug: 'grinda',            name: 'Grinda',            lat: 59.4109, lng: 18.5618, radiusKm: 2.5 },
  { slug: 'finnhamn',          name: 'Finnhamn',          lat: 59.4833, lng: 18.8333, radiusKm: 2.5 },
  { slug: 'rindo',             name: 'Rindö',             lat: 59.3990, lng: 18.4052, radiusKm: 2.0 },
  { slug: 'resaro',            name: 'Resarö',            lat: 59.4308, lng: 18.3333, radiusKm: 2.0 },

  // ── Mellersta skärgården ─────────────────────────────────────────────────
  { slug: 'sandhamn',          name: 'Sandhamn',          lat: 59.2868, lng: 18.9091, radiusKm: 2.5 },
  { slug: 'moja',              name: 'Möja',              lat: 59.4333, lng: 18.8833, radiusKm: 3.0 },
  { slug: 'ljustero',          name: 'Ljusterö',          lat: 59.5297, lng: 18.6135, radiusKm: 4.0 },
  { slug: 'gallno',            name: 'Gällnö',            lat: 59.4000, lng: 18.6333, radiusKm: 2.5 },
  { slug: 'ingmarso',          name: 'Ingmarsö',          lat: 59.4750, lng: 18.7667, radiusKm: 3.0 },
  { slug: 'namdo',             name: 'Nämdö',             lat: 59.1844, lng: 18.6947, radiusKm: 3.0 },
  { slug: 'svartso',           name: 'Svartsö',           lat: 59.4500, lng: 18.6833, radiusKm: 2.5 },
  { slug: 'runmaro',           name: 'Runmarö',           lat: 59.2833, lng: 18.7667, radiusKm: 3.0 },
  { slug: 'husaro',            name: 'Husarö',            lat: 59.5064, lng: 18.8475, radiusKm: 2.0 },
  { slug: 'kymmendo',          name: 'Kymmendö',          lat: 59.1112, lng: 18.4992, radiusKm: 2.0 },
  { slug: 'bullero',           name: 'Bullerö',           lat: 59.2005, lng: 18.8492, radiusKm: 2.0 },
  { slug: 'vindo',             name: 'Vindö',             lat: 59.3462, lng: 18.6990, radiusKm: 2.0 },
  { slug: 'ingaro',            name: 'Ingarö',            lat: 59.2500, lng: 18.4833, radiusKm: 4.0 },
  { slug: 'kanholmen',         name: 'Kanholmen',         lat: 59.3679, lng: 18.7263, radiusKm: 1.5 },
  { slug: 'svenska-hogarna',   name: 'Svenska Högarna',   lat: 59.4431, lng: 19.5024, radiusKm: 2.5 },
  { slug: 'huvudskar',         name: 'Huvudskär',         lat: 58.9630, lng: 18.5683, radiusKm: 2.0 },
  { slug: 'ramskar',           name: 'Ramskar',           lat: 59.3680, lng: 18.7100, radiusKm: 1.5 },
  { slug: 'ekno',              name: 'Eknö',              lat: 59.3087, lng: 18.8676, radiusKm: 2.0 },
  { slug: 'ormsko',            name: 'Ormskär',           lat: 59.1701, lng: 18.7509, radiusKm: 1.5 },
  { slug: 'norrpada',          name: 'Norrpada',          lat: 59.6544, lng: 19.2748, radiusKm: 1.5 },
  { slug: 'lindholmen',        name: 'Lindholmen',        lat: 59.4413, lng: 18.7696, radiusKm: 2.0 },
  { slug: 'garnsjon',          name: 'Garnsjön',          lat: 59.4900, lng: 18.6980, radiusKm: 2.0 },
  { slug: 'storholmen',        name: 'Storholmen',        lat: 59.2803, lng: 18.8090, radiusKm: 1.5 },
  { slug: 'ostanvik',          name: 'Östanvik',          lat: 59.1966, lng: 18.7282, radiusKm: 1.5 },
  { slug: 'korsholmen',        name: 'Korsholmen',        lat: 59.2444, lng: 18.6348, radiusKm: 1.5 },
  { slug: 'storskar',          name: 'Storskär',          lat: 59.6075, lng: 19.2519, radiusKm: 1.5 },
  { slug: 'bjorko',            name: 'Björkö',            lat: 59.2939, lng: 18.9513, radiusKm: 2.0 },
  { slug: 'adelsjo',           name: 'Adelsö',            lat: 59.3768, lng: 17.5006, radiusKm: 2.0 },

  // ── Södra skärgården ─────────────────────────────────────────────────────
  { slug: 'uto',               name: 'Utö',               lat: 58.9375, lng: 18.2562, radiusKm: 3.0 },
  { slug: 'dalaro',            name: 'Dalarö',            lat: 59.1331, lng: 18.4064, radiusKm: 2.5 },
  { slug: 'orno',              name: 'Ornö',              lat: 59.0667, lng: 18.4167, radiusKm: 4.0 },
  { slug: 'landsort',          name: 'Landsort',          lat: 58.7396, lng: 17.8658, radiusKm: 2.0 },
  { slug: 'nattaro',           name: 'Nåttarö',           lat: 58.8743, lng: 18.1230, radiusKm: 2.5 },
  { slug: 'asko',              name: 'Askö',              lat: 58.8226, lng: 17.6426, radiusKm: 2.5 },
  { slug: 'galo',              name: 'Galö',              lat: 59.0884, lng: 18.2664, radiusKm: 2.0 },
  { slug: 'toro',              name: 'Torö',              lat: 58.8246, lng: 17.8414, radiusKm: 3.0 },
  { slug: 'fjardlang',         name: 'Fjärdlång',         lat: 59.0463, lng: 18.5226, radiusKm: 2.0 },
  { slug: 'smaadalaro',        name: 'Smådalarö',         lat: 59.1662, lng: 18.4525, radiusKm: 2.0 },
  { slug: 'morko',             name: 'Mörkö',             lat: 58.9847, lng: 17.6597, radiusKm: 3.5 },
  { slug: 'musko',             name: 'Muskö',             lat: 58.9958, lng: 18.1149, radiusKm: 3.5 },
  { slug: 'hasselo',           name: 'Hasselö',           lat: 58.6568, lng: 17.1671, radiusKm: 2.0 },
  { slug: 'langviksskaret',    name: 'Långviksskär',      lat: 59.1509, lng: 18.7981, radiusKm: 2.0 },
  { slug: 'graskar-sodra',     name: 'Gräskar (södra)',   lat: 58.7780, lng: 17.7650, radiusKm: 1.5 },
  { slug: 'vastervik-uto',     name: 'Västervik-Utö',     lat: 58.9600, lng: 17.8990, radiusKm: 2.0 },
  { slug: 'aspoja',            name: 'Aspöja',            lat: 59.0480, lng: 17.7300, radiusKm: 2.5 },

  // ── Norra skärgården ─────────────────────────────────────────────────────
  { slug: 'arholma',           name: 'Arholma',           lat: 59.8500, lng: 19.1167, radiusKm: 2.5 },
  { slug: 'furusund',          name: 'Furusund',          lat: 59.6606, lng: 18.9069, radiusKm: 2.0 },
  { slug: 'blido',             name: 'Blidö',             lat: 59.6072, lng: 18.8944, radiusKm: 3.5 },
  { slug: 'norrora',           name: 'Norröra',           lat: 59.6458, lng: 19.0377, radiusKm: 2.0 },
  { slug: 'fejan',             name: 'Fejan',             lat: 59.7399, lng: 19.1659, radiusKm: 1.5 },
  { slug: 'rodloga',           name: 'Rödlöga',           lat: 59.5919, lng: 19.1663, radiusKm: 2.0 },
  { slug: 'singo',             name: 'Singö',             lat: 60.1859, lng: 18.7543, radiusKm: 3.5 },
  { slug: 'lido',              name: 'Lidö',              lat: 59.7854, lng: 19.0656, radiusKm: 2.0 },
  { slug: 'graddo',            name: 'Gräddö',            lat: 59.7642, lng: 19.0321, radiusKm: 2.0 },
  { slug: 'vaddo',             name: 'Väddö',             lat: 60.0037, lng: 18.8310, radiusKm: 5.0 },
  { slug: 'yxlan',             name: 'Yxlan',             lat: 59.6167, lng: 18.8532, radiusKm: 2.5 },
  { slug: 'ljusnas',           name: 'Ljusnas',           lat: 59.6100, lng: 18.7720, radiusKm: 1.5 },
  { slug: 'graskar',           name: 'Gräskar',           lat: 59.4811, lng: 18.9993, radiusKm: 1.5 },
  { slug: 'iggon',             name: 'Iggön',             lat: 59.7340, lng: 18.9430, radiusKm: 2.0 },
  { slug: 'toro-norra',        name: 'Torö (norra)',      lat: 59.7740, lng: 18.8040, radiusKm: 2.5 },
  { slug: 'langskar',          name: 'Långskär',          lat: 59.7065, lng: 19.4005, radiusKm: 1.5 },
  { slug: 'ramskar-norra',     name: 'Ramskar (norra)',   lat: 59.7910, lng: 18.9840, radiusKm: 1.5 },
  { slug: 'vastana',           name: 'Västanå',           lat: 59.4420, lng: 18.6880, radiusKm: 1.5 },
]

// Lookup map for O(1) access
export const ISLAND_COORD_MAP = Object.fromEntries(
  ISLAND_COORDS.map(c => [c.slug, c])
)

// Haversine distance in km between two coords
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Given a list of GPS points, returns the slugs of islands
 * that were passed within their detection radius.
 */
export function detectVisitedIslands(
  points: { lat: number; lng: number }[],
): string[] {
  if (points.length === 0) return []
  const visited = new Set<string>()

  // Sample every 5th point to reduce computation
  const sample = points.filter((_, i) => i % 5 === 0)

  for (const island of ISLAND_COORDS) {
    const radius = island.radiusKm ?? 3.0
    const hit = sample.some(p =>
      haversineKm(p.lat, p.lng, island.lat, island.lng) <= radius
    )
    if (hit) visited.add(island.slug)
  }

  return [...visited]
}
