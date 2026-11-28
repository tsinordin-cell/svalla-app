'use client'

import { useEffect, useId, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   Guidefilmen (live 2026-11-28 efter Toms ja; Tom: "Onboarding-video ... som visar runt
   lite i appen"). Ingen videofil: en animation i koden med de målade bilderna
   i public/kreativ, så att den laddar snabbt, går att ändra och följer
   startsidans stil. Ersätter steg 2 ("Det här kan du göra") i onboardingen.

   Ingen pausknapp (Tom 28 nov). Fem scener, ca 31 sekunder. Varje scen är en SVG (400 × 360) som skalar med
   skärmen. Rörelserna är CSS och SVG-animationer som startar när scenen visas.
   prefers-reduced-motion: filmen visas inte (OnboardingFlow visar korten).
───────────────────────────────────────────────────────────────────────────── */

const F = { papper: '#f7f1e7', kort: '#fbf7ee', black: '#143c78', hav: '#4472ab', havMork: '#375e96', orange: '#c8642a', text2: '#3d5865' }

export const SCENER = [
  // Inte "Välkommen ombord": den rubriken står redan på steget före filmen.
  { tid: 4000, rubrik: 'Så här funkar Svalla', text: 'En halv minut, sedan gör vi din profil.' },
  { tid: 8000, rubrik: 'Planera turen', text: 'Rutter längs kusten, färjor och båtlinjer på ett ställe.' },
  { tid: 8000, rubrik: 'Hitta öar och krogar', text: 'Gästhamnar, bryggor, bastur och mat, ö för ö.' },
  { tid: 7500, rubrik: 'Logga och dela', text: 'Spara turen med GPS och följ andra på sjön.' },
  { tid: 4000, rubrik: 'Nu gör vi din profil', text: 'Några korta frågor, sedan är du klar.' },
] as const

const CSS = `
.gf{width:100%;max-width:440px;margin:0 auto}
.gf-band{display:flex;gap:5px;margin:0 auto 14px;max-width:300px}
.gf-band button{flex:1;height:6px;padding:0;border:1.5px solid ${F.black};border-radius:999px;background:transparent;overflow:hidden;cursor:pointer;position:relative}
.gf-band button i{position:absolute;inset:0;width:0;background:${F.orange}}
.gf-band button.klar i{width:100%;background:${F.black}}
.gf-band button.nu i{animation:gf-fyll var(--tid) linear forwards}
.gf-band.paus button.nu i{animation-play-state:paused}
.gf-scen{position:relative;width:100%;aspect-ratio:400/360;border-radius:22px;background:linear-gradient(180deg,#efe7d6,#f7f1e7);border:2px solid ${F.black};box-shadow:3px 3px 0 ${F.black};overflow:hidden;animation:gf-tona .6s ease both}
.gf-scen svg{position:absolute;inset:0;width:100%;height:100%;display:block}
.gf-text{text-align:center;min-height:92px;margin:18px 0 6px}
.gf-text h2{font-family:'Playfair Display',Georgia,serif;font-weight:700;color:${F.hav};font-size:clamp(26px,7vw,32px);line-height:1.15;margin:0 0 6px;animation:gf-upp .5s .15s both}
.gf-text p{font-size:15px;line-height:1.5;color:${F.text2};margin:0 auto;max-width:360px;animation:gf-upp .5s .3s both}
.gf-styr{display:flex;justify-content:center;gap:18px;margin:0 0 18px}
.gf-styr button{border:none;background:none;padding:6px 8px;font:600 13.5px Inter,system-ui,sans-serif;color:${F.havMork};text-decoration:underline;text-underline-offset:3px;cursor:pointer;border-radius:8px}
.gf-styr button:focus-visible,.gf-band button:focus-visible{outline:3px solid #f2c27a;outline-offset:3px}

.gf-paus *{animation-play-state:paused!important}
.gf-in{animation:gf-in 3.2s cubic-bezier(.2,.8,.2,1) both}
.gf-gung{animation:gf-gung 4.5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 90%}
.gf-snurr{animation:gf-snurr 50s linear infinite;transform-box:fill-box;transform-origin:center}
.gf-zoom{animation:gf-zoom 2.2s cubic-bezier(.2,.8,.2,1) both;transform-box:fill-box;transform-origin:50% 100%}
.gf-pop{animation:gf-pop .55s cubic-bezier(.2,1.5,.4,1) both;transform-box:fill-box;transform-origin:50% 100%}
.gf-ror{animation:gf-ror 5.5s linear both}
.gf-kort{animation:gf-kort .7s cubic-bezier(.2,1.3,.4,1) both}
.gf-hjarta{animation:gf-pop .5s cubic-bezier(.2,1.6,.4,1) both;transform-box:fill-box;transform-origin:center}

@keyframes gf-fyll{to{width:100%}}
@keyframes gf-tona{from{opacity:0}to{opacity:1}}
@keyframes gf-upp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes gf-in{from{transform:translateX(-330px)}to{transform:translateX(0)}}
@keyframes gf-gung{0%,100%{transform:translateY(0) rotate(-1.3deg)}50%{transform:translateY(-3px) rotate(1.3deg)}}
@keyframes gf-snurr{to{transform:rotate(360deg)}}
@keyframes gf-zoom{from{transform:scale(.55);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes gf-pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes gf-ror{from{transform:translateX(-150px)}to{transform:translateX(330px)}}
@keyframes gf-kort{from{transform:translateY(-190px)}to{transform:translateY(0)}}
`

/* Målad vattenpöl, samma form som i onboardingen, i scenens koordinater. */
function Vatten({ x, y, b, h }: { x: number; y: number; b: number; h: number }) {
  const id = 'gf' + useId().replace(/[^a-zA-Z0-9]/g, '')
  const d = 'M8 17 C60 9 112 19 172 13 C232 7 300 17 392 11 C399 25 397 44 381 53 C300 59 102 59 22 55 C5 48 3 31 8 17 Z'
  return (
    <g transform={`translate(${x} ${y}) scale(${b / 400} ${h / 60})`}>
      <defs>
        <filter id={`${id}k`} x="-3%" y="-20%" width="106%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="b" />
          <feDisplacementMap in="SourceGraphic" in2="b" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}g`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" />
          <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -2.2 1.25" />
        </filter>
        <clipPath id={`${id}f`}><path d={d} /></clipPath>
      </defs>
      <g filter={`url(#${id}k)`}>
        <g clipPath={`url(#${id}f)`}>
          <rect width="400" height="60" fill={F.hav} />
          <rect width="400" height="60" filter={`url(#${id}g)`} opacity=".22" />
          <path d="M46 30 q9 -5 18 0 M120 42 q9 -5 18 0 M222 28 q9 -5 18 0 M300 44 q9 -5 18 0 M350 26 q9 -5 18 0"
            stroke="rgba(255,255,255,.45)" strokeWidth="1.6" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </g>
      </g>
    </g>
  )
}

function Bild({ href, x, y, b, h, className, style }: { href: string; x: number; y: number; b: number; h: number; className?: string; style?: React.CSSProperties }) {
  return <image href={href} x={x} y={y} width={b} height={h} className={className} style={style} preserveAspectRatio="xMidYMid meet" />
}

/* Skylt i startscenens stil (.ki-skylt): papper, bläckkant, förskjuten skugga. */
function Skylt({ x, y, text, ikon, fordrojning }: { x: number; y: number; text: string; ikon: React.ReactNode; fordrojning: number }) {
  const b = 40 + text.length * 9.2
  return (
    <g className="gf-pop" style={{ animationDelay: `${fordrojning}s` }}>
      <line x1={x + 18} y1={y + 30} x2={x + 18} y2={y + 52} stroke={F.black} strokeWidth="2" strokeLinecap="round" />
      <rect x={x + 3} y={y + 3} width={b} height={30} rx="12" fill={F.black} />
      <rect x={x} y={y} width={b} height={30} rx="12" fill={F.kort} stroke={F.black} strokeWidth="2" />
      <g transform={`translate(${x + 9} ${y + 7})`} fill="none" stroke={F.orange} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ikon}</g>
      <text x={x + 30} y={y + 20.5} fontFamily="'Playfair Display',Georgia,serif" fontSize="15" fill={F.black}>{text}</text>
    </g>
  )
}

/* ── Scenerna ───────────────────────────────────────────────────────────── */

function Valkommen() {
  return (
    <svg viewBox="0 0 400 360" aria-hidden>
      <Bild href="/kreativ/scen-sol.webp" x={24} y={22} b={72} h={72} className="gf-snurr" />
      <Bild href="/kreativ/scen-vastkust.webp" x={262} y={196} b={118} h={52} />
      <Vatten x={8} y={230} b={384} h={112} />
      <g className="gf-in">
        <g className="gf-gung">
          <Bild href="/kreativ/thorkel-bat-v.webp" x={86} y={108} b={228} h={190} />
        </g>
      </g>
    </svg>
  )
}

function Planera() {
  const rutt = 'M118 236 C160 290 214 296 246 262 S300 214 322 206'
  const id = 'gf' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 400 360" aria-hidden>
      <Vatten x={-6} y={150} b={412} h={200} />
      <Bild href="/kreativ/scen-o.webp" x={8} y={170} b={150} h={67} />
      <Bild href="/kreativ/scen-vastkust.webp" x={262} y={160} b={130} h={58} />
      <defs>
        <mask id={`${id}m`}>
          <path d={rutt} fill="none" stroke="#fff" strokeWidth="10" pathLength={1} strokeDasharray="1" strokeDashoffset="1">
            <animate attributeName="stroke-dashoffset" from="1" to="0" begin="0.6s" dur="4.4s" fill="freeze" />
          </path>
        </mask>
      </defs>
      <path d={rutt} fill="none" stroke={F.kort} strokeWidth="3.4" strokeDasharray="7 7" strokeLinecap="round" mask={`url(#${id}m)`} />
      <g opacity="0">
        <set attributeName="opacity" to="1" begin="0.6s" fill="freeze" />
        <image href="/kreativ/scen-angbat.webp" x={-44} y={-40} width={88} height={44} />
        <animateMotion path={rutt} begin="0.6s" dur="4.4s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .4 1" />
      </g>
      <Skylt x={26} y={112} text="Stockholm" fordrojning={0.2} ikon={<circle cx="8" cy="8" r="4.5" />} />
      <Skylt x={252} y={100} text="Sandhamn" fordrojning={4.6} ikon={<path d="M8 2v12M3 9l5 5 5-5" />} />
    </svg>
  )
}

