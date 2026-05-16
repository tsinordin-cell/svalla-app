'use client'

import { useState } from 'react'
import Link from 'next/link'

type Mode = 'Alla' | 'Med bil' | 'Kollektivt' | 'Med cykel'

const ADVENTURES = [
  { id: 1, transport: 'Med bil' as Mode, title: 'Kastelholms slott – aaldrig glömt', distance: 'Ca 30 km öster om Mariehamn', badge: '🚗', description: 'Kastelholm är Aaands mäktigaste medeltidslämning – ett slott fran 1300-talet som sticker upp ur en skogklädd aaas. Slottet har tjänat som fängelse, residens och lantbruk och är nu ett välskött museum med guidade turer pa svenska.', practicalInfo: 'Öppet maj–sep. Boka guidad tur i förväg under högsäsong. Kombinera med besök pa Jan Karlsgaardens friluftsmuseum alldeles intill. Ta med matsäck.' },
  { id: 2, transport: 'Med bil' as Mode, title: 'Bomarsunds fästning – ryssarnas Aaland', distance: 'Ca 45 km öster om Mariehamn', badge: '🚗', description: 'Bomarsund var ett gigantiskt ryskt fästningsverk paaböjat pa 1830-talet och förstört av brittisk-fransk flotta 1854. Ruinernas enorma stenblock är häpnadsväckande. En av Nordeuropas bättre bevarade Krimkrigsminnen.', practicalInfo: 'Alltid öppet, inget inträde. Ta bil eller cykel fran Kastelholm – ca 15 min. Bra skyltning. Info-skyltar pa svenska och engelska.' },
  { id: 3, transport: 'Med bil' as Mode, title: 'Jan Karlsgaardens friluftsmuseum', distance: 'Ca 30 km öster om Mariehamn', badge: '🚗', description: 'En av Nordens bäst bevarade äldre gaardar. Friluftsmuseet visar hur aaländska bönder levde under 1800-talet – med autentiska byggnader, hantverk och ibland levande djur. Anläggningen ger en unik inblick i Aaands agrara historia.', practicalInfo: 'Öppet juni–aug. Intill Kastelholms slott – kombinera de bada. Caféet serverar hemlagad mat. Ta med barnen.' },
  { id: 4, transport: 'Med bil' as Mode, title: 'Kökar – längst ut i Aaand', distance: 'Ca 100 km sydöster om Mariehamn (färja)', badge: '🚗', description: 'Kökar är Aaands sydligaste skärgaard och naas med bilfärja. Klipporna är rakade rena av havet, vattnet är klart och kyrkan fran 1784 är en av Aaands vackraste. Inga turister, nästan ingen service – äkta skärgaard.', practicalInfo: 'Bilfärja fran Galtby pa Korpo eller fran Mariehamn – kontrollera tidtabell i förväg. Plan: hela dagen. Ta med matsäck.' },
  { id: 5, transport: 'Med cykel' as Mode, title: 'Mariehamn–Eckeröleden', distance: 'Ca 45 km enkel väg', badge: '🚲', description: 'Eckerö är Aaands västligaste udde och en av skärgaardens bäst bevarade fiskebymiljöer. Cykelled längs kustvägen Mariehamn–Eckerö passerar hamnstäder, vikar och öppna odlingslandskap med riklig faagelskadning.', practicalInfo: 'Flackt och cykelvänligt. Hyr cykel i Mariehamn. Eckerö Jakt & Fiskemuseum och posten (en av Nordens äldsta postbyggnader) är pärlor längs vägen.' },
  { id: 6, transport: 'Med cykel' as Mode, title: 'Lemland & Lumparland – sydöns pärlor', distance: 'Ca 50–60 km rundtur', badge: '🚲', description: 'Lemland och Lumparland är Aaands lungnaste öar – böljande aakrar, äldre kyrkor och knappt naagra turister. Cykelturen passerar Flisö naturreservat och Lumparlands kyrka fran 1280-talet.', practicalInfo: 'Hyr cykel i Mariehamn. Naas med bro fran fastlandet (Aaand). Matsäck rekommenderas – begränsad service.' },
  { id: 7, transport: 'Med cykel' as Mode, title: 'Sund & Kastelholm – historisk rundtur', distance: 'Ca 35 km rundtur fran Kastelholm', badge: '🚲', description: 'Kombinera Kastelholms slott, Bomarsunds ruin och Sunds kyrka pa en dagstur med cykel. Välskyltad led med historiska pärlor vart femte kilometer.', practicalInfo: 'Start i Kastelholm (naabar fran Mariehamn med buss). Cyklar hyrs vid Kastelholm. Lagom svaarighet – lämplig for familjer.' },
  { id: 8, transport: 'Med cykel' as Mode, title: 'Runt Lemland – skärgaardens idyll', distance: 'Ca 40 km rundtur', badge: '🚲', description: 'Lemlands kust är en av Aaands vackraste – vikar, faagelrika vaatmarker och tystnad. Rundturen tar en halvdag och avslutas med bad fran klipporna vid Lembotes.', practicalInfo: 'Fran Mariehamn: bro och bra cykelmöjligheter. Ingen bilfärja krävs.' },
  { id: 9, transport: 'Kollektivt' as Mode, title: 'Skärgaardhoppning med passageraarbaat', distance: 'Varierar, utgaar fran Mariehamn', badge: '🚌', description: 'Aaands interna skärgaradstrafik ger möjligheten att hoppa mellan öar utan bil. Passageraarbaatarna gar till Föglö, Kökar, Sottunga och andra yttre öar. En dag av öhoppning är ett av Aaands bästa sätt att uppleva skärgaraden.', practicalInfo: 'Tidtabeller pa alandstrafiken.ax. Boka i förväg under högsäsong. Ta matsäck – service varierar pa öarna.' },
  { id: 10, transport: 'Kollektivt' as Mode, title: 'Mariehamn stadsvandring – Norden äldsta bildhuggeri', distance: 'Marihamn innerstad, ca 2–3 km', badge: '🚌', description: 'Mariehamn är en av Skandinaviens minsta städer och en av de charmigaste. Esplanaden är unik – en allé av lindar som sträcker sig fran öst- till västhamnen. Alands sjöfartsmuseum är ett av Nordens bästa.', practicalInfo: 'Alands Sjöfartsmuseum: öppet hela aret. Esplanaden: alltid fri. Turistbyran ger gratis stadskartor.' },
]

