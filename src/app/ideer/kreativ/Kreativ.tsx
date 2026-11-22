'use client'
/**
 * KREATIV VERKSTAD 2026-11-21. Sex idéer att bygga vidare på:
 * 1 Introt (prickar blir hav, båten kommer), 2 Frågan vid dörren, 3 Bandet som vecklas ut,
 * 4 Halsbrickan, 5 Partnersida i Svallastil, 6 Levande karta.
 * Allt om verksamheter är EXEMPEL. Önamnen och lägena kommer ur Svallas data.
 */
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'
import IntroV2 from './Intro'
import Karta from './Karta'
import dynamic from 'next/dynamic'

// Startsidans egen animering (samma komponent som på svalla.se), laddas först när man går in
const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), { ssr: false, loading: () => null })

export type KO = { slug: string; namn: string; lat: number; lng: number; omrade: 'stockholm' | 'vast' }
export type KBild = { url: string; fotograf: string; licens: string } | null
export type KFoto = { slug: string; namn: string; bild: KBild }

const NAVY = '#0d2440'
const HAV = '#1f5f99'
const ORANGE = '#c8642a'

/* Ett litet seedat slumptal, så att samma sak ritas likadant varje gång. */
function rnd(seed: number) {
  let s = seed >>> 0
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
}
function hash(t: string) { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619) } return h >>> 0 }
const ease = (t: number) => (t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t))
function useReducedMotion() {
  const [r, setR] = useState(false)
  useEffect(() => { const m = window.matchMedia('(prefers-reduced-motion: reduce)'); setR(m.matches) }, [])
  return r
}

/* Segelbåten, samma form som loggan B (två segel och mast), med skrov och två personer ombord. */
function Segelbat({ farg = NAVY, skrov, vinka = true }: { farg?: string; skrov?: string; vinka?: boolean }) {
  return (
    <svg viewBox="0 0 120 110" aria-hidden="true">
      <g fill={farg}>
        <rect x="57" y="4" width="3" height="78" rx="1.5" />
        <path d="M58.5 8 L104 74 L58.5 74 Z" opacity=".92" />
        <path d="M58.5 26 L16 72 L58.5 72 Z" opacity=".55" />
        <circle cx="40" cy="70" r="4.2" />
        <rect x="37" y="74" width="6" height="10" rx="2.5" />
        <circle cx="76" cy="69" r="4.2" />
        <rect x="73" y="73" width="6" height="11" rx="2.5" />
        <rect className={vinka ? 'kr-vinka' : ''} x="78" y="62" width="2.6" height="11" rx="1.3" style={{ transformOrigin: '79px 73px' }} />
        <path d="M8 82 Q60 92 112 82 L100 100 Q60 106 20 100 Z" fill={skrov ?? farg} />
      </g>
    </svg>
  )
}

function Del({ nr, id, rubrik, forebild, varfor, children }: { nr: string; id: string; rubrik: string; forebild: React.ReactNode; varfor: string; children: React.ReactNode }) {
  return (
    <section className="kr-del" id={id}>
      <div className="kr-skylt">
        <span className="kr-nr">{nr}</span>
        <div>
          <h2>{rubrik}</h2>
          <p className="kr-fore">Förebild: {forebild}</p>
          <p className="kr-varfor">{varfor}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

/* ─────────────────────────── 1. INTROT ─────────────────────────── */

const KAPITEL = [
  { namn: 'Prickar', fran: 0 },
  { namn: 'Hav', fran: 2800 },
  { namn: 'Båten', fran: 5400 },
  { namn: 'In', fran: 9000 },
]
const SLUT = 10500

function Intro({ onamn }: { onamn: string[] }) {
  const [inne, setInne] = useState(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const start = useRef(0)
  const [t, setT] = useState(0)
  const [kor, setKor] = useState(true)
  const reducerad = useReducedMotion()

  const prickar = useMemo(() => {
    const r = rnd(7)
    return Array.from({ length: 42 }, (_, i) => ({ x: 0.06 + r() * 0.88, y: 0.08 + r() * 0.62, r: 0.012 + r() * 0.022, d: 120 + i * 55 + r() * 50, vx: (r() - 0.5) * 0.02 }))
  }, [])

  useEffect(() => { if (reducerad) { setT(SLUT); setKor(false) } }, [reducerad])

  useEffect(() => {
    if (!kor) return
    let raf = 0
    start.current = performance.now() - t
    const loop = (nu: number) => {
      const tid = nu - start.current
      setT(Math.min(tid, SLUT))
      if (tid < SLUT) raf = requestAnimationFrame(loop)
      else setKor(false)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kor])

  // Prickar och hav ritas som flytande färg (metabollar): summan av alla prickars fält, med en mjuk kant.
  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const W = 400, H = Math.max(200, Math.round(400 * (c.clientHeight || 225) / (c.clientWidth || 400)))
    if (c.width !== W) c.width = W
    if (c.height !== H) c.height = H
    const ctx = c.getContext('2d')
    if (!ctx) return
    const img = ctx.createImageData(W, H)
    const d = img.data
    const havNiva = 1.05 - 0.5 * ease((t - 2600) / 2600)
    const drift = ease((t - 2600) / 2400)
    const blobs = prickar.map(p => {
      const g = ease((t - p.d) / 450)
      const vax = g * (1 + 0.18 * Math.sin((t - p.d) / 140) * (1 - ease((t - p.d - 450) / 600))) * (1 - 0.75 * drift)
      return { x: (p.x + p.vx * drift) * W, y: (p.y + drift * (havNiva + 0.06 - p.y)) * H, rr: Math.pow(p.r * W * vax, 2) }
    }).filter(b => b.rr > 0.01)
    const fas = t / 600
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        let f = 0
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i]!
          const dx = x - b.x, dy = y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 > b.rr * 30) continue
          f += b.rr / (d2 + 1)
        }
        const yta = havNiva * H + Math.sin(x * 0.03 + fas) * 3.5 + Math.sin(x * 0.07 - fas * 1.3) * 2
        f += Math.max(0, (y - yta) / 8 + 1) * (y > yta - 8 ? 1 : 0)
        const a = f < 0.93 ? 0 : f > 1.0 ? 1 : (f - 0.93) / 0.07
        const o = (y * W + x) * 4
        const djup = y / H
        d[o] = 31 - djup * 12; d[o + 1] = 95 - djup * 30; d[o + 2] = 153 - djup * 30; d[o + 3] = a * 255
      }
    }
    ctx.putImageData(img, 0, 0)
  }, [t, prickar])

  const kap = KAPITEL.reduce((acc, k, i) => (t >= k.fran ? i : acc), 0)
  const batX = -30 + 72 * ease((t - 5400) / 3200)
  const havTopp = (1.05 - 0.5 * ease((t - 2600) / 2600)) * 100
  const visaBat = t > 5300
  const visaText = t > 7400
  const visaIn = t > 9000
  const hoppa = (ms: number) => { setT(ms); start.current = performance.now() - ms; if (!kor && ms < SLUT) setKor(true) }

  return (
    <div className="kr-scen kr-intro">
      <canvas ref={canvas} className="kr-goo" aria-hidden="true" />
      {visaBat && (
        <div className="kr-bat" style={{ left: `${batX}%`, bottom: `${100 - havTopp}%` }}>
          <div className="kr-bat-inne"><Segelbat skrov={ORANGE} /></div>
        </div>
      )}
      <div className={visaText ? 'kr-intro-text syns' : 'kr-intro-text'}>
        <SvallaLogo height={34} color={NAVY} />
        <span>Sveriges samlade skärgårdssida</span>
      </div>
      {visaIn && (
        <div className="kr-intro-in">
          <button type="button" className="kr-pensel" onClick={() => setInne(true)}>Gå in på Svalla <i>→</i></button>
          <small>Knappen leder vidare till startsidan, här med bandet från del 3.</small>
        </div>
      )}
      {inne && (
        <div className="kr-intro-over">
          <Bandet onamn={onamn} />
          <button type="button" className="kr-spela kr-igen" onClick={() => { setInne(false); hoppa(0) }}>Spela introt igen</button>
        </div>
      )}
      <div className="kr-tidslinje">
        {KAPITEL.map((k, i) => {
          const nasta = KAPITEL[i + 1]?.fran ?? SLUT
          const p = Math.max(0, Math.min(1, (t - k.fran) / (nasta - k.fran)))
          return (
            <button key={k.namn} type="button" onClick={() => hoppa(k.fran)} className={i === kap ? 'pa' : ''}>
              <span>{k.namn}</span><i style={{ transform: `scaleX(${p})` }} />
            </button>
          )
        })}
        <button type="button" className="kr-hoppa" onClick={() => hoppa(SLUT)}>Hoppa över</button>
      </div>
    </div>
  )
}

