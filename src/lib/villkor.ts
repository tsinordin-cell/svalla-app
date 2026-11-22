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
