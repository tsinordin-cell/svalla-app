// ── Achievements — delad definition ───────────────────────────────────────────
// Importeras av profil/page.tsx, u/[username]/page.tsx och spara/page.tsx

export interface Achievement {
  id: string
  emoji: string
  label: string
  check: (trips: TripForAch[], totalDist: number, streak: number) => boolean
}

// Minimalt trip-interface för achievement-beräkningar
export interface TripForAch {
  distance?: number
  pinnar_rating?: number | null
  location_name?: string | null
  boat_type?: string | null
  started_at?: string | null
  ended_at?: string | null
  max_speed_knots?: number
  created_at: string
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first',       emoji: '🏁', label: 'Första kastet',      check: (t) => t.length >= 1 },
  { id: 'five',        emoji: '🧭', label: 'Äventyraren',        check: (t) => t.length >= 5 },
  { id: 'ten',         emoji: '🌊', label: 'Saltvattenblod',     check: (t) => t.length >= 10 },
  { id: 'dist50',      emoji: '⚓', label: '50 NM',              check: (_, d) => d >= 50 },
  { id: 'dist100',     emoji: '⛵', label: '100 NM Segrare',     check: (_, d) => d >= 100 },
  { id: 'magic',       emoji: '✨', label: 'Magisk tur',         check: (t) => t.some(x => x.pinnar_rating === 3) },
  { id: 'explorer',    emoji: '🗺️', label: 'Kartläggaren',      check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 5 },
  { id: 'boats',       emoji: '🚤', label: 'Multifarare',        check: (t) => new Set(t.map(x => x.boat_type).filter(Boolean)).size >= 3 },
  { id: 'streak3',     emoji: '🔥', label: 'Veckostrejk',        check: (_, _d, s) => s >= 3 },
  { id: 'twenty',      emoji: '🏆', label: 'Havets Herre',       check: (t) => t.length >= 20 },
  { id: 'dist250',     emoji: '🌍', label: 'Oceansegrare',       check: (_, d) => d >= 250 },
  { id: 'dist500',     emoji: '🚀', label: 'Atlantfararen',      check: (_, d) => d >= 500 },
  { id: 'locs10',      emoji: '📍', label: 'Skärgårdsvandraren', check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 10 },
  { id: 'locs25',      emoji: '🗾', label: 'Arkipelagos',        check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 25 },
  { id: 'magic3',      emoji: '🌟', label: 'Magikern',           check: (t) => t.filter(x => x.pinnar_rating === 3).length >= 3 },
  { id: 'streak8',     emoji: '⚡', label: 'Veckokrigaren',      check: (_, _d, s) => s >= 8 },
  { id: 'earlybird',   emoji: '🌅', label: 'Gryningsseglaren',   check: (t) => t.some(x => x.started_at && new Date(x.started_at).getHours() < 7) },
  { id: 'nightsail',   emoji: '🌙', label: 'Nattseglaren',       check: (t) => t.some(x => x.ended_at && new Date(x.ended_at).getHours() >= 22) },
  { id: 'speed15',     emoji: '💨', label: 'Vindridaren',        check: (t) => t.some(x => (x.max_speed_knots ?? 0) >= 15) },
  { id: 'fifty_trips', emoji: '👑', label: 'Skärgårdskungen',    check: (t) => t.length >= 50 },
]

/**
 * Beräkna vilka achievements som är upplåsta givet en lista turer.
 */
export function computeUnlocked(
  trips: TripForAch[],
  streak = 0,
): Achievement[] {
  const totalDist = trips.reduce((s, t) => s + (t.distance ?? 0), 0)
  return ACHIEVEMENTS.filter(a => a.check(trips, totalDist, streak))
}
