import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import OnboardingFlow from './OnboardingFlow'
import { arAutomatisktNamn, namnForslag, fornamnAv } from '@/lib/onboardingNamn'
import { ilikeExakt } from '@/lib/username'
import { tolkaTillbaka, behoverGuiden } from '@/lib/guidenForst'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Välkommen till Svalla' },
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ tillbaka?: string | string[] }> }) {
  // Sidan personen var på väg till när kontot skapades (lib/guidenForst.ts).
  const sp = await searchParams
  const tillbaka = tolkaTillbaka(Array.isArray(sp.tillbaka) ? sp.tillbaka[0] : sp.tillbaka)
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/logga-in?returnTo=/onboarding')
  }

  // Hämta nuvarande user-rad — redirecta om redan onboardad
  // Egen rad via min_profil() (integritet 2026-11-20).
  const { data: profile } = await supabase
    .rpc('min_profil')
    .maybeSingle<{ id: string; username: string | null; avatar: string | null; onboarded_at: string | null; created_at: string | null; vessel_type: string | null; vessel_model: string | null; home_port: string | null }>()

  // Guiden visas tills kontot har sett aktuell version (guide_version, 2026-11-28),
  // även för konton som gick igenom den gamla guiden.
  const { data: guide } = await supabase.from('users').select('guide_version').eq('id', user.id).maybeSingle<{ guide_version: number | null }>()
  if (!behoverGuiden(guide?.guide_version)) {
    redirect(tillbaka ?? '/feed')
  }
  // Befintligt konto: gick igenom den gamla guiden eller skapades före i går.
  const befintligt = !!profile?.onboarded_at || (!!profile?.created_at && Date.now() - new Date(profile.created_at).getTime() > 24 * 3600_000)

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

  // Namnsteget (2026-11-28): ett namn som databasen tog från e-posten föreslås
  // inte. I stället ett förslag ur personens namn (Google eller registreringen),
  // om det är ledigt. Annars är fältet tomt och personen väljer själv.
  const meta = (user.user_metadata ?? {}) as { full_name?: unknown; name?: unknown; given_name?: unknown }
  const fulltNamn = [meta.full_name, meta.name].find((v): v is string => typeof v === 'string' && v.trim().length > 0) ?? ''
  const nuvarandeNamn = profile?.username ?? ''
  const automatiskt = arAutomatisktNamn(nuvarandeNamn, user.email)
  let forslag = automatiskt ? namnForslag(fulltNamn) : nuvarandeNamn
  if (automatiskt && forslag) {
    const monster = ilikeExakt(forslag)
    const { data: upptaget } = monster
      ? await supabase.from('users').select('id').ilike('username', monster).neq('id', user.id).limit(1)
      : { data: [{ id: '' }] }
    if (upptaget && upptaget.length > 0) forslag = ''
  }
  const givet = typeof meta.given_name === 'string' ? meta.given_name.trim().slice(0, 30) : ''
  const halsning = givet || fornamnAv(fulltNamn) || (automatiskt ? '' : nuvarandeNamn)

  // Startsidans papper i stället för den mörka havsbakgrunden (2026-11-28).
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #efe7d6 0%, #f7f1e7 60%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '28px 18px 48px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <OnboardingFlow
          userId={user.id}
          halsning={halsning}
          befintligt={befintligt}
          startBat={profile?.vessel_type ?? null}
          startHamn={profile?.home_port ?? ''}
          nuvarandeNamn={nuvarandeNamn}
          namnForslag={forslag}
          avatar={profile?.avatar ?? null}
          tillbaka={tillbaka}
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
