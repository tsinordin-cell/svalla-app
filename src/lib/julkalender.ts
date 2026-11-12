/**
 * Svallas julkalender (2026-11-12, idé från Claes Dahlstrand).
 *
 * Luckorna öppnas en per dag 1–24 december, svensk tid, och bara för inloggade.
 * Innehållet i varje lucka ska vara källkontrollerat innan det läggs in här
 * (samma krav som resten av Svalla: källa och datum, inga priser). Luckor som
 * ännu saknar innehåll visas som "Kommer snart" och avslöjar inget.
 * Partnerluckor med erbjudanden ska ha reklam: true så att de märks som reklam.
 */

export type Lucka = {
  dag: number
  titel: string
  text: string
  /** Källa (webbplats) och datum då uppgiften lästes */
  kalla?: string
  lank?: string
  lankText?: string
  /** true om luckan är ett erbjudande från en partner — märks som reklam */
  reklam?: boolean
}

/** Fylls med källkontrollerat innehåll innan 1 december. */
export const LUCKOR: Lucka[] = []

export const AR = 2026

/** Dagens datum i Sverige som { ar, manad (1–12), dag }. */
export function idagSverige(nu: Date = new Date()): { ar: number; manad: number; dag: number } {
  const delar = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(nu)
  const v = (typ: string) => Number(delar.find(d => d.type === typ)?.value)
  return { ar: v('year'), manad: v('month'), dag: v('day') }
}

/**
 * Hur många luckor som är öppningsbara just nu (0 före 1 december, 24 efter julafton
 * samma år). testdag (1–24) används bara i förhandsvisningar, aldrig i produktion.
 */
export function oppnaLuckor(nu: Date = new Date(), testdag?: number): number {
  if (testdag && testdag >= 1 && testdag <= 24) return testdag
  const { ar, manad, dag } = idagSverige(nu)
  if (ar !== AR) return ar > AR ? 24 : 0
  if (manad < 12) return 0
  return Math.min(dag, 24)
}

/** true när julkalendern ska synas på startsidan (1–24 december). */
export function kalenderPagar(nu: Date = new Date()): boolean {
  const { ar, manad, dag } = idagSverige(nu)
  return ar === AR && manad === 12 && dag >= 1 && dag <= 24
}
