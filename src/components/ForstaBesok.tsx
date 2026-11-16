'use client'
/**
 * ForstaBesok: Thorkel hälsar besökare som inte är inloggade och ställer tre snabba frågor
 * (Claes Dahlstrand 2026-11-15). Liten ruta längst ner, aldrig ett fönster som täcker sidan.
 *
 * När den visas (Max 2026-11-15: "alltid för alla som inte är inloggade"):
 * - för alla utloggade, en gång per besök (session), 10 sekunder in eller direkt på andra sidan
 * - stänger man rutan visas den inte igen under samma besök, men nästa gång
 * - har man redan svarat visas "Välkommen tillbaka" med tips utifrån svaren i stället för frågorna
 * - aldrig för inloggade, aldrig på inloggnings- och appsidor, aldrig samtidigt som cookiebannern
 *
 * Svaren sparas bara i den här webbläsaren (localStorage) och används direkt: Thorkel ger
 * tips utifrån dem, och startsidan visar "Utvalt för dig" under sökrutan.
 */
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { track } from '@/lib/analytics-events'

const PROFIL = 'svalla_profil'
const KONTO_KLICK = 'svalla_forsta_besok'          // 'konto' = har gått vidare till kontoskapande
const VISAD_SESSION = 'svalla_thorkel_visad'
const SIDVISNINGAR = 'svalla_sidvisningar'
const INTE_HAR = ['/logga-in', '/kom-igang', '/registrera', '/onboarding', '/admin', '/team', '/feed', '/profil', '/spara', '/sparade', '/logga', '/notiser', '/planera', '/meddelanden', '/min-skargard', '/glomt-losenord', '/auth', '/julkalender']

const FRAGOR = [
  { id: 'hur_ofta', text: 'Hur ofta besöker du skärgården?', svar: ['Varje sommar', 'Några gånger om året', 'Sällan, men jag vill mer', 'Aldrig, än'] },
  { id: 'bat', text: 'Hur tar du dig oftast ut?', svar: ['Med egen båt', 'Med skärgårdsbåt eller färja', 'Med vänners båt', 'Paddlar'] },
  { id: 'gora', text: 'Vad gör du helst i skärgården?', svar: ['Naturen och bad', 'Äter gott på krogar', 'Bor över flera dagar', 'Seglar och upptäcker'] },
] as const

type Profil = Record<string, string>
type Tips = { text: string; href: string }

/** Tre tips utifrån svaren. Alla länkar går till befintliga sidor på svalla.se. */
export function tipsFor(p: Profil): Tips[] {
  const ut: Tips[] = []
  const lagg = (t: Tips) => { if (!ut.some(x => x.href === t.href)) ut.push(t) }
  if (p.bat === 'Med egen båt' || p.bat === 'Med vänners båt') { lagg({ text: 'Hamnar och bryggor', href: '/hamnar-och-bryggor' }); lagg({ text: 'Naturhamnar', href: '/naturhamnar' }) }
  if (p.bat === 'Med skärgårdsbåt eller färja') { lagg({ text: 'Färjor och båttider', href: '/farjor' }); lagg({ text: 'Öar utan bil', href: '/oar/utan-bil' }) }
  if (p.bat === 'Paddlar') { lagg({ text: 'Kajak i skärgården', href: '/aktivitet/kajak' }) }
  if (p.gora === 'Naturen och bad') { lagg({ text: 'Bastu och bad', href: '/bastu-och-bad' }); lagg({ text: 'Vandring och natur', href: '/vandring-och-natur' }) }
  if (p.gora === 'Äter gott på krogar') lagg({ text: 'Restauranger och caféer', href: '/krogar-och-mat' })
  if (p.gora === 'Bor över flera dagar') lagg({ text: 'Boende i skärgården', href: '/boende' })
  if (p.gora === 'Seglar och upptäcker') lagg({ text: 'Segelrutter', href: '/segelrutter' })
  if (p.hur_ofta === 'Aldrig, än' || p.hur_ofta === 'Sällan, men jag vill mer') lagg({ text: 'Dagsturer för nybörjare', href: '/resetips?typ=dagsutflykt' })
  if (ut.length < 3) lagg({ text: 'Dagsplaner och resetips', href: '/resetips' })
  return ut.slice(0, 3)
}

