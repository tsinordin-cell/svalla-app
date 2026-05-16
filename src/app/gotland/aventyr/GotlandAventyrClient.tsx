'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  {
    id: 1, transport: 'Med bil' as Mode,
    title: 'Fårö-dagstur – raukernas värld',
    distance: 'Ca 85 km från Visby',
    description: 'Fårö är Gotlands nordligaste ö med de groteskt vackra raukarna vid Langhammars. Kalkstensformationer sticker upp ur havet som enorma svampar. Ingmar Bergman bodde och filmade här, och ön har en stämning helt unik i Sverige.',
    practicalInfo: 'Bilfärja Fårösund–Fårö: 5 min, gratis. Planera 4–5 h på ön. Ta med matsäck. Öppet hela året men bäst juni–september.',
  },
  {
    id: 2, transport: 'Med bil' as Mode,
    title: 'Lummelunda grottan – underjordens skatter',
    distance: 'Ca 15 km norr om Visby',
    description: 'Skandinaviens mest besökta turistgrotta. Stalaktiter och stalagmiter av kalksten bildade under miljoner år. Guideturen tar ca 50 min och passar barn från ca 5 år.',
    practicalInfo: 'Öppet maj–sep. Guideturer var 30:e min. Temperatur alltid 8°C – ta extra lager. Gratis cykelväg från Visby.',
  },
  {
    id: 3, transport: 'Med bil' as Mode,
    title: 'Hoburgen – Gotlands dramatiska sydspets',
    distance: 'Ca 115 km söder om Visby',
    description: 'Gotlands sydligaste punkt: ett rakt kalkstensklint som sticker ut i Östersjön. Fyren ger hisnande utsikt. Raukar runt klintens bas formade av havet under årtusenden.',
    practicalInfo: 'Inga matmöjligheter – ta med. Parkering gratis. Promenad runt basen: ca 1,5 h. Kombinera med Burgsvik för lunch.',
  },
  {
    id: 4, transport: 'Med bil' as Mode,
    title: 'Raukar-tur – tre platser på en dag',
    distance: 'Langhammars, Digerhuvud, Holmhällar',
    description: 'En heldagsrunda med bil tar dig förbi tre spektakulära raukplatser: Langhammars på Fårö, Digerhuvud vid Fårösundet och Holmhällar i söder. Varje plats har unik karaktär.',
    practicalInfo: 'Planera 8+ timmar. Ta med lunch och vatten. Inga inträdesavgifter. Barn älskar att klättra – håll koll vid vattenbryn.',
  },
  {
    id: 5, transport: 'Med bil' as Mode,
    title: 'Gotlands vingårdar – rosévin vid havet',
    distance: 'Ca 60 km söder om Visby',
    description: 'Sveriges varmaste ö ger unika förutsättningar för vin. Bläsinge Vingård, Gotlandsdricka & Vin och Roma Vingård – alla erbjuder vinprovningar med havsutsikt.',
    practicalInfo: 'Boka vinprovning i förväg. Utse nykter förare eller ta guidad tur från Visby.',
  },
  {
    id: 6, transport: 'Kollektivt' as Mode,
    title: 'Visby stadsvandring – medeltidsstaden',
    distance: 'Visby innerstad, ca 2 km runt',
    description: 'UNESCO-listad innerstad med 3,6 km medeltidsmur, pittoreska gränder och kyrkoruiner från 1200-talet. Unikt i hela norra Europa.',
    practicalInfo: 'Färjan från Nynäshamn: 3–3,5 h. Guidade turer från turistbyrån. Mur-promenad: ca 2 h.',
  },
  {
    id: 7, transport: 'Kollektivt' as Mode,
    title: 'Roma kloster – historiens tystnad',
    distance: 'Ca 18 km öster om Visby, buss 11',
    description: 'En av Sveriges bäst bevarade cisterciensklosterruiner från 1100-talet. Sommartid arrangeras konserter och teater i ruinen.',
    practicalInfo: 'Buss 11 från Visby, ca 35 min. Ta med matsäck.',
  },
  {
    id: 8, transport: 'Kollektivt' as Mode,
    title: 'Tofta strand – Gotlands bästa sandstrand',
    distance: 'Ca 15 km söder om Visby, buss 2',
    description: 'Bred, vindskyddad sandstrand med grunt varmt vatten – Gotlands bäst lämpade badstrand för barnfamiljer.',
    practicalInfo: 'Buss 2 från Visby, ca 25 min. Gratis. Vattentemp: 18–22°C i juli–aug.',
  },
  {
    id: 9, transport: 'Med cykel' as Mode,
    title: 'Cykla runt norra Gotland',
    distance: 'Ca 100–120 km, 2–3 dagar',
    description: 'Cykeltur runt Fårö och norra kusten tillbaka till Visby. Gotland är perfekt för cykling: flackt, vackert och med cykelvägar längs kusten.',
    practicalInfo: 'Hyr cykel i Visby. Övernatta i vandrarhem – boka i förväg.',
  },
  {
    id: 10, transport: 'Med cykel' as Mode,
    title: 'Visby–Ljugarn – östkustens led',
    distance: 'Ca 75 km, 1–2 dagar',
    description: 'Östra Gotland: tystare, grönare och med Ljugarn Krog som utsökt mål. Via Roma och kulturhistoriska stopp längs vägen.',
    practicalInfo: 'Mellannivå-cyklister. Hyr cykel vid hamnen i Visby.',
  },
]

