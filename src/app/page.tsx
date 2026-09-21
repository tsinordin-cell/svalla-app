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
 * Google-fotot vinner när det finns.
 */
import type { Metadata } from 'next'
import { getLandingPhotos } from '@/lib/landingPhotos'
import { OBILDER } from '@/app/o/obilder.generated'
import LandingPageClient, { type Bildkalla } from './LandingPageClient'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

// Kortnyckel på startsidan → ö i OBILDER. Bara där motivet faktiskt är platsen
// kortet handlar om. Kajak, badplatser, Åland och Halland saknar en ö-bild som
// motsvarar kortet och får hellre ingen bild än fel bild.
const COMMONS_FOR_KORT: Record<string, { slug: string; namn: string }> = {
  grinda: { slug: 'grinda', namn: 'Grinda' },
  sandhamn: { slug: 'sandhamn', namn: 'Sandhamn' },
  uto: { slug: 'uto', namn: 'Utö' },
  fjaderholmarna: { slug: 'fjaderholmarna', namn: 'Fjäderholmarna' },
  mellersta: { slug: 'moja', namn: 'Möja' },
  norra: { slug: 'arholma', namn: 'Arholma' },
  innerskargard: { slug: 'vaxholm', namn: 'Vaxholm' },
  sodra: { slug: 'orno', namn: 'Ornö' },
  bohuslan: { slug: 'smogen', namn: 'Smögen' },
  gotland: { slug: 'gotland', namn: 'Gotland' },
  oland: { slug: 'oland', namn: 'Öland' },
  blekinge: { slug: 'hano', namn: 'Hanö' },
  vasterhav: { slug: 'kosterhavet', namn: 'Kosterhavet' },
  hogakusten: { slug: 'ulvon', namn: 'Ulvön' },
}

export default async function Page() {
  const google = await getLandingPhotos()
  const photoMap: Record<string, string> = { ...google }
  const bildkallor: Bildkalla[] = []

  for (const [kort, { slug, namn }] of Object.entries(COMMONS_FOR_KORT)) {
    if (photoMap[kort]) continue
    const b = OBILDER[slug]
    if (!b) continue
    photoMap[kort] = b.url.replace('/1280px-', '/960px-')
    bildkallor.push({ namn, fotograf: b.fotograf, licens: b.licens, licensUrl: b.licensUrl, kalla: b.kalla })
  }

  return <LandingPageClient photoMap={photoMap} bildkallor={bildkallor} />
}
