'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  {
    id: 1, transport: 'Med bil' as Mode,
    title: 'Kastelholms slott – aldrig glömt',
    distance: 'Ca 30 km öster om Mariehamn',
    description: 'Kastelholm är Ålands mäktigaste medeltidslämning – ett slott från 1300-talet som sticker upp ur en skogklädd ås. Slottet har tjänat som fängelse, residens och lantbruk och är nu ett välskött museum med guidade turer på svenska.',
    practicalInfo: 'Öppet maj–sep. Boka guidad tur i förväg under högsäsong. Kombinera med besök på Jan Karlsgårdens friluftsmuseum alldeles intill. Ta med matsäck.',
  },
  {
    id: 2, transport: 'Med bil' as Mode,
    title: 'Bomarsunds fästning – ryssarnas Åland',
    distance: 'Ca 45 km öster om Mariehamn',
    description: 'Bomarsund var ett gigantiskt ryskt fästningsverk påbörjat på 1830-talet och förstört av brittisk-fransk flotta 1854. Ruinernas enorma stenblock är häpnadsväckande. En av Nordeuropas bäst bevarade Krimkrigsminnen.',
    practicalInfo: 'Alltid öppet, inget inträde. Ta bil eller cykel från Kastelholm – ca 15 min. Bra skyltning. Info-skyltar på svenska och engelska.',
  },
  {
    id: 3, transport: 'Med bil' as Mode,
    title: 'Föglö – cykelöns skärgård',
    distance: 'Ca 50 km öster om Mariehamn (färja)',
    description: 'Föglö kallas cykelön och är en av Ålands mest välkomnande yttre öar. Gästhamnen är liten och mysig, naturen öppen och havet allestädes närvarande. Nå hit med Ålandstrafiken från Svinö.',
    practicalInfo: 'Bilfärja från Svinö – kontrollera tidtabell. Hyr cykel på Föglö. Plan: heldagstur. Ta med matsäck.',
  },
  {
    id: 4, transport: 'Med bil' as Mode,
    title: 'Kökar – längst ut i Åland',
    distance: 'Ca 100 km sydöster om Mariehamn (färja)',
    description: 'Kökar är Ålands sydligaste skärgård och nås med bilfärja. Klipporna är rakade rena av havet, vattnet är klart och kyrkan från 1784 är en av Ålands vackraste. Inga turister, nästan ingen service – äkta skärgård.',
    practicalInfo: 'Bilfärja från Galtby på Korpo eller från Mariehamn – kontrollera tidtabell i förväg. Plan: hela dagen. Ta med matsäck.',
  },
  {
    id: 5, transport: 'Med bil' as Mode,
    title: 'Ålands sjöfartsmuseum – havshistoria',
    distance: 'Mariehamn, västhamnen',
    description: 'Ett av Nordens bästa maritima museer, med museifartyget Pommern som kronjuvel – en av världens sista bevarade fyrmastade stålbarkar. Sjöfartens historia på Åland berättas med kärlek och precision.',
    practicalInfo: 'Öppet hela året. Pommern öppen sommar. Inträde ca 12 €. Parkering vid västhamnen.',
  },
  {
    id: 6, transport: 'Med cykel' as Mode,
    title: 'Lemland & Lumparland – sydöns pärlor',
    distance: 'Ca 50–60 km rundtur',
    description: 'Lemland och Lumparland är Ålands lugnaste öar – böljande åkrar, äldre kyrkor och knappt några turister. Cykelturen passerar Flisö naturreservat och Lumparlands kyrka från 1280-talet.',
    practicalInfo: 'Hyr cykel i Mariehamn. Nås med bro från fastlandet (Åland). Matsäck rekommenderas – begränsad service.',
  },
  {
    id: 7, transport: 'Med cykel' as Mode,
    title: 'Sund & Kastelholm – historisk rundtur',
    distance: 'Ca 35 km rundtur från Kastelholm',
    description: 'Kombinera Kastelholms slott, Bomarsunds ruin och Sunds kyrka på en dagstur med cykel. Välskyltad led med historiska pärlor vart femte kilometer.',
    practicalInfo: 'Start i Kastelholm (nåbar från Mariehamn med buss). Cyklar hyrs vid Kastelholm. Lagom svårighet – lämplig för familjer.',
  },
  {
    id: 8, transport: 'Med cykel' as Mode,
    title: 'Runt Lemland – skärgårdens idyll',
    distance: 'Ca 40 km rundtur',
    description: 'Lemlands kust är en av Ålands vackraste – vikar, fågelrika våtmarker och tystnad. Rundturen tar en halvdag och avslutas med bad från klipporna vid Lembotes.',
    practicalInfo: 'Från Mariehamn: bro och bra cykelmöjligheter. Ingen bilfärja krävs.',
  },
  {
    id: 9, transport: 'Kollektivt' as Mode,
    title: 'Skärgårdshoppning med passagerarbåt',
    distance: 'Varierar, utgår från Mariehamn',
    description: 'Ålands interna skärgårdstrafik ger möjligheten att hoppa mellan öar utan bil. Passagerarbåtarna går till Föglö, Kökar, Sottunga och andra yttre öar. En dag av öhoppning är ett av Ålands bästa sätt att uppleva skärgården.',
    practicalInfo: 'Tidtabeller på alandstrafiken.ax. Boka i förväg under högsäsong. Ta matsäck – service varierar på öarna.',
  },
  {
    id: 10, transport: 'Kollektivt' as Mode,
    title: 'Mariehamn stadsvandring – Nordens trädgårdsstad',
    distance: 'Mariehamn innerstad, ca 2–3 km',
    description: 'Mariehamn är en av Skandinaviens minsta städer och en av de charmigaste. Esplanaden är unik – en allé av lindar som sträcker sig från öst- till västhamnen. Ålands sjöfartsmuseum är ett av Nordens bästa.',
    practicalInfo: 'Ålands sjöfartsmuseum: öppet hela året. Esplanaden: alltid fri. Turistbyrån ger gratis stadskartor.',
  },
]

