/**
 * Reposts — citera en annan användares tur med egen kommentar.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type Repost = {
  id: string
  user_id: string
  trip_id: string
  comment: string | null
  created_at: string
}

export async function createRepost(
  supabase: SupabaseClient,
  userId: string,
  tripId: string,
  comment: string | null,
): Promise<Repost | null> {
  const { data, error } = await supabase
    .from('reposts')
    .insert({ user_id: userId, trip_id: tripId, comment: comment?.slice(0, 500) ?? null })
    .select('id, user_id, trip_id, comment, created_at')
    .single()
  if (error || !data) return null
  return data as Repost
}

export async function deleteRepost(
  supabase: SupabaseClient,
  userId: string,
  tripId: string,
): Promise<boolean> {
  const { error } = await supabase.from('reposts').delete()
    .eq('user_id', userId).eq('trip_id', tripId)
  return !error
}

export async function hasMyRepost(
  supabase: SupabaseClient,
  userId: string,
  tripId: string,
): Promise<boolean> {
  const { count } = await supabase
    .from('reposts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId).eq('trip_id', tripId)
  return (count ?? 0) > 0
}

export async function countReposts(
  supabase: SupabaseClient,
  tripId: string,
): Promise<number> {
  const { count } = await supabase
    .from('reposts')
    .select('id', { count: 'exact', head: true })
    .eq('trip_id', tripId)
  return count ?? 0
}
