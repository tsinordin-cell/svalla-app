import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import { GUIDES } from '@/app/guider/guides-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import MaletClient from './MaletClient'

export const dynamic = 'force-dynamic'

export default async function MaletPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/malet')

  const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const service = getAdminClient()
  const [totalUsers, totalSubs, activePartners] = await Promise.all([
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('email_subscribers').select('*', { count: 'exact', head: true }).eq('unsubscribed', false),
    service.from('partner_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'active'),
  ])

  return (
    <MaletClient
      users={totalUsers.count ?? 0}
      subs={totalSubs.count ?? 0}
      partners={activePartners.count ?? 0}
      guides={GUIDES.length}
      islands={ALL_ISLANDS.length}
    />
  )
}
