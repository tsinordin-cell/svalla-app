/**
 * @-omnämnanden: vilka tecken ett namn får ha och hur namnet slås upp.
 *
 * Varför (2026-10): användarnamn får innehålla . och - (36 av 119 konton
 * hade det), men omnämnandena lästes bara med a-z, 0-9 och _. "@max.berg"
 * blev då "max" – fel person fick notisen, och max.berg fick ingen. Uppslaget
 * var dessutom skiftlägeskänsligt (12 konton har versaler), så "@elin" hittade
 * aldrig "Elin". Kommentarer och forumet använder nu samma regler.
 *
 * Inga React- eller serverimporter: filen används både i webbläsaren och i routes.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { ilikeExakt } from './username'

/** Namnet efter @: 2–30 tecken av a-z, 0-9, _ . - och slutar inte på . eller - ("@max." i slutet av en mening = max). */
export const NAMN_I_OMNAMNANDE = '[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,28}[a-zA-Z0-9_]'

/**
 * Är "@namn" som börjar på position at ett omnämnande? Inte om @ står direkt
 * efter en bokstav eller siffra (e-post: "max@exempel.se"), och inte om namnet
 * saknar bokstäver (klockslag och intervall: "@10.30", "@2-3"). Alla användarnamn
 * innehåller minst en bokstav (kontrollerat 2026-10-10: 0 av 119 saknar).
 */
export function arOmnamnande(text: string, at: number, namn: string): boolean {
  if (at > 0 && /[a-zA-Z0-9_@]/.test(text.charAt(at - 1))) return false
  return /[a-zA-Z]/.test(namn)
}

/** Alla omnämnda namn i texten, i skrivet skiftläge. */
export function omnamndaNamn(text: string): string[] {
  const re = new RegExp(`@(${NAMN_I_OMNAMNANDE})`, 'g')
  const ut: string[] = []
  for (const m of text.matchAll(re)) if (m[1] && arOmnamnande(text, m.index, m[1])) ut.push(m[1])
  return ut
}

/** Nämner texten just det här användarnamnet? Skiftlägesokänsligt. */
export function namner(text: string, anvandarnamn: string): boolean {
  const mal = anvandarnamn.toLowerCase()
  return omnamndaNamn(text).some(n => n.toLowerCase() === mal)
}

/**
 * Slå upp omnämnda användare skiftlägesokänsligt. Exakt skiftläge vinner;
 * annars godtas en träff bara om den är ensam (det finns namn som bara
 * skiljer sig i skiftläge, och då vet vi inte vem som avses).
 */
export async function hittaOmnamnda(
  db: SupabaseClient,
  namn: string[],
): Promise<{ id: string; username: string }[]> {
  const unika = [...new Map(namn.map(n => [n.toLowerCase(), n])).values()].slice(0, 10)
  const svar = await Promise.all(unika.map(async n => {
    const monster = ilikeExakt(n)
    if (!monster) return null
    const { data } = await db.from('users').select('id, username').ilike('username', monster).limit(5)
    const rader = (data ?? []) as { id: string; username: string }[]
    return rader.find(r => r.username === n) ?? (rader.length === 1 ? rader[0]! : null)
  }))
  return svar.filter((r): r is { id: string; username: string } => r !== null)
}
