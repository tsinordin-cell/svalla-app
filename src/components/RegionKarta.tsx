'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: regionväljare på startsidan, efter förebild från
 * nyctourism.com (stadsdelarna på en karta, pilar och en kort text per del).
 *
 * Sverige i fem delar: fyra kuster och de stora sjöarna, samma indelning som menyn
 * och /regioner. Kartan: src/lib/sverigekarta.ts (Natural Earth, public domain).
 * Texterna beskriver bara det som står på regionsidorna; inga siffror utan källa.
 * 2026-11-20 (Max): text och karta börjar i överkant (inte centrerat), så att flikarna ligger direkt
 * under rubriken och kartan högre upp; kartan lite lägre. På bred skärm ligger kartan bredvid
 * rubriken (negativ marginal), så att startsidan blir kortare.
 */
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { flikTangent } from '@/lib/flikTangenter'
import { KARTA_VIEWBOX, SVERIGE_LAN, SVERIGE_SJOAR, NORRLANDSKUST, NORRLANDSKUST_KLIPP, type KartZon } from '@/lib/sverigekarta'

type Del = {
  id: KartZon
  namn: string
  ankare: string
  text: string
  regioner: { namn: string; href: string }[]
  etikett: { x: number; y: number; anchor?: 'start' | 'middle' | 'end' }
}

const DELAR: Del[] = [
  {
    id: 'ost', namn: 'Ostkusten', ankare: 'ostkusten',
    text: 'Stockholms skärgård med Waxholmsbåtarna, Gotland och Öland ute i Östersjön, och Åland strax över havet.',
    regioner: [
      { namn: 'Stockholms skärgård', href: '/stockholms-skargard' },
      { namn: 'Gotland', href: '/gotland' },
      { namn: 'Öland', href: '/oland' },
      { namn: 'Åland', href: '/aland' },
    ],
    etikett: { x: 150, y: 470, anchor: 'start' },
  },
  {
    id: 'vast', namn: 'Västkusten', ankare: 'vastkusten',
    text: 'Från Hallands stränder upp genom Göteborgs skärgård till Bohusläns granitklippor och fiskelägen.',
    regioner: [
      { namn: 'Bohuslän', href: '/bohuslan' },
      { namn: 'Göteborgs skärgård', href: '/goteborg-skargard' },
      { namn: 'Halland', href: '/halland' },
      { namn: 'Västerhavet', href: '/vasterhav' },
    ],
    etikett: { x: 30, y: 420, anchor: 'end' },
  },
  {
    id: 'syd', namn: 'Sydkusten', ankare: 'sydkusten',
    text: 'Blekinge skärgård, Hanö och Skånes kust längs södra Östersjön.',
    regioner: [{ namn: 'Blekinge skärgård', href: '/blekinge-skargard' }],
    etikett: { x: 120, y: 552, anchor: 'start' },
  },
  {
    id: 'norr', namn: 'Norrlandskusten', ankare: 'norrlandskusten',
    text: 'Höga Kusten, som är ett världsarv, och skärgårdarna längs kusten upp mot Luleå.',
    regioner: [{ namn: 'Höga Kusten', href: '/hoga-kusten' }],
    etikett: { x: 215, y: 250, anchor: 'start' },
  },
  {
    id: 'sjo', namn: 'Insjöarna', ankare: 'insjoarna',
    text: 'Mälaren, Vänern, Vättern och Hjälmaren. Skärgårdar i sötvatten, nära städerna.',
    regioner: [{ namn: 'Mälaren', href: '/malaren' }],
    etikett: { x: 92, y: 395, anchor: 'middle' },
  },
]

