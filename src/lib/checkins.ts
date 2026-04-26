/**
 * Check-in-helpers — snabb positionspost utan full tur.
 * Skiljs från trips: ingen GPS-spårning, ingen båttyp, bara "jag är här".
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type CheckIn = {
  id: string
  user_id: string
  place_id: string | null
  place_name: string | null
  lat: number | null
  lng: number | null
  message: string | null
  image: string | null
  created_at: string
  // joinad
  username?: string
  avatar?: string | null
}

export async function createCheckIn(
  supabase: SupabaseClient,
  currentUserId: string,
  input: {
    place_name?: string | null
    place_id?: string | null
    lat?: number | null
    lng?: number | null
    message?: string | null
    image?: string | null
  },
): Promise<CheckIn | null> {
  const { data, error } = await supabase
    .from('check_ins')
    .insert({
      user_id: currentUserId,
      place_name: input.place_name ?? null,
      place_id: input.place_id ?? null,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      message: input.message?.slice(0, 280) ?? null,
      image: input.image ?? null,
    })
    .select('id, user_id, place_id, place_name, lat, lng, message, image, created_at')
    .single()
  if (error || !data) return null
  return data as CheckIn
}

/** Hämta senaste check-ins (för feed eller profil). Joinar username/avatar. */
export async function listCheckIns(
  supabase: SupabaseClient,
  opts: { userId?: string; limit?: number } = {},
): Promise<CheckIn[]> {
  let q = supabase
    .from('check_ins')
    .select('id, user_id, place_id, place_name, lat, lng, message, image, created_at')
    .order('created_at', { ascending: false })
    .limit(opts.limit ?? 20)
  if (opts.userId) q = q.eq('user_id', opts.userId)
  const { data: rows } = await q
  if (!rows || rows.length === 0) return []

  const userIds = [...new Set(rows.map(r => r.user_id as string))]
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', userIds)
  const uMap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    uMap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }
  return rows.map(r => ({
    ...(r as CheckIn),
    username: uMap[r.user_id as string]?.username,
    avatar: uMap[r.user_id as string]?.avatar ?? null,
  }))
}

export async function deleteCheckIn(
  supabase: SupabaseClient,
  id: string,
): Promise<boolean> {
  const { error } = await supabase.from('check_ins').delete().eq('id', id)
  return !error
}
