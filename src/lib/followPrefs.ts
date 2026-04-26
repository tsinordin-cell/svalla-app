/**
 * Follow-prefs — granulär kontroll över push-notiser per följd användare.
 *  notify_any   — helt av/på (default true)
 *  only_magic   — bara ⚓⚓⚓ turer
 *  min_distance — minst N nautiska mil
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type FollowPref = {
  follower_id: string
  following_id: string
  notify_any: boolean
  only_magic: boolean
  min_distance: number | null
  updated_at: string
}

export const DEFAULT_FOLLOW_PREF: Omit<FollowPref, 'follower_id' | 'following_id' | 'updated_at'> = {
  notify_any: true,
  only_magic: false,
  min_distance: null,
}

export async function getFollowPref(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string,
): Promise<FollowPref | null> {
  const { data } = await supabase
    .from('follow_prefs')
    .select('follower_id, following_id, notify_any, only_magic, min_distance, updated_at')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .maybeSingle()
  return (data as FollowPref) ?? null
}

export async function upsertFollowPref(
  supabase: SupabaseClient,
  followerId: string,
  followingId: string,
  patch: Partial<Omit<FollowPref, 'follower_id' | 'following_id' | 'updated_at'>>,
): Promise<boolean> {
  const { error } = await supabase
    .from('follow_prefs')
    .upsert({
      follower_id: followerId,
      following_id: followingId,
      notify_any: patch.notify_any ?? true,
      only_magic: patch.only_magic ?? false,
      min_distance: patch.min_distance ?? null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'follower_id,following_id' })
  return !error
}

/** Avgör om en notis ska skickas baserat på tur + pref. */
export function shouldNotify(pref: FollowPref | null, trip: { pinnar_rating: number | null; distance: number | null }): boolean {
  if (!pref) return true // default = ja
  if (!pref.notify_any) return false
  if (pref.only_magic && trip.pinnar_rating !== 3) return false
  if (pref.min_distance != null && (trip.distance ?? 0) < pref.min_distance) return false
  return true
}
