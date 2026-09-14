/**
 * Klientsidans anrop för att tömma en tursidas datacache (tagg trip:<id>)
 * efter en skrivning. Se src/lib/trip-cache.ts och /api/revalidate-feed.
 * Tyst vid fel — cachen har ändå en tidsgräns på 5 min som skyddsnät.
 */
export async function revalidateTrip(tripId: string): Promise<void> {
  try {
    await fetch('/api/revalidate-feed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tripId }),
    })
  } catch { /* skyddsnätet är revalidate: 300 i trip-cache.ts */ }
}
