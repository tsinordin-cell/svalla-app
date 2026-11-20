'use client'
/**
 * FÖRHANDSVISNING 2026-11-20 (Max: guider och dagsplaner slås ihop och man väljer område
 * som på krog-, boende- och aktivitetssidorna, OmradesVal).
 * Steg 1: vad vill du läsa (dagsplaner, guider eller allt)? Steg 2: var vill du vara? (Max: läsa före vara.) Används på /guider och
 * /resetips (där Dagsplaner är förvalt).
 *
 * Alla poster finns i sidans HTML från början, även de som är dolda bakom "Visa alla",
 * så Google ser länken till varje guide och dagsplan precis som förut.
 */
import { useMemo, useRef, useState } from 'react'
import { RadKort, KORT_CSS } from './SvallaKort'
import type { GuidePost, GuideTyp } from '@/lib/guideposter'

const KUSTER: { namn: string; omraden: string[] }[] = [
  { namn: 'Ostkusten', omraden: ['Stockholms skärgård', 'Roslagen', 'Sörmland', 'Östergötland', 'Kalmar och Öland', 'Gotland', 'Åland'] },
  { namn: 'Västkusten', omraden: ['Halland', 'Göteborgs skärgård', 'Bohuslän'] },
  { namn: 'Sydkusten', omraden: ['Blekinge', 'Skåne och Öresund'] },
  { namn: 'Norrlandskusten', omraden: ['Norrlandskusten'] },
  { namn: 'Insjöarna', omraden: ['Insjöar'] },
  { namn: 'Hela landet och utomlands', omraden: ['Hela landet', 'Utomlands'] },
]

const FORST = 24
const TYP_NAMN: Record<GuideTyp, string> = { Dagsplan: 'Dagsplaner', Guide: 'Guider' }

export default function GuideVal({ poster, forval = null }: { poster: GuidePost[]; forval?: GuideTyp | null }) {
  const [omrade, setOmrade] = useState<string | null>(null)
  const [typ, setTyp] = useState<GuideTyp | null>(forval)
  const [allt, setAllt] = useState(false)
  const steg2 = useRef<HTMLDivElement>(null)
  const traffar = useRef<HTMLDivElement>(null)

  // Antal per område räknas för den typ som är vald i steg 2, så att siffrorna stämmer med listan.
  const raknaPer = (lista: GuidePost[]) => {
    const m = new Map<string, number>()
    for (const p of lista) for (const o of p.omraden) m.set(o, (m.get(o) ?? 0) + 1)
    return m
  }
  const finns = useMemo(() => raknaPer(poster), [poster])
  const avTyp = typ ? poster.filter(p => p.typ === typ) : poster
  const antal = raknaPer(avTyp)

  const iOmradet = omrade ? poster.filter(p => p.omraden.includes(omrade)) : poster
  const lista = typ ? iOmradet.filter(p => p.typ === typ) : iOmradet
  const antalTyp = (t: GuideTyp) => iOmradet.filter(p => p.typ === t).length
  const visaAllt = allt || !!omrade

  const vidare = (ref: React.RefObject<HTMLDivElement | null>) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  const valjOmrade = (n: string | null) => { setOmrade(n); vidare(traffar) }
  const valjTyp = (t: GuideTyp | null) => { setTyp(t); vidare(steg2) }

  const rubrik = `${typ ? TYP_NAMN[typ] : 'Guider och dagsplaner'}${omrade ? (omrade === 'Hela landet' ? ' för hela landet' : ` i ${omrade}`) : ''}`

  return (
    <section className="ov gv" aria-label="Välj område">
      <style>{KORT_CSS + GV_CSS}</style>
      <div className="ov-inre">
        <div className="ov-steg">
          <div className="ov-steg-rubrik"><span>1</span>Vad vill du läsa?</div>
          <div className="sk-val">
            <button type="button" aria-pressed={!typ} className={!typ ? 'pa' : undefined} onClick={() => valjTyp(null)}>Allt · {iOmradet.length}</button>
            {(['Dagsplan', 'Guide'] as GuideTyp[]).map(t => (
              <button key={t} type="button" aria-pressed={typ === t}
                className={[typ === t ? 'pa' : '', antalTyp(t) === 0 ? 'tom' : ''].join(' ').trim() || undefined}
                onClick={() => valjTyp(t)}>{TYP_NAMN[t]} · {antalTyp(t)}</button>
            ))}
          </div>
        </div>

        <div ref={steg2} className="ov-steg">
          <div className="ov-steg-rubrik"><span>2</span>Var vill du vara?</div>
          <div className="sk-val gv-alla">
            <button type="button" aria-pressed={!omrade} className={!omrade ? 'pa' : undefined} onClick={() => valjOmrade(null)}>Alla områden · {avTyp.length}</button>
          </div>
          {KUSTER.map(k => {
            const med = k.omraden.filter(o => finns.get(o))
            if (med.length === 0) return null
            return (
              <div key={k.namn}>
                <div className="sk-kust">{k.namn}</div>
                <div className="sk-val">
                  {med.map(o => (
                    <button key={o} type="button" aria-pressed={omrade === o}
                      className={[omrade === o ? 'pa' : '', !antal.get(o) ? 'tom' : ''].join(' ').trim() || undefined}
                      onClick={() => valjOmrade(o)}>
                      {o} · {antal.get(o) ?? 0}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div ref={traffar} className="ov-res">
          <div className="sk-rubrik"><h2 className="gv-h2">{rubrik}</h2><span>{lista.length}</span></div>
          {lista.length === 0 ? (
            <p className="sk-tomt">Vi har inga {typ ? TYP_NAMN[typ].toLowerCase() : 'guider eller dagsplaner'} om {omrade} än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
          ) : (
            <div className={visaAllt ? 'sk-grid' : 'sk-grid gv-kort'}>
              {lista.map(p => (
                <RadKort key={p.href} href={p.href} titel={p.titel}
                  text={`${p.utvald ? 'Redaktionens val · ' : ''}${p.typ}${p.omraden.length ? ` · ${p.omraden.join(', ')}` : ''}`}
                  ikon="guide" />
              ))}
            </div>
          )}
          {!visaAllt && lista.length > FORST && (
            <button type="button" className="gv-mer" onClick={() => setAllt(true)}>Visa alla {lista.length}</button>
          )}
        </div>
      </div>
    </section>
  )
}

const GV_CSS = `
.ov{background:var(--bg)}
.ov-inre{max-width:1080px;margin:0 auto;padding:28px 16px 48px}
.ov-steg{background:var(--white);border:1px solid rgba(150,110,60,.16);border-radius:16px;padding:18px 20px;margin:0 0 12px;scroll-margin-top:90px}
.ov-steg-rubrik{display:flex;align-items:center;gap:10px;font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;color:var(--txt);margin:0 0 6px}
.ov-steg-rubrik span{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--acc-knapp,#b5591a);color:#fff;font-family:Inter,system-ui,sans-serif;font-size:14px}
.ov-res{margin-top:24px;scroll-margin-top:90px}
.gv-alla{margin:10px 0 2px}
.gv-h2{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:var(--sea);margin:0}
.gv-kort > :nth-child(n+${FORST + 1}){display:none}
.gv-mer{display:block;margin:18px auto 0;font:inherit;font-size:14px;font-weight:700;padding:10px 22px;border-radius:999px;border:1px solid rgba(150,110,60,.25);background:var(--white);color:var(--sea);cursor:pointer}
.gv-mer:hover{border-color:var(--acc-knapp,#b5591a)}
`
