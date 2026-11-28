/**
 * Stories — 24h highlights. Bild + kort caption + valfri position.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type Story = {
  id: string
  user_id: string
  image: string | null
  caption: string | null
  lat: number | null
  lng: number | null
  location_name: string | null
  created_at: string
  expires_at: string
  username?: string
  avatar?: string | null
  views_count?: number
  viewed_by_me?: boolean
}

export async function createStory(
  _supabase: SupabaseClient,
  _userId: string,
  _input: { image: string; caption?: string | null; lat?: number | null; lng?: number | null; location_name?: string | null },
): Promise<Story | null> {
  // Tabellen stories finns inte. Skapandet gav 404 och returnerade null.
  return null
}

/** Hämta aktiva stories grupperade per användare. RLS filtrerar utgångna. */
export async function listActiveStoriesGrouped(
  _supabase: SupabaseClient,
  _currentUserId: string | null,
): Promise<Array<{ user_id: string; username: string; avatar: string | null; stories: Story[]; viewed_all: boolean }>> {
  // Tabellen stories finns inte. Flödet fick 404 och en tom lista, och strippen
  // ritas inte alls när listan är tom.
  return []
}

export async function recordStoryView(
  supabase: SupabaseClient,
  userId: string,
  storyId: string,
): Promise<void> {
  await supabase
    .from('story_views')
    .upsert({ story_id: storyId, user_id: userId }, { onConflict: 'story_id,user_id' })
}

export async function deleteStory(
  _supabase: SupabaseClient,
  _storyId: string,
): Promise<boolean> {
  // Tabellen stories finns inte. Borttagning gav 404 och false.
  return false
}