const MODES: Mode[] = ['Alla', 'Med bil', 'Kollektivt', 'Med cykel']

const TRANSPORT_ICON: Record<Mode, JSX.Element> = {
  'Alla': <></>,
  'Med bil': (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
      <rect x="7" y="14" width="10" height="6" rx="1" />
      <circle cx="7.5" cy="17.5" r="2.5" /><circle cx="16.5" cy="17.5" r="2.5" />
    </svg>
  ),
  'Kollektivt': (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
  'Med cykel': (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5.5" cy="17.5" r="3.5" /><circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 10l-4 4h5l3-5.5" />
    </svg>
  ),
}

const TRANSPORT_COLOR: Record<Mode, { bg: string; text: string }> = {
  'Alla':        { bg: '#0a7b8c', text: '#fff' },
  'Med bil':     { bg: '#1a4a5e', text: '#fff' },
  'Kollektivt':  { bg: '#2a7a40', text: '#fff' },
  'Med cykel':   { bg: '#8b4513', text: '#fff' },
}

const CARD_ACCENT: Record<Mode, string> = {
  'Alla':       '#0a7b8c',
  'Med bil':    '#1a4a5e',
  'Kollektivt': '#2a7a40',
  'Med cykel':  '#8b4513',
}

export default function GotlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0d2440 0%, #1a4a5e 60%, #24697f 100%)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 10, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ padding: '14px 0 24px' }}>
            <Link href="/gotland" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
              backdropFilter: 'blur(6px)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Gotland
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{
              background: 'rgba(255,255,255,0.18)', color: '#fff',
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '4px 12px', borderRadius: 20,
            }}>10 upplevelser</span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 800, color: '#fff',
            margin: '0 0 10px', lineHeight: 1.2, letterSpacing: '-0.01em',
          }}>Äventyr på Gotland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 28px', maxWidth: 520, lineHeight: 1.6 }}>
            Raukar, medeltidsmur, vingårdar och cykelleder – Gotlands bästa upplevelser
          </p>

          {/* Filter pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MODES.map(m => (
              <button key={m} onClick={() => setActive(m)} style={{
                fontSize: 12, fontWeight: 700, padding: '7px 18px', borderRadius: 20,
                border: active === m ? 'none' : '1px solid rgba(255,255,255,0.25)',
                cursor: 'pointer',
                background: active === m ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.1)',
                color: active === m ? TRANSPORT_COLOR[m].bg : '#fff',
                transition: 'all .18s',
              }}>{m}</button>
            ))}
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 32, marginBottom: -1, marginTop: 32 }}>
          <path d="M0,16 C360,32 1080,0 1440,16 L1440,32 L0,32 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '10px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <Link href="/gotland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Gotland</Link>
          <span>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(adv => {
            const accent = CARD_ACCENT[adv.transport]
            return (
              <article key={adv.id} style={{
                background: 'var(--white)',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
                border: '1px solid rgba(0,0,0,0.06)',
                borderTop: `3px solid ${accent}`,
              }}>
                <div style={{ padding: '20px 24px' }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5,
                        fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                        background: accent, color: '#fff',
                        padding: '4px 10px 4px 8px', borderRadius: 20,
                      }}>
                        <span style={{ display: 'flex', color: 'rgba(255,255,255,0.8)' }}>{TRANSPORT_ICON[adv.transport]}</span>
                        {adv.transport}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 500 }}>{adv.distance}</span>
                    </div>
                    <span style={{
                      fontSize: 22, fontWeight: 900, color: 'rgba(0,0,0,0.07)',
                      letterSpacing: '-0.03em', flexShrink: 0,
                      fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                    }}>{String(adv.id).padStart(2, '0')}</span>
                  </div>

                  <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {adv.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 14px' }}>
                    {adv.description}
                  </p>

                  {/* Practical info */}
                  <div style={{
                    background: `rgba(0,0,0,0.03)`,
                    borderRadius: 10, padding: '10px 14px',
                    fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6,
                    borderLeft: `3px solid ${accent}`,
                  }}>
                    <strong style={{
                      fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em',
                      color: accent, display: 'block', marginBottom: 4, fontWeight: 800,
                    }}>Praktisk info</strong>
                    {adv.practicalInfo}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{
          marginTop: 48, padding: '28px 28px 24px',
          background: 'linear-gradient(135deg, #0d2440 0%, #1a4a5e 100%)',
          borderRadius: 20, textAlign: 'center',
          boxShadow: '0 4px 24px rgba(13,36,64,0.2)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 6px', position: 'relative' }}>Redo att planera din Gotlandsresa?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', margin: '0 0 22px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1a4a5e',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '13px 28px', borderRadius: 24,
            position: 'relative',
          }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
