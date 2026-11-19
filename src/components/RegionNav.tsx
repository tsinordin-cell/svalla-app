'use client'
/**
 * FÖRHANDSVISNING 2026-11-18/19: "Allt om regionen" med flikar per typ.
 * Utseendet följer /guider: blått band med vita flikar, vita kort under.
 * Tomt visas ärligt, besökaren skickas aldrig till en annan region.
 */
import Link from 'next/link'
import { useState } from 'react'
import type { OmradeBild } from './OmradesVal'

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

const FLIKAR = ['Allt', 'Öar', 'Guider', 'Gästhamnar', 'Krogar', 'Boende'] as const
type Flik = (typeof FLIKAR)[number]

export default function RegionNav({ data }: { data: RegionNavData }) {
  const [flik, setFlik] = useState<Flik>('Allt')
  const antal: Record<Flik, number> = {
    Allt: data.oar.length + data.guider.length + data.hamnar.length + data.krogar.length + data.boende.length,
    Öar: data.oar.length, Guider: data.guider.length, Gästhamnar: data.hamnar.length, Krogar: data.krogar.length, Boende: data.boende.length,
  }
  const visa = (f: Flik) => flik === 'Allt' || flik === f
  const max = (n: number) => (flik === 'Allt' ? n : 999)
  const tomt = (vad: string) => <p className="rn-tomt">Vi har inga {vad} i {data.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
  const mer = (f: Flik, n: number) => flik === 'Allt' && n > 6
    ? <button type="button" className="rn-mer" onClick={() => setFlik(f)}>Visa alla {n} →</button> : null
  const platser = (lista: Plats[], f: Flik, vad: string) => (
    <section className="rn-sek">
      <h3>{f} <span>{lista.length}</span></h3>
      {lista.length === 0 ? tomt(vad) : (
        <div className="rn-kortgrid">
          {lista.slice(0, max(6)).map(p => (
            <Link key={p.oSlug + p.name} href={p.href} className="rn-kort">
              <span className="rn-typ">{p.typ ?? f}</span><b>{p.name}</b><small>{p.o}</small><em>Läs mer →</em>
            </Link>
          ))}
        </div>
      )}
      {mer(f, lista.length)}
    </section>
  )

  return (
    <section className="rn" aria-labelledby="rn-rubrik">
      <div className="rn-band">
        <div className="rn-inre">
          <h2 id="rn-rubrik">Allt om {data.namn}</h2>
          <p className="rn-ingress">Allt Svalla har om regionen på ett ställe. Välj vad du letar efter.</p>
          <div className="rn-flikar" role="tablist">
            {FLIKAR.filter(f => f !== 'Guider' || data.guider.length > 0).map(f => (
              <button key={f} type="button" role="tab" aria-selected={flik === f} className={flik === f ? 'pa' : undefined} onClick={() => setFlik(f)}>
                {f}<span>{antal[f]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="rn-inre rn-under">
        {data.bild && flik === 'Allt' && (
          <figure className="rn-foto">
            <img src={data.bild.url} alt={data.bild.o} loading="lazy" />
            <figcaption>{data.bild.o}. Foto: {data.bild.fotograf}, {data.bild.licens}, <a href={data.bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
          </figure>
        )}
        {visa('Öar') && (
          <section className="rn-sek">
            <h3>Öar <span>{data.oar.length}</span></h3>
            <div className="rn-kortgrid">
              {data.oar.slice(0, max(6)).map(o => (
                <Link key={o.slug} href={`/o/${o.slug}`} className="rn-kort rn-o">
                  <div className="rn-obild" style={o.bild ? { backgroundImage: `url(${o.bild.url})` } : undefined} />
                  <b>{o.name}</b><small>{o.tagline}</small><em>Allt om {o.name} →</em>
                  {o.bild && <span className="rn-kredit">Foto: {o.bild.fotograf}, {o.bild.licens}</span>}
                </Link>
              ))}
            </div>
            {mer('Öar', data.oar.length)}
          </section>
        )}
        {visa('Guider') && data.guider.length > 0 && (
          <section className="rn-sek">
            <h3>Guider <span>{data.guider.length}</span></h3>
            {data.guider.length === 0 ? tomt('guider') : (
              <div className="rn-kortgrid">
                {data.guider.slice(0, max(6)).map(g => (
                  <Link key={g.slug} href={`/guider/${g.slug}`} className="rn-kort">
                    <span className="rn-typ">Guide</span><b>{g.title}</b><small>{g.excerpt}</small><em>Läs guiden →</em>
                  </Link>
                ))}
              </div>
            )}
            {mer('Guider', data.guider.length)}
          </section>
        )}
        {visa('Gästhamnar') && platser(data.hamnar, 'Gästhamnar', 'gästhamnar')}
        {visa('Krogar') && platser(data.krogar, 'Krogar', 'krogar')}
        {visa('Boende') && platser(data.boende, 'Boende', 'boenden')}
      </div>
      <style>{`
        .rn{background:var(--bg,#f2f8fa)}
        .rn-band{background:var(--grad-sea-hero);color:#fff}
        .rn-inre{max-width:1040px;margin:0 auto;padding:26px 20px 24px}
        .rn h2{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;margin:0 0 4px;color:#fff}
        .rn-ingress{margin:0 0 14px;color:rgba(255,255,255,.75);font-size:14px}
        .rn-flikar{display:flex;gap:8px;flex-wrap:wrap}
        .rn-flikar button{font:inherit;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;border:none;cursor:pointer;background:rgba(255,255,255,.12);color:#fff}
        .rn-flikar button span{margin-left:6px;opacity:.65}
        .rn-flikar button.pa{background:rgba(255,255,255,.92);color:var(--sea,#0a7b8c)}
        .rn-under{padding-top:22px}
        .rn-foto{position:relative;margin:0 0 6px;border-radius:14px;overflow:hidden;height:240px;background:var(--grad-sea)}
        .rn-foto img{width:100%;height:100%;object-fit:cover;display:block}
        .rn-foto figcaption{position:absolute;left:0;right:0;bottom:0;padding:18px 14px 8px;font-size:11px;color:rgba(255,255,255,.9);background:linear-gradient(transparent,rgba(0,0,0,.55))}
        .rn-foto figcaption a{color:#fff}
        .rn-sek{margin-top:22px}
        .rn-sek h3{font-family:'Playfair Display',Georgia,serif;font-size:22px;margin:0 0 12px;color:var(--txt,#192830)}
        .rn-sek h3 span{font-family:inherit;font-size:13px;color:var(--txt3,#6b7c85);font-weight:500;margin-left:6px}
        .rn-kortgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
        .rn-kort{display:flex;flex-direction:column;gap:4px;padding:16px 18px;border-radius:14px;background:var(--white);text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,.07);border:1px solid rgba(10,123,140,.06);transition:transform .15s,box-shadow .15s;overflow:hidden}
        .rn-kort:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.12)}
        .rn-o{padding-top:0}
        .rn-obild{height:130px;margin:0 -18px 10px;background:var(--grad-sea) center/cover}
        .rn-typ{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sea,#0a7b8c)}
        .rn-kort b{font-family:'Playfair Display',Georgia,serif;font-size:17px;color:var(--txt,#192830);line-height:1.25}
        .rn-kort small{font-size:13px;color:var(--txt2,#4a5c66);line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .rn-kort em{font-style:normal;font-size:13px;font-weight:700;color:var(--sea,#0a7b8c);margin-top:auto;padding-top:6px}
        .rn-kredit{font-size:10px;color:var(--txt3,#8a989f)}
        .rn-tomt{background:var(--white);border:1.5px dashed rgba(10,123,140,.25);border-radius:14px;padding:14px 16px;color:var(--txt2,#4a5c66);font-size:14px;margin:0}
        .rn-tomt a{color:var(--sea,#1e5c82);font-weight:700}
        .rn-mer{margin-top:10px;border:none;background:none;color:var(--sea,#1e5c82);font:inherit;font-weight:700;font-size:14px;cursor:pointer;padding:0}
      `}</style>
    </section>
  )
}
