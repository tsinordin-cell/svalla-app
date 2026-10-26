/**
 * Var de fasta ikonerna uppe till höger (hem, meddelanden, notiser) ska visas.
 *
 * De ligger ovanpå sidan (position fixed, zIndex 901), så på sidor med något
 * eget i det hörnet krockar de. Nav.tsx använder den här funktionen; den ligger
 * här för att kunna testas utan React (src/lib/klockor.test.ts).
 *
 * 2026-10-21: /planera/[id] (en planerad rutt) har avståndsbadgen längst upp
 * till höger i headern, och klockorna hamnade ovanpå den. /planera och
 * /planera/ny har inget där och behåller klockorna.
 *
 * 2026-10-26: /tur/[id] har dela- och mer-knapparna i samma hörn; klockorna låg
 * ovanpå dem och över texten när man skrollade.
 */
export const SIDOR_MED_EGNA_KLOCKOR = ['/feed', '/rutter', '/platser', '/profil', '/forum', '/u/', '/sok', '/upptack']

function matchar(path: string, p: string): boolean {
  return p.endsWith('/') ? path.startsWith(p) : path === p || path.startsWith(p + '/')
}

/** Är det här en planerad rutt (/planera/<id>), inte /planera eller /planera/ny? */
export function arPlaneradRutt(path: string): boolean {
  return /^\/planera\/(?!ny(\/|$))[^/]+/.test(path)
}

/** Är det här en tursida (/tur/<id>)? Den har dela- och mer-knapparna uppe till höger (2026-10-26). */
export function arTursida(path: string): boolean {
  return /^\/tur\/[^/]+/.test(path)
}

export function visaGlobalaKlockor(path: string, inloggad: boolean): boolean {
  if (!inloggad) return false
  if (SIDOR_MED_EGNA_KLOCKOR.some(p => matchar(path, p))) return false
  if (/^\/meddelanden/.test(path)) return false
  if (arPlaneradRutt(path)) return false
  if (arTursida(path)) return false
  return true
}
