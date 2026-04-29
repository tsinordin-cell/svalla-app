/**
 * Public stats för trust-bar och social proof.
 * Cache 1 timme — siffrorna ändras inte ofta.
 */
import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { ALL_ISLANDS } from '@/app/o/island-data'

export const revalidate = 3600

export async function GET() {
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const [restaurants, harbors, users, trips, visitedIslands] = await Promise.all([
    service.from('restaurants').select('*', { count: 'exact', head: true }),
    service.from('harbors').select('*', { count: 'exact', head: true }).then(
      r => r.count != null ? r : { count: 0 }
    ).catch(() => ({ count: 0 })),
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('trips').select('*', { count: 'exact', head: true }),
    service.from('visited_islands').select('*', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    islands: ALL_ISLANDS.length,
    places: restaurants.count ?? 0,
    harbors: harbors.count ?? 0,
    users: users.count ?? 0,
    trips: trips.count ?? 0,
    islandVisits: visitedIslands.count ?? 0,
  }, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    }
  })
}
