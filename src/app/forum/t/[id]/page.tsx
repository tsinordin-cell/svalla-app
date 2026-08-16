/**
 * /forum/t/[id] — shortlink som redirectar till rätt kategori/tråd-URL.
 * Används i notiser för forum_reply.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect, notFound } from 'next/navigation'

interface Props {
  params: Promise<{ id: string }>
}

// SOFT-404-SKYDD (2026-08-12): forum/loading.tsx streamar svaret, så body-ns
// notFound() gav 200 med 404-innehåll. Uppslaget här (före headers) sätter
// riktig status; kroppen återanvänder inte resultatet men frågan är en
// PK-lookup och forum-trådar byts sällan — kostnaden är försumbar.
export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: thread } = await supabase
    .from('forum_threads').select('id').eq('id', id).maybeSingle()
  if (!thread) notFound()
  return {}
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
