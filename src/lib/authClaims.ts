import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Snabb "vem tittar?" för serversidor som ändå är dynamiska.
 *
 * BAKGRUND (2026-08-02): `auth.getUser()` är ett nätverksanrop till Supabase
 * Auth — uppmätt 620 ms i produktion, mot ~190 ms för en vanlig DB-fråga.
 * På /feed låg det FÖRST i kedjan, så varje inloggad rendering betalade
 * drygt en halv sekund innan något annat ens fick börja.
 *
 * Projektet signerar JWT med ES256 och publicerar JWKS, så tokenen kan
 * verifieras LOKALT: `getClaims()` hämtar JWKS en gång (uppmätt 4 ms,
 * cachas globalt i auth-js så efterföljande anrop i samma lambda är ~0 ms)
 * och verifierar signaturen med WebCrypto (uppmätt 0,24 ms).
 *
 * GRÄNSEN — läs innan du använder den här någon annanstans:
 * `getClaims()` bevisar att tokenen är äkta och ogiltig efter utgång (~1 h),
 * men INTE att kontot fortfarande finns eller inte stängts av under den
 * timmen. Därför:
 *   - OK: läsande personalisering — vems flöde ska visas, hälsningsnamn.
 *   - INTE OK: behörighetsbeslut — adminsidor, API-rutter som ändrar data.
 *     Där ska `auth.getUser()` fortsätta användas (alla 59 sådana ställen
 *     är orörda, se CLAUDE.md p27).
 *
 * Faller tillbaka på `getUser()` om verifieringen inte går att genomföra
 * (t.ex. äldre HS256-token under en nyckelrotation) — hellre 620 ms än en
 * felaktigt utloggad användare.
 */
export async function getViewerId(supabase: SupabaseClient): Promise<string | null> {
  try {
    const { data, error } = await supabase.auth.getClaims()
    if (!error && data?.claims?.sub) return data.claims.sub
    if (!error) return null // ingen session alls — ingen anledning att fråga servern
  } catch {
    // fortsätt till fallback
  }
  try {
    const { data } = await supabase.auth.getUser()
    return data?.user?.id ?? null
  } catch {
    return null
  }
}
