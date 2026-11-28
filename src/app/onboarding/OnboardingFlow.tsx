'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { track } from '@/lib/analytics-events'
import { rangordnaForslag } from '@/lib/rangordnaForslag'
import { DEPARTURES } from '@/lib/planner-client'
import { validateUsername } from '@/lib/username'
import { komprimeraBild, AVATAR_MAX_PX } from '@/lib/komprimeraBild'
import { GUIDE_VERSION } from '@/lib/guidenForst'
import { GUIDE_OK_NYCKEL } from '@/components/GuideKontroll'
import GuideFilm, { FILMBILDER } from '@/components/GuideFilm'

/* ─────────────────────────────────────────────────────────────────────────────
   /onboarding, version 2 (2026-11-28, Toms uppdrag 27 nov)

   Samma färger och grafik som startsidan: papper (#efe7d6/#f7f1e7), bläckblått
   (#143c78), havets blå (#4472ab), orange skyltar och de målade bilderna i
   public/kreativ (Thorkels båt, solen, fyren, ejdrarna m.fl.).

   Sju steg i stället för åtta. De tre visningsstegen (logga, karta, menyn) är
   ett steg. Mätt 27 nov (analytics_events sedan 16 maj): 43 personer nådde
   första visningssteget och 35 kom förbi det tredje. Namnsteget är nytt:
   74 av 133 konton hade början på e-postadressen som publikt namn (mätt 27 nov).

   1. valkomst  Thorkels båt på havet, "Kasta loss" eller hoppa över
   2. visning   Tre saker du kan göra, var sin målad bild
   3. namn      Namn på Svalla och profilbild (bilden är valfri)
   4. bat       Båttyp (går att hoppa över, ändras i profilen)
   5. hamn      Hemmahamn, fritext med förslag (går att hoppa över)
   6. folj      Följ andra på sjön (hoppas över om inga förslag finns)
   7. klar      Klar för avgång

   Spårningen skickar steget som namn (steg) och versionen (GUIDE_VERSION), så att siffrorna
   inte blandas ihop med den gamla guiden, där steg 2 betydde något annat.
───────────────────────────────────────────────────────────────────────────── */

interface Suggestion {
  id: string
  username: string
  avatar: string | null
  vessel_model: string | null
  home_port: string | null
  boat_type?: string | null
  van?: boolean
}

interface Props {
  userId: string
  /** Förnamn till hälsningen, eller ett eget användarnamn. Tomt om inget passar. */
  halsning: string
  /** Kontot fanns före den nya guiden (2026-11-28): annan välkomsttext. */
  befintligt?: boolean
  /** Båttyp och hemmahamn som kontot redan har, förifyllda. */
  startBat?: string | null
  startHamn?: string
  /** Användarnamnet som kontot har nu. */
  nuvarandeNamn: string
  /** Förifyllt i namnsteget: nuvarande namn om det är eget, annars ett förslag ur personens namn (kan vara tomt). */
  namnForslag: string
  /** Profilbild som kontot redan har. */
  avatar: string | null
  /** Namnet kommer från e-posten (eller seglare-…): då leder "Hoppa över" till namnsteget. */
  automatisktNamn?: boolean
  /** Sidan personen var på väg till när kontot skapades. Dit går "Hoppa över" och "Fortsätt". */
  tillbaka?: string | null
  suggestions: Suggestion[]
  /** Steg 2 som animerad film (live 2026-11-28, Toms ja). false ger de tre korten. */
  film?: boolean
  /** Bara för förhandsvisning av utseendet (t.ex. en tillfällig sida på en preview): inget sparas, inget spåras, ingen omdirigering. */
  forhandsvisning?: boolean
}

type Step = 'valkomst' | 'visning' | 'namn' | 'bat' | 'hamn' | 'folj' | 'klar'

const STEG: Step[] = ['valkomst', 'visning', 'namn', 'bat', 'hamn', 'folj', 'klar']
const MELLANSTEG: Step[] = ['visning', 'namn', 'bat', 'hamn', 'folj']
const stegNr = (s: Step) => STEG.indexOf(s) + 1
const VERSION = GUIDE_VERSION // 3 = med guidefilmen (2026-11-28)

/* ── Startsidans färger (Startscen.tsx, ThorkelHero.tsx) ─────────────────── */
const F = {
  papper: '#f7f1e7',
  scen: '#efe7d6',
  kort: '#fbf7ee',
  black: '#143c78',
  hav: '#4472ab',
  havMork: '#375e96',
  text: '#192830',
  text2: '#3d5865',
  text3: '#6b7f88',
  // Knappens orange är en nyans mörkare än startsidans #c8642a, så att den
  // ljusa texten klarar 4,5:1 (4,65:1). Accenter i övrigt använder #c8642a.
  knapp: '#b4541c',
  knappHover: '#c25e22',
  orange: '#c8642a',
  fel: '#a3271b',
}

/* Handritad kant, samma form som skyltarna i startscenen (.ki-skylt). */
const HANDKANT = '15px 18px 14px 17px / 17px 14px 18px 15px'

