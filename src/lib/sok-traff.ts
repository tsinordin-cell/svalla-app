/**
 * Matchning för /sok mot statiska öar och aktiviteter.
 * Diakriter tas bort så att "gallno" träffar "Gällnö" och "moja" träffar "Möja".
 * Samma idé som normalisera() i oar-snabbfiltret, plus NFD så att
 * sönderdelade tecken (a + ring) räknas likadant.
 */

export function foldSok(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
}

/**
 * Delar en sökning i ord, så att "gästhamn Utö" hittar "Gästhamn Sandudden Utö"
 * (granskningen 2026-11-23: hela frasen krävdes i följd). Högst 5 ord, inga dubbletter.
 */
export function delaOrd(q: string): string[] {
  const sedda = new Set<string>()
  const ord: string[] = []
  for (const w of q.trim().split(/\s+/)) {
    if (!w) continue
    const k = w.toLowerCase()
    if (sedda.has(k)) continue
    sedda.add(k)
    ord.push(w)
    if (ord.length === 5) break
  }
  return ord
}

/**
 * Ett PostgREST-or-filter per ord. Flera .or() på samma fråga blir OCH mellan orden,
 * så varje ord måste finnas i någon av kolumnerna. Orden ska redan vara sanerade.
 */
export function ordFilter(kolumner: readonly string[], ord: readonly string[]): string[] {
  return ord.map(w => kolumner.map(k => `${k}.ilike.%${w}%`).join(','))
}

export type SokbarO = {
  slug: string
  name: string
  regionLabel?: string
  tagline: string
  tags: string[]
}

function rang(o: SokbarO, n: string): number {
  const name = foldSok(o.name)
  const slug = foldSok(o.slug)
  if (name === n || slug === n) return 0
  if (name.startsWith(n) || slug.startsWith(n)) return 1
  if (name.includes(n) || slug.includes(n)) return 2
  return 3
}

function oFaltMatchar(o: SokbarO, n: string): boolean {
  return (
    foldSok(o.name).includes(n) ||
    foldSok(o.slug).includes(n) ||
    foldSok(o.regionLabel ?? '').includes(n) ||
    foldSok(o.tagline).includes(n) ||
    o.tags.some(t => foldSok(t).includes(n))
  )
}

/** Hela frasen, eller varje ord för sig i något av fälten. */
export function oMatchar(o: SokbarO, q: string): boolean {
  const n = foldSok(q)
  if (!n) return false
  if (oFaltMatchar(o, n)) return true
  const ord = delaOrd(n)
  return ord.length > 1 && ord.every(w => oFaltMatchar(o, w))
}

/** Bästa träff först. Exakt namn eller slug trillar inte ur taket på max. */
export function valjOar<T extends SokbarO>(oar: readonly T[], q: string, max = 10): T[] {
  const n = foldSok(q)
  if (!n) return []
  return oar
    .filter(o => oMatchar(o, q))
    .sort((a, b) => rang(a, n) - rang(b, n))
    .slice(0, max)
}

export type SokbarAktivitet = {
  name: string
  shortName: string
  matchers: readonly string[]
}

export function aktivitetMatchar(a: SokbarAktivitet, q: string): boolean {
  const n = foldSok(q)
  if (!n) return false
  return (
    foldSok(a.name).includes(n) ||
    foldSok(a.shortName).includes(n) ||
    a.matchers.some(m => foldSok(m).includes(n))
  )
}

/** Samma regel som tidigare: taggen innehåller sökningen, eller tvärtom utan #. */
export function hashtagMatchar(tag: string, q: string): boolean {
  const n = foldSok(q)
  const t = foldSok(tag)
  if (!n || !t) return false
  return t.includes(n) || n.includes(t.replace(/^#/, ''))
}
