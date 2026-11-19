/**
 * FÖRHANDSVISNING 2026-11-19: Svallas kortstil som en enda byggsten.
 * Förlagan är radkorten på /oar (bild, rubrik, två rader text, pil).
 * Färgerna är varma och ljusa (Max 2026-11-19): sandfärgad sida, vita kort,
 * orange etiketter och valda knappar, havsblå rubriker och pilar.
 *
 * Regel: alla kort har bild, så att listorna blir en röd linje.
 * Finns ett fritt foto av just den platsen visas det, med fotograf och licens
 * på en rad under listan. Annars visas samma tecknade skärgårdsbild på alla,
 * som inte påstår sig föreställa platsen.
 */
import Link from 'next/link'

export type KortBild = { url: string; fotograf: string; licens: string; kalla?: string }
/** Vilken sorts plats kortet gäller. Används för alt-text, inte för utseendet. */
export type KortIkon = 'o' | 'hamn' | 'krog' | 'boende' | 'guide' | 'aktivitet'

/** Fotografens namn kort nog för en rad. Lång fritext från Commons kortas, inget läggs till. */
export function kortFotograf(f: string): string {
  const t = f.replace(/\s+/g, ' ').trim()
  if (t.length <= 40) return t
  const m = t.match(/by (?:me, )?([A-ZÅÄÖ][\p{L}.'-]+(?: [A-ZÅÄÖ][\p{L}.'-]+){0,3})/u)
  if (m?.[1]) return m[1]
  return t.slice(0, 38).trim() + '…'
}

export function RadKort({ href, titel, text, bild }: { href: string; titel: string; text?: string; bild?: KortBild | null; ikon?: KortIkon }) {
  return (
    <Link href={href} className="sk-kort">
      {bild
        ? <span className="sk-bild" aria-hidden="true" style={{ backgroundImage: `url('${bild.url}')` }} />
        : <span className="sk-bild sk-tecknad" aria-hidden="true" />}
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

/* Tecknad skärgårdsbild: kvällshimmel, hav, en klippö med en röd stuga. Samma på alla kort utan foto. */
const TECKNAD = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 120'%3E%3Cdefs%3E%3ClinearGradient id='h' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23f2c592'/%3E%3Cstop offset='1' stop-color='%23fbeedc'/%3E%3C/linearGradient%3E%3ClinearGradient id='v' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%232d7d8a'/%3E%3Cstop offset='1' stop-color='%231e5c82'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='160' height='120' fill='url(%23h)'/%3E%3Ccircle cx='124' cy='34' r='11' fill='%23fff6e6'/%3E%3Crect y='80' width='160' height='40' fill='url(%23v)'/%3E%3Cpath d='M14 82 Q46 56 90 63 Q120 68 142 82 Z' fill='%23b3a389'/%3E%3Cpath d='M26 76 Q52 58 84 63 Q66 72 26 76Z' fill='%236f8f5c'/%3E%3Crect x='72' y='57' width='17' height='12' fill='%23b0392a'/%3E%3Cpath d='M70 58 L80.5 49 L91 58 Z' fill='%237a2a20'/%3E%3Crect x='78' y='62' width='4' height='7' fill='%23fff'/%3E%3Cpath d='M18 96 h22 M60 104 h30 M110 94 h26' stroke='%23ffffff' stroke-opacity='.35' stroke-width='2'/%3E%3C/svg%3E\")"

export const KORT_CSS = `
.sk-rubrik{display:flex;align-items:baseline;gap:12px;margin:0 0 14px}
.sk-rubrik h3{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;color:var(--sea);margin:0}
.sk-rubrik span{font-size:11px;padding:3px 10px;border-radius:999px;background:rgba(201,110,42,.12);color:var(--acc-text,#a8501a);font-weight:700}
.sk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}
.sk-kort{background:var(--white);border:1px solid rgba(150,110,60,.16);border-radius:14px;padding:12px 14px;text-decoration:none;color:inherit;display:flex;gap:14px;align-items:center;min-height:84px;box-shadow:0 1px 4px rgba(90,60,20,.05);transition:transform .12s ease,box-shadow .12s ease}
.sk-kort:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(90,60,20,.10)}
.sk-bild{width:76px;height:58px;flex-shrink:0;border-radius:10px;background-color:#e9dcc6;background-size:cover;background-position:center}
.sk-tecknad{background-image:${TECKNAD}}
.sk-text{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}
.sk-text b{font-size:15px;font-weight:700;color:var(--txt);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.sk-text small{font-size:12.5px;color:var(--txt2);line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.sk-pil{color:var(--sea);font-size:16px;flex-shrink:0}
.sk-krediter{font-size:11px;color:var(--txt3,#52717f);margin:10px 0 0;line-height:1.5}
.sk-val{display:flex;gap:8px;flex-wrap:wrap}
.sk-val button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border-radius:999px;border:1px solid rgba(150,110,60,.22);cursor:pointer;background:var(--white);color:var(--txt)}
.sk-val button:hover{border-color:var(--acc-knapp,#b5591a)}
.sk-val button.pa{background:var(--acc-knapp,#b5591a);border-color:var(--acc-knapp,#b5591a);color:#fff}
.sk-val button.tom{opacity:.55}
.sk-tomt{background:var(--white);border:1px dashed rgba(150,110,60,.3);border-radius:14px;padding:14px 16px;color:var(--txt2);font-size:14px;margin:0}
.sk-tomt a{color:var(--sea);font-weight:700}
.sk-mer{margin-top:12px;border:none;background:none;color:var(--sea);font:inherit;font-weight:700;font-size:14px;cursor:pointer;padding:0}
.sk-etikett{display:block;font-size:12px;font-weight:700;color:var(--acc-text,#a8501a);text-transform:uppercase;letter-spacing:.08em;margin:0 0 6px}
.sk-kust{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--txt3,#52717f);margin:12px 0 6px}
.sk-foto{position:relative;margin:0;border-radius:16px;overflow:hidden;height:230px;background:#e9dcc6}
.sk-foto img{width:100%;height:100%;object-fit:cover;display:block}
.sk-foto figcaption{position:absolute;left:0;right:0;bottom:0;padding:18px 14px 8px;font-size:11px;color:rgba(255,255,255,.95);background:linear-gradient(transparent,rgba(0,0,0,.5));white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sk-foto figcaption a{color:#fff}
@media (max-width:640px){.sk-grid{grid-template-columns:1fr}.sk-foto{height:170px}}
`
