'use client'
/**
 * FÖRHANDSVISNING (2026-11-20): startsidan, omkomponerad för mobil.
 *
 * Isolering: inga produktionskomponenter ändras. Återanvänds oförändrade: MegaMeny, HeroAnimation,
 * RegionKarta, StartKarta och JulkalenderSkylt (bara på stor skärm). Startsidans egna delar
 * (StartDelar) är omskrivna här med samma texter, länkar och data.
 * All stil ligger i preview.css och börjar med .hp, så den kan inte påverka andra sidor.
 *
 * Text och fakta är oförändrade. Det enda som tagits bort ur synfältet: sekundvisaren i
 * "Just nu" (ersatt av dagens datum och klockslag) och fotokrediten inne i känslorutorna
 * (flyttad till Bildkällor).
 */
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import MegaMeny from '@/components/MegaMeny'
import RegionKarta from '@/components/RegionKarta'
import StartKarta from '@/components/StartKarta'
import JulkalenderSkylt from '@/components/JulkalenderSkylt'
import { kalenderPagar, kalenderSynlig, oppnaLuckor } from '@/lib/julkalender'
import type { StartKansla } from '@/components/StartDelar'
import type { Bildkalla } from '@/app/LandingPageClient'
import { FAQ, FAQ_SCHEMA, SIDFOT_HTML } from './innehall.generated'
import './preview.css'

const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), { ssr: false, loading: () => null })

// Samma säsongsregel som startsidan (LandingPageClient: startsidansVariant).
const variant = (): 1 | 6 => {
  if (typeof window === 'undefined') return 1
  const val = new URLSearchParams(window.location.search).get('sasong')
  if (val === 'vinter') return 6
  if (val === 'sommar') return 1
  const nu = new Date(), m = nu.getMonth()
  return m === 11 || m <= 1 || (m === 10 && nu.getDate() >= 13) ? 6 : 1
}

/* ── Ikoner (samma streckstil som startsidan) ── */
const Pil = () => <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
const Kompass = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
const Nal = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
const Lupp = () => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>

/* ── 1. Hjälten ── */
function Julrad() {
  // Samma regel som JulkalenderSkylt: synlig före och under december, eller med ?julkalender=1.
  const [dag, setDag] = useState<number | null>(null)
  useEffect(() => {
    const forhand = new URLSearchParams(window.location.search).get('julkalender') === '1'
    if (kalenderPagar()) setDag(oppnaLuckor())
    else if (kalenderSynlig() || forhand) setDag(0)
  }, [])
  if (dag === null) return null
  return (
    <Link href="/julkalender" className="hp-julrad">
      <svg width="12" height="16" viewBox="0 0 44 58" aria-hidden="true"><rect x="6" y="22" width="32" height="30" rx="3" fill="#c0392b" /><rect x="4" y="16" width="36" height="9" rx="2" fill="#d94a3a" /><rect x="19" y="16" width="6" height="36" fill="#f2c230" /><path d="M22 16 C14 6 8 12 16 16 M22 16 C30 6 36 12 28 16" stroke="#f2c230" strokeWidth="3" fill="none" /></svg>
      {dag === 0 ? 'Julkalendern öppnar 1 december' : `Julkalendern, lucka ${dag}`}
      <Pil />
    </Link>
  )
}

