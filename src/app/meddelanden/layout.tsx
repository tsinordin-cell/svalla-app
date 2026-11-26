import type { Metadata } from 'next'
import MeddelandenRam from '@/components/meddelanden/MeddelandenRam'
import './meddelanden.css'

/**
 * Sidan är en klientkomponent och kan inte exportera metadata själv. Utan den
 * här layouten fick fliken den generiska titeln "Svalla | Sveriges samlade
 * skärgårdssida" (granskningen 2026-11-22).
 *
 * 2026-11-26 (premiumsteg 1): layouten lägger inkorgen bredvid samtalet på dator.
 */
export const metadata: Metadata = {
  title: 'Meddelanden',
}

export default function MeddelandenLayout({ children }: { children: React.ReactNode }) {
  return <MeddelandenRam>{children}</MeddelandenRam>
}
