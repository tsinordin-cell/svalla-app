/**
 * Forum helpers — Svalla.se
 * Server-side helpers that talk to Supabase forum_* tables.
 * ⚠️  Importera INTE denna fil i 'use client'-komponenter — den använder next/headers.
 *     Använd '@/lib/forum-categories' för statisk data i klient-komponenter.
 */

import { createServerSupabaseClient } from '@/lib/supabase-server'

// Re-exportera typer + statisk data från den client-säkra filen
export type { ForumCategory } from '@/lib/forum-categories'
export { STATIC_CATEGORIES } from '@/lib/forum-categories'
import type { ForumCategory } from '@/lib/forum-categories'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ForumThread {
  id: string
  category_id: string
  user_id: string
  title: string
  body: string
  is_pinned: boolean
  is_locked: boolean
  view_count: number
  reply_count: number
  last_reply_at: string
  in_spam_queue: boolean
  created_at: string
  best_post_id?: string | null
  is_solved?: boolean
  // enriched
  author?: { username: string; avatar: string | null } | null
  last_reply_author?: { username: string } | null
}

export type ForumSort = 'nyast' | 'hjalpsamma' | 'aldst'

export interface ForumPost {
  id: string
  thread_id: string
  user_id: string
  body: string
  is_deleted: boolean
  in_spam_queue: boolean
  created_at: string
  // enriched
  author?: { username: string; avatar: string | null } | null
  like_count?: number
  liked_by_user?: boolean
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Slår ihop databasrad med statisk kategori-info.
 *
 * forum_categories-tabellen i Supabase saknar kolumnerna `iconName` och
 * `iconColor` — de finns bara i den statiska TS-listan. Det här hjälpfältet
 * tar Supabase-data (för senaste thread_count/post_count) och fyller på med
 * iconName + iconColor från STATIC_CATEGORIES så UI:n inte kraschar när den
 * läser cat.iconName.
 */
function mergeWithStatic(dbRow: Partial<ForumCategory> & { id: string }): ForumCategory | null {
  const staticCat = STATIC_CATEGORIES.find(c => c.id === dbRow.id)
  if (!staticCat) return null
  return {
    ...staticCat,
    ...dbRow,
    // Säkerställ att icon-fälten alltid kommer från STATIC (DB:n har dem ej).
    iconName: staticCat.iconName,
    iconColor: staticCat.iconColor,
    icon: staticCat.icon,
  }
}

export async function getForumCategories(): Promise<ForumCategory[]> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('forum_categories')
      .select('id, name, description, icon, sort_order, thread_count, post_count')
      .order('sort_order')
    if (error || !data) return STATIC_CATEGORIES
    const merged = (data as Array<Partial<ForumCategory> & { id: string }>)
      .map(mergeWithStatic)
      .filter((c): c is ForumCategory => c !== null)
    return merged.length > 0 ? merged : STATIC_CATEGORIES
  } catch {
    return STATIC_CATEGORIES
  }
}

export async function getCategoryById(id: string): Promise<ForumCategory | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('forum_categories')
      .select('id, name, description, icon, sort_order, thread_count, post_count')
      .eq('id', id)
      .single()
    if (data) {
      const merged = mergeWithStatic(data as Partial<ForumCategory> & { id: string })
      if (merged) return merged
    }
    return STATIC_CATEGORIES.find(c => c.id === id) ?? null
  } catch {
    return STATIC_CATEGORIES.find(c => c.id === id) ?? null
  }
}

export async function getThreadsByCategory(categoryId: string, page = 0): Promise<ForumThread[]> {
  const PAGE_SIZE = 30
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('forum_threads')
      .select('id, category_id, user_id, title, body, is_pinned, is_locked, view_count, reply_count, last_reply_at, last_reply_user_id, in_spam_queue, created_at')
      .eq('category_id', categoryId)
      .eq('in_spam_queue', false)
      .order('is_pinned', { ascending: false })
      .order('last_reply_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (!data) return []

    // Enrich with author names + last reply authors
    const authorIds = [...new Set(data.map(t => t.user_id))]
    const lastReplyIds = data
      .map(t => t.last_reply_user_id)
      .filter((id): id is string => !!id && !authorIds.includes(id))
    const allUserIds = [...new Set([...authorIds, ...lastReplyIds])]

    const { data: users } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', allUserIds)

    const userMap = new Map((users ?? []).map((u: { id: string; username: string; avatar: string | null }) => [u.id, u]))
    return data.map(t => ({
      ...t,
      author: userMap.get(t.user_id) ?? null,
      last_reply_author: t.last_reply_user_id
        ? (userMap.get(t.last_reply_user_id) ? { username: userMap.get(t.last_reply_user_id)!.username } : null)
        : null,
    })) as ForumThread[]
  } catch {
    return []
  }
}

