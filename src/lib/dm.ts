/**
 * Svalla DM-helpers — hittar eller skapar 1-till-1-konversationer,
 * hämtar inboxlistor, räknar olästa.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Hitta eller skapa en 1-till-1-konversation mellan två användare.
 * Om motparten INTE följer tillbaka skapas den som förfrågan (status='request'),
 * annars som aktiv ('active'). Returnerar { id, status } eller null vid fel.
 *
 * OBS: Kräver att migration-dm-rls-fix.sql körts i Supabase för att
 * konversationsskaparen ska kunna lägga till motparten som deltagare.
 */
export async function findOrCreateDM(
  supabase: SupabaseClient,
  currentUserId: string,
  otherUserId: string,
): Promise<{ id: string; status: 'active' | 'request' | 'declined' } | null> {
  if (currentUserId === otherUserId) return null

  try {
    // 1. Hitta befintlig 1:1-konversation mellan dessa två användare
    const { data: myParts } = await supabase
      .from('conversation_participants')
      .select('conversation_id')
      .eq('user_id', currentUserId)

    const myConvIds = (myParts ?? []).map(p => p.conversation_id as string)

    if (myConvIds.length > 0) {
      const { data: sharedParts } = await supabase
        .from('conversation_participants')
        .select('conversation_id')
        .eq('user_id', otherUserId)
        .in('conversation_id', myConvIds)

      const sharedIds = (sharedParts ?? []).map(p => p.conversation_id as string)

      if (sharedIds.length > 0) {
        const { data: existing } = await supabase
          .from('conversations')
          .select('id, status')
          .in('id', sharedIds)
          .eq('is_group', false)
          .limit(1)
          .maybeSingle()

        if (existing) {
          const row = existing as { id: string; status: string }
          return {
            id: row.id,
            status: (row.status as 'active' | 'request' | 'declined') ?? 'active',
          }
        }
      }
    }

    // 2. Avgör status: active vid ömsesidig följning, annars request
    const { data: followsBack } = await supabase
      .from('follows')
      .select('follower_id')
      .eq('follower_id', otherUserId)
      .eq('following_id', currentUserId)
      .maybeSingle()

    const convStatus: 'active' | 'request' = followsBack ? 'active' : 'request'

    // 3. Skapa konversationen (created_by = currentUser → tillåts av RLS)
    const { data: newConv, error: convErr } = await supabase
      .from('conversations')
      .insert({
        is_group: false,
        status: convStatus,
        created_by: currentUserId,
        last_message_at: new Date().toISOString(),
      })
      .select('id')
      .single()

    if (convErr || !newConv) return null

    const convId = (newConv as { id: string }).id

    // 4. Lägg till skaparen som deltagare (alltid tillåtet — user_id = auth.uid())
    await supabase
      .from('conversation_participants')
      .insert({ conversation_id: convId, user_id: currentUserId })

    // 5. Lägg till motparten som deltagare
    //    Kräver uppdaterad RLS-policy (migration-dm-rls-fix.sql).
    //    Om policyn inte är körd misslyckas detta tyst — motparten kan ej se
    //    konversationen förrän migrationen är gjord.
    await supabase
      .from('conversation_participants')
      .insert({ conversation_id: convId, user_id: otherUserId })

    return { id: convId, status: convStatus }
  } catch {
    return null
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
