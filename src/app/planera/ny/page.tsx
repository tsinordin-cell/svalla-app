import type { Metadata } from 'next'
import PlaneraNyClient from './PlaneraNyClient'

export const metadata: Metadata = {
  title: 'Planera ny rutt — Svalla',
  robots: { index: false, follow: false },
  description: 'Välj startpunkt, destination och intressen. Svalla hittar de bästa stoppen längs din skärgårdsrutt.',
}

export default function PlaneraNyPage() {
  return <PlaneraNyClient />
}
