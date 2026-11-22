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
/**
 * Vem som ansvarar för Svalla (App Store 1.2 och GDPR art. 13 kräver en namngiven ansvarig).
 * Fyll bara i uppgifter som Tom eller Max har gett. Tills dess är det null och
 * ingen rad visas på svalla.se.
 *   Bolag:         { typ: 'bolag', namn: '…', orgNr: '…' }
 *   Privatpersoner: { typ: 'personer', namn: ['…'] }  (en eller flera)
 */
export type Ansvarig =
  | { typ: 'bolag'; namn: string; orgNr: string }
  | { typ: 'personer'; namn: string[] }

export const ANSVARIG: Ansvarig | null = null

function listaNamn(namn: string[]): string {
  if (namn.length <= 1) return namn[0] ?? ''
  return `${namn.slice(0, -1).join(', ')} och ${namn[namn.length - 1]}`
}

/** Raden om vem som driver Svalla, eller null om uppgifter saknas. */
export function operatorRad(ansvarig: Ansvarig | null = ANSVARIG): string | null {
  if (!ansvarig) return null
  if (ansvarig.typ === 'bolag') {
    const namn = ansvarig.namn.trim(), orgNr = ansvarig.orgNr.trim()
    if (!namn || !orgNr) return null
    return `Svalla drivs av ${namn}, organisationsnummer ${orgNr}.`
  }
  const namn = ansvarig.namn.map(n => n.trim()).filter(Boolean)
  if (namn.length === 0) return null
  return `Svalla drivs av ${listaNamn(namn)} som ${namn.length === 1 ? 'privatperson' : 'privatpersoner'}.`
}
