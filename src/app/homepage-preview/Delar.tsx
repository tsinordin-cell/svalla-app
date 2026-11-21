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
@media (max-width:640px){
  .hpv-guide .sd-guide-yta{border-radius:22px}
  .hpv-krog .sd-krog{border-radius:22px}
  .sd-thorkel .hpv-konto{margin:0 0 10px}
}
`

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
