/**
 * /api/landing-photos — tunt skal runt getLandingPhotos().
 *
 * Logiken bor i lib/landingPhotos.ts sedan 2026-08-05 så att startsidan kan
 * anropa den direkt i stället för att hämta sitt eget API över HTTP.
 *
 * Cache: lyckat svar 24 h, TOMT svar 60 sekunder. Ett tomt resultat är ett
 * misslyckande, inte ett svar — cachas det länge står sidan tom långt efter
 * att felet är åtgärdat. Det var precis vad som hände.
 */
import { NextResponse } from 'next/server'
import { getLandingPhotos } from '@/lib/landingPhotos'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const photoMap = await getLandingPhotos()
  const tomt = Object.keys(photoMap).length === 0
  return NextResponse.json(photoMap, {
    headers: {
      'Cache-Control': tomt
        ? 'public, s-maxage=60'
        : 'public, s-maxage=86400, stale-while-revalidate=3600',
    },
  })
}
