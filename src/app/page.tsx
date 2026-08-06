/**
 * Landing page — server component wrapper
 *
 * Hämtar fotomappen server-side så att bilderna är inbakade i HTML:en
 * från start. Klienten behöver aldrig göra ett extra fetch-anrop.
 * Resultatet cachas i Vercel edge CDN (revalidate 1h).
 */
import type { Metadata } from 'next'
import { getLandingPhotos } from '@/lib/landingPhotos'
import LandingPageClient from './LandingPageClient'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

export default async function Page() {
  const photoMap = await getLandingPhotos()
  return <LandingPageClient photoMap={photoMap} />
}
