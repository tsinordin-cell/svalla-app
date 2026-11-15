'use client'
/**
 * ForstaBesok: Thorkel hälsar nya besökare välkomna och ställer tre snabba frågor
 * (Claes Dahlstrand 2026-11-15). Visas som en liten ruta längst ner, aldrig som ett
 * fönster som täcker sidan, efter 10 sekunder eller på andra sidvisningen.
 * Bara för utloggade, bara en gång per webbläsare, aldrig på inloggnings- och appsidor.
 * Svaren sparas bara i den här webbläsaren (localStorage) och skickas som anonyma
 * händelser till statistiken. Konto skapas först om besökaren själv väljer det.
 */
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { track } from '@/lib/analytics-events'

const NYCKEL = 'svalla_forsta_besok'
const PROFIL = 'svalla_profil'
const SIDVISNINGAR = 'svalla_sidvisningar'
const INTE_HAR = ['/logga-in', '/kom-igang', '/registrera', '/onboarding', '/admin', '/team', '/feed', '/profil', '/spara', '/sparade', '/logga', '/notiser', '/planera', '/meddelanden', '/min-skargard', '/glomt-losenord', '/auth', '/julkalender']

const FRAGOR = [
  { id: 'hur_ofta', text: 'Hur ofta besöker du skärgården?', svar: ['Varje sommar', 'Några gånger om året', 'Sällan, men jag vill mer', 'Aldrig, än'] },
  { id: 'bat', text: 'Hur tar du dig oftast ut?', svar: ['Med egen båt', 'Med skärgårdsbåt eller färja', 'Med vänners båt', 'Paddlar'] },
  { id: 'gora', text: 'Vad gör du helst i skärgården?', svar: ['Naturen och bad', 'Äter gott på krogar', 'Bor över flera dagar', 'Seglar och upptäcker'] },
] as const

type Lage = 'dold' | 'halsning' | 'fraga' | 'klar'

export default function ForstaBesok() {
  const path = usePathname() ?? ''
  const [lage, setLage] = useState<Lage>('dold')
  const [steg, setSteg] = useState(0)
  const [svar, setSvar] = useState<Record<string, string>>({})

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let avbruten = false
    try {
      if (localStorage.getItem(NYCKEL)) return
      if (INTE_HAR.some(p => path === p || path.startsWith(p + '/'))) return
      const visningar = Number(sessionStorage.getItem(SIDVISNINGAR) || '0') + 1
      sessionStorage.setItem(SIDVISNINGAR, String(visningar))
      createClient().auth.getSession().then(({ data }) => {
        if (avbruten || data.session) return
        // Vänta tills cookiebannern är besvarad, så att två rutor aldrig ligger ovanpå varandra
        const visa = () => { if (avbruten) return; if (!localStorage.getItem('svalla_cookie_consent')) { timer = setTimeout(visa, 5000); return }; setLage('halsning'); track('forsta_besok', { steg: 'visad' }) }
        if (visningar >= 2) visa(); else timer = setTimeout(visa, 10000)
      }).catch(() => {})
    } catch { /* privat läge: visa inget */ }
    return () => { avbruten = true; if (timer) clearTimeout(timer) }
  }, [path])

  const stang = (steg: 'nej' | 'klar') => {
    try { localStorage.setItem(NYCKEL, steg) } catch {}
    track('forsta_besok', { steg })
    setLage('dold')
  }
  const valj = (id: string, val: string) => {
    const nya = { ...svar, [id]: val }
    setSvar(nya)
    track('forsta_besok', { steg: 'ja', fraga: id, svar: val })
    try { localStorage.setItem(PROFIL, JSON.stringify(nya)) } catch {}
    if (steg + 1 < FRAGOR.length) setSteg(steg + 1); else setLage('klar')
  }

  if (lage === 'dold') return null
  const fraga = FRAGOR[steg]
  return (
    <div className="fb-ruta" role="dialog" aria-label="Thorkel hälsar dig välkommen">
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
            <button type="button" className="fb-ja" onClick={() => { track('forsta_besok', { steg: 'ja' }); setLage('fraga') }}>Ja, självklart</button>
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
      {lage === 'klar' && (
        <>
          <p className="fb-text">Tack! Vill du spara dina svar till nästa gång? Skapa ett gratis konto med din mejladress, så kommer Svalla ihåg dig.</p>
          <div className="fb-knappar">
            <a className="fb-ja" href={`/logga-in?mode=ny&returnTo=${encodeURIComponent(path || '/')}`} onClick={() => { try { localStorage.setItem(NYCKEL, 'konto') } catch {}; track('forsta_besok', { steg: 'konto' }) }}>Ja, spara mina svar</a>
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
        .fb-text{font-size:14px;line-height:1.5;margin:4px 0 12px}
        .fb-steg{font-size:11px;font-weight:700;letter-spacing:.08em;color:#c96e2a;text-transform:uppercase}
        .fb-knappar{display:flex;flex-direction:column;gap:8px}
        .fb-ja{display:block;text-align:center;background:#1e5c82;color:#fff;border:0;border-radius:12px;padding:11px 14px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none}
        .fb-nej{background:none;border:1px solid #d6e2e8;border-radius:12px;padding:10px 14px;font-weight:600;font-size:13px;color:#1e5c82;cursor:pointer}
        .fb-val{display:grid;grid-template-columns:1fr 1fr;gap:8px}
        .fb-val button{background:#f2f8fa;border:1px solid #d6e2e8;border-radius:12px;padding:10px 8px;font-size:13px;font-weight:600;color:#162d3a;cursor:pointer;text-align:center}
        .fb-val button:hover{border-color:#1e5c82}
        .fb-liten{font-size:11.5px;color:#54737f;margin:10px 0 0}
      `}</style>
    </div>
  )
}