function lasProfil(): Profil | null {
  try { const p = JSON.parse(localStorage.getItem(PROFIL) || 'null') as Profil | null; return p && Object.keys(p).length >= 2 ? p : null } catch { return null }
}

/** Startsidan: "Utvalt för dig" under sökrutan för den som har svarat. */
function visaUtvaltPaStartsidan(p: Profil) {
  const hint = document.querySelector('.hero-search-hint')
  if (!hint || document.getElementById('utvalt-for-dig')) return
  const rad = document.createElement('div')
  rad.id = 'utvalt-for-dig'
  rad.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;margin:10px 0 0;font-size:13px;color:rgba(255,255,255,.85)'
  const rubrik = document.createElement('span'); rubrik.textContent = 'Utvalt för dig:'; rubrik.style.fontWeight = '700'
  rad.appendChild(rubrik)
  for (const t of tipsFor(p)) {
    const a = document.createElement('a'); a.href = t.href; a.textContent = t.text
    a.style.cssText = 'color:#fff;text-decoration:none;font-weight:600;padding:6px 12px;border-radius:20px;background:rgba(201,110,42,.85)'
    rad.appendChild(a)
  }
  hint.insertAdjacentElement('afterend', rad)
}

type Lage = 'dold' | 'halsning' | 'tillbaka' | 'fraga' | 'klar'

