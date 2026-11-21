/**
 * Landing page — server component wrapper
 *
 * Hämtar fotomappen server-side så att bilderna är inbakade i HTML:en
 * från start. Klienten behöver aldrig göra ett extra fetch-anrop.
 * Resultatet cachas i Vercel edge CDN (revalidate 1h).
 *
 * 2026-09-21: MÄTT — startsidan hade noll foton i produktion. Google Places
 * svarar 403 (nyckeln nekas i Google Cloud, kort 08208bd8) och landing-photos
 * gav "TOMT resultat" 93 gånger på en vecka. Kort utan Google-foto får nu
 * öns Commons-foto (fri licens, samma bilder som ösidorna). Fotograf och
 * licens listas under "Bildkällor" nederst på sidan — det är licensvillkoret.
 * Ordning: handplockad bild → Google-foto → öns Commons-foto. Listorna och
 * motiveringen per bild ligger i src/lib/startsidaBilder.ts.
 *
 * 2026-11-21: fotomappen hämtas inte längre. Korten som använde den togs bort
 * 2026-11-20, och Google Places svarar fortfarande 403/429. Kvar är känslorutornas
 * Commons-foton, som miniatyrer via commonsTumme (originalfilerna svarar 429).
 */
import type { Metadata } from 'next'
import { OBILDER } from '@/app/o/obilder.generated'
import LandingPageClient from './LandingPageClient'
import { commonsTumme } from '@/lib/commonsTumme'
import { ANTAL_OAR, ALL_ISLANDS } from '@/app/o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from '@/app/oar/oar-categories'
import type { StartKansla } from '@/components/StartDelar'

// Känslan är vår rubrik. Listan bakom är den ökategori som redan finns på /oar.
const KANSLOR: [string, string][] = [
  ['avskild', 'Lugn och ro'], ['romantiska', 'Romantik'], ['barnvanliga', 'Skratt och bad'], ['krogar', 'God mat'],
  ['havsbastu', 'Värme i bastun'], ['cykling', 'Vind i håret'], ['segling', 'Segel och frihet'], ['utan-bil', 'Enkelt utan bil'],
]

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

export default async function Page() {
  // 2026-11-21: fotomappen (Google + startsidaBilder) och Bildkällor-listan hämtas inte längre.
  // Korten de hörde till (Utvalda turer m.fl.) togs bort 2026-11-20, så inga element på sidan
  // visade fotona, men listan räknade ändå upp dem. Känslorutorna anger fotograf och licens själva.
  // Ska kort med foton tillbaka: återinför getLandingPhotos + HANDPLOCKADE/COMMONS_FOR_KORT (se git-historiken).

  // Antalet öar räknas här på servern så att ödatan inte hamnar i klientbundlen.
  // Samma lista som /api/stats (alla öar med egen guidesida, /o/[slug]) —
  // tidigare visades 83 och sedan 102 när /api/stats svarat.
  // Vad vill du känna: åtta ökategorier med var sitt öfoto (olika foton, fotograf och licens visas i rutan).
  const anvanda = new Set<string>()
  const kanslor: StartKansla[] = KANSLOR.flatMap(([slug, kansla]) => {
    const kat = OAR_CATEGORIES.find(k => k.slug === slug)
    const oar = kat ? islandsForCategory(slug) : []
    if (!kat || oar.length === 0) return []
    const o = oar.find(x => OBILDER[x.slug] && !anvanda.has(x.slug)) ?? oar.find(x => OBILDER[x.slug])
    if (o) anvanda.add(o.slug)
    const b = o ? OBILDER[o.slug] : undefined
    return [{ href: `/oar/${slug}`, kansla, rubrik: kat.kort, antal: oar.length, bild: b ? { url: commonsTumme(b.url, 960), fotograf: b.fotograf, licens: b.licens } : null }]
  })
  const antalKrogar = ALL_ISLANDS.reduce((n, o) => n + (o.restaurants?.length ?? 0), 0)

  return <LandingPageClient antalOar={ANTAL_OAR} kanslor={kanslor} antalKrogar={antalKrogar} />
}
