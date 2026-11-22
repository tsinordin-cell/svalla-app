/**
 * Användarvillkoren (2026-11-22). Versionen sparas på kontot när någon
 * godkänner villkoren vid registrering, så att vi vet vilken text de sa ja
 * till. Ändras texten på /anvandarvillkor väsentligt: höj versionen.
 */
export const VILLKOR_VERSION = '2026-11-22'
export const VILLKOR_SOKVAG = '/anvandarvillkor'

/** Är strängen en giltig villkorsversion (bara det vi själva skickar)? */
export function arGiltigVillkorsversion(v: string | null | undefined): v is string {
  return v === VILLKOR_VERSION
}

/**
 * Vem som driver Svalla, som det ska stå i villkoren. Fylls i med uppgifter
 * från Tom och Max (bolagsnamn och organisationsnummer). Gissa aldrig: så
 * länge värdet är null visas raden inte i produktion.
 */
export const OPERATOR_NAMN: string | null = null
export const OPERATOR_ORGNR: string | null = null

/** Raden om vem som driver Svalla, eller null om uppgifterna saknas. */
export function operatorRad(namn: string | null = OPERATOR_NAMN, orgNr: string | null = OPERATOR_ORGNR): string | null {
  if (!namn || !orgNr) return null
  return `Svalla drivs av ${namn}, organisationsnummer ${orgNr}.`
}
