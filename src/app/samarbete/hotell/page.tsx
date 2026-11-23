import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { OBILDER } from '@/app/o/obilder.generated'
import { ALL_ISLANDS, ANTAL_OAR } from '@/app/o/island-data'
import { ISLAND_COORDS } from '@/lib/islandCoords'

/**
 * SÄLJSIDA TILL HOTELL 2026-11-21 (Max): "Vi vill ha med er på Svalla".
 * Skickas som länk till hotell i skärgården. Oindexerad och olänkad.
 *
 * Sant på sidan: Svallas siffror räknas ur datan nedan. "Gratis", "inget avtal",
 * "ni bestämmer vad som står" och "vi tar bort sidan" är samma löften som på /partner.
 * Kontakt info@svalla.se är samma adress som på /partner.
 * EXEMPEL på sidan: "Ert hotell", texten om hotellet, förmånen och rapportens siffror.
 * Förmånerna finns inte än; sidan säger att det är det Svalla bygger nu.
 * Lägg inte till publiksiffror förrän de är mätta (samma regel som /partner).
 */
export const metadata: Metadata = {
  title: { absolute: 'Vi vill ha med er på Svalla | För hotell i skärgården' },
  description: 'Skärgården börjar på Svalla. Så här skulle ert hotell synas, och det kostar ingenting att vara med.',
  robots: { index: false, follow: false },
}

const EXEMPEL_O = 'sandhamn'
const MEJL = 'info@svalla.se'
const MAILTO = `mailto:${MEJL}?subject=${encodeURIComponent('Vi vill vara med på Svalla')}&body=${encodeURIComponent('Hej Svalla!\n\nVi vill gärna vara med.\n\nHotellets namn:\nÖ eller ort:\nKontaktperson:\nTelefon:\n\nHälsningar\n')}`

type Bild = { url: string; fotograf: string; licens: string } | null
const bild = (slug: string): Bild => {
  const b = OBILDER[slug]
  return b ? { url: b.url, fotograf: b.fotograf, licens: b.licens } : null
}
const fmt = (n: number) => n.toLocaleString('sv-SE')
const Foto = ({ b }: { b: Bild }) => (b ? <i className="ht-foto">Foto: {b.fotograf}, {b.licens}</i> : null)
const Ex = ({ mork }: { mork?: boolean }) => <span className={mork ? 'ht-ex mork' : 'ht-ex'}>Exempel</span>

