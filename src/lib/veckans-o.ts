/**
 * Veckans ö: vilken ö som går vilken tisdag, och om utskicket är godkänt.
 *
 * Regel (Max 2026-10-08): Veckans ö skickas bara efter faktagranskning och
 * ett uttryckligt godkännande. Det räcker alltså inte att flödet står i
 * EMAIL_AUTOMATIK. Cronen skickar en vecka bara om det finns ett godkännande
 * för just den veckan och just den ön, sparat från /admin/veckans-o.
 *
 * Godkännandet ligger i app_kv med nyckeln veckans_o:<år>-v<vecka>. Byts ön
 * (till exempel för att en restid fick källa och listan ändrades) gäller det
 * gamla godkännandet inte längre, eftersom sluggen jämförs.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { ALL_ISLANDS, type Island } from '@/app/o/island-data'
import { arVeckansOdag, isoVecka, valjVeckansO } from '@/lib/mailfloden'

export type VeckansOGodkannande = { slug: string; av: string; tid: string }

/** Öar som kan bli veckans ö: bara de med källbelagd restid. */
export function veckansOKandidater(): Island[] {
  return ALL_ISLANDS
    .filter(i => i.facts_provenance?.travel_time === 'matt' && i.facts?.travel_time)
    .sort((a, b) => a.slug.localeCompare(b.slug))
}

export function veckansOFor(d: Date): Island | undefined {
  return valjVeckansO(veckansOKandidater(), d)
}

export function veckansNyckel(d: Date): string {
  return `veckans_o:${d.getUTCFullYear()}-v${isoVecka(d)}`
}

/** De kommande utskicksdagarna (tisdagar april till september), från och med idag. */
export function kommandeUtskick(fran: Date, antal: number): Date[] {
  const ut: Date[] = []
  const d = new Date(Date.UTC(fran.getUTCFullYear(), fran.getUTCMonth(), fran.getUTCDate()))
  for (let i = 0; i < 400 && ut.length < antal; i++) {
    if (arVeckansOdag(d)) ut.push(new Date(d))
    d.setUTCDate(d.getUTCDate() + 1)
  }
  return ut
}

/** Godkännandet för veckan, eller null. Fel vid läsning ger null (skickar inget). */
export async function hamtaGodkannande(service: SupabaseClient, d: Date): Promise<VeckansOGodkannande | null> {
  const { data, error } = await service.from('app_kv').select('value').eq('key', veckansNyckel(d)).maybeSingle()
  if (error || !data?.value) return null
  const v = data.value as Partial<VeckansOGodkannande>
  return typeof v.slug === 'string' && typeof v.av === 'string' && typeof v.tid === 'string'
    ? { slug: v.slug, av: v.av, tid: v.tid }
    : null
}
