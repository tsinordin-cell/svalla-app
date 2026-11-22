/**
 * Godkännande av användarvillkoren vid nytt konto (förberett 2026-11-22).
 *
 * Apple kräver att den som skapar konto i en app med användarinnehåll aktivt
 * godkänner villkor med nolltolerans mot stötande innehåll (App Store-riktlinje
 * 1.2). Därför en kryssruta på /kom-igang som måste vara ikryssad.
 *
 * Godkännandet sparas i kontots metadata i Supabase Auth
 * (auth.users.raw_user_meta_data), så ingen databasändring behövs:
 *   select id, raw_user_meta_data->>'villkor_godkanda_at',
 *          raw_user_meta_data->>'villkor_version'
 *   from auth.users;
 *
 * VILLKOR_VERSION ändras när villkoren ändras väsentligt, så att det går att se
 * vilken version varje konto har godkänt.
 */
export const VILLKOR_SOKVAG = '/villkor'
export const INTEGRITET_SOKVAG = '/integritetspolicy'
export const VILLKOR_VERSION = '1'

export type VillkorsGodkannande = {
  villkor_godkanda_at: string
  villkor_version: string
}

/** Metadatan som skickas med signUp när rutan är ikryssad. */
export function villkorsGodkannande(nu: Date = new Date()): VillkorsGodkannande {
  return { villkor_godkanda_at: nu.toISOString(), villkor_version: VILLKOR_VERSION }
}

/** Felmeddelandet när rutan inte är ikryssad, annars null. */
export function kontrolleraVillkor(godkanda: boolean): string | null {
  return godkanda ? null : 'Godkänn användarvillkoren för att skapa ett konto.'
}
