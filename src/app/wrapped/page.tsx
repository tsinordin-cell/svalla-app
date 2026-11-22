import { redirect } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'

// /wrapped gav 404 (granskningen 2026-11-22). Inloggad skickas man till sin
// egen säsongsrecap för i år; utloggad får en kort förklaring i stället.
// Sidan frågar vem som tittar, så den är dynamisk.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Din säsongsrecap',
  robots: { index: false, follow: true },
}

export default async function WrappedStart() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: me } = await supabase.from('users').select('username').eq('id', user.id).maybeSingle()
    if (me?.username) redirect(`/wrapped/${encodeURIComponent(me.username)}/${new Date().getFullYear()}`)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--txt)', margin: '0 0 12px' }}>Din säsongsrecap</h1>
        <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--txt2)', margin: '0 0 28px' }}>
          Logga in för att se årets turer, distans och höjdpunkter samlade på ett ställe.
        </p>
        <Link href="/logga-in?returnTo=%2Fwrapped" style={{ display: 'inline-block', padding: '12px 24px', borderRadius: 999, background: 'var(--grad-acc)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
          Logga in
        </Link>
      </div>
    </div>
  )
}
