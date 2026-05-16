'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  { id: 1, transport: 'Med bil' as Mode, title: 'Södra Öland UNESCO + Laange Jan', distance: 'Ca 120 km söder om Borgholm', badge: '🚗', description: 'Södra Ölands odlingslandskap är UNESCO-listat. Det öppna Alvaret – en stäppliknande mark unik i Europa – kombineras med Laange Jan, Skandinaviens högsta fyr (42 m). Fyr och lantemission ger enorma vyer. Ugglestarens naturreservat alldeles intill är ett paradis för faagelskadare.', practicalInfo: 'Bil är det bästa sättet – kollektivtrafiken till söder är begränsad. Laange Jan: inträde ca 60 kr. Planera heldagstur. Medbring matsäck.' },
  { id: 2, transport: 'Med bil' as Mode, title: 'Eketorps fornborg – Järnaaalderns Öland', distance: 'Ca 100 km söder om Borgholm', badge: '🚗', description: 'Eketorp är den enda fullständigt utgrävda och rekonstruerade ringborgen i Norden – ursprungligen fraan 400-talet e.Kr. Borgwall, bostadshus och en levande arkeologisk miljö med kostymerande personal gör Eketorp till ett av Ölands bästa familjeattraktioner.', practicalInfo: 'Öppet maj–sep. Boka i förväg under högsäsong. Familjebiljetter finns. Kombinera med besök pa Alvaret söderut.' },
  { id: 3, transport: 'Med bil' as Mode, title: 'Borgholms slottsruin – konungslig historia', distance: 'Borgholm centrum', badge: '🚗', description: 'Borgholms slott är en av Skandinaviens mest imponerande slottsruiner – ett enormt renässansslott uppfört pa 1600-talet som brann 1806. Kungligheter använde slottet som sommarresidens och i dag är det museum och sommarteater. Kungliga familjen bor fortfarande pa Solliden, alldeles intill.', practicalInfo: 'Öppet maj–aug. Guidade turer dagligen. Solliden slottspark öppet under sommaren. Promenadavstand fran Borgholms centrum.' },
  { id: 4, transport: 'Med bil' as Mode, title: 'Trollskogen – bok och brand', distance: 'Ca 55 km norr om Borgholm', badge: '🚗', description: 'Trollskogen pa norra Öland är ett av Sveriges märkligaste naturomraden – en urskog av gamla, vindpinade bokträd med mossbetäckta stenar och en känsla av trolleri. Skogen är naturreservat och en av Ölands bästa vandringsdestinationer.', practicalInfo: 'Alltid öppet, inget inträde. Parkering vid Byxelkroks hamn ca 1 km. Stigar välmärkta. Barnvänligt men terrängen kan vara knölig.' },
  { id: 5, transport: 'Med bil' as Mode, title: 'Alvaret – Europas unika stäpp', distance: 'Södra Öland, ca 80–120 km söder om Borgholm', badge: '🚗', description: 'Det stora Alvaret är en stäppliknande kalkmark som saknar motstycke i Europa. I majmorgon lyser det av orkidéer, och sommarn blommar rosenrot och timjan. Naturreservat med välmärkta vandringsleder. Stilla och meditativt.', practicalInfo: 'Bäst i maj–juni (blomning). Bil rekommenderas – väg 136 längs öns östkust. Gratis inträde. Ta med egen dricka.' },
  { id: 6, transport: 'Med cykel' as Mode, title: 'Borgholm–Byxelkrok längs östkusten', distance: 'Ca 55 km enkel resa, 1 dag', badge: '🚲', description: 'Ölands östkust är en av Sveriges bästa cykelleder – flat, välskyltad och med havsutsikt hela vägen. Fran Borgholm cycklar du norrut via fiskessamhällen och klippbad till Byxelkrok vid norra udden. Trollskogen är ditt maal.', practicalInfo: 'Hyr cykel i Borgholm. Vägen är flack och lämplig för alla. Byxelkroks hamn erbjuder krogen och glass. Buss tillbaka om du är trött.' },
  { id: 7, transport: 'Med cykel' as Mode, title: 'Södra Öland – UNESCO pa cykel', distance: 'Ca 60 km rundtur fran Mörbylanga', badge: '🚲', description: 'En cykelrunda runt södra Ölands UNESCO-omrade passar in Eketorp, Alvaret och Laange Jan pa en dag. Flackt landskap och välskyltade leder gör det till en av Ölands bästa cykelturer.', practicalInfo: 'Start Mörbylanga (naas med buss fran Kalmar). Hyr cykel i Mörbylanga. Planera 7–8 timmar. Ta med matsäck.' },
  { id: 8, transport: 'Med cykel' as Mode, title: 'Borgholm–Eketorp – historisk cykeltur', distance: 'Ca 50 km enkel resa', badge: '🚲', description: 'Fran Borgholm söderut till Eketorps fornborg längs väg 136 – en fin dagstur med historiska stopp längs vägen. Kombinera med Borgholms slottsruin pa morgonen och Eketorp pa eftermiddagen.', practicalInfo: 'Hyr cykel i Borgholm. Buss tillbaka fran Mörbylanga. Välskyltad led men var uppmärksam pa trafiken längs 136:an.' },
  { id: 9, transport: 'Kollektivt' as Mode, title: 'Borgholm stadsvandring – Ölands puls', distance: 'Borgholm centrum', badge: '🚌', description: 'Borgholm är Ölands huvudstad och hittas – under sommaren – av hundratusentals turister. Promenadstaden med Storgatan, slottsruinen och hamnen är Ölands urbana höjdpunkt. Kungsparken och Solliden slottspark är pärlor.', practicalInfo: 'Buss fran Kalmar: ca 45 min, länsbussarna. Promenadvänlig innerstad. Turistbyran vid hamnen ger karta.' },
  { id: 10, transport: 'Kollektivt' as Mode, title: 'Mörbylanga med buss – söder om Borgholm', distance: 'Ca 20 km söder om Borgholm, buss', badge: '🚌', description: 'Mörbylanga är södra Ölands lilla krona – lugnt och genuint med en karaktäristisk kvarn och ett pittoreskt centrum. Härifraan startar den bästa cykeln mot Eketorp och Alvaret.', practicalInfo: 'Buss fran Borgholm, ca 20 min. Kvarnen och museet fritt. Bra utgangspunkt för cykeluthyrning.' },
]

