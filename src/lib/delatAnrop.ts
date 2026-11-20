/**
 * Delar ett anrop mellan alla som frågar samtidigt (2026-11-20).
 *
 * Varför: 30 klientkomponenter frågar var för sig "vem är inloggad"
 * (auth.getUser), och varje fråga är ett eget nätverksanrop. Granskningen
 * 19 nov mätte 35 sådana anrop på en enda laddning av flödet. Svaret är
 * detsamma för alla, så det räcker att fråga en gång.
 *
 * delaAnrop(hamta, giltigMs) ger en funktion som:
 *  - låter alla som frågar medan ett anrop pågår dela det anropet,
 *  - återanvänder svaret i giltigMs efter att anropet startade,
 *  - glömmer ett svar som inte ska sparas (fel) eller ett avvisat löfte,
 *  - glömmer allt när glom() anropas (in- eller utloggning).
 */
export type DelatAnrop<T> = (() => Promise<T>) & { glom: () => void }

export function delaAnrop<T>(
  hamta: () => Promise<T>,
  giltigMs: number,
  spara: (svar: T) => boolean = () => true,
  nu: () => number = () => Date.now(),
): DelatAnrop<T> {
  let lofte: Promise<T> | null = null
  let startade = 0

  const anropa = (() => {
    if (lofte && nu() - startade < giltigMs) return lofte
    startade = nu()
    const mitt: Promise<T> = hamta()
    lofte = mitt
    mitt.then(
      svar => { if (lofte === mitt && !spara(svar)) lofte = null },
      () => { if (lofte === mitt) lofte = null },
    )
    return mitt
  }) as DelatAnrop<T>
  anropa.glom = () => { lofte = null }
  return anropa
}

type AuthMedGetUser = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUser: (jwt?: string) => Promise<any>
  onAuthStateChange: (cb: () => void) => unknown
}

const MARKE = Symbol.for('svalla.getUser.delat')

/** Hur länge ett svar på "vem är inloggad" återanvänds i webbläsaren. */
export const GETUSER_GILTIG_MS = 5_000

/**
 * Byter auth.getUser() mot en delad variant. Görs en gång per klient.
 * Anrop med ett eget token (getUser(jwt)) går alltid rakt igenom.
 * Vid varje ändring av inloggningen glöms svaret.
 */
export function delaGetUser(auth: AuthMedGetUser, giltigMs = GETUSER_GILTIG_MS): void {
  const markt = auth as unknown as Record<symbol, boolean>
  if (markt[MARKE]) return
  const original = auth.getUser.bind(auth)
  const delad = delaAnrop(() => original(), giltigMs, svar => !svar?.error)
  auth.getUser = (jwt?: string) => (jwt ? original(jwt) : delad())
  auth.onAuthStateChange(() => delad.glom())
  markt[MARKE] = true
}
