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
  supabase: SupabaseClient,
  userId: string,
  input: { image: string; caption?: string | null; lat?: number | null; lng?: number | null; location_name?: string | null },
): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .insert({
      user_id: userId,
      image: input.image,
      caption: input.caption?.slice(0, 200) ?? null,
      lat: input.lat ?? null,
      lng: input.lng ?? null,
      location_name: input.location_name ?? null,
    })
    .select('id, user_id, image, caption, lat, lng, location_name, created_at, expires_at')
    .single()
  if (error || !data) return null
  return data as Story
}

/** Hämta aktiva stories grupperade per användare. RLS filtrerar utgångna. */
export async function listActiveStoriesGrouped(
  supabase: SupabaseClient,
  currentUserId: string | null,
): Promise<Array<{ user_id: string; username: string; avatar: string | null; stories: Story[]; viewed_all: boolean }>> {
  const { data: rows } = await supabase
    .from('stories')
    .select('id, user_id, image, caption, lat, lng, location_name, created_at, expires_at')
    .order('created_at', { ascending: false })
    .limit(200)
  if (!rows || rows.length === 0) return []

  const userIds = [...new Set(rows.map(r => r.user_id as string))]
  const { data: users } = await supabase
    .from('users').select('id, username, avatar').in('id', userIds)
  const uMap: Record<string, { username: string; avatar: string | null }> = {}
  for (const u of users ?? []) {
    uMap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
  }

  // mina visningar
  let myViews = new Set<string>()
  if (currentUserId) {
    const storyIds = rows.map(r => r.id as string)
    const { data: vs } = await supabase
      .from('story_views').select('story_id')
      .eq('user_id', currentUserId).in('story_id', storyIds)
    myViews = new Set((vs ?? []).map(v => v.story_id as string))
  }

  const grouped: Record<string, Story[]> = {}
  for (const r of rows) {
    const uid = r.user_id as string
    if (!grouped[uid]) grouped[uid] = []
    grouped[uid].push({
      ...(r as Story),
      username: uMap[uid]?.username,
      avatar: uMap[uid]?.avatar ?? null,
      viewed_by_me: myViews.has(r.id as string),
    })
  }

  // sortera: egna först, sen ej-visade, sen visade
  const out = Object.entries(grouped).map(([uid, stories]) => {
    const viewed_all = stories.every(s => s.viewed_by_me)
    return {
      user_id: uid,
      username: uMap[uid]?.username ?? 'okänd',
      avatar: uMap[uid]?.avatar ?? null,
      stories,
      viewed_all,
    }
  })
  out.sort((a, b) => {
    if (a.user_id === currentUserId) return -1
    if (b.user_id === currentUserId) return 1
    if (a.viewed_all !== b.viewed_all) return a.viewed_all ? 1 : -1
    return 0
  })
  return out
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
  supabase: SupabaseClient,
  storyId: string,
): Promise<boolean> {
  const { error } = await supabase.from('stories').delete().eq('id', storyId)
  return !error
}
