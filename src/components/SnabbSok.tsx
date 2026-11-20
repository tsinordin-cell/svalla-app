'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: snabbsök på startsidan, efter förebild från nyctourism.com (Max).
 * Skriv en ö, krog, hamn, boende, region eller guide. Förslagen visas medan man skriver,
 * och Enter eller ett klick tar en direkt dit. Hittas inget går sökningen till /sok.
 *
 * Sökregistret hämtas från /api/sokindex först när någon börjar använda rutan,
 * så startsidan laddar lika snabbt som förut.
 */
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Post = { t: string; k: string; h: string; u?: string }

const ORDNING: Record<string, number> = { 'Ö': 0, Region: 0, Ort: 0, Nationalpark: 0, Krog: 1, Hamn: 1, Boende: 1, Guide: 2 }
const norm = (s: string) => s.toLocaleLowerCase('sv').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
const EXEMPEL = ['Sandhamn', 'Marstrand', 'Grinda', 'Utö', 'Gotska Sandön']

function traffar(index: Post[], q: string): Post[] {
  const n = norm(q.trim())
  if (n.length < 2) return []
  const med: { p: Post; poang: number }[] = []
  for (const p of index) {
    const t = norm(p.t)
    let poang = -1
    if (t.startsWith(n)) poang = 0
    else if (t.split(/[\s,:()-]+/).some(o => o.startsWith(n))) poang = 1
    else if (t.includes(n)) poang = 2
    else if (p.u && norm(p.u).startsWith(n) && p.k !== 'Guide') poang = 3
    if (poang >= 0) med.push({ p, poang: poang * 10 + (ORDNING[p.k] ?? 3) })
  }
  med.sort((a, b) => a.poang - b.poang || a.p.t.localeCompare(b.p.t, 'sv'))
  const sedda = new Set<string>()
  return med.map(m => m.p).filter(p => { const k = p.k + p.t + p.h; if (sedda.has(k)) return false; sedda.add(k); return true }).slice(0, 8)
}

