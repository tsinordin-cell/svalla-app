'use client'
/**
 * FÖRHANDSVISNING 2026-11-20 (Max): sju alternativ, ett per del av startsidan, efter en genomgång
 * av 15 destinationssajter i världsklass. Varje alternativ anger förebild och vilken data som bär det.
 * Inget här är live. Texter och länkar är Svallas egna; datum kommer från /skargardsdatum (källor där).
 */
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import SnabbSok from '@/components/SnabbSok'
import type { HeroVariant } from '@/components/HeroAnimation'

const HeroAnimation = dynamic(() => import('@/components/HeroAnimation'), { ssr: false, loading: () => null })

export type Tur = {
  href: string; titel: string; tid: string; transport: string; taggar: string[]; niva: string; utvald: boolean
  bild: { url: string; fotograf: string; licens: string; kalla: string } | null
}

/* ── A. Heron: ljus och månad ───────────────────────────────────────────── */
const LJUS: { v: HeroVariant; namn: string }[] = [
  { v: 1, namn: 'Sommardag' }, { v: 2, namn: 'Gyllene timmen' }, { v: 3, namn: 'Midnattssol' },
  { v: 5, namn: 'Dimma' }, { v: 4, namn: 'Storm' }, { v: 6, namn: 'Vinter' },
]
const VINTER = { href: '/guider/vinter-i-skargarden', text: 'Skärgården på vintern' }
const VAR = { href: '/guider/var-stockholms-skargard', text: 'Vår i skärgården' }
// Vilken scen som visas för en månad är ett formval. Länkarna går till guider som finns.
const MANADER: { kort: string; namn: string; v: HeroVariant; guide: { href: string; text: string } }[] = [
  { kort: 'Jan', namn: 'januari', v: 6, guide: VINTER },
  { kort: 'Feb', namn: 'februari', v: 6, guide: VINTER },
  { kort: 'Mar', namn: 'mars', v: 5, guide: VINTER },
  { kort: 'Apr', namn: 'april', v: 1, guide: VAR },
  { kort: 'Maj', namn: 'maj', v: 1, guide: VAR },
  { kort: 'Jun', namn: 'juni', v: 3, guide: { href: '/guider/juni-skargarden', text: 'Juni i skärgården' } },
  { kort: 'Jul', namn: 'juli', v: 1, guide: { href: '/guider/juli-skargarden-oar', text: 'Juli i skärgården' } },
  { kort: 'Aug', namn: 'augusti', v: 2, guide: { href: '/guider/sensommar-skargarden', text: 'Sensommar i skärgården' } },
  { kort: 'Sep', namn: 'september', v: 2, guide: { href: '/guider/september-skargarden', text: 'September i skärgården' } },
  { kort: 'Okt', namn: 'oktober', v: 5, guide: { href: '/guider/oktober-skargarden', text: 'Oktober i skärgården' } },
  { kort: 'Nov', namn: 'november', v: 4, guide: { href: '/guider/november-skargard', text: 'November i skärgården' } },
  { kort: 'Dec', namn: 'december', v: 6, guide: { href: '/guider/jul-skargarden', text: 'Jul i skärgården' } },
]

/* ── B. Just nu: datum ur /skargardsdatum (regel och källa står där) ───── */
const DATUM: { iso: string; dag: string; man: string; vad: string; href: string }[] = [
  { iso: '2026-11-30', dag: '30', man: 'nov', vad: 'Sista dagen för fritidsfiske efter hummer', href: '/guider/hummerpremiar-bohuslan' },
  { iso: '2026-12-12', dag: '12', man: 'dec', vad: 'Sista dagen för höstens tidtabeller hos Waxholmsbolaget och Styrsöbolaget', href: '/vintertidtabeller' },
  { iso: '2027-03-01', dag: '1', man: 'mars', vad: 'Hundar får inte springa lösa i naturen, till 20 augusti', href: '/guider/hund-skargarden' },
  { iso: '2027-08-04', dag: '4', man: 'aug', vad: 'Kräftpremiär enligt traditionen, klockan 17', href: '/guider/kraftskiva-skargarden' },
  { iso: '2027-08-19', dag: '19', man: 'aug', vad: 'Surströmmingspremiär', href: '/guider/surstrommingspremiar' },
  { iso: '2027-09-27', dag: '27', man: 'sep', vad: 'Hummerpremiär, klockan 07.00', href: '/guider/hummerpremiar-bohuslan' },
]

