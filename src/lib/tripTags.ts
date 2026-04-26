/**
 * Trip-tag-helpers — tagga medseglare på en tur, bekräfta, ta bort.
 * RLS:
 *  - bara turens ägare kan tagga
 *  - tagger eller den taggade kan ta bort
 *  - bara den taggade kan confirmera
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { logger } from './logger'

export type TripTag = {
  trip_id: string
  tagged_user_id: string
  tagged_by_user_id: string | null
  confirmed: boolean
  created_at: string
  username?: string
  avatar?: string | null
}

export async function listTagsForTrip(
  supabase: SupabaseClient,
  tripId: string,
): Promise<TripTag[]> {
  const { data: rows } = await supabase
    .from('trip_tags')
    .select('trip_id, tagged_user_id, tagged_by_user_id, confirmed, created_at')
    .eq('trip_id', tripId)
  if (!rows || rows.length === 0) return []

  const ids = [...new Set(rows.map(r => r.tagged_user_id as string))]
  const { data: us } = await supabase.from('users').select('id, username, avatar').in('id', ids)
  const m: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of us ?? []) m[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  return rows.map(r => ({
    ...(r as TripTag),
    username: m[r.tagged_user_id as string]?.username,
    avatar: m[r.tagged_user_id as string]?.avatar ?? null,
  }))
}

export async function addTripTag(
  supabase: SupabaseClient,
  currentUserId: string,
  tripId: string,
  taggedUserId: string,
): Promise<{ ok: boolean; errorMessage?: string }> {
  if (currentUserId === taggedUserId) return { ok: false, errorMessage: 'Kan inte tagga dig själv' }
  const { error } = await supabase
    .from('trip_tags')
    .insert({
      trip_id: tripId,
      tagged_user_id: taggedUserId,
      tagged_by_user_id: currentUserId,
      confirmed: true,
    })
  if (error) {
    logger.error('tripTags', 'addTripTag failed', { code: error.code, message: error.message })
    return { ok: false, errorMessage: error.message }
  }
  // Fire-and-forget: in-app notification + push
  supabase.from('notifications').insert({
    user_id: taggedUserId,
    actor_id: currentUserId,
    type: 'tag',
    trip_id: tripId,
  }).then(() => {})

  supabase.from('users').select('username').eq('id', currentUserId).single()
    .then(({ data }) => {
      if (!data?.username) return
      fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: taggedUserId,
          title: 'Du är taggad i en tur 🏷️',
          body: `${data.username} taggade dig`,
          url: `/tur/${tripId}`,
        }),
      }).catch(() => {})
    })

  return { ok: true }
}

export async function removeTripTag(
  supabase: SupabaseClient,
  tripId: string,
  taggedUserId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('trip_tags').delete()
    .eq('trip_id', tripId).eq('tagged_user_id', taggedUserId)
  return !error
}

export async function confirmTripTag(
  supabase: SupabaseClient,
  tripId: string,
  taggedUserId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('trip_tags')
    .update({ confirmed: true })
    .eq('trip_id', tripId).eq('tagged_user_id', taggedUserId)
  return !error
}

/** Sök användare för tagging-picker. */
export async function searchUsersForTag(
  supabase: SupabaseClient,
  query: string,
  excludeIds: string[] = [],
): Promise<Array<{ id: string; username: string; avatar: string | null }>> {
  if (query.trim().length < 1) return []
  let q = supabase
    .from('users')
    .select('id, username, avatar')
    .ilike('username', `${query}%`)
    .limit(8)
  if (excludeIds.length > 0) q = q.not('id', 'in', `(${excludeIds.join(',')})`)
  const { data } = await q
  return (data ?? []).map(u => ({
    id: u.id as string,
    username: u.username as string,
    avatar: (u.avatar ?? null) as string | null,
  }))
}

/** Hämta bekräftade taggade turer för en användare (för "Taggad i"-flik på profil). */
export async function listTrippsTaggedIn(
  supabase: SupabaseClient,
  userId: string,
  limit = 20,
): Promise<string[]> {
  const { data } = await supabase
    .from('trip_tags')
    .select('trip_id')
    .eq('tagged_user_id', userId)
    .eq('confirmed', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data ?? []).map(d => d.trip_id as string)
}
