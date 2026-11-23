import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import OnboardingFlow from './OnboardingFlow'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Välkommen till Svalla' },
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
  // Egen rad via min_profil() (integritet 2026-11-20).
  const { data: profile } = await supabase
    .rpc('min_profil')
    .maybeSingle<{ id: string; username: string | null; onboarded_at: string | null; vessel_model: string | null; home_port: string | null }>()

  if (profile?.onboarded_at) {
    redirect('/feed')
  }

  // Förslag i "Följ några seglare": konton som har minst en publik tur, senaste
  // turen först. Tidigare föreslogs de senast skapade kontona, och inget av dem
  // hade en tur att visa i flödet (mätt 19 nov 2026).
  // users_publik: bara fält personen valt att visa (integritet 2026-11-20).
  // boat_type finns inte i vyn; vessel_type är samma val och visas om det är publikt.
  const FALT = 'id, username, avatar, vessel_model, home_port, boat_type:vessel_type'
  type Forslag = {
    id: string
    username: string | null
    avatar: string | null
    vessel_model: string | null
    home_port: string | null
    boat_type: string | null
  }

  const { data: turer } = await supabase
    .from('trips')
    .select('user_id')
    .eq('visibility', 'public')
    .eq('status', 'done')
    .is('deleted_at', null)
    .neq('user_id', user.id)
    .order('started_at', { ascending: false })
    .limit(60)
  const ordning: string[] = []
  for (const t of turer ?? []) {
    const id = t.user_id as string | null
    if (id && !ordning.includes(id)) ordning.push(id)
  }
  const ids = ordning.slice(0, 8)

  let medTurer: Forslag[] = []
  if (ids.length > 0) {
    const { data } = await supabase.from('users_publik').select(FALT).in('id', ids).not('username', 'is', null)
    medTurer = ((data ?? []) as Forslag[]).sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id))
  }

  // Vännen som delade länken står först. Namnet kommer från kakan som
  // /kom-igang sätter när adressen hade ?from=.
  const kakor = await cookies()
  let vanNamn = ''
  try {
    vanNamn = decodeURIComponent(kakor.get('svalla_van')?.value ?? '')
  } catch { /* trasig kaka: ingen vän */ }
  let van: Forslag | null = null
  if (/^[A-Za-z0-9_.-]{1,40}$/.test(vanNamn)) {
    const { data } = await supabase.from('users_publik').select(FALT).eq('username', vanNamn).neq('id', user.id).maybeSingle()
    van = (data as Forslag | null) ?? null
  }

  const suggestions: (Forslag & { van?: boolean })[] = [...(van ? [{ ...van, van: true }] : []), ...medTurer.filter(s => s.id !== van?.id)]

  return (
    <div style={{
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
          suggestions={suggestions.map(s => ({
            id: s.id,
            username: s.username ?? '',
            avatar: s.avatar ?? null,
            vessel_model: s.vessel_model ?? null,
            home_port: s.home_port ?? null,
            boat_type: s.boat_type ?? null,
            van: s.van === true,
          }))}
        />
      </div>
    </div>
  )
}
