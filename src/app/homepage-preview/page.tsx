/**
 * FÖRHANDSVISNING (/homepage-preview): kopia av src/app/page.tsx (main 6590fc6) med två ändringar,
 * samma som i PR #634:
 *  - Känslorutornas foton som Wikimedia-miniatyrer. Originalfilerna svarar 429, därför är
 *    bastu-rutan grå på startsidan (mätt 2026-11-21).
 *  - Fotomappen (Google + startsidaBilder) och Bildkällor-listan hämtas inte. Korten de hörde till
 *    togs bort 2026-11-20; känslorutorna anger fotograf och licens själva.
 * noindex: sidan ska inte indexeras.
 */
import type { Metadata } from 'next'
import { OBILDER } from '@/app/o/obilder.generated'
import { ANTAL_OAR, ALL_ISLANDS } from '@/app/o/island-data'
import { OAR_CATEGORIES, islandsForCategory } from '@/app/oar/oar-categories'
import type { StartKansla } from '@/components/StartDelar'
import PreviewClient from './PreviewClient'

const KANSLOR: [string, string][] = [
  ['avskild', 'Lugn och ro'], ['romantiska', 'Romantik'], ['barnvanliga', 'Skratt och bad'], ['krogar', 'God mat'],
  ['havsbastu', 'Värme i bastun'], ['cykling', 'Vind i håret'], ['segling', 'Segel och frihet'], ['utan-bil', 'Enkelt utan bil'],
]

/** Wikimedia-miniatyr i given bredd (samma regel som src/lib/commonsTumme.ts i PR #634). */
function tumme(url: string, px: number): string {
  if (url.includes('/thumb/')) return url.replace(/\/\d+px-/, `/${px}px-`)
  const m = url.match(/^https:\/\/upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/]+)$/)
  return m ? `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/${m[3]}/${px}px-${m[3]}` : url
}

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Förhandsvisning: startsidan',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://svalla.se' },
}

export default function Page() {
  const anvanda = new Set<string>()
  const kanslor: StartKansla[] = KANSLOR.flatMap(([slug, kansla]) => {
    const kat = OAR_CATEGORIES.find(k => k.slug === slug)
    const oar = kat ? islandsForCategory(slug) : []
    if (!kat || oar.length === 0) return []
    const o = oar.find(x => OBILDER[x.slug] && !anvanda.has(x.slug)) ?? oar.find(x => OBILDER[x.slug])
    if (o) anvanda.add(o.slug)
    const b = o ? OBILDER[o.slug] : undefined
    return [{ href: `/oar/${slug}`, kansla, rubrik: kat.kort, antal: oar.length, bild: b ? { url: tumme(b.url, 960), fotograf: b.fotograf, licens: b.licens } : null }]
  })
  const antalKrogar = ALL_ISLANDS.reduce((n, o) => n + (o.restaurants?.length ?? 0), 0)

  return <PreviewClient antalOar={ANTAL_OAR} kanslor={kanslor} antalKrogar={antalKrogar} />
}
