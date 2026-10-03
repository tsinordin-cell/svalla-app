import type { SupabaseClient } from '@supabase/supabase-js'
import { isAuthApiError, isAuthError, isAuthSessionMissingError } from '@supabase/supabase-js'

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
 *   - OK: middleware:s redirect-beslut före skyddade sidor (revision
 *     2026-10-02). Till skillnad från getUser() kontrolleras inte att
 *     sessionen eller kontot finns kvar. Sidor som visar eller ändrar
 *     per-användardata kontrollerar själva (getUser) eller läser via RLS.
 *   - INTE OK: behörighetsbeslut — adminsidor, API-rutter som ändrar data.
 *     Där ska `auth.getUser()` fortsätta användas (alla 59 sådana ställen
 *     är orörda, se CLAUDE.md p27).
 *
 * FLÖDET (revision 2026-10-02):
 *   1. getSession() läser sessionen ur cookien och förnyar en access-token
 *      som håller på att gå ut. Fel eller ingen session ger null, samma svar
 *      som getUser() gav. Sessionen används bara för att få fram tokenen.
 *   2. getClaims(token) verifierar tokenen lokalt. Ogiltig signatur eller
 *      struktur, utgången token, saknat sub, eller ett svar där Auth-servern
 *      redan har avvisat tokenen ger null utan fler anrop. (En token vars
 *      delar inte är JSON kastar SyntaxError och går till steg 3 — ett extra
 *      anrop, som förut. SyntaxError räknas inte som ogiltig token, eftersom
 *      ett trasigt JWKS-svar kastar samma fel och då ska servern avgöra.)
 *   3. Bara om verifieringen inte gick att genomföra (t.ex. JWKS gick inte
 *      att nå, okänd algoritm) eller om iss inte är det här projektet frågas
 *      Auth-servern med getUser(token) — hellre 620 ms än en felaktigt
 *      utloggad användare. Steget gör ingen ny förnyelse av sessionen.
 *
 * `supabaseUrl` styr vilken iss som förväntas; standard är projektets URL.
 */
export async function getViewerId(
  supabase: SupabaseClient,
  supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL,
): Promise<string | null> {
  // 1. Sessionen ur cookien (förnyas här vid behov, en gång).
  let token: string
  try {
    const { data, error } = await supabase.auth.getSession()
    if (error || !data.session?.access_token) return null
    token = data.session.access_token
  } catch {
    return null
  }

  // 2. Lokal verifiering. allowExpired: utgången token kontrolleras nedan i
  // stället, så att den ger null direkt.
  try {
    const { data, error } = await supabase.auth.getClaims(token, { allowExpired: true })
    if (data) {
      const { sub, exp, iss } = data.claims
      if (typeof sub !== 'string' || sub === '') return null
      if (typeof exp !== 'number' || exp <= Math.floor(Date.now() / 1000)) return null
      if (iss === forvantadIss(supabaseUrl)) return sub
      // Annan iss än projektets: låt Auth-servern avgöra (steg 3).
    } else if (arOgiltigToken(error)) {
      return null
    }
  } catch (e) {
    if (arOgiltigToken(e)) return null
  }

  // 3. Gick inte att verifiera lokalt: fråga Auth-servern som tidigare.
  try {
    const { data, error } = await supabase.auth.getUser(token)
    return !error && data.user ? data.user.id : null
  } catch {
    return null
  }
}

/** Projektets iss, t.ex. https://<ref>.supabase.co/auth/v1. */
function forvantadIss(supabaseUrl: string | undefined): string | null {
  return supabaseUrl ? `${supabaseUrl.replace(/\/+$/, '')}/auth/v1` : null
}

/**
 * Fel som betyder att tokenen är ogiltig, så att det inte är någon idé att
 * fråga Auth-servern igen: struktur eller signatur (AuthInvalidJwtError),
 * eller ett svar från Auth-servern via getClaims egen fallback (saknad
 * session, 403). Nätverksfel, 5xx och okända fel räknas inte hit.
 */
function arOgiltigToken(e: unknown): boolean {
  if (!isAuthError(e)) return false
  if (e.name === 'AuthInvalidJwtError') return true
  if (isAuthSessionMissingError(e)) return true
  return isAuthApiError(e) && e.status === 403
}
