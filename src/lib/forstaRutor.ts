/**
 * Turordning för rutorna som dyker upp av sig själva i underkanten:
 * cookieremsan, "Lägg till på hemskärmen" och notisfrågan.
 *
 * Granskningen 2026-11-22: under första minuten kunde alla tre ligga ovanpå
 * varandra. Cookieremsan (z 1000) täckte knapparna "Aktivera" och "Inte nu" i
 * notisrutan (z 850), och installrutan (z 9999) la sig över båda.
 *
 * Reglerna här:
 * 1. Inget visas förrän cookievalet är gjort. Remsan är den enda som krävs.
 * 2. Bara en ruta i taget. Nästa väntar tills den förra stängts.
 * 3. Installrutan visas aldrig i den inbyggda appen: där är Svalla redan
 *    installerat, och iOS-texten "Lägg till på hemskärmen" stämmer inte.
 */

export const COOKIE_NYCKEL = 'svalla_cookie_consent'

export type RutNamn = 'installera' | 'notiser'

let aktiv: RutNamn | null = null
const kanal = new EventTarget()
const LEDIG = 'ledig'

/** Försöker ta platsen i underkanten. Sant om den var ledig (eller redan vår). */
export function taRuta(namn: RutNamn): boolean {
  if (aktiv && aktiv !== namn) return false
  aktiv = namn
  return true
}

/** Lämnar platsen så att nästa ruta får visas. */
export function slappRuta(namn: RutNamn): void {
  if (aktiv !== namn) return
  aktiv = null
  kanal.dispatchEvent(new Event(LEDIG))
}

/** Bara för tester. */
export function _aterstallRutor(): void {
  aktiv = null
}

export function harGjortCookieval(): boolean {
  try {
    return !!window.localStorage.getItem(COOKIE_NYCKEL)
  } catch {
    // Privat läge: remsan kan inte spara valet, så vänta inte på det.
    return true
  }
}

/** Den inbyggda appen (Capacitor) lägger window.Capacitor i webbvyn. */
export function arInbyggdApp(): boolean {
  try {
    const cap = (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor
    return !!cap?.isNativePlatform?.()
  } catch {
    return false
  }
}

/** Anropar `cb` varje gång platsen blir ledig. Returnerar avregistrering. */
export function paLedig(cb: () => void): () => void {
  const lyssnare = () => cb()
  kanal.addEventListener(LEDIG, lyssnare)
  return () => kanal.removeEventListener(LEDIG, lyssnare)
}

/**
 * Anropar `klar` när cookievalet är gjort och `fordrojningMs` har gått efter
 * det. Returnerar en städfunktion för useEffect. Beroendena går att byta ut i
 * tester.
 */
export function efterCookievalOchTid(
  fordrojningMs: number,
  klar: () => void,
  beroenden: {
    cookieval?: () => boolean
    vantaPaCookieval?: (klart: () => void) => () => void
  } = {},
): () => void {
  const cookieval = beroenden.cookieval ?? harGjortCookieval
  const vantaPaCookieval = beroenden.vantaPaCookieval ?? ((klart: () => void) => {
    const lyssnare = () => klart()
    window.addEventListener('svalla-consent-changed', lyssnare, { once: true })
    return () => window.removeEventListener('svalla-consent-changed', lyssnare)
  })

  let stangd = false
  let timer: ReturnType<typeof setTimeout> | null = null
  const starta = () => {
    if (stangd) return
    timer = setTimeout(() => { if (!stangd) klar() }, fordrojningMs)
  }

  const slutaVanta = cookieval() ? (starta(), null) : vantaPaCookieval(starta)

  return () => {
    stangd = true
    if (timer) clearTimeout(timer)
    slutaVanta?.()
  }
}
