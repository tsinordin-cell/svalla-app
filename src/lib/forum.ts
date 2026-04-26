/**
 * Forum helpers — Svalla.se
 * Server-side helpers that talk to Supabase forum_* tables.
 */

import { createServerSupabaseClient } from '@/lib/supabase-server'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ForumCategory {
  id: string
  name: string
  description: string | null
  icon: string
  sort_order: number
  thread_count: number
  post_count: number
}

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
  // enriched
  author?: { username: string; avatar: string | null } | null
  last_reply_author?: { username: string } | null
}

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
}

// ─── Static fallback (shown before SQL migration is run) ─────────────────────

export const STATIC_CATEGORIES: ForumCategory[] = [
  { id: 'segling',          name: 'Segling',            description: 'Segelteknik, rutter, rigg och utrustning',      icon: '⛵',  sort_order: 1, thread_count: 0, post_count: 0 },
  { id: 'motorbat',         name: 'Motorbåt',           description: 'Motorteknik, bränsle, navigation och service',  icon: '🚤', sort_order: 2, thread_count: 0, post_count: 0 },
  { id: 'fiske',            name: 'Fiske',              description: 'Fiskeplatser, regler, spön och drag',           icon: '🎣', sort_order: 3, thread_count: 0, post_count: 0 },
  { id: 'paddling',         name: 'Paddling',           description: 'Kajak, SUP, kanot — allt som paddlas',          icon: '🛶', sort_order: 4, thread_count: 0, post_count: 0 },
  { id: 'vader-sakerhet',   name: 'Väder & säkerhet',   description: 'SMHI-tips, passageplanering och nödlägen',      icon: '🌤️', sort_order: 5, thread_count: 0, post_count: 0 },
  { id: 'teknik-underhall', name: 'Teknik & underhåll', description: 'Motor, elektronik, rigg och verkstad',          icon: '🔧', sort_order: 6, thread_count: 0, post_count: 0 },
  { id: 'hamnar-bryggor',   name: 'Hamnar & bryggor',   description: 'Gästhamnstips, avgifter, ankringsplatser',      icon: '⚓', sort_order: 7, thread_count: 0, post_count: 0 },
  { id: 'nybörjare',        name: 'Nybörjare',          description: 'Inga dumma frågor — fråga allt här',            icon: '👋', sort_order: 8, thread_count: 0, post_count: 0 },
  { id: 'loppis',           name: 'Loppis & köp/sälj',  description: 'Utrustning, båtar, delar och evenemang',        icon: '💰', sort_order: 9, thread_count: 0, post_count: 0 },
]

// ─── Queries ─────────────────────────────────────────────────────────────────

export async function getForumCategories(): Promise<ForumCategory[]> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('forum_categories')
      .select('id, name, description, icon, sort_order, thread_count, post_count')
      .order('sort_order')
    if (error || !data) return STATIC_CATEGORIES
    return data as ForumCategory[]
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
    return (data as ForumCategory) ?? null
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
      .select('id, category_id, user_id, title, body, is_pinned, is_locked, view_count, reply_count, last_reply_at, in_spam_queue, created_at')
      .eq('category_id', categoryId)
      .eq('in_spam_queue', false)
      .order('is_pinned', { ascending: false })
      .order('last_reply_at', { ascending: false })
      .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1)

    if (!data) return []

    // Enrich with author names
    const userIds = [...new Set(data.map(t => t.user_id))]
    const { data: users } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', userIds)

    const userMap = new Map((users ?? []).map((u: { id: string; username: string; avatar: string | null }) => [u.id, u]))
    return data.map(t => ({
      ...t,
      author: userMap.get(t.user_id) ?? null,
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

export async function getPostsByThread(threadId: string): Promise<ForumPost[]> {
  try {
    const supabase = await createServerSupabaseClient()
    const { data } = await supabase
      .from('forum_posts')
      .select('id, thread_id, user_id, body, is_deleted, in_spam_queue, created_at')
      .eq('thread_id', threadId)
      .eq('in_spam_queue', false)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true })

    if (!data) return []

    const userIds = [...new Set(data.map(p => p.user_id))]
    const { data: users } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', userIds)

    const userMap = new Map((users ?? []).map((u: { id: string; username: string; avatar: string | null }) => [u.id, u]))
    return data.map(p => ({
      ...p,
      author: userMap.get(p.user_id) ?? null,
    })) as ForumPost[]
  } catch {
    return []
  }
}

/** Antal godkända (ej spam-köade) forum_posts + forum_threads av en användare. */
export async function getUserForumPostCount(userId: string): Promise<number> {
  try {
    const supabase = await createServerSupabaseClient()
    const [{ count: tc }, { count: pc }] = await Promise.all([
      supabase.from('forum_threads').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('in_spam_queue', false),
      supabase.from('forum_posts').select('id', { count: 'exact', head: true }).eq('user_id', userId).eq('in_spam_queue', false),
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
