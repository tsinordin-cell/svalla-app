'use client'
/**
 * FÖRHANDSVISNING runda 2, 2026-11-20 (Max): fjorton nya idéer efter genomgång av Max länkar och
 * ChatGPT-biblioteket. Erbjudandena är EXEMPEL: inga avtal finns än, och det står vid varje kort.
 * Allt annat bygger på Svallas egen data (dagsplaner, öar, kategorier, foton med fotograf och licens).
 */
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'

export type Bild = { url: string; fotograf: string; licens: string }
export type TurKort = { href: string; titel: string; tid: string; transport: string; langd: 'kort' | 'dag' | 'natt'; bild: Bild | null }
export type Rutt = { href: string; titel: string; ingress: string; bild: Bild | null; stopp: { namn: string; typ: string; text: string; tips: string | null }[] }
export type Kansla = { href: string; kansla: string; rubrik: string; antal: number; bild: Bild | null }
export type OPunkt = { slug: string; namn: string; lat: number; lng: number }
export type Mosaik = { slug: string; namn: string; rad: string; bild: Bild }
export type Siffra = { etikett: string; varde: number; not: string }

/* ── H + I. Erbjudanden: EXEMPEL, inga riktiga avtal ───────────────────── */
const ERBJUDANDEN: { rabatt: string; vad: string; var: string; typ: string }[] = [
  { rabatt: '10 %', vad: 'på övernattning', var: 'Sandhamn Seglarhotell', typ: 'Boende' },
  { rabatt: '20 %', vad: 'på en dag med fiskeguide', var: 'Fiskeguide i skärgården', typ: 'Upplevelse' },
  { rabatt: '30 %', vad: 'på middag och övernattning', var: 'Värdshus på ö X', typ: 'Mat och boende' },
  { rabatt: 'Gratis', vad: 'målarkonsultation', var: 'Målare på Möja', typ: 'Hantverk' },
  { rabatt: '2 för 1', vad: 'på havsbastu', var: 'Bastu på ö X', typ: 'Bastu och bad' },
  { rabatt: 'Fri', vad: 'första natten i gästhamn', var: 'Gästhamn X', typ: 'Hamn' },
]

/* ── O. Visste du: samma regler som på /skargardsdatum (källor där) ───── */
const VISSTE: { rubrik: string; text: string; href: string }[] = [
  { rubrik: 'Hummerpremiären', text: 'är alltid första måndagen efter 20 september.', href: '/guider/hummerpremiar-bohuslan' },
  { rubrik: 'Kräftpremiären', text: 'firas enligt traditionen den första onsdagen i augusti.', href: '/guider/kraftskiva-skargarden' },
  { rubrik: 'Surströmmingspremiären', text: 'infaller den tredje torsdagen i augusti.', href: '/guider/surstrommingspremiar' },
  { rubrik: 'Hundar', text: 'får inte springa lösa i naturen mellan 1 mars och 20 augusti.', href: '/guider/hund-skargarden' },
]

const LANGDER: { id: TurKort['langd']; rubrik: string; text: string }[] = [
  { id: 'kort', rubrik: 'Några timmar', text: 'En halvdag räcker' },
  { id: 'dag', rubrik: 'En hel dag', text: 'Ut på morgonen, hem på kvällen' },
  { id: 'natt', rubrik: 'Över natten', text: 'Stanna kvar när sista båten gått' },
]

const SATT: { rubrik: string; text: string; lank: string; href: string }[] = [
  { rubrik: 'Med reguljär båt', text: 'Kliv på i stan och kliv av på ön. Här ser du linjerna och var du hittar tidtabellerna.', lank: 'Båtar och färjor', href: '/farjor' },
  { rubrik: 'Med buss och båt', text: 'Buss till en brygga längre ut och sista biten med båt. Välj ö så visar vi vägen.', lank: 'Ta dig till din ö', href: '/ta-dig-till' },
  { rubrik: 'Med egen båt', text: 'Gästhamnar, bryggor och naturhamnar samlade på ett ställe.', lank: 'Hamnar och bryggor', href: '/hamnar-och-bryggor' },
]

const ARSTIDER: { namn: string; rad: string; href: string; farg: string }[] = [
  { namn: 'Vår', rad: 'Ljuset kommer tillbaka', href: '/sasong/var', farg: 'linear-gradient(160deg,#9fc8b4,#4f8f86)' },
  { namn: 'Sommar', rad: 'Bad, bryggor och långa kvällar', href: '/sommar', farg: 'linear-gradient(160deg,#5fb0e0,#1e5c82)' },
  { namn: 'Höst', rad: 'Lugnet och färgerna', href: '/host', farg: 'linear-gradient(160deg,#e0a05c,#a8501a)' },
  { namn: 'Vinter', rad: 'Is, stillhet och vintertrafik', href: '/vinter', farg: 'linear-gradient(160deg,#b9c8d6,#3d5865)' },
]

const TYP_NAMN: Record<string, string> = { transport: 'Resa', mat: 'Mat', kultur: 'Kultur', natur: 'Natur', bad: 'Bad', aktivitet: 'Aktivitet', boende: 'Boende' }

