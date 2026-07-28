import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Events i skärgården',
  description: 'Kommande båt- och skärgårdsevents nära dig. Hitta och anmäl dig till träffar, segeltävlingar och gemensamma utflykter.',
  alternates: { canonical: 'https://svalla.se/event' },
  openGraph: {
    title: 'Events i skärgården — Svalla',
    description: 'Kommande båt- och skärgårdsevents nära dig.',
    url: 'https://svalla.se/event',
    type: 'website',
  },
}

export default function EventLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
