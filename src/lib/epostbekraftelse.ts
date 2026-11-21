/**
 * E-postbekräftelse vid nytt konto (2026-11-21).
 *
 * Tom slog på "Confirm email" i Supabase 2026-11-21. Före det räknades varje
 * e-postadress som bekräftad direkt, så vem som helst kunde skapa ett konto
 * med någon annans adress (mätt: 49 av 132 konton hade aldrig bekräftat
 * sin adress).
 *
 * Bekräftelsemejlet (Supabase → Auth → Emails → Confirm sign up) länkar till
 *   https://svalla.se/bekrafta-epost?token_hash=…&type=email&next={{ .RedirectTo }}
 * Den länken fungerar i vilken webbläsare som helst, till skillnad från
 * Supabases standardlänk som bara fungerar i webbläsaren där kontot skapades.
 *
 * {{ .RedirectTo }} är adressen vi skickade med som emailRedirectTo när kontot
 * skapades. Står den inte i Supabases tillåtna lista blir den Site URL
 * (https://svalla.se), och då hamnar användaren i flödet.
 */
export const SVALLA_ORIGIN = 'https://svalla.se'
export const STANDARD_NASTA = '/feed'

/** Säker intern sökväg, annars null. Stoppar //evil.com och /\evil.com. */
function internSokvag(s: string): string | null {
  if (!s.startsWith('/') || s.startsWith('//') || s.startsWith('/\\')) return null
  return s
}

/**
 * emailRedirectTo för signUp och resend: dit användaren kommer efter att ha
 * bekräftat. Alltid på svalla.se, eftersom bara den domänen står i Supabases
 * tillåtna lista (en förhandsvisning har en annan adress).
 */
export function bekraftelseMal(returnTo: string | null | undefined): string {
  const vag = internSokvag(returnTo ?? '') ?? STANDARD_NASTA
  return `${SVALLA_ORIGIN}${vag}`
}

/**
 * Sökvägen att gå till efter bekräftelsen, ur länkens next. Godtar en intern
 * sökväg eller en fullständig adress på svalla.se eller sidans egen adress.
 * Startsidan och allt okänt blir flödet.
 */
export function sakerNasta(next: string | null | undefined, egetOrigin: string): string {
  if (!next) return STANDARD_NASTA
  const intern = internSokvag(next)
  let vag: string | null = intern
  if (!vag) {
    try {
      const u = new URL(next)
      if (u.origin === SVALLA_ORIGIN || u.origin === egetOrigin) vag = internSokvag(u.pathname + u.search)
    } catch { vag = null }
  }
  if (!vag || vag === '/') return STANDARD_NASTA
  return vag
}
