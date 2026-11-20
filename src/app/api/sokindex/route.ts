/**
 * FÖRHANDSVISNING 2026-11-20: sökregistret bakom snabbsöket på startsidan (SnabbSok.tsx).
 * Allt kommer ur samma data som sidorna själva visar: island-data och guides-data.
 * Inget hittas på här; finns en krog, hamn eller ett boende inte i ödatan finns det inte i sökningen.
 * Byggs statiskt, så det kostar ingenting per besök.
 */
import { NextResponse } from 'next/server'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { PUBLICERADE_GUIDER } from '@/app/guider/guides-data'
import { bildFor } from '@/lib/omraden'

export const dynamic = 'force-static'

type Post = { t: string; k: string; h: string; u?: string; la?: number; lo?: number; b?: string }

/** Samma regionsidor som menyn och kartan på startsidan. */
const REGIONER: [string, string][] = [
  ['Stockholms skärgård', '/stockholms-skargard'],
  ['Åland', '/aland'],
  ['Gotland', '/gotland'],
  ['Öland', '/oland'],
  ['Bohuslän', '/bohuslan'],
  ['Göteborgs skärgård', '/goteborg-skargard'],
  ['Halland', '/halland'],
  ['Västerhavet', '/vasterhav'],
  ['Blekinge skärgård', '/blekinge-skargard'],
  ['Höga Kusten', '/hoga-kusten'],
  ['Mälaren', '/malaren'],
]

export function GET() {
  const ut: Post[] = REGIONER.map(([t, h]) => ({ t, k: 'Region', h }))
  for (const o of ALL_ISLANDS) {
    // Lysekil, Grebbestad och Kosterhavet ligger under /o/ men är ort och nationalpark, inte öar.
    const k = o.slag === 'ort' ? 'Ort' : o.slag === 'nationalpark' ? 'Nationalpark' : 'Ö'
    // Position och foto används av kartan på startsidan (StartKarta.tsx).
    const bild = bildFor(o.slug, o.name)?.url
    ut.push({
      t: o.name, k, h: `/o/${o.slug}`,
      ...(o.regionLabel ? { u: o.regionLabel } : {}),
      ...(typeof o.lat === 'number' && typeof o.lng === 'number' ? { la: o.lat, lo: o.lng } : {}),
      ...(bild ? { b: bild } : {}),
    })
    for (const r of o.restaurants ?? []) ut.push({ t: r.name, k: 'Krog', h: `/o/${o.slug}/restauranger`, u: o.name })
    for (const r of o.harbors ?? []) ut.push({ t: r.name, k: 'Hamn', h: `/o/${o.slug}/hamnar`, u: o.name })
    for (const r of o.accommodation ?? []) ut.push({ t: r.name, k: 'Boende', h: `/o/${o.slug}/boende`, u: o.name })
  }
  for (const g of PUBLICERADE_GUIDER) ut.push({ t: g.title, k: 'Guide', h: `/guider/${g.slug}` })
  return NextResponse.json(ut)
}
