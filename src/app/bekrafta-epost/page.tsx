'use client'
/**
 * Hit leder länken i bekräftelsemejlet för nya konton (2026-11-21).
 * Se src/lib/epostbekraftelse.ts.
 *
 * Bekräftelsen görs i webbläsaren (inte i en serverrutt) av samma skäl som på
 * /nytt-losenord: säkerhetsprogram som förhandsläser länkar i mejl kör en GET
 * men sällan JavaScript, och skulle annars förbruka engångslänken innan
 * mottagaren hinner trycka.
 */
import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { sakerNasta } from '@/lib/epostbekraftelse'

type Lage = 'bekraftar' | 'klar' | 'fel'

function Bekrafta() {
  const router = useRouter()
  const sp = useSearchParams()
  const [lage, setLage] = useState<Lage>('bekraftar')
  const [nasta, setNasta] = useState('/feed')
  const startad = useRef(false)

  useEffect(() => {
    if (startad.current) return
    startad.current = true
    const tokenHash = sp.get('token_hash')
    const typ = sp.get('type') === 'signup' ? 'signup' : 'email'
    const mal = sakerNasta(sp.get('next'), window.location.origin)
    setNasta(mal)
    ;(async () => {
      const supabase = createClient()
      let ok = false
      if (tokenHash) {
        try {
          const { error } = await supabase.auth.verifyOtp({ type: typ, token_hash: tokenHash })
          ok = !error
          if (error) console.error('[bekrafta-epost] verifyOtp:', error.message)
        } catch (e) {
          console.error('[bekrafta-epost] verifyOtp kastade:', e)
        }
      }
      if (!ok) {
        // Redan använd länk men inloggad i den här webbläsaren (t.ex. tryckt två gånger)
        const { data: { session } } = await supabase.auth.getSession()
        if (session) { router.replace(mal); return }
        setLage('fel')
        return
      }
      setLage('klar')
      // Välkomstmejlet går först nu, när adressen är bekräftad (post-signup
      // godtar ett konto som bekräftats de senaste minuterna).
      try { await fetch('/api/auth/post-signup', { method: 'POST', keepalive: true }) } catch { /* ignoreras */ }
      router.replace(mal)
    })()
  }, [sp, router])

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(180deg, #0e3d52 0%, #1e5c82 50%, #f7fbfc 100%)',
    }}>
      <div style={{ flex: '0 0 auto', padding: '48px 24px 36px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
          {lage === 'fel' ? 'Länken fungerar inte' : 'Bekräftar din e-post'}
        </h1>
      </div>
      <div style={{
        flex: 1, background: 'var(--bg)', borderRadius: '28px 28px 0 0',
        padding: '32px 24px', boxShadow: '0 -8px 32px rgba(0,30,50,0.15)',
      }}>
        <div role="status" style={{ maxWidth: 400, margin: '0 auto', textAlign: 'center' }}>
          {lage === 'bekraftar' && <p style={{ fontSize: 15, color: 'var(--txt2)', margin: 0 }}>Ett ögonblick…</p>}
          {lage === 'klar' && <p style={{ fontSize: 15, color: 'var(--txt2)', margin: 0 }}>Klart! Du skickas vidare…</p>}
          {lage === 'fel' && (
            <>
              <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 8px' }}>
                Länken har redan använts eller gått ut.
              </p>
              <p style={{ fontSize: 14, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 24px' }}>
                Har du redan bekräftat kan du logga in direkt. Annars loggar du in med din e-post och ditt lösenord, så kan du skicka en ny länk därifrån.
              </p>
              <Link href={`/logga-in?returnTo=${encodeURIComponent(nasta)}&mode=login`} className="press-feedback" style={{
                display: 'block', width: '100%', boxSizing: 'border-box', padding: '15px 0', borderRadius: 16,
                background: 'var(--grad-sea)', color: '#fff', fontWeight: 600, fontSize: 16, textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(30,92,130,0.35)',
              }}>
                Till inloggningen
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BekraftaEpostPage() {
  return (
    <Suspense fallback={null}>
      <Bekrafta />
    </Suspense>
  )
}
