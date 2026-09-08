/**
 * trip-cache.ts — en tursida, renderad per betraktare, med datan cachad.
 *
 * BAKGRUND (fälttest 2026-09-04, Tom): en tur sparad som 'Privat tur' gav
 * 404 för ägaren själv. /tur/[id] läste med den anonyma klienten, och RLS-
 * policyn trips_select_visible släpper bara igenom publika turer till anon
 * (eller ägaren själv, via auth.uid()). Sidan skickade aldrig med
 * besökarens session, så ägaren passerade aldrig.
 *
 * BESLUT (Tom, 2026-09-04, "bli bäst"): INTE en separat ägarvy (två sidor
 * för samma tur driver isär). Istället:
 *   1. Sidan är dynamisk och viewer-medveten.
 *   2. Den PUBLIKA datan cachas i Next Data Cache med tagg trip:<id> och
 *      töms med revalidateTag när turen sparas, redigeras, raderas eller
 *      byter synlighet. Publika turer blir alltså inte långsammare än förr —
 *      de blir färskare (töms vid ändring istället för var 60:e sekund).
 *   3. Privata turer läses per request med besökarens cookies. RLS avgör.
 *
 * Så här används den:
 *   const bundle = (await getCachedPublicTripBundle(id))
 *     ?? await loadTripBundle(id, await createServerSupabaseClient())
 *   if (!bundle) notFound()
 */
import { unstable_cache } from 'next/cache'
import type { SupabaseClient } from '@supabase/supabase-js'
import { createPublicSupabaseClient } from './supabase-server'

export const tripCacheTag = (id: string) => `trip:${id}`

export type TripBundle = {
  // Raden ur trips precis som Supabase ger den. Klienten är otypad i det här
  // repot (ingen genererad Database-typ), så fälten är lösa — samma som
  // tursidan alltid har arbetat med.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trip: Record<string, any> & { id: string; user_id: string; deleted_at: string | null }
  userRow: { username: string | null; avatar: string | null } | null
  taggedUsers: { id: string; username: string }[]
  rawPoints: { latitude: number; longitude: number; speed_knots: number | null; heading: number | null; recorded_at: string | null }[]
  rawStops: { latitude: number; longitude: number; stop_type: string | null; started_at: string | null; ended_at: string | null; duration_seconds: number | null; place_name: string | null }[]
  toursData: { id: string; title: string; start_location: string; destination: string; waypoints: { lat: number; lng: number }[] }[]
  allRestaurants: { id: string; name: string; latitude: number; longitude: number }[]
  existingHighlight: { id: string; place_slug: string; place_name: string } | null
}

/**
 * Alla läsningar tursidan behöver, med den klient som skickas in.
 * Returnerar null om turen inte syns för klienten (RLS) eller är raderad.
 */
export async function loadTripBundle(id: string, supabase: SupabaseClient): Promise<TripBundle | null> {
  const { data: trip, error } = await supabase
    .from('trips')
    .select('*, routes(name), ai_summary')
    .eq('id', id)
    .is('deleted_at', null)
    .single()
  if (error || !trip) return null

  const [
    { data: userRow },
    { data: tripTagsRaw },
    { data: rawPoints },
    { data: rawStops },
    { data: toursData },
    { data: allRestaurants },
    { data: existingHighlight },
  ] = await Promise.all([
    supabase.from('users').select('username, avatar').eq('id', trip.user_id).single(),
    supabase.from('trip_tags').select('tagged_user_id').eq('trip_id', id),
    supabase
      .from('gps_points')
      .select('latitude,longitude,speed_knots,heading,recorded_at')
      .eq('trip_id', id)
      .order('recorded_at', { ascending: true }),
    supabase
      .from('stops')
      .select('latitude,longitude,stop_type,started_at,ended_at,duration_seconds,place_name')
      .eq('trip_id', id)
      .order('started_at', { ascending: true }),
    supabase.from('tours').select('id,title,start_location,destination,waypoints').limit(100),
    supabase.from('restaurants').select('id,name,latitude,longitude').limit(1000),
    supabase.from('trip_highlights').select('id, place_slug, place_name').eq('trip_id', id).maybeSingle(),
  ])

  const taggedUserIds = (tripTagsRaw ?? []).map((t: { tagged_user_id: string }) => t.tagged_user_id)
  const { data: taggedUsersRaw } = taggedUserIds.length
    ? await supabase.from('users').select('id, username').in('id', taggedUserIds)
    : { data: [] }

  return {
    trip: trip as TripBundle['trip'],
    userRow: (userRow ?? null) as TripBundle['userRow'],
    taggedUsers: (taggedUsersRaw ?? []) as TripBundle['taggedUsers'],
    rawPoints: (rawPoints ?? []) as TripBundle['rawPoints'],
    rawStops: (rawStops ?? []) as TripBundle['rawStops'],
    toursData: (toursData ?? []) as TripBundle['toursData'],
    allRestaurants: (allRestaurants ?? []) as TripBundle['allRestaurants'],
    existingHighlight: (existingHighlight ?? null) as TripBundle['existingHighlight'],
  }
}

/**
 * Den publika bilden av turen, cachad. Läser med anon-klienten INUTI cachen
 * (ingen cookies() här — då kunde en ägares privata data hamna i en delad
 * cache). Returnerar null för privata/raderade turer; den nullen cachas
 * också, men bara i högst 5 minuter och töms av revalidateTag vid varje
 * skrivning — se /api/revalidate-feed.
 */
export function getCachedPublicTripBundle(id: string): Promise<TripBundle | null> {
  return unstable_cache(
    async () => loadTripBundle(id, createPublicSupabaseClient()),
    ['trip-bundle', id],
    { tags: [tripCacheTag(id)], revalidate: 300 },
  )()
}
