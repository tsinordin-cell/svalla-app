import type { Metadata } from 'next'

/**
 * Sidan är en klientkomponent och kan inte exportera metadata själv. Utan den
 * här layouten fick fliken den generiska titeln "Svalla | Skärgården börjar
 * här" (granskningen 2026-11-23).
 */
export const metadata: Metadata = {
  title: 'Notiser',
}

export default function NotiserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
