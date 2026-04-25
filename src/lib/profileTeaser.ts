/**
 * Profile teaser — lätt profil-snapshot för long-press popover.
 * Minimalt data: namn, bio, vessel, avatar, några siffror, följstatus.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type ProfileTeaser = {
  id: string
  username: string
  avatar: string | null
  bio: string | null
  nationality: string | null
  vessel_name: string | null
  vessel_type: string | null
  vessel_model: string | null
  home_port: string | null
  trips_count: number
  total_nm: number
  followers_count: number
  is_following: boolean
  is_self: boolean
}

/** Hämta profil-teaser via username eller userId. */
export async function getProfileTeaser(
  supabase: SupabaseClient,
  lookup: { username?: string; userId?: string },
  currentUserId: string | null,
): Promise<ProfileTeaser | null> {
  let q = supabase.from('users')
    .select('id, username, avatar, bio, nationality, vessel_name, vessel_type, vessel_model, home_port')
  if (lookup.userId) q = q.eq('id', lookup.userId)
  else if (lookup.username) q = q.eq('username', lookup.username)
  else return null

  const { data: u } = await q.maybeSingle()
  if (!u) return null

  const [tripsRes, followersRes, followingRes] = await Promise.all([
    supabase.from('trips').select('distance', { count: 'exact' }).eq('user_id', u.id),
    supabase.from('follows').select('follower_id', { count: 'exact', head: true }).eq('following_id', u.id),
    currentUserId
      ? supabase.from('follows').select('follower_id', { count: 'exact', head: true })
          .eq('follower_id', currentUserId).eq('following_id', u.id)
      : Promise.resolve({ count: 0 }),
  ])

  const totalNM = (tripsRes.data ?? []).reduce((a: number, r: { distance?: number }) => a + (r.distance ?? 0), 0)

  return {
    id: u.id as string,
    username: u.username as string,
    avatar: (u.avatar ?? null) as string | null,
    bio: (u.bio ?? null) as string | null,
    nationality: (u.nationality ?? null) as string | null,
    vessel_name: (u.vessel_name ?? null) as string | null,
    vessel_type: (u.vessel_type ?? null) as string | null,
    vessel_model: (u.vessel_model ?? null) as string | null,
    home_port: (u.home_port ?? null) as string | null,
    trips_count: tripsRes.count ?? 0,
    total_nm: totalNM,
    followers_count: followersRes.count ?? 0,
    is_following: (followingRes.count ?? 0) > 0,
    is_self: currentUserId === u.id,
  }
}
