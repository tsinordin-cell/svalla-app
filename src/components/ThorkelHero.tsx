'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: Thorkel på startsidan (Max).
 * Thorkel "tänker" först (han röker på pipan, se persona.timing.minThinkMs) och skriver sedan
 * fram sin hälsning bokstav för bokstav medan munnen rör sig. Därefter kan man skriva en fråga,
 * som skickas till /guide?fraga=… där samtalet fortsätter.
 *
 * Ligger nere till vänster i heron på stor skärm, och som ett kort direkt under heron på
 * mindre skärmar. Att chatta kräver ett gratis konto (/guide), och det står i rutan.
 */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ThorkelAvatar from '@/components/thorkel/ThorkelAvatar'
import { THORKEL } from '@/lib/thorkel/persona'

const HALSNING = 'Fråga mig något om din nästa skärgårdsresa.'

export default function ThorkelHero() {
  const router = useRouter()
  const [steg, setSteg] = useState<'vantar' | 'tanker' | 'skriver' | 'klar'>('vantar')
  const [n, setN] = useState(0)
  const [q, setQ] = useState('')
  const [oppen, setOppen] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(HALSNING.length); setSteg('klar'); return }
    const t1 = setTimeout(() => setSteg('tanker'), 900)
    const t2 = setTimeout(() => setSteg('skriver'), 900 + THORKEL.timing.minThinkMs)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  useEffect(() => {
    if (steg !== 'skriver') return
    if (n >= HALSNING.length) { setSteg('klar'); return }
    const t = setTimeout(() => setN(x => x + 1), 1000 / THORKEL.timing.streamCharsPerSec)
    return () => clearTimeout(t)
  }, [steg, n])

  const skicka = (e: React.FormEvent) => {
    e.preventDefault()
    const fraga = q.trim()
    router.push(fraga ? `/guide?fraga=${encodeURIComponent(fraga)}` : '/guide')
  }

  return (
    <div className="th-ankare">
      <style>{TH_CSS}</style>
      <div className={oppen ? 'th' : 'th th-stangd'}>
        <button type="button" className="th-avatar" onClick={() => setOppen(true)} aria-label="Visa Thorkel" tabIndex={oppen ? -1 : 0}>
          <ThorkelAvatar size={64} talking={steg === 'skriver'} priority />
        </button>
        {oppen && (
          <div className="th-bubbla" role="region" aria-label="Fråga Thorkel">
            <button type="button" className="th-stang" onClick={() => setOppen(false)} aria-label="Dölj Thorkel">×</button>
            <div className="th-namn">{THORKEL.name}<span>{THORKEL.title}</span></div>
            <p className="th-text" aria-live="polite">
              {steg === 'vantar' || steg === 'tanker'
                ? <span className="th-tanker" aria-label="Thorkel skriver"><i /><i /><i /></span>
                : <>{HALSNING.slice(0, n)}{steg === 'skriver' && <span className="th-markor" aria-hidden="true" />}</>}
            </p>
            <form className={steg === 'klar' ? 'th-form th-syns' : 'th-form'} onSubmit={skicka}>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Vilken ö passar för en dagstur?" aria-label="Din fråga till Thorkel" />
              <button type="submit" aria-label="Skicka frågan">→</button>
            </form>
            <div className={steg === 'klar' ? 'th-not th-syns' : 'th-not'}>Gratis konto krävs för att chatta med Thorkel.</div>
          </div>
        )}
      </div>
    </div>
  )
}

const TH_CSS = `
.th-ankare{position:relative;z-index:4;height:0}
.th{position:absolute;left:32px;bottom:36px;display:flex;align-items:flex-end;gap:12px;max-width:380px;animation:th-in .6s ease-out both}
@keyframes th-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.th-avatar{flex-shrink:0;border:none;background:none;padding:0;cursor:pointer;border-radius:50%;box-shadow:0 0 0 3px #fffdf8,0 10px 24px rgba(5,20,40,.45);animation:th-gung 4s ease-in-out infinite}
@keyframes th-gung{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-4px) rotate(-1.5deg)}}
.th-bubbla{position:relative;background:#fffdf8;color:#14202a;border-radius:20px 20px 20px 6px;padding:14px 16px 12px;box-shadow:0 14px 34px rgba(5,20,40,.35);min-width:270px}
.th-bubbla::before{content:'';position:absolute;left:-7px;bottom:14px;width:14px;height:14px;background:#fffdf8;transform:rotate(45deg);border-radius:2px}
.th-stang{position:absolute;top:6px;right:8px;border:none;background:none;font-size:18px;line-height:1;color:#7b8a90;cursor:pointer;padding:4px}
.th-namn{font-size:12px;font-weight:800;color:#1e5c82;letter-spacing:.02em;margin-bottom:4px}
.th-namn span{font-weight:600;color:#7b8a90;margin-left:6px}
.th-text{margin:0;font-family:'Playfair Display',Georgia,serif;font-size:19px;font-weight:700;line-height:1.3;min-height:50px}
.th-markor{display:inline-block;width:2px;height:1em;background:#c96e2a;margin-left:2px;vertical-align:-2px;animation:th-blink .8s steps(1) infinite}
@keyframes th-blink{50%{opacity:0}}
.th-tanker{display:inline-flex;gap:5px;align-items:center;height:24px}
.th-tanker i{width:7px;height:7px;border-radius:50%;background:#1e5c82;opacity:.3;animation:th-dot 1.2s ease-in-out infinite}
.th-tanker i:nth-child(2){animation-delay:.15s}.th-tanker i:nth-child(3){animation-delay:.3s}
@keyframes th-dot{0%,80%,100%{opacity:.25;transform:none}40%{opacity:.95;transform:translateY(-2px)}}
.th-form{display:flex;gap:6px;margin-top:10px;opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .35s ease,transform .35s ease}
.th-form.th-syns,.th-not.th-syns{opacity:1;transform:none;pointer-events:auto}
.th-form input{flex:1;min-width:0;border:1px solid rgba(150,110,60,.25)!important;border-radius:999px;padding:9px 14px;font:inherit;font-size:14px;background:#fff!important;color:#14202a;outline:none;box-shadow:none!important}
.th-form input:focus{border-color:#1e5c82!important}
.th-form button{flex-shrink:0;width:38px;height:38px;border-radius:50%;border:none;background:#c96e2a;color:#fff;font-size:18px;font-weight:700;cursor:pointer}
.th-not{font-size:11.5px;color:#7b8a90;margin-top:7px;opacity:0;transition:opacity .35s ease .1s}
.th-stangd .th-avatar{box-shadow:0 0 0 3px #e8924a,0 10px 24px rgba(5,20,40,.45)}
@media (max-width:1180px){
  .th-ankare{height:auto;background:var(--bg,#f7f1e7);padding:18px 16px 4px}
  .th{position:static;max-width:520px;margin:0 auto;animation:none}
  .th-bubbla{flex:1;min-width:0;box-shadow:0 8px 22px rgba(60,40,15,.12);border:1px solid rgba(150,110,60,.16)}
  .th-avatar{box-shadow:0 0 0 3px #fffdf8,0 6px 16px rgba(60,40,15,.25)}
  .th-text{font-size:17px;min-height:0}
}
`
