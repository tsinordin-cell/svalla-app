/**
 * Motpartens namn och bild per chatt, som inkorgen redan har hämtat (2026-11-27).
 *
 * När man öppnar en befintlig chatt från inkorgen visade huvudet förut en rund
 * avatar med "?" och inget namn tills sidan hunnit hämta samma uppgifter igen.
 * Inkorgen lägger här in det den vet, och chattsidan visar det direkt. Sidan
 * hämtar ändå uppgifterna själv och skriver över, så en gammal post gör ingen skada.
 *
 * Bara 1-till-1-chattar sparas, och bara i minnet för fliken (inget sparas i webbläsaren).
 */

export type KonvForhand = {
  /** Motpartens användarnamn, som visas i huvudet */
  username: string
  avatar: string | null
}

const minne = new Map<string, KonvForhand>()

export function sparaKonvForhand(convId: string, uppgift: KonvForhand): void {
  minne.set(convId, uppgift)
}

export function hamtaKonvForhand(convId: string | null | undefined): KonvForhand | null {
  if (!convId) return null
  return minne.get(convId) ?? null
}
