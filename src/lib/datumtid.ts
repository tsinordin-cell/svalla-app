/**
 * Datum och tid på svenska för datetime-local-värden ("ÅÅÅÅ-MM-DDTHH:MM", lokal tid).
 * Används av DatumTidFalt (2026-10-26). "2026-10-25T17:11" → "sön 25 okt · 17:11".
 */
export function formateraDatumTid(varde: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(varde)
  if (!m) return varde
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5]))
  if (Number.isNaN(d.getTime())) return varde
  const dag = d.toLocaleDateString('sv-SE', { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\./g, '')
  return `${dag} · ${m[4]}:${m[5]}`
}
