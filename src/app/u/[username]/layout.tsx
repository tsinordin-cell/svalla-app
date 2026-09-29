import { notFound } from 'next/navigation'
import { createPublicSupabaseClient } from '@/lib/supabase-server'

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
  const { data: exists } = await createPublicSupabaseClient()
    .from('users').select('id').eq('username', username).maybeSingle()
  if (!exists) notFound()
  return <>{children}</>
}
