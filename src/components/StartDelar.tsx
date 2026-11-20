'use client'
/**
 * Startsidans nya delar (Max 2026-11-20, valda ur förhandsvisningen /ideer):
 * TreSatt direkt under heron, JustNu (kalendern) i stället för förtroenderaden,
 * VadVillDuKanna i stället för Utvalda turer, FragaThorkel i stället för den gamla
 * Thorkel-delen och GuidePaVattnet i stället för Din guide / Sätt er krog.
 * Varje del har egen bakgrund, så att den ser likadan ut i ljust och mörkt läge.
 */
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type StartBild = { url: string; fotograf: string; licens: string }
export type StartKansla = { href: string; kansla: string; rubrik: string; antal: number; bild: StartBild | null }

const SATT: { rubrik: string; text: string; lank: string; href: string }[] = [
  { rubrik: 'Med reguljär båt', text: 'Kliv på i stan och kliv av på ön. Här ser du linjerna och var du hittar tidtabellerna.', lank: 'Båtar och färjor', href: '/farjor' },
  { rubrik: 'Med buss och båt', text: 'Buss till en brygga längre ut och sista biten med båt. Välj ö så visar vi vägen.', lank: 'Ta dig till din ö', href: '/ta-dig-till' },
  { rubrik: 'Med egen båt', text: 'Gästhamnar, bryggor och naturhamnar samlade på ett ställe.', lank: 'Hamnar och bryggor', href: '/hamnar-och-bryggor' },
]

