import type { Metadata } from 'next'
import IdeerClient, { type Tur } from './IdeerClient'
import IdeerMer, { type Bild, type TurKort, type Rutt, type Kansla, type OPunkt, type Mosaik, type Siffra } from './IdeerMer'
import { TRIPS } from '@/app/resetips/trips-data'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from '@/app/oar/oar-categories'
import { ISLAND_COORDS } from '@/lib/islandCoords'

/**
 * FÖRHANDSVISNING 2026-11-20 (Max): idéer för startsidans övriga delar, efter en genomgång av
 * världens bästa destinationssajter. Egen sida, inte länkad någonstans och inte indexerad.
 * Ingenting här ändrar startsidan. Varje alternativ använder Svallas riktiga data,
 * utom erbjudandena i runda 2 som är exempel och märkta så.
 */
export const metadata: Metadata = {
  title: 'Idéer för startsidan (förhandsvisning)',
  description: 'Tjugoen idéer för Svallas startsida, med förebild och motivering vid varje. Förhandsvisning, inte live.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Svalla: tjugoen idéer för startsidan',
    description: 'Förhandsvisning med förebild och motivering vid varje idé. Inte live.',
  },
}

const INDEX: [string, string][] = [
  ['A', 'Hero'], ['B', 'Just nu'], ['C', 'Turer'], ['D', 'Thorkel'], ['E', 'Frågor'], ['F', 'Appen'], ['G', 'Sidfot'],
  ['H', 'Erbjudanden'], ['I', 'Veckans'], ['J', 'Tid'], ['K', 'Känsla'], ['L', 'Ölista'], ['M', 'Sjökort'], ['N', 'Berättelse'],
  ['O', 'Visste du'], ['P', 'Ta dig ut'], ['Q', 'Stämplar'], ['R', 'Siffror'], ['S', 'Mosaik'], ['T', 'Årstider'], ['U', 'Brevet'],
]

// Känslan är vår rubrik. Listan bakom är den ökategori som redan finns på /oar.
const KANSLOR: [string, string][] = [
  ['avskild', 'Lugn och ro'], ['romantiska', 'Romantik'], ['barnvanliga', 'Skratt och bad'], ['krogar', 'God mat'],
  ['havsbastu', 'Värme i bastun'], ['cykling', 'Vind i håret'], ['segling', 'Segel och frihet'], ['utan-bil', 'Enkelt utan bil'],
]

const MOSAIK_ORDNING = ['sandhamn', 'grinda', 'uto', 'moja', 'landsort', 'fjaderholmarna', 'vaxholm', 'finnhamn', 'arholma', 'nattaro']

const bildFor = (slug: string | undefined): Bild | null => {
  const b = slug ? OBILDER[slug] : undefined
  return b ? { url: b.url, fotograf: b.fotograf, licens: b.licens } : null
}

