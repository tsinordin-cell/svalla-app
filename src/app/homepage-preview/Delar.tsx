'use client'
/**
 * FÖRHANDSVISNING: tre delar från src/components/StartDelar.tsx med de innehållsändringar Tom
 * godkänt (val A, 2026-11-21). Klasserna och stilen är startsidans egna (sd-*, från TreSatt).
 *
 * - FragaThorkel: kontokravet står före fältet, inte efter.
 * - GuideDel: "Din guide ute på vattnet" som egen del, med text som bara lovar det sidorna gör i dag
 *   (kontrollerat i koden 2026-11-21): /logga kräver konto, GPS live eller bild; /planera går att
 *   prova utan konto, inloggning för att spara och dela; /kom-igang ger ett gratis konto.
 * - KrogDel: krogägardelen, oförändrad text, som egen del.
 * - JustNu: utan sekunder i klockan; högst tre datum i mobilen (Toms beslut 2026-11-21).
 * - CSS: dessutom svepraden för "Vad vill du känna?" och regiondelen utan Sverigekarta och pilar i mobilen
 *   (stilen följer med GuideDel, JustNu och Thorkel).
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'

// Samma frågor som i StartDelar.
const FRAGOR = [
  'Vilken ö passar barnfamiljer bäst?',
  'Hur tar jag mig till Sandhamn utan egen båt?',
  'Var kan jag basta och bada i skärgården?',
]

// Guiden och krogdelen satt ihop i en ruta på startsidan. Isär behöver båda runda hörn runt om.
const CSS = `
.hpv-guide .sd-guide-yta{border-radius:28px}
.hpv-krog .sd-krog{border-radius:28px}
.hpv-guide-val{display:flex;flex-wrap:wrap;align-items:center;gap:10px 22px}
.hpv-prova{display:inline-flex;align-items:center;min-height:44px;font-size:15px;font-weight:700;color:#1e5c82;text-decoration:none}
.sd-thorkel .hpv-konto{margin:0 0 12px}
/* FÖRHANDSVISNING (Toms val 2026-11-21): "Vad vill du känna?" som svepbar rad i mobilen, alla åtta
   rutorna (startsidan visar ett rutnät med fyra). Kortet bredvid sticker ut i kanten så att man ser
   att raden går att svepa. */
@media (max-width:900px){
  .sd-kansla .sd-kansla-rutnat{grid-template-columns:none;grid-auto-flow:column;grid-auto-columns:min(64vw,248px);gap:12px;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;margin:0 -16px;padding:0 16px 4px;scroll-padding:0 16px;scrollbar-width:none}
  .sd-kansla .sd-kansla-rutnat::-webkit-scrollbar{display:none}
  .sd-kansla .sd-kansla-ruta{scroll-snap-align:start;aspect-ratio:4/5;border-radius:14px}
  .sd-kansla .sd-kansla-ruta:nth-child(n+5){display:flex}
  .sd-kansla .sd-kansla-ruta span{padding:16px}
  .sd-kansla .sd-kansla-ruta b{font-size:23px}
  .sd-kansla .sd-kansla-ruta small{font-size:12.5px}
}
/* FÖRHANDSVISNING (Toms beslut 2026-11-21): i mobilen visar "Just nu" högst tre datum, alla finns under Alla datum. */
@media (max-width:900px){
  .sd-nu .sd-nu-rad:nth-child(n+4){display:none}
}
/* FÖRHANDSVISNING (Toms beslut 2026-11-21): en karta i mobilen. Regiondelen behåller flikar, text och
   länkar men döljer Sverigekartan, och pilarna (som klämde texten) tas bort. Dator oförändrad. */
