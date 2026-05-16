'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  { id: 1, transport: 'Med bil' as Mode, title: 'Farö-dagstur – raukernas värld', distance: 'Ca 85 km fran Visby', badge: '🚗', description: 'Farö är Gotlands nordligaste ö med de groteskt vackra raukarna vid Langhammars. Kalkstensformationer sticker upp ur havet som enorma svampar. Ingmar Bergman bodde och filmade här, och onn har en stämning helt unik i Sverige.', practicalInfo: 'Bilfärja Faarösund–Farö: 5 min, gratis. Planera 4–5 h pa ön. Ta med matsäck. Öppet hela aret men bäst juni–september.' },
  { id: 2, transport: 'Med bil' as Mode, title: 'Lummelunda grottan – underjordens skatter', distance: 'Ca 15 km norr om Visby', badge: '🚗', description: 'Skandinaviens mest besökta turistgrotta. Stalaktiter och stalagmiter av kalksten bildade under miljoner aar. Guideturen tar ca 50 min och passar barn fran ca 5 ar.', practicalInfo: 'Öppet maj–sep. Guideturer var 30 min. Temperatur alltid 8°C – ta extra lager. Gratis cykelväg fran Visby.' },
  { id: 3, transport: 'Med bil' as Mode, title: 'Hoburgen – Gotlands dramatiska sydspets', distance: 'Ca 115 km söder om Visby', badge: '🚗', description: 'Gotlands sydligaste punkt: ett rakt kalkstensklint som sticker ut i Östersjön. Fyren ger hisnande utsikt. Raukar runt klintens bas formade av havet under aartusenden.', practicalInfo: 'Inga matmöjligheter – ta med. Parkering gratis. Promenad runt basen: ca 1,5 h. Kombinera med Burgsvik for lunch.' },
  { id: 4, transport: 'Med bil' as Mode, title: 'Raukar-tur – tre platser pa en dag', distance: 'Langhammars, Digerhuvud, Holmhällar', badge: '🚗', description: 'En heldagsrunda med bil tar dig förbi tre spektakulära raukplatser: Langhammars pa Farö, Digerhuvud vid Faarö-sundet och Holmhällar i söder. Varje plats har unik karaktär.', practicalInfo: 'Planera 8+ timmar. Ta med lunch och vatten. Inga inträdesavgifter. Barn älskar att klättra – passa vid vattenbryn.' },
  { id: 5, transport: 'Med bil' as Mode, title: 'Gotlands vingaardar – rosévin vid havet', distance: 'Ca 60 km söder om Visby', badge: '🚗', description: 'Sverige varmaste ö ger unika förutsättningar för vin. Bläsinge Vingaard, Gotlandsdricka & Vin och Roma Vingaard – alla erbjuder vinprovningar med havsutsikt.', practicalInfo: 'Boka vinprovning i förväg. Utse nykter förare eller ta guidad tur fran Visby.' },
  { id: 6, transport: 'Kollektivt' as Mode, title: 'Visby stadsvandring – medeltidsstaden', distance: 'Visby innerstad, ca 2 km runt', badge: '🚌', description: 'UNESCO-listad innerstad med 3,6 km medeltidsmur, pittoreska gränder och kyrkoruiner fran 1200-talet. Unikt i hela norra Europa.', practicalInfo: 'Farjan fran Nynäshamn: 3–3,5 h. Guidade turer fran turistbyran. Mur-promenad: ca 2 h.' },
  { id: 7, transport: 'Kollektivt' as Mode, title: 'Roma kloster – historiens tystnad', distance: 'Ca 18 km öster om Visby, buss 11', badge: '🚌', description: 'En av Sveriges bäst bevarade cisterciensklosterruiner fran 1100-talet. Sommartid arrangeras konserter och teater i ruinen.', practicalInfo: 'Buss 11 fran Visby, ca 35 min. Ta med matsäck.' },
  { id: 8, transport: 'Kollektivt' as Mode, title: 'Tofta strand – Gotlands bästa sandstrand', distance: 'Ca 15 km söder om Visby, buss 2', badge: '🚌', description: 'Bred, vindskyddad sandstrand med grunt varmt vatten – Gotlands bäst lämpad badstrand for barnfamiljer.', practicalInfo: 'Buss 2 fran Visby, ca 25 min. Gratis. Vattentemp: 18–22°C i juli–aug.' },
  { id: 9, transport: 'Med cykel' as Mode, title: 'Cykla runt norra Gotland', distance: 'Ca 100–120 km, 2–3 dagar', badge: '🚲', description: 'Cykeltur runt Farö och norra kusten tillbaka till Visby. Gotland är perfekt for cykling: flackt, vackert och med cykelvägar längs kusten.', practicalInfo: 'Hyr cykel i Visby. Övernatta i vandrarhem – boka i förväg.' },
  { id: 10, transport: 'Med cykel' as Mode, title: 'Visby–Ljugarn – östkustens led', distance: 'Ca 75 km, 1–2 dagar', badge: '🚲', description: 'Östra Gotland: tystare, grönare och med Ljugarn Krog som utsökt maal. Via Roma och kulturhistoriska stopp längs vägen.', practicalInfo: 'Medelnivaa-cyklister. Hyr cykel vid hamnen i Visby.' },
]

