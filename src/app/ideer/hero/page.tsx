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
.hf{min-height:100vh;background:#efe7d6}
.hf-scen .ki-scen{border-radius:0;box-shadow:none}
/* Max 2026-11-24: hela animeringen ska synas under menyn utan att man scrollar, och loggan bara en gång (i menyn) */
@media (min-width:861px){.hf-scen .ki-scen{aspect-ratio:auto;height:calc(100svh - 64px);min-height:540px}}
@media (min-width:1101px){.hf-scen .ki-scen{height:calc(100svh - 68px)}}
.hf-scen .ki-logga{display:none}
/* Max och Thomas 2026-11-24: ljus krämvit meny i samma ton som himlen, marinblå text och logga, i stället för den mörkblå toningen */
.hf .mm{background:#efe7d6;color:#0a2540;box-shadow:0 1px 0 rgba(10,37,64,.08)}
.hf .mm-logga svg [fill="#ffffff"]{fill:#0a2540}
.hf .mm-logga svg [stroke="#ffffff"]{stroke:#0a2540}
.hf .mm-punkt{color:rgba(10,37,64,.85)}
.hf .mm-punkt:hover,.hf .mm-punkt.oppen{color:#0a2540}
.hf .mm-sok{background:rgba(10,37,64,.05);border-color:rgba(10,37,64,.18);color:rgba(10,37,64,.75)}
.hf .mm-sok:focus-within{background:#fff;border-color:rgba(10,37,64,.35)}
.hf .mm-sok input{color:#0a2540!important}
.hf .mm-sok input::placeholder{color:rgba(10,37,64,.55)}
.hf .mm-sok-text{color:#0a2540}
.hf .mm-liten{color:rgba(10,37,64,.75)}
.hf .mm-liten:hover{color:#0a2540}
.hf .mm-mob-sok{color:#0a2540}
.hf .mm-mob-knapp{background:rgba(10,37,64,.06);border-color:rgba(10,37,64,.25);color:#0a2540}
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