/* Efter "Gå in på Svalla": havet har fyllt bilden, det glider upp med banden i kölvattnet och startsidans egen animering tar över. */
function StartHero() {
  // Samma säsongsregel som startsidan: vinter 13 november till och med februari
  const [variant] = useState<1 | 6>(() => { const nu = new Date(), m = nu.getMonth(); return m === 11 || m <= 1 || (m === 10 && nu.getDate() >= 13) ? 6 : 1 })
  return (
    <div className="kr-scen kr-start">
      <div className="kr-start-bg"><HeroAnimation variant={variant} /></div>
      <div className="kr-start-inne">
        <h3>Planera din<br /><em>skärgårdsvistelse</em></h3>
        <p>Öar, krogar, badplatser och båttider, samlat på ett ställe.</p>
        <Link href="/" className="kr-start-knapp">Till startsidan</Link>
      </div>
      <div className="kr-start-hav" />
      <svg className="kr-band-svg" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        {BAND.map((f, i) => (
          <path key={f} className="kr-bandet kr-bandet2" style={{ animationDelay: `${120 + i * 70}ms` }} d="M -260 640 Q 500 120 1260 640" stroke={f} strokeWidth="150" fill="none" />
        ))}
      </svg>
    </div>
  )
}

/* Startscenen: ett alternativ till startsidans animering. Samma stil som introt, men den börjar med havet och har knappar in till sajten. */
function ScenDel() {
  return <IntroV2 varld />
}

/* Introt version 2 (WebGL2, egen fil) och vidare in till startsidans animering. */
function IntroDel() {
  const [inne, setInne] = useState(false)
  if (!inne) return <IntroV2 efter={() => setInne(true)} />
  return (
    <div className="kr-intro-v2">
      <StartHero />
      <button type="button" className="kr-spela kr-igen2" onClick={() => setInne(false)}>Spela introt igen</button>
    </div>
  )
}

/* ─────────────────────────── 2. FRÅGAN ─────────────────────────── */

const FRAGOR: [string, string, string][] = [
  ['Hur öppnar du surströmmingen?', 'Under vatten', 'Över vatten'],
  ['Första doppet för säsongen?', 'Midsommar', 'I maj, rakt i'],
  ['Kaffet på bryggan?', 'Kokkaffe', 'Bryggkaffe'],
  ['Hur tar du dig ut?', 'Egen båt', 'Skärgårdsbåten'],
  ['Strömming eller sill?', 'Strömming', 'Sill'],
  ['Var lägger du till?', 'Gästhamnen', 'Naturhamn'],
  ['Morgondopp?', 'Alltid', 'Aldrig'],
  ['Klippa eller sandstrand?', 'Klippa', 'Sand'],
]
const SVAR = ['Bra val. Välkommen ombord.', 'Det säger mycket om dig. Kliv på.', 'Noterat. Vi ses på bryggan.', 'Rätt svar finns inte. Välkommen in.']

