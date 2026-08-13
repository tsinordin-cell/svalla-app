'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { createClient, getViewer } from '@/lib/supabase'

/**
 * Fixed signup-banner längst ner på en delad tur — bara för utloggade.
 *
 * Låg tidigare direkt i /tur/[id]/page.tsx bakom serverns `isLoggedIn`, som
 * krävde auth.getUser() → cookies → hela sidan blev dynamisk och kunde
 * aldrig cachas (se ViewerGate.tsx för hela resonemanget).
 *
 * Spacern är poängen med att bannern äger sin egen plats: sidan behöver inte
 * längre olika paddingBottom för in-/utloggade (tidigare 100px mot nav-höjd),
 * eftersom spacern bara finns när bannern finns. Därmed kan sidans layout
 * vara identisk i den cachade HTML:en för alla besökare.
 */
export default function TripSignupCta({
  headline,
  sub,
  username,
}: {
  headline: string
  sub: string
  username: string
}) {
  const supabase = useRef(createClient()).current
  const [visa, setVisa] = useState(false)

  useEffect(() => {
    let avbruten = false
    getViewer(supabase).then(({ data: { user } }) => {
      if (!avbruten) setVisa(!user)
    })
    return () => { avbruten = true }
  }, [supabase])

  if (!visa) return null

  return (
    <>
      {/* Spacer i flödet så den fixed bannern inte täcker sidans innehåll */}
      <div style={{ height: 100 }} aria-hidden="true" />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: 'linear-gradient(135deg, #0d2240, #1a4a5e)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '16px 20px',
        paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        display: 'flex', alignItems: 'center', gap: 16,
        boxShadow: '0 -8px 32px rgba(0,20,40,0.35)',
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 3 }}>
            {headline}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>
            {sub}
          </div>
        </div>
        <Link href={`/kom-igang?ref=tur&from=${encodeURIComponent(username)}`} style={{
          flexShrink: 0,
          padding: '12px 20px', borderRadius: 14,
          background: 'var(--grad-acc)',
          color: '#fff', fontWeight: 600, fontSize: 14,
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(201,110,42,0.45)',
          whiteSpace: 'nowrap',
        }}>
          Kom igång →
        </Link>
      </div>
    </>
  )
}
