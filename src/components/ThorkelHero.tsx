'use client'
/**
 * FÖRHANDSVISNING 2026-11-20: Thorkel på startsidan (Max).
 *
 * Målet: att besökaren svarar på de tre frågorna och skapar ett gratis konto.
 * Därför, för den som inte är inloggad:
 * - Första frågan står direkt i bubblan. Inget "får jag fråga?"-steg, ett tryck och man är igång.
 * - Prickar visar hur långt man kommit (1 av 3).
 * - Erbjudandet står i hälsningen (Max): svara på tre frågor, så kan du fråga Thorkel vad du vill.
 * - Efter tredje svaret: EN tydlig knapp till ett gratis konto (chatten kräver konto), och
 *   tipsen utifrån svaren som små länkar under. Efter kontot skickas man till Thorkel (/guide).
 * För inloggade: "Fråga mig något om din nästa skärgårdsresa." och en frågeruta till /guide.
 *
 * En Thorkel, inte två: ForstaBesok visar inte sin egen ruta på startsidan, och efter att man
 * sett Thorkel här dyker den inte upp på nästa sida under samma besök. Samma frågor, samma
 * sparade svar (localStorage) och samma mätpunkter (forsta_besok) som ForstaBesok.
 *
 * Liten ruta nere till vänster i heron på stor skärm; på mobil ett kompakt kort direkt under heron.
 */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ThorkelAvatar from '@/components/thorkel/ThorkelAvatar'
import { THORKEL } from '@/lib/thorkel/persona'
import { createClient } from '@/lib/supabase'
import { track } from '@/lib/analytics-events'
import { FRAGOR, tipsFor, lasProfil, sparaProfil, VISAD_SESSION, KONTO_KLICK } from '@/components/ForstaBesok'

const HALSNING_GAST = 'Får jag ställa dig tre frågor, så kan du fråga mig om vilka tips som helst om skärgården?'
const HALSNING_MEDLEM = 'Fråga mig något om din nästa skärgårdsresa.'
const KONTO_LANK = '/logga-in?mode=ny&returnTo=%2Fguide'

