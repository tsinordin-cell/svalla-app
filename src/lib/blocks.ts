/**
 * Svalla block-helpers — blockera/avblockera användare,
 * kolla om en blockering finns.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/** Blockera en användare. Returnerar true vid lyckat. */
export async function blockUser(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  if (blockerId === blockedId) return false
  const { error } = await supabase
    .from('user_blocks')
    .insert({ blocker_id: blockerId, blocked_id: blockedId })
  return !error || `${error.message}`.includes('duplicate')
}

/** Avblockera en användare. */
export async function unblockUser(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('user_blocks')
    .delete()
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)
  return !error
}

/** Kolla om blockerId har blockerat blockedId. */
export async function isBlocked(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  const { data } = await supabase
    .from('user_blocks')
    .select('blocker_id')
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId)
    .maybeSingle()
  return !!data
}

/**
 * Kolla ÅT BÅDA håll — returnerar true om NÅGON av de två har blockerat den andre.
 * Används vid DM-skapande.
 */
export async function eitherBlocked(
  supabase: SupabaseClient,
  userA: string,
  userB: string,
): Promise<boolean> {
  const { data } = await supabase
    .from('user_blocks')
    .select('blocker_id')
    .or(`and(blocker_id.eq.${userA},blocked_id.eq.${userB}),and(blocker_id.eq.${userB},blocked_id.eq.${userA})`)
    .limit(1)
  return !!(data && data.length > 0)
}

/** Hämta alla ID:n som currentUser har blockerat. */
export async function getBlockedIds(
  supabase: SupabaseClient,
  userId: string,
): Promise<string[]> {
  const { data } = await supabase
    .from('user_blocks')
    .select('blocked_id')
    .eq('blocker_id', userId)
  return (data ?? []).map(r => r.blocked_id as string)
}