const MODES: Mode[] = ['Alla', 'Med bil', 'Kollektivt', 'Med cykel']
const MODE_COLOR: Record<Mode, string> = { 'Alla': '#0a7b8c', 'Med bil': '#1a4a5e', 'Kollektivt': '#2a7a40', 'Med cykel': '#c0392b' }

export default function OlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg,#0d2440,#1a4a5e,#2a7a5e)', padding: '0 20px 44px', paddingTop: 'calc(env(safe-area-inset-top,0px))' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0 20px' }}>
            <Link href="/oland" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 10px', backdropFilter: 'blur(6px)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Öland
            </Link>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>10 äventyr pa Öland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 24px' }}>UNESCO-Alvaret, Laange Jan, fornborg och cykelleder längs solöns kust</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MODES.map(m => <button key={m} onClick={() => setActive(m)} style={{ fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: active === m ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)', color: active === m ? MODE_COLOR[m] : '#fff', transition: 'all .18s' }}>{m}</button>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link><span>›</span>
          <Link href="/oland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Öland</Link><span>›</span><span>Äventyr</span>
        </nav>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map(adv => (
            <article key={adv.id} style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(10,123,140,0.06)', display: 'grid', gridTemplateColumns: 'minmax(90px,110px) 1fr' }}>
              <div style={{ background: 'linear-gradient(135deg,#1a4a5e,#2a7a5e)', padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
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
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>Redo att planera din Ölandsresa?</p>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 20px' }}>Laat Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--sea)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: '13px 28px', borderRadius: 24 }}>Planera din tur med Thorkel →</Link>
        </div>
      </div>
    </div>
  )
}