export default function HotellSida() {
  const o = ALL_ISLANDS.find(x => x.slug === EXEMPEL_O)
  const oNamn = o?.name ?? 'Sandhamn'
  const hero = bild(EXEMPEL_O)
  const slut = bild('uto') ?? hero

  const summa = (f: (x: (typeof ALL_ISLANDS)[number]) => number) => ALL_ISLANDS.reduce((n, x) => n + f(x), 0)
  const boenden = summa(x => x.accommodation?.length ?? 0)
  const krogar = summa(x => x.restaurants?.length ?? 0)
  const hamnar = summa(x => x.harbors?.length ?? 0)

  // Generiska rader, inga riktiga verksamheter: sidan kan skickas till vilket hotell som helst.
  const grannar = [{ namn: 'Krogen vid hamnen', typ: 'Mat' }, { namn: 'Gästhamnen', typ: 'Hamn' }]

  // Kartan: öarnas kontrollerade koordinater, utplattade till en yta.
  const kord = ISLAND_COORDS.filter(k => ALL_ISLANDS.some(x => x.slug === k.slug && x.region !== 'bohuslan' && x.region !== 'goteborg'))
  const lat = kord.map(k => k.lat), lng = kord.map(k => k.lng)
  const [a, b, c, d] = [Math.min(...lat), Math.max(...lat), Math.min(...lng), Math.max(...lng)]
  const punkter = kord.map(k => ({
    slug: k.slug,
    x: 6 + 88 * (k.lng - c) / (d - c || 1),
    y: 6 + 88 * (b - k.lat) / (b - a || 1),
  }))
  const var_ = punkter.find(p => p.slug === EXEMPEL_O)

  const heroStil = hero ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,.35) 0%, rgba(8,24,38,.2) 40%, rgba(8,24,38,.82) 100%), url('${hero.url}')` } : undefined
  const slutStil = slut ? { backgroundImage: `linear-gradient(180deg, rgba(8,24,38,.55), rgba(8,24,38,.85)), url('${slut.url}')` } : undefined
  const fotoStil = (x: Bild) => (x ? { backgroundImage: `url('${x.url}')` } : undefined)

  return (
    <div className="ht">
      <style>{CSS}</style>

      <header className="ht-topp">
        <Link href="/" aria-label="Svalla, till startsidan"><SvallaLogo height={22} color="#0d2440" /></Link>
        <span>Skärgården börjar här</span>
      </header>

      {/* 1. Hälsningen */}
      <section className="ht-hero" style={heroStil}>
        <div className="ht-hero-inre">
          <small>Till er som driver hotell i skärgården</small>
          <h1>Vi vill ha med er på Svalla</h1>
          <p>Skärgården börjar på Svalla. Öarna, båtarna, krogarna och boendena på ett ställe, där resan planeras innan någon har packat väskan. Ert hotell hör hemma här, och det kostar ingenting att vara med.</p>
          <div className="ht-knappar">
            <a className="ht-knapp" href={MAILTO}>Ja, vi vill vara med</a>
            <a className="ht-knapp ljus" href="#er-sida">Se hur det skulle se ut</a>
          </div>
        </div>
        <Foto b={hero} />
      </section>

      {/* 2. Svalla i siffror, räknade ur datan */}
      <section className="ht-siffror" aria-label="Svalla i siffror">
        <div><b>{fmt(ANTAL_OAR)}</b><span>öar med egen sida</span></div>
        <div><b>{fmt(boenden)}</b><span>boenden på ösidorna</span></div>
        <div><b>{fmt(krogar)}</b><span>ställen att äta på</span></div>
        <div><b>{fmt(hamnar)}</b><span>hamnar</span></div>
        <div className="ht-gratis"><b>Gratis</b><span>att vara med</span></div>
      </section>

      {/* 3. Varför det är ett enkelt ja */}
      <section className="ht-del">
        <div className="ht-rubrik">
          <small>Ett enkelt ja</small>
          <h2>Ni har allt att vinna och inget att förlora</h2>
        </div>
        <div className="ht-fyra">
          <article><span className="ht-ikon">0</span><b>Det kostar ingenting</b><p>Det kostar inget att finnas på Svalla och inget att be oss rätta era uppgifter.</p></article>
          <article><span className="ht-ikon">✓</span><b>Inget avtal</b><p>Ni skriver inte på något. Vill ni inte vara med längre tar vi bort er sida.</p></article>
          <article><span className="ht-ikon">✎</span><b>Ni bestämmer vad som står</b><p>Era bilder, er text och era uppgifter. Är något fel ändrar vi det.</p></article>
          <article><span className="ht-ikon">→</span><b>Gästen bokar hos er</b><p>Knappen på er sida leder till er egen bokning. Gästen bokar direkt hos er.</p></article>
        </div>
      </section>

      {/* 4. Er sida */}
      <section className="ht-del" id="er-sida">
        <div className="ht-rubrik">
          <small>Så skulle det se ut</small>
          <h2>Ert hotell, på Svalla</h2>
          <p>En egen sida med era bilder och er text, mitt bland allt annat gästen behöver veta om ön: båten dit, var man äter, var man badar.</p>
        </div>
        <div className="ht-sida">
          <div className="ht-telefon" aria-label="Exempel på en hotellsida i mobilen">
            <div className="ht-skarm">
              <div className="ht-skarm-bild" style={fotoStil(hero)}><Ex /></div>
              <div className="ht-skarm-text">
                <span className="ht-chip">Boende · {oNamn}</span>
                <b>Ert hotell</b>
                <p>Rum med utsikt över hamnen, frukost i solen och båten till stan några minuter bort.</p>
                <div className="ht-skarm-knappar"><span>Boka rum</span><span className="ljus">Hemsida</span></div>
                <div className="ht-skarm-forman"><i>✦</i><span><b>Sen utcheckning</b><small>För Svallas besökare</small></span><em>Svalla-förmån</em></div>
              </div>
            </div>
          </div>
          <ul className="ht-lista">
            <li><b>Egen sida</b>Era bilder, er text och hur man tar sig till er.</li>
            <li><b>Boka direkt hos er</b>Knappen går till er bokning, inte via oss.</li>
            <li><b>På ösidan</b>Där gästerna läser på innan de åker ut.</li>
            <li><b>På kartan</b>Mitt i skärgården, bredvid hamnen och krogen.</li>
            <li><b>En förmån, om ni vill</b>Något extra till Svallas besökare. Helt frivilligt.</li>
          </ul>
        </div>
      </section>

      {/* 5. Här möter ni gästerna */}
      <section className="ht-del">
        <div className="ht-rubrik">
          <small>Där resan planeras</small>
          <h2>Här möter ni gästerna</h2>
          <p>Gästen som läser om {oNamn} på Svalla funderar redan på att åka. Där ska ni synas.</p>
        </div>
        <div className="ht-ytor">
          <article className="ht-yta">
            <div className="ht-yta-mock ht-mock-lista">
              <small>{oNamn} <Ex /></small>
              <div className="ht-rad du"><i>★</i><span><b>Ert hotell</b><small>Hotell · vid hamnen</small></span></div>
              {grannar.map(g => <div className="ht-rad" key={g.namn}><i>·</i><span><b>{g.namn}</b><small>{g.typ}</small></span></div>)}
            </div>
            <b>Ösidan</b><p>Varje ö har en egen sida med boenden, krogar, hamnar och båtar dit.</p>
          </article>
          <article className="ht-yta">
            <div className="ht-yta-mock ht-mock-karta" aria-hidden="true">
              {punkter.map(p => <span key={p.slug} className="ht-prick" style={{ left: `${p.x}%`, top: `${p.y}%` }} />)}
              {var_ && <span className="ht-pin" style={{ left: `${var_.x}%`, top: `${var_.y}%` }}><em>Ert hotell</em></span>}
            </div>
            <b>Kartan</b><p>Prickarna är öarnas riktiga lägen. Så här kan ert hotell synas bland dem.</p>
          </article>
          <article className="ht-yta">
            <div className="ht-yta-mock ht-mock-dag">
              <small>{oNamn} över en helg <Ex /></small>
              <div><span>Fre</span>Båten ut</div>
              <div className="du"><span>Fre</span>Incheckning på Ert hotell</div>
              <div><span>Lör</span>Bad och lunch vid hamnen</div>
            </div>
            <b>Dagsplanen</b><p>När gästen planerar sin resa kan ert hotell vara stoppet där den sover.</p>
          </article>
          <article className="ht-yta">
            <div className="ht-yta-mock ht-mock-chatt">
              <span className="fraga">Var ska vi bo på {oNamn} med barnen?</span>
              <span className="svar">Ert hotell ligger vid hamnen, nära bad och båten hem. <Ex /></span>
            </div>
            <b>Thorkel</b><p>Svallas guide svarar på frågor om skärgården. Så här kan ett svar se ut.</p>
          </article>
        </div>
      </section>

      {/* 6. Förmåner */}
      <section className="ht-del">
        <div className="ht-forman">
          <div className="ht-forman-text">
            <small>Det vi bygger nu</small>
            <h2>Ge gästen ett skäl till att välja er</h2>
            <p>Nästa steg på Svalla är förmåner för våra besökare. Sen utcheckning, frukost på köpet eller ett glas på bryggan. Gästen hämtar förmånen hos oss och visar den hos er. Ni bestämmer vad, när och hur länge.</p>
            <p className="ht-svag">Vill ni vara med när vi startar? Säg till när ni svarar.</p>
          </div>
          <div className="ht-kupong">
            <div className="ht-kv"><small>Boende</small><b>Sen utcheckning</b></div>
            <div className="ht-kh"><strong>Ert hotell</strong><span>{oNamn}</span><em>Svalla-förmån</em><Ex /></div>
          </div>
        </div>
      </section>

      {/* 7. Det ni får tillbaka */}
      <section className="ht-del">
        <div className="ht-rubrik">
          <small>Ni ser vad det ger</small>
          <h2>Så kan er månadsrapport se ut</h2>
          <p>Hur många som såg er, och hur många som gick vidare till er bokning. Bara besökare som sagt ja till statistik räknas.</p>
        </div>
        <div className="ht-rapport">
          <div className="ht-rapport-topp"><small>Månadsrapport</small><b>Ert hotell, juli</b><Ex /></div>
          <div className="ht-stapel"><span>Visningar av er sida</span><b>2 140</b><i style={{ width: '100%' }} /></div>
          <div className="ht-stapel"><span>Klick till er bokning</span><b>186</b><i style={{ width: '38%' }} /></div>
          <div className="ht-stapel"><span>Hämtade förmåner</span><b>64</b><i style={{ width: '16%' }} /></div>
          <p className="ht-svag">Siffrorna är påhittade och visar bara hur rapporten ser ut.</p>
        </div>
      </section>

      {/* 8. Tre steg */}
      <section className="ht-del">
        <div className="ht-rubrik">
          <small>Så kommer ni med</small>
          <h2>Tre steg, och första är ett mejl</h2>
        </div>
        <div className="ht-steg">
          <article><span>1</span><b>Svara ja</b><p>Svara på mejlet, eller skriv till <a href={MAILTO}>{MEJL}</a>.</p></article>
          <article><span>2</span><b>Vi sätter upp er sida</b><p>Vi frågar efter bilder och det som saknas, och lägger upp er sida.</p></article>
          <article><span>3</span><b>Ni är med</b><p>Gästerna hittar er där de planerar. Vill ni ändra något, säg till.</p></article>
        </div>
      </section>

      {/* 9. Frågor */}
      <section className="ht-del">
        <div className="ht-rubrik"><small>Vanliga frågor</small><h2>Innan ni svarar</h2></div>
        <div className="ht-fragor">
          <details open><summary>Vad kostar det?</summary><p>Ingenting. Det kostar inget att finnas på Svalla och inget att be oss rätta era uppgifter. Ni skriver inte på något avtal.</p></details>
          <details><summary>Vi kanske redan finns med?</summary><p>{fmt(boenden)} boenden finns redan på ösidorna. Finns ni där gör vi er sida komplett med era egna bilder, er text och er bokningslänk.</p></details>
          <details><summary>Kan vi bli borttagna?</summary><p>Ja. Skriv till {MEJL} så tar vi bort er sida.</p></details>
          <details><summary>Vad är en Svalla-förmån?</summary><p>Något extra ni ger Svallas besökare, till exempel sen utcheckning. Det är frivilligt och det är nästa sak vi bygger. Allt om förmåner på den här sidan är exempel.</p></details>
        </div>
      </section>

      {/* 10. Avslutningen */}
      <section className="ht-slut" style={slutStil}>
        <SvallaLogo height={30} color="#ffffff" />
        <h2>Skärgården på ett ställe. Ert hotell hör hemma där.</h2>
        <p>Svara på mejlet eller skriv till oss, så sätter vi upp er sida.</p>
        <div className="ht-knappar">
          <a className="ht-knapp" href={MAILTO}>Ja, vi vill vara med</a>
          <Link className="ht-knapp ljus" href="/partner">Skicka formuläret</Link>
        </div>
        <Foto b={slut} />
      </section>

      <footer className="ht-fot">
        <span>Svalla · Skärgården börjar här · <a href={`mailto:${MEJL}`}>{MEJL}</a></span>
        <span>Ert hotell, texten om hotellet, förmånen och rapportens siffror är exempel. Övriga siffror räknas ur Svallas egen data.</span>
      </footer>
    </div>
  )
}

const CSS = `
.ht{background:#f3ece0;color:#192830;font-family:Inter,system-ui,sans-serif;overflow-x:clip}
.ht h1,.ht h2{font-family:'Playfair Display',Georgia,serif;font-weight:400;color:inherit}
.ht a{color:inherit}
.ht-topp{display:flex;align-items:center;justify-content:space-between;gap:16px;max-width:1160px;margin:0 auto;padding:18px 24px}
.ht-topp span{font-size:12.5px;color:#52717f}
.ht-hero{position:relative;min-height:78vh;display:flex;align-items:flex-end;background-size:cover;background-position:center;color:#fff;margin:0 16px;border-radius:28px;overflow:hidden}
.ht-hero-inre{max-width:1160px;width:100%;margin:0 auto;padding:48px 40px 64px}
.ht-hero small,.ht-rubrik small,.ht-forman-text small{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#f2a25c}
.ht-rubrik small,.ht-forman-text small{color:#b5591a}
.ht-hero small{color:#ffe2c2;text-shadow:0 1px 8px rgba(0,0,0,.35)}
.ht-hero h1,.ht-hero p{text-shadow:0 2px 18px rgba(0,0,0,.25)}
.fb-flytande{display:none!important}
.ht-hero h1{font-size:clamp(40px,7vw,84px);line-height:1;margin:12px 0 18px;max-width:820px}
.ht-hero p{font-size:clamp(16px,1.6vw,19px);line-height:1.6;max-width:600px;margin:0 0 26px;color:rgba(255,255,255,.9)}
.ht-knappar{display:flex;flex-wrap:wrap;gap:12px}
.ht-knapp{display:inline-flex;align-items:center;height:52px;padding:0 26px;border-radius:999px;background:#c8642a;color:#fff!important;font-weight:700;font-size:15.5px;text-decoration:none;box-shadow:0 8px 24px rgba(200,100,42,.35)}
.ht-knapp.ljus{background:rgba(255,255,255,.14);border:1.5px solid rgba(255,255,255,.7);box-shadow:none}
.ht-foto{position:absolute;right:18px;bottom:12px;font-size:10.5px;font-style:normal;color:rgba(255,255,255,.75)}
.ht-siffror{max-width:1160px;margin:-34px auto 0;position:relative;z-index:1;padding:0 24px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.ht-siffror div{background:#fffdf8;border-radius:18px;padding:18px 18px 16px;box-shadow:0 10px 30px rgba(60,40,15,.1);display:flex;flex-direction:column;gap:4px}
.ht-siffror b{font-family:'Playfair Display',Georgia,serif;font-size:36px;font-weight:400;line-height:1;color:#0d2440}
.ht-siffror span{font-size:13px;color:#52717f}
.ht-siffror .ht-gratis{background:#0d2440}
.ht-siffror .ht-gratis b{color:#f2a25c}
.ht-siffror .ht-gratis span{color:rgba(255,255,255,.8)}
.ht-del{max-width:1160px;margin:0 auto;padding:88px 24px 0}
.ht-rubrik{max-width:660px;margin-bottom:28px}
.ht-rubrik h2,.ht-forman-text h2{font-size:clamp(30px,4.2vw,48px);line-height:1.08;margin:10px 0 12px;color:#0d2440}
.ht-rubrik p,.ht-forman-text p{font-size:16.5px;line-height:1.6;color:#3d5664;margin:0}
.ht-svag{font-size:13.5px!important;color:#6b7f88!important;margin-top:12px!important}
.ht-fyra{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.ht-fyra article,.ht-steg article{background:#fffdf8;border-radius:20px;padding:24px;border:1px solid rgba(150,110,60,.14)}
.ht-ikon{width:42px;height:42px;border-radius:50%;background:#fde9c8;color:#b5591a;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;margin-bottom:16px}
.ht-fyra b,.ht-steg b,.ht-yta>b{display:block;font-family:'Playfair Display',Georgia,serif;font-size:21px;font-weight:400;color:#0d2440;margin-bottom:6px}
.ht-fyra p,.ht-steg p,.ht-yta>p{margin:0;font-size:14.5px;line-height:1.55;color:#3d5664}
.ht-sida{display:grid;grid-template-columns:minmax(0,360px) minmax(0,1fr);gap:56px;align-items:center}
.ht-telefon{background:#0d2440;border-radius:44px;padding:12px;box-shadow:0 24px 60px rgba(13,36,64,.28);max-width:340px;width:100%;justify-self:center}
.ht-skarm{background:#fffdf8;border-radius:34px;overflow:hidden}
.ht-skarm-bild{height:220px;background-size:cover;background-position:center;position:relative}
.ht-skarm-bild .ht-ex{position:absolute;top:14px;right:14px}
.ht-skarm-text{padding:18px 18px 22px;display:flex;flex-direction:column;gap:8px}
.ht-chip{align-self:flex-start;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#b5591a}
.ht-skarm-text>b{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:400;color:#0d2440;line-height:1.1}
.ht-skarm-text>p{margin:0;font-size:14px;line-height:1.5;color:#3d5664}
.ht-skarm-knappar{display:flex;gap:8px;margin-top:4px}
.ht-skarm-knappar span{flex:1;text-align:center;height:42px;line-height:42px;border-radius:999px;background:#c8642a;color:#fff;font-weight:700;font-size:14px}
.ht-skarm-knappar span.ljus{background:#fff;color:#0d2440;border:1.5px solid rgba(13,36,64,.2)}
.ht-skarm-forman{display:grid;grid-template-columns:30px minmax(0,1fr);align-items:center;gap:6px 10px;margin-top:6px;padding:10px 12px;border-radius:14px;background:#f3ece0}
.ht-skarm-forman>em{grid-column:2;justify-self:start}
.ht-skarm-forman i{font-style:normal;width:30px;height:30px;flex-shrink:0;border-radius:50%;background:#fde9c8;color:#b5591a;display:flex;align-items:center;justify-content:center}
.ht-skarm-forman span{flex:1;min-width:0;display:flex;flex-direction:column}
.ht-skarm-forman b{font-size:14px;color:#0d2440}
.ht-skarm-forman small{font-size:12px;color:#52717f}
.ht-skarm-forman em,.ht-kh em{font-style:normal;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#1e6b4f;background:#dff0e6;border-radius:999px;padding:4px 9px;white-space:nowrap}
.ht-ex{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#7a5a1e;background:#fbe8c0;border:1px dashed #c9a35a;border-radius:999px;padding:3px 9px;vertical-align:middle;font-style:normal}
.ht-lista{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.ht-lista li{background:#fffdf8;border-radius:16px;padding:16px 20px;font-size:15px;line-height:1.5;color:#3d5664;border:1px solid rgba(150,110,60,.14)}
.ht-lista b{display:block;color:#0d2440;font-size:16px;margin-bottom:2px}
.ht-ytor{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.ht-yta{background:#fffdf8;border-radius:22px;padding:14px 14px 22px;border:1px solid rgba(150,110,60,.14)}
.ht-yta>b,.ht-yta>p{padding:0 8px}
.ht-yta-mock{height:200px;border-radius:16px;margin-bottom:18px;overflow:hidden;position:relative}
.ht-mock-lista{background:#f3ece0;padding:16px;display:flex;flex-direction:column;gap:8px}
.ht-mock-lista>small,.ht-mock-dag>small{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b5591a;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.ht-rad{display:flex;align-items:center;gap:10px;background:#fffdf8;border-radius:12px;padding:9px 12px;border:1px solid rgba(150,110,60,.12)}
.ht-rad i{font-style:normal;width:24px;height:24px;flex-shrink:0;border-radius:50%;background:#e9e2d4;color:#6b7f88;display:flex;align-items:center;justify-content:center;font-size:12px}
.ht-rad span{min-width:0;display:flex;flex-direction:column}
.ht-rad b{font-size:13.5px;color:#0d2440;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ht-rad small{font-size:11.5px;color:#6b7f88;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ht-rad.du{border:1.5px solid #c8642a;box-shadow:0 6px 16px rgba(200,100,42,.15)}
.ht-rad.du i{background:#c8642a;color:#fff}
.ht-mock-karta{background:radial-gradient(ellipse at 30% 40%,#cfe3ea,#a8c9d6)}
.ht-prick{position:absolute;width:6px;height:6px;margin:-3px 0 0 -3px;border-radius:50%;background:#0d2440;opacity:.55}
.ht-pin{position:absolute;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;background:#c8642a;border:3px solid #fff;box-shadow:0 4px 12px rgba(0,0,0,.25)}
.ht-pin em{position:absolute;left:50%;bottom:24px;transform:translateX(-50%);white-space:nowrap;font-style:normal;font-size:12px;font-weight:700;background:#0d2440;color:#fff;border-radius:999px;padding:5px 10px}
.ht-mock-dag{background:#f3ece0;padding:16px;display:flex;flex-direction:column;gap:7px}
.ht-mock-dag>div{display:flex;align-items:center;gap:10px;background:#fffdf8;border-radius:12px;padding:9px 12px;font-size:13.5px;color:#0d2440}
.ht-mock-dag>div span{font-size:11px;font-weight:700;color:#6b7f88;width:28px;flex-shrink:0}
.ht-mock-dag>div.du{border:1.5px solid #c8642a;font-weight:700}
.ht-mock-chatt{background:#0d2440;padding:16px;display:flex;flex-direction:column;gap:10px;justify-content:center}
.ht-mock-chatt span{font-size:13.5px;line-height:1.45;border-radius:16px;padding:10px 13px;max-width:88%}
.ht-mock-chatt .fraga{align-self:flex-end;background:#c8642a;color:#fff;border-bottom-right-radius:4px}
.ht-mock-chatt .svar{align-self:flex-start;background:#fffdf8;color:#192830;border-bottom-left-radius:4px}
.ht-mock-chatt .svar .ht-ex{margin-top:6px;display:table}
.ht-forman{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,420px);gap:48px;align-items:center;background:#fffdf8;border-radius:28px;padding:48px;border:1px solid rgba(150,110,60,.14)}
.ht-kupong{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);border-radius:20px;overflow:hidden;box-shadow:0 14px 36px rgba(60,40,15,.16)}
.ht-kv{background:#0d2440;color:#fff;padding:26px 22px;display:flex;flex-direction:column;gap:6px;border-right:2px dashed rgba(255,255,255,.35)}
.ht-kv small{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#f2a25c}
.ht-kv b{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:400;line-height:1.1}
.ht-kh{background:#f3ece0;padding:22px;display:flex;flex-direction:column;align-items:flex-start;gap:6px}
.ht-kh strong{font-size:16px;color:#0d2440}
.ht-kh span{font-size:13px;color:#52717f}
.ht-rapport{background:#fffdf8;border-radius:24px;padding:32px;max-width:720px;border:1px solid rgba(150,110,60,.14);display:grid;gap:18px}
.ht-rapport-topp{display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}
.ht-rapport-topp small{width:100%;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#b5591a}
.ht-rapport-topp b{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:400;color:#0d2440}
.ht-stapel{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:6px 12px;align-items:end}
.ht-stapel span{font-size:14.5px;color:#3d5664}
.ht-stapel b{font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:400;color:#0d2440;line-height:1}
.ht-stapel i{grid-column:1/-1;height:6px;border-radius:3px;background:#c8642a;opacity:.8}
.ht-steg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.ht-steg span{display:block;font-family:'Playfair Display',Georgia,serif;font-size:44px;line-height:1;color:#c8642a;margin-bottom:12px}
.ht-steg a{color:#b5591a;font-weight:600}
.ht-fragor{display:grid;gap:10px;max-width:760px}
.ht-fragor details{background:#fffdf8;border-radius:16px;border:1px solid rgba(150,110,60,.14);padding:0 22px}
.ht-fragor summary{cursor:pointer;list-style:none;padding:18px 0;font-weight:700;font-size:16px;color:#0d2440;display:flex;justify-content:space-between;gap:12px}
.ht-fragor summary::-webkit-details-marker{display:none}
.ht-fragor summary::after{content:'+';font-size:22px;line-height:1;color:#b5591a}
.ht-fragor details[open] summary::after{content:'−'}
.ht-fragor p{margin:0 0 18px;font-size:15px;line-height:1.6;color:#3d5664}
.ht-slut{position:relative;margin:96px 16px 0;border-radius:28px;overflow:hidden;background-size:cover;background-position:center;color:#fff;padding:96px 24px 104px;text-align:center;display:flex;flex-direction:column;align-items:center}
.ht-slut h2{font-size:clamp(32px,5vw,60px);line-height:1.05;margin:22px 0 14px;max-width:860px}
.ht-slut p{font-size:17px;line-height:1.6;color:rgba(255,255,255,.88);margin:0 0 28px}
.ht-slut .ht-knappar{justify-content:center}
.ht-fot{max-width:1160px;margin:0 auto;padding:28px 24px 48px;display:flex;flex-direction:column;gap:6px;font-size:12.5px;color:#6b7f88}
.ht-fot a{color:#b5591a}
@media (max-width:980px){
  .ht-siffror{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ht-siffror .ht-gratis{grid-column:1/-1}
  .ht-fyra,.ht-ytor{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ht-sida,.ht-forman{grid-template-columns:minmax(0,1fr);gap:32px}
  .ht-forman{padding:32px 24px}
}
@media (max-width:640px){
  .ht-topp{padding:14px 18px}
  .ht-topp span{display:none}
  .ht-hero{margin:0 10px;min-height:86vh;border-radius:22px}
  .ht-hero-inre{padding:32px 22px 48px}
  .ht-knapp{height:50px;padding:0 22px;font-size:15px}
  .ht-siffror{padding:0 16px;margin-top:-26px}
  .ht-siffror b{font-size:30px}
  .ht-del{padding:64px 18px 0}
  .ht-fyra,.ht-ytor,.ht-steg{grid-template-columns:minmax(0,1fr)}
  .ht-kupong{grid-template-columns:minmax(0,1fr)}
  .ht-kv{border-right:none;border-bottom:2px dashed rgba(255,255,255,.35)}
  .ht-rapport{padding:24px 20px}
  .ht-slut{margin:72px 10px 0;padding:72px 22px 84px;border-radius:22px}
  .ht-foto{right:14px;bottom:10px}
}
`
