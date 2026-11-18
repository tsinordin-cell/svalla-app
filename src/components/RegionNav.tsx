'use client'
/**
 * FÖRHANDSVISNING 2026-11-18: "Allt om regionen" med filter per typ.
 * Tomt visas ärligt, besökaren skickas aldrig till en annan region.
 */
import Link from 'next/link'
import { useState } from 'react'

type Plats = { name: string; o: string; oSlug: string; typ?: string }
export type RegionNavData = {
  namn: string
  oar: { slug: string; name: string; tagline: string }[]
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

  const tomt = (vad: string) => (
    <p className="rn-tomt">Vi har inga {vad} i {data.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
  )
  const mer = (f: Flik, n: number) => flik === 'Allt' && n > 6
    ? <button type="button" className="rn-mer" onClick={() => setFlik(f)}>Visa alla {n} →</button> : null

  const platser = (lista: Plats[], f: Flik, vad: string) => (
    <section className="rn-sek">
      <h3>{f} <span>{lista.length}</span></h3>
      {lista.length === 0 ? tomt(vad) : (
        <div className="rn-lista">
          {lista.slice(0, max(6)).map(p => (
            <Link key={p.oSlug + p.name} href={`/o/${p.oSlug}`} className="rn-rad">
              <b>{p.name}</b><small>{p.typ ? p.typ + ' · ' : ''}{p.o}</small>
            </Link>
          ))}
        </div>
      )}
      {mer(f, lista.length)}
    </section>
  )

  return (
    <section className="rn" aria-labelledby="rn-rubrik">
      <div className="rn-inre">
        <h2 id="rn-rubrik">Allt om {data.namn}</h2>
        <p className="rn-ingress">Allt Svalla har om regionen på ett ställe. Välj vad du letar efter.</p>
        <div className="rn-flikar" role="tablist">
          {FLIKAR.map(f => (
            <button key={f} type="button" role="tab" aria-selected={flik === f} className={flik === f ? 'pa' : undefined} onClick={() => setFlik(f)}>
              {f}<span>{antal[f]}</span>
            </button>
          ))}
        </div>

        {visa('Öar') && (
          <section className="rn-sek">
            <h3>Öar <span>{data.oar.length}</span></h3>
            <div className="rn-kort">
              {data.oar.slice(0, max(6)).map(o => (
                <Link key={o.slug} href={`/o/${o.slug}`} className="rn-o">
                  <b>{o.name}</b><small>{o.tagline}</small><em>Allt om {o.name} →</em>
                </Link>
              ))}
            </div>
            {mer('Öar', data.oar.length)}
          </section>
        )}
        {visa('Guider') && (
          <section className="rn-sek">
            <h3>Guider <span>{data.guider.length}</span></h3>
            {data.guider.length === 0 ? tomt('guider') : (
              <div className="rn-kort">
                {data.guider.slice(0, max(6)).map(g => (
                  <Link key={g.slug} href={`/guider/${g.slug}`} className="rn-g">
                    <b>{g.title}</b><small>{g.excerpt}</small>
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
        .rn{background:var(--white,#fff);border-bottom:1px solid var(--surface-3,#e3ecef)}
        .rn-inre{max-width:1040px;margin:0 auto;padding:28px 20px 30px}
        .rn h2{font-family:'Playfair Display',Georgia,serif;font-size:28px;margin:0 0 4px;color:var(--txt,#192830)}
        .rn-ingress{margin:0 0 16px;color:var(--txt2,#4a5c66);font-size:15px}
        .rn-flikar{display:flex;gap:8px;flex-wrap:wrap;position:sticky;top:0;background:var(--white,#fff);padding:6px 0 10px;z-index:5}
        .rn-flikar button{border:1.5px solid var(--surface-3,#dbe7ec);background:var(--white,#fff);border-radius:999px;padding:8px 15px;font:inherit;font-size:14px;font-weight:600;color:var(--txt,#192830);cursor:pointer}
        .rn-flikar button span{margin-left:6px;opacity:.55;font-weight:500}
        .rn-flikar button.pa{background:#0d2440;border-color:#0d2440;color:#fff}
        .rn-sek{margin-top:22px}
        .rn-sek h3{font-size:18px;margin:0 0 10px;color:var(--txt,#192830)}
        .rn-sek h3 span{font-size:13px;color:var(--txt3,#6b7c85);font-weight:500;margin-left:6px}
        .rn-kort{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:12px}
        .rn-o,.rn-g{display:flex;flex-direction:column;gap:5px;padding:14px 16px;border-radius:14px;background:var(--bg,#f2f8fa);text-decoration:none;color:inherit;border:1px solid transparent}
        .rn-o:hover,.rn-g:hover{border-color:#b9d3dd}
        .rn-o b,.rn-g b{font-size:15.5px;color:var(--txt,#192830)}
        .rn-o small,.rn-g small{font-size:13px;color:var(--txt2,#4a5c66);line-height:1.45;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        .rn-o em{font-style:normal;font-size:13px;font-weight:700;color:var(--sea,#1e5c82);margin-top:auto}
        .rn-g{border-left:4px solid #2d7d8a}
        .rn-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
        .rn-rad{display:flex;flex-direction:column;padding:11px 14px;border-radius:12px;background:var(--bg,#f2f8fa);text-decoration:none}
        .rn-rad b{font-size:14.5px;color:var(--txt,#192830)}.rn-rad small{font-size:12.5px;color:var(--txt3,#6b7c85)}
        .rn-tomt{background:var(--bg,#f2f8fa);border:1.5px dashed #c6d8df;border-radius:12px;padding:14px 16px;color:var(--txt2,#4a5c66);font-size:14px;margin:0}
        .rn-tomt a{color:var(--sea,#1e5c82);font-weight:700}
        .rn-mer{margin-top:10px;border:none;background:none;color:var(--sea,#1e5c82);font:inherit;font-weight:700;font-size:14px;cursor:pointer;padding:0}
      `}</style>
    </section>
  )
}