const CSS = `
.ob{--ink:${F.black};color:${F.text};font-family:Inter,system-ui,sans-serif;flex:1;display:flex;flex-direction:column;justify-content:center;width:100%}
.ob *{box-sizing:border-box}
.ob-steg{position:relative;z-index:1;width:100%;max-width:470px;margin:0 auto;display:flex;flex-direction:column;animation:ob-in .45s cubic-bezier(.22,1,.36,1) both}
.ob-rubrik{font-family:'Playfair Display',Georgia,serif;font-weight:700;letter-spacing:-.01em;color:${F.hav};font-size:clamp(28px,7.4vw,36px);line-height:1.12;margin:0 0 10px;text-align:center}
.ob-text{font-size:15.5px;line-height:1.55;color:${F.text2};margin:0 auto 24px;max-width:390px;text-align:center}
.ob-etikett{font:700 11px/1 Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${F.orange};text-align:center;margin:0 0 12px}

.ob-knapp{flex:1;display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:52px;padding:14px 22px;border-radius:999px;border:2px solid ${F.black};background:${F.knapp};color:${F.kort};font:400 19px/1 'Playfair Display',Georgia,serif;cursor:pointer;box-shadow:3px 3px 0 ${F.black};transition:transform .2s,box-shadow .2s,background-color .2s}
.ob-knapp:hover:not(:disabled),.ob-knapp:focus-visible{background:${F.knappHover};transform:translate(-1px,-2px);box-shadow:5px 5px 0 ${F.black}}
.ob-knapp:active:not(:disabled){transform:translate(2px,2px);box-shadow:1px 1px 0 ${F.black}}
.ob-knapp:disabled{cursor:default;background:#e6dccb;color:#8a8f8c;border-color:#c9bfae;box-shadow:none}
.ob-knapp:focus-visible,.ob-val:focus-visible,.ob-lank:focus-visible,.ob-tillbaka:focus-visible,.ob-chip:focus-visible,.ob-falt:focus-visible,.ob-genvag:focus-visible{outline:3px solid #f2c27a;outline-offset:3px}
.ob-tillbaka{min-height:52px;padding:12px 14px;border:none;background:none;color:${F.havMork};font:600 14px/1 Inter,system-ui,sans-serif;cursor:pointer;border-radius:999px}
.ob-tillbaka:hover{color:${F.black}}
.ob-lank{display:block;margin:16px auto 0;padding:8px 12px;border:none;background:none;color:${F.havMork};font:600 14px/1.3 Inter,system-ui,sans-serif;text-decoration:underline;text-underline-offset:3px;cursor:pointer;border-radius:8px}
.ob-lank:hover{color:${F.black}}
.ob-rad{display:flex;gap:10px;align-items:center}

.ob-kort{background:${F.kort};border:2px solid ${F.black};border-radius:${HANDKANT};box-shadow:3px 3px 0 ${F.black}}

.ob-val{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 10px 14px;cursor:pointer;font:inherit;color:${F.text};text-align:center;background:${F.kort};border:2px solid ${F.black};border-radius:${HANDKANT};box-shadow:3px 3px 0 ${F.black};transition:transform .2s,box-shadow .2s,background-color .2s,border-color .2s}
.ob-val:hover{transform:translate(-1px,-2px);box-shadow:5px 5px 0 ${F.black}}
.ob-val[aria-pressed=true]{background:#fff;border-color:${F.orange};box-shadow:3px 3px 0 ${F.orange}}
.ob-val-namn{font:700 14.5px/1.2 Inter,system-ui,sans-serif}
.ob-val-text{font-size:12px;line-height:1.35;color:${F.text2}}
.ob-bock{position:absolute;top:8px;right:8px;width:22px;height:22px;border-radius:50%;background:${F.orange};color:#fff;display:flex;align-items:center;justify-content:center}

.ob-falt{width:100%;min-height:52px;padding:13px 16px;border-radius:14px;border:2px solid ${F.black};background:#fff;color:${F.text};font:500 16px Inter,system-ui,sans-serif;outline:none;box-shadow:3px 3px 0 ${F.black}}
.ob-falt::placeholder{color:#8a9499}
.ob-chip{padding:7px 13px;border-radius:999px;border:1.5px solid rgba(20,60,120,.35);background:${F.kort};color:${F.black};font:600 13px/1.1 Inter,system-ui,sans-serif;cursor:pointer;transition:background-color .15s,border-color .15s}
.ob-chip:hover{border-color:${F.black}}
.ob-chip[aria-pressed=true]{background:${F.black};color:${F.kort};border-color:${F.black}}

.ob-person{display:flex;align-items:center;gap:12px;width:100%;min-width:0;padding:11px 14px;cursor:pointer;font:inherit;text-align:left;color:${F.text};background:${F.kort};border:2px solid ${F.black};border-radius:${HANDKANT};box-shadow:3px 3px 0 ${F.black};transition:transform .2s,box-shadow .2s}
.ob-person:hover{transform:translate(-1px,-2px);box-shadow:5px 5px 0 ${F.black}}
.ob-folj{flex-shrink:0;display:inline-flex;align-items:center;gap:5px;padding:7px 14px;border-radius:999px;font:700 12.5px/1 Inter,system-ui,sans-serif;border:1.5px solid ${F.black};background:${F.black};color:${F.kort}}
.ob-folj.pa{background:transparent;color:${F.black}}

.ob-funktion{display:flex;align-items:center;gap:14px;padding:12px 16px 12px 12px}
.ob-funktion img{flex-shrink:0;width:84px;height:62px;object-fit:contain}
.ob-funktion h3{margin:0 0 3px;font:700 17px/1.2 'Playfair Display',Georgia,serif;color:${F.black}}
.ob-funktion p{margin:0;font-size:13.5px;line-height:1.45;color:${F.text2}}

.ob-genvag{display:inline-flex;align-items:center;gap:6px;padding:9px 14px;border-radius:999px;border:1.5px solid ${F.black};background:${F.kort};color:${F.black};font:600 13.5px/1 Inter,system-ui,sans-serif;cursor:pointer;transition:background-color .15s}
.ob-genvag:hover{background:#fff}

.ob-bild{position:relative;width:96px;height:96px;border-radius:50%;padding:0;cursor:pointer;border:2px solid ${F.black};box-shadow:3px 3px 0 ${F.black};background:${F.hav};color:${F.kort};font:700 38px/1 'Playfair Display',Georgia,serif;display:flex;align-items:center;justify-content:center;overflow:visible}
.ob-bild img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.ob-bild-kamera{position:absolute;right:-4px;bottom:-2px;width:32px;height:32px;border-radius:50%;background:${F.knapp};color:${F.kort};border:2px solid ${F.black};display:flex;align-items:center;justify-content:center}
.ob-bild:focus-visible{outline:3px solid #f2c27a;outline-offset:3px}

.ob-fel{margin:0 0 12px;padding:10px 14px;border-radius:12px;background:#fbe9e4;border:1.5px solid ${F.fel};color:${F.fel};font-size:13.5px;font-weight:600}

.ob-framsteg{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 0 20px}
.ob-framsteg i{width:9px;height:9px;border-radius:50%;border:1.5px solid ${F.black};background:transparent;transition:background-color .3s,width .3s}
.ob-framsteg i.klar{background:${F.black}}
.ob-framsteg i.nu{width:26px;border-radius:999px;background:${F.orange};border-color:${F.orange}}
.ob-framsteg span{margin-left:6px;font:600 12px/1 Inter,system-ui,sans-serif;color:${F.havMork}}

.ob-scen{position:relative;width:100%;margin:0 auto 22px;overflow:visible}
.ob-scen img{position:absolute;display:block;user-select:none;-webkit-user-drag:none}
.ob-gung{animation:ob-gung 5s ease-in-out infinite;transform-origin:50% 90%}
.ob-snurr{animation:ob-snurr 60s linear infinite}
.ob-segla{animation:ob-segla 9s ease-in-out infinite}

@keyframes ob-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes ob-gung{0%,100%{transform:translateY(0) rotate(-1.2deg)}50%{transform:translateY(-3px) rotate(1.2deg)}}
@keyframes ob-snurr{to{transform:rotate(360deg)}}
@keyframes ob-segla{0%,100%{transform:translateX(0)}50%{transform:translateX(14px)}}
/* Låga skärmar (t.ex. 320 × 568): de små scenerna och båttexterna tar bort scroll i frågestegen (mätt 2026-11-28). */
@media (max-height:700px){.ob-liten{display:none}.ob-framsteg{margin-bottom:14px}}
@media (max-height:620px){.ob-val-text{display:none}.ob-val{padding:12px 8px 10px}}
.ob h1:focus,.ob h2:focus{outline:none}
@media (prefers-reduced-motion:reduce){.ob-steg,.ob-gung,.ob-snurr,.ob-segla{animation:none!important}.ob-knapp,.ob-val,.ob-person{transition:none}}
`

