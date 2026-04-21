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
  const { data: mine } = await supabase
    .from('conversation_participants')
    .select('conversation_id')
    .eq('user_id', currentUserId)

  const myIds = (mine ?? []).map(r => r.conversation_id as string)
  if (myIds.length > 0) {
    const { data: shared } = await supabase
      .from('conversation_participants')
      .select('conversation_id, conversations!inner(is_group, status)')
      .eq('user_id', otherUserId)
      .in('conversation_id', myIds)

    const oneToOne = (shared ?? []).find((r) => {
      const c = (r as unknown as { conversations: { is_group: boolean } }).conversations
      return c && c.is_group === false
    })
    if (oneToOne) {
      const c = (oneToOne as unknown as { conversations: { status?: string } }).conversations
      return {
        id: oneToOne.conversation_id as string,
        status: (c?.status as 'active' | 'request' | 'declined') ?? 'active',
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
  // Försök med status-kolumn; faller tillbaka utan om kolumnen saknas i databasen ännu
  let convId: string | null = null
  const { data: conv1, error: cErr1 } = await supabase
    .from('conversations')
    .insert({ is_group: false, created_by: currentUserId, status })
    .select('id')
    .single()

  if (cErr1) {
    // Kolumnen finns troligen inte — försök utan status-fältet
    const { data: conv2, error: cErr2 } = await supabase
      .from('conversations')
      .insert({ is_group: false, created_by: currentUserId })
      .select('id')
      .single()
    if (cErr2 || !conv2) return null
    convId = conv2.id as string
  } else {
    if (!conv1) return null
    convId = conv1.id as string
  }

  const rows = [
    { conversation_id: convId, user_id: currentUserId, role: 'owner' as const },
    { conversation_id: convId, user_id: otherUserId,   role: 'member' as const },
  ]
  const { error: pErr } = await supabase.from('conversation_participants').insert(rows)
  if (pErr) return null

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

/** Räknar olästa meddelanden för currentUser (över alla aktiva konversationer — skippar declined). */
export async function countUnreadMessages(
  supabase: SupabaseClient,
  currentUserId: string,
): Promise<number> {
  const { data: parts } = await supabase
    .from('conversation_participants')
    .select('conversation_id, last_read_at, conversations!inner(status)')
    .eq('user_id', currentUserId)

  if (!parts || parts.length === 0) return 0

  const activeIds = (parts as unknown as { conversation_id: string; last_read_at: string; conversations: { status?: string } }[])
    .filter(p => p.conversations?.status !== 'declined')

  let total = 0
  for (const p of activeIds) {
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
