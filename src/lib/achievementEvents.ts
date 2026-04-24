/**
 * Achievement-events — persisterar när en användare låser upp ett märke.
 * Används både för feed-objekt och för notiser.
 *
 * Schema: achievement_events (user_id, achievement_key, awarded_at) UNIQUE(user, key)
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { ACHIEVEMENTS, computeUnlocked, calcStreak, type TripForAch } from './achievements'

export type AchievementEvent = {
  id: string
  user_id: string
  achievement_key: string
  awarded_at: string
  // joinad
  username?: string
  avatar?: string | null
  // härledd
  emoji?: string
  label?: string
  desc?: string
}

/**
 * Synca: räkna ut vilka achievements användaren ska ha låsta upp
 * och insert:a saknade rader i achievement_events. Idempotent (UNIQUE-key).
 *
 * Returnerar nyligen tillagda nycklar.
 */
export async function syncAchievements(
  supabase: SupabaseClient,
  userId: string,
): Promise<string[]> {
  // Hämta turer (samma minimaldata som ACHIEVEMENTS behöver)
  const { data: trips } = await supabase
    .from('trips')
    .select('distance, pinnar_rating, location_name, boat_type, started_at, ended_at, max_speed_knots, created_at')
    .eq('user_id', userId)
  const tripsArr = (trips ?? []) as TripForAch[]

  const streak = calcStreak(tripsArr)
  const unlocked = computeUnlocked(tripsArr, streak)
  const unlockedKeys = unlocked.map(a => a.id)
  if (unlockedKeys.length === 0) return []

  // Hämta redan registrerade
  const { data: existing } = await supabase
    .from('achievement_events')
    .select('achievement_key')
    .eq('user_id', userId)
    .in('achievement_key', unlockedKeys)
  const existingSet = new Set((existing ?? []).map(r => r.achievement_key as string))

  const missing = unlockedKeys.filter(k => !existingSet.has(k))
  if (missing.length === 0) return []

  const rows = missing.map(k => ({ user_id: userId, achievement_key: k }))
  const { error } = await supabase.from('achievement_events').insert(rows)
  if (error) return []
  return missing
}

/** Hämta senaste achievement-events för en uppsättning användare (feed). */
export async function listRecentAchievementEvents(
  supabase: SupabaseClient,
  userIds: string[],
  opts: { since?: string; limit?: number } = {},
): Promise<AchievementEvent[]> {
  if (userIds.length === 0) return []
  let q = supabase
    .from('achievement_events')
    .select('id, user_id, achievement_key, awarded_at')
    .in('user_id', userIds)
    .order('awarded_at', { ascending: false })
    .limit(opts.limit ?? 30)
  if (opts.since) q = q.gte('awarded_at', opts.since)
  const { data: rows } = await q
  if (!rows || rows.length === 0) return []

  const ids = [...new Set(rows.map(r => r.user_id as string))]
  const { data: users } = await supabase.from('users').select('id, username, avatar').in('id', ids)
  const umap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    umap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }

  const ach = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]))
  return rows.map(r => {
    const a = ach[r.achievement_key as string]
    return {
      ...(r as AchievementEvent),
      username: umap[r.user_id as string]?.username,
      avatar: umap[r.user_id as string]?.avatar ?? null,
      emoji: a?.emoji,
      label: a?.label,
      desc: a?.desc,
    }
  })
}

/** Hämta egna achievement-events (för profilsida). */
export async function listMyAchievementEvents(
  supabase: SupabaseClient,
  userId: string,
): Promise<AchievementEvent[]> {
  const { data: rows } = await supabase
    .from('achievement_events')
    .select('id, user_id, achievement_key, awarded_at')
    .eq('user_id', userId)
    .order('awarded_at', { ascending: false })
  if (!rows) return []
  const ach = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]))
  return rows.map(r => {
    const a = ach[r.achievement_key as string]
    return {
      ...(r as AchievementEvent),
      emoji: a?.emoji,
      label: a?.label,
      desc: a?.desc,
    }
  })
}
