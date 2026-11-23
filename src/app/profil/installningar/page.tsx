import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import InstallningarInnehall from './InstallningarInnehall'

export const metadata: Metadata = {
  title: 'Inställningar',
  robots: { index: false, follow: false },
}

/** Inställningar för inloggade: tema, språk, Logga ut och Radera konto (menyförslaget 2026-11-23). */
export default async function InstallningarPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?returnTo=/profil/installningar')
  return <InstallningarInnehall />
}
