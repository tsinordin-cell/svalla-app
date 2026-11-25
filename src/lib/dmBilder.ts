/**
 * Bilder i direktmeddelanden (2026-11-25).
 *
 * Bilderna ligger i en PRIVAT hink. Bara deltagarna i konversationen kan läsa
 * dem (regel på storage.objects), och de visas via länkar som slutar gälla
 * efter en timme. I messages.attachment_url sparas sökvägen i hinken,
 * "<konversation>/<avsändare>/<slumpnamn>.jpg" — aldrig en publik länk.
 */
export const DM_BILD_HINK = 'dm-bilder'

/** Länkarnas giltighetstid i sekunder. */
export const DM_BILD_LANK_SEKUNDER = 60 * 60

const SOKVAG_RE = /^[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.jpg$/i

/** Sant om värdet är en sökväg i den privata hinken (inte en gammal publik länk). */
export function arDmBildSokvag(v: string | null | undefined): boolean {
  return typeof v === 'string' && SOKVAG_RE.test(v)
}
