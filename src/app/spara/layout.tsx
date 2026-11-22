import type { Metadata } from 'next'

/**
 * Sidan är en klientkomponent och kan inte exportera metadata själv. Utan den
 * här layouten fick fliken den generiska titeln "Svalla | Sveriges samlade
 * skärgårdssida" (granskningen 2026-11-22).
 */
export const metadata: Metadata = {
  title: 'Spåra tur',
}

export default function SparaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
