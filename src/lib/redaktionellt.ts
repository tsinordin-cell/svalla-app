/**
 * Forumets startinlägg (Toms ja 2026-11-22).
 *
 * Tolv konton skrevs in av Svalla för att starta forumet. De har aldrig
 * loggat in och har id med prefixet nedan (mätt 2026-11-22: 12 konton,
 * 17 trådar, 75 svar). Deras inlägg ser annars ut som riktiga användares,
 * så de märks "Startinlägg från Svalla" där de visas.
 */
export const REDAKTIONELLT_ID_PREFIX = '00000000-c0c0-4a00-b000-'

export const REDAKTIONELL_ETIKETT = 'Startinlägg från Svalla'
export const REDAKTIONELL_FORKLARING = 'Skrivet av Svalla för att starta forumet, inte av en användare.'

export function arRedaktionellt(userId: string | null | undefined): boolean {
  return typeof userId === 'string' && userId.toLowerCase().startsWith(REDAKTIONELLT_ID_PREFIX)
}
