'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: två steg, efter förebild från nyctourism.com (Max).
 * Steg 1: välj område (grupperat efter samma kuster som menyn och kartan).
 * Steg 2: välj vad du vill göra (eller vilket boende, vilken sorts ställe, vilken hamn).
 * Sedan förs besökaren vidare ner till träffarna.
 *
 * Inget område är förvalt. Kom besökaren med ?typ=Bad är den typen redan vald i steg 2.
 * Saknas något i ett område står det ärligt, besökaren skickas aldrig till ett annat.
 */
import { useEffect, useRef, useState } from 'react'
import { RadKort, KORT_CSS, kortFotograf, type KortIkon } from './SvallaKort'

export type OmradeBild = { url: string; fotograf: string; licens: string; kalla: string; o: string }
export type OmradeData = {
  namn: string
  platser: { name: string; typ?: string; o: string; oSlug: string; href: string }[]
  bild?: OmradeBild
}

/** Områdena grupperas efter samma kuster som menyn. Insjöarna visas för sig. */
const KUSTER = ['Ostkusten', 'Västkusten', 'Sydkusten', 'Norrlandskusten', 'Insjöarna', 'Fler områden'] as const
const KUST_FOR: Record<string, string> = { 'Stockholms skärgård': 'Ostkusten', Roslagen: 'Ostkusten', Sörmland: 'Ostkusten', Östergötland: 'Ostkusten', 'Kalmar och Öland': 'Ostkusten', Gotland: 'Ostkusten', Åland: 'Ostkusten', Blekinge: 'Sydkusten', 'Skåne och Öresund': 'Sydkusten', Halland: 'Västkusten', 'Göteborgs skärgård': 'Västkusten', Bohuslän: 'Västkusten', Norrlandskusten: 'Norrlandskusten', Insjöar: 'Insjöarna' }
const kustFor = (n: string) => KUST_FOR[n] ?? 'Fler områden'

const IKON_FOR: Record<string, KortIkon> = { restauranger: 'krog', 'krogar och caféer': 'krog', boenden: 'boende', boende: 'boende', hamnar: 'hamn', gästhamnar: 'hamn', aktiviteter: 'aktivitet' }

/** Frågan i steg 2, efter vad sidan listar. */
function fragaSteg2(vad: string): string {
  const v = vad.toLowerCase()
  if (v.includes('aktivitet')) return 'Vad vill du göra?'
  if (v.includes('boende')) return 'Vilket sorts boende?'
  if (v.includes('hamn')) return 'Vilken sorts hamn?'
  if (v.includes('restaurang') || v.includes('krog') || v.includes('café')) return 'Vilket sorts ställe?'
  return 'Vad letar du efter?'
}

