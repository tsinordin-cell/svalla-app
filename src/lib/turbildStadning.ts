/**
 * Städning av övergivna turbilder i lagringshinken trips (2026-11-20).
 *
 * En turbild är övergiven när ingen tur och inget meddelande längre pekar på
 * den. Det händer när en tur rensas 30 dagar efter att den raderats, när en
 * pågående tur kastas bort eller när ett konto tas bort: raden försvinner men
 * filen blir kvar, och hinken är publik, så bilden går att öppna för den som
 * har adressen. Databasen kan inte ta bort filer själv (Supabase tillåter inte
 * borttagning direkt i lagringens tabeller), därför görs det här.
 *
 * Försiktighetsregler:
 *  - Bara filer äldre än MIN_ALDER_DAGAR rörs. En raderad tur ligger kvar i 30
 *    dagar och pekar under den tiden på sin bild, så marginalen gäller filer
 *    som aldrig fick någon tur (avbruten uppladdning).
 *  - Går någon av frågorna fel, eller kommer listan över turer tillbaka tom
 *    fast det finns filer, tas ingenting bort.
 *  - Högst MAX_PER_KORNING filer per körning.
 *
 * Körs en gång i veckan ur den dagliga cron-rutten /api/email/cron.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export const HINK = 'trips'
export const MIN_ALDER_DAGAR = 30
export const MAX_PER_KORNING = 200

export type Fil = { name: string; created_at: string | null }

/** Filnamnet ur en publik adress till hinken trips, annars null. */
export function filnamnUrAdress(adress: string): string | null {
  const m = /\/storage\/v1\/object\/(?:public|authenticated|sign)\/trips\/([^?#"'\s\\]+)/.exec(adress)
  if (!m || !m[1]) return null
  try { return decodeURIComponent(m[1]) } catch { return m[1] }
}

/** Alla filnamn i hinken trips som förekommer någonstans i ett värde (sträng, lista eller objekt). */
export function filnamnIVarde(varde: unknown, ut: Set<string> = new Set()): Set<string> {
  if (typeof varde === 'string') {
    for (const m of varde.matchAll(/\/storage\/v1\/object\/(?:public|authenticated|sign)\/trips\/[^?#"'\s\\]+/g)) {
      const n = filnamnUrAdress(m[0])
      if (n) ut.add(n)
    }
  } else if (Array.isArray(varde)) {
    for (const v of varde) filnamnIVarde(v, ut)
  } else if (varde && typeof varde === 'object') {
    for (const v of Object.values(varde as Record<string, unknown>)) filnamnIVarde(v, ut)
  }
  return ut
}

/** Filer som ingen pekar på och som är äldre än gränsen. Äldst först, högst max stycken. */
export function overgivnaFiler(
  filer: readonly Fil[],
  anvanda: ReadonlySet<string>,
  nu: Date,
  minAlderDagar = MIN_ALDER_DAGAR,
  max = MAX_PER_KORNING,
): Fil[] {
  const grans = nu.getTime() - minAlderDagar * 24 * 60 * 60 * 1000
  return filer
    .filter(f => !anvanda.has(f.name))
    // Okänt datum räknas som ny fil: rör den inte.
    .filter(f => !!f.created_at && new Date(f.created_at).getTime() < grans)
    .sort((a, b) => new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime())
    .slice(0, max)
}

export type Stadresultat = {
  filer: number
  anvanda: number
  overgivna: number
  borttagna: number
  avbrutet?: string
}

/**
 * Går igenom hinken och tar bort övergivna filer. Kräver tjänsteklienten.
 * Med torrkor = true tas inget bort; resultatet visar vad som skulle tas bort.
 */
export async function stadaTurbilder(
  admin: SupabaseClient,
  opts: { torrkor?: boolean; nu?: Date } = {},
): Promise<Stadresultat> {
  const nu = opts.nu ?? new Date()
  const res: Stadresultat = { filer: 0, anvanda: 0, overgivna: 0, borttagna: 0 }

  // 1. Alla filer i hinken (sidvis).
  const filer: Fil[] = []
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await admin.storage.from(HINK).list('', { limit: 1000, offset, sortBy: { column: 'name', order: 'asc' } })
    if (error) return { ...res, avbrutet: `kunde inte lista filer: ${error.message}` }
    for (const f of data ?? []) if (f.name && f.id) filer.push({ name: f.name, created_at: f.created_at ?? null })
    if (!data || data.length < 1000) break
  }
  res.filer = filer.length
  if (filer.length === 0) return res

  // 2. Allt som pekar på en fil: turer (även raderade och privata) och meddelanden.
  const anvanda = new Set<string>()
  let turrader = 0
  for (let fran = 0; ; fran += 1000) {
    const { data, error } = await admin.from('trips').select('image, images').range(fran, fran + 999)
    if (error) return { ...res, avbrutet: `kunde inte läsa turer: ${error.message}` }
    turrader += data?.length ?? 0
    filnamnIVarde(data ?? [], anvanda)
    if (!data || data.length < 1000) break
  }
  for (let fran = 0; ; fran += 1000) {
    const { data, error } = await admin.from('messages').select('attachment_url, attachment_meta').not('attachment_type', 'is', null).range(fran, fran + 999)
    if (error) return { ...res, avbrutet: `kunde inte läsa meddelanden: ${error.message}` }
    filnamnIVarde(data ?? [], anvanda)
    if (!data || data.length < 1000) break
  }
  res.anvanda = filer.filter(f => anvanda.has(f.name)).length

  // Skydd: finns filer men inte en enda tur kom tillbaka är något fel på läsningen.
  if (turrader === 0) return { ...res, avbrutet: 'inga turer lästa, tar inte bort något' }

  // 3. Ta bort.
  const bort = overgivnaFiler(filer, anvanda, nu)
  res.overgivna = bort.length
  if (opts.torrkor || bort.length === 0) return res

  const { data: borttagna, error: bortFel } = await admin.storage.from(HINK).remove(bort.map(f => f.name))
  if (bortFel) return { ...res, avbrutet: `borttagningen misslyckades: ${bortFel.message}` }
  res.borttagna = borttagna?.length ?? 0
  return res
}
