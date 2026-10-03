import type { NextResponse } from 'next/server'

/**
 * revision 2026-10-02: tar bort Supabase-sessionens cookies från ett svar.
 *
 * @supabase/ssr lagrar sessionen i `sb-<projekt>-auth-token`, delad i
 * `.0`, `.1` … när värdet är stort, och PKCE-inloggningen använder
 * `…-auth-token-code-verifier`. Projektdelen räknas fram som i supabase-js
 * (första ledet i värdnamnet). Borttagningen görs utan nätverksanrop, så den
 * fungerar även när Auth-servern inte svarar och när användaren redan är
 * raderad. Cookies som sätts direkt på svaret går före sådana som satts via
 * cookies() under samma förfrågan (Next: appendMutableCookies).
 *
 * Borttagningen görs med Expires i det förflutna (res.cookies.delete), inte
 * med Max-Age=0: när cookies() har ändrats under förfrågan läser Next om
 * svarets cookies och tappar då Max-Age=0, så att en tom cookie blev kvar.
 */
const AUTH_COOKIE = /^sb-.+-auth-token(?:\.\d+|-code-verifier|-user)?$/

export function supabaseAuthCookieKey(supabaseUrl: string): string {
  return `sb-${new URL(supabaseUrl).hostname.split('.')[0]}-auth-token`
}

/** Returnerar de cookienamn som tagits bort (sorterade). */
export function clearSupabaseAuthCookies(
  res: NextResponse,
  cookieNames: Iterable<string>,
  supabaseUrl: string | undefined,
): string[] {
  const names = new Set<string>()
  if (supabaseUrl) {
    try {
      names.add(supabaseAuthCookieKey(supabaseUrl))
    } catch {
      // Ogiltig URL: ta bara bort de namn som finns.
    }
  }
  for (const name of cookieNames) if (AUTH_COOKIE.test(name)) names.add(name)
  for (const name of names) res.cookies.delete({ name, path: '/' })
  return [...names].sort()
}
