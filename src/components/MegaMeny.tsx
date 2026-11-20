'use client'
/**
 * SEPARAT FÖRHANDSVISNING 2026-11-20 (grenen claude/forhandsvisning-megameny): premium-megameny.
 * Ett förslag att jämföra med den vanliga förhandsvisningen, inte för main.
 *
 * Principer (från bedömningen till Max):
 * - Fem huvudpunkter: Skärgården, Göra, Mat & boende, Planera, Guider. Forum och Mitt Svalla till höger.
 * - Dator: en panel som fälls ner under menyraden (inte helskärm). Stor seriffrubrik till vänster,
 *   högst sex länkar per grupp i mitten, EN sak till höger: kustkartan (Skärgården), Thorkel (Planera)
 *   eller ett "Utvalt av Svalla"-kort med ett foto.
 * - Panelen öppnas efter en kort paus vid hover (eller vid klick), stängs med en kort fördröjning,
 *   och innehållet tonar över när man byter punkt. Esc stänger. Ingen zoom, ingen parallax.
 * - Mobil: helskärm i två nivåer. Nivå 1 är fem stora rader, ett tryck skjuter in nivå 2.
 * - Alla länkar går till sidor som finns. Fotona är fria bilder från Wikimedia Commons, med fotograf
 *   och licens (samma bilder som ösidorna använder).
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'

type Zon = 'ost' | 'vast' | 'syd' | 'norr' | 'sjo'
type Lank = { text: string; href: string; zon?: Zon }
type Grupp = { rubrik: string; zon?: Zon; lankar: Lank[] }
type Bild = { url: string; plats: string; fotograf: string; licens: string; kalla: string }
type Utvalt = { titel: string; text: string; href: string; bild?: Bild; thorkel?: boolean; not?: string }
type Punkt = {
  id: string; text: string; href: string; ingress: string; undertext: string
  allt: Lank; grupper: Grupp[]; utvalt?: Utvalt; karta?: boolean; aktivFor: string[]
}

const COMMONS = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/'

const PUNKTER: Punkt[] = [
  {
    id: 'skargarden', text: 'Skärgården', href: '/regioner', karta: true,
    ingress: 'Fyra kuster och de stora sjöarna. Välj en region, så finns öar, krogar, boenden och hamnar samlade där.',
    undertext: 'Regioner, öar och kartan',
    allt: { text: 'Alla regioner', href: '/regioner' },
    aktivFor: ['/regioner', '/resmal', '/stockholms-skargard', '/bohuslan', '/gotland', '/aland', '/oland', '/blekinge-skargard', '/vasterhav', '/hoga-kusten', '/halland', '/goteborg-skargard', '/malaren', '/karta', '/oar', '/o/', '/jamfor', '/upptack'],
    grupper: [
      { rubrik: 'Ostkusten', zon: 'ost', lankar: [
        { text: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { text: 'Åland', href: '/aland' },
        { text: 'Gotland', href: '/gotland' },
        { text: 'Öland', href: '/oland' },
      ] },
      { rubrik: 'Västkusten', zon: 'vast', lankar: [
        { text: 'Bohuslän', href: '/bohuslan' },
        { text: 'Göteborgs skärgård', href: '/goteborg-skargard' },
        { text: 'Halland', href: '/halland' },
        { text: 'Västerhavet', href: '/vasterhav' },
      ] },
      { rubrik: 'Fler delar', lankar: [
        { text: 'Blekinge skärgård', href: '/blekinge-skargard', zon: 'syd' },
        { text: 'Höga Kusten', href: '/hoga-kusten', zon: 'norr' },
        { text: 'Mälaren', href: '/malaren', zon: 'sjo' },
      ] },
      { rubrik: 'Hitta en ö', lankar: [
        { text: 'Alla öar', href: '/oar' },
        { text: 'Barnvänliga öar', href: '/oar/barnvanliga' },
        { text: 'Öar utan bil', href: '/oar/utan-bil' },
        { text: 'Jämför öar', href: '/jamfor' },
      ] },
    ],
  },
  {
    id: 'gora', text: 'Göra', href: '/aktiviteter',
    ingress: 'Bad, paddling, segling och vandring, sommar som vinter.',
    undertext: 'Bad, kajak, segling, vandring',
    allt: { text: 'Alla aktiviteter', href: '/aktiviteter' },
    aktivFor: ['/aktiviteter', '/aktivitet', '/bastu-och-bad', '/vandring-och-natur', '/segelkurs', '/vinter', '/sommar', '/host', '/upplevelser'],
    grupper: [
      { rubrik: 'Aktiviteter', lankar: [
        { text: 'Alla aktiviteter', href: '/aktiviteter' },
        { text: 'Bastu och bad', href: '/bastu-och-bad' },
        { text: 'Vandring och natur', href: '/vandring-och-natur' },
        { text: 'Kajak i Stockholms skärgård', href: '/aktivitet/kajak' },
      ] },
      { rubrik: 'Kurser och turer', lankar: [
        { text: 'Segelkurser', href: '/segelkurs' },
        { text: 'Guidade turer', href: '/upplevelser?kategori=guidade' },
      ] },
      { rubrik: 'Säsong', lankar: [
        { text: 'Skärgården på sommaren', href: '/sommar' },
        { text: 'Skärgården på hösten', href: '/host' },
        { text: 'Skärgården på vintern', href: '/vinter' },
      ] },
    ],
    utvalt: {
      titel: 'Kajak i Stockholms skärgård', text: 'Öar att paddla till, säkerhet och var du hyr kajak.', href: '/aktivitet/kajak',
      bild: { url: COMMONS + '1/1a/Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg/960px-Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg', plats: 'Rävstaviken på Utö', fotograf: 'Arild Vågen', licens: 'CC BY-SA 3.0', kalla: 'https://commons.wikimedia.org/wiki/File:Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg' },
    },
  },
  {
    id: 'mat', text: 'Mat & boende', href: '/krogar-och-mat',
    ingress: 'Krogar, caféer och bryggserveringar, och var du sover efter middagen.',
    undertext: 'Krogar, boende och gästhamnar',
    allt: { text: 'Alla krogar och caféer', href: '/krogar-och-mat' },
    aktivFor: ['/krogar-och-mat', '/boende', '/hamnar-och-bryggor', '/naturhamnar'],
    grupper: [
      { rubrik: 'Äta', lankar: [
        { text: 'Krogar, caféer och bryggserveringar', href: '/krogar-och-mat' },
      ] },
      { rubrik: 'Sova', lankar: [
        { text: 'Allt boende', href: '/boende' },
        { text: 'Stugor och stugbyar', href: '/boende/stugor-stugbyar' },
        { text: 'B&B', href: '/boende/bb' },
        { text: 'Camping och tält', href: '/boende/camping-talt' },
      ] },
      { rubrik: 'Med båt', lankar: [
        { text: 'Gästhamnar och bryggor', href: '/hamnar-och-bryggor' },
        { text: 'Naturhamnar i Stockholms skärgård', href: '/naturhamnar' },
      ] },
    ],
    utvalt: {
      titel: 'Krogarna på Sandhamn', text: 'Alla restauranger, barer och kaféer på ön, med länk till varje ställe.', href: '/o/sandhamn/restauranger',
      bild: { url: COMMONS + '8/81/Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg/960px-Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg', plats: 'Sandhamn', fotograf: 'Rosser1954', licens: 'CC BY-SA 3.0', kalla: 'https://commons.wikimedia.org/wiki/File:Sandhamn_Island_-_typical_street_view_with_a_midsommarst%C3%A5ng_or_Midsummer_Pole..jpg' },
    },
  },
  {
    id: 'planera', text: 'Planera', href: '/utflykt',
    ingress: 'Hur du tar dig ut, och vad du hinner på en dag.',
    undertext: 'Ta dig dit, dagsplaner, Thorkel',
    allt: { text: 'Planera din tur', href: '/utflykt' },
    aktivFor: ['/utflykt', '/resetips', '/planera', '/dag', '/farjor', '/guide'],
    grupper: [
      { rubrik: 'Ta dig ut', lankar: [
        { text: 'Planera din tur', href: '/utflykt' },
        { text: 'Färjetider i Stockholms skärgård', href: '/farjor' },
        { text: 'Dagsplaner och resetips', href: '/resetips' },
      ] },
      { rubrik: 'Med gratis konto', lankar: [
        { text: 'Fråga Thorkel', href: '/guide' },
        { text: 'Planera en båtrutt', href: '/planera' },
      ] },
    ],
    utvalt: { titel: 'Fråga Thorkel', text: 'Skepparen från Möja och Svallas AI-guide. Fråga om öar, båtar, krogar eller vad som helst om skärgården.', href: '/guide', thorkel: true, not: 'Kräver gratis konto' },
  },
  {
    id: 'guider', text: 'Guider', href: '/guider',
    ingress: 'Dagsplaner, säsongstips och praktiska guider.',
    undertext: 'Dagsplaner och guider',
    allt: { text: 'Alla guider', href: '/guider' },
    aktivFor: ['/guider', '/blogg', '/tips'],
    grupper: [
      { rubrik: 'Utvalda guider', lankar: [
        { text: 'Midsommar i skärgården', href: '/guider/midsommar-skargarden' },
        { text: 'Packlista för skärgården', href: '/guider/packlista-skargarden' },
        { text: 'Allemansrätten på sjön', href: '/guider/allemansratten-pa-sjon' },
      ] },
      { rubrik: 'Dagsplaner', lankar: [
        { text: 'Alla dagsplaner', href: '/resetips' },
        { text: 'Djurö till Grinda', href: '/resetips/djuro-grinda-dagstur' },
      ] },
    ],
    utvalt: {
      titel: 'Bil, glass och båt: Djurö till Grinda', text: 'En dagsrutt med bil, brygga och lunchstopp på Grinda.', href: '/resetips/djuro-grinda-dagstur',
      bild: { url: COMMONS + 'd/d1/Grinda_V%C3%A4rdshuset.jpg/960px-Grinda_V%C3%A4rdshuset.jpg', plats: 'Grinda', fotograf: 'Brion VIBBER', licens: 'CC BY 2.5', kalla: 'https://commons.wikimedia.org/wiki/File:Grinda_V%C3%A4rdshuset.jpg' },
    },
  },
]

const ZON_NAMN: Record<Zon, string> = { ost: 'Ostkusten', vast: 'Västkusten', syd: 'Sydkusten', norr: 'Norrlandskusten', sjo: 'Insjöarna' }

type Karta = { viewBox: string; lan: { n: string; z: Zon | ''; d: string }[]; sjoar: { n: string; d: string }[] }

export default function MegaMeny({ overStart = false }: { overStart?: boolean }) {
  const path = usePathname() ?? ''
  const [aktiv, setAktiv] = useState<string | null>(null)
  const [zon, setZon] = useState<Zon | null>(null)
  const [scrollad, setScrollad] = useState(false)
  const [mobil, setMobil] = useState(false)
  const [niva2, setNiva2] = useState<string | null>(null)
  const [karta, setKarta] = useState<Karta | null>(null)
  const aktivRef = useRef<string | null>(null)
  const via = useRef<'hover' | 'klick'>('hover')
  const oppnaT = useRef<number | undefined>(undefined)
  const stangT = useRef<number | undefined>(undefined)

  const satt = useCallback((id: string | null) => { aktivRef.current = id; setAktiv(id); setZon(null) }, [])
  const stang = useCallback(() => { window.clearTimeout(oppnaT.current); window.clearTimeout(stangT.current); satt(null) }, [satt])

  // Stäng allt när man byter sida.
  useEffect(() => { stang(); setMobil(false); setNiva2(null) }, [path, stang])

  useEffect(() => {
    if (!overStart) return
    const s = () => setScrollad(window.scrollY > 60)
    s(); window.addEventListener('scroll', s, { passive: true })
    return () => window.removeEventListener('scroll', s)
  }, [overStart])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') { stang(); setMobil(false) } }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [stang])

  useEffect(() => {
    document.body.style.overflow = mobil ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobil])

  // Kustkartan laddas först när Skärgården öppnas första gången.
  useEffect(() => {
    if (aktiv !== 'skargarden' || karta) return
    import('@/lib/sverigekarta').then(m => setKarta({ viewBox: m.KARTA_VIEWBOX, lan: m.SVERIGE_LAN as Karta['lan'], sjoar: m.SVERIGE_SJOAR })).catch(() => {})
  }, [aktiv, karta])

  const hoverIn = (id: string) => {
    window.clearTimeout(stangT.current); window.clearTimeout(oppnaT.current)
    if (aktivRef.current) { via.current = 'hover'; satt(id); return }
    oppnaT.current = window.setTimeout(() => { via.current = 'hover'; satt(id) }, 120)
  }
  const hoverUt = () => {
    window.clearTimeout(oppnaT.current)
    stangT.current = window.setTimeout(() => satt(null), 250)
  }
  const klick = (id: string) => {
    window.clearTimeout(oppnaT.current); window.clearTimeout(stangT.current)
    if (aktivRef.current === id && via.current === 'klick') satt(null)
    else { via.current = 'klick'; satt(id) }
  }

  const arAktiv = (p: Punkt) => p.aktivFor.some(a => a.endsWith('/') ? path.startsWith(a) : path === a || path.startsWith(a + '/'))
  const punkt = PUNKTER.find(p => p.id === aktiv)
  const mobPunkt = PUNKTER.find(p => p.id === niva2)
  const solid = !overStart || scrollad || !!aktiv

  return (
    <>
      <style>{MM_CSS}</style>
      <header className={['mm', overStart ? 'mm-start' : '', solid ? 'mm-solid' : ''].join(' ')} onMouseLeave={hoverUt} onMouseEnter={() => window.clearTimeout(stangT.current)}>
        <div className="mm-rad">
          <Link href="/" className="mm-logga" aria-label="Svalla, till startsidan"><SvallaLogo height={24} color="#ffffff" /></Link>

          <nav className="mm-nav" aria-label="Huvudmeny">
            {PUNKTER.map(p => (
              <button key={p.id} type="button"
                className={['mm-punkt', aktiv === p.id ? 'oppen' : '', arAktiv(p) ? 'har' : ''].join(' ')}
                aria-expanded={aktiv === p.id} aria-controls="mm-panel"
                onMouseEnter={() => hoverIn(p.id)} onClick={() => klick(p.id)}>
                {p.text}
              </button>
            ))}
          </nav>

          <div className="mm-hoger">
            <form action="/sok" method="get" role="search" className="mm-sok">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <input type="search" name="q" placeholder="Sök ö, krog eller hamn" aria-label="Sök på Svalla" />
            </form>
            <Link href="/forum" className="mm-liten">Forum</Link>
            <Link href="/kom-igang" className="mm-konto">Mitt Svalla</Link>
            <Link href="/sok" className="mm-mob-sok" aria-label="Sök"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg></Link>
            <button type="button" className="mm-mob-knapp" aria-expanded={mobil} aria-controls="mm-mobil" onClick={() => { setMobil(true); setNiva2(null) }}>Meny</button>
          </div>
        </div>

        {/* Panelen (dator) */}
        <div id="mm-panel" className={punkt ? 'mm-panel oppen' : 'mm-panel'} aria-hidden={!punkt}>
          {punkt && (
            <div key={punkt.id} className="mm-inre">
              <div className="mm-kol mm-intro">
                <Link href={punkt.href} className="mm-titel" onClick={stang}>{punkt.text}<span aria-hidden="true">→</span></Link>
                <p>{punkt.ingress}</p>
                <Link href={punkt.allt.href} className="mm-allt" onClick={stang}>{punkt.allt.text} <span aria-hidden="true">→</span></Link>
              </div>

              <div className="mm-kol mm-grupper">
                {punkt.grupper.map(g => (
                  <div key={g.rubrik} className="mm-grupp">
                    <div className="mm-grupp-rubrik" onMouseEnter={() => g.zon && setZon(g.zon)}>{g.rubrik}</div>
                    {g.lankar.map(l => (
                      <Link key={l.href} href={l.href} className="mm-lank" onClick={stang}
                        onMouseEnter={() => { const z = l.zon ?? g.zon; if (z) setZon(z) }}>
                        <span>{l.text}</span><i aria-hidden="true">→</i>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mm-kol mm-sida">
                {punkt.karta && (
                  <div className="mm-karta">
                    {karta ? (
                      <svg viewBox={karta.viewBox} role="img" aria-label={zon ? `Karta där ${ZON_NAMN[zon]} är markerad` : 'Karta över Sveriges kuster'}>
                        {karta.lan.map(l => <path key={l.n} d={l.d} className={l.z ? (l.z === zon ? 'k-vald' : 'k-kust') : 'k-inland'} />)}
                        {karta.sjoar.map(s => <path key={s.n} d={s.d} className={zon === 'sjo' ? 'k-sjo k-vald' : 'k-sjo'} />)}
                      </svg>
                    ) : <div className="mm-karta-tom" />}
                    <div className="mm-karta-text">
                      <span>{zon ? ZON_NAMN[zon] : 'Peka på en region'}</span>
                      <Link href="/#karta-start" onClick={stang}>Hitta på kartan →</Link>
                    </div>
                  </div>
                )}
                {punkt.utvalt && <UtvaltKort u={punkt.utvalt} onKlick={stang} />}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Nedtoning bakom panelen */}
      <div className={punkt ? 'mm-dimma synlig' : 'mm-dimma'} onClick={stang} aria-hidden="true" />

      {/* Mobil: helskärm i två nivåer */}
      <div id="mm-mobil" className={mobil ? 'mm-mob oppen' : 'mm-mob'} role="dialog" aria-modal="true" aria-label="Meny" aria-hidden={!mobil}>
        <div className="mm-mob-topp">
          <Link href="/" aria-label="Svalla, till startsidan" onClick={() => setMobil(false)}><SvallaLogo height={22} color="#14202a" /></Link>
          <button type="button" className="mm-mob-stang" onClick={() => setMobil(false)}>Stäng ✕</button>
        </div>
        <div className={niva2 ? 'mm-mob-spar niva2' : 'mm-mob-spar'}>
          <div className="mm-mob-niva">
            <form action="/sok" method="get" role="search" className="mm-mob-sokfalt">
              <input type="search" name="q" placeholder="Sök ö, krog, hamn eller boende" aria-label="Sök på Svalla" />
            </form>
            {PUNKTER.map(p => (
              <button key={p.id} type="button" className="mm-mob-rad" onClick={() => setNiva2(p.id)}>
                <span><strong>{p.text}</strong><small>{p.undertext}</small></span><i aria-hidden="true">›</i>
              </button>
            ))}
            <div className="mm-mob-fot">
              <Link href="/kom-igang" onClick={() => setMobil(false)} className="mm-mob-konto">Mitt Svalla</Link>
              <Link href="/forum" onClick={() => setMobil(false)}>Forum</Link>
              <Link href="/logga-in" onClick={() => setMobil(false)}>Logga in</Link>
            </div>
          </div>
          <div className="mm-mob-niva">
            {mobPunkt && (
              <>
                <button type="button" className="mm-mob-tillbaka" onClick={() => setNiva2(null)}>← Meny</button>
                <h2 className="mm-mob-titel">{mobPunkt.text}</h2>
                <p className="mm-mob-ingress">{mobPunkt.ingress}</p>
                {mobPunkt.grupper.map(g => (
                  <div key={g.rubrik} className="mm-mob-grupp">
                    <div className="mm-grupp-rubrik">{g.rubrik}</div>
                    {g.lankar.map(l => <Link key={l.href} href={l.href} className="mm-mob-lank" onClick={() => setMobil(false)}>{l.text}<i aria-hidden="true">›</i></Link>)}
                  </div>
                ))}
                <Link href={mobPunkt.allt.href} className="mm-mob-allt" onClick={() => setMobil(false)}>{mobPunkt.allt.text} →</Link>
                {mobPunkt.utvalt && <UtvaltKort u={mobPunkt.utvalt} onKlick={() => setMobil(false)} />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function UtvaltKort({ u, onKlick }: { u: Utvalt; onKlick: () => void }) {
  return (
    <div className="mm-utvalt">
      <Link href={u.href} onClick={onKlick} className="mm-utvalt-lank">
        {u.bild && (
          <span className="mm-utvalt-bild">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u.bild.url} alt={u.bild.plats} loading="lazy" decoding="async" />
          </span>
        )}
        {u.thorkel && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="mm-thorkel" src="/thorkel-avatar.svg" alt="" width={72} height={72} />
        )}
        <span className="mm-utvalt-etikett">{u.thorkel ? 'Svallas AI-guide' : 'Utvalt av Svalla'}</span>
        <span className="mm-utvalt-titel">{u.titel} <i aria-hidden="true">→</i></span>
        <span className="mm-utvalt-text">{u.text}</span>
        {u.not && <span className="mm-utvalt-not">{u.not}</span>}
      </Link>
      {u.bild && (
        <div className="mm-kredit">{u.bild.plats}. Foto: {u.bild.fotograf}, {u.bild.licens}, <a href={u.bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></div>
      )}
    </div>
  )
}

const MM_CSS = `
.mm{position:relative;z-index:200;background:linear-gradient(90deg,#0d2440 0%,#164a6b 100%);color:#fff;transition:background .35s ease,box-shadow .35s ease}
.mm-start{position:fixed;top:0;left:0;right:0;background:transparent}
.mm-start.mm-solid{background:rgba(13,36,64,.94);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 2px 20px rgba(0,0,0,.2)}
.mm-rad{display:flex;align-items:center;gap:20px;height:68px;padding:0 40px;max-width:1440px;margin:0 auto}
.mm-logga{display:inline-flex;flex-shrink:0}
.mm-nav{display:flex;align-items:center;justify-content:center;gap:4px;flex:1}
.mm-punkt{position:relative;background:none;border:none;color:rgba(255,255,255,.9);font:inherit;font-size:15px;font-weight:600;padding:10px 14px;cursor:pointer;letter-spacing:.01em}
.mm-punkt::after{content:'';position:absolute;left:14px;right:14px;bottom:4px;height:2px;border-radius:2px;background:#e8924a;transform:scaleX(0);transform-origin:left;transition:transform .25s ease}
.mm-punkt:hover,.mm-punkt.oppen{color:#fff}
.mm-punkt.oppen::after,.mm-punkt.har::after{transform:scaleX(1)}
.mm-punkt.har:not(.oppen)::after{opacity:.55}
.mm-punkt:focus-visible{outline:2px solid #e8924a;outline-offset:2px;border-radius:6px}
.mm-hoger{display:flex;align-items:center;gap:14px;flex-shrink:0}
.mm-sok{display:flex;align-items:center;gap:8px;padding:0 14px;height:38px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);color:rgba(255,255,255,.8)}
.mm-sok:focus-within{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.45)}
.mm-sok input{width:170px;border:none!important;outline:none!important;background:transparent!important;box-shadow:none!important;color:#fff;font:inherit;font-size:13.5px;padding:0}
.mm-sok input::placeholder{color:rgba(255,255,255,.7)}
.mm-liten{color:rgba(255,255,255,.8);text-decoration:none;font-size:13.5px;font-weight:600}
.mm-liten:hover{color:#fff}
.mm-konto{background:#b5591a;color:#fff;text-decoration:none;font-size:13.5px;font-weight:700;padding:9px 16px;border-radius:999px;white-space:nowrap}
.mm-konto:hover{filter:brightness(1.08)}
.mm-mob-sok,.mm-mob-knapp{display:none}

.mm-panel{position:absolute;left:0;right:0;top:100%;background:#f7f1e7;color:#14202a;border-top:1px solid rgba(150,110,60,.18);box-shadow:0 24px 50px rgba(13,36,64,.22);opacity:0;visibility:hidden;transform:translateY(-8px);transition:opacity .22s ease,transform .22s ease,visibility 0s linear .22s}
.mm-panel.oppen{opacity:1;visibility:visible;transform:none;transition:opacity .22s ease,transform .22s ease,visibility 0s}
.mm-inre{display:grid;grid-template-columns:minmax(220px,300px) 1fr minmax(240px,300px);gap:48px;max-width:1240px;margin:0 auto;padding:40px 40px 44px}
.mm-kol{animation:mm-in .32s ease both}
.mm-grupper{animation-delay:.04s}.mm-sida{animation-delay:.08s}
@keyframes mm-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.mm-titel{display:inline-flex;align-items:baseline;gap:12px;font-family:'Playfair Display',Georgia,serif;font-size:40px;font-weight:700;line-height:1.05;color:#14202a;text-decoration:none;letter-spacing:-.01em}
.mm-titel span{font-family:Inter,system-ui,sans-serif;font-size:24px;color:#c96e2a;transition:transform .2s ease}
.mm-titel:hover span{transform:translateX(4px)}
.mm-intro p{margin:14px 0 22px;font-size:15px;line-height:1.6;color:#3d5865}
.mm-allt{font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none;border-bottom:1px solid rgba(30,92,130,.3);padding-bottom:2px}
.mm-allt:hover{border-bottom-color:#1e5c82}
.mm-grupper{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 40px;align-content:start}
.mm-grupp-rubrik{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#c96e2a;margin:0 0 10px}
.mm-lank{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:7px 0;font-size:16.5px;font-weight:500;color:#14202a;text-decoration:none;border-bottom:1px solid transparent}
.mm-lank i{font-style:normal;color:#c96e2a;opacity:0;transform:translateX(-4px);transition:opacity .18s ease,transform .18s ease}
.mm-lank:hover{color:#1e5c82}
.mm-lank:hover i{opacity:1;transform:none}
.mm-karta{display:flex;flex-direction:column;align-items:center}
.mm-karta svg{height:320px;width:auto;overflow:visible}
.mm-karta-tom{height:320px}
.mm-karta path{stroke:#f7f1e7;stroke-width:.8;transition:fill .3s ease}
.k-inland{fill:#ece3d2}.k-kust{fill:#dccdb1}.k-sjo{fill:#c9dde3}
.mm-karta path.k-vald{fill:#1e5c82}
.mm-karta-text{display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:12px}
.mm-karta-text span{font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;min-height:24px}
.mm-karta-text a{font-size:13.5px;font-weight:700;color:#1e5c82;text-decoration:none}
.mm-utvalt-lank{display:flex;flex-direction:column;gap:6px;text-decoration:none;color:#14202a}
.mm-utvalt-bild{display:block;aspect-ratio:4/3;border-radius:14px;overflow:hidden;background:#e8dfcf;margin-bottom:6px}
.mm-utvalt-bild img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
.mm-utvalt-lank:hover .mm-utvalt-bild img{transform:scale(1.03)}
.mm-thorkel{width:72px;height:72px;border-radius:50%;box-shadow:0 0 0 3px #fffdf8,0 8px 20px rgba(13,36,64,.2);margin-bottom:8px}
.mm-utvalt-etikett{font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#c96e2a}
.mm-utvalt-titel{font-family:'Playfair Display',Georgia,serif;font-size:21px;font-weight:700;line-height:1.2}
.mm-utvalt-titel i{font-style:normal;font-family:Inter,system-ui,sans-serif;color:#c96e2a;display:inline-block;transition:transform .2s ease}
.mm-utvalt-lank:hover .mm-utvalt-titel i{transform:translateX(4px)}
.mm-utvalt-text{font-size:14px;line-height:1.5;color:#3d5865}
.mm-utvalt-not{font-size:12px;font-weight:700;color:#1e5c82}
.mm-kredit{margin-top:8px;font-size:11px;color:#7b8a90}
.mm-kredit a{color:inherit}
.mm-dimma{position:fixed;inset:0;z-index:150;background:rgba(13,36,64,.32);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility 0s linear .25s}
.mm-dimma.synlig{opacity:1;visibility:visible;transition:opacity .25s ease,visibility 0s}
.mm-mob{display:none}

@media (min-width:1101px){.hero-search{display:none!important}}
@media (max-width:1240px){.mm-inre{grid-template-columns:240px 1fr 260px;gap:32px}.mm-sok input{width:130px}}
@media (max-width:1100px){
  .mm-rad{padding:0 16px;height:64px;gap:10px}
  .mm-nav,.mm-sok,.mm-liten,.mm-konto,.mm-panel,.mm-dimma{display:none}
  .mm-hoger{margin-left:auto;gap:6px}
  .mm-mob-sok{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;color:#fff}
  .mm-mob-knapp{display:block;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.3);color:#fff;font:inherit;font-size:14px;font-weight:700;padding:8px 14px;border-radius:999px;cursor:pointer}
  .mm-mob{display:block;position:fixed;inset:0;z-index:300;background:#f7f1e7;color:#14202a;transform:translateY(12px);opacity:0;visibility:hidden;transition:opacity .25s ease,transform .25s ease,visibility 0s linear .25s}
  .mm-mob.oppen{transform:none;opacity:1;visibility:visible;transition:opacity .25s ease,transform .25s ease,visibility 0s}
  .mm-mob-topp{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 16px;border-bottom:1px solid rgba(150,110,60,.15)}
  .mm-mob-stang{background:none;border:none;font:inherit;font-size:14px;font-weight:700;color:#14202a;cursor:pointer;padding:8px}
  .mm-mob-spar{position:relative;height:calc(100% - 64px);overflow:hidden}
  .mm-mob-niva{position:absolute;inset:0;overflow-y:auto;padding:16px 20px 40px;transition:transform .32s cubic-bezier(.2,.7,.2,1),opacity .32s ease}
  .mm-mob-niva:last-child{transform:translateX(100%)}
  .mm-mob-spar.niva2 .mm-mob-niva:first-child{transform:translateX(-30%);opacity:0;pointer-events:none}
  .mm-mob-spar.niva2 .mm-mob-niva:last-child{transform:none}
  .mm-mob-sokfalt input{width:100%;height:50px;border-radius:999px;border:1px solid rgba(150,110,60,.25)!important;background:#fff!important;padding:0 18px;font:inherit;font-size:16px;color:#14202a;outline:none;box-shadow:none!important;margin-bottom:10px}
  .mm-mob-rad{display:flex;align-items:center;justify-content:space-between;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid rgba(150,110,60,.15);padding:16px 2px;cursor:pointer;color:#14202a;font:inherit}
  .mm-mob-rad strong{display:block;font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;line-height:1.15}
  .mm-mob-rad small{display:block;font-size:13px;color:#7b8a90;margin-top:3px}
  .mm-mob-rad i,.mm-mob-lank i{font-style:normal;font-size:24px;color:#c96e2a}
  .mm-mob-fot{display:flex;flex-wrap:wrap;align-items:center;gap:18px;margin-top:22px}
  .mm-mob-fot a{color:#1e5c82;font-size:14px;font-weight:700;text-decoration:none}
  .mm-mob-fot a.mm-mob-konto{background:#b5591a;color:#fff;padding:10px 18px;border-radius:999px}
  .mm-mob-tillbaka{background:none;border:none;font:inherit;font-size:14px;font-weight:700;color:#1e5c82;padding:4px 0 10px;cursor:pointer}
  .mm-mob-titel{font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:700;margin:0 0 6px}
  .mm-mob-ingress{font-size:14.5px;line-height:1.55;color:#3d5865;margin:0 0 18px}
  .mm-mob-grupp{margin-bottom:16px}
  .mm-mob-lank{display:flex;align-items:center;justify-content:space-between;min-height:50px;border-bottom:1px solid rgba(150,110,60,.13);font-size:17px;font-weight:500;color:#14202a;text-decoration:none}
  .mm-mob-allt{display:block;text-align:center;background:#1e5c82;color:#fff;border-radius:999px;padding:14px;font-size:15px;font-weight:700;text-decoration:none;margin:6px 0 24px}
}
@media (prefers-reduced-motion:reduce){.mm *,.mm-mob *{animation:none!important;transition:none!important}}
`
