/**
 * FÖRHANDSVISNING 2026-11-18: samlar allt Svalla har om en region (öar, guider,
 * gästhamnar, krogar, boende) ur datan som redan finns. Inget nytt innehåll.
 */
import { getIsland, type Island } from '@/app/o/island-data'
import { GUIDES } from '@/app/guider/guides-data'
import type { RegionNavData } from '@/components/RegionNav'

export function byggRegionNav(namn: string, oar: (string | Island)[], guideSlugs: string[]): RegionNavData {
  const lista = oar
    .map(o => (typeof o === 'string' ? getIsland(o) : o))
    .filter((o): o is Island => Boolean(o))
  const guider = guideSlugs
    .map(s => GUIDES.find(g => g.slug === s))
    .filter((g): g is (typeof GUIDES)[number] => Boolean(g))
  return {
    namn,
    oar: lista.map(o => ({ slug: o.slug, name: o.name, tagline: o.tagline })),
    guider: guider.map(g => ({ slug: g.slug, title: g.title, excerpt: g.excerpt })),
    hamnar: lista.flatMap(o => (o.harbors ?? []).map(h => ({ name: h.name, o: o.name, oSlug: o.slug }))),
    krogar: lista.flatMap(o => (o.restaurants ?? []).map(r => ({ name: r.name, typ: r.type, o: o.name, oSlug: o.slug }))),
    boende: lista.flatMap(o => (o.accommodation ?? []).map(a => ({ name: a.name, typ: a.type, o: o.name, oSlug: o.slug }))),
  }
}
