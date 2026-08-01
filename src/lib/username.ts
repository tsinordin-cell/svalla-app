/**
 * Gemensamma regler för users.username.
 *
 * BAKGRUND (2026-08-01): en användare fick hela sin e-postadress
 * (`ingriidleek@yahoo.se`) som username. Orsak: registreringsformulären
 * validerade ALDRIG username-fältet — bara e-post och lösenord — så det som
 * skrevs i fältet gick rakt in i databasen. Redigera-profil-formuläret hade
 * reglerna, signup-flödet hade dem inte.
 *
 * Två konsekvenser:
 *  1. `@` i ett dynamiskt route-segment gjorde profilen svår att nå
 *     (se CLAUDE.md punkt 13).
 *  2. Värre: username visas publikt på /u/[username], som är `index: true`.
 *     Alltså låg en privatpersons mejladress publikt och indexerbar.
 *
 * Använd ALLTID dessa två funktioner när ett username sätts eller ändras.
 */

/** Tillåtna tecken. Måste hållas i synk med redigera-profil-formuläret. */
export const USERNAME_RE = /^[a-z0-9_.-]+$/
export const USERNAME_MIN = 3
export const USERNAME_MAX = 20

/** Ser strängen ut som en e-postadress? Används för att aldrig läcka en sådan. */
export function looksLikeEmail(value: string): boolean {
  return /\S+@\S+/.test(value)
}

/**
 * Validerar ett username som användaren själv skrivit in.
 * Returnerar ett felmeddelande på svenska, eller null om det är giltigt.
 * Avvisa hellre än att tyst skriva om — användaren ska veta vad aliaset blir.
 */
export function validateUsername(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase()
  if (!trimmed || trimmed.length < USERNAME_MIN) return `Aliaset måste vara minst ${USERNAME_MIN} tecken.`
  if (trimmed.length > USERNAME_MAX) return `Aliaset får max vara ${USERNAME_MAX} tecken.`
  if (trimmed.includes(' ')) return 'Aliaset får inte innehålla mellanslag.'
  if (looksLikeEmail(trimmed)) return 'Aliaset får inte vara en e-postadress — det visas publikt på din profil.'
  if (!USERNAME_RE.test(trimmed)) return 'Bara a-z, siffror och _ . - är tillåtna.'
  return null
}

/**
 * Härleder ett giltigt username när vi INTE har ett användarvalt alias
 * (t.ex. från e-post eller namn vid registrering).
 *
 * Tar alltid bort ett ev. @domän-suffix först, så en e-postadress aldrig kan
 * passera hel. Otillåtna tecken faller bort, resultatet kapas till max-längd.
 * Blir det för kort returneras `fallback`.
 */
export function deriveUsername(raw: string | null | undefined, fallback = 'seglare'): string {
  const base = (raw ?? '').trim().toLowerCase().split('@')[0] ?? ''
  const cleaned = base
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_.-]/g, '')
    .replace(/^[.\-_]+|[.\-_]+$/g, '')
    .slice(0, USERNAME_MAX)
  return cleaned.length >= USERNAME_MIN ? cleaned : fallback
}
