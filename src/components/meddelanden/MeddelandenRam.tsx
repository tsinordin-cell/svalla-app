'use client'

/**
 * Ramen runt allt under /meddelanden (2026-11-26, premiumsteg 1).
 *
 * Telefon: en sak i taget. /meddelanden visar inkorgen, ett samtal visar bara samtalet.
 * Dator (från 1024 px): inkorgen till vänster och samtalet till höger, som i en
 * vanlig meddelandeapp. Inkorgen ligger här i layouten så att den inte laddas
 * om varje gång man byter samtal.
 */

import { usePathname } from 'next/navigation'
import Inkorg from './Inkorg'

export default function MeddelandenRam({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? '/meddelanden'
  const iSamtal = /^\/meddelanden\/.+/.test(path)
  return (
    <div className={`md-ram md-rot ${iSamtal ? 'md-ram--samtal' : 'md-ram--inkorg'}`}>
      <aside className="md-ram-lista" aria-label="Meddelanden">
        <Inkorg />
      </aside>
      <section className="md-ram-innehall">{children}</section>
    </div>
  )
}
