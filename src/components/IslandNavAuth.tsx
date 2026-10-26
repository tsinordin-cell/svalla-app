'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

/**
 * IslandNavAuth — högerdelen av ösidornas sidhuvud.
 *
 * Bakgrund (appgenomgången 2026-09-28): ösidorna är de sidor Google skickar
 * besökare till, men sidhuvudet hade bara "← Alla öar" och en nyhetsbrevsknapp.
 * Startsidan har "Logga in" och "Kom igång"; ösidorna hade ingen väg in i appen
 * alls. Mätt: 592 sessioner på 30 dagar gav 4 konton.
 *
 * Nu: utloggad ser samma "Logga in" + "Kom igång →" som på startsidan, med
 * returTo till ön så hon kommer tillbaka. Inloggad ser "Min skärgård" med sin
 * avatar. Nyhetsbrevet finns kvar längre ner på sidan under "Mer om …".
 *
 * Ösidan är statisk (ISR), så inloggningsläget avgörs i webbläsaren. Tills det
 * är känt renderas en osynlig platshållare med samma bredd, så inget hoppar.
 */
export default function IslandNavAuth({ islandSlug }: { islandSlug: string }) {
  const [state, setState] = useState<'okand' | 'utloggad' | 'inloggad'>('okand')
  const [avatar, setAvatar] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) { setState('utloggad'); setAvatar(null); return }
      setState('inloggad')
      supabase.from('users').select('avatar').eq('id', session.user.id).single()
        .then(({ data }) => setAvatar(data?.avatar ?? null))
    })
    return () => subscription.unsubscribe()
  }, [])

  const returnTo = encodeURIComponent(`/o/${islandSlug}`)
  const pill: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontSize: 12, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
    borderRadius: 20, padding: '6px 13px', lineHeight: 1.2,
  }

  if (state === 'inloggad') {
    return (
      <Link href="/min-skargard" style={{
        ...pill,
        color: '#fff',
        background: 'rgba(255,255,255,0.18)',
        border: '1px solid rgba(255,255,255,0.25)',
      }} aria-label="Min skärgård">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt="" width={18} height={18} style={{ borderRadius: '50%', objectFit: 'cover' }} />
        ) : (
          <span aria-hidden style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', display: 'inline-block' }} />
        )}
        Min skärgård
      </Link>
    )
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      visibility: state === 'okand' ? 'hidden' : 'visible',
    }} aria-hidden={state === 'okand'}>
      {/* Döljs under 400 px (globals.css .o-nav-login): på de smalaste telefonerna
          får inte tre länkar plats, och "Kom igång" leder till en sida som har
          "Har redan konto? Logga in". */}
      {/* prefetch={false}: ösidorna ska inte förladda inloggningssidan för
          varje utloggad besökare, de flesta klickar aldrig på länkarna. */}
      <Link href={`/logga-in?returnTo=${returnTo}`} className="o-nav-login" prefetch={false} style={{
        color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap',
      }}>
        Logga in
      </Link>
      <Link href={`/logga-in?returnTo=${returnTo}&mode=ny`} prefetch={false} style={{
        ...pill,
        color: '#fff',
        background: 'var(--acc-knapp)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}>
        Kom igång →
      </Link>
    </div>
  )
}
