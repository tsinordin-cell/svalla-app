import type { Metadata } from 'next'
import PlaneraNyClient from './PlaneraNyClient'

export const metadata: Metadata = {
  title: 'Planera ny rutt — Svalla',
  description: 'Välj startpunkt, destination och intressen. Svalla hittar de bästa stoppen längs din skärgårdsrutt.',
}

export default function PlaneraNyPage() {
  return <PlaneraNyClient />
}
