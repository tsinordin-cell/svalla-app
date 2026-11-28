/**
 * Nya konton går till onboardingen direkt efter första inloggningen
 * (Toms ja 2026-11-27). Förut skickade bara /feed vidare till guiden, så den
 * som loggade in första gången via en delad tur eller en ö-sida missade den.
 * Efter guiden kommer personen tillbaka till sidan hen var på väg till.
 */

/** Intern sökväg som är säker att skicka vidare till, annars null. Stoppar //x och /\x. */
function internSokvag(v: string | null | undefined): string | null {
  if (typeof v !== 'string' || v.length > 500) return null
  if (!v.startsWith('/') || v.startsWith('//') || v.startsWith('/\\')) return null
  if (/[\r\n\t]/.test(v)) return null
  return v
}

// Sidor som inte är värda att komma tillbaka till efter guiden.
const INTE_TILLBAKA = ['/onboarding', '/logga-in', '/kom-igang', '/auth', '/bekrafta-epost', '/registrera']

/** Sökvägen att gå till efter guiden, eller null (då väljer guiden själv). */
export function tolkaTillbaka(v: string | null | undefined): string | null {
  const s = internSokvag(v)
  if (!s || s === '/' || s === '/feed') return null
  const bas = s.split(/[?#]/)[0] ?? s
  if (INTE_TILLBAKA.some(p => bas === p || bas.startsWith(`${p}/`))) return null
  return s
}

/** Adressen till guiden för ett nytt konto som var på väg till `nasta`. */
export function tillGuiden(nasta: string | null | undefined): string {
  const tillbaka = tolkaTillbaka(nasta)
  return tillbaka ? `/onboarding?tillbaka=${encodeURIComponent(tillbaka)}` : '/onboarding'
}
