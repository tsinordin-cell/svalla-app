/**
 * Feed-helper — anropar `feed_with_counts` RPC:en för att hämta
 * trips + user + likes_count + comments_count + user_liked i EN
 * round-trip per fliken. Eliminerar N+1-mönstret som tidigare
 * krävde 4-7 separata queries per feed-render.
 *
 * Källa: supabase/migration-feed-rpc.sql
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Trip } from './supabase'

/** Raw rad från RPC — flat shape, joinas till Trip-formen i mapRpcRow. */
type FeedRpcRow = {
  id: string
  user_id: string
  boat_type: string
  distance: number
  duration: number
  average_speed_knots: number
  max_speed_knots: number
  image: string
  route_id: string | null
  created_at: string
  location_name: string | null
  caption: string | null
  pinnar_rating: number | null
  started_at: string | null
  ended_at: string | null
  route_points: { lat: number; lng: number }[] | null
  username: string | null
  avatar: string | null
  route_name: string | null
  likes_count: number
  comments_count: number
  user_liked: boolean
}

function mapRpcRow(r: FeedRpcRow): Trip {
  return {
    id:                  r.id,
    user_id:             r.user_id,
    boat_type:           r.boat_type,
    distance:            r.distance,
    duration:            r.duration,
    average_speed_knots: r.average_speed_knots,
    max_speed_knots:     r.max_speed_knots,
    image:               r.image,
    location_name:       r.location_name,
    start_location:      null,
    caption:             r.caption,
    pinnar_rating:       r.pinnar_rating,
    route_id:            r.route_id,
    started_at:          r.started_at,
    ended_at:            r.ended_at,
    created_at:          r.created_at,
    route_points:        r.route_points,
    users:               { username: r.username ?? 'Seglare', avatar_url: r.avatar ?? null },
    routes:              r.route_name ? { name: r.route_name } : null,
    likes_count:         Number(r.likes_count ?? 0),
    comments_count:      Number(r.comments_count ?? 0),
    user_liked:          !!r.user_liked,
  }
}

export type FeedFetchOptions = {
  viewerId?: string | null
  limit?: number
  followOnly?: boolean
  beforeTs?: string | null
}

/**
 * Hämta feed-trips berikade med user + counts i ett enda RPC-anrop.
 *
 * @param supabase  klient (server eller browser)
 * @param opts.viewerId   inloggad användares id (null för publik feed)
 * @param opts.limit      antal trips (1-100, default 50)
 * @param opts.followOnly true = bara turer från personer viewer följer
 * @param opts.beforeTs   pagination-cursor — turer äldre än denna timestamp
 */
/**
 * Enriches trips with confirmed tagged crew members.
 * One batch query for all trip IDs — avoids N+1.
 */
export async function enrichWithTags(
  supabase: SupabaseClient,
  trips: Trip[],
): Promise<Trip[]> {
  if (trips.length === 0) return trips
  const ids = trips.map(t => t.id)

  const { data: tagRows } = await supabase
    .from('trip_tags')
    .select('trip_id, tagged_user_id')
    .in('trip_id', ids)
    .eq('confirmed', true)
  if (!tagRows || tagRows.length === 0) return trips

  const userIds = [...new Set(tagRows.map(r => r.tagged_user_id as string))]
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', userIds)
  const userMap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    userMap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }

  const tagsByTrip: Record<string, { username: string; avatar: string | null }[]> = {}
  for (const row of tagRows) {
    const u = userMap[row.tagged_user_id as string]
    if (!u) continue
    if (!tagsByTrip[row.trip_id as string]) tagsByTrip[row.trip_id as string] = []
    tagsByTrip[row.trip_id as string].push(u)
  }

  return trips.map(t => ({ ...t, tagged_users: tagsByTrip[t.id] ?? [] }))
}

export async function fetchFeedTrips(
  supabase: SupabaseClient,
  opts: FeedFetchOptions = {},
): Promise<{ trips: Trip[]; error: string | null }> {
  try {
    const { data, error } = await supabase.rpc('feed_with_counts', {
      p_viewer:      opts.viewerId ?? null,
      p_limit:       opts.limit ?? 50,
      p_follow_only: opts.followOnly ?? false,
      p_before_ts:   opts.beforeTs ?? null,
    })

    if (error) {
      console.error('[fetchFeedTrips] RPC error:', error.message)
      return { trips: [], error: error.message }
    }
    const rows = (data ?? []) as FeedRpcRow[]
    return { trips: rows.map(mapRpcRow), error: null }
  } catch (err) {
    // Nätverksfel, timeout eller oväntat undantag — returnera gracefully
    // utan att kasta vidare och trigga error-boundary i feed/page.tsx
    const msg = err instanceof Error ? err.message : 'Nätverksfel'
    console.error('[fetchFeedTrips] unexpected throw:', msg)
    return { trips: [], error: msg }
  }
}
