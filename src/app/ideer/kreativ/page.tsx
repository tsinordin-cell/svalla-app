import type { Metadata } from 'next'
import Kreativ, { type KO, type KFoto } from './Kreativ'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { ISLAND_COORDS } from '@/lib/islandCoords'

/**
 * KREATIV VERKSTAD 2026-11-21 (Max): idéer för intro, startsida, partnersida och en levande karta.
 * Förhandsvisning som ska byggas på med tiden. Oindexerad och olänkad.
 * Verksamheter, namn på halsbrickan och förmåner är EXEMPEL. Önamn och lägen kommer ur datan:
 * Stockholms skärgård från ISLAND_COORDS (kontrollerade), västkusten från island-data (ungefärliga mittpunkter).
 */
export const metadata: Metadata = {
  title: 'Kreativ verkstad (förhandsvisning)',
  description: 'Förhandsvisning: intro, ny startanimering, halsbricka, partnersida och levande karta. Exempel.',
  robots: { index: false, follow: false },
}

export default function KreativPage() {
  const region = new Map(ALL_ISLANDS.map(o => [o.slug, o.region]))
  const sthlm: KO[] = ISLAND_COORDS
    .filter(k => { const r = region.get(k.slug); return r === 'norra' || r === 'mellersta' || r === 'södra' })
    .map(k => ({ slug: k.slug, namn: k.name, lat: k.lat, lng: k.lng, omrade: 'stockholm' as const }))
  const vast: KO[] = ALL_ISLANDS
    .filter(o => (o.region === 'bohuslan' || o.region === 'goteborg') && typeof o.lat === 'number' && typeof o.lng === 'number')
    .map(o => ({ slug: o.slug, namn: o.name, lat: o.lat as number, lng: o.lng as number, omrade: 'vast' as const }))

  const foton: KFoto[] = ['moja', 'sandhamn', 'grinda', 'uto', 'marstrand', 'finnhamn'].flatMap(slug => {
    const o = ALL_ISLANDS.find(x => x.slug === slug)
    const b = OBILDER[slug]
    return o ? [{ slug, namn: o.name, bild: b ? { url: b.url, fotograf: b.fotograf, licens: b.licens } : null }] : []
  })
  const onamn = ALL_ISLANDS.map(o => o.name)

  return <Kreativ oar={[...sthlm, ...vast]} foton={foton} onamn={onamn} />
}
