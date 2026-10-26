/**
 * Kampanjlänkar: ?k=<namn> på länkar i TikTok-bio, Instagram och QR-koder.
 *
 * Varför: vi vill se vilken idé som ger besök och mejladresser (exitplanen,
 * kortet "Kampanjlänkar med egen källa"). document.referrer räcker inte, för
 * en QR-kod och en app som TikTok skickar ingen referrer alls.
 *
 * Så här fungerar det:
 *   - Namnet läses ur adressen när sidan laddas (PostHogPageView).
 *   - Det sparas i minnet, och i sessionStorage BARA om besökaren har sagt ja
 *     till statistik. Ingen cookie. Utan samtycke försvinner det när fliken
 *     stängs, och inget skickas (track() gör inget utan samtycke).
 *   - Det följer med varje statistikhändelse (props.kampanj) och följer med
 *     en mejlanmälan (preferences.kampanj), så /admin/kampanjer kan räkna
 *     besök och nya adresser per kampanj.
 *
 * Namnet är fritt men städas: små bokstäver, siffror och bindestreck, högst
 * 40 tecken. Exempel: svalla.se/?k=tiktok-bio, svalla.se/o/sandhamn?k=qr-stromkajen
 */

const NYCKEL = 'svalla_kampanj'

/** Godkänt kampanjnamn eller null. Används både i klienten och på servern. */
export function stadaKampanj(v: unknown): string | null {
  if (typeof v !== 'string') return null
  const s = v.trim().toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 40)
  return s.length >= 2 ? s : null
}

let iMinnet: string | null = null

/** Läs ?k= ur adressen. Anropas vid varje sidbyte. */
export function fangaKampanj(search: string, harSamtycke: boolean): void {
  if (typeof window === 'undefined') return
  try {
    const k = stadaKampanj(new URLSearchParams(search).get('k'))
    if (k) iMinnet = k
    const aktuell = iMinnet
    if (aktuell && harSamtycke) sessionStorage.setItem(NYCKEL, aktuell)
  } catch { /* tyst */ }
}

/** Sessionens kampanj, eller null. */
export function hamtaKampanj(): string | null {
  if (iMinnet) return iMinnet
  if (typeof window === 'undefined') return null
  try {
    return stadaKampanj(sessionStorage.getItem(NYCKEL))
  } catch {
    return null
  }
}
