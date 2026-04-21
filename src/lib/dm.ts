/**
 * Svalla DM-helpers — hittar eller skapar 1-till-1-konversationer,
 * hämtar inboxlistor, räknar olästa.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Hitta eller skapa en 1-till-1-konversation mellan två användare.
 * Returnerar conversation.id eller null vid fel.
 */
export async function findOrCreateDM(
  supabase: SupabaseClient,
  currentUserId: string,
  otherUserId: string,
): Promise<string | null> {
  if (currentUserId === otherUserId) return null

  // Steg 1: hitta konversationer där BÅDA är deltagare och is_group = false
  const { data: mine } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', currentUserId)

  const myIds = (mine ?? []).map(r => r.conversation_id as string)
  if (myIds.length > 0) {
    const { data: shared } = await supabase
      .from('conversation_participants')
      .select('conversation_id, conversations!inner(is_group)')
      .eq('user_id', otherUserId)
      .in('conversation_id', myIds)

    const oneToOne = (shared ?? []).find((r) => {
      const c = (r as unknown as { conversations: { is_group: boolean } }).conversations
      return c && c.is_group === false
    })
    if (oneToOne) return oneToOne.conversation_id as string
  }

  // Steg 2: skapa ny
  const { data: conv, error: cErr } = await supabase
    .from('conversations')
    .insert({ is_group: false, created_by: currentUserId })
    .select('id')
    .single()
  if (cErr || !conv) return null

  const rows = [
    { conversation_id: conv.id, user_id: currentUserId, role: 'owner' as const },
    { conversation_id: conv.id, user_id: otherUserId,   role: 'member' as const },
  ]
  const { error: pErr } = await supabase.from('conversation_participants').insert(rows)
  if (pErr) return null

  return conv.id as string
}

/** Räknar olästa meddelanden för currentUser (över alla konversationer). */
export async function countUnreadMessages(
  supabase: SupabaseClient,
  currentUserId: string,
): Promise<number> {
  const { data: parts } = await supabase
    .from('conversation_participants')
    .select('conversation_id, last_read_at')
    .eq('user_id', currentUserId)

  if (!parts || parts.length === 0) return 0

  let total = 0
  for (const p of parts) {
    const { count } = await supabase
      .from('messages')
      .select('id', { count: 'exact', head: true })
      .eq('conversation_id', p.conversation_id)
      .gt('created_at', p.last_read_at)
      .neq('user_id', currentUserId)
    total += count ?? 0
  }
  return total
}

/** Markera en konversation som läst (sätter last_read_at = now()). */
export async function markConversationRead(
  supabase: SupabaseClient,
  currentUserId: string,
  conversationId: string,
): Promise<void> {
  await supabase
    .from('conversation_participants')
    .update({ last_read_at: new Date().toISOString() })
    .eq('user_id', currentUserId)
    .eq('conversation_id', conversationId)
}
