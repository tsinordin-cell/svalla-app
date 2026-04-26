/**
 * Svalla block-helpers — blockera/avblockera användare.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Blockera en annan användare.
 * Infogar en rad i user_blocks (blocker_id, blocked_id).
 * Returnerar true vid framgång, false vid fel.
 */
export async function blockUser(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  if (blockerId === blockedId) return false
  try {
    const { error } = await supabase
      .from('user_blocks')
      .upsert({ blocker_id: blockerId, blocked_id: blockedId }, { onConflict: 'blocker_id,blocked_id' })
    return !error
  } catch {
    return false
  }
}

/**
 * Avblockera en användare.
 */
export async function unblockUser(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  if (blockerId === blockedId) return false
  try {
    const { error } = await supabase
      .from('user_blocks')
      .delete()
      .eq('blocker_id', blockerId)
      .eq('blocked_id', blockedId)
    return !error
  } catch {
    return false
  }
}

/**
 * Kontrollera om blockerId har blockerat blockedId.
 */
export async function isBlocked(
  supabase: SupabaseClient,
  blockerId: string,
  blockedId: string,
): Promise<boolean> {
  try {
    const { data } = await supabase
      .from('user_blocks')
      .select('blocker_id')
      .eq('blocker_id', blockerId)
      .eq('blocked_id', blockedId)
      .maybeSingle()
    return !!data
  } catch {
    return false
  }
}
