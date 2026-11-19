/**
 * FÖRHANDSVISNING 2026-11-19: Svallas befintliga kortstil som en enda byggsten.
 * Förlagan är radkorten på /oar (miniatyrbild, rubrik, två rader text, pil) och
 * ikonkorten på regionsidorna (/gotland). Alla färger är sajtens egna variabler,
 * så korten följer med i ljust och mörkt läge.
 *
 * Regler: i en lista har antingen alla kort bild eller alla kort ikon.
 * Saknas foto visas en båtsymbol på samma yta, aldrig en tom ruta. Fotokrediter samlas
 * på en rad under listan.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'

export type KortBild = { url: string; fotograf: string; licens: string; kalla?: string }

const IKONER: Record<string, ReactNode> = {
  hamn: <><circle cx="12" cy="5" r="3" /><line x1="12" y1="22" x2="12" y2="8" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></>,
  krog: <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" /></>,
  boende: <><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></>,
  guide: <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></>,
  o: <><path d="M22 18H2a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4Z" /><path d="M21 14 10 2 3 14h18Z" /><path d="M10 2v16" /></>,
  aktivitet: <><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>,
}
export type KortIkon = keyof typeof IKONER

/** Fotografens namn kort nog för en rad. Lång fritext från Commons kortas, inget läggs till. */
export function kortFotograf(f: string): string {
  const t = f.replace(/\s+/g, ' ').trim()
  if (t.length <= 40) return t
  const m = t.match(/by (?:me, )?([A-ZÅÄÖ][\p{L}.'-]+(?: [A-ZÅÄÖ][\p{L}.'-]+){0,3})/u)
  if (m?.[1]) return m[1]
  return t.slice(0, 38).trim() + '…'
}

export function RadKort({ href, titel, text, bild, ikon }: { href: string; titel: string; text?: string; bild?: KortBild | null; ikon?: KortIkon }) {
  return (
    <Link href={href} className="sk-kort">
      {ikon ? (
        <span className="sk-ikon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{IKONER[ikon]}</svg>
        </span>
      ) : (
        bild ? <span className="sk-bild" aria-hidden="true" style={{ backgroundImage: `url('${bild.url}')` }} /> : (
          <span className="sk-bild sk-utan" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{IKONER.o}</svg>
          </span>
        )
      )}
      <span className="sk-text">
        <b>{titel}</b>
        {text && <small>{text}</small>}
      </span>
      <span className="sk-pil" aria-hidden="true">→</span>
    </Link>
  )
}

/** En rad med fotokrediter för korten i en lista. */
export function Fotokrediter({ poster }: { poster: { namn: string; bild?: KortBild | null }[] }) {
  const med = poster.filter(p => p.bild)
  if (med.length === 0) return null
  return (
    <p className="sk-krediter">
      Foton: {med.map((p, i) => <span key={p.namn}>{i > 0 && ' · '}{p.namn}: {kortFotograf(p.bild!.fotograf)}, {p.bild!.licens}</span>)}, via Wikimedia Commons.
    </p>
  )
}

/** Rubrik för en lista, som på /oar: Playfair i havsblått och en räknare. */
export function ListRubrik({ titel, antal, enhet }: { titel: string; antal?: number; enhet?: string }) {
  return (
    <div className="sk-rubrik">
      <h3>{titel}</h3>
      {antal !== undefined && <span>{antal}{enhet ? ` ${enhet}` : ''}</span>}
    </div>
  )
}

export const KORT_CSS = `
.sk-rubrik{display:flex;align-items:baseline;gap:12px;margin:0 0 14px}
.sk-rubrik h3{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:var(--sea);margin:0}
.sk-rubrik span{font-size:11px;padding:3px 10px;border-radius:999px;background:var(--surface-2);color:var(--txt2);font-weight:700}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
.sk-kort{background:var(--white);border:1px solid var(--surface-3);border-radius:12px;padding:14px 16px;text-decoration:none;color:inherit;display:flex;gap:14px;align-items:center;min-height:78px;transition:transform .12s ease,box-shadow .12s ease}
.sk-kort:hover{transform:translateY(-1px);box-shadow:0 4px 14px rgba(0,0,0,.08)}
.sk-bild{width:64px;height:48px;flex-shrink:0;border-radius:8px;background:var(--grad-sea);background-size:cover;background-position:center}
.sk-utan{background:var(--surface-2);color:var(--sea);display:inline-flex;align-items:center;justify-content:center}
.sk-ikon{width:48px;height:48px;flex-shrink:0;border-radius:10px;background:var(--surface-2);color:var(--sea);display:inline-flex;align-items:center;justify-content:center}
.sk-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.sk-text b{font-size:15px;font-weight:700;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sk-text small{font-size:12px;color:var(--txt2);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sk-pil{color:var(--sea);font-size:16px;flex-shrink:0}
.sk-krediter{font-size:11px;color:var(--txt3,#8a989f);margin:10px 0 0;line-height:1.5}
.sk-val{display:flex;gap:8px;flex-wrap:wrap}
.sk-val button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border-radius:999px;border:none;cursor:pointer;background:var(--surface-2);color:var(--sea)}
.sk-val button.pa{background:var(--sea);color:var(--bg)}
.sk-tomt{background:var(--white);border:1px dashed var(--surface-3);border-radius:12px;padding:14px 16px;color:var(--txt2);font-size:14px;margin:0}
.sk-tomt a{color:var(--sea);font-weight:700}
.sk-mer{margin-top:10px;border:none;background:none;color:var(--sea);font:inherit;font-weight:700;font-size:14px;cursor:pointer;padding:0}
.sk-etikett{display:block;font-size:12px;font-weight:700;color:var(--txt2);text-transform:uppercase;letter-spacing:.6px;margin:0 0 6px}
.sk-foto{position:relative;margin:0;border-radius:14px;overflow:hidden;height:220px;background:var(--grad-sea)}
.sk-foto img{width:100%;height:100%;object-fit:cover;display:block}
.sk-foto figcaption{position:absolute;left:0;right:0;bottom:0;padding:18px 14px 8px;font-size:11px;color:rgba(255,255,255,.92);background:linear-gradient(transparent,rgba(0,0,0,.55));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk-foto figcaption a{color:#fff}
@media (max-width:640px){.sk-grid{grid-template-columns:1fr}.sk-foto{height:170px}}
`
