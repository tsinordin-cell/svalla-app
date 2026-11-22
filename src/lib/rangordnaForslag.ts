/**
 * Ordning för "Följ några seglare" i guiden.
 *
 * Servern hämtar förslagen innan användaren valt båttyp och hemmahamn, så
 * listan tog inte hänsyn till valen (granskningen 2026-11-22: guiden föreslog
 * andra konton än flödets "Hemmahamn Vaxholm, som du" direkt efteråt).
 *
 * Ordning: vännen som delade länken först, sedan samma hemmahamn, sedan samma
 * båttyp, i övrigt serverns ordning (senaste publika tur först). Hemmahamn och
 * båttyp finns bara med när personen valt att visa dem (users_publik).
 */
export type Forslag = {
  id: string
  home_port: string | null
  boat_type?: string | null
  van?: boolean
}

const norm = (v: string | null | undefined) => (v ?? '').trim().toLocaleLowerCase('sv-SE')

export function rangordnaForslag<T extends Forslag>(forslag: T[], minHamn: string, minBattyp: string | null): T[] {
  const hamn = norm(minHamn)
  const battyp = minBattyp && minBattyp !== 'Charter' ? norm(minBattyp) : ''
  const poang = (f: T) =>
    (f.van ? 4 : 0) +
    (hamn && norm(f.home_port) === hamn ? 2 : 0) +
    (battyp && norm(f.boat_type) === battyp ? 1 : 0)
  return forslag
    .map((f, i) => ({ f, i, p: poang(f) }))
    .sort((a, b) => b.p - a.p || a.i - b.i)
    .map(x => x.f)
}