function Hero() {
  const sok = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = (new FormData(e.currentTarget).get('q') as string || '').trim()
    location.href = '/sok' + (q ? '?q=' + encodeURIComponent(q) : '')
  }
  return (
    <section className="hp-hero" aria-labelledby="hp-h1">
      <div className="hp-hero-scen" aria-hidden="true">
        <Suspense fallback={null}><HeroAnimation variant={variant()} /></Suspense>
      </div>
      <div className="hp-hero-slojan" aria-hidden="true" />
      <div className="hp-hero-topp">
        <Julrad />
        <h1 id="hp-h1" className="hp-h1">Planera din <em>skärgårdsvistelse</em></h1>
        <p className="hp-hero-ingress">Öar, krogar, badplatser och båttider, samlat på ett ställe.</p>
      </div>
      <div className="hp-hero-botten">
        <form className="hp-sok" role="search" action="/sok" method="get" onSubmit={sok}>
          <input type="search" name="q" enterKeyHint="search" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} aria-label="Sök ö, krog eller hamn" placeholder="Sök ö, krog eller hamn" />
          <button type="submit" aria-label="Sök"><Lupp /><span>Sök</span></button>
        </form>
        <div className="hp-hero-val">
          <Link href="/utflykt" className="hp-val hp-val-1"><span className="hp-val-ikon"><Kompass /></span><span className="hp-val-text"><strong>Planera din tur</strong><small>Öar, restid och båttider för dagen</small></span><span className="hp-val-pil"><Pil /></span></Link>
          <a href="#karta-start" className="hp-val hp-val-2"><span className="hp-val-ikon"><Nal /></span><span className="hp-val-text"><strong>Hitta på kartan</strong><small>Öar, krogar, hamnar och boenden</small></span><span className="hp-val-pil"><Pil /></span></a>
        </div>
      </div>
    </section>
  )
}

/* ── 2. Tre sätt att ta sig ut ── */
const SATT = [
  { rubrik: 'Med reguljär båt', text: 'Kliv på i stan och kliv av på ön. Här ser du linjerna och var du hittar tidtabellerna.', lank: 'Båtar och färjor', href: '/farjor' },
  { rubrik: 'Med buss och båt', text: 'Buss till en brygga längre ut och sista biten med båt. Välj ö så visar vi vägen.', lank: 'Ta dig till din ö', href: '/ta-dig-till' },
  { rubrik: 'Med egen båt', text: 'Gästhamnar, bryggor och naturhamnar samlade på ett ställe.', lank: 'Hamnar och bryggor', href: '/hamnar-och-bryggor' },
]

function Rubrik({ liten, children, id, ljus }: { liten: string; children: React.ReactNode; id?: string; ljus?: boolean }) {
  return (
    <header className={ljus ? 'hp-rubrik hp-rubrik-ljus' : 'hp-rubrik'}>
      <p className="hp-liten">{liten}</p>
      <h2 id={id} className="hp-h2">{children}</h2>
    </header>
  )
}

