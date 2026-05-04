/**
 * /forum/loppis/[id]/redigera — server-page som hämtar nuvarande annons-data
 * och mountar redigera-form. Bilder och status redigeras inline på själva
 * annons-vyn (LoppisImageEditor + LoppisStatusToggle); här rör vi bara
 * titel, pris, specs, beskrivning, plats, skick, kategori, extern länk.
 */
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import LoppisEditForm from './LoppisEditForm'
import type { ListingData } from '@/lib/forum'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redigera annons — Svalla Loppis',
  robots: { index: false, follow: false },
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditListingPage({ params }: Props) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/logga-in?returnTo=/forum/loppis/${id}/redigera`)

  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, title, body, listing_data')
    .eq('id', id)
    .single()
  if (!thread || thread.category_id !== 'loppis') notFound()
  if (thread.user_id !== user.id) {
    redirect(`/forum/loppis/${id}`) // bara ägaren får redigera
  }

  const ld = (thread.listing_data ?? {}) as ListingData

  return (
    <LoppisEditForm
      threadId={thread.id}
      initial={{
        title:         thread.title,
        body:          (thread.body ?? '').trim() === '' ? '' : thread.body,
        price:         typeof ld.price === 'number' ? String(ld.price) : '',
        condition:     ld.condition ?? 'Bra',
        category:      ld.category ?? 'Båt',
        location:      ld.location ?? '',
        externalLink:  ld.external_link ?? '',
        specs:         Array.isArray(ld.specs) && ld.specs.length > 0
                       ? ld.specs
                       : [{ label: 'Modell', value: '' }, { label: 'Årsmodell', value: '' }],
      }}
    />
  )
}