export default function RegionKarta() {
  const [i, setI] = useState(0)
  // Startsidans reservlista (för sökmotorer och utan JavaScript) döljs när kartan finns.
  const rot = useRef<HTMLDivElement>(null)
  useEffect(() => { rot.current?.parentElement?.classList.add('klar') }, [])
  const del = DELAR[i]!
  const steg = (d: number) => setI(n => (n + d + DELAR.length) % DELAR.length)
  const valj = (z: KartZon | '') => { const j = DELAR.findIndex(x => x.id === z); if (j >= 0) setI(j) }

  return (
    <div className="rk" ref={rot}>
      <style>{RK_CSS}</style>
      <div className="rk-text">
        <div className="rk-flikar" role="tablist" aria-label="Delar av Sverige">
          {DELAR.map((x, j) => (
            <button key={x.id} type="button" role="tab" aria-selected={j === i} tabIndex={j === i ? 0 : -1} className={j === i ? 'pa' : undefined} onClick={() => setI(j)} onKeyDown={e => flikTangent(e, j, DELAR.length, setI)}>{x.namn}</button>
          ))}
        </div>
        <div className="rk-rad">
          <button type="button" className="rk-pil" aria-label="Föregående del" onClick={() => steg(-1)}>←</button>
          <div className="rk-innehall" aria-live="polite">
            <h3>{del.namn}</h3>
            <p>{del.text}</p>
            <div className="rk-regioner">
              {del.regioner.map(r => <Link key={r.href} href={r.href}>{r.namn}</Link>)}
            </div>
            <Link className="rk-knapp" href={`/regioner#${del.ankare}`}>Se hela {del.namn} →</Link>
          </div>
          <button type="button" className="rk-pil" aria-label="Nästa del" onClick={() => steg(1)}>→</button>
        </div>
      </div>
      <svg className="rk-karta" viewBox={KARTA_VIEWBOX} role="img" aria-label={`Karta över Sverige där ${del.namn} är markerad`}>
        {SVERIGE_LAN.map(l => (
          <path key={l.n} d={l.d}
            className={l.z ? (l.z === del.id ? 'rk-lan rk-vald' : 'rk-lan rk-kust') : 'rk-lan rk-inland'}
            onClick={() => valj(l.z)} />
        ))}
        {/* Norrlandskusten är en remsa längs vattnet, inte hela länen (Max 2026-11-20). */}
        <defs><clipPath id="rk-norrklipp"><path d={NORRLANDSKUST_KLIPP} /></clipPath></defs>
        <path d={NORRLANDSKUST} clipPath="url(#rk-norrklipp)" className={del.id === 'norr' ? 'rk-band rk-band-vald' : 'rk-band'} onClick={() => valj('norr')} />
        {SVERIGE_SJOAR.map(s => (
          <path key={s.n} d={s.d} className={del.id === 'sjo' ? 'rk-sjo rk-vald' : 'rk-sjo'} onClick={() => valj('sjo')} />
        ))}
        {DELAR.map((x, j) => (
          <text key={x.id} x={x.etikett.x} y={x.etikett.y} textAnchor={x.etikett.anchor ?? 'middle'}
            className={j === i ? 'rk-etikett rk-etikett-vald' : 'rk-etikett'} onClick={() => setI(j)}>{x.namn}</text>
        ))}
      </svg>
    </div>
  )
}

const RK_CSS = `
.rk{display:grid;grid-template-columns:minmax(0,1fr) minmax(240px,340px);gap:40px;align-items:start;margin-top:22px}
.rk-text{padding-top:8px}
.rk-flikar{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 26px}
.rk-flikar button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border-radius:999px;border:1px solid rgba(150,110,60,.22);background:var(--white,#fffdf8);color:var(--txt,#192830);cursor:pointer}
.rk-flikar button.pa{background:var(--acc-knapp,#b5591a);border-color:var(--acc-knapp,#b5591a);color:#fff}
.rk-rad{display:flex;align-items:center;gap:18px}
.rk-pil{flex-shrink:0;width:44px;height:44px;border-radius:50%;border:1px solid rgba(150,110,60,.25);background:var(--white,#fffdf8);color:var(--txt,#192830);font-size:20px;cursor:pointer}
.rk-pil:hover{border-color:var(--sea,#1e5c82);color:var(--sea,#1e5c82)}
.rk-innehall{flex:1;min-width:0}
.rk-innehall h3{font-family:'Playfair Display',Georgia,serif;font-size:clamp(30px,4vw,44px);font-weight:700;color:var(--txt,#192830);margin:0 0 10px;line-height:1.05}
.rk-innehall p{font-size:16px;line-height:1.6;color:var(--txt2,#3d5865);margin:0 0 16px;max-width:520px}
.rk-regioner{display:flex;flex-wrap:wrap;gap:6px 14px;margin:0 0 18px}
.rk-regioner a{font-size:14px;font-weight:600;color:var(--sea,#1e5c82);text-decoration:none;border-bottom:1px solid rgba(30,92,130,.3)}
.rk-regioner a:hover{border-bottom-color:var(--sea,#1e5c82)}
.rk-knapp{display:inline-flex;align-items:center;height:44px;padding:0 20px;border-radius:999px;background:var(--sea,#1e5c82);color:#fff;font-size:14px;font-weight:700;text-decoration:none}
.rk-karta{width:100%;height:auto;max-height:480px;overflow:visible}
/* Bred skärm: kartan lyfts upp bredvid rubriken, så att delen blir kortare (Max 2026-11-20). */
@media (min-width:1180px){.rk-karta{margin-top:-190px}}
.rk-lan{stroke:#fffdf8;stroke-width:.8;transition:fill .25s ease}
.rk-inland{fill:#ece3d2}
.rk-kust{fill:#ddd0b8;cursor:pointer}
.rk-kust:hover{fill:#cbbb9c}
.rk-sjo{fill:#c9dde3;stroke:#fffdf8;stroke-width:.6;cursor:pointer;transition:fill .25s ease}
.rk-vald{fill:var(--sea,#1e5c82)}
.rk-band{fill:none;stroke:#ddd0b8;stroke-width:12;stroke-linejoin:round;stroke-linecap:round;cursor:pointer;transition:stroke .25s ease}
.rk-band:hover{stroke:#cbbb9c}
.rk-band.rk-band-vald{stroke:var(--sea,#1e5c82)}
.rk-etikett{font-family:Inter,system-ui,sans-serif;font-size:11px;font-weight:700;fill:#5b6b72;cursor:pointer;paint-order:stroke;stroke:#f7f1e7;stroke-width:3px}
.rk-etikett-vald{fill:var(--sea,#1e5c82);font-size:12.5px}
@media (max-width:820px){.rk{grid-template-columns:1fr;gap:20px}.rk-karta{max-height:420px;order:-1}.rk-pil{width:38px;height:38px}}
`