/* ── D. Thorkel: exempel på frågor ─────────────────────────────────────── */
const FRAGOR = ['Vilken ö passar barnfamiljer bäst?', 'Hur tar jag mig till Sandhamn utan egen båt?', 'Var kan jag basta och bada i skärgården?']

/* ── E. Vanliga frågor: samma frågor och svar som på startsidan idag ───── */
const FAQ: { q: string; a: string }[] = [
  { q: 'Vilken ö passar barnfamiljer bäst?', a: 'Grinda och Vaxholm är toppalternativen: sandstränder, lugnt vatten och bra restauranger. Fjäderholmarna är perfekt för de allra minsta, bara 25 minuter med båt från Strandvägen. Utö i söder har en lång sandstrand och cykelleder som passar hela familjen.' },
  { q: 'Hur lång tid tar båten till Sandhamn?', a: 'Cinderellabåten går från Strandvägen kajplats 14, inte Strömkajen, som är Waxholmsbolagets kaj, och tar 2 timmar 30 minuter till Sandhamn under säsongen 30 april till 27 september. Snabbast året runt: buss 433 eller 434 från Slussen till Stavsnäs vinterhamn (48 till 59 minuter) och sedan Sandhamnslinjen på 30 minuter. Totalt drygt 1 timme 20 minuter med bra anslutning.' },
  { q: 'Kan man tälta i skärgården?', a: 'Ja, allemansrätten ger rätt att tälta i naturen i upp till 1 till 2 nätter på samma plats. Håll minst 150 meter avstånd från närmaste bostad och lämna naturen som du fann den. Under torrperioder kan eldningsförbud gälla. Kontrollera alltid MSB:s webbplats innan.' },
  { q: 'Vad är det bästa alternativet till Sandhamn?', a: 'Grinda är det populäraste alternativet: kortare båttid (1,5 timmar), lika vacker och utan turisttrycket. Utö i söder är perfekt för de som vill ha mer natur och cykling. Möja är ett dolt alternativ för den som söker äkta skärgårdsstämning utan bryggrestauranger.' },
  { q: 'Vilken månad är bäst att besöka skärgården?', a: 'Juli är peak-säsong med varmast vatten (runt 20°C) men också mest folk. Juni och tidig augusti är lika vackra men lugnare. September till oktober rekommenderas för vandrare: höstfärger, inga köer och öppna krogar. Maj till juni har de längsta dagarna och det klaraste vattnet.' },
  { q: 'Hur mycket kostar en dagstur till Fjäderholmarna?', a: 'Två rederier kör: Strömma från Strandvägen och Fjäderholmslinjen från Skeppsbron i Gamla stan, se aktuellt biljettpris hos respektive. Överfarten är skärgårdens kortaste, runt 25 minuter. Vad dagen kostar styrs mest av restaurangvalet: medhavd matsäck gör den billig, lunch på krogen gör den till en riktig utflykt.' },
  { q: 'Måste man ha egen båt för att använda Svalla?', a: 'Absolut inte. Svalla är byggt för alla: oavsett om du reser med Waxholmsbåten, Cinderellabåten, pendeltåg + färja eller bil. Dagsplaneraren visar öar som nås med kollektivtrafik från din startpunkt, med restid och båttider för dagen. Ingen båt krävs, någonsin.' },
]

const stor = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function Alt({ bokstav, ersatter, forebild, lank, varfor, children }: {
  bokstav: string; ersatter: string; forebild: string; lank: string; varfor: string; children: React.ReactNode
}) {
  return (
    <section className="id-alt">
      <div className="id-skylt">
        <span className="id-bokstav">{bokstav}</span>
        <div>
          <div className="id-ers">Ersätter: {ersatter}</div>
          <div className="id-fore">Förebild: <a href={lank} target="_blank" rel="noopener noreferrer">{forebild}</a>. {varfor}</div>
        </div>
      </div>
      {children}
    </section>
  )
}