function Fragan() {
  const [i, setI] = useState(0)
  const [svar, setSvar] = useState<string | null>(null)
  useEffect(() => { setI(Math.floor(Math.random() * FRAGOR.length)) }, [])
  const f = FRAGOR[i]!
  const ny = () => { setSvar(null); setI(n => (n + 1 + Math.floor(Math.random() * (FRAGOR.length - 1))) % FRAGOR.length) }
  return (
    <div className="kr-scen kr-fraga">
      <div className="kr-fraga-inne">
        <SvallaLogo height={26} color={NAVY} />
        <small>Innan du kliver i land</small>
        <h3>{f[0]}</h3>
        {!svar ? (
          <div className="kr-fraga-val">
            <button type="button" className="kr-pensel" onClick={() => setSvar(SVAR[hash(f[1]) % SVAR.length]!)}>{f[1]}</button>
            <button type="button" className="kr-pensel ljus" onClick={() => setSvar(SVAR[hash(f[2]) % SVAR.length]!)}>{f[2]}</button>
          </div>
        ) : (
          <div className="kr-fraga-svar">
            <p>{svar}</p>
            <button type="button" className="kr-pensel" onClick={ny}>Gå in på Svalla <i>→</i></button>
          </div>
        )}
        <button type="button" className="kr-lank" onClick={ny}>Visa en annan fråga</button>
      </div>
    </div>
  )
}

/* ─────────────────────────── 3. BANDET ─────────────────────────── */

const BAND = ['#0d2440', '#1f5f99', '#6fa8c9', '#f3ece0', '#f2a25c', '#c8642a']

function Bandet({ onamn }: { onamn: string[] }) {
  const [k, setK] = useState(0)
  const namn = useMemo(() => {
    const r = rnd(42 + k)
    const val = [...onamn].sort(() => r() - 0.5).slice(0, 18)
    return val.map((n, i) => {
      const vinkel = (i / val.length) * Math.PI * 2 + r() * 0.3
      const rad = 30 + r() * 14
      return { n, x: 50 + Math.cos(vinkel) * rad, y: 50 + Math.sin(vinkel) * rad * 0.82, d: 1500 + i * 60, s: 0.75 + r() * 0.45 }
    })
  }, [onamn, k])
  return (
    <div className="kr-scen kr-band" key={k}>
      <div className="kr-band-avslojat">
        {namn.map(p => (
          <span key={p.n} className="kr-onamn" style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.d}ms`, fontSize: `${p.s}em` }}>{p.n}</span>
        ))}
        <div className="kr-band-ord">
          <b>Svalla</b>
          <span>Sveriges samlade skärgårdssida</span>
        </div>
      </div>
      <svg className="kr-band-svg" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        {BAND.map((f, i) => (
          <path key={f} className="kr-bandet" style={{ animationDelay: `${i * 90}ms` }} d="M -260 640 Q 500 120 1260 640" stroke={f} strokeWidth="150" fill="none" />
        ))}
      </svg>
      <button type="button" className="kr-spela" onClick={() => setK(n => n + 1)}>Spela igen</button>
    </div>
  )
}

/* ─────────────────────────── 4. HALSBRICKAN ─────────────────────────── */

function Halsbricka() {
  const yta = useRef<HTMLDivElement>(null)
  const band = useRef<SVGPathElement>(null)
  const kort = useRef<HTMLDivElement>(null)
  const drar = useRef<{ x: number; y: number } | null>(null)
  const [namn, setNamn] = useState('Värdshuset vid bryggan')
  const [o, setO] = useState('Möja')
  const [omstart, setOmstart] = useState(0)

  useEffect(() => {
    const el = yta.current
    if (!el) return
    const N = 16, SEG = 15
    let W = el.clientWidth
    const fast = () => ({ x: W / 2, y: -10 })
    const p = Array.from({ length: N }, (_, i) => ({ x: W / 2 + (i % 2 ? 6 : -6), y: -260 + i * 4, px: W / 2, py: -260 + i * 4 }))
    p.forEach(q => { q.px = q.x; q.py = q.y })
    let raf = 0
    const steg = () => {
      W = el.clientWidth
      const a = fast()
      for (let i = 1; i < N; i++) {
        const q = p[i]!
        const vx = (q.x - q.px) * 0.985, vy = (q.y - q.py) * 0.985
        q.px = q.x; q.py = q.y
        q.x += vx; q.y += vy + 0.55
      }
      for (let it = 0; it < 14; it++) {
        p[0]!.x = a.x; p[0]!.y = a.y
        if (drar.current) { p[N - 1]!.x = drar.current.x; p[N - 1]!.y = drar.current.y }
        for (let i = 0; i < N - 1; i++) {
          const q1 = p[i]!, q2 = p[i + 1]!
          const dx = q2.x - q1.x, dy = q2.y - q1.y
          const dist = Math.hypot(dx, dy) || 0.001
          const diff = (dist - SEG) / dist / 2
          if (i > 0) { q1.x += dx * diff; q1.y += dy * diff }
          q2.x -= dx * diff; q2.y -= dy * diff
        }
      }
      const sista = p[N - 1]!, forra = p[N - 2]!
      const vinkel = Math.atan2(sista.y - forra.y, sista.x - forra.x) - Math.PI / 2
      if (band.current) band.current.setAttribute('d', 'M ' + p.map(q => `${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' L '))
      if (kort.current) kort.current.style.transform = `translate(${sista.x}px, ${sista.y}px) translate(-50%, 0) rotate(${vinkel}rad)`
      raf = requestAnimationFrame(steg)
    }
    raf = requestAnimationFrame(steg)
    const pos = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top - 8 } }
    const ner = (e: PointerEvent) => { if (kort.current?.contains(e.target as Node)) { drar.current = pos(e); (e.target as Element).setPointerCapture?.(e.pointerId) } }
    const flytta = (e: PointerEvent) => { if (drar.current) drar.current = pos(e) }
    const upp = () => { drar.current = null }
    el.addEventListener('pointerdown', ner)
    window.addEventListener('pointermove', flytta)
    window.addEventListener('pointerup', upp)
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointerdown', ner); window.removeEventListener('pointermove', flytta); window.removeEventListener('pointerup', upp) }
  }, [omstart])

  return (
    <div className="kr-hals">
      <div className="kr-scen kr-hals-yta" ref={yta} key={omstart}>
        <svg className="kr-hals-band" aria-hidden="true"><path ref={band} /></svg>
        <div className="kr-kort" ref={kort} style={{ transform: 'translate(-9999px, 0)' }}>
          <span className="kr-kort-hal" />
          <SvallaLogo height={20} color={NAVY} />
          <em>Svalla partner</em>
          <b>{namn || 'Ert namn'}</b>
          <span>{o || 'Er ö'}</span>
          <small>Sedan 2027 · Exempel</small>
        </div>
        <p className="kr-hals-tips">Dra i kortet</p>
      </div>
      <div className="kr-hals-falt">
        <label>Verksamhetens namn<input value={namn} maxLength={34} onChange={e => setNamn(e.target.value)} /></label>
        <label>Ö eller ort<input value={o} maxLength={24} onChange={e => setO(e.target.value)} /></label>
        <button type="button" className="kr-spela mork" onClick={() => setOmstart(n => n + 1)}>Släpp ner igen</button>
      </div>
    </div>
  )
}