function Alt({ bokstav, rubrik, forebild, lank, varfor, children }: {
  bokstav: string; rubrik: string; forebild: string; lank: string; varfor: string; children: React.ReactNode
}) {
  return (
    <section className="id-alt" id={`alt-${bokstav}`}>
      <div className="id-skylt">
        <span className="id-bokstav">{bokstav}</span>
        <div>
          <div className="id-ers">{rubrik}</div>
          <div className="id-fore">Förebild: <a href={lank} target="_blank" rel="noopener noreferrer">{forebild}</a>. {varfor}</div>
        </div>
      </div>
      {children}
    </section>
  )
}

const Foto = ({ b }: { b: Bild }) => <i className="m-foto">Foto: {b.fotograf}, {b.licens}</i>
const bg = (b: Bild | null, morkt = '.82') => b ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,0) 30%, rgba(8,24,38,${morkt}) 100%), url('${b.url}')` } : undefined

export default function IdeerMer({ turer, rutt, kanslor, oar, mosaik, siffror }: {
  turer: TurKort[]; rutt: Rutt | null; kanslor: Kansla[]; oar: OPunkt[]; mosaik: Mosaik[]; siffror: Siffra[]
}) {
  /* H */
  const [hamtad, setHamtad] = useState<number | null>(null)
  /* J */
  const [langd, setLangd] = useState<TurKort['langd']>('dag')
  const valda = turer.filter(t => t.langd === langd)
  /* L + M: öarnas riktiga koordinater, plattade till en yta */
  const [tand, setTand] = useState<string | null>(null)
  const karta = useMemo(() => {
    if (oar.length === 0) return []
    const lat = oar.map(o => o.lat), lng = oar.map(o => o.lng)
    const [a, b, c, d] = [Math.min(...lat), Math.max(...lat), Math.min(...lng), Math.max(...lng)]
    return oar.map(o => ({ ...o, x: 6 + 88 * (o.lng - c) / (d - c || 1), y: 5 + 90 * (b - o.lat) / (b - a || 1) }))
  }, [oar])
  // Leden går från den nordligaste ön till närmaste nästa ö, så att strecket följer skärgården i stället för att korsa den.
  const led = useMemo(() => {
    const kvar = [...karta].sort((p, q) => p.y - q.y)
    const ut = kvar.splice(0, 1)
    while (kvar.length) {
      const s = ut[ut.length - 1]!
      let b = 0, bd = Infinity
      kvar.forEach((p, i) => { const d = ((p.x - s.x) * 2.1) ** 2 + (p.y - s.y) ** 2; if (d < bd) { bd = d; b = i } })
      ut.push(kvar.splice(b, 1)[0]!)
    }
    return ut
  }, [karta])
  // Mjuk linje: öarna är styrpunkter, mittpunkterna mellan dem är fästpunkter.
  const ledD = led.length < 3 ? '' : `M${led[0]!.x.toFixed(1)} ${led[0]!.y.toFixed(1)} ` + led.slice(1, -1).map((p, i) => {
    const n = led[i + 2]!
    return `Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${((p.x + n.x) / 2).toFixed(1)} ${((p.y + n.y) / 2).toFixed(1)}`
  }).join(' ') + ` L${led[led.length - 1]!.x.toFixed(1)} ${led[led.length - 1]!.y.toFixed(1)}`
  /* M: rita leden när ytan syns */
  const ritRef = useRef<HTMLDivElement>(null)
  const [ritad, setRitad] = useState(false)
  useEffect(() => {
    const el = ritRef.current
    if (!el) return
    const io = new IntersectionObserver(e => { if (e[0]?.isIntersecting) setRitad(true) }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  /* N: vilket stopp som är aktivt */
  const [stopp, setStopp] = useState(0)
  const stoppRef = useRef<(HTMLLIElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(es => {
      for (const e of es) if (e.isIntersecting) setStopp(Number((e.target as HTMLElement).dataset.i))
    }, { rootMargin: '-45% 0px -45% 0px' })
    stoppRef.current.forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [rutt])
  /* O */
  const [fakta, setFakta] = useState(0)
  const f = VISSTE[fakta]!

  return (
    <div className="id im">
      <style>{CSS}</style>
      <header className="im-topp">
        <p className="id-etikett">Runda 2</p>
        <h2>Fjorton idéer till</h2>
        <p>Hämtade ur länkarna från Max och ur ChatGPT-biblioteket. Erbjudandena är exempel för att visa formen, inga avtal finns än. Allt annat är Svallas riktiga innehåll.</p>
      </header>

      {/* ───────── H ───────── */}
      <Alt bokstav="H" rubrik="Erbjudanden, i stället för Utvalda turer" forebild="visitaland.com (Explore current offers) och tourismwhitsundays.com.au (Deals)" lank="https://visitaland.com/en/travel/"
        varfor="Båda lyfter partnererbjudanden med direkt väg till bokning. Här som kuponger: rabatten störst, sedan vad och var, och en knapp som hämtar den.">
        <div className="h-yta">
          <div className="h-huvud">
            <div>
              <div className="id-liten">Erbjudanden</div>
              <h2 className="id-h2">Skärgården till bättre pris</h2>
              <p>Rabatter från krogar, boenden och guider som finns på Svalla.</p>
            </div>
            <span className="h-exempel">Exempel, inga riktiga erbjudanden än</span>
          </div>
          <div className="h-rutnat">
            {ERBJUDANDEN.map((e, i) => (
              <article key={e.var} className="h-kupong">
                <div className="h-vanster">
                  <small>{e.typ}</small>
                  <b className={e.rabatt.length > 4 ? 'lang' : undefined}>{e.rabatt}</b>
                  <span>{e.vad}</span>
                </div>
                <div className="h-hoger">
                  <strong>{e.var}</strong>
                  <em>Annons i samarbete med partnern</em>
                  {hamtad === i ? (
                    <div className="h-kod"><b>SVALLA-EXEMPEL</b>Så här visas koden. Gästen visar den på plats eller bokar via partnerns länk.</div>
                  ) : (
                    <button type="button" onClick={() => setHamtad(i)}>Hämta rabatten</button>
                  )}
                </div>
              </article>
            ))}
          </div>
          <Link href="/erbjudanden" className="id-lank">Alla erbjudanden →</Link>
        </div>
      </Alt>

      {/* ───────── I ───────── */}
      <Alt bokstav="I" rubrik="Veckans erbjudande som ett stort band" forebild="visitsanjuans.com (Specials) och y.co (stora plattor med text i bilden)" lank="https://www.visitsanjuans.com/"
        varfor="Ett enda erbjudande får hela bredden. Passar när ett samarbete ska lyftas extra, till exempel en lanseringspartner.">
        {mosaik[0] && (
          <div className="i-band" style={bg(mosaik[0].bild, '.9')}>
            <div className="i-inne">
              <span className="h-exempel i-ex">Exempel, inget riktigt erbjudande än</span>
              <div className="id-liten i-liten">Veckans erbjudande</div>
              <h2><b>10 %</b> på övernattning</h2>
              <p>Sandhamn Seglarhotell. Annons i samarbete med partnern.</p>
              <button type="button" className="id-knapp i-knapp" onClick={() => setHamtad(0)}>{hamtad === 0 ? 'Kod: SVALLA-EXEMPEL' : 'Hämta rabatten'}</button>
            </div>
            <Foto b={mosaik[0].bild} />
          </div>
        )}
      </Alt>

      {/* ───────── J ───────── */}
      <Alt bokstav="J" rubrik="Hur lång tid har du?" forebild="estepona.travel (planer efter tiden du har)" lank="https://estepona.travel/"
        varfor="De frågar inte vart du vill, utan hur lång tid du har. Svallas dagsplaner har redan uppgift om längd, så valet ger riktiga träffar direkt.">
        <div className="j-yta">
          <div className="id-liten">Dagsplaner</div>
          <h2 className="id-h2">Hur lång tid har du?</h2>
          <div className="j-val">
            {LANGDER.map(l => (
              <button key={l.id} type="button" className={langd === l.id ? 'pa' : undefined} onClick={() => setLangd(l.id)}>
                <b>{l.rubrik}</b><span>{l.text}</span><i>{turer.filter(t => t.langd === l.id).length} dagsplaner</i>
              </button>
            ))}
          </div>
          <div className="j-rad">
            {valda.map(t => (
              <Link key={t.href} href={t.href} className="j-kort" style={bg(t.bild)}>
                <span><b>{t.titel}</b><small>{t.tid} · {t.transport}</small>{t.bild && <Foto b={t.bild} />}</span>
              </Link>
            ))}
          </div>
        </div>
      </Alt>

      {/* ───────── K ───────── */}
      <Alt bokstav="K" rubrik="Vad vill du känna?" forebild="Experience Abu Dhabi, Emotional Geography" lank="https://visitabudhabi.ae/en"
        varfor="De börjar i känslan i stället för i platsen. Svalla har redan ölistor för varje sådan önskan, så varje ruta leder till en riktig lista.">
        <div className="k-yta">
          <div className="id-liten">Hitta din ö</div>
          <h2 className="id-h2">Vad vill du känna?</h2>
          <div className="k-rutnat">
            {kanslor.map(k => (
              <Link key={k.href} href={k.href} className="k-ruta" style={bg(k.bild)}>
                <span><b>{k.kansla}</b><small>{k.rubrik} · {k.antal} öar</small>{k.bild && <Foto b={k.bild} />}</span>
              </Link>
            ))}
          </div>
        </div>
      </Alt>

      {/* ───────── L ───────── */}
      <Alt bokstav="L" rubrik="Öarna som en lista och en karta" forebild="The Cycladist (Awwwards)" lank="https://www.awwwards.com/inspiration/interactive-map-the-cycladist"
        varfor="En lugn krämvit yta med önamnen till vänster och öarna till höger. Peka på ett namn så tänds ön. Prickarna ligger på öarnas riktiga koordinater.">
        <div className="l-yta">
          <div className="l-lista">
            <div className="id-liten">Utforska öarna</div>
            <ul>
              {karta.map(o => (
                <li key={o.slug}><Link href={`/o/${o.slug}`} className={tand === o.slug ? 'pa' : undefined}
                  onMouseEnter={() => setTand(o.slug)} onMouseLeave={() => setTand(null)} onFocus={() => setTand(o.slug)}>{o.namn}</Link></li>
              ))}
            </ul>
          </div>
          <div className="l-karta">
            {karta.map(o => (
              <Link key={o.slug} href={`/o/${o.slug}`} className={tand === o.slug ? 'l-prick pa' : 'l-prick'} style={{ left: `${o.x}%`, top: `${o.y}%` }}
                onMouseEnter={() => setTand(o.slug)} onMouseLeave={() => setTand(null)} aria-label={o.namn}><span>{o.namn}</span></Link>
            ))}
            <em>{karta.length} öar i Stockholms skärgård, på sina riktiga koordinater</em>
          </div>
        </div>
      </Alt>

      {/* ───────── M ───────── */}
      <Alt bokstav="M" rubrik="Sjökortet som ritas upp" forebild="longestroadout.com" lank="https://longestroadout.com/"
        varfor="En handritad led som ritas medan man tittar, med handskrivna namn. Här går strecket genom Svallas öar från norr till söder. Det är en illustration, inte en farled.">
        <div className={ritad ? 'm-yta ritad' : 'm-yta'} ref={ritRef}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d={ledD} pathLength={1} className="m-led" />
          </svg>
          {karta.map(p => <i key={p.slug} className="m-prick" style={{ left: `${p.x}%`, top: `${p.y}%` }} />)}
          {led.filter((_, i) => i % 6 === 0).map((p, i) => (
            <span key={p.slug} className="m-namn" style={{ left: `${p.x}%`, top: `${p.y}%`, transitionDelay: `${0.4 + i * 0.25}s` }}>{p.namn}</span>
          ))}
          <div className="m-mitt">
            <h2>Skärgården, ö för ö</h2>
            <Link href="/oar" className="id-knapp">Alla öar →</Link>
          </div>
        </div>
      </Alt>

      {/* ───────── N ───────── */}
      {rutt && (
        <Alt bokstav="N" rubrik="En dagsplan som berättelse" forebild="visitmonteisola.it (Interactive itineraries)" lank="https://www.visitmonteisola.it/en/traditions-itinerary/"
          varfor="Stoppen kommer ett i taget medan bilden ligger kvar. Texten är dagsplanens egen, ord för ord.">
          <div className="n-yta">
            <div className="n-bild" style={bg(rutt.bild, '.75')}>
              <div>
                <small>Stopp {stopp + 1} av {rutt.stopp.length}</small>
                <b>{rutt.stopp[stopp]?.namn}</b>
                <div className="n-prickar">{rutt.stopp.map((_, i) => <i key={i} className={i === stopp ? 'pa' : undefined} />)}</div>
              </div>
              {rutt.bild && <Foto b={rutt.bild} />}
            </div>
            <div className="n-text">
              <div className="id-liten">Dagsplan</div>
              <h2 className="id-h2">{rutt.titel}</h2>
              <p className="n-ingress">{rutt.ingress}</p>
              <ol>
                {rutt.stopp.map((s, i) => (
                  <li key={s.namn} data-i={i} ref={el => { stoppRef.current[i] = el }} className={i === stopp ? 'pa' : undefined}>
                    <span className="n-nr">{i + 1}</span>
                    <div><small>{TYP_NAMN[s.typ] ?? s.typ}</small><b>{s.namn}</b><p>{s.text}</p>{s.tips && <em>Tips: {s.tips}</em>}</div>
                  </li>
                ))}
              </ol>
              <Link href={rutt.href} className="id-knapp">Öppna dagsplanen →</Link>
            </div>
          </div>
        </Alt>
      )}

      {/* ───────── O ───────── */}
      <Alt bokstav="O" rubrik="Visste du? som kort man bläddrar i" forebild="visitabudhabi.ae (Did you know?)" lank="https://visitabudhabi.ae/en"
        varfor="Ett faktakort i taget över en helbild. Reglerna är de som redan står på Skärgårdens datum, med källa där.">
        {mosaik[1] && (
          <div className="o-yta" style={bg(mosaik[1].bild, '.55')}>
            <div className="o-vanster"><h2>Visste du?</h2><p>Skärgården har sina egna datum. Bläddra bland dem.</p></div>
            <div className="o-kort">
              <small>{fakta + 1} av {VISSTE.length}</small>
              <p><b>{f.rubrik}</b> {f.text}</p>
              <div className="o-fot">
                <Link href={f.href}>Läs mer →</Link>
                <span>
                  <button type="button" aria-label="Föregående" onClick={() => setFakta((fakta + VISSTE.length - 1) % VISSTE.length)}>←</button>
                  <button type="button" aria-label="Nästa" onClick={() => setFakta((fakta + 1) % VISSTE.length)}>→</button>
                </span>
              </div>
            </div>
            <Foto b={mosaik[1].bild} />
          </div>
        )}
      </Alt>

      {/* ───────── P ───────── */}
      <Alt bokstav="P" rubrik="Tre sätt att ta sig ut" forebild="visitaland.com (Travel)" lank="https://visitaland.com/en/travel/"
        varfor="De lägger resvägarna sida vid sida i stället för i en lång text. Varje spalt leder till en sida som redan finns på Svalla.">
        <div className="p-yta">
          <div className="id-liten">Ta dig ut</div>
          <h2 className="id-h2">Tre sätt att ta sig ut</h2>
          <div className="p-rad">
            {SATT.map((s, i) => (
              <Link key={s.href} href={s.href} className="p-spalt">
                <span className="p-nr">{i + 1}</span><b>{s.rubrik}</b><p>{s.text}</p><i>{s.lank} →</i>
              </Link>
            ))}
          </div>
        </div>
      </Alt>

      {/* ───────── Q ───────── */}
      <Alt bokstav="Q" rubrik="Samla öar som stämplar" forebild="Sea Louth (pass med stämplar) och The Longest Road Out (märken längs vägen)" lank="https://www.zoma.ie/work/sea-louth"
        varfor="Ett pass att fylla är ett skäl att komma tillbaka. Svalla låter redan inloggade markera öar de besökt, här får det en form man vill visa upp.">
        <div className="q-yta">
          <div className="q-text">
            <div className="id-liten">Min skärgård</div>
            <h2 className="id-h2">Samla dina öar</h2>
            <p>Markera öarna du har besökt och se passet fyllas, ö för ö.</p>
            <Link href="/min-skargard" className="id-knapp">Öppna min skärgård →</Link>
          </div>
          <div className="q-stamplar" aria-hidden="true">
            {mosaik.slice(0, 8).map((m, i) => (
              <span key={m.slug} className={i % 3 === 2 ? 'q-s tom' : 'q-s'} style={{ transform: `rotate(${[-8, 5, -3, 9, -6, 4, -10, 7][i]}deg)` }}>
                <small>Svalla</small><b>{m.namn}</b><small>{i % 3 === 2 ? 'Inte än' : 'Besökt'}</small>
              </span>
            ))}
          </div>
        </div>
      </Alt>

      {/* ───────── R ───────── */}
      <Alt bokstav="R" rubrik="Svalla i siffror, i stället för förtroenderaden" forebild="otaridesign.com (etikett till vänster, innehåll till höger, tunna linjer)" lank="https://www.otaridesign.com/work/islas-secas"
        varfor="Lugn redaktionell uppställning i stället för ikoner. Siffrorna räknas ur Svallas data varje gång sidan byggs, så de kan inte bli gamla.">
        <div className="r-yta">
          {siffror.map(s => (
            <div key={s.etikett} className="r-rad"><span>{s.etikett}</span><b>{s.varde}</b><p>{s.not}</p></div>
          ))}
        </div>
      </Alt>

      {/* ───────── S ───────── */}
      <Alt bokstav="S" rubrik="Öar i bild, som en mosaik" forebild="myswitzerland.com (bildmosaik) och otaridesign.com" lank="https://www.myswitzerland.com/"
        varfor="Olika stora rutor ger rytm åt sidan. Varje bild är öns eget foto från Svallas ösida, med fotograf och licens.">
        <div className="s-yta">
          {mosaik.slice(0, 6).map((m, i) => (
            <Link key={m.slug} href={`/o/${m.slug}`} className={`s-ruta s-${i}`} style={bg(m.bild)}>
              <span><b>{m.namn}</b><small>{m.rad}</small><Foto b={m.bild} /></span>
            </Link>
          ))}
        </div>
      </Alt>

      {/* ───────── T ───────── */}
      <Alt bokstav="T" rubrik="Fyra årstider" forebild="discovertasmania.com.au och visitsanjuans.com (årstiderna som ingång)" lank="https://www.discovertasmania.com.au/"
        varfor="Skärgården är fyra olika platser beroende på när man åker. Fyra stora plattor med ett ord var leder till säsongssidorna som finns.">
        <div className="t-yta">
          {ARSTIDER.map(a => (
            <Link key={a.namn} href={a.href} className="t-platta" style={{ background: a.farg }}>
              <small>{a.rad}</small><b>{a.namn}</b>
            </Link>
          ))}
        </div>
      </Alt>

      {/* ───────── U ───────── */}
      <Alt bokstav="U" rubrik="Innan du går: månadsbrevet" forebild="estepona.travel (Antes de irte)" lank="https://estepona.travel/"
        varfor="Sista frågan på sidan, lugnt ställd. Leder till Svallas sida för nyhetsbrevet.">
        <div className="u-yta">
          <div>
            <div className="id-liten u-liten">Innan du går</div>
            <h2>Vill du ha månadsbrevet?</h2>
            <p>Vad som har öppet i skärgården, båtar som byter tidtabell och månadens öar.</p>
          </div>
          <Link href="/nyhetsbrev" className="id-knapp u-knapp">Ja tack →</Link>
        </div>
      </Alt>
    </div>
  )
}

const CSS = `
.im{padding-top:8px}
.im-topp{max-width:860px;margin:0 auto;padding:72px 24px 0;text-align:center}
.im-topp h2{font-size:clamp(30px,4.4vw,48px);margin:0 0 12px;color:#0d2440}
.im-topp p{font-size:16px;line-height:1.6;color:#3d5865;margin:0}
.m-foto{display:block;font-size:10px;font-style:normal;color:rgba(255,255,255,.7)}
.h-exempel{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#7a3a10;background:#fde9c8;border:1px dashed #b5591a;border-radius:999px;padding:6px 12px}

/* H */
.h-yta{max-width:1200px;margin:0 auto;padding:0 24px}
.h-huvud{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;margin-bottom:20px}
.h-huvud p{margin:0;font-size:15.5px;color:#3d5865}
.h-rutnat{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.h-kupong{display:grid;grid-template-columns:42% 1fr;background:#fffdf8;border-radius:20px;overflow:hidden;box-shadow:0 8px 28px rgba(60,40,15,.09);min-height:190px}
.h-vanster{background:#0d2440;color:#fff;padding:20px 16px;display:flex;flex-direction:column;justify-content:center;position:relative}
.h-vanster::after{content:'';position:absolute;right:-7px;top:0;bottom:0;width:14px;background:radial-gradient(circle,#fffdf8 5px,transparent 5.5px) 0 0/14px 16px}
.h-vanster small{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.h-vanster b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,3.6vw,48px);line-height:1;margin:8px 0 6px}
.h-vanster b.lang{font-size:clamp(24px,2.5vw,32px)}
.h-vanster span{font-size:13.5px;line-height:1.35;color:rgba(255,255,255,.88)}
.h-hoger{padding:20px 18px 18px 24px;display:flex;flex-direction:column;gap:6px;justify-content:center}
.h-hoger strong{font-family:'Playfair Display',Georgia,serif;font-size:19px;line-height:1.2;color:#0d2440}
.h-hoger em{font-size:11.5px;font-style:normal;color:#52717f}
.h-hoger button{margin-top:10px;align-self:flex-start;font:inherit;font-size:14px;font-weight:700;color:#fff;background:#b5591a;border:none;border-radius:999px;padding:10px 18px;cursor:pointer}
.h-hoger button:hover{background:#9a4a14}
.h-kod{margin-top:8px;font-size:12px;line-height:1.45;color:#3d5865;background:#f3ece0;border-radius:12px;padding:10px 12px}
.h-kod b{display:block;font-family:ui-monospace,Menlo,monospace;font-size:14px;letter-spacing:.08em;color:#0d2440;margin-bottom:3px}

/* I */
.i-band{position:relative;max-width:1200px;margin:0 auto;min-height:440px;border-radius:28px;overflow:hidden;background:#0d2440;background-size:cover;background-position:center;display:flex;align-items:flex-end;color:#fff}
.i-inne{padding:40px}
.i-ex{margin-bottom:14px}
.i-liten{color:#f2a25c}
.i-band h2{font-size:clamp(30px,5vw,60px);line-height:1.05;margin:0 0 8px}
.i-band h2 b{color:#f2a25c}
.i-band p{margin:0 0 20px;font-size:16px;color:rgba(255,255,255,.9)}
.i-knapp{background:#b5591a;border:none;cursor:pointer;font-family:inherit}
.i-band>.m-foto{position:absolute;right:16px;bottom:12px}

/* J */
.j-yta{max-width:1200px;margin:0 auto;padding:0 24px}
.j-val{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:0 0 20px}
.j-val button{font:inherit;text-align:left;background:#fffdf8;border:1.5px solid rgba(150,110,60,.2);border-radius:18px;padding:18px 20px;cursor:pointer;display:flex;flex-direction:column;gap:3px;color:#192830}
.j-val button.pa{background:#0d2440;border-color:#0d2440;color:#fff}
.j-val b{font-family:'Playfair Display',Georgia,serif;font-size:22px}
.j-val span{font-size:13.5px;opacity:.85}
.j-val i{font-size:11.5px;font-style:normal;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#b5591a;margin-top:6px}
.j-val button.pa i{color:#f2a25c}
.j-rad{display:flex;gap:14px;overflow-x:auto;scrollbar-width:none;scroll-snap-type:x mandatory}
.j-rad::-webkit-scrollbar{display:none}
.j-kort,.k-ruta,.s-ruta{position:relative;border-radius:20px;overflow:hidden;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;color:#fff;text-decoration:none;display:flex;align-items:flex-end}
.j-kort{flex:0 0 clamp(230px,24vw,290px);aspect-ratio:4/5;scroll-snap-align:start}
.j-kort::before,.k-ruta::before,.s-ruta::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,.08),rgba(8,24,38,.5))}
.j-kort span,.k-ruta span,.s-ruta span{position:relative;padding:16px;display:flex;flex-direction:column;gap:5px}
.j-kort b,.k-ruta b,.s-ruta b{font-family:'Playfair Display',Georgia,serif;font-size:20px;line-height:1.15}
.j-kort small,.k-ruta small,.s-ruta small{font-size:12.5px;font-weight:600;color:rgba(255,255,255,.9)}

/* K */
.k-yta{max-width:1200px;margin:0 auto;padding:0 24px}
.k-rutnat{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.k-ruta{aspect-ratio:1/1;transition:transform .3s ease}
.k-ruta:hover{transform:translateY(-4px)}
.k-ruta b{font-size:24px}

/* L */
.l-yta{max-width:1200px;margin:0 auto;background:#fbf6ec;border-radius:28px;padding:40px;display:grid;grid-template-columns:330px minmax(0,1fr);gap:32px;border:1px solid rgba(150,110,60,.16);overflow:hidden}
.l-lista ul{list-style:none;margin:0;padding:0;columns:2;column-gap:18px}
.l-lista a{display:block;font-family:'Playfair Display',Georgia,serif;font-size:14.5px;color:#3d5865;text-decoration:none;padding:3px 0}
.l-lista a.pa,.l-lista a:hover{color:#b5591a}
.l-karta{position:relative;min-height:640px}
.l-prick{position:absolute;width:11px;height:11px;margin:-5px 0 0 -5px;border-radius:50%;background:#0d2440;transition:transform .2s ease,background .2s ease}
.l-prick span{position:absolute;left:18px;top:-5px;white-space:nowrap;font-size:12.5px;font-weight:700;color:#0d2440;background:#fffdf8;border-radius:8px;padding:3px 8px;opacity:0;pointer-events:none;transition:opacity .2s ease;box-shadow:0 4px 14px rgba(0,0,0,.12)}
.l-prick.pa,.l-prick:hover{background:#b5591a;transform:scale(1.7);z-index:2}
.l-prick.pa span,.l-prick:hover span{opacity:1;transform:scale(.6);transform-origin:left center}
.l-karta em{position:absolute;right:0;bottom:-8px;font-size:11.5px;font-style:normal;color:#52717f}

/* M */
.m-yta{position:relative;max-width:1200px;margin:0 auto;height:560px;background:#fbf4e6;border-radius:28px;overflow:hidden;border:1px solid rgba(150,110,60,.16)}
.m-yta svg{position:absolute;inset:0;width:100%;height:100%}
.m-led{fill:none;stroke:#c98a4f;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;vector-effect:non-scaling-stroke;stroke-width:1.6px;transition:stroke-dashoffset 5s ease}
.m-yta.ritad .m-led{stroke-dashoffset:0}
.m-prick{position:absolute;width:7px;height:7px;margin:-3px 0 0 -3px;border-radius:50%;background:#0d2440;opacity:.55}
.m-namn{position:absolute;font-family:'Bradley Hand','Segoe Script','Snell Roundhand',cursive;font-size:17px;color:#b5591a;transform:translate(10px,-50%) rotate(-6deg);white-space:nowrap;opacity:0;transition:opacity .8s ease}
.m-yta.ritad .m-namn{opacity:.9}
.m-mitt{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;text-align:center;padding:0 20px;pointer-events:none}
.m-mitt h2{font-size:clamp(32px,5vw,58px);margin:0;color:#0d2440;background:rgba(251,244,230,.82);padding:6px 18px;border-radius:14px}
.m-mitt a{pointer-events:auto}

/* N */
.n-yta{max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:start}
.n-bild{position:sticky;top:90px;height:min(70vh,600px);border-radius:28px;overflow:hidden;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;padding:28px}
.n-bild small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.n-bild b{display:block;font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,36px);line-height:1.1;margin:6px 0 14px}
.n-prickar{display:flex;gap:6px;margin-bottom:10px}
.n-prickar i{width:22px;height:4px;border-radius:2px;background:rgba(255,255,255,.35)}
.n-prickar i.pa{background:#f2a25c}
.n-ingress{font-size:16px;line-height:1.6;color:#3d5865;margin:0 0 24px}
.n-text ol{list-style:none;margin:0 0 28px;padding:0;display:grid;gap:14px}
.n-text li{display:flex;gap:16px;background:#fffdf8;border-radius:20px;padding:22px;border:1px solid rgba(150,110,60,.16);opacity:.55;transition:opacity .3s ease,box-shadow .3s ease}
.n-text li.pa{opacity:1;box-shadow:0 10px 30px rgba(60,40,15,.12)}
.n-nr{flex-shrink:0;width:36px;height:36px;border-radius:50%;background:#0d2440;color:#fff;font-family:'Playfair Display',Georgia,serif;font-weight:700;display:flex;align-items:center;justify-content:center}
.n-text li small{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a8501a}
.n-text li b{display:block;font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#0d2440;margin:2px 0 6px}
.n-text li p{margin:0;font-size:14.5px;line-height:1.6;color:#3d5865}
.n-text li em{display:block;margin-top:8px;font-size:13.5px;font-style:normal;color:#1e5c82}

/* O */
.o-yta{position:relative;max-width:1200px;margin:0 auto;min-height:420px;border-radius:28px;overflow:hidden;background:#0d2440;background-size:cover;background-position:center;display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:32px;align-items:center;padding:40px;color:#fff}
.o-vanster h2{font-size:clamp(30px,4.6vw,52px);margin:0 0 10px}
.o-vanster p{margin:0;font-size:16px;color:rgba(255,255,255,.9);max-width:380px}
.o-kort{background:#fffdf8;color:#192830;border-radius:22px;padding:26px}
.o-kort small{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a8501a}
.o-kort p{font-family:'Playfair Display',Georgia,serif;font-size:22px;line-height:1.35;margin:10px 0 20px;color:#0d2440;min-height:120px}
.o-fot{display:flex;justify-content:space-between;align-items:center}
.o-fot a{font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none}
.o-fot button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(150,110,60,.3);background:#fff;font-size:17px;cursor:pointer;margin-left:6px;color:#0d2440}
.o-yta>.m-foto{position:absolute;left:16px;bottom:10px}

/* P */
.p-yta{max-width:1200px;margin:0 auto;padding:0 24px}
.p-rad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;background:#fffdf8;border-radius:24px;overflow:hidden;border:1px solid rgba(150,110,60,.16)}
.p-spalt{padding:30px;text-decoration:none;color:#192830;border-right:1px solid rgba(150,110,60,.16);display:flex;flex-direction:column;gap:8px;transition:background .2s ease}
.p-spalt:last-child{border-right:none}
.p-spalt:hover{background:#f3ece0}
.p-nr{font-family:'Playfair Display',Georgia,serif;font-size:44px;line-height:1;color:#b5591a}
.p-spalt b{font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#0d2440}
.p-spalt p{margin:0;font-size:14.5px;line-height:1.6;color:#3d5865;flex:1}
.p-spalt i{font-style:normal;font-size:14px;font-weight:700;color:#1e5c82}

/* Q */
.q-yta{max-width:1200px;margin:0 auto;background:#fbf4e6;border-radius:28px;padding:44px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:32px;align-items:center;border:1px solid rgba(150,110,60,.16)}
.q-text p{font-size:16px;line-height:1.6;color:#3d5865;margin:0 0 22px}
.q-stamplar{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.q-s{aspect-ratio:1/1;border-radius:50%;border:2.5px double #b5591a;color:#b5591a;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6px;gap:2px}
.q-s small{font-size:8.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.q-s b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(11px,1.25vw,15px);line-height:1.1}
.q-s.tom{border-style:dashed;border-width:1.5px;color:#9aa9af}

/* R */
.r-yta{max-width:980px;margin:0 auto;padding:0 24px}
.r-rad{display:grid;grid-template-columns:200px 130px minmax(0,1fr);gap:24px;align-items:baseline;padding:20px 0;border-top:1px solid rgba(13,36,64,.18)}
.r-rad:last-child{border-bottom:1px solid rgba(13,36,64,.18)}
.r-rad span{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#52717f}
.r-rad b{font-family:'Playfair Display',Georgia,serif;font-size:44px;line-height:1;color:#0d2440;font-variant-numeric:tabular-nums}
.r-rad p{margin:0;font-size:15px;line-height:1.55;color:#3d5865}

/* S */
.s-yta{max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:210px;gap:14px}
.s-0{grid-column:span 2;grid-row:span 2}
.s-3,.s-4,.s-5{grid-column:span 2}
.s-ruta{transition:transform .3s ease}
.s-ruta:hover{transform:scale(1.015)}
.s-0 b{font-size:30px}

/* T */
.t-yta{max-width:1200px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.t-platta{height:300px;border-radius:24px;color:#fff;text-decoration:none;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:16px;transition:transform .3s ease}
.t-platta:hover{transform:translateY(-4px)}
.t-platta small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.9;margin-bottom:8px}
.t-platta b{font-family:'Playfair Display',Georgia,serif;font-size:clamp(34px,4.4vw,56px);text-transform:uppercase;letter-spacing:.04em;line-height:1}

/* U */
.u-yta{max-width:1100px;margin:0 auto;background:#1e5c82;color:#fff;border-radius:28px;padding:44px 48px;display:flex;gap:32px;align-items:center;justify-content:space-between}
.u-liten{color:#fde9c8}
.u-yta h2{font-size:clamp(26px,3.6vw,40px);margin:0 0 8px}
.u-yta p{margin:0;font-size:16px;line-height:1.6;color:rgba(255,255,255,.88);max-width:560px}
.u-knapp{background:#fffdf8;color:#0d2440;flex-shrink:0}

@media (max-width:820px){
  .h-rutnat{grid-template-columns:1fr}
  .i-band{margin:0 12px;min-height:400px}
  .i-inne{padding:26px 22px 34px}
  .j-val{grid-template-columns:1fr}
  .k-rutnat{grid-template-columns:1fr 1fr}
  .k-ruta{aspect-ratio:3/4}
  .k-ruta b{font-size:19px}
  .k-ruta span{padding:12px}
  .k-ruta small{font-size:11.5px}
  .l-yta{margin:0 12px;padding:24px 20px;grid-template-columns:1fr}
  .l-karta{min-height:420px;order:-1}
  .m-yta{margin:0 12px;height:480px}
  .m-namn{font-size:14px}
  .n-yta{grid-template-columns:1fr;gap:20px}
  .n-bild{position:sticky;top:64px;height:210px;padding:18px;z-index:2}
  .o-yta{margin:0 12px;grid-template-columns:1fr;padding:26px 20px 34px}
  .p-rad{grid-template-columns:1fr}
  .p-spalt{border-right:none;border-bottom:1px solid rgba(150,110,60,.16)}
  .q-yta{margin:0 12px;padding:26px 20px;grid-template-columns:1fr}
  .r-rad{grid-template-columns:1fr auto;gap:6px 16px}
  .r-rad p{grid-column:1/-1}
  .r-rad b{font-size:34px}
  .s-yta{grid-template-columns:1fr 1fr;grid-auto-rows:170px}
  .t-yta{grid-template-columns:1fr 1fr}
  .t-platta{height:190px}
  .u-yta{margin:0 12px;padding:28px 22px;flex-direction:column;align-items:flex-start}
}
`