export default function OmradesVal({ rubrik, vad, omraden, standardBild }: { rubrik: string; vad: string; omraden: OmradeData[]; standardBild?: OmradeBild }) {
  const [valt, setValt] = useState<string | null>(null)
  const [typ, setTyp] = useState<string | null>(null)
  const steg2 = useRef<HTMLDivElement>(null)
  const traffar = useRef<HTMLDivElement>(null)
  useEffect(() => { const t = new URLSearchParams(window.location.search).get('typ'); if (t) setTyp(t) }, [])

  const omrade = omraden.find(o => o.namn === valt)
  const antalPerTyp = new Map<string, number>()
  omrade?.platser.forEach(p => { if (p.typ) antalPerTyp.set(p.typ, (antalPerTyp.get(p.typ) ?? 0) + 1) })
  if (typ && !antalPerTyp.has(typ)) antalPerTyp.set(typ, 0)
  const typer = [...antalPerTyp.keys()].sort((a, b) => a.localeCompare(b, 'sv'))
  const lista = omrade ? omrade.platser.filter(p => !typ || p.typ === typ) : []
  const bild = omrade?.bild ?? (omrade ? undefined : standardBild)
  const ikon: KortIkon = Object.entries(IKON_FOR).find(([k]) => vad.toLowerCase().includes(k))?.[1] ?? 'aktivitet'

  const vidare = (ref: React.RefObject<HTMLDivElement | null>) =>
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
  const valjOmrade = (n: string) => { setValt(n); vidare(steg2) }
  const valjTyp = (t: string | null) => { setTyp(t); vidare(traffar) }

  return (
    <section className="ov" aria-labelledby="ov-rubrik">
      <style>{KORT_CSS + OV_CSS}</style>
      <div className="ov-inre">
        <h2 id="ov-rubrik">{rubrik}</h2>
        <p className="ov-ingress">Välj område i steg 1 och vad du letar efter i steg 2, så visas träffarna direkt under.</p>

        <div className="ov-steg">
          <div className="ov-steg-rubrik"><span>1</span>Var vill du vara?</div>
          {KUSTER.map(k => {
            const iKusten = omraden.filter(o => kustFor(o.namn) === k)
            if (iKusten.length === 0) return null
            return (
              <div key={k}>
                <div className="sk-kust">{k}</div>
                <div className="sk-val">
                  {iKusten.map(o => (
                    <button key={o.namn} type="button" aria-pressed={valt === o.namn}
                      className={[valt === o.namn ? 'pa' : '', o.platser.length === 0 ? 'tom' : ''].join(' ').trim() || undefined}
                      onClick={() => valjOmrade(o.namn)}>
                      {o.namn} · {o.platser.length}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div ref={steg2} className={omrade ? 'ov-steg' : 'ov-steg ov-steg-vantar'}>
          <div className="ov-steg-rubrik"><span>2</span>{fragaSteg2(vad)}</div>
          {!omrade ? (
            <p className="ov-tips">Välj ett område först.</p>
          ) : typer.length === 0 ? (
            <p className="ov-tips">Här finns inga typer att välja mellan i {omrade.namn}. Allt visas nedan.</p>
          ) : (
            <div className="sk-val">
              <button type="button" aria-pressed={!typ} className={!typ ? 'pa' : undefined} onClick={() => valjTyp(null)}>Allt · {omrade.platser.length}</button>
              {typer.map(t => (
                <button key={t} type="button" aria-pressed={typ === t}
                  className={[typ === t ? 'pa' : '', antalPerTyp.get(t) === 0 ? 'tom' : ''].join(' ').trim() || undefined}
                  onClick={() => valjTyp(t)}>{t} · {antalPerTyp.get(t)}</button>
              ))}
            </div>
          )}
        </div>

        {bild && (
          <figure className="sk-foto ov-foto">
            <img src={bild.url} alt={bild.o} loading="lazy" />
            <figcaption>{bild.o}. Foto: {kortFotograf(bild.fotograf)}, {bild.licens}, <a href={bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
          </figure>
        )}

        <div ref={traffar}>
          {omrade && (
            <div className="ov-res">
              <div className="sk-rubrik"><h3>{typ ? `${typ} i ${omrade.namn}` : omrade.namn}</h3><span>{lista.length}</span></div>
              {lista.length === 0 ? (
                <p className="sk-tomt">Vi har inga {typ ? <>{vad} av typen {typ.toLowerCase()}</> : vad} i {omrade.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
              ) : (
                <div className="sk-grid">
                  {lista.map(p => <RadKort key={p.oSlug + p.name} href={p.href} titel={p.name} text={p.typ ? `${p.typ}, ${p.o}` : p.o} ikon={ikon} />)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const OV_CSS = `
.ov{background:var(--bg)}
.ov-inre{max-width:1080px;margin:0 auto;padding:36px 16px 48px}
.ov h2{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;color:var(--txt);margin:0 0 6px}
.ov-ingress{margin:0 0 18px;color:var(--txt2);font-size:14px;line-height:1.5}
.ov-steg{background:var(--white);border:1px solid rgba(150,110,60,.16);border-radius:16px;padding:18px 20px;margin:0 0 12px;scroll-margin-top:90px;transition:opacity .2s ease}
.ov-steg-vantar{opacity:.55}
.ov-steg-rubrik{display:flex;align-items:center;gap:10px;font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;color:var(--txt);margin:0 0 6px}
.ov-steg-rubrik span{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:var(--acc-knapp,#b5591a);color:#fff;font-family:Inter,system-ui,sans-serif;font-size:14px}
.ov-steg-vantar .ov-steg-rubrik span{background:var(--txt3,#52717f)}
.ov-tips{margin:6px 0 0;color:var(--txt2);font-size:14px}
.ov-foto{margin-top:12px}
.ov-res{margin-top:24px;scroll-margin-top:90px}
`
