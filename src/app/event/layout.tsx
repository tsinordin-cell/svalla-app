/**
 * GÖMD 2026-09-29 (schemakontroll, se PR #409). Funktionen bygger på tabeller
 * som aldrig skapats i databasen (migration social-v2 kördes inte). Sidan
 * svarar 404 tills funktionen tas i bruk på riktigt — koden ligger kvar.
 */
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
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

export default function EventLayout(_: { children: ReactNode }) {
  notFound()
}
