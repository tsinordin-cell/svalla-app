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
