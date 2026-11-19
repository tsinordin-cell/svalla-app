import type { Metadata } from 'next'
import UpplevelserClient from './UpplevelserClient'
import { OG_STANDARD } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Guidade turer & upplevelser',
  description: 'Boka ribbåtsturer, fisketurer, kajakäventyr och mer i Stockholms skärgård.',
  alternates: { canonical: 'https://svalla.se/upplevelser' },
  openGraph: {
    images: OG_STANDARD,
    title: 'Guidade turer & upplevelser | Svalla',
    description: 'Boka ribbåtsturer, fisketurer, kajakäventyr och mer i Stockholms skärgård.',
    url: 'https://svalla.se/upplevelser',
  },
}

export default function UpplevelserPage() {
  return <UpplevelserClient />
}
