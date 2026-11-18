'use client'
/**
 * FÖRHANDSVISNING 2026-11-18: välj område först, se sedan alternativen.
 * Inget område är förvalt. Saknas data för ett område står det ärligt.
 */
import Link from 'next/link'
import { useState } from 'react'

export type OmradeData = { namn: string; platser: { name: string; typ?: string; o: string; oSlug: string }[] }

export default function OmradesVal({ rubrik, vad, omraden }: { rubrik: string; vad: string; omraden: OmradeData[] }) {
  const [valt, setValt] = useState<string | null>(null)
  const [typ, setTyp] = useState<string | null>(null)
  const omrade = omraden.find(o => o.namn === valt)
  const typer = omrade ? [...new Set(omrade.platser.map(p => p.typ).filter(Boolean) as string[])].sort() : []
  const lista = omrade ? omrade.platser.filter(p => !typ || p.typ === typ) : []
  return (
    <section className="ov" aria-labelledby="ov-rubrik">
      <div className="ov-inre">
        <h2 id="ov-rubrik">{rubrik}</h2>
        <p className="ov-ingress">Välj område först, så ser du {vad} där.</p>
        <div className="ov-chips">
          {omraden.map(o => (
            <button key={o.namn} type="button" className={valt === o.namn ? 'pa' : undefined} onClick={() => { setValt(o.namn); setTyp(null) }}>
              {o.namn}<span>{o.platser.length}</span>
            </button>
          ))}
        </div>
        {!omrade && <p className="ov-tips">Inget område är valt.</p>}
        {omrade && (
          <div className="ov-res">
            <h3>{omrade.namn} <span>{omrade.platser.length}</span></h3>
            {typer.length > 1 && (
              <div className="ov-typer">
                <button type="button" className={!typ ? 'pa' : undefined} onClick={() => setTyp(null)}>Alla</button>
                {typer.map(t => <button key={t} type="button" className={typ === t ? 'pa' : undefined} onClick={() => setTyp(t)}>{t}</button>)}
              </div>
            )}
            {lista.length === 0 ? (
              <p className="ov-tomt">Vi har inga {vad} i {omrade.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
            ) : (
              <div className="ov-lista">
                {lista.map(p => (
                  <Link key={p.oSlug + p.name} href={`/o/${p.oSlug}`} className="ov-rad">
                    <b>{p.name}</b><small>{p.typ ? p.typ + ' · ' : ''}{p.o}</small>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        .ov{background:var(--white,#fff);border-bottom:1px solid var(--surface-3,#e3ecef)}
        .ov-inre{max-width:1040px;margin:0 auto;padding:28px 20px 30px}
        .ov h2{font-family:'Playfair Display',Georgia,serif;font-size:28px;margin:0 0 4px;color:var(--txt,#192830)}
        .ov-ingress{margin:0 0 16px;color:var(--txt2,#4a5c66);font-size:15px}
        .ov-chips,.ov-typer{display:flex;gap:8px;flex-wrap:wrap}
        .ov-chips button,.ov-typer button{border:1.5px solid var(--surface-3,#dbe7ec);background:var(--white,#fff);border-radius:999px;padding:8px 15px;font:inherit;font-size:14px;font-weight:600;color:var(--txt,#192830);cursor:pointer}
        .ov-typer button{padding:6px 12px;font-size:13px}
        .ov-chips button span{margin-left:6px;opacity:.55;font-weight:500}
        .ov-chips button.pa,.ov-typer button.pa{background:#0d2440;border-color:#0d2440;color:#fff}
        .ov-tips{margin:14px 0 0;color:var(--txt3,#6b7c85);font-size:14px}
        .ov-res{margin-top:22px}
        .ov-res h3{font-size:18px;margin:0 0 10px;color:var(--txt,#192830)}
        .ov-res h3 span{font-size:13px;color:var(--txt3,#6b7c85);font-weight:500;margin-left:6px}
        .ov-typer{margin-bottom:12px}
        .ov-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:8px}
        .ov-rad{display:flex;flex-direction:column;padding:11px 14px;border-radius:12px;background:var(--bg,#f2f8fa);text-decoration:none}
        .ov-rad b{font-size:14.5px;color:var(--txt,#192830)}.ov-rad small{font-size:12.5px;color:var(--txt3,#6b7c85)}
        .ov-tomt{background:var(--bg,#f2f8fa);border:1.5px dashed #c6d8df;border-radius:12px;padding:14px 16px;color:var(--txt2,#4a5c66);font-size:14px;margin:0}
        .ov-tomt a{color:var(--sea,#1e5c82);font-weight:700}
      `}</style>
    </section>
  )
}
