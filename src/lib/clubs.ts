/**
 * Svalla klubb-helpers — skapa klubb, gå med, lämna,
 * och hämta/skapa grupp-konversation kopplad till klubben.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type ClubBasic = {
  id: string
  slug: string
  name: string
  description: string | null
  image: string | null
  is_public: boolean
  region: string | null
  created_by: string | null
  created_at: string
  member_count?: number
  is_member?: boolean
}

/** Slugify svenskt — å/ä/ö → a/a/o, mellanslag → bindestreck. */
export function slugifyClubName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60) || 'klubb'
}

/**
 * Skapa klubb + lägg till skaparen som owner + skapa grupp-konversation kopplad till klubben.
 * Returnerar { club, conversationId } eller null vid fel.
 */
export async function createClub(
  supabase: SupabaseClient,
  currentUserId: string,
  input: {
    name: string
    description?: string | null
    image?: string | null
    is_public: boolean
    region?: string | null
  },
): Promise<{ club: ClubBasic; conversationId: string } | null> {
  let slug = slugifyClubName(input.name)
  // gör slug unik genom att appenda en kort hash om den krockar
  const { data: existing } = await supabase
    .from('clubs').select('slug').eq('slug', slug).maybeSingle()
  if (existing) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`

  const { data: club, error: cErr } = await supabase
    .from('clubs')
    .insert({
      slug,
      name: input.name,
      description: input.description ?? null,
      image: input.image ?? null,
      is_public: input.is_public,
      region: input.region ?? null,
      created_by: currentUserId,
    })
    .select('id, slug, name, description, image, is_public, region, created_by, created_at')
    .single()
  if (cErr || !club) return null

  // owner-medlemskap
  const { error: mErr } = await supabase
    .from('club_members')
    .insert({ club_id: club.id, user_id: currentUserId, role: 'owner' })
  if (mErr) return null

  // grupp-konversation (en chatt per klubb)
  const { data: conv, error: convErr } = await supabase
    .from('conversations')
    .insert({
      is_group: true,
      title: club.name,
      club_id: club.id,
      created_by: currentUserId,
    })
    .select('id')
    .single()
  if (convErr || !conv) return { club: club as ClubBasic, conversationId: '' }

  await supabase
    .from('conversation_participants')
    .insert({ conversation_id: conv.id, user_id: currentUserId, role: 'owner' })

  return { club: club as ClubBasic, conversationId: conv.id as string }
}

/** Gå med i klubb + i klubbens grupp-chatt. */
export async function joinClub(
  supabase: SupabaseClient,
  currentUserId: string,
  clubId: string,
): Promise<boolean> {
  const { error } = await supabase
    .from('club_members')
    .insert({ club_id: clubId, user_id: currentUserId, role: 'member' })
  if (error && !`${error.message}`.includes('duplicate')) return false

  // hitta klubbens grupp-konversation och lägg till
  const { data: conv } = await supabase
    .from('conversations')
    .select('id')
    .eq('club_id', clubId)
    .eq('is_group', true)
    .maybeSingle()
  if (conv?.id) {
    await supabase
      .from('conversation_participants')
      .insert({ conversation_id: conv.id, user_id: currentUserId, role: 'member' })
  }
  return true
}

/** Lämna klubb (och dess grupp-chatt). Owner kan inte lämna. */
export async function leaveClub(
  supabase: SupabaseClient,
  currentUserId: string,
  clubId: string,
): Promise<boolean> {
  // kontrollera roll
  const { data: m } = await supabase
    .from('club_members')
    .select('role')
    .eq('club_id', clubId)
    .eq('user_id', currentUserId)
    .maybeSingle()
  if (m?.role === 'owner') return false

  await supabase
    .from('club_members')
    .delete()
    .eq('club_id', clubId)
    .eq('user_id', currentUserId)

  const { data: conv } = await supabase
    .from('conversations')
    .select('id')
    .eq('club_id', clubId)
    .eq('is_group', true)
    .maybeSingle()
  if (conv?.id) {
    await supabase
      .from('conversation_participants')
      .delete()
      .eq('conversation_id', conv.id)
      .eq('user_id', currentUserId)
  }
  return true
}

/** Hämta klubbens grupp-konversation (skapa om saknas). */
export async function getOrCreateClubChat(
  supabase: SupabaseClient,
  currentUserId: string,
  clubId: string,
  clubName: string,
): Promise<string | null> {
  const { data: conv } = await supabase
    .from('conversations')
    .select('id')
    .eq('club_id', clubId)
    .eq('is_group', true)
    .maybeSingle()
  if (conv?.id) return conv.id as string

  const { data: created, error: cErr } = await supabase
    .from('conversations')
    .insert({ is_group: true, title: clubName, club_id: clubId, created_by: currentUserId })
    .select('id')
    .single()
  if (cErr || !created) return null

  // lägg till alla nuvarande medlemmar
  const { data: members } = await supabase
    .from('club_members')
    .select('user_id, role')
    .eq('club_id', clubId)
  if (members && members.length > 0) {
    const rows = members.map(m => ({
      conversation_id: created.id,
      user_id: m.user_id as string,
      role: (m.role as 'owner' | 'admin' | 'member') ?? 'member',
    }))
    await supabase.from('conversation_participants').insert(rows)
  }
  return created.id as string
}