export default function ThorkelHero() {
  // Max 2026-11-20: i mobil och på smal skärm är Thorkel en popup igen (ForstaBesok), inte ett kort under heron.
  const [stor, setStor] = useState(false)
  useEffect(() => { setStor(window.matchMedia('(min-width:1181px)').matches) }, [])
  const router = useRouter()
  const [inloggad, setInloggad] = useState<boolean | null>(null)
  const [steg, setSteg] = useState<'vantar' | 'tanker' | 'skriver' | 'klar'>('vantar')
  const [n, setN] = useState(0)
  const [oppen, setOppen] = useState(true)
  const [fragaNr, setFragaNr] = useState(0)
  const [svar, setSvar] = useState<Record<string, string>>({})
  const [visaTips, setVisaTips] = useState(false)
  const [tillbaka, setTillbaka] = useState(false)
  const [q, setQ] = useState('')

  const halsning = inloggad ? HALSNING_MEDLEM : tillbaka ? 'Välkommen tillbaka! Skapa ett gratis konto, så kan du fråga mig vad du vill.' : HALSNING_GAST

  useEffect(() => {
    try { if (window.matchMedia('(min-width:1181px)').matches) sessionStorage.setItem(VISAD_SESSION, '1') } catch { /* privat läge */ }
    const p = lasProfil()
    if (p) { setSvar(p); setTillbaka(true); setVisaTips(true) }
    createClient().auth.getSession()
      .then(({ data }) => { setInloggad(!!data.session); if (!data.session) if (window.matchMedia('(min-width:1181px)').matches) track('forsta_besok', { steg: 'visad' }) })
      .catch(() => setInloggad(false))
  }, [])

  // Thorkel tänker (pipan) och skriver sedan fram hälsningen, när vi vet vem han pratar med.
  useEffect(() => {
    if (inloggad === null) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(999); setSteg('klar'); return }
    const t1 = setTimeout(() => setSteg('tanker'), 600)
    const t2 = setTimeout(() => setSteg('skriver'), 600 + THORKEL.timing.minThinkMs)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inloggad])

  useEffect(() => {
    if (steg !== 'skriver') return
    if (n >= halsning.length) { setSteg('klar'); return }
    const t = setTimeout(() => setN(x => x + 1), 1000 / THORKEL.timing.streamCharsPerSec)
    return () => clearTimeout(t)
  }, [steg, n, halsning])

  const valj = (id: string, val: string) => {
    const nya = { ...svar, [id]: val }
    setSvar(nya)
    track('forsta_besok', { steg: 'ja', fraga: id, svar: val })
    sparaProfil(nya)
    if (fragaNr + 1 < FRAGOR.length) setFragaNr(fragaNr + 1)
    else setVisaTips(true)
  }
  const tillKonto = () => { try { localStorage.setItem(KONTO_KLICK, 'konto') } catch { /* privat läge */ }; track('forsta_besok', { steg: 'konto' }) }
  const skicka = (e: React.FormEvent) => {
    e.preventDefault()
    const f = q.trim()
    router.push(f ? `/guide?fraga=${encodeURIComponent(f)}` : '/guide')
  }

  const klar = steg === 'klar'
  const fraga = FRAGOR[fragaNr]
  const gast = inloggad === false

  if (!stor) return null
  return (
    <div className={oppen ? 'th-ankare' : 'th-ankare th-ankare-stangd'}>
      <style>{TH_CSS}</style>
      <div className={oppen ? 'th' : 'th th-stangd'}>
        <button type="button" className="th-avatar" onClick={() => setOppen(true)} aria-label="Visa Thorkel" tabIndex={oppen ? -1 : 0}>
          <ThorkelAvatar size={44} talking={steg === 'skriver'} priority />
        </button>
        {oppen && (
          <div className="th-bubbla" role="region" aria-label="Thorkel, Svallas skärgårdsguide">
            <button type="button" className="th-stang" onClick={() => { setOppen(false); if (gast) track('forsta_besok', { steg: 'nej' }) }} aria-label="Dölj Thorkel">×</button>
            <div className="th-namn">{THORKEL.name}<span>{THORKEL.title}</span></div>

            {/* Hälsningen, eller tackraden när frågorna är besvarade */}
            {visaTips && !tillbaka ? (
              <p className="th-text">Tack! Skapa ett gratis konto, så kan du fråga mig vad du vill.</p>
            ) : (
              <p className="th-text" aria-live="polite">
                {inloggad === null || steg === 'vantar' || steg === 'tanker'
                  ? <span className="th-tanker" aria-label="Thorkel skriver"><i /><i /><i /></span>
                  : <>{halsning.slice(0, n)}{steg === 'skriver' && <span className="th-markor" aria-hidden="true" />}</>}
              </p>
            )}

            <div className={klar ? 'th-mer th-syns' : 'th-mer'}>
              {/* Gäst: frågorna direkt, ett tryck per fråga */}
              {gast && !visaTips && fraga && (
                <>
                  <div className="th-fraga-rad">
                    <span className="th-fraga">{fraga.text}</span>
                    <span className="th-prickar" aria-label={`Fråga ${fragaNr + 1} av ${FRAGOR.length}`}>
                      {FRAGOR.map((_, i) => <i key={i} className={i <= fragaNr ? 'pa' : undefined} />)}
                    </span>
                  </div>
                  <div className="th-val">
                    {fraga.svar.map(v => <button key={v} type="button" onClick={() => valj(fraga.id, v)}>{v}</button>)}
                  </div>
                </>
              )}

              {/* Gäst: tips först, sedan en knapp till konto */}
              {gast && visaTips && (
                <>
                  <a className="th-konto" href={KONTO_LANK} onClick={tillKonto}>Skapa gratis konto och fråga Thorkel</a>
                  <div className="th-not">Bara din mejladress. Dina svar sparas.</div>
                  <div className="th-tips">
                    <span>Tips utifrån dina svar:</span>
                    {tipsFor(svar).map(t => <a key={t.href} href={t.href} onClick={() => track('forsta_besok', { steg: 'klar' })}>{t.text}</a>)}
                  </div>
                </>
              )}

              {/* Inloggad: fråga Thorkel direkt */}
              {inloggad && (
                <form className="th-form" onSubmit={skicka}>
                  <input value={q} onChange={e => setQ(e.target.value)} placeholder="Vilken ö passar för en dagstur?" aria-label="Din fråga till Thorkel" />
                  <button type="submit" aria-label="Skicka frågan">→</button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const TH_CSS = `
.th-ankare{position:relative;z-index:4;height:0}
.th{position:absolute;left:28px;bottom:32px;display:flex;align-items:flex-end;gap:8px;width:300px;animation:th-in .6s ease-out both}
@keyframes th-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.th-avatar{flex-shrink:0;border:none;background:none;padding:0;cursor:pointer;border-radius:50%;box-shadow:0 0 0 3px #fffdf8,0 8px 20px rgba(5,20,40,.4);animation:th-gung 4s ease-in-out infinite}
@keyframes th-gung{0%,100%{transform:translateY(0) rotate(0)}50%{transform:translateY(-3px) rotate(-1.5deg)}}
.th-bubbla{position:relative;flex:1;min-width:0;background:#fffdf8;color:#14202a;border-radius:14px 14px 14px 5px;padding:9px 11px 10px;box-shadow:0 12px 30px rgba(5,20,40,.32)}
.th-bubbla::before{content:'';position:absolute;left:-6px;bottom:12px;width:12px;height:12px;background:#fffdf8;transform:rotate(45deg);border-radius:2px}
.th-stang{position:absolute;top:4px;right:6px;border:none;background:none;font-size:17px;line-height:1;color:#93a1a7;cursor:pointer;padding:4px}
.th-namn{font-size:10.5px;font-weight:800;color:#1e5c82;margin-bottom:2px}
.th-namn span{font-weight:600;color:#93a1a7;margin-left:5px}
.th-text{margin:0;padding-right:14px;font-size:13.5px;font-weight:700;line-height:1.35;min-height:20px}
.th-markor{display:inline-block;width:2px;height:1em;background:#c96e2a;margin-left:2px;vertical-align:-2px;animation:th-blink .8s steps(1) infinite}
@keyframes th-blink{50%{opacity:0}}
.th-tanker{display:inline-flex;gap:4px;align-items:center;height:20px}
.th-tanker i{width:6px;height:6px;border-radius:50%;background:#1e5c82;opacity:.3;animation:th-dot 1.2s ease-in-out infinite}
.th-tanker i:nth-child(2){animation-delay:.15s}.th-tanker i:nth-child(3){animation-delay:.3s}
@keyframes th-dot{0%,80%,100%{opacity:.25;transform:none}40%{opacity:.95;transform:translateY(-2px)}}
.th-mer{max-height:0;overflow:hidden;opacity:0;transition:max-height .45s ease,opacity .35s ease}
.th-mer.th-syns{max-height:260px;opacity:1}
.th-fraga-rad{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:7px 0 6px}
.th-fraga{font-size:12px;font-weight:600;color:#3d5865}
.th-prickar{display:inline-flex;gap:4px;flex-shrink:0}
.th-prickar i{width:6px;height:6px;border-radius:50%;background:#d9cfbf}
.th-prickar i.pa{background:#c96e2a}
.th-val{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.th-val button{background:#fff;border:1px solid rgba(150,110,60,.25);border-radius:9px;padding:5px 6px;font:inherit;font-size:12px;font-weight:600;color:#14202a;cursor:pointer;line-height:1.25}
.th-val button:hover,.th-val button:focus-visible{border-color:#1e5c82;color:#1e5c82}
.th-tips{display:flex;flex-wrap:wrap;align-items:baseline;gap:4px 10px;margin-top:9px;padding-top:8px;border-top:1px solid rgba(150,110,60,.15);font-size:12px}
.th-tips span{color:#93a1a7;font-weight:600}
.th-tips a{font-weight:700;color:#1e5c82;text-decoration:none}
.th-tips a:hover{text-decoration:underline}
.th-konto{display:block;margin-top:10px;text-align:center;background:linear-gradient(135deg,#ec9a52,#c96e2a);color:#fff;border-radius:999px;padding:8px 10px;font-size:12.5px;font-weight:700;text-decoration:none;box-shadow:0 6px 16px rgba(201,110,42,.35)}
.th-not{font-size:11px;color:#93a1a7;margin-top:5px;text-align:center}
.th-form{display:flex;gap:6px;margin-top:9px}
.th-form input{flex:1;min-width:0;border:1px solid rgba(150,110,60,.25)!important;border-radius:999px;padding:8px 12px;font:inherit;font-size:13.5px;background:#fff!important;color:#14202a;outline:none;box-shadow:none!important}
.th-form input:focus{border-color:#1e5c82!important}
.th-form button{flex-shrink:0;width:34px;height:34px;border-radius:50%;border:none;background:#c96e2a;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
.th-stangd{width:auto}
.th-stangd .th-avatar{box-shadow:0 0 0 3px #e8924a,0 8px 20px rgba(5,20,40,.4)}
@media (max-width:1180px){
  .th-ankare{height:auto;background:var(--bg,#f7f1e7);padding:14px 14px 2px}
  .th{position:static;width:auto;max-width:460px;margin:0 auto;animation:none;gap:8px}
  .th-avatar{box-shadow:0 0 0 2px #fffdf8,0 4px 12px rgba(60,40,15,.22)}
  .th-avatar img,.th-avatar>span{width:38px!important;height:38px!important}
  .th-bubbla{box-shadow:0 6px 18px rgba(60,40,15,.1);border:1px solid rgba(150,110,60,.16)}
  .th-ankare-stangd{display:none}
}
`