@media (max-width:820px){
  [id="resmål"] .rk-karta{display:none}
  [id="resmål"] .rk-pil{display:none}
  [id="resmål"] .rk-rad{display:block}
}
@media (max-width:640px){
  .hpv-guide .sd-guide-yta{border-radius:22px}
  .hpv-krog .sd-krog{border-radius:22px}
  .sd-thorkel .hpv-konto{margin:0 0 10px}
}
`

// Samma datum som i StartDelar (källa: /skargardsdatum). Ändras de där ska de ändras här också.
const DATUM: { iso: string; dag: string; man: string; vad: string; href: string }[] = [
  { iso: '2026-11-30', dag: '30', man: 'nov', vad: 'Sista dagen för fritidsfiske efter hummer', href: '/guider/hummerpremiar-bohuslan' },
  { iso: '2026-12-12', dag: '12', man: 'dec', vad: 'Sista dagen för höstens tidtabeller hos Waxholmsbolaget och Styrsöbolaget', href: '/vintertidtabeller' },
  { iso: '2027-03-01', dag: '1', man: 'mars', vad: 'Hundar får inte springa lösa i naturen, till 20 augusti', href: '/guider/hund-skargarden' },
  { iso: '2027-08-04', dag: '4', man: 'aug', vad: 'Kräftpremiär enligt traditionen, klockan 17', href: '/guider/kraftskiva-skargarden' },
  { iso: '2027-08-19', dag: '19', man: 'aug', vad: 'Surströmmingspremiär', href: '/guider/surstrommingspremiar' },
  { iso: '2027-09-27', dag: '27', man: 'sep', vad: 'Hummerpremiär, klockan 07.00', href: '/guider/hummerpremiar-bohuslan' },
]
const MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

/** Som JustNu i StartDelar, men klockan visar timmar och minuter (uppdateras var 30:e sekund). */
export function JustNu() {
  const [nu, setNu] = useState<Date | null>(null)
  useEffect(() => { setNu(new Date()); const t = setInterval(() => setNu(new Date()), 30000); return () => clearInterval(t) }, [])
  const klocka = nu ? nu.toLocaleTimeString('sv-SE', { timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit' }) : ''
  const idag = nu ? nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' }) : ''
  const manad = idag ? MANADER[Number(idag.slice(5, 7)) - 1] : ''
  const kommande = idag ? DATUM.filter(d => d.iso >= idag).slice(0, 4) : DATUM.slice(0, 4)
  const dagar = (iso: string) => Math.round((Date.parse(iso) - Date.parse(idag)) / 86400000)
  return (
    <section className="sd sd-nu" aria-label="Just nu i skärgården">
      <style>{CSS}</style>
      <div className="sd-inre">
        <div className="sd-nu-kort">
          <div className="sd-nu-klocka">
            <div className="sd-liten">Just nu i skärgården</div>
            <div className="sd-nu-tid">{klocka || ' '}</div>
            <Link href="/oppet-nu">{manad ? `Vad är öppet i ${manad}?` : 'Vad är öppet nu?'} →</Link>
          </div>
          <div className="sd-nu-lista">
            {kommande.map(d => {
              const n = idag ? dagar(d.iso) : null
              return (
                <Link key={d.iso} href={d.href} className="sd-nu-rad">
                  <span className="sd-nu-bricka"><b>{d.dag}</b>{d.man}</span>
                  <span className="sd-nu-text">{n !== null && <small>{n === 0 ? 'Idag' : n === 1 ? 'Imorgon' : `Om ${n} dagar`}</small>}{d.vad}</span>
                </Link>
              )
            })}
          </div>
          <Link href="/skargardsdatum" className="sd-nu-alla">Alla datum →</Link>
        </div>
      </div>
    </section>
  )
}

export function FragaThorkel() {
  return (
    <section className="sd sd-thorkel" id="thorkel" aria-label="Fråga Thorkel om skärgården">
      <style>{CSS}</style>
      <div className="sd-thorkel-inre">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/thorkel-avatar.svg" alt="Thorkel" className="sd-thorkel-bild" width={150} height={150} />
        <div className="sd-thorkel-text">
          <div className="sd-liten sd-ljus">Svallas AI-guide</div>
          <h2>Fråga Thorkel om skärgården</h2>
          {/* FÖRHANDSVISNING: kontokravet före fältet. Förut fick man veta det först efter att ha skrivit sin fråga. */}
          <p className="sd-thorkel-not hpv-konto">Gratis, men du behöver ett konto.</p>
          <form action="/guide" method="get" className="sd-thorkel-falt">
            <input name="fraga" type="text" placeholder="Fråga om öar, båtar, krogar och bad" aria-label="Fråga Thorkel" />
            <button type="submit" aria-label="Skicka frågan">→</button>
          </form>
          <div className="sd-thorkel-chips">
            {FRAGOR.map(f => <Link key={f} href={`/guide?fraga=${encodeURIComponent(f)}`}>{f}</Link>)}
          </div>
          <p className="sd-thorkel-not"><Link href="/utflykt">Planera utan konto →</Link></p>
        </div>
      </div>
    </section>
  )
}

export function GuideDel() {
  // Telefonen visar /upptack live. Den laddas bara på bred skärm, i mobilen är man redan i telefonen.
  const [bred, setBred] = useState(false)
  useEffect(() => { setBred(window.matchMedia('(min-width:901px)').matches) }, [])
  return (
    <section className="sd sd-guide hpv-guide" aria-label="Din guide ute på vattnet">
      <style>{CSS}</style>
      <div className="sd-guide-yta">
        <div className="sd-guide-text">
          <div className="sd-liten">För utforskaren</div>
          <h2 className="sd-h2">Din guide ute på vattnet</h2>
          <p>Med ett gratis konto får du en egen loggbok, en ruttplanerare och andras turer att följa.</p>
          <ul>
            <li><b>Logga dina turer</b>Spåra turen live med GPS, eller logga den efteråt med en bild.</li>
            <li><b>Planera rutten</b>Välj start, mål och vad du vill göra, så hittar Svalla krogar, bastur och bryggor längs vägen.</li>
            <li><b>Följ andra</b>Se var andra varit ute och hämta idéer till nästa tur.</li>
          </ul>
          <div className="hpv-guide-val">
            <Link href="/kom-igang" className="sd-knapp sd-knapp-acc">Skapa gratis konto →</Link>
            <Link href="/planera" className="hpv-prova">Prova ruttplaneraren utan konto →</Link>
          </div>
        </div>
        {bred && (
          <div className="sd-telefon" aria-hidden="true">
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
  )
}

export function KrogDel({ antalKrogar }: { antalKrogar: number }) {
  return (
    <section className="sd sd-guide hpv-krog" aria-label="För krogägaren">
      <style>{CSS}</style>
      <div className="sd-krog">
        <div>
          <div className="sd-liten sd-ljus">För krogägaren</div>
          <h2>Sätt er krog på kartan</h2>
          <p>Nå gäster som planerar att åka ut. Det kostar ingenting att finnas med. {antalKrogar} krogar och caféer finns redan på ösidorna.</p>
        </div>
        <Link href="/registrera-krog" className="sd-knapp sd-knapp-acc">Registrera er krog →</Link>
      </div>
    </section>
  )
}
