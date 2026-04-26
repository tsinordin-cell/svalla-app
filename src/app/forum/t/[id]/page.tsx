/**
 * /forum/t/[id] — shortlink som redirectar till rätt kategori/tråd-URL.
 * Används i notiser för forum_reply.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect, notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ForumThreadShortlink({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: thread } = await supabase
    .from('forum_threads')
    .select('category_id')
    .eq('id', id)
    .single()

  if (!thread) notFound()

  redirect(`/forum/${thread.category_id}/${id}`)
}
