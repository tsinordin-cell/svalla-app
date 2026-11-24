import type { Metadata } from 'next'
import MegaMeny from '@/components/MegaMeny'
import Intro from '../kreativ/Intro'

/**
 * FÖRHANDSVISNING 2026-11-24 (Max): så här skulle startsidans hero se ut med startscenen
 * (del 7 i kreativa verkstaden) och samma meny som på svalla.se ovanför.
 * Bara i idébanken, oindexerad och olänkad. Startsidan live är orörd.
 */
export const metadata: Metadata = {
  title: 'Startsidans hero med startscenen (förhandsvisning)',
  robots: { index: false, follow: false },
}

const HF_CSS = `
.hf{min-height:100vh;background:#fff}
.hf-scen .ki-scen{border-radius:0;box-shadow:none}
`

export default function HeroForhandsvisning() {
  return (
    <main className="hf">
      <style>{HF_CSS}</style>
      <MegaMeny />
      <div className="hf-scen">
        <Intro varld />
      </div>
    </main>
  )
}