const MODES: Mode[] = ['Alla', 'Med bil', 'Kollektivt', 'Med cykel']
const MODE_COLOR: Record<Mode, string> = { 'Alla': '#0a7b8c', 'Med bil': '#1a4a5e', 'Kollektivt': '#2a7a40', 'Med cykel': '#c0392b' }

export default function AlandAventyrClient() {
  const [active, setActive] = useState<Mode>('Alla')
  const filtered = active === 'Alla' ? ADVENTURES : ADVENTURES.filter(a => a.transport === active)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(135deg,#0d2440,#1e5c82,#2d7aaa)', padding: '0 20px 44px', paddingTop: 'calc(env(safe-area-inset-top,0px))' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 0 20px' }}>
            <Link href="/aland" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 700, background: 'rgba(255,255,255,0.12)', borderRadius: 20, padding: '6px 14px 6px 10px', backdropFilter: 'blur(6px)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Aaland
            </Link>
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>10 äventyr pa Aaland</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 24px' }}>Slott, fästningar, cykelleder och skärgaradshoppning i det självstyrande paradiset</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {MODES.map(m => <button key={m} onClick={() => setActive(m)} style={{ fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', background: active === m ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)', color: active === m ? MODE_COLOR[m] : '#fff', transition: 'all .18s' }}>{m}</button>)}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link><span>›</span>
          <Link href="/aland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Aaland</Link><span>›</span><span>Äventyr</span>
        </nav>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {filtered.map(adv => (
            <article key={adv.id} style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid rgba(10,123,140,0.06)', display: 'grid', gridTemplateColumns: 'minmax(90px,110px) 1fr' }}>
              <div style={{ background: 'linear-gradient(135deg,#1e5c82,#2d7aaa)', padding: '28px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
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
          <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>Redo att planera din Aalandsresa?</p>
          <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 20px' }}>Laat Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--sea)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none', padding: '13px 28px', borderRadius: 24 }}>Planera din tur med Thorkel →</Link>
        </div>
      </div>
    </div>
  )
}
