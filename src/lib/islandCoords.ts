// ── Ö-koordinater för Stockholms skärgård ────────────────────────────────────
// Ungefärliga centrumkoordinater per ö — används för GPS-baserad "besökta öar"
// Precision ~500m är mer än tillräckligt för detektionsradien (3km)

export interface IslandCoord {
  slug: string
  name: string
  lat: number
  lng: number
  radiusKm?: number  // anpassad detektionsradie (default 3km)
}

export const ISLAND_COORDS: IslandCoord[] = [
  // ── Innerskärgården ──────────────────────────────────────────────────────
  { slug: 'fjaderholmarna',    name: 'Fjäderholmarna',    lat: 59.3269, lng: 18.1175, radiusKm: 1.5 },
  { slug: 'vaxholm',           name: 'Vaxholm',           lat: 59.4020, lng: 18.3517, radiusKm: 2.0 },
  { slug: 'grinda',            name: 'Grinda',            lat: 59.6165, lng: 18.7089, radiusKm: 2.5 },
  { slug: 'finnhamn',          name: 'Finnhamn',          lat: 59.6801, lng: 18.8311, radiusKm: 2.5 },
  { slug: 'rindo',             name: 'Rindö',             lat: 59.3954, lng: 18.4042, radiusKm: 2.0 },
  { slug: 'resaro',            name: 'Resarö',            lat: 59.4340, lng: 18.3490, radiusKm: 2.0 },

  // ── Mellersta skärgården ─────────────────────────────────────────────────
  { slug: 'sandhamn',          name: 'Sandhamn',          lat: 59.2875, lng: 18.9183, radiusKm: 2.5 },
  { slug: 'moja',              name: 'Möja',              lat: 59.4488, lng: 18.9049, radiusKm: 3.0 },
  { slug: 'ljustero',          name: 'Ljusterö',          lat: 59.5370, lng: 18.7260, radiusKm: 4.0 },
  { slug: 'gallno',            name: 'Gällnö',            lat: 59.4590, lng: 18.7010, radiusKm: 2.5 },
  { slug: 'ingmarso',          name: 'Ingmarsö',          lat: 59.5480, lng: 18.7890, radiusKm: 3.0 },
  { slug: 'namdo',             name: 'Nämdö',             lat: 59.4195, lng: 18.7958, radiusKm: 3.0 },
  { slug: 'svartso',           name: 'Svartsö',           lat: 59.4320, lng: 18.7820, radiusKm: 2.5 },
  { slug: 'runmaro',           name: 'Runmarö',           lat: 59.3130, lng: 18.7645, radiusKm: 3.0 },
  { slug: 'husaro',            name: 'Husarö',            lat: 59.5580, lng: 18.7790, radiusKm: 2.0 },
  { slug: 'kymmendo',          name: 'Kymmendö',          lat: 59.3048, lng: 18.6481, radiusKm: 2.0 },
  { slug: 'bullero',           name: 'Bullerö',           lat: 59.3140, lng: 18.6390, radiusKm: 2.0 },
  { slug: 'vindo',             name: 'Vindö',             lat: 59.2748, lng: 18.6352, radiusKm: 2.0 },
  { slug: 'ingaro',            name: 'Ingarö',            lat: 59.1960, lng: 18.4740, radiusKm: 4.0 },
  { slug: 'kanholmen',         name: 'Kanholmen',         lat: 59.5490, lng: 18.7940, radiusKm: 1.5 },
  { slug: 'svenska-hogarna',   name: 'Svenska Högarna',   lat: 59.4435, lng: 19.5050, radiusKm: 2.5 },
  { slug: 'huvudskar',         name: 'Huvudskär',         lat: 59.0090, lng: 18.5390, radiusKm: 2.0 },
  { slug: 'ramskar',           name: 'Ramskar',           lat: 59.3680, lng: 18.7100, radiusKm: 1.5 },
  { slug: 'ekno',              name: 'Eknö',              lat: 59.3370, lng: 18.7330, radiusKm: 2.0 },
  { slug: 'ormsko',            name: 'Ormskö',            lat: 59.3030, lng: 18.7020, radiusKm: 1.5 },
  { slug: 'norrpada',          name: 'Norrpada',          lat: 59.5530, lng: 18.8030, radiusKm: 1.5 },
  { slug: 'lindholmen',        name: 'Lindholmen',        lat: 59.4730, lng: 18.6950, radiusKm: 2.0 },
  { slug: 'garnsjon',          name: 'Garnsjön',          lat: 59.4900, lng: 18.6980, radiusKm: 2.0 },
  { slug: 'storholmen',        name: 'Storholmen',        lat: 59.4800, lng: 18.6850, radiusKm: 1.5 },
  { slug: 'ostanvik',          name: 'Östanvik',          lat: 59.4560, lng: 18.6800, radiusKm: 1.5 },
  { slug: 'korsholmen',        name: 'Korsholmen',        lat: 59.4200, lng: 18.7000, radiusKm: 1.5 },
  { slug: 'storskar',          name: 'Storskär',          lat: 59.4520, lng: 18.6930, radiusKm: 1.5 },
  { slug: 'bjorko',            name: 'Björkö',            lat: 59.3160, lng: 18.6160, radiusKm: 2.0 },
  { slug: 'adelsjo',           name: 'Adelsjön',          lat: 59.3290, lng: 18.5700, radiusKm: 2.0 },

  // ── Södra skärgården ─────────────────────────────────────────────────────
  { slug: 'uto',               name: 'Utö',               lat: 58.9580, lng: 17.9055, radiusKm: 3.0 },
  { slug: 'dalaro',            name: 'Dalarö',            lat: 59.1340, lng: 18.3910, radiusKm: 2.5 },
  { slug: 'orno',              name: 'Ornö',              lat: 58.9940, lng: 17.9080, radiusKm: 4.0 },
  { slug: 'landsort',          name: 'Landsort',          lat: 58.7440, lng: 17.8680, radiusKm: 2.0 },
  { slug: 'nattaro',           name: 'Nattarö',           lat: 58.9190, lng: 17.8860, radiusKm: 2.5 },
  { slug: 'asko',              name: 'Askö',              lat: 58.9450, lng: 17.6620, radiusKm: 2.5 },
  { slug: 'galo',              name: 'Galö',              lat: 58.9610, lng: 17.9360, radiusKm: 2.0 },
  { slug: 'toro',              name: 'Torö',              lat: 58.8480, lng: 17.8680, radiusKm: 3.0 },
  { slug: 'fjardlang',         name: 'Fjärdlång',         lat: 58.8020, lng: 17.9160, radiusKm: 2.0 },
  { slug: 'smaadalaro',        name: 'Smådalarö',         lat: 59.1330, lng: 18.3400, radiusKm: 2.0 },
  { slug: 'morko',             name: 'Mörkö',             lat: 58.9970, lng: 17.7180, radiusKm: 3.5 },
  { slug: 'musko',             name: 'Muskö',             lat: 59.0650, lng: 18.1450, radiusKm: 3.5 },
  { slug: 'hasselo',           name: 'Hasselö',           lat: 58.7760, lng: 17.8670, radiusKm: 2.0 },
  { slug: 'langviksskaret',    name: 'Långviksskäret',    lat: 59.1000, lng: 18.3100, radiusKm: 2.0 },
  { slug: 'graskar-sodra',     name: 'Gräskar (södra)',   lat: 58.7780, lng: 17.7650, radiusKm: 1.5 },
  { slug: 'vastervik-uto',     name: 'Västervik-Utö',     lat: 58.9600, lng: 17.8990, radiusKm: 2.0 },
  { slug: 'aspoja',            name: 'Aspöja',            lat: 59.0480, lng: 17.7300, radiusKm: 2.5 },

  // ── Norra skärgården ─────────────────────────────────────────────────────
  { slug: 'arholma',           name: 'Arholma',           lat: 59.8518, lng: 19.1053, radiusKm: 2.5 },
  { slug: 'furusund',          name: 'Furusund',          lat: 59.6640, lng: 18.9290, radiusKm: 2.0 },
  { slug: 'blido',             name: 'Blidö',             lat: 59.6030, lng: 18.8470, radiusKm: 3.5 },
  { slug: 'norrora',           name: 'Norröra',           lat: 59.5540, lng: 18.9100, radiusKm: 2.0 },
  { slug: 'fejan',             name: 'Fejan',             lat: 59.7570, lng: 18.9930, radiusKm: 1.5 },
  { slug: 'rodloga',           name: 'Rödlöga',           lat: 59.6880, lng: 19.0100, radiusKm: 2.0 },
  { slug: 'singo',             name: 'Singö',             lat: 59.6210, lng: 18.7800, radiusKm: 3.5 },
  { slug: 'lido',              name: 'Lidö',              lat: 59.5610, lng: 18.8040, radiusKm: 2.0 },
  { slug: 'graddo',            name: 'Gräddo',            lat: 59.5640, lng: 18.8970, radiusKm: 2.0 },
  { slug: 'vaddo',             name: 'Väddö',             lat: 59.7790, lng: 18.8170, radiusKm: 5.0 },
  { slug: 'yxlan',             name: 'Yxlan',             lat: 59.6660, lng: 18.7640, radiusKm: 2.5 },
  { slug: 'ljusnas',           name: 'Ljusnas',           lat: 59.6100, lng: 18.7720, radiusKm: 1.5 },
  { slug: 'graskar',           name: 'Gräskar',           lat: 59.6220, lng: 18.9500, radiusKm: 1.5 },
  { slug: 'iggon',             name: 'Iggön',             lat: 59.7340, lng: 18.9430, radiusKm: 2.0 },
  { slug: 'toro-norra',        name: 'Torö (norra)',      lat: 59.7740, lng: 18.8040, radiusKm: 2.5 },
  { slug: 'langskar',          name: 'Långskär',          lat: 59.6120, lng: 18.7660, radiusKm: 1.5 },
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
