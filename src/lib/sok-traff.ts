/**
 * Matchning för /sok mot statiska öar och aktiviteter.
 * Diakriter tas bort så att "gallno" träffar "Gällnö" och "moja" träffar "Möja".
 * Samma idé som normalisera() i oar-snabbfiltret, plus NFD så att
 * sönderdelade tecken (a + ring) räknas likadant.
 */

export function foldSok(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
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

export function oMatchar(o: SokbarO, q: string): boolean {
  const n = foldSok(q)
  if (!n) return false
  return (
    foldSok(o.name).includes(n) ||
    foldSok(o.slug).includes(n) ||
    foldSok(o.regionLabel ?? '').includes(n) ||
    foldSok(o.tagline).includes(n) ||
    o.tags.some(t => foldSok(t).includes(n))
  )
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
