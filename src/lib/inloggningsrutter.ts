/**
 * Sökvägar som kräver inloggning (revision 2026-10-02).
 *
 * Speglar PROTECTED_ROUTES i src/middleware.ts, inklusive undantaget att
 * /planera/ny och /planera/<uuid> är publika (bara exakt /planera är skyddad).
 * Middleware skickar utloggade besökare från de här sidorna till /logga-in.
 * /admin har en egen grind (admin-cookie) och ingår inte här.
 *
 * Varför den finns: Next.js prefetchar varje <Link> som syns på skärmen. För
 * en utloggad besökare blev varje sådan prefetch en 307 till /logga-in plus
 * ett anrop till /logga-in. Uppmätt i Vercel-loggarna 2026-10-02: cirka
 * 2 400 sådana 307:or per dygn (/profil 610, /feed 471, /logga 436,
 * /planera 427, /logga/manuell 412). Länkar till de här sidorna ska därför
 * ha prefetch={false} när besökaren kan vara utloggad.
 *
 * Ändras listan i middleware ska den ändras här också. Testet
 * inloggningsrutter.test.ts läser middleware.ts och fäller bygget om de skiljer sig.
 */
export const SKYDDADE: readonly string[] = [
  '/feed', '/profil', '/spara', '/logga', '/notiser',
  '/planera', '/sparade', '/meddelanden', '/min-skargard',
  '/onboarding', '/check-in', '/loppis/sparat', '/loppis/mina-annonser',
]

/** Publika undantag under /planera, samma som i middleware: guiden och delade rutter. */
export const PUBLIK_PLANERA_GUIDE = '/planera/ny'
export const PUBLIK_PLANERA_RUTT = /^\/planera\/[0-9a-f-]{36}$/

export function kraverInloggning(href: string): boolean {
  if (!href.startsWith('/')) return false
  const sokvag = href.split(/[?#]/)[0] ?? ''
  if (sokvag === PUBLIK_PLANERA_GUIDE || PUBLIK_PLANERA_RUTT.test(sokvag)) return false
  return SKYDDADE.some(r => sokvag === r || sokvag.startsWith(r + '/'))
}

/** Värde för <Link prefetch>: false till skyddade sidor, annars Next standard. */
export function prefetchFor(href: string): false | undefined {
  return kraverInloggning(href) ? false : undefined
}
