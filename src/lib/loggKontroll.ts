/**
 * Kontroll av snabb-loggen innan turen sparas (granskningen 2026-11-23):
 * distansen tog emot -5 eftersom min="0" bara styr pilknapparna, och
 * Ankrar kunde ligga före Kasta loss.
 * Tomma fält är tillåtna, som tidigare.
 */
export type LoggFel = { falt: 'distans' | 'tid' | 'tider'; text: string }

export function kontrolleraLogg(
  distans: string,
  tid: string,
  startLokal: string,
  slutLokal: string,
): LoggFel | null {
  const d = distans.trim().replace(',', '.')
  if (d !== '') {
    const n = Number(d)
    if (!Number.isFinite(n)) return { falt: 'distans', text: 'Skriv distansen som en siffra, till exempel 12,5.' }
    if (n < 0) return { falt: 'distans', text: 'Distansen kan inte vara negativ.' }
  }
  const t = tid.trim()
  if (t !== '') {
    const n = Number(t)
    if (!Number.isFinite(n)) return { falt: 'tid', text: 'Skriv tiden i hela minuter.' }
    if (n < 0) return { falt: 'tid', text: 'Tiden kan inte vara negativ.' }
  }
  const start = Date.parse(startLokal)
  const slut = Date.parse(slutLokal)
  if (Number.isFinite(start) && Number.isFinite(slut) && slut < start) {
    return { falt: 'tider', text: 'Ankrar kan inte vara före Kasta loss.' }
  }
  return null
}
