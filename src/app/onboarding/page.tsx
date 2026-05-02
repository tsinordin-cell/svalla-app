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
      background: 'linear-gradient(160deg, #061826 0%, #0e3848 30%, #1a5d72 65%, #24798e 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 16px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtila ljuseffekter — premium-känsla */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 60% 40% at 80% 10%, rgba(45,125,138,0.30) 0%, transparent 60%),' +
          'radial-gradient(ellipse 50% 30% at 10% 90%, rgba(232,146,74,0.16) 0%, transparent 65%)',
      }}/>
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.5,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px),' +
          'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '90px 90px, 56px 56px',
        backgroundPosition: '0 0, 45px 45px',
      }}/>

      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
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
      </div>
    </main>
  )
}
