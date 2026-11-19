// ── Achievements, delad definition ────────────────────────────────────────────
// Importeras av profil/page.tsx, u/[username]/page.tsx och spara/page.tsx.
// Ikonen är ett namn i Icon.tsx (streckad SVG). Märken ritas aldrig med emoji.

import type { IconName } from '@/components/Icon'

export interface Achievement {
  id: string
  icon: IconName
  label: string
  desc: string
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
  { id: 'first',       icon: 'flag',      label: 'Första kastet',      desc: 'Loggade sin första tur',                        check: (t) => t.length >= 1 },
  { id: 'five',        icon: 'compass',   label: 'Äventyraren',        desc: '5 loggade turer',                               check: (t) => t.length >= 5 },
  { id: 'ten',         icon: 'waves',     label: 'Saltvattenblod',     desc: '10 loggade turer',                              check: (t) => t.length >= 10 },
  { id: 'dist50',      icon: 'anchor',    label: '50 NM',              desc: '50 nautiska mil totalt',                        check: (_, d) => d >= 50 },
  { id: 'dist100',     icon: 'sailboat',  label: '100 NM Segrare',     desc: '100 nautiska mil totalt',                       check: (_, d) => d >= 100 },
  { id: 'magic',       icon: 'sparkles',  label: 'Magisk tur',         desc: 'Loggade en ⚓⚓⚓-upplevelse',                   check: (t) => t.some(x => x.pinnar_rating === 3) },
  { id: 'explorer',    icon: 'map',       label: 'Kartläggaren',      desc: 'Besökt 5 unika platser',                        check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 5 },
  { id: 'boats',       icon: 'ship',      label: 'Multifarare',        desc: 'Loggat 3 olika båttyper',                       check: (t) => new Set(t.map(x => x.boat_type).filter(Boolean)).size >= 3 },
  { id: 'streak3',     icon: 'fire',      label: 'Veckostrejk',        desc: '3 veckor i rad med minst en tur',               check: (_t, _d, s) => s >= 3 },
  { id: 'twenty',      icon: 'trophy',    label: 'Havets Herre',       desc: '20 loggade turer',                              check: (t) => t.length >= 20 },
  { id: 'dist250',     icon: 'globe',     label: 'Oceansegrare',       desc: '250 nautiska mil totalt',                       check: (_, d) => d >= 250 },
  { id: 'dist500',     icon: 'rocket',    label: 'Atlantfararen',      desc: '500 nautiska mil totalt',                       check: (_, d) => d >= 500 },
  { id: 'locs10',      icon: 'pin',       label: 'Skärgårdsvandraren', desc: 'Besökt 10 unika platser',                       check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 10 },
  { id: 'locs25',      icon: 'map',       label: 'Arkipelagos',        desc: 'Besökt 25 unika platser',                       check: (t) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 25 },
  { id: 'magic3',      icon: 'sparkles',  label: 'Magikern',           desc: '3 magiska ⚓⚓⚓-upplevelser',                   check: (t) => t.filter(x => x.pinnar_rating === 3).length >= 3 },
  { id: 'streak8',     icon: 'zap',       label: 'Veckokrigaren',      desc: '8 veckor i rad med minst en tur',               check: (_t, _d, s) => s >= 8 },
  // PRODUKTREGEL: vårt eget villkor för utmärkelsen. Vi är källan.
  { id: 'earlybird',   icon: 'sunrise',   label: 'Gryningsseglaren',   desc: 'Logga en tur som startar före kl 07:00',        check: (t) => t.some(x => x.started_at && new Date(x.started_at).getUTCHours() < 7) },
  // PRODUKTREGEL: vårt eget villkor för utmärkelsen. Vi är källan.
  { id: 'nightsail',   icon: 'moon',      label: 'Nattseglaren',       desc: 'Logga en tur som slutar efter kl 22:00',        check: (t) => t.some(x => x.ended_at && new Date(x.ended_at).getUTCHours() >= 22) },
  { id: 'speed15',     icon: 'wind',      label: 'Vindridaren',        desc: 'Uppnå en toppfart på 15 knop',                  check: (t) => t.some(x => (x.max_speed_knots ?? 0) >= 15) },
  { id: 'fifty_trips', icon: 'crown',     label: 'Skärgårdskungen',    desc: '50 loggade turer',                              check: (t) => t.length >= 50 },

  // Sommar 2026, säsongsmärken (maj till aug 2026)
  { id: 's26_first',   icon: 'sun',       label: 'Sommarstart 2026',   desc: 'Loggade en tur maj till aug 2026',                   check: (t) => t.some(x => isSummer2026(x.created_at)) },
  { id: 's26_ten',     icon: 'beach',     label: 'Sommarseglaren',     desc: '10 turer maj till aug 2026',                         check: (t) => t.filter(x => isSummer2026(x.created_at)).length >= 10 },
  { id: 's26_magic',   icon: 'sun',       label: 'Sommarmagi',          desc: 'En ⚓⚓⚓-tur maj till aug 2026',                    check: (t) => t.some(x => isSummer2026(x.created_at) && x.pinnar_rating === 3) },
  { id: 's26_champ',   icon: 'award',     label: 'Sommaräventyraren',   desc: '25 turer maj till aug 2026',                         check: (t) => t.filter(x => isSummer2026(x.created_at)).length >= 25 },
]

// Hjälpare: avgör om ett trip-datum ligger i sommaren 2026 (maj 1 → aug 31)
function isSummer2026(iso: string | null | undefined): boolean {
  if (!iso) return false
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return false
  const y = d.getUTCFullYear()
  const m = d.getUTCMonth() // 0-indexerat → maj = 4, aug = 7
  return y === 2026 && m >= 4 && m <= 7
}

// ── Streak — antal veckor i rad med minst en tur ──────────────────────────────
function isoWeekKey(d: Date): string {
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d.getTime() - jan1.getTime()) / 86_400_000) + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}

export function calcStreak(trips: TripForAch[]): number {
  if (trips.length === 0) return 0
  const weeks = new Set(trips.map(t => isoWeekKey(new Date(t.created_at))))
  const sorted = [...weeks].sort((a, b) => b.localeCompare(a))

  const now         = new Date()
  const currentWeek = isoWeekKey(now)
  const prevWeekDate = new Date(now); prevWeekDate.setDate(prevWeekDate.getDate() - 7)
  const prevWeek    = isoWeekKey(prevWeekDate)

  if (!weeks.has(currentWeek) && !weeks.has(prevWeek)) return 0

  let streak = 0
  let check  = weeks.has(currentWeek) ? currentWeek : prevWeek

  for (const week of sorted) {
    if (week === check) {
      streak++
      // Step back one week
      const parts = check.split('-W')
      const yr = Number(parts[0]), wk = Number(parts[1])
      const d = new Date(yr, 0, 1 + (wk - 1) * 7 - 7)
      check = isoWeekKey(d)
    } else {
      break
    }
  }
  return streak
}

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

/** Beräkna total distans */
export function totalDistanceNM(trips: TripForAch[]): number {
  return trips.reduce((s, t) => s + (t.distance ?? 0), 0)
}
