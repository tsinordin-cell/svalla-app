import { notFound, redirect } from 'next/navigation'
import { hittaAnvandarnamn } from '@/lib/anvandarnamn'

export const revalidate = 60

/**
 * Riktig 404 för profiler som inte finns (2026-09-28).
 *
 * Mätt: /u/<okänd> svarade 200 i produktion och lokalt. Skälet är loading.tsx:
 * Next börjar strömma sidan (status 200) innan page.tsx och generateMetadata
 * hunnit säga notFound(), så "finns inte"-innehållet kom efter att svaret
 * redan hade fått 200. Soft-404-skyddet i generateMetadata (2026-08-12)
 * hjälpte alltså inte mot statuskoden.
 *
 * En layout renderas före segmentets loading-gräns. Görs uppslaget här
 * skickas inget innan notFound() kan avgöra svaret, och statusen blir 404.
 * Uppslaget är billigt (PK-index på username) och görs ändå i sidan.
 */
export default async function UserProfileLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ username: string }>
}) {
  const { username: rawUsername } = await params
  // Samma dekodning som i page.tsx: dynamiska segment dekodas inte automatiskt.
  const username = decodeURIComponent(rawUsername)
  // revision 2026-10-02: skiftlägesokänslig reserv (/u/elin hittar "Elin"),
  // se src/lib/anvandarnamn.ts. Exakt träff vinner och kostar ett uppslag som förut.
  const namn = await hittaAnvandarnamn(username)
  if (!namn) notFound()
  // Fel skiftläge ger 307 till profilens riktiga adress. Då delas bara den
  // adressen, och ett senare registrerat "elin" kan inte tyst ta över länkar
  // som i dag visar "Elin". Tillfällig (307), inte permanent: kopplingen
  // namn→profil kan ändras, och en 308 cachas för gott i webbläsaren
  // (granskningen 2026-10-02). Omdirigeringen görs här, före loading-gränsen,
  // av samma skäl som 404:an ovan: annars hinner svaret få status 200.
  if (namn !== username) redirect(`/u/${encodeURIComponent(namn)}`)
  return <>{children}</>
}
