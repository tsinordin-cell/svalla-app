import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import TeamDashboardClient from './TeamDashboardClient'
import { GUIDES } from '@/app/guider/guides-data'
import { ALL_ISLANDS } from '@/app/o/island-data'
import { REVENUE_YEARLY_SEK, TRAFFIC_OVERRIDE } from '@/app/admin/malet/config'
import { baraManniskor } from '@/lib/analytics-filter'
import { getGsc, summarize } from '@/lib/gsc'
import type { KpiValues } from './roadmap-config'
import type { Milestone, RoadmapMerits, RoadmapTraffic } from './RoadmapView'

export const dynamic = 'force-dynamic'

// users.username är ett sajt-brett fält (profilsidor, forum, loppis,
// @mentions m.m. — se src/app/u/[username]) så vi byter INTE värdet i
// databasen. Overriden här gäller bara vad /team visar, för visningsnamn
// och avatar-initialer som inte matchar det publika användarnamnet.
// Nycklarna är de faktiska username-värdena i databasen (verifierade mot
// produktion: 'tsinordin' och 'Matte') — matchas skiftlägesokänsligt.
const TEAM_DISPLAY: Record<string, { name: string; initials: string }> = {
  tsinordin: { name: 'Tom', initials: 'TN' },
  matte: { name: 'Max', initials: 'MB' },
}

type TeamDisplayUser = {
  id: string
  username: string
  avatar: string | null
  initials: string | null
}

function applyTeamDisplay(u: { id: string; username: string; avatar?: string | null }): TeamDisplayUser {
  const override = TEAM_DISPLAY[u.username.toLowerCase()]
  return {
    id: u.id,
    username: override?.name ?? u.username,
    avatar: u.avatar ?? null,
    initials: override?.initials ?? null,
  }
}

export default async function TeamPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/team')

  const { data: userRow } = await supabase
    .from('users')
    .select('id, username, is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  // Service-role för snabb, samlad initial-hämtning (RLS gäller ändå
  // för alla efterföljande skriv/läs som klienten gör direkt mot Supabase).
  const service = getAdminClient()

  const [
    { data: teamMembers },
    { data: projects },
    { data: tasks },
    { data: prompts },
    { data: activity },
    { data: milestones },
    usersCount,
    subsCount,
    partnersCount,
    placesCount,
    tasksDoneCount,
    events,
    gsc,
  ] = await Promise.all([
    service.from('users').select('id, username, avatar').eq('is_admin', true).order('username'),
    service.from('team_projects').select('*').order('created_at', { ascending: true }),
    service.from('team_tasks').select('*').order('created_at', { ascending: false }),
    service.from('team_prompts').select('*').order('created_at', { ascending: false }),
    service.from('team_activity').select('*').order('created_at', { ascending: false }).limit(60),
    // ── Roadmap: milstolpar + live-siffror (samma räkning som /admin/malet) ──
    service.from('team_milestones').select('*').order('sort', { ascending: true }),
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('email_subscribers').select('*', { count: 'exact', head: true }).eq('unsubscribed', false),
    service.from('partner_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    service.from('restaurants').select('*', { count: 'exact', head: true }),
    service.from('team_tasks').select('*', { count: 'exact', head: true }).eq('status', 'done'),
    service.from('analytics_events')
      .select('session_id, event_name, country_code, user_agent, props')
      .in('event_name', ['page_viewed', 'outbound_clicked'])
      .gte('created_at', new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString())
      .limit(50_000),
    getGsc(),
  ])

  // Agentsessioner bort — se src/lib/analytics-filter.ts.
  const rows = baraManniskor(events.data ?? [])
  const sessions = new Set(rows.filter(r => r.event_name === 'page_viewed').map(r => r.session_id).filter(Boolean)).size
  const pageviews = rows.filter(r => r.event_name === 'page_viewed').length
  const outbound = rows.filter(r =>
    r.event_name === 'outbound_clicked' &&
    (r as { props?: Record<string, unknown> | null }).props?.['kategori'] !== 'kalla').length

  const gscSummary = gsc.ok ? summarize(gsc.days) : null
  // Egen mätning kräver samtycke och underskattar. Google-klick fångar den
  // organiska delen utan samtycke. Den största av de två är närmast sanningen.
  const visitors = Math.max(sessions, gscSummary?.clicks28 ?? 0)

  const kpis: KpiValues = {
    sessions: TRAFFIC_OVERRIDE > 0 ? TRAFFIC_OVERRIDE : visitors,
    subs: subsCount.count ?? 0,
    partners: partnersCount.count ?? 0,
    revenue: REVENUE_YEARLY_SEK,
    users: usersCount.count ?? 0,
    guides: GUIDES.length,
    islands: ALL_ISLANDS.length,
  }
  const merits: RoadmapMerits = {
    daysSinceStart: Math.floor((Date.now() - Date.UTC(2026, 3, 16)) / 86_400_000) + 1,
    places: placesCount.count ?? 0,
    tasksDone: tasksDoneCount.count ?? 0,
  }
  const traffic: RoadmapTraffic = {
    own: { sessions, pageviews, outbound },
    gsc: gsc.ok
      ? { ok: true, property: gsc.property, fetchedAt: gsc.fetchedAt, summary: gscSummary!, topQueries: gsc.topQueries, topPages: gsc.topPages }
      : { ok: false, reason: gsc.reason, clientEmail: gsc.clientEmail ?? null },
  }

  return (
    <TeamDashboardClient
      currentUser={applyTeamDisplay({ id: user.id, username: userRow.username })}
      teamMembers={(teamMembers ?? []).map(applyTeamDisplay)}
      initialProjects={projects ?? []}
      initialTasks={tasks ?? []}
      initialPrompts={prompts ?? []}
      initialActivity={activity ?? []}
      roadmap={{ kpis, merits, traffic, milestones: (milestones ?? []) as Milestone[] }}
    />
  )
}
