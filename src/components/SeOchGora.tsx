'use client'
/**
 * Startsidans "Se & Göra" (Max 2026-11-20: samma steg som kartan och regionkartan, efter
 * förebild från nyctourism.com, avsnittet "Things to do"): ett brett foto med rubrik och
 * genvägar, och korten som en rad med foton man bläddrar i.
 *
 * Texterna, taggarna och länkarna är exakt de som stod i startsidans HTML förut.
 * Fotona är från Wikimedia Commons (samma som öarnas foton i obilder.generated), fri licens,
 * inga personer i bild. Fotograf och licens visas vid varje bild, vilket licensen kräver.
 * Bildtexten anger bara platsen på fotot.
 */
import Link from 'next/link'
import { useRef } from 'react'

type Bild = { url: string; plats: string; fotograf: string; licens: string; kalla: string }
type Aktivitet = { titel: string; text: string; taggar: string[]; href: string; bild: Bild }

const C = 'https://thumb.wikimedia.org/wikipedia/commons/thumb/'
const F = 'https://commons.wikimedia.org/wiki/File:'

const BAND: Bild = {
  url: C + '5/54/Landsort_2012d.jpg/1280px-Landsort_2012d.jpg',
  plats: 'Landsort', fotograf: 'Arild Vågen', licens: 'CC BY-SA 3.0', kalla: F + 'Landsort_2012d.jpg',
}

const AKTIVITETER: Aktivitet[] = [
  {
    titel: 'Kajak & Paddling', href: '/blogg/kajak-stockholms-skargard-nyborjare',
    text: 'Stockholms skärgård är ett fint landskap att paddla i. Paddla ut till öar utan fast förbindelse och hitta platser som ingen annan ser.',
    taggar: ['Nybörjarvänligt', 'Uthyrning', 'Guideturer'],
    bild: { url: C + 'e/e9/%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png/1280px-%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png', plats: 'Östra Nåttarö', fotograf: 'M0aslu1001', licens: 'CC BY-SA 3.0', kalla: F + '%C3%96stra_N%C3%A5ttar%C3%B6_juli_2009.png' },
  },
  {
    titel: 'Segling & Båtliv', href: '/blogg/segling-nyborjare-guide',
    text: 'Segla längs klassiska leder mot Sandhamn eller ankra i stilla naturhamnar. Svalla visar gästhamnar, bränsle och övernattningsplatser längs vägen.',
    taggar: ['Gästhamnar', 'Bränsle'],
    bild: { url: C + '6/69/1076_Arholma_August_2014_-_panoramio.jpg/1280px-1076_Arholma_August_2014_-_panoramio.jpg', plats: 'Arholma', fotograf: 'Bengt Nyman', licens: 'CC BY 3.0', kalla: F + '1076_Arholma_August_2014_-_panoramio.jpg' },
  },
  {
    titel: 'Bad & Klippor', href: '/blogg/basta-badplatserna',
    text: 'Hundratals badplatser på klippor och sandstränder. Hitta dolda badvikar och populära bastur med GPS-koordinater direkt på kartan.',
    taggar: ['Klippbad', 'Bastu', 'Sandstrand'],
    bild: { url: C + '1/1a/Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg/1280px-Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg', plats: 'Utö, Rävstaviken', fotograf: 'Arild Vågen', licens: 'CC BY-SA 3.0', kalla: F + 'Ut%C3%B6_R%C3%A4vstaviken_September_2012_02.jpg' },
  },
  {
    titel: 'Vandring & Natur', href: '/blogg/vandring-orno-uto',
    text: 'Utö, Möja och Ornö har markerade vandringsleder genom urbergslandskap och gammal skog, korta dagsturer och flerdagarsäventyr.',
    taggar: ['Markerade leder', 'Naturreservat', 'Fågelskådning'],
    bild: { url: C + 'b/be/G%C3%A4lln%C3%B6_July_2017_05.jpg/1280px-G%C3%A4lln%C3%B6_July_2017_05.jpg', plats: 'Gällnö', fotograf: 'Arild Vågen', licens: 'CC BY-SA 4.0', kalla: F + 'G%C3%A4lln%C3%B6_July_2017_05.jpg' },
  },
  {
    titel: 'Fiske', href: '/blogg/fiske-skargard-guide',
    text: 'Abborre, gädda och havsöring väntar i skären. Sportfiske längs kusten och i stilla vikar som bara lokalkännedom kan visa.',
    taggar: ['Havsfiske', 'Medfiske', 'Fritidsfiske'],
    bild: { url: C + 'd/de/Svarts%C3%B6_Alsvik.jpg/1280px-Svarts%C3%B6_Alsvik.jpg', plats: 'Svartsö, Alsvik', fotograf: 'Lidingo', licens: 'CC BY-SA 3.0', kalla: F + 'Svarts%C3%B6_Alsvik.jpg' },
  },
  {
    titel: 'Cykling', href: '/blogg/cykling-moja-gallno',
    text: 'Bilfria öar som Möja och Gällnö är perfekta för cykling. Hyr en cykel vid bryggan och utforska hela ön på ett par timmar.',
    taggar: ['Bilfria öar', 'Uthyrning', 'Familjefärd'],
    bild: { url: C + 'd/dc/Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg/1280px-Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg', plats: 'Möja, hamnen vid Löka', fotograf: 'Dick Rochester', licens: 'CC BY-SA 2.0', kalla: F + 'Hamnen_vid_L%C3%B6ka_p%C3%A5_M%C3%B6ja.jpg' },
  },
]

