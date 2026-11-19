'use client'
/**
 * FÖRHANDSVISNING 2026-11-18/19: välj område först, se sedan alternativen.
 * Utseendet följer /guider: blått band med vita val, vita kort under.
 * Inget område är förvalt. Saknas data för ett område står det ärligt.
 */
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type OmradeBild = { url: string; fotograf: string; licens: string; kalla: string; o: string }
export type OmradeData = {
  namn: string
  platser: { name: string; typ?: string; o: string; oSlug: string; href: string }[]
  bild?: OmradeBild
}

function Foto({ bild, hojd }: { bild: OmradeBild; hojd: number }) {
  return (
    <figure className="ov-foto" style={{ height: hojd }}>
      <img src={bild.url} alt={bild.o} loading="lazy" />
      <figcaption>{bild.o}. Foto: {bild.fotograf}, {bild.licens}, <a href={bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
    </figure>
  )
}

export default function OmradesVal({ rubrik, vad, omraden, standardBild }: { rubrik: string; vad: string; omraden: OmradeData[]; standardBild?: OmradeBild }) {
  const [valt, setValt] = useState<string | null>(null)
  const [typ, setTyp] = useState<string | null>(null)
  // Kom besökaren från menyn med ?typ=Bad visas den typen när området är valt.
  useEffect(() => { const t = new URLSearchParams(window.location.search).get('typ'); if (t) setTyp(t) }, [])
  const omrade = omraden.find(o => o.namn === valt)
  const typer = omrade ? [...new Set([...omrade.platser.map(p => p.typ).filter(Boolean) as string[], ...(typ ? [typ] : [])])].sort() : []
  const lista = omrade ? omrade.platser.filter(p => !typ || p.typ === typ) : []
  const bild = omrade?.bild ?? (omrade ? undefined : standardBild)
  return (
    <section className="ov" aria-labelledby="ov-rubrik">
      <div className="ov-band">
        <div className="ov-inre">
          <h2 id="ov-rubrik">{rubrik}</h2>
          <p className="ov-ingress">{typ ? <>Du har valt <b>{typ}</b>. Välj område, så ser du var.</> : <>Välj område först, så ser du {vad} där.</>}</p>
          <div className="ov-chips">
            {omraden.map(o => (
              <button key={o.namn} type="button" className={valt === o.namn ? 'pa' : undefined} onClick={() => setValt(o.namn)}>
                {o.namn}<span>{o.platser.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="ov-inre ov-under">
        {bild && <Foto bild={bild} hojd={omrade ? 220 : 260} />}
        {!omrade && <p className="ov-tips">Inget område är valt. Välj ett ovan.</p>}
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
              <p className="ov-tomt">Vi har inga {typ ? <>{vad} av typen {typ.toLowerCase()}</> : vad} i {omrade.namn} inlagda än. <a href="mailto:hej@svalla.se">Tipsa oss</a></p>
            ) : (
              <div className="ov-lista">
                {lista.map(p => (
                  <Link key={p.oSlug + p.name} href={p.href} className="ov-kort">
                    <span className="ov-typ">{p.typ ?? ''}</span>
                    <b>{p.name}</b>
                    <small>{p.o}</small>
                    <em>Läs mer →</em>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        .ov{background:var(--bg,#f2f8fa)}
        .ov-band{background:linear-gradient(160deg,#1e5c82 0%,#2d7d8a 100%);color:#fff}
        .ov-inre{max-width:1040px;margin:0 auto;padding:26px 20px 24px}
        .ov h2{font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:700;margin:0 0 4px;color:#fff}
        .ov-ingress{margin:0 0 14px;color:rgba(255,255,255,.75);font-size:14px}
        .ov-chips,.ov-typer{display:flex;gap:8px;flex-wrap:wrap}
        .ov-chips button{font:inherit;font-size:12px;font-weight:700;padding:6px 14px;border-radius:20px;border:none;cursor:pointer;background:rgba(255,255,255,.12);color:#fff;transition:all .18s}
        .ov-chips button span{margin-left:6px;opacity:.65;font-weight:600}
        .ov-chips button.pa{background:rgba(255,255,255,.92);color:var(--sea,#0a7b8c)}
        .ov-under{padding-top:22px}
        .ov-foto{position:relative;margin:0 0 18px;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#1e5c82,#2d7d8a)}
        .ov-foto img{width:100%;height:100%;object-fit:cover;display:block}
        .ov-foto figcaption{position:absolute;left:0;right:0;bottom:0;padding:18px 14px 8px;font-size:11px;color:rgba(255,255,255,.9);background:linear-gradient(transparent,rgba(0,0,0,.55))}
        .ov-foto figcaption a{color:#fff}
        .ov-tips{margin:0;color:var(--txt3,#6b7c85);font-size:14px}
        .ov-res h3{font-family:'Playfair Display',Georgia,serif;font-size:22px;margin:0 0 10px;color:var(--txt,#192830)}
        .ov-res h3 span{font-family:inherit;font-size:13px;color:var(--txt3,#6b7c85);font-weight:500;margin-left:6px}
        .ov-typer{margin-bottom:14px}
        .ov-typer button{font:inherit;font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px;border:1px solid var(--surface-3,#dbe7ec);background:#fff;color:var(--txt,#192830);cursor:pointer}
        .ov-typer button.pa{background:var(--sea,#0a7b8c);border-color:var(--sea,#0a7b8c);color:#fff}
        .ov-lista{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
        .ov-kort{display:flex;flex-direction:column;gap:4px;padding:16px 18px;border-radius:16px;background:#fff;text-decoration:none;box-shadow:0 1px 8px rgba(0,0,0,.05);border:1px solid var(--surface-3,#e3ecef);transition:transform .15s,box-shadow .15s}
        .ov-kort:hover{transform:translateY(-2px);box-shadow:0 8px 22px rgba(13,36,64,.1)}
        .ov-typ{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--sea,#0a7b8c);min-height:14px}
        .ov-kort b{font-family:'Playfair Display',Georgia,serif;font-size:17px;color:var(--txt,#192830);line-height:1.25}
        .ov-kort small{font-size:13px;color:var(--txt3,#6b7c85)}
        .ov-kort em{font-style:normal;font-size:13px;font-weight:700;color:var(--sea,#0a7b8c);margin-top:6px}
        .ov-tomt{background:#fff;border:1.5px dashed #c6d8df;border-radius:14px;padding:14px 16px;color:var(--txt2,#4a5c66);font-size:14px;margin:0}
        .ov-tomt a{color:var(--sea,#1e5c82);font-weight:700}
      `}</style>
    </section>
  )
}
