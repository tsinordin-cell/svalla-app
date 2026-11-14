'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { track } from '@/lib/analytics-events'

/** Mäter att kalendern visades (vilken dag, inloggad eller ej). */
export function JulkalenderVisad({ dag, inloggad }: { dag: number; inloggad: boolean }) {
  useEffect(() => {
    if (dag > 0) track('julkalender_lucka_visad', { dag, inloggad })
  }, [dag, inloggad])
  return null
}

/** Inloggningslänk som mäter klicket (utloggade → konto → tillbaka till kalendern). */
export function JulkalenderLoggaIn({ dag, href, style, className, children, plats = 'sidan_logga_in', ...rest }: {
  dag: number; href: string; style?: React.CSSProperties; className?: string; children: React.ReactNode
  plats?: 'sidan_logga_in' | 'lucksida_logga_in'
  'data-ton'?: string
}) {
  return (
    <Link href={href} style={style} className={className} {...rest} onClick={() => track('julkalender_klick', { plats, dag })}>
      {children}
    </Link>
  )
}
