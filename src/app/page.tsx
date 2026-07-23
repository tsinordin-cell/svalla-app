/**
 * Landing page — server component wrapper
 *
 * Hämtar fotomappen server-side så att bilderna är inbakade i HTML:en
 * från start. Klienten behöver aldrig göra ett extra fetch-anrop.
 * Resultatet cachas i Vercel edge CDN (revalidate 1h).
 */
import type { Metadata } from 'next'
import LandingPageClient from './LandingPageClient'

export const revalidate = 3600

export const metadata: Metadata = {
  alternates: { canonical: 'https://svalla.se' },
}

async function getPhotoMap(): Promise<Record<string, string>> {
  try {
    const base =
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const res = await fetch(`${base}/api/landing-photos`, {
      next: { revalidate: 3600 },
    })
    return res.ok ? (await res.json() as Record<string, string>) : {}
  } catch {
    return {}
  }
}

export default async function Page() {
  const photoMap = await getPhotoMap()
  return <LandingPageClient photoMap={photoMap} />
}
