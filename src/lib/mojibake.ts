/**
 * Reparerar dubbelkodad UTF-8 ("mojibake") i text som kommer från databasen.
 *
 * BAKGRUND (2026-08-01): platssidor visade taggar som `mÃ¶lle` och `Ã¶resund`
 * i stället för `mölle` och `öresund`. Det uppstår när UTF-8-bytes en gång
 * tolkats som Latin-1 och sedan sparats som UTF-8 igen — typiskt vid import
 * från en CSV eller ett API utan rätt teckenkodning.
 *
 * Rätt långsiktig lösning är att sanera datan i databasen. Tills det är gjort
 * ser den här funktionen till att ingenting visas trasigt för besökaren.
 * Funktionen är idempotent: korrekt text passerar orörd, eftersom vi bara
 * ersätter exakta sekvenser som inte förekommer i normal svensk text.
 */

/** De sekvenser som faktiskt uppstår för svenska (och vanliga europeiska) tecken. */
const ERSATTNINGAR: [RegExp, string][] = [
  [/Ã…/g, 'Å'], [/Ã„/g, 'Ä'], [/Ã–/g, 'Ö'],
  [/Ã¥/g, 'å'], [/Ã¤/g, 'ä'], [/Ã¶/g, 'ö'],
  [/Ã©/g, 'é'], [/Ã¨/g, 'è'], [/Ã¼/g, 'ü'],
  [/Ã˜/g, 'Ø'], [/Ã¸/g, 'ø'], [/Ã¦/g, 'æ'], [/Ã†/g, 'Æ'],
  [/Ã /g, 'à'], [/Ã¡/g, 'á'], [/Ã­/g, 'í'], [/Ã³/g, 'ó'], [/Ãº/g, 'ú'],
  [/Ã§/g, 'ç'], [/Ã±/g, 'ñ'],
  // Felkodade skiljetecken från samma sorts import
  [/â€"/g, '–'], [/â€"/g, '—'], [/â€™/g, '’'], [/â€˜/g, '‘'],
  [/â€œ/g, '"'], [/â€/g, '"'], [/â€¦/g, '…'],
]

/** Repareras strängen? Snabb kontroll så vi slipper köra alla regexar i onödan. */
function serTrasigUt(s: string): boolean {
  return s.includes('Ã') || s.includes('â€')
}

export function fixMojibake(s: string): string
export function fixMojibake(s: null | undefined): null
export function fixMojibake(s: string | null | undefined): string | null
export function fixMojibake(s: string | null | undefined): string | null {
  if (s == null) return null
  if (typeof s !== 'string' || !serTrasigUt(s)) return s
  let ut = s
  for (const [fran, till] of ERSATTNINGAR) ut = ut.replace(fran, till)
  return ut
}

/** Samma sak för en lista, t.ex. tags-kolumnen. */
export function fixMojibakeLista(v: string[] | null | undefined): string[] {
  if (!Array.isArray(v)) return []
  return v.map(x => (typeof x === 'string' ? fixMojibake(x) : x)).filter(Boolean) as string[]
}