function Hitta() {
  return (
    <svg viewBox="0 0 400 360" aria-hidden>
      <Vatten x={-6} y={262} b={412} h={92} />
      <g className="gf-zoom">
        <Bild href="/kreativ/scen-vastkust.webp" x={30} y={150} b={340} h={151} />
      </g>
      <Skylt x={34} y={96} text="Krog" fordrojning={1.8} ikon={<><path d="M4 2v6a3 3 0 0 0 6 0V2M7 8v8" /><path d="M14 2c-2 2-2 6 0 7v7" /></>} />
      <Skylt x={146} y={56} text="Gästhamn" fordrojning={2.9} ikon={<><circle cx="8" cy="4" r="2.4" /><path d="M8 6.5V16M3 11c0 3 2.4 5 5 5s5-2 5-5" /></>} />
      <Skylt x={268} y={104} text="Bastu" fordrojning={4} ikon={<path d="M3 15c3-3 0-6 3-9M8 15c3-3 0-6 3-9M13 15c2-2 0-5 2-7" />} />
    </svg>
  )
}

function Logga() {
  const id = 'gf' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <svg viewBox="0 0 400 360" aria-hidden>
      <Vatten x={-6} y={196} b={412} h={150} />
      <defs>
        <mask id={`${id}m`}>
          <rect x="0" y="0" height="360" width="0" fill="#fff">
            <animate attributeName="width" from="0" to="400" begin="0s" dur="5.5s" fill="freeze" />
          </rect>
        </mask>
      </defs>
      <path d="M-10 286 C60 270 120 300 190 280 S320 262 420 276" fill="none" stroke={F.kort} strokeWidth="3" strokeDasharray="6 7" strokeLinecap="round" mask={`url(#${id}m)`} />
      <g className="gf-ror" style={{ animationDelay: '.4s' }}>
        <Bild href="/kreativ/scen-ejder.webp" x={-100} y={276} b={52} h={28} />
        <Bild href="/kreativ/scen-ejderunge.webp" x={-140} y={286} b={26} h={19} />
        <Bild href="/kreativ/scen-ejderunge.webp" x={-168} y={288} b={24} h={17} />
      </g>
      <g className="gf-ror">
        <Bild href="/kreativ/scen-eka.webp" x={0} y={250} b={130} h={46} />
      </g>
      <g className="gf-kort" style={{ animationDelay: '3.2s' }}>
        <rect x={63} y={33} width={274} height={118} rx="16" fill={F.black} />
        <rect x={60} y={30} width={274} height={118} rx="16" fill={F.kort} stroke={F.black} strokeWidth="2" />
        <circle cx={88} cy={58} r={14} fill={F.hav} stroke={F.black} strokeWidth="2" />
        <text x={88} y={63} textAnchor="middle" fontFamily="'Playfair Display',Georgia,serif" fontWeight="700" fontSize="14" fill={F.kort}>T</text>
        <text x={110} y={55} fontFamily="Inter,system-ui,sans-serif" fontWeight="700" fontSize="12.5" fill="#192830">@thomas-nordin</text>
        <text x={110} y={70} fontFamily="Inter,system-ui,sans-serif" fontSize="11" fill={F.text2}>loggade en tur</text>
        <text x={76} y={100} fontFamily="'Playfair Display',Georgia,serif" fontWeight="700" fontSize="17" fill={F.black}>Ekan till Grinda</text>
        <path d="M78 116 C110 108 140 124 176 114 S226 104 250 112" fill="none" stroke={F.orange} strokeWidth="2.6" strokeDasharray="5 5" strokeLinecap="round" />
        <g transform="translate(290 98)">
          <g className="gf-hjarta" style={{ animationDelay: '4.6s' }}>
            <circle r="16" fill={F.orange} stroke={F.black} strokeWidth="2" />
            <path d="M0 6 C-9 0 -9 -7 -4 -8 C-2 -8.5 -0.5 -7 0 -5.5 C0.5 -7 2 -8.5 4 -8 C9 -7 9 0 0 6 Z" fill={F.kort} />
          </g>
        </g>
      </g>
    </svg>
  )
}