export default function IdeerClient({ turer, antalKrogar }: { turer: Tur[]; antalKrogar: number }) {
  /* A */
  const [ljus, setLjus] = useState<HeroVariant>(1)
  const [manad, setManad] = useState<number | null>(null)
  useEffect(() => { const m = new Date().getMonth(); setManad(m); setLjus(MANADER[m]!.v) }, [])
  const valdManad = manad === null ? null : MANADER[manad]!

  /* B + G: klocka i svensk tid */
  const [nu, setNu] = useState<Date | null>(null)
  useEffect(() => { setNu(new Date()); const t = setInterval(() => setNu(new Date()), 1000); return () => clearInterval(t) }, [])
  const klocka = nu ? nu.toLocaleTimeString('sv-SE', { timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''
  const idagIso = nu ? nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' }) : ''
  const manadNu = nu ? MANADER[Number(idagIso.slice(5, 7)) - 1]!.namn : ''
  const kommande = idagIso ? DATUM.filter(d => d.iso >= idagIso).slice(0, 4) : []
  const dagarTill = (iso: string) => Math.round((Date.parse(iso) - Date.parse(idagIso)) / 86400000)

  /* C */
  const [filter, setFilter] = useState('Alla')
  const rad = useRef<HTMLDivElement>(null)
  const CHIPS = ['Alla', 'Lätt', 'Medel', 'Krävande', 'Båt', 'Buss', 'Tåg', 'Bil', 'Cykel']
  const visade = turer.filter(t => filter === 'Alla' || t.niva === filter.toLowerCase() || t.taggar.includes(filter.toLowerCase()))
  const bladdra = (r: number) => rad.current?.scrollBy({ left: r * 320, behavior: 'smooth' })

  return (
    <div className="id">
      <style>{CSS}</style>
      <header className="id-topp">
        <p className="id-etikett">Förhandsvisning, inte live</p>
        <h1>Sju idéer för startsidan</h1>
        <p>Ett alternativ per del av startsidan. Allt innehåll är Svallas eget. Megamenyn, sökrutan, Thorkel i heron, kartorna och Se &amp; Göra är inte med här, de rörs inte.</p>
      </header>

      {/* ───────── A ───────── */}
      <Alt bokstav="A" ersatter="Heron, bara bakgrunden och rubriken" forebild="myswitzerland.com" lank="https://www.myswitzerland.com/"
        varfor="Deras hero har en månadsväljare längst ner som byter film. Svallas animerade vik har redan sex ljus, så samma grepp går att göra med det vi har.">
        <div className="a-hero">
          <HeroAnimation variant={ljus} />
          <div className="a-rubrik">
            <h2>Planera din <em>skärgårdsvistelse</em></h2>
            <p>Sökrutan, knapparna och Thorkel ligger kvar här, precis som idag.</p>
          </div>
          <div className="a-list">
            <div className="a-rad">
              {MANADER.map((m, i) => (
                <button key={m.kort} type="button" className={manad === i ? 'pa' : undefined} onClick={() => { setManad(i); setLjus(m.v) }}>{m.kort}</button>
              ))}
            </div>
            <div className="a-rad a-ljus">
              <span>Ljus</span>
              {LJUS.map(l => (
                <button key={l.v} type="button" className={ljus === l.v ? 'pa' : undefined} onClick={() => setLjus(l.v)}>{l.namn}</button>
              ))}
              {valdManad && <Link href={valdManad.guide.href} className="a-guide">{valdManad.guide.text} →</Link>}
            </div>
          </div>
        </div>
      </Alt>

      {/* ───────── B ───────── */}
      <Alt bokstav="B" ersatter="Förtroenderaden med siffrorna under heron" forebild="myswitzerland.com (Events) och visitfinland.com (sidfoten)" lank="https://www.myswitzerland.com/"
        varfor="Datumbrickor och en levande klocka gör att sidan känns uppdaterad just idag. Datumen finns redan på Skärgårdens datum, med regel och källa.">
        <div className="b-rad">
          <div className="b-nu">
            <div className="id-liten">Just nu i skärgården</div>
            <div className="b-klocka">{klocka || '00:00:00'}</div>
            {manadNu && <Link href="/oppet-nu">Vad är öppet i {manadNu}? →</Link>}
          </div>
          {kommande.map(d => {
            const n = dagarTill(d.iso)
            return (
              <Link key={d.iso} href={d.href} className="b-kort">
                <span className="b-bricka"><b>{d.dag}</b>{d.man}</span>
                <span className="b-text"><small>{n === 0 ? 'Idag' : n === 1 ? 'Imorgon' : `Om ${n} dagar`}</small>{d.vad}</span>
              </Link>
            )
          })}
          <Link href="/skargardsdatum" className="b-alla">Alla datum →</Link>
        </div>
      </Alt>

      {/* ───────── C ───────── */}
      <Alt bokstav="C" ersatter="Utvalda turer i skärgården" forebild="australia.com (Top places to go) och visitfinland.com (Curated routes)" lank="https://www.australia.com/en"
        varfor="Höga fotokort med titeln i bilden och chips ovanför. Här är alla 31 dagsplaner, filtrerade på dagsplanernas egna uppgifter om nivå och färdsätt.">
        <div className="c-yta">
          <div className="c-huvud">
            <div>
              <div className="id-liten">Dagsplaner</div>
              <h2 className="id-h2">Utvalda turer i skärgården</h2>
            </div>
            <div className="c-pilar">
              <button type="button" aria-label="Föregående" onClick={() => bladdra(-1)}>←</button>
              <button type="button" aria-label="Nästa" onClick={() => bladdra(1)}>→</button>
            </div>
          </div>
          <div className="c-chips">
            {CHIPS.map(c => <button key={c} type="button" className={filter === c ? 'pa' : undefined} onClick={() => { setFilter(c); rad.current?.scrollTo({ left: 0 }) }}>{c}</button>)}
            <span>{visade.length} dagsplaner</span>
          </div>
          <div className="c-radlista" ref={rad}>
            {visade.map(t => (
              <Link key={t.href} href={t.href} className="c-kort" style={t.bild ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,0) 35%, rgba(8,24,38,.86) 100%), url('${t.bild.url}')` } : undefined}>
                {t.utvald && <span className="c-val">Redaktionens val</span>}
                <span className="c-fot">
                  <b>{t.titel}</b>
                  <small>{t.tid} · {t.transport} · {stor(t.niva)}</small>
                  {t.bild && <i>Foto: {t.bild.fotograf}, {t.bild.licens}</i>}
                </span>
              </Link>
            ))}
          </div>
          <Link href="/resetips" className="id-lank">Alla dagsplaner →</Link>
        </div>
      </Alt>

      {/* ───────── D ───────── */}
      <Alt bokstav="D" ersatter="Thorkel planerar din perfekta skärgårdsdag" forebild="newzealand.com (Ask our AI)" lank="https://www.newzealand.com/int/"
        varfor="En tydlig ruta med ett fält och tre exempel på frågor. Kortare än dagens del, och besökaren förstår direkt vad Thorkel gör.">
        <div className="d-ruta">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/thorkel-avatar.svg" alt="Thorkel" className="d-thorkel" />
          <div className="d-inne">
            <div className="id-liten d-liten">Svallas AI-guide</div>
            <h2>Fråga Thorkel om skärgården</h2>
            <form action="/guide" method="get" className="d-falt">
              <input name="fraga" type="text" placeholder="Fråga vad som helst om öar, båtar, krogar och bad" aria-label="Fråga Thorkel" />
              <button type="submit" aria-label="Skicka frågan">→</button>
            </form>
            <div className="d-chips">
              {FRAGOR.map(f => <Link key={f} href={`/guide?fraga=${encodeURIComponent(f)}`}>{f}</Link>)}
            </div>
            <p className="d-not">Gratis, men kräver ett konto. <Link href="/utflykt">Planera utan konto →</Link></p>
          </div>
        </div>
      </Alt>

      {/* ───────── E ───────── */}
      <Alt bokstav="E" ersatter="Allt du undrar om skärgården" forebild="visitfinland.com (A few common questions) och discovertasmania.com.au" lank="https://www.visitfinland.com/en/"
        varfor="Frågorna i en smal spalt och en faktaruta bredvid. Samma sju frågor och svar som idag, så inget ändras för Google.">
        <div className="e-yta">
          <div className="e-vanster">
            <div className="id-liten">Vanliga frågor</div>
            <h2 className="id-h2">Allt du undrar om skärgården</h2>
            {FAQ.map(f => (
              <details key={f.q} className="e-fraga">
                <summary>{f.q}<span aria-hidden="true">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
            <Link href="/faq" className="id-lank">Alla vanliga frågor →</Link>
          </div>
          <aside className="e-fakta">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/thorkel-avatar.svg" alt="" />
            <div className="id-liten">Visste du?</div>
            <p>Hummerpremiären är alltid första måndagen efter 20 september. 2027 infaller den 27 september klockan 07.00.</p>
            <Link href="/skargardsdatum">Skärgårdens datum →</Link>
          </aside>
        </div>
      </Alt>

      {/* ───────── F ───────── */}
      <Alt bokstav="F" ersatter="Din guide ute på vattnet och Sätt er krog på kartan" forebild="alltrails.com (Record your activities) och discovertasmania.com.au (Travel with our app)" lank="https://www.alltrails.com/"
        varfor="En telefon som visar den riktiga tjänsten säger mer än tre punkter med ikoner. Telefonen här visar Svallas karta live, inte en bild.">
        <div className="f-yta">
          <div className="f-text">
            <div className="id-liten">För utforskaren</div>
            <h2 className="id-h2">Din guide ute på vattnet</h2>
            <p>Allt du behöver för att planera och logga dina turer, utan kostnad.</p>
            <ul>
              <li><b>Logga turen på 10 sek</b>Foto + plats. Klart. Din dagbok byggs automatiskt.</li>
              <li><b>Hitta krogar &amp; platser</b>Bastun, bryggor och krogar längs din rutt</li>
              <li><b>Community-feed</b>Se andras turer. Bli inspirerad. Ge igen.</li>
            </ul>
            <Link href="/kom-igang" className="id-knapp">Kom igång →</Link>
          </div>
          <div className="f-telefon" aria-hidden="true">
            <iframe src="/upptack" title="Svalla i mobilen" loading="lazy" tabIndex={-1} />
          </div>
        </div>
        <div className="f-krog">
          <div>
            <div className="id-liten f-ljus">För krogägaren</div>
            <h2>Sätt er krog på kartan</h2>
            <p>Nå gäster som planerar att åka ut. Det kostar ingenting att finnas med. {antalKrogar} krogar och caféer finns redan på ösidorna.</p>
          </div>
          <Link href="/registrera-krog" className="id-knapp f-knapp">Registrera er krog →</Link>
        </div>
      </Alt>

      {/* ───────── G ───────── */}
      <Alt bokstav="G" ersatter="Sidfoten" forebild="visitfinland.com (väder och klocka), myswitzerland.com (sök) och discovertasmania.com.au (kolumner)" lank="https://www.visitfinland.com/en/"
        varfor="Sidfoten blir en sista väg in i sajten: sök först, klockan i skärgården och samma länkar som idag i lugna kolumner.">
        <footer className="g-fot">
          <div className="g-topp">
            <div>
              <h2>Hitta rätt i skärgården</h2>
              <SnabbSok lage="karta" />
            </div>
            <div className="g-nu">
              <div className="id-liten g-ljus">Skärgården just nu</div>
              <div className="g-klocka">{klocka || '00:00:00'}</div>
              {manadNu && <Link href="/oppet-nu">Öppet i {manadNu} →</Link>}
            </div>
          </div>
          <div className="g-kol">
            <div><h3>Utforska</h3>
              <Link href="/upptack">Platser &amp; krogar</Link><Link href="/rutter">Rutter</Link><Link href="/feed">Community-feed</Link><Link href="/upplevelser">Guidade turer och upplevelser</Link><Link href="/erbjudanden">Erbjudanden</Link><Link href="/oar/avskild">Avskilda öar</Link><Link href="/skargardsdatum">Skärgårdens datum</Link><Link href="/topplista">Topplistor</Link>
            </div>
            <div><h3>Regioner</h3>
              <Link href="/stockholms-skargard">Stockholms skärgård</Link><Link href="/bohuslan">Bohuslän</Link><Link href="/goteborg-skargard">Göteborgs skärgård</Link><Link href="/gotland">Gotland</Link><Link href="/oland">Öland</Link><Link href="/aland">Åland</Link><Link href="/blekinge-skargard">Blekinges skärgård</Link><Link href="/vasterhav">Västerhavet</Link><Link href="/malaren">Mälaren</Link>
            </div>
            <div><h3>Konto</h3>
              <Link href="/logga-in">Logga in</Link><Link href="/logga-in">Skapa konto</Link><Link href="/profil">Min profil</Link><Link href="/spara">Sparade</Link><Link href="/logga">Logga tur</Link>
            </div>
            <div><h3>Om oss</h3>
              <Link href="/om">Om Svalla</Link><Link href="/faq">Vanliga frågor</Link><Link href="/blogg">Skärgårdsbloggen</Link><Link href="/partner">För partners</Link><Link href="/integritetspolicy">Integritetspolicy</Link>
            </div>
          </div>
          <div className="g-botten">© 2026 Svalla | Alla rättigheter förbehållna</div>
        </footer>
      </Alt>
    </div>
  )
}

const CSS = `
.id{background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;padding-bottom:80px}
.id h1,.id h2{font-family:'Playfair Display',Georgia,serif}
.id-topp{max-width:860px;margin:0 auto;padding:64px 24px 24px;text-align:center}
.id-topp h1{font-size:clamp(34px,5vw,54px);margin:0 0 12px;color:#0d2440}
.id-topp p{font-size:16px;line-height:1.6;color:#3d5865;margin:0}
.id-etikett{font-size:12px!important;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a!important;margin:0 0 12px!important}
.id-alt{margin:56px 0 0}
.id-skylt{max-width:1200px;margin:0 auto 16px;padding:0 24px;display:flex;gap:16px;align-items:flex-start}
.id-bokstav{flex-shrink:0;width:44px;height:44px;border-radius:50%;background:#0d2440;color:#fff;font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;display:flex;align-items:center;justify-content:center}
.id-ers{font-weight:700;font-size:15px;color:#0d2440}
.id-fore{font-size:13.5px;line-height:1.55;color:#3d5865;max-width:820px}
.id-fore a{color:#1e5c82}
.id-liten{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#a8501a;margin:0 0 8px}
.id-h2{font-size:clamp(26px,3.4vw,38px);line-height:1.1;margin:0 0 14px;color:#0d2440}
.id-lank{display:inline-block;margin-top:18px;font-size:14px;font-weight:700;color:#1e5c82;text-decoration:none;border-bottom:1px solid rgba(30,92,130,.35);padding-bottom:2px}
.id-knapp{display:inline-flex;align-items:center;height:48px;padding:0 24px;border-radius:999px;background:#1e5c82;color:#fff;font-weight:700;font-size:15px;text-decoration:none}

/* A */
.a-hero{position:relative;height:min(78vh,760px);min-height:520px;overflow:hidden;background:#3d94d4}
.a-rubrik{position:absolute;left:0;right:0;top:15%;text-align:center;padding:0 20px;pointer-events:none}
.a-rubrik h2{font-size:clamp(36px,6vw,72px);line-height:1.05;margin:0;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,.25)}
.a-rubrik em{display:block;color:#f2a25c}
.a-rubrik p{margin:14px 0 0;color:rgba(255,255,255,.9);font-size:15px}
.a-list{position:absolute;left:0;right:0;bottom:0;padding:16px 24px 20px;background:linear-gradient(180deg,rgba(6,20,36,0),rgba(6,20,36,.72));display:flex;flex-direction:column;gap:10px;align-items:center}
.a-rad{display:flex;gap:6px;flex-wrap:nowrap;overflow-x:auto;max-width:100%;scrollbar-width:none;align-items:center}
.a-rad::-webkit-scrollbar{display:none}
.a-rad button{flex-shrink:0;font:inherit;font-size:14px;font-weight:600;color:rgba(255,255,255,.82);background:none;border:none;border-bottom:2px solid transparent;padding:6px 10px;cursor:pointer}
.a-rad button.pa{color:#fff;border-bottom-color:#f2a25c}
.a-ljus span{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-right:4px;flex-shrink:0}
.a-ljus button{font-size:12.5px;border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:5px 12px}
.a-ljus button.pa{background:#fff;color:#0d2440;border-color:#fff}
.a-guide{flex-shrink:0;margin-left:10px;font-size:13px;font-weight:700;color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.6)}

/* B */
.b-rad{max-width:1200px;margin:0 auto;padding:18px 24px;display:flex;gap:12px;overflow-x:auto;scrollbar-width:none;align-items:stretch;background:#fffdf8;border-radius:20px;box-shadow:0 8px 30px rgba(60,40,15,.08)}
.b-rad::-webkit-scrollbar{display:none}
.b-nu{flex:0 0 190px;padding-right:16px;border-right:1px solid rgba(150,110,60,.2)}
.b-klocka{font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;color:#0d2440;font-variant-numeric:tabular-nums;line-height:1.1;margin-bottom:6px}
.b-nu a,.b-alla{font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none}
.b-kort{flex:0 0 250px;display:flex;gap:12px;align-items:center;text-decoration:none;color:#192830;padding:6px 8px;border-radius:14px}
.b-kort:hover{background:rgba(30,92,130,.06)}
.b-bricka{flex-shrink:0;width:58px;height:62px;border-radius:12px;background:#0d2440;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.b-bricka b{font-family:'Playfair Display',Georgia,serif;font-size:24px;line-height:1;letter-spacing:0}
.b-text{font-size:13.5px;line-height:1.4;font-weight:600}
.b-text small{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a8501a;margin-bottom:2px}
.b-alla{flex-shrink:0;align-self:center;padding:0 8px}

/* C */
.c-yta{max-width:1200px;margin:0 auto;padding:0 24px}
.c-huvud{display:flex;justify-content:space-between;align-items:flex-end;gap:16px}
.c-pilar{display:flex;gap:8px;margin-bottom:14px}
.c-pilar button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(150,110,60,.3);background:#fffdf8;font-size:19px;cursor:pointer;color:#0d2440}
.c-chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;align-items:center;margin:0 0 18px}
.c-chips::-webkit-scrollbar{display:none}
.c-chips button{flex-shrink:0;font:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;border:1px solid rgba(150,110,60,.25);background:#fffdf8;color:#192830;cursor:pointer}
.c-chips button.pa{background:#0d2440;border-color:#0d2440;color:#fff}
.c-chips span{flex-shrink:0;font-size:13px;color:#52717f;margin-left:6px}
.c-radlista{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:6px}
.c-radlista::-webkit-scrollbar{display:none}
.c-kort{position:relative;flex:0 0 clamp(240px,23vw,290px);aspect-ratio:3/4;border-radius:20px;overflow:hidden;scroll-snap-align:start;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;text-decoration:none;color:#fff;display:flex;align-items:flex-end;transition:transform .3s ease}
.c-kort:hover{transform:translateY(-4px)}
.c-val{position:absolute;top:14px;left:14px;font-size:10.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;background:#b5591a;padding:5px 10px;border-radius:999px}
.c-fot{padding:18px;display:flex;flex-direction:column;gap:6px}
.c-fot b{font-family:'Playfair Display',Georgia,serif;font-size:22px;line-height:1.15;font-weight:700}
.c-fot small{font-size:12.5px;font-weight:600;color:rgba(255,255,255,.9)}
.c-fot i{font-size:10px;font-style:normal;color:rgba(255,255,255,.65)}

/* D */
.d-ruta{max-width:980px;margin:0 auto;background:#0d2440;border-radius:28px;padding:40px;display:flex;gap:32px;align-items:center;color:#fff}
.d-thorkel{width:150px;height:150px;border-radius:50%;background:#f3ece0;flex-shrink:0;border:4px solid rgba(255,255,255,.2)}
.d-inne{flex:1;min-width:0}
.d-liten{color:#f2a25c}
.d-ruta h2{font-size:clamp(26px,3.4vw,38px);margin:0 0 18px;line-height:1.1}
.d-falt{display:flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:6px 6px 6px 22px;border:2px solid #f2a25c}
.d-falt input{flex:1;min-width:0;border:none!important;outline:none!important;background:transparent!important;box-shadow:none!important;font:inherit;font-size:16px;color:#192830;padding:10px 0}
.d-falt button{flex-shrink:0;width:46px;height:46px;border-radius:50%;border:none;background:#b5591a;color:#fff;font-size:20px;cursor:pointer}
.d-chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}
.d-chips a{font-size:13px;font-weight:600;color:#fff;text-decoration:none;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22)}
.d-chips a:hover{background:#fff;color:#0d2440}
.d-not{font-size:13px;color:rgba(255,255,255,.7);margin:16px 0 0}
.d-not a{color:#fff}

/* E */
.e-yta{max-width:1100px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:minmax(0,1fr) 320px;gap:48px;align-items:start}
.e-fraga{background:#fffdf8;border-radius:18px;margin:0 0 10px;border:1px solid rgba(150,110,60,.16)}
.e-fraga summary{list-style:none;cursor:pointer;padding:16px 20px;font-weight:700;font-size:15.5px;display:flex;justify-content:space-between;gap:16px;color:#0d2440}
.e-fraga summary::-webkit-details-marker{display:none}
.e-fraga summary span{font-size:20px;line-height:1;color:#b5591a;transition:transform .2s ease}
.e-fraga[open] summary span{transform:rotate(45deg)}
.e-fraga p{margin:0;padding:0 20px 18px;font-size:15px;line-height:1.65;color:#3d5865}
.e-fakta{background:#dfe9ea;border-radius:24px;padding:28px;position:sticky;top:90px}
.e-fakta img{width:84px;height:84px;border-radius:50%;background:#fffdf8;margin-bottom:16px}
.e-fakta p{font-family:'Playfair Display',Georgia,serif;font-size:20px;line-height:1.35;color:#0d2440;margin:0 0 14px}
.e-fakta a{font-size:13.5px;font-weight:700;color:#1e5c82;text-decoration:none}

/* F */
.f-yta{max-width:1100px;margin:0 auto;padding:48px 48px 0;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:56px;align-items:center;background:#dfe9ea;border-radius:28px 28px 0 0;overflow:hidden}
.f-text p{font-size:16px;line-height:1.6;color:#3d5865;margin:0 0 18px}
.f-text ul{list-style:none;margin:0 0 24px;padding:0;display:grid;gap:14px}
.f-text li{font-size:14.5px;line-height:1.5;color:#3d5865;padding-left:18px;border-left:3px solid #1e5c82}
.f-text li b{display:block;color:#0d2440;font-size:15.5px}
.f-text{padding-bottom:48px}
.f-telefon{width:300px;height:520px;border-radius:38px 38px 0 0;border:10px solid #14202a;border-bottom:none;background:#14202a;overflow:hidden;align-self:end;box-shadow:0 20px 50px rgba(13,36,64,.25)}
.f-telefon iframe{width:390px;height:728px;border:none;transform:scale(.718);transform-origin:0 0;pointer-events:none;background:#fff}
.f-krog{max-width:1100px;margin:0 auto;background:#0d2440;color:#fff;border-radius:0 0 28px 28px;padding:36px 48px;display:flex;gap:32px;align-items:center;justify-content:space-between}
.f-krog h2{font-size:clamp(24px,3vw,32px);margin:0 0 8px}
.f-krog p{margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,.82);max-width:600px}
.f-ljus{color:#f2a25c}
.f-knapp{background:#b5591a;flex-shrink:0}

/* G */
.g-fot{background:#0d2440;color:#fff;padding:56px 0 28px}
.g-topp{max-width:1200px;margin:0 auto;padding:0 24px 40px;display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:48px;align-items:end;border-bottom:1px solid rgba(255,255,255,.14)}
.g-topp h2{font-size:clamp(26px,3.4vw,38px);margin:0 0 18px}
.g-ljus{color:#f2a25c}
.g-klocka{font-family:'Playfair Display',Georgia,serif;font-size:40px;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1;margin-bottom:6px}
.g-nu a{font-size:13.5px;font-weight:700;color:#fff}
.g-kol{max-width:1200px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:32px}
.g-kol h3{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6);margin:0 0 14px}
.g-kol a{display:block;font-size:14.5px;color:#fff;text-decoration:none;padding:5px 0;opacity:.9}
.g-kol a:hover{opacity:1;text-decoration:underline}
.g-botten{max-width:1200px;margin:0 auto;padding:20px 24px 0;border-top:1px solid rgba(255,255,255,.14);font-size:13px;color:rgba(255,255,255,.6)}

@media (max-width:820px){
  .id-alt{margin-top:44px}
  .a-list{padding:12px 12px 16px;align-items:stretch}
  .a-guide{margin-left:6px}
  .b-rad{margin:0 12px;padding:14px}
  .b-nu{flex-basis:150px}
  .d-ruta{margin:0 12px;padding:26px 20px;flex-direction:column;align-items:flex-start;gap:16px}
  .d-thorkel{width:84px;height:84px}
  .e-yta{grid-template-columns:1fr;gap:20px}
  .e-fakta{position:static}
  .f-yta{margin:0 12px;padding:28px 22px 0;grid-template-columns:1fr;gap:24px}
  .f-text{padding-bottom:0}
  .f-telefon{justify-self:center}
  .f-krog{margin:0 12px;padding:26px 22px;flex-direction:column;align-items:flex-start}
  .g-topp{grid-template-columns:1fr;gap:28px}
  .g-kol{grid-template-columns:1fr 1fr}
}
`