export async function getThreadById(id: string): Promise<ForumThread | null> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: thread } = await supabase
      .from('forum_threads')
      .select('*')
      .eq('id', id)
      .eq('in_spam_queue', false)
      .single()
    if (!thread) return null

    const { data: author } = await supabase
      .from('users')
      .select('id, username, avatar')
      .eq('id', thread.user_id)
      .single()

    return { ...thread, author } as ForumThread
  } catch {
    return null
  }
}

export async function getPostsByThread(
  threadId: string,
  userId?: string | null,
  opts?: { sort?: ForumSort; bestPostId?: string | null },
): Promise<ForumPost[]> {
  const sort: ForumSort = opts?.sort ?? 'aldst'
  const bestPostId = opts?.bestPostId ?? null
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('forum_posts')
      .select('id, thread_id, user_id, body, is_deleted, in_spam_queue, created_at')
      .eq('thread_id', threadId)
      .eq('in_spam_queue', false)
      .eq('is_deleted', false)
      .order('created_at', { ascending: sort !== 'nyast' })

    if (!data) return []

    const postIds = data.map(p => p.id)
    const userIds = [...new Set(data.map(p => p.user_id))]

    // Batch: authors + like counts + user-liked
    const [usersResult, likeCountsResult, userLikedResult] = await Promise.all([
      supabase.from('users').select('id, username, avatar').in('id', userIds),
      postIds.length > 0
        ? supabase.from('forum_post_likes').select('post_id').in('post_id', postIds)
        : Promise.resolve({ data: [] }),
      userId && postIds.length > 0
        ? supabase.from('forum_post_likes').select('post_id').in('post_id', postIds).eq('user_id', userId)
        : Promise.resolve({ data: [] }),
    ])

    const userMap = new Map((usersResult.data ?? []).map((u: { id: string; username: string; avatar: string | null }) => [u.id, u]))

    // Count likes per post
    const likeCountMap = new Map<string, number>()
    for (const row of (likeCountsResult.data ?? [])) {
      likeCountMap.set(row.post_id, (likeCountMap.get(row.post_id) ?? 0) + 1)
    }

    // Set of posts liked by current user
    const likedByUser = new Set((userLikedResult.data ?? []).map((r: { post_id: string }) => r.post_id))

    let posts = data.map(p => ({
      ...p,
      author: userMap.get(p.user_id) ?? null,
      like_count: likeCountMap.get(p.id) ?? 0,
      liked_by_user: likedByUser.has(p.id),
    })) as ForumPost[]

    // Mest hjälpsamma: sortera efter like_count desc, sen tid
    if (sort === 'hjalpsamma') {
      posts.sort((a, b) => (b.like_count ?? 0) - (a.like_count ?? 0) || a.created_at.localeCompare(b.created_at))
    }

    // Bästa svar alltid först (om markerat och vi inte sorterar by hjälpsamma — där den ändå hamnar topp pga likes oftast)
    if (bestPostId) {
      const idx = posts.findIndex(p => p.id === bestPostId)
      if (idx > 0) {
        const [best] = posts.splice(idx, 1)
        if (best) posts = [best, ...posts]
      }
    }

    return posts
  } catch {
    return []
  }
}

/**
 * Antal godkända (ej spam-köade) forum_posts + forum_threads av en användare
 * under de senaste 30 dagarna.
 *
 * Rullande 30-dagarsfönster istället för all-time count — förhindrar att
 * gamla inlägg permanent whitelistar ett konto som sedan beter sig dåligt.
 */
export async function getUserForumPostCount(userId: string): Promise<number> {
  try {
    const supabase = await createServerSupabaseClient()
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const [{ count: tc }, { count: pc }] = await Promise.all([
      supabase.from('forum_threads').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('in_spam_queue', false).gte('created_at', since),
      supabase.from('forum_posts').select('id', { count: 'exact', head: true })
        .eq('user_id', userId).eq('in_spam_queue', false).gte('created_at', since),
    ])
    return (tc ?? 0) + (pc ?? 0)
  } catch {
    return 0
  }
}

// ─── Formatters ──────────────────────────────────────────────────────────────

export function formatForumDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  if (diffMin < 2)   return 'just nu'
  if (diffMin < 60)  return `${diffMin} min sedan`
  const diffH = Math.floor(diffMin / 60)
  if (diffH < 24)    return `${diffH} tim sedan`
  const diffD = Math.floor(diffH / 24)
  if (diffD < 7)     return `${diffD} dag${diffD > 1 ? 'ar' : ''} sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}