/* ─────────────────────────── 5. PARTNERSIDA I SVALLASTIL ─────────────────────────── */

const VAGIG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M2 4 Q25 0 50 3 T98 2 Q100 30 97 50 T99 97 Q75 100 50 97 T3 99 Q0 70 3 50 T2 4 Z'/%3E%3C/svg%3E\")"

function Partnersida({ foton }: { foton: KFoto[] }) {
  const [natt, setNatt] = useState(false)
  const [mus, setMus] = useState({ x: 0, y: 0 })
  const scen = useRef<HTMLDivElement>(null)
  const flytta = (e: React.PointerEvent) => {
    const r = scen.current?.getBoundingClientRect()
    if (!r) return
    setMus({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 })
  }
  const lager = (djup: number) => ({ transform: `translate(${(-mus.x * djup).toFixed(1)}px, ${(-mus.y * djup * 0.5).toFixed(1)}px)` })
  const erbj = [
    { rubrik: 'Fri kaffe till lunchen', rad: 'Vid lunch, en per gäst', f: foton[0] },
    { rubrik: 'Bastu efter middagen', rad: 'Vardagar i september', f: foton[2] },
    { rubrik: 'Frukost på bryggan', rad: 'För den som sover över', f: foton[1] },
  ]
  return (
    <div className={natt ? 'kr-partner natt' : 'kr-partner'}>
      <div className="kr-scen kr-p-hero" ref={scen} onPointerMove={flytta}>
        <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice" className="kr-p-svg" aria-hidden="true">
          <defs>
            <linearGradient id="krHimmel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={natt ? '#0b1a33' : '#bcd9ea'} />
              <stop offset="1" stopColor={natt ? '#22406b' : '#f6e7c8'} />
            </linearGradient>
            <filter id="krKorn"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0" /></filter>
          </defs>
          <rect width="1000" height="560" fill="url(#krHimmel)" />
          {natt && Array.from({ length: 40 }, (_, i) => { const r = rnd(i + 3); return <circle key={i} cx={r() * 1000} cy={r() * 260} r={r() * 1.6 + 0.4} fill="#fff" opacity={0.4 + r() * 0.5} /> })}
          <g style={lager(6)}><circle cx="790" cy="140" r="58" fill={natt ? '#f3ece0' : '#f2a25c'} opacity={natt ? 0.95 : 0.9} /></g>
          <g style={lager(10)}><path d="M0 330 Q120 270 260 300 T520 290 T780 300 T1000 285 V400 H0 Z" fill={natt ? '#1b2f4f' : '#8fb3a8'} /></g>
          <g style={lager(18)}>
            <path d="M-20 380 Q140 300 330 330 Q430 345 470 380 Z" fill={natt ? '#14243d' : '#4f7a5a'} />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${60 + i * 42} ${352 - (i % 3) * 8} l14 -46 l14 46 Z`} fill={natt ? '#0e1b30' : '#2f5a3e'} />)}
            <g transform="translate(250 312)">
              <rect width="62" height="40" fill="#a33a2a" /><path d="M-6 0 L31 -26 L68 0 Z" fill={natt ? '#2a2a2a' : '#3b3b3b'} />
              <rect x="10" y="12" width="12" height="12" fill={natt ? '#ffd27a' : '#f3ece0'} /><rect x="40" y="12" width="12" height="12" fill={natt ? '#ffd27a' : '#f3ece0'} />
            </g>
          </g>
          <g style={lager(26)}>
            <rect y="378" width="1000" height="200" fill={natt ? '#10294a' : HAV} />
            {Array.from({ length: 7 }, (_, i) => <path key={i} className="kr-p-vag" style={{ animationDelay: `${i * 0.4}s` }} d={`M${-40 + (i % 2) * 70} ${405 + i * 22} q30 -8 60 0 t60 0 t60 0`} stroke="#fff" strokeOpacity=".35" strokeWidth="3" fill="none" />)}
          </g>
          <rect width="1000" height="560" filter="url(#krKorn)" />
        </svg>
        <div className="kr-p-bat" style={lager(32)}><Segelbat farg={natt ? '#f3ece0' : NAVY} /></div>
        <div className="kr-p-topp">
          <div className="kr-p-dagnatt" role="group" aria-label="Dag eller natt">
            <button type="button" className={!natt ? 'pa' : ''} onClick={() => setNatt(false)}>☀ Dag</button>
            <button type="button" className={natt ? 'pa' : ''} onClick={() => setNatt(true)}>☾ Natt</button>
          </div>
        </div>
        <div className="kr-p-rubrik">
          <small>Svalla partner · Exempel</small>
          <h3>Värdshuset<br />vid bryggan</h3>
          <button type="button" className="kr-pensel">Boka bord <i>→</i></button>
        </div>
      </div>
      <div className="kr-p-kort">
        {erbj.map(e => (
          <article key={e.rubrik}>
            <div className="kr-p-bild" style={{ WebkitMaskImage: VAGIG, maskImage: VAGIG }}>
              {e.f?.bild && <div style={{ backgroundImage: `url('${e.f.bild.url}')` }} />}
            </div>
            <b>{e.rubrik}</b>
            <span>{e.rad} · Exempel</span>
            {e.f?.bild && <small>Foto: {e.f.namn}, {e.f.bild.fotograf}, {e.f.bild.licens}</small>}
          </article>
        ))}
      </div>
    </div>
  )
}

/* Levande kartan (del 2) ligger i Karta.tsx och kartmotor.ts. */

/* ─────────────────────────── SIDAN ─────────────────────────── */

const DELAR = [
  ['intro', 'Introt'], ['karta', 'Kartan'], ['fragan', 'Frågan'], ['halsbricka', 'Halsbrickan'], ['bandet', 'Bandet'], ['partner', 'Partnersidan'], ['scen', 'Startscenen'],
] as const

export default function Kreativ({ oar, foton, onamn }: { oar: KO[]; foton: KFoto[]; onamn: string[] }) {
  return (
    <div className="kr">
      <style>{CSS}</style>
      <div className="kr-varning">Kreativ verkstad, förhandsvisning. Verksamheter, namn och förmåner är exempel.</div>
      <header className="kr-topp"><Link href="/" aria-label="Svalla, till startsidan"><SvallaLogo height={22} color={NAVY} /></Link></header>
      <section className="kr-intro-sida">
        <small>Kreativ verkstad</small>
        <h1>Idéer som får Svalla att kännas levande</h1>
        <p>Sex idéer att bygga vidare på. Allt rör sig på riktigt, så klicka, dra och spela igen.</p>
        <nav className="kr-index" aria-label="Innehåll">{DELAR.map(([id, n], i) => <a key={id} href={`#${id}`}><span>{i + 1}</span>{n}</a>)}</nav>
      </section>

      <Del nr="1" id="intro" rubrik="Introt: prickarna blir ett hav" forebild={<><a href="https://plastichuman.org/" target="_blank" rel="noopener noreferrer">plastichuman.org</a> och tidslinjen hos <a href="https://www.hoverstat.es/features/xk-studio/" target="_blank" rel="noopener noreferrer">XK Studio</a></>} varfor="Version 2, byggd i WebGL2 i full skärpa. Tusentals partiklar blir bläck som formar Sverige, sedan Svallas segelbåt med två personer ombord, och flyter ut till ett hav. Ett vätskefält under ytan krusar kanten hela tiden. Båten glider ner i havet och texten inverterar det där den korsar. Ljudet är en lugn havsbris med stilla vågor och är av tills man slår på det. När man trycker på Gå in på Svalla stiger havet och fyller bilden, banden sveper förbi och startsidans egen animering tar över.">
        <IntroDel />
      </Del>
      <Del nr="2" id="karta" rubrik="Levande karta: segla, plocka plast och ta medaljen" forebild={<>Route 66-kartan av Ohsson Studio</>} varfor="Tryck på en ö så seglar båten till dess brygga, runt allt som ligger emellan och aldrig över land. Rutten ritas fram som en streckad linje. Längs kusten flyter tio plastpåsar. Plocka alla och få en medalj, öst och väst var för sig.">
        <Karta oar={oar} />
      </Del>
      <Del nr="3" id="fragan" rubrik="Frågan vid dörren" forebild={<>välkomstskärmen på <a href="https://stayveluwe.com/" target="_blank" rel="noopener noreferrer">stayveluwe.com</a></>} varfor="En lekfull fråga med två svar innan man kommer in. Frågan byts varje gång och båda svaren leder vidare. Kan visas efter introt eller i stället för det.">
        <Fragan />
      </Del>
      <Del nr="4" id="halsbricka" rubrik="Halsbrickan på partnersidan" forebild={<><a href="https://www.awwwards.com/inspiration/studio-pass-lanyard-carter-ogunsola" target="_blank" rel="noopener noreferrer">Studio pass lanyard på Awwwards</a></>} varfor="Passerkortet faller ner från toppen när partnerns sida öppnas, gungar till ro och går att dra i. Skriv in ett namn och se kortet ändras, så kan en verksamhet se sitt eget.">
        <Halsbricka />
      </Del>
      <Del nr="5" id="bandet" rubrik="Startsidan: bandet som vecklas ut" forebild={<><a href="https://www.awwwards.com/inspiration/page-transition-sweet-tape" target="_blank" rel="noopener noreferrer">Sweet Tape på Awwwards</a></>} varfor="Band i Svallas färger sveper över skärmen och avslöjar Svalla, med riktiga ö-namn runt omkring. Kan också användas när man byter sida.">
        <Bandet onamn={onamn} />
      </Del>
      <Del nr="6" id="partner" rubrik="Partnersida i Svallastil" forebild={<><a href="https://stayveluwe.com/" target="_blank" rel="noopener noreferrer">stayveluwe.com</a></>} varfor="En levande skärgårdsscen i lager som rör sig när man för musen, dag och natt, penseldragen knapp och erbjudanden i vågiga ramar med öarnas riktiga foton.">
        <Partnersida foton={foton} />
      </Del>

      <Del nr="7" id="scen" rubrik="Startscenen: alternativ till startsidans animering" forebild={<>startbilden på <a href="https://stayveluwe.com/" target="_blank" rel="noopener noreferrer">stayveluwe.com</a></>} varfor="Samma stil som introt i del 1, tänkt som startbild. Havet stiger, båten seglar in och en ö med stuga och brygga, en fyr och en färja växer fram. På dem sitter knappar som leder till öar, boende, krogar, turplaneringen, färjor, kartan och aktiviteter. Ön, fyren och färjan är påhittade och föreställer ingen verklig plats.">
        <ScenDel />
      </Del>

      <section className="kr-avslut">
        <h2>Vad som behövs för att göra det på riktigt</h2>
        <ul>
          <li><b>Introt:</b> visas bara första besöket, alltid med Hoppa över, och aldrig för den som valt minskad rörelse i telefonen.</li>
          <li><b>Bilderna:</b> riktigt måleriska illustrationer som på stayveluwe kräver en illustratör eller ett bildverktyg. Här är scenen ritad i kod.</li>
          <li><b>Halsbrickan:</b> namnet hämtas från partnerns uppgifter när avtal finns.</li>
          <li><b>Kartan:</b> riktiga kustlinjer från OpenStreetMap, fler regioner som Höga kusten, och ett beslut om vad medaljen ska ge. Premiumprofilen finns inte än.</li>
        </ul>
      </section>
    </div>
  )
}