export default function ForstaBesok() {
  const path = usePathname() ?? ''
  const [lage, setLage] = useState<Lage>('dold')
  const [steg, setSteg] = useState(0)
  const [svar, setSvar] = useState<Profil>({})

  // Startsidan visar tips för den som redan svarat (även inloggade som svarade innan de skapade konto)
  useEffect(() => {
    if (path !== '/') return
    const p = lasProfil(); if (!p) return
    const t = setTimeout(() => visaUtvaltPaStartsidan(p), 300)
    return () => clearTimeout(t)
  }, [path])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let avbruten = false
    try {
      if (localStorage.getItem(KONTO_KLICK) === 'konto') return
      if (sessionStorage.getItem(VISAD_SESSION)) return
      if (INTE_HAR.some(p => path === p || path.startsWith(p + '/'))) return
      const visningar = Number(sessionStorage.getItem(SIDVISNINGAR) || '0') + 1
      sessionStorage.setItem(SIDVISNINGAR, String(visningar))
      createClient().auth.getSession().then(({ data }) => {
        if (avbruten || data.session) return
        // Vänta tills cookiebannern är besvarad, så att två rutor aldrig ligger ovanpå varandra
        const visa = () => {
          if (avbruten) return
          if (!localStorage.getItem('svalla_cookie_consent')) { timer = setTimeout(visa, 5000); return }
          sessionStorage.setItem(VISAD_SESSION, '1')
          const p = lasProfil()
          if (p) { setSvar(p); setLage('tillbaka') } else setLage('halsning')
          track('forsta_besok', { steg: 'visad' })
        }
        if (visningar >= 2) visa(); else timer = setTimeout(visa, 10000)
      }).catch(() => {})
    } catch { /* privat läge: visa inget */ }
    return () => { avbruten = true; if (timer) clearTimeout(timer) }
  }, [path])

  const stang = (steg: 'nej' | 'klar') => { track('forsta_besok', { steg }); setLage('dold') }
  const valj = (id: string, val: string) => {
    const nya = { ...svar, [id]: val }
    setSvar(nya)
    track('forsta_besok', { steg: 'ja', fraga: id, svar: val })
    try { localStorage.setItem(PROFIL, JSON.stringify(nya)) } catch {}
    if (steg + 1 < FRAGOR.length) setSteg(steg + 1)
    else { setLage('klar'); if (path === '/') visaUtvaltPaStartsidan(nya) }
  }
  const tillKonto = () => { try { localStorage.setItem(KONTO_KLICK, 'konto') } catch {}; track('forsta_besok', { steg: 'konto' }) }
  const kontoLank = `/logga-in?mode=ny&returnTo=${encodeURIComponent(path || '/')}`

  if (lage === 'dold') return null
  const fraga = FRAGOR[steg]
  const tips = (lage === 'klar' || lage === 'tillbaka') ? tipsFor(svar) : []
  return (
    <div className="fb-ruta" role="dialog" aria-label="Thorkel, Svallas skärgårdsguide">
      <button type="button" className="fb-stang" aria-label="Stäng" onClick={() => stang('nej')}>×</button>
      <div className="fb-topp">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/thorkel-avatar.svg" alt="" width={40} height={40} />
        <div className="fb-namn">Thorkel<span>Svallas skärgårdsguide</span></div>
      </div>
      {lage === 'halsning' && (
        <>
          <p className="fb-text">Hej, kul att du hittat Svalla! Får jag ställa tre snabba frågor, så att sidan passar dig bättre?</p>
          <div className="fb-knappar">
            <button type="button" className="fb-ja" onClick={() => { track('forsta_besok', { steg: 'ja' }); setLage('fraga') }}>Ja, självklart!</button>
            <button type="button" className="fb-nej" onClick={() => stang('nej')}>Ta mig ut i skärgården direkt</button>
          </div>
        </>
      )}
      {lage === 'fraga' && fraga && (
        <>
          <div className="fb-steg">Fråga {steg + 1} av {FRAGOR.length}</div>
          <p className="fb-text"><b>{fraga.text}</b></p>
          <div className="fb-val">
            {fraga.svar.map(v => <button key={v} type="button" onClick={() => valj(fraga.id, v)}>{v}</button>)}
          </div>
        </>
      )}
      {(lage === 'klar' || lage === 'tillbaka') && (
        <>
          <p className="fb-text">{lage === 'klar' ? 'Tack! Här är tre tips utifrån dina svar:' : 'Välkommen tillbaka! Här är tips utifrån dina svar:'}</p>
          <div className="fb-tips">
            {tips.map(t => <a key={t.href} href={t.href} onClick={() => stang('klar')}>{t.text} →</a>)}
          </div>
          <p className="fb-text">Vill du att Svalla kommer ihåg dig? Skapa ett gratis konto med din mejladress.</p>
          <div className="fb-knappar">
            <a className="fb-ja" href={kontoLank} onClick={tillKonto}>Skapa gratis konto</a>
            <button type="button" className="fb-nej" onClick={() => stang('klar')}>Inte nu</button>
          </div>
          <p className="fb-liten">Svaren ligger bara i din webbläsare tills du skapar konto.</p>
        </>
      )}
      <style>{`
        .fb-ruta{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9000;width:min(360px,calc(100vw - 32px));background:#fff;border-radius:18px;padding:16px 16px 14px;box-shadow:0 18px 50px rgba(7,26,44,.28);color:#162d3a;animation:fbIn .35s ease-out}
        @keyframes fbIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .fb-stang{position:absolute;top:8px;right:10px;background:none;border:0;font-size:22px;line-height:1;color:#8ea7b1;cursor:pointer}
        .fb-topp{display:flex;align-items:center;gap:10px;margin-bottom:8px}
        .fb-topp img{border-radius:50%}
        .fb-namn{font-weight:800;font-size:14px;display:flex;flex-direction:column}
        .fb-namn span{font-weight:500;font-size:12px;color:#54737f}
        .fb-text{font-size:14px;line-height:1.5;margin:4px 0 10px}
        .fb-steg{font-size:11px;font-weight:700;letter-spacing:.08em;color:#c96e2a;text-transform:uppercase}
        .fb-knappar{display:flex;flex-direction:column;gap:8px}
        .fb-ja{display:block;text-align:center;background:#1e5c82;color:#fff;border:0;border-radius:12px;padding:11px 14px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none}
        .fb-nej{background:none;border:1px solid #d6e2e8;border-radius:12px;padding:10px 14px;font-weight:600;font-size:13px;color:#1e5c82;cursor:pointer}
        .fb-val{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .fb-val button{background:#f2f8fa;border:1px solid #d6e2e8;border-radius:12px;padding:10px 8px;font-size:13px;font-weight:600;color:#162d3a;cursor:pointer;text-align:center}
        .fb-val button:hover{border-color:#1e5c82}
        .fb-tips{display:flex;flex-direction:column;gap:6px;margin:0 0 12px}
        .fb-tips a{display:block;background:#f2f8fa;border-radius:10px;padding:9px 12px;font-size:13.5px;font-weight:700;color:#1e5c82;text-decoration:none}
        .fb-liten{font-size:11.5px;color:#54737f;margin:10px 0 0}
      `}</style>
    </div>
  )
}
