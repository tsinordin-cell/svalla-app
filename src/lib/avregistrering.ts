/**
 * Signerade avregistreringslänkar (revision 2026-10-02, P1-6).
 *
 * Tidigare avregistrerade GET /api/email/unsubscribe?email=… vilken adress som
 * helst, direkt. E-postskannrar som öppnar länkar i förväg (t.ex. Outlook Safe
 * Links) kunde därför avregistrera mottagare utan att de klickat, och vem som
 * helst kunde avregistrera någon annan.
 *
 * Nu:
 *  - Länken bär adressen (base64url) och en HMAC-SHA256 med UNSUBSCRIBE_SECRET.
 *    Bara servern kan skapa en giltig länk.
 *  - GET visar en bekräftelsesida och ändrar ingenting. Avregistreringen sker
 *    med POST: knappen på sidan, eller e-postklientens one-click (RFC 8058).
 *  - Gamla länkar utan token (redan skickade mejl) godtas till
 *    GAMLA_LANKAR_TILL – via bekräftelsesidan, direkt POST och one-click.
 *    Därefter hänvisas till info@svalla.se. Avvägning: fram till dess kan
 *    den som känner en adress avregistrera den (som före ändringen).
 *  - Saknas UNSUBSCRIBE_SECRET skickas osignerade länkar som förut, eftersom
 *    varje mejl måste ha en fungerande avregistrering. I produktion loggas
 *    det som fel vid varje utskick. Nyckeln måste finnas i Vercel INNAN
 *    koden går ut, annars blir brytdatumet fel för de mejl som går ut utan den.
 *  - Byt aldrig nyckel utan att lägga den gamla i UNSUBSCRIBE_SECRET_PREVIOUS,
 *    annars slutar alla länkar i redan skickade mejl att fungera.
 *  - Adressen i länken är bara base64-kodad, inte krypterad.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'

/** Första UTC-datum då länkar utan token avvisas (när nyckeln finns). */
export const GAMLA_LANKAR_TILL = '2027-02-01'

const BAS = 'https://svalla.se/api/email/unsubscribe'

export function normaliseraEpost(email: string): string {
  return email.trim().toLowerCase()
}

export function kodaEpost(email: string): string {
  return Buffer.from(normaliseraEpost(email), 'utf8').toString('base64url')
}

/** null om parametern inte är en base64url-kodad e-postadress. */
export function avkodaEpost(kodad: string): string | null {
  if (!/^[A-Za-z0-9_-]{4,400}$/.test(kodad)) return null
  const email = normaliseraEpost(Buffer.from(kodad, 'base64url').toString('utf8'))
  return arRimligEpost(email) ? email : null
}

function arRimligEpost(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+$/.test(email)
}

export function avregToken(email: string, secret: string): string {
  return createHmac('sha256', secret).update(`avreg:v1:${normaliseraEpost(email)}`).digest('base64url')
}

export function tokenGiltig(email: string, token: string, secret: string): boolean {
  if (!secret || !token) return false
  const vantad = Buffer.from(avregToken(email, secret))
  const given = Buffer.from(token)
  return vantad.length === given.length && timingSafeEqual(vantad, given)
}

/** Godtar token från nuvarande nyckel eller, efter ett nyckelbyte, den förra. */
function tokenGiltigNagonNyckel(email: string, token: string, secret: string, tidigare?: string): boolean {
  return tokenGiltig(email, token, secret) || (!!tidigare && tokenGiltig(email, token, tidigare))
}

let varnatOmNyckel = false

/** Länken i mejlets sidfot och i List-Unsubscribe. */
export function avregLank(email: string, secret: string | undefined = process.env.UNSUBSCRIBE_SECRET): string {
  if (!secret) {
    if (process.env.VERCEL_ENV === 'production') {
      console.error('[avregistrering] UNSUBSCRIBE_SECRET saknas i produktion – mejlet får en osignerad länk')
    } else if (!varnatOmNyckel) {
      console.warn('[avregistrering] UNSUBSCRIBE_SECRET saknas – skickar osignerade länkar')
      varnatOmNyckel = true
    }
    return `${BAS}?email=${encodeURIComponent(normaliseraEpost(email))}`
  }
  return `${BAS}?e=${kodaEpost(email)}&t=${avregToken(email, secret)}`
}

export type AvregBegaran =
  | { typ: 'signerad'; email: string }
  | { typ: 'gammal'; email: string }
  | { typ: 'gammal_utgangen' }
  | { typ: 'ogiltig' }

/**
 * Tolka länkens parametrar.
 * `idag` är ett UTC-datum (YYYY-MM-DD); det räcker för en brytpunkt.
 */
export function tolkaBegaran(
  params: URLSearchParams,
  secret: string | undefined,
  idag: string = new Date().toISOString().slice(0, 10),
  tidigareSecret?: string,
): AvregBegaran {
  const e = params.get('e')
  const t = params.get('t')
  if (e !== null || t !== null) {
    const email = e ? avkodaEpost(e) : null
    if (!email || !t || !secret || !tokenGiltigNagonNyckel(email, t, secret, tidigareSecret)) return { typ: 'ogiltig' }
    return { typ: 'signerad', email }
  }

  const ra = params.get('email')
  if (!ra) return { typ: 'ogiltig' }
  // Gamla länkar URL-kodade inte adressen, så "+" i adressen blev mellanslag.
  const email = normaliseraEpost(ra.replace(/ /g, '+'))
  if (!arRimligEpost(email)) return { typ: 'ogiltig' }
  if (secret && idag >= GAMLA_LANKAR_TILL) return { typ: 'gammal_utgangen' }
  return { typ: 'gammal', email }
}
