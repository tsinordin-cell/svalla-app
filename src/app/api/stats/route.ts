/**
 * Public stats för trust-bar och social proof.
 * Cache 1 timme — siffrorna ändras inte ofta.
 */
import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { ALL_ISLANDS } from '@/app/o/island-data'

// INTE force-dynamic: den vinner över revalidate och gjorde rutten helt
// ocachad, så varje MISS slog fyra gånger mot Supabase. Med enbart
// revalidate cachar Next svaret i en timme precis som kommentaren lovar.
export const revalidate = 3600

// Hamnarna ligger i island-data, inte i databasen. Räknas en gång vid
// modulladdning istället för att fråga en tabell som inte finns.
const HAMNAR = ALL_ISLANDS.reduce((n, o) => n + (o.harbors?.length ?? 0), 0)

export async function GET() {
  const service = getAdminClient()

  // Tabellen 'harbors' har aldrig funnits. Frågan låg kvar bakom en
  // catch-hjälpare och returnerade tyst 0, vilket gjorde att trust-baren
  // (platser + hamnar) räknade bort samtliga hamnar. Borttagen 2026-08-13.
  const [restaurants, users, trips, visitedIslands] = await Promise.all([
    service.from('restaurants').select('*', { count: 'exact', head: true }),
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('trips').select('*', { count: 'exact', head: true }),
    service.from('visited_islands').select('*', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    islands: ALL_ISLANDS.length,
    places: restaurants.count ?? 0,
    harbors: HAMNAR,
    users: users.count ?? 0,
    trips: trips.count ?? 0,
    islandVisits: visitedIslands.count ?? 0,
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    }
  })
}
