import type { Metadata } from 'next'
import Formaner, { type FO, type FPunkt, type FSiffror } from './Formaner'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { ISLAND_COORDS } from '@/lib/islandCoords'

/**
 * FÖRHANDSVISNING 2026-11-20 (Max): så visar Svalla förmåner och erbjudanden.
 * Oindexerad och olänkad. Förmåner och partners på sidan är exempel; öarnas namn,
 * foton, koordinater och Svallas egna siffror räknas här ur datan.
 */
export const metadata: Metadata = {
  title: 'Förmåner på Svalla (förhandsvisning)',
  description: 'Så visar Svalla förmåner och erbjudanden, från kortet till partnerns rapport. Förhandsvisning med exempel.',
  robots: { index: false, follow: false },
}

const OAR = ['moja', 'sandhamn', 'uto', 'grinda', 'finnhamn', 'marstrand', 'vaxholm', 'landsort']

export default function FormanerPage() {
  const oar: FO[] = OAR.flatMap(slug => {
    const o = ALL_ISLANDS.find(x => x.slug === slug)
    if (!o) return []
    const b = OBILDER[slug]
    return [{ slug, namn: o.name, bild: b ? { url: b.url, fotograf: b.fotograf, licens: b.licens } : null }]
  })

  // Kartan: Stockholms skärgård på sina kontrollerade koordinater, utplattade till en yta.
  const kord = ISLAND_COORDS.filter(o => ALL_ISLANDS.some(x => x.slug === o.slug))
  const lat = kord.map(o => o.lat), lng = kord.map(o => o.lng)
  const [a, b, c, d] = [Math.min(...lat), Math.max(...lat), Math.min(...lng), Math.max(...lng)]
  const punkter: FPunkt[] = kord.map(o => ({
    slug: o.slug, namn: o.name,
    x: 6 + 86 * (o.lng - c) / (d - c || 1),
    y: 6 + 86 * (b - o.lat) / (b - a || 1),
  }))

  const summa = (f: (o: (typeof ALL_ISLANDS)[number]) => number) => ALL_ISLANDS.reduce((n, o) => n + f(o), 0)
  const siffror: FSiffror = {
    oar: ALL_ISLANDS.length,
    krogar: summa(o => o.restaurants?.length ?? 0),
    boenden: summa(o => o.accommodation?.length ?? 0),
    hamnar: summa(o => o.harbors?.length ?? 0),
  }

  return <Formaner oar={oar} punkter={punkter} siffror={siffror} />
}
