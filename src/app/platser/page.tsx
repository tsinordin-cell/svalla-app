/**
 * /platser-lista är borttagen — all upptäckt sker via /upptack (karta + lista).
 *
 * Behåller filen som en redirect så gamla länkar (delningar, sök, externa
 * referenser) inte 404:ar.
 *
 * 2026-09-20: redirecten skickade ALLT till /upptack utan filter. MÄTT: 34
 * interna länkar på 20 landningssidor pekade på /platser?kategori=…, varav 20
 * på kategori=naturhamn — och utforskaren har 0 naturhamnar. Besökaren landade
 * i en ofiltrerad Stockholmslista oavsett vad länken lovade. Nu går varje
 * kategori dit innehållet faktiskt finns; okänd kategori → /upptack som förr.
 *
 * Notera: /upptack/[id] (enskilda restauranger) ligger kvar — det är basURL:en
 * för plats-detaljsidor som linkas från sökresultat, sociala flöden, etc.
 */
import { redirect } from 'next/navigation'

const MAL: Record<string, string> = {
  // Utforskaren har egna kategorier: hamn, naturhamn (tom), bastu, bensin, krog, bad, boende
  gasthamn: '/upptack?typ=hamn',
  hamn: '/upptack?typ=hamn',
  bensin: '/upptack?typ=bensin',
  krog: '/upptack?typ=krog',
  bad: '/upptack?typ=bad',
  sandstrand: '/upptack?typ=bad',
  klippbad: '/upptack?typ=bad',
  boende: '/upptack?typ=boende',
  bastu: '/upptack?typ=bastu',
  bastuflotte: '/upptack?typ=bastu',
  // Innehåll som finns som sidor, inte som platser i utforskaren
  naturhamn: '/naturhamnar',
  vinterbad: '/bastu-och-bad',
  spa: '/bastu-och-bad',
  vandring: '/vandring-och-natur',
  roslagsleden: '/vandring-och-natur',
  sormlandsleden: '/vandring-och-natur',
  naturreservat: '/vandring-och-natur',
  fagelskydd: '/vandring-och-natur',
  utsikt: '/vandring-och-natur',
  taltning: '/vandring-och-natur',
  paddling: '/aktivitet/kajak',
  vinter: '/vinter',
}

export default async function PlatserListaRedirect({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string }>
}) {
  const { kategori } = await searchParams
  const mal = kategori ? MAL[kategori.toLowerCase()] : undefined
  redirect(mal ?? '/upptack')
}
