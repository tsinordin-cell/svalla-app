/**
 * FÖRHANDSVISNING 2026-11-18/19: samlar allt Svalla har om en region (öar, guider,
 * gästhamnar, krogar, boende) ur datan som redan finns. Foton från
 * obilder.generated (fri licens, fotograf visas). Inget nytt innehåll.
 */
import { getIsland, ALL_ISLANDS, type Island } from '@/app/o/island-data'
import { GUIDES, getGuidesByRegion, type GuideRegion } from '@/app/guider/guides-data'
import { bildFor } from '@/lib/omraden'
import type { RegionNavData } from '@/components/RegionNav'

export function byggRegionNav(namn: string, oar: (string | Island)[], guideSlugs: string[]): RegionNavData {
  const lista = oar
    .map(o => (typeof o === 'string' ? getIsland(o) : o))
    .filter((o): o is Island => Boolean(o))
  const guider = guideSlugs
    .map(s => GUIDES.find(g => g.slug === s))
    .filter((g): g is (typeof GUIDES)[number] => Boolean(g))
  const forsta = lista.find(o => bildFor(o.slug, o.name))
  return {
    namn,
    bild: forsta ? bildFor(forsta.slug, forsta.name) : undefined,
    oar: lista.map(o => ({ slug: o.slug, name: o.name, tagline: o.tagline, bild: bildFor(o.slug, o.name) })),
    guider: guider.map(g => ({ slug: g.slug, title: g.title, excerpt: g.excerpt })),
    hamnar: lista.flatMap(o => (o.harbors ?? []).map(h => ({ name: h.name, o: o.name, oSlug: o.slug, href: `/o/${o.slug}/hamnar` }))),
    krogar: lista.flatMap(o => (o.restaurants ?? []).map(r => ({ name: r.name, typ: r.type, o: o.name, oSlug: o.slug, href: `/o/${o.slug}/restauranger` }))),
    boende: lista.flatMap(o => (o.accommodation ?? []).map(a => ({ name: a.name, typ: a.type, o: o.name, oSlug: o.slug, href: `/o/${o.slug}/boende` }))),
  }
}

/** Samma sak, men öarna väljs ur regionLabel och guiderna ur guidernas egen regionindelning. */
export function byggRegionNavEtiketter(namn: string, etiketter: string[], guideRegion?: GuideRegion): RegionNavData {
  const oar = ALL_ISLANDS.filter(i => i.regionLabel && etiketter.includes(i.regionLabel))
  const guideSlugs = guideRegion ? getGuidesByRegion(guideRegion).map(g => g.slug) : []
  return byggRegionNav(namn, oar, guideSlugs)
}
