/**
 * Rensning av chattbilder (dm-bilder) på servern, 2026-11-26.
 *
 * Används bara med admin-klienten (service role), som går förbi reglerna på
 * storage.objects. Därför gör den här koden själv det som regeln
 * "dm-bilder underlag får inte raderas" gör för vanliga användare: en bild
 * som är anmäld och ligger som underlag hos admin tas aldrig bort här.
 *
 * Databasen kan inte radera filer själv, så när ett samtal försvinner
 * (alla har lämnat, eller sista kontot raderas) tas bilderna bort härifrån.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { DM_BILD_HINK, arDmBildSokvag } from './dmBilder'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** Sökvägar som är anmälda och därför måste ligga kvar som underlag. */
async function anmaldaSokvagar(admin: SupabaseClient, sokvagar: string[]): Promise<Set<string>> {
  const kvar = new Set<string>()
  // 50 åt gången: sökvägarna är långa och hamnar i adressen till databasen.
  for (let i = 0; i < sokvagar.length; i += 50) {
    const { data, error } = await admin.from('anmalan_underlag')
      .select('bilaga_sokvag')
      .in('bilaga_sokvag', sokvagar.slice(i, i + 50))
    // Kan vi inte läsa underlaget vet vi inte vad som är anmält: rör inget.
    if (error) throw new Error(`anmalan_underlag: ${error.message}`)
    for (const r of data ?? []) if (r.bilaga_sokvag) kvar.add(r.bilaga_sokvag as string)
  }
  return kvar
}

/**
 * Tar bort chattbilder, utom anmälda. Returnerar hur många som togs bort.
 * Kastar om underlaget inte gick att läsa, så att inget tas bort i blindo.
 */
export async function taBortDmBilder(admin: SupabaseClient, sokvagar: string[]): Promise<number> {
  const giltiga = [...new Set(sokvagar.filter(s => arDmBildSokvag(s)))]
  if (giltiga.length === 0) return 0
  const skyddade = await anmaldaSokvagar(admin, giltiga)
  const attTaBort = giltiga.filter(s => !skyddade.has(s))
  let borttagna = 0
  for (let i = 0; i < attTaBort.length; i += 100) {
    const del = attTaBort.slice(i, i + 100)
    const { data, error } = await admin.storage.from(DM_BILD_HINK).remove(del)
    // Räkna det lagringen säger att den tog bort, inte det vi bad om.
    if (!error) borttagna += data?.length ?? 0
  }
  return borttagna
}

type Fil = { sokvag: string; skapad: string | null }

/** Alla filer i hinken under {samtal}/{avsändare}/, med när de laddades upp. */
async function filerMedTid(admin: SupabaseClient, samtalId: string): Promise<Fil[]> {
  const ut: Fil[] = []
  const { data: mappar, error } = await admin.storage.from(DM_BILD_HINK).list(samtalId, { limit: 1000 })
  if (error) throw new Error(`dm-bilder ${samtalId}: ${error.message}`)
  for (const mapp of mappar ?? []) {
    if (!UUID_RE.test(mapp.name)) continue
    for (let fran = 0; ; fran += 1000) {
      const { data: filer, error: fel } = await admin.storage.from(DM_BILD_HINK)
        .list(`${samtalId}/${mapp.name}`, { limit: 1000, offset: fran })
      if (fel) throw new Error(`dm-bilder ${samtalId}/${mapp.name}: ${fel.message}`)
      for (const f of filer ?? []) {
        ut.push({ sokvag: `${samtalId}/${mapp.name}/${f.name}`, skapad: (f as { created_at?: string | null }).created_at ?? null })
      }
      if (!filer || filer.length < 1000) break
    }
  }
  return ut
}

async function filerISamtal(admin: SupabaseClient, samtalId: string): Promise<string[]> {
  return (await filerMedTid(admin, samtalId)).map(f => f.sokvag)
}