/* ── Målat hav: en vattenpöl med ojämn kant och kritkorn (startsidans havsblå) ── */
const POL = 'M8 17 C60 9 112 19 172 13 C232 7 300 17 392 11 C399 25 397 44 381 53 C300 59 102 59 22 55 C5 48 3 31 8 17 Z'
function Hav({ hojd }: { hojd: number }) {
  const id = 'ob-hav' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg aria-hidden viewBox="0 0 400 60" preserveAspectRatio="none"
      style={{ position: 'absolute', left: 0, width: '100%', bottom: 0, height: hojd, display: 'block', overflow: 'visible' }}>
      <defs>
        <filter id={`${id}-kant`} x="-3%" y="-20%" width="106%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="brus" />
          <feDisplacementMap in="SourceGraphic" in2="brus" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}-korn`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.25" />
        </filter>
        <clipPath id={`${id}-form`}><path d={POL} /></clipPath>
      </defs>
      <g filter={`url(#${id}-kant)`}>
        <g clipPath={`url(#${id}-form)`}>
          <rect width="400" height="60" fill={F.hav} />
          <rect width="400" height="60" filter={`url(#${id}-korn)`} opacity=".22" />
          <path d="M46 30 q9 -5 18 0 M120 42 q9 -5 18 0 M222 28 q9 -5 18 0 M300 44 q9 -5 18 0 M350 26 q9 -5 18 0"
            stroke="rgba(255,255,255,.45)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}

/* En målad bild ur public/kreativ. Mått i procent av scenens bredd/höjd. */
function Bild({ src, alt = '', style, className }: { src: string; alt?: string; style: React.CSSProperties; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} draggable={false} className={className} style={style} />
}

/* Välkomstscenen: sol, Thorkels båt och ön, som startsidans hero. */
function ValkomstScen() {
  return (
    <div className="ob-scen" aria-hidden style={{ aspectRatio: '16 / 10', maxWidth: 440 }}>
      <Bild src="/kreativ/scen-sol.webp" className="ob-snurr" style={{ left: '2%', top: '2%', width: '19%' }} />
      <Bild src="/kreativ/scen-o.webp" style={{ right: '1%', bottom: '19%', width: '42%' }} />
      <Hav hojd={64} />
      <Bild src="/kreativ/thorkel-bat-v.webp" className="ob-gung" style={{ left: '4%', bottom: '6%', width: '56%' }} />
    </div>
  )
}

/* Slutscenen: båten på väg ut, flaggan och fyren. */
function AvgangScen() {
  return (
    <div className="ob-scen" aria-hidden style={{ aspectRatio: '16 / 9', maxWidth: 440 }}>
      <Bild src="/kreativ/scen-sol.webp" className="ob-snurr" style={{ right: '4%', top: '0%', width: '17%' }} />
      <Bild src="/kreativ/scen-flagga.webp" style={{ left: '2%', bottom: '20%', width: '8%' }} />
      <Bild src="/kreativ/scen-fyr.webp" style={{ left: '8%', bottom: '14%', width: '25%' }} />
      <Hav hojd={56} />
      <div className="ob-segla" style={{ position: 'absolute', left: '40%', bottom: '5%', width: '48%' }}>
        <Bild src="/kreativ/thorkel-bat-v.webp" className="ob-gung" style={{ position: 'relative', width: '100%' }} />
      </div>
    </div>
  )
}

/* En liten scen ovanför frågestegen. */
function LitenScen({ children }: { children: React.ReactNode }) {
  return (
    <div className="ob-scen ob-liten" aria-hidden style={{ height: 96, maxWidth: 300, marginBottom: 14 }}>
      {children}
      <Hav hojd={30} />
    </div>
  )
}

/* ── Båtikoner i bläck, samma linje som startsidans skyltikoner ───────────── */
const IKON = { width: 46, height: 46, viewBox: '0 0 64 64', fill: 'none', stroke: F.black, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
function SegelIkon() {
  return (
    <svg {...IKON} aria-hidden>
      <path d="M32 8 V44" />
      <path d="M34 10 L52 40 H34 Z" fill={F.hav} fillOpacity=".85" />
      <path d="M30 16 L15 40 H30 Z" fill={F.hav} fillOpacity=".45" />
      <path d="M10 46 H54 L49 52 H15 Z" fill={F.kort} />
      <path d="M6 57 Q14 53 22 57 T38 57 T54 57" stroke={F.hav} />
    </svg>
  )
}
function MotorIkon() {
  return (
    <svg {...IKON} aria-hidden>
      <path d="M8 40 H56 L50 48 H14 Z" fill={F.kort} />
      <path d="M20 40 L24 30 H40 L44 40" fill={F.hav} fillOpacity=".45" />
      <path d="M28 30 V24 H36" />
      <path d="M6 56 Q14 52 22 56 T38 56 T54 56" stroke={F.hav} />
    </svg>
  )
}
function KajakIkon() {
  return (
    <svg {...IKON} aria-hidden>
      <path d="M6 42 Q32 50 58 42 Q32 34 6 42 Z" fill={F.orange} fillOpacity=".75" />
      <circle cx="32" cy="30" r="4.5" fill={F.kort} />
      <path d="M14 20 L50 46" />
      <path d="M11 17 L17 23 M47 43 L53 49" strokeWidth="4" />
      <path d="M6 56 Q14 52 22 56 T38 56 T54 56" stroke={F.hav} />
    </svg>
  )
}
function UtanBatIkon() {
  return (
    <svg {...IKON} aria-hidden>
      <rect x="12" y="22" width="40" height="20" rx="3" fill={F.kort} />
      <path d="M8 42 H56 L52 48 H12 Z" fill={F.hav} fillOpacity=".45" />
      <path d="M22 22 V16 H42 V22" />
      <path d="M18 29 H22 M27 29 H31 M36 29 H40 M45 29 H48" stroke={F.orange} strokeWidth="3" />
      <path d="M6 57 Q14 53 22 57 T38 57 T54 57" stroke={F.hav} />
    </svg>
  )
}

const BOAT_OPTIONS = [
  { value: 'Segelbåt', label: 'Segelbåt', Icon: SegelIkon, desc: 'Kryss och slör mellan öarna' },
  { value: 'Motorbåt', label: 'Motorbåt', Icon: MotorIkon, desc: 'Snabbt genom skärgården' },
  { value: 'Kajak', label: 'Kajak eller SUP', Icon: KajakIkon, desc: 'Nära vattnet och tystnaden' },
  { value: 'Charter', label: 'Utan egen båt', Icon: UtanBatIkon, desc: 'Färja, hyrbåt eller med vänner' },
]

/* Tre saker man kan göra, med var sin målad bild från startsidan. */
const FUNKTIONER = [
  { bild: '/kreativ/scen-angbat.webp', rubrik: 'Planera turen', text: 'Rutter längs kusten, färjor och båtlinjer på ett ställe.' },
  { bild: '/kreativ/scen-vastkust.webp', rubrik: 'Hitta öar och krogar', text: 'Gästhamnar, bryggor, bastur och mat, med riktiga koordinater.' },
  { bild: '/kreativ/scen-eka.webp', rubrik: 'Logga och dela', text: 'Spara rutten med GPS, lägg till foton och följ andras turer.' },
]

/** "åkersberga" → "Åkersberga"; "  Vaxholm " → "Vaxholm". Högst 60 tecken. */
function normaliseraHamn(v: string): string {
  const t = v.trim().replace(/\s+/g, ' ').slice(0, 60)
  if (t.length < 2) return ''
  return t.charAt(0).toUpperCase() + t.slice(1)
}

/** Förslag under fältet: vanliga hamnar när det är tomt, annars träffar i
 *  planerarens avgångsplatser och de vanliga hamnarna. Högst 6. */
function hamnForslagFor(skrivet: string): string[] {
  const q = skrivet.trim().toLowerCase()
  if (q.length === 0) return COMMON_PORTS.slice(0, 6)
  const alla = Array.from(new Set([...COMMON_PORTS, ...DEPARTURES.map(d => d.name)]))
  // Ett valt förslag: visa samma rad som förut, med det valda markerat, i stället för att den försvinner.
  if (alla.some(n => n.toLowerCase() === q)) {
    const vanliga = COMMON_PORTS.slice(0, 6)
    return vanliga.some(n => n.toLowerCase() === q) ? vanliga : [skrivet.trim(), ...vanliga.slice(0, 5)]
  }
  const borjar = alla.filter(n => n.toLowerCase().startsWith(q))
  const innehaller = alla.filter(n => !n.toLowerCase().startsWith(q) && n.toLowerCase().includes(q))
  return [...borjar, ...innehaller].filter(n => n.toLowerCase() !== q).slice(0, 6)
}

const COMMON_PORTS = [
  'Stockholm', 'Vaxholm', 'Saltsjöbaden', 'Värmdö',
  'Sandhamn', 'Marstrand', 'Smögen', 'Göteborg',
  'Strömstad', 'Trosa', 'Nynäshamn', 'Dalarö',
]

function Pil({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
function Bock({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

/* Framsteg: en prick per frågesteg, den aktuella är en orange streck. */
function Framsteg({ current }: { current: Step }) {
  const i = MELLANSTEG.indexOf(current)
  if (i < 0) return null
  return (
    <div className="ob-framsteg" role="progressbar" aria-valuemin={1} aria-valuemax={MELLANSTEG.length} aria-valuenow={i + 1}
      aria-label={`Steg ${i + 1} av ${MELLANSTEG.length}`}>
      {MELLANSTEG.map((s, k) => <i key={s} className={k < i ? 'klar' : k === i ? 'nu' : ''} />)}
      <span>{i + 1} av {MELLANSTEG.length}</span>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   HUVUDKOMPONENT
─────────────────────────────────────────────────────────────────────────── */
export default function OnboardingFlow({ userId, halsning, befintligt = false, startBat = null, startHamn = '', nuvarandeNamn, namnForslag, avatar, automatisktNamn = false, tillbaka = null, suggestions, forhandsvisning = false, film = true }: Props) {
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  const [step, setStep] = useState<Step>('valkomst')
  const [animKey, setAnimKey] = useState(0)
  const [startedAt] = useState(() => Date.now())

  const [alias, setAlias] = useState(namnForslag)
  // Hoppar över guiden men måste välja namn först (Toms ja 2026-11-28): bara namnsteget, sedan klar.
  const [baraNamn, setBaraNamn] = useState(false)
  const [bildFil, setBildFil] = useState<File | null>(null)
  const [bildVisning, setBildVisning] = useState<string | null>(avatar)
  const bildRef = useRef<HTMLInputElement>(null)
  const [boatType, setBoatType] = useState<string | null>(BOAT_OPTIONS.some(o => o.value === startBat) ? startBat : null)
  const [homePort, setHomePort] = useState(startHamn)
  const [followIds, setFollowIds] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  // Förslagen ordnas efter valen i guiden (samma hemmahamn, sedan båttyp).
  const sorteradeForslag = useMemo(
    () => rangordnaForslag(suggestions, normaliseraHamn(homePort), boatType),
    [suggestions, homePort, boatType],
  )

  const spara = !forhandsvisning
  // Filmen visas inte för den som valt mindre rörelse i systemet; då blir det korten.
  const [visaFilm, setVisaFilm] = useState(false)
  useEffect(() => {
    const med = film && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setVisaFilm(med)
    // Förladda filmens bilder medan välkomstsidan visas (ca 320 kB, cachas sedan).
    if (med) FILMBILDER.forEach(src => { const bild = new Image(); bild.src = src })
  }, [film])
  useEffect(() => { if (spara) track('onboarding_started', { step: 1, version: VERSION, befintligt }) }, [spara, befintligt])

  // Kontot har sett guiden: guide_version sätts (alltid), onboarded_at bara om den
  // saknas, så att datumet för första guiden finns kvar. Två frågor, eftersom
  // .is('onboarded_at', null) annars skulle stoppa guide_version för gamla konton.
  const markeraSedd = useCallback(async (): Promise<boolean> => {
    const { error: e1 } = await supabase.from('users').update({ guide_version: GUIDE_VERSION }).eq('id', userId)
    await supabase.from('users').update({ onboarded_at: new Date().toISOString() }).eq('id', userId).is('onboarded_at', null)
    if (!e1) { try { sessionStorage.setItem(GUIDE_OK_NYCKEL, '1') } catch { /* ignoreras */ } }
    return !e1
  }, [supabase, userId])

  // Guiden räknas som klar när slutskärmen visas, inte först när man trycker en
  // knapp där. Annars kom hela guiden tillbaka för den som stängde appen på
  // slutskärmen (granskningen 2026-11-22). Följningarna sparas fortfarande i finish().
  const klarMarkerad = useRef(false)
  useEffect(() => {
    if (!spara || step !== 'klar' || klarMarkerad.current) return
    klarMarkerad.current = true
    // .then() krävs: frågan skickas först när den awaitas eller får en then.
    markeraSedd().then(ok => { if (!ok) klarMarkerad.current = false })
  }, [spara, step, markeraSedd])

  // Ny skärm: börja överst, så att rubriken syns först på små telefoner.
  const forstaSteget = useRef(true)
  useEffect(() => {
    window.scrollTo({ top: 0 })
    // Skärmläsare och tangentbord: börja på det nya stegets rubrik.
    if (forstaSteget.current) { forstaSteget.current = false; return }
    const rubrik = document.querySelector<HTMLElement>('.ob-steg h1, .ob-steg h2')
    if (rubrik) { rubrik.tabIndex = -1; rubrik.focus({ preventScroll: true }) }
  }, [step])

  // Hur långt filmen kom (0–4) och om den spelades klart, skickas med när steget lämnas.
  const filmScen = useRef(-1)
  const filmKlar = useRef(false)
  const goTo = (next: Step) => {
    setError('')
    setAnimKey(k => k + 1)
    const franFilm = step === 'visning' && visaFilm
    setStep(next)
    if (spara) track('onboarding_step', {
      step: stegNr(next), steg: next, version: VERSION,
      ...(franFilm ? { film_scen: filmScen.current, film_klar: filmKlar.current } : {}),
    })
  }
  const goBack = () => {
    if (baraNamn && step === 'namn') { setBaraNamn(false); return goTo('valkomst') }
    const i = STEG.indexOf(step)
    // Tillbaka från avgång när följsteget hoppades över: till hamnen.
    if (step === 'klar' && suggestions.length === 0) return goTo('hamn')
    if (i > 0) goTo(STEG[i - 1]!)
  }
  const goNext = () => {
    const i = STEG.indexOf(step)
    if (i < STEG.length - 1) goTo(STEG[i + 1]!)
  }

  /* Namn och bild. Samma regler och samma lagring som "Redigera profil" (profil/page.tsx). */
  const valjBild = (fil: File | undefined) => {
    if (!fil) return
    if (!fil.type.startsWith('image/')) { setError('Välj en bild.'); return }
    setError('')
    setBildFil(fil)
    setBildVisning(URL.createObjectURL(fil))
  }
  const handleSaveName = async () => {
    const namn = alias.trim().toLowerCase()
    const fel = validateUsername(namn)
    if (fel) { setError(fel); return }
    setSaving(true); setError('')
    try {
      if (spara) {
        if (namn !== nuvarandeNamn.toLowerCase()) {
          // Samma kontroll som profilen: utan skiftläge, \ % _ escapas.
          const monster = namn.replace(/[\\%_]/g, '\\$&')
          const { data: upptaget } = await supabase.from('users').select('id').ilike('username', monster).neq('id', userId).limit(1)
          if (upptaget && upptaget.length > 0) throw new Error('Namnet är redan taget. Prova ett annat.')
        }
        let bildUrl: string | undefined
        if (bildFil) {
          const liten = await komprimeraBild(bildFil, AVATAR_MAX_PX)
          const ext = liten.name.split('.').pop() ?? 'jpg'
          const sokvag = `avatars/${userId}.${ext}`
          const { error: upFel } = await supabase.storage.from('images').upload(sokvag, liten, { upsert: true })
          if (upFel) throw new Error('Bilden gick inte att ladda upp. Försök igen eller hoppa över bilden.')
          bildUrl = supabase.storage.from('images').getPublicUrl(sokvag).data.publicUrl
        }
        const { error: e } = await supabase.from('users').update({ username: namn, ...(bildUrl ? { avatar: bildUrl } : {}) }).eq('id', userId)
        if (e) throw new Error(e.code === '23505' ? 'Namnet är redan taget. Prova ett annat.' : 'Kunde inte spara. Försök igen.')
      }
      setSaving(false)
      if (baraNamn) { await finish(tillbaka ?? '/feed'); return }
      goNext()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  /* Spara båt och hemmahamn var för sig. */
  const handleSaveBoat = async () => {
    if (!boatType) return
    setSaving(true); setError('')
    try {
      // Profilens fält "Båttyp" läser vessel_type, så valet skrivs dit. Tidigare
      // hamnade det i vessel_model och visades som båtmodell: "Charter" för den
      // som valt "Utan egen båt". Den som saknar båt får ingen båttyp alls.
      const vesselType = boatType === 'Charter' ? null : boatType
      if (spara) {
        const { error: e } = await supabase.from('users').update({ boat_type: boatType, vessel_type: vesselType }).eq('id', userId)
        if (e) throw new Error('Kunde inte spara. Försök igen.')
      }
      setSaving(false)
      goNext()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  const handleSavePort = async () => {
    setSaving(true); setError('')
    try {
      const hamn = normaliseraHamn(homePort)
      if (hamn && spara) {
        const { error: e } = await supabase.from('users').update({ home_port: hamn }).eq('id', userId)
        if (e) throw new Error('Kunde inte spara. Försök igen.')
      }
      setSaving(false)
      // Inga seglare att föreslå → hoppa direkt till avgång.
      goTo(suggestions.length > 0 ? 'folj' : 'klar')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  const hamnForslag = hamnForslagFor(homePort)

  const toggleFollow = (id: string) => {
    setFollowIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  /* Slutför guiden och gå vidare */
  const finish = async (target: string = '/feed') => {
    if (!spara) { setFollowIds(new Set()); goTo('valkomst'); return }
    setSaving(true)
    setError('')
    try {
      await markeraSedd()

      // Skapa följningar och notiser
      if (followIds.size > 0) {
        const followRows = Array.from(followIds).map(fid => ({ follower_id: userId, following_id: fid }))
        await supabase.from('follows').upsert(followRows, { onConflict: 'follower_id,following_id', ignoreDuplicates: true })
        // Notis per följning. Servern kontrollerar följningen och skickar pushen själv.
        await Promise.allSettled(Array.from(followIds).map(fid =>
          fetch('/api/notifications/insert', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId: fid, type: 'follow' }),
          }),
        ))
      }

      track('onboarding_completed', { duration_seconds: Math.round((Date.now() - startedAt) / 1000), version: VERSION, befintligt })
      router.replace(target)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  const fel = error ? <div role="alert" className="ob-fel">{error}</div> : null
  const tillbakaKnapp = <button type="button" onClick={goBack} className="ob-tillbaka">Tillbaka</button>

  const planMal = boatType === 'Charter' ? '/utflykt' : '/planera/ny'
  const planText = boatType === 'Charter' ? 'Planera en dag i skärgården' : 'Planera din första tur'

  let innehall: React.ReactNode

  /* ── 1. Välkommen ─────────────────────────────────────────────────── */
  if (step === 'valkomst') innehall = (
    <>
      <ValkomstScen />
      <p className="ob-etikett">{befintligt ? 'Nytt på Svalla' : 'Välkommen till Svalla'}</p>
      <h1 className="ob-rubrik">{befintligt ? 'Välkommen tillbaka' : 'Välkommen ombord'}{halsning ? `, ${halsning}` : ''}</h1>
      <p className="ob-text">
        {befintligt
          ? 'Det har hänt mycket på Svalla. Ta en minut och se vad som är nytt, och välj hur du vill synas för andra.'
          : 'Här planerar du turen, hittar öar, krogar och bryggor och följer andra på sjön. Vi visar det viktigaste på en minut.'}
      </p>
      <div className="ob-rad">
        <button type="button" onClick={goNext} className="ob-knapp">Kasta loss <Pil /></button>
      </div>
      {/* Den som har e-postens början som namn får välja namn även när guiden hoppas över
          (Toms ja 2026-11-28); 74 av 133 konton hade ett sådant namn (mätt 27 nov). */}
      <button type="button" onClick={() => automatisktNamn ? (setBaraNamn(true), goTo('namn')) : finish(tillbaka ?? '/feed')} disabled={saving} className="ob-lank">
        {saving ? 'Sparar…' : 'Hoppa över guiden'}
      </button>
    </>
  )

  /* ── 2. Det här kan du göra ───────────────────────────────────────── */
  else if (step === 'visning' && visaFilm) innehall = (
    <>
      {/* Filmen har ett eget band med sina fem delar; guidens prickar skulle bli två framstegsrader. */}
      <GuideFilm onScen={i => { filmScen.current = Math.max(filmScen.current, i) }} onSlut={() => { filmKlar.current = true }} />
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={goNext} className="ob-knapp">Nästa <Pil /></button>
      </div>
    </>
  )
  else if (step === 'visning') innehall = (
    <>
      <Framsteg current={step} />
      <h2 className="ob-rubrik">Det här kan du göra</h2>
      <p className="ob-text">Allt finns i menyn, när du behöver det.</p>
      <div style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        {FUNKTIONER.map(f => (
          <div key={f.rubrik} className="ob-kort ob-funktion">
            <Bild src={f.bild} style={{ position: 'static' }} />
            <div>
              <h3>{f.rubrik}</h3>
              <p>{f.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={goNext} className="ob-knapp">Nästa <Pil /></button>
      </div>
    </>
  )

  /* ── 3. Namn och bild ─────────────────────────────────────────────── */
  else if (step === 'namn') innehall = (
    <>
      {!baraNamn && <Framsteg current={step} />}
      {baraNamn && <p className="ob-etikett">Ett sista steg</p>}
      <h2 className="ob-rubrik">Vad ska vi kalla dig?</h2>
      <p className="ob-text" style={{ marginBottom: 20 }}>
        {baraNamn
          ? 'Innan du går vidare: välj namnet som andra ser på Svalla. Din e-post visas aldrig.'
          : 'Namnet syns för andra på Svalla, på din profil och dina turer. Din e-post visas aldrig.'}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 22 }}>
        <button type="button" onClick={() => bildRef.current?.click()} className="ob-bild" aria-label={bildVisning ? 'Byt profilbild' : 'Lägg till profilbild'}>
          {bildVisning
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={bildVisning} alt="" />
            : <span aria-hidden>{(alias.trim()[0] ?? '?').toUpperCase()}</span>}
          <span className="ob-bild-kamera" aria-hidden>
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.5" /></svg>
          </span>
        </button>
        <button type="button" onClick={() => bildRef.current?.click()} className="ob-lank" style={{ margin: 0 }}>
          {bildVisning ? 'Byt bild' : 'Lägg till en bild (valfritt)'}
        </button>
        <input ref={bildRef} type="file" accept="image/*" hidden onChange={e => valjBild(e.target.files?.[0])} />
      </div>
      <label htmlFor="ob-namn" className="ob-etikett" style={{ textAlign: 'left', display: 'block', margin: '0 0 8px 4px' }}>Ditt namn på Svalla</label>
      <div style={{ position: 'relative' }}>
        <span aria-hidden style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: F.havMork, fontWeight: 700, fontSize: 16 }}>@</span>
        <input id="ob-namn" type="text" value={alias} onChange={e => { setAlias(e.target.value.toLowerCase()); if (error) setError('') }}
          placeholder="t.ex. anna-pa-sjon" autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={20}
          className="ob-falt" style={{ paddingLeft: 34 }} aria-describedby="ob-namn-regel" />
      </div>
      <p id="ob-namn-regel" style={{ margin: '10px 4px 22px', fontSize: 12.5, lineHeight: 1.45, color: F.text3 }}>
        3–20 tecken: a–z, siffror, _ . och -. Du kan ändra namnet senare i profilen.
      </p>
      {fel}
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={handleSaveName} disabled={saving || alias.trim().length < 3} className="ob-knapp">
          {saving ? 'Sparar…' : baraNamn ? <>Spara och fortsätt <Pil /></> : <>Nästa <Pil /></>}
        </button>
      </div>
    </>
  )

  /* ── 4. Båt ───────────────────────────────────────────────────────── */
  else if (step === 'bat') innehall = (
    <>
      <Framsteg current={step} />
      <LitenScen>
        <Bild src="/kreativ/thorkel-bat-v.webp" className="ob-gung" style={{ left: '28%', bottom: '4%', width: '44%' }} />
      </LitenScen>
      <h2 className="ob-rubrik">Hur tar du dig ut?</h2>
      <p className="ob-text" style={{ marginBottom: 20 }}>
        Då visar vi turer, rutter och platser som passar dig först. Går att ändra i profilen.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        {BOAT_OPTIONS.map(({ value, label, Icon, desc }) => {
          const valt = boatType === value
          return (
            <button key={value} type="button" onClick={() => setBoatType(value)} aria-pressed={valt} className="ob-val">
              {valt && <span className="ob-bock" aria-hidden><Bock /></span>}
              <Icon />
              <span className="ob-val-namn">{label}</span>
              <span className="ob-val-text">{desc}</span>
            </button>
          )
        })}
      </div>
      {fel}
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={handleSaveBoat} disabled={saving || !boatType} className="ob-knapp">
          {saving ? 'Sparar…' : <>Nästa <Pil /></>}
        </button>
      </div>
      {!boatType && (
        <button type="button" onClick={goNext} className="ob-lank">Hoppa över, välj senare i profilen</button>
      )}
    </>
  )

  /* ── 5. Hemmahamn ─────────────────────────────────────────────────────
     Fritext med flit: hemmahamnen är ofta en klubbhamn eller brygga som
     inte finns i någon lista. Förslagen kommer från planerarens avgångsplatser. */
  else if (step === 'hamn') innehall = (
    <>
      <Framsteg current={step} />
      <LitenScen>
        <Bild src="/kreativ/scen-fyr.webp" style={{ left: '34%', bottom: '2%', width: '32%' }} />
      </LitenScen>
      <h2 className="ob-rubrik">{boatType === 'Charter' ? 'Var brukar du ge dig ut?' : 'Var ligger båten?'}</h2>
      <p className="ob-text" style={{ marginBottom: 20 }}>
        Hemmahamnen visas på din profil och hjälper oss att föreslå turer och seglare nära dig.
      </p>
      <label htmlFor="ob-hamn" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Hemmahamn</label>
      <input id="ob-hamn" type="text" value={homePort} onChange={e => setHomePort(e.target.value)}
        placeholder="t.ex. Vaxholm, Svinninge, Marstrand…" autoComplete="off" className="ob-falt" />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, margin: '14px 0 24px', minHeight: 32 }}>
        {hamnForslag.map(p => (
          <button key={p} type="button" onClick={() => setHomePort(p)} aria-pressed={homePort === p} className="ob-chip">{p}</button>
        ))}
      </div>
      {fel}
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={handleSavePort} disabled={saving} className="ob-knapp">
          {saving ? 'Sparar…' : homePort.trim().length >= 2 ? <>Nästa <Pil /></> : <>Hoppa över <Pil /></>}
        </button>
      </div>
    </>
  )

  /* ── 6. Följ andra (hoppas över automatiskt om inga förslag finns) ── */
  else if (step === 'folj') innehall = (
    <>
      <Framsteg current={step} />
      <LitenScen>
        <Bild src="/kreativ/scen-ejder.webp" className="ob-segla" style={{ left: '30%', bottom: '14%', width: '24%' }} />
        <Bild src="/kreativ/scen-ejderunge.webp" className="ob-segla" style={{ left: '56%', bottom: '14%', width: '12%' }} />
        <Bild src="/kreativ/scen-ejderunge.webp" className="ob-segla" style={{ left: '70%', bottom: '14%', width: '11%' }} />
      </LitenScen>
      <h2 className="ob-rubrik">Följ andra på sjön</h2>
      <p className="ob-text" style={{ marginBottom: 20 }}>
        Deras turer dyker upp i ditt flöde. Du kan sluta följa när som helst.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 12, marginBottom: 24 }}>
        {sorteradeForslag.slice(0, 3).map(s => {
          const foljer = followIds.has(s.id)
          const bat = (s.boat_type ?? s.vessel_model) === 'Charter' ? 'Utan egen båt' : (s.boat_type || s.vessel_model)
          const rad = [s.van ? 'Bjöd in dig' : null, bat, s.home_port].filter(Boolean).join(' · ')
          return (
            <button key={s.id} type="button" onClick={() => toggleFollow(s.id)} aria-pressed={foljer} className="ob-person">
              {s.avatar
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={s.avatar} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: `2px solid ${F.black}` }} />
                : <span aria-hidden style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, background: F.hav, color: F.kort, border: `2px solid ${F.black}`, display: 'flex', alignItems: 'center', justifyContent: 'center', font: "700 16px 'Playfair Display',Georgia,serif" }}>{(s.username[0] ?? '?').toUpperCase()}</span>}
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14.5, fontWeight: 700, color: F.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>@{s.username}</span>
                {rad && <span style={{ display: 'block', fontSize: 12.5, color: F.text2, marginTop: 2 }}>{rad}</span>}
              </span>
              <span className={`ob-folj${foljer ? ' pa' : ''}`}>{foljer && <Bock size={11} />}{foljer ? 'Följer' : 'Följ'}</span>
            </button>
          )
        })}
      </div>
      {fel}
      <div className="ob-rad">
        {tillbakaKnapp}
        <button type="button" onClick={goNext} disabled={saving} className="ob-knapp">
          {followIds.size > 0 ? <>Nästa <Pil /></> : <>Hoppa över <Pil /></>}
        </button>
      </div>
    </>
  )

  /* ── 7. Klar för avgång ───────────────────────────────────────────── */
  else innehall = (
    <>
      <AvgangScen />
      <p className="ob-etikett">Allt klart</p>
      <h2 className="ob-rubrik">Klar för avgång</h2>
      <p className="ob-text">{tillbaka ? 'Fortsätt där du var, eller planera din första tur.' : 'Planera din första tur, eller se dig omkring först.'}</p>
      {fel}
      {/* Planering i stället för "logga första turen": av 97 nya konton hade 14
          planerat en rutt och 1 sparat en tur (mätt 19 nov 2026). Den som valt
          "Utan egen båt" får dagsplaneraren, som utgår från färjor.
          Kom personen från en annan sida när kontot skapades är den förstavalet (2026-11-28). */}
      <div className="ob-rad">
        {tillbaka ? (
          <button type="button" onClick={() => finish(tillbaka)} disabled={saving} className="ob-knapp">
            {saving ? 'Sparar…' : <>Fortsätt där du var <Pil /></>}
          </button>
        ) : (
          <button type="button" onClick={() => finish(planMal)} disabled={saving} className="ob-knapp">
            {saving ? 'Sparar…' : <>{planText} <Pil /></>}
          </button>
        )}
      </div>
      <p className="ob-etikett" style={{ margin: '26px 0 12px', color: F.havMork }}>Eller börja här</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
        {[
          ...(tillbaka ? [{ label: planText, path: planMal }] : []),
          { label: 'Flödet', path: '/feed' },
          { label: 'Utforska', path: '/upptack' },
          { label: 'Forum', path: '/forum' },
          { label: 'Logga tur', path: '/logga' },
          { label: 'Profil', path: '/profil' },
        ].map(({ label, path }) => (
          <button key={path} type="button" onClick={() => finish(path)} disabled={saving} className="ob-genvag">{label}</button>
        ))}
      </div>
      <button type="button" onClick={goBack} className="ob-lank" style={{ marginTop: 20 }}>Tillbaka</button>
    </>
  )

  return (
    <div className="ob">
      <style>{CSS}</style>
      <div key={animKey} className="ob-steg">{innehall}</div>
    </div>
  )
}
