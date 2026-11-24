'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { createClient, getViewer } from '@/lib/supabase'

/**
 * Loggan i toppraden. Inloggad leder den till Flöde, utloggad till startsidan,
 * samma regel som loggan i sidomenyn (Nav). Utan detta hamnade en utloggad
 * besökare på inloggningssidan när hen tryckte på loggan.
 */
export default function ToppradLogga() {
  const [inloggad, setInloggad] = useState(true)

  useEffect(() => {
    let aktiv = true
    getViewer(createClient()).then(({ data: { user } }) => {
      if (aktiv) setInloggad(!!user)
    }).catch(() => { if (aktiv) setInloggad(false) })
    return () => { aktiv = false }
  }, [])

  return (
    <Link
      href={inloggad ? '/feed' : '/'}
      aria-label={inloggad ? 'Svalla, till flödet' : 'Svalla, till startsidan'}
      className="app-topbar-logga"
      style={{ display: 'inline-flex', alignItems: 'center', minHeight: 36 }}
    >
      <SvallaLogo height={24} color="var(--sea)" />
    </Link>
  )
}
