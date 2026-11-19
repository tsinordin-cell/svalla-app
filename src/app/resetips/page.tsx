import type { Metadata } from 'next'
import ResetipsClient from './ResetipsClient'
import { OG_STANDARD } from '@/lib/og-standard'

export const metadata: Metadata = {
  title: 'Resetips & dagsrutter i skärgården',
  description: 'Utvalda dagsrutter i Stockholms skärgård, från Fjäderholmarna till Arholma. Med stopp, tips och praktisk info.',
  alternates: { canonical: 'https://svalla.se/resetips' },
  openGraph: {
    images: OG_STANDARD,
    title: 'Resetips & dagsrutter i skärgården | Svalla',
    description: 'Utvalda dagsrutter i Stockholms skärgård, från Fjäderholmarna till Arholma.',
    url: 'https://svalla.se/resetips',
  },
}

export default function ResetipsPage() {
  return <ResetipsClient />
}
