import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import OnboardingFlow from './OnboardingFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Välkommen till Svalla',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function OnboardingPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/logga-in?returnTo=/onboarding')
  }

  // Hämta nuvarande user-rad — redirecta om redan onboardad
  const { data: profile } = await supabase
    .from('users')
    .select('id, username, onboarded_at, vessel_model, home_port')
    .eq('id', user.id)
    .maybeSingle()

  if (profile?.onboarded_at) {
    redirect('/feed')
  }

  // Hitta toppanvändare som suggestions för "följ 3"
  const { data: suggestions } = await supabase
    .from('users')
    .select('id, username, avatar, vessel_model, home_port')
    .neq('id', user.id)
    .not('username', 'is', null)
    .order('updated_at', { ascending: false, nullsFirst: false })
    .limit(8)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a1f2b 0%, #1a4a5e 60%, #24697f 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 16px',
    }}>
      <OnboardingFlow
        userId={user.id}
        initialUsername={profile?.username ?? ''}
        suggestions={(suggestions ?? []).map(s => ({
          id: s.id,
          username: s.username ?? '',
          avatar: s.avatar ?? null,
          vessel_model: s.vessel_model ?? null,
          home_port: s.home_port ?? null,
        }))}
      />
    </main>
  )
}
