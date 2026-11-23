/**
 * Pushen "X just nu på <plats>" från POST /api/trips/[id]/highlight
 * (granskning 2026-11-22).
 *
 * Tidigare togs både platsens namn och adress ur anropet och pushen gick ut
 * varje gång rutten anropades. Den som hade en publik tur kunde alltså skicka
 * egen text som push till alla som sparat en plats, hur ofta som helst. Nu
 * hämtas namnet ur platstabellen, samma plats igen ger ingen ny push, och
 * varje konto kan utlösa högst HOJDPUNKT_PUSH_PER_DYGN pushar per dygn.
 */

export const HOJDPUNKT_PUSH_PER_DYGN = 3

// Åtta platser har å/ä/ö i adressen (mätt 2026-11-22: ä och ö förekommer),
// t.ex. "sandhamns-sjöstation". Därför ingår svenska bokstäver.
const SLUG_RE = /^[a-z0-9åäö-]{1,120}$/

/** Platsernas adresser är gemener, siffror, å/ä/ö och bindestreck. */
export function giltigPlatsSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && SLUG_RE.test(slug)
}

/** Ny push bara när höjdpunkten byter plats; samma plats igen tyst. */
export function nyHojdpunktsplats(forraSlug: string | null | undefined, nySlug: string): boolean {
  return forraSlug !== nySlug
}
