import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import TeamDashboardClient from './TeamDashboardClient'

export const dynamic = 'force-dynamic'

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
  ] = await Promise.all([
    service.from('users').select('id, username, avatar').eq('is_admin', true).order('username'),
    service.from('team_projects').select('*').order('created_at', { ascending: true }),
    service.from('team_tasks').select('*').order('created_at', { ascending: false }),
    service.from('team_prompts').select('*').order('created_at', { ascending: false }),
    service.from('team_activity').select('*').order('created_at', { ascending: false }).limit(60),
  ])

  return (
    <TeamDashboardClient
      currentUser={{ id: user.id, username: userRow.username }}
      teamMembers={teamMembers ?? []}
      initialProjects={projects ?? []}
      initialTasks={tasks ?? []}
      initialPrompts={prompts ?? []}
      initialActivity={activity ?? []}
    />
  )
}