function TreSatt() {
  return (
    <section className="hp-sek hp-sand" aria-labelledby="hp-satt">
      <div className="hp-inre">
        <Rubrik liten="Ta dig ut" id="hp-satt">Tre sätt att ta sig ut</Rubrik>
        <ol className="hp-satt">
          {SATT.map((s, i) => (
            <li key={s.href}>
              <Link href={s.href}>
                <span className="hp-satt-nr">{i + 1}</span>
                <span className="hp-satt-text"><b>{s.rubrik}</b><span>{s.text}</span><i>{s.lank} <Pil /></i></span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── 3. Just nu ── Datumen och reglerna är desamma som i StartDelar (källa: /skargardsdatum). */
const DATUM = [
  { iso: '2026-11-30', dag: '30', man: 'nov', vad: 'Sista dagen för fritidsfiske efter hummer', href: '/guider/hummerpremiar-bohuslan' },
  { iso: '2026-12-12', dag: '12', man: 'dec', vad: 'Sista dagen för höstens tidtabeller hos Waxholmsbolaget och Styrsöbolaget', href: '/vintertidtabeller' },
  { iso: '2027-03-01', dag: '1', man: 'mars', vad: 'Hundar får inte springa lösa i naturen, till 20 augusti', href: '/guider/hund-skargarden' },
  { iso: '2027-08-04', dag: '4', man: 'aug', vad: 'Kräftpremiär enligt traditionen, klockan 17', href: '/guider/kraftskiva-skargarden' },
  { iso: '2027-08-19', dag: '19', man: 'aug', vad: 'Surströmmingspremiär', href: '/guider/surstrommingspremiar' },
  { iso: '2027-09-27', dag: '27', man: 'sep', vad: 'Hummerpremiär, klockan 07.00', href: '/guider/hummerpremiar-bohuslan' },
]
const MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

function JustNu() {
  const [nu, setNu] = useState<Date | null>(null)
  useEffect(() => { setNu(new Date()); const t = setInterval(() => setNu(new Date()), 30000); return () => clearInterval(t) }, [])
  const tz = { timeZone: 'Europe/Stockholm' } as const
  const idag = nu ? nu.toLocaleDateString('sv-SE', tz) : ''
  const datum = nu ? nu.toLocaleDateString('sv-SE', { ...tz, weekday: 'long', day: 'numeric', month: 'long' }) : ''
  const klocka = nu ? nu.toLocaleTimeString('sv-SE', { ...tz, hour: '2-digit', minute: '2-digit' }) : ''
  const manad = idag ? MANADER[Number(idag.slice(5, 7)) - 1] : ''
  const kommande = idag ? DATUM.filter(d => d.iso >= idag).slice(0, 4) : DATUM.slice(0, 4)
  const dagar = (iso: string) => Math.round((Date.parse(iso) - Date.parse(idag)) / 86400000)
  return (
    <section className="hp-sek hp-papper hp-nu" aria-labelledby="hp-nu">
      <div className="hp-inre">
        <header className="hp-rubrik hp-nu-topp">
          <p className="hp-liten">Just nu i skärgården</p>
          <h2 id="hp-nu" className="hp-h2 hp-nu-datum">{datum ? <>{datum.charAt(0).toUpperCase() + datum.slice(1)}<span className="hp-nu-sep"> · </span><span className="hp-nu-klocka">{klocka}</span></> : ' '}</h2>
        </header>
        <ul className="hp-nu-lista">
          {kommande.map(d => {
            const n = idag ? dagar(d.iso) : null
            return (
              <li key={d.iso}>
                <Link href={d.href}>
                  <span className="hp-nu-bricka"><b>{d.dag}</b>{d.man}</span>
                  <span className="hp-nu-text">{n !== null && <small>{n === 0 ? 'Idag' : n === 1 ? 'Imorgon' : `Om ${n} dagar`}</small>}{d.vad}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="hp-lankrad">
          <Link href="/oppet-nu">{manad ? `Vad är öppet i ${manad}?` : 'Vad är öppet nu?'} <Pil /></Link>
          <Link href="/skargardsdatum">Alla datum <Pil /></Link>
        </p>
      </div>
    </section>
  )
}

/* ── 4. Vad vill du känna? ── */
const TURER: [string, string][] = [
  ['/resetips/djuro-grinda-dagstur', 'Djurö till Grinda'],
  ['/resetips/sandhamn-ytterskargard', 'Sandhamn med Cinderellabåten'],
  ['/resetips/uto-cykeldag', 'Utö på cykel'],
  ['/resetips/marstrand-fastning-och-klippor', 'Marstrand: fästning och klippbad'],
]
const GUIDER: [string, string][] = [
  ['/blogg/kajak-stockholms-skargard-nyborjare', 'Kajak och paddling'],
  ['/blogg/segling-nyborjare-guide', 'Segling och båtliv'],
  ['/blogg/basta-badplatserna', 'Bad och klippor'],
  ['/blogg/vandring-orno-uto', 'Vandring och natur'],
  ['/blogg/fiske-skargard-guide', 'Fiske'],
  ['/blogg/cykling-moja-gallno', 'Cykling'],
]

function VadVillDuKanna({ kanslor }: { kanslor: StartKansla[] }) {
  return (
    <section className="hp-sek hp-sand hp-kansla" id="resetips" aria-labelledby="hp-kansla">
      <div className="hp-inre">
        <Rubrik liten="Hitta din ö" id="hp-kansla">Vad vill du känna?</Rubrik>
      </div>
      <div className="hp-kansla-rad" role="list">
        {kanslor.map(k => (
          <Link key={k.href} href={k.href} role="listitem" className="hp-kansla-ruta" style={k.bild ? { backgroundImage: `url('${k.bild.url}')` } : undefined}>
            <span><b>{k.kansla}</b><small>{k.rubrik} · {k.antal} öar</small></span>
          </Link>
        ))}
      </div>
      <div className="hp-inre">
        <div className="hp-mer">
          <nav aria-label="Dagsplaner">
            <h3>Dagsplaner</h3>
            <ul>{TURER.map(([h, t]) => <li key={h}><Link href={h}>{t}</Link></li>)}</ul>
            <Link href="/resetips" className="hp-mer-alla">Alla dagsplaner <Pil /></Link>
          </nav>
          <nav aria-label="Guider">
            <h3>Guider</h3>
            <ul>{GUIDER.map(([h, t]) => <li key={h}><Link href={h}>{t}</Link></li>)}</ul>
          </nav>
        </div>
      </div>
    </section>
  )
}

/* ── 5–6. Regionerna och kartan (produktionskomponenterna, nya rubriker) ── */
function Regioner() {
  return (
    <section className="hp-sek hp-papper hp-regioner" id="resmål" aria-labelledby="hp-reg">
      <div className="hp-inre">
        <Rubrik liten="Utforska skärgården" id="hp-reg">Välj din del av skärgården</Rubrik>
        <p className="hp-ingress">Fyra kuster och de stora sjöarna. Välj en del, så ser du regionerna där.</p>
        <RegionKarta />
      </div>
    </section>
  )
}

function Karta() {
  return (
    <section className="hp-sek hp-sand hp-karta" id="karta-start" aria-labelledby="hp-karta">
      <div className="hp-inre">
        <Rubrik liten="Allt på en karta" id="hp-karta">Hitta ditt nästa stopp</Rubrik>
        <p className="hp-ingress">Öar, krogar, gästhamnar, boenden och bad. Välj vad du vill se, eller sök direkt i rutan på kartan.</p>
        <StartKarta />
      </div>
    </section>
  )
}

/* ── 7. Fråga Thorkel ── */
const FRAGOR = ['Vilken ö passar barnfamiljer bäst?', 'Hur tar jag mig till Sandhamn utan egen båt?', 'Var kan jag basta och bada i skärgården?']

function FragaThorkel() {
  return (
    <section className="hp-sek hp-natt hp-thorkel" id="thorkel" aria-labelledby="hp-thorkel">
      <div className="hp-inre hp-thorkel-inre">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/thorkel-avatar.svg" alt="" className="hp-thorkel-bild" width={150} height={150} />
        <div className="hp-thorkel-text">
          <Rubrik liten="Svallas AI-guide" id="hp-thorkel" ljus>Fråga Thorkel om skärgården</Rubrik>
          <form action="/guide" method="get" className="hp-thorkel-falt">
            <input name="fraga" type="text" placeholder="Fråga om öar, båtar, krogar och bad" aria-label="Fråga Thorkel" />
            <button type="submit" aria-label="Skicka frågan"><Pil /></button>
          </form>
          <ul className="hp-thorkel-forslag" aria-label="Förslag på frågor">
            {FRAGOR.map(f => <li key={f}><Link href={`/guide?fraga=${encodeURIComponent(f)}`}>{f}<Pil /></Link></li>)}
          </ul>
          <p className="hp-thorkel-not">Gratis, men kräver ett konto. <Link href="/utflykt">Planera utan konto →</Link></p>
        </div>
      </div>
    </section>
  )
}

/* ── 8. Vanliga frågor ── Frågorna och schemat är ordagranna kopior (innehall.generated.ts). */
function Fragor() {
  return (
    <section className="hp-sek hp-sand hp-faq" id="faq" aria-labelledby="hp-faq">
      <div className="hp-inre hp-smal">
        <Rubrik liten="Vanliga frågor" id="hp-faq">Allt du undrar om skärgården</Rubrik>
        <div className="hp-faq-lista">
          {FAQ.map(f => (
            <details key={f.fraga}>
              <summary>{f.fraga}<i aria-hidden="true" /></summary>
              <div className="hp-faq-svar" dangerouslySetInnerHTML={{ __html: f.svarHtml }} />
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
    </section>
  )
}

/* ── 9. För utforskaren och krogägaren ── */
function GuidePaVattnet({ antalKrogar }: { antalKrogar: number }) {
  const [bred, setBred] = useState(false)
  useEffect(() => { setBred(window.matchMedia('(min-width:901px)').matches) }, [])
  return (
    <>
      <section className="hp-sek hp-papper hp-guide" aria-labelledby="hp-guide">
        <div className="hp-inre hp-guide-inre">
          <div className="hp-guide-text">
            <Rubrik liten="För utforskaren" id="hp-guide">Din guide ute på vattnet</Rubrik>
            <p className="hp-ingress">Allt du behöver för att planera och logga dina turer, utan kostnad.</p>
            <ul className="hp-guide-lista">
              <li><b>Logga turen på 10 sek</b>Foto + plats. Klart. Din dagbok byggs automatiskt.</li>
              <li><b>Hitta krogar &amp; platser</b>Bastun, bryggor och krogar längs din rutt</li>
              <li><b>Community-feed</b>Se andras turer. Bli inspirerad. Ge igen.</li>
            </ul>
            <Link href="/kom-igang" className="hp-knapp">Kom igång <Pil /></Link>
          </div>
          {bred && (
            <div className="hp-telefon" aria-hidden="true">
              <iframe src="/upptack" title="Svalla i mobilen" loading="lazy" tabIndex={-1}
                onLoad={e => {
                  try {
                    const d = e.currentTarget.contentDocument
                    if (d?.head && !d.getElementById('sd-tyst')) {
                      const s = d.createElement('style'); s.id = 'sd-tyst'
                      s.textContent = '[role=dialog],.fb-ruta,.fb-flytande,.skip-link{display:none!important}'
                      d.head.appendChild(s)
                    }
                  } catch { /* ramen går inte att läsa */ }
                }} />
            </div>
          )}
        </div>
      </section>
      <section className="hp-sek hp-natt hp-krog" aria-labelledby="hp-krog">
        <div className="hp-inre hp-krog-inre">
          <div>
            <Rubrik liten="För krogägaren" id="hp-krog" ljus>Sätt er krog på kartan</Rubrik>
            <p>Nå gäster som planerar att åka ut. Det kostar ingenting att finnas med. {antalKrogar} krogar och caféer finns redan på ösidorna.</p>
          </div>
          <Link href="/registrera-krog" className="hp-knapp hp-knapp-acc">Registrera er krog <Pil /></Link>
        </div>
      </section>
    </>
  )
}

/* ── 10. Bildkällor och sidfot ── */
function Bildkallor({ k }: { k: Bildkalla[] }) {
  if (!k.length) return null
  return (
    <details className="hp-bildkallor">
      <summary>Bildkällor <span>Wikimedia Commons, {k.length} foton</span></summary>
      <p>
        {k.map((b, i) => (
          <span key={b.kalla}>
            {i > 0 && ' · '}{b.namn}: <a href={b.kalla} rel="noopener noreferrer" target="_blank">{b.fotograf}</a>, {b.licensUrl ? <a href={b.licensUrl} rel="noopener noreferrer license" target="_blank">{b.licens}</a> : b.licens}
          </span>
        ))}
      </p>
    </details>
  )
}

export default function PreviewClient({ bildkallor = [], kanslor = [], antalKrogar = 0 }: { bildkallor?: Bildkalla[]; kanslor?: StartKansla[]; antalKrogar?: number }) {
  return (
    <div className="hp">
      <MegaMeny overStart />
      <Hero />
      {/* Stor skärm: julkalenderns paket i himlen, precis som på startsidan. I mobilen ligger den som en rad ovanför rubriken. */}
      <div className="hp-bara-stor"><JulkalenderSkylt /></div>
      <main>
        <TreSatt />
        <JustNu />
        <VadVillDuKanna kanslor={kanslor} />
        <Regioner />
        <Karta />
        <FragaThorkel />
        <Fragor />
        <GuidePaVattnet antalKrogar={antalKrogar} />
      </main>
      <div className="hp-sidfot">
        <Bildkallor k={bildkallor} />
        <div dangerouslySetInnerHTML={{ __html: SIDFOT_HTML }} />
      </div>
    </div>
  )
}