export function TreSatt() {
  return (
    <section className="sd sd-satt" aria-label="Tre sätt att ta sig ut">
      <style>{CSS}</style>
      <div className="sd-inre">
        <div className="sd-liten">Ta dig ut</div>
        <h2 className="sd-h2">Tre sätt att ta sig ut</h2>
        <div className="sd-satt-rad">
          {SATT.map((s, i) => (
            <Link key={s.href} href={s.href} className="sd-satt-spalt">
              <span className="sd-satt-nr">{i + 1}</span><b>{s.rubrik}</b><p>{s.text}</p><i>{s.lank} →</i>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Datum ur /skargardsdatum (regel och källa står där). Passerade datum visas inte. */
const DATUM: { iso: string; dag: string; man: string; vad: string; href: string }[] = [
  { iso: '2026-11-30', dag: '30', man: 'nov', vad: 'Sista dagen för fritidsfiske efter hummer', href: '/guider/hummerpremiar-bohuslan' },
  { iso: '2026-12-12', dag: '12', man: 'dec', vad: 'Sista dagen för höstens tidtabeller hos Waxholmsbolaget och Styrsöbolaget', href: '/vintertidtabeller' },
  { iso: '2027-03-01', dag: '1', man: 'mars', vad: 'Hundar får inte springa lösa i naturen, till 20 augusti', href: '/guider/hund-skargarden' },
  { iso: '2027-08-04', dag: '4', man: 'aug', vad: 'Kräftpremiär enligt traditionen, klockan 17', href: '/guider/kraftskiva-skargarden' },
  { iso: '2027-08-19', dag: '19', man: 'aug', vad: 'Surströmmingspremiär', href: '/guider/surstrommingspremiar' },
  { iso: '2027-09-27', dag: '27', man: 'sep', vad: 'Hummerpremiär, klockan 07.00', href: '/guider/hummerpremiar-bohuslan' },
]
const MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

export function JustNu() {
  const [nu, setNu] = useState<Date | null>(null)
  useEffect(() => { setNu(new Date()); const t = setInterval(() => setNu(new Date()), 1000); return () => clearInterval(t) }, [])
  const klocka = nu ? nu.toLocaleTimeString('sv-SE', { timeZone: 'Europe/Stockholm', hour: '2-digit', minute: '2-digit', second: '2-digit' }) : ''
  const idag = nu ? nu.toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' }) : ''
  const manad = idag ? MANADER[Number(idag.slice(5, 7)) - 1] : ''
  const kommande = idag ? DATUM.filter(d => d.iso >= idag).slice(0, 4) : DATUM.slice(0, 4)
  const dagar = (iso: string) => Math.round((Date.parse(iso) - Date.parse(idag)) / 86400000)
  return (
    <section className="sd sd-nu" aria-label="Just nu i skärgården">
      <div className="sd-inre">
        <div className="sd-nu-kort">
          <div className="sd-nu-klocka">
            <div className="sd-liten">Just nu i skärgården</div>
            <div className="sd-nu-tid">{klocka || ' '}</div>
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

const TURER: [string, string][] = [
  ['/resetips/djuro-grinda-dagstur', 'Djurö till Grinda'],
  ['/resetips/sandhamn-ytterskargard', 'Sandhamn med Cinderellabåten'],
  ['/resetips/uto-cykeldag', 'Utö på cykel'],
  ['/resetips/marstrand-fastning-och-klippor', 'Marstrand: fästning och klippbad'],
  ['/resetips', 'Alla dagsplaner'],
]
const GUIDER: [string, string][] = [
  ['/blogg/kajak-stockholms-skargard-nyborjare', 'Kajak och paddling'],
  ['/blogg/segling-nyborjare-guide', 'Segling och båtliv'],
  ['/blogg/basta-badplatserna', 'Bad och klippor'],
  ['/blogg/vandring-orno-uto', 'Vandring och natur'],
  ['/blogg/fiske-skargard-guide', 'Fiske'],
  ['/blogg/cykling-moja-gallno', 'Cykling'],
]

export function VadVillDuKanna({ kanslor }: { kanslor: StartKansla[] }) {
  return (
    <section className="sd sd-kansla" id="resetips" aria-label="Vad vill du känna?">
      <div className="sd-inre">
        <div className="sd-liten">Hitta din ö</div>
        <h2 className="sd-h2">Vad vill du känna?</h2>
        <div className="sd-kansla-rutnat">
          {kanslor.map(k => (
            <Link key={k.href} href={k.href} className="sd-kansla-ruta" style={k.bild ? { backgroundImage: `url('${k.bild.url}')` } : undefined}>
              <span><b>{k.kansla}</b><small>{k.rubrik} · {k.antal} öar</small>{k.bild && <i>Foto: {k.bild.fotograf}, {k.bild.licens}</i>}</span>
            </Link>
          ))}
        </div>
        <div className="sd-mer">
          <p><b>Dagsplaner</b>{TURER.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</p>
          <p><b>Guider</b>{GUIDER.map(([h, t]) => <Link key={h} href={h}>{t}</Link>)}</p>
        </div>
      </div>
    </section>
  )
}

const FRAGOR = ['Vilken ö passar barnfamiljer bäst?', 'Hur tar jag mig till Sandhamn utan egen båt?', 'Var kan jag basta och bada i skärgården?']

export function FragaThorkel() {
  return (
    <section className="sd sd-thorkel" id="thorkel" aria-label="Fråga Thorkel om skärgården">
      <div className="sd-thorkel-inre">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/thorkel-avatar.svg" alt="Thorkel" className="sd-thorkel-bild" width={150} height={150} />
        <div className="sd-thorkel-text">
          <div className="sd-liten sd-ljus">Svallas AI-guide</div>
          <h2>Fråga Thorkel om skärgården</h2>
          <form action="/guide" method="get" className="sd-thorkel-falt">
            <input name="fraga" type="text" placeholder="Fråga om öar, båtar, krogar och bad" aria-label="Fråga Thorkel" />
            <button type="submit" aria-label="Skicka frågan">→</button>
          </form>
          <div className="sd-thorkel-chips">
            {FRAGOR.map(f => <Link key={f} href={`/guide?fraga=${encodeURIComponent(f)}`}>{f}</Link>)}
          </div>
          <p className="sd-thorkel-not">Gratis, men kräver ett konto. <Link href="/utflykt">Planera utan konto →</Link></p>
        </div>
      </div>
    </section>
  )
}

export function GuidePaVattnet({ antalKrogar }: { antalKrogar: number }) {
  // Telefonen visar /upptack live. Den laddas bara på bred skärm, i mobilen är man redan i telefonen.
  const [bred, setBred] = useState(false)
  useEffect(() => { setBred(window.matchMedia('(min-width:901px)').matches) }, [])
  return (
    <section className="sd sd-guide" aria-label="Din guide ute på vattnet">
      <div className="sd-guide-yta">
        <div className="sd-guide-text">
          <div className="sd-liten">För utforskaren</div>
          <h2 className="sd-h2">Din guide ute på vattnet</h2>
          <p>Allt du behöver för att planera och logga dina turer, utan kostnad.</p>
          <ul>
            <li><b>Logga turen på 10 sek</b>Foto + plats. Klart. Din dagbok byggs automatiskt.</li>
            <li><b>Hitta krogar &amp; platser</b>Bastun, bryggor och krogar längs din rutt</li>
            <li><b>Community-feed</b>Se andras turer. Bli inspirerad. Ge igen.</li>
          </ul>
          <Link href="/kom-igang" className="sd-knapp">Kom igång →</Link>
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

const CSS = `
.sd{position:relative;z-index:1;background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;padding:56px 0}
.sd h2{font-family:'Playfair Display',Georgia,serif}
.sd-inre{max-width:1200px;margin:0 auto;padding:0 24px}
.sd-liten{font-size:11.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#a8501a;margin:0 0 8px}
.sd-ljus{color:#f2a25c}
.sd-h2{font-size:clamp(26px,3.4vw,38px);line-height:1.1;margin:0 0 18px;color:#0d2440;font-weight:400}
.sd-knapp{display:inline-flex;align-items:center;height:48px;padding:0 24px;border-radius:999px;background:#1e5c82;color:#fff;font-weight:700;font-size:15px;text-decoration:none}
.sd-knapp-acc{background:#b5591a;flex-shrink:0}

.sd-satt{padding-bottom:20px}
.sd-satt-rad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:#fffdf8;border-radius:24px;overflow:hidden;border:1px solid rgba(150,110,60,.16)}
.sd-satt-spalt{padding:28px;text-decoration:none;color:#192830;border-right:1px solid rgba(150,110,60,.16);display:flex;flex-direction:column;gap:8px;transition:background .2s ease}
.sd-satt-spalt:last-child{border-right:none}
.sd-satt-spalt:hover{background:#f6f0e4}
.sd-satt-nr{font-family:'Playfair Display',Georgia,serif;font-size:40px;line-height:1;color:#b5591a}
.sd-satt-spalt b{font-family:'Playfair Display',Georgia,serif;font-size:21px;color:#0d2440}
.sd-satt-spalt p{margin:0;font-size:14.5px;line-height:1.6;color:#3d5865;flex:1}
.sd-satt-spalt i{font-style:normal;font-size:14px;font-weight:700;color:#1e5c82}

.sd-nu{padding:20px 0 28px}
.sd-nu-kort{display:flex;gap:20px;align-items:center;background:#fffdf8;border-radius:20px;padding:18px 24px;box-shadow:0 8px 30px rgba(60,40,15,.08)}
.sd-nu-klocka{flex:0 0 200px;padding-right:20px;border-right:1px solid rgba(150,110,60,.2)}
.sd-nu-tid{font-family:'Playfair Display',Georgia,serif;font-size:30px;font-weight:700;color:#0d2440;font-variant-numeric:tabular-nums;line-height:1.15;margin-bottom:6px;min-height:35px}
.sd-nu-klocka a,.sd-nu-alla{font-size:13px;font-weight:700;color:#1e5c82;text-decoration:none}
.sd-nu-lista{flex:1;min-width:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.sd-nu-rad{display:flex;gap:12px;align-items:center;text-decoration:none;color:#192830;padding:6px;border-radius:14px;min-width:0}
.sd-nu-rad:hover{background:rgba(30,92,130,.06)}
.sd-nu-bricka{flex-shrink:0;width:54px;height:58px;border-radius:12px;background:#0d2440;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.sd-nu-bricka b{font-family:'Playfair Display',Georgia,serif;font-size:23px;line-height:1;letter-spacing:0}
.sd-nu-text{font-size:13px;line-height:1.4;font-weight:600;min-width:0}
.sd-nu-text small{display:block;font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#a8501a;margin-bottom:2px}
.sd-nu-alla{flex-shrink:0}

.sd-kansla{padding-bottom:20px}
.sd-kansla-rutnat{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.sd-kansla-ruta{position:relative;aspect-ratio:1/1;border-radius:20px;overflow:hidden;background:linear-gradient(160deg,#1e5c82,#0d2440);background-size:cover;background-position:center;color:#fff;text-decoration:none;display:flex;align-items:flex-end;transition:transform .3s ease}
.sd-kansla-ruta::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,24,38,.05) 25%,rgba(8,24,38,.88) 100%)}
.sd-kansla-ruta:hover{transform:translateY(-4px)}
.sd-kansla-ruta span{position:relative;padding:16px;display:flex;flex-direction:column;gap:5px}
.sd-kansla-ruta b{font-family:'Playfair Display',Georgia,serif;font-size:24px;line-height:1.15}
.sd-kansla-ruta small{font-size:12.5px;font-weight:600;color:rgba(255,255,255,.92)}
.sd-kansla-ruta i{font-size:10px;font-style:normal;color:rgba(255,255,255,.7)}
.sd-mer{margin-top:22px;display:grid;gap:8px}
.sd-mer p{margin:0;font-size:14px;line-height:1.9;color:#3d5865}
.sd-mer b{font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:#0d2440;margin-right:12px}
.sd-mer a{color:#1e5c82;font-weight:600;text-decoration:none;margin-right:16px;white-space:nowrap}
.sd-mer a:hover{text-decoration:underline}

.sd-thorkel{background:#0d2440;color:#fff;padding:64px 0}
.sd-thorkel-inre{max-width:980px;margin:0 auto;padding:0 24px;display:flex;gap:36px;align-items:center}
.sd-thorkel-bild{width:150px;height:150px;border-radius:50%;background:#f3ece0;flex-shrink:0;border:4px solid rgba(255,255,255,.2)}
.sd-thorkel-text{flex:1;min-width:0}
.sd-thorkel h2{font-size:clamp(26px,3.6vw,40px);margin:0 0 18px;line-height:1.1;color:#fff;font-weight:400}
.sd-thorkel-falt{display:flex;align-items:center;gap:8px;background:#fff;border-radius:999px;padding:6px 6px 6px 22px;border:2px solid #f2a25c}
.sd-thorkel-falt input{flex:1;min-width:0;border:none!important;outline:none!important;background:transparent!important;box-shadow:none!important;font:inherit;font-size:16px;color:#192830!important;-webkit-text-fill-color:#192830;padding:10px 0}
.sd-thorkel-falt button{flex-shrink:0;width:46px;height:46px;border-radius:50%;border:none;background:#b5591a;color:#fff;font-size:20px;cursor:pointer}
.sd-thorkel-chips{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 0}
.sd-thorkel-chips a{font-size:13px;font-weight:600;color:#fff;text-decoration:none;padding:8px 14px;border-radius:999px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22)}
.sd-thorkel-chips a:hover{background:#fff;color:#0d2440}
.sd-thorkel-not{font-size:13px;color:rgba(255,255,255,.72);margin:16px 0 0}
.sd-thorkel-not a{color:#fff}

.sd-guide{padding:56px 24px}
.sd-guide-yta{max-width:1100px;margin:0 auto;padding:48px 48px 0;display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:56px;align-items:center;background:#dfe9ea;border-radius:28px 28px 0 0;overflow:hidden;min-height:420px}
.sd-guide-text{padding-bottom:48px}
.sd-guide-text p{font-size:16px;line-height:1.6;color:#3d5865;margin:0 0 18px}
.sd-guide-text ul{list-style:none;margin:0 0 24px;padding:0;display:grid;gap:14px}
.sd-guide-text li{font-size:14.5px;line-height:1.5;color:#3d5865;padding-left:18px;border-left:3px solid #1e5c82}
.sd-guide-text li b{display:block;color:#0d2440;font-size:15.5px}
.sd-telefon{width:300px;height:520px;border-radius:38px 38px 0 0;border:10px solid #14202a;border-bottom:none;background:#fff;overflow:hidden;align-self:end;box-shadow:0 20px 50px rgba(13,36,64,.25)}
.sd-telefon iframe{width:390px;height:728px;border:none;transform:scale(.718);transform-origin:0 0;pointer-events:none;background:#fff}
.sd-krog{max-width:1100px;margin:0 auto;background:#0d2440;color:#fff;border-radius:0 0 28px 28px;padding:36px 48px;display:flex;gap:32px;align-items:center;justify-content:space-between}
.sd-krog h2{font-size:clamp(24px,3vw,32px);margin:0 0 8px;color:#fff;font-weight:400}
.sd-krog p{margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,.82);max-width:600px}

.sd-faq-gardin{position:relative;z-index:1;background:#f3ece0;padding:24px}
.sd-faq-gardin summary{list-style:none;cursor:pointer;max-width:800px;margin:0 auto;background:#fffdf8;border:1px solid rgba(150,110,60,.16);border-radius:18px;padding:16px 22px;display:flex;justify-content:space-between;align-items:center;gap:16px;box-shadow:0 6px 20px rgba(60,40,15,.06)}
.sd-faq-gardin summary::-webkit-details-marker{display:none}
.sd-faq-gardin summary small{display:block;font:700 11.5px Inter,system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#a8501a;margin-bottom:4px}
.sd-faq-gardin summary h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(20px,2.4vw,26px);font-weight:400;line-height:1.15;color:#0d2440;margin:0}
.sd-faq-gardin summary i{font-style:normal;font-size:26px;line-height:1;color:#b5591a;transition:transform .2s ease}
.sd-faq-gardin[open] summary i{transform:rotate(45deg)}
.sd-faq-gardin .faq-section{padding:14px 0 0!important;background:transparent!important}
.sd-faq-gardin .section-header{display:none}
.sd-faq-gardin .reveal{opacity:1!important;transform:none!important}

@media (max-width:1100px){
  .sd-nu-kort{flex-wrap:wrap}
  .sd-nu-lista{flex:1 1 100%;order:3;grid-template-columns:repeat(2,minmax(0,1fr))}
  .sd-nu-klocka{flex:1;border-right:none;padding-right:0}
}
@media (max-width:900px){
  .sd{padding:40px 0}
  .sd-inre{padding:0 16px}
  .sd-satt{padding-bottom:12px}
  .sd-satt-rad{grid-template-columns:1fr;border-radius:20px}
  .sd-satt-spalt{padding:18px 20px;border-right:none;border-bottom:1px solid rgba(150,110,60,.16);display:grid;grid-template-columns:38px 1fr;column-gap:12px;row-gap:4px;align-items:start}
  .sd-satt-spalt:last-child{border-bottom:none}
  .sd-satt-nr{font-size:32px;grid-row:1 / span 3}
  .sd-satt-spalt b{font-size:19px}
  .sd-nu{padding:12px 0 20px}
  .sd-nu-kort{padding:16px;gap:12px;border-radius:18px}
  .sd-nu-tid{font-size:26px}
  .sd-nu-lista{grid-template-columns:1fr;gap:4px}
  .sd-nu-bricka{width:48px;height:52px}
  .sd-nu-bricka b{font-size:20px}
  .sd-kansla-rutnat{grid-template-columns:1fr 1fr;gap:10px}
  .sd-kansla-ruta{aspect-ratio:3/4;border-radius:16px}
  .sd-kansla-ruta span{padding:12px;gap:4px}
  .sd-kansla-ruta b{font-size:18px}
  .sd-kansla-ruta small{font-size:11.5px}
  .sd-mer a{white-space:normal;display:inline-block;margin-right:14px}
  .sd-mer b{display:block}
  .sd-faq-gardin{padding:16px 12px}
  .sd-faq-gardin summary{padding:14px 18px}
  .sd-thorkel{padding:40px 0}
  .sd-thorkel-inre{padding:0 20px;flex-direction:column;align-items:flex-start;gap:16px}
  .sd-thorkel-bild{width:76px;height:76px;border-width:3px}
  .sd-thorkel-text{width:100%}
  .sd-thorkel-falt{padding-left:16px}
  .sd-thorkel-chips a{font-size:12.5px;padding:8px 12px}
  .sd-guide{padding:40px 12px}
  .sd-guide-yta{padding:28px 22px 0;grid-template-columns:1fr;gap:0;min-height:0;border-radius:22px 22px 0 0}
  .sd-guide-text{padding-bottom:28px}
  .sd-krog{padding:26px 22px;flex-direction:column;align-items:flex-start;gap:18px;border-radius:0 0 22px 22px}
}
`