export default function IdeerPage() {
  const turer: Tur[] = TRIPS.map(t => {
    const oSlug = (t.islandSlugs ?? []).find(s => OBILDER[s])
    const b = oSlug ? OBILDER[oSlug] : undefined
    return {
      href: `/resetips/${t.slug}`,
      titel: t.title,
      tid: t.duration.replace(/\s*\(.*\)\s*$/, ''),
      transport: t.transport,
      taggar: [...t.transportTags],
      niva: t.difficulty,
      utvald: !!t.featured,
      bild: b ? { url: b.url, fotograf: b.fotograf, licens: b.licens, kalla: b.kalla } : null,
    }
  })
  // Antal krogar och caféer i ödatan, räknat här och nu ur island-data.
  const antalKrogar = ALL_ISLANDS.reduce((n, o) => n + (o.restaurants?.length ?? 0), 0)

  /* ── Runda 2 ── */
  const turKort: TurKort[] = TRIPS.map(t => ({
    href: `/resetips/${t.slug}`,
    titel: t.title,
    tid: t.duration.replace(/\s*\(.*\)\s*$/, ''),
    transport: t.transport,
    langd: /övernattning/i.test(t.duration) ? 'natt' : /^halvdag/i.test(t.duration) ? 'kort' : 'dag',
    bild: bildFor((t.islandSlugs ?? []).find(s => OBILDER[s])),
  }))

  const forst = TRIPS.find(t => t.featured && (t.islandSlugs ?? []).some(s => OBILDER[s])) ?? TRIPS[0]
  const rutt: Rutt | null = forst ? {
    href: `/resetips/${forst.slug}`,
    titel: forst.title,
    ingress: forst.tagline,
    bild: bildFor((forst.islandSlugs ?? []).find(s => OBILDER[s])),
    stopp: forst.stops.map(s => ({ namn: s.name, typ: s.type, text: s.desc, tips: s.tip ?? null })),
  } : null

  const anvanda = new Set<string>()
  const kanslor: Kansla[] = KANSLOR.flatMap(([slug, kansla]) => {
    const kat = OAR_CATEGORIES.find(k => k.slug === slug)
    if (!kat) return []
    const oar = islandsForCategory(slug)
    if (oar.length === 0) return []
    return [{ href: `/oar/${slug}`, kansla, rubrik: kat.kort, antal: oar.length, bild: (() => { const o = oar.find(x => OBILDER[x.slug] && !anvanda.has(x.slug)) ?? oar.find(x => OBILDER[x.slug]); if (o) anvanda.add(o.slug); return bildFor(o?.slug) })() }]
  })

  // Koordinaterna kommer ur lib/islandCoords (kontrollerade mot två källor). Bara öar som har en ösida tas med.
  const harSida = new Set(ALL_ISLANDS.map(o => o.slug))
  const oar: OPunkt[] = ISLAND_COORDS.filter(o => harSida.has(o.slug)).map(o => ({ slug: o.slug, namn: o.name, lat: o.lat, lng: o.lng }))

  const mosaik: Mosaik[] = MOSAIK_ORDNING.flatMap(slug => {
    const o = ALL_ISLANDS.find(x => x.slug === slug)
    const b = bildFor(slug)
    return o && b ? [{ slug, namn: o.name, rad: o.tagline, bild: b }] : []
  })

  const summa = (f: (o: (typeof ALL_ISLANDS)[number]) => number) => ALL_ISLANDS.reduce((n, o) => n + f(o), 0)
  const siffror: Siffra[] = [
    { etikett: 'Öar och orter', varde: ALL_ISLANDS.length, not: 'Varje plats har en egen sida med resväg, mat, boende och hamnar.' },
    { etikett: 'Krogar och caféer', varde: antalKrogar, not: 'Listade på ösidorna, ö för ö.' },
    { etikett: 'Boenden', varde: summa(o => o.accommodation?.length ?? 0), not: 'Från vandrarhem till hotell, på öarna där de ligger.' },
    { etikett: 'Hamnar', varde: summa(o => o.harbors?.length ?? 0), not: 'Gästhamnar och bryggor som står på ösidorna.' },
    { etikett: 'Dagsplaner', varde: TRIPS.length, not: 'Färdiga dagar med stopp i ordning, från resan ut till resan hem.' },
  ]

  return (
    <>
      <style>{`.id-nav{position:sticky;top:0;z-index:50;background:rgba(243,236,224,.94);backdrop-filter:blur(8px);border-bottom:1px solid rgba(150,110,60,.2);display:flex;gap:6px;overflow-x:auto;padding:8px 12px;scrollbar-width:none}.id-nav::-webkit-scrollbar{display:none}.id-nav a{flex-shrink:0;font:600 12.5px Inter,system-ui,sans-serif;color:#0d2440;text-decoration:none;padding:6px 10px;border-radius:999px;background:#fffdf8;border:1px solid rgba(150,110,60,.2)}.id-nav a b{color:#b5591a;margin-right:5px}.id-alt{scroll-margin-top:60px}`}</style>
      <nav className="id-nav" aria-label="Idéerna">
        {INDEX.map(([b, n]) => <a key={b} href={`#alt-${b}`}><b>{b}</b>{n}</a>)}
      </nav>
      <IdeerClient turer={turer} antalKrogar={antalKrogar} />
      <IdeerMer turer={turKort} rutt={rutt} kanslor={kanslor} oar={oar} mosaik={mosaik} siffror={siffror} />
    </>
  )
}
