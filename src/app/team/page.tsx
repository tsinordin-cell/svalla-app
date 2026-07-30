import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import TeamDashboardClient from './TeamDashboardClient'

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
  ] = await Promise.all([
    service.from('users').select('id, username, avatar').eq('is_admin', true).order('username'),
    service.from('team_projects').select('*').order('created_at', { ascending: true }),
    service.from('team_tasks').select('*').order('created_at', { ascending: false }),
    service.from('team_prompts').select('*').order('created_at', { ascending: false }),
    service.from('team_activity').select('*').order('created_at', { ascending: false }).limit(60),
  ])

  return (
    <TeamDashboardClient
      currentUser={applyTeamDisplay({ id: user.id, username: userRow.username })}
      teamMembers={(teamMembers ?? []).map(applyTeamDisplay)}
      initialProjects={projects ?? []}
      initialTasks={tasks ?? []}
      initialPrompts={prompts ?? []}
      initialActivity={activity ?? []}
    />
  )
}
