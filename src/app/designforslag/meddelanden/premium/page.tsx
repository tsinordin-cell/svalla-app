import type { Metadata } from 'next'
import Premium from './Premium'

/**
 * Premiumförslag för meddelanden (Tom 2026-11-26: "Kör" på en riktning gjord ordentligt).
 *
 * Bara en förhandsvisning på grenen design/meddelanden-forslag. Exempeldata,
 * ingen inloggning, inga anrop mot databasen. Ska INTE mergas.
 *
 * ?tema=ljust|mork
 * ?vy=inkorg|samtal          vilken vy på mobil (dator visar båda)
 * ?lage=normal|tom|laddar|fel
 */
export const metadata: Metadata = {
  title: 'Designförslag: meddelanden, premium',
  robots: { index: false, follow: false },
}

export default async function PremiumSida({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams
  const tema = sp.tema === 'mork' ? 'mork' : 'ljust'
  const vy = sp.vy === 'samtal' ? 'samtal' : 'inkorg'
  const lage = sp.lage === 'tom' || sp.lage === 'laddar' || sp.lage === 'fel' ? sp.lage : 'normal'
  return <Premium tema={tema} vy={vy} lage={lage} />
}
