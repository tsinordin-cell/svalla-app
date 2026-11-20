import type { Metadata } from 'next'
import IdeerClient, { type Tur } from './IdeerClient'
import { TRIPS } from '@/app/resetips/trips-data'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS } from '@/app/o/island-data'

/**
 * FÖRHANDSVISNING 2026-11-20 (Max): idéer för startsidans övriga delar, efter en genomgång av
 * världens bästa destinationssajter. Egen sida, inte länkad någonstans och inte indexerad.
 * Ingenting här ändrar startsidan. Varje alternativ använder Svallas riktiga data.
 */
export const metadata: Metadata = {
  title: 'Idéer för startsidan (förhandsvisning)',
  robots: { index: false, follow: false },
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
  return <IdeerClient turer={turer} antalKrogar={antalKrogar} />
}
