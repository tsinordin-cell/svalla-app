'use client'
/**
 * FÖRHANDSVISNING 2026-11-19: "Allt om regionen" med val per typ.
 * Inget eget band: avsnittet ligger på sidans bakgrund som resten av regionsidan,
 * och korten är sajtens egna (SvallaKort, förlagan är /oar).
 * Tomt visas ärligt, besökaren skickas aldrig till en annan region.
 */
import { useState } from 'react'
import { flikTangent } from '@/lib/flikTangenter'
import type { OmradeBild } from './OmradesVal'
import { RadKort, Fotokrediter, ListRubrik, KORT_CSS, kortFotograf, type KortIkon } from './SvallaKort'

type Plats = { name: string; o: string; oSlug: string; typ?: string; href: string }
export type RegionNavData = {
  namn: string
  bild?: OmradeBild
  oar: { slug: string; name: string; tagline: string; bild?: OmradeBild }[]
  guider: { slug: string; title: string; excerpt: string }[]
  hamnar: Plats[]
  krogar: Plats[]
  boende: Plats[]
}

const VAL = ['Allt', 'Öar', 'Guider', 'Gästhamnar', 'Krogar', 'Boende'] as const
type Val = (typeof VAL)[number]

export default function RegionNav({ data }: { data: RegionNavData }) {
  const [val, setVal] = useState<Val>('Allt')
  const antal: Record<Val, number> = {
    Allt: data.oar.length + data.guider.length + data.hamnar.length + data.krogar.length + data.boende.length,
    Öar: data.oar.length, Guider: data.guider.length, Gästhamnar: data.hamnar.length, Krogar: data.krogar.length, Boende: data.boende.length,
  }
  const visa = (v: Val) => val === 'Allt' || val === v
  const max = (n: number) => (val === 'Allt' ? n : 999)
  const mer = (v: Val, n: number) => val === 'Allt' && n > 6
    ? <button type="button" className="sk-mer" onClick={() => setVal(v)}>Visa alla {n} →</button> : null
  const tomt = (vad: string) => <p className="sk-tomt">Vi har inga {vad} i {data.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
  const platser = (lista: Plats[], v: Val, vad: string, ikon: KortIkon) => (
    <section className="rn-sek">
      <ListRubrik titel={v} antal={lista.length} />
      {lista.length === 0 ? tomt(vad) : (
        <div className="sk-grid">
          {lista.slice(0, max(6)).map(p => (
            <RadKort key={p.oSlug + p.name} href={p.href} titel={p.name} text={p.typ ? `${p.typ}, ${p.o}` : p.o} ikon={ikon} />
          ))}
        </div>
      )}
      {mer(v, lista.length)}
    </section>
  )
  const visadeOar = data.oar.slice(0, max(6))

  const flikVal = VAL.filter(v => v !== 'Guider' || data.guider.length > 0)

  return (
    <section className="rn" aria-labelledby="rn-rubrik">
      <style>{KORT_CSS + RN_CSS}</style>
      <div className="rn-inre">
        <span className="sk-etikett">Allt på Svalla</span>
        <h2 id="rn-rubrik">{data.namn}</h2>
        <p className="rn-ingress">Öar, guider, gästhamnar, krogar och boende i regionen. Välj vad du letar efter.</p>
        <div className="sk-val" role="tablist" aria-label="Välj vad du letar efter">
          {flikVal.map((v, j) => (
            <button key={v} type="button" role="tab" aria-selected={val === v} tabIndex={val === v ? 0 : -1} className={val === v ? 'pa' : undefined} onClick={() => setVal(v)} onKeyDown={e => flikTangent(e, j, flikVal.length, n => setVal(flikVal[n]!))}>
              {v} · {antal[v]}
            </button>
          ))}
        </div>

        {data.bild && val === 'Allt' && (
          <figure className="sk-foto rn-foto">
            <img src={data.bild.url} alt={data.bild.o} loading="lazy" />
            <figcaption>{data.bild.o}. Foto: {kortFotograf(data.bild.fotograf)}, {data.bild.licens}, <a href={data.bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
          </figure>
        )}

        {visa('Öar') && (
          <section className="rn-sek">
            <ListRubrik titel="Öar" antal={data.oar.length} />
            {data.oar.length === 0 ? tomt('öar') : (
              <>
                <div className="sk-grid">
                  {visadeOar.map(o => <RadKort key={o.slug} href={`/o/${o.slug}`} titel={o.name} text={o.tagline} bild={o.bild} />)}
                </div>
                <Fotokrediter poster={visadeOar.map(o => ({ namn: o.name, bild: o.bild }))} />
              </>
            )}
            {mer('Öar', data.oar.length)}
          </section>
        )}
        {visa('Guider') && data.guider.length > 0 && (
          <section className="rn-sek">
            <ListRubrik titel="Guider" antal={data.guider.length} />
            <div className="sk-grid">
              {data.guider.slice(0, max(6)).map(g => <RadKort key={g.slug} href={`/guider/${g.slug}`} titel={g.title} text={g.excerpt} ikon="guide" />)}
            </div>
            {mer('Guider', data.guider.length)}
          </section>
        )}
        {visa('Gästhamnar') && platser(data.hamnar, 'Gästhamnar', 'gästhamnar', 'hamn')}
        {visa('Krogar') && platser(data.krogar, 'Krogar', 'krogar', 'krog')}
        {visa('Boende') && platser(data.boende, 'Boende', 'boenden', 'boende')}
      </div>
    </section>
  )
}

const RN_CSS = `
.rn{background:var(--bg)}
.rn-inre{max-width:1080px;margin:0 auto;padding:40px 16px 56px}
.rn h2{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;color:var(--txt);margin:0 0 6px}
.rn-ingress{margin:0 0 14px;color:var(--txt2);font-size:14px;line-height:1.5}
.rn-foto{margin-top:22px}
.rn-sek{margin-top:32px}
`
