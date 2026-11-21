'use client'
/**
 * "Kolla din inkorg" efter ett nytt konto, och knappen som skickar
 * bekräftelsemejlet igen (2026-11-21). Används på /logga-in och /kom-igang.
 * Se src/lib/epostbekraftelse.ts.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'

/** Supabase tillåter ett nytt mejl till samma adress först efter en minut. */
const VANTA_SEKUNDER = 60

export function SkickaBekraftelseIgen({ epost, mal, startaMedVantan = false }: {
  epost: string
  /** emailRedirectTo, se bekraftelseMal() */
  mal: string
  /** true direkt efter att kontot skapats: ett mejl har nyss gått. */
  startaMedVantan?: boolean
}) {
  const [kvar, setKvar] = useState(startaMedVantan ? VANTA_SEKUNDER : 0)
  const [skickar, setSkickar] = useState(false)
  const [svar, setSvar] = useState<'' | 'skickat' | 'fel'>('')

  useEffect(() => {
    if (kvar <= 0) return
    const t = setTimeout(() => setKvar(k => k - 1), 1000)
    return () => clearTimeout(t)
  }, [kvar])

  async function skicka() {
    if (kvar > 0 || skickar || !epost.trim()) return
    setSkickar(true); setSvar('')
    const { error } = await createClient().auth.resend({
      type: 'signup', email: epost.trim(), options: { emailRedirectTo: mal },
    })
    setSkickar(false)
    setSvar(error ? 'fel' : 'skickat')
    setKvar(VANTA_SEKUNDER)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <button
        type="button"
        onClick={skicka}
        disabled={kvar > 0 || skickar}
        style={{
          minHeight: 44, padding: '10px 18px', borderRadius: 12, fontFamily: 'inherit',
          background: 'none', border: '1.5px solid rgba(10,123,140,0.25)',
          fontSize: 14, fontWeight: 600, color: kvar > 0 || skickar ? 'var(--txt3)' : 'var(--sea)',
          cursor: kvar > 0 || skickar ? 'default' : 'pointer',
        }}
      >
        {skickar ? 'Skickar…' : kvar > 0 ? `Skicka igen om ${kvar} s` : 'Skicka bekräftelsen igen'}
      </button>
      {svar === 'skickat' && <p role="status" style={{ margin: 0, fontSize: 13, color: 'var(--txt2)' }}>Ett nytt mejl är på väg.</p>}
      {svar === 'fel' && <p role="alert" style={{ margin: 0, fontSize: 13, color: 'var(--red)' }}>Det gick inte att skicka. Vänta en stund och försök igen.</p>}
    </div>
  )
}

export default function KollaInkorgen({ epost, mal }: { epost: string; mal: string }) {
  return (
    <div role="status" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 8 }}>
      <div aria-hidden style={{
        width: 64, height: 64, borderRadius: '50%', marginBottom: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
      }}>
        <Icon name="mail" size={28} />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
        Bekräfta din e-postadress
      </h2>
      <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 8px' }}>
        Vi har skickat en länk till <strong style={{ color: 'var(--txt)', wordBreak: 'break-all' }}>{epost}</strong>. Tryck på den, så är ditt konto klart och du är inloggad.
      </p>
      <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 20px' }}>
        Kommer det inget inom ett par minuter? Titta i skräpposten.
      </p>
      <SkickaBekraftelseIgen epost={epost} mal={mal} startaMedVantan />
      <Link href="/logga-in" style={{ display: 'inline-block', marginTop: 18, fontSize: 14, color: 'var(--txt3)', textDecoration: 'none', fontWeight: 500 }}>
        Till inloggningen
      </Link>
    </div>
  )
}
