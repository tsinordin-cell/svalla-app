/**
 * Platstyper för övernattning i platsdatabasen (tabellen restaurants, kolumnen type).
 *
 * Boendesidan /o/[slug]/boende hämtade bara typen hotel, så vandrarhem (hostel) och
 * stugor (cabin) kom aldrig med, och "Vi har inga boenden registrerade" stod på Brännö
 * fast Svalla har Pensionat Baggen bland restaurangerna (faktagranskningen full-28
 * k032 och full-19 k036, mall-0149). Typen camping läggs till enligt Toms beslut 4
 * (2026-11-08) för Utö camping (mallarnas runda 5, 2026-11-10).
 *
 * Kolumnen type är text utan enum (supabase/SCHEMA_SNAPSHOT.md: "type | text | YES |
 * 'restaurant'::text"), och ingen migrering i repot lägger ett CHECK-villkor på den,
 * så en ny typ kräver ingen schemaändring.
 */

export const BOENDETYPER = ['hotel', 'hostel', 'cabin', 'camping'] as const
export type Boendetyp = (typeof BOENDETYPER)[number]

/** Etikett per boendetyp (samma ord som PlaceFactsSection). */
export const BOENDE_ETIKETT: Record<Boendetyp, string> = {
  hotel: 'Hotell',
  hostel: 'Vandrarhem',
  cabin: 'Stugor',
  camping: 'Camping',
}

export function arBoendetyp(typ: string | null | undefined): typ is Boendetyp {
  return (BOENDETYPER as readonly string[]).includes(typ ?? '')
}

/**
 * En plats av annan typ (oftast restaurant) vars eget namn säger att den har rum:
 * "Brännö Värdshus & Pensionat Baggen", "Smögens Hafvshotell". Namnet är verksamheten
 * om sig själv; platsens egen sida på Svalla har den källbelagda texten.
 */
export function boendeINamnet(namn: string): boolean {
  return /pensionat|hotell|(?<![a-zåäö])hotel(?![a-zåäö])|vandrarhem|hostel|gästhem|(?<![a-zåäö])b&b(?![a-zåäö])|bed (?:&|and) breakfast/i.test(namn)
}
