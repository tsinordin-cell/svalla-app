import type { Metadata } from 'next'
import ResetipsClient from './ResetipsClient'

export const metadata: Metadata = {
  title: 'Resetips & dagsrutter i skärgården – Svalla',
  description: 'Kuraterade dagsrutter i Stockholms skärgård — från Fjäderholmarna till Arholma. Med stopp, tips och praktisk info.',
  alternates: { canonical: 'https://svalla.se/resetips' },
  openGraph: {
    title: 'Resetips & dagsrutter i skärgården – Svalla',
    description: 'Kuraterade dagsrutter i Stockholms skärgård — från Fjäderholmarna till Arholma.',
    url: 'https://svalla.se/resetips',
  },
}

export default function ResetipsPage() {
  return <ResetipsClient />
}
