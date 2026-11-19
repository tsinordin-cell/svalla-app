'use client'
/**
 * FÖRHANDSVISNING 2026-11-19: välj område först, se sedan alternativen.
 * Inget eget band: avsnittet ligger på sidans bakgrund, med sajtens egna
 * val-knappar och kort (SvallaKort, förlagan är /oar).
 * Inget område är förvalt. Saknas data för ett område står det ärligt.
 */
import { useEffect, useState } from 'react'
import { RadKort, KORT_CSS, kortFotograf, type KortIkon } from './SvallaKort'

export type OmradeBild = { url: string; fotograf: string; licens: string; kalla: string; o: string }
export type OmradeData = {
  namn: string
  platser: { name: string; typ?: string; o: string; oSlug: string; href: string }[]
  bild?: OmradeBild
}

const IKON_FOR: Record<string, KortIkon> = { restauranger: 'krog', 'krogar och caféer': 'krog', boenden: 'boende', boende: 'boende', hamnar: 'hamn', gästhamnar: 'hamn', aktiviteter: 'aktivitet' }

export default function OmradesVal({ rubrik, vad, omraden, standardBild }: { rubrik: string; vad: string; omraden: OmradeData[]; standardBild?: OmradeBild }) {
  const [valt, setValt] = useState<string | null>(null)
  const [typ, setTyp] = useState<string | null>(null)
  // Kom besökaren från menyn med ?typ=Bad visas den typen när området är valt.
  useEffect(() => { const t = new URLSearchParams(window.location.search).get('typ'); if (t) setTyp(t) }, [])
  const omrade = omraden.find(o => o.namn === valt)
  const typer = omrade ? [...new Set([...omrade.platser.map(p => p.typ).filter(Boolean) as string[], ...(typ ? [typ] : [])])].sort() : []
  const lista = omrade ? omrade.platser.filter(p => !typ || p.typ === typ) : []
  const bild = omrade?.bild ?? (omrade ? undefined : standardBild)
  const ikon: KortIkon = Object.entries(IKON_FOR).find(([k]) => vad.toLowerCase().includes(k))?.[1] ?? 'aktivitet'

  return (
    <section className="ov" aria-labelledby="ov-rubrik">
      <style>{KORT_CSS + OV_CSS}</style>
      <div className="ov-inre">
        <span className="sk-etikett">Välj område</span>
        <h2 id="ov-rubrik">{rubrik}</h2>
        <p className="ov-ingress">{typ ? <>Du har valt <b>{typ}</b>. Välj område, så ser du var.</> : <>Välj område först, så ser du {vad} där.</>}</p>
        <div className="sk-val">
          {omraden.map(o => (
            <button key={o.namn} type="button" className={valt === o.namn ? 'pa' : undefined} onClick={() => setValt(o.namn)}>
              {o.namn} · {o.platser.length}
            </button>
          ))}
        </div>

        {bild && (
          <figure className="sk-foto ov-foto">
            <img src={bild.url} alt={bild.o} loading="lazy" />
            <figcaption>{bild.o}. Foto: {kortFotograf(bild.fotograf)}, {bild.licens}, <a href={bild.kalla} target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></figcaption>
          </figure>
        )}

        {omrade && (
          <div className="ov-res">
            <div className="sk-rubrik"><h3>{omrade.namn}</h3><span>{lista.length}</span></div>
            {typer.length > 1 && (
              <div className="sk-val ov-typer">
                <button type="button" className={!typ ? 'pa' : undefined} onClick={() => setTyp(null)}>Alla</button>
                {typer.map(t => <button key={t} type="button" className={typ === t ? 'pa' : undefined} onClick={() => setTyp(t)}>{t}</button>)}
              </div>
            )}
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
    </section>
  )
}

const OV_CSS = `
.ov{background:var(--bg)}
.ov-inre{max-width:1080px;margin:0 auto;padding:36px 16px 48px}
.ov h2{font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;color:var(--txt);margin:0 0 6px}
.ov-ingress{margin:0 0 14px;color:var(--txt2);font-size:14px;line-height:1.5}
.ov-foto{margin-top:22px}
.ov-res{margin-top:28px}
.ov-typer{margin:0 0 14px}
.ov-typer button{font-size:12px;padding:5px 12px}
`