const MODES: Mode[] = ['Alla', 'Med bil', 'Kollektivt', 'Med cykel']
const MODE_COLOR: Record<Mode, string> = { 'Alla': '#0a7b8c', 'Med bil': '#1a4a5e', 'Kollektivt': '#2a7a40', 'Med cykel': '#c0392b' }

export default function GotlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg,#0d2440,#1a4a5e,#24697f)', padding: '0 20px 44px', paddingTop: 'calc(env(safe-area-inset-top,0px))' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0 20px' }}>
            <Link href="/gotland" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 10px', backdropFilter: 'blur(6px)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Gotland
            </Link>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>10 äventyr pa Gotland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 24px' }}>Raukar, medeltidsmur, vingaardar och cykelleder – Gotlands bästa upplevelser</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MODES.map(m => <button key={m} onClick={() => setActive(m)} style={{ fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: active === m ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)', color: active === m ? MODE_COLOR[m] : '#fff', transition: 'all .18s' }}>{m}</button>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link><span>›</span>
          <Link href="/gotland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Gotland</Link><span>›</span><span>Äventyr</span>
        </nav>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map(adv => (
            <article key={adv.id} style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(10,123,140,0.06)', display: 'grid', gridTemplateColumns: 'minmax(90px,110px) 1fr' }}>
              <div style={{ background: 'linear-gradient(135deg,#1a4a5e,#2a7a8a)', padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 32 }}>{adv.badge}</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: 'rgba(255,255,255,0.3)' }}>{String(adv.id).padStart(2, '0')}</span>
              </div>
              <div style={{ padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', background: MODE_COLOR[adv.transport], color: '#fff', padding: '3px 10px', borderRadius: 20 }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{adv.distance}</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.35 }}>{adv.title}</h2>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65, margin: '0 0 10px' }}>{adv.description}</p>
                <div style={{ background: 'rgba(10,123,140,0.05)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, borderLeft: '3px solid var(--sea)' }}>
                  <strong style={{ color: 'var(--sea)', fontSize: 11, textTransform: 'uppercase' as const, letterSpacing: '0.07em', display: 'block', marginBottom: 4 }}>Praktisk info</strong>
                  {adv.practicalInfo}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ marginTop: 48, padding: 28, background: 'rgba(10,123,140,0.07)', borderRadius: 18, textAlign: 'center' as const, border: '1px solid rgba(10,123,140,0.15)' }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>Redo att planera din Gotlandsresa?</p>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 20px' }}>Laat Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--sea)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: '13px 28px', borderRadius: 24 }}>Planera din tur med Thorkel →</Link>
        </div>
      </div>
    </div>
  )
}
