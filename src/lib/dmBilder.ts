/**
 * Bilder och röstmeddelanden i direktmeddelanden (2026-11-25, ljud 2026-11-26).
 *
 * Filerna ligger i en PRIVAT hink. Bara deltagarna i konversationen kan läsa
 * dem (regel på storage.objects), och de visas via länkar som slutar gälla
 * efter en timme. I messages.attachment_url sparas sökvägen i hinken,
 * "<konversation>/<avsändare>/<slumpnamn>.jpg|.m4a|.webm", aldrig en publik länk.
 * Databasregeln kan_ladda_upp_dm_bild godtar exakt samma filändelser.
 */
export const DM_BILD_HINK = 'dm-bilder'

/** Länkarnas giltighetstid i sekunder. */
export const DM_BILD_LANK_SEKUNDER = 60 * 60

const SOKVAG_RE = /^[0-9a-f-]{36}\/[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|m4a|webm)$/i

/** Sant om värdet är en sökväg i den privata hinken (inte en gammal publik länk). */
export function arDmBildSokvag(v: string | null | undefined): boolean {
  return typeof v === 'string' && SOKVAG_RE.test(v)
}

/** Längsta röstmeddelandet, i sekunder. */
export const ROST_MAX_SEKUNDER = 120
