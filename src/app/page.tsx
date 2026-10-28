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
 */
import type { Metadata } from 'next'
import { getLandingPhotos } from '@/lib/landingPhotos'
import { OBILDER } from '@/app/o/obilder.generated'
import LandingPageClient, { type Bildkalla } from './LandingPageClient'
import { COMMONS_FOR_KORT, HANDPLOCKADE } from '@/lib/startsidaBilder'
import { ANTAL_OAR } from '@/app/o/island-data'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

export default async function Page() {
  const google = await getLandingPhotos()
  const photoMap: Record<string, string> = { ...google }
  const bildkallor: Bildkalla[] = []

  for (const [kort, { url, ...kalla }] of Object.entries(HANDPLOCKADE)) {
    photoMap[kort] = url
    bildkallor.push(kalla)
  }

  for (const [kort, { slug, namn }] of Object.entries(COMMONS_FOR_KORT)) {
    if (photoMap[kort]) continue
    const b = OBILDER[slug]
    if (!b) continue
    photoMap[kort] = b.url.replace('/1280px-', '/960px-')
    bildkallor.push({ namn, fotograf: b.fotograf, licens: b.licens, licensUrl: b.licensUrl, kalla: b.kalla })
  }

  // Antalet öar räknas här på servern så att ödatan inte hamnar i klientbundlen.
  // Samma lista som /api/stats (alla öar med egen guidesida, /o/[slug]) —
  // tidigare visades 83 och sedan 102 när /api/stats svarat.
  return <LandingPageClient photoMap={photoMap} bildkallor={bildkallor} antalOar={ANTAL_OAR} />
}
