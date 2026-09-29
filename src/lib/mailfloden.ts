/**
 * Automatiska mejlflöden som är BYGGDA men AVSTÄNGDA (2026-09-29).
 *
 * Tom beslutade 2026-09-29: "Bygg avstängt". Regel 6: ett utskick är en
 * bestående inställning och kräver hans uttryckliga ja innan det går till
 * riktiga mottagare. Därför skickar inget av flödena nedan något förrän
 * flödets namn står i miljövariabeln EMAIL_AUTOMATIK i Vercel, till exempel
 *
 *   EMAIL_AUTOMATIK=day60,day90
 *
 * Saknas variabeln, eller är den tom, är ALLA flöden avstängda. Det finns
 * ingen annan väg att slå på dem, och ingen standard som slår på något.
 *
 * Förhandsvisning av varje mall: /admin/mail (renderas av samma kod som
 * skickar). Testet i mailfloden.test.ts spärrar att standardläget är av.
 */

export const MAILFLODEN = ['manadsbrev', 'day60', 'day90', 'saved_island', 'weekly_island'] as const
export type Mailflode = (typeof MAILFLODEN)[number]

/** true bara om flödet uttryckligen står i EMAIL_AUTOMATIK. */
export function flodePa(flode: Mailflode, env: string | undefined = process.env.EMAIL_AUTOMATIK): boolean {
  if (!env) return false
  return env.split(',').map(s => s.trim()).filter(Boolean).includes(flode)
}

/**
 * Månadsbrevet börjar gå första tisdagen i månaden, oktober–mars — de månader
 * då inga andra återkommande utskick går (kort a55a5f21). Fönstret är öppet
 * från första tisdagen till och med den 14:e, så att mottagare som inte hanns
 * med på grund av dygnstaket (Resend gratis 100/dygn) får brevet dagen efter.
 * email_log hindrar dubbletter. Mallen bär sin månad i frontmatter
 * (`manad: 2026-10`) och skickas bara om den stämmer med innevarande månad,
 * så ett gammalt brev aldrig går ut igen av misstag.
 */
export function manadsbrevFonster(d: Date): boolean {
  const m = d.getUTCMonth() + 1
  if (!(m >= 10 || m <= 3)) return false
  const forsta = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).getUTCDay()
  const forstaTisdag = 1 + ((2 - forsta + 7) % 7)
  return d.getUTCDate() >= forstaTisdag && d.getUTCDate() <= 14
}

export function manadsnyckel(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

/**
 * Veckans ö går tisdagar april–september, alltså säsongen då skärgårdstrafiken
 * går som mest. Utanför den tar månadsbrevet över.
 */
export function arVeckansOdag(d: Date): boolean {
  const m = d.getUTCMonth() + 1
  return m >= 4 && m <= 9 && d.getUTCDay() === 2
}

/** ISO-veckonummer, för att rotera veckans ö utan slump. */
export function isoVecka(d: Date): number {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
  const dag = t.getUTCDay() || 7
  t.setUTCDate(t.getUTCDate() + 4 - dag)
  const arStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1))
  return Math.ceil(((t.getTime() - arStart.getTime()) / 86400000 + 1) / 7)
}

/** Välj veckans ö deterministiskt ur en sorterad lista. */
export function valjVeckansO<T>(kandidater: readonly T[], d: Date): T | undefined {
  if (kandidater.length === 0) return undefined
  return kandidater[(isoVecka(d) + d.getUTCFullYear()) % kandidater.length]
}