export default function SeOchGora() {
  const lista = useRef<HTMLDivElement>(null)
  const bladdra = (riktning: number) => {
    const el = lista.current
    if (!el) return
    const kort = el.querySelector<HTMLElement>('.sg-kort')
    el.scrollBy({ left: riktning * ((kort?.offsetWidth ?? 320) + 20), behavior: 'smooth' })
  }

  return (
    <section className="sg" id="aktiviteter">
      <style>{SG_CSS}</style>
      <div className="sg-band" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,30,45,.82) 0%, rgba(10,30,45,.55) 45%, rgba(10,30,45,.15) 100%), url('${BAND.url}')` }}>
        <div className="sg-inre">
          <div className="sg-etikett">Se &amp; Göra</div>
          <h2>Skärgårdslivet är mer än mat</h2>
          <p>Från klippbad och kajakpaddling till vandring och fiske, skärgården erbjuder aktiviteter för alla smaker och alla säsonger.</p>
          <nav className="sg-kat" aria-label="Aktiviteter">
            {AKTIVITETER.map(a => <Link key={a.href} href={a.href}>{a.titel}</Link>)}
          </nav>
        </div>
        <span className="sg-kredit">{BAND.plats}. Foto: {BAND.fotograf}, {BAND.licens}, <a href={BAND.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></span>
      </div>

      <div className="sg-inre sg-under">
        <div className="sg-rad">
          <Link href="/aktiviteter" className="sg-alla">Alla aktiviteter →</Link>
          <div className="sg-pilar">
            <button type="button" aria-label="Föregående" onClick={() => bladdra(-1)}>←</button>
            <button type="button" aria-label="Nästa" onClick={() => bladdra(1)}>→</button>
          </div>
        </div>
        <div className="sg-lista" ref={lista}>
          {AKTIVITETER.map(a => (
            <article key={a.href} className="sg-kort">
              <Link href={a.href} className="sg-foto" aria-label={a.titel}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.bild.url} alt={a.bild.plats} loading="lazy" />
              </Link>
              <span className="sg-fotokredit">{a.bild.plats}. Foto: {a.bild.fotograf}, {a.bild.licens}, <a href={a.bild.kalla} target="_blank" rel="noopener noreferrer">Commons</a></span>
              <div className="sg-text">
                <h3><Link href={a.href}>{a.titel}</Link></h3>
                <p>{a.text}</p>
                <div className="sg-taggar">{a.taggar.map(t => <span key={t}>{t}</span>)}</div>
                <Link href={a.href} className="sg-las">Läs guiden →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const SG_CSS = `
