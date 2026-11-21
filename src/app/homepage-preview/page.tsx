/**
 * FÖRHANDSVISNING (2026-11-20): ny mobilversion av startsidan, för granskning innan något
 * byts ut i produktion. Startsidan (src/app/page.tsx och LandingPageClient.tsx) är orörd.
 *
 * - Samma data som startsidan: fotomappen, bildkällorna, antalet öar, de åtta känslorna och antalet krogar.
 * - Egen klientkomponent och egen stilmall (allt under klassen .hp), så att inget läcker till andra sidor.
 * - noindex + utesluten ur sitemapen (den finns inte där). Ska inte indexeras.
 *
 * Skillnader mot page.tsx:
 * - Fotokrediten för känslorna visas i Bildkällor-listan, inte i själva rutan.
 * - Bildkällor listar bara foton som syns på sidan. Startsidan listar även fotona till korten som
 *   togs bort 2026-11-20 (Utvalda turer m.fl.), därför hämtas inte fotomappen här.
 */
import type { Metadata } from 'next'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from '@/app/oar/oar-categories'
import type { Bildkalla } from '@/app/LandingPageClient'
import type { StartKansla } from '@/components/StartDelar'
import { kalenderPagar, kalenderSynlig, oppnaLuckor } from '@/lib/julkalender'
import PreviewClient from './PreviewClient'

// Samma lista som startsidan (page.tsx).
const KANSLOR: [string, string][] = [
  ['avskild', 'Lugn och ro'], ['romantiska', 'Romantik'], ['barnvanliga', 'Skratt och bad'], ['krogar', 'God mat'],
  ['havsbastu', 'Värme i bastun'], ['cykling', 'Vind i håret'], ['segling', 'Segel och frihet'], ['utan-bil', 'Enkelt utan bil'],
]

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Förhandsvisning: startsidan',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://svalla.se' },
}

export default function Page() {
  const bildkallor: Bildkalla[] = []

  const anvanda = new Set<string>()
  const kanslor: StartKansla[] = KANSLOR.flatMap(([slug, kansla]) => {
    const kat = OAR_CATEGORIES.find(k => k.slug === slug)
    const oar = kat ? islandsForCategory(slug) : []
    if (!kat || oar.length === 0) return []
    const o = oar.find(x => OBILDER[x.slug] && !anvanda.has(x.slug)) ?? oar.find(x => OBILDER[x.slug])
    if (o) anvanda.add(o.slug)
    const b = o ? OBILDER[o.slug] : undefined
    // Krediten flyttas till Bildkällor (CC BY kräver att fotograf och licens anges, inte var).
    if (o && b && !bildkallor.some(k => k.kalla === b.kalla)) {
      bildkallor.push({ namn: o.name, fotograf: b.fotograf, licens: b.licens, licensUrl: b.licensUrl, kalla: b.kalla })
    }
    return [{ href: `/oar/${slug}`, kansla, rubrik: kat.kort, antal: oar.length, bild: b ? { url: b.url.replace('/1280px-', '/960px-'), fotograf: b.fotograf, licens: b.licens } : null }]
  })
  // Julkalenderraden i hjälten. Räknas här så att den finns i första HTML:en (sidan byggs om varje timme).
  const julStart = kalenderPagar() ? oppnaLuckor() : kalenderSynlig() ? 0 : null
  const antalKrogar = ALL_ISLANDS.reduce((n, o) => n + (o.restaurants?.length ?? 0), 0)

  return <PreviewClient bildkallor={bildkallor} kanslor={kanslor} antalKrogar={antalKrogar} julStart={julStart} />
}
