'use client'
/**
 * FÖRHANDSVISNING 2026-11-20 (Max): så visar Svalla förmåner och erbjudanden, från kortet till
 * partnerns rapport. ALLA förmåner, partners, koder och siffror om partners är EXEMPEL. Inga avtal
 * finns. Öarnas namn, foton och Svallas egna siffror är riktiga och kommer från sidans server.
 */
import Link from 'next/link'
import { useMemo, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'

export type FBild = { url: string; fotograf: string; licens: string }
export type FO = { slug: string; namn: string; bild: FBild | null }
export type FPunkt = { slug: string; namn: string; x: number; y: number }
export type FSiffror = { oar: number; krogar: number; boenden: number; hamnar: number }

type Typ = 'Boende' | 'Mat' | 'Upplevelse' | 'Hamn' | 'Hantverk'
type Forman = {
  id: string; rubrik: string; partner: string; o: string; omrade: string; typ: Typ
  villkor: string; till: string; dagarKvar: number; betald: boolean; kod: string
}

/* EXEMPEL. Inga av de här förmånerna eller partnerna finns. */
const FORMANER: Forman[] = [
  { id: 'kaffe', rubrik: 'Fri kaffe till lunchen', partner: 'Krogen vid gästhamnen', o: 'moja', omrade: 'Stockholms skärgård', typ: 'Mat', villkor: 'En per gäst, vid lunch', till: '30 september', dagarKvar: 12, betald: false, kod: 'SVALLA-MOJA' },
  { id: 'sen', rubrik: 'Sen utcheckning', partner: 'Hotellet i hamnen', o: 'sandhamn', omrade: 'Stockholms skärgård', typ: 'Boende', villkor: 'Ange koden när du bokar', till: '31 oktober', dagarKvar: 43, betald: true, kod: 'SVALLA-SANDHAMN' },
  { id: 'mal', rubrik: 'Gratis målarkonsultation', partner: 'Målaren på ön', o: 'moja', omrade: 'Stockholms skärgård', typ: 'Hantverk', villkor: 'Boka tid i förväg', till: '31 december', dagarKvar: 104, betald: false, kod: 'SVALLA-MALA' },
  { id: 'fiske', rubrik: 'Fiskespö ingår', partner: 'Fiskeguiden', o: 'uto', omrade: 'Stockholms skärgård', typ: 'Upplevelse', villkor: 'Vid bokning av en halvdag', till: '15 oktober', dagarKvar: 27, betald: true, kod: 'SVALLA-FISKE' },
  { id: 'bastu', rubrik: 'Två bastar för en', partner: 'Havsbastun', o: 'grinda', omrade: 'Stockholms skärgård', typ: 'Upplevelse', villkor: 'Vardagar', till: '30 november', dagarKvar: 73, betald: false, kod: 'SVALLA-BASTU' },
  { id: 'hamn', rubrik: 'Första natten utan avgift', partner: 'Gästhamnen', o: 'finnhamn', omrade: 'Stockholms skärgård', typ: 'Hamn', villkor: 'Vid minst två nätter', till: '31 augusti', dagarKvar: 5, betald: false, kod: 'SVALLA-HAMN' },
  { id: 'frukost', rubrik: 'Frukost ingår', partner: 'Pensionatet', o: 'marstrand', omrade: 'Bohuslän', typ: 'Boende', villkor: 'Mitt i veckan', till: '30 september', dagarKvar: 12, betald: true, kod: 'SVALLA-MARSTRAND' },
]
const TYPER: Typ[] = ['Boende', 'Mat', 'Upplevelse', 'Hamn', 'Hantverk']
const OMRADEN = ['Stockholms skärgård', 'Bohuslän', 'Gotland', 'Åland']

const INDEX: [string, string][] = [
  ['1', 'Kortet'], ['2', 'Förmånssidan'], ['3', 'Alla förmåner'], ['4', 'Dagsplanen'], ['5', 'Ösidan'], ['6', 'Partnerns sida'],
  ['7', 'Kartan'], ['8', 'Thorkel'], ['9', 'Just nu'], ['10', 'Min skärgård'], ['11', 'Skylten'], ['12', 'Säljsidan'], ['13', 'Rapporten'],
]

function Del({ nr, rubrik, forebild, lank, varfor, children }: { nr: string; rubrik: string; forebild: string; lank: string; varfor: string; children: React.ReactNode }) {
  return (
    <section className="fm-del" id={`del-${nr}`}>
      <div className="fm-skylt">
        <span className="fm-nr">{nr}</span>
        <div>
          <div className="fm-rub">{rubrik}</div>
          <div className="fm-fore">Förebild: <a href={lank} target="_blank" rel="noopener noreferrer">{forebild}</a>. {varfor}</div>
        </div>
      </div>
      {children}
    </section>
  )
}

const Etikett = ({ f }: { f: Forman }) => <span className={f.betald ? 'fm-et reklam' : 'fm-et'}>{f.betald ? 'Reklam' : 'Svalla-förmån'}</span>
const Foto = ({ b }: { b: FBild | null }) => b ? <i className="fm-foto">Foto: {b.fotograf}, {b.licens}</i> : null
const bakgrund = (b: FBild | null, m = '.78') => b ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,.05) 30%, rgba(8,24,38,${m}) 100%), url('${b.url}')` } : undefined

function KortStort({ f, o }: { f: Forman; o: FO | undefined }) {
  return (
    <article className="fm-stort">
      <div className="fm-stort-bild" style={bakgrund(o?.bild ?? null, '.35')}>
        <span className="fm-typ">{f.typ}</span><Etikett f={f} />
      </div>
      <div className="fm-stort-text">
        <b>{f.rubrik}</b>
        <span className="fm-partner">{f.partner} · {o?.namn ?? f.o}</span>
        <span className="fm-villkor">{f.villkor} · Gäller till {f.till}</span>
      </div>
    </article>
  )
}
function KortKupong({ f, o }: { f: Forman; o: FO | undefined }) {
  return (
    <article className="fm-kupong">
      <div className="fm-kv"><small>{f.typ}</small><b>{f.rubrik}</b></div>
      <div className="fm-kh"><strong>{f.partner}</strong><span>{o?.namn ?? f.o}</span><Etikett f={f} /><em>Till {f.till}</em></div>
    </article>
  )
}
function KortRad({ f, o }: { f: Forman; o: FO | undefined }) {
  return (
    <div className="fm-rad">
      <span className="fm-rad-ikon" aria-hidden="true">✦</span>
      <span className="fm-rad-text"><b>{f.rubrik}</b><small>{f.partner} · {o?.namn ?? f.o} · till {f.till}</small></span>
      <Etikett f={f} />
    </div>
  )
}

function FalskQR({ fro }: { fro: number }) {
  const n = 21
  const celler = useMemo(() => {
    let s = fro
    const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
    const finder = (x: number, y: number) => {
      for (const [fx, fy] of [[0, 0], [n - 7, 0], [0, n - 7]] as const) {
        if (x >= fx && x < fx + 7 && y >= fy && y < fy + 7) {
          const dx = x - fx, dy = y - fy
          return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4) ? 1 : 0
        }
      }
      return -1
    }
    const ut: number[] = []
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) { const f = finder(x, y); ut.push(f >= 0 ? f : r() > 0.52 ? 1 : 0) }
    return ut
  }, [fro])
  return <div className="fm-qr" aria-label="QR-kod, exempel">{celler.map((c, i) => <i key={i} className={c ? 'p' : undefined} />)}</div>
}

export default function Formaner({ oar, punkter, siffror }: { oar: FO[]; punkter: FPunkt[]; siffror: FSiffror }) {
  const oMap = useMemo(() => new Map(oar.map(o => [o.slug, o])), [oar])
  const of = (s: string) => oMap.get(s)

  /* 2 */
  const [steg, setSteg] = useState<'start' | 'konto' | 'kod'>('start')
  const huvud = FORMANER[0]!
  /* 3 */
  const [typ, setTyp] = useState<Typ | 'Alla'>('Alla')
  const [omrade, setOmrade] = useState('Stockholms skärgård')
  const lista = FORMANER.filter(f => (typ === 'Alla' || f.typ === typ) && f.omrade === omrade)
  /* 4 */
  const [hamtadeDag, setHamtadeDag] = useState(false)
  /* 7 */
  const [lager, setLager] = useState(true)
  const [valdPunkt, setValdPunkt] = useState<string>('moja')
  /* 8, 12 */
  const harForman = new Set(FORMANER.map(f => f.o))
  const valdF = FORMANER.find(f => f.o === valdPunkt)

  const DAG = [
    { typ: 'Resa', namn: 'Båten ut till Möja', text: 'Waxholmsbåten från stan. Kolla tidtabellen innan du åker.', f: null as Forman | null },
    { typ: 'Mat', namn: 'Lunch vid gästhamnen', text: 'Sitt ute och se båtarna komma in.', f: FORMANER[0]! },
    { typ: 'Hantverk', namn: 'Besök hos målaren', text: 'Ateljé och verkstad en kort promenad från bryggan.', f: FORMANER[2]! },
    { typ: 'Bad', namn: 'Bad på klipporna', text: 'Ta med handduk, det finns inga omklädningsrum.', f: null },
    { typ: 'Resa', namn: 'Båten hem', text: 'Sista båten går tidigt utanför säsong.', f: null },
  ]
  const dagForman = DAG.filter(d => d.f).length

  return (
    <div className="fm">
      <style>{CSS}</style>
      <div className="fm-varning">Förhandsvisning. Alla förmåner, partners, koder och partnersiffror på sidan är exempel. Inga avtal finns än.</div>
      <nav className="fm-nav" aria-label="Delarna">{INDEX.map(([n, t]) => <a key={n} href={`#del-${n}`}><b>{n}</b>{t}</a>)}</nav>

      <header className="fm-topp">
        <p className="fm-etikett">Förmåner på Svalla</p>
        <h1>Så visar vi erbjudandena</h1>
        <p>Tretton ställen där en förmån syns, från kortet till rapporten partnern får efteråt. Samma förmån följer med hela vägen: i dagsplanen, på ösidan, på kartan och i Thorkels svar.</p>
        <div className="fm-tva">
          <span><span className="fm-et">Svalla-förmån</span> Gratis för partnern. Kräver ett gratis konto hos besökaren.</span>
          <span><span className="fm-et reklam">Reklam</span> Partnern betalar för platsen. Märks alltid så.</span>
        </div>
      </header>

      {/* 1 */}
      <Del nr="1" rubrik="Kortet, i tre storlekar" forebild="mecenat.com och tourismwhitsundays.com.au" lank="https://www.mecenat.com/se"
        varfor="Förmånen är rubriken, inte procenten. Villkor och datum står på en egen rad. En bricka för typ och en tydlig etikett för om det är reklam.">
        <div className="fm-yta">
          <div className="fm-liten">Stort, för bildytor och startsidan</div>
          <div className="fm-tre">{FORMANER.slice(0, 3).map(f => <KortStort key={f.id} f={f} o={of(f.o)} />)}</div>
          <div className="fm-liten">Kupong, för listor och ösidor</div>
          <div className="fm-tva-kol">{FORMANER.slice(3, 5).map(f => <KortKupong key={f.id} f={f} o={of(f.o)} />)}</div>
          <div className="fm-liten">Rad, för kartan, Thorkel och Min skärgård</div>
          <div className="fm-rader">{FORMANER.slice(0, 3).map(f => <KortRad key={f.id} f={f} o={of(f.o)} />)}</div>
        </div>
      </Del>

      {/* 2 */}
      <Del nr="2" rubrik="Förmånssidan och Hämta förmånen" forebild="mecenat.com" lank="https://www.mecenat.com/se"
        varfor="En sida per förmån. Tiden kvar står direkt under knappen, villkoren bakom ett litet i. Prova knappen: konto, sedan kod som sparas och syns utan täckning.">
        <div className="fm-yta">
          <div className="fm-sida">
            <div className="fm-sida-bild" style={bakgrund(of(huvud.o)?.bild ?? null, '.25')}><Foto b={of(huvud.o)?.bild ?? null} /></div>
            <div className="fm-sida-text">
              <div className="fm-brickor"><span className="fm-typ">{huvud.typ}</span><Etikett f={huvud} /></div>
              <h2>{huvud.rubrik}</h2>
              <p className="fm-partner">{huvud.partner} · {of(huvud.o)?.namn}</p>
              {steg === 'start' && <button type="button" className="fm-knapp" onClick={() => setSteg('konto')}>Hämta förmånen</button>}
              {steg === 'konto' && (
                <div className="fm-konto">
                  <b>Förmåner kräver ett gratis konto</b>
                  <span>Bara din mejladress. Förmånen sparas i Min skärgård.</span>
                  <button type="button" className="fm-knapp" onClick={() => setSteg('kod')}>Skapa konto och hämta</button>
                  <button type="button" className="fm-lank-knapp" onClick={() => setSteg('kod')}>Jag har redan konto</button>
                </div>
              )}
              {steg === 'kod' && (
                <div className="fm-koden">
                  <small>Visa koden i kassan</small>
                  <b>{huvud.kod}</b>
                  <span>Sparad i Min skärgård. Fungerar utan täckning.</span>
                  <button type="button" className="fm-lank-knapp" onClick={() => setSteg('start')}>Börja om</button>
                </div>
              )}
              <p className="fm-tid">Slutar om {huvud.dagarKvar} dagar · gäller till {huvud.till}</p>
              <details className="fm-villkor-d"><summary>ⓘ Villkor</summary><p>{huvud.villkor}. Gäller hos {huvud.partner.toLowerCase()} på {of(huvud.o)?.namn}. Kan inte kombineras med andra erbjudanden. Partnern ansvarar för förmånen.</p></details>
              <div className="fm-mer"><span>Mer från samma ö</span><KortRad f={FORMANER[2]!} o={of('moja')} /></div>
            </div>
          </div>
        </div>
      </Del>

      {/* 3 */}
      <Del nr="3" rubrik="Alla förmåner, sorterade på typ och område" forebild="tourismwhitsundays.com.au/deals och STF:s medlemsförmåner" lank="https://www.tourismwhitsundays.com.au/deals"
        varfor="Flikar för typ och samma områdesval som på krog- och boendesidorna. Antalet står öppet, och ett tomt område säger det rakt ut. Prova Gotland.">
        <div className="fm-yta">
          <div className="fm-flikar">
            {(['Alla', ...TYPER] as const).map(t => <button key={t} type="button" className={typ === t ? 'pa' : undefined} onClick={() => setTyp(t)}>{t}</button>)}
          </div>
          <div className="fm-chips">
            {OMRADEN.map(o => <button key={o} type="button" className={omrade === o ? 'pa' : undefined} onClick={() => setOmrade(o)}>{o}</button>)}
          </div>
          <p className="fm-antal">Visar {lista.length} av {FORMANER.filter(f => f.omrade === omrade).length} förmåner i {omrade}</p>
          {lista.length ? (
            <div className="fm-tre">{lista.map(f => <KortStort key={f.id} f={f} o={of(f.o)} />)}</div>
          ) : (
            <div className="fm-tomt"><b>Inga förmåner här just nu.</b><span>Vi lägger till nya hela tiden. Se förmånerna i Stockholms skärgård så länge.</span><button type="button" className="fm-lank-knapp" onClick={() => { setOmrade('Stockholms skärgård'); setTyp('Alla') }}>Visa Stockholms skärgård →</button></div>
          )}
        </div>
      </Del>

      {/* 4 */}
      <Del nr="4" rubrik="Dagsplanen med förmåner" forebild="gocity.com (exempeldagar)" lank="https://gocity.com/en/stockholm"
        varfor="Go City visar värdet för en hel dag, inte per kupong. Här ser man vilka stopp som har en förmån och hämtar alla med ett tryck. Svalla räknar förmåner, inte kronor.">
        <div className="fm-yta">
          <div className="fm-dag">
            <div className="fm-dag-topp" style={bakgrund(of('moja')?.bild ?? null, '.8')}>
              <small>Dagsplan</small><h2>Möja på en dag</h2>
              <div className="fm-dag-sum"><b>{dagForman} förmåner</b> längs den här dagen</div>
              <button type="button" className="fm-knapp ljus" onClick={() => setHamtadeDag(true)}>{hamtadeDag ? 'Hämtade och sparade ✓' : `Hämta alla ${dagForman}`}</button>
              <Foto b={of('moja')?.bild ?? null} />
            </div>
            <ol className="fm-dag-lista">
              {DAG.map((d, i) => (
                <li key={d.namn} className={d.f ? 'med' : undefined}>
                  <span className="fm-dag-nr">{i + 1}</span>
                  <div><small>{d.typ}</small><b>{d.namn}</b><p>{d.text}</p>
                    {d.f && <div className="fm-dag-f"><span>✦ {d.f.rubrik}</span><Etikett f={d.f} />{hamtadeDag && <em>Sparad</em>}</div>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Del>

      {/* 5 */}
      <Del nr="5" rubrik="Ösidan: Förmåner på ön" forebild="visitsanjuans.com/specials" lank="https://www.visitsanjuans.com/specials"
        varfor="Varje förmån har namn, partner och datum. På ösidan blir det en egen del, direkt efter Ta dig hit, där folk redan planerar.">
        <div className="fm-yta">
          <div className="fm-osida">
            <div className="fm-osida-topp" style={bakgrund(of('moja')?.bild ?? null, '.7')}><h2>Möja</h2><span>Byar, kyrka och lanthandel i mellersta skärgården</span><Foto b={of('moja')?.bild ?? null} /></div>
            <div className="fm-osida-flikar"><span>Översikt</span><span>Ta dig hit</span><span className="pa">Förmåner · 2</span><span>Krogar</span><span>Boende</span></div>
            <div className="fm-osida-inne">
              <div className="fm-liten">Förmåner på Möja</div>
              <div className="fm-tva-kol">{FORMANER.filter(f => f.o === 'moja').map(f => <KortKupong key={f.id} f={f} o={of(f.o)} />)}</div>
            </div>
          </div>
        </div>
      </Del>

      {/* 6 */}
      <Del nr="6" rubrik="Partnerns egen sida" forebild="estepona.travel (upplevelser med leverantör)" lank="https://estepona.travel/"
        varfor="Förmånen ligger överst på krogens, boendets eller hamnens sida. En liten rad visar att de är samarbetspartner, och sedan hur länge.">
        <div className="fm-yta">
          <div className="fm-plats">
            <div className="fm-plats-huvud">
              <div><small>Krog · {of('moja')?.namn}</small><h2>{huvud.partner}</h2><span className="fm-samarbete">Samarbetspartner sedan 2027</span></div>
              <button type="button" className="fm-lank-knapp">Spara</button>
            </div>
            <KortRad f={huvud} o={of('moja')} />
            <div className="fm-plats-info">
              <div><small>Öppet</small><b>Enligt partnerns egna uppgifter</b></div>
              <div><small>Hitta hit</small><b>Kort promenad från bryggan</b></div>
              <div><small>Boka</small><b>Länk till partnerns bokning</b></div>
            </div>
          </div>
        </div>
      </Del>

      {/* 7 */}
      <Del nr="7" rubrik="Kartan med ett förmånslager" forebild="Swan Valley, What's Open (roamhq.io)" lank="https://www.roamhq.io/our-work/case-studies/swan-valley"
        varfor="Ett lager man slår på och av. Platser med förmån får en egen markering. Prickarna ligger på öarnas riktiga koordinater, förmånerna är exempel.">
        <div className="fm-yta">
          <div className="fm-karta">
            <div className="fm-karta-yta">
              <button type="button" className={lager ? 'fm-lager pa' : 'fm-lager'} onClick={() => setLager(!lager)}>✦ Förmåner {lager ? 'på' : 'av'}</button>
              {punkter.map(p => {
                const med = lager && harForman.has(p.slug)
                return <button key={p.slug} type="button" className={`fm-pin${med ? ' med' : ''}${valdPunkt === p.slug ? ' vald' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }} onClick={() => setValdPunkt(p.slug)} aria-label={p.namn}><span>{p.namn}</span></button>
              })}
            </div>
            <div className="fm-karta-panel">
              <small>{of(valdPunkt)?.namn ?? punkter.find(p => p.slug === valdPunkt)?.namn}</small>
              {lager && valdF ? <KortRad f={valdF} o={of(valdF.o)} /> : <p>Ingen förmån här än.</p>}
            </div>
          </div>
        </div>
      </Del>

      {/* 8 */}
      <Del nr="8" rubrik="Thorkel nämner förmånen" forebild="newzealand.com (Ask our AI)" lank="https://www.newzealand.com/int/"
        varfor="När Thorkel föreslår en ö kan han lägga till förmånen där. Betald plats märks som reklam även i chatten.">
        <div className="fm-yta">
          <div className="fm-chatt">
            <div className="fm-bubbla mig">Var ska vi äta lunch på Möja på lördag?</div>
            <div className="fm-thorkel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/thorkel-avatar.svg" alt="" />
              <div className="fm-bubbla han">
                <p>Gå upp från bryggan till krogen vid gästhamnen, där sitter man ute och ser båtarna komma in. Har du ett Svalla-konto får du kaffet på köpet.</p>
                <KortRad f={huvud} o={of('moja')} />
              </div>
            </div>
          </div>
        </div>
      </Del>

      {/* 9 */}
      <Del nr="9" rubrik="Just nu i skärgården" forebild="tourismwhitsundays.com.au (Midweek special, Early bird)" lank="https://www.tourismwhitsundays.com.au/deals"
        varfor="Förmåner som börjar eller snart slutar visas i Just nu-raden på startsidan, bredvid skärgårdens datum. Lågsäsong och vardagar lyfts särskilt.">
        <div className="fm-yta">
          <div className="fm-nu">
            <div className="fm-nu-v"><div className="fm-liten">Just nu i skärgården</div><b>Förmåner som snart slutar</b></div>
            {[...FORMANER].sort((a, b) => a.dagarKvar - b.dagarKvar).slice(0, 3).map(f => (
              <div key={f.id} className="fm-nu-rad"><span className="fm-nu-bricka"><b>{f.dagarKvar}</b>dagar</span><span><small>Slutar snart</small>{f.rubrik}<em>{f.partner} · {of(f.o)?.namn}</em></span></div>
            ))}
          </div>
        </div>
      </Del>

      {/* 10 */}
      <Del nr="10" rubrik="Min skärgård: förmåner och stämplar" forebild="STF:s medlemsförmåner" lank="https://www.svenskaturistforeningen.se/medlem/medlemsformaner/"
        varfor="STF kallar det förmåner, som tack för att man är med. Hämtade förmåner samlas bredvid öarna man besökt, så kontot har ett innehåll även för den som inte loggar turer.">
        <div className="fm-yta">
          <div className="fm-min">
            <div>
              <div className="fm-liten">Mina förmåner</div>
              <div className="fm-min-lista">
                {FORMANER.slice(0, 3).map((f, i) => (
                  <div key={f.id} className="fm-min-rad"><span><b>{f.rubrik}</b><small>{f.partner} · {of(f.o)?.namn}</small></span><em className={i === 1 ? 'anv' : i === 0 ? 'snart' : undefined}>{i === 0 ? `Går ut om ${f.dagarKvar} dagar` : i === 1 ? 'Använd' : 'Sparad'}</em></div>
                ))}
              </div>
            </div>
            <div>
              <div className="fm-liten">Mina öar</div>
              <div className="fm-stamplar">
                {oar.slice(0, 6).map((o, i) => <span key={o.slug} className={i % 3 === 2 ? 'fm-st tom' : 'fm-st'} style={{ transform: `rotate(${[-7, 5, -3, 8, -5, 4][i]}deg)` }}><small>Svalla</small><b>{o.namn}</b><small>{i % 3 === 2 ? 'Inte än' : 'Besökt'}</small></span>)}
              </div>
            </div>
          </div>
        </div>
      </Del>

      {/* 11 */}
      <Del nr="11" rubrik="Skylten hos partnern" forebild="Sea Louth (passet på plats) och copenhagencard.com (alltid digitalt)" lank="https://www.zoma.ie/work/sea-louth"
        varfor="En liten skylt vid kassan eller på bryggan. QR-koden leder till förmånen, och besöken räknas med kampanjlänkarna som redan finns på Svalla.">
        <div className="fm-yta fm-skylt-yta">
          <div className="fm-a5">
            <div className="fm-a5-logo"><SvallaLogo height={22} color="#0d2440" /></div>
            <small>Svalla-förmån här</small>
            <h2>{huvud.rubrik}</h2>
            <FalskQR fro={7} />
            <p>Skanna, hämta förmånen och visa koden i kassan.</p>
            <span className="fm-a5-not">QR-koden är ett exempel och leder ingenstans</span>
          </div>
          <div className="fm-tre-steg">
            {[['Skanna', 'Kameran öppnar förmånen på svalla.se.'], ['Hämta', 'Gratis konto, koden sparas i telefonen.'], ['Visa upp', 'Personalen ser koden. Klart.']].map(([r, t], i) => (
              <div key={r}><span>{i + 1}</span><b>{r}</b><p>{t}</p></div>
            ))}
          </div>
        </div>
      </Del>

      {/* 12 */}
      <Del nr="12" rubrik="Säljsidan mot partners" forebild="getyourguide.supply och theforkmanager.com" lank="https://getyourguide.supply/"
        varfor="Båda visar partnerns egen produkt direkt, sedan bevis, sedan hur man kommer igång. Siffrorna här är Svallas riktiga, räknade ur datan.">
        <div className="fm-salj">
          <div className="fm-salj-hero">
            <div className="fm-salj-text">
              <small>För krogar, boenden, hamnar och guider</small>
              <h2>Syns där gästerna planerar</h2>
              <p>Lägg upp en förmån på Svalla. Den syns på er ö, i dagsplanerna, på kartan och när Thorkel svarar.</p>
              <div className="fm-salj-knappar"><span className="fm-knapp acc">Lägg upp en förmån</span><span className="fm-knapp kontur">Se hur det ser ut</span></div>
            </div>
            <div className="fm-telefon">
              <div className="fm-tel-inne">
                <div className="fm-tel-bild" style={bakgrund(of('moja')?.bild ?? null, '.3')} />
                <small>Krog · Möja</small><b>Er krog här</b>
                <div className="fm-biljett"><span>✦</span><div><b>Er förmån här</b><small>Visas på ön, i dagsplanen och på kartan</small></div></div>
              </div>
            </div>
          </div>
          <div className="fm-salj-siffror">
            <div><b>{siffror.oar}</b><span>öar och orter med egen sida</span></div>
            <div><b>{siffror.krogar}</b><span>krogar och kaféer på ösidorna</span></div>
            <div><b>{siffror.boenden}</b><span>boenden</span></div>
            <div><b>{siffror.hamnar}</b><span>hamnar</span></div>
          </div>
          <div className="fm-salj-steg">
            {[['Berätta om förmånen', 'Vad gästen får, vilka dagar och hur länge.'], ['Vi lägger upp den', 'Vi granskar texten och visar den där den passar.'], ['Ni får en rapport', 'Visningar, hämtningar och klick, varje månad.']].map(([r, t], i) => (
              <div key={r}><span>{i + 1}</span><b>{r}</b><p>{t}</p></div>
            ))}
          </div>
          <div className="fm-salj-faq">
            {[['Vad kostar det?', 'Att lägga upp en förmån är gratis. Betald plats, märkt som reklam, kan läggas till senare.'], ['Vem bestämmer vad som står?', 'Ni bestämmer förmånen. Fakta om er granskas som allt annat på Svalla.'], ['Hur vet personalen att koden gäller?', 'Gästen visar koden i telefonen. Den står på förmånssidan och i ert välkomstmejl.']].map(([q, a]) => (
              <details key={q}><summary>{q}</summary><p>{a}</p></details>
            ))}
          </div>
        </div>
      </Del>

      {/* 13 */}
      <Del nr="13" rubrik="Rapporten till partnern" forebild="Svallas sponsorregler: lova en rapport, inte siffror i förväg" lank="https://svalla.se/partner"
        varfor="Det som går att mäta på riktigt: visningar, hämtade förmåner och klick vidare. Inlösta koder rapporterar partnern själv. Siffrorna nedan är exempel.">
        <div className="fm-yta">
          <div className="fm-rapport">
            <div className="fm-rapport-huvud"><div><small>Månadsrapport · exempel</small><h2>{huvud.partner}, oktober</h2></div><span className="fm-ex">Exempelsiffror</span></div>
            <div className="fm-rapport-tal">
              {[['Visningar av er sida', '1 240', 72], ['Såg förmånen', '860', 50], ['Hämtade förmånen', '94', 18], ['Klick till er bokning', '41', 9]].map(([e, v, w]) => (
                <div key={e as string}><span>{e}</span><b>{v}</b><i style={{ width: `${w}%` }} /></div>
              ))}
            </div>
            <div className="fm-rapport-fot">
              <div><small>Var den syntes mest</small><b>Ösidan, dagsplanen, kartan</b></div>
              <div><small>Inlösta koder</small><b>Rapporteras av er</b></div>
              <div><small>Om siffrorna</small><b>Bara besökare som sagt ja till statistik räknas</b></div>
            </div>
          </div>
        </div>
      </Del>

      <footer className="fm-slut">
        <p>Vill ni se analysen bakom? Den ligger i dokumentet Analys samarbeten och erbjudanden. <Link href="/ideer">Fler idéer för startsidan →</Link></p>
      </footer>
    </div>
  )
}

const CSS = `
.fm{background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;padding-bottom:64px}
.fm h1,.fm h2{font-family:'Playfair Display',Georgia,serif;font-weight:400}
.fm-varning{background:#fde9c8;color:#7a3a10;font-size:13px;font-weight:700;text-align:center;padding:10px 16px;border-bottom:1px dashed #b5591a}
.fm-nav{position:sticky;top:0;z-index:40;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:8px 12px;background:rgba(243,236,224,.95);backdrop-filter:blur(8px);border-bottom:1px solid rgba(150,110,60,.2)}
.fm-nav::-webkit-scrollbar{display:none}
.fm-nav a{flex-shrink:0;font-size:12.5px;font-weight:600;color:#0d2440;text-decoration:none;padding:6px 10px;border-radius:999px;background:#fffdf8;border:1px solid rgba(150,110,60,.2)}
.fm-nav a b{color:#b5591a;margin-right:5px}
.fm-topp{max-width:860px;margin:0 auto;padding:56px 24px 8px;text-align:center}
.fm-topp h1{font-size:clamp(32px,5vw,52px);margin:0 0 12px;color:#0d2440}
.fm-topp p{font-size:16px;line-height:1.6;color:#3d5865;margin:0}
.fm-etikett{font-size:12px!important;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a!important;margin:0 0 12px!important}
.fm-tva{display:flex;flex-direction:column;gap:8px;align-items:center;margin-top:20px;font-size:13.5px;color:#3d5865}
.fm-tva>span{display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center}
.fm-del{margin-top:52px;scroll-margin-top:56px}
.fm-skylt{max-width:1160px;margin:0 auto 16px;padding:0 24px;display:flex;gap:14px;align-items:flex-start}
.fm-nr{flex-shrink:0;width:40px;height:40px;border-radius:50%;background:#0d2440;color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;display:flex;align-items:center;justify-content:center}
.fm-rub{font-weight:700;font-size:15.5px;color:#0d2440}
.fm-fore{font-size:13.5px;line-height:1.55;color:#3d5865;max-width:820px}
.fm-fore a{color:#1e5c82}
.fm-yta{max-width:1160px;margin:0 auto;padding:0 24px}
.fm-liten{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a8501a;margin:18px 0 10px}
.fm-et{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:999px;background:#e3efe9;color:#1d5b45;border:1px solid #9fc8b4;white-space:nowrap}
.fm-et.reklam{background:#fff;color:#0d2440;border-color:#0d2440}
.fm-typ{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding:4px 9px;border-radius:999px;background:#b5591a;color:#fff}
.fm-foto{display:block;font-size:10px;font-style:normal;color:rgba(255,255,255,.75)}
.fm-knapp{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 24px;border-radius:999px;background:#b5591a;color:#fff;font:inherit;font-weight:700;font-size:15px;border:none;cursor:pointer;text-decoration:none}
.fm-knapp.ljus{background:#fffdf8;color:#0d2440}
.fm-knapp.acc{background:#b5591a}
.fm-knapp.kontur{background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,.6)}
.fm-lank-knapp{font:inherit;font-size:14px;font-weight:700;color:#1e5c82;background:none;border:none;cursor:pointer;padding:6px 0}

/* 1 */
.fm-tre{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.fm-stort{background:#fffdf8;border-radius:20px;overflow:hidden;box-shadow:0 8px 28px rgba(60,40,15,.09);display:flex;flex-direction:column}
.fm-stort-bild{aspect-ratio:16/10;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;display:flex;justify-content:space-between;align-items:flex-start;padding:12px}
.fm-stort-text{padding:16px 18px 18px;display:flex;flex-direction:column;gap:5px}
.fm-stort-text b{font-family:'Playfair Display',Georgia,serif;font-size:22px;line-height:1.2;color:#0d2440}
.fm-partner{font-size:14px;font-weight:600;color:#3d5865}
.fm-villkor{font-size:12.5px;font-weight:700;color:#a8501a}
.fm-tva-kol{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
.fm-kupong{display:grid;grid-template-columns:44% 1fr;background:#fffdf8;border-radius:18px;overflow:hidden;box-shadow:0 8px 24px rgba(60,40,15,.08);min-height:150px}
.fm-kv{background:#0d2440;color:#fff;padding:18px 16px;display:flex;flex-direction:column;justify-content:center;gap:6px;position:relative}
.fm-kv::after{content:'';position:absolute;right:-7px;top:0;bottom:0;width:14px;background:radial-gradient(circle,#fffdf8 5px,transparent 5.5px) 0 0/14px 16px}
.fm-kv small{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.fm-kv b{font-family:'Playfair Display',Georgia,serif;font-size:21px;line-height:1.15}
.fm-kh{padding:16px 16px 16px 24px;display:flex;flex-direction:column;gap:5px;align-items:flex-start;justify-content:center}
.fm-kh strong{font-size:15px;color:#0d2440}
.fm-kh span:not(.fm-et){font-size:13px;color:#52717f}
.fm-kh em{font-size:12px;font-style:normal;font-weight:700;color:#a8501a}
.fm-rader{display:grid;gap:8px;max-width:640px}
.fm-rad{display:flex;align-items:center;gap:12px;background:#fffdf8;border:1px solid rgba(150,110,60,.16);border-radius:14px;padding:10px 14px;min-width:0}
.fm-rad-ikon{flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#fde9c8;color:#b5591a;display:flex;align-items:center;justify-content:center;font-size:14px}
.fm-rad-text{flex:1;min-width:0;display:flex;flex-direction:column}
.fm-rad-text b{font-size:14.5px;color:#0d2440}
.fm-rad-text small{font-size:12px;color:#52717f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* 2 */
.fm-sida{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);background:#fffdf8;border-radius:24px;overflow:hidden;box-shadow:0 10px 34px rgba(60,40,15,.1)}
.fm-sida-bild{min-height:460px;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;display:flex;align-items:flex-end;padding:14px}
.fm-sida-text{padding:32px;display:flex;flex-direction:column;gap:12px}
.fm-brickor{display:flex;gap:8px;flex-wrap:wrap}
.fm-sida-text h2{font-size:clamp(28px,3.4vw,40px);line-height:1.1;margin:0;color:#0d2440}
.fm-sida-text .fm-partner{margin:0}
.fm-sida-text .fm-knapp{align-self:flex-start}
.fm-tid{margin:0;font-size:13px;font-weight:700;color:#a8501a}
.fm-konto,.fm-koden{display:flex;flex-direction:column;gap:6px;align-items:flex-start;background:#f3ece0;border-radius:16px;padding:16px}
.fm-konto span{font-size:13.5px;color:#3d5865;margin-bottom:6px}
.fm-koden small{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#a8501a}
.fm-koden b{font-family:ui-monospace,Menlo,monospace;font-size:24px;letter-spacing:.06em;color:#0d2440;background:#fff;border:2px dashed #0d2440;border-radius:10px;padding:8px 14px}
.fm-koden span{font-size:13px;color:#1d5b45;font-weight:600}
.fm-villkor-d summary{cursor:pointer;font-size:13.5px;font-weight:700;color:#1e5c82;list-style:none}
.fm-villkor-d summary::-webkit-details-marker{display:none}
.fm-villkor-d p{font-size:13.5px;line-height:1.6;color:#3d5865;margin:8px 0 0}
.fm-mer{margin-top:auto;padding-top:14px;border-top:1px solid rgba(150,110,60,.18);display:flex;flex-direction:column;gap:8px}
.fm-mer>span{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#52717f}

/* 3 */
.fm-flikar{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid rgba(13,36,64,.15);margin-bottom:12px}
.fm-flikar::-webkit-scrollbar{display:none}
.fm-flikar button{flex-shrink:0;font:inherit;font-size:14.5px;font-weight:600;color:#3d5865;background:none;border:none;border-bottom:2.5px solid transparent;padding:10px 14px;cursor:pointer}
.fm-flikar button.pa{color:#0d2440;border-bottom-color:#b5591a}
.fm-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.fm-chips button{font:inherit;font-size:13px;font-weight:600;padding:8px 14px;border-radius:999px;border:1px solid rgba(150,110,60,.25);background:#fffdf8;color:#192830;cursor:pointer}
.fm-chips button.pa{background:#0d2440;border-color:#0d2440;color:#fff}
.fm-antal{font-size:13px;color:#52717f;margin:0 0 14px}
.fm-tomt{background:#fffdf8;border:1px dashed rgba(150,110,60,.4);border-radius:20px;padding:32px;display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.fm-tomt b{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:400;color:#0d2440}
.fm-tomt span{font-size:14.5px;color:#3d5865}

/* 4 */
.fm-dag{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:28px;align-items:start}
.fm-dag-topp{position:sticky;top:64px;border-radius:24px;min-height:380px;background:#0d2440;background-size:cover;background-position:center;color:#fff;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;gap:10px}
.fm-dag-topp small{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.fm-dag-topp h2{font-size:clamp(28px,3.4vw,40px);margin:0}
.fm-dag-sum{font-size:15px}
.fm-dag-sum b{color:#f2a25c}
.fm-dag-topp .fm-knapp{align-self:flex-start}
.fm-dag-lista{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.fm-dag-lista li{display:flex;gap:14px;background:#fffdf8;border-radius:18px;padding:18px;border:1px solid rgba(150,110,60,.16)}
.fm-dag-lista li.med{border:1.5px solid #b5591a;box-shadow:0 8px 22px rgba(181,89,26,.12)}
.fm-dag-nr{flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#0d2440;color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:14px}
.fm-dag-lista small{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a8501a}
.fm-dag-lista b{display:block;font-family:'Playfair Display',Georgia,serif;font-size:19px;color:#0d2440;margin:2px 0 4px}
.fm-dag-lista p{margin:0;font-size:14px;line-height:1.55;color:#3d5865}
.fm-dag-f{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:10px;font-size:13.5px;font-weight:700;color:#b5591a}
.fm-dag-f em{font-style:normal;font-size:12px;color:#1d5b45}

/* 5 */
.fm-osida{background:#fffdf8;border-radius:24px;overflow:hidden;box-shadow:0 10px 30px rgba(60,40,15,.08)}
.fm-osida-topp{min-height:220px;background:#0d2440;background-size:cover;background-position:center;color:#fff;padding:26px;display:flex;flex-direction:column;justify-content:flex-end;gap:4px}
.fm-osida-topp h2{font-size:40px;margin:0}
.fm-osida-topp>span{font-size:14.5px;color:rgba(255,255,255,.9)}
.fm-osida-flikar{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:0 18px;border-bottom:1px solid rgba(13,36,64,.12)}
.fm-osida-flikar::-webkit-scrollbar{display:none}
.fm-osida-flikar span{flex-shrink:0;font-size:14px;font-weight:600;color:#52717f;padding:12px 10px;border-bottom:2.5px solid transparent}
.fm-osida-flikar span.pa{color:#0d2440;border-bottom-color:#b5591a}
.fm-osida-inne{padding:4px 22px 24px}

/* 6 */
.fm-plats{max-width:720px;background:#fffdf8;border-radius:22px;padding:24px;box-shadow:0 10px 30px rgba(60,40,15,.08);display:grid;gap:16px}
.fm-plats-huvud{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
.fm-plats-huvud small{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a8501a}
.fm-plats-huvud h2{font-size:30px;margin:4px 0;color:#0d2440}
.fm-samarbete{font-size:12.5px;font-weight:600;color:#52717f}
.fm-plats-info{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.fm-plats-info div{background:#f3ece0;border-radius:12px;padding:12px}
.fm-plats-info small{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#52717f}
.fm-plats-info b{font-size:13.5px;color:#0d2440}

/* 7 */
.fm-karta{display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:16px}
.fm-karta-yta{position:relative;min-height:440px;border-radius:22px;background:radial-gradient(ellipse at 30% 40%,#cfe3ea,#a8cbd8);overflow:hidden;border:1px solid rgba(13,36,64,.12)}
.fm-lager{position:absolute;left:14px;top:14px;z-index:3;font:inherit;font-size:13px;font-weight:700;padding:8px 14px;border-radius:999px;border:1px solid rgba(13,36,64,.2);background:#fff;color:#0d2440;cursor:pointer}
.fm-lager.pa{background:#b5591a;color:#fff;border-color:#b5591a}
.fm-pin{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#0d2440;border:2px solid #fff;padding:0;cursor:pointer}
.fm-pin span{position:absolute;left:16px;top:-6px;white-space:nowrap;font-size:11.5px;font-weight:700;color:#0d2440;opacity:0;pointer-events:none}
.fm-pin.med{width:26px;height:26px;margin:-13px 0 0 -13px;background:#b5591a;box-shadow:0 4px 12px rgba(181,89,26,.4)}
.fm-pin.med::after{content:'✦';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px}
.fm-pin.med span,.fm-pin.vald span{opacity:1}
.fm-pin.vald{outline:3px solid rgba(13,36,64,.35)}
.fm-karta-panel{background:#fffdf8;border-radius:22px;padding:20px;display:flex;flex-direction:column;gap:10px;align-self:start}
.fm-karta-panel small{font-family:'Playfair Display',Georgia,serif;font-size:24px;color:#0d2440}
.fm-karta-panel p{margin:0;font-size:14px;color:#52717f}

/* 8 */
.fm-chatt{max-width:640px;display:flex;flex-direction:column;gap:12px}
.fm-bubbla{border-radius:18px;padding:14px 16px;font-size:14.5px;line-height:1.55}
.fm-bubbla.mig{align-self:flex-end;background:#0d2440;color:#fff;border-radius:18px 18px 4px 18px;max-width:80%}
.fm-thorkel{display:flex;gap:10px;align-items:flex-end}
.fm-thorkel img{width:44px;height:44px;border-radius:50%;background:#fffdf8;flex-shrink:0}
.fm-bubbla.han{background:#fffdf8;border:1px solid rgba(150,110,60,.18);border-radius:18px 18px 18px 4px;display:grid;gap:10px;min-width:0}
.fm-bubbla.han p{margin:0}

/* 9 */
.fm-nu{display:grid;grid-template-columns:220px repeat(3,minmax(0,1fr));gap:12px;align-items:center;background:#fffdf8;border-radius:20px;padding:18px 22px;box-shadow:0 8px 30px rgba(60,40,15,.08)}
.fm-nu-v .fm-liten{margin:0 0 4px}
.fm-nu-v b{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:400;color:#0d2440}
.fm-nu-rad{display:flex;gap:12px;align-items:center;min-width:0}
.fm-nu-bricka{flex-shrink:0;width:54px;height:58px;border-radius:12px;background:#b5591a;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
.fm-nu-bricka b{font-family:'Playfair Display',Georgia,serif;font-size:22px;line-height:1}
.fm-nu-rad>span:last-child{font-size:13.5px;font-weight:600;line-height:1.35;min-width:0;display:flex;flex-direction:column}
.fm-nu-rad small{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a8501a}
.fm-nu-rad em{font-style:normal;font-size:12px;font-weight:500;color:#52717f}

/* 10 */
.fm-min{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:28px;background:#fffdf8;border-radius:24px;padding:28px}
.fm-min .fm-liten{margin-top:0}
.fm-min-lista{display:grid;gap:8px}
.fm-min-rad{display:flex;justify-content:space-between;align-items:center;gap:12px;border:1px solid rgba(150,110,60,.16);border-radius:14px;padding:12px 14px}
.fm-min-rad span{display:flex;flex-direction:column;min-width:0}
.fm-min-rad b{font-size:14.5px;color:#0d2440}
.fm-min-rad small{font-size:12px;color:#52717f}
.fm-min-rad em{flex-shrink:0;font-style:normal;font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:999px;background:#e3efe9;color:#1d5b45}
.fm-min-rad em.snart{background:#fde9c8;color:#7a3a10}
.fm-min-rad em.anv{background:#eceae5;color:#52717f}
.fm-stamplar{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.fm-st{aspect-ratio:1/1;border-radius:50%;border:2.5px double #b5591a;color:#b5591a;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6px}
.fm-st small{font-size:8.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase}
.fm-st b{font-family:'Playfair Display',Georgia,serif;font-size:14px;line-height:1.1}
.fm-st.tom{border-style:dashed;border-width:1.5px;color:#9aa9af}

/* 11 */
.fm-skylt-yta{display:grid;grid-template-columns:340px minmax(0,1fr);gap:32px;align-items:center}
.fm-a5{background:#fff;border-radius:6px;box-shadow:0 18px 44px rgba(13,36,64,.18);padding:28px 26px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;border-top:8px solid #0d2440}
.fm-a5-logo{margin-bottom:6px}
.fm-a5 small{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#b5591a}
.fm-a5 h2{font-size:28px;line-height:1.1;margin:0 0 8px;color:#0d2440}
.fm-a5 p{font-size:13.5px;color:#3d5865;margin:8px 0 0}
.fm-a5-not{font-size:10.5px;color:#9aa9af}
.fm-qr{display:grid;grid-template-columns:repeat(21,1fr);width:168px;height:168px;padding:8px;background:#fff;border:1px solid #e5e5e5}
.fm-qr i{display:block}
.fm-qr i.p{background:#0d2440}
.fm-tre-steg,.fm-salj-steg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.fm-tre-steg div,.fm-salj-steg div{background:#fffdf8;border-radius:18px;padding:20px;border:1px solid rgba(150,110,60,.16)}
.fm-tre-steg span,.fm-salj-steg span{font-family:'Playfair Display',Georgia,serif;font-size:34px;line-height:1;color:#b5591a}
.fm-tre-steg b,.fm-salj-steg b{display:block;font-size:16px;color:#0d2440;margin:8px 0 4px}
.fm-tre-steg p,.fm-salj-steg p{margin:0;font-size:14px;line-height:1.55;color:#3d5865}

/* 12 */
.fm-salj{max-width:1160px;margin:0 auto;padding:0 24px;display:grid;gap:16px}
.fm-salj-hero{background:#0d2440;color:#fff;border-radius:28px;padding:44px 48px 0;display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:40px;align-items:end;overflow:hidden}
.fm-salj-text{padding-bottom:44px}
.fm-salj-text small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.fm-salj-text h2{font-size:clamp(32px,4.6vw,54px);line-height:1.05;margin:10px 0 14px}
.fm-salj-text p{font-size:16px;line-height:1.6;color:rgba(255,255,255,.85);margin:0 0 22px;max-width:520px}
.fm-salj-knappar{display:flex;gap:10px;flex-wrap:wrap}
.fm-telefon{width:290px;height:400px;border-radius:36px 36px 0 0;border:10px solid #1c2c3a;border-bottom:none;background:#f3ece0;overflow:hidden}
.fm-tel-inne{padding:12px;display:flex;flex-direction:column;gap:6px;color:#192830}
.fm-tel-bild{height:120px;border-radius:14px;background:#1e5c82;background-size:cover;background-position:center}
.fm-tel-inne small{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a8501a;margin-top:6px}
.fm-tel-inne>b{font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#0d2440}
.fm-biljett{display:flex;gap:10px;align-items:center;background:#0d2440;color:#fff;border-radius:14px;padding:12px;margin-top:4px;position:relative}
.fm-biljett>span{width:30px;height:30px;border-radius:50%;background:#b5591a;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.fm-biljett b{display:block;font-size:14px}
.fm-biljett small{font-size:11px;color:rgba(255,255,255,.75);text-transform:none;letter-spacing:0;font-weight:500;margin:0}
.fm-salj-siffror{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.fm-salj-siffror div{background:#fffdf8;border-radius:18px;padding:18px;display:flex;flex-direction:column}
.fm-salj-siffror b{font-family:'Playfair Display',Georgia,serif;font-size:38px;line-height:1;color:#0d2440;font-variant-numeric:tabular-nums}
.fm-salj-siffror span{font-size:13px;color:#52717f;margin-top:6px}
.fm-salj-faq{display:grid;gap:8px}
.fm-salj-faq details{background:#fffdf8;border-radius:14px;border:1px solid rgba(150,110,60,.16)}
.fm-salj-faq summary{cursor:pointer;list-style:none;padding:14px 18px;font-weight:700;color:#0d2440}
.fm-salj-faq summary::-webkit-details-marker{display:none}
.fm-salj-faq p{margin:0;padding:0 18px 14px;font-size:14.5px;line-height:1.6;color:#3d5865}

/* 13 */
.fm-rapport{max-width:820px;background:#fffdf8;border-radius:24px;padding:28px;box-shadow:0 10px 30px rgba(60,40,15,.08);display:grid;gap:20px}
.fm-rapport-huvud{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap}
.fm-rapport-huvud small{font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#a8501a}
.fm-rapport-huvud h2{font-size:28px;margin:4px 0 0;color:#0d2440}
.fm-ex{font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#7a3a10;background:#fde9c8;border:1px dashed #b5591a;border-radius:999px;padding:6px 12px}
.fm-rapport-tal{display:grid;gap:12px}
.fm-rapport-tal div{display:grid;grid-template-columns:minmax(0,1fr) 80px;gap:4px 12px;align-items:baseline}
.fm-rapport-tal span{font-size:14px;color:#3d5865}
.fm-rapport-tal b{font-family:'Playfair Display',Georgia,serif;font-size:26px;color:#0d2440;text-align:right;font-variant-numeric:tabular-nums}
.fm-rapport-tal i{grid-column:1 / -1;height:6px;border-radius:3px;background:#b5591a;opacity:.8}
.fm-rapport-fot{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.fm-rapport-fot div{background:#f3ece0;border-radius:12px;padding:12px}
.fm-rapport-fot small{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#52717f}
.fm-rapport-fot b{font-size:13.5px;color:#0d2440}
.fm-slut{max-width:860px;margin:56px auto 0;padding:0 24px;text-align:center;font-size:14px;color:#52717f}
.fm-slut a{color:#1e5c82;font-weight:700}

@media (max-width:860px){
  .fm-del{margin-top:40px}
  .fm-skylt,.fm-yta,.fm-salj{padding:0 14px}
  .fm-tre{grid-template-columns:1fr}
  .fm-tva-kol{grid-template-columns:1fr}
  .fm-sida{grid-template-columns:1fr}
  .fm-sida-bild{min-height:220px}
  .fm-sida-text{padding:22px 18px}
  .fm-dag{grid-template-columns:1fr;gap:14px}
  .fm-dag-topp{position:static;min-height:300px;padding:22px}
  .fm-plats-info{grid-template-columns:1fr}
  .fm-karta{grid-template-columns:1fr}
  .fm-karta-yta{min-height:380px}
  .fm-nu{grid-template-columns:1fr;padding:16px}
  .fm-min{grid-template-columns:1fr;padding:20px}
  .fm-skylt-yta{grid-template-columns:1fr;justify-items:center}
  .fm-a5{max-width:320px;width:100%}
  .fm-tre-steg,.fm-salj-steg{grid-template-columns:1fr;width:100%}
  .fm-salj-hero{grid-template-columns:1fr;padding:28px 22px 0;gap:8px;border-radius:22px}
  .fm-salj-text{padding-bottom:16px}
  .fm-telefon{justify-self:center;width:260px;height:340px}
  .fm-salj-siffror{grid-template-columns:1fr 1fr}
  .fm-rapport{padding:20px}
  .fm-rapport-fot{grid-template-columns:1fr}
  .fm-kupong{grid-template-columns:46% 1fr}
  .fm-kv b{font-size:18px}
}
`