.sg{position:relative;z-index:1;background:var(--white,#fffdf8);padding-bottom:56px}
.sg-band{position:relative;background-size:cover;background-position:center 60%;color:#fff;padding:72px 0 150px}
.sg-inre{max-width:1200px;margin:0 auto;padding:0 32px}
.sg-etikett{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.75);margin:0 0 12px}
.sg-band h2{font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,4.4vw,52px);font-weight:700;line-height:1.08;margin:0 0 14px;color:#fff;max-width:640px}
.sg-band p{font-size:17px;line-height:1.6;color:rgba(255,255,255,.88);margin:0 0 24px;max-width:560px}
.sg-kat{display:flex;flex-wrap:wrap;gap:8px;max-width:720px}
.sg-kat a{font-size:13px;font-weight:600;color:#fff;text-decoration:none;padding:8px 15px;border-radius:999px;border:1px solid rgba(255,255,255,.45);background:rgba(255,255,255,.1);backdrop-filter:blur(4px)}
.sg-kat a:hover{background:#fff;color:#0d2440}
.sg-kredit{position:absolute;right:14px;bottom:10px;font-size:10.5px;color:rgba(255,255,255,.7)}
.sg-kredit a{color:inherit}
.sg-under{margin-top:-112px;position:relative}
.sg-rad{display:flex;align-items:center;justify-content:space-between;margin:0 0 14px}
.sg-alla{font-size:14px;font-weight:700;color:#fff;text-decoration:none;border-bottom:1px solid rgba(255,255,255,.5);padding-bottom:2px}
.sg-alla:hover{border-bottom-color:#fff}
.sg-pilar{display:flex;gap:10px}
.sg-pilar button{width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.5);background:rgba(13,36,64,.55);color:#fff;font-size:20px;cursor:pointer}
.sg-pilar button:hover{background:#fff;color:#0d2440}
.sg-lista{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 2px 14px}
.sg-lista::-webkit-scrollbar{display:none}
.sg-kort{position:relative;flex:0 0 calc((100% - 40px) / 3);scroll-snap-align:start;background:var(--white,#fffdf8);border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(20,40,60,.14);display:flex;flex-direction:column}
.sg-foto{display:block;aspect-ratio:16/10;overflow:hidden;background:#dfe7e9}
.sg-foto img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease}
.sg-kort:hover .sg-foto img{transform:scale(1.04)}
.sg-fotokredit{position:absolute;top:8px;right:8px;font-size:10px;color:#fff;background:rgba(6,14,24,.55);padding:2px 7px;border-radius:6px;max-width:85%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sg-fotokredit a{color:inherit}
.sg-text{padding:18px 22px 22px;display:flex;flex-direction:column;flex:1}
.sg-text h3{font-family:'Playfair Display',Georgia,serif;font-size:21px;font-weight:700;margin:0 0 8px}
.sg-text h3 a{color:var(--sea,#1e5c82);text-decoration:none}
.sg-text p{font-size:14px;line-height:1.6;color:var(--txt2,#3d5865);margin:0 0 14px;flex:1}
.sg-taggar{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 14px}
.sg-taggar span{font-size:11px;font-weight:500;padding:3px 10px;border-radius:999px;background:rgba(45,125,138,.09);color:var(--teal,#1e5c82)}
.sg-las{font-size:13px;font-weight:700;color:var(--sea,#1e5c82);text-decoration:none}
@media (max-width:900px){.sg-kort{flex-basis:calc((100% - 20px) / 2)}}
@media (max-width:640px){
  .sg-band{padding:48px 0 120px}
  .sg-inre{padding:0 18px}
  .sg-band p{font-size:15px}
  .sg-under{margin-top:-92px}
  .sg-pilar{display:none}
  .sg-kort{flex-basis:84%}
}
`
