'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

/**
 * "Skicka meddelande"-knappen på en profil. Visas bara för inloggade, och
 * inte på ens egen profil.
 *
 * VARFÖR DEN LIGGER I KLIENTEN (2026-08-02):
 * Villkoret räknades tidigare ut på servern via `auth.getUser()`. Det anropet
 * läser cookies, vilket gör hela sidan dynamisk — och då är `revalidate = 60`
 * på /u/[username] verkningslös. Sidan svarade `x-vercel-cache: MISS` på varje
 * anrop och tog 1042–2219 ms, trots att den deklarerade att den ville cachas.
 *
 * Med andra ord: en knapp avgjorde om varje profilsida kunde serveras från
 * CDN. Regeln som gäller nu är att en serversida inte får fråga vem du är för
 * att bestämma hur en knapp ser ut — sådan personalisering hör hemma här.
 * Servern får fortfarande fråga när den avgör vilken DATA du får se, eller
 * när den auktoriserar en handling.
 *
 * Grannarna i samma knapprad (FollowButton, FollowPrefsButton,
 * ProfileMoreMenu) gjorde redan precis så här. DM-knappen var den enda som
 * inte gjorde det.
 */
export default function DmButton({
  targetUserId,
  targetUsername,
}: {
  targetUserId: string
  targetUsername: string
}) {
  const supabase = useRef(createClient()).current
  const [visa, setVisa] = useState(false)

  useEffect(() => {
    let avbruten = false
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (avbruten) return
      // Inloggad, och inte sin egen profil.
      setVisa(!!user && user.id !== targetUserId)
    })
    return () => { avbruten = true }
  }, [targetUserId, supabase])

  // Renderar ingenting alls tills vi vet — knappen ska inte blinka förbi för
  // utloggade. Raden runt omkring har fast höjd, så inget hoppar till.
  if (!visa) return null

  return (
    <Link
      href={`/meddelanden/ny?to=${targetUserId}`}
      aria-label={`Skicka meddelande till ${targetUsername}`}
      title="Skicka meddelande"
      style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'rgba(10,123,140,0.10)',
        color: 'var(--sea)',
        border: '1px solid rgba(10,123,140,0.18)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        textDecoration: 'none',
        transition: 'background 0.12s, border-color 0.12s',
        flexShrink: 0,
      }}
    >
      <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </Link>
  )
}
