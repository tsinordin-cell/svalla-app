'use client'
/**
 * Rullgardinerna har exakt startsidans utseende (mörk panel, en kolumn, orange rubriker).
 * SidHuvud: samma blå sidhuvud på alla publika undersidor (Claes 2026-11-15).
 * FÖRHANDSVISNING 2026-11-19: menyn kommer från src/lib/meny.ts, samma lista som
 * startsidan använder. På dator: rullgardiner. I mobil: knappen Meny öppnar en
 * panel med samma punkter och undermenyer, så att inget bara finns på dator.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SvallaLogo from '@/components/SvallaLogo'
import { MENY, MITT_SVALLA, type MenyPunkt } from '@/lib/meny'

export default function SidHuvud() {
  const path = usePathname() ?? ''
  const [oppen, setOppen] = useState(false)
  useEffect(() => { setOppen(false) }, [path])
  useEffect(() => {
    if (!oppen) return
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOppen(false) }
    window.addEventListener('keydown', esc)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [oppen])
  const aktiv = (m: MenyPunkt) => m.aktivFor.some(p => p.endsWith('/') ? path.startsWith(p) : path === p || path.startsWith(p + '/'))
  const arSidan = (href: string) => href.split('?')[0] === path && !href.includes('?')

  return (
    <header className="sidhuvud mork-yta">
      <div className="sidhuvud-rad">
        <Link href="/" className="sidhuvud-logga" aria-label="Svalla, till startsidan">
          <SvallaLogo height={24} color="#ffffff" />
        </Link>
        <nav className="sidhuvud-meny" aria-label="Huvudmeny">
          {MENY.map(m => (
            <div key={m.href} className="sidhuvud-punkt">
              <Link href={m.href} className={aktiv(m) ? 'aktiv' : undefined} aria-current={aktiv(m) ? 'page' : undefined}>
                {m.text}<span className="pil" aria-hidden>▾</span>
              </Link>
              <div className="sidhuvud-panel">
                <div className="sidhuvud-panel-inre">
                  {m.grupper.map((g, i) => (
                    <div key={i}>
                      {i > 0 && <div className="sidhuvud-panel-linje" />}
                      {g.rubrik && <div className="sidhuvud-panel-rubrik">{g.rubrik}</div>}
                      {g.lankar.map(l => <Link key={l.href} href={l.href} aria-current={arSidan(l.href) ? 'page' : undefined}>{l.text}</Link>)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>
        <form action="/sok" method="get" role="search" className="sidhuvud-sok">
          <input type="search" name="q" placeholder="Sök ö, hamn eller krog" aria-label="Sök på Svalla" />
        </form>
        <div className="sidhuvud-konto sidhuvud-punkt">
          <Link href="/kom-igang" className="sidhuvud-knapp">Mitt Svalla<span className="pil" aria-hidden>▾</span></Link>
          <div className="sidhuvud-panel hoger">
            <div className="sidhuvud-panel-inre">
              {MITT_SVALLA.map((g, i) => (
                <div key={g.rubrik}>
                  {i > 0 && <div className="sidhuvud-panel-linje" />}
                  <div className="sidhuvud-panel-rubrik">{g.rubrik}</div>
                  {g.lankar.map(l => <Link key={l.href} href={l.href}>{l.text}</Link>)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="button" className="sidhuvud-menyknapp" aria-expanded={oppen} aria-controls="sidhuvud-mobil" onClick={() => setOppen(o => !o)}>
          {oppen ? '✕ Stäng' : '☰ Meny'}
        </button>
      </div>

      {oppen && (
        <div id="sidhuvud-mobil" className="sidhuvud-mobil" role="dialog" aria-label="Meny">
          <form action="/sok" method="get" role="search" className="sidhuvud-mobil-sok">
            <input type="search" name="q" placeholder="Sök ö, hamn eller krog" aria-label="Sök på Svalla" />
          </form>
          {[...MENY.map(m => ({ titel: m.text, grupper: m.grupper, aktiv: aktiv(m) })), { titel: 'Mitt Svalla', grupper: MITT_SVALLA, aktiv: false }].map(p => (
            <details key={p.titel} open={p.aktiv}>
              <summary>{p.titel}</summary>
              <div className="sidhuvud-mobil-lankar">
                {p.grupper.map((g, i) => (
                  <div key={i}>
                    {g.rubrik && <div className="sidhuvud-panel-rubrik">{g.rubrik}</div>}
                    {g.lankar.map(l => <Link key={l.href} href={l.href} onClick={() => setOppen(false)}>{l.text}</Link>)}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}

      <style>{`
        .sidhuvud{background:linear-gradient(90deg,#0d2440 0%,#164a6b 100%);border-bottom:1px solid rgba(255,255,255,.08);position:relative;z-index:40}
        .sidhuvud-rad{display:flex;align-items:center;gap:16px;min-height:64px;padding:0 40px}
        .sidhuvud-logga{display:inline-flex;align-items:center;flex-shrink:0;text-decoration:none;margin-right:8px}
        .sidhuvud-meny{display:flex;align-items:center;justify-content:center;gap:2px;flex:1}
        .sidhuvud-punkt{position:relative}
        .sidhuvud-punkt>a{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,.88);text-decoration:none;font-size:14px;font-weight:600;padding:8px 13px;border-radius:999px;white-space:nowrap}
        .sidhuvud-punkt>a .pil{font-size:9px;opacity:.55}
        .sidhuvud-punkt>a:hover,.sidhuvud-punkt:focus-within>a{color:#fff;background:rgba(255,255,255,.08)}
        .sidhuvud-punkt>a.aktiv{color:#fff;background:rgba(255,255,255,.14)}
        .sidhuvud-panel{position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(-4px);padding-top:10px;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:50}
        .sidhuvud-punkt:hover .sidhuvud-panel,.sidhuvud-punkt:focus-within .sidhuvud-panel{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
        .sidhuvud-panel.hoger,.sidhuvud-punkt:hover .sidhuvud-panel.hoger,.sidhuvud-punkt:focus-within .sidhuvud-panel.hoger{left:auto;right:0;transform:none}
        .sidhuvud-panel-inre{background:rgba(10,28,40,.97);-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.45);padding:10px;min-width:240px;max-height:calc(100vh - 100px);overflow-y:auto;overscroll-behavior:contain}
        .sidhuvud-panel-linje{height:1px;background:rgba(255,255,255,.08);margin:6px 8px}
        .sidhuvud-panel-rubrik{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#e8924a;padding:10px 14px 4px;white-space:nowrap}
        .sidhuvud-panel-inre a{display:block;color:rgba(255,255,255,.82);text-decoration:none;font-size:13.5px;font-weight:500;letter-spacing:.01em;padding:9px 14px;border-radius:8px;white-space:nowrap;transition:background .14s,color .14s}
        .sidhuvud-panel-inre a:hover,.sidhuvud-panel-inre a:focus{background:rgba(255,255,255,.07);color:#fff;outline:none}
        .sidhuvud-panel-inre a[aria-current="page"]{color:#fff;font-weight:700}
        .sidhuvud-sok input{width:210px;padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.12);color:#fff;font:inherit;font-size:13px;outline:none}
        .sidhuvud-sok input::placeholder{color:rgba(255,255,255,.7)}
        .sidhuvud-sok input:focus{background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.5)}
        .sidhuvud-konto{display:flex;align-items:center;flex-shrink:0}
        .sidhuvud-punkt>a.sidhuvud-knapp,.sidhuvud-punkt:focus-within>a.sidhuvud-knapp{color:#fff;background:var(--acc-knapp,#b5591a)}
        .sidhuvud-punkt:hover>a.sidhuvud-knapp{color:#fff;background:var(--acc-knapp,#b5591a);filter:brightness(1.08)}
        .sidhuvud-knapp{background:var(--acc-knapp,#b5591a);color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:9px 16px;border-radius:999px;white-space:nowrap}
        .sidhuvud-menyknapp{display:none;margin-left:auto;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.3);color:#fff;font:inherit;font-size:13px;font-weight:700;padding:8px 12px;border-radius:10px;cursor:pointer}
        .sidhuvud-mobil{position:fixed;inset:64px 0 0 0;background:#0d2440;overflow-y:auto;padding:12px 16px 40px;z-index:60}
        .sidhuvud-mobil-sok input{width:100%;padding:11px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff;font:inherit;font-size:15px;margin-bottom:8px}
        .sidhuvud-mobil-sok input::placeholder{color:rgba(255,255,255,.65)}
        .sidhuvud-mobil details{border-bottom:1px solid rgba(255,255,255,.08)}
        .sidhuvud-mobil summary{list-style:none;cursor:pointer;color:#fff;font-size:17px;font-weight:700;padding:14px 4px;display:flex;justify-content:space-between}
        .sidhuvud-mobil summary::-webkit-details-marker{display:none}
        .sidhuvud-mobil summary::after{content:'›';opacity:.5;transition:transform .2s}
        .sidhuvud-mobil details[open] summary::after{transform:rotate(90deg)}
        .sidhuvud-mobil-lankar{padding:0 4px 12px}
        .sidhuvud-mobil-lankar .sidhuvud-panel-rubrik{color:#e8924a;padding:10px 0 4px}
        .sidhuvud-mobil-lankar a{display:block;color:rgba(255,255,255,.9);text-decoration:none;font-size:15px;padding:9px 0}
        @media (max-width:1100px){
          .sidhuvud-rad{padding:0 16px;gap:10px}
          .sidhuvud-meny,.sidhuvud-sok{display:none}
          .sidhuvud-konto{margin-left:auto}
          .sidhuvud-konto .sidhuvud-panel,.sidhuvud-knapp .pil{display:none!important}
          .sidhuvud-menyknapp{display:block;margin-left:0}
        }
      `}</style>
    </header>
  )
}