function Profil() {
  return (
    <svg viewBox="0 0 400 360" aria-hidden>
      <Bild href="/kreativ/scen-sol.webp" x={304} y={22} b={64} h={64} className="gf-snurr" />
      <Bild href="/kreativ/scen-flagga.webp" x={22} y={150} b={34} h={80} />
      <Bild href="/kreativ/scen-fyr.webp" x={42} y={168} b={86} h={85} />
      <Vatten x={8} y={230} b={384} h={112} />
      <g className="gf-gung">
        <Bild href="/kreativ/thorkel-bat-v.webp" x={136} y={112} b={222} h={185} />
      </g>
      <g className="gf-pop" style={{ animationDelay: '.8s' }}>
        <rect x={135} y={31} width={136} height={42} rx="21" fill={F.black} />
        <rect x={132} y={28} width={136} height={42} rx="21" fill={F.kort} stroke={F.black} strokeWidth="2" />
        <circle cx={154} cy={49} r={13} fill={F.hav} stroke={F.black} strokeWidth="1.8" />
        <text x={154} y={54} textAnchor="middle" fontFamily="'Playfair Display',Georgia,serif" fontWeight="700" fontSize="13" fill={F.kort}>?</text>
        <text x={176} y={54} fontFamily="'Playfair Display',Georgia,serif" fontSize="15" fill={F.black}>Din profil</text>
      </g>
    </svg>
  )
}

