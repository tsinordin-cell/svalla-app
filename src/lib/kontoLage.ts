/**
 * kontoLage: avgör om /logga-in ska öppna "Skapa konto" eller "Logga in"
 * (kontotratten, 2026-11-23).
 *
 * Mätt 24 okt–23 nov: 18 av 25 sessioner som nådde kontosidan lämnade utan
 * konto. Nya besökare som tryckte "Spara" eller "Logga in för att prata med
 * mig" möttes av formuläret för befintliga konton. Regeln här:
 *
 *  1. mode=ny           → Skapa konto (länkar som uttryckligen ber om det)
 *  2. mode=login eller
 *     existing=1        → Logga in (länkar som uttryckligen heter "Logga in"
 *                         bredvid en skapa-konto-knapp)
 *  3. returnTo finns och webbläsaren har aldrig haft ett konto
 *                       → Skapa konto. returnTo betyder att besökaren ville
 *                         göra något (spara, fråga Thorkel, svara i forumet).
 *  4. annars            → Logga in (menyns "Logga in" har ingen returnTo).
 *
 * "Har haft ett konto" = kakan svalla_har_konto (sätts av middleware, av
 * /auth/callback och efter inloggning här) eller en Supabase-sessionskaka
 * (sb-…-auth-token). Den senare täcker den som loggat in men aldrig besökt
 * en skyddad sida och därför saknar svalla_har_konto.
 */

export const HAR_KONTO_KAKA = 'svalla_har_konto'

/** Kortlivad markering som /auth/callback sätter när ett konto just skapats
 *  via Google eller Apple. Läses av KontoSignal, som skickar user_signup
 *  (bara med samtycke) och tar bort den. Innehåller inga personuppgifter. */
export const NY_REGISTRERING_KAKA = 'svalla_ny_registrering'

const SUPABASE_SESSION = /^sb-[a-z0-9]+-auth-token(\.\d+)?$/

/** Sant om någon av kakorna visar att webbläsaren haft ett konto inloggat. */
export function harHaftKonto(kaknamn: readonly string[]): boolean {
  return kaknamn.some(n => n === HAR_KONTO_KAKA || SUPABASE_SESSION.test(n))
}

/** Namnen på webbläsarens kakor (klientsidan). Tom lista om de inte går att läsa. */
export function kaknamnIWebblasaren(): string[] {
  try {
    if (typeof document === 'undefined') return []
    return document.cookie.split(';').map(c => c.split('=')[0]?.trim() ?? '').filter(Boolean)
  } catch {
    return []
  }
}

export type Startlage = 'ny' | 'logga-in'

export function startlage(
  p: { mode?: string | null; existing?: string | null; returnTo?: string | null },
  harKonto: boolean,
): Startlage {
  if (p.mode === 'ny') return 'ny'
  if (p.mode === 'login' || p.existing === '1') return 'logga-in'
  if (p.returnTo && p.returnTo.startsWith('/') && !harKonto) return 'ny'
  return 'logga-in'
}

/** Raden under loggan när "Skapa konto" visas: säger vad kontot ger för just
 *  det besökaren försökte göra. Okänt mål → den gamla raden. */
export function skapaKontoRad(returnTo: string | null | undefined): string {
  const r = returnTo ?? ''
  if (r === '/guide' || r.startsWith('/guide?') || r.startsWith('/guide/')) return 'Skapa konto och fråga Thorkel'
  if (r.startsWith('/plats/') || r.startsWith('/planera/') || r.startsWith('/forum/loppis/')) return 'Skapa konto och spara det du hittat'
  if (r.startsWith('/o/')) return 'Skapa konto och spara dina öar'
  return 'Skapa konto och börja logga turer'
}

/** Sökvägen utan query, för analys (fran i user_signup). Inget annat än en
 *  intern sökväg sparas, samma princip som /api/analytics/track. */
export function franSokvag(returnTo: string | null | undefined): string | undefined {
  if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) return undefined
  const s = (returnTo.split(/[?#]/)[0] ?? '').slice(0, 120)
  return /^\/[\w\-/.%åäöÅÄÖ]*$/.test(s) ? s : undefined
}

/** Sätter svalla_har_konto i webbläsaren (samma livslängd som middleware). */
export function sattHarKontoKaka(): void {
  try {
    const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${HAR_KONTO_KAKA}=1; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secure}`
  } catch { /* privat läge */ }
}
