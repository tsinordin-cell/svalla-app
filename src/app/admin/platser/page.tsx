import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import PlatsAdminClient from './PlatsAdminClient'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AdminPlatserPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/platser')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  const { data: restaurants } = await supabase
    .from('restaurants')
    .select('id, name, island, contact_phone, website, booking_url, opening_hours, type')
    .order('name', { ascending: true })

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '24px 16px 80px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
            Redigera platser
          </h1>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
            {restaurants?.length ?? 0} platser — fyll i kontakt & bokningslänk
          </p>
        </div>
        <PlatsAdminClient restaurants={restaurants ?? []} />
      </div>
    </div>
  )
}
