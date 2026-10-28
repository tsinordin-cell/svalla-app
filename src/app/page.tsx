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
import { ANTAL_OAR } from '@/app/o/island-data'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

// Kortnyckel på startsidan → ö i OBILDER. Bara där motivet faktiskt är platsen
// kortet handlar om. Åland och Halland saknar en ö-bild som motsvarar kortet
// och får hellre ingen bild än fel bild.
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

// Guidekort som inte handlar om en ö: handplockade Commons-foton där motivet är
// det rubriken lovar, i Stockholms skärgård. Valda 2026-10-27 efter att korten
// stått som tomma färgrutor (Tom). Går FÖRE Google-fotot: Googles fritextsökning
// för de här nycklarna ("Kayaking Stockholm archipelago sea", "Badplats klippor
// …") ger ett godtyckligt platsfoto, inte en kajak eller ett bad.
const HANDPLOCKADE: Record<string, Bildkalla & { url: string }> = {
  // "Badplatser i Stockholms skärgård – sandstränder och klippbad". Guiden
  // nämner Trouville på Sandhamn; bilden visar sandstranden och klipporna där.
  badplatser: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Trouville_May_2026_01.jpg/960px-Trouville_May_2026_01.jpg',
    namn: 'Trouville, Sandhamn',
    fotograf: 'ArildV',
    licens: 'CC BY-SA 4.0',
    licensUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Trouville_May_2026_01.jpg',
  },
  // "Kajak i Stockholms skärgård – guide för nybörjare". Havskajak uppdragen på
  // stranden vid Sveriges holme, Vikingbåten på väg in mot Stockholm.
  kajak: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Sveriges_holme%2C_2017-09-30%2C_06.jpg/960px-Sveriges_holme%2C_2017-09-30%2C_06.jpg',
    namn: 'Kajak vid Sveriges holme',
    fotograf: 'Axel Pettersson',
    licens: 'CC BY-SA 4.0',
    licensUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Sveriges_holme,_2017-09-30,_06.jpg',
  },
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
