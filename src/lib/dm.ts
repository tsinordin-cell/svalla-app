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

  // Steg 1: hitta konversationer där BÅDA är deltagare och is_group = false
  // Undviker join på status-kolumn som kan saknas i DB — gör enklare lookup
  const { data: mine } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', currentUserId)

  const myIds = (mine ?? []).map(r => r.conversation_id as string)
  if (myIds.length > 0) {
    // Hitta konversationer där den andra parten också deltar
    const { data: shared } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', otherUserId)
      .in('conversation_id', myIds)

    const sharedIds = (shared ?? []).map(r => r.conversation_id as string)

    if (sharedIds.length > 0) {
      // Kolla vilka av dessa som är 1-till-1 (is_group = false)
      // Försök med status-join — fallback utan om kolumnen saknas
      const { data: convs } = await supabase
        .from('conversations')
        .select('id, is_group, status')
        .in('id', sharedIds)
        .eq('is_group', false)

      if (convs && convs.length > 0) {
        const conv = convs[0] as { id: string; is_group: boolean; status?: string }
        return {
          id: conv.id,
          status: (conv.status as 'active' | 'request' | 'declined') ?? 'active',
        }
      }

      // Fallback: välj utan status-kolumn
      const { data: convsSimple } = await supabase
        .from('conversations')
        .select('id, is_group')
        .in('id', sharedIds)
        .eq('is_group', false)

      if (convsSimple && convsSimple.length > 0) {
        return {
          id: (convsSimple[0] as { id: string }).id,
          status: 'active',
        }
      }
    }
  }

  // Steg 2: kolla om motparten följer mig tillbaka
  const { data: mutual } = await supabase
    .from('follows')
    .select('follower_id')
    .eq('follower_id', otherUserId)
    .eq('following_id', currentUserId)
    .maybeSingle()

  const status: 'active' | 'request' = mutual ? 'active' : 'request'

  // Steg 3: skapa ny
  // Testar 3 varianter i fallande ordning — hanterar alla DB-migrationstillstånd
  let convId: string | null = null
  const insertVariants: Record<string, unknown>[] = [
    { is_group: false, created_by: currentUserId, status },  // full schema (efter migration)
    { is_group: false, created_by: currentUserId },           // utan status
    { is_group: false },                                       // minimal fallback
  ]
  for (const payload of insertVariants) {
    const { data, error } = await supabase
      .from('conversations')
      .insert(payload)
      .select('id')
      .single()
    if (!error && data) {
      convId = data.id as string
      break
    }
  }
  if (!convId) return null

  // Försök lägga till deltagare — med role-kolumn, annars utan
  const rowsWithRole = [
    { conversation_id: convId, user_id: currentUserId, role: 'owner' },
    { conversation_id: convId, user_id: otherUserId,   role: 'member' },
  ]
  const rowsNoRole = [
    { conversation_id: convId, user_id: currentUserId },
    { conversation_id: convId, user_id: otherUserId },
  ]
  const { error: pErr1 } = await supabase.from('conversation_participants').insert(rowsWithRole)
  if (pErr1) {
    const { error: pErr2 } = await supabase.from('conversation_participants').insert(rowsNoRole)
    if (pErr2) return null
  }

  return { id: convId, status }
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