/** Vilka av samtalen som finns. Kastar om det inte gick att läsa. */
async function befintligaSamtal(admin: SupabaseClient, ids: string[]): Promise<Set<string>> {
  const finns = new Set<string>()
  for (let i = 0; i < ids.length; i += 100) {
    const { data, error } = await admin.from('conversations').select('id').in('id', ids.slice(i, i + 100))
    // Osäkert om samtalen finns: rör inga filer.
    if (error) throw new Error(`conversations: ${error.message}`)
    for (const r of data ?? []) finns.add(r.id as string)
  }
  return finns
}

/** Sökvägar som ett meddelande fortfarande pekar på. Kastar vid fel. */
async function anvandaSokvagar(admin: SupabaseClient, sokvagar: string[]): Promise<Set<string>> {
  const anv = new Set<string>()
  for (let i = 0; i < sokvagar.length; i += 50) {
    const { data, error } = await admin.from('messages')
      .select('attachment_url')
      .in('attachment_url', sokvagar.slice(i, i + 50))
    if (error) throw new Error(`messages: ${error.message}`)
    for (const r of data ?? []) if (r.attachment_url) anv.add(r.attachment_url as string)
  }
  return anv
}

/**
 * För de samtal som inte längre finns: ta bort deras chattbilder (utom
 * anmälda). Samtal som finns kvar rörs inte. Returnerar antal borttagna filer.
 */
export async function rensaBilderForRaderadeSamtal(admin: SupabaseClient, samtalIds: string[]): Promise<number> {
  const ids = [...new Set(samtalIds.filter(id => UUID_RE.test(id)))]
  if (ids.length === 0) return 0
  const finns = await befintligaSamtal(admin, ids)
  let borttagna = 0
  for (const id of ids) {
    if (finns.has(id)) continue
    borttagna += await taBortDmBilder(admin, await filerISamtal(admin, id))
  }
  return borttagna
}

/** Hur gammal en fil utan meddelande måste vara innan nattstädningen tar den. */
export const OVERBLIVEN_EFTER_MS = 24 * 60 * 60 * 1000

/**
 * Nattstädning av chattbilder som blivit över (2026-11-26). Fångar det som
 * de andra vägarna missar: en bildrensning som misslyckades, ett konto som
 * raderades utanför appen, och anmälda bilder vars underlag har raderats
 * sex månader efter ärendet.
 *
 *  - Samtal som inte finns: alla bilder tas bort, utom anmälda.
 *  - Samtal som finns: en bild som är äldre än ett dygn och som varken ett
 *    meddelande eller en anmälan pekar på tas bort. Dygnet ger plats för en
 *    uppladdning vars meddelande ännu inte har skickats.
 *
 * Går något inte att läsa avbryts körningen innan något tas bort i det
 * samtalet. Returnerar antal genomgångna samtal och borttagna filer.
 */
export async function rensaOverblivnaDmBilder(
  admin: SupabaseClient,
  nu: number = Date.now(),
): Promise<{ samtal: number; borttagna: number }> {
  const mappar: string[] = []
  for (let fran = 0; ; fran += 1000) {
    const { data, error } = await admin.storage.from(DM_BILD_HINK).list('', { limit: 1000, offset: fran })
    if (error) throw new Error(`dm-bilder: ${error.message}`)
    for (const m of data ?? []) if (UUID_RE.test(m.name)) mappar.push(m.name)
    if (!data || data.length < 1000) break
  }
  const finns = await befintligaSamtal(admin, mappar)
  let borttagna = 0
  for (const id of mappar) {
    const filer = await filerMedTid(admin, id)
    if (!finns.has(id)) {
      borttagna += await taBortDmBilder(admin, filer.map(f => f.sokvag))
      continue
    }
    const gamla = filer
      .filter(f => f.skapad && nu - Date.parse(f.skapad) > OVERBLIVEN_EFTER_MS)
      .map(f => f.sokvag)
      .filter(s => arDmBildSokvag(s))
    if (gamla.length === 0) continue
    const anv = await anvandaSokvagar(admin, gamla)
    borttagna += await taBortDmBilder(admin, gamla.filter(s => !anv.has(s)))
  }
  return { samtal: mappar.length, borttagna }
}