const CSS = `
.kr{background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;padding-bottom:80px;overflow-x:clip}
.kr h1,.kr h2,.kr h3{font-family:'Playfair Display',Georgia,serif;font-weight:400;color:${NAVY}}
.kr a{color:#b5591a}
.kr-varning{position:sticky;top:0;z-index:40;background:#fbe8c0;color:#7a4a10;font-size:13px;font-weight:600;text-align:center;padding:9px 16px}
.kr-topp{max-width:1160px;margin:0 auto;padding:18px 24px 0}
.kr-intro-sida{max-width:1160px;margin:0 auto;padding:28px 24px 0}
.kr-intro-sida small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#b5591a}
.kr-intro-sida h1{font-size:clamp(34px,5.4vw,62px);line-height:1.04;margin:10px 0 12px;max-width:820px}
.kr-intro-sida p{font-size:17px;line-height:1.6;color:#3d5664;margin:0 0 18px}
.kr-index{display:flex;flex-wrap:wrap;gap:8px}
.kr-index a{display:inline-flex;align-items:center;gap:8px;background:#fffdf8;border:1px solid rgba(150,110,60,.18);border-radius:999px;padding:7px 14px 7px 8px;font-size:13.5px;font-weight:600;color:${NAVY};text-decoration:none}
.kr-index a span{width:22px;height:22px;border-radius:50%;background:${NAVY};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px}
.kr-del{max-width:1160px;margin:0 auto;padding:72px 24px 0;scroll-margin-top:40px}
.kr-skylt{display:flex;gap:16px;align-items:flex-start;margin-bottom:22px;max-width:780px}
.kr-nr{flex-shrink:0;width:42px;height:42px;border-radius:50%;background:${NAVY};color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:19px;display:flex;align-items:center;justify-content:center}
.kr-skylt h2{font-size:clamp(26px,3.4vw,38px);line-height:1.1;margin:2px 0 8px}
.kr-fore{margin:0 0 6px;font-size:13.5px;color:#6b7f88}
.kr-varfor{margin:0;font-size:15.5px;line-height:1.6;color:#3d5664}
.kr-scen{position:relative;border-radius:26px;overflow:hidden;background:#fff;box-shadow:0 18px 50px rgba(13,36,64,.14);aspect-ratio:16/9;min-height:360px}
.kr-pensel{position:relative;border:none;cursor:pointer;font:inherit;font-family:'Playfair Display',Georgia,serif;font-size:19px;color:#fff;background:${ORANGE};padding:14px 30px;border-radius:40% 55% 45% 60% / 60% 45% 55% 40%;box-shadow:0 8px 22px rgba(200,100,42,.3);transition:transform .2s}
.kr-pensel:hover{transform:rotate(-1.5deg) scale(1.03)}
.kr-pensel i{font-style:normal;margin-left:8px}
.kr-pensel.ljus{background:${NAVY};box-shadow:0 8px 22px rgba(13,36,64,.25)}
.kr-spela{position:absolute;right:16px;bottom:16px;z-index:5;border:1px solid rgba(255,255,255,.5);background:rgba(13,36,64,.55);color:#fff;font:inherit;font-size:13px;font-weight:600;border-radius:999px;padding:8px 14px;cursor:pointer;backdrop-filter:blur(6px)}
.kr-spela.mork{position:static;background:${NAVY};border:none}
.kr-goo{position:absolute;inset:0;width:100%;height:100%}
.kr-intro-v2{position:relative}
.kr-igen2{bottom:16px;right:16px}
.kr-start{background:#1b57a0}
.kr-start-bg{position:absolute;inset:0;background:linear-gradient(to bottom,#3d94d4 0%,#b0dcf2 58%,#2488c0 58%,#0a2e5a 100%)}
.kr-start-inne{position:absolute;left:0;right:0;top:9%;z-index:2;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 20px;animation:krOrd .9s .8s cubic-bezier(.2,.8,.2,1) both}
.kr-start-inne h3{font-family:'Playfair Display',Georgia,serif;font-weight:900;font-size:clamp(28px,4.6vw,58px);line-height:1.06;color:#fff;letter-spacing:-.02em;text-shadow:0 2px 24px rgba(5,15,30,.6);margin:0}
.kr-start-inne h3 em{color:#f0a866}
.kr-start-inne p{font-size:clamp(13px,1.5vw,16px);font-weight:300;color:rgba(255,255,255,.88);margin:10px 0 0;text-shadow:0 1px 10px rgba(5,15,30,.55)}
.kr-start-knapp{margin-top:16px;display:inline-block;background:#b5591a;color:#fff !important;font-weight:700;font-size:14px;border-radius:999px;padding:11px 22px;text-decoration:none}
.kr-start-hav{position:absolute;left:-6%;right:-6%;top:0;height:128%;z-index:3;background:#1b57a0;border-radius:0 0 50% 50%/0 0 20% 20%;animation:krHavUpp 1.25s .12s cubic-bezier(.7,0,.25,1) forwards}
@keyframes krHavUpp{to{transform:translateY(-112%)}}
.kr-bandet2{animation-duration:1.55s}
.kr-intro-over{position:absolute;inset:0;z-index:8}
.kr-intro-over .kr-scen{position:absolute;inset:0;aspect-ratio:auto;min-height:0;border-radius:0;box-shadow:none}
.kr-intro-over .kr-band>.kr-spela{display:none}
.kr-igen{z-index:9}
.kr-bat{position:absolute;width:15%;min-width:84px;transform:translate(-50%,14%)}
.kr-bat-inne{animation:krGung2 2.6s ease-in-out infinite}
.kr-vinka{animation:krVinka .9s ease-in-out infinite alternate}
@keyframes krVinka{from{transform:rotate(-30deg)}to{transform:rotate(25deg)}}
.kr-intro-text{position:absolute;left:0;right:0;top:12%;display:flex;flex-direction:column;align-items:center;gap:10px;opacity:0;transform:translateY(10px);transition:opacity .9s,transform .9s}
.kr-intro-text.syns{opacity:1;transform:none}
.kr-intro-text span{font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${NAVY}}
.kr-intro-in{position:absolute;left:0;right:0;bottom:78px;display:flex;flex-direction:column;align-items:center;gap:10px;animation:krUpp .6s ease both}
.kr-intro-in small{font-size:12px;color:rgba(255,255,255,.85);text-align:center;padding:0 16px}
@keyframes krUpp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.kr-tidslinje{position:absolute;left:12px;right:12px;bottom:12px;display:flex;gap:8px;align-items:center;background:rgba(13,36,64,.62);backdrop-filter:blur(6px);border-radius:14px;padding:9px 10px}
.kr-tidslinje button{flex:1;border:none;background:none;cursor:pointer;display:flex;flex-direction:column;gap:5px;padding:0;text-align:left}
.kr-tidslinje button span{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.75)}
.kr-tidslinje button.pa span{color:#fff}
.kr-tidslinje button i{display:block;height:3px;border-radius:2px;background:#fff;transform-origin:left;box-shadow:inset 0 0 0 10px rgba(255,255,255,.95)}
.kr-tidslinje button:not(.kr-hoppa){background-image:linear-gradient(rgba(255,255,255,.3),rgba(255,255,255,.3));background-size:100% 3px;background-position:0 100%;background-repeat:no-repeat}
.kr-tidslinje .kr-hoppa{flex:none;font-size:12px;font-weight:700;color:${NAVY};background:#fff;border-radius:999px;padding:6px 12px;margin-left:4px;background-image:none}
.kr-fraga{background:#fff;display:flex;align-items:center;justify-content:center;background-image:radial-gradient(circle at 15% 20%,rgba(31,95,153,.14) 0 60px,transparent 61px),radial-gradient(circle at 85% 75%,rgba(31,95,153,.12) 0 90px,transparent 91px),radial-gradient(circle at 75% 15%,rgba(200,100,42,.12) 0 40px,transparent 41px)}
.kr-fraga-inne{display:flex;flex-direction:column;align-items:center;gap:12px;text-align:center;padding:24px}
.kr-fraga-inne small{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a;margin-top:10px}
.kr-fraga-inne h3{font-size:clamp(28px,4.4vw,52px);line-height:1.08;margin:0 0 10px;max-width:640px}
.kr-fraga-val{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.kr-fraga-svar{display:flex;flex-direction:column;align-items:center;gap:14px;animation:krUpp .4s ease both}
.kr-fraga-svar p{margin:0;font-size:18px;color:#3d5664}
.kr-lank{border:none;background:none;font:inherit;font-size:13.5px;color:#6b7f88;text-decoration:underline;cursor:pointer;margin-top:6px}
.kr-band{background:#f3ece0}
.kr-band-svg{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none}
.kr-bandet{transform:translateY(110%);animation:krBand 1.9s cubic-bezier(.7,0,.25,1) forwards}
@keyframes krBand{0%{transform:translateY(110%)}45%{transform:translateY(-8%)}100%{transform:translateY(-140%)}}
.kr-band-avslojat{position:absolute;inset:0}
.kr-band-ord{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;animation:krOrd 1s 1.1s cubic-bezier(.2,.8,.2,1) both}
.kr-band-ord b{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(64px,13vw,170px);line-height:.9;color:${NAVY};letter-spacing:-.02em}
.kr-band-ord span{font-size:clamp(11px,1.4vw,15px);font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#b5591a}
@keyframes krOrd{from{opacity:0;transform:scale(.92) translateY(20px)}to{opacity:1;transform:none}}
.kr-onamn{position:absolute;transform:translate(-50%,-50%);font-size:14px;color:#1f5f99;font-weight:600;white-space:nowrap;opacity:0;animation:krNamn .7s ease forwards}
@keyframes krNamn{from{opacity:0;transform:translate(-50%,-30%)}to{opacity:.75;transform:translate(-50%,-50%)}}
.kr-hals{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:20px;align-items:start}
.kr-hals-yta{background:radial-gradient(circle at 50% 30%,#1b3a63,#0d2440 70%);aspect-ratio:auto;height:560px;touch-action:none;user-select:none}
.kr-hals-band{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
.kr-hals-band path{fill:none;stroke:${ORANGE};stroke-width:12;stroke-linecap:round;stroke-linejoin:round}
.kr-kort{position:absolute;left:0;top:0;width:210px;transform-origin:50% 0;background:#fffdf8;border-radius:16px;padding:28px 18px 18px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;box-shadow:0 18px 40px rgba(0,0,0,.35);cursor:grab;will-change:transform}
.kr-kort:active{cursor:grabbing}
.kr-kort-hal{position:absolute;top:10px;left:50%;width:36px;height:8px;margin-left:-18px;border-radius:4px;background:#e2d7c4}
.kr-kort em{font-style:normal;font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#1e6b4f;background:#dff0e6;border-radius:999px;padding:4px 10px;margin-top:6px}
.kr-kort b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:22px;line-height:1.15;color:${NAVY};margin-top:6px}
.kr-kort span{font-size:13px;color:#52717f}
.kr-kort small{font-size:10.5px;color:#8a9aa2;margin-top:8px}
.kr-hals-tips{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:12px;color:rgba(255,255,255,.6);margin:0}
.kr-hals-falt{display:flex;flex-direction:column;gap:14px;background:#fffdf8;border:1px solid rgba(150,110,60,.16);border-radius:20px;padding:20px}
.kr-hals-falt label{display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600;color:${NAVY}}
.kr-hals-falt input{font:inherit;font-size:15px;padding:10px 12px;border-radius:10px;border:1px solid rgba(13,36,64,.2);background:#fff}
.kr-partner{border-radius:26px}
.kr-p-hero{aspect-ratio:16/9}
.kr-p-svg{position:absolute;inset:-20px;width:calc(100% + 40px);height:calc(100% + 40px)}
.kr-p-svg g{transition:transform .25s ease-out}
.kr-p-vag{animation:krVag 3.6s ease-in-out infinite alternate}
@keyframes krVag{from{transform:translateX(0)}to{transform:translateX(26px)}}
.kr-p-bat{position:absolute;left:58%;top:52%;width:12%;min-width:70px;transition:transform .25s ease-out}
.kr-p-bat svg{animation:krGung2 2.8s ease-in-out infinite}
@keyframes krGung2{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2.5deg) translateY(-3px)}}
.kr-p-topp{position:absolute;top:16px;right:16px;z-index:3}
.kr-p-dagnatt{display:inline-flex;background:rgba(255,253,248,.85);border-radius:999px;padding:3px;backdrop-filter:blur(6px)}
.kr-p-dagnatt button{border:none;background:none;font:inherit;font-size:13px;font-weight:600;color:${NAVY};padding:7px 14px;border-radius:999px;cursor:pointer}
.kr-p-dagnatt button.pa{background:${NAVY};color:#fff}
.kr-p-rubrik{position:absolute;left:5%;top:12%;z-index:3;display:flex;flex-direction:column;align-items:flex-start;gap:12px}
.kr-p-rubrik small{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a;background:rgba(255,253,248,.85);border-radius:999px;padding:4px 10px}
.kr-p-rubrik h3{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(30px,5vw,64px);line-height:.98;margin:0;color:${NAVY}}
.kr-partner.natt .kr-p-rubrik h3{color:#f3ece0}
.kr-p-kort{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}
.kr-p-kort article{display:flex;flex-direction:column;gap:4px}
.kr-p-bild{aspect-ratio:4/3;overflow:hidden;-webkit-mask-size:100% 100%;mask-size:100% 100%;background:#dfe9ee}
.kr-p-bild div{width:100%;height:100%;background-size:cover;background-position:center;animation:krKen 14s ease-in-out infinite alternate}
@keyframes krKen{from{transform:scale(1.02)}to{transform:scale(1.14) translate(-2%,-2%)}}
.kr-p-kort b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:21px;color:${NAVY};margin-top:8px}
.kr-p-kort span{font-size:13.5px;color:#52717f}
.kr-p-kort small{font-size:10.5px;color:#8a9aa2}
.kr-alt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:16px}
.kr-alt article{background:#fffdf8;border:1px solid rgba(150,110,60,.16);border-radius:16px;padding:16px}
.kr-alt article.vald{border:2px solid ${NAVY}}
.kr-alt b{font-size:15px;color:${NAVY}}
.kr-alt p{margin:6px 0 0;font-size:13.5px;line-height:1.5;color:#3d5664}
.kr-karta-yta{aspect-ratio:16/9;background:#cfe3ea}
.kr-karta-yta canvas{position:absolute;inset:0;width:100%;height:100%;outline:none;touch-action:none}
.kr-karta-val{position:absolute;top:14px;left:14px;display:inline-flex;background:rgba(255,253,248,.9);border-radius:999px;padding:3px}
.kr-karta-val button{border:none;background:none;font:inherit;font-size:13px;font-weight:600;color:${NAVY};padding:7px 12px;border-radius:999px;cursor:pointer}
.kr-karta-val button.pa{background:${NAVY};color:#fff}
.kr-karta-tips{position:absolute;left:0;right:0;bottom:12px;margin:0;text-align:center;font-size:12px;color:${NAVY};opacity:.7;pointer-events:none}
.kr-karta-kort{position:absolute;right:14px;top:14px;background:#fffdf8;border-radius:16px;padding:12px 16px;display:flex;flex-direction:column;gap:2px;box-shadow:0 10px 26px rgba(13,36,64,.18);animation:krUpp .3s ease both}
.kr-karta-kort small{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b5591a}
.kr-karta-kort b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:22px;color:${NAVY}}
.kr-karta-kort a{font-size:13px;font-weight:600}
.kr-not{font-size:12.5px;color:#6b7f88;margin:10px 0 0}
.kr-avslut{max-width:1160px;margin:0 auto;padding:72px 24px 0}
.kr-avslut h2{font-size:28px;margin:0 0 12px}
.kr-avslut ul{margin:0;padding-left:20px;display:grid;gap:8px;font-size:15px;line-height:1.55;color:#3d5664;max-width:760px}
@media (max-width:860px){
  .kr-scen{aspect-ratio:4/5;min-height:0}
  .kr-hals{grid-template-columns:minmax(0,1fr)}
  .kr-hals-yta{height:480px}
  .kr-p-kort,.kr-alt{grid-template-columns:minmax(0,1fr)}
  .kr-p-hero{aspect-ratio:4/5}
  .kr-karta-yta{aspect-ratio:4/5}
  .kr-karta-kort{top:auto;bottom:38px;right:12px;left:12px}
}
@media (max-width:560px){
  .kr-del,.kr-intro-sida,.kr-topp,.kr-avslut{padding-left:16px;padding-right:16px}
  .kr-del{padding-top:56px}
  .kr-skylt{gap:12px}
  .kr-pensel{font-size:17px;padding:12px 24px}
  .kr-tidslinje button span{font-size:9.5px}
}
@media (prefers-reduced-motion:reduce){
  .kr-bat-inne,.kr-vinka,.kr-p-vag,.kr-p-bat svg,.kr-p-bild div{animation:none}
}
`