export default function SnabbSok() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [index, setIndex] = useState<Post[] | null>(null)
  const [oppen, setOppen] = useState(false)
  const [aktiv, setAktiv] = useState(0)
  const laddar = useRef(false)
  const rot = useRef<HTMLDivElement>(null)

  const ladda = () => {
    if (index || laddar.current) return
    laddar.current = true
    fetch('/api/sokindex').then(r => r.json()).then((d: Post[]) => setIndex(d)).catch(() => { laddar.current = false })
  }
  useEffect(() => {
    const stang = (e: MouseEvent) => { if (rot.current && !rot.current.contains(e.target as Node)) setOppen(false) }
    document.addEventListener('mousedown', stang)
    return () => document.removeEventListener('mousedown', stang)
  }, [])

  const lista = index ? traffar(index, q) : []
  const ga = (p?: Post) => {
    if (p) router.push(p.h)
    else if (q.trim()) router.push(`/sok?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="ss" ref={rot}>
      <style>{SS_CSS}</style>
      <form className="ss-rad" role="search" onSubmit={e => { e.preventDefault(); ga(lista[aktiv]) }}>
        <svg className="ss-lupp" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input
          type="search" value={q} placeholder="Sök ö, krog, hamn, boende eller guide"
          aria-label="Sök på Svalla" aria-autocomplete="list" aria-expanded={oppen && lista.length > 0} aria-controls="ss-lista"
          onFocus={() => { ladda(); setOppen(true) }}
          onChange={e => { ladda(); setQ(e.target.value); setOppen(true); setAktiv(0) }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') { e.preventDefault(); setAktiv(a => Math.min(a + 1, Math.max(lista.length - 1, 0))) }
            else if (e.key === 'ArrowUp') { e.preventDefault(); setAktiv(a => Math.max(a - 1, 0)) }
            else if (e.key === 'Escape') setOppen(false)
          }}
        />
        <button type="submit" className="ss-knapp">Sök</button>
      </form>

      {oppen && q.trim().length >= 2 && (
        <ul id="ss-lista" className="ss-lista" role="listbox">
          {!index && <li className="ss-tom">Laddar…</li>}
          {index && lista.length === 0 && <li className="ss-tom">Ingen direkt träff. Tryck Enter för att söka på hela Svalla.</li>}
          {lista.map((p, i) => (
            <li key={p.k + p.h + p.t} role="option" aria-selected={i === aktiv}>
              <button type="button" className={i === aktiv ? 'ss-post ss-aktiv' : 'ss-post'} onMouseEnter={() => setAktiv(i)} onClick={() => ga(p)}>
                <span className={`ss-typ ss-typ-${p.k === 'Ö' ? 'o' : p.k.toLowerCase()}`}>{p.k}</span>
                <span className="ss-titel">{p.t}</span>
                {p.u && <span className="ss-under">{ORDNING[p.k] === 0 ? p.u : `på ${p.u}`}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="ss-exempel" aria-label="Exempel">
        {EXEMPEL.map(x => (
          <button key={x} type="button" onClick={() => { ladda(); setQ(x); setOppen(true); setAktiv(0) }}>{x}</button>
        ))}
      </div>
    </div>
  )
}

const SS_CSS = `
.ss{position:relative;max-width:760px;margin:26px 0 8px}
.ss-rad{display:flex;align-items:center;gap:10px;background:var(--white,#fffdf8);border:1px solid rgba(150,110,60,.2);border-radius:999px;padding:8px 8px 8px 20px;box-shadow:0 8px 26px rgba(90,60,20,.10)}
.ss-rad:focus-within{border-color:var(--sea,#1e5c82);box-shadow:0 8px 26px rgba(30,92,130,.18)}
.ss-lupp{color:var(--sea,#1e5c82);flex-shrink:0}
.ss-rad input{flex:1;min-width:0;border:none;outline:none;background:transparent;font:inherit;font-size:17px;color:var(--txt,#192830);padding:10px 0}
.ss-rad input::placeholder{color:#7b8a90}
.ss-rad input::-webkit-search-cancel-button{display:none}
.ss-knapp{flex-shrink:0;height:46px;padding:0 26px;border:none;border-radius:999px;background:var(--sea,#1e5c82);color:#fff;font:inherit;font-size:15px;font-weight:700;cursor:pointer}
.ss-knapp:hover{filter:brightness(1.1)}
.ss-lista{position:absolute;left:0;right:0;top:72px;z-index:30;list-style:none;margin:0;padding:8px;background:var(--white,#fffdf8);border:1px solid rgba(150,110,60,.18);border-radius:18px;box-shadow:0 18px 40px rgba(60,40,15,.16)}
.ss-post{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:none;background:none;padding:10px 12px;border-radius:12px;cursor:pointer;font:inherit}
.ss-aktiv{background:rgba(30,92,130,.07)}
.ss-typ{flex-shrink:0;min-width:58px;text-align:center;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:4px 8px;border-radius:999px;background:rgba(30,92,130,.1);color:var(--sea,#1e5c82)}
.ss-typ-krog,.ss-typ-boende{background:rgba(201,110,42,.12);color:var(--acc-text,#a8501a)}
.ss-typ-guide{background:rgba(82,113,127,.12);color:#3d5865}
.ss-titel{font-size:15px;font-weight:600;color:var(--txt,#192830);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ss-under{margin-left:auto;flex-shrink:0;font-size:13px;color:var(--txt3,#52717f)}
.ss-tom{padding:12px;font-size:14px;color:var(--txt2,#3d5865)}
.ss-exempel{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.ss-exempel button{font:inherit;font-size:13px;font-weight:600;padding:7px 14px;border-radius:999px;border:none;background:#1f2a30;color:#fff;cursor:pointer}
.ss-exempel button:hover{background:var(--sea,#1e5c82)}
@media (max-width:640px){.ss-rad{padding:6px 6px 6px 14px}.ss-rad input{font-size:16px}.ss-knapp{height:42px;padding:0 18px}.ss-under{display:none}}
`
