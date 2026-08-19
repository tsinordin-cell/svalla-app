import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import { GUIDES } from '@/app/guider/guides-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { TRAFFIC_OVERRIDE } from './config'
import MaletClient from './MaletClient'

export const dynamic = 'force-dynamic'

export default async function MaletPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/malet')

  const { data: userRow } = await supabase.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const service = getAdminClient()
  const since30d = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString()

  const [totalUsers, totalSubs, activePartners, events, places] = await Promise.all([
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('email_subscribers').select('*', { count: 'exact', head: true }).eq('unsubscribed', false),
    service.from('partner_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    // Trafik: unika sessioner + sidvisningar senaste 30 dygnen.
    service.from('analytics_events').select('session_id, event_name').gte('created_at', since30d).limit(50_000),
    // Antal företagssidor vi redan har — underlag för anspråkskampanjen.
    service.from('restaurants').select('*', { count: 'exact', head: true }),
  ])

  const rows = events.data ?? []
  const sessions = new Set(rows.map(r => r.session_id).filter(Boolean)).size
  const pageviews = rows.filter(r => r.event_name === 'page_viewed').length

  return (
    <MaletClient
      users={totalUsers.count ?? 0}
      subs={totalSubs.count ?? 0}
      partners={activePartners.count ?? 0}
      guides={GUIDES.length}
      islands={ALL_ISLANDS.length}
      places={places.count ?? 0}
      sessions={TRAFFIC_OVERRIDE > 0 ? TRAFFIC_OVERRIDE : sessions}
      pageviews={pageviews}
      isLiveTraffic={TRAFFIC_OVERRIDE === 0}
    />
  )
}
