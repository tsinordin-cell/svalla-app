import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import KoordinatKarta from './KoordinatKarta'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminKoordinaterPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/koordinater')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, name, island, latitude, longitude, type')
    .order('name', { ascending: true })

  return (
    <div style={{ minHeight: '100dvh', background: '#0d1b2a', display: 'flex', flexDirection: 'column' }}>
      <KoordinatKarta places={restaurants ?? []} />
    </div>
  )
}