const SCEN_KOMPONENT = [Valkommen, Planera, Hitta, Logga, Profil]

/**
 * Spelar de fem scenerna i följd. onSlut anropas när sista scenen är klar
 * (guiden går då inte vidare själv; personen trycker Nästa).
 */
export default function GuideFilm({ onSlut }: { onSlut?: () => void }) {
  const [scen, setScen] = useState(0)
  const [omgang, setOmgang] = useState(0)
  const [paus, setPaus] = useState(false)
  const [slut, setSlut] = useState(false)

  useEffect(() => {
    if (paus || slut) return
    const t = window.setTimeout(() => {
      if (scen < SCENER.length - 1) setScen(scen + 1)
      else { setSlut(true); onSlut?.() }
    }, SCENER[scen]!.tid)
    return () => window.clearTimeout(t)
    // omgang: starta om timern när filmen spelas igen
  }, [scen, paus, slut, omgang, onSlut])

  // Pausa när fliken inte syns, så att ingen scen går förlorad.
  useEffect(() => {
    const vid = () => setPaus(document.hidden)
    document.addEventListener('visibilitychange', vid)
    return () => document.removeEventListener('visibilitychange', vid)
  }, [])

  const ga = (i: number) => { setScen(i); setSlut(false); setOmgang(o => o + 1) }
  const Scen = SCEN_KOMPONENT[scen]!
  const info = SCENER[scen]!

  return (
    <div className="gf">
      <style>{CSS}</style>
      <div className={`gf-band${paus ? ' paus' : ''}`} role="group" aria-label="Filmens delar">
        {SCENER.map((s, i) => (
          <button key={`${i}-${i === scen ? omgang : 0}`} type="button" onClick={() => ga(i)} aria-label={`Del ${i + 1}: ${s.rubrik}`} aria-current={i === scen}
            className={i < scen || (slut && i === scen) ? 'klar' : i === scen ? 'nu' : ''} style={{ ['--tid' as string]: `${s.tid}ms` }}>
            <i />
          </button>
        ))}
      </div>
      <div key={`${scen}-${omgang}`} className={`gf-scen${paus ? ' gf-paus' : ''}`}>
        <Scen />
      </div>
      <div key={`t-${scen}`} className="gf-text" aria-live="polite">
        <h2>{info.rubrik}</h2>
        <p>{info.text}</p>
      </div>
      {/* Ingen pausknapp (Tom 28 nov). Filmen står bara still när fliken inte syns. */}
      <div className="gf-styr">
        {slut ? <button type="button" onClick={() => ga(0)}>Spela igen</button> : <span aria-hidden style={{ height: 30 }} />}
      </div>
    </div>
  )
}
