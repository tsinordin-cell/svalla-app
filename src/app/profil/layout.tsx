import type { Metadata } from 'next'

/**
 * Sidan är en klientkomponent och kan inte exportera metadata själv. Utan den
 * här layouten fick fliken den generiska titeln "Svalla | Sveriges samlade
 * skärgårdssida" (granskningen 2026-11-22).
 */
export const metadata: Metadata = {
  // Mallen måste upprepas här: en layout med en vanlig titelsträng gör att
  // rotens mall '%s | Svalla' inte når sidorna under /profil, så fliken på
  // Inställningar hette bara "Inställningar" (granskningen 2026-11-23).
  title: {
    default: 'Min profil',
    template: '%s | Svalla',
  },
}

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