const MODES: Mode[] = ['Alla', 'Med bil', 'Kollektivt', 'Med cykel']

const TRANSPORT_ICON: Record<Mode, ReactNode> = {
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

const TRANSPORT_COLOR: Record<Mode, string> = {
  'Alla':       '#0a7b8c',
  'Med bil':    '#1a4a5e',
  'Kollektivt': '#2a7a40',
  'Med cykel':  '#8b4513',
}

export default function AlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(135deg, #0d2d1e 0%, #1a5c3a 60%, #207a4f 100%)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 10, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ padding: '14px 0 24px' }}>
            <Link href="/aland" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 10px', backdropFilter: 'blur(6px)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Åland
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 20 }}>10 upplevelser</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>Äventyr på Åland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 28px', maxWidth: 520, lineHeight: 1.6 }}>Medeltidsslott, skärgårdshoppning, cykelleder och Nordens vackraste havsstad</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MODES.map(m => (
              <button key={m} onClick={() => setActive(m)} style={{ fontSize: 12, fontWeight: 700, padding: '7px 18px', borderRadius: 20, border: active === m ? 'none' : '1px solid rgba(255,255,255,0.25)', cursor: 'pointer', background: active === m ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.1)', color: active === m ? TRANSPORT_COLOR[m] : '#fff', transition: 'all .18s' }}>{m}</button>
            ))}
          </div>
        </div>
        <svg viewBox="0 0 1440 32" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 32, marginBottom: -1, marginTop: 32 }}>
          <path d="M0,16 C360,32 1080,0 1440,16 L1440,32 L0,32 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '10px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <Link href="/aland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Åland</Link>
          <span>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map(adv => {
            const accent = TRANSPORT_COLOR[adv.transport]
            return (
              <article key={adv.id} style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(0,0,0,0.06)', borderTop: `3px solid ${accent}` }}>
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: accent, color: '#fff', padding: '4px 10px 4px 8px', borderRadius: 20 }}>
                        <span style={{ display: 'flex', color: 'rgba(255,255,255,0.8)' }}>{TRANSPORT_ICON[adv.transport]}</span>
                        {adv.transport}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--txt3)', fontWeight: 500 }}>{adv.distance}</span>
                    </div>
                    <span style={{ fontSize: 22, fontWeight: 900, color: 'rgba(0,0,0,0.07)', letterSpacing: '-0.03em', flexShrink: 0, fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>{String(adv.id).padStart(2, '0')}</span>
                  </div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.35 }}>{adv.title}</h2>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7, margin: '0 0 14px' }}>{adv.description}</p>
                  <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, borderLeft: `3px solid ${accent}` }}>
                    <strong style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: accent, display: 'block', marginBottom: 4, fontWeight: 800 }}>Praktisk info</strong>
                    {adv.practicalInfo}
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div style={{ marginTop: 48, padding: '28px 28px 24px', background: 'linear-gradient(135deg, #0d2d1e 0%, #1a5c3a 100%)', borderRadius: 20, textAlign: 'center', boxShadow: '0 4px 24px rgba(13,45,30,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 6px', position: 'relative' }}>Redo att planera din Ålandsresa?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', margin: '0 0 22px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1a5c3a', fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: '13px 28px', borderRadius: 24, position: 'relative' }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
