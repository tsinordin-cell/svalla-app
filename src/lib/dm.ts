/**
 * Svalla DM-helpers — hittar eller skapar 1-till-1-konversationer,
 * hämtar inboxlistor, räknar olästa.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Hitta eller skapa en 1-till-1-konversation mellan två användare.
 * Om motparten INTE följer tillbaka skapas den som förfrågan (status='request'),
 * annars som aktiv ('active'). Returnerar { id, status } eller null vid fel.
 */
export async function findOrCreateDM(
  supabase: SupabaseClient,
  currentUserId: string,
  otherUserId: string,
): Promise<{ id: string; status: 'active' | 'request' | 'declined' } | null> {
  if (currentUserId === otherUserId) return null

  // Anropar SECURITY DEFINER-funktionen som kör ovanför RLS.
  // Funktionen hittar befintlig 1:1-konversation eller skapar en ny,
  // inklusive båda deltagarna — oavsett RLS-policies på tabellerna.
  const { data, error } = await supabase
    .rpc('find_or_create_dm', { p_other_user_id: otherUserId })

  if (error || !data || (data as unknown[]).length === 0) return null

  const row = (data as { conv_id: string; conv_status: string }[])[0]
  return {
    id: row.conv_id,
    status: (row.conv_status as 'active' | 'request' | 'declined') ?? 'active',
  }
}

/** Acceptera en DM-förfrågan (mottagaren → conversation blir 'active'). */
export async function acceptDMRequest(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<boolean> {
  const { error } = await supabase.rpc('accept_dm_request', { p_conv_id: conversationId })
  return !error
}

/** Avvisa en DM-förfrågan (mottagaren → conversation blir 'declined'). */
export async function declineDMRequest(
  supabase: SupabaseClient,
  conversationId: string,
): Promise<boolean> {
  const { error } = await supabase.rpc('decline_dm_request', { p_conv_id: conversationId })
  return !error
}

/** Räknar olästa meddelanden för currentUser (över alla konversationer — robust mot saknade DB-kolumner). */
export async function countUnreadMessages(
  supabase: SupabaseClient,
  currentUserId: string,
): Promise<number> {
  try {
    const { data: parts } = await supabase
      .from('conversation_participants')
      .select('conversation_id, last_read_at')
      .eq('user_id', currentUserId)

    if (!parts || parts.length === 0) return 0

    let total = 0
    for (const p of (parts as { conversation_id: string; last_read_at: string }[])) {
      const { count } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('conversation_id', p.conversation_id)
        .gt('created_at', p.last_read_at)
        .neq('user_id', currentUserId)
      total += count ?? 0
    }
    return total
  } catch {
    return 0
  }
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

/** Radera ett enskilt meddelande (bara egna). */
export async function deleteMessage(
  supabase: SupabaseClient,
  messageId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId)
  return !error
}

/**
 * Lämna / radera en konversation för current user.
 * För 1-till-1: tar bort deltagarraden → konversationen syns ej längre.
 * För grupp: lämnar utan att radera för övriga.
 */
export async function leaveConversation(
  supabase: SupabaseClient,
  currentUserId: string,
  conversationId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('conversation_participants')
    .delete()
    .eq('user_id', currentUserId)
    .eq('conversation_id', conversationId)
  return !error
}
