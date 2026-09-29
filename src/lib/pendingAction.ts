/**
 * pendingAction — minns vad en utloggad besökare försökte göra, så att det
 * blir gjort när hon kommer tillbaka inloggad.
 *
 * Bakgrund (2026-09-28, appgenomgången): "Spara ön" och "Jag har varit här"
 * skickade utloggade till inloggningen och tillbaka till ön, men själva
 * handlingen försvann på vägen. Besökaren fick klicka en gång till, om hon
 * kom ihåg varför hon skapade konto. Nu sparas avsikten här innan omdirigeringen
 * och utförs av knappen vid nästa laddning.
 *
 * localStorage, inte sessionStorage: vid registrering med e-postbekräftelse
 * kommer användaren tillbaka i en ny flik. Giltig i 24 timmar; äldre poster
 * ignoreras och rensas, så ett gammalt klick aldrig utför något oväntat.
 */

const KEY = 'svalla_pending_action'
const MAX_AGE_MS = 24 * 60 * 60 * 1000

export type PendingAction = {
  /** mark_route_visited: slug är ruttens id, inte en ö. */
  type: 'save_island' | 'mark_visited' | 'mark_route_visited'
  slug: string
  at: number
}

export function setPendingAction(type: PendingAction['type'], slug: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify({ type, slug, at: Date.now() } satisfies PendingAction))
  } catch {
    /* privat läge eller fullt lager — då blir det som förut: ett klick till */
  }
}

/** Returnerar och rensar avsikten om den matchar typ och ö och inte är för gammal. */
export function takePendingAction(type: PendingAction['type'], slug: string): boolean {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return false
    const p = JSON.parse(raw) as Partial<PendingAction>
    if (p.type !== type || p.slug !== slug) return false
    localStorage.removeItem(KEY)
    return typeof p.at === 'number' && Date.now() - p.at < MAX_AGE_MS
  } catch {
    return false
  }
}
