/**
 * Namnsteget i onboardingen (2026-11-28, Toms ja 27 nov).
 *
 * Mätt 27 nov: 74 av 133 konton hade början på sin e-postadress som publikt
 * användarnamn. Databasregeln (handle_new_user) tog e-postens första del när
 * Google-kontot skapades. Guiden ber nu om ett eget namn och föreslår ett
 * som bygger på personens namn, aldrig på e-posten.
 */
import { USERNAME_MAX, USERNAME_MIN } from './username'

/** Namn som databasregeln satte automatiskt: e-postens första del eller "seglare"/"seglare-xxxxxxxx". */
export function arAutomatisktNamn(username: string | null | undefined, epost: string | null | undefined): boolean {
  const namn = (username ?? '').trim().toLowerCase()
  if (!namn) return true
  if (/^seglare(-[0-9a-f]{8})?$/.test(namn)) return true
  const lokal = (epost ?? '').split('@')[0]?.trim().toLowerCase() ?? ''
  return lokal.length > 0 && namn === lokal
}

/** "Åsa Öberg-Lind" → "asa-oberg-lind". Tomt om det inte blir minst tre tecken. */
export function namnForslag(fulltNamn: string | null | undefined): string {
  const bas = (fulltNamn ?? '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss').replace(/[æ]/gi, 'ae').replace(/[ø]/gi, 'o')
    .trim().toLowerCase()
  if (bas.includes('@')) return ''
  const rent = bas
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_.-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^[.\-_]+|[.\-_]+$/g, '')
    .slice(0, USERNAME_MAX)
    .replace(/[.\-_]+$/g, '')
  return rent.length >= USERNAME_MIN ? rent : ''
}

/** Förnamnet ur ett fullständigt namn, för hälsningen. Högst 30 tecken. */
export function fornamnAv(fulltNamn: string | null | undefined): string {
  const forsta = (fulltNamn ?? '').trim().split(/\s+/)[0] ?? ''
  if (!forsta || forsta.includes('@')) return ''
  return forsta.slice(0, 30)
}
