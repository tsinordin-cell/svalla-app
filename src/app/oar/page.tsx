import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Alla öar – Stockholms skärgård',
  description: 'Utforska alla öar i Stockholms skärgård.',
  alternates: { canonical: 'https://svalla.se/rutter?vy=oar' },
}

// Konsoliderat med /rutter?vy=oar — en plats för öar
export default function OarPage() {
  redirect('/rutter?vy=oar')
}
