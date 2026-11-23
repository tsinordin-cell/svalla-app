/**
 * Indata till POST /api/subscribe (granskning 2026-11-22).
 *
 * Rutten är öppen för alla och skriver med tjänsteklienten. Tidigare sparades
 * `source` och `preferences` precis som de kom, och varje ny adress fick ett
 * välkomstmejl direkt, utan någon gräns. Den som ville kunde alltså skicka
 * välkomstmejl till godtyckliga adresser och tömma dagskvoten hos Resend, som
 * också skickar inloggningsmejlen (bekräftelse och återställning).
 */

/** Högst så många välkomstmejl per timme, för hela sajten. 15 st på fyra månader (mätt 2026-11-22). */
export const VALKOMST_PER_TIMME = 10

/** Högst så många anrop per IP och timme. Ett formulär gör två (adress + segment). */
export const PRENUMERATION_PER_IP_OCH_TIMME = 6

const KALLA_RE = /^[a-z0-9_-]{1,60}$/i

/** Formulärets namn, t.ex. "nyhetsbrev-page-hero". Annat blir "unknown". */
export function stadaKalla(source: unknown): string {
  return typeof source === 'string' && KALLA_RE.test(source) ? source : 'unknown'
}

/** Bara de två kända valen sparas, som sant eller falskt. Standard: båda på. */
export function stadaPreferenser(preferences: unknown): { weekly_tips: boolean; season_alerts: boolean } {
  const p = (preferences && typeof preferences === 'object' ? preferences : {}) as Record<string, unknown>
  return {
    weekly_tips: p.weekly_tips !== false,
    season_alerts: p.season_alerts !== false,
  }
}

/** Får ett välkomstmejl till skickas, givet hur många som gått senaste timmen? */
export function valkomstTillaten(skickadeSenasteTimmen: number | null | undefined): boolean {
  return (skickadeSenasteTimmen ?? 0) < VALKOMST_PER_TIMME
}

// ── Dubbel bekräftelse (Toms ja 2026-11-22) ─────────────────────────────────
// Tidigare blev varje anmäld adress bekräftad direkt, så vem som helst kunde
// anmäla någon annans adress till månadsbrevet. Nu bekräftas adressen via en
// signerad länk (samma nyckel som avregistreringslänkarna, annat syfte i
// meddelandet). Undantag: inloggad användare vars kontoadress redan är
// bekräftad och som anmäler just den adressen.
import { createHmac, timingSafeEqual } from 'node:crypto'
import { kodaEpost, avkodaEpost, normaliseraEpost } from './avregistrering'

export const BEKRAFTA_SIDA = 'https://svalla.se/nyhetsbrev/bekrafta'

export function bekraftaToken(email: string, secret: string): string {
  return createHmac('sha256', secret).update(`prenumeration:v1:${normaliseraEpost(email)}`).digest('base64url')
}

/** Länken i bekräftelsemejlet. null utan nyckel (då skickas inget mejl). */
export function bekraftaLank(email: string, secret: string | undefined): string | null {
  if (!secret) return null
  return `${BEKRAFTA_SIDA}?e=${kodaEpost(email)}&t=${bekraftaToken(email, secret)}`
}

/** Adressen om länkens parametrar är äkta, annars null. */
export function tolkaBekraftelse(e: unknown, t: unknown, secret: string | undefined): string | null {
  if (typeof e !== 'string' || typeof t !== 'string' || !secret) return null
  const email = avkodaEpost(e)
  if (!email) return null
  const vantad = Buffer.from(bekraftaToken(email, secret))
  const given = Buffer.from(t)
  return vantad.length === given.length && timingSafeEqual(vantad, given) ? email : null
}

/** Är adressen redan bevisad: inloggad, kontoadressen bekräftad och samma adress? */
export function adressRedanBekraftad(
  user: { email?: string | null; email_confirmed_at?: string | null } | null | undefined,
  email: string,
): boolean {
  return !!user?.email && !!user.email_confirmed_at && normaliseraEpost(user.email) === normaliseraEpost(email)
}
