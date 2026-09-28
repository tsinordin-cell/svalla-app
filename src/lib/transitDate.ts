/**
 * Datumparameter för transit-API:erna (2026-09-28, dagsplaneraren).
 *
 * Returnerar:
 *  - null       — ingen/tom parameter, eller dagens datum: "från nu" som förut.
 *  - 'ogiltigt' — fel format eller utanför i dag..+14 dagar → API:t svarar 400.
 *  - 'YYYY-MM-DD' — ett giltigt framtida datum att fråga ResRobot om.
 *
 * Gränsen 14 dagar: Trafiklab/ResRobot saknar ofta tidtabell längre fram
 * (särskilt vid säsongsbyten), och ett tomt svar skulle se ut som "inga
 * båtar går". Hellre säga nej tydligt. Dagens datum räknas i Europe/Stockholm
 * eftersom Vercel kör i UTC.
 */
export const MAX_TRANSIT_DAYS_AHEAD = 14

export function todayStockholm(now: Date = new Date()): string {
  return now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
}

export function parseTransitDate(raw: string | null | undefined, now: Date = new Date()): string | null | 'ogiltigt' {
  const v = (raw ?? '').trim()
  if (!v) return null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'ogiltigt'
  const today = todayStockholm(now)
  if (v === today) return null
  const ms = Date.parse(`${v}T12:00:00Z`)
  if (Number.isNaN(ms)) return 'ogiltigt'
  // Avrundningsfri jämförelse av kalenderdagar via UTC-middag.
  const todayMs = Date.parse(`${today}T12:00:00Z`)
  const diffDays = Math.round((ms - todayMs) / 86_400_000)
  if (diffDays < 0 || diffDays > MAX_TRANSIT_DAYS_AHEAD) return 'ogiltigt'
  // Kalendergiltighet (t.ex. 2026-02-30 → Date.parse ger 2026-03-02, avslöjas här).
  if (new Date(ms).toISOString().slice(0, 10) !== v) return 'ogiltigt'
  return v
}
