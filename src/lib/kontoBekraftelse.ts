/**
 * Hur ett konto bekräftar att det ska raderas (2026-11-20).
 *
 * Raderingen krävde lösenord. Mätt 20 nov: 64 av 132 konton är skapade med
 * Google och har inget lösenord, så de kunde inte radera sitt konto alls.
 *
 * Regeln nu:
 *  - Kontot har lösenord (inloggningssätt "email"): lösenordet krävs, som förut.
 *  - Kontot saknar lösenord: inloggningen ska vara färsk, högst tio minuter
 *    gammal. Användaren loggar in igen med Google och bekräftar sedan.
 *
 * Tiden läses ur åtkomstbevisets amr-fält: när inloggningen gjordes. Den
 * ändras inte när beviset förnyas, så en gammal session blir aldrig färsk.
 */
import { bevisNyttolast } from '@/lib/aterstallningsSession'

export const FARSK_INLOGGNING_SEKUNDER = 10 * 60

type Identitet = { provider?: string | null }

/** Har kontot ett lösenord? Okänt (ingen lista alls) räknas som ja: det strängare kravet. */
export function harLosenord(
  identiteter: readonly Identitet[] | null | undefined,
  leverantorer?: readonly string[] | null,
): boolean {
  if (Array.isArray(identiteter)) return identiteter.some(i => i.provider === 'email')
  if (Array.isArray(leverantorer)) return leverantorer.includes('email')
  return true
}

/** Sekunder sedan den senaste inloggningen, eller null om det inte går att läsa. */
export function inloggningAlderSekunder(bevis: string | null | undefined, nu: Date = new Date()): number | null {
  if (!bevis) return null
  const amr = bevisNyttolast(bevis)?.amr
  if (!Array.isArray(amr) || amr.length === 0) return null
  const tider = amr.map(a => a.timestamp).filter((t): t is number => typeof t === 'number')
  if (tider.length === 0) return null
  return Math.floor(nu.getTime() / 1000 - Math.max(...tider))
}

export function farskInloggning(bevis: string | null | undefined, nu: Date = new Date()): boolean {
  const alder = inloggningAlderSekunder(bevis, nu)
  return alder !== null && alder >= -60 && alder <= FARSK_INLOGGNING_SEKUNDER
}
