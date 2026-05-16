'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  {
    id: 1, transport: 'Med bil' as Mode,
    title: 'Södra Öland UNESCO + Långe Jan',
    distance: 'Ca 120 km söder om Borgholm',
    description: 'Södra Ölands odlingslandskap är UNESCO-listat. Det öppna Alvaret – en stäppliknande mark unik i Europa – kombineras med Långe Jan, Skandinaviens högsta fyr (42 m). Fyren ger enorma vyer. Ugglestarens naturreservat alldeles intill är ett paradis för fågelskådare.',
    practicalInfo: 'Bil är det bästa sättet – kollektivtrafiken till söder är begränsad. Långe Jan: inträde ca 60 kr. Planera heldagstur. Ta med matsäck.',
  },
  {
    id: 2, transport: 'Med bil' as Mode,
    title: 'Eketorps fornborg – järnålderns Öland',
    distance: 'Ca 100 km söder om Borgholm',
    description: 'Eketorp är den enda fullständigt utgrävda och rekonstruerade ringborgen i Norden – ursprungligen från 400-talet e.Kr. Borgwall, bostadshus och en levande arkeologisk miljö med kostymerad personal gör Eketorp till en av Ölands bästa familjeattraktioner.',
    practicalInfo: 'Öppet maj–sep. Boka i förväg under högsäsong. Familjebiljetter finns. Kombinera med besök på Alvaret söderut.',
  },
  {
    id: 3, transport: 'Med bil' as Mode,
    title: 'Borgholms slottsruin – kunglig historia',
    distance: 'Borgholm centrum',
    description: 'Borgholms slott är en av Skandinaviens mest imponerande slottsruiner – ett enormt renässansslott uppfört på 1600-talet som brann 1806. Kungliga familjen bor fortfarande på Solliden alldeles intill, och slottsparken är öppen under sommaren.',
    practicalInfo: 'Öppet maj–aug. Guidade turer dagligen. Solliden slottspark öppet under sommaren. Promenadavstånd från Borgholms centrum.',
  },
  {
    id: 4, transport: 'Med bil' as Mode,
    title: 'Trollskogen – bok och dimma',
    distance: 'Ca 55 km norr om Borgholm',
    description: 'Trollskogen på norra Öland är ett av Sveriges märkligaste naturområden – en urskog av gamla, vindpinade bokträd med mossbetäckta stenar och en känsla av trolleri. Skogen är naturreservat och en av Ölands bästa vandringsdestinationer.',
    practicalInfo: 'Alltid öppet, inget inträde. Parkering vid Byxelkroks hamn ca 1 km. Stigar välmärkta. Barnvänligt men terrängen kan vara knölig.',
  },
  {
    id: 5, transport: 'Med bil' as Mode,
    title: 'Alvaret – Europas unika stäpp',
    distance: 'Södra Öland, ca 80–120 km söder om Borgholm',
    description: 'Det stora Alvaret är en stäppliknande kalkmark som saknar motstycke i Europa. I maj lyser det av orkidéer, och sommaren blommar rosenrot och timjan. Naturreservat med välmärkta vandringsleder. Stilla och meditativt.',
    practicalInfo: 'Bäst i maj–juni (blomning). Bil rekommenderas – väg 136 längs öns östkust. Gratis inträde. Ta med egen dricka.',
  },
  {
    id: 6, transport: 'Med bil' as Mode,
    title: 'Byxelkrok – norröns pärla',
    distance: 'Ca 60 km norr om Borgholm',
    description: 'Byxelkrok är Ölands nordligaste by med en charmig hamn och direkt tillgång till Trollskogen. Sommarens folkliga stämning med fiskebåtar och café vid kajen är Öland på sitt bästa.',
    practicalInfo: 'Bil eller buss från Borgholm. Café vid hamnen. Kombinera med Trollskogen. Bäst juli–aug.',
  },
  {
    id: 7, transport: 'Med cykel' as Mode,
    title: 'Södra Öland – UNESCO på cykel',
    distance: 'Ca 60 km rundtur från Mörbylånga',
    description: 'En cykelrunda runt södra Ölands UNESCO-område passar in Eketorp, Alvaret och Långe Jan på en dag. Flackt landskap och välskyltade leder gör det till en av Ölands bästa cykelturer.',
    practicalInfo: 'Start Mörbylånga (nås med buss från Kalmar). Hyr cykel i Mörbylånga. Planera 7–8 timmar. Ta med matsäck.',
  },
  {
    id: 8, transport: 'Med cykel' as Mode,
    title: 'Borgholm–Eketorp – historisk cykeltur',
    distance: 'Ca 50 km enkel resa',
    description: 'Från Borgholm söderut till Eketorps fornborg längs väg 136 – en fin dagstur med historiska stopp längs vägen. Kombinera med Borgholms slottsruin på morgonen och Eketorp på eftermiddagen.',
    practicalInfo: 'Hyr cykel i Borgholm. Buss tillbaka från Mörbylånga. Välskyltad led men var uppmärksam på trafiken längs 136:an.',
  },
  {
    id: 9, transport: 'Kollektivt' as Mode,
    title: 'Borgholm stadsvandring – Ölands puls',
    distance: 'Borgholm centrum',
    description: 'Borgholm är Ölands huvudstad och drar under sommaren hundratusentals turister. Promenadstaden med Storgatan, slottsruinen och hamnen är Ölands urbana höjdpunkt. Kungsparken och Solliden slottspark är pärlor.',
    practicalInfo: 'Buss från Kalmar: ca 45 min, länsbussarna. Promenadvänlig innerstad. Turistbyrån vid hamnen ger karta.',
  },
  {
    id: 10, transport: 'Kollektivt' as Mode,
    title: 'Mörbylånga med buss – söder om Borgholm',
    distance: 'Ca 20 km söder om Borgholm, buss',
    description: 'Mörbylånga är södra Ölands lilla krona – lugnt och genuint med en karaktäristisk kvarn och ett pittoreskt centrum. Härifrån startar den bästa cykeln mot Eketorp och Alvaret.',
    practicalInfo: 'Buss från Borgholm, ca 20 min. Kvarnen och museet fritt. Bra utgångspunkt för cykeluthyrning.',
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

export default function OlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(135deg, #2d1a0d 0%, #6b3a1a 60%, #8b4f24 100%)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 10, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative' }}>
          <div style={{ padding: '14px 0 24px' }}>
            <Link href="/oland" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 10px', backdropFilter: 'blur(6px)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Öland
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 12px', borderRadius: 20 }}>10 upplevelser</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#fff', margin: '0 0 10px', lineHeight: 1.2 }}>Äventyr på Öland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: '0 0 28px', maxWidth: 520, lineHeight: 1.6 }}>UNESCO-Alvaret, Långe Jan, fornborg och cykelleder längs solöns kust</p>
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
          <Link href="/oland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Öland</Link>
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

        <div style={{ marginTop: 48, padding: '28px 28px 24px', background: 'linear-gradient(135deg, #2d1a0d 0%, #6b3a1a 100%)', borderRadius: 20, textAlign: 'center', boxShadow: '0 4px 24px rgba(45,26,13,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 17, fontWeight: 700, color: '#fff', margin: '0 0 6px', position: 'relative' }}>Redo att planera din Ölandsresa?</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.68)', margin: '0 0 22px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#6b3a1a', fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: '13px 28px', borderRadius: 24, position: 'relative' }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
